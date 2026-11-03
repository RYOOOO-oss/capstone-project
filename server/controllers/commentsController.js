const Comment = require('../models/Comment');
const BlogPost = require('../models/BlogPost');

// @desc    Get all comments for a post
// @route   GET /api/blog/:postId/comments
// @access  Public
exports.getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
    res.status(200).json({ success: true, count: comments.length, data: comments });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new comment
// @route   POST /api/blog/:postId/comments
// @access  Private
exports.createComment = async (req, res, next) => {
  try {
    // Check if post exists
    const post = await BlogPost.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    // Add user and post to req.body
    req.body.author = req.user.id;
    req.body.post = req.params.postId;

    const comment = await Comment.create(req.body);
    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
};
