import React, { useState, useEffect } from 'react';
import './css/GameRoom.css';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import { useNickname } from './context/NicknameContext';

function GameRoom() {
    const [nicknameInput, setNicknameInput] = useState("");
    const [joined, setJoined] = useState(false);
    const [error, setError] = useState(null);
    const { participants, publishMessage, webSocketConnected, connectWebSocket, subscribeToChannel } = useWebSocket();
    const { setNickname } = useNickname();
    const navigate = useNavigate();

    useEffect(() => {
        if (!webSocketConnected) {
            connectWebSocket();
        }
    }, [webSocketConnected, connectWebSocket]);

    useEffect(() => {
        if (webSocketConnected) {
            const subscription = subscribeToChannel('/topic/game-start', () => {
                navigate('/gameox');
            });

            return () => {
                if (subscription) {
                    subscription.unsubscribe();
                }
            };
        }
    }, [webSocketConnected, navigate, subscribeToChannel]);

    const joinGame = () => {
        if (nicknameInput.trim() !== "") {
            setNickname(nicknameInput);
            if (webSocketConnected) {
                publishMessage('/app/join', {
                    gameSessionId: 1,
                    type: "join",
                    nickname: nicknameInput
                });
                setJoined(true);
            } else {
                setError("WebSocket is not connected.");
            }
        } else {
            setError("Nickname cannot be empty.");
        }
    };

    return (
        <div className="game-room-container">
            <h1 className="game-room-title">Welcome to the Game Room</h1>
            {error && <p className="error-message">{error}</p>}
            {!joined ? (
                <>
                    <input
                        type="text"
                        value={nicknameInput}
                        onChange={(e) => setNicknameInput(e.target.value)}
                        placeholder="Enter your nickname"
                        className="nickname-input"
                    />
                    <button className="join-game-button" onClick={joinGame} disabled={nicknameInput.trim() === ""}>
                        Join Game
                    </button>
                </>
            ) : (
                <div>
                    <p>You have joined the game.</p>
                    <div className="participants-list">
                        <h2>Participants:</h2>
                        <ul>
                            {participants.map((participant, index) => (
                                <li key={index}>{participant}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default GameRoom;
