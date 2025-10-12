import mongoose from 'mongoose';
import { env } from '@/env';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Initialize the global mongoose cache if it doesn't exist
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}

// Type guard to ensure we have the correct type
function getCachedConnection(): MongooseCache {
  return global.mongoose!;
}

export async function connectDB(): Promise<typeof mongoose> {
  const cached = getCachedConnection();

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(env.MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  // At this point, cached.conn is guaranteed to be non-null
  if (!cached.conn) {
    throw new Error('Failed to establish database connection');
  }

  return cached.conn;
}
