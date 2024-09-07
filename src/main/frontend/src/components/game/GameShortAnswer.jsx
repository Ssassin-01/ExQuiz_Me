import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Game1.css';

function GameShortAnswer() {
    const location = useLocation();
    const languageToggle = location.state?.languageToggle || false;
    const questionCount = location.state?.questionCount || 10;  // 전달받은 questionCount 설정
    const initialTimer = location.state?.timer || 10;  // 타이머 값 전달

    const { subscribeToChannel, webSocketConnected, participants, publishMessage, disconnectWebSocket } = useWebSocket();
    const [questions, setQuestions] = useState([]);
    const currentQuestionIndex = useRef(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [messages, setMessages] = useState({});
    const [feedback, setFeedback] = useState("");
    const [scores, setScores] = useState({});
    const [gameEnded, setGameEnded] = useState(false);
    const [results, setResults] = useState([]);
    const [timer, setTimer] = useState(initialTimer);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isQuestionTransitioning, setIsQuestionTransitioning] = useState(false);
    const navigate = useNavigate();

    const apiUrl = process.env.REACT_APP_API_URL;

    // 타이머 핸들링
    useEffect(() => {
        if (isTimerRunning && timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        } else if (timer === 0 && !isQuestionTransitioning) {
            handleTimeOver();
        }
    }, [timer, isTimerRunning]);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/game/card/1/items`);
            let fetchedQuestions = response.data;

            // questionCount 적용: 선택된 문제 수만큼 잘라서 사용
            if (fetchedQuestions.length > questionCount) {
                fetchedQuestions = fetchedQuestions.slice(0, questionCount);
            }

            setQuestions(fetchedQuestions);
            if (fetchedQuestions.length > 0) {
                const initialQuestion = fetchedQuestions[0];
                setCurrentQuestion(initialQuestion);
                setIsTimerRunning(true);
                setTimer(initialTimer);
            }
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        if (webSocketConnected) {
            const subscription = subscribeToChannel('/topic/answers', (message) => {
                const receivedMessage = JSON.parse(message.body);
                checkAnswer(receivedMessage.nickname, receivedMessage.text);
                setMessages(prevMessages => ({
                    ...prevMessages,
                    [receivedMessage.nickname]: receivedMessage.text
                }));
            });

            return () => {
                if (subscription) subscription.unsubscribe();
            };
        }
    }, [webSocketConnected, subscribeToChannel, currentQuestion]);

    const checkAnswer = (nickname, answer) => {
        if (!currentQuestion) return;

        const correctAnswer = languageToggle ? currentQuestion.koreanWord : currentQuestion.englishWord;
        const isCorrect = answer.toLowerCase() === correctAnswer.toLowerCase();

        if (isCorrect) {
            setFeedback("정답!");
            setScores(prevScores => ({
                ...prevScores,
                [nickname]: (prevScores[nickname] || 0) + 1
            }));

            setMessages(prevMessages => {
                const updatedMessages = { ...prevMessages };
                delete updatedMessages[nickname];
                return updatedMessages;
            });

            setTimeout(() => {
                setFeedback("");
                nextQuestion();
            }, 1000);
        } else {
            setFeedback("틀림!");
            setTimeout(() => {
                setFeedback("");
            }, 1000);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex.current < questions.length - 1) {
            currentQuestionIndex.current++;
            const nextQ = questions[currentQuestionIndex.current];
            setCurrentQuestion(nextQ);
            setMessages({});
            setIsTimerRunning(true);
            setTimer(initialTimer);
        } else {
            endGame();
        }
    };

    const handleTimeOver = () => {
        setFeedback("시간초과!");
        setIsTimerRunning(false);
        setIsQuestionTransitioning(true);
        setTimeout(() => {
            setFeedback(""); // 다음 문항으로 넘어가기 전에 feedback 초기화
            nextQuestion();
            setIsQuestionTransitioning(false);
        }, 1000);
    };


    const endGame = () => {
        setGameEnded(true);
        const resultsArray = Object.keys(scores).map(nickname => ({
            nickname,
            score: scores[nickname]
        })).sort((a, b) => b.score - a.score);
        setResults(resultsArray);
        publishMessage('/app/end', { message: 'Game has ended', gameSessionId: 1 });
    };

    const handleExit = () => {
        publishMessage('/app/end', { message: 'Game has ended', gameSessionId: 1 });
        disconnectWebSocket();
        navigate('/');
        window.location.reload();
    };

    if (gameEnded) {
        return (
            <div className="gaming-container">
                <h1 className="gaming-h1">Game Results</h1>
                <div className="gaming-results-container">
                    {results.map((result, index) => (
                        <div key={index} className="gaming-result-item">
                            <span>{index + 1}등: {result.nickname}, 맞춘 갯수: {result.score}개</span>
                        </div>
                    ))}
                </div>
                <button onClick={handleExit} className="gaming-exit-button">나가기</button>
            </div>
        );
    }

    if (!currentQuestion) {
        return <div>Loading...</div>;
    }

    return (
        <div className="gaming-container">
            <h1 className="gaming-h1">단답형 문제</h1>
            <div className="gaming-progress-container">
                <div className="gaming-progress-text">{`${currentQuestionIndex.current + 1} / ${questions.length}`}</div>
                <div className="gaming-progress-bar-container">
                    <div
                        className="gaming-progress-bar-fill"
                        style={{ width: `${((currentQuestionIndex.current + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>
            <div className="gaming-main-content">
                <div className="gaming-participants-container">
                    {participants.slice(0, Math.ceil(participants.length / 2)).map((participant) => (
                        <div key={participant} className="gaming-participant-box">
                            <div className="gaming-participant-icon">👤</div>
                            <div className="gaming-participant-nickname">{participant}</div>
                            {messages[participant] && (
                                <div className="gaming-participant-message">{messages[participant]}</div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="gaming-center-container">
                    <div className="gaming-question-container">
                        {languageToggle ? currentQuestion.englishWord : currentQuestion.koreanWord}
                    </div>
                    <div className="gaming-feedback">{feedback}</div>
                </div>
                <div className="gaming-participants-container">
                    {participants.slice(Math.ceil(participants.length / 2)).map((participant) => (
                        <div key={participant} className="gaming-participant-box">
                            <div className="gaming-participant-icon">👤</div>
                            <div className="gaming-participant-nickname">{participant}</div>
                            {messages[participant] && (
                                <div className="gaming-participant-message">{messages[participant]}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="gaming-timer">
                <h2>{`남은 시간: ${timer}s`}</h2>
            </div>
            <button onClick={handleExit} className="gaming-exit-button">나가기</button>
        </div>
    );
}

export default GameShortAnswer;
