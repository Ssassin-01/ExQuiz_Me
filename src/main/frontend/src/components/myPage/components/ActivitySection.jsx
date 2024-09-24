import React from 'react';
import CardItem from "./CardItem";
import Graph from "./Graph";
import BadgeItem from "./BageItem";


const ActivitySection = ({ userCards, bookmarkedCards, formatDate, handleCardClick, handleBookmarkToggle, activityData, activityOptions }) => {

    // userCards와 bookmarkedCards를 비교하여 북마크 상태를 설정
    const updatedUserCards = userCards.map(card => {
        const isBookmarked = bookmarkedCards.some(bookmarkedCard => bookmarkedCard.cardNumber === card.cardNumber);
        return { ...card, isBookmarked }; // 북마크 상태를 각 카드에 추가
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
                            description={card.cardContent}  // 카드 내용을 보여주기 위한 필드
                            author={card.nickname}
                            date={formatDate(card.writeDateTime)}
                            isBookmarked={card.isBookmarked} // 동적으로 설정된 북마크 상태 전달
                            onBookmarkToggle={() => handleBookmarkToggle(card.cardNumber)}  // 서버와 통신하는 함수 전달
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
            <Graph data={activityData} options={activityOptions} />
        </div>
    );
};

export default ActivitySection;
