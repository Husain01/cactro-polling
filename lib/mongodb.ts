import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

declare global {
  let mongooseConnection: Promise<typeof mongoose> | null;
}

let cached = (global as any).mongooseConnection;

export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI in .env.local");
  }

  if (cached) return await cached;

  cached = mongoose.connect(uri, {
    bufferCommands: false,
  });

  (global as any).mongooseConnection = cached;
  return await cached;
}
