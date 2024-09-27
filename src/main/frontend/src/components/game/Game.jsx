import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import './css/Game.css';

function Game() {
    const [playerCount, setPlayerCount] = useState(6);
    const [cardNumber, setCardNumber] = useState(1);
    const [questionCount, setQuestionCount] = useState('10');
    const [maxQuestions, setMaxQuestions] = useState(10);
    const [timer, setTimer] = useState("00:10");
    const [questionType, setQuestionType] = useState('ox');
    const [languageToggle, setLanguageToggle] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [gameSessionId, setGameSessionId] = useState(null);  // 새로운 상태 추가
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { connectWebSocket, publishMessage, participants, webSocketConnected, resetParticipants } = useWebSocket();

    // Fetch max questions when card number changes
    const fetchMaxQuestions = async (cardId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/game/card/${cardId}/items`);
            setMaxQuestions(response.data.length);
        } catch (error) {
            console.error('Error fetching max questions:', error);
        }
    };

    useEffect(() => {
        fetchMaxQuestions(cardNumber);
    }, [cardNumber]);

    // Create a new game session and reset the previous participants
    const handleCreateGameSession = async () => {
        resetParticipants(); // Reset participants before creating a new session

        const [minutes, seconds] = timer.split(':').map(Number);
        const totalSeconds = (minutes * 60) + seconds;

        const questionsToAsk = questionCount === 'all' ? maxQuestions : parseInt(questionCount, 10);

        const config = {
            playerCount: parseInt(playerCount, 10),
            cardNumber: parseInt(cardNumber, 10),
            questionCount: questionsToAsk,
            timer: totalSeconds,
            includeTf: questionType === 'ox',
            includeMc: questionType === 'four',
            includeSa: questionType === 'shortAnswer',
            language: languageToggle ? "Korean" : "English",
            maxPlayerCount: playerCount // Set the max player count
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/game-sessions`, config, {
                withCredentials: true
            });
            setQrCodeUrl(response.data.qrCode);
            setGameSessionId(response.data.gameSessionId);  // 서버로부터 gameSessionId 받아와서 저장

            if (!webSocketConnected) {
                connectWebSocket();
            }
        } catch (error) {
            console.error('Error creating game session:', error.response ? error.response.data : error.message);
            setQrCodeUrl("");
            setError('게임 방을 생성하는 데 실패했습니다.'); // Show error message on failure
        }
    };

    // Start the game
    const handleStartGame = () => {
        if (webSocketConnected) {
            const message = {
                message: 'start',
                questionType: questionType
            };
            publishMessage('/app/start', message);
        }

        const gameOptions = {
            state: {
                languageToggle,
                questionCount,
                timer: parseInt(timer.split(':').reduce((acc, time) => (60 * acc) + +time)),
                gameSessionId  // gameSessionId 추가하여 넘기기
            }
        };

        if (questionType === 'ox') {
            navigate('/game/true-or-false', gameOptions);
        } else if (questionType === 'four') {
            navigate('/game/four', gameOptions);
        } else if (questionType === 'shortAnswer') {
            navigate('/game/question', gameOptions);
        }
    };

    return (
        <div className="game-container">
            <header className="game-header">Game - 설정</header>
            <div className="game-contents">
                {/* Left content */}
                <div className="game-content game-content-left">
                    {/* Card Selection */}
                    <div className="settings-row">
                        <span className="label">카드</span>
                        <select value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="select">
                            {[...Array(10).keys()].map(n => <option key={n} value={n + 1}>{n + 1}</option>)}
                        </select>
                    </div>
                    {/* Player Count */}
                    <div className="settings-row">
                        <span className="label">명 수</span>
                        <select value={playerCount} onChange={e => setPlayerCount(e.target.value)} className="select">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    {/* Question Count */}
                    <div className="settings-row">
                        <span className="label">문제수</span>
                        <select value={questionCount} onChange={e => setQuestionCount(e.target.value)} className="select">
                            {["5", "8", "10", "15", "20", "all"].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    {/* Timer */}
                    <div className="settings-row">
                        <span className="label">타이머</span>
                        <select value={timer} onChange={e => setTimer(e.target.value)} className="select">
                            {["00:05", "00:08", "00:10", "00:15"].map(time => <option key={time} value={time}>{time}</option>)}
                        </select>
                    </div>
                </div>

                {/* Right content */}
                <div className="game-content">
                    {/* Question Type */}
                    <div className="settings-row">
                        <span className="label">질문 유형</span>
                        <div className="radio-group">
                            <label>
                                <input
                                    type="radio"
                                    name="questionType"
                                    value="ox"
                                    checked={questionType === 'ox'}
                                    onChange={(e) => setQuestionType(e.target.value)}
                                />
                                O/X
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="questionType"
                                    value="four"
                                    checked={questionType === 'four'}
                                    onChange={(e) => setQuestionType(e.target.value)}
                                />
                                4지선다
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="questionType"
                                    value="shortAnswer"
                                    checked={questionType === 'shortAnswer'}
                                    onChange={(e) => setQuestionType(e.target.value)}
                                />
                                주관식
                            </label>
                        </div>
                    </div>

                    {/* Language Toggle */}
                    <div className="settings-row">
                        <span className="label">언어</span>
                        <div className="toggle-switch">
                            <input
                                type="checkbox"
                                id="language-toggle"
                                checked={languageToggle}
                                onChange={() => setLanguageToggle(!languageToggle)}
                            />
                            <label htmlFor="language-toggle" className="toggle-label"></label>
                            <label>{languageToggle ? '한국어' : '영어'}</label>
                        </div>
                    </div>
                </div>
            </div>

            {/* QR Code Section */}
            <div className="qr-section">
                <button className="qr-code-button" onClick={handleCreateGameSession}>방 만들기</button>
                {qrCodeUrl ? (
                    <div className="qr-code-container">
                        <img className="qr-img" src={qrCodeUrl} alt="Game Room QR Code"
                             onError={() => setQrCodeUrl('이미지를 불러올 수 없습니다.')}/>
                        <button className="start-game-button" onClick={handleStartGame}>게임 시작</button>
                    </div>
                ) : (
                    <p>QR 코드가 생성되지 않았습니다.</p>
                )}
            </div>

            {/* Participants Section */}
            <div className="participants-section">
                <h2>참가자 목록 ({participants.length}/10)</h2>
                <ul className="participants-list">
                    {participants.map((participant, index) => (
                        <li key={index} className="participant-item">{participant}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Game;
