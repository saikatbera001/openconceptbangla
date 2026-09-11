import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search as SearchIcon, ArrowLeft, Frown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import BlogCard from '../components/blog/BlogCard';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);
  const { posts } = useApp();

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      setSearchParams({ q: searchTerm.trim() });
    }
  };

  const results = posts.filter((p) => {
    if (!queryParam.trim()) return false;
    const q = queryParam.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.categoryName?.toLowerCase().includes(q) ||
      p.tags?.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Input Hero Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-10">
          <div className="max-w-2xl mx-auto text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2 font-bengali">
              তথ্য ও আর্টিকেল অনুসন্ধান
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              যেকোনো সরকারি প্রকল্প, ফর্ম ফিলাপ নিয়ম বা চাকরির কি-ওয়ার্ড লিখুন
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="যেমন: ভোটার কার্ড, লক্ষ্মীর ভাণ্ডার, স্কলারশিপ..."
                className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
              />
              <SearchIcon className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-2xl shadow transition shrink-0"
            >
              খুঁজুন
            </button>
          </form>

          {queryParam && (
            <div className="text-center mt-4 text-xs font-semibold text-slate-500">
              "<span className="text-brand-700 font-bold">{queryParam}</span>" এর জন্য সর্বমোট {results.length}টি ফলাফল পাওয়া গেছে
            </div>
          )}
        </div>

        {/* Results Stream */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : queryParam ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <Frown className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">কোনো তথ্য বা পোস্ট পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500 mb-6">
              বানান সঠিক কিনা যাচাই করুন অথবা অন্য কোনো প্রাসঙ্গিক শব্দ দিয়ে সন্ধান করুন।
            </p>
            <Link
              to="/blogs"
              className="px-5 py-2.5 bg-brand-700 text-white font-bold text-xs rounded-xl shadow inline-block"
            >
              সকল পোস্ট দেখুন
            </Link>
          </div>
        ) : (
          <div className="text-center text-xs text-slate-400 py-12">
            অনুসন্ধান করার জন্য উপরের বক্সে কিছু লিখে "খুঁজুন" বাটনে চাপ দিন।
          </div>
        )}

      </div>
    </div>
  );
}
