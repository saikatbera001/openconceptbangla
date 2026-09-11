import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('সকল তথ্য পূরণ করুন');
      return;
    }
    const res = register(name, email, password);
    if (res.success) {
      navigate('/');
    }
  };

  return (
    <div className="bg-slate-50 min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-1 mx-auto mb-3 shadow-lg">
            <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-bengali">
            নতুন অ্যাকাউন্ট খুলুন
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ওপেন কনসেপ্ট বাংলায় বিনামূল্যে রেজিস্ট্রেশন করুন
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-xs font-semibold text-red-700 bg-red-50 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">আপনার পূর্ণ নাম</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="অর্ণব মজুমদার"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">ইমেইল ঠিকানা</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="arnab@example.com"
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
                placeholder="কমপক্ষে ৬ অক্ষর..."
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
            <UserPlus className="w-4 h-4" />
            <span>অ্যাকাউন্ট তৈরি করুন</span>
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
          <Link to="/login" className="text-brand-700 font-bold hover:underline">
            লগইন করুন
          </Link>
        </p>

      </div>
    </div>
  );
}
