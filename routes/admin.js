// // admin.js

// document.addEventListener("DOMContentLoaded", () => {
//     // Tab switching logic
//     const tabButtons = document.querySelectorAll(".tab-button");
//     const tabContents = document.querySelectorAll(".tab-content");

//     tabButtons.forEach(button => {
//         button.addEventListener("click", () => {
//             const targetTab = button.dataset.tab;

//             // Hide all tab contents
//             tabContents.forEach(content => content.classList.add("hidden"));

//             // Remove active class from all buttons
//             tabButtons.forEach(btn => btn.classList.remove("active"));

//             // Show the target tab content
//             document.getElementById(targetTab).classList.remove("hidden");

//             // Set the clicked button as active
//             button.classList.add("active");
//         });
//     });

//     // Fetch data and update analytics (example placeholders)
//     fetchAnalyticsData();
// });

// function fetchAnalyticsData() {
//     // Simulate fetching analytics data
//     setTimeout(() => {
//         document.getElementById("total-users").textContent = "150";
//         document.getElementById("total-blogs").textContent = "45";
//     }, 1000);
// }

const express = require('express');
const User = require('../models/User'); // Assuming you have a User model
const router = express.Router();
const adminController = require("../controllers/adminController");

// Admin dashboard
router.get("/", adminController.dashboard);

// Manage blogs
router.get("/blogs", adminController.viewBlogs);
router.delete("/blogs/:id", adminController.deleteBlog);
router.put("/blogs/:id", adminController.editBlog);

// Manage users
router.get("/users", adminController.viewUsers);
router.delete("/users/:id", adminController.deleteUser);

// Blog statistics
router.get("/analytics", adminController.viewAnalytics);

module.exports = router;