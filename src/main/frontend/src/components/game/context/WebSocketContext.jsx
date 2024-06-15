import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
    const clientRef = useRef(null);
    const [participants, setParticipants] = useState([]);
    const [webSocketConnected, setWebSocketConnected] = useState(false);
    const apiUrl = process.env.REACT_APP_API_URL.replace(/^ws/, 'http');

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
                    client.subscribe('/topic/participants', (message) => {
                        const participantUpdate = JSON.parse(message.body);
                        if (participantUpdate && participantUpdate.participants) {
                            setParticipants(participantUpdate.participants);
                            console.log("Participants updated:", participantUpdate.participants);
                        }
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

    const disconnectWebSocket = () => {
        if (clientRef.current && clientRef.current.active) {
            clientRef.current.deactivate(() => {
                console.log('Disconnected from WebSocket');
                setParticipants([]); // Clear participants on manual disconnect
            });
        }
    };

    const publishMessage = (destination, body) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination,
                body: JSON.stringify(body),
            });
        }
    };

    const subscribeToChannel = (channel, callback) => {
        if (clientRef.current && clientRef.current.connected) {
            return clientRef.current.subscribe(channel, callback);
        }
    };

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
        <WebSocketContext.Provider value={{ participants, connectWebSocket, disconnectWebSocket, publishMessage, subscribeToChannel, unsubscribeFromChannel, webSocketConnected }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
