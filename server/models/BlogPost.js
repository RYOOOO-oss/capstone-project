const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a post title'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please provide post content']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);
