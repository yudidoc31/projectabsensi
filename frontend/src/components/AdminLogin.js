// src/components/AdminLogin.js
import React, { useState, useEffect } from 'react';
import './AdminLogin.css'; // Create this CSS file for styling
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';

const AdminLogin = () => {
  const [nama, setNama] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") != null) navigate(-1);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add login logic here
      const response = await axios.post("http://localhost:5000/api/admin/login", {nama, password});
      console.log(response);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        localStorage.setItem("token", response.data.token);
        navigate("/admin-dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nama">Nama:</label>
          <input
            type="nama"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/login">
        <Button variant="primary" className="mt-3">Login as Mahasiswa</Button>
      </Link>
    </div>
  );
};

export default AdminLogin;
