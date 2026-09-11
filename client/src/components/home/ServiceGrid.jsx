import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Banknote, 
  Vote, 
  Sprout, 
  GraduationCap, 
  CreditCard, 
  FileCheck, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { SERVICE_SHORTCUTS } from '../../data/dummyData';

const iconMap = {
  Banknote: Banknote,
  Vote: Vote,
  Sprout: Sprout,
  GraduationCap: GraduationCap,
  CreditCard: CreditCard,
  FileCheck: FileCheck,
};

export default function ServiceGrid() {
  return (
    <section className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-brand-700 font-bold text-sm mb-1 uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-600"></span>
              জনপ্রিয় ডিজিটাল সেবা ও সরকারি প্রকল্প
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-bengali">
              প্রয়োজনীয় সার্ভিস এবং সরাসরি নির্দেশিকা
            </h2>
          </div>
          <Link
            to="/blogs"
            className="text-sm font-semibold text-brand-700 hover:text-brand-800 flex items-center gap-1 group"
          >
            <span>সবগুলো দেখুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICE_SHORTCUTS.map((svc, idx) => {
            const IconComponent = iconMap[svc.icon] || Banknote;
            return (
              <Link
                key={idx}
                to={`/blog/${svc.slug}`}
                className="group p-5 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-500 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 group-hover:bg-brand-600 text-brand-700 group-hover:text-white flex items-center justify-center transition-colors">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold text-white px-2.5 py-0.5 rounded-full ${svc.badgeColor}`}>
                      {svc.badge}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-slate-400 block mb-1">
                    {svc.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-700 transition-colors mb-1 font-bengali">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-normal">
                    {svc.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-700 group-hover:text-brand-800">
                  <span>সম্পূর্ণ গাইড পড়ুন</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
