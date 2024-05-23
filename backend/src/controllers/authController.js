const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Function for user login
exports.login = async (req, res) => {
  const { nim, password } = req.body;

  try {
    const user = await User.getByNim(nim);

    if (!user) {
      return res.status(404).json({ message: 'No student with that NIM' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

    res.json({ message: "Success login", token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Function for user registration
exports.register = async (req, res) => {
  const { NIM, password, nama, prodi, angkatan } = req.body;
  const nim = NIM;
  try {
    const existingUser = await User.getByNim(nim);
    if (existingUser) {
      return res.status(400).json({ message: 'Student with that NIM already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.createUser(nim, hashedPassword, nama, prodi, angkatan);

    const token = jwt.sign({ userId: newUser.id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({ message: "Success add new student to UNAS", token });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: `Internal server error: ${error}` });
  }
};

// Function for user logout
exports.logout = (req, res) => {
  if (!req.headers['authorization']) {
    return res.status(401).send('Authorization header is missing');
  }
  // To logout, we might want to invalidate the token somehow, depending on implementation
  res.status(200).json({ message: 'Logout successful' });
};
