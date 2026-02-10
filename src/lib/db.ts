import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

const globalWithMongoose = globalThis as unknown as { mongoose?: MongooseCache };
let cached = globalWithMongoose.mongoose;

if (!cached) {
    globalWithMongoose.mongoose = { conn: null, promise: null };
    cached = globalWithMongoose.mongoose;
}

async function dbConnect() {
    if (cached!.conn) {
        return cached!.conn;
    }

    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }

    if (!cached!.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached!.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
            return mongooseInstance;
        });
    }
    cached!.conn = await cached!.promise;
    return cached!.conn;
}

export default dbConnect;
