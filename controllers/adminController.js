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
