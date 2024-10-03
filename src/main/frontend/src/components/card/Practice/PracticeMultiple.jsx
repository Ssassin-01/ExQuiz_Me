import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/PracticeMultiple.css';

const PracticeMultiple = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vocabularyItems: initialVocabularyItems = [], selectedLanguage = 'english' } = location.state || {};
    const [vocabularyItems, setVocabularyItems] = useState(initialVocabularyItems);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [missedWords, setMissedWords] = useState([]);
    const [okWords, setOkWords] = useState([]);

    const currentWord = vocabularyItems[currentWordIndex];
    const correctAnswer = currentWord ? (selectedLanguage === 'english' ? currentWord.englishWord : currentWord.koreanWord) : '';

    useEffect(() => {
        if (currentWordIndex >= vocabularyItems.length) {
            setShowModal(true);
        }
    }, [currentWordIndex, vocabularyItems.length]);

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

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setIsCorrect(option === correctAnswer);
        if (option !== correctAnswer) {
            setMissedWords((prev) => [...prev, currentWord]);
        } else {
            setOkWords((prev) => [...prev, currentWord]);
        }

        // 2초 후 다음 단어 이동
        setTimeout(() => {
            handleNextWord();
        }, 2000);
    };

    const handleNextWord = () => {
        if (currentWordIndex < vocabularyItems.length - 1) {
            setSelectedOption(null);
            setIsCorrect(null);
            setCurrentWordIndex((prev) => prev + 1);
        } else {
            setShowModal(true);
        }
    };

    const handleRestartMissedWords = () => {
        setVocabularyItems(missedWords);
        setShowModal(false);
        setCurrentWordIndex(0);
        setOkWords([]);
        setIsCorrect(null);
        setMissedWords([]);
    };

    const handleCancel = () => {
        setShowModal(false);
        navigate('/study');
    };

    return (
        <div className="practice-container">
            <h2 className="practice-header">사지선다</h2>
            <p className="practice-question">
                {selectedLanguage === 'english' ? currentWord?.koreanWord : currentWord?.englishWord || '단어 없음'}
            </p>
            <div className="options-container">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={`choice-button ${selectedOption === option ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                        onClick={() => handleOptionSelect(option)}
                        disabled={!!selectedOption}
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
                                <button className="modal-btn" onClick={handleCancel}>확인</button>
                            </div>
                        ) : (
                            <>
                                <p>정답: {okWords.length}개, 오답: {missedWords.length}개</p>
                                <p>틀린 단어를 다시 학습하시겠습니까?</p>
                                <button className="modal-btn" onClick={handleRestartMissedWords}>확인</button>
                                <button className="modal-btn" onClick={handleCancel}>취소</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PracticeMultiple;