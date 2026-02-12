import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
  throw new Error("Por favor agrega MONGODB_URI en tu archivo .env.local");
}

declare global {
  // Usamos 'let' en lugar de 'var' para evitar problemas de alcance global
  let _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!_mongoClientPromise) {
    client = new MongoClient(uri, options);
    _mongoClientPromise = client.connect()
      .then((c) => {
        console.log("✅ MongoDB (MongoClient) connected (dev)");
        return c;
      })
      .catch((err) => {
        console.error("❌ MongoDB (MongoClient) connection error (dev):", err);
        throw err;
      });
  }
  clientPromise = _mongoClientPromise as Promise<MongoClient>;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect()
    .then((c) => {
      console.log("✅ MongoDB (MongoClient) connected");
      return c;
    })
    .catch((err) => {
      console.error("❌ MongoDB (MongoClient) connection error:", err);
      throw err;
    });
}

export default clientPromise;
