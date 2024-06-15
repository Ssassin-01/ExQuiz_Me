import React from "react";
import Slider from "react-slick";
import "./css/Home.css";
import Card from "./card/Card";
import UserCard from "./card/UserCard";
import mainImg from "./../images/main_img.png"
const Home = () => {
  const studyCards = [
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
    {
      id: 4,
      title: "Study Card 4",
      cardWriter: "JoJu",
      cardDate: "2021-11-02",
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

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };


  return (
      <div className="home-container">
        <div className="main-image">
          <img
              src={mainImg}
              alt="Site Main"
              style={{
                width: "100%",
                height: "400px",
                borderRadius: "8px",
                marginBottom: "20px",
              }}
          />
        </div>
        <div className="study-cards">
          <h3>Recommended Study Cards</h3>
          <Slider {...settings}>
            {studyCards.map((card) => (
                <Card
                    key={card.id}
                    cardTitle={card.title}
                    cardWriter={card.cardWriter} // Example value for the author's name
                    cardDate={card.cardDate} // Example value for the date
                    cardImageUrl={card.cardImageUrl}
                    logoImageUrl={card.logoImageUrl} // Example value for the logo image
                />
            ))}
          </Slider>
        </div>
        <div className="user-cards">
          <h3>Recommended User Cards</h3>
          <Slider {...settings}>
            {userCards.map((user) => (
                <UserCard
                    key={user.id}
                    nickname={user.name} // Example value for the author's name
                    profileImageUrl={user.imageUrl}
                    recommendations={user.bio} // Example value for the logo image
                />
            ))}
          </Slider>
        </div>
      </div>
  );
};

export default Home;
