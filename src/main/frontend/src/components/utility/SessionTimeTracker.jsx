import { useEffect, useState } from "react";

const SessionTimeTracker = ({ onSave }) => {
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        // 페이지 처음 진입 시 시작 시간 기록
        if (!startTime) {
            setStartTime(Date.now());
        }

        // 페이지를 벗어날 때 세션 시간 계산 및 저장
        return () => {
            if (startTime) {
                const endTime = Date.now();
                const timeSpent = Math.floor((endTime - startTime) / 1000); // 초 단위
                if (timeSpent > 0) {
                    onSave(timeSpent); // 학습 시간이 0보다 클 때만 저장
                }
            }
        };
    }, [startTime, onSave]);

    return null; // 화면에 아무것도 렌더링하지 않음
};

export default SessionTimeTracker;
