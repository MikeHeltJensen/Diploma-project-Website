import React from 'react';
import '../style/DeviceCard.css'; // Ensure this file contains the styles

const DeviceCard = ({ device, onDelete, onClick }) => {
    const handleDelete = (event) => {
        event.stopPropagation(); // Prevents the delete button click from triggering the card click
        onDelete(device.id); // Call the delete handler with the device ID
    };

    return (
        <div className="device-card" onClick={() => onClick(device.id)}>
            <button className="delete-button" onClick={handleDelete}>X</button>
            <h3>{device.deviceName}</h3>
            <p><strong>Operating System:</strong> {device.system}</p>
        </div>
    );
};

export default DeviceCard;
