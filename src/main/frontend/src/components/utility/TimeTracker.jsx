// components/TimeTracker.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useUser } from '../User/UserContext'; // UserContext 사용

const TimeTracker = () => {
    const { user } = useUser(); // 로그인 사용자 정보
    const [loginTimeSpent, setLoginTimeSpent] = useState(0); // 기존 로그인 유지 시간
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (user) {
            const loginTime = new Date(); // 로그인 시작 시점
            let savedTimeSpent = 0;

            // 페이지 로드 시 서버에서 기존 로그인 시간을 불러옴
            const fetchTimeSpent = async () => {
                try {
                    const response = await axios.get(`${apiUrl}/api/user-activity/today`, { withCredentials: true });
                    savedTimeSpent = response.data.timeSpent;
                    setLoginTimeSpent(savedTimeSpent); // 기존 시간 설정
                } catch (error) {
                    console.error("기존 로그인 시간 불러오기 실패:", error);
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
                }
            }, 60000); // 1분 간격으로 실행

            return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
        }
    }, [user, apiUrl]);

    return null; // 화면에 표시할 내용이 없으므로 null 반환
};

export default TimeTracker;
