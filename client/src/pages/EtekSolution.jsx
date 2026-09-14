import React, { useState } from 'react';
import EtekNavbar from '../components/eteksolution/EtekNavbar';
import EtekMarquee from '../components/eteksolution/EtekMarquee';
import EtekHero from '../components/eteksolution/EtekHero';
import EtekServicesGrid from '../components/eteksolution/EtekServicesGrid';
import EtekVerticalTicker from '../components/eteksolution/EtekVerticalTicker';
import EtekStats from '../components/eteksolution/EtekStats';
import EtekCarousel from '../components/eteksolution/EtekCarousel';
import EtekStudentAndLinks from '../components/eteksolution/EtekStudentAndLinks';
import EtekToolsSection from '../components/eteksolution/EtekToolsSection';
import EtekQuickGrid from '../components/eteksolution/EtekQuickGrid';
import EtekFooter from '../components/eteksolution/EtekFooter';
import PrintOrderModal from '../components/eteksolution/PrintOrderModal';
import EtekSearchModal from '../components/eteksolution/EtekSearchModal';
import EtekServiceModal from '../components/eteksolution/EtekServiceModal';
import { MessageCircle } from 'lucide-react';

export default function EtekSolution() {
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-amber-400 selection:text-slate-900">
      {/* 1. Authentic Etek Header & Navigation */}
      <EtekNavbar 
        onOpenPrintModal={() => setPrintModalOpen(true)}
        onOpenSearchModal={() => setSearchModalOpen(true)}
      />

      {/* 2. Urgent Running Bengali Marquee Ticker */}
      <EtekMarquee />

      {/* 3. Hero Section with WhatsApp Banner, Live Clock, Graphic Banners, Gradient Slogan & Typewriter */}
      <EtekHero 
        onServiceClick={(service) => setSelectedService(service)}
      />

      {/* 4. Primary 12 Online Services Grid */}
      <EtekServicesGrid />

      {/* 5. Continuous Vertical Auto-Scrolling Service Marquee & 3 Fast Feature Cards */}
      <EtekVerticalTicker 
        onServiceClick={(service) => setSelectedService(service)}
      />

      {/* 6. Glassmorphism Statistics Strip (150+ Projects, 2k Followers, 99% Success) */}
      <EtekStats />

      {/* 7. Auto-Playing Image Carousel with 11 Authentic Slides & Smooth Transitions */}
      <EtekCarousel />

      {/* 8. Student's Corner, Legal Consultancy Services & Essential Links */}
      <EtekStudentAndLinks />

      {/* 9. Useful Online Tools Dual Banner & 4 Card Croppers (Ration, PAN, Ayushman, Voter) */}
      <EtekToolsSection />

      {/* 10. Quick Digital Tools Desk, Promotional Banner & 5-Star Google Review Section */}
      <EtekQuickGrid 
        onOpenPrintModal={() => setPrintModalOpen(true)}
      />

      {/* 11. Official Footer with Helpline, Social Icons & Credits */}
      <EtekFooter />


      {/* Floating Action Button: Instant WhatsApp Desk */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <a
          href="https://wa.me/message/EVNR7MWOK23YA1"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/80"
          title="Chat on WhatsApp"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs font-bold hidden sm:inline">WhatsApp Helpdesk</span>
        </a>
      </div>

      {/* Modals */}
      <PrintOrderModal 
        isOpen={printModalOpen} 
        onClose={() => setPrintModalOpen(false)} 
      />

      <EtekSearchModal 
        isOpen={searchModalOpen} 
        onClose={() => setSearchModalOpen(false)}
        onSelectService={(service) => setSelectedService(service)}
      />

      {selectedService && (
        <EtekServiceModal 
          service={selectedService} 
          onClose={() => setSelectedService(null)} 
        />
      )}
    </div>
  );
}
