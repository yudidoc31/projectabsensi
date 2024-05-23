const express = require('express');
const router = express.Router();
const mahasiswaController = require('../controllers/mahasiswaController');

// Get student data by token
router.get("", mahasiswaController.getMahasiswaData);

module.exports = router;
