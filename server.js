const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database'); // Import the MongoDB connection

const app = express();

// Load environment variables
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Connect to MongoDB
connectDB();

// Routes
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const blogRoutes = require('./routes/blogs');
const adminRoutes = require('./routes/admin');

app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/blogs', blogRoutes);
app.use('/admin', adminRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${listener.address().port}`);
});
