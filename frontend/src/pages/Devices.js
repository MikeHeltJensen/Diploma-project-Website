import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import DeviceCard from '../components/DeviceCard';
import '../style/Devices.css';

const Devices = () => {
    const [devices, setDevices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDevices, setFilteredDevices] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get('http://localhost:8080/systemdata/data');
                setDevices(response.data);
                setFilteredDevices(response.data);
            } catch (error) {
                console.error('Error fetching the devices data:', error);
            }
        };

        fetchDevices();
    }, []);

    useEffect(() => {
        const results = devices.filter(device =>
            device.deviceName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredDevices(results);
    }, [searchQuery, devices]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCardClick = (deviceId) => {
        navigate(`/devices/${deviceId}`); // Navigate to the device details page
    };

    return (
        <div className="devices-container">
            <h2>Devices</h2>
            <input
                type="text"
                placeholder="Search by device name"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            <div className="device-card-grid">
                {filteredDevices.map((device) => (
                    <DeviceCard
                        key={device.id}
                        device={device}
                        onClick={() => handleCardClick(device.id)} // Handle click event
                    />
                ))}
            </div>
        </div>
    );
};

export default Devices;
