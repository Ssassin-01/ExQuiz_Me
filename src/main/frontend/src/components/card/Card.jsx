import React, { useEffect, useState } from "react";
import './css/Card.css';
import defaultLogoImage from '../../images/defaultLogoImage.png';
import cardBack from './../../images/card_back.png';
import { GrView } from "react-icons/gr";
import axios from "axios"; // 조회수 아이콘 추가

const Card = ({ cardNumber, cardTitle, cardWriter, cardDate, onLearnClick, initialViewCount }) => {
    const [viewCount, setViewCount] = useState(initialViewCount); // 초기값을 props로부터 설정
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleCardClick = async () => {
        try {
            console.log(`Card ${cardNumber} clicked`); // 클릭 확인 로그
            // 조회수 증가 API 호출
            const response = await axios.post(
                `${apiUrl}/api/cards/${cardNumber}/view`,
                {}, // 빈 객체를 사용하여 본문이 없는 POST 요청
                {
                    withCredentials: true, // 쿠키 기반 인증을 위한 옵션 추가
                }
            );
            console.log('조회수 증가 API 성공', response.data); // 응답 로그
            if (response.data && response.data.countView !== undefined) {
                setViewCount(response.data.countView); // 업데이트된 조회수 설정
            } else {
                setViewCount(prevCount => prevCount + 1); // 임시로 클라이언트에서 조회수 증가
            }
            console.log('최종 조회수 확인', response.data.countView);
        } catch (error) {
            console.error('조회수 증가 오류:', error);
        }
    };

    return (
        <div className="container__card">
            <div className="card" onClick={handleCardClick}> {/* 카드 클릭 시 조회수 증가 */}
                <div className="cardImg">
                    <img src={cardBack} alt="Quiz Logo"/>
                </div>
                <div className="card__text"></div>
                <div className="card__logo">
                    <img src={defaultLogoImage} alt="Quiz Logo"/>
                </div>
                <div className="card__main-text">
                    <p className="card__main-text-f">{cardTitle}</p>
                    <p className="card__main-text-s">{cardWriter}</p>
                </div>
                <div className="card__date">
                    <p>{new Date(cardDate).toLocaleDateString()}</p>
                </div>
                <div className="card__views">
                    <GrView /> {viewCount} {/* 조회수 아이콘과 조회수 표시 */}
                </div>
                <div className="card-btn">
                    <button className="btn_open" onClick={(e) => { e.stopPropagation(); onLearnClick(); }}>Learn</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
