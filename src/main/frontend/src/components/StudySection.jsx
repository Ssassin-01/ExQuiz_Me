import React, { useEffect, useState } from "react";
import "./css/Study.css";
import { Tabs, Tab } from 'react-bootstrap';
import Card from './card/Card';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GrView } from "react-icons/gr"; // 조회수 아이콘 추가
import { useUser } from './User/UserContext'; // 사용자 정보를 가져오기 위한 훅

const StudySection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("overall");
  const [studyCards, setStudyCards] = useState([]);
  const [userCards, setUserCards] = useState([]); // 사용자별 카드 상태 추가
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [viewCount, setviewCount] = useState(0);
  const { user } = useUser(); // 현재 사용자 정보 가져오기

  useEffect(() => {
    const fetchStudyCards = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/cards`, {
          withCredentials: true
        });
        setStudyCards(response.data);
      } catch (error) {
        console.error('Failed to fetch study cards:', error);
      }
    };
    const fetchUserCards = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/cards/user`, {
          withCredentials: true
        });
        setUserCards(response.data);
      } catch (error) {
        console.error('Failed to fetch user cards:', error);
      }
    };

    fetchStudyCards();
    fetchUserCards();
  }, [apiUrl]);

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleCardClick = (card) => {
    navigate('/learn', { state: { vocabularyItems: card.vocabularyItems } });
  };

  return (
      <div className="study-section">
        <div className="search-categories">
          <Tabs
              defaultActiveKey="overall"
              id="fill-tab-example"
              className="mb-3"
              fill
              onSelect={(selectedKey) => setSelectedCategory(selectedKey)}
          >
            <Tab eventKey="overall" title="Overall Results"></Tab>
            <Tab eventKey="studySet" title="Study Sets"></Tab>
            <Tab eventKey="user" title="Users"></Tab>
          </Tabs>
        </div>
        <div className="study-tools">
          <div className="search-box">
            <form onSubmit={handleSearch}>
              <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
        {selectedCategory === "overall" || selectedCategory === "studySet" ? (
            <>
              <h3>Learning Card List</h3>
              <div className="study-cards-list">
                  {studyCards.map((card) => (
                      <Card
                          key={card.cardNumber}
                          cardNumber={card.cardNumber} // cardNumber 전달
                          cardTitle={card.title}
                          cardWriter={card.userEmail}
                          cardDate={card.writeDateTime}
                          cardImageUrl={card.cardTitleImage}
                          logoImageUrl={card.cardTitleImage}
                          onLearnClick={() => handleCardClick(card)} // Pass the click handler function
                      />
                  ))}
              </div>
            </>
        ) : null}
        {selectedCategory === "overall" || selectedCategory === "user" ? (
            <>
              <h3>Your Cards</h3>
              <div className="user-cards-list">
                {userCards.map((card) => (
                    <Card
                        key={card.cardNumber}
                        cardNumber={card.cardNumber} // cardNumber 전달
                        cardTitle={card.title}
                        cardWriter={card.userEmail}
                        cardDate={card.writeDateTime}
                        cardImageUrl={card.cardTitleImage}
                        logoImageUrl={card.cardTitleImage}
                        onLearnClick={() => handleCardClick(card)} // Pass the click handler function
                    />
                ))}
              </div>
            </>
        ) : null}
      </div>
  );
};

export default StudySection;