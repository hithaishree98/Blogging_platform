const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Import Blog model

// GET /explore - Display all blogs on the Explore page
router.get('/', async (req, res) => {
  try {
    const searchQuery = req.query.search || ''; // Capture search query if provided
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } }, // Case-insensitive search by title
        { destination: { $regex: searchQuery, $options: 'i' } } // Case-insensitive search by destination
      ]
    });
    res.render('explore', { blogs }); // Pass the blogs to explore.ejs
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching blogs.');
  }
});

module.exports = router;
