const express = require('express');
const path = require('path');
const authController = require('../controllers/authController');
const router = express.Router();

// Serve Login Page
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Handle Login Form Submission
router.post('/login', authController.login);

// Serve Signup Page
router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});

// Handle Signup Form Submission
router.post('/signup', authController.signup);

module.exports = router;