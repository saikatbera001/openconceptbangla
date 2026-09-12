import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    lowercase: true,
    trim: true,
  },
  otp: {
    type: String,
    required: [true, 'Please provide an OTP'],
  },
  purpose: {
    type: String,
    enum: ['forgot_password', 'email_verification', 'login'],
    default: 'forgot_password',
  },
  attempts: {
    type: Number,
    default: 0,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true,
});

// TTL index to automatically purge expired OTP documents
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Hash OTP before saving
otpSchema.pre('save', async function (next) {
  if (!this.isModified('otp')) return next();
  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(this.otp, salt);
  next();
});

// Compare entered OTP with hashed OTP
otpSchema.methods.matchOtp = async function (enteredOtp) {
  return await bcrypt.compare(String(enteredOtp).trim(), this.otp);
};

export default mongoose.model('Otp', otpSchema);
