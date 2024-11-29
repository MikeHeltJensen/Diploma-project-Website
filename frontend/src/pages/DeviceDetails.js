// src/components/DeviceDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../style/DeviceDetails.css'; // Add styles if needed
import { formatMemory } from '../utils/formatMemory';

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

            {/* Open Ports Section */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                    <h3>Open Ports</h3>
                    {device.openPorts && device.openPorts.length > 0 ? (
                        <ul>
                            {device.openPorts.map((port, index) => (
                                <li key={index}>Port {port}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No open ports</p>
                    )}
                </div>

                {/* Secure/Unsecure Box */}
                <div
                    className="security-status-box"
                    style={{
                        marginLeft: '20px', // Spacing between the Open Ports and the box
                        padding: '10px 20px',
                        color: '#fff',
                        backgroundColor: device.securePorts ? 'green' : 'red',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        display: 'inline-block',
                    }}
                    title={device.securePorts ? 'All ports are secure' : 'One or more ports are open'}
                >
                    {device.securePorts ? 'Secure' : 'Unsecure'}
                </div>
            </div>

            <h3>Network Info</h3>
            {device.networkInfo && device.networkInfo.length > 0 ? (
                <ul>
                    {device.networkInfo.map((info, index) => (
                        <li key={index}>{info}</li>
                    ))}
                </ul>
            ) : (
                <p>No network information available</p>
            )}
        </div>
    );
};

export default DeviceDetails;
