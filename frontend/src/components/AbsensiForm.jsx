// src/components/AbsensiForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AbsensiForm = () => {
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [status, setStatus] = useState("pagi");

  useEffect(() => {
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
        alert(error);
      }
    };

    fetchMahasiswaData(token);
  }, []);

  // refactor to hadir
  const handleSubmit = async (e) => {
    // e.preventDefault();
    // try {
    //   const token = localStorage.getItem("token");
    //   await axios.post("http://localhost:5000/api/attendance", { token, status });
    // } catch (err) {
    //   console.error(err.message);
    // }
  };

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="container">
      <h2 className="mt-4">Form Absensi Mahasiswa</h2>
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
    </div>
  );
};

export default AbsensiForm;
