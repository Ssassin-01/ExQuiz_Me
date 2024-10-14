import React, { useState, useEffect } from "react";
import { useUser } from '../User/UserContext';
import { useParams, useNavigate } from "react-router-dom"; // useParams를 사용하여 카드 ID를 받아옴
import axios from 'axios';
import "../css/MakeComponent.css";

const EditComponent = () => {
    const { user } = useUser();
    const { cardNumber } = useParams(); // URL에서 cardNumber를 가져옴
    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);
    const [purpose, setPurpose] = useState(''); // 목적 선택 상태 추가
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const apiUrl = process.env.REACT_APP_API_URL;

    // 카드 데이터 불러오기
    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/cards/${cardNumber}`, {
                    withCredentials: true
                });
                const cardData = response.data;
                setTitle(cardData.title);
                setContent(cardData.cardContent);
                setPurpose(cardData.purpose);
                setEntries(cardData.vocabularyItems.map(item => ({
                    word: item.englishWord,
                    meaning: item.koreanWord
                })));
            } catch (error) {
                console.error('Failed to load card data:', error);
            }
        };

        fetchCard();
    }, [cardNumber, apiUrl]);

    const handleAddEntry = () => {
        setEntries([...entries, { word: '', meaning: '' }]);
    };

    const handleRemoveEntry = (index) => {
        const filteredEntries = entries.filter((_, idx) => idx !== index);
        setEntries(filteredEntries);
    };

    const handleWordChange = (index, value) => {
        const updatedEntries = entries.map((entry, idx) =>
            idx === index ? { ...entry, word: value } : entry
        );
        setEntries(updatedEntries);
    };

    const handleMeaningChange = (index, value) => {
        const updatedEntries = entries.map((entry, idx) =>
            idx === index ? { ...entry, meaning: value } : entry
        );
        setEntries(updatedEntries);
    };

    const handleSubmit = async () => {
        const cardDTO = {
            userEmail: user?.email,
            title: title,
            cardContent: content,
            purpose: purpose, // 선택된 용도 추가
            vocabularyItems: entries.map(entry => ({
                englishWord: entry.word,
                koreanWord: entry.meaning
            }))
        };

        try {
            const response = await axios.put(`${apiUrl}/api/cards/${cardNumber}/edit`, cardDTO, { // 수정된 경로
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            console.log('Card updated:', response.data);
            alert('Card updated successfully!');
            navigate('/mypage'); // 수정 후 마이페이지로 이동
        } catch (error) {
            console.error('Failed to update card:', error);
            alert('Failed to update card.');
        }
    };

    return (
        <div className="make-component">
            <div className="make-header">
                <span className="volume-title">Edit</span>
                <button onClick={handleSubmit} className="submit-button">수정하기</button>
            </div>
            <div className="input-group">
                <input
                    type="text"
                    placeholder="피드를 입력하세요"
                    className="input-feed"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="설명"
                    className="input-description"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                {/* 목적 선택 드롭다운 */}
                <select
                    className="input-purpose"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                >
                    <option value="">목적을 선택하세요</option>
                    <option value="초등학생 영단어">초등학생 영단어</option>
                    <option value="중학생 영단어">중학생 영단어</option>
                    <option value="고등학생 영단어">고등학생 영단어</option>
                    <option value="수능">수능</option>
                    <option value="토익">토익</option>
                </select>
            </div>
            {entries.map((entry, index) => (
                <div key={index} className="entry">
                    <div className="entry-number">{index + 1}</div>
                    <input
                        type="text"
                        value={entry.word}
                        onChange={(e) => handleWordChange(index, e.target.value)}
                        className="entry-input entry-word"
                        placeholder="단어"
                    />
                    <input
                        type="text"
                        value={entry.meaning}
                        onChange={(e) => handleMeaningChange(index, e.target.value)}
                        className="entry-input entry-meaning"
                        placeholder="뜻"
                    />
                    <button onClick={() => handleRemoveEntry(index)} className="delete-button">-</button>
                </div>
            ))}
            <button onClick={handleAddEntry} className="add-button">+ 추가하기</button>
        </div>
    );
};

export default EditComponent;
