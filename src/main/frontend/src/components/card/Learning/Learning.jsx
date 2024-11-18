import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Learning.css';
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { Alarm } from 'iconsax-react';
import { useUser } from '../../User/UserContext'; // UserContext 사용
import './ReportPage.jsx';
const Learning = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { vocabularyItems = [], cardNumber } = location.state || {}; // cardNumber 가져오기
    const [testOption, setTestOption] = useState('korean');
    const [favorites, setFavorites] = useState([]); // 북마크된 단어 목록
    const { user } = useUser(); // UserContext에서 유저 정보 가져오기
    const apiUrl = process.env.REACT_APP_API_URL;

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
        fetchBookmarkedWords();
    }, [user, apiUrl]);

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
                setFavorites([...favorites, itemId]); // 북마크 추가
            } else if (response.data === 'Unbookmarked') {
                setFavorites(favorites.filter((id) => id !== itemId)); // 북마크 제거
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

// import React, {useState, useEffect} from 'react';
// import {useLocation, useNavigate} from 'react-router-dom';
// import '../css/Learning.css';
// import {Button, Modal, Form} from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import {FaStar} from 'react-icons/fa';
// import axios from 'axios';
// import {Alarm} from 'iconsax-react';
// import {useUser} from '../../User/UserContext'; // UserContext 사용
//
// const Learning = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const {vocabularyItems = []} = location.state || {};
//     const [testOption, setTestOption] = useState('korean');
//     const [favorites, setFavorites] = useState([]); // 북마크된 단어 목록
//     const {user} = useUser(); // UserContext에서 유저 정보 가져오기
//     const apiUrl = process.env.REACT_APP_API_URL;
//
//     // State for the report modal
//     const [showReportModal, setShowReportModal] = useState(false);
//     const [reportReason, setReportReason] = useState('');
//     const [reportDetails, setReportDetails] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false); // 중복 제출 방지
//
//     // Fetch bookmarked words when component loads
//     const fetchBookmarkedWords = async () => {
//         if (!user || !user.email) return;
//         try {
//             const response = await axios.get(`${apiUrl}/api/word-bookmarks/user/${user.email}`, {withCredentials: true});
//             const bookmarkedWordIds = response.data.map(word => word.itemId); // 북마크된 단어들의 itemId만 추출
//             setFavorites(bookmarkedWordIds);
//         } catch (error) {
//             console.error('북마크된 단어 불러오기 실패:', error);
//         }
//     };
//
//     useEffect(() => {
//         fetchBookmarkedWords();
//     }, [user, apiUrl]);
//
//     // Toggle favorite function
//     const toggleFavorite = async (itemId) => {
//         try {
//             const response = await axios.post(
//                 `${apiUrl}/api/word-bookmarks/toggle`,
//                 {},
//                 {
//                     params: {
//                         email: user?.email, // UserContext에서 가져온 이메일 사용
//                         itemId: itemId,
//                     },
//                     withCredentials: true,
//                 }
//             );
//
//             if (response.data === 'Bookmarked') {
//                 setFavorites([...favorites, itemId]); // 북마크 추가
//             } else if (response.data === 'Unbookmarked') {
//                 setFavorites(favorites.filter((id) => id !== itemId)); // 북마크 제거
//             }
//         } catch (error) {
//             console.error('북마크 토글 실패:', error);
//         }
//     };
//
//     const handleLearningClick = () => {
//         navigate('/learning/word-learn', {state: {vocabularyItems}});
//     };
//
//     const handlePracticeClick = () => {
//         navigate('/learning/practice-options', {state: {vocabularyItems}});
//     };
//
//     const handleTestClick = (selectedOption) => {
//         setTestOption(selectedOption);
//         navigate(`/learning/learn-test`, {state: {vocabularyItems, testOption: selectedOption}});
//     };
//
//     const handleReportClick = () => {
//         navigate('/report', { state: { cardNumber } }); // 신고 페이지로 카드 번호 전달
//     };
//
//     return (
//         <div className="learning-container">
//             <div className="learning-header">
//                 <div className="title-section">
//                     <span className="volume-title">Learning</span>
//                     <span className="word-count">{vocabularyItems.length} Words</span>
//                 </div>
//                 <div className="header-buttons">
//                     <Button variant="outline-primary" onClick={handleLearningClick}>Learning</Button>{' '}
//                     <Button variant="outline-primary" onClick={handlePracticeClick}>Practice</Button>{' '}
//                     <DropdownButton id="dropdown-basic-button" title="TEST" variant="outline-primary">
//                         <Dropdown.Item onClick={() => handleTestClick('korean')}>
//                             영어 단어 맞추기
//                         </Dropdown.Item>
//                         <Dropdown.Item onClick={() => handleTestClick('english')}>
//                             단어 뜻 맞추기
//                         </Dropdown.Item>
//                     </DropdownButton>{' '}
//                             <Button onClick={handleReportClick}>
//                                 <Alarm size="32" color="#FFFFFF"/>
//                             </Button>
//
//                 </div>
//             </div>
//             {vocabularyItems.length > 0 ? (
//                 <div className="word-list">
//                     {vocabularyItems.map((wordPair, index) => (
//                         <div className="word-item" key={index}>
//                             <div className="word-number">{index + 1}</div>
//                             <div className="word-text">
//                                 <span className="english-word">{wordPair.englishWord}</span>
//                                 <span className="korean-word">{wordPair.koreanWord}</span>
//                             </div>
//                             <FaStar
//                                 className={`star-icon ${favorites.includes(wordPair.itemId) ? 'filled' : ''}`}
//                                 onClick={() => toggleFavorite(wordPair.itemId)}
//                             />
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p>단어 목록이 없습니다.</p>
//             )}
//
//         </div>
//     );
// };
//
// export default Learning;
