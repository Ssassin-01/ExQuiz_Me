import React, { useState } from "react";
import { useUser } from './User/UserContext';
import axios from 'axios';
import "./css/Make.css";

const MakeComponent = () => {
    const { user } = useUser();
    const [entries, setEntries] = useState([
        { word: '', meaning: '' },
        { word: '', meaning: '' },
        // Initialize with two entries as shown in the image
    ]);

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

        const cardDTO = {
            userEmail: user?.email, // Assume logged-in user's email is known
            title: cardTitle,
            writeDateTime: new Date(), // Send current date or handle on the server side
            cardTitleImage: 'http://example.com/image.jpg', // Update as necessary
            cardContent: cardContent,
            countView: 0, // Default initial view count
            vocabularyItems: entries.map(entry => ({
                englishWord: entry.word,
                koreanWord: entry.meaning
            }))
        };

        console.log('Submitting card:', cardDTO);

        try {
            const response = await axios.post('http://localhost:8080/api/cards', cardDTO, {
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