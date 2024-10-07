import React, { useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import '../css/PracticeOptions.css';

const PracticeOptions = () => {
    const [selectedType, setSelectedType] = useState(''); // 주관식/사지선다 선택
    const [selectedLanguage, setSelectedLanguage] = useState('english'); // 영어/한국어 선택
    const navigate = useNavigate();
    const location = useLocation();

    const handleTypeChange = (event) => {
        setSelectedType(event.target.value);
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleStart = () => {
        // 주관식을 선택한 경우 PracticeSubjective로 이동
        if (selectedType === 'subjective') {
            navigate('/practice-subjective', {
                state: {
                    selectedLanguage,
                    vocabularyItems: location.state.vocabularyItems || []
                },
            });
        } else if (selectedType === 'multiple-choice') {
            // 사지선다를 선택한 경우 PracticeMultiple로 이동
            navigate('/practice-multiple', {
                state: {
                    selectedLanguage,
                    vocabularyItems: location.state.vocabularyItems || []
                },
            });
        }
    };

    return (
        <div className="practice-options-container">
            <h2>Practice Options</h2>
            <div className="options-section">
                <h3>문제 유형</h3>
                <label>
                    <input
                        type="radio"
                        value="subjective"
                        checked={selectedType === 'subjective'}
                        onChange={handleTypeChange}
                    />
                    주관식
                </label>
                <label>
                    <input
                        type="radio"
                        value="multiple-choice"
                        checked={selectedType === 'multiple-choice'}
                        onChange={handleTypeChange}
                    />
                    사지선다
                </label>
            </div>

            <div className="options-section">
                <h3>언어 선택</h3>
                <label>
                    <input
                        type="radio"
                        value="english"
                        checked={selectedLanguage === 'english'}
                        onChange={handleLanguageChange}
                    />
                    영어 → 한국어
                </label>
                <label>
                    <input
                        type="radio"
                        value="korean"
                        checked={selectedLanguage === 'korean'}
                        onChange={handleLanguageChange}
                    />
                    한국어 → 영어
                </label>
            </div>
            <button className="start-btn" onClick={handleStart} disabled={!selectedType}>
                시작하기
            </button>
        </div>
    );
};

export default PracticeOptions;