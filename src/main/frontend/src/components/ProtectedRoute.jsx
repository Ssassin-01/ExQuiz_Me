import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './User/UserContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useUser();  // 로그인된 사용자 정보 가져오기

    if (!user) {
        // 로그인되어 있지 않으면 로그인 페이지로 리디렉션
        return <Navigate to="/login" replace />;
    }

    return children;  // 로그인되어 있으면 요청된 페이지로 이동
};

export default ProtectedRoute;
