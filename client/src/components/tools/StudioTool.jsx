import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Download, Printer, RefreshCw, Scissors, Sparkles, Check, ZoomIn, ZoomOut, Layers } from 'lucide-react';

const SHEET_LAYOUTS = [
  { id: '4x6-2', name: '2 Photos', page: '4x6 Page', paper: '4x6', count: 2, cols: 2, rows: 1 },
  { id: '4x6-6', name: '6 Photos', page: '4x6 Page', paper: '4x6', count: 6, cols: 3, rows: 2 },
  { id: '4x6-12', name: '12 Photos', page: '4x6 Page', paper: '4x6', count: 12, cols: 4, rows: 3 },
  { id: '4x6-16', name: '16 Photos', page: '4x6 Landscape', paper: '4x6-landscape', count: 16, cols: 4, rows: 4 },
  { id: 'a4-32', name: '32 Photos', page: 'A4 Size Photos', paper: 'a4', count: 32, cols: 4, rows: 8 },
  { id: 'a4-top4', name: 'A4 Top Row', page: '4 Photos', paper: 'a4', count: 4, cols: 4, rows: 1 },
  { id: 'a4-top8', name: 'A4 Top 2 Rows', page: '8 Photos', paper: 'a4', count: 8, cols: 4, rows: 2 },
];

