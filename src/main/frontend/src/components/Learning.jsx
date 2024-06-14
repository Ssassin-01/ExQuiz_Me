import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './css/Learning.css';

const Learning = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { vocabularyItems } = location.state || { vocabularyItems: [] };
    const handleLearningClick = () => {
        // "Learning" 버튼 클릭 시 `WordLearn`로 이동하고 상태 전달
        navigate('/word-learn', { state: { vocabularyItems } });
    };

    return (
        <div className="learning-container">
            <div className="learning-header">
                <div className="title-section">
                    <span className="volume-title">Learning</span>
                    <span className="word-count">{vocabularyItems.length} Words</span>
                </div>
                <div className="header-buttons">
                    <button onClick={handleLearningClick}>Learning</button>
                    <button>Practice</button>
                    <button>Test</button>
                    <button className="share-button">✈</button>
                </div>
            </div>
            <div className="word-list-container">
                <div className="word-list">
                    {vocabularyItems.map((wordPair, index) => (
                        <div className="word-item" key={index}>
                            <div className="word-text">
                                {wordPair.englishWord} | {wordPair.koreanWord}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Learning;
