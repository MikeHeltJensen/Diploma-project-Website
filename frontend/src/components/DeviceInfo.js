import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../style/DeviceInfo.css';

const DeviceInfo = () => {
    const { deviceId } = useParams(); // Get deviceId from URL
    const [device, setDevice] = useState(null);

    useEffect(() => {
        const fetchDeviceDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/systemdata/${deviceId}`);
                console.log('API Response:', response.data); // Debugging log
                setDevice(response.data);
            } catch (error) {
                console.error('Error fetching device details:', error);
            }
        };

        fetchDeviceDetails();
    }, [deviceId]);

    if (!device) {
        return <div>Loading device details...</div>;
    }

    return (
        <div className="device-info-container" style={{ position: 'relative' }}>
            {/* Secure/Unsecure Status Box */}
            <div
                className="security-status-box"
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    padding: '10px 20px',
                    color: '#fff',
                    backgroundColor: device.securePorts ? 'green' : 'red',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                }}
                title={device.securePorts ? 'All ports are secure' : 'One or more ports are open'}
            >
                {device.securePorts ? 'Secure' : 'Unsecure'}
            </div>

            <h2>{device.deviceName}</h2>
            <p>Release: {device.release}</p>
            <p>Version: {device.version}</p>
            <p>Processor: {device.processor}</p>
            <p>Total Memory: {device.totalMemory}</p>
            <p>Free Memory: {device.freeMemory}</p>
            <p>Total Disk: {device.totalDisk}</p>
            <p>Free Disk: {device.freeDisk}</p>
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

export default DeviceInfo;
