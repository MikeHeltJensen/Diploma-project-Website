import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Devices from './pages/Devices';
import DeviceDetails from './pages/DeviceDetails';
import Security from './pages/Security';
import Login from './components/LogIn';
import SignUp from './components/SignUp';
import './App.css';

// A simple protected route component
const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem('token'); // Check if the user is logged in
  return token ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/devices/:id" element={<DeviceDetails />} />
              <Route path="/security" element={<ProtectedRoute element={<Security />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
