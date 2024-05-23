const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// API endpoint for login
router.post('/login', authController.login);

// API endpoint for register
router.post('/register', authController.register);

// Logout endpoint
router.post('/logout', authController.logout);

module.exports = router;