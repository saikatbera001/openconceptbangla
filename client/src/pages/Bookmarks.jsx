import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowLeft, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import BlogCard from '../components/blog/BlogCard';

export default function Bookmarks() {
  const { bookmarks } = useAuth();
  const { posts } = useApp();

  const savedPosts = posts.filter(p => bookmarks.includes(p.id));

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link to="/blogs" className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 mb-2">
              <ArrowLeft className="w-3.5 h-3.5" /> সকল ব্লগে ফিরে যান
            </Link>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-bengali flex items-center gap-2">
              <Bookmark className="w-7 h-7 text-accent fill-accent" />
              <span>আমার সংরক্ষিত পোস্টসমূহ</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              পরবর্তীতে পড়ার জন্য সংরক্ষণ করে রাখা গুরুত্বপূর্ণ গাইড ও আর্টিকেল।
            </p>
          </div>

          <span className="text-xs font-bold bg-brand-50 text-brand-700 px-3 py-1.5 rounded-full">
            মোট {savedPosts.length}টি সংরক্ষিত
          </span>
        </div>

        {savedPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 mb-1">কোনো পোস্ট সংরক্ষণ করা হয়নি</h3>
            <p className="text-xs text-slate-500 mb-6">
              যেকোনো আর্টিকেলের উপরে থাকা বুকমার্ক আইকনে ক্লিক করে সহজেই এখানে সেভ করে রাখতে পারেন।
            </p>
            <Link
              to="/blogs"
              className="px-5 py-2.5 bg-brand-700 text-white font-bold text-xs rounded-xl shadow inline-block"
            >
              আর্টিকেলগুলো এক্সপ্লোর করুন
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
