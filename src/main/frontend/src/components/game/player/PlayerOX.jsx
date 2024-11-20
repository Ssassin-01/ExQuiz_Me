import React, { useState, useRef, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './css/GameOX.css'; // 기존의 GameOX.css를 재사용합니다.
import { useNickname } from '../context/NicknameContext';
import axios from 'axios';  // Axios 추가

function PlayerOX() {
    const { nickname } = useNickname();
    const apiUrl = `${window.location.origin}`.replace(/^ws/, 'http');
    const clientRef = useRef(null);
    const [gameEnded, setGameEnded] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false); // 버튼 비활성화 상태 추가
    const [gameSessionId, setGameSessionId] = useState(localStorage.getItem('gameSessionId')); // 로컬스토리지에서 gameSessionId 가져오기

    const sendMessage = (text) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: '/app/answer',
                body: JSON.stringify({
                    text: text,
                    nickname: nickname,
                })
            });
            console.log(`Sent message: ${text} from nickname: ${nickname}`);
        }
    };

    // 클릭 후 버튼 비활성화 및 정답 전송
    const handleOXClick = (choice) => {
        if (!buttonDisabled) {
            sendMessage(choice);
            setButtonDisabled(true); // 클릭 후 버튼 비활성화
        }
    };

    useEffect(() => {
        if (!clientRef.current) {
            const client = new Client({
                webSocketFactory: () => new SockJS(`${apiUrl}/ws`),
                connectHeaders: {},
                debug: function (str) {
                    console.log('Debug: ', str);
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: () => {
                    console.log('Connected to WebSocket');

                    // 새로운 문제 시작 시 버튼 활성화
                    client.subscribe('/topic/new-question', (message) => {
                        setButtonDisabled(false);  // 새로운 문제가 나오면 버튼 다시 활성화
                    });

                    client.subscribe('/topic/game-end', async () => {
                        setGameEnded(true);
                        try {
                            if (gameSessionId) {
                                await axios.post(`${apiUrl}/api/game-sessions/exit`, { gameSessionId });
                                console.log("Game session deleted successfully.");

                                // 세션 종료 후 로컬스토리지 및 상태 클리어
                                localStorage.removeItem('gameSessionId');
                                setGameSessionId(null);
                            } else {
                                console.error("Game session ID is missing.");
                            }
                        } catch (error) {
                            console.error("Error deleting game session:", error);
                        }
                        client.deactivate(() => {
                            console.log('Disconnected from WebSocket');
                        });
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
    }, [apiUrl, gameSessionId]);

    if (gameEnded) {
        return (
            <div className="game-ox-container game-ox-ended">
                <h1>게임이 종료되었습니다.</h1>
            </div>
        );
    }

    return (
        <div className="game-ox-container">
            <div className="game-ox-content">
                <div className="button-group">
                    <button onClick={() => handleOXClick('O')} className="option-button" disabled={buttonDisabled}>
                        ⭕ O
                    </button>
                    <button onClick={() => handleOXClick('X')} className="option-button" disabled={buttonDisabled}>
                        ❌ X
                    </button>
                </div>
                {gameEnded && (
                    <div className="game-ended-overlay">
                        <div className="game-ended-message">게임이 종료되었습니다.</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlayerOX;
