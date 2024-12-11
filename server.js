const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

// Load environment variables from the .env file
dotenv.config();

// Construct the MongoDB URI from environment variables
const mongoURI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}?retryWrites=true&w=majority`;

// Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000  // Set a longer timeout to avoid premature timeouts
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB Collection Schemas (Example for Comments collection)
const commentSchema = new mongoose.Schema({
  username: String,
  comment: String,
  date: { type: Date, default: Date.now },
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

const userProfileSchema = new mongoose.Schema({
  username: String,
  email: String,
  dateOfBirth: Date,
  createdAt: { type: Date, default: Date.now },
});

// Define Mongoose models for collections
const Comment = mongoose.model('Comments', commentSchema);
const Blog = mongoose.model('blogs', blogSchema);
const UserProfile = mongoose.model('user_profiles', userProfileSchema);

// Example of how to use the models:
app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find(); // Fetch all comments
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching comments" });
  }
});

app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find(); // Fetch all blogs
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Error fetching blogs" });
  }
});

app.get('/user-profiles', async (req, res) => {
  try {
    const profiles = await UserProfile.find(); // Fetch all user profiles
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user profiles" });
  }
});

// Example of creating a new comment:
app.post('/comments', async (req, res) => {
  const { username, comment } = req.body;
  
  if (!username || !comment) {
    return res.status(400).json({ error: "Username and comment are required" });
  }

  try {
    const newComment = new Comment({ username, comment });
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: "Error saving comment", details: err });
  }
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
