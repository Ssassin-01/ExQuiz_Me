import React from 'react';
import './css/FailPage.css';
import { Link } from 'react-router-dom';

const FailPage = () => {
    return (
        <div className="success-container">
            <div className="success-card">
                <h2 className="success-title">결제 실패</h2>
                <p className="success-message">결제가 실패되었습니다.</p>
                <p className="success-description">
                    잠시 후 재 시도해주십시오.
                </p>
                <Link to="/" className="success-button">
                    메인페이지 돌아가기
                </Link>
            </div>
        </div>
    );
};

export default FailPage;
