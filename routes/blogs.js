const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Import Blog model

// GET /explore - Display all blogs on the Explore page
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs from the database
    res.render('explore', { blogs }); // Pass the blogs to explore.ejs
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching blogs.');
  }
});

module.exports = router;
