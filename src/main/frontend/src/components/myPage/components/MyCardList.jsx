import React, {useState} from 'react';
import './css/MyCardList.css';
import CardItem from "../../card/CardItem";
import axios from "axios";
import {useNavigate} from "react-router-dom"; // CardItem 불러오기

const MyCardList = ({ children, closeModal, title, updatedUserCards }) => { // handleCardDelete 추가
    const navigate = useNavigate(); // navigate 훅 사용
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleCardDelete = async (cardNumber) => {
        try {
            const response = await axios.delete(`${apiUrl}/api/cards/${cardNumber}`, {
                withCredentials: true // 세션 쿠키를 전송
            });
            if (response.status === 200) {
                console.log(`Card ${cardNumber} deleted successfully`);
                closeModal();
                // 마이페이지로 리디렉션
                window.location.reload();
            } else {
                console.error('Failed to delete card');
            }
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };



    // 카드 수정 기능 (수정 페이지로 이동하거나 수정 모달 열기)
    const handleEditCard = (cardNumber) => {
        alert(`수정할 카드 번호: ${cardNumber}`);
        // 수정 로직 추가 (예: 수정 페이지로 이동하거나 모달을 열어 수정 폼을 보여줄 수 있음)
    };

    return (
        <div className="mycardlist-overlay" onClick={closeModal}>
            <div className="mycardlist-content" onClick={e => e.stopPropagation()}>
                <div className="mycardlist-title">
                    <span>{title}</span>
                    <button className="mycardlist-close-btn" onClick={closeModal}>X</button>
                </div>
                <div className="mypage-post-items">
                    {updatedUserCards.map((card) => (
                        <CardItem
                            key={card.cardNumber}  // 고유 키로 수정
                            title={card.title}
                            description={card.cardContent}
                            author={card.nickname}
                            date={card.writeDateTime}
                            isBookmarked={card.isBookmarked}
                            cardNumber={card.cardNumber}
                            vocabularyItems={card.vocabularyItems}
                            initialViewCount={card.countView}
                            onBookmarkToggle={() => {}}
                            purpose={card.purpose}
                            onCardClick={() => {}}
                            // 팝업 페이지에서만 삭제 버튼 표시를 위한 onDeleteClick prop 전달
                            onEditClick={handleEditCard}
                            onDeleteClick={handleCardDelete}
                            showHamburgerMenu={true}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyCardList;
