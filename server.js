const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

// Load environment variables
dotenv.config();

// Construct the MongoDB URI from environment variables
const mongoURI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}?retryWrites=true&w=majority`;

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000  // Set a longer timeout
})
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    // Also log the specific error message
    console.log("Error details: ", err.message);
  });

// Middleware
app.use(express.json());

// A simple route to check if the server is working
app.get('/', (req, res) => {
  res.send('Hello, your server is running!');
});

// Test route to check MongoDB connection
app.get('/test-db', (req, res) => {
  mongoose.connection.db.collection('blogs').findOne({}, (err, result) => {
    if (err) {
      console.error('Error connecting to MongoDB:', err);  // Ensure errors are logged
      res.status(500).send('MongoDB connection error');
    } else {
      console.log('Successfully connected to MongoDB:', result);
      res.status(200).send('Successfully connected to MongoDB');
    }
  });
});

// Start the server
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
