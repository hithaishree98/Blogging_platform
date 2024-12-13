const express = require('express');
const path = require('path'); // Required for file path resolution
const router = express.Router();

// Serve the login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'));
});

// Process login form
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Handle login logic here
  res.send('Login Logic');
});

// Serve the signup page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'));
});

// Process signup form
router.post('/signup', (req, res) => {
  const { name, email, password, role } = req.body;
  // Handle signup logic here
  res.send('Signup Logic');
});

module.exports = router;
