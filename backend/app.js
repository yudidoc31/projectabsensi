const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const path = require('path'); // Import path module

const app = express();

// Konfigurasi body-parser
app.use(bodyParser.urlencoded({ extended: true }));

// Konfigurasi koneksi ke database PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'absen',
  password: '313',
  port: 5432,
});

// Set folder yang berisi file-file JS sebagai folder publik
app.use(express.static(path.join(__dirname, 'public')));

// Rute untuk halaman signup
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html')); // Mengirim file signup.html saat rute /signup dipanggil
});

// Rute untuk proses signup
app.post('/signup', async (req, res) => {
  try {
    const { nim, username, jurusan, password } = req.body;
    const client = await pool.connect();
    await client.query('INSERT INTO mahasiswa (nim, username, jurusan, password) VALUES ($1, $2, $3, $4)', [nim, username, jurusan, password]);
    client.release();
    // Redirect ke halaman list setelah berhasil signup
    res.redirect('/list');
  } catch (error) {
    console.error('Terjadi kesalahan saat registrasi:', error);
    res.status(500).send('Terjadi kesalahan saat registrasi');
  }
});

// Rute untuk halaman login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html')); // Mengirim file login.html saat rute /login dipanggil
});

// Rute untuk proses login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const client = await pool.connect();
    const queryText = 'SELECT * FROM mahasiswa WHERE username = $1 AND password = $2';
    const result = await client.query(queryText, [username, password]);
    client.release();

    if (result.rows.length > 0) {
      const username = result.rows[0].username;
      // Redirect ke halaman selamat datang setelah berhasil login
      res.redirect(`/welcome?username=${encodeURIComponent(username)}`);
    } else {
      res.status(400).send('Username atau password salah');
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat login:', error);
    res.status(500).send('Terjadi kesalahan saat login');
  }
});

// Rute utama (root URL)
app.get('/', async (req, res) => {
  // Logika untuk menampilkan halaman utama tetap sama
});

// Rute untuk halaman selamat datang
app.get('/welcome', (req, res) => {
  // Logika untuk menampilkan halaman selamat datang tetap sama
});

// Contoh route untuk fetch data mahasiswa
app.get('/api/mahasiswa', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM mahasiswa');
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data mahasiswa:', error);
    res.status(500).json({ error: 'Terjadi kesalahan saat mengambil data mahasiswa' });
  }
});


// Handler untuk rute yang tidak didefinisikan
app.use((req, res) => {
  res.redirect('/login');
});

// Port tempat server akan berjalan
const PORT = process.env.PORT || 3001;

// Mulai server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});