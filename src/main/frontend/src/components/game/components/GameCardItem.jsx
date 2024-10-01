import React from 'react';
import '../css/GameCardItem.css';
import { FaEye } from 'react-icons/fa'; // 조회수 아이콘 추가

const GameCardItem = ({ title, description, author, purpose, viewCount }) => {

    const renderPurposeTag = (purpose) => {
        let className = '';
        let purposeText = '';

        switch (purpose) {
            case '초등학생 영단어':
                className = 'game-card-purpose-elementary';
                purposeText = '초등';
                break;
            case '중학생 영단어':
                className = 'game-card-purpose-middle';
                purposeText = '중등';
                break;
            case '고등학생 영단어':
                className = 'game-card-purpose-high';
                purposeText = '고등';
                break;
            case '수능':
                className = 'game-card-purpose-exam';
                purposeText = '수능';
                break;
            case '토익':
                className = 'game-card-purpose-toeic';
                purposeText = '토익';
                break;
            default:
                className = 'game-card-purpose-default';
                purposeText = '기타';
                break;
        }

        return (
            <div className={`game-card-item-bottom-row ${className}`}>
                {purposeText}
            </div>
        );
    };

    return (
        <div className="game-card-item">
            <div className="game-card-item-header">
                <h5>{title}</h5>
            </div>
            <p>{description}</p>
            <div className="game-card-item-info">
                <div>{author}</div> {/* 작성자 표시 */}
                <div className="game-card-item-views">
                    <FaEye /> {viewCount} {/* 조회수 표시 */}
                </div>
            </div>
            {renderPurposeTag(purpose)}
        </div>
    );
};

export default GameCardItem;
