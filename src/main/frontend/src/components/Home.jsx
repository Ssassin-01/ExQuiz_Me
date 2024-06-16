import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./css/Home.css";
import Card from "./card/Card";
import UserCard from "./card/UserCard";
import mainImg from "./../images/main_img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

const Home = () => {
  const [popularCards, setPopularCards] = useState([]);
  const [userCards, setUserCards] = useState([]);
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

    const fetchUserCards = async () => {
      setUserCards([
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
      ]);
    };

    fetchPopularCards();
    fetchUserCards();
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
          <h3>Best Top3 Study Cards</h3>
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
        <div className="user-cards">
          <h3>Recommended User Cards</h3>
          <Slider {...settings}>
            {userCards.map((user) => (
                <UserCard
                    key={user.id}
                    nickname={user.name}
                    profileImageUrl={user.imageUrl}
                    recommendations={user.bio}
                />
            ))}
          </Slider>
        </div>
      </div>
  );
};

export default Home;

// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "./css/Home.css";
// import Card from "./card/Card";
// import UserCard from "./card/UserCard";
// import mainImg from "./../images/main_img.png";
// import axios from "axios";
//
// const Home = () => {
//   const [popularCards, setPopularCards] = useState([]);
//   const [userCards, setUserCards] = useState([]);
//   const apiUrl = process.env.REACT_APP_API_URL;
//
//   useEffect(() => {
//     const fetchPopularCards = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/cards/popular`, {
//           withCredentials: true
//         });
//         setPopularCards(response.data.slice(0, 3)); // 조회수가 높은 카드 3개만 설정
//       } catch (error) {
//         console.error('Failed to fetch popular cards:', error);
//       }
//     };
//
//     const fetchUserCards = async () => {
//       setUserCards([
//         {
//           id: 1,
//           name: "User 1",
//           bio: "Bio of User 1",
//           imageUrl: "https://via.placeholder.com/200",
//         },
//         {
//           id: 2,
//           name: "User 2",
//           bio: "Bio of User 2",
//           imageUrl: "https://via.placeholder.com/200",
//         },
//         {
//           id: 3,
//           name: "User 3",
//           bio: "Bio of User 3",
//           imageUrl: "https://via.placeholder.com/200",
//         },
//       ]);
//     };
//
//     fetchPopularCards();
//     fetchUserCards();
//   }, [apiUrl]);
//
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 2,
//           slidesToScroll: 1,
//         }
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         }
//       }
//     ]
//   };
//
//   return (
//       <div className="home-container">
//         <div className="main-image">
//           <img
//               src={mainImg}
//               alt="Site Main"
//               style={{
//                 width: "100%",
//                 height: "400px",
//                 borderRadius: "8px",
//                 marginBottom: "20px",
//               }}
//           />
//         </div>
//         <div className="study-cards">
//           <h3>Best Top3 Study Cards</h3>
//           <Slider {...settings}>
//             {popularCards.map((card) => (
//                 <Card
//                     key={card.cardNumber}
//                     cardNumber={card.cardNumber}
//                     cardTitle={card.title}
//                     cardWriter={card.userEmail}
//                     cardDate={card.writeDateTime}
//                     initialViewCount={card.countView}
//                 />
//             ))}
//           </Slider>
//         </div>
//         <div className="user-cards">
//           <h3>Recommended User Cards</h3>
//           <Slider {...settings}>
//             {userCards.map((user) => (
//                 <UserCard
//                     key={user.id}
//                     nickname={user.name}
//                     profileImageUrl={user.imageUrl}
//                     recommendations={user.bio}
//                 />
//             ))}
//           </Slider>
//         </div>
//       </div>
//   );
// };
//
// export default Home;