export default function StudioTool() {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedLayout, setSelectedLayout] = useState(SHEET_LAYOUTS[1]); // 6 Photos on 4x6 default
  const [showCutLines, setShowCutLines] = useState(true);
  const [photoBorder, setPhotoBorder] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [sheetDataUrl, setSheetDataUrl] = useState(null);

  const fileInputRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const imageObjRef = useRef(null);

  // Handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        imageObjRef.current = img;
        renderSheet(img, selectedLayout, showCutLines, photoBorder);
      };
    };
    reader.readAsDataURL(file);
  };

  // Render sheet on canvas
  const renderSheet = (img, layout, cutLines, border) => {
    if (!img) return;
    setIsGenerating(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Standard 300 DPI pixel dimensions
    // 4x6 inch = 1200 x 1800 px (Portrait) or 1800 x 1200 px (Landscape)
    // A4 = 2480 x 3508 px @ 300 DPI
    let paperWidth = 1200;
    let paperHeight = 1800;

    if (layout.paper === '4x6-landscape') {
      paperWidth = 1800;
      paperHeight = 1200;
    } else if (layout.paper === 'a4') {
      paperWidth = 2480;
      paperHeight = 3508;
    }

    canvas.width = paperWidth;
    canvas.height = paperHeight;

    // Fill white background for printing paper
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, paperWidth, paperHeight);

    // Standard Passport photo size @ 300 DPI: 3.5 cm x 4.5 cm = ~413 x 531 px
    const photoWidth = layout.paper === 'a4' ? 413 : (layout.paper === '4x6-landscape' ? 360 : 340);
    const photoHeight = Math.round(photoWidth * (4.5 / 3.5)); // 3.5:4.5 ratio

    const cols = layout.cols;
    const rows = layout.rows;
    const count = layout.count;

    // Calculate grid margins and spacing
    const totalGridW = cols * photoWidth;
    const remainingW = paperWidth - totalGridW;
    const gapX = Math.max(20, Math.floor(remainingW / (cols + 1)));
    const startX = Math.floor((paperWidth - (cols * photoWidth + (cols - 1) * gapX)) / 2);

    let startY = 60;
    let gapY = 30;

    if (layout.paper === 'a4') {
      startY = 80;
      gapY = 35;
    } else {
      const totalGridH = rows * photoHeight;
      const remainingH = paperHeight - totalGridH;
      gapY = Math.max(24, Math.floor(remainingH / (rows + 1)));
      startY = Math.floor((paperHeight - (rows * photoHeight + (rows - 1) * gapY)) / 2);
    }

    // Draw each photo into grid
    let drawn = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (drawn >= count) break;

        const x = startX + c * (photoWidth + gapX);
        const y = startY + r * (photoHeight + gapY);

        // Crop source image to center 3.5:4.5 aspect ratio
        const imgAspect = img.width / img.height;
        const targetAspect = 3.5 / 4.5;
        let sWidth = img.width;
        let sHeight = img.height;
        let sX = 0;
        let sY = 0;

        if (imgAspect > targetAspect) {
          sWidth = img.height * targetAspect;
          sX = (img.width - sWidth) / 2;
        } else {
          sHeight = img.width / targetAspect;
          sY = (img.height - sHeight) / 4; // slight top bias for faces
        }

        ctx.drawImage(img, sX, sY, sWidth, sHeight, x, y, photoWidth, photoHeight);

        // Optional thin black border
        if (border) {
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, photoWidth, photoHeight);
        }

        // Optional cut lines (scissors dashed tick marks around photo corners)
        if (cutLines) {
          ctx.strokeStyle = '#cbd5e1';
          ctx.lineWidth = 1;
          const markLen = 8;
          // Top-left
          ctx.beginPath();
          ctx.moveTo(x - markLen, y); ctx.lineTo(x, y);
          ctx.moveTo(x, y - markLen); ctx.lineTo(x, y);
          // Top-right
          ctx.moveTo(x + photoWidth, y); ctx.lineTo(x + photoWidth + markLen, y);
          ctx.moveTo(x + photoWidth, y - markLen); ctx.lineTo(x + photoWidth, y);
          // Bottom-left
          ctx.moveTo(x - markLen, y + photoHeight); ctx.lineTo(x, y + photoHeight);
          ctx.moveTo(x, y + photoHeight); ctx.lineTo(x, y + photoHeight + markLen);
          // Bottom-right
          ctx.moveTo(x + photoWidth, y + photoHeight); ctx.lineTo(x + photoWidth + markLen, y + photoHeight);
          ctx.moveTo(x + photoWidth, y + photoHeight); ctx.lineTo(x + photoWidth, y + photoHeight + markLen);
          ctx.stroke();
        }

        drawn++;
      }
    }

    // Header watermark / info text on top edge
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Open Concept Bangla Studio Maker • Standard 3.5 x 4.5 cm (300 DPI)', startX, Math.max(35, startY - 20));

    const resultUrl = canvas.toDataURL('image/jpeg', 0.96);
    setSheetDataUrl(resultUrl);
    setIsGenerating(false);

    // Draw preview thumbnail onto the visual preview canvas
    if (previewCanvasRef.current) {
      const pCanvas = previewCanvasRef.current;
      const pCtx = pCanvas.getContext('2d');
      const maxW = 420;
      const scale = maxW / paperWidth;
      pCanvas.width = maxW;
      pCanvas.height = paperHeight * scale;
      pCtx.drawImage(canvas, 0, 0, pCanvas.width, pCanvas.height);
    }
  };

  // Re-render when layout or settings change
  useEffect(() => {
    if (imageObjRef.current) {
      renderSheet(imageObjRef.current, selectedLayout, showCutLines, photoBorder);
    }
  }, [selectedLayout, showCutLines, photoBorder]);

  const handlePrint = () => {
    if (!sheetDataUrl) return;
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Passport Photo Print Sheet - Open Concept Bangla</title>
          <style>
            @page { margin: 0; size: auto; }
            body { margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; background: white; }
            img { max-width: 100%; height: auto; display: block; }
          </style>
        </head>
        <body>
          <img src="${sheetDataUrl}" onload="window.print(); window.close();" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden mb-12">
      {/* Studio Banner Header */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 p-6 sm:p-7 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
            <Camera className="w-7 h-7 text-amber-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
                Studio Tool
              </h2>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                PRO
              </span>
            </div>
            <p className="text-blue-100 text-xs sm:text-sm mt-0.5">
              Passport Photo Sheet Maker • 4x6 & A4 Photo Paper Instant Generator
            </p>
          </div>
        </div>

        <div className="inline-flex items-center self-start md:self-auto gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-xs font-mono text-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>3.5 x 4.5 cm (@ 300 DPI)</span>
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-8">
        {/* Upload and Live Preview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Upload & Controls Box */}
          <div className="lg:col-span-6 space-y-5">
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3 ${
                imageSrc
                  ? 'border-indigo-300 bg-indigo-50/30 hover:bg-indigo-50/60'
                  : 'border-blue-300 bg-blue-50/20 hover:bg-blue-50/50 hover:border-blue-500'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  {imageSrc ? 'অন্য ছবি পরিবর্তন করতে ক্লিক করুন' : 'Upload Passport Size Photo'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  JPG / PNG / WebP — 3.5x4.5 cm অটো কাট ও সেন্টারিং সাপোর্ট
                </p>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow transition"
              >
                {imageSrc ? 'ছবি বদলান' : 'ছবি নির্বাচন করুন'}
              </button>
            </div>

            {/* Layout Presets Buttons */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-600" />
                  <span>প্রিন্ট শিট লেআউট নির্বাচন করুন:</span>
                </label>
                <span className="text-[11px] text-slate-400 font-mono">
                  {selectedLayout.paper.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SHEET_LAYOUTS.map((layout) => {
                  const isSelected = selectedLayout.id === layout.id;
                  return (
                    <button
                      key={layout.id}
                      type="button"
                      onClick={() => setSelectedLayout(layout)}
                      className={`p-2.5 rounded-xl text-left border transition-all ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20 scale-[1.02]'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <p className="font-bold text-xs leading-snug">{layout.name}</p>
                      <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-400'}`}>
                        {layout.page}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Sheet Toggles */}
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={showCutLines}
                  onChange={(e) => setShowCutLines(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <Scissors className="w-3.5 h-3.5 text-slate-400" />
                <span>কাটিং বর্ডার ও মার্কস (Cut Lines)</span>
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={photoBorder}
                  onChange={(e) => setPhotoBorder(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>পাতলা সীমানা রেখা (Thin Border)</span>
              </label>
            </div>

            {/* Helper Specs text */}
            <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 leading-relaxed border border-slate-200/70">
              💡 <strong>টিপস:</strong> 4x6 ইঞ্চি গ্লসি বা ম্যাট ফটো পেপারে প্রিন্ট করার জন্য <strong>6 Photos</strong> অথবা <strong>12 Photos</strong> সবচেয়ে আদর্শ। A4 পেপারে সর্বোচ্চ ৩২টি ফটো একবারে নিখুঁতভাবে প্রিন্ট করা যায়।
            </div>
          </div>

          {/* Right Live Dark Canvas Preview */}
          <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between min-h-[440px] border border-slate-800 shadow-2xl">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
              <span className="flex items-center gap-1.5 font-bold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Photo Sheet Live Dark Canvas Preview
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {selectedLayout.name} ({selectedLayout.paper.toUpperCase()})
              </span>
            </div>

            {/* Canvas Viewport */}
            <div className="my-4 flex items-center justify-center w-full max-h-[360px] overflow-hidden">
              {imageSrc ? (
                <div className="p-2 bg-slate-900 rounded-xl shadow-2xl border border-slate-700/80 flex items-center justify-center">
                  <canvas
                    ref={previewCanvasRef}
                    className="max-h-[320px] max-w-full w-auto object-contain rounded shadow-lg bg-white"
                  />
                </div>
              ) : (
                <div className="h-64 sm:h-72 w-full border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-slate-600 mb-2">
                    <Camera className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-semibold text-slate-400">
                    Photo upload kore enter preview wet see
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1 max-w-xs">
                    বামদিকের বক্সে পাসপোর্ট ছবি আপলোড করলে লাইভ শিট অটোমেটিক তৈরি হয়ে যাবে।
                  </p>
                </div>
              )}
            </div>

            {/* Actions Bar */}
            <div className="w-full pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              <button
                disabled={!sheetDataUrl}
                onClick={handlePrint}
                className="w-full sm:w-1/2 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>সরাসরি প্রিন্ট (Print)</span>
              </button>

              <a
                href={sheetDataUrl || '#'}
                download={sheetDataUrl ? `passport_sheet_${selectedLayout.id}_${fileName || 'sheet'}.jpg` : undefined}
                className={`w-full sm:w-1/2 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition ${
                  sheetDataUrl
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-900/30'
                    : 'bg-slate-800 text-slate-500 opacity-40 cursor-not-allowed'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>300 DPI শিট ডাউনলোড</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
