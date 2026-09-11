import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-slate-50 min-h-[75vh] flex items-center justify-center p-4">
      <div className="text-center max-w-md bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
        <h1 className="text-7xl font-black text-brand-700 font-mono mb-2">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 font-bengali mb-3">
          পাতাটি খুঁজে পাওয়া যায়নি
        </h2>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          আপনি যে লিঙ্কটি খুঁজছেন তা স্থানান্তরিত হয়েছে অথবা মুছে ফেলা হয়েছে।
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow transition"
        >
          <Home className="w-4 h-4" />
          <span>মূল পাতায় ফিরে যান</span>
        </Link>
      </div>
    </div>
  );
}
