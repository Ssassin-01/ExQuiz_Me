import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './css/CardItem.css';

const CardItem = ({ title, description, author, date, purpose, isBookmarked, onBookmarkToggle, onCardClick }) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);
    const [isLoading, setIsLoading] = useState(false); // 서버 요청 중 상태 관리

    // 초기 북마크 상태 설정
    useEffect(() => {
        setBookmarked(isBookmarked);  // 서버에서 전달된 초기 북마크 상태로 설정
    }, [isBookmarked]);

    // 북마크 토글 함수
    const handleBookmarkToggle = async () => {
        setIsLoading(true); // 로딩 상태로 전환
        try {
            const response = await onBookmarkToggle();  // 부모 컴포넌트에서 전달된 함수 호출
            console.log("onBookmarkToggle response:", response);  // 반환값을 확인하는 로그 추가

            if (!response) {
                console.error("Received undefined response from onBookmarkToggle");
                return;
            }

            // response가 명확히 "Bookmarked" 또는 "Unbookmarked"인 경우 처리
            if (response === "Bookmarked") {
                setBookmarked(true);  // 북마크 상태 업데이트
            } else if (response === "Unbookmarked") {
                setBookmarked(false);  // 북마크 상태 업데이트
            } else {
                console.error("Unexpected response structure:", response);  // 예상치 못한 응답 구조 처리
            }
        } catch (error) {
            console.error("Error toggling bookmark:", error);
        } finally {
            setIsLoading(false); // 로딩 상태 해제
        }
    };

    // 카드 클릭 시 호출되는 함수
    const handleCardClick = (e) => {
        e.preventDefault(); // 페이지 리프레시 방지
        onCardClick(); // 외부에서 전달된 카드 열람 함수 호출
    };

    // 날짜 포맷팅 함수 (moment 사용)
    const formatDate = (dateString) => {
        // 입력된 날짜가 ISO 또는 RFC2822 형식이 아니라면 적절히 변환
        return moment(dateString, "YYYY-MM-DD").format("YYYY.MM.DD");
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
            {renderPurposeTag(purpose)}
            <a href="#" className="view-more-btn" onClick={handleCardClick}>자세히 보기</a>
        </div>
    );
};

export default CardItem;
