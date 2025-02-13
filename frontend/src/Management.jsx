import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Management.css';

const Management = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch users from the API
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users', newUser);
            setUsers([...users, response.data]);
            setNewUser({ name: '', email: '', password: '' });
            alert('User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${id}`);
            setUsers(users.filter((user) => user.id !== id));
            alert('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="management">
            <h1>User Management</h1>
            <button onClick={handleLogout} className="logout-button">Logout</button>

            <form onSubmit={handleAddUser} className="add-user-form">
                <h2>Add User</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    required
                />
                <button type="submit">Add User</button>
            </form>

            <div className="user-list">
                <h2>Existing Users</h2>
                <ul>
                    {users.map((user) => (
                        <li key={user.id} className="user-item">
                            <span>{user.name} ({user.email})</span>
                            <button onClick={() => handleDeleteUser(user.id)} className="delete-button">Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Management;
