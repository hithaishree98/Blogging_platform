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

// Admin dashboard route
router.get('/dashboard', (req, res) => {
  res.send('Welcome to the Admin Dashboard');
});

// Create a new user
router.post('/users', async (req, res) => {
  const { name, email, role } = req.body;
  const newUser = new User({ name, email, role });
  await newUser.save();
  res.status(201).send('User created successfully');
});

// Get all users
router.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Update a user
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role } = req.body;
  await User.findByIdAndUpdate(id, { name, email, role });
  res.send('User updated');
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.send('User deleted');
});

module.exports = router;

