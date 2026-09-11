import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-brand-700 bg-brand-50 px-3 py-1 rounded-full uppercase tracking-wider">
            সরাসরি যোগাযোগ
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-3 font-bengali">
            আমাদের সাথে যোগাযোগ করুন
          </h1>
          <p className="text-sm text-slate-500">
            যেকোনো প্রশ্ন, তথ্য সংশোধন, নতুন প্রকল্পের আপডেট বা সহায়তার জন্য আমাদের মেসেজ পাঠান।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-bengali">ইমেইল সহায়তা</h4>
                <p className="text-xs text-slate-400 mt-0.5">যেকোনো মতামত ও অনুসন্ধানে লিখুন</p>
                <a href="mailto:support@openconceptbangla.com" className="text-sm font-semibold text-brand-700 hover:underline mt-1 block">
                  support@openconceptbangla.com
                </a>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-bengali">হেল্পডেস্ক সাপোর্ট</h4>
                <p className="text-xs text-slate-400 mt-0.5">সোম থেকে শুক্র (সকাল ১০টা - সন্ধ্যা ৬টা)</p>
                <p className="text-sm font-semibold text-slate-700 mt-1">
                  +৯১ ৯৮৭৬৫ ৪৩২১০
                </p>
              </div>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 font-bengali">অফিসিয়াল অবস্থান</h4>
                <p className="text-xs text-slate-400 mt-0.5">কলকাতা, পশ্চিমবঙ্গ, ভারত</p>
                <p className="text-sm font-medium text-slate-600 mt-1">
                  সল্টলেক সেক্টর ৫, কলকাতা - ৭০০০৯১
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-bengali flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-brand-600" />
              <span>মেসেজ পাঠান</span>
            </h3>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-3 text-emerald-800 animate-fadeIn">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-base">আপনার বার্তা সফলভাবে পাঠানো হয়েছে!</h4>
                  <p className="text-xs text-emerald-700 mt-0.5">আমাদের টিম দ্রুত আপনার ইমেইলে যোগাযোগ করবে।</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">আপনার নাম *</label>
                    <input
                      type="text"
                      required
                      placeholder="শুভঙ্কর পাল"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">ইমেইল ঠিকানা *</label>
                    <input
                      type="email"
                      required
                      placeholder="shuvankar@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">বিষয় (Subject)</label>
                  <input
                    type="text"
                    placeholder="যেমন: লক্ষ্মীর ভাণ্ডার আবেদন বিষয়ক তথ্য"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">বিস্তারিত বার্তা *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="আপনার বার্তা বা প্রশ্ন লিখুন..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition"
                >
                  <Send className="w-4 h-4" />
                  <span>মেসেজ পাঠান</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
