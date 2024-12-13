const User = require("../models/User");
const Blog = require("../models/Blog");

exports.getAnalytics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBlogs = await Blog.countDocuments();
        res.json({ totalUsers, totalBlogs });
    } catch (error) {
        res.status(500).json({ message: "Error fetching analytics", error });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("name email role");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error });
    }
};

exports.getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name");
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching blogs", error });
    }
};

exports.manageUsers = async (req, res) => {
    try {
        const { userId, action } = req.body;  // Example: userId and action from request body

        // Implement logic based on the action (e.g., "block", "delete", "promote")
        if (action === 'delete') {
            await User.findByIdAndDelete(userId); // Delete the user by ID
            res.json({ message: 'User deleted successfully' });
        } else {
            res.status(400).json({ message: 'Action not recognized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error managing users', error });
    }
};