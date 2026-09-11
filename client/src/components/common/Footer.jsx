import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, CheckCircle2, Heart, Shield, Globe, Award, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/dummyData';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter Card */}
        <div className="bg-gradient-to-r from-emerald-900 via-darkgreen to-emerald-950 rounded-2xl p-6 sm:p-10 mb-14 shadow-2xl border border-emerald-800/60 relative overflow-hidden">
          <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid md:grid-cols-2 gap-6 items-center relative z-10">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent/20 text-accent font-semibold text-xs rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5" /> ফ্রি নিউজলেটার সাবস্ক্রিপশন
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                নতুন সরকারি প্রকল্প ও চাকরির আপডেট সরাসরি পান
              </h3>
              <p className="text-sm text-emerald-100/80">
                প্রতি সপ্তাহে গুরুত্বপূর্ণ নোটিস, ফরম ফিলাপের সময়সীমা এবং দরকারি গাইড আপনার ইনবক্সে।
              </p>
            </div>

            <div>
              {subscribed ? (
                <div className="bg-emerald-800/80 border border-emerald-500 text-white px-5 py-3.5 rounded-xl flex items-center gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                  <div>
                    <p className="font-bold text-sm">অভিনন্দন! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।</p>
                    <p className="text-xs text-emerald-200">শীঘ্রই আপনি প্রথম আপডেট ইমেইল পাবেন।</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <input
                      type="email"
                      required
                      placeholder="আপনার ইমেইল আইডি লিখুন..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 pl-10 text-sm bg-slate-900/90 text-white rounded-xl border border-emerald-700/60 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-4" />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3.5 bg-accent hover:bg-accent-hover text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-accent/20 transition-all active:scale-95"
                  >
                    <span>সাবস্ক্রাইব</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Navigation & Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-0.5 shadow-lg">
                <img src="/logo.svg" alt="Open Concept Bangla" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white font-sans">
                Open Concept <span className="text-accent">Bangla</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Open Concept Bangla হলো পশ্চিমবঙ্গ ও বাংলাভাষী নাগরিকদের জন্য তৈরি আধুনিক ডিজিটাল ইনফরমেশন পোর্টাল এবং অনলাইন টুলস হাব। সরকারি ফর্ম পূরণ, চাকরির খবর এবং অফিশিয়াল কার্ড সাইজ রিসাইজার এখন এক প্ল্যাটফর্মে।
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-4 h-4 text-emerald-500" /> ১০০% সুরক্ষিত
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-cyan-400" /> বিশুদ্ধ বাংলা
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-accent" /> ফ্রি সার্ভিস
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              দ্রুত লিংকসমূহ
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-accent transition">হোম পেজ</Link></li>
              <li><Link to="/blogs" className="hover:text-accent transition">সকল ব্লগ ও গাইড</Link></li>
              <li><Link to="/tools" className="hover:text-accent transition">অনলাইন দরকারি টুলস</Link></li>
              <li><Link to="/bookmarks" className="hover:text-accent transition">সংরক্ষিত পোস্ট</Link></li>
              <li><Link to="/about" className="hover:text-accent transition">আমাদের সম্পর্কে</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition">যোগাযোগ করুন</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              প্রধান ক্যাটাগরি
            </h4>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.slug}>
                  <Link to={`/category/${cat.slug}`} className="hover:text-accent transition">
                    {cat.nameBn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Legal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              টুলস ও নীতিসমূহ
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/tools/image-compressor" className="hover:text-accent transition">ফটো কম্প্রেসার (KB)</Link></li>
              <li><Link to="/tools/card-cropper" className="hover:text-accent transition">আইডি কার্ড ক্রপার</Link></li>
              <li><Link to="/about" className="hover:text-accent transition">গোপনীয়তা নীতি (Privacy)</Link></li>
              <li><Link to="/about" className="hover:text-accent transition">ব্যবহারের শর্তাবলী (Terms)</Link></li>
              <li><Link to="/about" className="hover:text-accent transition">দাবিত্যাগ (Disclaimer)</Link></li>
              <li><Link to="/admin/login" className="text-emerald-500 hover:text-emerald-400 font-semibold transition">অ্যাডমিন লগইন</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & MCA Badge */}
        <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Open Concept Bangla. All rights reserved.</p>
          
          <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>MCA Capstone Project • MERN Stack & Tailwind CSS Architecture</span>
          </div>

          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for West Bengal Citizens
          </p>
        </div>

      </div>
    </footer>
  );
}
