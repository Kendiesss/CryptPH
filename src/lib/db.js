// lib/dbConnect.js
import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGO_URL;

if (!MONGODB_URL) {
  throw new Error('Please define the MONGO_URL environment variable in .env.local');
}

let isConnected = false; // Track the connection status

export default async function dbConnect() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('MongoDB connected:', MONGODB_URL);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}
