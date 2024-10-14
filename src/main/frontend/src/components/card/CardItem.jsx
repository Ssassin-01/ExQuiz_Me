import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import './css/CardItem.css';
import { FaEye, FaEllipsisV } from 'react-icons/fa'; // 햄버거 메뉴 아이콘 추가
import { handleCardClick as utilityHandleCardClick } from '../myPage/utility/utility'; // utility의 handleCardClick 불러오기

const CardItem = ({
                      title,
                      description,
                      author,
                      date,
                      purpose,
                      isBookmarked,
                      onBookmarkToggle,
                      cardNumber,
                      initialViewCount,
                      vocabularyItems,
                      userCards,
                      recentCards,
                      setRecentCards,
                      onEditClick,
                      onDeleteClick,
                      showHamburgerMenu = false
                  }) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);
    const [wordBookmark, setWordBookmark] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [viewCount, setViewCount] = useState(initialViewCount);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const apiUrl = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    useEffect(() => {
        setBookmarked(isBookmarked);
    }, [isBookmarked]);

    // 기존 handleCardClick 제거
    const handleCardClick = (e) => {
        e.preventDefault();
        utilityHandleCardClick(cardNumber, userCards, recentCards, setRecentCards, apiUrl); // utility 함수 사용
        navigate(`/learning/${cardNumber}`, {
            state: { vocabularyItems },
        });
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen); // 햄버거 메뉴 토글
    };

    const handleBookmarkToggle = async () => {
        setIsLoading(true);
        try {
            const response = await onBookmarkToggle();
            if (response === 'Bookmarked') {
                setBookmarked(true);
            } else if (response === 'Unbookmarked') {
                setBookmarked(false);
            }
        } catch (error) {
            console.error('Error toggling bookmark:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return moment(dateString, 'YYYY-MM-DD').format('YYYY.MM.DD');
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
                <span
                    className={`card-item-bookmark-icon ${bookmarked ? 'bookmarked' : ''}`}
                    onClick={handleBookmarkToggle}
                >
          {bookmarked ? '★' : '☆'}
        </span>
                {/* 햄버거 메뉴 아이콘 조건부 렌더링 */}
                {showHamburgerMenu && (
                    <>
                        <FaEllipsisV className="card-hamburger-menu" onClick={toggleMenu} />

                        {/* 햄버거 메뉴 열렸을 때 수정/삭제 버튼 표시 */}
                        {isMenuOpen && (
                            <div className="card-menu-dropdown">
                                {onEditClick && (
                                    <button
                                        className="card-menu-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onEditClick(cardNumber);
                                            setIsMenuOpen(false); // 메뉴 닫기
                                        }}
                                    >
                                        수정하기
                                    </button>
                                )}
                                {onDeleteClick && (
                                    <button
                                        className="card-menu-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onDeleteClick(cardNumber);
                                            setIsMenuOpen(false); // 메뉴 닫기
                                        }}
                                    >
                                        삭제하기
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
            <p>{description}</p>
            <div className="card-item-post-info">
                작성자: {author}
                <br />
                작성일: {formatDate(date)}
            </div>
            {renderPurposeTag(purpose)}
            <button className="card-item-view-more-btn" onClick={handleCardClick}>
                자세히 보기
            </button>
        </div>
    );
};

export default CardItem;
