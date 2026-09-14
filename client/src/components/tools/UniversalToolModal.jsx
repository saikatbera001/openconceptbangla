import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Upload, 
  Download, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  Sliders, 
  Crop, 
  RotateCw, 
  FlipHorizontal, 
  Type, 
  Layers, 
  Sparkles,
  FileImage,
  Sun,
  Eye,
  FileText
} from 'lucide-react';

export default function UniversalToolModal({ tool, initialKb, onClose }) {
  const [imageSrc, setImageSrc] = useState(null);
  const [secondImageSrc, setSecondImageSrc] = useState(null);
  const [fileName, setFileName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  const [resultSizeKb, setResultSizeKb] = useState(null);

  // Dynamic parameters according to active tool
  const [customW, setCustomW] = useState(tool?.defaultWidth || 350);
  const [customH, setCustomH] = useState(tool?.defaultHeight || 450);
  const [targetKb, setTargetKb] = useState(initialKb || tool?.targetKb || 50);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [flipH, setFlipH] = useState(false);
  const [flipV, setFlipV] = useState(false);
  const [cornerRadius, setCornerRadius] = useState(24);
  const [watermarkText, setWatermarkText] = useState('e-tek solution');
  const [dpi, setDpi] = useState(300);
  const [format, setFormat] = useState(tool?.targetFormat || 'image/jpeg');
  const [blurAmount, setBlurAmount] = useState(4);
  const [pixelateSize, setPixelateSize] = useState(8);
  const [joinDirection, setJoinDirection] = useState('horizontal'); // 'horizontal' | 'vertical'

  const fileInputRef = useRef(null);
  const secondFileInputRef = useRef(null);
  const imgObjRef = useRef(null);
  const secondImgObjRef = useRef(null);

  // Handle main file
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
        imgObjRef.current = img;
        if (!tool?.defaultWidth) {
          setCustomW(img.width);
          setCustomH(img.height);
        }
        processTool();
      };
    };
    reader.readAsDataURL(file);
  };

  // Handle second file (for join or photo+sig merge)
  const handleSecondFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setSecondImageSrc(event.target.result);
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        secondImgObjRef.current = img;
        processTool();
      };
    };
    reader.readAsDataURL(file);
  };

  // Main tool processor
  const processTool = () => {
    const img = imgObjRef.current;
    if (!img) return;

    const toolId = tool?.id;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 1. Photo & Signature Merge
    if (toolId === 'photo-signature-merge') {
      const cardW = 350;
      const photoH = 450;
      const sigH = 120;
      const totalH = photoH + sigH;

      canvas.width = cardW;
      canvas.height = totalH;

      // Draw photo top
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, cardW, totalH);
      ctx.drawImage(img, 0, 0, cardW, photoH);

      // Divider line
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, cardW, photoH);

      // Draw signature bottom
      if (secondImgObjRef.current) {
        ctx.drawImage(secondImgObjRef.current, 10, photoH + 10, cardW - 20, sigH - 20);
      } else {
        ctx.fillStyle = '#94a3b8';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Upload Signature Below', cardW / 2, photoH + 55);
      }

      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, cardW, totalH);

      finishOutput(canvas, 'image/jpeg', 0.92);
      return;
    }

    // 2. Join Multiple Images
    if (toolId === 'join-multiple-images') {
      const img2 = secondImgObjRef.current;
      if (img2) {
        if (joinDirection === 'horizontal') {
          canvas.width = img.width + img2.width;
          canvas.height = Math.max(img.height, img2.height);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          ctx.drawImage(img2, img.width, 0);
        } else {
          canvas.width = Math.max(img.width, img2.width);
          canvas.height = img.height + img2.height;
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          ctx.drawImage(img2, 0, img.height);
        }
      } else {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      }
      finishOutput(canvas, 'image/jpeg', 0.92);
      return;
    }

    // Determine dimensions
    let targetW = customW || img.width;
    let targetH = customH || img.height;

    if (toolId === 'pan-card-photo') {
      targetW = 213; targetH = 213;
    } else if (toolId === 'ssc-photo-resize') {
      targetW = 350; targetH = 450;
    } else if (toolId === 'upsc-photo-resize') {
      targetW = 350; targetH = 350;
    } else if (toolId === 'resize-signature') {
      targetW = customW || 280; targetH = customH || 120;
    } else if (toolId === 'favicon-generator') {
      targetW = 180; targetH = 180;
    }

    canvas.width = targetW;
    canvas.height = targetH;

    // Apply rotation & flip transforms
    ctx.save();
    ctx.translate(targetW / 2, targetH / 2);
    if (rotationAngle !== 0) {
      ctx.rotate((rotationAngle * Math.PI) / 180);
    }
    if (flipH || flipV) {
      ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
    }

    ctx.drawImage(img, -targetW / 2, -targetH / 2, targetW, targetH);
    ctx.restore();

    // 3. Round Corners
    if (toolId === 'round-corners' && cornerRadius > 0) {
      const roundCanvas = document.createElement('canvas');
      roundCanvas.width = targetW;
      roundCanvas.height = targetH;
      const rCtx = roundCanvas.getContext('2d');

      rCtx.beginPath();
      rCtx.moveTo(cornerRadius, 0);
      rCtx.lineTo(targetW - cornerRadius, 0);
      rCtx.quadraticCurveTo(targetW, 0, targetW, cornerRadius);
      rCtx.lineTo(targetW, targetH - cornerRadius);
      rCtx.quadraticCurveTo(targetW, targetH, targetW - cornerRadius, targetH);
      rCtx.lineTo(cornerRadius, targetH);
      rCtx.quadraticCurveTo(0, targetH, 0, targetH - cornerRadius);
      rCtx.lineTo(0, cornerRadius);
      rCtx.quadraticCurveTo(0, 0, cornerRadius, 0);
      rCtx.closePath();
      rCtx.clip();
      rCtx.drawImage(canvas, 0, 0);

      finishOutput(roundCanvas, 'image/png', 1.0);
      return;
    }

    // 4. Watermark
    if (toolId === 'add-watermark' && watermarkText.trim()) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = `bold ${Math.max(16, Math.floor(targetW / 20))}px sans-serif`;
      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 4;
      ctx.fillText(watermarkText, targetW - 20, targetH - 16);
    }

    // 5. Blur effect
    if (toolId === 'blur-image') {
      ctx.filter = `blur(${blurAmount}px)`;
      ctx.drawImage(canvas, 0, 0);
      ctx.filter = 'none';
    }

    // 6. Grayscale
    if (toolId === 'grayscale-image') {
      const imgData = ctx.getImageData(0, 0, targetW, targetH);
      const data = imgData.data;
      for (let i = 0; i < data.length; i += 4) {
        const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
      ctx.putImageData(imgData, 0, 0);
    }

    // 7. Pixelate
    if (toolId === 'pixelate-image') {
      const size = pixelateSize;
      const w = Math.ceil(targetW / size);
      const h = Math.ceil(targetH / size);
      const smallCanvas = document.createElement('canvas');
      smallCanvas.width = w;
      smallCanvas.height = h;
      const sCtx = smallCanvas.getContext('2d');
      sCtx.drawImage(canvas, 0, 0, w, h);
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(smallCanvas, 0, 0, w, h, 0, 0, targetW, targetH);
    }

    // Target mime format
    let targetMime = format;
    if (toolId === 'image-to-png') targetMime = 'image/png';
    else if (toolId === 'image-to-webp') targetMime = 'image/webp';
    else if (toolId === 'image-to-jpg') targetMime = 'image/jpeg';

    // Target KB iterative compression if needed
    if (toolId === 'reduce-image-kb' || toolId === 'increase-image-kb') {
      compressToKb(canvas, targetKb, targetMime);
    } else {
      finishOutput(canvas, targetMime, 0.92);
    }
  };

  // Iterative KB compression
  const compressToKb = (canvas, desiredKb, mime) => {
    let minQ = 0.05;
    let maxQ = 0.98;
    let bestBlob = null;
    let iterations = 0;

    const attempt = (q) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          setIsProcessing(false);
          return;
        }
        const currentKb = blob.size / 1024;
        bestBlob = blob;
        iterations++;

        if (iterations < 7 && Math.abs(currentKb - desiredKb) > 3) {
          if (currentKb > desiredKb) maxQ = q;
          else minQ = q;
          attempt((minQ + maxQ) / 2);
        } else {
          // If user asked to INCREASE KB and image is still below target, add padding comment bytes
          if (tool?.id === 'increase-image-kb' && currentKb < desiredKb) {
            const padSize = Math.max(0, Math.floor((desiredKb - currentKb) * 1024));
            const padArray = new Uint8Array(padSize);
            const paddedBlob = new Blob([bestBlob, padArray], { type: mime });
            const url = URL.createObjectURL(paddedBlob);
            setResultUrl(url);
            setResultSizeKb((paddedBlob.size / 1024).toFixed(1));
          } else {
            const url = URL.createObjectURL(bestBlob);
            setResultUrl(url);
            setResultSizeKb((bestBlob.size / 1024).toFixed(1));
          }
          setIsProcessing(false);
        }
      }, mime, (minQ + maxQ) / 2);
    };

    attempt((minQ + maxQ) / 2);
  };

  const finishOutput = (canvas, mime, quality) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        setIsProcessing(false);
        return;
      }
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultSizeKb((blob.size / 1024).toFixed(1));
      setIsProcessing(false);
    }, mime, quality);
  };

  // Re-process on changes
  useEffect(() => {
    if (imgObjRef.current) {
      processTool();
    }
  }, [
    customW, customH, targetKb, rotationAngle, flipH, flipV, 
    cornerRadius, watermarkText, dpi, format, blurAmount, 
    pixelateSize, joinDirection
  ]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold font-sans">
                  {tool?.title || 'Online Tool'}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  {tool?.badge || 'Instant'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {tool?.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* File Upload Box */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-emerald-50/20 hover:bg-emerald-50/50 rounded-2xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              <Upload className="w-7 h-7 text-emerald-600" />
              <p className="text-xs font-bold text-slate-800">
                {imageSrc ? 'Choose Another Image' : 'Upload Image (Select File)'}
              </p>
              <span className="text-[10px] text-slate-400">JPG, PNG, WebP supported</span>
            </div>

            {/* Second upload input for Merge or Join */}
            {(tool?.id === 'photo-signature-merge' || tool?.id === 'join-multiple-images') ? (
              <div
                onClick={() => secondFileInputRef.current?.click()}
                className="border-2 border-dashed border-purple-300 hover:border-purple-500 bg-purple-50/20 hover:bg-purple-50/50 rounded-2xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-2"
              >
                <input
                  type="file"
                  ref={secondFileInputRef}
                  onChange={handleSecondFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <Upload className="w-7 h-7 text-purple-600" />
                <p className="text-xs font-bold text-slate-800">
                  {secondImageSrc ? 'Change 2nd Image / Signature' : (tool?.id === 'photo-signature-merge' ? 'Upload Signature' : 'Upload 2nd Image')}
                </p>
                <span className="text-[10px] text-slate-400">Select second file</span>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-center">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Offline Client Processing</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  All image processing happens securely inside your browser. No files or private data are sent to any server.
                </p>
              </div>
            )}
          </div>

          {/* Dynamic Tool Specific Controls */}
          {imageSrc && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              
              {/* Target KB slider for compression tools */}
              {(tool?.category === 'compress' || tool?.id === 'reduce-image-kb' || tool?.id === 'increase-image-kb') && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
                    <span>Target Size (KB):</span>
                    <span className="text-emerald-700 font-mono text-sm">{targetKb} KB</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    step="5"
                    value={targetKb}
                    onChange={(e) => setTargetKb(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[10, 20, 50, 100, 150, 200].map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setTargetKb(k)}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition ${
                          targetKb === k ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700'
                        }`}
                      >
                        {k} KB
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Width and Height for resize tools */}
              {(tool?.category === 'resize' || tool?.category === 'signature' || tool?.id === 'resize-pixel') && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Width (px):
                    </label>
                    <input
                      type="number"
                      value={customW}
                      onChange={(e) => setCustomW(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600 block mb-1">
                      Height (px):
                    </label>
                    <input
                      type="number"
                      value={customH}
                      onChange={(e) => setCustomH(Number(e.target.value))}
                      className="w-full px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Rotation & Flip */}
              {(tool?.id === 'rotate-image' || tool?.id === 'flip-image') && (
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setRotationAngle((prev) => (prev + 90) % 360)}
                    className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Rotate 90° ({rotationAngle}°)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlipH(!flipH)}
                    className={`px-3.5 py-2 border rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      flipH ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'
                    }`}
                  >
                    <FlipHorizontal className="w-3.5 h-3.5" />
                    <span>Flip Horizontal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlipV(!flipV)}
                    className={`px-3.5 py-2 border rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                      flipV ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700'
                    }`}
                  >
                    <span>Flip Vertical</span>
                  </button>
                </div>
              )}

              {/* Watermark text */}
              {tool?.id === 'add-watermark' && (
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Watermark Text:
                  </label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="e-tek solution or verified stamp..."
                    className="w-full px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              )}

              {/* Corner radius */}
              {tool?.id === 'round-corners' && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                    <span>Corner Radius:</span>
                    <span className="font-mono text-emerald-700">{cornerRadius}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="100"
                    value={cornerRadius}
                    onChange={(e) => setCornerRadius(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              )}

              {/* Join Direction */}
              {tool?.id === 'join-multiple-images' && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-700">Join Layout:</span>
                  <button
                    type="button"
                    onClick={() => setJoinDirection('horizontal')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl border ${
                      joinDirection === 'horizontal' ? 'bg-emerald-600 text-white' : 'bg-white'
                    }`}
                  >
                    Side by Side (Horizontal)
                  </button>
                  <button
                    type="button"
                    onClick={() => setJoinDirection('vertical')}
                    className={`px-3 py-1.5 text-xs font-bold rounded-xl border ${
                      joinDirection === 'vertical' ? 'bg-emerald-600 text-white' : 'bg-white'
                    }`}
                  >
                    Stacked (Vertical)
                  </button>
                </div>
              )}

              {/* Blur & Pixelate */}
              {tool?.id === 'blur-image' && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                    <span>Blur Intensity:</span>
                    <span className="font-mono">{blurAmount}px</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={blurAmount}
                    onChange={(e) => setBlurAmount(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              )}

              {tool?.id === 'pixelate-image' && (
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                    <span>Pixelate Block Size:</span>
                    <span className="font-mono">{pixelateSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="30"
                    value={pixelateSize}
                    onChange={(e) => setPixelateSize(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
              )}

            </div>
          )}

          {/* Live Preview Display */}
          {resultUrl && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                <span className="flex items-center gap-1.5 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Live Result Preview Ready
                </span>
                <span className="font-mono bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded">
                  {resultSizeKb} KB
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-2xl flex items-center justify-center max-h-72 overflow-hidden border border-slate-800">
                <img
                  src={resultUrl}
                  alt="Processed output"
                  className="max-h-64 max-w-full object-contain rounded-lg shadow-lg"
                />
              </div>

              {/* Download Button */}
              <div className="flex items-center gap-3">
                <a
                  href={resultUrl}
                  download={`etek_${tool?.id || 'tool'}_${fileName || 'result'}.${tool?.id === 'round-corners' ? 'png' : 'jpg'}`}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 transition"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Result ({resultSizeKb} KB)</span>
                </a>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>e-tek solution • Fast Client-Side Tool Suite</span>
          <button
            onClick={onClose}
            className="font-bold text-slate-600 hover:text-slate-900"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
