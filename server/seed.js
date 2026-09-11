import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Category from './models/Category.js';
import Post from './models/Post.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/open_concept_bangla');
    console.log('MongoDB connected for seeding...');

    // Clear existing
    await User.deleteMany();
    await Category.deleteMany();
    await Post.deleteMany();

    // Create Admin User
    const admin = await User.create({
      name: 'অ্যাডমিন ম্যানেজার',
      email: 'admin@openconceptbangla.com',
      password: 'adminPassword123',
      role: 'admin',
    });

    console.log(`Created admin: ${admin.email}`);

    // Create Categories
    const categories = await Category.insertMany([
      { name: 'Government Schemes', nameBn: 'সরকারি প্রকল্প', slug: 'govt-schemes', description: 'পশ্চিমবঙ্গ ও কেন্দ্রীয় সরকারের সকল জনকল্যাণমূলক প্রকল্প।' },
      { name: 'Online Services', nameBn: 'অনলাইন সেবা', slug: 'online-services', description: 'আধার, ভোটার, প্যান ও অন্যান্য নাগরিক সেবা।' },
      { name: 'Job Updates', nameBn: 'চাকরির খবর', slug: 'jobs', description: 'নতুন নিয়োগ বিজ্ঞপ্তি, অ্যাডমিট কার্ড ও রেজাল্ট।' },
      { name: 'Education & Scholarships', nameBn: 'শিক্ষা ও স্কলারশিপ', slug: 'education', description: 'স্বামী বিবেকানন্দ, ঐক্যশ্রী ও নবান্ন স্কলারশিপ।' },
    ]);

    console.log(`Created ${categories.length} categories.`);

    // Create Sample Post
    await Post.create({
      title: 'লক্ষ্মীর ভাণ্ডার প্রকল্প ২০২৪: মাসিক ভাতা বৃদ্ধি ও নতুন স্ট্যাটাস চেকের সহজ উপায়',
      slug: 'lakshmir-bhandar-scheme-update-2024',
      excerpt: 'পশ্চিমবঙ্গ সরকারের অন্যতম জনপ্রিয় প্রকল্প লক্ষ্মীর ভাণ্ডার। কীভাবে আপনার আবেদন স্ট্যাটাস চেক করবেন...',
      content: '### লক্ষ্মীর ভাণ্ডার প্রকল্প নির্দেশিকা\nরাজ্যের মহিলাদের আর্থিক সহায়তার জন্য এই প্রকল্প। সাধারণ মহিলারা মাসে ₹১,০০০ এবং তপশিলি মহিলারা ₹১,২০০ টাকা পান।',
      category: categories[0]._id,
      categoryName: categories[0].nameBn,
      author: admin._id,
      tags: ['লক্ষ্মীর ভাণ্ডার', 'প্রকল্প'],
      views: 1420,
      likes: 85,
      isFeatured: true,
      status: 'published'
    });

    console.log('Sample posts created successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
