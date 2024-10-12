import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ data, options }) => {
    const activityData = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],  // 1주일 단위
        datasets: [
            {
                label: '공부량 (시간)',
                data: [2, 3.5, 1, 4, 5, 3, 2.5],  // 임의의 공부 시간 값 (시간 단위)
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, '#FFC107');  // 시작 색상 (노란색)
                    gradient.addColorStop(1, '#FF5722');  // 끝 색상 (오렌지색)
                    return gradient;
                },
                borderRadius: 10,
                borderSkipped: false,
            },
        ],
    };

    const activityOptions = {
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
                    callback: function(value) {
                        return value + "시간";  // y축에 시간 단위 표시
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
            <h4>공부량 그래프</h4>
            <Bar data={activityData} options={activityOptions} />
        </div>
    );
};

export default Graph;
