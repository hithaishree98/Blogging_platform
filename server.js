const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const connectDB = require('./config/database'); // Import the DB connection logic

// Initialize the app
const app = express();

// Load environment variables
dotenv.config();

// Check environment variables
if (!process.env.USERNAME || !process.env.PASSWORD || !process.env.HOST || !process.env.DATABASE) {
  console.error("Missing environment variables! Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' folder

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/blogs", require("./routes/blogs"));
app.use("/admin", require("./routes/admin"));

// 404 Handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views/404.html"));
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${listener.address().port}`);
});
