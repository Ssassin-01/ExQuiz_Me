import React, {useEffect, useState} from "react";
import "./css/Study.css";
import Slider from "react-slick";
import { Tabs, Tab } from 'react-bootstrap';
import Card from './card/Card';  // Import the new Card component
import UserCard from './card/UserCard';
import axios from "axios";


const StudySection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("overall");

  const studyCards  = [
    {
      id: 1,
      title: "Study Card 1",
      description: "This is a description for Study Card 1.",
      cardWriter: "Jeongmin",
      cardDate: "2001-01-01",
      cardImageUrl: "https://via.placeholder.com/350",
      logoImageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      title: "Study Card 2",
      cardWriter: "Seongmin",
      cardDate: "2201-11-01",
      cardImageUrl: "https://via.placeholder.com/350",
      logoImageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      title: "Study Card 3",
      cardWriter: "JoJu",
      cardDate: "2021-11-01",
      cardImageUrl: "https://via.placeholder.com/350",
      logoImageUrl: "https://via.placeholder.com/100",
    },
  ];

  const userCards = [
    {
      id: 1,
      name: "User 1",
      bio: "Bio of User 1",
      imageUrl: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "User 2",
      bio: "Bio of User 2",
      imageUrl: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "User 3",
      bio: "Bio of User 3",
      imageUrl: "https://via.placeholder.com/200",
    },
  ];

  useEffect(() => {
    const fetchStudyCards = async () => {
      try {
        const response = await axios.get('/api/cards'); // 카드 데이터를 가져오기 위해 GET 요청
        setStudyCards(response.data); // 가져온 데이터를 state에 설정
      } catch (error) {
        console.error("Error fetching study cards:", error); // 오류 처리
      }
    };

    fetchStudyCards(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, []); // 빈 배열로 두면 마운트될 때 한 번만 실행됨

  const getFilteredCards = (category) => {
    if (category === "studySet") {
      return studyCards;
    } else if (category === "user") {
      return userCards;
    }
    return [];
  };

  const handleSearch = (e) => {
    e.preventDefault();
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
                        key={card.cardNumber} // 고유 ID 사용
                        cardTitle={card.title} // 카드 제목
                        cardWriter={card.user.email} // 카드 작성자
                        cardDate={new Date(card.writeDateTime).toLocaleDateString()} // 작성 날짜
                        cardImageUrl={card.cardTitleImage} // 이미지 URL
                    />
                ))}
              </div>
            </>
        ) : null}
        {selectedCategory === "overall" || selectedCategory === "studySet" ? (
            <>
              <h3>Learning Card List</h3>
              <div className="study-cards-list">
                {studyCards.map((card) => (
                    <Card
                        key={card.id}
                        cardTitle={card.title}
                        cardWriter={card.cardWriter}
                        cardDate={card.cardDate}
                        cardImageUrl={card.cardImageUrl}
                        logoImageUrl={card.logoImageUrl}
                    />
                ))}
              </div>
            </>
        ) : null}
        {selectedCategory === "overall" || selectedCategory === "user" ? (
            <>
              <h3>User Card List</h3>
              <div className="study-cards-list">
                {userCards.map((user) => (
                    <UserCard
                        key={user.id}
                        profileImageUrl={user.imageUrl}
                        nickname={user.name}
                        recommendations={user.bio}
                    />
                ))}
              </div>
            </>
        ) : null}
      </div>
  );
};

export default StudySection;