// CardItem.jsx
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './css/CardItem.css';

const CardItem = ({ title, description, author, date, purpose, isBookmarked, onBookmarkToggle, onCardClick, timeAgo }) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);
    const [isLoading, setIsLoading] = useState(false); // 서버 요청 중 상태 관리

    // 초기 북마크 상태 설정
    useEffect(() => {
        setBookmarked(isBookmarked);  // 서버에서 전달된 초기 북마크 상태로 설정
    }, [isBookmarked]);

    // 북마크 토글 함수
    const handleBookmarkToggle = async () => {
        try {
            const response = await onBookmarkToggle();  // 부모 컴포넌트에서 전달된 함수 호출
            if (typeof response === 'string') {
                setBookmarked(response === "Bookmarked");  // 서버 응답에 따라 상태 업데이트
            } else if (response && response.data) {
                setBookmarked(response.data === "Bookmarked");
            } else {
                console.error("Unexpected response structure:", response);
            }
        } catch (error) {
            console.error("Error toggling bookmark:", error);
        }
    };

    // 카드 클릭 시 호출되는 함수
    const handleCardClick = (e) => {
        e.preventDefault(); // 페이지 리프레시 방지
        onCardClick(); // 외부에서 전달된 카드 열람 함수 호출
    };

    // 날짜 포맷팅 함수 (moment 사용)
    const formatDate = (dateString) => {
        if (!dateString) {
            return 'Invalid Date';
        }
        return moment(dateString).format('YYYY-MM-DD HH:mm'); // 원하는 형식으로 포맷
    };

    // 카드 용도(purpose)에 따라 다른 스타일과 텍스트 적용
    const renderPurposeTag = (purpose) => {
        let className = '';
        let purposeText = '';

        switch (purpose) {
            case '초등학생 영단어':
                className = 'purpose-elementary';
                purposeText = '초등';
                break;
            case '중학생 영단어':
                className = 'purpose-middle';
                purposeText = '중등';
                break;
            case '고등학생 영단어':
                className = 'purpose-high';
                purposeText = '고등';
                break;
            case '수능':
                className = 'purpose-exam';
                purposeText = '수능';
                break;
            case '토익':
                className = 'purpose-toeic';
                purposeText = '토익';
                break;
            default:
                className = 'purpose-default';
                purposeText = '기타';
                break;
        }

        return <div className={`post-type ${className}`}>{purposeText}</div>;
    };

    return (
        <div className={`mypage-post-item ${isLoading ? 'loading' : ''}`}>
            <div className="post-header">
                <h5>{title}</h5>
                <span className={`bookmark-icon ${bookmarked ? 'bookmarked' : ''}`} onClick={handleBookmarkToggle}>
                    {bookmarked ? '★' : '☆'}
                </span>
            </div>
            <p>{description}</p>
            <div className="post-info">
                작성자: {author} |
                작성일: {formatDate(date)}
            </div>
            {timeAgo && (  // timeAgo 값이 있을 때만 경과 시간 표시
                <div className="time-ago">
                    {timeAgo}
                </div>
            )}
            {renderPurposeTag(purpose)}
            <a href="#" className="view-more-btn" onClick={handleCardClick}>자세히 보기</a>
        </div>
    );
};

export default CardItem;
