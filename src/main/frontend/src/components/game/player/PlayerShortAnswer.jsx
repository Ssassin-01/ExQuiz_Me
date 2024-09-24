import React, { useState, useRef, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './css/GameOX.css';
import { useNickname } from '../context/NicknameContext';

function PlayerShortAnswer() {
    const [answer, setAnswer] = useState("");
    const { nickname } = useNickname();
    const apiUrl = process.env.REACT_APP_API_URL.replace(/^ws/, 'http');
    const clientRef = useRef(null);
    const [gameEnded, setGameEnded] = useState(false);

    const sendMessage = (text) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: '/app/answer',
                body: JSON.stringify({
                    text: text,
                    nickname: nickname,
                })
            });
            console.log(`Sent answer: ${text} from nickname: ${nickname}`);
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
                    client.subscribe('/topic/game-end', () => {
                        setGameEnded(true);
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
    }, [apiUrl]);

    const handleSendAnswer = () => {
        sendMessage(answer);
        setAnswer(""); // 답을 보낸 후 입력란 초기화
    };

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
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="영어 답을 입력하세요"
                    className="message-input"
                />
                <button onClick={handleSendAnswer} className="send-button">보내기</button>
            </div>
        </div>
    );
}

export default PlayerShortAnswer;
