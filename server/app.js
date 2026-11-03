require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/error');

// Route files
const users = require('./routes/users');
const projects = require('./routes/projects');
const blog = require('./routes/blog');
const contact = require('./routes/contact');

const app = express();

// Body parser
app.use(express.json());

// Security headers
app.use(helmet());

// Enable CORS
app.use(cors());

// Health check for the hosting platform
const { connectDB } = require('./db');
app.get('/health', async (req, res) => {
  // Self-heal: reconnect if the container's connection has dropped.
  try {
    await connectDB();
  } catch (err) {
    // reported below via readyState
  }
  const dbUp = mongoose.connection.readyState === 1;
  res.status(dbUp ? 200 : 503).json({
    success: dbUp,
    status: dbUp ? 'ok' : 'unavailable',
    readyState: mongoose.connection.readyState,
    hasMongoUri: Boolean(process.env.MONGO_URI),
    hasJwtSecret: Boolean(process.env.JWT_SECRET)
  });
});

// Mount routers
app.use('/api/users', users);
app.use('/api/projects', projects);
app.use('/api/blog', blog);
app.use('/api/contact', contact);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
