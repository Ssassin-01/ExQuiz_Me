import React from 'react';
import './css/MyCardList.css';

const MyCardList = ({ children, closeModal, title }) => {
    return (
        <div className="mycardlist-overlay" onClick={closeModal}>
            <div className="mycardlist-content" onClick={e => e.stopPropagation()}>
                <div className="mycardlist-title">
                    <span>{title}</span>
                    <button className="mycardlist-close-btn" onClick={closeModal}>X</button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default MyCardList;
