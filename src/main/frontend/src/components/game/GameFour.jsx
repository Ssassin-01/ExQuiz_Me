import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Game1.css';

function GameFour() {
    const location = useLocation();
    const languageToggle = location.state?.languageToggle || false;
    const questionCount = location.state?.questionCount || 10;
    const cardNumber = location.state?.cardNumber || 1;
    const initialTimer = location.state?.timer || 10;

    const { subscribeToChannel, webSocketConnected, participants, publishMessage, disconnectWebSocket } = useWebSocket();
    const [questions, setQuestions] = useState([]);
    const currentQuestionIndex = useRef(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [options, setOptions] = useState([]);
    const [messages, setMessages] = useState({});
    const [feedback, setFeedback] = useState("");
    const [scores, setScores] = useState({});
    const [gameEnded, setGameEnded] = useState(false);
    const [results, setResults] = useState([]);
    const [timer, setTimer] = useState(initialTimer);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isQuestionTransitioning, setIsQuestionTransitioning] = useState(false);
    const [isSessionDeleted, setIsSessionDeleted] = useState(false);
    const navigate = useNavigate();

    const apiUrl = `${window.location.origin}`;
    const gameSessionId = location.state?.gameSessionId;

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

    // 배열을 무작위로 섞는 함수 추가
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/game/card/${cardNumber}/items`);
            let fetchedQuestions = response.data;

            // 문제 목록을 무작위로 섞음
            fetchedQuestions = shuffleArray(fetchedQuestions);

            if (fetchedQuestions.length > questionCount) {
                fetchedQuestions = fetchedQuestions.slice(0, questionCount);
            }

            setQuestions(fetchedQuestions);
            if (fetchedQuestions.length > 0) {
                const initialQuestion = fetchedQuestions[0];
                setCurrentQuestion(initialQuestion);
                const generatedOptions = generateOptions(initialQuestion, fetchedQuestions);
                setOptions(generatedOptions);
                publishMessage('/topic/options', generatedOptions);
                setIsTimerRunning(true);
                setTimer(initialTimer);
            }
        } catch (error) {
            console.error('Error fetching question:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [cardNumber]);

    const generateOptions = (question, allQuestions) => {
        const correctOption = languageToggle ? question.koreanWord : question.englishWord;
        const incorrectOptions = allQuestions
            .filter(q => q.englishWord !== question.englishWord)
            .map(q => languageToggle ? q.koreanWord : q.englishWord)
            .slice(0, 3);

        const shuffledOptions = [correctOption, ...incorrectOptions].sort(() => 0.5 - Math.random());

        // 콘솔 로그 추가
        console.log(`Generated Question: ${languageToggle ? question.englishWord : question.koreanWord}, Correct Option: ${correctOption}, Options: ${shuffledOptions.join(', ')}`);

        return shuffledOptions;
    };

    const checkAnswer = (nickname, optionIndex) => {
        if (!currentQuestion) return;
        const selectedOption = options[optionIndex];
        const isCorrect = selectedOption === (languageToggle ? currentQuestion.koreanWord : currentQuestion.englishWord);

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

    useEffect(() => {
        if (webSocketConnected) {
            const subscription = subscribeToChannel('/topic/answers', (message) => {
                const receivedMessage = JSON.parse(message.body);
                checkAnswer(receivedMessage.nickname, parseInt(receivedMessage.text));
            });

            return () => {
                if (subscription) subscription.unsubscribe();
            };
        }
    }, [webSocketConnected, subscribeToChannel, currentQuestion]);

    const nextQuestion = () => {
        if (currentQuestionIndex.current < questions.length - 1) {
            currentQuestionIndex.current++;
            const nextQ = questions[currentQuestionIndex.current];
            setCurrentQuestion(nextQ);
            const newOptions = generateOptions(nextQ, questions);
            setOptions(newOptions);
            setMessages({});
            setIsTimerRunning(true);
            setTimer(initialTimer);
            publishMessage('/topic/new-question', { message: 'Next question' });
        } else {
            endGame();
        }
    };

    const handleTimeOver = () => {
        setFeedback("시간초과!");
        setIsTimerRunning(false);
        setIsQuestionTransitioning(true);
        setTimeout(() => {
            setFeedback("");
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
        publishMessage('/app/end', { message: 'Game has ended', gameSessionId });
    };

    const handleExit = async () => {
        if (!isSessionDeleted) {
            try {
                await axios.delete(`${apiUrl}/api/game-sessions/${gameSessionId}`);
                console.log("Game session deleted successfully.");
                setIsSessionDeleted(true);
            } catch (error) {
                console.error("Error deleting game session:", error);
            }
        }

        publishMessage('/app/end', { message: 'Game has ended', gameSessionId });
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
                            <div className="gaming-result-rank">
                                {index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}등`}
                            </div>
                            <div className="gaming-result-profile">
                                <span className="profile-emoji">👤</span>
                                <span className="gaming-result-name">{result.nickname}</span>
                            </div>
                            <span className="gaming-result-score">맞춘 갯수: {result.score}개</span>
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
            <h1 className="gaming-h1">4지선다</h1>
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
                    <div className="gaming-options-container">
                        {options.map((option, index) => (
                            <button key={index} onClick={() => checkAnswer(null, index)} className="gaming-option-button">
                                {option}
                            </button>
                        ))}
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

export default GameFour;
