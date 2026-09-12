import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  ShieldCheck, 
  Sliders, 
  Crop, 
  FileImage, 
  Sparkles, 
  Layers, 
  Camera, 
  ArrowRight,
  Maximize2,
  Check
} from 'lucide-react';
import StudioTool from '../components/tools/StudioTool';
import AdvancedPhotoMaker from '../components/tools/AdvancedPhotoMaker';
import CardCropper from '../components/tools/CardCropper';
import ImageCompressor from '../components/tools/ImageCompressor';
import ImageConverter from '../components/tools/ImageConverter';
import UniversalToolModal from '../components/tools/UniversalToolModal';
import { QUICK_TOOLS_CATALOG, TARGET_KB_PRESETS } from '../data/toolsCatalog';

export default function Tools() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalTool, setActiveModalTool] = useState(null);
  const [modalInitialKb, setModalInitialKb] = useState(null);
  const [activeDedicatedTab, setActiveDedicatedTab] = useState(null); // 'cropper' | 'compressor' | 'converter'
  const [dedicatedPreset, setDedicatedPreset] = useState(null);

  // Check URL query parameters
  useEffect(() => {
    const tabParam = searchParams.get('tab') || searchParams.get('tool');
    const presetParam = searchParams.get('preset');
    if (tabParam === 'cropper' || tabParam === 'card-cropper') {
      setActiveDedicatedTab('cropper');
      if (presetParam) setDedicatedPreset(presetParam);
    } else if (tabParam === 'compressor' || tabParam === 'image-compressor') {
      setActiveDedicatedTab('compressor');
    } else if (tabParam === 'converter' || tabParam === 'image-converter') {
      setActiveDedicatedTab('converter');
    }
  }, [searchParams]);

  // Filter tools by search
  const filteredTools = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return QUICK_TOOLS_CATALOG;
    return QUICK_TOOLS_CATALOG.filter((t) => 
      t.title.toLowerCase().includes(q) ||
      t.titleBn.toLowerCase().includes(q) ||
      t.subtitle.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  // Handle clicking a tool card
  const handleToolClick = (tool) => {
    if (tool.id === 'passport-photo-maker') {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }
    if (tool.id === 'crop-image') {
      setActiveDedicatedTab('cropper');
      window.scrollTo({ top: 750, behavior: 'smooth' });
      return;
    }
    setActiveModalTool(tool);
    setModalInitialKb(tool.targetKb || null);
  };

  // Handle clicking a target KB pill
  const handleKbPillClick = (kb) => {
    const reduceTool = QUICK_TOOLS_CATALOG.find(t => t.id === 'reduce-image-kb');
    setActiveModalTool(reduceTool);
    setModalInitialKb(kb);
  };

  // Color mapping for tool icon badges
  const getColorClasses = (color) => {
    switch (color) {
      case 'rose': return 'bg-rose-500 text-white';
      case 'amber': return 'bg-amber-500 text-white';
      case 'blue': return 'bg-blue-600 text-white';
      case 'purple': return 'bg-purple-600 text-white';
      case 'emerald': return 'bg-emerald-600 text-white';
      case 'cyan': return 'bg-cyan-600 text-white';
      case 'red': return 'bg-red-500 text-white';
      case 'indigo': return 'bg-indigo-600 text-white';
      case 'teal': return 'bg-teal-600 text-white';
      case 'pink': return 'bg-pink-500 text-white';
      case 'yellow': return 'bg-yellow-500 text-white';
      default: return 'bg-emerald-600 text-white';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Top Header Banner matching Screenshot 2 (warm orange / coral gradient) */}
      <div className="relative pt-6 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 text-white rounded-b-[2.5rem] shadow-xl">
        
        {/* Background decorative glows */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Back to Home Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-bold text-white transition-all mb-6 backdrop-blur-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>

          {/* Title and Subtitle */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-sans text-white drop-shadow-sm">
              Useful Online Tools
            </h1>
            <p className="text-amber-50 text-xs sm:text-base font-normal max-w-2xl mx-auto">
              Image, resize, compress, convert, PDF, photo, signature, DPI and other daily-use tools in one place.
            </p>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-9 relative z-20 space-y-10">
        
        {/* 1. Studio Tool (Passport Photo Sheet Maker) matching Screenshot 2 */}
        <StudioTool />

        {/* 2. Advanced Photo Maker (Custom Size Crop + Grid & A4 Photo Sheet) matching Screenshot 2 */}
        <AdvancedPhotoMaker />

        {/* Dedicated Workspace if opened from URL query (Card Cropper / Compressor) */}
        {activeDedicatedTab && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-sm font-bold text-slate-800">
                এক্টিভ ডেডিকেটেড টুল ওয়ার্কস্পেস:
              </span>
              <button
                onClick={() => setActiveDedicatedTab(null)}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-3 py-1 rounded-xl"
              >
                ট্যাব বন্ধ করুন ✕
              </button>
            </div>
            {activeDedicatedTab === 'cropper' && <CardCropper initialPresetId={dedicatedPreset} />}
            {activeDedicatedTab === 'compressor' && <ImageCompressor />}
            {activeDedicatedTab === 'converter' && <ImageConverter />}
          </div>
        )}

        {/* 3. Search a tool... input bar matching Screenshot 2 */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/90 p-3 sm:p-4">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search a tool (e.g. Passport, Compress KB, Signature, DPI, Crop, Rotate, Watermark)..."
              className="w-full pl-12 pr-4 py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition placeholder-slate-400 font-medium"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200 hover:bg-slate-300 w-5 h-5 rounded-full flex items-center justify-center transition"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* 4. Grid of 30+ Interactive Tools matching Screenshot 2 */}
        <div>
          <div className="flex items-center justify-between mb-5 text-xs text-slate-500">
            <span>সবগুলো টুলস (মোট <strong>{filteredTools.length}</strong> টি ব্রাউজার টুল)</span>
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <ShieldCheck className="w-4 h-4" />
              ১০০% ক্লায়েন্ট সাইড • নো সার্ভার আপলোড
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredTools.map((tool) => {
              const colorCls = getColorClasses(tool.color);

              return (
                <div
                  key={tool.id}
                  onClick={() => handleToolClick(tool)}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl ${colorCls} flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                      <Sparkles className="w-5 h-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition-colors truncate">
                        {tool.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {tool.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-amber-700 group-hover:text-amber-800">
                    <span className="text-[10px] text-slate-400 font-normal truncate">
                      {tool.titleBn}
                    </span>
                    <span className="flex items-center gap-1 shrink-0">
                      খুলুন <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Exact Target Size Compression Quick Pills matching Screenshot 2 */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-amber-50/70 via-orange-50/60 to-yellow-50/70 rounded-3xl border border-amber-200/80 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-xs font-black text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-amber-600" />
              <span>Exact Target Size Compression:</span>
            </span>
            <span className="text-[11px] text-slate-500">
              যেকোনো KB পিল-এ ক্লিক করে তাত্ক্ষণিক ছবি কম্প্রেস করুন
            </span>
          </div>

          {/* Quick pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {TARGET_KB_PRESETS.map((p) => (
              <button
                key={p.kb}
                type="button"
                onClick={() => handleKbPillClick(p.kb)}
                className="px-3 py-1.5 bg-white hover:bg-amber-500 hover:text-white border border-amber-300 text-slate-800 text-xs font-bold rounded-xl shadow-sm transition hover:scale-105 active:scale-95"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Trust guarantee subtext matching Screenshot 2 */}
          <p className="text-[11px] text-slate-500 pt-2 border-t border-amber-200/60 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>All tools run browser side / local processing ensure maximum speed & privacy (zero server upload).</span>
          </p>
        </div>

      </div>

      {/* Universal Tool Modal runner */}
      {activeModalTool && (
        <UniversalToolModal
          tool={activeModalTool}
          initialKb={modalInitialKb}
          onClose={() => {
            setActiveModalTool(null);
            setModalInitialKb(null);
          }}
        />
      )}

    </div>
  );
}
