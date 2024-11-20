// import React, { useState, useRef, useEffect } from 'react';
// import { Client } from '@stomp/stompjs';
// import SockJS from 'sockjs-client';
// import './player/css/GameOX.css';
// import { useNickname } from './context/NicknameContext';
//
// function GameOX() {
//     const [message, setMessage] = useState("");
//     const { nickname } = useNickname();
//     const apiUrl = `${window.location.origin}`.replace(/^ws/, 'http');
//     const clientRef = useRef(null);
//     const [options, setOptions] = useState([]);
//     const [gameEnded, setGameEnded] = useState(false);
//
//     const sendMessage = (text) => {
//         if (clientRef.current && clientRef.current.connected) {
//             clientRef.current.publish({
//                 destination: '/app/answer',
//                 body: JSON.stringify({
//                     text: text,
//                     nickname: nickname,
//                 })
//             });
//             console.log(`Sent message: ${text} from nickname: ${nickname}`);
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
//                     client.subscribe('/topic/options', (message) => {
//                         const receivedOptions = JSON.parse(message.body);
//                         console.log('Received options:', receivedOptions);
//                         setOptions(receivedOptions);
//                     });
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
//     const handleSend = () => {
//         sendMessage(message);
//         setMessage("");
//     };
//
//     const handleOptionSend = (index) => {
//         if (options[index]) {
//             sendMessage(options[index]);
//         } else {
//             console.log(`No option available at index: ${index}`);
//         }
//     };
//
//     if (gameEnded) {
//         return (
//             <div className="game-ox-container game-ox-ended">
//                 <h1>게임이 종료되었습니다.</h1>
//             </div>
//         );
//     }
//
//     return (
//         <div className="game-ox-container">
//             <div className="game-ox-content">
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="정답 날리기"
//                     className="message-input"
//                 />
//                 <button onClick={handleSend} className="send-button">보내기</button>
//                 <div className="button-group">
//                     {[1, 2, 3, 4].map(num => (
//                         <button key={num} onClick={() => handleOptionSend(num - 1)} className="option-button">
//                             {num}
//                         </button>
//                     ))}
//                 </div>
//                 {gameEnded && (
//                     <div className="game-ended-overlay">
//                         <div className="game-ended-message">게임이 종료되었습니다.</div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }
//
// export default GameOX;
