import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import './css/Game.css';

function Game() {
    const [playerCount, setPlayerCount] = useState(6);
    const [cardNumber, setCardNumber] = useState(1);
    const [questionCount, setQuestionCount] = useState(10);
    const [timer, setTimer] = useState("00:30");
    const [oxToggle, setOxToggle] = useState(false);
    const [fourToggle, setFourToggle] = useState(false);
    const [shortAnswerToggle, setShortAnswerToggle] = useState(false);
    const [languageToggle, setLanguageToggle] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const navigate = useNavigate();
    const { connectWebSocket, publishMessage, participants, webSocketConnected } = useWebSocket();  // 추가

    const handleCreateGameSession = async () => {
        const [minutes, seconds] = timer.split(':').map(Number);
        const totalSeconds = (minutes * 60) + seconds;

        const config = {
            playerCount: parseInt(playerCount, 10),
            cardNumber: parseInt(cardNumber, 10),
            questionCount: parseInt(questionCount, 10),
            timer: totalSeconds,
            includeTf: oxToggle,
            includeMc: fourToggle,
            includeSa: shortAnswerToggle,
            language: languageToggle ? "Korean" : "English"
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/game-sessions`, config, {
                withCredentials: true
            });
            setQrCodeUrl(response.data.qrCode);
            console.log("QR Code URL:", response.data.qrCode);

            if (!webSocketConnected) {  // 웹소켓이 연결되어 있지 않으면 연결
                connectWebSocket();
            }
        } catch (error) {
            console.error('Error creating game session:', error.response ? error.response.data : error.message);
            setQrCodeUrl("");
        }
    };

    const handleStartGame = () => {
        if (webSocketConnected) {
            publishMessage('/app/start', { message: 'start' });
        }
        navigate('/gaming');
    };

    return (
        <>
            <div className="game-container">
                <header className="game-header">Game - 게임명</header>
                <div className="game-contents">
                    <div className="game-content game-content-left">
                        <div className="settings-row">
                            <span className="label">카드</span>
                            <select value={cardNumber} onChange={e => setCardNumber(e.target.value)} className="select">
                                {[...Array(10).keys()].map(n => <option key={n} value={n + 1}>{n + 1}</option>)}
                            </select>
                        </div>
                        <div className="settings-row">
                            <span className="label">명 수</span>
                            <select value={playerCount} onChange={e => setPlayerCount(e.target.value)} className="select">
                                {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        <div className="settings-row">
                            <span className="label">문제수</span>
                            <select value={questionCount} onChange={(e) => setQuestionCount(e.target.value)} className="select">
                                {[5, 8, 10, 15, 20].map(n => <option key={n} value={n}>{n}</option>)}
                            </select>
                        </div>
                        <div className="settings-row">
                            <span className="label">타이머</span>
                            <select value={timer} onChange={(e) => setTimer(e.target.value)} className="select">
                                {["00:30", "01:00", "01:30", "02:00"].map(time => <option key={time} value={time}>{time}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="game-content">
                        <div className="settings-row">
                            <span className="label">O/X</span>
                            <label className="switch">
                                <input type="checkbox" checked={oxToggle} onChange={() => setOxToggle(!oxToggle)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="settings-row">
                            <span className="label">4지선단</span>
                            <label className="switch">
                                <input type="checkbox" checked={fourToggle} onChange={() => setFourToggle(!fourToggle)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="settings-row">
                            <span className="label">주관식</span>
                            <label className="switch">
                                <input type="checkbox" checked={shortAnswerToggle} onChange={() => setShortAnswerToggle(!shortAnswerToggle)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                        <div className="settings-row">
                            <span className="label">영어/한국어</span>
                            <label className="switch">
                                <input type="checkbox" checked={languageToggle} onChange={() => setLanguageToggle(!languageToggle)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                    <div className="button-row">
                        <button className="qr-code-button" onClick={handleCreateGameSession}>방 만들기</button>
                        {qrCodeUrl ? (
                            <img src={qrCodeUrl} alt="Game Room QR Code" onError={() => setQrCodeUrl('이미지를 불러올 수 없습니다.')} />
                        ) : (
                            <p>QR 코드가 생성되지 않았습니다.</p>
                        )}
                    </div>
                    <div className="button-row">
                        <button className="start-game-button" onClick={handleStartGame}>게임 시작</button>
                    </div>
                </div>
            </div>
            <div>
                <h2>참가자 목록</h2>
                <ul>
                    {participants.map((participant, index) => (
                        <li key={index}>{participant}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Game;
