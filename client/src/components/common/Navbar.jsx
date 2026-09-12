import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  Bell, 
  Bookmark, 
  LogOut, 
  ShieldAlert, 
  Wrench, 
  ChevronDown,
  User,
  Settings as SettingsIcon,
  Sliders,
  Sparkles,
  Edit3,
  Check,
  Landmark
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false);
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [localSearch, setLocalSearch] = useState('');

  const { user, isAdmin, logout, bookmarks, toggleAdminRole } = useAuth();
  const { categories, notice, noticeActive, updateUrgentNotice } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Urgent Notice Inline Quick Edit State
  const [editingNotice, setEditingNotice] = useState(false);
  const [editNoticeText, setEditNoticeText] = useState('');
  const [editNoticeActive, setEditNoticeActive] = useState(true);
  const [noticeSavedAlert, setNoticeSavedAlert] = useState(false);

  const handleSaveQuickNotice = (e) => {
    e?.preventDefault();
    updateUrgentNotice(editNoticeText, editNoticeActive);
    setNoticeSavedAlert(true);
    setTimeout(() => {
      setNoticeSavedAlert(false);
      setEditingNotice(false);
    }, 800);
  };

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
      <div className="bg-darkgreen-dark text-slate-200 text-xs py-1.5 px-3 sm:px-4 border-b border-emerald-900/50 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Breaking News Marquee */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden flex-1 min-w-0">
            {noticeActive ? (
              <>
                <span className="bg-accent text-slate-900 font-bold px-1.5 sm:px-2 py-0.5 rounded text-[10px] sm:text-[11px] flex items-center gap-1 shrink-0">
                  <Bell className="w-3 h-3 animate-pulse" /> <span className="hidden xs:inline">জরুরি আপডেট:</span><span className="xs:hidden">জরুরি:</span>
                </span>
                <span className="truncate text-slate-200 font-normal text-[11px] sm:text-xs">
                  {notice}
                </span>
              </>
            ) : (
              isAdmin && (
                <span className="text-[11px] text-amber-300/80 italic font-mono flex items-center gap-1">
                  [অ্যালার্ট ব্যানার বন্ধ আছে]
                </span>
              )
            )}

            {/* Admin Quick Edit Button */}
            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  setEditNoticeText(notice);
                  setEditNoticeActive(noticeActive);
                  setEditingNotice(!editingNotice);
                }}
                className="ml-2 text-[10px] font-bold bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 hover:text-white px-2 py-0.5 rounded-md border border-emerald-600/70 transition shrink-0 cursor-pointer flex items-center gap-1 shadow-sm"
                title="জরুরি অ্যালার্ট নোটিশ পরিবর্তন করুন"
              >
                <Edit3 className="w-2.5 h-2.5 text-accent" />
                <span>{editingNotice ? 'বন্ধ করুন' : 'নোটিশ এডিট'}</span>
              </button>
            )}
          </div>

          {/* Social Links & Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0 text-[11px]">
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
              className="bg-emerald-800/80 hover:bg-emerald-700 text-emerald-200 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold transition whitespace-nowrap"
            >
              ⚡ <span className="hidden xs:inline">অনলাইন</span> টুলস
            </Link>
          </div>
        </div>

        {/* Urgent Notice Quick Edit Expandable Drawer (Admin Only) */}
        {editingNotice && isAdmin && (
          <div className="bg-[#031d10] border-t border-emerald-700/80 px-3 sm:px-6 py-3 shadow-2xl animate-fadeIn text-slate-100">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 bg-amber-400 text-slate-950 rounded font-bold text-[11px] flex items-center gap-1">
                    <Bell className="w-3 h-3 animate-pulse" />
                    জরুরি নোটিশ দ্রুত এডিটর
                  </span>
                  <span className="text-[11px] text-emerald-200/80">
                    এখানে যে টেক্সট লিখবেন তা সমস্ত ব্যবহারকারীর জন্য সাইটের হেডারে সরাসরি প্রদর্শিত হবে
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-emerald-100 font-semibold select-none">
                    <input
                      type="checkbox"
                      checked={editNoticeActive}
                      onChange={(e) => setEditNoticeActive(e.target.checked)}
                      className="rounded border-emerald-600 text-brand-600 focus:ring-brand-500 w-3.5 h-3.5"
                    />
                    <span>{editNoticeActive ? 'ব্যানার সক্রিয় (চালু)' : 'ব্যানার নিষ্ক্রিয় (বন্ধ)'}</span>
                  </label>
                  <Link
                    to="/settings?tab=admin"
                    onClick={() => setEditingNotice(false)}
                    className="text-[10px] text-emerald-300 hover:text-white underline font-semibold"
                  >
                    বিস্তারিত সাইট সেটিংস →
                  </Link>
                </div>
              </div>

              {/* Quick Preset Chips */}
              <div className="flex flex-wrap items-center gap-1.5 mb-2">
                <span className="text-[10px] text-emerald-300 font-bold">কুইক টেমপ্লেট:</span>
                <button
                  type="button"
                  onClick={() => setEditNoticeText('পশ্চিমবঙ্গ ও কেন্দ্রীয় সরকারি প্রকল্পের নতুন আবেদন প্রক্রিয়া শুরু হয়েছে। বিস্তারিত নির্দেশিকা পড়তে পোস্টগুলোতে ক্লিক করুন।')}
                  className="text-[10px] bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded border border-emerald-700 transition cursor-pointer"
                >
                  💡 সরকারি প্রকল্প আবেদন
                </button>
                <button
                  type="button"
                  onClick={() => setEditNoticeText('স্বামী বিবেকানন্দ ও ঐক্যশ্রী স্কলারশিপ ২০২৪-২৫ এর অনলাইন আবেদন শুরু হয়েছে। শেষ তারিখ ৩০ সেপ্টেম্বর।')}
                  className="text-[10px] bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded border border-emerald-700 transition cursor-pointer"
                >
                  📢 স্কলারশিপ আবেদন শুরু
                </button>
                <button
                  type="button"
                  onClick={() => setEditNoticeText('সার্ভার সাময়িক রক্ষণাবেক্ষণের কাজ চলছে। যেকোনো নাগরিক সেবা পেতে আমাদের হেল্পলাইনে যোগাযোগ করুন।')}
                  className="text-[10px] bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded border border-emerald-700 transition cursor-pointer"
                >
                  ⚠️ রক্ষণাবেক্ষণ সতর্কতা
                </button>
              </div>

              {/* Form Input & Action Buttons */}
              <form onSubmit={handleSaveQuickNotice} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={editNoticeText}
                  onChange={(e) => setEditNoticeText(e.target.value)}
                  placeholder="জরুরি নোটিশের বাক্য বা মেসেজ লিখুন..."
                  className="flex-1 bg-emerald-950 border border-emerald-600 rounded-lg px-3 py-1.5 text-xs text-white placeholder-emerald-400/50 focus:outline-none focus:ring-2 focus:ring-accent font-bengali shadow-inner"
                  autoFocus
                />
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="submit"
                    className="bg-accent hover:bg-accent-hover text-slate-950 font-bold px-3.5 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
                  >
                    {noticeSavedAlert ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-900 stroke-[3]" />
                        <span>সংরক্ষিত!</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>আপডেট সেভ করুন</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingNotice(false)}
                    className="bg-emerald-900/70 hover:bg-emerald-800 text-emerald-200 font-semibold px-3 py-1.5 rounded-lg text-xs border border-emerald-700 transition cursor-pointer"
                  >
                    বাতিল
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Main Navbar Header */}
      <nav className="gradient-darkgreen text-white border-b border-emerald-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
            
            {/* Brand Logo & Title */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 shrink-0 group">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
                <img src="/logo.svg" alt="Open Concept Bangla" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-brand-200 transition-colors font-sans whitespace-nowrap">
                  Open Concept <span className="text-accent">Bangla</span>
                </span>
                <span className="text-[10px] sm:text-[11px] text-emerald-200/80 font-bengali -mt-0.5 hidden xs:block">
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
                to="/government-websites" 
                className={`px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
                  isActive('/government-websites') ? 'bg-emerald-800/90 text-white font-semibold' : 'text-emerald-100 hover:bg-emerald-800/50'
                }`}
              >
                <Landmark className="w-3.5 h-3.5 text-blue-300" />
                সরকারি ওয়েবসাইট
              </Link>
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
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Bookmark quick icon */}
              <Link
                to="/bookmarks"
                className="relative p-2 text-emerald-200 hover:text-white hover:bg-emerald-800/50 rounded-full transition"
                title="সংরক্ষিত পোস্টসমূহ"
                aria-label="সংরক্ষিত পোস্ট"
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
                    className="flex items-center gap-1.5 sm:gap-2 p-1 pl-1.5 sm:pl-2 pr-2 sm:pr-3 bg-emerald-950/60 hover:bg-emerald-900 rounded-full border border-emerald-700/70 transition"
                    aria-label="ইউজার মেনু"
                  >
                    <img 
                      src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"} 
                      alt={user.name} 
                      className="w-7 h-7 rounded-full object-cover border border-emerald-400 shrink-0"
                    />
                    <span className="text-xs font-semibold text-emerald-100 hidden sm:inline max-w-[80px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-emerald-300 hidden sm:inline" />
                  </button>

                  {userDropdown && (
                    <div 
                      className="absolute right-0 mt-2 w-56 bg-white text-slate-800 rounded-2xl shadow-2xl py-2 z-50 border border-slate-100 animate-fadeIn"
                      onMouseLeave={() => setUserDropdown(false)}
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        <div className="flex items-center justify-between mt-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 ${
                            isAdmin ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                          }`}>
                            {isAdmin ? <ShieldAlert className="w-3 h-3 text-emerald-600" /> : <User className="w-3 h-3 text-slate-500" />}
                            {user.role}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              toggleAdminRole();
                              setUserDropdown(false);
                            }}
                            className="text-[10px] font-bold text-brand-700 hover:text-brand-900 underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            {isAdmin ? 'ইউজার মোড' : 'অ্যাডমিন মোড'}
                          </button>
                        </div>
                      </div>

                      {isAdmin && (
                        <>
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setUserDropdown(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 font-bold transition"
                          >
                            <ShieldAlert className="w-4 h-4 text-emerald-600" />
                            <span>অ্যাডমিন ড্যাশবোর্ড</span>
                          </Link>
                          <Link
                            to="/admin/settings"
                            onClick={() => setUserDropdown(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-sm text-emerald-800 hover:bg-emerald-50 font-semibold transition"
                          >
                            <Sliders className="w-4 h-4 text-emerald-600" />
                            <span>অ্যাডমিন সেটিংস</span>
                          </Link>
                        </>
                      )}

                      <Link
                        to="/settings"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium transition"
                      >
                        <SettingsIcon className="w-4 h-4 text-slate-500" />
                        <span>অ্যাকাউন্ট ও সেটিংস</span>
                      </Link>

                      <Link
                        to="/bookmarks"
                        onClick={() => setUserDropdown(false)}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 font-medium transition"
                      >
                        <Bookmark className="w-4 h-4 text-slate-500" />
                        <span>সংরক্ষিত পোস্ট ({bookmarks.length})</span>
                      </Link>

                      {!isAdmin && (
                        <div className="px-2 py-1">
                          <button
                            type="button"
                            onClick={() => {
                              toggleAdminRole();
                              setUserDropdown(false);
                            }}
                            className="w-full flex items-center justify-between px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition cursor-pointer border border-emerald-200"
                          >
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                              ১-ক্লিকে অ্যাডমিন অ্যাক্সেস
                            </span>
                            <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-black">ON</span>
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setUserDropdown(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 text-left border-t border-slate-100 mt-1 font-semibold transition cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>লগআউট</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="text-xs font-semibold px-3 py-1.5 text-emerald-100 hover:text-white rounded-lg transition"
                  >
                    লগইন
                  </Link>
                  <Link
                    to="/register"
                    className="text-xs font-bold px-3.5 py-1.5 bg-accent hover:bg-accent-hover text-slate-900 rounded-lg shadow-sm transition whitespace-nowrap"
                  >
                    রেজিস্টার
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition min-w-[40px] min-h-[40px] flex items-center justify-center"
                aria-label="মোবাইল মেনু ওপেন করুন"
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
                placeholder="খুঁজুন (যেমন: ভোটার, আধার, প্রকল্প)..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-emerald-950 border border-emerald-700 rounded-xl text-white placeholder-emerald-400/60 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <Search className="w-4 h-4 text-emerald-300 absolute left-3 top-3" />
            </form>

            {/* Mobile Auth Row (if not logged in, shown clearly here) */}
            {!user ? (
              <div className="sm:hidden grid grid-cols-2 gap-2 pt-1 pb-1">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 text-center text-xs font-bold text-white bg-emerald-900/80 hover:bg-emerald-800 rounded-xl border border-emerald-700/80 transition"
                >
                  লগইন করুন
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 text-center text-xs font-black text-slate-950 bg-accent hover:bg-accent-hover rounded-xl shadow transition"
                >
                  রেজিস্টার
                </Link>
              </div>
            ) : (
              <div className="sm:hidden p-3 bg-emerald-950/70 rounded-xl border border-emerald-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full border border-emerald-400 shrink-0" />
                  <div className="truncate">
                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                    <span className="text-[10px] text-emerald-300 uppercase font-semibold">{user.role}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs text-red-300 hover:text-red-200 font-bold px-2.5 py-1 rounded-lg bg-red-950/60 border border-red-800/60 shrink-0"
                >
                  লগআউট
                </button>
              </div>
            )}

            {/* Primary Mobile Navigation Links */}
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-xl transition ${isActive('/') ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-900/40 text-slate-200 hover:bg-emerald-900/70'}`}
              >
                হোম পেজ
              </Link>
              <Link 
                to="/blogs" 
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-xl transition ${isActive('/blogs') ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-900/40 text-slate-200 hover:bg-emerald-900/70'}`}
              >
                সকল পোস্ট
              </Link>
              <Link 
                to="/government-websites" 
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-xl transition flex items-center gap-1.5 ${isActive('/government-websites') ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-900/40 text-blue-300 font-semibold hover:bg-emerald-900/70'}`}
              >
                🏛️ সরকারি সাইট
              </Link>
              <Link 
                to="/tools" 
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-xl transition flex items-center gap-1.5 ${isActive('/tools') ? 'bg-emerald-800 text-accent font-bold' : 'bg-emerald-900/40 text-accent font-semibold hover:bg-emerald-900/70'}`}
              >
                ⚡ দরকারি টুলস
              </Link>
              <Link 
                to="/bookmarks" 
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-xl transition ${isActive('/bookmarks') ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-900/40 text-slate-200 hover:bg-emerald-900/70'}`}
              >
                বুকমার্কস ({bookmarks.length})
              </Link>
              <Link 
                to="/about" 
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-xl transition ${isActive('/about') ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-900/40 text-slate-200 hover:bg-emerald-900/70'}`}
              >
                পরিচিতি
              </Link>
              <Link 
                to="/contact" 
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-xl transition ${isActive('/contact') ? 'bg-emerald-800 text-white font-bold' : 'bg-emerald-900/40 text-slate-200 hover:bg-emerald-900/70'}`}
              >
                যোগাযোগ
              </Link>
            </div>

            {/* Collapsible Mobile Categories */}
            <div className="bg-emerald-950/50 rounded-xl border border-emerald-800/70 overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                className="w-full p-2.5 flex items-center justify-between text-xs font-bold text-emerald-200 hover:text-white"
              >
                <span className="flex items-center gap-1.5">
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mobileCategoriesOpen ? 'rotate-180 text-accent' : ''}`} />
                  সকল ক্যাটাগরি ব্রাউজ করুন ({categories.length}টি)
                </span>
                <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded-full text-emerald-100">
                  {mobileCategoriesOpen ? 'সংক্ষেপ' : 'তালিকা'}
                </span>
              </button>
              {mobileCategoriesOpen && (
                <div className="px-2.5 pb-2.5 grid grid-cols-2 gap-1.5 pt-1 border-t border-emerald-800/50 text-xs">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/category/${cat.slug}`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-lg bg-emerald-900/40 hover:bg-emerald-800/60 text-slate-200 hover:text-white flex items-center justify-between"
                    >
                      <span className="truncate">{cat.nameBn}</span>
                      <span className="text-[10px] text-emerald-400 font-bold ml-1">{cat.count}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {isAdmin && (
              <Link 
                to="/admin/dashboard" 
                onClick={() => setMobileMenuOpen(false)}
                className="block p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold text-sm shadow transition"
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
