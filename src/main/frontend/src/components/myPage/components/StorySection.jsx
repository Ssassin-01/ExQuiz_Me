import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StorySection = () => {
    const [loggedInDays, setLoggedInDays] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Get the current month

    useEffect(() => {
        const fetchUserActivity = async () => {
            try {
                const response = await axios.get(`/api/user-activity/${currentMonth}`, { withCredentials: true });
                setLoggedInDays(response.data); // Store the dates the user logged in
            } catch (error) {
                console.error("Error fetching user activity:", error);
            }
        };

        fetchUserActivity();
    }, [currentMonth]); // Fetch when the month changes

    const renderDay = (day) => {
        const isLoggedIn = loggedInDays.includes(day); // Check if the day is a login day
        return (
            <div className={`mypage-grid-item ${isLoggedIn ? 'mypage-active' : ''}`} key={day}></div>
        );
    };

    return (
        <div className="mypage-story">
            <h3>내 스토리</h3>
            <div className="mypage-story-content">
                <p className="mypage-streak-text">5일 연속 출석 중!!</p>
                <div className="mypage-attendance-grid">
                    {[...Array(31)].map((_, index) => renderDay(index + 1))} {/* Replace 31 with days in the current month */}
                </div>
            </div>
        </div>
    );
};

export default StorySection;
