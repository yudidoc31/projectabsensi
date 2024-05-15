const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const pool = require('./db');

const app = express();

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // Mengatur EJS sebagai mesin tampilan
app.set('views', path.join(__dirname, 'views')); // Menentukan folder views sebagai lokasi file-file EJS

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index'); // Menampilkan file index.ejs di dalam folder views
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Periksa apakah username ada dalam database
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length === 0) {
            return res.status(401).send('Username atau password salah');
        }

        // Periksa apakah password yang dimasukkan cocok dengan yang tersimpan
        const storedPassword = user.rows[0].password;
        if (password !== storedPassword) {
            return res.status(401).send('Username atau password salah');
        }

        // Jika username dan password benar, lakukan sesuatu, seperti membuat sesi
        req.session.user = username; // Simpan username ke dalam sesi

        res.send('Login berhasil!');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Terjadi kesalahan saat proses login');
    }
});

// Rute untuk menampilkan halaman daftar
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Periksa apakah username sudah digunakan
        const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (user.rows.length > 0) {
            req.flash('error', 'Username sudah digunakan');
            return res.redirect('/register');
        }

        // Validasi data yang masuk
        if (!username || !password) {
            req.flash('error', 'Username dan password diperlukan');
            return res.redirect('/register');
        }

        // Simpan pengguna baru jika tidak ada masalah
        const newUser = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, password]
        );

        // Menampilkan notifikasi "Pendaftaran berhasil" di bilah web
        res.send(`
            <script>
                if (!window.Notification) {
                    console.log('Browser tidak mendukung Web Notification');
                } else {
                    if (Notification.permission !== 'granted') {
                        Notification.requestPermission().then(function (permission) {
                            if (permission === 'granted') {
                                new Notification('Pendaftaran berhasil');
                            }
                        });
                    } else {
                        new Notification('Pendaftaran berhasil');
                    }
                }
            </script>
            Pendaftaran berhasil!`
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error saat mendaftarkan pengguna');
    }
});

// Rute untuk menghapus pengguna
app.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await pool.query('DELETE FROM users WHERE id = $1', [id]);
        res.send(`User with ID ${id} deleted successfully`);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error saat menghapus pengguna');
    }
});

// Perbaiki pesan error untuk rute tidak ditemukan
app.get('*', (req, res) => {
    res.status(404).send('404: Halaman tidak ditemukan');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
