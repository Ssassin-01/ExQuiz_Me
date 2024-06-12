import React, { useEffect, useState } from 'react';
import { useWebSocket } from './context/WebSocketContext';
import './css/Gaming.css';

function Gaming() {
    const { participants, subscribeToChannel } = useWebSocket();
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const subscription = subscribeToChannel('/topic/answers', (message) => {
            const answer = JSON.parse(message.body);
            console.log("Answer received from:", answer.nickname, "Message:", answer.text);
            setMessages((prevMessages) => ({
                ...prevMessages,
                [answer.nickname]: answer.text,
            }));
            setTimeout(() => {
                setMessages((prevMessages) => {
                    const updatedMessages = { ...prevMessages };
                    delete updatedMessages[answer.nickname];
                    return updatedMessages;
                });
            }, 2000);
        });

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [subscribeToChannel]);

    return (
        <div className="gaming-container">
            <div className="question-box">
                <div className="question">Question</div>
            </div>
            <div className="participants-container">
                {participants.map((participant, index) => (
                    <div key={index} className={`participant-box participant-${index}`}>
                        <div className="nickname">{participant}</div>
                        {messages[participant] && (
                            <div className="message-bubble">{messages[participant]}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Gaming;
