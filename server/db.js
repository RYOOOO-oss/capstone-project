// Shared MongoDB connection helper used by both the standalone server
// and the Netlify function handler. Keeps one connection per container
// and reconnects whenever the cached connection has dropped.
const mongoose = require('mongoose');

let cached = global.mongooseConn;
if (!cached) {
  cached = global.mongooseConn = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn && cached.conn.readyState === 1) {
    return cached.conn;
  }
  // Stale cache: drop it and connect again.
  cached.promise = null;
  cached.conn = null;
  cached.promise = mongoose
    .connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 20000,
      bufferCommands: false
    })
    .then((m) => m.connection);
  cached.conn = await cached.promise;
  return cached.conn;
}

module.exports = { connectDB };
