const pool = require('../database');

// Function to get all users
const getAllUsers = async () => {
  try {
    const query = 'SELECT * FROM mahasiswa';
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    throw new Error(`Error fetching mahasiswa: ${error}`);
  }
};

// Function to create a new user
const createUser = async (nim, hashedPassword, nama, prodi, angkatan) => {
  try {
    const query = 'INSERT INTO mahasiswa (nim, password, nama, prodi, angkatan) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [nim, hashedPassword, nama, prodi, angkatan];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
};

// Function to get a user by NIM
const getByNim = async (nim) => {
  try {
    const query = 'SELECT * FROM mahasiswa WHERE nim = $1';
    const values = [nim];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error(`Error getting user by nim: ${error}`);
  }
};

// Function to get a user by NIM
const getById = async (id) => {
  try {
    const query = 'SELECT * FROM mahasiswa WHERE id = $1';
    const values = [id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error(`Error getting user by id: ${error}`);
  }
};


module.exports = {
  getAllUsers,
  createUser,
  getByNim,
  getById,
};
