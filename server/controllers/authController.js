import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Otp from '../models/Otp.js';
import { sendEmail } from '../utils/sendEmail.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'super_secret_open_concept_bangla_key_2026_jwt', {
    expiresIn: '30d',
  });
};

const generateSixDigitOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @desc    Register new user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'নাম, ইমেইল এবং পাসওয়ার্ড প্রদান করুন।' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      return res.status(400).json({ success: false, message: 'এই ইমেইল দিয়ে ইতিমধ্যে অ্যাকাউন্ট তৈরি আছে। লগইন করুন।' });
    }

    user = await User.create({ name, email: normalizedEmail, password });
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user with password
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'ইমেইল এবং পাসওয়ার্ড প্রদান করুন।' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে।' });
    }

    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Send OTP to Email (supports both registered & new unregistered emails seamlessly)
// @route   POST /api/auth/send-otp
export const sendOtp = async (req, res) => {
  try {
    const { email, purpose = 'email_verification' } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'অনুগ্রহ করে একটি বৈধ ইমেইল প্রদান করুন।' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      return res.status(400).json({ success: false, message: 'ইমেইল ঠিকানার ফরম্যাট সঠিক নয়।' });
    }

    // Check if user exists in database
    const existingUser = await User.findOne({ email: normalizedEmail });

    // Generate 6-digit OTP
    const rawOtp = generateSixDigitOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete existing OTPs for same email and purpose
    await Otp.deleteMany({ email: normalizedEmail, purpose });

    // Save new OTP
    await Otp.create({
      email: normalizedEmail,
      otp: rawOtp,
      purpose,
      expiresAt,
    });

    // Subject and template texts
    let subject = 'আপনার ওটিপি ভেরিফিকেশন কোড - Open Concept Bangla';
    let message = 'অ্যাকাউন্ট ভেরিফিকেশনের জন্য নিচের ৬-ডিজিটের ওটিপি কোডটি ব্যবহার করুন:';

    if (purpose === 'forgot_password') {
      subject = 'পাসওয়ার্ড রিসেট ওটিপি - Open Concept Bangla';
      message = existingUser
        ? 'আপনার অ্যাকাউন্টের পাসওয়ার্ড রিসেট করতে নিচের ৬-ডিজিটের ওটিপি কোডটি ব্যবহার করুন:'
        : 'আপনার অ্যাকাউন্টের পাসওয়ার্ড নির্ধারণ করতে নিচের ৬-ডিজিটের ওটিপি কোডটি ব্যবহার করুন:';
    } else if (purpose === 'login') {
      subject = 'লগইন ওটিপি কোড - Open Concept Bangla';
      message = 'পাসওয়ার্ড ছাড়া দ্রুত লগইন করতে নিচের এককালীন ওটিপি কোডটি ব্যবহার করুন:';
    }

    const emailResult = await sendEmail({
      to: normalizedEmail,
      subject,
      otp: rawOtp,
      message,
    });

    let clientMsg = 'আপনার ইমেইলে ৬-ডিজিটের ওটিপি পাঠানো হয়েছে।';
    if (!existingUser && purpose === 'forgot_password') {
      clientMsg = 'ওটিপি পাঠানো হয়েছে। কোড দিয়ে নতুন পাসওয়ার্ড সেট করলে আপনার অ্যাকাউন্টটি সক্রিয় হবে।';
    }

    res.json({
      success: true,
      message: clientMsg,
      devMode: emailResult.devMode || false,
      previewOtp: emailResult.previewOtp || rawOtp,
      isNewUser: !existingUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp, purpose = 'email_verification' } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'ইমেইল ও ওটিপি উভয়ই প্রয়োজন।' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const otpDocs = await Otp.find({ email: normalizedEmail, purpose }).sort({ createdAt: -1 });

    if (!otpDocs || otpDocs.length === 0) {
      return res.status(400).json({ success: false, message: 'ওটিপির মেয়াদ শেষ হয়ে গেছে। পুনরায় ওটিপি চেয়ে নিন।' });
    }

    const latestOtp = otpDocs[0];
    const isMatch = await latestOtp.matchOtp(otp);

    if (!isMatch) {
      latestOtp.attempts += 1;
      if (latestOtp.attempts >= 5) {
        await Otp.deleteMany({ email: normalizedEmail, purpose });
        return res.status(400).json({ success: false, message: 'সর্বোচ্চ চেষ্টা সীমা অতিক্রম করেছে। পুনরায় ওটিপি চেয়ে নিন।' });
      }
      await latestOtp.save();
      return res.status(400).json({ success: false, message: 'ভুল ওটিপি কোড দেওয়া হয়েছে।' });
    }

    res.json({
      success: true,
      message: 'ওটিপি সফলভাবে যাচাই করা হয়েছে।',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Initiate Forgot Password (sends OTP for any email)
// @route   POST /api/auth/forgot-password
export const forgotPassword = async (req, res) => {
  req.body.purpose = 'forgot_password';
  return sendOtp(req, res);
};

// @desc    Reset Password with verified OTP (supports both existing & new accounts)
// @route   POST /api/auth/reset-password
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'ইমেইল, ওটিপি এবং নতুন পাসওয়ার্ড প্রদান করুন।' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const otpDocs = await Otp.find({ email: normalizedEmail, purpose: 'forgot_password' }).sort({ createdAt: -1 });

    if (!otpDocs || otpDocs.length === 0) {
      return res.status(400).json({ success: false, message: 'ওটিপির মেয়াদ শেষ হয়ে গেছে। অনুগ্রহ করে আবার চেষ্টা করুন।' });
    }

    const latestOtp = otpDocs[0];
    const isMatch = await latestOtp.matchOtp(otp);

    if (!isMatch) {
      latestOtp.attempts += 1;
      if (latestOtp.attempts >= 5) {
        await Otp.deleteMany({ email: normalizedEmail, purpose: 'forgot_password' });
        return res.status(400).json({ success: false, message: 'সর্বোচ্চ চেষ্টা সীমা শেষ। নতুন ওটিপি অনুরোধ করুন।' });
      }
      await latestOtp.save();
      return res.status(400).json({ success: false, message: 'ভুল ওটিপি কোড প্রদান করা হয়েছে।' });
    }

    // Check if user exists; if not, seamlessly create the user!
    let user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      const derivedName = normalizedEmail.split('@')[0].replace(/[._-]/g, ' ');
      user = await User.create({
        name: derivedName,
        email: normalizedEmail,
        password: newPassword,
        isEmailVerified: true,
      });
    } else {
      user.password = newPassword;
      user.isEmailVerified = true;
      await user.save();
    }

    // Invalidate OTPs
    await Otp.deleteMany({ email: normalizedEmail, purpose: 'forgot_password' });

    res.json({
      success: true,
      message: 'পাসওয়ার্ড সফলভাবে নির্ধারণ করা হয়েছে। নতুন পাসওয়ার্ড দিয়ে লগইন করুন।',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Register with email OTP verification (or activate existing)
// @route   POST /api/auth/register-with-otp
export const registerWithOtp = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;
    if (!name || !email || !password || !otp) {
      return res.status(400).json({ success: false, message: 'সকল তথ্য এবং ওটিপি প্রদান করুন।' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const otpDocs = await Otp.find({ email: normalizedEmail, purpose: 'email_verification' }).sort({ createdAt: -1 });

    if (!otpDocs || otpDocs.length === 0) {
      return res.status(400).json({ success: false, message: 'ওটিপির মেয়াদ উত্তীর্ণ হয়েছে। পুনরায় ওটিপি গ্রহণ করুন।' });
    }

    const latestOtp = otpDocs[0];
    const isMatch = await latestOtp.matchOtp(otp);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'ভুল ওটিপি কোড দেওয়া হয়েছে।' });
    }

    let user = await User.findOne({ email: normalizedEmail });
    if (user) {
      user.name = name || user.name;
      user.password = password;
      user.isEmailVerified = true;
      await user.save();
    } else {
      user = await User.create({
        name,
        email: normalizedEmail,
        password,
        isEmailVerified: true,
      });
    }

    await Otp.deleteMany({ email: normalizedEmail, purpose: 'email_verification' });

    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
      },
      message: 'ইমেইল সফলভাবে ভেরিফাই হয়েছে ও অ্যাকাউন্ট সক্রিয় হয়েছে!',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Passwordless Login with OTP (creates account if new)
// @route   POST /api/auth/login-otp
export const loginWithOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'ইমেইল ও ওটিপি উভয়ই প্রয়োজন।' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const otpDocs = await Otp.find({ email: normalizedEmail, purpose: 'login' }).sort({ createdAt: -1 });

    if (!otpDocs || otpDocs.length === 0) {
      return res.status(400).json({ success: false, message: 'ওটিপির মেয়াদ উত্তীর্ণ হয়েছে। পুনরায় কোড চেয়ে নিন।' });
    }

    const latestOtp = otpDocs[0];
    const isMatch = await latestOtp.matchOtp(otp);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'ভুল ওটিপি কোড দেওয়া হয়েছে।' });
    }

    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      const derivedName = normalizedEmail.split('@')[0].replace(/[._-]/g, ' ');
      user = await User.create({
        name: derivedName,
        email: normalizedEmail,
        password: Math.random().toString(36).slice(-8) + 'A1!',
        isEmailVerified: true,
      });
    }

    await Otp.deleteMany({ email: normalizedEmail, purpose: 'login' });

    const token = generateToken(user._id);
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedPosts', 'title slug featuredImage categoryName');
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user profile & role
// @route   PUT /api/auth/profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'ব্যবহারকারী পাওয়া যায়নি।' });
    }

    if (req.body.name) user.name = req.body.name.trim();
    if (req.body.avatar) user.avatar = req.body.avatar.trim();
    if (req.body.role && ['user', 'admin'].includes(req.body.role)) {
      user.role = req.body.role;
    }

    if (req.body.password) {
      if (req.body.password.length < 6) {
        return res.status(400).json({ success: false, message: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' });
      }
      user.password = req.body.password;
    }

    const updated = await user.save();
    res.json({
      success: true,
      user: {
        id: updated._id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        avatar: updated.avatar,
        isEmailVerified: updated.isEmailVerified,
      },
      message: 'প্রোফাইল তথ্য সফলভাবে আপডেট হয়েছে।',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

