import React, { useState } from 'react';
import { 
  ExternalLink, 
  Building2, 
  ArrowRight
} from 'lucide-react';

export default function EtekStudentAndLinks() {
  const [activeTab, setActiveTab] = useState('student');

  const studentSchemes = [
    {
      title: "Swami Vivekananda Merit Cum Means (SVMCM)",
      category: "Higher Education Scholarship",
      desc: "Financial assistance up to ₹60,000/yr for meritorious students from HS, UG, PG, Medical & Engineering streams in West Bengal.",
      tag: "Application Active"
    },
    {
      title: "WBJEE & Engineering Counselling",
      category: "Entrance Examination",
      desc: "Online form fill-up, choice locking, counselling assistance, and rank card generation for WB engineering colleges.",
      tag: "Ongoing"
    },
    {
      title: "JENPAS & ANM / GNM Nursing Form Fill-up",
      category: "Medical & Nursing Admission",
      desc: "Complete documentation, online application submission, and admit card download for West Bengal Nursing colleges.",
      tag: "Active"
    },
    {
      title: "Aikyashree & Oasis Scholarship",
      category: "State Scholarships",
      desc: "Pre-Matric, Post-Matric & Merit-cum-Means scholarship for minority, SC, ST, and OBC candidates in West Bengal.",
      tag: "Verification Open"
    }
  ];

  const legalServices = [
    {
      title: "Income Tax Filing (ITR 1 / 2 / 3 / 4)",
      desc: "Salaried, business, and freelance ITR filing with maximum tax deduction analysis and instant e-verification.",
      tag: "ITR FY 2024-25"
    },
    {
      title: "Professional Tax (P-Tax) Registration & Renewal",
      desc: "New enrollment, certificate of registration, payment challan generation, and annual renewal for traders & professionals.",
      tag: "Govt WB Portal"
    },
    {
      title: "Trade License (Municipality & Gram Panchayat)",
      desc: "New application and annual renewal for commercial shops, firms, and service establishments.",
      tag: "e-District"
    },
    {
      title: "Food License (FSSAI Registration)",
      desc: "Basic FSSAI registration & state license for sweet shops, grocery, restaurants, and cloud kitchens.",
      tag: "FSSAI FoSCoS"
    },
    {
      title: "MSME Udyam Registration",
      desc: "Official central MSME certificate with Udyam Registration Number for bank loan and subsidy priority.",
      tag: "Zero Govt Fee"
    },
    {
      title: "Club / Society / Trust / NGO Registration",
      desc: "Drafting bye-laws, memorandum of association (MOA), and registrar submission for societies and religious trusts.",
      tag: "Legal Advisory"
    }
  ];

  const essentialLinks = [
    { name: "UIDAI Aadhaar Self Service Portal", url: "https://myaadhaar.uidai.gov.in/", cat: "Aadhaar" },
    { name: "NSDL PAN Online Portal", url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html", cat: "Tax" },
    { name: "ECI Voter Service Portal (ECINET)", url: "https://voters.eci.gov.in/", cat: "Voter" },
    { name: "WB Khadya Sathi Digital Ration Portal", url: "https://food.wb.gov.in/", cat: "Ration" },
    { name: "CSC Digital Seva Portal", url: "https://digitalseva.csc.gov.in/", cat: "CSC" },
    { name: "Delhivery Shipment Tracking", url: "https://www.delhivery.com/tracking", cat: "Logistics" },
    { name: "Passport Seva Portal", url: "https://www.passportindia.gov.in/", cat: "Passport" },
    { name: "IRCTC NextGen Ticket Booking", url: "https://www.irctc.co.in/", cat: "Travel" }
  ];

  return (
    <section id="student-corner" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Section Heading & Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-wider">
              Specialized Guidance
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2 tracking-tight">
              Student's Corner & Legal Consultancy
            </h3>
          </div>

          {/* Navigation Pill Switcher */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'student'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🎓 Student's Corner
            </button>
            <button
              onClick={() => setActiveTab('legal')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'legal'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚖️ Legal & Business
            </button>
            <button
              onClick={() => setActiveTab('links')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'links'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🔗 Essential Links
            </button>
          </div>
        </div>

        {/* Tab 1: Student's Corner */}
        {activeTab === 'student' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-in fade-in duration-200">
            {studentSchemes.map((scheme, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                      {scheme.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {scheme.tag}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {scheme.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {scheme.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-medium">Form fill-up assisted at E-Tek desk</span>
                  <a
                    href="https://wa.me/919647479787?text=Hello%20Etek%20Solution,%20I%20need%20help%20with%20Student%20Scholarship%20/%20Exam%20application"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-purple-700 hover:underline"
                  >
                    Apply Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Legal Consultancy Services */}
        {activeTab === 'legal' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in duration-200">
            {legalServices.map((legal, idx) => (
              <div 
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                      {legal.tag}
                    </span>
                    <Building2 className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mb-2">
                    {legal.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {legal.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500">Fast processing</span>
                  <a
                    href={`https://wa.me/919647479787?text=Hello%20Etek%20Solution,%20I%20need%20consultancy%20for%20${encodeURIComponent(legal.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 hover:underline"
                  >
                    Inquire
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Essential Links */}
        {activeTab === 'links' && (
          <div id="essential-links" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-200 scroll-mt-20">
            {essentialLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-xl bg-slate-50 hover:bg-white border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200 mb-2 inline-block">
                    {link.cat}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                    {link.name}
                  </h4>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] text-blue-600 font-semibold pt-2 border-t border-slate-100">
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
