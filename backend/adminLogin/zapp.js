// app.js

const express = require('express');
const { Client } = require('pg');

const app = express();

// Konfigurasi koneksi ke database PostgreSQL
const client = new Client({
  user: 'username', // Ganti dengan username PostgreSQL Anda
  host: 'localhost',
  database: 'daftar_hadir_mahasiswa',
  password: 'password', // Ganti dengan password PostgreSQL Anda
  port: 5432,
});

// Tampilkan index.html saat mengakses root URL
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// API untuk mendapatkan daftar mahasiswa dari database
app.get('/mahasiswa', async (req, res) => {
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM mahasiswa');
    res.json(result.rows);
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data mahasiswa' });
  } finally {
    await client.end();
  }
});

// Port tempat server akan berjalan
const PORT = process.env.PORT || 3000;

// Mulai server
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
