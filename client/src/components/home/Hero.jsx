import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const quickPills = [
    { label: "লক্ষ্মীর ভাণ্ডার ২০২৪", query: "লক্ষ্মীর ভাণ্ডার" },
    { label: "ভোটার কার্ড Form 6", query: "ভোটার কার্ড" },
    { label: "কৃষক বন্ধু স্ট্যাটাস", query: "কৃষক বন্ধু" },
    { label: "SVMCM স্কলারশিপ", query: "SVMCM" },
    { label: "ইনস্ট্যান্ট প্যান কার্ড", query: "প্যান" },
  ];

  return (
    <section className="relative hero-pattern text-white pt-12 pb-20 overflow-hidden border-b border-emerald-900">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/80 border border-emerald-600/40 text-emerald-300 text-xs font-semibold mb-6 shadow-inner backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          <span>ডিজিটাল বাংলা সহায়তা পোর্টাল • ওপেন কনসেপ্ট বাংলা</span>
        </div>

        {/* Main Bengali Headline from user specification */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight mb-5 drop-shadow-sm font-bengali">
          আপনার সমস্যার <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-amber-300 to-yellow-400">একমাত্র সমাধান</span>
        </h1>

        <p className="text-base sm:text-xl text-emerald-100/90 max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
          পশ্চিমবঙ্গ ও কেন্দ্রীয় সরকারি প্রকল্প, চাকরির বিজ্ঞপ্তি, অনলাইন ফর্ম ফিলাপ গাইড এবং ব্রাউজার-ভিত্তিক দরকারি টুলস এখন সম্পূর্ণ বাংলায়।
        </p>

        {/* Prominent Search Bar */}
        <div className="max-w-2xl mx-auto mb-6">
          <form onSubmit={handleSearch} className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md p-1 sm:p-1.5 border border-emerald-500/40 focus-within:border-accent transition-all">
            <Search className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300 ml-2.5 sm:ml-3 shrink-0" />
            <input
              type="text"
              placeholder="যেকোনো তথ্য বা সেবা খুঁজুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2.5 sm:py-3.5 px-2.5 sm:px-4 bg-transparent text-white placeholder-emerald-200/70 text-xs sm:text-base focus:outline-none min-w-0"
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent-hover text-slate-950 font-bold px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 shrink-0 transition-transform active:scale-95 shadow-md"
              aria-label="অনুসন্ধান"
            >
              <span>খুঁজুন</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </form>
        </div>

        {/* Quick Search Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-emerald-300 font-medium">জনপ্রিয় অনুসন্ধান:</span>
          {quickPills.map((pill, idx) => (
            <button
              key={idx}
              onClick={() => navigate(`/search?q=${encodeURIComponent(pill.query)}`)}
              className="bg-emerald-950/80 hover:bg-emerald-800 text-emerald-200 hover:text-white px-3 py-1 rounded-full border border-emerald-800 transition"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Feature Badges Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto mt-12 pt-8 border-t border-emerald-800/60 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-accent shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-emerald-300">তথ্য সহায়তা</p>
              <p className="text-sm font-bold text-white">১০০% ভেরিফায়েড গাইড</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-emerald-300">প্রাইভেসি নিশ্চয়তা</p>
              <p className="text-sm font-bold text-white">নো-সার্ভার টুলস</p>
            </div>
          </div>

          <div className="flex items-center gap-3 col-span-2 sm:col-span-1 justify-center sm:justify-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-700/50 flex items-center justify-center text-yellow-300 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-emerald-300">ভাষা সুবিধা</p>
              <p className="text-sm font-bold text-white">সহজ ও সাবলীল বাংলা</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
