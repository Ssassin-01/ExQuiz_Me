import React from 'react';
import CardItem from './CardItem';
import "./css/RecentCardsSection.css";

const RecentCardsSection = ({ recentCards = [], bookmarkedCards = [], handleCardClick, handleBookmarkToggle }) => {
    if (!recentCards || recentCards.length === 0) {
        return <p>최근 학습한 카드가 없습니다.</p>;
    }

    // 북마크 상태를 추가한 최근 학습 카드 배열 생성
    const updatedRecentCards = recentCards.map(card => {
        const isBookmarked = bookmarkedCards.some(bookmarkedCard => bookmarkedCard.cardNumber === card.cardNumber);
        return { ...card, isBookmarked }; // 북마크 상태 추가
    });

    return (
        <div className="mypage-recent-cards">
            <h3>최근 학습</h3>
            <div className="mypage-recent-cards-list">
                {updatedRecentCards.map((card) => (
                    <CardItem
                        key={card.cardNumber}
                        title={card.cardTitle || '제목 없음'}
                        author={card.nickname || 'Unknown'}
                        date={card.writeDateTime}
                        purpose={card.purpose || '기타'}
                        isBookmarked={card.isBookmarked || false}
                        onBookmarkToggle={() => handleBookmarkToggle(card.cardNumber)} // handleBookmarkToggle 전달
                        onCardClick={() => handleCardClick(card.cardNumber)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentCardsSection;
