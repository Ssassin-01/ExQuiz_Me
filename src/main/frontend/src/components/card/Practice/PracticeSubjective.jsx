import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/PracticeSubjective.css';
import { ImExit } from "react-icons/im";

const PracticeSubjective = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vocabularyItems: initialVocabularyItems = [], selectedLanguage = 'english' } = location.state || {};
    const [vocabularyItems, setVocabularyItems] = useState(initialVocabularyItems);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userInputs, setUserInputs] = useState({});
    const [isCorrect, setIsCorrect] = useState(null);
    const [missedWords, setMissedWords] = useState([]);
    const [okWords, setOkWords] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const currentWord = vocabularyItems[currentWordIndex];
    const correctAnswer = currentWord ? (selectedLanguage === 'english' ? currentWord.englishWord : currentWord.koreanWord) : '';

    useEffect(() => {
        if (currentWordIndex >= vocabularyItems.length) {
            setShowModal(true);
        }
    }, [currentWordIndex, vocabularyItems.length]);

    useEffect(() => {
        if (isCorrect === true) {
            const timer = setTimeout(() => {
                handleNextWord();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isCorrect]);

    const splitWordToLetters = (word) => {
        return word ? word.split('') : [];
    };

    const handleInputChange = (event, index) => {
        const value = event.target.value;
        setUserInputs({
            ...userInputs,
            [index]: value,
        });
    };

    const handleSubmit = () => {
        const userAnswer = Object.values(userInputs).join('').toLowerCase();  // 소문자 변환
        const normalizedAnswer = correctAnswer.toLowerCase();  // 정답도 소문자로 변환
        const isAllFieldsFilled = splitWordToLetters(correctAnswer).every((_, index) => userInputs[index] && userInputs[index].trim() !== "");

        if (!isAllFieldsFilled || userAnswer !== normalizedAnswer) {
            setIsCorrect(false);
            setMissedWords((prevMissedWords) => [...prevMissedWords, currentWord]);
        } else {
            setIsCorrect(true);
            setOkWords((prevOkWords) => [...prevOkWords, currentWord]);
        }
    };

    const handleNextWord = () => {
        if (currentWordIndex < vocabularyItems.length - 1) {
            setUserInputs({});
            setIsCorrect(null);
            setCurrentWordIndex((prevIndex) => prevIndex + 1);
        } else {
            setShowModal(true);
        }
    };

    const handleRestartMissedWords = () => {
        setVocabularyItems(missedWords);
        setShowModal(false);
        setCurrentWordIndex(0);
        setOkWords([]);
        setUserInputs({});
        setIsCorrect(null);
        setMissedWords([]);
    };

    const handleCancel = () => {
        setShowModal(false);
        navigate('/study');
    };

    return (
        <div className="practice-container">
            <ImExit className="end-button" onClick={handleCancel} />
            <div className="learn__word-counter">{`${Math.min(currentWordIndex + 1, vocabularyItems.length)} / ${vocabularyItems.length}`}</div>
            <p className="practice-question">
                {selectedLanguage === 'english' ? currentWord?.koreanWord : currentWord?.englishWord || '단어 없음'}
            </p>
            <div className="letter-input-container">
                {splitWordToLetters(correctAnswer).map((letter, index) => {
                    const userLetter = userInputs[index] || '';
                    return (
                        <input
                            key={index}
                            type="text"
                            className="letter-input"
                            maxLength="1"
                            value={userLetter}
                            onChange={(event) => handleInputChange(event, index)}
                            style={{
                                border:
                                    isCorrect === false && userLetter.toLowerCase() !== letter.toLowerCase()
                                        ? '2px solid red'
                                        : isCorrect === true && userLetter.toLowerCase() === letter.toLowerCase()
                                            ? '2px solid green'
                                            : '1px solid black',
                            }}
                        />
                    );
                })}
            </div>

            {isCorrect === true && <p className="success-message">정답입니다! 다음 단어로 이동합니다.</p>}

            {isCorrect === false && <button className="next-word-btn" onClick={handleNextWord}>다음 단어</button>}

            <button className="submit-btn" onClick={handleSubmit}>제출</button>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        {missedWords.length === 0 ? (
                            <div>
                                <p>학습이 끝났습니다. 수고하셨습니다! 😊</p>
                                <div className="button-container">
                                    <button className="modal-btn confirm" onClick={handleCancel}>확인</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p>정답: {okWords.length}개, 오답: {missedWords.length}개</p>
                                <p>틀린 단어를 다시 학습하시겠습니까?</p>
                                <div className="button-container">
                                    <button className="modal-btn confirm" onClick={handleRestartMissedWords}>확인</button>
                                    <button className="modal-btn cancel" onClick={handleCancel}>취소</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PracticeSubjective;
