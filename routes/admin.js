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
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to get analytics (total users and total blogs)
router.get('/analytics', adminController.getAnalytics);

// Route to fetch users
router.get('/users', adminController.getUsers);

// Route to fetch blogs
router.get('/blogs', adminController.getBlogs);

// If you need to manage users, you will need to add a separate method in your controller for that.
router.post('/users/manage', adminController.manageUsers);  // Ensure manageUsers method exists in the controller

module.exports = router;

