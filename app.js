const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route untuk menampilkan daftar mahasiswa
app.get('/db_mahasiswa', async (req, res) => {
    res.send('Selamat datang di aplikasi absensi mahasiswa');
  try {
    const result = await pool.query('SELECT * FROM mahasiswa');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

// Route untuk menambahkan absensi mahasiswa
app.post('/', async (req, res) => {
  const { mahasiswa_id, status } = req.body;
  const tanggal = new Date().toISOString().slice(0, 10);
  
  try {
    const result = await pool.query(
      'INSERT INTO absensi (mahasiswa_id, tanggal, status) VALUES ($1, $2, $3) RETURNING *',
      [mahasiswa_id, tanggal, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Terjadi kesalahan' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));