import React from 'react';
import './SystemInfo.css'; // Ensure you have appropriate styles

const SystemInfo = ({ systemData }) => {
    return (
        <div className="system-info">
            <h2>System Information</h2>
            <p><strong>System:</strong> {systemData.system}</p>
            <p><strong>Node:</strong> {systemData.node}</p>
            <p><strong>Release:</strong> {systemData.release}</p>
            <p><strong>Version:</strong> {systemData.version}</p>
            <p><strong>Processor:</strong> {systemData.processor}</p>
            <p><strong>CPU Usage:</strong> {systemData.cpuUsage}%</p>
        </div>
    );
};

export default SystemInfo;
