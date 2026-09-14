import React, { useState, useRef, useEffect } from 'react';
import { Download, Crop, ShieldCheck, RefreshCw, ZoomIn, ZoomOut, CheckCircle2, CreditCard, Scissors, Printer } from 'lucide-react';

const PRESETS = [
  { id: 'ration', name: 'Ration Card Crop', ratio: 85.6 / 54, width: 856, height: 540, desc: 'Digital Ration Card PVC Size', badge: 'PVC Size' },
  { id: 'pan', name: 'PAN / Aadhaar Card', ratio: 85.6 / 54, width: 856, height: 540, desc: 'Blue PAN Area / PVC Fit', badge: 'Standard ID' },
  { id: 'ayushman', name: 'Ayushman Card Crop', ratio: 85.6 / 54, width: 856, height: 540, desc: 'PM-JAY Golden Card PVC', badge: 'Health Card' },
  { id: 'voter', name: 'Voter ID Card Crop', ratio: 86 / 54, width: 860, height: 540, desc: 'EPIC Voter ID PVC Fit', badge: 'ECI Voter' },
  { id: 'aadhaar', name: 'Aadhaar Card Crop', ratio: 85.6 / 54, width: 856, height: 540, desc: 'UIDAI Aadhaar PVC Size', badge: 'UIDAI' },
  { id: 'signature', name: 'Official Signature', ratio: 140 / 60, width: 280, height: 120, desc: '140 x 60 Pixel Box', badge: 'Exam Form' },
  { id: 'passport', name: 'Passport Photo', ratio: 3.5 / 4.5, width: 350, height: 450, desc: '3.5 cm x 4.5 cm', badge: 'Passport' },
];

