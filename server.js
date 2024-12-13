const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/database'); // Import database connection logic
const path = require('path');
// const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
// const userRoutes = require("./routes/users");
const app = express();
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

// Load environment variables
dotenv.config();

console.log("adminRoutes:", adminRoutes);
app.set("view engine", "ejs");
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" folder

// Connect to MongoDB
connectToDatabase();

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html')); // Render the homepage
});

// 404 Route
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html')); // Render the 404 error page
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(bodyParser.json()); // Parse JSON bodies
app.use(methodOverride("_method")); // Enable support for PUT/DELETE in forms

// Routes
//app.use("/auth", authRoutes);
//app.use("/admin", adminRoutes);
//app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${listener.address().port}`);
});



