const express = require('express');
const {
  getBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} = require('../controllers/blogPostsController');
const { getComments, createComment } = require('../controllers/commentsController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/')
  .get(getBlogPosts)
  .post(protect, createBlogPost);

router.route('/:id')
  .get(getBlogPost)
  .put(protect, updateBlogPost)
  .delete(protect, deleteBlogPost);

// Comments routes
router.route('/:postId/comments')
  .get(getComments)
  .post(protect, createComment);

module.exports = router;
