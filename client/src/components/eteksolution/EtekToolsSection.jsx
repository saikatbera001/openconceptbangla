import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  Wrench, 
  ArrowRight, 
  Scissors, 
  CreditCard, 
  Vote
} from 'lucide-react';

export default function EtekToolsSection() {
  const documentCards = [
    {
      id: 'ration',
      title: 'Ration Card Crop',
      subtitle: 'PDF to Front + Back Auto/Manual Crop • PVC Size',
      icon: Scissors,
      iconBg: 'bg-gradient-to-tr from-pink-500 to-rose-500 text-white',
      badgeColor: 'text-rose-600',
      link: '/tools?tab=cropper&preset=ration',
    },
    {
      id: 'pan',
      title: 'PAN / Aadhaar Card Crop',
      subtitle: 'PDF / JPG / PNG → Blue PAN Area Auto Crop • PVC Size',
      iconText: 'PAN',
      iconBg: 'bg-gradient-to-tr from-blue-600 to-cyan-600 text-white font-black',
      badgeColor: 'text-blue-600',
      link: '/tools?tab=cropper&preset=pan',
    },
    {
      id: 'ayushman',
      title: 'Ayushman Card Crop',
      subtitle: '2 Page PDF → Front + Back Auto PVC Fit',
      icon: CreditCard,
      iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white',
      badgeColor: 'text-orange-600',
      link: '/tools?tab=cropper&preset=ayushman',
    },
    {
      id: 'voter',
      title: 'Voter ID Card Crop',
      subtitle: 'Voter PDF → Front + Back Auto Crop • PVC Size',
      icon: Vote,
      iconBg: 'bg-gradient-to-tr from-teal-500 to-emerald-600 text-white',
      badgeColor: 'text-emerald-600',
      link: '/tools?tab=cropper&preset=voter',
    },
  ];

  const scrollToLinks = () => {
    const el = document.getElementById('student-links') || document.getElementById('quick-grid');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="online-tools" className="py-12 bg-gradient-to-b from-slate-50 via-slate-100/50 to-slate-50 border-b border-slate-200 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Dual Hero Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* 1. Blue Banner: Essential Government Portals */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-900/15 flex flex-col justify-between group">
            {/* Background ambient lighting */}
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner group-hover:scale-105 transition-transform shrink-0">
                <Landmark className="w-7 h-7 text-white" />
              </div>
              
              <div className="min-w-0 flex-1">
                <h3 className="text-xl sm:text-2xl font-black font-sans tracking-tight leading-tight">
                  Essential Government Portals
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 font-medium mt-1">
                  Citizen Services • Official Portals • Essential Links
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end relative z-10">
              <button
                type="button"
                onClick={scrollToLinks}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-xs sm:text-sm font-bold text-white transition-all backdrop-blur-md group-hover:scale-105 active:scale-95 shadow-sm"
              >
                <span>View Websites</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* 2. Orange Banner: Useful Online Tools */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 p-6 sm:p-8 text-white shadow-xl shadow-orange-900/15 flex flex-col justify-between group">
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

            <div className="mt-6 flex items-center justify-end relative z-10">
              <Link
                to="/tools"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-xs sm:text-sm font-bold text-white transition-all backdrop-blur-md group-hover:scale-105 active:scale-95 shadow-sm"
              >
                <span>Open Tools</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* 4 Card Cropper Quick Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {documentCards.map((card) => {
            const IconComponent = card.icon;

            return (
              <Link
                key={card.id}
                to={card.link}
                className="group relative bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                      {IconComponent ? (
                        <IconComponent className="w-6 h-6" />
                      ) : (
                        <span className="text-sm font-black tracking-tighter">{card.iconText}</span>
                      )}
                    </div>

                    <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 group-hover:text-blue-600 transition-colors font-sans">
                    {card.title}
                  </h4>

                  <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1.5">
                    {card.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold">
                  <span className={card.badgeColor}>Instant Crop Tool</span>
                  <span className="text-slate-400 font-normal">100% Free</span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

