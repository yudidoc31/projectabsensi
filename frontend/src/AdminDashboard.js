import React, { useState, useLayoutEffect, useEffect } from 'react';
import Table from './components/Table';
import Summary from './components/Summary';
import './AdminDashboard.css';
import Switch from '@mui/material/Switch';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [mahasiswaSummary, setMahasiswaSummary] = useState({});
  const [isPagi, setIsPagi] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") == null) return navigate("/admin-login");

    // const checkAdminToken = async () => {
    //   const response = await axios.get("http://localhost:5000/api/admin/verify");
    //   console.log(response);
    //   return response.data.error;
    // }
    // if (checkAdminToken()) return navigate(-1);

    getMahasiswa();
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/admin-login");
  }

  const getMahasiswa = async () => {
    const response = await axios.get("http://localhost:5000/api/admin/mahasiswa-summary");
    setMahasiswaSummary((prevData) => prevData = response.data);
    console.log(response.data, mahasiswaSummary);
  }

  const toggle = () => {
    setIsPagi(prevState => !prevState);
  };

  if (mahasiswaSummary == {}) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="dashboard-container">
      <div className="left">
        <Table isHadir={false} mahasiswas={ isPagi ? (mahasiswaSummary.pagi?.mahasiswaTidakHadirList) : (mahasiswaSummary.sore?.mahasiswaTidakHadirList)} />
      </div>
      <div className="center">
        <button onClick={handleLogout}>Logout</button>
        <Switch
          checked={isPagi}
          onChange={toggle}
          inputProps={{ 'aria-label': 'toggle' }}
        />
        {/* Text indicating the state */}
        <span>{isPagi ? 'Pagi' : 'Sore'}</span>
        <Summary data={mahasiswaSummary} isPagi={isPagi} />
      </div>
      <div className="right">
       <Table isHadir={true} mahasiswas={ isPagi ? (mahasiswaSummary.pagi?.mahasiswaHadirList) : (mahasiswaSummary.sore?.mahasiswaHadirList)} />
      </div>
    </div>
  );
};

export default AdminDashboard;
