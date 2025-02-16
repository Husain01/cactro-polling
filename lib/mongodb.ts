import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in .env.local");
}

declare global {
  var mongooseConnection: Promise<typeof mongoose> | null;
}

let cached = global.mongooseConnection;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached) return await cached;

  cached = mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  });

  global.mongooseConnection = cached;
  return await cached;
}
