import React from 'react';
import { Flame } from 'lucide-react';

export default function EtekMarquee() {
  const noticeText = "অন্নপূর্ণা ভান্ডার অনলাইন আবেদন চলছে || WBJEE, JENPAS, ANM & GNM এর ফর্ম ফিলাপ চলছে || স্বামী বিবেকানন্দ মেরিট কাম মিনস স্কলারশিপ চলছে || ইনকাম ট্যাক্স ফাইলিং, পি ট্যাক্স রেজিঃ ও রিনিউয়াল , ট্রেড লাইসেন্স , ফুড লাইসেন্স এর কাজ চলছে ||";

  return (
    <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-inner overflow-hidden border-y border-red-500/50">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Urgent Badge */}
        <div className="flex-shrink-0 bg-red-800 text-white px-3 sm:px-4 py-2 flex items-center gap-1.5 z-10 shadow-md font-bold text-xs sm:text-sm tracking-wide">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
          </span>
          <Flame className="w-4 h-4 text-yellow-300 animate-bounce" />
          <span className="font-extrabold uppercase">বিজ্ঞপ্তি / UPDATE</span>
        </div>

        {/* Marquee Track */}
        <div className="flex-grow overflow-hidden relative py-2 select-none cursor-pointer">
          <div className="animate-etek-marquee font-medium text-xs sm:text-sm md:text-base tracking-wide text-yellow-100 flex items-center gap-8">
            <span>{noticeText}</span>
            <span className="opacity-50">★ ★ ★</span>
            <span>{noticeText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
