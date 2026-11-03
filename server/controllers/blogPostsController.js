const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
exports.getBlogPosts = async (req, res, next) => {
  try {
    const posts = await BlogPost.find().populate('author', 'username');
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single blog post
// @route   GET /api/blog/:id
// @access  Public
exports.getBlogPost = async (req, res, next) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'username');
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new blog post
// @route   POST /api/blog
// @access  Private
exports.createBlogPost = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.author = req.user.id;

    const post = await BlogPost.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// @desc    Update blog post
// @route   PUT /api/blog/:id
// @access  Private/Owner
exports.updateBlogPost = async (req, res, next) => {
  try {
    let post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    // Make sure user is the author
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authorized to update this post' });
    }

    post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete blog post
// @route   DELETE /api/blog/:id
// @access  Private/Owner
exports.deleteBlogPost = async (req, res, next) => {
  try {
    let post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post not found' });
    }

    // Make sure user is the author
    if (post.author.toString() !== req.user.id) {
      return res.status(401).json({ success: false, error: 'User not authorized to delete this post' });
    }

    await post.deleteOne();
    // Also delete associated comments
    await Comment.deleteMany({ post: req.params.id });

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};
