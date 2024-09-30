import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, ButtonGroup } from 'react-bootstrap';
import '../card/css/LearningTestResult.css';

const LearningTestResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { okWords = [], missedWords = [], vocabularyItems = [], testOption, graded, answers } = location.state || {};

    // "다시 테스트 하기" 버튼 클릭 시, 이전 graded 상태와 사용자 입력값을 함께 전달
    const handleRetake = () => {
        navigate('/learn-test', { state: { vocabularyItems, testOption, graded, answers } });
    };

    const handleLearningClick = () => {
        navigate('/word-learn', { state: { vocabularyItems } });
    };

    const handleLearnClick = () => {
        navigate('/study', { state: { vocabularyItems } });
    };

    return (
        <div className="test-result-container">
            <h1>시험 결과</h1>
            <p>정답: {okWords.length}개, 오답: {missedWords.length}개</p>
            <div className="result-word-lists">
                <div className="correct-list">
                    <h3>정답 단어</h3>
                    {okWords.map((wordPair, index) => (
                        <p key={index}>{testOption === 'korean' ? wordPair.koreanWord : wordPair.englishWord}</p>
                    ))}
                </div>
                <div className="incorrect-list">
                    <h3>오답 단어</h3>
                    {missedWords.map((wordPair, index) => (
                        <p key={index}>{testOption === 'korean' ? wordPair.koreanWord : wordPair.englishWord}</p>
                    ))}
                </div>
            </div>
            <div>
                <Button className="custom-hover-button" variant="outline-primary" onClick={handleRetake}>다시 테스트 하기</Button> {' '}
                <Button className="custom-hover-button" variant="outline-primary" onClick={handleLearningClick}>Learning으로 이동</Button>{' '}
                <Button className="custom-hover-button" variant="outline-primary" onClick={handleLearnClick}>취소</Button>{' '}
            </div>
        </div>
    );
};

export default LearningTestResult;
