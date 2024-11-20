import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/GameCardPopup.css';
import GameCardItem from './GameCardItem';

const GameCardPopup = ({ onClose, onSelectCard }) => {
    const [cards, setCards] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('title'); // 기본 필터는 제목 순으로

    // 카드 리스트 불러오기
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const response = await axios.get(`${`${window.location.origin}`}/api/cards`, {
                    withCredentials: true  // 쿠키를 전송하도록 설정
                });
                setCards(response.data);
            } catch (error) {
                console.error("Error fetching cards:", error);
            }
        };
        fetchCards();
    }, []);

    // 검색어와 필터에 따른 카드 목록 필터링
    const filteredCards = cards
        .filter(card => card.title.toLowerCase().includes(searchTerm.toLowerCase()) || card.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (filter === 'title') {
                return a.title.localeCompare(b.title);
            } else if (filter === 'author') {
                return a.nickname.localeCompare(b.nickname);
            } else if (filter === 'viewCount') {
                return b.countView - a.countView;
            } else {
                return 0;
            }
        });

    return (
        <div className="game-popup-overlay">
            <div className="game-popup">
                <div className="game-popup-header">
                    <h3>카드 선택</h3>
                    <button onClick={onClose} className="game-popup-close-button">&times;</button>
                </div>
                <div className="game-popup-controls">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="카드 제목 또는 작성자 검색..."
                        className="game-search-input"
                    />
                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="game-filter-select"
                    >
                        <option value="title">제목 순</option>
                        <option value="author">작성자 순</option>
                        <option value="viewCount">조회수 순</option>
                    </select>
                </div>
                <div className="game-card-grid">
                    {filteredCards.map((card) => (
                        <div key={card.cardNumber} className="game-card-item" onClick={() => onSelectCard(card.cardNumber)}>
                            <GameCardItem
                                title={card.title}
                                description={card.cardContent}
                                author={card.nickname}
                                viewCount={card.countView}
                                purpose={card.purpose}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GameCardPopup;
