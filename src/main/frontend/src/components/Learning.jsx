import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Learning.css';

// Example word list
const wordPairs = [
    { english: 'baby', korean: '아기' },
    { english: 'dog', korean: '개' },
    { english: 'cat', korean: '고양이' },
    { english: 'apple', korean: '사과' },
    { english: 'banana', korean: '바나나' },
    { english: 'chair', korean: '의자' },
    { english: 'table', korean: '테이블' },
    { english: 'car', korean: '차' },
    { english: 'book', korean: '책' },
    { english: 'phone', korean: '전화기' },
    { english: 'computer', korean: '컴퓨터' },
    { english: 'pen', korean: '펜' },
    { english: 'pencil', korean: '연필' },
    { english: 'watch', korean: '시계' },
    { english: 'shoe', korean: '신발' },
    { english: 'hat', korean: '모자' },
    { english: 'shirt', korean: '셔츠' },
    { english: 'pants', korean: '바지' },
    { english: 'socks', korean: '양말' },
    { english: 'glasses', korean: '안경' },
];

const Learning = () => {

    const navigate = useNavigate();  // Hook for navigation

    const handleLearn = () => {
        navigate('/wordLearn');  // Navigate to the Learning component
    };

    const [volumeFavorite, setVolumeFavorite] = useState(false);
    const [wordFavorites, setWordFavorites] = useState({});

    const toggleVolumeFavorite = () => {
        setVolumeFavorite(!volumeFavorite);
    };

    return (
        <div className="learning-container">
            <div className="learning-header">
                <div className="title-section">
                    <span className="volume-title">MVP-Vol1</span>
                    <button className={`star-button ${volumeFavorite ? 'filled' : ''}`} onClick={toggleVolumeFavorite}>
                        ★
                    </button>
                    <span className="word-count">{wordPairs.length} Words</span>
                </div>
                <div className="header-buttons">
                    <button onClick={handleLearn}>Learning</button>
                    <button>Practice</button>
                    <button>Test</button>
                    <button className="share-button">✈</button>
                </div>
            </div>
            <div className="word-list-container">
                <div className="word-list">
                    {wordPairs.map((wordPair, index) => (
                        <div className="word-item" key={index}>
                            <div className="word-text">
                                {wordPair.english} | {wordPair.korean}
                            </div>
                            <button
                                className={`star-button ${wordFavorites[wordPair.english] ? 'filled' : ''}`}
                                onClick={() => setWordFavorites(prev => ({ ...prev, [wordPair.english]: !prev[wordPair.english] }))}
                            >
                                ★
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Learning;