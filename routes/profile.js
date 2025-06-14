const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controllers/profileController');

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);

module.exports = router;
