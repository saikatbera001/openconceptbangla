import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Lock, Mail, ShieldAlert, KeyRound, Sparkles, RefreshCw, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OtpInput from '../components/common/OtpInput';

export default function Login() {
  const [authMethod, setAuthMethod] = useState('password'); // 'password' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP Login state
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [countdown, setCountdown] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { login, loginWithOtp, sendOtp } = useAuth();
  const navigate = useNavigate();

  // Countdown timer for resend OTP
  React.useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Standard password login
  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('ইমেইল ও পাসওয়ার্ড প্রদান করুন');
      return;
    }

    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        if (res.user?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(res.message || 'ভুল ইমেইল বা পাসওয়ার্ড প্রদান করা হয়েছে');
      }
    } catch {
      setError('লগইন প্রক্রিয়ায় ত্রুটি হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  // Send OTP for OTP-based Login
  const handleSendLoginOtp = async (e) => {
    e?.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!email || !email.includes('@')) {
      setError('সঠিক ইমেইল ঠিকানা দিন');
      return;
    }

    setLoading(true);
    try {
      const res = await sendOtp(email, 'login');
      if (res.success) {
        setOtpSent(true);
        setCountdown(60);
        setSuccessMsg('আপনার ইমেইলে ৬-ডিজিটের লগইন ওটিপি পাঠানো হয়েছে।');
        if (res.previewOtp) {
          setDevOtp(res.previewOtp);
          setOtp(res.previewOtp);
        }
      } else {
        setError(res.message || 'ওটিপি পাঠাতে ব্যর্থ হয়েছে। এই ইমেইলে কোনো অ্যাকাউন্ট আছে কিনা যাচাই করুন।');
      }
    } catch {
      setError('সার্ভারে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  // Submit OTP for Login
  const handleSubmitOtpLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (otp.length !== 6) {
      setError('সম্পূর্ণ ৬-ডিজিটের ওটিপি কোড দিন');
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithOtp(email, otp);
      if (res.success) {
        if (res.user?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      } else {
        setError(res.message || 'ভুল ওটিপি কোড');
      }
    } catch {
      setError('ওটিপি লগইন ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAdminLogin = async () => {
    setEmail('admin@openconceptbangla.com');
    setPassword('admin12345');
    setLoading(true);
    const res = await login('admin@openconceptbangla.com', 'admin12345');
    setLoading(false);
    if (res.success) {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="bg-slate-50 min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
        
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 to-emerald-500" />

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-1 mx-auto mb-3 shadow-lg flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="w-9 h-9 object-contain" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-bengali">
            অ্যাকাউন্টে লগইন করুন
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            বুকমার্ক ও মন্তব্য সুবিধা পেতে আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        {/* Auth Method Switcher Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-5">
          <button
            type="button"
            onClick={() => {
              setAuthMethod('password');
              setError('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              authMethod === 'password'
                ? 'bg-white text-brand-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>পাসওয়ার্ড দিয়ে</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMethod('otp');
              setError('');
              setSuccessMsg('');
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
              authMethod === 'otp'
                ? 'bg-white text-brand-800 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5" />
            <span>ইমেইল ওটিপি দিয়ে</span>
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3 mb-4 text-xs font-semibold text-red-700 bg-red-50 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {/* Success Notification */}
        {successMsg && (
          <div className="p-3 mb-4 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200">
            {successMsg}
          </div>
        )}

        {/* Dev OTP Helper */}
        {devOtp && authMethod === 'otp' && (
          <div className="p-3 mb-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs flex items-center justify-between">
            <div>
              <span className="font-bold flex items-center gap-1 text-[11px]">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Dev OTP:
              </span>
              <span className="font-mono font-black text-sm tracking-widest">{devOtp}</span>
            </div>
            <button
              type="button"
              onClick={() => setOtp(devOtp)}
              className="text-[11px] font-bold text-amber-700 underline cursor-pointer"
            >
              অটো ফিল
            </button>
          </div>
        )}

        {/* FORM 1: Password Login */}
        {authMethod === 'password' && (
          <form onSubmit={handleSubmitPassword} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">ইমেইল ঠিকানা</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">পাসওয়ার্ড</label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-brand-700 hover:text-brand-800 hover:underline transition"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-700 hover:bg-brand-800 disabled:opacity-70 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              <span>লগইন করুন</span>
            </button>
          </form>
        )}

        {/* FORM 2: OTP Login */}
        {authMethod === 'otp' && (
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">নিবন্ধিত ইমেইল ঠিকানা</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  disabled={otpSent}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition disabled:bg-slate-100"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendLoginOtp}
                disabled={loading}
                className="w-full py-3 bg-brand-700 hover:bg-brand-800 disabled:opacity-70 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <KeyRound className="w-4 h-4" />}
                <span>লগইন ওটিপি পাঠান</span>
              </button>
            ) : (
              <form onSubmit={handleSubmitOtpLogin} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">৬-ডিজিট ওটিপি প্রদান করুন</label>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setOtp('');
                      }}
                      className="text-[11px] text-brand-700 font-bold hover:underline cursor-pointer"
                    >
                      ইমেইল পরিবর্তন
                    </button>
                  </div>

                  <OtpInput value={otp} onChange={setOtp} length={6} autoFocus />

                  <div className="text-right mt-1">
                    {countdown > 0 ? (
                      <span className="text-slate-400 text-[11px]">
                        পুনরায় পাঠানো যাবে {countdown} সেকেন্ডে
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendLoginOtp}
                        className="text-xs text-brand-700 font-bold hover:underline cursor-pointer"
                      >
                        পুনরায় ওটিপি পাঠান
                      </button>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="w-full py-3 bg-brand-700 hover:bg-brand-800 disabled:opacity-60 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
                  <span>ওটিপি দিয়ে প্রবেশ করুন</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* Quick Demo Credentials */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
            টেস্টিং ও ডেমো অ্যাক্সেস
          </p>
          <button
            type="button"
            onClick={handleQuickAdminLogin}
            disabled={loading}
            className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-2 border border-emerald-200 transition cursor-pointer"
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
