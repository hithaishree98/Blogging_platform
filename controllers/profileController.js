// controllers/profileController.js
const User = require('../models/User');
const Blog = require('../models/Blog');

// Get User Profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is set after authentication middleware
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: 'User not found' });

        // Get saved blogs
        const savedBlogs = await Blog.find({ _id: { $in: user.savedBlogs } });

        // Send response with user details and saved blogs
        res.json({
            username: user.username,
            name: user.name,
            email: user.email,
            savedBlogs: savedBlogs.map(blog => ({ id: blog._id, title: blog.title }))
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching profile' });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is set after authentication middleware
        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(userId, { name, email }, { new: true });

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        res.json({ message: 'Profile updated successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating profile' });
    }
};

module.exports = { getUserProfile, updateUserProfile };
