import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './css/GameRoom.css';

function GameRoom() {
    const [isConnected, setIsConnected] = useState(false);
    const [nickname, setNickname] = useState("");
    const [joined, setJoined] = useState(false);
    const [error, setError] = useState(null);
    const [participants, setParticipants] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL.replace(/^ws/, 'http');
    const clientRef = useRef(null);

    useEffect(() => {
        if (!clientRef.current) {
            const client = new Client({
                webSocketFactory: () => new SockJS(`${apiUrl}/ws`),
                connectHeaders: {},
                debug: function (str) {
                    console.log(str);
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: () => {
                    console.log('Connected to WebSocket');
                    setIsConnected(true);
                    client.subscribe('/topic/participants', (message) => {
                        const participantUpdate = JSON.parse(message.body);
                        if (participantUpdate && participantUpdate.participants) {
                            setParticipants(participantUpdate.participants);
                        }
                    });
                },
                onStompError: (frame) => {
                    console.error('Broker reported error: ' + frame.headers['message']);
                    console.error('Additional details: ' + frame.body);
                },
                onWebSocketClose: () => {
                    console.log('WebSocket connection closed');
                }
            });
            client.activate();
            clientRef.current = client;
        }

        return () => {
            if (clientRef.current && clientRef.current.active) {
                clientRef.current.deactivate(() => {
                    console.log('Disconnected from WebSocket');
                });
            }
        };
    }, [apiUrl]);

    const joinGame = () => {
        if (clientRef.current && clientRef.current.connected && nickname.trim() !== "") {
            clientRef.current.publish({
                destination: '/app/join',
                body: JSON.stringify({
                    type: "join",
                    nickname: nickname,
                    gameSessionId: 1 // 임시로 설정한 gameSessionId, 필요에 따라 수정해야 함
                })
            });
            setJoined(true);
        } else {
            console.error("WebSocket connection is not open or nickname is empty.");
            setError("WebSocket connection is not open or nickname is empty.");
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
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Enter your nickname"
                        className="nickname-input"
                    />
                    <button className="join-game-button" onClick={joinGame} disabled={!isConnected || nickname.trim() === ""}>
                        {isConnected ? "Join Game" : "Connecting..."}
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

