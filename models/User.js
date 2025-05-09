const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: false },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user' },
  savedBlogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'  
  }],
  myBlogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog' 
  }]
});

module.exports = mongoose.model('User', userSchema);
