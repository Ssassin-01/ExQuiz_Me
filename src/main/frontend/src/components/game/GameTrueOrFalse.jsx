import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import axios from 'axios';
import './css/Game1.css';

function GameTrueOrFalse() {
    const location = useLocation();
    const initialGameSessionId = location.state?.gameSessionId || localStorage.getItem('gameSessionId');
    const cardNumber = location.state?.cardNumber || 1;
    const [gameSessionId, setGameSessionId] = useState(initialGameSessionId);
    const languageToggle = location.state?.languageToggle || false;
    const questionCount = location.state?.questionCount || 'all';
    const initialTimer = location.state?.timer || 10;
    const {
        subscribeToChannel,
        webSocketConnected,
        participants,
        publishMessage,
        disconnectWebSocket,
        connectWebSocket,
    } = useWebSocket();

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // useState로 변경
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || {});
    const [feedback, setFeedback] = useState("");
    const [scores, setScores] = useState(JSON.parse(localStorage.getItem('scores')) || {});
    const [gameEnded, setGameEnded] = useState(false);
    const [results, setResults] = useState([]);
    const [timer, setTimer] = useState(initialTimer);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isQuestionTransitioning, setIsQuestionTransitioning] = useState(false);
    const [isSessionDeleted, setIsSessionDeleted] = useState(false);
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    // 타이머 관리
    useEffect(() => {
        let intervalId;

        if (isTimerRunning && timer > 0) {
            intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            handleTimeOver();
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [timer, isTimerRunning]);

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/game/card/${cardNumber}/items`);
            let items = response.data;

            items = shuffleArray(items);

            if (questionCount !== 'all') {
                const limitedItems = items.slice(0, Math.min(parseInt(questionCount), items.length));
                setQuestions(limitedItems);
            } else {
                setQuestions(items);
            }

            if (items.length > 0) {
                setCurrentQuestion(generateRandomQuestion(items, new Set()));
                setTimer(initialTimer);
                setIsTimerRunning(true);
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [cardNumber]);

    useEffect(() => {
        if (webSocketConnected) {
            const subscription = subscribeToChannel('/topic/answers', (message) => {
                const receivedMessage = JSON.parse(message.body);
                checkAnswer(receivedMessage.nickname, receivedMessage.text);
                setMessages((prevMessages) => {
                    const updatedMessages = {
                        ...prevMessages,
                        [receivedMessage.nickname]: receivedMessage.text
                    };
                    localStorage.setItem('messages', JSON.stringify(updatedMessages));
                    return updatedMessages;
                });
            });

            return () => {
                if (subscription) subscription.unsubscribe();
            };
        }
    }, [webSocketConnected, subscribeToChannel, currentQuestion]);

    useEffect(() => {
        console.log("Current gameSessionId:", gameSessionId);
        if (!gameSessionId) {
            console.error("No valid game session ID found!");
            const savedSessionId = localStorage.getItem('gameSessionId');
            if (savedSessionId) {
                setGameSessionId(savedSessionId);
            }
        }

        if (gameSessionId && !webSocketConnected) {
            connectWebSocket();
        }
    }, [gameSessionId, webSocketConnected, connectWebSocket]);

    const generateRandomQuestion = (items, usedEnglishWords) => {
        let englishWord;
        let correctPairItem;
        let isCorrectPair = Math.random() < 0.5;

        do {
            correctPairItem = items[Math.floor(Math.random() * items.length)];
            englishWord = correctPairItem.englishWord;
        } while (usedEnglishWords.has(englishWord));

        usedEnglishWords.add(englishWord);

        let koreanWord;
        if (isCorrectPair) {
            koreanWord = correctPairItem.koreanWord;
        } else {
            let incorrectPairItem;
            do {
                incorrectPairItem = items[Math.floor(Math.random() * items.length)];
                koreanWord = incorrectPairItem.koreanWord;
            } while (koreanWord === correctPairItem.koreanWord);
        }

        console.log(`Generated Question: ${englishWord} - ${koreanWord}, Correct: ${isCorrectPair}`);

        return {
            englishWord,
            koreanWord,
            correctAnswer: isCorrectPair
        };
    };

    const checkAnswer = (nickname, answer) => {
        if (!currentQuestion) return;

        const isCorrect = (answer.toLowerCase() === 'o' && currentQuestion.correctAnswer) ||
            (answer.toLowerCase() === 'x' && !currentQuestion.correctAnswer);

        if (isCorrect) {
            setFeedback("정답!");
            setScores((prevScores) => {
                const updatedScores = {
                    ...prevScores,
                    [nickname]: (prevScores[nickname] || 0) + 1
                };
                localStorage.setItem('scores', JSON.stringify(updatedScores));
                return updatedScores;
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

    const handleTimeOver = () => {
        if (!isQuestionTransitioning) {
            setIsQuestionTransitioning(true); // 문제 전환 중임을 표시
            setFeedback("시간초과!");
            setIsTimerRunning(false);

            setTimeout(() => {
                nextQuestion();
                setIsQuestionTransitioning(false); // 문제 전환 완료
            }, 1000); // 1초 대기 후 다음 문제로 이동
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            const nextIndex = currentQuestionIndex + 1;
            setCurrentQuestionIndex(nextIndex); // 인덱스를 업데이트
            const newQuestion = generateRandomQuestion(questions, new Set());
            setCurrentQuestion(newQuestion);
            setMessages({});
            setTimer(initialTimer);
            setIsTimerRunning(true);
            setFeedback("");

            publishMessage('/topic/new-question', { questionIndex: nextIndex });
        } else {
            endGame();
        }
    };

    const endGame = async () => {
        setGameEnded(true);
        const resultsArray = Object.keys(scores).map(nickname => ({
            nickname,
            score: scores[nickname]
        })).sort((a, b) => b.score - a.score);
        setResults(resultsArray);
    };

    const handleExit = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/game-sessions/exit`, { gameSessionId });

            if (response.status === 200) {
                localStorage.removeItem('participants');
                localStorage.removeItem('messages');
                localStorage.removeItem('scores');

                publishMessage('/topic/game-end', { message: 'Game has ended' });
                disconnectWebSocket();
                navigate('/');
            } else {
                console.error("Failed to exit the game.");
            }
        } catch (error) {
            console.error("Error exiting game:", error);
        }
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

    return (
        <div className="gaming-container">
            <h1 className="gaming-h1">O/X 문제</h1>

            <div className="gaming-progress-container">
                <div className="gaming-progress-text">{`${currentQuestionIndex + 1} / ${questions.length}`}</div>
                <div className="gaming-progress-bar-container">
                    <div
                        className="gaming-progress-bar-fill"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
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
                        <div className="gaming-question-text">
                            {currentQuestion ? (
                                languageToggle ? (
                                    `${currentQuestion.englishWord} - ${currentQuestion.koreanWord}`
                                ) : (
                                    `${currentQuestion.koreanWord} - ${currentQuestion.englishWord}`
                                )
                            ) : 'Loading...'}
                        </div>
                        <div className="gaming-options-container">
                            <button className="gaming-option-button" onClick={() => checkAnswer(null, 'O')}>O</button>
                            <button className="gaming-option-button" onClick={() => checkAnswer(null, 'X')}>X</button>
                        </div>
                        <div className="gaming-feedback">{feedback}</div>
                    </div>
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

export default GameTrueOrFalse;
