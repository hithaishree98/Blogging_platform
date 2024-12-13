const Blog = require("../models/Blog");
const User = require("../models/User");

exports.dashboard = async (req, res) => {
  try {
    const blogCount = await Blog.countDocuments();
    const userCount = await User.countDocuments();
    res.render("admin", { blogCount, userCount }); // Rendering admin view with data
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Manage Blogs
exports.viewBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name");
    res.render("adminBlogs", { blogs });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect("/admin/blogs"); // Redirect back to the blog management page
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.render("editBlog", { blog }); // Render the form with existing blog data
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Manage Users
exports.viewUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.render("adminUsers", { users });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.redirect("/admin/users"); // Redirect back to user management page
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

// Blog Analytics (e.g., views, likes)
exports.viewAnalytics = async (req, res) => {
  try {
    const blogStats = await Blog.aggregate([
      { $group: { _id: null, totalLikes: { $sum: "$likes" } } }
    ]);
    res.render("adminAnalytics", { blogStats });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
