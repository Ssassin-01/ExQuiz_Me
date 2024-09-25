import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TimeTracker from "../../utility/TimeTracker";


const StorySection = () => {
    const [loggedInDays, setLoggedInDays] = useState([]); // 활동 기록 저장
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // 현재 월
    const [currentYear] = useState(new Date().getFullYear()); // 현재 연도
    const [streak, setStreak] = useState(0); // 연속 출석 일수
    const apiUrl = process.env.REACT_APP_API_URL;

    // 월별 활동 기록 가져오기
    useEffect(() => {
        const fetchUserActivity = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/user-activity/${currentMonth}`, { withCredentials: true });
                const loginDates = response.data.map(activity => ({
                    loginDate: new Date(activity.loginDate),
                    timeSpent: activity.timeSpent || 0 // 각 활동의 로그인 시간 (초 단위)
                }));

                setLoggedInDays(loginDates);
                calculateStreak(loginDates);
            } catch (error) {
                console.error("Error fetching user activity:", error);
            }
        };

        fetchUserActivity();
    }, [currentMonth, apiUrl]);

    // 연속 출석 일수 계산 함수
    const calculateStreak = (loginDates) => {
        let streakCount = 0;
        const today = new Date();
        const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        for (let i = 0; i < loginDates.length; i++) {
            const currentDate = new Date(todayDateOnly);
            currentDate.setDate(todayDateOnly.getDate() - i);

            const isLoggedIn = loginDates.some(loggedDate =>
                loggedDate.loginDate.getFullYear() === currentDate.getFullYear() &&
                loggedDate.loginDate.getMonth() === currentDate.getMonth() &&
                loggedDate.loginDate.getDate() === currentDate.getDate()
            );

            if (isLoggedIn) {
                streakCount++;
            } else {
                break;
            }
        }
        setStreak(streakCount > 0 ? streakCount : 0);
    };

    // 시간을 기준으로 초록색의 강도를 설정하는 함수
    const getBackgroundColorByTimeSpent = (timeSpent) => {
        if (timeSpent === undefined) return '#ebedf0';
        if (timeSpent < 30) {
            return '#9be9a8'; // 연한 초록색
        } else if (timeSpent < 60) {
            return '#40c463'; // 중간 초록색
        } else if (timeSpent < 120) {
            return '#30a14e'; // 진한 초록색
        } else {
            return '#216e39'; // 가장 진한 초록색
        }
    };

    const renderDay = (day) => {
        const dateToCheck = new Date(currentYear, currentMonth - 1, day);
        const loginInfo = loggedInDays.find(loggedDate =>
            loggedDate.loginDate.getFullYear() === dateToCheck.getFullYear() &&
            loggedDate.loginDate.getMonth() === dateToCheck.getMonth() &&
            loggedDate.loginDate.getDate() === dateToCheck.getDate()
        );

        const backgroundColor = loginInfo
            ? getBackgroundColorByTimeSpent(loginInfo.timeSpent)
            : '#ebedf0';

        return (
            <div
                className="mypage-grid-item"
                key={day}
                style={{ backgroundColor }}
            />
        );
    };

    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();

    return (
        <div className="mypage-story">
            <h3>내 스토리</h3>

            <div className="mypage-story-content">
                <p className="mypage-streak-text">{streak > 0 ? `${streak}일 연속 출석중!` : `오늘 첫 출석!`}</p>
                <div className="mypage-attendance-grid">
                    {[...Array(daysInMonth)].map((_, index) => renderDay(index + 1))}
                </div>
            </div>
            {/* TimeTracker 컴포넌트 추가 */}
            <TimeTracker/>
        </div>
    );
};

export default StorySection;
