import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  ExternalLink, 
  Copy, 
  Check, 
  Landmark, 
  ShieldCheck, 
  Globe, 
  Sparkles,
  Layers,
  FileCheck,
  CreditCard,
  Building,
  HeartPulse,
  Briefcase,
  Vote,
  Car,
  FileText
} from 'lucide-react';
import { GOVT_WEBSITES, GOVT_CATEGORIES } from '../data/govtWebsitesData';

// Dynamic icon resolver
const getPortalIcon = (id, category) => {
  if (category === 'land') return Landmark;
  if (category === 'identity') return CreditCard;
  if (category === 'health') return HeartPulse;
  if (category === 'employment') return Briefcase;
  if (category === 'transport') return Car;
  if (category === 'tax') return Building;
  if (category === 'certificates') return FileCheck;
  return Globe;
};

export default function GovtWebsites() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  // Filter websites
  const filteredWebsites = useMemo(() => {
    return GOVT_WEBSITES.filter((site) => {
      const matchCat = selectedCategory === 'all' || site.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchSearch = !q || 
        site.name.toLowerCase().includes(q) ||
        site.nameBn.toLowerCase().includes(q) ||
        site.service.toLowerCase().includes(q) ||
        site.serviceBn.toLowerCase().includes(q) ||
        site.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      
      {/* Top Header Banner matching Screenshot 1 */}
      <div className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-600 text-white rounded-b-[2.5rem] shadow-xl">
        
        {/* Background decorative glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Back to Home button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold text-white transition-all mb-6 backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          {/* Title and Subtitle */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-bengali text-white drop-shadow-sm">
              প্রয়োজনীয় সরকারি ওয়েবসাইট
            </h1>
            <p className="text-blue-100 text-xs sm:text-base font-normal max-w-2xl mx-auto">
              গুরুত্বপূর্ণ সরকারি পরিষেবা ও citizen portal-এর সরাসরি link একনজরে
            </p>
          </div>

        </div>
      </div>

      {/* Floating Search Bar and Filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-9 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 sm:p-4">
          
          {/* Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="সরকারি ওয়েবসাইট খুঁজুন (যেমন: Banglarbhumi, আধার, রেশন, ভোটার, জমির তথ্য)..."
              className="w-full pl-12 pr-4 py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition placeholder-slate-400 font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 w-5 h-5 rounded-full flex items-center justify-center transition"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
            {GOVT_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* Grid of Government Website Cards matching Screenshot 1 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <span>মোট <strong>{filteredWebsites.length}</strong> টি সরকারি পোর্টাল পাওয়া গেছে</span>
          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            সবগুলো ভেরিফাইড অফিসিয়াল লিঙ্ক
          </span>
        </div>

        {filteredWebsites.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3 shadow-sm">
            <Globe className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">কোনো ওয়েবসাইট পাওয়া যায়নি</h3>
            <p className="text-xs text-slate-500">
              আপনার সার্চ করা নামের সাথে কোনো পোর্টাল মেলেনি। বানান চেক করে পুনরায় চেষ্টা করুন।
            </p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow transition"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredWebsites.map((site) => {
              const IconComp = getPortalIcon(site.id, site.category);
              const isCopied = copiedId === site.id;

              return (
                <div
                  key={site.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-200 flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Top Row: Icon Badge & Origin Tag */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-11 h-11 rounded-xl ${site.iconBg || 'bg-blue-600'} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full ${site.badgeColor || 'bg-blue-600'}`}>
                        {site.badge}
                      </span>
                    </div>

                    {/* Titles */}
                    <h3 className="font-bold text-slate-900 text-base leading-tight group-hover:text-blue-700 transition-colors">
                      {site.name}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {site.service}
                    </p>
                    <p className="text-[11px] text-slate-400 font-bengali mt-1 line-clamp-2">
                      {site.serviceBn}
                    </p>
                  </div>

                  {/* Actions Bottom Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors duration-200"
                    >
                      <span>পোর্টাল খুলুন</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(site.url, site.id)}
                      title="লিঙ্ক কপি করুন"
                      className={`p-2 rounded-xl border transition ${
                        isCopied
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                          : 'bg-white border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
}
