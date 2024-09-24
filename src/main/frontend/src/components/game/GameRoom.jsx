import React, { useState, useEffect } from 'react';
import './css/GameRoom.css';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import { useNickname } from './context/NicknameContext';

function GameRoom() {
    const [nicknameInput, setNicknameInput] = useState("");
    const [joined, setJoined] = useState(false);
    const [error, setError] = useState(null);
    const { participants, publishMessage, webSocketConnected, connectWebSocket, subscribeToChannel, resetParticipants } = useWebSocket();
    const { setNickname } = useNickname();
    const navigate = useNavigate();

    useEffect(() => {
        if (!webSocketConnected) {
            connectWebSocket();
        }

        let subscription;

        if (webSocketConnected) {
            subscription = subscribeToChannel('/topic/game-start', (message) => {
                try {
                    const parsedMessage = JSON.parse(message.body);

                    if (parsedMessage.questionType) {
                        // 게임 유형에 따라 다른 화면으로 이동
                        if (parsedMessage.questionType === 'ox') {
                            navigate('/player/ox');
                        } else if (parsedMessage.questionType === 'four') {
                            navigate('/player/four');
                        } else if (parsedMessage.questionType === 'shortAnswer') {
                            navigate('/player/short-answer');
                        }
                    }
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            });
        }

        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [webSocketConnected, subscribeToChannel, navigate]);

    const canJoinGame = () => {
        return participants.length < 6; // 예시로 6명으로 제한, 실제로는 서버에서 전달된 최대 인원으로 확인
    };

    const joinGame = () => {
        if (nicknameInput.trim() !== "") {
            if (canJoinGame()) {
                setNickname(nicknameInput);
                if (webSocketConnected) {
                    resetParticipants();
                    publishMessage('/app/join', {
                        gameSessionId: 1,  // 적절한 게임 세션 ID
                        type: "join",
                        nickname: nicknameInput
                    });
                    setJoined(true);
                } else {
                    setError("웹소켓이 연결되지 않았습니다.");
                }
            } else {
                setError("참가자 수가 최대 인원에 도달했습니다.");
            }
        } else {
            setError("닉네임을 입력해주세요.");
        }
    };

    return (
        <div className="game-room-container">
            <h1 className="game-room-title">오신 것을 환영합니다</h1>
            {error && <p className="error-message">{error}</p>}
            {!joined ? (
                <>
                    <input
                        type="text"
                        value={nicknameInput}
                        onChange={(e) => setNicknameInput(e.target.value)}
                        placeholder="닉네임을 입력하세요"
                        className="nickname-input"
                    />
                    <button className="join-game-button" onClick={joinGame} disabled={nicknameInput.trim() === ""}>
                        Join Game
                    </button>
                </>
            ) : (
                <div>
                    <p>게임에 접속되었습니다!</p>
                    <div className="participants-list">
                        <h2>참여자:</h2>
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
