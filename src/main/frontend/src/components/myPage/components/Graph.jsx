import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ data, options }) => {
    const activityData = {
        labels: ['월', '화', '수', '목', '금', '토', '일'],
        datasets: [
            {
                label: '나의 활동 (점수)',
                data: [50, 70, 90, 100, 60, 80, 75],
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                        return null;
                    }
                    const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                    gradient.addColorStop(0, '#A6A6A6');
                    gradient.addColorStop(1, '#8C8C8C');
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
                        return `${context.label}: ${context.raw} 점`;
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
            <h4>그래프</h4>
            <Bar data={activityData} options={activityOptions} />
        </div>
    );
};

export default Graph;
