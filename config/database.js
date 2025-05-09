const mongoose = require('mongoose');
require('dotenv').config(); 

if (!process.env.USERNAME || !process.env.PASSWORD || !process.env.HOST || !process.env.DATABASE) {
  console.error('Missing required environment variables for MongoDB connection.');
  process.exit(1);
}

const mongoURI = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}?retryWrites=true&w=majority`;

const connectToDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, 
    });
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); 
  }
};

module.exports = connectToDatabase;
