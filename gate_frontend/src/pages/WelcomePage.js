// src/pages/WelcomePage.js

import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
    return (
        <div className="container">
            <header>
                <h1>Welcome to the Product Management App!</h1>
                <p>Select an option below:</p>
            </header>
            <div>
                <Link to="/users">
                    <button>Manage Users</button>
                </Link>
                <Link to="/products">
                    <button>Manage Products</button>
                </Link>
            </div>
        </div>
    );
}

export default WelcomePage;
