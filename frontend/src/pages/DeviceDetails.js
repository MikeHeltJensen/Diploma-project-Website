// src/components/DeviceDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../style/DeviceDetails.css'; // Add styles if needed
import {formatMemory} from '../utils/formatMemory'

const DeviceDetails = () => {
    const { id } = useParams();
    const [device, setDevice] = useState(null);

    useEffect(() => {
        const fetchDevice = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/systemdata/${id}`);
                setDevice(response.data);
            } catch (error) {
                console.error('Error fetching the device details:', error);
            }
        };

        fetchDevice();
    }, [id]);

    if (!device) return <div>Loading...</div>;

    return (
        <div className="device-details">
            <h2>{device.deviceName}</h2>
            <p><strong>Operating System:</strong> {device.system}</p>
            <p><strong>System:</strong> {device.system}</p>
            <p><strong>Node:</strong> {device.node}</p>
            <p><strong>Release:</strong> {device.release}</p>
            <p><strong>Build Version:</strong> {device.version}</p>
            <p><strong>Processor:</strong> {device.processor}</p>
            <p><strong>CPU Usage:</strong> {device.CPU_Usage}%</p>
            <p><strong>Total Memory:</strong> {formatMemory(device.totalMemory)}</p>
            <p><strong>Free Memory:</strong> {formatMemory(device.freeMemory)}</p>
            <p><strong>Total Disk:</strong> {formatMemory(device.totalDisk)}</p>
            <p><strong>Free Disk:</strong> {formatMemory(device.freeDisk)}</p>
            <p><strong>Network Info:</strong> {device.networkInfo}</p>
            {/* Add other details you want to display */}
        </div>
    );
};

export default DeviceDetails;
