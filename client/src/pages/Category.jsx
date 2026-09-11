import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layers, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BlogCard from '../components/blog/BlogCard';

export default function Category() {
  const { slug } = useParams();
  const { posts, categories } = useApp();

  const currentCategory = categories.find(c => c.slug === slug) || {
    nameBn: "বিভাগ",
    description: "এই বিভাগের সকল পোস্ট ও গাইড",
    count: 0
  };

  const categoryPosts = posts.filter(p => p.category === slug);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Banner */}
        <div className="bg-gradient-to-r from-emerald-900 to-darkgreen text-white p-8 sm:p-12 rounded-3xl shadow-lg border border-emerald-800 mb-10 relative overflow-hidden">
          <div className="relative z-10">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-white mb-4"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> সকল বিভাগে ফিরে যান
            </Link>
            
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md">
                <Layers className="w-6 h-6 text-accent" />
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-bengali">
                {currentCategory.nameBn}
              </h1>
            </div>

            <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mt-2">
              {currentCategory.description}
            </p>

            <span className="inline-block mt-4 text-xs font-bold bg-white/15 px-3 py-1 rounded-full text-emerald-200">
              মোট {categoryPosts.length}টি নিবন্ধ প্রকাশিত
            </span>
          </div>
        </div>

        {/* Posts Grid */}
        {categoryPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-base font-bold text-slate-700 mb-2">এই বিভাগে এখনও কোনো পোস্ট যুক্ত করা হয়নি</p>
            <Link to="/blogs" className="px-4 py-2 bg-brand-700 text-white text-xs font-bold rounded-xl inline-block">
              অন্যান্য বিভাগগুলো দেখুন
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
