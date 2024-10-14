import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../css/wordLearner.css";

export default function WordLearn() {
    const location = useLocation();
    const navigate = useNavigate();
    const { vocabularyItems } = location.state || { vocabularyItems: [] }; // 상태로 전달된 vocabularyItems 사용
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false); // 카드가 뒤집혔는지 여부를 저장하는 상태
    const [missedWords, setMissedWords] = useState([]); // X 버튼을 누른 단어들 저장
    const [okWords, setOkWords] = useState([]); // O 버튼을 누른 단어를 저장
    const [showModal, setShowModal] = useState(false); // 모달 표시 상태
    const [learningItems, setLearningItems] = useState(vocabularyItems); // 현재 학습 항목

    useEffect(() => {
        // currentWordIndex가 마지막 단어일 때
        if (currentWordIndex >= learningItems.length && learningItems.length > 0) {
            setShowModal(true);
        }
    }, [currentWordIndex, learningItems.length]);

    const goToNextWord = () => {
        setIsFlipped(false); // 다음 단어로 넘어갈 때는 초기 상태로 설정
        setCurrentWordIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            if (nextIndex >= learningItems.length) {
                setShowModal(true); // 마지막 단어 이후 모달 표시
            }
            return nextIndex;
        });
    };

    const goToPreviousWord = () => {
        setIsFlipped(false); // 이전 단어로 돌아갈 때는 초기 상태로 설정
        setCurrentWordIndex((prevIndex) => {
            if (prevIndex === 0) return learningItems.length - 1;
            return prevIndex - 1;
        });
    };

    const handleCardClick = () => {
        setIsFlipped(!isFlipped); // 클릭할 때마다 카드의 상태를 뒤집음
    };

    const handleMissedWord = () => {
        const currentWord = learningItems[currentWordIndex];
        setMissedWords((prevMissedWords) => {
            if (!prevMissedWords.includes(currentWord)) {
                return [...prevMissedWords, currentWord];
            }
            return prevMissedWords;
        });
        goToNextWord(); // X 버튼 클릭 후 다음 단어로 이동
    };

    const handleOkWord = () => {
        const currentWord = learningItems[currentWordIndex];
        setOkWords((prevOkWords) => {
            if (!prevOkWords.includes(currentWord)) {
                return [...prevOkWords, currentWord];
            }
            return prevOkWords;
        });
        goToNextWord(); // O 버튼 클릭 후 다음 단어로 이동
    };

    const handleRestartMissedWords = () => {
        setShowModal(false);
        if (missedWords.length > 0) {
            // 틀린 단어가 있는 경우 그 단어들만으로 학습 목록 재설정
            setLearningItems(missedWords);
            setMissedWords([]); // 초기화
            setOkWords([]); // 초기화
        } else {
            // 모든 단어를 맞춘 경우
            navigate('/study');
        }
        setCurrentWordIndex(0); // 첫 번째 단어로 이동
    };

    const handleCancel = () => {
        setShowModal(false);
        navigate('/study'); // "취소" 버튼을 클릭하면 Study 페이지로 이동
    };

    return (
        <div className="word-learner-container">
            <button className="arrow-btn left-arrow" onClick={goToPreviousWord}>{"<"}</button>
            <div className="word-learner">
                <header className="learn__header">
                    MVP-Vol1 - 학습하기
                </header>
                <div className="learn__nav">
                    <div className="learn__word-counter">{`${Math.min(currentWordIndex + 1, learningItems.length)} / ${learningItems.length}`}</div>
                </div>
                <div className="learn__content" onClick={handleCardClick}>
                    <div className={`card_container ${isFlipped ? "flipped" : ""}`}>
                        <div className="card-face card-front">
                            {/* 영어 단어 표시 */}
                            {learningItems[currentWordIndex]?.englishWord}
                        </div>
                        <div className="card-face card-back">
                            {/* 한국어 단어 표시 */}
                            {learningItems[currentWordIndex]?.koreanWord}
                        </div>
                    </div>
                </div>
                <footer className="learn__footer">
                    <button className="learn__nav-btn" onClick={handleOkWord}>O</button>
                    <button className="learn__nav-btn" onClick={handleMissedWord}>X</button>
                </footer>
            </div>
            <button className="arrow-btn right-arrow" onClick={goToNextWord}>{">"}</button>

            {/* 모달 창 */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        {missedWords.length === 0 ? (
                            <div>
                                <p>학습이 끝났습니다 수고하셨습니다😊</p>
                                <div className="modal-btn-container">
                                    <button className="modal-btn" onClick={handleCancel}>확인</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p>정답: {okWords.length}개, 오답: {missedWords.length}개</p>
                                <p>틀린 단어를 다시 학습하시겠습니까?</p>
                                <div className="modal-btn-container">
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
}
