const jwt = require("jsonwebtoken");
const pool = require('../database');
const User = require("../models/user");

// Get all attendance data
exports.getAllAttendance = async (req, res) => {
  try {
    const query = 'SELECT * FROM kehadiran';
    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching kehadiran table:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new attendance record
exports.createAttendance = async (req, res) => {
  try {
    const tanggal = new Date();
    const status = req.body.status;
    console.log(tanggal);

    const token = req.body.token;
    const { userId }  = jwt.verify(token, "your-secret-key");
    const user = await User.getById(userId);


    let sql = "SELECT * FROM kehadiran WHERE mhs_id = $1 AND tanggal = $2 AND status = $3";
    let values = [userId, tanggal, status];
    const checkHadir = await pool.query(sql, values);
    if (checkHadir.rows.length > 0) {
      return res.json({ error: true, message: `Anda sudah absen` });
    }

    sql = 'INSERT INTO kehadiran (mhs_id, tanggal, status) VALUES ($1, $2, $3) RETURNING *';
    values = [user.id, tanggal, status];
    const { rows } = await pool.query(sql, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating attendance:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