export default function CardCropper({ initialPresetId }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(() => {
    if (initialPresetId) {
      const found = PRESETS.find(p => p.id === initialPresetId);
      if (found) return found;
    }
    return PRESETS[0];
  });
  const [zoom, setZoom] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [croppedDataUrl, setCroppedDataUrl] = useState(null);
  const [cardBorder, setCardBorder] = useState(true);

  const fileInputRef = useRef(null);
  const imageObjRef = useRef(null);

  useEffect(() => {
    if (initialPresetId) {
      const match = PRESETS.find(p => p.id === initialPresetId);
      if (match) setSelectedPreset(match);
    }
  }, [initialPresetId]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        imageObjRef.current = img;
        setZoom(1);
        setPosX(0);
        setPosY(0);
        setCroppedDataUrl(null);
      };
    };
    reader.readAsDataURL(file);
  };

  // Perform canvas crop
  const handleCrop = () => {
    if (!imageObjRef.current) return;
    const img = imageObjRef.current;
    const targetW = selectedPreset.width;
    const targetH = selectedPreset.height;

    const canvas = document.createElement('canvas');
    canvas.width = targetW;
    canvas.height = targetH;
    const ctx = canvas.getContext('2d');

    // Fill clean white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);

    // Calculate transformed drawing dimensions
    const baseScale = Math.max(targetW / img.width, targetH / img.height);
    const finalScale = baseScale * zoom;
    const drawW = img.width * finalScale;
    const drawH = img.height * finalScale;

    const drawX = (targetW - drawW) / 2 + posX;
    const drawY = (targetH - drawH) / 2 + posY;

    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Rounded corners border for PVC cards
    if (cardBorder) {
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, 0, targetW, targetH);
    }

    const resultUrl = canvas.toDataURL('image/jpeg', 0.96);
    setCroppedDataUrl(resultUrl);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - posX, y: e.clientY - posY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosX(e.clientX - dragStart.x);
    setPosY(e.clientY - dragStart.y);
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - posX, y: e.touches[0].clientY - posY });
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !e.touches || e.touches.length !== 1) return;
    setPosX(e.touches[0].clientX - dragStart.x);
    setPosY(e.touches[0].clientY - dragStart.y);
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleReset = () => {
    setImageSrc(null);
    setCroppedDataUrl(null);
    imageObjRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-5 sm:p-8 font-sans">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Official Document Security Guaranteed (100% Offline)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
            Smart ID & Document Cropper (PVC Card Size)
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Crop Ration Card, PAN, Ayushman, Voter or Aadhaar card into standard PVC (85.6 x 54 mm) size.
          </p>
        </div>

        {imageSrc && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-3.5 py-2 rounded-xl transition self-start sm:self-auto"
          >
            <RefreshCw className="w-3.5 h-3.5" /> New Document
          </button>
        )}
      </div>

      {!imageSrc ? (
        /* Upload Area */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-emerald-300 hover:border-emerald-600 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-4"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,application/pdf"
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <Crop className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 font-sans">
              Upload Document or ID Card Photo
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md">
              Select Ration Card, PAN Card, Aadhaar, Voter ID or official signature image
            </p>
          </div>
          <button
            type="button"
            className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition"
          >
            Browse File
          </button>
        </div>
      ) : (
        /* Interactive Workspace */
        <div className="space-y-6">
          
          {/* Preset Buttons Grid */}
          <div>
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-2.5">
              Select Standard PVC Format:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {PRESETS.map((preset) => {
                const isSelected = selectedPreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setSelectedPreset(preset);
                      setCroppedDataUrl(null);
                    }}
                    className={`p-3 rounded-2xl text-left border transition-all ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-500/20 shadow-md scale-[1.02]'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-xs">{preset.name}</p>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {preset.badge}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{preset.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Crop Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div className="lg:col-span-8 bg-slate-950 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center overflow-hidden border border-slate-800 shadow-2xl">
              <p className="text-xs text-slate-300 text-center mb-3 px-2 font-sans">
                Drag the document with your mouse to position inside the frame and adjust size with zoom controls:
              </p>

              {/* Crop Viewport Box */}
              <div
                className="relative overflow-hidden border-2 border-amber-400 shadow-2xl cursor-grab active:cursor-grabbing bg-slate-900 flex items-center justify-center touch-none select-none rounded-xl"
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  aspectRatio: `${selectedPreset.ratio}`,
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleTouchEnd}
              >
                {/* Guidelines overlay */}
                <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none border border-white/20">
                  <div className="border-r border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-r border-b border-white/10" />
                  <div className="border-b border-white/10" />
                  <div className="border-r border-white/10" />
                  <div className="border-r border-white/10" />
                  <div />
                </div>

                <img
                  src={imageSrc}
                  alt="Crop preview"
                  draggable={false}
                  className="max-w-none select-none transition-transform duration-75 pointer-events-none"
                  style={{
                    transform: `translate(${posX}px, ${posY}px) scale(${zoom})`,
                  }}
                />
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-3 mt-4 text-white text-xs font-sans">
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono px-1">{(zoom * 100).toFixed(0)}%</span>
                <button
                  onClick={() => setZoom(Math.min(3.5, zoom + 0.1))}
                  className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl transition"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setZoom(1);
                    setPosX(0);
                    setPosY(0);
                  }}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-semibold transition"
                >
                  Reset
                </button>
              </div>

              {/* Crop Trigger Button */}
              <button
                onClick={handleCrop}
                className="w-full max-w-sm mt-4 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95 font-sans"
              >
                <Crop className="w-4 h-4" />
                <span>Crop to Perfect PVC Size</span>
              </button>
            </div>

            {/* Output Result Card */}
            <div className="lg:col-span-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 font-sans">
              <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>PVC Result Preview</span>
              </h4>

              {croppedDataUrl ? (
                <div className="space-y-4">
                  <div
                    className="w-full rounded-xl overflow-hidden border border-slate-300 shadow-md bg-white p-1"
                    style={{ aspectRatio: `${selectedPreset.ratio}` }}
                  >
                    <img
                      src={croppedDataUrl}
                      alt="Cropped Result"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-xs text-slate-500 space-y-1 bg-white p-3 rounded-xl border border-slate-200">
                    <p>Format: <strong className="text-slate-800">{selectedPreset.name}</strong></p>
                    <p>Resolution: <strong className="text-slate-800">{selectedPreset.width} x {selectedPreset.height} px</strong></p>
                    <p>Print Size: <strong className="text-emerald-700">85.6 x 54 mm (Standard PVC)</strong></p>
                  </div>

                  <a
                    href={croppedDataUrl}
                    download={`pvc_card_${selectedPreset.id}_${fileName || 'card.jpg'}`}
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg transition font-sans"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PVC Card</span>
                  </a>
                </div>
              ) : (
                <div className="h-44 sm:h-52 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-center p-4 text-xs text-slate-400 font-sans">
                  <CreditCard className="w-8 h-8 text-slate-300 mb-2" />
                  Adjust photo in the left box and click "Crop to Perfect PVC Size" to preview and download your PVC card here.
                </div>
              )}

            </div>

          </div>

        </div>
      )}
    </div>
  );
}
