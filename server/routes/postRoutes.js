import express from 'express';
import { getPosts, getPostBySlug, createPost, updatePost, deletePost } from '../controllers/postController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, adminOnly, createPost);

router.route('/:slug')
  .get(getPostBySlug);

router.route('/admin/:id')
  .put(protect, adminOnly, updatePost)
  .delete(protect, adminOnly, deletePost);

export default router;
