import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import './css/Game.css';

function Game() {
    const [playerCount, setPlayerCount] = useState(6);
    const [cardNumber, setCardNumber] = useState(1);
    const [questionCount, setQuestionCount] = useState('10');
    const [maxQuestions, setMaxQuestions] = useState(10); // 카드에 포함된 최대 문제 수
    const [timer, setTimer] = useState("00:10");
    const [questionType, setQuestionType] = useState('ox');
    const [languageToggle, setLanguageToggle] = useState(false); // false = English, true = Korean
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const navigate = useNavigate();
    const { connectWebSocket, publishMessage, participants, webSocketConnected, resetParticipants } = useWebSocket();

    // 카드에 포함된 문제 수 가져오기
    const fetchMaxQuestions = async (cardId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/game/card/${cardId}/items`);
            setMaxQuestions(response.data.length);
        } catch (error) {
            console.error('Error fetching max questions:', error);
        }
    };

    useEffect(() => {
        fetchMaxQuestions(cardNumber); // 카드 번호가 바뀔 때마다 최대 문제 수를 가져옴
    }, [cardNumber]);

    // Game.jsx
    const handleCreateGameSession = async () => {
        resetParticipants();

        const [minutes, seconds] = timer.split(':').map(Number);
        const totalSeconds = (minutes * 60) + seconds;

        // "all"을 카드에 있는 최대 문제 수로 변환
        const questionsToAsk = questionCount === 'all' ? maxQuestions : parseInt(questionCount, 10);

        const config = {
            playerCount: parseInt(playerCount, 10),
            cardNumber: parseInt(cardNumber, 10),
            questionCount: questionsToAsk,  // 여기서 "all"을 숫자로 변환
            timer: totalSeconds,
            includeTf: questionType === 'ox',
            includeMc: questionType === 'four',
            includeSa: questionType === 'shortAnswer',
            language: languageToggle ? "Korean" : "English",
            maxPlayerCount: playerCount // 최대 참가자 수 설정
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/game-sessions`, config, {
                withCredentials: true
            });
            setQrCodeUrl(response.data.qrCode);

            if (!webSocketConnected) {
                connectWebSocket();
            }
        } catch (error) {
            console.error('Error creating game session:', error.response ? error.response.data : error.message);
            setQrCodeUrl("");
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
            state: { languageToggle, questionCount, timer: parseInt(timer.split(':').reduce((acc, time) => (60 * acc) + +time)) }  // 타이머 값을 초 단위로 전달
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
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    <div className="settings-row">
                        <span className="label">문제수</span>
                        <select value={questionCount} onChange={e => setQuestionCount(e.target.value)} className="select">
                            {["5", "8", "10", "15", "20", "all"].map(n => <option key={n} value={n}>{n}</option>)}
                        </select>
                    </div>
                    <div className="settings-row">
                        <span className="label">타이머</span>
                        <select value={timer} onChange={e => setTimer(e.target.value)} className="select">
                            {["00:05", "00:08", "00:10", "00:15"].map(time => <option key={time} value={time}>{time}</option>)}
                        </select>
                    </div>
                </div>
                <div className="game-content">
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
                <h2>참가자 목록</h2>
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
