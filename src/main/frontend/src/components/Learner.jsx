import React from 'react';
import './css/Learner.css';

const Learner = () => {
    // You might fetch this data from an API or pass it as props
    const wordList = [
        { id: 1, word: 'baby', translation: '아기, 애기' },
        { id: 1, word: 'baby', translation: '아기, 애기' },
        { id: 1, word: 'baby', translation: '아기, 애기' },
        { id: 1, word: 'baby', translation: '아기, 애기' },
        { id: 1, word: 'baby', translation: '아기, 애기' },
        { id: 1, word: 'baby', translation: '아기, 애기' },
        { id: 1, word: 'baby', translation: '아기, 애기' },

        // ... more words
    ];

    return (
        <div className="learner">
            <header className="learner-header">
                <h1>MVP-Vol1</h1>
                <nav>
                    <button className="tab active">Learning</button>
                    <button className="tab">Practice</button>
                    <button className="tab">Test</button>
                </nav>
            </header>
            <ul className="word-list">
                {wordList.map((item) => (
                    <li key={item.id} className="word-item">
                        <div className="word-text">
                            <span>{item.word}</span>
                            <span>{item.translation}</span>
                        </div>
                        <input type="text" className="word-input" placeholder="Type here..." />
                        <button className="word-favorite">&#9734;</button>
                        <button className="word-audio">&#128266;</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Learner;
