import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable.");
}

// Use a cached connection to prevent multiple connections in development
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
    console.log("Attempting to connect to MongoDB...");

    if (cached.conn) {
        console.log("Using existing MongoDB connection.");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("Creating new MongoDB connection...");
        const opts = {
            bufferCommands: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts)
            .then((mongoose) => {
                console.log("MongoDB connected successfully.");
                return mongoose;
            })
            .catch((error) => {
                console.error("MongoDB connection error:", error);
                cached.promise = null; // Reset promise to avoid hanging state
                throw new Error("Database connection failed.");
            });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.error("Database connection failed:", error);
        cached.promise = null;
        throw error;
    }

    return cached.conn;
}

export default dbConnect;
