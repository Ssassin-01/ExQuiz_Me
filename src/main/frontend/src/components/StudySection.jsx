import React, { useState, useEffect } from "react";
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
            <Tab eventKey="overall" title="전부"></Tab>
            <Tab eventKey="studySet" title="카드"></Tab>
            <Tab eventKey="user" title="유저"></Tab>
          </Tabs>
        </div>
        <div className="study-tools">
          <div className="search-box">
            <form onSubmit={handleSearch}>
              <input
                  type="text"
                  placeholder="검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit">검색</button>
            </form>
          </div>
        </div>
        {selectedCategory === "overall" || selectedCategory === "studySet" ? (
            <>
              <h3>학습카드리스트</h3>
              <div className="study-cards-list">
                {studyCards.map((card) => (
                    <Card
                        key={card.cardNumber}
                        cardNumber={card.cardNumber} // cardNumber 전달
                        cardTitle={card.title}
                        cardWriter={card.userEmail}
                        cardDate={card.writeDateTime}
                        initialViewCount={card.countView} // 초기 조회수를 전달
                        onLearnClick={() => handleCardClick(card)} // 클릭 핸들러 함수 전달
                    />
                ))}
              </div>
            </>
        ) : null}
        {selectedCategory === "overall" || selectedCategory === "user" ? (
            <>
              <h3>카드</h3>
              <div className="study-cards-list">
                {userCards.map((card) => (
                    <Card
                        key={card.cardNumber}
                        cardNumber={card.cardNumber} // cardNumber 전달
                        cardTitle={card.title}
                        cardWriter={card.userEmail}
                        cardDate={card.writeDateTime}
                        initialViewCount={card.countView} // 초기 조회수를 전달
                        onLearnClick={() => handleCardClick(card)} // 클릭 핸들러 함수 전달
                    />
                ))}
              </div>
            </>
        ) : null}
      </div>
  );
};

export default StudySection;
