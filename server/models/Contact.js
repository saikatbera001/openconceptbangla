import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
  },
  subject: {
    type: String,
    default: 'General Inquiry',
  },
  message: {
    type: String,
    required: [true, 'Please provide your message'],
  },
  status: {
    type: String,
    enum: ['unread', 'read', 'replied'],
    default: 'unread',
  }
}, {
  timestamps: true,
});

export default mongoose.model('Contact', contactSchema);
