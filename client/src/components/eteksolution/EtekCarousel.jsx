import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Images } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

const CAROUSEL_SLIDES = [
  {
    id: 1,
    url: "/images/eteksolution/featured-banner.png",
    caption: "তাহলে চলে আসুন ই-টেক সলিউশান এ - Helpline: 9647479787"
  },
  {
    id: 2,
    url: "/images/eteksolution/aadhaar-poster.png",
    caption: "আধার কার্ডের কাজের জন্য যোগাযোগ করুন - ই-টেক সলিউশন"
  },
  {
    id: 3,
    url: "/images/eteksolution/annapurna-bhandar.png",
    caption: "অন্নপূর্ণা ভাণ্ডার অনলাইন আবেদন - প্রতি ঘরে অন্ন, সবার জন্য সম্মান"
  },
  {
    id: 4,
    url: "/images/eteksolution/nsdl-pan.png",
    caption: "NSDL PAN Card Processing & Instant e-PAN Service"
  },
  {
    id: 5,
    url: "/images/eteksolution/delhivery-booking-zone.png",
    caption: "Delhivery Express Logistics & Domestic Courier Dispatch Zone"
  },
  {
    id: 6,
    url: "/images/eteksolution/india-post-dak-mitra.png",
    caption: "India Post Dak Mitra Speed Post & Parcel Delivery Service"
  },
  {
    id: 7,
    url: "/images/eteksolution/ticket-booking.png",
    caption: "IRCTC Authorized Train, Flight & Bus Ticket Reservation"
  },
  {
    id: 8,
    url: "/images/eteksolution/airtel-payment-bank.png",
    caption: "Airtel Payments Bank - Zero Balance Account & Biometric AEPS"
  },
  {
    id: 9,
    url: "/images/eteksolution/csc.png",
    caption: "CSC Common Service Centre Digital Seva & Central Govt Schemes"
  },
  {
    id: 10,
    url: "/images/eteksolution/passport.png",
    caption: "Passport Seva Kendra Appointment & Documentation Guidance"
  },
  {
    id: 11,
    url: "/images/eteksolution/cibil-report.png",
    caption: "Official CIBIL Bureau Credit Score & Loan Eligibility Report"
  }
];

export default function EtekCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  return (
    <section className="py-16 bg-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Images className="w-4 h-4" />
              Service Showcase
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              Featured Gallery & Updates
            </h3>
          </div>

          {/* Autoplay Pause / Play Control */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/10"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-yellow-400" />
                  <span>Pause Autoplay</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Resume Autoplay</span>
                </>
              )}
            </button>
            <div className="text-xs font-mono text-slate-400">
              {currentIndex + 1} / {CAROUSEL_SLIDES.length}
            </div>
          </div>
        </div>

        {/* Main Carousel Screen with Smooth Slide / Fade Transition */}
        <div 
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 bg-black aspect-[16/9] md:aspect-[21/9] max-h-[500px] group"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {CAROUSEL_SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                idx === currentIndex
                  ? 'opacity-100 scale-100 z-10'
                  : 'opacity-0 scale-105 pointer-events-none z-0'
              }`}
            >
              <img
                src={getAssetUrl(slide.url)}
                alt={slide.caption}
                className="w-full h-full object-contain p-2 sm:p-4 bg-slate-950"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getAssetUrl("/images/eteksolution/featured-banner.png");
                }}
              />
              
              {/* Bottom Caption Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 sm:p-8 flex items-end justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white uppercase tracking-wider mb-2 inline-block">
                    Update #{idx + 1}
                  </span>
                  <h4 className="text-base sm:text-xl font-extrabold text-white drop-shadow-md">
                    {slide.caption}
                  </h4>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg border border-white/20"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-white hover:text-black transition-all active:scale-95 shadow-lg border border-white/20"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/20 z-20">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / CAROUSEL_SLIDES.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
          {CAROUSEL_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'w-8 bg-blue-500 shadow-md shadow-blue-500/50'
                  : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
