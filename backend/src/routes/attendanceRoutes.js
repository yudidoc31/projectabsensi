const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

// Get all attendance data
router.get('/attendance', attendanceController.getAllAttendance);

// Create a new attendance record
router.post('/attendance', attendanceController.createAttendance);

module.exports = router;
