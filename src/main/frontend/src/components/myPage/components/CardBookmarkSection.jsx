import React from 'react';
import CardItem from './CardItem';

const CardBookmarkSection = ({ bookmarkedCards = [], handleCardClick, handleBookmarkToggle }) => {

    // 최신순으로 정렬된 북마크된 카드 리스트
    const sortedBookmarkedCards = [...bookmarkedCards].sort((a, b) => new Date(b.bookmarkDate) - new Date(a.bookmarkDate));

    return (
        <div className="mypage-content">
            <h3>카드 즐겨찾기</h3>
            {Array.isArray(sortedBookmarkedCards) && sortedBookmarkedCards.length === 0 ? (
                <p>즐겨찾기한 카드가 없습니다.</p>
            ) : (
                <div className="mypage-card_bookmark-content">
                    {Array.isArray(sortedBookmarkedCards) ? (
                        sortedBookmarkedCards.map((card) => (
                            <CardItem
                                key={card.cardNumber}
                                title={card.title}
                                description={card.cardContent}
                                author={card.nickname || 'Unknown'}
                                purpose={card.purpose || '기타'}
                                date={card.writeDateTime}
                                isBookmarked={true}  // 북마크된 상태를 유지
                                onBookmarkToggle={() => handleBookmarkToggle(card.cardNumber)}  // 북마크 토글 핸들러
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
};


export default CardBookmarkSection;
