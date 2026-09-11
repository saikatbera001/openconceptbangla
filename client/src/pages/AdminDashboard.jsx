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
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';

export default function AdminDashboard() {
  const { user, isAdmin, logout, login } = useAuth();
  const { posts, categories, addPost, deletePost } = useApp();

  const [activeTab, setActiveTab] = useState('posts');
  const [showCreateModal, setShowCreateModal] = useState(false);

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
          <button
            onClick={() => login('admin@openconceptbangla.com', 'admin12345')}
            className="w-full py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span>১-ক্লিকে অ্যাডমিন এক্সেস সক্রিয় করুন</span>
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
      <div className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="p-2 rounded-xl bg-brand-600 text-white font-bold text-xs">
            OCB ADMIN
          </span>
          <div>
            <h1 className="text-lg font-bold">অ্যাডমিন ম্যানেজমেন্ট পোর্টাল</h1>
            <p className="text-xs text-slate-400">Open Concept Bangla • v1.0.0 MERN Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <span className="hidden sm:inline text-slate-300">স্বাগতম, <strong>{user?.name}</strong></span>
          <Link to="/" className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400">
            ওয়েবসাইট প্রিভিউ
          </Link>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold"
          >
            <LogOut className="w-4 h-4" /> লগআউট
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Metric Cards Grid (Matching Section 17 Specification) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">মোট পোস্ট (Posts)</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono">{posts.length}</h3>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">সবগুলো লাইভ</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">রেজিস্টার্ড ইউজার</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono">850</h3>
              <p className="text-[11px] text-brand-600 font-semibold mt-1">+12% এই মাসে</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">সাবস্ক্রাইবার্স</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono">2,400</h3>
              <p className="text-[11px] text-blue-600 font-semibold mt-1">সক্রিয় পাঠক</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Mail className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">নতুন বার্তা</p>
              <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono">18</h3>
              <p className="text-[11px] text-amber-600 font-semibold mt-1">৩টি অপঠিত</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-2 overflow-x-auto text-sm">
          <button
            onClick={() => setActiveTab('posts')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'posts' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            পোস্ট ম্যানেজমেন্ট ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'categories' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            ক্যাটাগরি সমূহ ({categories.length})
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'subscribers' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            নিউজলেটার সাবস্ক্রাইবার্স
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl font-bold transition ${
              activeTab === 'messages' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            যোগাযোগ বার্তা (ইনবক্স)
          </button>
        </div>

        {/* Tab 1: Posts Management */}
        {activeTab === 'posts' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
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
              <table className="w-full text-left text-sm text-slate-600">
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

      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-fadeIn">
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
