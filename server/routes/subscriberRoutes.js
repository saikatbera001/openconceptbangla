import express from 'express';
import { subscribeEmail, getSubscribers } from '../controllers/subscriberController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(subscribeEmail)
  .get(protect, adminOnly, getSubscribers);

export default router;
