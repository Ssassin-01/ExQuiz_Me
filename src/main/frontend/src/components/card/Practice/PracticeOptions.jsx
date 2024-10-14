import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
        if (selectedType === 'subjective') {
            navigate('/learning/practice-subjective', {
                state: {
                    selectedLanguage,
                    vocabularyItems: location.state.vocabularyItems || []
                },
            });
        } else if (selectedType === 'multiple-choice') {
            navigate('/learning/practice-multiple', {
                state: {
                    selectedLanguage,
                    vocabularyItems: location.state.vocabularyItems || []
                },
            });
        }
    };

    return (
        <div className="practice-options-container">
            <h2 className="title">Practice Options</h2>
            <div className="options-wrapper">
                {/* 문제 유형 선택 영역 */}
                <div className="options-section">
                    <h3 className="option-title">문제 유형</h3>
                    <label className="radio-label">
                        <input
                            type="radio"
                            value="subjective"
                            checked={selectedType === 'subjective'}
                            onChange={handleTypeChange}
                        />
                        주관식
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            value="multiple-choice"
                            checked={selectedType === 'multiple-choice'}
                            onChange={handleTypeChange}
                        />
                        사지선다
                    </label>
                </div>

                {/* 언어 선택 영역 */}
                <div className="options-section">
                    <h3 className="option-title">언어 선택</h3>
                    <label className="radio-label">
                        <input
                            type="radio"
                            value="english"
                            checked={selectedLanguage === 'english'}
                            onChange={handleLanguageChange}
                        />
                        영어 → 한국어
                    </label>
                    <label className="radio-label">
                        <input
                            type="radio"
                            value="korean"
                            checked={selectedLanguage === 'korean'}
                            onChange={handleLanguageChange}
                        />
                        한국어 → 영어
                    </label>
                </div>
            </div>
            <button className="start-btn" onClick={handleStart} disabled={!selectedType}>
                시작하기
            </button>
        </div>
    );
};

export default PracticeOptions;
