const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Get all admin data
router.get('/mahasiswa-summary', adminController.getMahasiswaSummary);

// Edit mahasiswa
router.put('/mahasiswa', adminController.editMahasiswa);

// Delete mahasiswa
router.delete('/mahasiswa', adminController.deleteMahasiswa);

module.exports = router;
