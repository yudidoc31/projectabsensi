import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import AbsensiForm from './components/AbsensiForm';
import MahasiswaList from './components/MahasiswaList';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/absensi" element={<AbsensiForm />} />
          <Route path="/mahasiswa" element={<MahasiswaList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
