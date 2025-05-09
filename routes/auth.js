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

router.get('/login', redirectIfAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});
router.post('/login', authController.login);
router.get('/signup', redirectIfAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});
router.post('/signup', authController.signup);
router.get('/logout', authController.logout);

module.exports = router;
