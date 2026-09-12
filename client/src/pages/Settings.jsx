import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Settings as SettingsIcon, 
  User, 
  ShieldCheck, 
  ShieldAlert, 
  Key, 
  Bell, 
  Sliders, 
  CheckCircle2, 
  RefreshCw, 
  Save, 
  Download, 
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'admin' ? 'admin' : 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);

  const { user, isAdmin, updateProfile, toggleAdminRole, siteSettings, updateSiteSettings } = useAuth();
  const { posts, categories, notice, noticeActive, updateUrgentNotice } = useApp();

  // Profile Form States
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Admin Portal Settings Form State
  const [adminForm, setAdminForm] = useState({
    siteName: siteSettings?.siteName || 'Open Concept Bangla',
    siteTagline: siteSettings?.siteTagline || 'বাংলা ভাষায় নির্ভরযোগ্য সরকারি তথ্য ও প্রযুক্তি পোর্টাল',
    noticeText: notice || siteSettings?.noticeText || 'পশ্চিমবঙ্গ ও কেন্দ্রীয় সরকারি প্রকল্পের নতুন আবেদন প্রক্রিয়া শুরু হয়েছে। বিস্তারিত নির্দেশিকা পড়তে পোস্টগুলোতে ক্লিক করুন।',
    noticeActive: noticeActive ?? siteSettings?.noticeActive ?? true,
    allowOtpLogin: siteSettings?.allowOtpLogin ?? true,
    allowRegistration: siteSettings?.allowRegistration ?? true,
    requireEmailVerification: siteSettings?.requireEmailVerification ?? true,
    supportEmail: siteSettings?.supportEmail || 'contact@openconceptbangla.com',
    supportPhone: siteSettings?.supportPhone || '+91 98765 43210',
    whatsappLink: siteSettings?.whatsappLink || 'https://wa.me/919876543210',
    maintenanceMode: siteSettings?.maintenanceMode ?? false,
  });

  useEffect(() => {
    if (notice !== undefined) {
      setAdminForm(prev => ({
        ...prev,
        noticeText: notice,
        noticeActive: noticeActive
      }));
    }
  }, [notice, noticeActive]);

  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const avatarPresets = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
  ];

  // Save Profile Info
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setFeedback({ type: '', message: '' });

    const updates = { name, avatar };
    if (newPassword) {
      if (newPassword.length < 6) {
        setFeedback({ type: 'error', message: 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' });
        setSaving(false);
        return;
      }
      if (newPassword !== confirmPassword) {
        setFeedback({ type: 'error', message: 'পাসওয়ার্ড নিশ্চিতকরণ মিলছে না।' });
        setSaving(false);
        return;
      }
      updates.password = newPassword;
    }

    const res = await updateProfile(updates);
    setSaving(false);
    if (res.success) {
      setFeedback({ type: 'success', message: 'আপনার প্রোফাইল তথ্য সফলভাবে সংরক্ষিত হয়েছে!' });
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setFeedback({ type: 'error', message: res.message || 'সংরক্ষণ ব্যর্থ হয়েছে।' });
    }
  };

  // Toggle Admin Role
  const handleRoleToggle = async () => {
    setSaving(true);
    const res = await toggleAdminRole();
    setSaving(false);
    if (res.success) {
      setFeedback({
        type: 'success',
        message: user?.role === 'admin'
          ? 'আপনি এখন সাধারণ ইউজার মোডে আছেন।'
          : 'অভিনন্দন! আপনার অ্যাকাউন্টকে অ্যাডমিন সুবিধায় উন্নীত করা হয়েছে।'
      });
    }
  };

  // Save Admin Settings
  const handleSaveAdminSettings = (e) => {
    e.preventDefault();
    setSaving(true);
    updateSiteSettings(adminForm);
    updateUrgentNotice(adminForm.noticeText, adminForm.noticeActive);
    setTimeout(() => {
      setSaving(false);
      setFeedback({ type: 'success', message: 'জরুরি নোটিশ অ্যালার্ট ও অ্যাডমিন সেটিংস সফলভাবে কার্যকর হয়েছে!' });
    }, 400);
  };

  // Export Data JSON
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ posts, categories, siteSettings }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `ocb_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setFeedback({ type: 'success', message: 'ব্যাকআপ ফাইল সফলভাবে ডাউনলোড হয়েছে।' });
  };

  return (
    <div className="bg-slate-50 min-h-[90vh] py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-bengali flex items-center gap-2.5">
              <SettingsIcon className="w-7 h-7 text-brand-700" />
              <span>সেটিংস ও অ্যাডমিন কন্ট্রোল</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              আপনার প্রোফাইল, অ্যাকাউন্ট এবং পোর্টাল কনফিগারেশন পরিচালনা করুন
            </p>
          </div>

          {/* Quick Role Switcher Banner */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase block">বর্তমান রোল</span>
              <span className={`inline-flex items-center gap-1 text-xs font-black px-2.5 py-0.5 rounded-full uppercase ${
                isAdmin ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
              }`}>
                {isAdmin ? <ShieldAlert className="w-3 h-3 text-emerald-600" /> : <User className="w-3 h-3 text-slate-500" />}
                {user?.role || 'USER'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRoleToggle}
              disabled={saving}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                isAdmin
                  ? 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-600 shadow-sm'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'ইউজার মোডে যান' : '১-ক্লিকে অ্যাডমিন হন'}</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback.message && (
          <div className={`p-4 mb-6 text-sm font-semibold rounded-2xl border flex items-center gap-3 animate-fadeIn ${
            feedback.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-800'
              : 'bg-emerald-50 border-emerald-200 text-emerald-800'
          }`}>
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Settings Navigation Tabs */}
        <div className="flex gap-2 p-1.5 bg-slate-200/70 rounded-2xl mb-8 max-w-md">
          <button
            type="button"
            onClick={() => {
              setActiveTab('profile');
              setSearchParams({ tab: 'profile' });
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-white text-brand-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>প্রোফাইল সেটিংস</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setSearchParams({ tab: 'admin' });
            }}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'admin'
                ? 'bg-white text-brand-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>অ্যাডমিন ও সাইট কন্ট্রোল</span>
            {isAdmin && <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />}
          </button>
        </div>

        {/* TAB 1: Profile & Account Settings */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-bengali">
                ব্যক্তিগত তথ্য ও প্রোফাইল
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                আপনার প্রদর্শিত নাম, অ্যাভাটার ছবি এবং নিরাপত্তা পাসওয়ার্ড পরিবর্তন করুন
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-6">
              
              {/* Avatar Selection */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-2">প্রোফাইল ছবি (Avatar)</label>
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={avatar}
                    alt="Current Avatar"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-500 shadow-md"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-1.5">প্রিসেট থেকে ছবি পছন্দ করুন:</p>
                    <div className="flex items-center gap-2">
                      {avatarPresets.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatar(imgUrl)}
                          className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition cursor-pointer ${
                            avatar === imgUrl ? 'border-brand-600 scale-105 shadow-sm' : 'border-slate-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={imgUrl} alt="preset" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <input
                  type="url"
                  placeholder="অথবা কাস্টম ইমেজ URL দিন..."
                  value={avatar}
                  onChange={(e) => setAvatar(e.target.value)}
                  className="w-full px-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">পূর্ণ নাম</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ইমেইল ঠিকানা</label>
                  <div className="relative">
                    <input
                      type="email"
                      disabled
                      value={user?.email || ''}
                      className="w-full px-4 py-2.5 text-sm bg-slate-100 text-slate-500 border border-slate-200 rounded-xl cursor-not-allowed"
                    />
                    <span className="absolute right-3 top-2.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      ভেরিফাইড
                    </span>
                  </div>
                </div>
              </div>

              {/* Change Password Section */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-brand-700" />
                  <span>পাসওয়ার্ড পরিবর্তন (ঐচ্ছিক)</span>
                </h3>
                <p className="text-xs text-slate-400 mb-3">পাসওয়ার্ড পরিবর্তন না করতে চাইলে খালি রাখুন</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">নতুন পাসওয়ার্ড</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="কমপক্ষে ৬ অক্ষর..."
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full pl-4 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">নতুন পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="পুনরায় টাইপ করুন"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-60 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-md transition cursor-pointer"
                >
                  {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>প্রোফাইল পরিবর্তন সংরক্ষণ করুন</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 2: Admin & Site Controls */}
        {activeTab === 'admin' && (
          <div className="space-y-6">
            
            {/* If not admin, show instant upgrade invitation card */}
            {!isAdmin && (
              <div className="p-6 bg-gradient-to-r from-emerald-900 to-brand-900 rounded-3xl text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <ShieldCheck className="w-4 h-4" /> অ্যাডমিন অ্যাক্টিভেশন
                  </span>
                  <h3 className="text-xl font-bold font-bengali">
                    আপনার অ্যাকাউন্টে অ্যাডমিন অধিকার সক্রিয় করুন
                  </h3>
                  <p className="text-xs text-emerald-100/80 mt-1 max-w-lg">
                    সাইটের ব্রেকিং নোটিশ পরিবর্তন, ওটিপি লগইন কন্ট্রোল এবং পোস্ট পরিচালনা করতে ১-ক্লিকে আপনার অ্যাকাউন্টটি আপগ্রেড করুন।
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRoleToggle}
                  disabled={saving}
                  className="px-6 py-3 bg-accent hover:bg-accent-hover text-slate-950 font-black text-sm rounded-xl shadow-lg transition cursor-pointer shrink-0 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-slate-900" />
                  <span>অ্যাডমিন সক্রিয় করুন</span>
                </button>
              </div>
            )}

            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900 font-bengali flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-brand-700" />
                  <span>পোর্টাল ও সিস্টেম কনফিগারেশন</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  সাইটের নোটিশ বোর্ড, নিরাপত্তা বিকল্প এবং যোগাযোগ তথ্য হালনাগাদ করুন
                </p>
              </div>

              <form onSubmit={handleSaveAdminSettings} className="space-y-6">
                
                {/* Urgent Alert Banner Editor */}
                <div className="p-5 bg-emerald-50/80 rounded-2xl border border-emerald-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-amber-100 text-amber-800 rounded-lg">
                        <Bell className="w-4 h-4" />
                      </span>
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">জরুরি অ্যালার্ট ব্যানার (Urgent Alert Banner)</span>
                        <span className="text-[11px] text-slate-500">ওয়েবসাইটের শীর্ষে চলমান নোটিশ বার সম্পাদনা করুন</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-600">
                        {adminForm.noticeActive ? 'সক্রিয় (Visible)' : 'লুকানো (Hidden)'}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={adminForm.noticeActive}
                          onChange={(e) => setAdminForm({ ...adminForm, noticeActive: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    </div>
                  </div>

                  {/* Preset Templates */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-bold text-slate-400 mr-1">কুইক টেমপ্লেট:</span>
                    <button
                      type="button"
                      onClick={() =>
                        setAdminForm({
                          ...adminForm,
                          noticeText:
                            'পশ্চিমবঙ্গ ও কেন্দ্রীয় সরকারি প্রকল্পের নতুন আবেদন প্রক্রিয়া শুরু হয়েছে। বিস্তারিত নির্দেশিকা পড়তে পোস্টগুলোতে ক্লিক করুন।',
                        })
                      }
                      className="text-[11px] font-semibold bg-white hover:bg-emerald-100/70 text-slate-700 hover:text-emerald-900 px-2.5 py-1 rounded-lg border border-slate-200 transition cursor-pointer"
                    >
                      💡 সরকারি প্রকল্প আবেদন
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setAdminForm({
                          ...adminForm,
                          noticeText:
                            'স্বামী বিবেকানন্দ ও ঐক্যশ্রী স্কলারশিপ ২০২৪-২৫ এর অনলাইন আবেদন শুরু হয়েছে। শেষ তারিখ ৩০ সেপ্টেম্বর।',
                        })
                      }
                      className="text-[11px] font-semibold bg-white hover:bg-emerald-100/70 text-slate-700 hover:text-emerald-900 px-2.5 py-1 rounded-lg border border-slate-200 transition cursor-pointer"
                    >
                      📢 স্কলারশিপ আবেদন শুরু
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setAdminForm({
                          ...adminForm,
                          noticeText:
                            'সার্ভার সাময়িক রক্ষণাবেক্ষণের কাজ চলছে। যেকোনো নাগরিক সেবা পেতে আমাদের হেল্পলাইনে যোগাযোগ করুন।',
                        })
                      }
                      className="text-[11px] font-semibold bg-white hover:bg-emerald-100/70 text-slate-700 hover:text-emerald-900 px-2.5 py-1 rounded-lg border border-slate-200 transition cursor-pointer"
                    >
                      ⚠️ রক্ষণাবেক্ষণ সতর্কতা
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    placeholder="ওয়েবসাইটের শীর্ষে দেখানোর জন্য জরুরি ঘোষণা বা অ্যালার্ট টেক্সট লিখুন..."
                    value={adminForm.noticeText}
                    onChange={(e) => setAdminForm({ ...adminForm, noticeText: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-white border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 text-slate-900 shadow-sm"
                  />

                  {/* Live Preview Box */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      লাইভ প্রিভিউ (ওয়েবসাইটের হেডারে যেমন দেখাবে):
                    </span>
                    <div className="bg-[#072816] text-white py-2 px-3 rounded-xl border border-emerald-900/80 flex items-center gap-2 shadow-inner">
                      <span className="bg-amber-500 text-slate-950 font-bold px-1.5 py-0.5 rounded text-[10px] flex items-center gap-1 shrink-0">
                        <Bell className="w-3 h-3 animate-pulse text-slate-950" />
                        <span>Urgent:</span>
                      </span>
                      <span className="truncate text-slate-200 font-normal text-xs">
                        {adminForm.noticeText || 'কোনো নোটিশ টেক্সট দেওয়া নেই'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Site General Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">পোর্টাল শিরোনাম (Site Name)</label>
                    <input
                      type="text"
                      value={adminForm.siteName}
                      onChange={(e) => setAdminForm({ ...adminForm, siteName: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ট্যাগলাইন (Tagline)</label>
                    <input
                      type="text"
                      value={adminForm.siteTagline}
                      onChange={(e) => setAdminForm({ ...adminForm, siteTagline: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>
                </div>

                {/* Security & Authentication Controls */}
                <div className="pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    নিরাপত্তা ও অথ সেটিংস
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={adminForm.allowOtpLogin}
                        onChange={(e) => setAdminForm({ ...adminForm, allowOtpLogin: e.target.checked })}
                        className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                      />
                      <span className="text-xs font-semibold text-slate-700">ইমেইল ওটিপি লগইন সক্রিয়</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={adminForm.allowRegistration}
                        onChange={(e) => setAdminForm({ ...adminForm, allowRegistration: e.target.checked })}
                        className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                      />
                      <span className="text-xs font-semibold text-slate-700">নতুন ইউজার রেজিস্ট্রেশন</span>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={adminForm.requireEmailVerification}
                        onChange={(e) => setAdminForm({ ...adminForm, requireEmailVerification: e.target.checked })}
                        className="w-4 h-4 text-brand-600 rounded border-slate-300 focus:ring-brand-500"
                      />
                      <span className="text-xs font-semibold text-slate-700">ইমেইল ওটিপি যাচাই বাধ্য</span>
                    </label>
                  </div>
                </div>

                {/* Contact Helpline & Support */}
                <div className="pt-2 border-t border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    যোগাযোগ ও হেল্পলাইন লিঙ্ক
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">সাপোর্ট ইমেইল</label>
                      <input
                        type="email"
                        value={adminForm.supportEmail}
                        onChange={(e) => setAdminForm({ ...adminForm, supportEmail: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">হেল্পলাইন ফোন</label>
                      <input
                        type="text"
                        value={adminForm.supportPhone}
                        onChange={(e) => setAdminForm({ ...adminForm, supportPhone: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">অফিশিয়াল হোয়াটসঅ্যাপ লিঙ্ক</label>
                      <input
                        type="url"
                        value={adminForm.whatsappLink}
                        onChange={(e) => setAdminForm({ ...adminForm, whatsappLink: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">ফেসবুক পেজ লিঙ্ক</label>
                      <input
                        type="url"
                        value={adminForm.facebookLink}
                        onChange={(e) => setAdminForm({ ...adminForm, facebookLink: e.target.value })}
                        className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                      />
                    </div>
                  </div>
                </div>

                {/* System Maintenance & Data Tools */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleExportData}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5 text-slate-600" />
                      <span>ডাটা ব্যাকআপ ডাউনলোড (.JSON)</span>
                    </button>
                    <Link
                      to="/admin/dashboard"
                      className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>অ্যাডমিন ড্যাশবোর্ডে যান</span>
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 disabled:opacity-60 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-md transition cursor-pointer ml-auto"
                  >
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    <span>অ্যাডমিন সেটিংস সংরক্ষণ করুন</span>
                  </button>
                </div>

              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
