// src/pages/UsersPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UsersPage({ token }) {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ username: '', clearance_level: 'user' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await axios.get('http://localhost:5000/users', {
            headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
    };

    const handleAddUser = async () => {
        await axios.post('http://localhost:5000/users', newUser, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers();
    };

    const handleDeleteUser = async (id) => {
        await axios.delete(`http://localhost:5000/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers();
    };

    return (
        <div className="container">
            <header>
                <h1>Manage Users</h1>
            </header>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Clearance Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.clearance_level}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={newUser.username}
                    onChange={e => setNewUser({ ...newUser, username: e.target.value })}
                />
                <select
                    value={newUser.clearance_level}
                    onChange={e => setNewUser({ ...newUser, clearance_level: e.target.value })}
                >
                    <option value="user">User</option>
                    <option value="user_admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="developer">Developer</option>
                </select>
                <button onClick={handleAddUser}>Add User</button>
            </div>
        </div>
    );
}

export default UsersPage;
