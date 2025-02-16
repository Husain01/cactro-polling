import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

declare global {
  var mongooseConnection: Promise<typeof mongoose> | null;
}

let cached = global.mongooseConnection;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI not set in environment');
  }

  if (cached) return cached;

  cached = mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferCommands: false
  });

  global.mongooseConnection = cached;
  return cached;
}
