import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, User, Mail, Lock, CheckCircle2, AlertCircle, RefreshCw, Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OtpInput from '../components/common/OtpInput';

export default function Register() {
  const [step, setStep] = useState(1); // 1: Input details, 2: OTP verification
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [otp, setOtp] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [countdown, setCountdown] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const { registerWithOtp, sendOtp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Step 1: Request Email Verification OTP
  const handleInitiateRegistration = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!name || !email || !password) {
      setError('অনুগ্রহ করে সকল তথ্য সঠিকভাবে পূরণ করুন');
      return;
    }

    if (password.length < 6) {
      setError('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return;
    }

    setLoading(true);
    try {
      const res = await sendOtp(email, 'email_verification');
      if (res.success) {
        setStep(2);
        setCountdown(60);
        setSuccessMsg('আপনার ইমেইলে ৬-ডিজিটের ভেরিফিকেশন ওটিপি পাঠানো হয়েছে।');
        if (res.previewOtp) {
          setDevOtp(res.previewOtp);
          setOtp(res.previewOtp);
        }
      } else {
        setError(res.message || 'ওটিপি পাঠাতে ব্যর্থ হয়েছে।');
      }
    } catch {
      setError('সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and complete Registration
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('সম্পূর্ণ ৬-ডিজিটের ওটিপি কোড প্রদান করুন');
      return;
    }

    setLoading(true);
    try {
      const res = await registerWithOtp(name, email, password, otp);
      if (res.success) {
        navigate('/');
      } else {
        setError(res.message || 'ভুল ওটিপি কোড অথবা রেজিস্ট্রেশন ব্যর্থ হয়েছে');
      }
    } catch {
      setError('রেজিস্ট্রেশন সম্পন্ন করা সম্ভব হয়নি');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setError('');
    setLoading(true);
    try {
      const res = await sendOtp(email, 'email_verification');
      if (res.success) {
        setCountdown(60);
        setSuccessMsg('নতুন ওটিপি কোড পাঠানো হয়েছে!');
        if (res.previewOtp) {
          setDevOtp(res.previewOtp);
          setOtp(res.previewOtp);
        }
      } else {
        setError(res.message || 'ওটিপি পাঠাতে সমস্যা হয়েছে');
      }
    } catch {
      setError('সার্ভার ত্রুটি');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
        
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 via-emerald-500 to-brand-700" />

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 p-1 mx-auto mb-3 shadow-lg flex items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="w-9 h-9 object-contain" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-bengali">
            {step === 1 ? 'নতুন অ্যাকাউন্ট খুলুন' : 'ইমেইল ভেরিফিকেশন'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {step === 1
              ? 'ওপেন কনসেপ্ট বাংলায় বিনামূল্যে নিরাপদ রেজিস্ট্রেশন করুন'
              : `${email} ঠিকানায় পাঠানো ৬-ডিজিটের কোড দিয়ে অ্যাকাউন্ট নিশ্চিত করুন`}
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3 mb-4 text-xs font-semibold text-rose-700 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Notification */}
        {successMsg && (
          <div className="p-3 mb-4 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Dev Mode OTP preview helper */}
        {devOtp && step === 2 && (
          <div className="p-3 mb-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Dev OTP Preview:
              </span>
              <button
                type="button"
                onClick={() => setOtp(devOtp)}
                className="text-[11px] font-bold text-amber-700 underline cursor-pointer"
              >
                অটো ফিল
              </button>
            </div>
            <p className="font-mono text-base font-black tracking-widest text-amber-950">
              {devOtp}
            </p>
          </div>
        )}

        {/* STEP 1: Registration Form */}
        {step === 1 && (
          <form onSubmit={handleInitiateRegistration} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">আপনার পূর্ণ নাম</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="অর্ণব মজুমদার"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
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
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">পাসওয়ার্ড</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="কমপক্ষে ৬ অক্ষর..."
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
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>যাচাইকরণ ওটিপি পাঠানো হচ্ছে...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>ইমেইল ভেরিফিকেশন ওটিপি পাঠান</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: Verify OTP and complete registration */}
        {step === 2 && (
          <form onSubmit={handleVerifyAndRegister} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">৬-ডিজিটের ইমেইল ওটিপি দিন</label>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp('');
                  }}
                  className="text-[11px] text-slate-500 hover:text-slate-700 underline cursor-pointer"
                >
                  তথ্য পরিবর্তন
                </button>
              </div>

              <OtpInput value={otp} onChange={setOtp} length={6} autoFocus />

              <div className="text-right mt-1">
                {countdown > 0 ? (
                  <span className="text-slate-400 text-[11px]">
                    পুনরায় পাঠানোর সময়: <strong className="text-slate-600">{countdown} সে.</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-xs text-brand-700 font-bold hover:underline cursor-pointer flex items-center gap-1 ml-auto"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>পুনরায় ওটিপি পাঠান</span>
                  </button>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-3 bg-brand-700 hover:bg-brand-800 disabled:opacity-60 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>অ্যাকাউন্ট তৈরি হচ্ছে...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>ইমেইল ভেরিফাই ও অ্যাকাউন্ট নিশ্চিত করুন</span>
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>পূর্বের ধাপে ফিরে যান</span>
              </button>
            </div>
          </form>
        )}

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
