import React from 'react';
import { Link } from 'react-router-dom';
import './css/ServerError.css'; // 스타일 파일은 필요에 따라 작성

const ServerError = () => {
    return (
        <div className="server-error-container">
            <h1>서버 연결 오류</h1>
            <p>서버에 연결할 수 없습니다.</p>
            <p>문제가 지속된다면 관리자에게 문의하세요.</p>
            <Link to="/">홈으로 돌아가기</Link>
        </div>
    );
};

export default ServerError;