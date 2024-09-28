import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/Game1.css';

function GameTrueOrFalse() {
    const location = useLocation();
    const initialGameSessionId = location.state?.gameSessionId || localStorage.getItem('gameSessionId'); // 로컬스토리지에서 가져오기
    const [gameSessionId, setGameSessionId] = useState(initialGameSessionId); // 초기값 설정
    const languageToggle = location.state?.languageToggle || false;
    const questionCount = location.state?.questionCount || 'all';
    const initialTimer = location.state?.timer || 10;
    const { subscribeToChannel, webSocketConnected, participants, publishMessage, disconnectWebSocket, connectWebSocket } = useWebSocket();

    const [questions, setQuestions] = useState([]);
    const currentQuestionIndex = useRef(0);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [usedEnglishWords, setUsedEnglishWords] = useState(new Set());
    const [messages, setMessages] = useState(JSON.parse(localStorage.getItem('messages')) || {}); // 메시지 복원
    const [feedback, setFeedback] = useState("");
    const [scores, setScores] = useState(JSON.parse(localStorage.getItem('scores')) || {}); // 점수 복원
    const [gameEnded, setGameEnded] = useState(false);
    const [results, setResults] = useState([]);
    const [timer, setTimer] = useState(initialTimer); // 타이머 초기화
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isQuestionTransitioning, setIsQuestionTransitioning] = useState(false);
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
            clearInterval(intervalId); // 컴포넌트 언마운트 시 타이머 클리어
        };
    }, [timer, isTimerRunning]);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/game/card/1/items`);
            let items = response.data;

            if (questionCount !== 'all') {
                const limitedItems = items.slice(0, Math.min(parseInt(questionCount), items.length));
                setQuestions(limitedItems);
            } else {
                setQuestions(items);
            }

            if (items.length > 0) {
                setCurrentQuestion(generateRandomQuestion(items, new Set()));
                setTimer(initialTimer);  // 타이머 초기화
                setIsTimerRunning(true);  // 타이머 시작
            }
        } catch (error) {
            console.error('Error fetching questions:', error);
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
                setMessages((prevMessages) => {
                    const updatedMessages = {
                        ...prevMessages,
                        [receivedMessage.nickname]: receivedMessage.text
                    };
                    localStorage.setItem('messages', JSON.stringify(updatedMessages)); // 메시지 저장
                    return updatedMessages;
                });
            });

            return () => {
                if (subscription) subscription.unsubscribe();
            };
        }
    }, [webSocketConnected, subscribeToChannel, currentQuestion]);

    // 새로고침 시 게임 세션 정보 복원
    useEffect(() => {
        if (!gameSessionId) {
            const savedSessionId = localStorage.getItem('gameSessionId');
            if (savedSessionId) {
                setGameSessionId(savedSessionId);
            }
        }

        if (gameSessionId && !webSocketConnected) {
            connectWebSocket();
        }
    }, [gameSessionId, webSocketConnected, connectWebSocket]);

    // 참가자 정보 복원
    useEffect(() => {
        const savedParticipants = JSON.parse(localStorage.getItem('participants'));
        if (savedParticipants && savedParticipants.length > 0) {
            // 참가자 리스트 복원 로직 추가
        }
    }, []);

    useEffect(() => {
        if (participants.length > 0) {
            localStorage.setItem('participants', JSON.stringify(participants)); // 참가자 저장
        }
    }, [participants]);

    const generateRandomQuestion = (items, usedEnglishWords) => {
        let englishWord;
        do {
            englishWord = items[Math.floor(Math.random() * items.length)].englishWord;
        } while (usedEnglishWords.has(englishWord));

        usedEnglishWords.add(englishWord);

        let koreanWord;
        const isCorrectPair = Math.random() < 0.6;

        if (isCorrectPair) {
            koreanWord = items.find(item => item.englishWord === englishWord).koreanWord;
        } else {
            do {
                koreanWord = items[Math.floor(Math.random() * items.length)].koreanWord;
            } while (koreanWord === items.find(item => item.englishWord === englishWord).koreanWord);
        }

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
                localStorage.setItem('scores', JSON.stringify(updatedScores)); // 점수 저장
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

    // GameTrueOrFalse.jsx에서 추가
    const nextQuestion = () => {
        if (currentQuestionIndex.current < questions.length - 1) {
            currentQuestionIndex.current++;
            setCurrentQuestion(questions[currentQuestionIndex.current]);  // 다음 질문 설정
            setMessages({});
            setTimer(initialTimer);  // 타이머 초기화
            setIsTimerRunning(true);  // 타이머 재시작
            setFeedback(""); // 피드백 초기화

            // 새로운 문제로 넘어갈 때 'new-question' 주제로 메시지 전송
            publishMessage('/topic/new-question', { questionIndex: currentQuestionIndex.current });
        } else {
            endGame();  // 마지막 질문이면 게임 종료
        }
    };

    const handleTimeOver = () => {
        if (!isQuestionTransitioning) {
            setFeedback("시간초과!");
            setIsTimerRunning(false);  // 타이머 멈춤
            setIsQuestionTransitioning(true);  // 질문 전환 상태 설정

            setTimeout(() => {
                nextQuestion();  // 1초 후에 다음 문제로 이동
                setIsQuestionTransitioning(false);  // 질문 전환 상태 해제
            }, 1000);  // 1초 후에 다음 문제로 이동
        }
    };

    const endGame = async () => {
        setGameEnded(true);
        const resultsArray = Object.keys(scores).map(nickname => ({
            nickname,
            score: scores[nickname]
        })).sort((a, b) => b.score - a.score);
        setResults(resultsArray);

        // 게임 종료 후 세션 삭제 요청
        try {
            await axios.delete(`${apiUrl}/api/game-sessions/${gameSessionId}`);
            console.log("Game session deleted successfully.");
        } catch (error) {
            console.error("Error deleting game session:", error);
        }
    };

    const handleExit = async () => {
        try {
            // 게임 세션 삭제 요청 (withCredentials로 인증 정보 포함)
            if (gameSessionId) {
                await axios.delete(`${apiUrl}/api/game-sessions/${gameSessionId}`, {
                    withCredentials: true // 인증 정보를 포함
                });
                console.log("Game session deleted successfully.");
            } else {
                console.error("Game session ID is undefined.");
            }
        } catch (error) {
            console.error("Error deleting game session:", error);
        }

        // 참가자 정보 및 메시지 초기화
        localStorage.removeItem('participants');
        localStorage.removeItem('messages');
        localStorage.removeItem('scores');

        // 웹소켓 연결 종료 및 리다이렉트
        publishMessage('/topic/game-end', { message: 'Game has ended' });
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

    return (
        <div className="gaming-container">
            <h1 className="gaming-h1">O/X 문제</h1>

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
