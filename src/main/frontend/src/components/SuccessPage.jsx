import React from 'react';
import './css/SuccessPage.css';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <div className="success-container">
            <div className="success-card">
                <h2 className="success-title">구독 성공!</h2>
                <p className="success-message">결제가 성공적으로 완료되었습니다.</p>
                <p className="success-description">
                    저희 서비스를 이용해 주셔서 감사합니다. 이제 모든 프리미엄 기능을 사용할 수 있습니다!
                </p>
                <Link to="/" className="success-button">
                    문제풀러가기
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
