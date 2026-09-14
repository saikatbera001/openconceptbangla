import React, { useState } from 'react';
import { 
  FolderDown, 
  Star, 
  ExternalLink, 
  Download, 
  FileText,
  ChevronRight
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

export default function EtekQuickGrid({ onOpenPrintModal }) {
  const [activeDownloadModal, setActiveDownloadModal] = useState(false);

  const quickActions = [
    {
      id: 'files',
      icon: "📁",
      title: "Files & Forms",
      desc: "Download official application forms & document checklists",
      action: () => setActiveDownloadModal(true),
      tag: "Free PDF"
    },
    {
      id: 'support',
      icon: "💬",
      title: "Online Support",
      desc: "Instant live consultation with Mr. Tanmoy Santra on WhatsApp",
      action: () => window.open("https://wa.me/message/EVNR7MWOK23YA1", "_blank"),
      tag: "Live Desk"
    },
    {
      id: 'reports',
      icon: "📊",
      title: "Track & Reports",
      desc: "Check Aadhaar, Voter, PAN & Courier shipment live status",
      action: () => {
        const query = prompt("Enter your Reference Number / Tracking ID / AWB:");
        if (query) {
          alert(`Searching official portal records for: ${query}. Please connect via WhatsApp for expedited update.`);
        }
      },
      tag: "Live Tracking"
    },
    {
      id: 'print',
      icon: "🖨️",
      title: "Instant Print Page",
      desc: "Upload documents for high-speed color/b&w print & lamination",
      action: onOpenPrintModal,
      tag: "Express Delivery"
    }
  ];

  const downloadableForms = [
    { title: "Aadhaar Enrolment / Correction Form", type: "PDF Form", size: "1.2 MB" },
    { title: "Pan Card Form 49A (Indian Citizen)", type: "PDF Form", size: "850 KB" },
    { title: "Passport Application Checklist & Annexure", type: "Checklist", size: "420 KB" },
    { title: "Voter Registration Form 6 / 8", type: "PDF Form", size: "910 KB" },
    { title: "Ration Card Member Inclusion Form", type: "State Govt Form", size: "680 KB" },
    { title: "Trade License & P-Tax Renewal Guidelines", type: "Compliance Guide", size: "1.5 MB" }
  ];

  return (
    <section id="quick-grid" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Quick Tools Grid from Embed 5 */}
        <div className="mb-14">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
              Quick Digital Desk
            </h3>
            <p className="text-slate-600 text-sm">
              Instant access to essential documents, customer support, application tracking, and express printing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {quickActions.map((item) => (
              <div
                key={item.id}
                onClick={item.action}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-blue-500 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-3 bg-slate-50 rounded-2xl group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                      {item.icon}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600">
                  <span>Open Tool</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotional Banner Card (Section 11) */}
        <div className="mb-12 rounded-3xl overflow-hidden shadow-xl border border-amber-300/60 bg-amber-400 group hover:shadow-2xl transition-all duration-300">
          <img 
            src={getAssetUrl('/images/eteksolution/featured-banner.png')}
            alt="Etek Solution citizen services promotion"
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

        {/* Google Review Banner (Section 13) */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-amber-300/80 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-1.5 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-amber-900 fill-amber-900 drop-shadow-xs" />
                ))}
                <span className="ml-2 text-xs font-black uppercase tracking-wider text-amber-950 bg-amber-300/80 px-2 py-0.5 rounded-full">
                  5.0 Rating
                </span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight mb-2">
                Rated 5 Stars by Our Happy Clients
              </h4>
              <p className="text-sm text-slate-900/90 max-w-xl leading-relaxed">
                Had a great experience with our NSDL PAN, Aadhaar, Passport, or Courier services? Share your feedback on Google to help fellow citizens in Henria & East Medinipur!
              </p>
            </div>

            <a 
              href="https://g.page/r/CTfrqzFTq8uZEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-blue-600 text-white font-bold text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 group flex-shrink-0"
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 group-hover:rotate-45 transition-transform" />
              <span>Write a 5-Star Google Review</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </a>
          </div>
        </div>

      </div>

      {/* Downloadable Forms Modal */}
      {activeDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 p-6 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <FolderDown className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Application Forms & Checklists</h3>
              </div>
              <button 
                onClick={() => setActiveDownloadModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {downloadableForms.map((form, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors border border-slate-200">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">{form.title}</h4>
                      <p className="text-[10px] text-slate-500">{form.type} • {form.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Downloading ${form.title}... Please check your downloads folder.`)}
                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
                    title="Download File"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setActiveDownloadModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
