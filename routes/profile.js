// routes/profile.js
const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');

// GET user profile
router.get('/profile', getUserProfile);

// PUT update user profile
router.put('/profile', updateUserProfile);

module.exports = router;
