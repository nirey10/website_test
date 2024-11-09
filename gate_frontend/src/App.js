import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import TableComponent from './components/TableComponent';
import Login from './pages/LoginPage';
import WelcomePage from './pages/WelcomePage';
// import UsersPage from './pages/UserPage';
// import ProductsPage from './pages/ProductPage';
import BoardPage from './pages/BoardPage';
import UserPage from './pages/UserPage';

const apiUrl = 'http://localhost:5000/items';

function App() {

  return (
    // <Router>
    //   <Routes>
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/home" element={<WelcomePage />} />
    //     <Route path="/" element={<Navigate to="/login" />} />
    //   </Routes>
    // </Router>
    <div>
    <UserPage />
  </div>
  );
}

export default App;
