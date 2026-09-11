import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, Clock, ArrowRight, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FeaturedPosts() {
  const { posts } = useApp();
  const featured = posts.filter(p => p.isFeatured);
  const heroPost = featured[0] || posts[0];
  const sidePosts = featured.slice(1, 3);

  if (!heroPost) return null;

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-600">
              <Flame className="w-5 h-5" />
            </span>
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">
                বাছাইকৃত বিশেষ কন্টেন্ট
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-bengali">
                ফিচার্ড গাইড ও প্রধান খবর
              </h2>
            </div>
          </div>

          <Link
            to="/blogs"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
          >
            <span>সবগুলো ব্লগ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Featured Layout: 1 Hero + 2 Stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Large Hero Post (7 cols) */}
          <div className="lg:col-span-7">
            <Link
              to={`/blog/${heroPost.slug}`}
              className="group relative block rounded-3xl overflow-hidden shadow-lg aspect-[16/10] bg-slate-900"
            >
              <img
                src={heroPost.featuredImage}
                alt={heroPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
              
              <div className="absolute top-4 left-4">
                <span className="bg-accent text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wide shadow-md flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> ফিচার্ড গাইড
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white">
                <div className="flex items-center gap-3 text-xs text-emerald-300 mb-2">
                  <span>{heroPost.categoryName}</span>
                  <span>•</span>
                  <span>{heroPost.publishedDate}</span>
                  <span>•</span>
                  <span>{heroPost.readingTime} পাঠ</span>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight group-hover:text-accent transition-colors font-bengali mb-3">
                  {heroPost.title}
                </h3>
                <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed">
                  {heroPost.excerpt}
                </p>
              </div>
            </Link>
          </div>

          {/* Side Stacked Posts (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {sidePosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group p-4 sm:p-5 bg-slate-50 hover:bg-emerald-50/50 rounded-2xl border border-slate-200 hover:border-emerald-400 transition-all flex flex-col sm:flex-row gap-4 items-center justify-between"
              >
                <div className="w-full sm:w-36 h-28 shrink-0 rounded-xl overflow-hidden bg-slate-200">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <span className="text-[11px] font-bold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full inline-block mb-1.5">
                    {post.categoryName}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 group-hover:text-brand-800 transition-colors line-clamp-2 leading-snug font-bengali mb-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.publishedDate}</span>
                  </div>
                </div>
              </Link>
            ))}

            {/* Quick Promo Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-darkgreen to-emerald-900 text-white flex items-center justify-between shadow-md">
              <div>
                <p className="text-xs text-accent font-bold">দরকারী অনলাইন সাহায্য</p>
                <h4 className="text-lg font-bold font-bengali">ফরম ফিলাপে ছবির সাইজ নিয়ে সমস্যা?</h4>
                <p className="text-xs text-emerald-200">অনলাইনে ১০০% ফ্রিতে ছবির সাইজ ও স্বাক্ষর রিসাইজ করুন</p>
              </div>
              <Link
                to="/tools"
                className="px-4 py-2 bg-accent hover:bg-accent-hover text-slate-900 font-bold rounded-xl text-xs shrink-0 shadow transition"
              >
                টুল খুলুন
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
