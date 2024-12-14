const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/database'); // Import database connection logic
const path = require('path');
const adminController = require('./controllers/adminController'); // Import admin controller
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
dotenv.config();

const app = express();

// Set the view engine to EJS and configure views directory
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" folder

// Connect to MongoDB
connectToDatabase();

// Routes
app.get('/', (req, res) => {
  res.render('index'); // Render the homepage using EJS layout
});

app.get('/explore', (req, res) => {
  res.render('explore'); // Render the Explore page using EJS layout
});

// Admin dashboard route
app.get('/admin', adminController.dashboard); // Use the dashboard function from adminController

// Routes for authentication
app.use('/auth', authRoutes);


// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(methodOverride("_method")); // Enable support for PUT/DELETE in forms

// 404 Route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html')); // Render the 404 error page
});

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${listener.address().port}`);
});
