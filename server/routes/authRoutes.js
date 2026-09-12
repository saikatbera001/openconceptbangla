import express from 'express';
import {
  registerUser,
  loginUser,
  getMe,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  registerWithOtp,
  loginWithOtp,
  updateProfile,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Basic authentication
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

// OTP & Password Management
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/register-with-otp', registerWithOtp);
router.post('/login-otp', loginWithOtp);

export default router;
