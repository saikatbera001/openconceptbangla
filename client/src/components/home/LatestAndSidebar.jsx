import React from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, TrendingUp, Tags, Layers, ArrowRight, Eye, Send } from 'lucide-react';
import BlogCard from '../blog/BlogCard';
import { useApp } from '../../context/AppContext';

export default function LatestAndSidebar() {
  const { posts, categories } = useApp();

  const popularPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5);
  const latestPosts = posts.slice(0, 6);

  const tags = ["লক্ষ্মীর ভাণ্ডার", "ভোটার কার্ড", "কৃষক বন্ধু", "SVMCM", "ই-প্যান", "WBP পুলিশ", "ডিজিটাল রেশন", "আধার আপডেট"];

  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Area: Latest Posts (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-100 text-brand-700">
                  <Newspaper className="w-5 h-5" />
                </span>
                <h2 className="text-2xl font-extrabold text-slate-900 font-bengali">
                  সাম্প্রতিক প্রকাশিত পোস্ট ও গাইড
                </h2>
              </div>

              <Link
                to="/blogs"
                className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1"
              >
                <span>সকল পোস্ট ({posts.length})</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Grid of posts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {/* View More Button */}
            <div className="mt-8 text-center">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-slate-300 hover:border-brand-600 text-slate-800 hover:text-brand-700 font-bold rounded-xl shadow-sm hover:shadow-md transition"
              >
                <span>আরও পোস্ট দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Sidebar Area (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Popular Posts Widget */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <TrendingUp className="w-5 h-5 text-accent" />
                <h3 className="text-lg font-bold text-slate-900 font-bengali">
                  সর্বাধিক পঠিত আর্টিকেল
                </h3>
              </div>

              <div className="space-y-4">
                {popularPosts.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="flex items-start gap-3 group"
                  >
                    <span className="w-7 h-7 rounded-lg bg-emerald-50 text-brand-700 group-hover:bg-brand-600 group-hover:text-white font-extrabold text-sm flex items-center justify-center shrink-0 transition-colors">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-brand-700 line-clamp-2 leading-snug font-bengali transition-colors">
                        {post.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <Eye className="w-3 h-3" />
                        <span>{post.views.toLocaleString('bn-BD')} বার দেখা হয়েছে</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories Widget */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Layers className="w-5 h-5 text-brand-600" />
                <h3 className="text-lg font-bold text-slate-900 font-bengali">
                  সকল ক্যাটাগরি
                </h3>
              </div>

              <div className="space-y-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-emerald-50 text-slate-700 hover:text-brand-800 text-sm transition"
                  >
                    <span className="font-semibold">{cat.nameBn}</span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                      {cat.count}টি গাইড
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags Cloud */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
                <Tags className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-slate-900 font-bengali">
                  জনপ্রিয় ট্যাগসমূহ
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <Link
                    key={idx}
                    to={`/search?q=${encodeURIComponent(tag)}`}
                    className="text-xs font-medium bg-slate-100 hover:bg-brand-50 text-slate-700 hover:text-brand-700 px-3 py-1.5 rounded-lg border border-slate-200 transition"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Social / Channel Widget */}
            <div className="bg-gradient-to-br from-emerald-900 to-darkgreen-dark text-white rounded-2xl p-6 shadow-md border border-emerald-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-accent">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base">আমাদের টেলিগ্রাম গ্রুপে যোগ দিন</h4>
                  <p className="text-xs text-emerald-200">সবার আগে নোটিশ ও পিডিএফ লিংক পেতে</p>
                </div>
              </div>
              <a
                href="https://telegram.org"
                target="_blank"
                rel="noreferrer"
                className="w-full mt-2 py-2.5 bg-accent hover:bg-accent-hover text-slate-950 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow transition"
              >
                <span>টেলিগ্রামে যুক্ত হন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </aside>

        </div>

      </div>
    </section>
  );
}
