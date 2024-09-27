import React, { useState, useEffect } from 'react';
import './css/GameRoom.css';
import { useNavigate } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import { useNickname } from './context/NicknameContext';
import axios from 'axios';

function GameRoom() {
    const [nicknameInput, setNicknameInput] = useState('');
    const [joined, setJoined] = useState(false);
    const [error, setError] = useState(null);
    const { participants, publishMessage, webSocketConnected, connectWebSocket, subscribeToChannel, resetParticipants } = useWebSocket();
    const { setNickname } = useNickname();
    const navigate = useNavigate();
    const maxParticipants = 10;

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
                        switch (parsedMessage.questionType) {
                            case 'ox':
                                navigate('/player/ox');
                                break;
                            case 'four':
                                navigate('/player/four');
                                break;
                            case 'shortAnswer':
                                navigate('/player/short-answer');
                                break;
                            default:
                                break;
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

    const canJoinGame = () => participants.length < maxParticipants;

    const joinGame = () => {
        if (nicknameInput.trim() !== "") {
            if (!checkNicknameDuplicate()) {
                return;  // 닉네임 중복이면 게임에 참가하지 않음
            }

            if (participants.length < maxParticipants) {
                setNickname(nicknameInput);
                if (webSocketConnected) {
                    // API 요청을 보냄
                    axios.post(`${process.env.REACT_APP_API_URL}/api/game-sessions/add-participant`, {
                        gameSessionId: 1,  // 실제 게임 세션 ID 사용
                        nickname: nicknameInput  // 닉네임을 전달
                    })
                        .then((response) => {
                            // 참가자 추가 성공 처리
                            publishMessage('/app/join', {
                                gameSessionId: 1,
                                type: "join",
                                nickname: nicknameInput
                            });
                            setJoined(true);
                            setError(null); // 성공 시 에러 메시지 초기화
                        })
                        .catch((error) => {
                            // 에러 처리 (예: 인원 제한 또는 중복 닉네임)
                            if (error.response && error.response.status === 400) {
                                setError(error.response.data); // 서버에서 오는 에러 메시지를 그대로 출력
                            } else {
                                setError("게임 참가에 실패했습니다.");
                            }
                        });
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

    const checkNicknameDuplicate = () => {
        if (participants.includes(nicknameInput)) {
            setError("닉네임이 이미 사용 중입니다.");
            return false;
        }
        return true;
    };

    return (
        <div className="game-room-container">
            <div className="game-room-card">
                <h1 className="game-room-title">Game Room</h1>
                {error && <p className="error-message">{error}</p>}
                {!joined ? (
                    <div className="join-section">
                        <input
                            type="text"
                            value={nicknameInput}
                            onChange={(e) => setNicknameInput(e.target.value)}
                            placeholder="닉네임을 입력해주세요!"
                            className="nickname-input"
                        />
                        <button className="join-game-button" onClick={joinGame} disabled={nicknameInput.trim() === ''}>
                            게임 참여하기
                        </button>
                    </div>
                ) : (
                    <div className="participants-section">
                        <p>게임 시작 대기중</p>
                        <div className="participants-list">
                            <h2>Participants ({participants.length}/{maxParticipants})</h2>
                            <div className="participants-grid">
                                {participants.map((participant, index) => (
                                    <div key={index} className="participant-card">
                                        {participant}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
export default GameRoom;
