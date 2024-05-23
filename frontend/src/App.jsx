// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AbsensiForm from './components/AbsensiForm';
import MahasiswaList from './components/MahasiswaList';
import AdminDashboard from './AdminDashboard';
import AdminLogin from './components/AdminLogin';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/absensi" element={<AbsensiForm />} />
          <Route path="/mahasiswa" element={<MahasiswaList />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
