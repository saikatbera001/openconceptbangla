import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md bg-white p-10 rounded-3xl border border-slate-200 shadow-xl">
        <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center">
          <span className="text-2xl font-black">404</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2 font-sans">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          The page you are looking for doesn't exist or has moved. Explore all services on the e-tek solution home portal.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow transition active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Back to e-tek solution</span>
        </Link>
      </div>
    </div>
  );
}

