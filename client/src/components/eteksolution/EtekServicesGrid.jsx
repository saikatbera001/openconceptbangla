import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Sparkles, 
  Search 
} from 'lucide-react';
import EtekServiceModal from './EtekServiceModal';

export const PRIMARY_SERVICES = [
  {
    id: 'nsdl-pan',
    title: 'NSDL PAN Card Service',
    shortTitle: 'NSDL PAN',
    category: 'Tax & Identity',
    image: '/images/eteksolution/nsdl-pan.png',
    description: 'Instant new PAN card application, corrections in name or date of birth, minor to major conversion, and biometric PAN-Aadhaar linking.',
    requirements: ['Aadhaar Card', '2 Passport Photos', 'Active Mobile Number for OTP', 'Signature on white paper'],
    popular: true,
  },
  {
    id: 'delhivery-booking-zone',
    title: 'Delhivery Booking Zone',
    shortTitle: 'Delhivery Booking Zone',
    category: 'Courier & Logistics',
    image: '/images/eteksolution/delhivery-booking-zone.png',
    description: 'Official Delhivery Express courier booking point. Send parcels, documents, and commercial shipments across India with real-time tracking.',
    requirements: ['Sender Address with Pin code', 'Recipient Mobile & Address', 'Package dimensions/weight', 'Govt ID Proof'],
    popular: true,
  },
  {
    id: 'india-post-dak-mitra',
    title: 'India Post Dak Mitra',
    shortTitle: 'India Post Dak Mitra',
    category: 'Postal & Delivery',
    image: '/images/eteksolution/india-post-dak-mitra.png',
    description: 'Authorized postal booking via CSC Dak Mitra portal. Speed Post, registered letters, parcels, and doorstep postal tracking.',
    requirements: ['Parcel / Envelope properly packed', 'Full destination Address with PIN code', 'Sender Contact No.'],
    popular: false,
  },
  {
    id: 'ticket-booking',
    title: 'e-Ticket Booking (Train, Flight, Bus)',
    shortTitle: 'e-Ticket Booking',
    category: 'Travel & Tours',
    image: '/images/eteksolution/ticket-booking.png',
    description: 'IRCTC authorized train ticket reservation (Tatkal & General), domestic and international flights, luxury Volvo buses, and verified hotel rooms.',
    requirements: ['Passenger Name & Age', 'ID Proof for Travel', 'Travel Dates & Preferred Timings', 'Mobile No. for SMS confirmation'],
    popular: true,
  },
  {
    id: 'airtel-payment-bank',
    title: 'Airtel Payment Bank (Banking & AEPS)',
    shortTitle: 'Airtel Payment Bank',
    category: 'Banking & Finance',
    image: '/images/eteksolution/airtel-payment-bank.png',
    description: 'Instant zero-balance savings account opening, Aadhaar biometric cash withdrawal (AEPS), direct domestic money transfer (DMT), and insurance.',
    requirements: ['Aadhaar Card for Biometric KYC', 'PAN Card or Form 60', 'Mobile Number (any operator)'],
    popular: true,
  },
  {
    id: 'csc',
    title: 'CSC (Common Service Center)',
    shortTitle: 'CSC Center',
    category: 'Govt Digital Seva',
    image: '/images/eteksolution/csc.png',
    description: 'Central government Digital Seva Kendra. PM Kisan KYC, Ayushman Golden Health Card, e-Shram Card, PM Fasal Bima, and Govt certificates.',
    requirements: ['Aadhaar Card', 'Ration Card', 'Bank Passbook copy', 'Land Records / Khatian for PM Kisan'],
    popular: true,
  },
  {
    id: 'sahaj',
    title: 'SAHAJ Param Mitra Services',
    shortTitle: 'SAHAJ Param Mitra',
    category: 'Govt Digital Seva',
    image: '/images/eteksolution/sahaj.png',
    description: 'West Bengal e-District portal services, SC/ST/OBC caste certificate submission, Residential & Income certificates, mutation and porcha copy.',
    requirements: ['Aadhaar & Voter Card', 'Ancestral document for Caste certificate', 'Municipality / Panchayat Certificate'],
    popular: false,
  },
  {
    id: 'hp-lpg',
    title: 'HP LPG Gas Booking & Connection',
    shortTitle: 'HP LPG Gas',
    category: 'Utility & Energy',
    image: '/images/eteksolution/hp-lpg.png',
    description: 'HP Gas new domestic connection, commercial gas refill booking, Ujjwala Yojana KYC update, transfer of connection, and subsidy bank link.',
    requirements: ['Aadhaar Card of Family Head', 'Bank Account Passbook for DBTL', 'Current Electricity Bill / Rent Agreement'],
    popular: false,
  },
  {
    id: 'passport',
    title: 'Passport Seva Kendra Online Service',
    shortTitle: 'Passport Service',
    category: 'Govt Identity',
    image: '/images/eteksolution/passport.png',
    description: 'Fresh Normal & Tatkal Passport online application, PSK slot appointment booking, document advisory, Police Verification guidance, and renewals.',
    requirements: ['Aadhaar Card & PAN Card', '10th Marksheet / Birth Certificate', 'Voter Card / Bank Passbook with Photo'],
    popular: true,
  },
  {
    id: 'voter-card',
    title: 'Voter Card Service (NVSP / ECINET)',
    shortTitle: 'Voter Card Service',
    category: 'Govt Identity',
    image: '/images/eteksolution/voter-card.png',
    description: 'New voter enrollment (Form 6), correction in name/address/photo (Form 8), constituency transfer, digital e-EPIC card download, and duplicate card.',
    requirements: ['Aadhaar Card', 'Birth Certificate / School Admit', 'Family Member existing EPIC Voter No.', 'Recent Photo'],
    popular: false,
  },
  {
    id: 'ration-card',
    title: 'Ration Card Service (Khadya Sathi)',
    shortTitle: 'Ration Card Service',
    category: 'Govt Food & Supplies',
    image: '/images/eteksolution/ration-card.png',
    description: 'Digital ration card application (Form 3/4), adding new family member, dealer change (Form 6), surrender card, biometric e-KYC status check.',
    requirements: ['Head of Family Ration Card', 'New Member Aadhaar & Birth Certificate', 'Active Mobile Number'],
    popular: false,
  },
  {
    id: 'cibil-report',
    title: 'Official CIBIL Credit Score Report',
    shortTitle: 'CIBIL Report',
    category: 'Banking & Finance',
    image: '/images/eteksolution/cibil-report.png',
    description: 'Instant official CIBIL credit score check via CSC Cloud Bureau. Detailed credit health check, loan eligibility review, and repayment analysis.',
    requirements: ['PAN Card Number', 'Aadhaar Card', 'Registered Mobile for OTP Verification', 'Email ID'],
    popular: true,
  }
];

