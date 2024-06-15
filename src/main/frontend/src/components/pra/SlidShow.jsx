import React, { useState, useEffect } from 'react';
import './Slideshow.css'; // CSS 파일을 임포트

const backgroundImages = [
    'https://via.placeholder.com/200',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/400',
];

const Slideshow = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % backgroundImages.length);
        }, 5000); // 5초마다 배경화면 변경

        return () => clearInterval(interval);
    }, []);

    const handleClick = (index) => {
        setCurrentImage(index);
    };

    return (
        <div className="slideshow-container" style={{ backgroundImage: `url(${backgroundImages[currentImage]})` }}>
            <div className="overlay"></div>
            <div className="content">
                <h1 className="title">슬라이드쇼</h1>
                <div className="button-container">
                    {backgroundImages.map((_, index) => (
                        <button key={index} onClick={() => handleClick(index)} className="nav-button">
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Slideshow;