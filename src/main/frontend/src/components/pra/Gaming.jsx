// import React, { useEffect, useState, useRef } from 'react';
// import { useWebSocket } from './context/WebSocketContext';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './css/Gaming.css';
//
// function Gaming() {
//     const { subscribeToChannel, webSocketConnected, participants, publishMessage, disconnectWebSocket } = useWebSocket();
//     const [questions, setQuestions] = useState([]);
//     const currentQuestionIndex = useRef(0);
//     const [currentQuestion, setCurrentQuestion] = useState(null);
//     const [options, setOptions] = useState([]);
//     const [messages, setMessages] = useState({});
//     const [feedback, setFeedback] = useState("");
//     const [scores, setScores] = useState({});
//     const [gameEnded, setGameEnded] = useState(false);
//     const [results, setResults] = useState([]);
//     const navigate = useNavigate();
//
//     const apiUrl = process.env.REACT_APP_API_URL;
//
//     const fetchQuestion = async () => {
//         try {
//             const response = await axios.get(`${apiUrl}/api/game/card/1/items`);
//             console.log('Fetched items:', response.data);
//             setQuestions(response.data);
//             if (response.data.length > 0) {
//                 const initialQuestion = response.data[0];
//                 setCurrentQuestion(initialQuestion);
//                 const generatedOptions = generateOptions(initialQuestion, response.data);
//                 setOptions(generatedOptions);
//                 publishMessage('/topic/options', generatedOptions);
//             }
//         } catch (error) {
//             console.error('Error fetching question:', error);
//         }
//     };
//
//     useEffect(() => {
//         fetchQuestion();
//     }, []);
//
//     useEffect(() => {
//         if (webSocketConnected) {
//             const subscription = subscribeToChannel('/topic/answers', (message) => {
//                 const receivedMessage = JSON.parse(message.body);
//                 console.log(`Received message: ${receivedMessage.text} from nickname: ${receivedMessage.nickname}`);
//                 if (currentQuestion) {
//                     checkAnswer(receivedMessage.nickname, receivedMessage.text);
//                 } else {
//                     console.error('Current question is not set');
//                 }
//                 setMessages(prevMessages => ({
//                     ...prevMessages,
//                     [receivedMessage.nickname]: receivedMessage.text
//                 }));
//             });
//
//             return () => {
//                 if (subscription) subscription.unsubscribe();
//             };
//         }
//     }, [webSocketConnected, subscribeToChannel, currentQuestion, options]);
//
//     useEffect(() => {
//         if (questions.length > 0) {
//             const currentQ = questions[currentQuestionIndex.current];
//             setCurrentQuestion(currentQ);
//             const allOptions = questions.map((q) => q.englishWord);
//             const currentOptions = generateOptions(currentQ, allOptions);
//             setOptions(currentOptions);
//             publishMessage('/topic/options', currentOptions);
//         }
//     }, [questions]);
//
//     const generateOptions = (question, allOptions) => {
//         const correctOption = question.englishWord;
//         const incorrectOptions = allOptions.filter(option => option !== correctOption);
//         const shuffledOptions = [correctOption, ...incorrectOptions.slice(0, 3)].sort(() => 0.5 - Math.random());
//         return shuffledOptions;
//     };
//
//     const checkAnswer = (nickname, answer) => {
//         if (!currentQuestion) {
//             console.error('Current question is not set');
//             return;
//         }
//
//         if (answer === currentQuestion.englishWord) {
//             setFeedback("정답!");
//             setScores(prevScores => ({
//                 ...prevScores,
//                 [nickname]: (prevScores[nickname] || 0) + 1
//             }));
//             setTimeout(() => {
//                 setFeedback("");
//                 nextQuestion();
//             }, 1000); // 1초 후에 다음 문제로 이동
//         } else {
//             setFeedback("틀림!");
//             setTimeout(() => {
//                 setFeedback("");
//             }, 1000); // 1초 후에 틀림 표시 제거
//         }
//     };
//
//     const nextQuestion = () => {
//         if (currentQuestionIndex.current < questions.length - 1) {
//             currentQuestionIndex.current++;
//             const nextQ = questions[currentQuestionIndex.current];
//             setCurrentQuestion(nextQ);
//             const newOptions = generateOptions(nextQ, questions.map((q) => q.englishWord));
//             setOptions(newOptions);
//             publishMessage('/topic/options', newOptions);
//         } else {
//             endGame();
//         }
//     };
//
//     const endGame = () => {
//         setGameEnded(true);
//         const resultsArray = Object.keys(scores).map(nickname => ({
//             nickname,
//             score: scores[nickname]
//         })).sort((a, b) => b.score - a.score);
//         setResults(resultsArray);
//     };
//
//     const handleOptionClick = (option) => {
//         checkAnswer(null, option);
//     };
//
//     const handleExit = () => {
//         publishMessage('/topic/game-end', { message: 'Game has ended' });
//         disconnectWebSocket();
//         navigate('/');
//         window.location.reload();
//     };
//
//     if (gameEnded) {
//         return (
//             <div className="gaming-container">
//                 <h1 className="gaming-h1">Game Results</h1>
//                 <div className="gaming-results-container">
//                     {results.map((result, index) => (
//                         <div key={index} className="gaming-result-item">
//                             <span>{index + 1}등: {result.nickname}, 맞춘 갯수: {result.score}개</span>
//                         </div>
//                     ))}
//                 </div>
//                 <button onClick={handleExit} className="gaming-exit-button">나가기</button>
//             </div>
//         );
//     }
//
//     if (!currentQuestion) {
//         return <div>Loading...</div>;
//     }
//
//     return (
//         <div className="gaming-container">
//             <h1 className="gaming-h1">Game</h1>
//             <div className="gaming-main-content">
//                 <div className="gaming-participants-container">
//                     {participants.slice(0, Math.ceil(participants.length / 2)).map((participant) => (
//                         <div key={participant} className="gaming-participant-box">
//                             <div className="gaming-participant-icon">👤</div>
//                             <div className="gaming-participant-nickname">{participant}</div>
//                             {messages[participant] && (
//                                 <div className="gaming-participant-message">{messages[participant]}</div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//                 <div className="gaming-center-container">
//                     <div className="gaming-progress-indicator">
//                         {currentQuestionIndex.current + 1}/{questions.length}
//                     </div>
//                     <div className="gaming-question-container">
//                         <div className="gaming-question-text">
//                             {currentQuestion.koreanWord}
//                         </div>
//                         <div className="gaming-options-container">
//                             {options.map((option, index) => (
//                                 <button key={index} onClick={() => handleOptionClick(option)}
//                                         className="gaming-option-button">
//                                     {typeof option === 'object' ? JSON.stringify(option) : option}
//                                 </button>
//                             ))}
//                         </div>
//                         <div className="gaming-feedback">{feedback}</div>
//                     </div>
//                 </div>
//                 <div className="gaming-participants-container">
//                     {participants.slice(Math.ceil(participants.length / 2)).map((participant) => (
//                         <div key={participant} className="gaming-participant-box">
//                             <div className="gaming-participant-icon">👤</div>
//                             <div className="gaming-participant-nickname">{participant}</div>
//                             {messages[participant] && (
//                                 <div className="gaming-participant-message">{messages[participant]}</div>
//                             )}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <button onClick={handleExit} className="gaming-exit-button">나가기</button>
//         </div>
//     );
// }
//
// export default Gaming;
