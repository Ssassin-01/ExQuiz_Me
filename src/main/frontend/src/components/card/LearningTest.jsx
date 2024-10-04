import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap'; // 모달 컴포넌트 추가
import '../card/css/LearningTest.css';
import card from "../pra/Card";

// import card from './Card';


const LearningTest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vocabularyItems, testOption, graded: gradedFromResult, answers: answersFromResult } = location.state || { vocabularyItems: [], testOption: 'korean' };

    const [answers, setAnswers] = useState(answersFromResult || {}); // 이전 입력 값을 유지
    const [graded, setGraded] = useState(gradedFromResult || {}); // 이전 graded 상태 유지
    const [missedWords, setMissedWords] = useState([]); // 오답 항목 저장
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태

    // 입력값 변경 처리
    const handleChange = (index, value) => {
        setAnswers({
            ...answers,
            [index]: value,
        });
    };

    // 빈 입력값이 있는지 확인하는 함수
    const checkEmptyInputs = () => {
        return vocabularyItems.some((_, index) => !answers[index] && graded[index] !== 'correct');
    };

    // 모달 창 닫기 함수
    const handleCloseModal = () => {
        setShowModal(false);
    };

    // 제출 시 오답 항목만 채점하여 정답/오답 여부를 업데이트
    const handleSubmit = (e) => {
        e.preventDefault();

        // 빈 입력값이 있는지 체크하고, 있을 경우 모달 창 띄우기
        if (checkEmptyInputs()) {
            setShowModal(true);
            return;
        }

        let correct = 0;
        const missed = [];
        const correctAnswers = {};
        const gradeStatus = { ...graded }; // 기존 graded 상태를 복사하여 유지

        vocabularyItems.forEach((wordPair, index) => {
            if (graded[index] === 'correct') {
                // 이미 정답으로 판정된 항목은 유지
                correct++;
                correctAnswers[index] = wordPair;
                return;
            }

            const userAnswer = answers[index] ? answers[index].trim() : '';
            const correctAnswer = testOption === 'korean' ? wordPair.englishWord : wordPair.koreanWord;

            // 빈 입력값이 아닌 경우에만 정답 확인
            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                correct++;
                correctAnswers[index] = wordPair;
                gradeStatus[index] = 'correct';
            } else {
                missed.push(wordPair); // 잘못된 입력값이 있는 항목도 오답으로 분류
                gradeStatus[index] = 'incorrect';
            }
        });

        setMissedWords(missed);
        setGraded(gradeStatus);

        // 결과 페이지로 이동
        navigate('/learn-test-result', {
            state: {
                okWords: Object.values(correctAnswers),
                missedWords, // 오답 항목 전달
                vocabularyItems,
                testOption,
                graded: gradeStatus, // 업데이트된 graded 상태 전달
                answers, // 현재 사용자가 입력한 모든 답안 전달
            },
        });
    };

    return (
        <div className="testBoxSize">
            <div className="test-container">
                <h1>{card.cardTitle}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="test-word-list">
                        {vocabularyItems.map((wordPair, index) => (
                            <div key={index} className="word-item">
                                <div className="word-content">
                                    <label style={{ fontWeight: 'Bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {index + 1}. {testOption === 'korean' ? wordPair.koreanWord : wordPair.englishWord}
                                        {graded[index] === 'correct' ? (
                                            <span style={{ color: 'green', marginLeft: '10px' }}>⭕</span>
                                        ) : graded[index] === 'incorrect' ? (
                                            <span style={{ color: 'red', marginLeft: '10px' }}>❌</span>
                                        ) : null}
                                    </label>
                                    <input
                                        className="test-input-box"
                                        type="text"
                                        value={answers[index] || ''} // 이전 답안을 유지
                                        onChange={(e) => handleChange(index, e.target.value)}
                                        placeholder={testOption === 'korean' ? '영어 단어를 입력하세요' : '한국어 단어를 입력하세요'}
                                        disabled={graded[index] === 'correct'} // 정답으로 처리된 항목은 입력 비활성화
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <button type="submit">제출</button>
                </form>

                {/* 모달 창 */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>경고</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>값을 입력해주세요!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default LearningTest;
