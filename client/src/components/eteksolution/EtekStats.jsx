import React from 'react';
import { Award, Users, CheckCircle } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

export default function EtekStats() {
  const stats = [
    {
      number: "150+",
      label: "Projects Completed",
      icon: Award,
      sub: "Govt & Citizen Consultancies",
      color: "from-blue-600 to-indigo-600",
      textColor: "text-blue-600"
    },
    {
      number: "02k+",
      label: "Community Followers",
      icon: Users,
      sub: "Active WhatsApp & Social Base",
      color: "from-purple-600 to-pink-600",
      textColor: "text-purple-600"
    },
    {
      number: "99%",
      label: "Success Rate",
      icon: CheckCircle,
      sub: "Prompt & Verified Delivery",
      color: "from-emerald-600 to-teal-600",
      textColor: "text-emerald-600"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative blurred backdrops */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = stat.icon;
            return (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 text-center hover:bg-white/15 hover:scale-[1.02] transition-all duration-300 shadow-xl group"
              >
                <div className="inline-flex p-3 rounded-2xl bg-white/10 text-white mb-3 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Founder Spotlight: Mr. Tanmoy Santra */}
        <div className="mt-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-amber-400 border-2 border-amber-300 shadow-xl flex-shrink-0">
              <img 
                src={getAssetUrl('/images/eteksolution/tanmoy-santra.png')} 
                alt="Mr. Tanmoy Santra" 
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Founder & Chief Engineer
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white mt-1">Mr. Tanmoy Santra</h3>
              <p className="text-xs text-slate-300">Computer Hardware & Network Engineer</p>
              <p className="text-xs text-slate-400 mt-0.5">Henria Bazar, Boga Road, Near Maruti Stand</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="tel:9647479787" 
              className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-transform active:scale-95"
            >
              Call: 9647479787
            </a>
            <a 
              href="https://wa.me/message/EVNR7MWOK23YA1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-transform active:scale-95"
            >
              WhatsApp Direct
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
