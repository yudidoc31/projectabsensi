const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Get all attendance data
router.get('', attendanceController.getAllAttendance);

// Create a new attendance record
router.post('', attendanceController.createAttendance);

module.exports = router;
