import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = () => {
    const [studyTimeLogs, setStudyTimeLogs] = useState([]);

    useEffect(() => {
        const fetchStudyTimeLogs = async () => {
            try {
                const userEmail = sessionStorage.getItem('useremail');
                const apiUrl = `${window.location.origin}`;

                console.log("Fetching study time logs for:", userEmail);

                const response = await axios.get(`${apiUrl}/api/study-time/weekly`, {
                    params: { userEmail },
                    withCredentials: true,
                });

                // 초 단위 데이터를 분 단위로 변환
                const studyTimesInMinutes = response.data.map(log => Math.floor(log.studyTime / 60));
                console.log("Received study times (in minutes):", studyTimesInMinutes);

                // 데이터를 길이 7로 맞추기 (주간 데이터를 위해)
                const paddedStudyTimes = [...studyTimesInMinutes];
                while (paddedStudyTimes.length < 7) {
                    paddedStudyTimes.push(0); // 부족한 데이터를 0으로 채움
                }

                setStudyTimeLogs(paddedStudyTimes);
            } catch (error) {
                console.error("주간 학습 시간 데이터를 가져오는 데 실패했습니다:", error);
            }
        };

        fetchStudyTimeLogs();
    }, []);

    const studyData = {
        labels: ['월', '화', '수', '목', '금', '토', '일'], // 1주일 데이터
        datasets: [
            {
                label: '나의 공부 시간 (분)',
                data: studyTimeLogs, // 데이터 반영
                fill: false,
                borderColor: '#4caf50',
                tension: 0.1,
            },
        ],
    };

    const studyOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            tooltip: {
                backgroundColor: '#000',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw} 분`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: Math.max(...studyTimeLogs, 60), // 최대값 설정
                ticks: {
                    stepSize: 10, // 10분 단위
                    callback: function (value) {
                        return value + '분';
                    },
                    color: '#666',
                },
                grid: {
                    color: '#e0e0e0',
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#666',
                },
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeOutBounce',
        },
    };

    return (
        <div className="mypage-activity-graph">
            <h4>주간 공부 시간 그래프</h4>
            <Line data={studyData} options={studyOptions} />
        </div>
    );
};

export default LineGraph;
