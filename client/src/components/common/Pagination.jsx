import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  // Generate responsive page list with ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    pages.push(1);

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pages.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    pages.push(totalPages);
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav className="flex items-center justify-center flex-wrap gap-1.5 sm:gap-2 my-8 px-2" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 shadow-sm min-w-[36px] min-h-[36px] justify-center"
        title="পূর্ববর্তী পাতা"
        aria-label="পূর্ববর্তী পাতা"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline text-xs font-semibold">আগেরটি</span>
      </button>

      <div className="flex items-center gap-1 sm:gap-1.5">
        {pages.map((item, index) => {
          if (item === '...') {
            return (
              <span key={`dots-${index}`} className="w-7 h-9 flex items-center justify-center text-slate-400 font-bold text-xs">
                ...
              </span>
            );
          }

          const pageNum = item;
          const isActive = currentPage === pageNum;

          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl font-bold text-xs sm:text-sm transition shadow-sm ${
                isActive
                  ? 'bg-brand-700 text-white shadow-brand-700/20 shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition flex items-center gap-1 shadow-sm min-w-[36px] min-h-[36px] justify-center"
        title="পরবর্তী পাতা"
        aria-label="পরবর্তী পাতা"
      >
        <span className="hidden sm:inline text-xs font-semibold">পরেরটি</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}
