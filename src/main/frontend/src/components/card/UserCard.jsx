import React from 'react';
import './css/UserCard.css';


const UserCard = ({ profileImageUrl, nickname, recommendations }) => {
    return (
        <div className="user-card">
            <img className="user-profile-image" src={profileImageUrl} alt={nickname} />
            <div className="user-details">
                <span>{nickname}</span>
                <p>{recommendations}</p>
            </div>
        </div>
    );
};

export default UserCard;