import React, { useState, useEffect } from 'react';
import CardItem from "../../card/CardItem";
import "./css/ActivitySection.css";
import BadgeItem from "./BageItem";
import MyCardList from "./MyCardList";
import LineGraph from "./LineGraph";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from '../../User/UserContext';
import { checkUserSubscription } from '../api/apiService';

const ActivitySection = ({
                             userCards = [],
                             bookmarkedCards = [],
                             formatDate,
                             handleCardClick,
                             handleBookmarkToggle
                         }) => {
    const updatedUserCards = userCards.map(card => {
        const isBookmarked = bookmarkedCards.some(
            bookmarkedCard => bookmarkedCard.cardNumber === card.cardNumber
        );
        return { ...card, isBookmarked };
    });

    const navigate = useNavigate(); // navigate 훅 사용
    const { user } = useUser();

    const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 추가
    const [isSubscribed, setIsSubscribed] = useState(false); // 구독 상태 추가

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchSubscriptionStatus = async () => {
            if (user && user.email) {
                try {
                    const subscriptionStatus = await checkUserSubscription(user.email, apiUrl);
                    setIsSubscribed(subscriptionStatus);  // 구독 상태 설정
                } catch (error) {
                    console.error("Failed to check subscription status:", error);
                }
            }
        };

        fetchSubscriptionStatus();
    }, [user, apiUrl]);

    const handleCardDelete = async (cardNumber) => {
        try {
            const response = await axios.delete(`${apiUrl}/api/cards/${cardNumber}`, {
                withCredentials: true // 세션 쿠키를 전송
            });
            if (response.status === 200) {
                console.log(`Card ${cardNumber} deleted successfully`);
                closeModal();
                // 마이페이지로 리디렉션
                window.location.reload();
            } else {
                console.error('Failed to delete card');
            }
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    // 카드 수정 기능 (수정 페이지로 이동하거나 수정 모달 열기)
    const handleEditCard = (cardNumber) => {
        // 수정 페이지로 이동, cardNumber를 URL 파라미터로 전달
        navigate(`/edit-card/${cardNumber}`);
    };

    return (
        <div className="mypage-activity-content">
            <div className="mypage-activity-posts">
                <div className="mypage-activity-header">
                    <h4>내 게시물</h4>
                    <button className="mypage-add-btn" onClick={openModal}>+</button>  {/* + 버튼 추가 */}

                </div>
                <div className="mypage-post-items">
                    {updatedUserCards.slice(0, 3).map((card) => (  // 3개의 카드만 출력
                        <CardItem
                            key={card.cardNumber}  // 고유 키로 수정
                            title={card.title}
                            description={card.cardContent}
                            author={card.nickname}
                            date={formatDate(card.writeDateTime)}
                            isBookmarked={card.isBookmarked}
                            cardNumber={card.cardNumber}
                            vocabularyItems={card.vocabularyItems}
                            initialViewCount={card.countView}
                            onBookmarkToggle={() => handleBookmarkToggle(card.cardNumber)}
                            purpose={card.purpose}
                            onCardClick={() => handleCardClick(card.cardNumber)}
                            onEditClick={handleEditCard}
                            onDeleteClick={handleCardDelete}
                            showHamburgerMenu={true}
                        />
                    ))}
                </div>
            </div>
            <div className="mypage-activity-badges">
                <h4>내 뱃지</h4>
                <div className="mypage-badge-items">
                    {['🏆', '🥇', '💎', '🚀', '🎯', '🛡️'].slice(0, window.innerWidth < 768 ? 4 : 6).map((badge, index) => (
                        <BadgeItem key={index} badge={badge} />
                    ))}
                </div>
            </div>
            {isSubscribed && <LineGraph />}  {/* 구독자만 라인 그래프 표시 */}

            {/* 모든 카드 리스트를 보여주는 MyCardList 모달 */}
            {isModalOpen && (
                <MyCardList
                    closeModal={closeModal}
                    title="전체 카드 목록"
                    updatedUserCards={updatedUserCards}
                />

            )}
        </div>
    );
};

export default ActivitySection;