const express = require('express');
const path = require('path');
const authController = require('../controllers/authController');

const router = express.Router();

// Middleware to redirect if the user is already logged in
const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/profile'); // Redirect to profile if already logged in
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
