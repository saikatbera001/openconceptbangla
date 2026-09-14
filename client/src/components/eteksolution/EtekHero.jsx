import React, { useState, useEffect } from 'react';
import { MessageSquare, ExternalLink, Clock, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

export default function EtekHero({ onServiceClick }) {
  // Live Clock State
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter Animation State
  const fullText = "e-tek solution is a complete it & online solution centre, which is established by Mr. Tanmoy Santra (Computer Hardware & Network Engineer)";
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    let timeout;
    if (!isDeleting && textIndex < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 55);
    } else if (!isDeleting && textIndex === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 3000);
    } else if (isDeleting && textIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.substring(0, textIndex - 1));
        setTextIndex(textIndex - 1);
      }, 25);
    } else if (isDeleting && textIndex === 0) {
      setIsDeleting(false);
      timeout = setTimeout(() => {
        setTextIndex(0);
      }, 500);
    }
    return () => clearTimeout(timeout);
  }, [textIndex, isDeleting, fullText]);

  return (
    <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-6 pb-10 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Info Bar: WhatsApp Channel Follow + Live Digital Clock */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
          {/* WhatsApp Channel Badge */}
          <a 
            href="https://whatsapp.com/channel/0029Va9xAHAF6smsGFaSwu3l"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all group"
          >
            <span className="p-1 bg-white/20 rounded-full">
              <MessageSquare className="w-4 h-4 text-white" />
            </span>
            <span>Follow Our Channel for More Info</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </a>

          {/* Live Digital Clock Widget */}
          <div className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700 font-mono text-xs sm:text-sm">
            <Clock className="w-4 h-4 text-blue-600 animate-spin-slow" />
            <span className="font-bold text-slate-900">
              {currentTime.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' })}
            </span>
            <span className="text-slate-400">|</span>
            <span className="font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
              {currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
            </span>
          </div>
        </div>

        {/* Primary Hero Graphic Banner from Live Site */}
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700/50 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 group mb-8 transition-all duration-300">
          {/* Background image overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
            style={{ backgroundImage: `url(${getAssetUrl('/images/eteksolution/hero-skyline-bg.png')})` }}
          />
          
          <div className="relative z-10 p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Brand Identity */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 max-w-sm">
              <div className="flex items-center gap-3">
                <img 
                  src={getAssetUrl('/images/eteksolution/whatsapp-b-icon.png')} 
                  alt="WhatsApp Business" 
                  className="w-14 h-14 rounded-2xl shadow-lg border border-emerald-400/30 hover:scale-105 transition-transform"
                />
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight">e-tek solution</h3>
                  <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Online Service Centre</p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                স্বচ্ছ ভারত অভিযান, পি এম আবাস যোজনা, ডিজিটাল রেশন কার্ড ও নির্ভরযোগ্য সরকারি রেজিষ্ট্রেশন কেন্দ্র।
              </p>
              <div className="flex items-center gap-2">
                <a 
                  href="tel:9647479787"
                  className="px-3.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <span>Call: 9647479787</span>
                </a>
                <a 
                  href="https://wa.me/message/EVNR7MWOK23YA1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 transition-colors shadow-sm"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Center: Annapurna Bhandar Emblem */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-gradient-to-b from-amber-400 via-yellow-200 to-amber-500 shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer">
                <img 
                  src={getAssetUrl('/images/eteksolution/annapurna-bhandar.png')} 
                  alt="অন্নপূর্ণা ভাণ্ডার"
                  className="w-full h-full object-contain rounded-full bg-white"
                />
              </div>
              <span className="mt-2 text-xs font-bold text-amber-300 tracking-wide">অন্নপূর্ণা ভাণ্ডার অনলাইন আবেদন</span>
            </div>

            {/* Right: Aadhaar Card Service Poster */}
            <div className="w-full sm:w-auto max-w-sm rounded-2xl overflow-hidden shadow-2xl border-2 border-purple-400/40 hover:scale-105 transition-transform duration-300 bg-purple-950">
              <img 
                src={getAssetUrl('/images/eteksolution/aadhaar-poster.png')} 
                alt="আধার কার্ডের কাজের জন্য যোগাযোগ করুন" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Typewriter Slogan Box */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-full" />
          
          {/* Gradient Slogan */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight"
              style={{
                background: 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
            Build Something Amazing.
          </h2>

          {/* Typewriter text container */}
          <div className="min-h-[60px] flex items-center justify-center max-w-3xl mx-auto px-2">
            <p className="font-mono text-sm sm:text-base md:text-lg font-bold text-slate-800 leading-relaxed">
              <span>{displayedText}</span>
              <span className="inline-block w-0.5 h-5 ml-1 bg-blue-600 animate-cursor-blink align-middle" />
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              Govt Authorized CSC Point
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Verified Fast Turnaround
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Doorstep Assistance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
