import React from 'react';
import { 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const VERTICAL_SERVICES_LIST = [
  "Aadhaar Service",
  "PAN Card Service",
  "Passport Service",
  "Voter Card Service",
  "Ration Card Service",
  "Train Ticket Booking",
  "Plane Ticket Booking",
  "Bus Ticket Booking",
  "Hotel Booking",
  "Delhivery Courier Booking Point",
  "Dak Mitra",
  "AIIMS and CMC Vellore Appointment",
  "Ptax New Registration and Renewal",
  "Trade License",
  "MSME (Udyam Registration)",
  "Club/Society/Trust/NGO Registration"
];

export default function EtekVerticalTicker({ onServiceClick }) {
  return (
    <section className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Authentic Green Vertical Auto-Scrolling Ticker */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-800 text-white rounded-2xl p-6 shadow-lg border border-emerald-600/40 relative overflow-hidden flex flex-col justify-between h-[420px]">
              
              {/* Header */}
              <div className="pb-3 border-b-2 border-white/40 mb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black tracking-wider uppercase flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
                    Our Services
                  </h3>
                  <p className="text-xs text-emerald-100 font-medium">
                    Continuous Live Catalog • Hover to pause
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 text-white">
                  16+ Active
                </span>
              </div>

              {/* Vertical Scrolling Window */}
              <div className="relative flex-grow overflow-hidden mask-gradient-vertical">
                <div className="animate-etek-vertical space-y-3 py-2">
                  {/* Duplicated list for seamless infinite loop */}
                  {[...VERTICAL_SERVICES_LIST, ...VERTICAL_SERVICES_LIST].map((item, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-3 p-2.5 rounded-xl bg-white/10 hover:bg-white/25 transition-all cursor-pointer backdrop-blur-2xs border border-white/10"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                      <span className="text-sm font-semibold tracking-wide text-white">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-3 border-t border-white/20 mt-2 flex items-center justify-between text-xs text-emerald-200">
                <span>Direct Office Desk Assistance</span>
                <a 
                  href="tel:9647479787"
                  className="font-bold text-yellow-300 hover:underline flex items-center gap-1"
                >
                  Call: 9647479787
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Feature Cards (Fast Service, Secure Pay, 24/7 Support) */}
          <div className="lg:col-span-7 flex flex-col justify-center gap-6">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 uppercase tracking-wider">
                Why Choose E-Tek Solution
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 mb-3 tracking-tight">
                Fast, Secure & Dedicated Support Every Step of the Way
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether you need urgent passport assistance, express parcel dispatch via Delhivery, ticket reservations, or business compliance registrations, we ensure 100% precision.
              </p>
            </div>

            {/* 3 Interactive Cards with Hover Elevate Transition */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Card 1: Fast Service */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-blue-500 transition-all duration-300 text-center flex flex-col items-center group">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all text-2xl shadow-xs">
                  🚀
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  Fast Service
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  We support within 24 hours of your Contact with instant acknowledgement.
                </p>
              </div>

              {/* Card 2: Secure Pay */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-emerald-500 transition-all duration-300 text-center flex flex-col items-center group">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all text-2xl shadow-xs">
                  🛡️
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">
                  Secure Pay
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Fully encrypted payment processing and official computerized receipts.
                </p>
              </div>

              {/* Card 3: 24/7 Support */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-amber-500 transition-all duration-300 text-center flex flex-col items-center group">
                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-600 group-hover:text-white transition-all text-2xl shadow-xs">
                  🎧
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors mb-2">
                  24/7 Support
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Chat with our team anytime, anywhere via WhatsApp and Phone Helpline.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
