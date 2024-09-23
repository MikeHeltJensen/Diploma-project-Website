import React from 'react';
import './DeviceInfo.css'; // Ensure you have appropriate styles

const DeviceInfo = ({ device }) => {
    return (
        <div className="device-info">
            <h2>Device Information</h2>
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
        </div>
    );
};

export default DeviceInfo;