import React from 'react';
import CardItem from "./CardItem";
import Graph from "./Graph";

import "./css/ActivitySection.css";
import BadgeItem from "./BageItem";

const ActivitySection = ({
                             userCards = [],  // 기본값: 빈 배열
                             bookmarkedCards = [],  // 기본값: 빈 배열
                             formatDate,
                             handleCardClick,
                             handleBookmarkToggle
                         }) => {
    const updatedUserCards = userCards.map(card => {
        const isBookmarked = bookmarkedCards.some(bookmarkedCard => bookmarkedCard.cardNumber === card.cardNumber);
        return { ...card, isBookmarked };
    });


    return (
        <div className="mypage-activity-content">
            <div className="mypage-activity-posts">
                <h4>내 게시물</h4>
                <div className="mypage-post-items">
                    {updatedUserCards.map((card) => (
                        <CardItem
                            key={card.cardNumber}
                            title={card.title}
                            description={card.cardContent}
                            author={card.nickname}
                            date={formatDate(card.writeDateTime)}
                            isBookmarked={card.isBookmarked}
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
        </div>
    );
};

export default ActivitySection;
