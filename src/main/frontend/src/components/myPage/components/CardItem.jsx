import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './css/CardItem.css';
import { FaEye } from 'react-icons/fa'; // 조회수 이모지 사용

const CardItem = ({
                      title,
                      description,
                      author,
                      date,
                      purpose,
                      isBookmarked,
                      onBookmarkToggle,
                      onCardClick,
                      cardNumber,
                      initialViewCount,
                      vocabularyItems
                  }) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);
    const [isLoading, setIsLoading] = useState(false);
    const [viewCount, setViewCount] = useState(initialViewCount);
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        setBookmarked(isBookmarked);
    }, [isBookmarked]);

    const handleCardClick = async (e) => {
        e.preventDefault();
        onCardClick(); // 부모 컴포넌트에서 전달된 카드 클릭 함수 호출

        try {
            const response = await axios.post(`${apiUrl}/api/cards/${cardNumber}/view`, {}, { withCredentials: true });
            if (response.data) {
                const updatedCard = response.data;
                setViewCount(updatedCard.countView);
                setBookmarked(updatedCard.bookmarked);
            } else {
                console.error("Unexpected response structure:", response.data);
            }
        } catch (error) {
            console.error('조회수 증가 오류:', error);
        }

        navigate(`/learning/${cardNumber}`, {
            state: { vocabularyItems }
        });
    };

    const handleBookmarkToggle = async () => {
        setIsLoading(true);
        try {
            const response = await onBookmarkToggle();
            if (response === "Bookmarked") {
                setBookmarked(true);
            } else if (response === "Unbookmarked") {
                setBookmarked(false);
            }
        } catch (error) {
            console.error("Error toggling bookmark:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return moment(dateString, "YYYY-MM-DD").format("YYYY.MM.DD");
    };

    const renderPurposeTag = (purpose) => {
        let className = '';
        let purposeText = '';

        switch (purpose) {
            case '초등학생 영단어':
                className = 'card-item-purpose-elementary';
                purposeText = '초등';
                break;
            case '중학생 영단어':
                className = 'card-item-purpose-middle';
                purposeText = '중등';
                break;
            case '고등학생 영단어':
                className = 'card-item-purpose-high';
                purposeText = '고등';
                break;
            case '수능':
                className = 'card-item-purpose-exam';
                purposeText = '수능';
                break;
            case '토익':
                className = 'card-item-purpose-toeic';
                purposeText = '토익';
                break;
            default:
                className = 'card-item-purpose-default';
                purposeText = '기타';
                break;
        }

        return (
            <div className="card-item-bottom-row">
                <div className={`card-item-post-type ${className}`}>{purposeText}</div>
                <div className="card-item-post-views">
                    <FaEye /> {viewCount}
                </div>
            </div>
        );
    };

    return (
        <div className={`card-item-post ${isLoading ? 'loading' : ''}`}>
            <div className="card-item-post-header">
                <h5>{title}</h5>
                <span className={`card-item-bookmark-icon ${bookmarked ? 'bookmarked' : ''}`} onClick={handleBookmarkToggle}>
          {bookmarked ? '★' : '☆'}
        </span>
            </div>
            <p>{description}</p>
            <div className="card-item-post-info">
                작성자: {author}<br />
                작성일: {formatDate(date)}
            </div>
            {renderPurposeTag(purpose)}
            <button className="card-item-view-more-btn" onClick={handleCardClick}>자세히 보기</button>
        </div>
    );
};

export default CardItem;
