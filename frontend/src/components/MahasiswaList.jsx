// src/components/MahasiswaList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MahasiswaList = () => {
  const [absensi, setAbsensi] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbsensi = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/absensi');
        setAbsensi(response.data);
      } catch (err) {
        setError('Failed to fetch data')
        console.error(err.message);
      }
    };

    fetchAbsensi();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Daftar Absensi Mahasiswa</h2>
      {error ? <div className="alert alert-danger">{error}</div> : (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {absensi.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.nim}</td>
              <td>{entry.nama}</td>
              <td>{entry.tanggal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default MahasiswaList;
