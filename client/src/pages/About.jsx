import React from 'react';
import { ShieldCheck, Award, Users, BookOpen, Code2, Heart, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-wider">
            আমাদের লক্ষ্য ও পরিচিতি
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 mt-3 mb-4 font-bengali">
            ওপেন কনসেপ্ট বাংলা (Open Concept Bangla)
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            পশ্চিমবঙ্গ ও বাংলাভাষী নাগরিকদের জন্য সরকারি প্রকল্প, ডিজিটাল সেবা এবং অনলাইন চাকরির তথ্য পৌঁছে দিতে এবং সহজ ব্রাউজার টুলস প্রদানের একটি আধুনিক প্ল্যাটফর্ম।
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-bengali mb-2">সহজ ও সরল বাংলা গাইড</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              কঠিন সরকারি নিয়মাবলী ও ফর্ম ফিলাপের প্রক্রিয়াগুলোকে সহজ ভাষায় স্টেপ-বাই-স্টেপ উপস্থাপন করা হয়।
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-bengali">১০০% ডেটা প্রাইভেসি</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              আইডি কার্ড ক্রপ এবং ফটো রিসাইজার টুল সম্পূর্ণ ক্লায়েন্ট সাইডে প্রসেস হয়। আপনার কোনো ব্যক্তিগত নথি সার্ভারে পাঠানো হয় না।
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-bengali">আধুনিক MERN আর্কিটেকচার</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              React 18, Vite, Tailwind CSS, Node.js, Express এবং MongoDB এর সমন্বয়ে দ্রুততম পারফরম্যান্স ও রেসপনসিভনেস।
            </p>
          </div>
        </div>

        {/* MCA Academic Project Callout */}
        <div className="bg-gradient-to-r from-emerald-950 to-darkgreen text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-800 mb-12">
          <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider mb-2">
            <Award className="w-4 h-4" />
            <span>Master of Computer Applications (MCA) Project</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-bengali mb-4">
            একাডেমিক প্রজেক্ট ও পোর্টফোলিও উপস্থাপনা
          </h2>
          <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed mb-6">
            এই প্ল্যাটফর্মটি MCA ফাইনাল সেমিস্টার ক্যাপস্টোন প্রজেক্ট হিসেবে পরিকল্পিত ও বাস্তবায়িত হয়েছে। এতে ফুল-স্ট্যাক ওয়েব অ্যাপ্লিকেশন ডেভেলপমেন্টের সফটওয়্যার রিকোয়ারমেন্ট স্পেসিফিকেশন (SRS), সিস্টেম ডিজাইন (DFD/ERD), সিকিউরিটি প্রটোকল, ক্লায়েন্ট-সাইড ক্যানভাস অ্যালগরিদম এবং RESTful API এর সমস্ত মানদণ্ড পূরণ করা হয়েছে।
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-emerald-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>রোল-বেসড এক্সেস (RBAC)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>JWT অথেনটিকেশন</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>HTML5 ক্যানভাস রিসাইজিং</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent" />
              <span>রেট-লিমিটেড সিকিউর API</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
