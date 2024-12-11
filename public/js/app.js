// JavaScript code for handling comments submission (placeholder example)

// Event listener for comment form submission
document.addEventListener('DOMContentLoaded', function () {
  const commentForm = document.querySelector('.comment-form');
  commentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Get the comment text
    const commentText = document.getElementById('comment').value;
    // Clear the textarea
    document.getElementById('comment').value = '';
    // Placeholder for AJAX request to submit comment to the server
    alert('Your comment has been submitted!');
  });
});

const express = require('express');
const app = express();
const adminRoutes = require('./routes/admin');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/admin', adminRoutes);
