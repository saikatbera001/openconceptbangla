import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide category name in English'],
    unique: true,
    trim: true,
  },
  nameBn: {
    type: String,
    required: [true, 'Please provide category name in Bengali'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: 'Folder',
  },
  postCount: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

export default mongoose.model('Category', categorySchema);
