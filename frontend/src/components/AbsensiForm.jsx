// src/components/AbsensiForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AbsensiForm = () => {
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [status, setStatus] = useState("pagi");
  const navigate = useNavigate();

  
  useEffect(() => {
    if (localStorage.getItem("token") == null) navigate("/login");
    const token = localStorage.getItem("token");

    const fetchMahasiswaData = async (token) => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/mahasiswa",
          { params: { token } }
        );
        console.log(response);
        setNama(response.data.user.nama);
        setProdi(response.data.user.prodi);
        setAngkatan(response.data.user.angkatan);
      } catch (error) {
        alert(`You have been signed in as Admin/Dosen. Anda bukan mahasiswa!`);
        toast.error(error);
      }
    };

    fetchMahasiswaData(token);
  }, []);

  // refactor to hadir
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:5000/api/attendance", { token, status });
      console.log(response);
      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        toast.success(`Selamat, anda telah mengisi absen ${status}`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2 className="mt-4">Form Absensi Mahasiswa</h2>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <h1>Nama: {nama}</h1>
        </div>
        <div className="form-group">
          <h1>Program Studi: {prodi}</h1>
        </div>
        <div className="form-group">
          <h1>Angkatan: {angkatan}</h1>
        </div>
        <div>
      <h1>Select Time of Day</h1>
      <label>
        <input
          type="radio"
          value="pagi"
          checked={status === "pagi"}
          onChange={handleChange}
        />
        pagi
      </label>
      <label>
        <input
          type="radio"
          value="sore"
          checked={status === "sore"}
          onChange={handleChange}
        />
        sore
      </label>
      <div>
        <p>Selected time of day: {status}</p>
      </div>
    </div>
        <button type="submit" className="btn btn-primary mt-3">
          Hadir
        </button>
      </form>
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AbsensiForm;
