import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
    index: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  content: {
    type: String,
    required: [true, 'Please provide comment text'],
  },
  status: {
    type: String,
    enum: ['approved', 'pending'],
    default: 'approved',
  },
}, {
  timestamps: true,
});

export default mongoose.model('Comment', commentSchema);
