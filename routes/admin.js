const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admins only.' });
  }
};

// Routes for Admin Actions
router.get('/blogs', isAdmin, adminController.getAllBlogs); // View all blogs
router.delete('/blogs/:id', isAdmin, adminController.deleteBlog); // Delete a blog

router.get('/users', isAdmin, adminController.getAllUsers); // View all users
router.patch('/users/:id', isAdmin, adminController.deactivateUser); // Deactivate a user

module.exports = router;
