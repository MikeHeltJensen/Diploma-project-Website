import React from 'react';
import './NetworkInfo.css'; // Ensure you have appropriate styles

const NetworkInfo = ({ systemData }) => {
    return (
        <div className="network-info">
            <h2>Network Information</h2>
            {systemData.networkInfo.map((adapter, index) => (
                <div key={index} className="network-adapter">
                    <p><strong>Description:</strong> {adapter.Description}</p>
                    <p><strong>MAC Address:</strong> {adapter.MACAddress}</p>
                    <p><strong>IP Address:</strong> {adapter.IPAddress.join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default NetworkInfo;
