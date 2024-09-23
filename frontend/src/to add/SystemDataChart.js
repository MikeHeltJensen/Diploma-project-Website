import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const SystemDataChart = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get('/systemdata/data'); // No need to specify backend URL
                const labels = result.data.map(d => d.timestamp);
                const cpuUsage = result.data.map(d => d.cpuUsage);
                setData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'CPU Usage',
                            data: cpuUsage,
                            fill: false,
                            backgroundColor: 'rgb(75, 192, 192)',
                            borderColor: 'rgba(75, 192, 192, 0.2)',
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <Line data={data} />
        </div>
    );
};

export default SystemDataChart;
