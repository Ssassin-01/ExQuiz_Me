import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../css/Learning.css';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { Alarm } from 'iconsax-react';
import { useUser } from '../../User/UserContext'; // UserContext 사용
import './ReportPage.jsx';

const Learning = () => {
    const navigate = useNavigate();
    const { cardNumber } = useParams();
    const [vocabularyItems, setVocabularyItems] = useState([]);
    const [testOption, setTestOption] = useState('korean');
    const [favorites, setFavorites] = useState([]);
    const { user } = useUser();
    const apiUrl = `${window.location.origin}`;

    // 카드 데이터 불러오기
    const fetchCardData = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/cards/${cardNumber}`, { withCredentials: true });
            setVocabularyItems(response.data.vocabularyItems);
        } catch (error) {
            console.error('카드 데이터를 불러오지 못했습니다:', error);
        }
    };

    // 북마크된 단어 가져오기
    const fetchBookmarkedWords = async () => {
        if (!user || !user.email) return;
        try {
            const response = await axios.get(`${apiUrl}/api/word-bookmarks/user/${user.email}`, { withCredentials: true });
            const bookmarkedWordIds = response.data.map((word) => word.itemId);
            setFavorites(bookmarkedWordIds);
        } catch (error) {
            console.error('북마크된 단어 불러오기 실패:', error);
        }
    };

    useEffect(() => {
        fetchCardData();
        fetchBookmarkedWords();
    }, [cardNumber, user, apiUrl]);

    // 북마크 토글
    const toggleFavorite = async (itemId) => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/word-bookmarks/toggle`,
                {},
                {
                    params: {
                        email: user?.email,
                        itemId: itemId,
                    },
                    withCredentials: true,
                }
            );

            if (response.data === 'Bookmarked') {
                setFavorites([...favorites, itemId]);
            } else if (response.data === 'Unbookmarked') {
                setFavorites(favorites.filter((id) => id !== itemId));
            }
        } catch (error) {
            console.error('북마크 토글 실패:', error);
        }
    };

    // 학습 버튼 클릭
    const handleLearningClick = () => {
        navigate('/learning/word-learn', { state: { vocabularyItems } });
    };

    // 연습 버튼 클릭
    const handlePracticeClick = () => {
        navigate('/learning/practice-options', { state: { vocabularyItems } });
    };

    // 테스트 버튼 클릭
    const handleTestClick = (selectedOption) => {
        setTestOption(selectedOption);
        navigate(`/learning/learn-test`, { state: { vocabularyItems, testOption: selectedOption } });
    };

    // 신고 버튼 클릭
    const handleReportClick = () => {
        if (!cardNumber) {
            console.error("cardNumber is undefined. Cannot navigate to the report page.");
            return;
        }
        navigate(`/learning/${cardNumber}/report`);
    };

    return (
        <div className="learning-container">
            <div className="learning-header">
                <div className="title-section">
                    <span className="volume-title">Learning</span>
                    <span className="word-count">{vocabularyItems.length} Words</span>
                </div>
                <div className="header-buttons">
                    <Button variant="outline-primary" onClick={handleLearningClick}>
                        Learning
                    </Button>{' '}
                    <Button variant="outline-primary" onClick={handlePracticeClick}>
                        Practice
                    </Button>{' '}
                    <DropdownButton id="dropdown-basic-button" title="TEST" variant="outline-primary">
                        <Dropdown.Item onClick={() => handleTestClick('korean')}>
                            영어 단어 맞추기
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleTestClick('english')}>
                            단어 뜻 맞추기
                        </Dropdown.Item>
                    </DropdownButton>{' '}
                    <Button onClick={handleReportClick}>
                        <Alarm size="32" color="#FFFFFF" />
                    </Button>
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
                                className={`star-icon ${favorites.includes(wordPair.itemId) ? 'filled' : ''}`}
                                onClick={() => toggleFavorite(wordPair.itemId)}
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
