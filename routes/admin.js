const express = require('express');
const User = require('../models/User'); 
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.dashboard);
router.get("/blogs", adminController.viewBlogs);
router.delete("/blogs/:id", adminController.deleteBlog);
router.put("/blogs/:id", adminController.editBlog);
router.get("/users", adminController.viewUsers);
router.delete("/users/:id", adminController.deleteUser);
router.get("/analytics", adminController.viewAnalytics);

module.exports = router;