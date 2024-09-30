import React, { useState, useEffect } from "react";
import "./css/Study.css";
import { Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import { useUser } from './User/UserContext';
import CardItem from "./card/CardItem";
import { fetchUserCards, fetchRecentCards, fetchBookmarkedCards, fetchStudyCards } from './myPage/api/apiService'; // 전체 카드 불러오기 추가
import { handleCardClick, handleBookmarkToggle, formatDate } from './myPage/utility/utility';

const StudySection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("overall");
  const [studyCards, setStudyCards] = useState([]); // 학습 카드 리스트
  const [userCards, setUserCards] = useState([]);
  const [recentCards, setRecentCards] = useState([]);
  const [bookmarkedCards, setBookmarkedCards] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 토글 상태
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedStudyCards = await fetchStudyCards(apiUrl); // 전체 카드 불러오기
        const fetchedUserCards = await fetchUserCards(apiUrl);
        const fetchedBookmarkedCards = await fetchBookmarkedCards(user.email, apiUrl);
        const fetchedRecentCards = await fetchRecentCards(apiUrl);

        setStudyCards(fetchedStudyCards); // 전체 학습 카드 설정
        setUserCards(fetchedUserCards);
        setRecentCards(fetchedRecentCards);
        setBookmarkedCards(fetchedBookmarkedCards);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    if (user && user.email) {
      loadData();
    }
  }, [apiUrl, user]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const getUpdatedCards = (cards) => {
    return cards.map(card => {
      const isBookmarked = bookmarkedCards.some(bookmarkedCard => bookmarkedCard.cardNumber === card.cardNumber);
      return { ...card, isBookmarked };
    });
  };

  return (
      <div className="study-section-wrapper">
        {/* 상단: 카테고리 버튼 */}
        <div className="study-section-header">
          <div className="study-section-categories">
            <Tabs
                defaultActiveKey="overall"
                id="fill-tab-example"
                className="study-section-tabs"
                fill
                onSelect={(selectedKey) => setSelectedCategory(selectedKey)}
            >
              <Tab eventKey="overall" title="전체" />
              <Tab eventKey="studySet" title="학습 카드" />
              <Tab eventKey="user" title="내 카드" />
            </Tabs>
          </div>
        </div>

        {/* 카드 리스트 섹션 */}
        <div className="study-section-cards-container">
          {selectedCategory === "overall" || selectedCategory === "studySet" ? (
              <>
                <h3 className="study-section-h3">학습 카드 리스트</h3>
                <div className="study-section-cards-list">
                  {getUpdatedCards(studyCards).map((card) => (
                      <CardItem
                          key={card.cardNumber}
                          title={card.title}
                          description={card.cardContent}
                          author={card.nickname || 'Unknown'}
                          date={formatDate(card.writeDateTime)}
                          cardNumber={card.cardNumber}
                          vocabularyItems={card.vocabularyItems}
                          initialViewCount={card.countView}
                          isBookmarked={card.isBookmarked}
                          onCardClick={() => handleCardClick(card.cardNumber, userCards, recentCards, setRecentCards, apiUrl)}
                          onBookmarkToggle={() => handleBookmarkToggle(card.cardNumber, apiUrl)}
                          purpose={card.purpose || '기타'}
                      />
                  ))}
                </div>
              </>
          ) : null}

          {selectedCategory === "overall" || selectedCategory === "user" ? (
              <>
                <h3 className="study-section-h3">내 카드</h3>
                <div className="study-section-cards-list">
                  {getUpdatedCards(userCards).map((card) => (
                      <CardItem
                          key={card.cardNumber}
                          title={card.title}
                          description={card.cardContent}
                          author={card.nickname || 'Unknown'}
                          date={formatDate(card.writeDateTime)}
                          cardNumber={card.cardNumber}
                          vocabularyItems={card.vocabularyItems}
                          initialViewCount={card.countView}
                          isBookmarked={card.isBookmarked}
                          onCardClick={() => handleCardClick(card.cardNumber, userCards, recentCards, setRecentCards, apiUrl)}
                          onBookmarkToggle={() => handleBookmarkToggle(card.cardNumber, apiUrl)}
                          purpose={card.purpose || '기타'}
                      />
                  ))}
                </div>
              </>
          ) : null}
        </div>

        {/* 플로팅 검색 버튼 */}
        <div className="floating-search">
          <button className="search-btn" onClick={toggleSearch}>
            🔍
          </button>
          {isSearchOpen && (
              <form onSubmit={handleSearch} className="floating-search-box">
                <input
                    type="text"
                    placeholder="카드를 검색하세요..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">검색</button>
              </form>
          )}
        </div>
      </div>
  );
};

export default StudySection;
