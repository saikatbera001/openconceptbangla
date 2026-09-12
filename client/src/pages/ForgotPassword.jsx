import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import OtpInput from '../components/common/OtpInput';

export default function ForgotPassword() {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password, 3: Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [devOtp, setDevOtp] = useState('');
  const [countdown, setCountdown] = useState(0);

  const { forgotPassword, resetPassword, sendOtp } = useAuth();
  const navigate = useNavigate();

  // Handle Resend Countdown
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  // Step 1: Send OTP to Email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!email || !email.includes('@')) {
      setError('অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা দিন');
      return;
    }

    setLoading(true);
    try {
      const res = await forgotPassword(email);
      if (res.success) {
        setStep(2);
        setCountdown(60);
        setSuccessMsg(res.message || 'আপনার ইমেইলে ওটিপি কোড পাঠানো হয়েছে।');
        if (res.previewOtp) {
          setDevOtp(res.previewOtp);
          setOtp(res.previewOtp);
        }
      } else {
        setError(res.message || 'ওটিপি পাঠাতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
      }
    } catch {
      setError('সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে কিছুক্ষণ পর চেষ্টা করুন।');
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
      const res = await sendOtp(email, 'forgot_password');
      if (res.success) {
        setCountdown(60);
        setSuccessMsg('নতুন ওটিপি কোড পাঠানো হয়েছে!');
        if (res.previewOtp) {
          setDevOtp(res.previewOtp);
          setOtp(res.previewOtp);
        }
      } else {
        setError(res.message || 'ওটিপি পুনরায় পাঠাতে ব্যর্থ হয়েছে।');
      }
    } catch {
      setError('সার্ভার এরর।');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Reset Password with OTP
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (otp.length !== 6) {
      setError('অনুগ্রহ করে ৬-ডিজিটের সম্পূর্ণ ওটিপি প্রদান করুন');
      return;
    }

    if (newPassword.length < 6) {
      setError('নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('উভয় পাসওয়ার্ড হুবহু একই হতে হবে');
      return;
    }

    setLoading(true);
    try {
      const res = await resetPassword(email, otp, newPassword);
      if (res.success) {
        setStep(3);
        setSuccessMsg(res.message || 'পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!');
      } else {
        setError(res.message || 'পাসওয়ার্ড রিসেট করতে ব্যর্থ হয়েছে। ওটিপি ঠিক আছে কিনা যাচাই করুন।');
      }
    } catch {
      setError('সার্ভার সংযোগে ত্রুটি দেখা দিয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl relative overflow-hidden">
        
        {/* Top Decorative accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-600 via-emerald-500 to-brand-700" />

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-brand-700 to-emerald-500 p-1 mx-auto mb-3 shadow-lg shadow-emerald-900/15 flex items-center justify-center">
            {step === 3 ? (
              <CheckCircle2 className="w-7 h-7 text-white" />
            ) : (
              <KeyRound className="w-6 h-6 text-white" />
            )}
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-bengali">
            {step === 1 && 'পাসওয়ার্ড ভুলে গেছেন?'}
            {step === 2 && 'ওটিপি ভেরিফিকেশন ও নতুন পাসওয়ার্ড'}
            {step === 3 && 'পাসওয়ার্ড পরিবর্তন সফল!'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            {step === 1 && 'আপনার নিবন্ধিত ইমেইল ঠিকানা দিন, আমরা একটি ৬-ডিজিটের ভেরিফিকেশন কোড পাঠাবো।'}
            {step === 2 && 'ইমেইলে পাঠানো ওটিপি কোড দিন এবং নতুন পাসওয়ার্ড নির্ধারণ করুন।'}
            {step === 3 && 'আপনার নতুন পাসওয়ার্ডটি কার্যকর হয়েছে। এখন আপনি নতুন পাসওয়ার্ড দিয়ে লগইন করতে পারেন।'}
          </p>
        </div>

        {/* Step Progress Pills */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 1 ? 'w-10 bg-brand-600' : 'w-4 bg-slate-200'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step >= 2 ? 'w-10 bg-brand-600' : 'w-4 bg-slate-200'}`} />
          <div className={`h-1.5 rounded-full transition-all duration-300 ${step === 3 ? 'w-10 bg-emerald-500' : 'w-4 bg-slate-200'}`} />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3.5 mb-5 text-xs font-semibold text-rose-700 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {successMsg && step !== 3 && (
          <div className="p-3.5 mb-5 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Dev Mode OTP preview helper */}
        {devOtp && step === 2 && (
          <div className="p-3 mb-5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                টেস্টিং ওটিপি কোড (Dev Preview):
              </span>
              <button
                type="button"
                onClick={() => setOtp(devOtp)}
                className="text-[11px] font-bold text-amber-700 underline hover:text-amber-900 cursor-pointer"
              >
                স্বয়ংক্রিয় বসান
              </button>
            </div>
            <p className="font-mono text-base font-black tracking-widest text-amber-950">
              {devOtp}
            </p>
          </div>
        )}

        {/* STEP 1: Enter Email Form */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">নিবন্ধিত ইমেইল ঠিকানা</label>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-brand-700 hover:bg-brand-800 disabled:opacity-70 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>ওটিপি পাঠানো হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>ওটিপি কোড পাঠান</span>
                </>
              )}
            </button>

            <div className="pt-2 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-700 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>লগইন পেজে ফিরে যান</span>
              </Link>
            </div>
          </form>
        )}

        {/* STEP 2: Enter OTP & New Password Form */}
        {step === 2 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-slate-700">৬-ডিজিটের ওটিপি কোড</label>
                <span className="text-[11px] text-slate-400">{email}</span>
              </div>
              
              <OtpInput value={otp} onChange={setOtp} length={6} autoFocus />

              <div className="flex items-center justify-between mt-2 text-xs">
                {countdown > 0 ? (
                  <span className="text-slate-400 text-[11px]">
                    পুনরায় পাঠানোর সময়: <strong className="text-slate-600">{countdown} সে.</strong>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-brand-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>পুনরায় ওটিপি পাঠান</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp('');
                  }}
                  className="text-slate-500 hover:text-slate-700 text-[11px] underline cursor-pointer"
                >
                  ইমেইল পরিবর্তন
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">নতুন পাসওয়ার্ড</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="কমপক্ষে ৬ অক্ষর..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="পুনরায় নতুন পাসওয়ার্ড লিখুন"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 focus:bg-white transition"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
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
                  <span>পাসওয়ার্ড রিসেট হচ্ছে...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>পাসওয়ার্ড রিসেট নিশ্চিত করুন</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 3: Success View */}
        {step === 3 && (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 font-bengali">
                অভিনন্দন!
              </h3>
              <p className="text-xs text-slate-500">
                আপনার অ্যাকাউন্টের পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে।
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
              >
                <span>এখনই লগইন করুন</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
