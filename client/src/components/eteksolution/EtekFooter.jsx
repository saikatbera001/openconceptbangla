import React from 'react';
import { 
  Phone, 
  ArrowUp, 
  MessageSquare, 
  ShieldCheck, 
  ExternalLink
} from 'lucide-react';

export default function EtekFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact-footer" className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 px-2.5 py-0.5 rounded-xl overflow-hidden shadow-sm bg-slate-900 border border-slate-800 flex items-center justify-center">
                <img 
                  src="/images/eteksolution/logo-transparent.png" 
                  alt="e-tek solution logo"
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/eteksolution/logo.png";
                  }}
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">e-tek solution</h3>
                <p className="text-[11px] text-amber-400 font-semibold">IT & Online Solution Centre</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Established by <span className="font-semibold text-slate-200">Mr. Tanmoy Santra</span> (Computer Hardware & Network Engineer). Empowering citizens with seamless, transparent digital and governmental services.
            </p>

            <div className="flex items-center gap-3">
              {/* Facebook */}
              <a 
                href="https://www.facebook.com/eteksolution" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-blue-400 hover:border-blue-500 hover:scale-110 transition-all shadow-xs"
                title="Facebook"
              >
                <img src="https://ssl.gstatic.com/atari/images/sociallinks/facebook_colored_44dp.png" alt="Facebook" className="w-5 h-5" />
              </a>

              {/* Twitter / X */}
              <a 
                href="https://twitter.com/eteksolution" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-sky-400 hover:border-sky-500 hover:scale-110 transition-all shadow-xs"
                title="Twitter"
              >
                <img src="https://ssl.gstatic.com/atari/images/sociallinks/twitter_colored_44dp.png" alt="Twitter" className="w-5 h-5" />
              </a>

              {/* WhatsApp */}
              <a 
                href="https://wa.me/message/EVNR7MWOK23YA1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500 hover:scale-110 transition-all shadow-xs"
                title="WhatsApp Channel"
              >
                <img src="/images/eteksolution/whatsapp-b-icon.png" alt="WhatsApp Link" className="w-5 h-5 rounded-full" />
              </a>

              {/* YouTube */}
              <a 
                href="https://www.youtube.com/e-tek%20solution" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-red-400 hover:border-red-500 hover:scale-110 transition-all shadow-xs"
                title="YouTube"
              >
                <img src="https://ssl.gstatic.com/atari/images/sociallinks/youtube_colored_44dp.png" alt="YouTube" className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Citizen Services */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-400 pl-2">
              Citizen Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services-section" className="hover:text-amber-400 transition-colors">NSDL PAN Card Enrolment</a></li>
              <li><a href="#services-section" className="hover:text-amber-400 transition-colors">Aadhaar Bio & Address Update</a></li>
              <li><a href="#services-section" className="hover:text-amber-400 transition-colors">Passport Seva & Tatkal Appointment</a></li>
              <li><a href="#services-section" className="hover:text-amber-400 transition-colors">Digital Voter Card (Form 6 & 8)</a></li>
              <li><a href="#services-section" className="hover:text-amber-400 transition-colors">Digital Ration Card & e-KYC</a></li>
              <li><a href="#services-section" className="hover:text-amber-400 transition-colors">HP LPG Gas New Connection</a></li>
            </ul>
          </div>

          {/* Business & Logistics */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Business & Logistics
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services-section" className="hover:text-blue-400 transition-colors">Delhivery Express Courier Point</a></li>
              <li><a href="#services-section" className="hover:text-blue-400 transition-colors">India Post Dak Mitra Parcel</a></li>
              <li><a href="#services-section" className="hover:text-blue-400 transition-colors">Airtel Payments Bank & AEPS Cash</a></li>
              <li><a href="#services-section" className="hover:text-blue-400 transition-colors">P-Tax & Trade License Registration</a></li>
              <li><a href="#services-section" className="hover:text-blue-400 transition-colors">MSME Udyam & NGO/Trust Setup</a></li>
              <li><a href="#services-section" className="hover:text-blue-400 transition-colors">CIBIL Score Analysis & Credit Bureau</a></li>
            </ul>
          </div>

          {/* Office Contact Info */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Contact & Helpline
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-slate-200">Helpline Phone:</span>
                  <a href="tel:9647479787" className="text-amber-400 hover:underline font-mono font-bold text-sm">
                    9647479787
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-slate-200">WhatsApp Desk:</span>
                  <a 
                    href="https://wa.me/message/EVNR7MWOK23YA1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline"
                  >
                    Click to start chat
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-slate-200">Centre Head:</span>
                  <span>Mr. Tanmoy Santra</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-slate-900 bg-black/50 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            Copyright 2023 - 2026 <span className="font-bold text-slate-200">e-tek solution</span>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <a 
              href="https://g.page/r/CTfrqzFTq8uZEAE/review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1"
            >
              Google Review
              <ExternalLink className="w-3 h-3" />
            </a>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
