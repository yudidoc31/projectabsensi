const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const pool = require('./database'); // Ensure you have the database setup as per the previous instructions
const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const mahasiswaRoute = require('./routes/mahasiswaRoute');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your_secret_key'; // replace with your secret key

app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Register Admin
app.post('/api/admin/register', async (req, res) => {
  const { nama, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO dosen (nama, password) VALUES ($1, $2)', [nama, hashedPassword]);
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Login Admin
app.post('/api/admin/login', async (req, res) => {
  const { nama, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM dosen WHERE nama = $1', [nama]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid nama' });
    }

    const dosen = result.rows[0];
    const validPassword = await bcrypt.compare(password, dosen.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ dosenId: dosen.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Verify Token
app.get('/api/admin/verify', (req, res) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({ adminId: decoded.adminId });
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(400).json({ error: 'Token is not valid' });
  }
});

// Create Admin Account
app.post('/api/admin/create', async (req, res) => {
  const { nama, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO admins (nama, password) VALUES ($1, $2)', [nama, hashedPassword]);
    res.status(201).json({ message: 'Admin account created successfully' });
  } catch (error) {
    console.error('Error creating admin account:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Test Login (for Postman testing)
app.post('/api/admin/test-login', async (req, res) => {
  const { nama, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM admins WHERE nama = $1', [nama]);
    if (result.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid nama or password' });
    }

    const admin = result.rows[0];
    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid nama or password' });
    }

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error testing login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/mahasiswa', mahasiswaRoute);
app.use('/api/attendance', attendanceRoutes);

// Define the joined-data API endpoint
app.get('/joined-data', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        students.student_id,
        students.name,
        courses.course_id,
        courses.course_name
      FROM students
      JOIN courses ON students.course_id = courses.course_id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching joined data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
