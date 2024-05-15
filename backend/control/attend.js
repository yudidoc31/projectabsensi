// Import modul yang diperlukan
const express = require('express');
const router = express.Router(); // Menggunakan router untuk menangani rute terkait penghadiran
const { Pool } = require('pg');

// Konfigurasi koneksi ke database PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'absen',
  password: '313',
  port: 5432,
});

// Handler untuk menampilkan halaman login (GET request)
router.get('/login', (req, res) => {
    res.render('login'); // Memanggil file login.ejs
});

// Handler untuk menghadiri acara (metode POST)
router.post('/attend', async (req, res) => {
  try {
      const { nim } = req.body; // Sesuaikan dengan nama input pada formulir
      const client = await pool.connect();
      await client.query('UPDATE mahasiswa SET kehadiran=true WHERE nama=$1', [nim]);
      client.release();
      res.redirect('/profile'); // Setelah menghadiri acara, arahkan kembali ke halaman profil
  } catch (error) {
      console.error('Terjadi kesalahan saat menghadiri acara:', error);
      res.status(500).render('error', { message: 'Terjadi kesalahan saat menghadiri acara' });
  }
});

// Export router agar bisa digunakan pada entrypoint utama
module.exports = router;
