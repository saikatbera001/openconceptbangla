import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  Wrench, 
  ArrowRight, 
  Scissors, 
  CreditCard, 
  FileText, 
  Vote, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function ToolsSection() {
  const documentCards = [
    {
      id: 'ration',
      title: 'রেশন কার্ড ক্রপ',
      subtitle: 'PDF থেকে Front + Back Auto/Manual Crop • PVC Size',
      icon: Scissors,
      iconBg: 'bg-gradient-to-tr from-pink-500 to-rose-500 text-white',
      badgeColor: 'text-rose-600',
      link: '/tools?tab=cropper&preset=ration',
    },
    {
      id: 'pan',
      title: 'PAN/Aadhaar/Others Card Crop',
      subtitle: 'PDF / JPG / PNG → Blue PAN Area Auto Crop • PVC Size',
      iconText: 'PAN',
      iconBg: 'bg-gradient-to-tr from-blue-600 to-cyan-600 text-white font-black',
      badgeColor: 'text-blue-600',
      link: '/tools?tab=cropper&preset=pan',
    },
    {
      id: 'ayushman',
      title: 'আয়ুষ্মান কার্ড ক্রপ',
      subtitle: '2 Page PDF → Front + Back Auto PVC Fit',
      icon: CreditCard,
      iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white',
      badgeColor: 'text-orange-600',
      link: '/tools?tab=cropper&preset=ayushman',
    },
    {
      id: 'voter',
      title: 'ভোটার কার্ড ক্রপ',
      subtitle: 'Voter PDF → Front + Back Auto Crop • PVC Size',
      icon: Vote,
      iconBg: 'bg-gradient-to-tr from-teal-500 to-emerald-600 text-white',
      badgeColor: 'text-emerald-600',
      link: '/tools?tab=cropper&preset=voter',
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Dual Hero Banners matching Screenshot 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* 1. Blue Banner: প্রয়োজনীয় সরকারি ওয়েবসাইট */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-900/15 flex flex-col justify-between group">
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                <Landmark className="w-7 h-7 text-white" />
              </div>
              
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl font-black font-bengali tracking-tight leading-tight">
                  প্রয়োজনীয় সরকারি ওয়েবসাইট
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1">
                  সরকারি পরিষেবা • Citizen Portals • Essential Links
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between relative z-10 pt-4 border-t border-white/15">
              <span className="text-[11px] text-blue-200 font-medium hidden sm:inline">
                ২৩+ ভেরিফাইড সেন্ট্রাল ও রাজ্য সরকারি পোর্টাল
              </span>
              <Link
                to="/government-websites"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-blue-900 border border-white/30 text-xs sm:text-sm font-bold backdrop-blur-md shadow-lg transition-all ml-auto"
              >
                <span>Open Websites</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* 2. Orange Banner: Useful Online Tools */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 p-6 sm:p-8 text-white shadow-xl shadow-orange-900/15 flex flex-col justify-between group">
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                <Wrench className="w-7 h-7 text-white" />
              </div>
              
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl font-black font-sans tracking-tight leading-tight">
                  Useful Online Tools
                </h3>
                <p className="text-xs sm:text-sm text-amber-100 font-medium mt-1">
                  Resize • Compress • Convert • PDF • Photo Tools & More
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between relative z-10 pt-4 border-t border-white/15">
              <span className="text-[11px] text-amber-100 font-medium hidden sm:inline">
                ১০০% অফলাইন • নো ফাইল সার্ভার আপলোড
              </span>
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-orange-900 border border-white/30 text-xs sm:text-sm font-bold backdrop-blur-md shadow-lg transition-all ml-auto"
              >
                <span>Open Tools</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* 4 Document Card Cropper Cards matching Screenshot 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {documentCards.map((card) => {
            const IconComp = card.icon;

            return (
              <Link
                key={card.id}
                to={card.link}
                className="p-4 sm:p-5 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:scale-[1.02] transition-all duration-200 flex items-center gap-3.5 group"
              >
                {/* Icon Box */}
                <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform text-sm`}>
                  {IconComp ? <IconComp className="w-6 h-6" /> : card.iconText}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-black text-slate-900 group-hover:text-brand-800 transition-colors truncate font-bengali">
                    {card.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                    {card.subtitle}
                  </p>
                </div>

                {/* Small Arrow indicator */}
                <span className={`text-sm ${card.badgeColor} group-hover:translate-x-1 transition-transform shrink-0 font-bold`}>
                  →
                </span>
              </Link>
            );
          })}
        </div>

        {/* Security & Privacy trust footer */}
        <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>আপনার ব্যক্তিগত নথিপত্র এবং ছবি কেবল আপনার নিজের ব্রাউজারেই প্রক্রিয়াকরণ করা হয়।</span>
        </div>

      </div>
    </section>
  );
}
