import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Search, 
  Menu, 
  X, 
  Printer, 
  ChevronDown, 
  MessageCircle,
  Wrench
} from 'lucide-react';
import { getAssetUrl } from '../../utils/assetUrl';


export default function EtekNavbar({ onOpenPrintModal, onOpenSearchModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [legalDropdown, setLegalDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md bg-white/95 backdrop-blur-md' : 'bg-white'}`}>
      {/* Top Helpline Strip */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-900 py-1.5 px-4 text-xs md:text-sm font-semibold border-b border-amber-300/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center p-1 bg-slate-900 text-yellow-300 rounded-full text-xs">
              <Phone className="w-3 h-3 animate-pulse" />
            </span>
            <span className="font-medium text-slate-800">Helpline:</span>
            <a 
              href="tel:9647479787" 
              className="font-bold tracking-wide hover:underline hover:text-blue-900 transition-colors"
            >
              9647479787
            </a>
            <span className="hidden sm:inline text-amber-800">|</span>
            <span className="hidden sm:inline text-slate-700 font-normal">Mr. Tanmoy Santra (Hardware & Network Engineer)</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/message/EVNR7MWOK23YA1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-xs hover:bg-emerald-700 transition-transform active:scale-95 shadow-sm"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Chat</span>
            </a>

            <button 
              onClick={onOpenSearchModal}
              className="inline-flex items-center gap-1 text-slate-700 hover:text-slate-900 transition-colors"
              title="Search this site"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-xs">Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative h-12 px-2.5 py-1 rounded-xl bg-slate-900 shadow-sm border border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img 
              src={getAssetUrl('/images/eteksolution/logo-transparent.png')} 
              alt="e-tek solution logo"
              className="h-9 w-auto object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = getAssetUrl('/images/eteksolution/logo.png');
              }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              e-tek solution
            </h1>
            <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              Complete IT & Online Solution Centre
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-700">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-all font-semibold"
          >
            Home
          </button>

          <button
            onClick={onOpenPrintModal}
            className="px-3 py-2 rounded-lg text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-all flex items-center gap-1.5 font-bold border border-emerald-200 shadow-xs"
          >
            <Printer className="w-4 h-4 text-emerald-600" />
            PRINT PAGE
          </button>

          <Link
            to="/tools"
            className="px-3 py-2 rounded-lg text-amber-700 hover:text-amber-800 hover:bg-amber-50 transition-all flex items-center gap-1.5 font-bold border border-amber-300/80 shadow-xs bg-amber-50/50"
          >
            <Wrench className="w-4 h-4 text-amber-600" />
            ONLINE TOOLS
          </Link>


          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <button 
              onClick={() => scrollToSection('services-section')}
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-all flex items-center gap-1"
            >
              Services
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? 'rotate-180' : ''}`} />
            </button>

            {servicesDropdown && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Online Services
                </div>
                {[
                  { name: 'NSDL PAN Card', href: '#services-section' },
                  { name: 'Delhivery Booking Point', href: '#services-section' },
                  { name: 'India Post Dak Mitra', href: '#services-section' },
                  { name: 'e-Ticket Booking (Train/Flight/Bus)', href: '#services-section' },
                  { name: 'Airtel Payments Bank (AEPS)', href: '#services-section' },
                  { name: 'CSC & Sahaj Param Mitra', href: '#services-section' },
                  { name: 'HP LPG Gas Booking', href: '#services-section' },
                  { name: 'Passport / Voter / Ration Services', href: '#services-section' },
                  { name: 'CIBIL Credit Score Check', href: '#services-section' },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    onClick={() => {
                      setServicesDropdown(false);
                      scrollToSection('services-section');
                    }}
                    className="block px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Legal Consultancy Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setLegalDropdown(true)}
            onMouseLeave={() => setLegalDropdown(false)}
          >
            <button 
              onClick={() => scrollToSection('services-section')}
              className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-all flex items-center gap-1"
            >
              Legal Consultancy
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${legalDropdown ? 'rotate-180' : ''}`} />
            </button>

            {legalDropdown && (
              <div className="absolute top-full left-0 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Registration & Tax
                </div>
                {[
                  'Income Tax Filing (ITR)',
                  'P-Tax Registration & Renewal',
                  'Trade License Service',
                  'Food License (FSSAI)',
                  'MSME (Udyam Registration)',
                  'Club / Society / Trust / NGO'
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setLegalDropdown(false);
                      scrollToSection('services-section');
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => scrollToSection('student-corner')}
            className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-all"
          >
            Student's Corner
          </button>

          <button 
            onClick={() => scrollToSection('essential-links')}
            className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-all"
          >
            Essential Links
          </button>

          <button 
            onClick={() => scrollToSection('quick-grid')}
            className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-all"
          >
            Download
          </button>

          <button 
            onClick={() => scrollToSection('contact-footer')}
            className="px-3 py-2 rounded-lg hover:text-blue-600 hover:bg-slate-100 transition-all"
          >
            Contact Us
          </button>

          <a 
            href="#admin"
            onClick={(e) => {
              e.preventDefault();
              alert("Admin Access: Please contact Mr. Tanmoy Santra for authorization credentials.");
            }}
            className="ml-2 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
          >
            Admin
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenPrintModal}
            className="p-2 text-emerald-700 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition-colors"
            title="Print Page"
          >
            <Printer className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200 shadow-xl">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full text-left py-2 px-3 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            Home
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPrintModal();
            }}
            className="w-full text-left py-2 px-3 rounded-md font-bold text-emerald-700 bg-emerald-50 flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            PRINT PAGE
          </button>
          <Link
            to="/tools"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-left py-2 px-3 rounded-md font-bold text-amber-800 bg-amber-50 border border-amber-200/80 flex items-center gap-2"
          >
            <Wrench className="w-4 h-4 text-amber-600" />
            ONLINE TOOLS
          </Link>

          <button
            onClick={() => scrollToSection('services-section')}
            className="w-full text-left py-2 px-3 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            Our Services
          </button>
          <button
            onClick={() => scrollToSection('services-section')}
            className="w-full text-left py-2 px-3 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            Legal Consultancy Services
          </button>
          <button
            onClick={() => scrollToSection('student-corner')}
            className="w-full text-left py-2 px-3 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            Student's Corner
          </button>
          <button
            onClick={() => scrollToSection('essential-links')}
            className="w-full text-left py-2 px-3 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            Essential Links
          </button>
          <button
            onClick={() => scrollToSection('quick-grid')}
            className="w-full text-left py-2 px-3 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            Download
          </button>
          <button
            onClick={() => scrollToSection('contact-footer')}
            className="w-full text-left py-2 px-3 rounded-md font-medium text-slate-800 hover:bg-slate-100"
          >
            Contact Us
          </button>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500">Helpline: 9647479787</span>
            <a
              href="https://wa.me/message/EVNR7MWOK23YA1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-600 font-bold hover:underline"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
