import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './css/Learning.css';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Learning = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { vocabularyItems = [] } = location.state || {};  // 빈 배열을 기본값으로 설정


    const [testOption, setTestOption] = useState('korean'); // 기본 선택은 한국어

    const handleLearningClick = () => {
        navigate('/word-learn', { state: { vocabularyItems } });
    };

    const handleTestClick = (selectedOption) => {
        // 드롭다운 옵션 클릭 시 선택된 테스트 모드로 testOption을 업데이트하고 테스트 페이지로 이동
        setTestOption(selectedOption);
        navigate('/learn-test', { state: { vocabularyItems, testOption: selectedOption } });
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
                    <Button variant="outline-primary">Practice</Button>{' '}

                    {/* Test 버튼을 드롭다운 버튼으로 변경 */}
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
                            <div className="word-text">
                                {wordPair.englishWord} | {wordPair.koreanWord}
                            </div>
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
