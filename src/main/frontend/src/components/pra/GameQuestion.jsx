// import React, { useState, useRef, useEffect } from 'react';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import { useNickname } from './context/NicknameContext';
// import './css/trash/GameQuestion.css';
//
// function GameQuestion() {
//     const [message, setMessage] = useState("");
//     const [gameEnded, setGameEnded] = useState(false);
//     const { nickname } = useNickname();
//     const clientRef = useRef(null);
//     const apiUrl = `${window.location.origin}`.replace(/^ws/, 'http');
//
//     const sendMessage = () => {
//         if (clientRef.current && clientRef.current.connected) {
//             clientRef.current.publish({
//                 destination: '/app/answer',
//                 body: JSON.stringify({
//                     text: message,
//                     nickname: nickname,
//                 })
//             });
//             console.log(`Sent message: ${message} from nickname: ${nickname}`);
//             setMessage("");
//         }
//     };
//
//     useEffect(() => {
//         if (!clientRef.current) {
//             const client = new Client({
//                 webSocketFactory: () => new SockJS(`${apiUrl}/ws`),
//                 connectHeaders: {},
//                 debug: function (str) {
//                     console.log('Debug: ', str);
//                 },
//                 reconnectDelay: 5000,
//                 heartbeatIncoming: 4000,
//                 heartbeatOutgoing: 4000,
//                 onConnect: () => {
//                     console.log('Connected to WebSocket');
//                     client.subscribe('/topic/game-end', () => {
//                         setGameEnded(true);
//                         client.deactivate(() => {
//                             console.log('Disconnected from WebSocket');
//                         });
//                     });
//                 },
//                 onStompError: (frame) => {
//                     console.error('Broker reported error: ' + frame.headers['message']);
//                     console.error('Additional details: ' + frame.body);
//                 },
//                 onWebSocketClose: () => {
//                     console.log('WebSocket connection closed');
//                 }
//             });
//             client.activate();
//             clientRef.current = client;
//         }
//
//         return () => {
//             if (clientRef.current && clientRef.current.active) {
//                 clientRef.current.deactivate(() => {
//                     console.log('Disconnected from WebSocket');
//                 });
//             }
//         };
//     }, [apiUrl]);
//
//     if (gameEnded) {
//         return (
//             <div className="game-question-container game-ended">
//                 <h1>게임이 종료되었습니다.</h1>
//             </div>
//         );
//     }
//
//     return (
//         <div className="game-question-container">
//             <div className="game-question-content">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="정답을 입력하세요"
//                     className="message-input"
//                 />
//                 <button onClick={sendMessage} className="send-button">보내기</button>
//             </div>
//         </div>
//     );
// }
//
// export default GameQuestion;
