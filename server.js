const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const connectToDatabase = require('./config/database'); 
const app = express();
const path = require('path');
const adminRoutes = require('./routes/admin');

// Load environment variables
dotenv.config();

// Use express-session for session handling
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret_key', // Fix for req.secret deprecation
  resave: false,
  saveUninitialized: true,
}));

// Connect to MongoDB
connectToDatabase(); // Call the function to connect to the database


// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory to where your EJS templates are stored
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Basic route
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${listener.address().port}`);
});
