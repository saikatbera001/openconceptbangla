import Post from '../models/Post.js';
import Category from '../models/Category.js';
import slugify from 'slugify';

// @desc    Get all posts with search, category, and pagination
// @route   GET /api/posts
export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;
    const skip = (page - 1) * limit;

    const query = { status: 'published' };

    // Search query
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { excerpt: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }

    // Category filter
    if (req.query.category && req.query.category !== 'all') {
      const cat = await Category.findOne({ slug: req.query.category });
      if (cat) {
        query.category = cat._id;
      }
    }

    // Sort order
    let sort = { createdAt: -1 };
    if (req.query.sort === 'popular') {
      sort = { views: -1 };
    }

    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate('category', 'name nameBn slug')
      .populate('author', 'name avatar')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single post by slug
// @route   GET /api/posts/:slug
export const getPostBySlug = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    )
      .populate('category', 'name nameBn slug')
      .populate('author', 'name role avatar');

    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }

    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new post (Admin)
// @route   POST /api/posts
export const createPost = async (req, res) => {
  try {
    const { title, excerpt, content, category, featuredImage, tags, status, isFeatured } = req.body;

    const baseSlug = slugify(title, { lower: true, strict: true }) || 'post-' + Date.now();
    const slug = `${baseSlug}-${Date.now().toString().slice(-4)}`;

    const post = await Post.create({
      title,
      slug,
      excerpt,
      content,
      category,
      featuredImage,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      status: status || 'published',
      isFeatured: isFeatured || false,
      author: req.user._id,
    });

    // Increment category postCount
    if (category) {
      await Category.findByIdAndUpdate(category, { $inc: { postCount: 1 } });
    }

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update post (Admin)
// @route   PUT /api/posts/:id
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    res.json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete post (Admin)
// @route   DELETE /api/posts/:id
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    if (post.category) {
      await Category.findByIdAndUpdate(post.category, { $inc: { postCount: -1 } });
    }
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
