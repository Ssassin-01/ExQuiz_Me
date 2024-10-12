import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/Learning.css';
import { Button } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { useUser } from '../../User/UserContext'; // UserContext 사용

const Learning = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { vocabularyItems = [] } = location.state || {};
    const [testOption, setTestOption] = useState('korean');
    const [favorites, setFavorites] = useState([]); // 북마크된 단어 목록
    const { user } = useUser(); // UserContext에서 유저 정보 가져오기
    const apiUrl = process.env.REACT_APP_API_URL;

    // 컴포넌트가 로드될 때 북마크된 단어를 가져오는 함수
    const fetchBookmarkedWords = async () => {
        if (!user || !user.email) return;

        try {
            const response = await axios.get(`${apiUrl}/api/word-bookmarks/user/${user.email}`, { withCredentials: true });
            const bookmarkedWordIds = response.data.map(word => word.itemId); // 북마크된 단어들의 itemId만 추출
            setFavorites(bookmarkedWordIds);
        } catch (error) {
            console.error('북마크된 단어 불러오기 실패:', error);
        }
    };

    // 컴포넌트가 로드될 때 북마크된 단어 목록을 가져옴
    useEffect(() => {
        fetchBookmarkedWords();
    }, [user, apiUrl]);

    // 즐겨찾기 상태 토글 함수
    const toggleFavorite = async (itemId) => {
        try {
            const response = await axios.post(
                `${apiUrl}/api/word-bookmarks/toggle`,
                {},
                {
                    params: {
                        email: user?.email, // UserContext에서 가져온 이메일 사용
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

    const handleLearningClick = () => {
        navigate('/word-learn', { state: { vocabularyItems } });
    };

    const handlePracticeClick = () => {
        navigate('/practice-options', { state: { vocabularyItems } });
    };

    const handleTestClick = (selectedOption) => {
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

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import '../css/Learning.css';
// import { Button } from 'react-bootstrap';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import { FaStar } from 'react-icons/fa';
// import axios from 'axios';
// import { useUser } from '../../User/UserContext'; // Import the useUser hook
//
// const Learning = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const { vocabularyItems = [] } = location.state || {};
//     const [testOption, setTestOption] = useState('korean');
//     const [favorites, setFavorites] = useState([]);
//     const { user } = useUser(); // Get the logged-in user from UserContext
//     const apiUrl = process.env.REACT_APP_API_URL;
//
//     // 즐겨찾기 상태 토글 함수
//     const toggleFavorite = async (itemId) => {
//         try {
//             const response = await axios.post(
//                 `${apiUrl}/api/word-bookmarks/toggle`,
//                 {}, // 본문은 빈 객체로 두고
//                 {
//                     params: { // 쿼리 파라미터로 email과 itemId 전달
//                         email: user?.email,
//                         itemId: itemId,
//                     },
//                     withCredentials: true,
//                 }
//             );
//             console.log("Bookmark toggle 성공:", response.data);
//
//             if (response.data === 'Bookmarked') {
//                 setFavorites([...favorites, itemId]); // 북마크 추가
//             } else if (response.data === 'Unbookmarked') {
//                 setFavorites(favorites.filter((id) => id !== itemId)); // 북마크 삭제
//             }
//         } catch (error) {
//             console.error('북마크 토글 실패:', error);
//         }
//     };
//
//     const handleLearningClick = () => {
//         navigate('/word-learn', { state: { vocabularyItems } });
//     };
//
//     const handlePracticeClick = () => {
//         navigate('/practice-options', { state: { vocabularyItems } });
//     };
//
//     const handleTestClick = (selectedOption) => {
//         setTestOption(selectedOption);
//         navigate('/learn-test', { state: { vocabularyItems, testOption: selectedOption } });
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
//                     <button className="share-button">✈</button>
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
//         </div>
//     );
// };
//
// export default Learning;
