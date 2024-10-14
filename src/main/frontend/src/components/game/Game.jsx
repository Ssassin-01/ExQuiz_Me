import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import './css/Game.css';
import GameCardPopup from "./components/GameCardPopup";

function Game() {
    const [playerCount, setPlayerCount] = useState(6);
    const [showCardPopup, setShowCardPopup] = useState(false);
    const [cardNumber, setCardNumber] = useState(1);
    const [questionCount, setQuestionCount] = useState('10');
    const [maxQuestions, setMaxQuestions] = useState(10);
    const [timer, setTimer] = useState("00:05");
    const [questionType, setQuestionType] = useState('ox');
    const [languageToggle, setLanguageToggle] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [gameSessionId, setGameSessionId] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { connectWebSocket, publishMessage, participants, webSocketConnected, resetParticipants } = useWebSocket();

    // 카드 번호에 따라 최대 문제 수를 가져오는 함수
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

    const handleSelectCard = (cardNumber) => {
        setCardNumber(cardNumber);
        setShowCardPopup(false);
    };

    const handleCreateGameSession = async () => {
        resetParticipants();

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
            language: languageToggle ? "Korean" : "English"
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/game-sessions`, config, {
                withCredentials: true
            });
            setQrCodeUrl(response.data.qrCode);
            setGameSessionId(response.data.gameSessionId);

            if (!webSocketConnected) {
                connectWebSocket();
            }
        } catch (error) {
            console.error('Error creating game session:', error.response ? error.response.data : error.message);
            setQrCodeUrl("");
            setError('게임 방을 생성하는 데 실패했습니다.');
        }
    };

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
                gameSessionId,
                cardNumber
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
                {/* 왼쪽 섹션: 카드 선택 영역 */}
                <div className="game-content game-content-left">
                    <div className="card-section">
                        <span className="label">카드</span>
                        <button onClick={() => setShowCardPopup(true)} className="select-button">
                            카드 선택하기
                        </button>
                        <span>{cardNumber}</span>
                    </div>
                </div>
                {showCardPopup && (
                    <GameCardPopup
                        onClose={() => setShowCardPopup(false)}
                        onSelectCard={handleSelectCard}
                    />
                )}

                {/* 오른쪽 섹션: 문제 수와 타이머를 같은 줄에 배치 */}
                <div className="game-content game-content-right">
                    <div className="settings-row-inline">
                        <div className="settings-inline">
                            <span className="label">문제 수</span>
                            <select value={questionCount} onChange={e => setQuestionCount(e.target.value)} className="select">
                                {["5", "8", "10", "15", "20", "all"].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        <div className="settings-inline">
                            <span className="label">타이머</span>
                            <select value={timer} onChange={e => setTimer(e.target.value)} className="select">
                                {["00:05", "00:08", "00:10", "00:15"].map(time => <option key={time} value={time}>{time}</option>)}
                            </select>
                        </div>
                    </div>

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
