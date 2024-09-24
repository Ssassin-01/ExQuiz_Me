import React, { useState, useEffect } from 'react';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './css/MyPage.css';
import CardItem from "./components/CardItem";
import TableItem from "./components/TableItem";
import { useNavigate } from "react-router-dom";
import { useUser } from "../User/UserContext";

import axios from 'axios';


import ProfileSection from './components/ProfileSection';
import StorySection from './components/StorySection';
import ActivitySection from './components/ActivitySection';
import RecentCardsSection from './components/RecentCardsSection';

const MyPage = () => {
    const { user } = useUser(); // UserContext에서 로그인된 유저 정보 가져오기
    const [activeTab, setActiveTab] = useState('activity');
    const [recentCards, setRecentCards] = useState([]);//최근학습
    const [bookmarkedCards, setBookmarkedCards] = useState([]); // 즐겨찾기된 카드 목록 상태 추가
    const [profileData, setProfileData] = useState({
        nickname: '',
        email: '',
        oneLineResolution: ''
    });
    const [userCards, setUserCards] = useState([]); // 사용자별 카드 상태 추가
    const [bookmarks, setBookmarks] = useState([
        { id: 1, english: 'apple', meaning: '사과', isBookmarked: true },
        { id: 2, english: 'banana', meaning: '바나나', isBookmarked: false },
        { id: 3, english: 'cherry', meaning: '체리', isBookmarked: true },
        { id: 4, english: 'date', meaning: '대추', isBookmarked: false },
        { id: 5, english: 'eggplant', meaning: '가지', isBookmarked: true },
    ]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    // 북마크 토글 기능
    const toggleBookmark = (id) => {
        setBookmarks((prevBookmarks) =>
            prevBookmarks.map((bookmark) =>
                bookmark.id === id
                    ? { ...bookmark, isBookmarked: !bookmark.isBookmarked }
                    : bookmark
            )
        );
    };

    // 단어 삭제 기능
    const removeWord = (id) => {
        setBookmarks((prevBookmarks) =>
            prevBookmarks.filter((bookmark) => bookmark.id !== id)
        );
    };

    //날짜 패치
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // 카드 열람 기록을 남기기 위한 함수
    const handleCardClick = async (cardNumber) => {
        try {
            // 카드 조회수를 증가시키고, 최근 학습에 추가하는 API 호출
            await axios.post(`${apiUrl}/api/cards/${cardNumber}/view`, {}, { withCredentials: true });

            // 카드가 이미 최근 학습 리스트에 있는지 확인
            const cardIndex = recentCards.findIndex(card => card.cardNumber === cardNumber);

            if (cardIndex === -1) {
                // 새로운 카드인 경우, 최근 학습 리스트에 추가 (최대 5개 유지)
                const newRecentCard = userCards.find(card => card.cardNumber === cardNumber);
                if (newRecentCard) {
                    setRecentCards((prevCards) => [newRecentCard, ...prevCards.slice(0, 4)]);
                }
            } else {
                // 이미 리스트에 있는 카드인 경우, 해당 카드를 맨 앞에 배치
                const updatedCards = [...recentCards];
                const [movedCard] = updatedCards.splice(cardIndex, 1); // 기존 위치에서 제거
                setRecentCards([movedCard, ...updatedCards]); // 맨 앞에 배치
            }
        } catch (error) {
            console.error('Error logging card view:', error);
        }
    };

    //몇분전 시간 남기기
    const timeAgo = (dateString) => {
        const now = new Date();
        const past = new Date(dateString);

        // 시간대 차이를 보정
        const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

        const minutes = Math.floor(diffInSeconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (years > 0) return `${years}년 전`;
        if (months > 0) return `${months}달 전`;
        if (weeks > 0) return `${weeks}주 전`;
        if (days > 0) return `${days}일 전`;
        if (hours > 0) return `${hours}시간 전`;
        if (minutes > 0) return `${minutes}분 전`;
        return "방금 전";
    };

    // 북마크 토글 API 호출
    const handleBookmarkToggle = async (cardNumber) => {
        try {
            const userEmail = sessionStorage.getItem('useremail'); // 사용자 이메일을 세션에서 가져옴

            if (!userEmail) {
                console.error('User email is null or undefined');
                return;
            }

            const response = await axios.post(`${apiUrl}/api/bookmarks/toggle`, {
                userEmail: userEmail, // 이메일을 요청 바디에 포함
                cardNumber: cardNumber
            }, {
                withCredentials: true
            });

            // 응답 데이터 확인
            if (response.status === 200 && (response.data === "Bookmarked" || response.data === "Unbookmarked")) {
                console.log('Bookmark toggle successful:', response.data);

                // 북마크 상태 업데이트를 위해 목록 새로고침
                fetchBookmarkedCards();

                return response.data;  // CardItem.jsx에서 사용할 수 있도록 응답을 반환
            } else {
                console.error("Unexpected response structure:", response.data);
                return null;
            }
        } catch (error) {
            console.error('Failed to toggle bookmark:', error);

            if (error.response) {
                console.error('Server responded with:', error.response.data);
            }
            return null;
        }
    };

// 즐겨찾기된 카드 목록을 불러오는 함수 (최신순 정렬)
    const fetchBookmarkedCards = async () => {
        try {
            const userEmail = sessionStorage.getItem('useremail'); // 사용자 이메일을 세션에서 가져옴

            if (!userEmail) {
                console.error('User email is null or undefined');
                return;
            }

            const response = await axios.get(`${apiUrl}/api/bookmarks/user/${userEmail}`, {
                withCredentials: true
            });

            if (response.status === 200) {
                const bookmarkedCards = response.data.map(card => ({
                    ...card,
                    isBookmarked: true // 북마크된 카드로 표시
                }));

                // 데이터가 제대로 최신순으로 정렬되고 있는지 콘솔에 출력
                const sortedBookmarkedCards = bookmarkedCards.sort((a, b) => new Date(b.writeDateTime) - new Date(a.writeDateTime));
                console.log('Sorted Bookmarked Cards:', sortedBookmarkedCards);

                setBookmarkedCards(sortedBookmarkedCards); // 최신순으로 정렬된 북마크 카드 상태 저장
            }
        } catch (error) {
            console.error('Failed to fetch bookmarked cards:', error);
        }
    };







// 컴포넌트가 로드될 때마다 북마크된 카드 목록을 가져옴
    useEffect(() => {
        if (!user || !user.email) {
            console.error("User not logged in or email missing");
            return;
        }

        fetchBookmarkedCards(); // 로그인된 사용자의 이메일을 기반으로 북마크된 카드 불러오기
    }, [user]);


    // 프로필 정보 불러오기
    useEffect(() => {
        if (!user || !user.email) return;

        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/user/profile/simple/${user.email}`);
                if (response.status === 200) {
                    const data = response.data;
                    setProfileData({
                        nickname: data.nickname,
                        email: data.email,
                        oneLineResolution: data.oneLineResolution || "한 줄 소개가 없습니다."
                    });
                }
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        const fetchUserCards = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/cards/user`, {
                    withCredentials: true // 세션 쿠키를 포함하여 요청을 보냄
                });
                if (response.status === 200) {
                    setUserCards(response.data.slice(0, 3)); // 사용자 카드 중 3개만 가져옴
                }
            } catch (error) {
                console.error('Failed to fetch user cards:', error);
            }
        };

        const fetchRecentCards = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/cards/recent`, {
                    withCredentials: true // 세션 쿠키를 포함하여 요청을 보냄
                });
                console.log(response.data); // 데이터를 콘솔에 출력하여 확인
                if (response.status === 200) {
                    setRecentCards(response.data); // 최근 학습 카드 불러오기
                }
            } catch (error) {
                console.error('Failed to fetch recent cards:', error);
            }
        };
        fetchUserProfile();
        fetchUserCards();
        fetchRecentCards();
    }, [user, apiUrl]);

    // 활동 그래프 설정
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

    const activityData = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
            {
                label: '나의 활동 (점수)',
                data: [50, 70, 90, 100, 60, 80, 75],
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, '#A6A6A6');
                    gradient.addColorStop(1, '#8C8C8C');
                    return gradient;
                },
                borderRadius: 10,
                borderSkipped: false,
            },
        ],
    };

    const activityOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            tooltip: {
                backgroundColor: '#000',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw} 점`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#e0e0e0',
                },
                ticks: {
                    color: '#666',
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#666',
                },
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeOutBounce',
        },
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'activity':
                return (
                    <ActivitySection
                        userCards={userCards}
                        bookmarkedCards={bookmarkedCards} // 북마크된 카드 목록을 전달
                        formatDate={formatDate}
                        handleCardClick={handleCardClick}
                        handleBookmarkToggle={handleBookmarkToggle}  // 북마크 토글 함수 전달
                        activityData={activityData}
                        activityOptions={activityOptions}
                    />
                );
            case 'recent':
                return (
                    <RecentCardsSection
                        recentCards={recentCards.map((card) => ({
                            ...card,
                            isBookmarked: bookmarkedCards.some(bCard => bCard.cardNumber === card.cardNumber), // 북마크 상태 전달
                        }))}
                        timeAgo={timeAgo}
                        handleCardClick={handleCardClick}
                        handleBookmarkToggle={handleBookmarkToggle} // 북마크 토글 함수 전달
                    />
                );
            case 'card_bookmark':
                return (
                    <div className="mypage-content">
                        <h3>카드 즐겨찾기</h3>
                        {Array.isArray(bookmarkedCards) && bookmarkedCards.length === 0 ? (
                            <p>즐겨찾기한 카드가 없습니다.</p>
                        ) : (
                            <div className="mypage-card_bookmark-content">
                                {Array.isArray(bookmarkedCards) ? (
                                    bookmarkedCards.map((card) => (
                                        <CardItem
                                            key={card.cardNumber}
                                            title={card.title}
                                            description={card.cardContent}
                                            author={card.nickname || 'Unknown'} // card.user 대신 card.nickname 사용
                                            purpose={card.purpose || '기타'}
                                            date={card.writeDateTime}
                                            isBookmarked={true}
                                            onBookmarkToggle={() => handleBookmarkToggle(card.cardNumber)} // 북마크 토글 핸들러
                                            onCardClick={() => handleCardClick(card.cardNumber)}
                                        />
                                    ))
                                ) : (
                                    <p>데이터가 올바르지 않습니다.</p>
                                )}
                            </div>
                        )}
                    </div>
                );
            case 'word_bookmark':
                return (
                    <div className="mypage-content">
                        <h3>단어 즐겨찾기</h3>
                        <table className="mypage-word-table">
                            <thead>
                            <tr>
                                <th>번호</th>
                                <th>영어</th>
                                <th>뜻</th>
                                <th>북마크</th>
                                <th>삭제</th>
                            </tr>
                            </thead>
                            <tbody>
                            {bookmarks.map((bookmark, index) => (
                                <TableItem
                                    key={bookmark.id}
                                    index={index + 1}
                                    english={bookmark.english}
                                    meaning={bookmark.meaning}
                                    isBookmarked={bookmark.isBookmarked}
                                    onBookmarkToggle={() => {
                                        toggleBookmark(bookmark.id);
                                        removeWord(bookmark.id);
                                    }}
                                    onRemove={() => removeWord(bookmark.id)}
                                />
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="mypage">
            <div className="mypage-header">
                <ProfileSection profileData={profileData}/>
                <StorySection/>
            </div>

            <div className="mypage-tabs">
                <button onClick={() => setActiveTab('activity')}
                        className={activeTab === 'activity' ? 'mypage-active' : ''}>
                    내 활동
                </button>
                <button onClick={() => setActiveTab('recent')}
                        className={activeTab === 'recent' ? 'mypage-active' : ''}>
                    최근 학습
                </button>
                <button onClick={() => setActiveTab('card_bookmark')}
                        className={activeTab === 'card_bookmark' ? 'mypage-active' : ''}>
                    카드 즐겨찾기
                </button>
                <button onClick={() => setActiveTab('word_bookmark')}
                        className={activeTab === 'word_bookmark' ? 'mypage-active' : ''}>
                    단어 즐겨찾기
                </button>
            </div>

            {renderContent()}
        </div>
    );
};

export default MyPage;
