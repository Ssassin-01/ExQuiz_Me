import React, { useState, useRef, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import './css/GameOX.css';
import { useNickname } from '../context/NicknameContext';

function PlayerFour() {
    const { nickname } = useNickname();
    const apiUrl = process.env.REACT_APP_API_URL.replace(/^ws/, 'http');
    const clientRef = useRef(null);
    const [options, setOptions] = useState([]);
    const [gameEnded, setGameEnded] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);  // 버튼 연속 클릭 방지

    const sendMessage = (text) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: '/app/answer',
                body: JSON.stringify({
                    text: text,  // 전송되는 메시지를 옵션 번호로 설정
                    nickname: nickname,
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
                    console.log('Debug: ', str);
                },
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: () => {
                    console.log('Connected to WebSocket');

                    // 새로운 문제가 나왔을 때 버튼 다시 활성화
                    client.subscribe('/topic/new-question', () => {
                        console.log("New question received, enabling buttons.");
                        setButtonDisabled(false);  // 새로운 질문에서 버튼 다시 활성화
                    });

                    // 선택지를 받아서 설정
                    client.subscribe('/topic/options', (message) => {
                        const receivedOptions = JSON.parse(message.body);
                        console.log('Received options:', receivedOptions);
                        setOptions(receivedOptions);
                        setButtonDisabled(false);  // 새로운 선택지가 오면 버튼 다시 활성화
                    });

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

    const handleOptionSend = (index) => {
        if (!buttonDisabled) {  // 버튼이 활성화된 상태에서만 동작
            sendMessage(index);  // 클릭한 버튼의 인덱스를 전송 (0부터 시작)
            setButtonDisabled(true);  // 클릭 후 버튼 비활성화
        }
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
                <div className="button-group">
                    {[1, 2, 3, 4].map(num => (
                        <button
                            key={num}
                            onClick={() => handleOptionSend(num - 1)}
                            className="option-button"
                            disabled={buttonDisabled}  // 비활성화 상태에 따라 버튼 동작 제어
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlayerFour;
