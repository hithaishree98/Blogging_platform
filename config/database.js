const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Check for required environment variables
if (!process.env.USERNAME || !process.env.PASSWORD || !process.env.HOST || !process.env.DATABASE) {
  console.error('Missing required environment variables for MongoDB connection.');
  process.exit(1);
}

// Construct the MongoDB connection string
const mongoURI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}?retryWrites=true&w=majority`;

// Function to connect to MongoDB
const connectToDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Adjust timeout as needed
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit the process with an error code
  }
};

// Export the connection function
module.exports = connectToDatabase;
