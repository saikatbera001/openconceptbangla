import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  Bell, 
  Bookmark, 
  User, 
  LogOut, 
  ShieldAlert, 
  Wrench, 
  ChevronDown,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const { user, isAdmin, logout, bookmarks } = useAuth();
  const { categories, notice } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(localSearch.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 shadow-md">
      {/* Top Notification / Social Bar */}
      <div className="bg-darkgreen-dark text-slate-200 text-xs py-1.5 px-4 border-b border-emerald-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Breaking News Marquee */}
          <div className="flex items-center gap-2 overflow-hidden flex-1 max-w-2xl">
            <span className="bg-accent text-slate-900 font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1 shrink-0">
              <Bell className="w-3 h-3 animate-pulse" /> জরুরি আপডেট:
            </span>
            <span className="truncate text-slate-200 font-normal">
              {notice}
            </span>
          </div>

          {/* Social Links & Quick Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-red-400 transition-colors flex items-center gap-1"
              title="YouTube চ্যানেল"
            >
              <svg className="w-3.5 h-3.5 text-red-500 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              <span className="hidden sm:inline">YouTube</span>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
              title="Facebook পেজ"
            >
              <svg className="w-3.5 h-3.5 text-blue-400 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <span className="hidden sm:inline">Facebook</span>
            </a>
            <Link 
              to="/tools" 
              className="bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 px-2 py-0.5 rounded text-[11px] font-semibold transition"
            >
              ⚡ অনলাইন টুলস
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar Header */}
      <nav className="gradient-darkgreen text-white border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* Brand Logo & Title */}
            <Link to="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
                <img src="/logo.svg" alt="Open Concept Bangla" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-brand-200 transition-colors font-sans">
                  Open Concept <span className="text-accent">Bangla</span>
                </span>
                <span className="text-[11px] text-emerald-200/80 font-bengali -mt-0.5">
                  ডিজিটাল তথ্য ও অনলাইন সমাধান
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 font-medium text-sm">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive('/') ? 'bg-emerald-800/90 text-white font-semibold' : 'text-emerald-100 hover:bg-emerald-800/50'
                }`}
              >
                হোম
              </Link>
              <Link 
                to="/blogs" 
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive('/blogs') ? 'bg-emerald-800/90 text-white font-semibold' : 'text-emerald-100 hover:bg-emerald-800/50'
                }`}
              >
                সকল পোস্ট
              </Link>

              {/* Categories Dropdown */}
              <div className="relative" onMouseLeave={() => setCategoryDropdown(false)}>
                <button
                  onClick={() => setCategoryDropdown(!categoryDropdown)}
                  onMouseEnter={() => setCategoryDropdown(true)}
                  className="px-3 py-2 rounded-lg text-emerald-100 hover:bg-emerald-800/50 flex items-center gap-1 transition-colors"
                >
                  বিভাগসমূহ <ChevronDown className="w-3.5 h-3.5 text-emerald-300" />
                </button>
                {categoryDropdown && (
                  <div className="absolute left-0 mt-1 w-64 bg-white text-slate-800 rounded-xl shadow-2xl py-2 z-50 border border-slate-100 animate-fadeIn">
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      জনপ্রিয় ক্যাটাগরি
                    </div>
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        onClick={() => setCategoryDropdown(false)}
                        className="flex items-center justify-between px-3 py-2 text-sm hover:bg-emerald-50 hover:text-brand-700 transition"
                      >
                        <span className="font-medium">{cat.nameBn}</span>
                        <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
                          {cat.count}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                to="/tools" 
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isActive('/tools') ? 'bg-emerald-800/90 text-white font-semibold' : 'text-emerald-100 hover:bg-emerald-800/50'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-accent" />
                দরকারী টুলস
              </Link>
              <Link 
                to="/about" 
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive('/about') ? 'bg-emerald-800/90 text-white font-semibold' : 'text-emerald-100 hover:bg-emerald-800/50'
                }`}
              >
                পরিচিতি
              </Link>
              <Link 
                to="/contact" 
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive('/contact') ? 'bg-emerald-800/90 text-white font-semibold' : 'text-emerald-100 hover:bg-emerald-800/50'
                }`}
              >
                যোগাযোগ
              </Link>
            </div>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex items-center flex-1 max-w-xs">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  placeholder="খুঁজুন (যেমন: ভোটার, আধার, প্রকল্প)..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-sm bg-emerald-950/60 border border-emerald-700/60 rounded-full text-white placeholder-emerald-300/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition"
                />
                <Search className="w-4 h-4 text-emerald-300 absolute left-3 top-2.5" />
              </form>
            </div>

            {/* Right Action: Auth / Bookmarks / Admin */}
            <div className="flex items-center gap-3">
              {/* Bookmark quick icon */}
              <Link
                to="/bookmarks"
                className="relative p-2 text-emerald-200 hover:text-white hover:bg-emerald-800/50 rounded-full transition"
                title="সংরক্ষিত পোস্টসমূহ"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarks.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-accent text-slate-900 font-bold text-[10px] rounded-full flex items-center justify-center">
                    {bookmarks.length}
                  </span>
                )}
              </Link>

              {/* User Dropdown / Login */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    className="flex items-center gap-2 p-1 pl-2 pr-3 bg-emerald-950/60 hover:bg-emerald-900 rounded-full border border-emerald-700/70 transition"
                  >
                    <img 
                      src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"} 
                      alt={user.name} 
                      className="w-7 h-7 rounded-full object-cover border border-emerald-400"
                    />
                    <span className="text-xs font-semibold text-emerald-100 hidden sm:inline max-w-[90px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-emerald-300" />
                  </button>

                  {userDropdown && (
                    <div 
                      className="absolute right-0 mt-2 w-52 bg-white text-slate-800 rounded-xl shadow-2xl py-2 z-50 border border-slate-100 animate-fadeIn"
                      onMouseLeave={() => setUserDropdown(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full uppercase">
                          {user.role}
                        </span>
                      </div>

                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setUserDropdown(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-emerald-700 hover:bg-emerald-50 font-semibold"
                        >
                          <ShieldAlert className="w-4 h-4 text-emerald-600" /> অ্যাডমিন ড্যাশবোর্ড
                        </Link>
                      )}

                      <Link
                        to="/bookmarks"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                      >
                        <Bookmark className="w-4 h-4 text-slate-500" /> সংরক্ষিত পোস্ট ({bookmarks.length})
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdown(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left border-t border-slate-100 mt-1"
                      >
                        <LogOut className="w-4 h-4" /> লগআউট
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-xs font-semibold px-3 py-1.5 text-emerald-100 hover:text-white rounded-lg transition"
                  >
                    লগইন
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs font-bold px-3.5 py-1.5 bg-accent hover:bg-accent-hover text-slate-900 rounded-lg shadow-sm transition"
                  >
                    রেজিস্টার
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-darkgreen-dark border-t border-emerald-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="খুঁজুন..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-emerald-950 border border-emerald-700 rounded-lg text-white"
              />
              <Search className="w-4 h-4 text-emerald-300 absolute left-3 top-3" />
            </form>

            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-emerald-900/40 text-white"
              >
                হোম পেজ
              </Link>
              <Link 
                to="/blogs" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-emerald-900/40 text-white"
              >
                সকল ব্লগ
              </Link>
              <Link 
                to="/tools" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-emerald-900/40 text-accent font-semibold"
              >
                ⚡ দরকারি টুলস
              </Link>
              <Link 
                to="/bookmarks" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-emerald-900/40 text-white"
              >
                বুকমার্কস ({bookmarks.length})
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-emerald-900/40 text-white"
              >
                পরিচিতি
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-emerald-900/40 text-white"
              >
                যোগাযোগ
              </Link>
            </div>

            {isAdmin && (
              <Link 
                to="/admin/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-lg bg-emerald-600 text-white text-center font-bold"
              >
                🛡️ অ্যাডমিন ড্যাশবোর্ড
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
