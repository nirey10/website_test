// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Replace with your backend URL if different

const authService = {
    // Login function that takes a username and password
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_URL}/login`, { username, password });
            if (response.data.token) {
                // Save token to local storage
                localStorage.setItem('token', response.data.token);
                return response.data;
            }
            return null;
        } catch (error) {
            console.error('Login failed:', error);
            return null;
        }
    },

    // Logout function to clear the token from local storage
    logout: () => {
        localStorage.removeItem('token');
    },

    // Check if user is authenticated by checking for a token in local storage
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Get the token from local storage
    getToken: () => {
        return localStorage.getItem('token');
    }
};

export default authService;
