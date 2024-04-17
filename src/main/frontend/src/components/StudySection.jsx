import React, { useState } from "react";
import "./css/Study.css";
import {Tabs, Tab} from 'react-bootstrap';

const StudySection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("overall");
  const studyCards = [
    {
      id: 1,
      title: "Study Card 1",
      description: "Description for Study Card 1",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Study Card 2",
      description: "Description for Study Card 2",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Study Card 3",
      description: "Description for Study Card 3",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  const userCards = [
    {
      id: 1,
      name: "User 1",
      bio: "Bio of User 1",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 2,
      name: "User 2",
      bio: "Bio of User 2",
      imageUrl: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "User 3",
      bio: "Bio of User 3",
      imageUrl: "https://via.placeholder.com/100",
    },
  ];

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
          <Tab eventKey="overall" title="Overall Results">
          </Tab>
          <Tab eventKey="studySet" title="Study Sets">
          </Tab>
          <Tab eventKey="user" title="Users">
          </Tab>
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
          <div className="cards-list">
            {studyCards.map((card) => (
              <div key={card.id} className="card">
                <img src={card.imageUrl} alt={card.title} />
                <h4>{card.title}</h4>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : null}
      {selectedCategory === "overall" || selectedCategory === "user" ? (
        <>
          <h3>User Card List</h3>
          <div className="cards-list">
            {userCards.map((user) => (
              <div key={user.id} className="card">
                <img src={user.imageUrl} alt={user.name} />
                <h4>{user.name}</h4>
                <p>{user.bio}</p>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default StudySection;
