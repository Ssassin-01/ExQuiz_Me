import React from 'react';
import CardItem from "./CardItem";
import Graph from "./Graph";
import BadgeItem from "./BageItem";

const ActivitySection = ({
                             userCards = [],  // 기본값: 빈 배열
                             bookmarkedCards = [],  // 기본값: 빈 배열
                             formatDate,
                             handleCardClick,
                             handleBookmarkToggle
                         }) => {
    // userCards와 bookmarkedCards를 비교하여 북마크 상태를 설정
    const updatedUserCards = userCards.map(card => {
        // bookmarkedCards가 빈 배열이어도 some()을 사용할 수 있음
        const isBookmarked = bookmarkedCards.some(bookmarkedCard => bookmarkedCard.cardNumber === card.cardNumber);
        return { ...card, isBookmarked };  // 북마크 상태를 각 카드에 추가
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
                            onBookmarkToggle={() => handleBookmarkToggle(card.cardNumber)}  // handleBookmarkToggle 전달
                            purpose={card.purpose}
                            onCardClick={() => handleCardClick(card.cardNumber)}
                        />
                    ))}
                </div>
            </div>
            <div className="mypage-activity-badges">
                <h4>내 뱃지</h4>
                <div className="mypage-badge-items">
                    {['🏆', '🥇', '💎', '🚀', '🎯', '🛡️'].map((badge, index) => (
                        <BadgeItem key={index} badge={badge} />
                    ))}
                </div>
            </div>
            {/* Graph는 activityData와 activityOptions를 내부에서 처리 */}
            <Graph />
        </div>
    );
};

export default ActivitySection;
