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
app.get('/health', (req, res) => {
  const dbUp = mongoose.connection.readyState === 1;
  res.status(dbUp ? 200 : 503).json({
    success: dbUp,
    status: dbUp ? 'ok' : 'unavailable'
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
