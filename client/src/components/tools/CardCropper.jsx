import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, Crop, ShieldCheck, RefreshCw, ZoomIn, ZoomOut, CheckCircle2 } from 'lucide-react';

const PRESETS = [
  { id: 'aadhaar', name: 'আধার কার্ড', ratio: 85.6 / 54, width: 856, height: 540, desc: 'স্ট্যান্ডার্ড আইডি অনুপাত' },
  { id: 'pan', name: 'প্যান কার্ড', ratio: 85.6 / 54, width: 856, height: 540, desc: 'অফিসিয়াল প্যান কার্ড' },
  { id: 'voter', name: 'ভোটার কার্ড', ratio: 86 / 54, width: 860, height: 540, desc: 'ইপিক (EPIC) ভোটার আইডি' },
  { id: 'signature', name: 'অফিসিয়াল স্বাক্ষর', ratio: 140 / 60, width: 280, height: 120, desc: '১৪০ x ৬০ পিক্সেল বক্স' },
  { id: 'passport', name: 'পাসপোর্ট সাইজ ফটো', ratio: 3.5 / 4.5, width: 350, height: 450, desc: '৩.৫ সেমি x ৪.৫ সেমি' },
];

export default function CardCropper() {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [zoom, setZoom] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [croppedDataUrl, setCroppedDataUrl] = useState(null);

  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const imageObjRef = useRef(null);

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

    const resultUrl = canvas.toDataURL('image/jpeg', 0.95);
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

  const handleReset = () => {
    setImageSrc(null);
    setCroppedDataUrl(null);
    imageObjRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>অফিসিয়াল ডকুমেন্টস সুরক্ষা নিশ্চিত</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-bengali">
            স্মার্ট কার্ড ও অফিশিয়াল স্বাক্ষর ক্রপার
          </h2>
          <p className="text-sm text-slate-500">
            আধার, ভোটার, প্যান কার্ড বা যেকোনো আইডি ডকুমেন্ট নির্দিষ্ট স্ট্যান্ডার্ড অনুপাতে ক্রপ করুন।
          </p>
        </div>

        {imageSrc && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-3.5 py-2 rounded-xl transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> নতুন ছবি
          </button>
        )}
      </div>

      {!imageSrc ? (
        /* Upload Area */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-emerald-300 hover:border-brand-600 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-2xl p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-4"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30">
            <Crop className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-bengali">
              ডকুমেন্ট বা আইডি কার্ডের ছবি আপলোড করুন
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              আধার কার্ড, ভোটার কার্ড, প্যান কার্ড বা স্বাক্ষর সিলেক্ট করুন
            </p>
          </div>
          <span className="px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl shadow transition">
            ফাইল ব্রাউজ করুন
          </span>
        </div>
      ) : (
        /* Interactive Workspace */
        <div className="space-y-6">
          
          {/* Preset Buttons */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              স্ট্যান্ডার্ড ফরম্যাট নির্বাচন করুন:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setSelectedPreset(preset);
                    setCroppedDataUrl(null);
                  }}
                  className={`p-3 rounded-xl text-left border transition ${
                    selectedPreset.id === preset.id
                      ? 'bg-brand-50 border-brand-600 text-brand-800 ring-2 ring-brand-500/20 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-bold text-xs">{preset.name}</p>
                  <p className="text-[10px] text-slate-500">{preset.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Crop Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            <div className="lg:col-span-8 bg-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden">
              <p className="text-xs text-slate-400 mb-2">
                ছবিটি মাউস দিয়ে টেনে (Drag) সঠিক অবস্থানে বসান এবং জুম করুন:
              </p>

              {/* Crop Viewport Box */}
              <div
                className="relative overflow-hidden border-2 border-accent shadow-2xl cursor-grab active:cursor-grabbing bg-slate-800 flex items-center justify-center"
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  aspectRatio: `${selectedPreset.ratio}`,
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
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
                  className="max-w-none select-none transition-transform duration-75"
                  style={{
                    transform: `translate(${posX}px, ${posY}px) scale(${zoom})`,
                  }}
                />
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-4 mt-4 text-white text-xs">
                <button
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg"
                  title="জুম আউট"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="font-mono">{(zoom * 100).toFixed(0)}%</span>
                <button
                  onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg"
                  title="জুম ইন"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setZoom(1);
                    setPosX(0);
                    setPosY(0);
                  }}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold"
                >
                  রিসেট
                </button>
              </div>

              {/* Crop Trigger Button */}
              <button
                onClick={handleCrop}
                className="w-full max-w-sm mt-4 py-3 bg-accent hover:bg-accent-hover text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
              >
                <Crop className="w-4 h-4" />
                <span>পারফেক্ট সাইজে ক্রপ করুন</span>
              </button>
            </div>

            {/* Output Result Card */}
            <div className="lg:col-span-4 p-5 bg-slate-50 rounded-2xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ক্রপ রেজাল্ট প্রিভিউ</span>
              </h4>

              {croppedDataUrl ? (
                <div className="space-y-4">
                  <div
                    className="w-full rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-white p-1"
                    style={{ aspectRatio: `${selectedPreset.ratio}` }}
                  >
                    <img
                      src={croppedDataUrl}
                      alt="Cropped Result"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <p>ফরম্যাট: <strong className="text-slate-700">{selectedPreset.name}</strong></p>
                    <p>রেজোলিউশন: <strong className="text-slate-700">{selectedPreset.width} x {selectedPreset.height} px</strong></p>
                  </div>

                  <a
                    href={croppedDataUrl}
                    download={`cropped_${selectedPreset.id}_${fileName || 'document.jpg'}`}
                    className="w-full py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>ডাউনলোড করুন</span>
                  </a>
                </div>
              ) : (
                <div className="h-48 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-center p-4 text-xs text-slate-400">
                  বামদিকের ছবি এডজাস্ট করে "পারফেক্ট সাইজে ক্রপ করুন" বাটনে ক্লিক করলে এখানে ফাইনাল ডাউনলোড বাটন তৈরি হবে।
                </div>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
