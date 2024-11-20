import axios from "axios";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import SessionTimeTracker from "./SessionTimeTracker";

const LearningContainer = () => {
    const [sessionStarted, setSessionStarted] = useState(false);

    const handleSaveTime = async (timeSpent) => {
        try {
            const userEmail = sessionStorage.getItem('useremail'); // 세션에서 이메일 가져오기
            const apiUrl = `${window.location.origin}`; // API URL 가져오기

            console.log('저장할 학습 시간:', timeSpent);
            console.log('사용자 이메일:', userEmail);

            const response = await axios.post(`${apiUrl}/api/study-time/log`, {
                userEmail,
                studyTime: timeSpent
            }, {
                withCredentials: true // 인증 정보를 포함하는 옵션
            });

            console.log('학습 시간 저장 성공:', response.data);
        } catch (error) {
            console.error('학습 시간 저장 실패', error);
        }
    };

    useEffect(() => {
        if (!sessionStarted) {
            setSessionStarted(true); // 학습 세션 시작 플래그 설정
        }
    }, [sessionStarted]);

    return (
        <div>
            {sessionStarted && <SessionTimeTracker onSave={handleSaveTime} />}
            <Outlet />
        </div>
    );
};

export default LearningContainer;
