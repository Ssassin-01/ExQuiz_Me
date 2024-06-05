import React from "react";
import { useNavigate } from 'react-router-dom';
import './css/Card.css';

const Card = ({ cardTitle, cardWriter, cardDate, cardImageUrl, logoImageUrl }) => {
    const navigate = useNavigate();  // Hook for navigation

    const handleLearnMore = () => {
        navigate('/learn');  // Navigate to the Learning component
    };
    return (
        <div className="container__card">
            <div className="card">
                <img alt="card background" className="card__image" src={cardImageUrl}/>
                <div className="card__text"></div>
                <div className="card__logo">
                    <img src={logoImageUrl} alt="Quiz Logo" />
                </div>
                <div className="card__main-text">
                    <p className="card__main-text-f">{cardTitle}</p>
                    <p className="card__main-text-s">{cardWriter}</p>
                </div>
                <div className="card__date">
                    <p>{cardDate}</p>
                </div>
                <div className="card-btn">
                    <button className="btn_open" onClick={handleLearnMore}>Learn</button>
                </div>
            </div>
        </div>
    );
};

export default Card;