export default function EtekServicesGrid() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Tax & Identity', 'Govt Digital Seva', 'Courier & Logistics', 'Banking & Finance', 'Travel & Tours', 'Govt Identity'];

  const filteredServices = PRIMARY_SERVICES.filter(service => {
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services-section" className="py-16 bg-slate-100 border-b border-slate-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Verified Online Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-4">
            Our Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Fast, reliable, and authorized digital & citizen services provided by <span className="font-bold text-slate-900">e-tek solution</span>. Click any service card to view complete requirements or apply directly.
          </p>
        </div>

        {/* Filter & Search Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>
        </div>

        {/* 12 Services Grid with 3D hover and smooth animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              onClick={() => setSelectedService(service)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-48 bg-white border-b border-slate-100 overflow-hidden flex items-center justify-center p-3">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://placehold.co/400x300?text=" + encodeURIComponent(service.shortTitle);
                    }}
                  />

                  {/* Badge */}
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-xs border border-white/20">
                    {service.category}
                  </span>

                  {service.popular && (
                    <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 uppercase tracking-wider shadow-xs">
                      Popular
                    </span>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {service.shortTitle}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Action Button Strip */}
              <div className="px-4 pb-4 pt-0 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                <span>View Details & Apply</span>
                <div className="p-1 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No services found matching your search.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs font-bold text-blue-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Service Detail & WhatsApp Inquiry Modal */}
      {selectedService && (
        <EtekServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </section>
  );
}
