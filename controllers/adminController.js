const Blog = require("../models/Blog");
const User = require("../models/User");

// In controllers/adminController.js
// controllers/adminController.js

exports.dashboard = async (req, res) => {
  try {
    const blogCount = await Blog.countDocuments(); // Count all blog documents
    const userCount = await User.countDocuments(); // Count all user documents
    const averageRating = await Blog.aggregate([
            { $group: { _id: null, averageRating: { $avg: "$rating" } } }
        ]);
    const avgRating = averageRating[0] ? averageRating[0].averageRating : 0;
    // Get the top 3 destinations based on the count of each destination
    const topDestinations = await Blog.aggregate([
      { $group: { _id: "$destination", count: { $sum: 1 } } }, // Group by destination and count occurrences
      { $sort: { count: -1 } }, // Sort by the count in descending order
      { $limit: 3 } // Get the top 3 destinations
    ]);
    console.log("Top Destinations:", topDestinations);
    res.render('admin', { blogCount, userCount, avgRating, topDestinations });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
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

// // Manage Users
// exports.viewUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.render("adminUsers", { users });
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// };

// exports.deleteUser = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.redirect("/admin/users"); // Redirect back to user management page
//   } catch (err) {
//     res.status(500).send("Server Error");
//   }
// };

