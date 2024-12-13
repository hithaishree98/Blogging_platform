const Blog = require('../models/Blog');
const User = require('../models/User');

module.exports = {
  // Admin Dashboard
  getAdminDashboard: async (req, res) => {
    try {
      // You can add analytics logic here, like user trends
      const totalUsers = await User.countDocuments();
      const totalBlogs = await Blog.countDocuments();
      res.render('admin', { totalUsers, totalBlogs });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).send('Server Error');
    }
  },

  // Get All Blogs
  getBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.render('admin', { blogs });
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).send('Server Error');
    }
  },

  // Delete a Blog
  deleteBlog: async (req, res) => {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.redirect('/admin/blogs'); // Redirect to the blog list after deletion
    } catch (error) {
      console.error('Error deleting blog:', error);
      res.status(500).send('Server Error');
    }
  },

  // Get All Users
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.render('admin', { users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Server Error');
    }
  },

  // Delete a User
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.redirect('/admin/users'); // Redirect to the user list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Server Error');
    }
  }
};
