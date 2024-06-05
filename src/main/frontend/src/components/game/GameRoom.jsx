import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import './css/GameRoom.css';

const apiUrl = process.env.REACT_APP_API_URL.replace(/^http/, 'ws').replace(/^https/, 'wss');
const client = new W3CWebSocket(`${apiUrl}/ws`);

function GameRoom() {
    const [isConnected, setIsConnected] = useState(false);
    const [nickname, setNickname] = useState("");
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
            setIsConnected(true);
        };
        client.onclose = () => {
            console.log('WebSocket Client Disconnected');
            setIsConnected(false);
        };
    }, []);

    const joinGame = () => {
        if (client.readyState === client.OPEN && nickname.trim() !== "") {
            client.send(JSON.stringify({
                type: "join",
                nickname: nickname
            }));
            setJoined(true);
        } else {
            console.error("WebSocket connection is not open or nickname is empty.");
        }
    };

    return (
        <div className="game-room-container">
            <h1 className="game-room-title">Welcome to the Game Room</h1>
            {!joined ? (
                <>
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="Enter your nickname"
                        className="nickname-input"
                    />
                    <button className="join-game-button" onClick={joinGame} disabled={!isConnected || nickname.trim() === ""}>
                        {isConnected ? "접속하기" : "연결 중..."}
                    </button>
                </>
            ) : (
                <p>게임에 접속되었습니다.</p>
            )}
        </div>
    );
}

export default GameRoom;
