// models/Blog.js
const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    default: Number
  }
});

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
