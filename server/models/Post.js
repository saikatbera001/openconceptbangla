import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
  },
  content: {
    type: String,
    required: [true, 'Please provide post content'],
  },
  featuredImage: {
    type: String,
    default: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
    index: true,
  },
  categoryName: {
    type: String,
    default: 'সাধারণ',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tags: [{
    type: String,
    index: true,
  }],
  views: {
    type: Number,
    default: 0,
  },
  likes: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'published',
    index: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  seoTitle: {
    type: String,
    default: '',
  },
  seoDescription: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Full-text index for Bengali/English search optimization
postSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text' });

export default mongoose.model('Post', postSchema);
