import React, { useState } from "react";
import { useUser } from './User/UserContext';
import axios from 'axios';
import "./css/MakeComponent.css";

const MakeComponent = () => {
    const { user } = useUser();
    const [entries, setEntries] = useState([
        { word: '', meaning: '' },
        { word: '', meaning: '' },
    ]);
    const [purpose, setPurpose] = useState(''); // 목적 선택 상태 추가

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
        const cardTitle = document.querySelector('.input-feed').value;
        const cardContent = document.querySelector('.input-description').value;
        const apiUrl = process.env.REACT_APP_API_URL;

        const cardDTO = {
            userEmail: user?.email,
            title: cardTitle,
            writeDateTime: new Date(),
            cardTitleImage: 'http://example.com/image.jpg',
            cardContent: cardContent,
            countView: 0,
            purpose: purpose, // 선택된 용도 추가
            vocabularyItems: entries.map(entry => ({
                englishWord: entry.word,
                koreanWord: entry.meaning
            }))
        };

        console.log('Submitting card:', cardDTO);

        try {
            const response = await axios.post(`${apiUrl}/api/cards`, cardDTO, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });

            console.log('Card created:', response.data);
            alert('Card created successfully!');
        } catch (error) {
            console.error('Failed to create card:', error);
            alert('Failed to create card.');
        }
    };

    return (
        <div className="make-component">
            <div className="make-header">
                <span className="volume-title">Make</span>
                <button onClick={handleSubmit} className="submit-button">만들기</button>
            </div>
            <div className="input-group">
                <input type="text" placeholder="피드를 입력하세요" className="input-feed" />
                <textarea placeholder="설명" className="input-description"></textarea>
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

export default MakeComponent;
