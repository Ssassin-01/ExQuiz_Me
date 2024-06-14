import React, {useEffect, useState} from "react";
import './css/Card.css';
import defaultLogoImage from '../../images/defaultLogoImage.png';
import cardBack from './../../images/card_back.png';
import { GrView } from "react-icons/gr";
import axios from "axios"; // 조회수 아이콘 추가
const Card = ({ cardNumber,cardTitle, cardWriter, cardDate, onLearnClick }) => {
    const [viewCount, setViewCount] = useState(0);

    useEffect(() => {
        // 컴포넌트 로드 시 초기 조회수를 설정
        setViewCount(cardNumber?.countView || 0);
    }, [cardNumber]);

    const handleCardClick = async () => {
        try {
            // 조회수 증가 API 호출
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/cards/${cardNumber}/view`);
            setViewCount(response.data.countView); // 업데이트된 조회수 설정
            onLearnClick(); // Learn 페이지로 이동하는 함수 호출
        } catch (error) {
            console.error('조회수 count error:', error);
        }
    };

    return (
        <div className="container__card">
            <div className="card" onClick={handleCardClick}> {/* 카드 클릭 시 조회수 증가 */}
                <div>
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
                    <GrView/> {viewCount} {/* 조회수 아이콘과 조회수 표시 */}
                </div>
                <div className="card-btn">
                    <button className="btn_open" onClick={onLearnClick}>Learn</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
