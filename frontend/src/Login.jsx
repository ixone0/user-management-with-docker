import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        // Check for admin credentials
        if (email === 'Admin@gmail.com' && password === '123') {
            alert('Admin login successful');
            navigate('/management');
            return;
        }

        // Proceed with normal login
        try {
            const response = await axios.post('http://localhost:8000/api/login', { email, password });
            localStorage.setItem('token', response.data.token); // Save token to localStorage
            alert('Login successful');
            navigate('/dashboard'); // Redirect to Dashboard
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Invalid credentials');
        }
    };

    return (
        <div class="login-container">
        <form onSubmit={handleLogin} className="form-login">
            <h1>Login</h1>
            <div>
                <input
                    type="email"
                    placeholder="Email (Admin management: Admin@gmail.com): "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="Password (Admin management: 123): "
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="button-login">Login</button>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </form>
        </div>
    );
};

export default Login;