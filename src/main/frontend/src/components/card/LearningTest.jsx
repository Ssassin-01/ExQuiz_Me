// import React, { useState, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../card/css/LearningTest.css';
// import { Modal } from 'react-bootstrap';
//
// const LearningTest = (props) => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { vocabularyItems, testOption } = location.state || { vocabularyItems: [], testOption: 'korean' };
//
//     const [answers, setAnswers] = useState({});
//     const [score, setScore] = useState(null);
//     const [showModal, setShowModal] = useState(false);
//     const [missedWords, setMissedWords] = useState([]);
//     const [okWords, setOkWords] = useState([]);
//     const [graded, setGraded] = useState({}); // 정답/오답 표시 상태 저장
//
//     const inputRefs = useRef([]); // 각 단어 입력란에 대한 참조를 저장할 배열
//
//     // 각 단어 입력란을 참조 배열에 추가
//     const setInputRef = (element, index) => {
//         inputRefs.current[index] = element;
//     };
//
//     // 사용자가 입력한 단어를 업데이트하는 함수
//     const handleChange = (index, value) => {
//         setAnswers({
//             ...answers,
//             [index]: value,
//         });
//     };
//
//     // 각 입력란에서 Enter를 눌렀을 때 다음 입력란으로 포커스 이동
//     const handleKeyDown = (e, index) => {
//         if (e.key === 'Enter') {
//             e.preventDefault(); // 기본 Enter 동작 방지
//             if (index + 1 < vocabularyItems.length) {
//                 inputRefs.current[index + 1].focus(); // 다음 입력란으로 포커스 이동
//             }
//         }
//     };
//
//     // 전체 단어에 대해 채점을 수행하는 함수
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         let correct = 0;
//         const missed = [];
//         const correctAnswers = [];
//         const gradeStatus = {};
//
//         vocabularyItems.forEach((wordPair, index) => {
//             const userAnswer = answers[index] ? answers[index].trim() : '';
//             const correctAnswer = testOption === 'korean' ? wordPair.englishWord : wordPair.koreanWord;
//
//             if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
//                 correct++;
//                 correctAnswers.push(wordPair); // 정답 단어 추가
//                 gradeStatus[index] = 'correct'; // 인덱스별로 정답 처리
//             } else {
//                 missed.push(wordPair); // 오답 단어 추가
//                 gradeStatus[index] = 'incorrect'; // 인덱스별로 오답 처리
//             }
//         });
//
//         setScore(correct);
//         setOkWords(correctAnswers); // 정답 단어 설정
//         setMissedWords(missed); // 오답 단어 설정
//         setGraded(gradeStatus); // 정답/오답 상태 저장
//         setShowModal(true); // 모달 열기
//     };
//     // 오답 단어 학습 재시작 시, 오답 단어만 입력 가능하도록 설정
//     const handleRestartMissedWords = () => {
//         setShowModal(false);
//         const resetGraded = { ...graded };
//
//         // 오답 단어만 입력할 수 있도록 설정하고 정답 입력란은 유지
//         Object.keys(resetGraded).forEach(index => {
//             if (resetGraded[index] === 'correct') {
//                 resetGraded[index] = 'correct'; // 정답은 계속 유지
//             } else {
//                 resetGraded[index] = 'retry'; // 오답은 다시 입력 가능
//             }
//         });
//
//         setGraded(resetGraded); // 수정된 정답/오답 상태 설정
//     };
//
//     // 모달 닫고 Learn 페이지로 돌아가기
//     const handleCancel = () => {
//         setShowModal(false);
//         navigate('/learn', { state: { vocabularyItems } }); // Learn 페이지로 돌아가기
//     };
//
//     return (
//         <div className="testBoxSize">
//             <div className="test-container">
//                 {/* props로 받은 cardTitle 표시 */}
//                 <h1>{props.cardTitle}</h1>
//                 <form onSubmit={handleSubmit}>
//                     <div className="test-word-list">
//                         {vocabularyItems.map((wordPair, index) => (
//                             <div key={index} className="word-item">
//                                 <div className="word-content">
//                                     {/* 정답/오답 채점 */}
//                                     <label style={{ fontWeight: "Bold", display: "flex", justifyContent: "center", alignItems: "center" }}>
//                                         {index + 1}. {testOption === 'korean' ? wordPair.koreanWord : wordPair.englishWord}
//                                         {graded[index] === 'correct' ? (
//                                             <span style={{ color: 'green', marginLeft: '10px' }}>⭕</span>
//                                         ) : graded[index] === 'incorrect' ? (
//                                             <span style={{ color: 'red', marginLeft: '10px' }}>❌</span>
//                                         ) : null}
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={answers[index] || ''}
//                                         onChange={(e) => handleChange(index, e.target.value)}
//                                         onKeyDown={(e) => handleKeyDown(e, index)} // Enter 키 입력 이벤트 추가
//                                         placeholder={testOption === 'korean' ? "영어 단어를 입력하세요" : "한국어 단어를 입력하세요"}
//                                         ref={(element) => setInputRef(element, index)} // 각 입력란에 대한 참조 설정
//                                         disabled={graded[index] === 'correct'} // 정답인 경우 입력 비활성화
//                                     />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                     <button type="submit">제출</button>
//                 </form>
//
//                 {/* 모달창 */}
//                 <Modal show={showModal} onHide={handleCancel}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>시험 결과</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {missedWords.length === 0 ? (
//                             <div>
//                                 <p>학습이 끝났습니다 수고하셨습니다 😊</p>
//                                 <button className="modal-btn" onClick={handleCancel}> 확인 </button>
//                             </div>
//                         ) : (
//                             <>
//                                 <p>정답: {okWords.length}개, 오답: {missedWords.length}개</p>
//                                 <p>틀린 단어를 다시 학습하시겠습니까?</p>
//                                 <button className="modal-btn" onClick={handleRestartMissedWords}>확인</button>
//                                 <button className="modal-btn" onClick={handleCancel}>취소</button>
//                             </>
//                         )}
//                     </Modal.Body>
//                 </Modal>
//             </div>
//         </div>
//     );
// };
//
// export default LearningTest;

