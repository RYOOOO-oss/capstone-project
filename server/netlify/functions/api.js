// Netlify Functions wrapper: serves the whole Express API as one function.
// Every /api/* and /health request is redirected here by netlify.toml.
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const app = require('../../app');

// Reuse a single MongoDB connection across warm lambda invocations.
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn && cached.conn.readyState === 1) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 20000, bufferCommands: false })
      .then((m) => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectDB();
  const handle = serverless(app);
  return handle(event, context);
};
