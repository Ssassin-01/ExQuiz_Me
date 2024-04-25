import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./css/Home.css";

const Home = () => {
  const studyCards = [
    {
      id: 1,
      title: "Study Card 1",
      description: "This is a description for Study Card 1.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Study Card 2",
      description: "This is a description for Study Card 2.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Study Card 3",
      description: "This is a description for Study Card 3.",
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

  return (
      <div className="home-container">

        <div className="main-image">
          <img
              src="https://via.placeholder.com/1200x300"
              alt="Site Main"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
          />
        </div>
        <div className="study-cards">
          <h3>Recommended Study Cards</h3>
          <div className="cards-list">
            {studyCards.map((card) => (
                <div key={card.id} className="card">
                  <img
                      src={card.imageUrl}
                      alt={card.title}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "cover",
                        borderRadius: "4px",
                        marginBottom: "10px",
                      }}
                  />
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
            ))}
          </div>
        </div>
        <div className="user-cards">
          <h3>Recommended User Cards</h3>
          <div className="cards-list">
            {userCards.map((user) => (
                <div key={user.id} className="card">
                  <img
                      src={user.imageUrl}
                      alt={user.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        margin: "0 auto",
                        marginBottom: "10px",
                      }}
                  />
                  <h4>{user.name}</h4>
                  <p>{user.bio}</p>
                </div>
            ))}
          </div>
        </div>
      </div>
  );
};

export default Home;
