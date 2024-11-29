import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeviceList from '../components/DeviceList'; // Import the DeviceList component
import '../style/Devices.css';

const Devices = () => {
    const [devices, setDevices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [pagination, setPagination] = useState({ page: 1, limit: 10 }); // Set initial pagination state

    // Fetch devices with pagination
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/systemdata/data?page=${pagination.page}&limit=${pagination.limit}`);
                setDevices(response.data);
            } catch (error) {
                console.error('Error fetching the devices data:', error);
            }
        };

        fetchDevices();
    }, [pagination.page, pagination.limit]);

    // Handle search query changes
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="devices-container">
            <DeviceList
                devices={devices}
                searchQuery={searchQuery}
                pagination={pagination}
                setPagination={setPagination}
            />
        </div>
    );
};

export default Devices;
