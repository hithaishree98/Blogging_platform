const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  destination: { type: String, required: true },
  imageUrl: {type: String, required: false },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who saved this blog
});

module.exports = mongoose.model('Blog', blogSchema);
