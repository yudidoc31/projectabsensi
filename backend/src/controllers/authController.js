const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Fungsi untuk login pengguna
exports.login = async (req, res) => {
  const { nim, password } = req.body;

  try {
    // Cari pengguna berdasarkan username
    const user = await User.getByNim(nim);

    // Jika pengguna tidak ditemukan
    if (!user) {
      return res.status(404).json({ message: 'No student with that NIM' });
    }

    // Verifikasi password
    const isValidPassword = await bcrypt.compare(password, user.password);

    // Jika password tidak valid
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    // Kirim token sebagai respons
    res.json({ message: "Success login", token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fungsi untuk registrasi pengguna
exports.register = async (req, res) => {
  const { nim, password, nama, prodi, angkatan } = req.body;

  try {
    // Cek apakah username atau email sudah digunakan
    const existingUser = await User.getByNim(nim);
    if (existingUser) {
      return res.status(400).json({ message: 'Student with that NIM already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tambahkan pengguna baru ke database
    const newUser = await User.createUser(nim, hashedPassword, nama, prodi, angkatan);

    // Buat token JWT
    const token = jwt.sign({ userId: newUser.id }, 'your-secret-key', { expiresIn: '1h' });

    // Kirim token sebagai respons
    res.status(201).json({ message: "Success add new student to UNAS", token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};