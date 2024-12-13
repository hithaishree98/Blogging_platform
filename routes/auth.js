const express = require('express');
const router = express.Router();
const { signup, login } = require('../controllers/authController');

// Signup Routes
router.get('/signup', (req, res) => res.sendFile('signup.html', { root: 'public/views' }));
router.post('/signup', signup);

// Login Routes
router.get('/login', (req, res) => res.sendFile('login.html', { root: 'public/views' }));
router.post('/login', login);

module.exports = router;
