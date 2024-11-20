import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../User/UserContext'; // UserContext 사용

const TimeTracker = () => {
    const { user } = useUser(); // 로그인 사용자 정보
    const [loginTimeSpent, setLoginTimeSpent] = useState(0); // 기존 로그인 유지 시간
    const [error, setError] = useState(null); // 에러 상태 추가
    const apiUrl = `${window.location.origin}`;

    useEffect(() => {
        if (!user) return; // 사용자가 없을 경우 로직 종료

        const loginTime = new Date(); // 로그인 시작 시점
        let savedTimeSpent = 0;

        // 페이지 로드 시 서버에서 기존 로그인 시간을 불러옴
        const fetchTimeSpent = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/user-activity/today`, { withCredentials: true });
                savedTimeSpent = response.data.timeSpent || 0; // 기존 시간 설정
                setLoginTimeSpent(savedTimeSpent);
            } catch (error) {
                console.error("기존 로그인 시간 불러오기 실패:", error);
                setError("기존 로그인 시간 불러오기에 실패했습니다.");
            }
        };

        fetchTimeSpent();

        // 1분마다 로그인 시간을 업데이트하는 함수
        const interval = setInterval(async () => {
            const now = new Date();
            const timeSpentInMinutes = Math.floor((now - loginTime) / 60000) + savedTimeSpent; // 누적된 시간 계산
            try {
                await axios.post(`${apiUrl}/api/user-activity/update-time`, { timeSpent: timeSpentInMinutes }, { withCredentials: true });
                setLoginTimeSpent(timeSpentInMinutes); // 업데이트된 시간 설정
            } catch (error) {
                console.error("로그인 시간 업데이트 실패:", error);
                setError("로그인 시간 업데이트에 실패했습니다   .");
            }
        }, 60000); // 1분 간격으로 실행

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
    }, [user, apiUrl]);

    return error ? <div>{error}</div> : null; // 에러 발생 시 에러 메시지 표시, 그 외에는 null 반환
};

export default TimeTracker;
