import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Bookmark, Eye, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function BlogCard({ post }) {
  const { toggleBookmark, isBookmarked } = useAuth();
  const bookmarked = isBookmarked(post.id);

  return (
    <article className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
      
      <div>
        {/* Card Image & Overlay */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
          
          {/* Category Pill */}
          <span className="absolute top-3 left-3 bg-brand-800/90 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow">
            {post.categoryName}
          </span>

          {/* Bookmark Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleBookmark(post.id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
              bookmarked 
                ? 'bg-accent text-slate-950 shadow-md scale-105' 
                : 'bg-black/40 text-white hover:bg-white hover:text-slate-900'
            }`}
            title={bookmarked ? "বুকমার্ক মুছে ফেলুন" : "বুকমার্ক করুন"}
          >
            <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-slate-950' : ''}`} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5">
          {/* Meta Info */}
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {post.publishedDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {post.readingTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors line-clamp-2 mb-2 leading-snug font-bengali">
            <Link to={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Footer: Author & Views */}
      <div className="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-100 mt-2 text-xs text-slate-500">
        <div className="flex items-center gap-2 pt-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-6 h-6 rounded-full object-cover border border-slate-200"
          />
          <span className="font-medium text-slate-700">{post.author.name}</span>
        </div>

        <div className="flex items-center gap-3 pt-3">
          <span className="flex items-center gap-1 text-slate-400">
            <Eye className="w-3.5 h-3.5" />
            {post.views.toLocaleString('bn-BD')}
          </span>
          <Link
            to={`/blog/${post.slug}`}
            className="text-brand-700 hover:text-brand-800 p-1 rounded-full hover:bg-brand-50"
            title="বিস্তারিত পড়ুন"
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </article>
  );
}
