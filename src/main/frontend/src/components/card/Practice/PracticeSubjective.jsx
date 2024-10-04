import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/PracticeSubjective.css';

const PracticeSubjective = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { vocabularyItems: initialVocabularyItems = [], selectedLanguage = 'english' } = location.state || {}; // 초기 단어 목록 및 선택된 언어 가져오기
    const [vocabularyItems, setVocabularyItems] = useState(initialVocabularyItems);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userInputs, setUserInputs] = useState({});
    const [isCorrect, setIsCorrect] = useState(null);
    const [missedWords, setMissedWords] = useState([]);
    const [okWords, setOkWords] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // 현재 학습 중인 단어
    const currentWord = vocabularyItems[currentWordIndex];
    const correctAnswer = currentWord ? (selectedLanguage === 'english' ? currentWord.englishWord : currentWord.koreanWord) : '';
    // 종료 시 모달 띄우기
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

    // 단어 분할
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
    // 정답 체점
    const handleSubmit = () => {
        const userAnswer = Object.values(userInputs).join(''); // 사용자가 입력한 글자 조합
        const isAllFieldsFilled = splitWordToLetters(correctAnswer).every((_, index) => userInputs[index] && userInputs[index].trim() !== "");

        if (!isAllFieldsFilled || userAnswer !== correctAnswer) {
            setIsCorrect(false);
            setMissedWords((prevMissedWords) => [...prevMissedWords, currentWord]); // 오답 단어 추가
        } else {
            setIsCorrect(true);
            setOkWords((prevOkWords) => [...prevOkWords, currentWord]); // 정답 단어 추가
        }
    };

    const handleNextWord = () => {
        if (currentWordIndex < vocabularyItems.length - 1) {
            // 마지막 단어가 아닐 때만 단어 인덱스를 증가시키고 다음 단어로 이동
            setUserInputs({}); // 입력 초기화
            setIsCorrect(null); // 정답 확인 초기화
            setCurrentWordIndex((prevIndex) => prevIndex + 1);
        } else {
            // 마지막 단어일 경우 모달 표시
            setShowModal(true);
        }
    };

    const handleRestartMissedWords = () => {
        setVocabularyItems(missedWords);
        setShowModal(false);
        setCurrentWordIndex(0); // 첫 번째 단어로 초기화
        setOkWords([]); // 정답 단어 초기화
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
            <h2>Practice - Subjective</h2>

            <p>
                {selectedLanguage === 'english' ? currentWord?.koreanWord : currentWord?.englishWord || '단어 없음'}
            </p>
            <div className="letter-input-container">
                {splitWordToLetters(correctAnswer).map((letter, index) => (
                    <input
                        key={index}
                        type="text"
                        className="letter-input"
                        maxLength="1"
                        value={userInputs[index] || ''}
                        onChange={(event) => handleInputChange(event, index)}
                        style={{
                            border:
                                isCorrect === false && userInputs[index] !== letter
                                    ? '2px solid red'
                                    : isCorrect === true && userInputs[index] === letter
                                        ? '2px solid green'
                                        : '1px solid black',
                        }}
                    />
                ))}
            </div>
            {isCorrect === true && <p style={{ color: 'green' }}>정답입니다! 다음 단어로 이동합니다.</p>}
            {isCorrect === false && <p style={{ color: 'red' }}>오답입니다! 다시 시도하세요.</p>}

            <button className="submit-btn" onClick={handleSubmit}>제출</button>
            {isCorrect !== null && (
                <button className="next-word-btn" onClick={handleNextWord}>다음 단어</button>
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

export default PracticeSubjective;