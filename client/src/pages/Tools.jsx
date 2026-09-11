import React, { useState } from 'react';
import { Sliders, Crop, FileImage, ShieldCheck } from 'lucide-react';
import ImageCompressor from '../components/tools/ImageCompressor';
import CardCropper from '../components/tools/CardCropper';
import ImageConverter from '../components/tools/ImageConverter';

export default function Tools() {
  const [activeTab, setActiveTab] = useState('compressor');

  const tabs = [
    { id: 'compressor', name: 'ফটো সাইজ কম্প্রেসার (KB)', icon: Sliders },
    { id: 'cropper', name: 'স্মার্ট আইডি ও স্বাক্ষর ক্রপার', icon: Crop },
    { id: 'converter', name: 'ইমেজ ফরম্যাট কনভার্টার', icon: FileImage },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-brand-800 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
            <span>প্রাইভেট ও অফলাইন ব্রাউজার টুলস</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 font-bengali mb-2">
            অনলাইন সিটিজেন টুলস পোর্টাল
          </h1>
          <p className="text-sm text-slate-500">
            সরকারি চাকরির ফর্ম ফিলাপ ও ডকুমেন্টস আপলোডের জন্য ফটো সাইজ, রেশিও ও ফরম্যাট প্রস্তুত করুন নির্ভুলভাবে।
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm ${
                  isCurrent
                    ? 'bg-brand-700 text-white shadow-brand-700/20 shadow-md scale-100'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isCurrent ? 'text-accent' : 'text-slate-500'}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Display */}
        <div className="transition-all">
          {activeTab === 'compressor' && <ImageCompressor />}
          {activeTab === 'cropper' && <CardCropper />}
          {activeTab === 'converter' && <ImageConverter />}
        </div>

      </div>
    </div>
  );
}
