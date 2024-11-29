import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeviceCard from './DeviceCard';
import GenerateScriptButton from './GenerateScriptButton'; // Import the button component
import '../style/DeviceList.css';

const DeviceList = () => {
    const [devices, setDevices] = useState([]); // Current page of devices
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0); // Current page number
    const [totalPages, setTotalPages] = useState(1); // Total pages from the API
    const navigate = useNavigate();

    const fetchDevices = async (pageNumber = 0) => {
        try {
            const response = await axios.get(`http://localhost:8080/systemdata/data?page=${pageNumber}&limit=10`);
            setDevices(response.data.content); // Set the devices for the current page
            setTotalPages(response.data.totalPages); // Update the total pages
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    useEffect(() => {
        fetchDevices(page); // Fetch devices when the page changes
    }, [page]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleCardClick = (deviceId) => {
        navigate(`/devices/${deviceId}`);
    };

    const handleDelete = async (deviceId) => {
        try {
            await axios.delete(`http://localhost:8080/systemdata/${deviceId}`);
            fetchDevices(page); // Refresh the devices on the current page
        } catch (error) {
            console.error('Error deleting device:', error);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="device-list-container">
            {/* Header section with Devices and Generate Script Button */}
            <div className="device-list-header">
                <h2>Devices</h2>
                <GenerateScriptButton /> {/* Place the Generate Script button here */}
            </div>
            <input
                type="text"
                placeholder="Search devices..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="device-list-search"
            />
            <div className="pagination">
                {/* Display pagination controls if there are multiple pages */}
                {totalPages > 1 && (
                    <>
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                            Previous
                        </button>
                        <span>Page {page + 1} of {totalPages}</span>
                        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
                            Next
                        </button>
                    </>
                )}
            </div>
            <div className="device-list-grid">
                {devices.map((device) => (
                    <DeviceCard
                        key={device.id}
                        device={device}
                        onClick={handleCardClick} // Handle card click for navigation
                        onDelete={handleDelete} // Handle delete functionality
                    />
                ))}
            </div>
            <div className="pagination">
                {/* Bottom pagination controls */}
                {totalPages > 1 && (
                    <>
                        <button onClick={() => handlePageChange(page - 1)} disabled={page === 0}>
                            Previous
                        </button>
                        <span>Page {page + 1} of {totalPages}</span>
                        <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1}>
                            Next
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default DeviceList;
