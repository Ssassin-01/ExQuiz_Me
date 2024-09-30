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
import { fetchUserProfile, fetchUserCards, fetchRecentCards, fetchBookmarkedCards } from './api/apiService';  // apiService.js에서 불러옴
import { handleBookmarkToggle, handleCardClick, formatDate } from './utility/utility';

const MyPage = () => {
    const { user } = useUser();
    const [activeTab, setActiveTab] = useState('activity');
    const [recentCards, setRecentCards] = useState([]);
    const [bookmarkedCards, setBookmarkedCards] = useState([]);
    const [profileData, setProfileData] = useState({ nickname: '', email: '', oneLineResolution: '' });
    const [userCards, setUserCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    // 북마크 목록을 갱신하는 함수
    const refreshBookmarkedCards = async () => {
        if (!user || !user.email) return;
        try {
            const updatedBookmarkedCards = await fetchBookmarkedCards(user.email, apiUrl);
            setBookmarkedCards(updatedBookmarkedCards);
        } catch (error) {
            console.error("북마크 목록 갱신 실패:", error);
        }
    };

    // 최근 학습 목록을 갱신하는 함수
    const refreshRecentCards = async () => {
        try {
            const updatedRecentCards = await fetchRecentCards(apiUrl);
            setRecentCards(updatedRecentCards);
        } catch (error) {
            console.error("최근 학습 목록 갱신 실패:", error);
        }
    };

    // 컴포넌트가 로드될 때 데이터를 불러옴
    useEffect(() => {
        if (!user || !user.email) {
            console.error("User not logged in or email missing");
            return;
        }

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
    }, [user, apiUrl]);

    // 북마크 토글 후 북마크 목록 새로고침
    const handleBookmarkToggleAndUpdate = async (cardNumber) => {
        const result = await handleBookmarkToggle(cardNumber, apiUrl);
        await refreshBookmarkedCards();
        return result;
    };

    // 카드 클릭 후 최근 학습 목록 업데이트
    const handleCardClickAndUpdate = async (cardNumber) => {
        try {
            // 이미 최근 학습에 추가된 카드인지 확인
            const isAlreadyInRecent = recentCards.some(card => card.cardNumber === cardNumber);

            if (!isAlreadyInRecent) {
                console.log('카드가 이미 최근 학습에 존재하지 않음, 추가 진행');
                // 중복된 카드가 없을 때만 처리
                await handleCardClick(cardNumber, userCards, recentCards, setRecentCards, apiUrl);
                await refreshRecentCards();  // 최근 학습 목록 갱신
            } else {
                console.log('이미 최근 학습 목록에 존재하는 카드, 추가하지 않음');
            }
        } catch (error) {
            console.error("카드 클릭 및 업데이트 중 오류 발생:", error);
        }
    };

    const renderContent = () => {
        if (loading) {
            return <div>로딩 중...</div>;
        }

        switch (activeTab) {
            case 'activity':
                return (
                    <ActivitySection
                        userCards={userCards}
                        bookmarkedCards={bookmarkedCards}
                        formatDate={formatDate}
                        handleCardClick={handleCardClickAndUpdate}
                        handleBookmarkToggle={handleBookmarkToggleAndUpdate}
                    />
                );
            case 'recent':
                return (
                    <RecentCardsSection
                        recentCards={recentCards}
                        bookmarkedCards={bookmarkedCards}
                        handleCardClick={handleCardClickAndUpdate}
                        handleBookmarkToggle={handleBookmarkToggleAndUpdate}
                    />
                );
            case 'card_bookmark':
                return (
                    <CardBookmarkSection
                        bookmarkedCards={bookmarkedCards}
                        handleCardClick={handleCardClickAndUpdate}
                        handleBookmarkToggle={handleBookmarkToggleAndUpdate}
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
