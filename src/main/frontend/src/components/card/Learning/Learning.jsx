import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Learning.css';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {FaStar} from "react-icons/fa";

const Learning = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { vocabularyItems = [] } = location.state || {};
    const [testOption, setTestOption] = useState('korean'); // 한국어 기본 설정
    const [favorites, setFavorites] = useState(vocabularyItems.map(() => false));


    // 즐겨찾기 상태 토글 함수
    const toggleFavorite = (index) => {
        const newFavorites = [...favorites];
        newFavorites[index] = !newFavorites[index]; // 클릭 시 상태 토글
        setFavorites(newFavorites);
    };

    const handleLearningClick = () => {
        navigate('/learning/word-learn', { state: { vocabularyItems } });
    };
    const handlePracticeClick = () => {
        navigate('/learning/practice-options', { state: { vocabularyItems } });
    };

    const handleTestClick = (selectedOption) => {
        setTestOption(selectedOption);
        navigate(`/learning/learn-test`, { state: { vocabularyItems, testOption: selectedOption } });
    };

    return (
        <div className="learning-container">
            <div className="learning-header">
                <div className="title-section">
                    <span className="volume-title">Learning</span>
                    <span className="word-count">{vocabularyItems.length} Words</span>
                </div>
                <div className="header-buttons">
                    <Button variant="outline-primary" onClick={handleLearningClick}>Learning</Button>{' '}
                    <Button variant="outline-primary" onClick={handlePracticeClick}>Practice</Button>{' '}
                    <DropdownButton id="dropdown-basic-button" title="TEST" variant="outline-primary">
                        <Dropdown.Item onClick={() => handleTestClick('korean')}>
                            영어 단어 맞추기
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleTestClick('english')}>
                            단어 뜻 맞추기
                        </Dropdown.Item>
                    </DropdownButton>{' '}
                    <button className="share-button">✈</button>
                </div>
            </div>
            {vocabularyItems.length > 0 ? (
                <div className="word-list">
                    {vocabularyItems.map((wordPair, index) => (
                        <div className="word-item" key={index}>
                            <div className="word-number">{index + 1}</div>
                            <div className="word-text">
                                <span className="english-word">{wordPair.englishWord}</span>
                                <span className="korean-word">{wordPair.koreanWord}</span>
                            </div>
                            <FaStar
                                className={`star-icon ${favorites[index] ? 'filled' : ''}`}
                                onClick={() => toggleFavorite(index)} // 클릭 시 즐겨찾기 토글
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <p>단어 목록이 없습니다.</p>
            )}
        </div>
    );
};

export default Learning;
