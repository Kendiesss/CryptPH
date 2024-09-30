import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGO_URL;
console.log('MongoDB URL:', MONGODB_URL); // Check if the URL is printed correctly

if (!MONGODB_URL) {
    
    throw new Error('Please define the MONGO_URL environment variable inside .env.local');
}

let isConnected;

export default async function dbConnect() {
    if (isConnected) {
        return;
    }

    const db = await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
}
