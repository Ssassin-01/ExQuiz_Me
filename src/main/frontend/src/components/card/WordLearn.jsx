import React, { useState } from 'react';
import "../css/wordLearner.css"

const words = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",

];


export default function WordLearn() {

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const goToNextWord = () => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    };
    const goToPreviousWord = () => {
        setCurrentWordIndex((prevIndex) => {
            if (prevIndex === 0) return words.length - 1;
            return prevIndex - 1;
        });
    };

    return (
        <div className="word-learner-container">
            <button className="arrow-btn left-arrow" onClick={goToPreviousWord}>{"<"}</button>
            <div className="word-learner">
                <header className="learn__header">
                    MVP-Vol1 - 학습하기
                </header>
                <div className="learn__nav">
                    <div className="learn__word-counter">{`${currentWordIndex + 1} / ${words.length}`}</div>
                </div>
                <div className="learn__content">
                    {words[currentWordIndex]}
                </div>
                <footer className="learn__footer">
                    <button className="learn__nav-btn" onClick={goToNextWord}>O</button>
                    <button className="learn__nav-btn" onClick={goToNextWord}>X</button>
                </footer>
            </div>
            <button className="arrow-btn right-arrow" onClick={goToNextWord}>{">"}</button>
        </div>
    );
}