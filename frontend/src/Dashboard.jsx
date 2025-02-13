import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Dashboard.css';  // Import the CSS file

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from storage
        alert('Logged out successfully');
        navigate('/login'); // Redirect to login page
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decoded = jwtDecode(token); // ใช้ jwt_decode
            setUser(decoded); // ตั้งค่าผู้ใช้จาก token
        } else {
            navigate('/login'); // ถ้าไม่มี token ให้ไปที่หน้า Login
        }
    }, [navigate]);

    return (
        <div className="dashboard-container">
            <h1>Welcome to the Dashboard!</h1>
            {user ? (
                <div>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Loading user information...</p> // แสดงข้อความขณะโหลดข้อมูล
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;