const express = require('express');
const path = require('path');
const authController = require('../controllers/authController');

const router = express.Router();
const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/profile'); 
    }
    next();
};

// Serve Login Page
router.get('/login', redirectIfAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Handle Login Form Submission
router.post('/login', authController.login);

// Serve Signup Page
router.get('/signup', redirectIfAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});

// Handle Signup Form Submission
router.post('/signup', authController.signup);

// Handle Logout
router.get('/logout', authController.logout);

module.exports = router;
