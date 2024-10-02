import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../card/css/LearningTestResult.css';

const LearningTestResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, okWords = [], missedWords = [], vocabularyItems = [], testOption, graded, answers, isRandomized } = location.state || {};

    // 배열을 랜덤으로 섞는 함수
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    // "다시 테스트 하기" 버튼 클릭 시, 이전 graded 상태와 사용자 입력값을 함께 전달
    const handleRetake = () => {
        navigate('/learn-test', { state: { title, vocabularyItems, testOption, graded, answers, isRandomized } });
    };

    // "전체 랜덤 테스트" 버튼 클릭 시, 랜덤화된 항목과 초기 상태로 이동
    const handleRandomTest = () => {
        const shuffledVocabularyItems = shuffleArray(vocabularyItems); // 항목을 랜덤으로 섞음
        navigate('/learn-test', {
            state: {
                title,
                vocabularyItems: shuffledVocabularyItems,
                testOption,
                graded: {}, // 점수 상태 초기화
                answers: {},  // 사용자의 입력값 초기화
                isRandomized: true, // 랜덤화 상태로 설정
            }
        });
    };

    const handleLearningClick = () => {
        navigate('/word-learn', { state: { vocabularyItems } });
    };

    const handleLearnClick = () => {
        navigate('/study', { state: { vocabularyItems } });
    };

    return (
        <div className="test-result-container">
            <h3 className="result-title">{title} 시험 결과</h3>
            <p>정답: {okWords.length}개, 오답: {missedWords.length}개</p>
            {/* 정답 단어 목록 */}
            <div className="result-word-lists">
                <div className="correct-list">
                    <h3>정답 단어</h3>
                    {okWords.length > 0 ? (
                        okWords.map((wordPair, index) => (
                            <p key={index}>{testOption === 'korean' ? wordPair.koreanWord : wordPair.englishWord}</p>
                        ))
                    ) : (
                        <p>정답 단어가 없습니다.</p>
                    )}
                </div>

                {/* 오답 단어 목록 */}
                <div className="incorrect-list">
                    <h3>오답 단어</h3>
                    {missedWords.length > 0 ? (
                        missedWords.map((wordPair, index) => (
                            <p key={index}>{testOption === 'korean' ? wordPair.koreanWord : wordPair.englishWord}</p>
                        ))
                    ) : (
                        <p>오답 단어가 없습니다.</p>
                    )}
                </div>
            </div>

            {/* 버튼 그룹 */}
            <div>
                <Button className="custom-hover-button" variant="outline-primary" onClick={handleRetake}>틀린 단어 학습</Button> {' '}
                <Button className="custom-hover-button" variant="outline-primary" onClick={handleLearningClick}>Learning으로 이동</Button>{' '}
                <Button className="custom-hover-button" variant="outline-primary" onClick={handleLearnClick}>취소</Button>{' '}
                <Button className="custom-hover-button" variant="outline-primary" onClick={handleRandomTest}>전체 랜덤 테스트</Button>{' '}
            </div>
        </div>
    );
};

export default LearningTestResult;
