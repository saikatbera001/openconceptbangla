import React from 'react';
import { Link } from 'react-router-dom';
import { Sliders, Crop, FileImage, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { TOOLS_DATA } from '../../data/dummyData';

const iconMap = {
  Sliders: Sliders,
  Crop: Crop,
  FileImage: FileImage,
};

export default function ToolsSection() {
  return (
    <section className="py-14 bg-gradient-to-b from-slate-50 to-emerald-50/50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>১০০% সুরক্ষিত ক্লায়েন্ট-সাইড ব্রাউজার টুলস</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 mb-3 font-bengali">
            দরকারী অনলাইন সিটিজেন টুলস
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            সরকারি চাকরির ফর্ম ফিলাপ ও ডকুমেন্টস আপলোডের জন্য নির্দিষ্ট সাইজের ছবি ও স্বাক্ষর তৈরি করুন সম্পূর্ণ নিরাপদে। কোনো ফাইল সার্ভারে আপলোড হয় না!
          </p>
        </div>

        {/* Tools Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOOLS_DATA.map((tool) => {
            const IconComp = iconMap[tool.icon] || Sliders;
            return (
              <div
                key={tool.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-800 text-accent flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      {tool.badge}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-400 block mb-1">
                    {tool.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-2 font-bengali">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {tool.description}
                  </p>
                </div>

                <Link
                  to={tool.path}
                  className="w-full py-3 px-4 bg-emerald-50 hover:bg-emerald-800 text-emerald-800 hover:text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors duration-200"
                >
                  <span>টুল ব্যবহার করুন</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom trust note */}
        <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>আপনার ব্যক্তিগত নথিপত্র এবং ছবি কেবল আপনার নিজের ব্রাউজারেই প্রসেস করা হয়।</span>
        </div>

      </div>
    </section>
  );
}
