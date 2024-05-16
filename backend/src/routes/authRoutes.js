const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// API endpoint untuk login
router.post('/login', authController.login);

// API endpoint untuk register
router.post('/register', authController.register);

module.exports = router;
