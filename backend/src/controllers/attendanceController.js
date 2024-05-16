const pool = require('../database');

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
  const { mhs_id } = req.body;
  const tanggal = Date.now();
  const status = "hadir";

  try {
    const query = 'INSERT INTO kehadiran (mhs_id, tanggal, status) VALUES ($1, $2, $3)';
    const values = [mhs_id, tanggal, status];
    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating attendance:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
