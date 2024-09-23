import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Sidebar.css';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/devices">Devices</Link>
                </li>
                <li>
                    <Link to="/security">Security</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;