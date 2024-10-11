import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineGraph = ({ data, options }) => {
    const studyData = {
        labels: ['월', '화', '수', '목', '금', '토', '일'], // 1주일 데이터
        datasets: [
            {
                label: '나의 공부 시간 (시간)',
                data: [2, 3.5, 1, 4, 3, 2.5, 5], // 임의의 공부 시간 데이터
                fill: false, // 선 아래 채우기 없앰
                borderColor: '#4caf50', // 선 색상
                tension: 0.1, // 곡선의 휘어짐 정도
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
                        return `${context.label}: ${context.raw} 시간`;
                    },
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#e0e0e0',
                },
                ticks: {
                    color: '#666',
                    callback: function (value) {
                        return value + '시간';
                    },
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
