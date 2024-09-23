import React from 'react';
import { Bar } from 'react-chartjs-2';

const Graph = ({ data, options }) => {
    return (
        <div className="mypage-activity-graph">
            <h4>그래프</h4>
            <Bar data={data} options={options} />
        </div>
    );
};

export default Graph;
