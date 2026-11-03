// Netlify Functions wrapper: serves the whole Express API as one function.
// Every /api/* and /health request is redirected here by netlify.toml.
const serverless = require('serverless-http');
const app = require('../../app');
const { connectDB } = require('../../db');

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectDB();
  const handle = serverless(app);
  return handle(event, context);
};
