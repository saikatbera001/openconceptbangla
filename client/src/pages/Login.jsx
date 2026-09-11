import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail, ShieldAlert, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('ইমেইল ও পাসওয়ার্ড প্রদান করুন');
      return;
    }
    const res = login(email, password);
    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    }
  };

  const handleQuickAdminLogin = () => {
    setEmail('admin@openconceptbangla.com');
    setPassword('admin12345');
    const res = login('admin@openconceptbangla.com', 'admin12345');
    if (res.success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="bg-slate-50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-1 mx-auto mb-3 shadow-lg">
            <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-bengali">
            অ্যাকাউন্টে লগইন করুন
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            বুকমার্ক ও মন্তব্য সুবিধা পেতে আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-xs font-semibold text-red-700 bg-red-50 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">ইমেইল ঠিকানা</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow transition"
          >
            <LogIn className="w-4 h-4" />
            <span>লগইন করুন</span>
          </button>
        </form>

        {/* Quick Demo Credentials */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
            টেস্টিং ও ডেমো অ্যাক্সেস
          </p>
          <button
            type="button"
            onClick={handleQuickAdminLogin}
            className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-emerald-200 transition"
          >
            <ShieldAlert className="w-4 h-4 text-emerald-600" />
            <span>১-ক্লিকে অ্যাডমিন ডেমো লগইন</span>
          </button>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          অ্যাকাউন্ট নেই?{' '}
          <Link to="/register" className="text-brand-700 font-bold hover:underline">
            নতুন অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>

      </div>
    </div>
  );
}
