import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const clientRef = useRef(null);
    const [participants, setParticipants] = useState([]);
    const [webSocketConnected, setWebSocketConnected] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL.replace(/^ws/, 'http');
    const [isQuestionTransitioning, setIsQuestionTransitioning] = useState(false); // 중복 호출 방지용 플래그


    // 웹소켓 연결 함수
    const connectWebSocket = () => {
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
                    setWebSocketConnected(true);

                    // 참가자 목록을 구독
                    client.subscribe('/topic/participants', (message) => {
                        const participantUpdate = JSON.parse(message.body);
                        if (participantUpdate && participantUpdate.participants) {
                            setParticipants(participantUpdate.participants);
                            console.log("Participants updated:", participantUpdate.participants);
                        }
                    });

                    // 게임 종료 시 참가자 목록 초기화
                    client.subscribe('/topic/game-end', () => {
                        console.log('Game ended, clearing participants.');
                        resetParticipants();  // 게임 종료 시 참가자 목록 초기화
                    });
                },
                onStompError: (frame) => {
                    console.error('Broker reported error: ' + frame.headers['message']);
                    console.error('Additional details: ' + frame.body);
                },
                onWebSocketClose: () => {
                    console.log('WebSocket connection closed');
                    setWebSocketConnected(false);
                    setParticipants([]); // Clear participants on disconnect
                }
            });
            client.activate();
            clientRef.current = client;
        }
    };

    // 문항 이동 시작 시 호출
    const startQuestionTransition = () => {
        if (!isQuestionTransitioning) {
            setIsQuestionTransitioning(true);
            setTimeout(() => setIsQuestionTransitioning(false), 1000);  // 1초 동안 문항 이동 중으로 설정
        }
    };

    // 문항 이동이 가능한지 확인
    const canTransitionToNextQuestion = () => {
        return !isQuestionTransitioning;  // 현재 문항 이동 중이 아닌 경우에만 이동 가능
    };

    // 웹소켓 연결 해제 함수
    const disconnectWebSocket = () => {
        if (clientRef.current && clientRef.current.active) {
            clientRef.current.deactivate(() => {
                console.log('Disconnected from WebSocket');
                setParticipants([]); // Clear participants on manual disconnect
            });
        }
    };

    // 참가자 목록 초기화 함수
    const resetParticipants = () => {
        setParticipants([]); // Clear participants manually
    };

    // 메시지 전송 함수
    const publishMessage = (destination, body) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination,
                body: JSON.stringify(body),
            });
        }
    };

    // 채널 구독 함수
    const subscribeToChannel = (channel, callback) => {
        if (clientRef.current && clientRef.current.connected) {
            return clientRef.current.subscribe(channel, callback);
        }
    };

    // 채널 구독 해제 함수
    const unsubscribeFromChannel = (subscription) => {
        if (subscription) {
            subscription.unsubscribe();
        }
    };

    useEffect(() => {
        return () => {
            disconnectWebSocket();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={{
            participants,
            connectWebSocket,
            disconnectWebSocket,
            resetParticipants,
            publishMessage,
            subscribeToChannel,
            unsubscribeFromChannel,
            webSocketConnected,
            canTransitionToNextQuestion, // 문항 이동 가능 여부 함수 추가
            startQuestionTransition // 문항 이동 시작 함수 추가
        }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
