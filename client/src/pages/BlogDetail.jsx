import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Eye, 
  Bookmark, 
  Share2, 
  MessageSquare, 
  Send, 
  ThumbsUp,
  Check,
  Copy
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/blog/BlogCard';

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { posts } = useApp();
  const { toggleBookmark, isBookmarked } = useAuth();

  const [copied, setCopied] = useState(false);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  // Comment state
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'প্রণব দাস',
      date: 'আজকে দুপুর ২:১৫',
      text: 'অনেক তথ্যবহুল ও সহজবোধ্য আর্টিকেল। স্টেপগুলো ফলো করে আমার কাজ হয়ে গেছে। ধন্যবাদ Open Concept Bangla কে!'
    },
    {
      id: 2,
      name: 'সৌরভ ভৌমিক',
      date: 'গতকাল সন্ধ্যা ৬:০০',
      text: 'মোবাইল থেকে কীভাবে আবেদন করব বুঝতে পারছিলাম না, এই গাইডটি পেয়ে খুব সুবিধা হলো।'
    }
  ]);

  const post = posts.find((p) => p.slug === slug) || posts[0];
  const bookmarked = post ? isBookmarked(post.id) : false;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
    }
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (commentName.trim() && commentText.trim()) {
      setComments([
        {
          id: Date.now(),
          name: commentName.trim(),
          date: 'এইমাত্র',
          text: commentText.trim()
        },
        ...comments
      ]);
      setCommentText('');
      setCommentName('');
    }
  };

  const relatedPosts = posts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);

  if (!post) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-bold">পোস্টটি পাওয়া যায়নি</h2>
        <Link to="/" className="text-brand-700 underline mt-4 inline-block">হোম পেজে ফিরুন</Link>
      </div>
    );
  }

  return (
    <article className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs & Back */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-500">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 font-semibold text-brand-700 hover:text-brand-800"
          >
            <ArrowLeft className="w-4 h-4" /> ফিরে যান
          </button>
          <div className="flex items-center gap-1.5">
            <Link to="/" className="hover:text-brand-700">হোম</Link>
            <span>/</span>
            <Link to={`/category/${post.category}`} className="hover:text-brand-700">{post.categoryName}</Link>
          </div>
        </div>

        {/* Main Content Box */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-10 mb-10">
          
          {/* Header Info */}
          <div className="mb-6">
            <span className="inline-block bg-brand-50 text-brand-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
              {post.categoryName}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4 font-bengali">
              {post.title}
            </h1>

            {/* Author & Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <p className="font-bold text-slate-800 text-sm">{post.author.name}</p>
                  <p className="text-[11px] text-slate-400">{post.author.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {post.publishedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {post.readingTime}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  {(post.views + likes).toLocaleString('bn-BD')}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/9] bg-slate-100 shadow-sm">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Excerpt Box */}
          <div className="bg-emerald-50/70 border-l-4 border-brand-600 p-4 rounded-r-xl text-slate-700 text-sm sm:text-base font-medium mb-8 leading-relaxed">
            {post.excerpt}
          </div>

          {/* Post Content Body */}
          <div className="prose prose-slate max-w-none font-bengali text-slate-800 leading-relaxed space-y-5 text-base">
            <div dangerouslySetInnerHTML={{ 
              __html: post.content
                .replace(/### (.*?)\n/g, '<h3 class="text-xl font-bold text-slate-900 mt-6 mb-2">$1</h3>')
                .replace(/\* (.*?)\n/g, '<li class="ml-4 list-disc text-slate-700">$1</li>')
                .replace(/(\d+)\. (.*?)\n/g, '<li class="ml-4 list-decimal text-slate-700">$2</li>')
                .replace(/\n\n/g, '<p class="my-3 text-slate-700 leading-relaxed"></p>')
            }} />
          </div>

          {/* Tags */}
          {post.tags && (
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400">ট্যাগসমূহ:</span>
              {post.tags.map((tag, i) => (
                <Link
                  key={i}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="text-xs bg-slate-100 hover:bg-brand-50 text-slate-600 hover:text-brand-700 px-3 py-1 rounded-lg transition"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {/* Social Share & Action Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            
            {/* Like & Bookmark */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  hasLiked 
                    ? 'bg-brand-50 text-brand-700 border border-brand-300' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <ThumbsUp className={`w-4 h-4 ${hasLiked ? 'fill-brand-700' : ''}`} />
                <span>উপকারী লেগেছে ({post.likes + likes})</span>
              </button>

              <button
                onClick={() => toggleBookmark(post.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
                  bookmarked 
                    ? 'bg-accent text-slate-950 shadow-sm' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-slate-950' : ''}`} />
                <span>{bookmarked ? 'সংরক্ষিত' : 'বুকমার্ক করুন'}</span>
              </button>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 mr-1 flex items-center gap-1">
                <Share2 className="w-3.5 h-3.5" /> শেয়ার করুন:
              </span>
              
              <button
                onClick={handleCopyLink}
                className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition"
                title="লিংক কপি করুন"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copied ? 'কপি হয়েছে' : 'লিংক'}</span>
              </button>

              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
              >
                WhatsApp
              </a>
            </div>

          </div>

        </div>

        {/* Comments Section */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-10">
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-slate-100">
            <MessageSquare className="w-5 h-5 text-brand-600" />
            <h3 className="text-xl font-bold text-slate-900 font-bengali">
              মন্তব্য ও প্রতিক্রিয়া ({comments.length})
            </h3>
          </div>

          {/* New Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="আপনার নাম লিখুন..."
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                className="px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
            </div>
            <textarea
              required
              rows={3}
              placeholder="আপনার মতামত বা প্রশ্ন লিখুন..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition"
            >
              <Send className="w-3.5 h-3.5" /> মন্তব্য প্রকাশ করুন
            </button>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {comments.map((comm) => (
              <div key={comm.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-sm text-slate-800">{comm.name}</span>
                  <span className="text-[11px] text-slate-400">{comm.date}</span>
                </div>
                <p className="text-sm text-slate-600 font-normal">{comm.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 mb-6 font-bengali">
              সম্পর্কিত অন্যান্য পোস্ট
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
