import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./trash22/Home.css";
import Card from "./Card";
import UserCard from "./UserCard";
import mainImg from "../../images/main_img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

const Home = () => {
  const [popularCards, setPopularCards] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const fetchPopularCards = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/cards/popular`, {
          withCredentials: true
        });
        setPopularCards(response.data.slice(0, 3)); // 조회수가 높은 카드 3개만 설정
      } catch (error) {
        console.error('Failed to fetch popular cards:', error);
      }
    };

    fetchPopularCards();
  }, [apiUrl]);

  const handleLearnClick = (card) => {
    console.log("Navigating to Learn page with card:", card);
    navigate('/learn', { state: { vocabularyItems: card.vocabularyItems } });
  };

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
          <h3>배스트 top3</h3>
          <Slider {...settings}>
            {popularCards.map((card) => (
                <Card
                    key={card.cardNumber}
                    cardNumber={card.cardNumber}
                    cardTitle={card.title}
                    cardWriter={card.userEmail}
                    cardDate={card.writeDateTime}
                    initialViewCount={card.countView}
                    onLearnClick={() => handleLearnClick(card)} // Learn 버튼 클릭 시 handleLearnClick 호출
                />
            ))}
          </Slider>
        </div>
      </div>
  );
};

export default Home;