const pool = require('../database');

// Fungsi untuk mendapatkan semua pengguna
const getAllUsers = async () => {
  try {
    const query = 'SELECT * FROM mahasiswa'; // Query untuk mendapatkan semua pengguna
    const { rows } = await pool.query(query); // Eksekusi query menggunakan pool koneksi
    return rows; // Kembalikan hasil pengguna
  } catch (error) {
    throw new Error(`Error fetching mahasiswa: ${error}`); // Tangkap dan lempar error
  }
};

// Fungsi untuk menambahkan pengguna baru
const createUser = async (nim, hashedPassword, nama, prodi, angkatan) => {
  try {
    const query = 'INSERT INTO mahasiswa (nim, password, nama, prodi, angkatan) VALUES ($1, $2, $3, $4, $5) RETURNING *'; // Query untuk menambahkan pengguna
    const values = [nim, hashedPassword, nama, prodi, angkatan]; // Nilai parameter untuk query
    const { rows } = await pool.query(query, values); // Eksekusi query menggunakan pool koneksi
    return rows[0]; // Kembalikan pengguna yang ditambahkan
  } catch (error) {
    throw new Error(`Error creating user: ${error}`); // Tangkap dan lempar error
  }
};

// Fungsi untuk mendapatkan pengguna berdasarkan nim
const getByNim = async (nim) => {
  try {
    const query = 'SELECT * FROM mahasiswa WHERE nim = $1'; // Query untuk mendapatkan pengguna berdasarkan nim
    const values = [nim]; // Nilai parameter untuk query
    const { rows } = await pool.query(query, values); // Eksekusi query menggunakan pool koneksi
    return rows[0]; // Kembalikan pengguna yang ditemukan (atau null jika tidak ditemukan)
  } catch (error) {
    throw new Error(`Error getting user by nim: ${error}`);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getByNim,
};
