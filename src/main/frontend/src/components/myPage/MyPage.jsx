import React, { useState, useEffect } from 'react';
import './css/MyPage.css';
import { useNavigate } from "react-router-dom";
import { useUser } from "../User/UserContext";
import ProfileSection from './components/ProfileSection';
import StorySection from './components/StorySection';
import ActivitySection from './components/ActivitySection';
import RecentCardsSection from './components/RecentCardsSection';
import CardBookmarkSection from './components/CardBookmarkSection';
import WordBookmarkSection from './components/WordBookmarkSection';
import { fetchUserProfile, fetchUserCards, fetchRecentCards, fetchBookmarkedCards } from './components/api/apiService';
import { handleBookmarkToggle, handleCardClick, formatDate } from './components/utility/utility';
import axios from "axios";

const MyPage = () => {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('activity');
    const [recentCards, setRecentCards] = useState([]);
    const [bookmarkedCards, setBookmarkedCards] = useState([]);
    const [profileData, setProfileData] = useState({ nickname: '', email: '', oneLineResolution: '' });
    const [userCards, setUserCards] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    // 북마크 목록을 갱신하는 함수
    const refreshBookmarkedCards = async () => {
        if (!user || !user.email) return;
        try {
            const updatedBookmarkedCards = await fetchBookmarkedCards(user.email, apiUrl);
            setBookmarkedCards(updatedBookmarkedCards);  // 북마크 목록 업데이트
        } catch (error) {
            console.error("북마크 목록 갱신 실패:", error);
        }
    };

    // 최근 학습 목록을 갱신하는 함수
    const refreshRecentCards = async () => {
        try {
            const updatedRecentCards = await fetchRecentCards(apiUrl);
            console.log("Updated Recent Cards:", updatedRecentCards);
            setRecentCards(updatedRecentCards);  // 상태 업데이트
        } catch (error) {
            console.error("최근 학습 목록 갱신 실패:", error);
        }
    };

// 즐겨찾기된 카드 목록을 불러오는 함수 (최신순 정렬)
    const fetchBookmarkedCards = async () => {
        try {
            const userEmail = sessionStorage.getItem('useremail'); // 사용자 이메일을 세션에서 가져옴

            if (!userEmail) {
                console.error('User email is null or undefined');
                return [];
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

                return sortedBookmarkedCards;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Failed to fetch bookmarked cards:', error);
            return [];  // 오류 발생 시 빈 배열 반환
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


    useEffect(() => {
        if (!user || !user.email) return;

        const loadData = async () => {
            setLoading(true);
            try {
                const profile = await fetchUserProfile(user.email, apiUrl);
                setProfileData(profile);

                const cards = await fetchUserCards(apiUrl);
                setUserCards(cards || []);

                await refreshRecentCards();
                await refreshBookmarkedCards();
            } catch (error) {
                console.error("데이터 로드 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user, apiUrl]); // <- 의존성 배열에 주의

    // 북마크 토글 후 북마크 목록 새로고침
    const handleBookmarkToggleAndUpdate = async (cardNumber) => {
        const result = await handleBookmarkToggle(cardNumber, apiUrl);  // 북마크 토글 호출 후 결과 반환
        await refreshBookmarkedCards();  // 북마크 목록 새로고침
        return result;  // result를 반환해 CardItem에서 사용할 수 있도록 함
    };

    // 카드 클릭 후 최근 학습 목록 업데이트
    const handleCardClickAndUpdate = async (cardNumber) => {
        await handleCardClick(cardNumber, userCards, recentCards, setRecentCards, apiUrl);  // 카드 클릭 처리
        await refreshRecentCards();  // 클릭 후 바로 최근 학습 목록 새로고침
    };

    const renderContent = () => {
        if (loading) {
            return <div>로딩 중...</div>;  // 로딩 상태 시 보여줄 화면
        }

        switch (activeTab) {
            case 'activity':
                return (
                    <ActivitySection
                        userCards={userCards}
                        bookmarkedCards={bookmarkedCards}
                        formatDate={formatDate}
                        handleCardClick={handleCardClickAndUpdate}  // 클릭 후 즉시 반영
                        handleBookmarkToggle={handleBookmarkToggleAndUpdate}  // 북마크 토글 후 UI 업데이트
                    />
                );
            case 'recent':
                return (
                    <RecentCardsSection
                        recentCards={recentCards}
                        bookmarkedCards={bookmarkedCards}
                        handleCardClick={handleCardClickAndUpdate}  // 클릭 후 즉시 반영
                        handleBookmarkToggle={handleBookmarkToggleAndUpdate}  // 북마크 토글 후 UI 업데이트
                    />
                );
            case 'card_bookmark':
                return (
                    <CardBookmarkSection
                        bookmarkedCards={bookmarkedCards}
                        handleCardClick={handleCardClickAndUpdate}  // 클릭 후 즉시 반영
                        handleBookmarkToggle={handleBookmarkToggleAndUpdate}  // 북마크 토글 후 UI 업데이트
                    />
                );
            case 'word_bookmark':
                return <WordBookmarkSection />;
            default:
                return null;
        }
    };

    return (
        <div className="mypage">
            <div className="mypage-header">
                <ProfileSection profileData={profileData} />
                <StorySection />
            </div>

            <div className="mypage-tabs">
                <button onClick={() => setActiveTab('activity')} className={activeTab === 'activity' ? 'mypage-active' : ''}>
                    내 활동
                </button>
                <button onClick={() => setActiveTab('recent')} className={activeTab === 'recent' ? 'mypage-active' : ''}>
                    최근 학습
                </button>
                <button onClick={() => setActiveTab('card_bookmark')} className={activeTab === 'card_bookmark' ? 'mypage-active' : ''}>
                    카드 즐겨찾기
                </button>
                <button onClick={() => setActiveTab('word_bookmark')} className={activeTab === 'word_bookmark' ? 'mypage-active' : ''}>
                    단어 즐겨찾기
                </button>
            </div>

            {renderContent()}
        </div>
    );
};

export default MyPage;
