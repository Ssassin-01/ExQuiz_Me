import React, { useState, useEffect } from 'react';
import './css/GameRoom.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWebSocket } from './context/WebSocketContext';
import { useNickname } from './context/NicknameContext';
import axios from 'axios';

function GameRoom() {
    const [nicknameInput, setNicknameInput] = useState('');
    const [joined, setJoined] = useState(false);
    const [error, setError] = useState(null);
    const { participants, publishMessage, webSocketConnected, connectWebSocket, subscribeToChannel } = useWebSocket();
    const { setNickname } = useNickname();
    const navigate = useNavigate();
    const location = useLocation();

    // URL의 쿼리 파라미터에서 gameSessionId(roomId)를 추출
    const getGameSessionIdFromQuery = () => {
        const params = new URLSearchParams(location.search);
        return params.get('roomId'); // roomId로 전달된 값 사용
    };

    const [gameSessionId, setGameSessionId] = useState(getGameSessionIdFromQuery());

    // 유효한 gameSessionId가 없으면 에러 처리
    useEffect(() => {
        if (!gameSessionId) {
            setError("유효한 게임 세션 ID가 없습니다. 다시 게임을 생성해주세요.");
        }
    }, [gameSessionId]);

    // WebSocket 연결 및 구독 설정
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

    // 게임 참가 함수
    const joinGame = async () => {
        if (nicknameInput.trim() !== "") {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/game-sessions/${gameSessionId}/participants`);
                const participants = response.data;

                if (participants.includes(nicknameInput)) {
                    setError("닉네임이 이미 사용 중입니다.");
                } else if (participants.length < 10) {
                    setNickname(nicknameInput);

                    await axios.post(`${process.env.REACT_APP_API_URL}/api/game-sessions/${gameSessionId}/add-participant`, {
                        nickname: nicknameInput
                    });

                    // WebSocket을 통해 참가자 목록 전송
                    publishMessage('/app/join', { gameSessionId, nickname: nicknameInput });

                    // 참가자 목록 업데이트 알림 (참가자 목록을 WebSocket을 통해 다른 클라이언트에게도 전송)
                    publishMessage('/topic/participants', { participants: [...participants, nicknameInput] });

                    setJoined(true);
                    setError(null);
                } else {
                    setError("참가자 수가 최대 인원에 도달했습니다.");
                }
            } catch (error) {
                setError("게임 세션에 참가하는 중 오류가 발생했습니다.");
                console.error(error);
            }
        } else {
            setError("닉네임을 입력해주세요.");
        }
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
                            <h2>Participants ({participants.length}/10)</h2>
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
