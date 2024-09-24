import React from 'react';
import CardItem from "./CardItem";
import moment from 'moment';

const RecentCardsSection = ({ recentCards, timeAgo, handleCardClick, handleBookmarkToggle }) => {
    if (!recentCards || recentCards.length === 0) {
        return <p>최근 학습한 카드가 없습니다.</p>; // 데이터가 없을 경우 표시
    }


    return (
        <div className="mypage-recent-cards">
            <h3>최근 학습</h3>
            <div className="mypage-recent-cards-list">
                {recentCards.map((card) => {
                    console.log('Recent Card Data:', card); // 서버에서 온 데이터 확인
                    return (
                        <CardItem
                            key={card.cardNumber}
                            title={card.cardTitle || '제목 없음'} // title에 cardTitle 값을 전달
                            author={card.nickname || 'Unknown'}
                            date={card.writeDateTime}  // 작성일 표시
                            purpose={card.purpose || '기타'}
                            isBookmarked={card.isBookmarked || false}
                            onBookmarkToggle={() => handleBookmarkToggle(card.cardNumber)}
                            onCardClick={() => handleCardClick(card.cardNumber)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default RecentCardsSection;
