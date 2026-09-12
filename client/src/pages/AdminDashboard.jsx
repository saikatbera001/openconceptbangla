import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  FileText, 
  Users, 
  Mail, 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  Layers, 
  BarChart3, 
  LogOut, 
  X, 
  Sparkles,
  Sliders,
  Bell,
  Save,
  Settings as SettingsIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { user, isAdmin, logout, login, toggleAdminRole, siteSettings, updateSiteSettings } = useAuth();
  const { posts, categories, addPost, deletePost, notice, noticeActive, updateUrgentNotice } = useApp();

  const [activeTab, setActiveTab] = useState('posts');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const [adminSettingsForm, setAdminSettingsForm] = useState({
    siteName: siteSettings?.siteName || 'Open Concept Bangla',
    noticeText: notice || siteSettings?.noticeText || 'পশ্চিমবঙ্গ ও কেন্দ্রীয় সরকারি প্রকল্পের নতুন আবেদন প্রক্রিয়া শুরু হয়েছে। বিস্তারিত নির্দেশিকা পড়তে পোস্টগুলোতে ক্লিক করুন।',
    noticeActive: noticeActive ?? siteSettings?.noticeActive ?? true,
    allowOtpLogin: siteSettings?.allowOtpLogin ?? true,
    allowRegistration: siteSettings?.allowRegistration ?? true,
    supportEmail: siteSettings?.supportEmail || 'contact@openconceptbangla.com',
    supportPhone: siteSettings?.supportPhone || '+91 98765 43210',
  });

  React.useEffect(() => {
    if (notice !== undefined) {
      setAdminSettingsForm(prev => ({
        ...prev,
        noticeText: notice,
        noticeActive: noticeActive
      }));
    }
  }, [notice, noticeActive]);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('govt-schemes');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900');
  const [newTags, setNewTags] = useState('সরকারি প্রকল্প, আপডেট');

  // Contact messages demo list
  const [messages, setMessages] = useState([
    { id: 1, name: 'সুমন দাস', email: 'suman@gmail.com', subject: 'লক্ষ্মীর ভাণ্ডার টাকা ঢুকছে না', date: '১১ সেপ্টেম্বর', status: 'unread' },
    { id: 2, name: 'রীতা রায়', email: 'rita@yahoo.com', subject: 'নতুন ভোটার কার্ড ফর্ম ৬ হেল্প', date: '১০ সেপ্টেম্বর', status: 'read' },
    { id: 3, name: 'অনিল মাহাতো', email: 'anil@live.com', subject: 'কৃষক বন্ধু স্ট্যাটাস চেক সংক্রান্ত', date: '০৮ সেপ্টেম্বর', status: 'read' },
  ]);

  // Subscribers demo list
  const [subscribers, setSubscribers] = useState([
    { id: 1, email: 'rahul.bengal@gmail.com', date: '১১ সেপ্টেম্বর, ২০২৪', status: 'Active' },
    { id: 2, email: 'ananya.sarkar@yahoo.com', date: '১০ সেপ্টেম্বর, ২০২৪', status: 'Active' },
    { id: 3, email: 'sourav.kolkata@outlook.com', date: '০৯ সেপ্টেম্বর, ২০২৪', status: 'Active' },
    { id: 4, email: 'tanmoy_csc@gmail.com', date: '০৮ সেপ্টেম্বর, ২০২৪', status: 'Active' },
  ]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newExcerpt.trim()) return;

    const matchedCat = categories.find(c => c.slug === newCategory);

    addPost({
      title: newTitle,
      category: newCategory,
      categoryName: matchedCat ? matchedCat.nameBn : 'সরকারি সেবা',
      excerpt: newExcerpt,
      content: newContent || `### ${newTitle}\nএই বিষয়ে বিস্তারিত তথ্য খুব শীঘ্রই হালনাগাদ করা হবে।`,
      featuredImage: newImage,
      tags: newTags.split(',').map(t => t.trim()),
      author: {
        name: user?.name || 'অ্যাডমিন',
        role: 'সিস্টেম অ্যাডমিনিস্ট্রেটর',
        avatar: user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
      }
    });

    // Reset form
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
    setShowCreateModal(false);
  };

  // If visitor is not logged in as admin, show login gate
  if (!isAdmin) {
    return (
      <div className="bg-slate-100 min-h-[85vh] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-bengali">
            অ্যাডমিন প্যানেল এক্সেস সংরক্ষিত
          </h2>
          <p className="text-xs text-slate-500 mt-2 mb-6">
            ড্যাশবোর্ড ব্যবহারের জন্য অ্যাডমিন পারমিশনযুক্ত অ্যাকাউন্টে লগইন করতে হবে।
          </p>
          {user && (
            <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600">
              বর্তমান অ্যাকাউন্ট: <strong className="text-slate-800">{user.email}</strong>
            </div>
          )}
          <button
            onClick={() => user ? toggleAdminRole() : login('admin@openconceptbangla.com', 'admin12345')}
            className="w-full py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>{user ? '১-ক্লিকে এই অ্যাকাউন্টে অ্যাডমিন পারমিশন দিন' : '১-ক্লিকে অ্যাডমিন এক্সেস সক্রিয় করুন'}</span>
          </button>
          <Link to="/" className="text-xs font-semibold text-slate-500 hover:underline mt-4 block">
            ওয়েবসাইটে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen">
      
      {/* Top Admin Header */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-brand-600 text-white font-bold text-xs">
            OCB ADMIN
          </span>
          <div>
            <h1 className="text-base sm:text-lg font-bold">অ্যাডমিন ম্যানেজমেন্ট পোর্টাল</h1>
            <p className="text-[11px] text-slate-400">Open Concept Bangla • v1.0.0 MERN Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs self-end sm:self-auto">
          <span className="hidden sm:inline text-slate-300">স্বাগতম, <strong>{user?.name}</strong></span>
          <Link to="/" className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400">
            ওয়েবসাইট প্রিভিউ
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold px-2 py-1 rounded-lg hover:bg-slate-800"
          >
            <LogOut className="w-4 h-4" /> লগআউট
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 mb-8">
          
          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">মোট পোস্ট (Posts)</p>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-mono">{posts.length}</h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">সবগুলো লাইভ</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">রেজিস্টার্ড ইউজার</p>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-mono">850</h3>
              <p className="text-[11px] text-brand-600 font-semibold mt-1">+12% এই মাসে</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">সাবস্ক্রাইবার্স</p>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-mono">2,400</h3>
              <p className="text-[11px] text-blue-600 font-semibold mt-1">সক্রিয় পাঠক</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">নতুন বার্তা</p>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-mono">18</h3>
              <p className="text-[11px] text-amber-600 font-semibold mt-1">৩টি অপঠিত</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2 overflow-x-auto text-sm no-scrollbar">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap shrink-0 transition ${
              activeTab === 'posts' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            পোস্ট ম্যানেজমেন্ট ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap shrink-0 transition ${
              activeTab === 'categories' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            ক্যাটাগরি সমূহ ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap shrink-0 transition ${
              activeTab === 'subscribers' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            নিউজলেটার সাবস্ক্রাইবার্স
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap shrink-0 transition ${
              activeTab === 'messages' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            যোগাযোগ বার্তা (ইনবক্স)
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap shrink-0 transition flex items-center gap-1.5 ${
              activeTab === 'settings' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>অ্যাডমিন ও সাইট সেটিংস</span>
          </button>
        </div>

        {/* Tab 1: Posts Management */}
        {activeTab === 'posts' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-bengali">সকল নিবন্ধ তালিকা</h3>
                <p className="text-xs text-slate-500">আর্টিকেল প্রকাশ, সম্পাদনা এবং ডিলিট করুন</p>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition"
              >
                <Plus className="w-4 h-4" /> নতুন পোস্ট তৈরি করুন
              </button>
            </div>

            {/* Posts Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600 min-w-[560px]">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4">শিরোনাম</th>
                    <th className="py-3 px-4">ক্যাটাগরি</th>
                    <th className="py-3 px-4">তারিখ</th>
                    <th className="py-3 px-4">ভিউস</th>
                    <th className="py-3 px-4 text-right">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 max-w-sm truncate font-bengali">
                        {post.title}
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold">
                          {post.categoryName}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-400">{post.publishedDate}</td>
                      <td className="py-3.5 px-4 text-xs font-mono">{post.views.toLocaleString('bn-BD')}</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/blog/${post.slug}`}
                            className="p-1.5 text-slate-400 hover:text-brand-700 rounded-lg hover:bg-slate-100"
                            title="লাইভ দেখুন"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => deletePost(post.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                            title="পোস্ট মুছুন"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Categories */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 font-bengali">ক্যাটাগরি তালিকা</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div key={cat.slug} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-900 font-bengali">{cat.nameBn}</h4>
                    <p className="text-xs text-slate-400">Slug: /{cat.slug}</p>
                  </div>
                  <span className="text-xs font-bold bg-white px-2.5 py-1 rounded-full border border-slate-200">
                    {cat.count} পোস্ট
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Subscribers */}
        {activeTab === 'subscribers' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 font-bengali">নিউজলেটার সাবস্ক্রাইবার তালিকা</h3>
            <div className="divide-y divide-slate-100">
              {subscribers.map((sub) => (
                <div key={sub.id} className="py-3 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-bold text-slate-800 font-mono">{sub.email}</p>
                    <p className="text-xs text-slate-400">{sub.date}</p>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {sub.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Messages */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4 font-bengali">ইনবক্স বার্তা</h3>
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{msg.name}</h4>
                      <span className="text-xs text-slate-400">&lt;{msg.email}&gt;</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-1">{msg.subject}</p>
                  </div>
                  <span className="text-xs text-slate-400">{msg.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Admin & Portal Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-bengali flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-brand-700" />
                  <span>পোর্টাল ও সাইট সেটিংস</span>
                </h3>
                <p className="text-xs text-slate-500">জরুরি নোটিশ ব্যানার, নিরাপত্তা এবং পোর্টাল কনফিগারেশন</p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/settings"
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition flex items-center gap-1"
                >
                  <SettingsIcon className="w-3.5 h-3.5" />
                  <span>সম্পূর্ণ সেটিংস পেজ</span>
                </Link>
                <button
                  type="button"
                  onClick={() => toggleAdminRole()}
                  className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-xl transition cursor-pointer border border-amber-200"
                >
                  ইউজার মোডে যান
                </button>
              </div>
            </div>

            {settingsSaved && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>সাইট সেটিংস সফলভাবে আপডেট ও সংরক্ষিত হয়েছে!</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateSiteSettings(adminSettingsForm);
                updateUrgentNotice(adminSettingsForm.noticeText, adminSettingsForm.noticeActive);
                setSettingsSaved(true);
                setTimeout(() => setSettingsSaved(false), 3000);
              }}
              className="space-y-6"
            >
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
                      {adminSettingsForm.noticeActive ? 'সক্রিয় (Visible)' : 'লুকানো (Hidden)'}
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={adminSettingsForm.noticeActive}
                        onChange={(e) =>
                          setAdminSettingsForm({ ...adminSettingsForm, noticeActive: e.target.checked })
                        }
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
                      setAdminSettingsForm({
                        ...adminSettingsForm,
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
                      setAdminSettingsForm({
                        ...adminSettingsForm,
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
                      setAdminSettingsForm({
                        ...adminSettingsForm,
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
                  value={adminSettingsForm.noticeText}
                  onChange={(e) =>
                    setAdminSettingsForm({ ...adminSettingsForm, noticeText: e.target.value })
                  }
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
                      {adminSettingsForm.noticeText || 'কোনো নোটিশ টেক্সট দেওয়া নেই'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Site Name and Tagline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">সাইটের নাম</label>
                  <input
                    type="text"
                    value={adminSettingsForm.siteName}
                    onChange={(e) =>
                      setAdminSettingsForm({ ...adminSettingsForm, siteName: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">সাপোর্ট ইমেইল</label>
                  <input
                    type="email"
                    value={adminSettingsForm.supportEmail}
                    onChange={(e) =>
                      setAdminSettingsForm({ ...adminSettingsForm, supportEmail: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={adminSettingsForm.allowOtpLogin}
                    onChange={(e) =>
                      setAdminSettingsForm({ ...adminSettingsForm, allowOtpLogin: e.target.checked })
                    }
                    className="w-4 h-4 text-brand-600 rounded border-slate-300"
                  />
                  <span className="text-xs font-semibold text-slate-700">ইমেইল ওটিপি দিয়ে লগইন সক্রিয় রাখুন</span>
                </label>

                <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={adminSettingsForm.allowRegistration}
                    onChange={(e) =>
                      setAdminSettingsForm({ ...adminSettingsForm, allowRegistration: e.target.checked })
                    }
                    className="w-4 h-4 text-brand-600 rounded border-slate-300"
                  />
                  <span className="text-xs font-semibold text-slate-700">নতুন ইউজার রেজিস্ট্রেশন উন্মুক্ত রাখুন</span>
                </label>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl flex items-center gap-2 shadow-md transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>সেটিংস সেভ করুন</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-8 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 font-bengali">নতুন আর্টিকেল তৈরি করুন</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">আর্টিকেল শিরোনাম *</label>
                <input
                  type="text"
                  required
                  placeholder="যেমন: পশ্চিমবঙ্গ খাদ্যসাথী কার্ড আবেদন পদ্ধতি..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 font-bengali"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ক্যাটাগরি</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  >
                    {categories.map((c) => (
                      <option key={c.slug} value={c.slug}>{c.nameBn}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">ট্যাগসমূহ (কমা দিয়ে)</label>
                  <input
                    type="text"
                    value={newTags}
                    onChange={(e) => setNewTags(e.target.value)}
                    className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">ফিচার্ড ইমেজ URL</label>
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">সংক্ষিপ্ত বিবরণ (Excerpt) *</label>
                <textarea
                  required
                  rows={2}
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  placeholder="পোস্টের সারসংক্ষেপ লিখুন..."
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 font-bengali"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">সম্পূর্ণ কন্টেন্ট</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="### মূল তথ্যসমূহ\nএখানে বিস্তারিত নির্দেশিকা লিখুন..."
                  className="w-full px-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600 font-bengali"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow"
                >
                  পোস্ট প্রকাশ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
