const express = require('express');
const dotenv = require('dotenv');
const connectToDatabase = require('./config/database'); // Import database connection logic
const path = require('path');
const authRoutes = require("./routes/auth");
//const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const app = express();

// Load environment variables
dotenv.config();

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

// Routes
app.use("/auth", authRoutes);
//app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening on port ${listener.address().port}`);
});