import React, { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import '../card/css/LearningTest.css';
import card from "../pra/Card";
import { Modal } from 'react-bootstrap';

const LearningTest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vocabularyItems, testOption } = location.state || { vocabularyItems: [], testOption: 'korean' };

    const [answers, setAnswers] = useState({});
    const [score, setScore] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [missedWords, setMissedWords] = useState([]);
    const [okWords, setOkWords] = useState([]);
    const [graded, setGraded] = useState({}); // 정답/오답 표시 상태 저장

    const handleChange = (index, value) => {
        setAnswers({
            ...answers,
            [index]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let correct = 0;
        const missed = [];
        const correctAnswers = [];
        const gradeStatus = {};

        vocabularyItems.forEach((wordPair, index, card) => {
            const userAnswer = answers[index] ? answers[index].trim() : '';
            const correctAnswer = testOption === 'korean' ? wordPair.englishWord : wordPair.koreanWord;

            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                correct++;
                correctAnswers.push(wordPair); // 정답 단어 추가
                gradeStatus[index] = 'correct'; // 인덱스별로 정답 처리
            } else {
                missed.push(wordPair); // 오답 단어 추가
                gradeStatus[index] = 'incorrect'; // 인덱스별로 오답 처리
            }
        });

        setScore(correct);
        setOkWords(correctAnswers); // 정답 단어 설정
        setMissedWords(missed); // 오답 단어 설정
        setGraded(gradeStatus); // 정답/오답 상태 저장
        setShowModal(true); // 모달 열기
    };
        // 모달 닫고 Learn 페이지로 돌아가기
    const handleCancel = () => {
        setShowModal(false);
        navigate('/learn', { state: { vocabularyItems } }); // Learn 페이지로 돌아가기
    };
    const close = () =>{
        setShowModal(false);
        console.log("모달 닫기");
    }

    return (
        <div className="testBoxSize">
            <div className="test-container">
                <h1>{card.cardTitle}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="test-word-list">
                        {vocabularyItems.map((wordPair, index) => (
                            <div key={index} className="word-item">
                                <div className="word-content">
                                    {/* 정답/오답 채점 */}
                                    <label style={{ fontWeight: "Bold", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        {index + 1}. {testOption === 'korean' ? wordPair.koreanWord : wordPair.englishWord}
                                        {graded[index] === 'correct' ? (
                                            <span style={{ color: 'red', marginLeft: '10px' }}>⭕</span>
                                        ) : graded[index] === 'incorrect' ? (
                                            <span style={{ color: 'red', marginLeft: '10px' }}>❌</span>
                                        ) : null}
                                    </label>

                                    <input
                                        className="test-input-box"
                                        type="text"
                                        value={answers[index] || ''}
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        placeholder={testOption === 'korean' ? "영어 단어를 입력하세요" : "한국어 단어를 입력하세요"}
                                        disabled={graded[index] === 'correct'} // 정답인 경우 입력 비활성화
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="submit">제출</button>
                </form>

                {/* 모달창 */}
                <Modal show={showModal} onHide={close}>
                    <Modal.Header closeButton>
                        <Modal.Title>시험 결과</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {missedWords.length === 0 ? (
                            <div>
                                <p>학습이 끝났습니다 수고하셨습니다😊</p>
                                <button className="modal-btn" onClick={close}> 확인 </button>
                            </div>
                        ) : (
                            <>
                                <p>정답: {okWords.length}개, 오답: {missedWords.length}개</p>
                                <p>틀린 단어를 다시 학습하시겠습니까?</p>
                                <button className="modal-btn" onClick={close}>확인</button>
                                <button className="modal-btn" onClick={handleCancel}>취소</button>
                            </>
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default LearningTest;
