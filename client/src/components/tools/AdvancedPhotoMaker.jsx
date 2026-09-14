import React, { useState, useRef, useEffect } from 'react';
import { Sliders, Upload, Download, Crop, RefreshCw, ZoomIn, ZoomOut, Check, Layers, Sparkles } from 'lucide-react';

export default function AdvancedPhotoMaker() {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState('');
  const [unit, setUnit] = useState('cm'); // 'inch' | 'cm' | 'mm'
  const [widthVal, setWidthVal] = useState(3.5);
  const [heightVal, setHeightVal] = useState(4.5);
  const [dpiVal, setDpiVal] = useState(300);
  const [count4x6, setCount4x6] = useState(6);
  const [countA4, setCountA4] = useState(16);
  const [borderLine, setBorderLine] = useState(true);

  // Zoom & Pan state for crop
  const [zoom, setZoom] = useState(1);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef(null);
  const imageObjRef = useRef(null);
  const darkCanvasRef = useRef(null);

  // Handle unit switch defaults
  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    if (newUnit === 'cm') {
      setWidthVal(3.5);
      setHeightVal(4.5);
    } else if (newUnit === 'mm') {
      setWidthVal(35);
      setHeightVal(45);
    } else if (newUnit === 'inch') {
      setWidthVal(1.38);
      setHeightVal(1.77);
    }
  };

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
        setZoom(1);
        setPosX(0);
        setPosY(0);
        renderPreview();
      };
    };
    reader.readAsDataURL(file);
  };

  // Convert unit dimensions to pixels at DPI
  const getPixelDimensions = () => {
    let wInch = 1.38;
    let hInch = 1.77;

    if (unit === 'inch') {
      wInch = Number(widthVal) || 1.38;
      hInch = Number(heightVal) || 1.77;
    } else if (unit === 'cm') {
      wInch = (Number(widthVal) || 3.5) / 2.54;
      hInch = (Number(heightVal) || 4.5) / 2.54;
    } else if (unit === 'mm') {
      wInch = (Number(widthVal) || 35) / 25.4;
      hInch = (Number(heightVal) || 45) / 25.4;
    }

    const wPx = Math.round(wInch * dpiVal);
    const hPx = Math.round(hInch * dpiVal);
    return { wPx, hPx, ratio: wPx / hPx };
  };

  // Render dark preview canvas
  const renderPreview = () => {
    if (!imageObjRef.current || !darkCanvasRef.current) return;
    const canvas = darkCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imageObjRef.current;
    const { wPx, hPx, ratio } = getPixelDimensions();

    const maxCanvasW = 380;
    const maxCanvasH = 260;
    let drawBoxW = maxCanvasW;
    let drawBoxH = maxCanvasW / ratio;

    if (drawBoxH > maxCanvasH) {
      drawBoxH = maxCanvasH;
      drawBoxW = maxCanvasH * ratio;
    }

    canvas.width = maxCanvasW;
    canvas.height = maxCanvasH;

    // Dark canvas background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, maxCanvasW, maxCanvasH);

    // Center viewport frame
    const frameX = (maxCanvasW - drawBoxW) / 2;
    const frameY = (maxCanvasH - drawBoxH) / 2;

    ctx.save();
    ctx.beginPath();
    ctx.rect(frameX, frameY, drawBoxW, drawBoxH);
    ctx.clip();

    // Fill photo paper white inside frame
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(frameX, frameY, drawBoxW, drawBoxH);

    // Draw scaled & panned image
    const baseScale = Math.max(drawBoxW / img.width, drawBoxH / img.height);
    const finalScale = baseScale * zoom;
    const dW = img.width * finalScale;
    const dH = img.height * finalScale;
    const dX = frameX + (drawBoxW - dW) / 2 + posX;
    const dY = frameY + (drawBoxH - dH) / 2 + posY;

    ctx.drawImage(img, dX, dY, dW, dH);
    ctx.restore();

    // Frame border and grid lines
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(frameX, frameY, drawBoxW, drawBoxH);

    // Optional thin border
    if (borderLine) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(frameX + 2, frameY + 2, drawBoxW - 4, drawBoxH - 4);
    }
  };

  useEffect(() => {
    renderPreview();
  }, [imageSrc, unit, widthVal, heightVal, dpiVal, zoom, posX, posY, borderLine]);

  // Drag handlers
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

  // Generate cropped single photo
  const generateCroppedSingle = () => {
    if (!imageObjRef.current) return null;
    const img = imageObjRef.current;
    const { wPx, hPx } = getPixelDimensions();

    const canvas = document.createElement('canvas');
    canvas.width = wPx;
    canvas.height = hPx;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, wPx, hPx);

    // Calculate crop
    const baseScale = Math.max(wPx / img.width, hPx / img.height);
    const finalScale = baseScale * zoom;
    const dW = img.width * finalScale;
    const dH = img.height * finalScale;
    const dX = (wPx - dW) / 2 + (posX * (wPx / 300));
    const dY = (hPx - dH) / 2 + (posY * (hPx / 300));

    ctx.drawImage(img, dX, dY, dW, dH);

    if (borderLine) {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, wPx, hPx);
    }

    return canvas;
  };

  // Download printable sheet for 4x6 or A4
  const handleDownloadSheet = (paperType, count) => {
    const singleCanvas = generateCroppedSingle();
    if (!singleCanvas) return;

    const sheet = document.createElement('canvas');
    const ctx = sheet.getContext('2d');

    let paperW = 1200;
    let paperH = 1800;
    let cols = 4;
    let rows = 4;

    if (paperType === 'a4') {
      paperW = 2480;
      paperH = 3508;
      cols = 4;
      rows = 8;
    }

    sheet.width = paperW;
    sheet.height = paperH;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, paperW, paperH);

    const { wPx, hPx } = getPixelDimensions();
    // Scale photo to fit neatly on page
    const fitScale = Math.min((paperW * 0.22) / wPx, (paperH * 0.11) / hPx);
    const photoW = Math.round(wPx * fitScale);
    const photoH = Math.round(hPx * fitScale);

    const gapX = Math.floor((paperW - cols * photoW) / (cols + 1));
    const gapY = Math.floor((paperH - rows * photoH) / (rows + 1));

    let drawn = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (drawn >= count) break;
        const x = gapX + c * (photoW + gapX);
        const y = gapY + r * (photoH + gapY);

        ctx.drawImage(singleCanvas, x, y, photoW, photoH);

        // Cutting mark lines
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, photoW, photoH);

        drawn++;
      }
    }

    const dataUrl = sheet.toDataURL('image/jpeg', 0.95);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `custom_photo_sheet_${paperType}_${count}photos_${fileName || 'doc'}.jpg`;
    link.click();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden mb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-800 p-6 sm:p-7 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-13 h-13 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-inner">
            <Crop className="w-7 h-7 text-emerald-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">
                Advanced Photo Maker
              </h2>
              <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                CUSTOM
              </span>
            </div>
            <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
              Custom Size Crop + Grid & A4 Photo Sheet Generator
            </p>
          </div>
        </div>

        {/* Units Switcher Pills */}
        <div className="inline-flex items-center bg-white/10 p-1 rounded-2xl border border-white/20 backdrop-blur-md self-start md:self-auto">
          {['inch', 'cm', 'mm'].map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => handleUnitChange(u)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition ${
                unit === u
                  ? 'bg-white text-emerald-900 shadow-md scale-105'
                  : 'text-white hover:text-emerald-200'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-8 space-y-8">
        {/* Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Upload & Custom Dimensions */}
          <div className="lg:col-span-6 space-y-5">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-emerald-300 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-2xl p-7 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-3"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/20">
                <Upload className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800 font-sans">
                  {imageSrc ? 'Click to change photo' : 'Upload Photo'}
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-sans">
                  JPG / PNG / WebP — Custom size crop & grid maker
                </p>
              </div>
              <button
                type="button"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow transition font-sans"
              >
                {imageSrc ? 'Change Photo' : 'Select Photo'}
              </button>
            </div>

            {/* Dimension Inputs */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 font-sans">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
                <Sliders className="w-3.5 h-3.5 text-emerald-600" />
                <span>Custom Size & Resolution ({unit.toUpperCase()}):</span>
              </label>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block mb-1">
                    Width:
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      step={unit === 'inch' ? '0.05' : '0.1'}
                      value={widthVal}
                      onChange={(e) => setWidthVal(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 uppercase font-mono">
                      {unit}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block mb-1">
                    Height:
                  </span>
                  <div className="relative">
                    <input
                      type="number"
                      step={unit === 'inch' ? '0.05' : '0.1'}
                      value={heightVal}
                      onChange={(e) => setHeightVal(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <span className="absolute right-2.5 top-2 text-[10px] text-slate-400 uppercase font-mono">
                      {unit}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-500 font-semibold block mb-1">
                    Print DPI:
                  </span>
                  <select
                    value={dpiVal}
                    onChange={(e) => setDpiVal(Number(e.target.value))}
                    className="w-full px-2.5 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value={100}>100 DPI</option>
                    <option value={200}>200 DPI</option>
                    <option value={300}>300 DPI</option>
                    <option value={600}>600 DPI</option>
                  </select>
                </div>
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={borderLine}
                    onChange={(e) => setBorderLine(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>Add cutting border outline</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Live Dark Canvas Preview */}
          <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-between min-h-[380px] border border-slate-800 shadow-2xl font-sans">
            <div className="w-full flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
              <span className="flex items-center gap-1.5 font-bold text-slate-200">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                Crop Template Live Preview Canvas
              </span>
              <span className="text-[11px] font-mono text-emerald-400">
                {widthVal} x {heightVal} {unit} @ {dpiVal} DPI
              </span>
            </div>

            {/* Canvas Box */}
            <div
              className="my-3 flex items-center justify-center w-full cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {imageSrc ? (
                <div className="p-2 bg-slate-900 rounded-xl shadow-2xl border border-slate-700/80">
                  <canvas ref={darkCanvasRef} className="rounded object-contain" />
                </div>
              ) : (
                <div className="h-56 w-full border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <Crop className="w-10 h-10 text-slate-600 mb-2" />
                  <p className="text-xs font-semibold text-slate-400">
                    Crop template live preview will display here
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1 max-w-xs">
                    After uploading, click and drag with your mouse to zoom and position the photo.
                  </p>
                </div>
              )}
            </div>

            {/* Zoom Controls */}
            {imageSrc && (
              <div className="flex items-center gap-3 text-white text-xs pb-2">
                <button
                  type="button"
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px]">{(zoom * 100).toFixed(0)}%</span>
                <button
                  type="button"
                  onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setZoom(1);
                    setPosX(0);
                    setPosY(0);
                  }}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-[10px] rounded-lg transition font-semibold"
                >
                  Reset
                </button>
              </div>
            )}

            {/* Helper text */}
            <p className="text-[11px] text-slate-400 text-center">
              Click and drag mouse over image to adjust position freely.
            </p>
          </div>

        </div>

        {/* 4x6 & A4 Output Action Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100 font-sans">
          
          {/* 4 x 6 Page Output Box */}
          <div className="p-5 bg-gradient-to-br from-indigo-50/60 to-purple-50/60 rounded-2xl border border-indigo-200/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span>4 x 6 Page Output</span>
                </h4>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  Standard Photo Paper
                </span>
              </div>
              <p className="text-xs text-slate-600">
                How many photos? (Print 1 to 16 photos together on 4x6 paper)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-28">
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={count4x6}
                  onChange={(e) => setCount4x6(Math.max(1, Math.min(16, Number(e.target.value))))}
                  className="w-full px-3 py-2.5 text-sm font-black text-slate-900 bg-white border border-indigo-300 rounded-xl text-center focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <button
                disabled={!imageSrc}
                onClick={() => handleDownloadSheet('4x6', count4x6)}
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-indigo-600/20 transition"
              >
                <Download className="w-4 h-4" />
                <span>Download 4x6</span>
              </button>
            </div>
            <span className="text-[10px] text-slate-400">
              Select photo count and click download to get standard 4x6 sheet
            </span>
          </div>

          {/* A4 Page Output Box */}
          <div className="p-5 bg-gradient-to-br from-teal-50/60 to-emerald-50/60 rounded-2xl border border-teal-200/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-teal-700" />
                  <span>A4 Page Output</span>
                </h4>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                  Full A4 Size Sheet
                </span>
              </div>
              <p className="text-xs text-slate-600">
                How many photos? (Print 1 to 32 photos arranged on full A4 sheet)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-28">
                <input
                  type="number"
                  min="1"
                  max="32"
                  value={countA4}
                  onChange={(e) => setCountA4(Math.max(1, Math.min(32, Number(e.target.value))))}
                  className="w-full px-3 py-2.5 text-sm font-black text-slate-900 bg-white border border-teal-300 rounded-xl text-center focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <button
                disabled={!imageSrc}
                onClick={() => handleDownloadSheet('a4', countA4)}
                className="flex-1 py-2.5 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md shadow-teal-600/20 transition"
              >
                <Download className="w-4 h-4" />
                <span>Download A4</span>
              </button>
            </div>
            <span className="text-[10px] text-slate-400">
              Select photo count and click download to get full A4 sheet
            </span>
          </div>

        </div>


      </div>
    </div>
  );
}
