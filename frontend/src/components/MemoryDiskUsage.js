import React from 'react';
import './MemoryDiskUsage.css'; // Ensure you have appropriate styles

const MemoryDiskUsage = ({ systemData }) => {
    return (
        <div className="memory-disk-usage">
            <h2>Memory and Disk Usage</h2>
            <p><strong>Total Memory:</strong> {systemData.totalMemory}</p>
            <p><strong>Free Memory:</strong> {systemData.freeMemory}</p>
            <p><strong>Total Disk:</strong> {systemData.totalDisk}</p>
            <p><strong>Free Disk:</strong> {systemData.freeDisk}</p>
        </div>
    );
};

export default MemoryDiskUsage;
