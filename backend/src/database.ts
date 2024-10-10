import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Asynchronous function to establish a connection to MongoDB
const connectToDatabase = async (): Promise<void> => {
  console.log("Connecting to DB...");

  // Use MongoDB URI from environment variables or default to a local database
  const mongoURI = process.env.MONGO_URI?.trim() || "mongodb://localhost:27017/Loans";
  console.log("mongoURI:",mongoURI);
  
  try {
    // Attempt to connect to the MongoDB database
    await mongoose.connect(mongoURI); // No additional options needed
    console.log('Successfully connected to MongoDB:', mongoURI);
  } catch (err) {
    console.error('Failed to connect to MongoDB:', (err as Error).message);
    process.exit(1); // Terminate the application on connection failure
  }
};

export default connectToDatabase;
