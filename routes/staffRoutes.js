const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');

// Register new staff
router.post('/register', staffController.registerStaff);

// Get staff by employee number or all staff
router.get('/:employeeNumber?', staffController.getStaff);

// Update staff details
router.put('/:employeeNumber', staffController.updateStaff);

module.exports = router;
