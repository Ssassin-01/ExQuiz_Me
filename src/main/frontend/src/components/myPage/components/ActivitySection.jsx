import React, { useState } from 'react';
import CardItem from "./CardItem";
import Graph from "./Graph";
import "./css/ActivitySection.css";
import BadgeItem from "./BageItem";
import MyCardList from "./MyCardList";

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

    const [isModalOpen, setModalOpen] = useState(false); // 모달 상태 추가

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

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
                            key={card.cardNumber}  // 고유 키로 수정 (index 제거)
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
            <Graph />

            {/* 모든 카드 리스트를 보여주는 MyCardList 모달 */}
            {isModalOpen && (
                <MyCardList closeModal={closeModal}>
                    <h3>전체 카드 목록</h3>
                    <div className="mypage-post-items">
                        {updatedUserCards.map((card) => (
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
                            />
                        ))}
                    </div>
                </MyCardList>
            )}
        </div>
    );
};

export default ActivitySection;
