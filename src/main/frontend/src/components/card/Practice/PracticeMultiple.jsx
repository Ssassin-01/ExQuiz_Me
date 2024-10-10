import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/PracticeMultiple.css';
import { ImExit } from "react-icons/im";


const PracticeMultiple = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vocabularyItems: initialVocabularyItems = [], selectedLanguage = 'english' } = location.state || {};
    const [vocabularyItems, setVocabularyItems] = useState(initialVocabularyItems);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [options, setOptions] = useState([]);
    const [isOptionDisabled, setIsOptionDisabled] = useState(false); // 버튼 비활성화 상태 관리
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [missedWords, setMissedWords] = useState([]);
    const [okWords, setOkWords] = useState([]);

    const currentWord = vocabularyItems[currentWordIndex];
    const correctAnswer = currentWord ? (selectedLanguage === 'english' ? currentWord.englishWord : currentWord.koreanWord) : '';

    // 학습이 완료된 경우 모달 표시
    useEffect(() => {
        if (currentWordIndex >= vocabularyItems.length) {
            setShowModal(true);
        }
    }, [currentWordIndex, vocabularyItems.length]);

    // 보기 항목 생성 함수
    const generateOptions = () => {
        if (currentWord) {
            const correctOption = correctAnswer;
            const otherOptions = vocabularyItems
                .filter((word) => word !== currentWord)
                .map((word) => (selectedLanguage === 'english' ? word.englishWord : word.koreanWord))
                .sort(() => 0.5 - Math.random())
                .slice(0, 3);
            const allOptions = [correctOption, ...otherOptions].sort(() => 0.5 - Math.random());
            setOptions(allOptions);
        }
    };

    useEffect(() => {
        generateOptions();
    }, [currentWordIndex, currentWord]);

    // 사용자가 정답을 선택했을 때 동작
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        const isCorrectAnswer = option === correctAnswer;
        setIsCorrect(isCorrectAnswer);

        // 오답인 경우, 깜빡이기 효과를 추가하고 오답 단어 목록에 추가
        if (!isCorrectAnswer) {
            setMissedWords((prev) => [...prev, currentWord]);

            // 정답에 깜빡이기 효과 추가
            const correctElement = document.querySelector(`button[data-option="${correctAnswer}"]`);
            if (correctElement) {
                correctElement.classList.add('blink-correct');
            }

            // 2초 후에 깜빡이기 효과 제거 및 다음 단어로 이동
            setTimeout(() => {
                if (correctElement) {
                    correctElement.classList.remove('blink-correct');
                }
                handleNextWord();
            }, 2000);
        } else {
            setOkWords((prev) => [...prev, currentWord]);
            setTimeout(() => {
                handleNextWord();
            }, 2000);
        }
    };

    // 다음 단어로 이동하는 함수
    const handleNextWord = () => {
        if (currentWordIndex < vocabularyItems.length - 1) {
            setSelectedOption(null);
            setIsCorrect(null);
            setCurrentWordIndex((prev) => prev + 1);
        } else {
            setShowModal(true);
        }
    };

    // 틀린 단어 다시 학습하기
    const handleRestartMissedWords = () => {
        setVocabularyItems(missedWords);
        setShowModal(false);
        setCurrentWordIndex(0);
        setOkWords([]);
        setMissedWords([]);

        // 상태 초기화
        setSelectedOption(null);
        setIsCorrect(null);
        setIsOptionDisabled(false);
        generateOptions(); // 옵션 초기화
    };

    // 모달 창 닫기 및 학습 종료
    const handleCancel = () => {
        setShowModal(false);
        navigate('/study');
    };

    return (
        <div className="practice-container">
            <ImExit className="end-button" onClick={handleCancel}/>

            <div className="learn__word-counter">{`${Math.min(currentWordIndex + 1, vocabularyItems.length)} / ${vocabularyItems.length}`}</div>
            <p className="practice-question">
                {selectedLanguage === 'english' ? currentWord?.koreanWord : currentWord?.englishWord || '단어 없음'}
            </p>
            <div className="options-container">
                {options.map((option, index) => (
                    <button
                        key={index}
                        data-option={option} // 정답 버튼을 쉽게 찾기 위해 data-option 속성 추가
                        className={`choice-button ${selectedOption === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                        onClick={() => handleOptionSelect(option)}
                        disabled={!!selectedOption} // 선택된 후에는 버튼 비활성화
                    >
                        {option}
                    </button>
                ))}
            </div>
            {selectedOption && (
                <button className="next-word-btn" onClick={handleNextWord}>
                    다음 단어
                </button>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        {missedWords.length === 0 ? (
                            <div>
                                <p>학습이 끝났습니다. 수고하셨습니다! 😊</p>
                                <div className="button-container">
                                    <button className="modal-btn" onClick={handleCancel}>확인</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p>정답: {okWords.length}개, 오답: {missedWords.length}개</p>
                                <p>틀린 단어를 다시 학습하시겠습니까?</p>
                                <div className="button-container">
                                    <button className="modal-btn" onClick={handleRestartMissedWords}>확인</button>
                                    <button className="modal-btn cancel-btn" onClick={handleCancel}>취소</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PracticeMultiple;