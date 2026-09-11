import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen } from 'lucide-react';
import BlogCard from '../components/blog/BlogCard';
import Pagination from '../components/common/Pagination';
import { useApp } from '../context/AppContext';

export default function Blogs() {
  const { posts, categories } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const selectedCategory = searchParams.get('category') || 'all';
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter & sort logic
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat = selectedCategory === 'all' || post.category === selectedCategory;
      const matchSearch = searchTerm.trim() === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.views - a.views;
      return b.id.localeCompare(a.id); // Latest first
    });
  }, [posts, selectedCategory, searchTerm, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleCategorySelect = (slug) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
    setCurrentPage(1);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-brand-700 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>সকল নিবন্ধ ও তথ্য নির্দেশিকা</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-bengali">
            সকল তথ্য, প্রকল্প ও চাকরির খবর
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            সরকারি সহায়তা, ফর্ম পূরণের সহজ নিয়ম ও আধুনিক ডিজিটাল সেবার সর্বমোট {posts.length}টি বিস্তারিত গাইড।
          </p>
        </div>

        {/* Filters & Search Control Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="ব্লগ খুঁজুন..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end text-xs font-semibold text-slate-600">
              <Filter className="w-4 h-4 text-slate-400" />
              <span>বাছাই করুন:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-600"
              >
                <option value="latest">সর্বশেষ প্রকাশিত</option>
                <option value="popular">সর্বাধিক পঠিত (জনপ্রিয়)</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-3.5 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
                selectedCategory === 'all'
                  ? 'bg-brand-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              সকল ক্যাটাগরি
            </button>
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => handleCategorySelect(cat.slug)}
                className={`px-3.5 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat.slug
                    ? 'bg-brand-700 text-white shadow-sm font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.nameBn}
              </button>
            ))}
          </div>

        </div>

        {/* Blog Cards Grid */}
        {currentPosts.length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-base font-bold text-slate-700 mb-1">কোনো পোস্ট পাওয়া যায়নি</p>
            <p className="text-xs text-slate-500 mb-4">অন্য কোনো কি-ওয়ার্ড দিয়ে আবার চেষ্টা করুন।</p>
            <button
              onClick={() => {
                setSearchTerm('');
                handleCategorySelect('all');
              }}
              className="px-4 py-2 bg-brand-700 text-white text-xs font-bold rounded-xl"
            >
              সকল ফিল্টার রিসেট করুন
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
