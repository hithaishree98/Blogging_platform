const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  rating: { type: Number, default: 0 },
  destination: { type: String, required: true },
  imageUrl: { type: String, required: false },
  saved: { type: Boolean, default: false },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
      text: { type: String, required: true, maxlength: 500 }, // Comment content with validation
      createdAt: { type: Date, default: Date.now } // Timestamp
    }
  ]
});

module.exports = mongoose.model('Blog', blogSchema);
