import React from 'react';
import { X, CheckCircle, MessageSquare, Phone, FileCheck, ArrowRight, ShieldCheck } from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';

export default function EtekServiceModal({ service, onClose }) {
  if (!service) return null;

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello E-Tek Solution! I am interested in your service: ${service.title}. Please guide me with documents and procedure.`);
    window.open(`https://wa.me/919647479787?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative bg-slate-50 border-b border-slate-100 h-48 overflow-hidden flex items-center justify-center">
          <img 
            src={getAssetUrl(service.image)} 
            alt={service.title} 
            className="w-full h-full object-contain p-4 drop-shadow-xs"
          />
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 uppercase tracking-wider shadow-sm">
              {service.category || 'Official Online Service'}
            </span>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          <h3 className="text-xl font-black text-slate-900 mb-2">
            {service.title}
          </h3>
          <p className="text-slate-600 text-sm mb-4 leading-relaxed">
            {service.description}
          </p>

          {/* Requirements Checklist */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-blue-600" />
              Required Documents & Info
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {service.requirements ? (
                service.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Aadhaar Card (Linked with active Mobile No.)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Recent Passport Size Photograph</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Relevant supporting certificates / vouchers</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-transform active:scale-95 shadow-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Apply via WhatsApp</span>
            </button>

            <a
              href="tel:9647479787"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-transform active:scale-95 shadow-sm"
            >
              <Phone className="w-4 h-4 text-yellow-400" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
