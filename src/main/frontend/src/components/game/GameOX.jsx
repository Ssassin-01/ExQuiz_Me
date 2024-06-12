import React, { useState, useRef, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './css/GameOX.css';
import { useNickname } from './context/NicknameContext';

function GameOX() {
    const [message, setMessage] = useState("");
    const { nickname } = useNickname();
    const apiUrl = process.env.REACT_APP_API_URL.replace(/^ws/, 'http');
    const clientRef = useRef(null);

    const sendMessage = (text) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: '/app/answer',
                body: JSON.stringify({
                    text: text,
                    nickname: nickname, // Nickname from NicknameContext
                })
            });
            console.log(`Sent message: ${text} from nickname: ${nickname}`);
        }
    };

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

    const handleSend = () => {
        sendMessage(message);
        setMessage("");
    };

    return (
        <div className="game-ox-container">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
                className="message-input"
            />
            <button onClick={handleSend} className="send-button">보내기</button>
            <div className="button-group">
                {[1, 2, 3, 4].map(num => (
                    <button key={num} onClick={() => sendMessage(num.toString())} className="option-button">
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default GameOX;
