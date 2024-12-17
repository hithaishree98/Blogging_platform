const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog'); // Import Blog model
const User = require('../models/User');

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

router.post('/:id/save', async (req, res) => {
    try {
        const blogId = req.params.id;
        const userId = req.session.user ? req.session.user.id : null;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Not authenticated' });
        }

        // Find the blog by ID
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ success: false, message: 'Blog not found.' });
        }

        // Find the user and add the blog to the savedBlogs array
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // Check if the blog is already saved
        if (user.savedBlogs.includes(blogId)) {
            return res.json({ success: false, message: 'Blog already saved.' });
        }

        // Add the blog to the savedBlogs array
        user.savedBlogs.push(blogId);
        await user.save();

        res.json({ success: true, message: 'Blog saved to your profile.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error saving blog.' });
    }
});

router.get('/:id/save', async (req, res) => {
    console.log(`GET request to /blogs/${req.params.id}/save`); // Log the request
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).send('Blog not found');
        }
        res.render('save', { blog });
    } catch (error) {
        console.error(error);
        res.status(404).send('Blog not found');
    }
});

module.exports = router;
