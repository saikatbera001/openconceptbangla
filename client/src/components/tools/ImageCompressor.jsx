import React, { useState, useRef } from 'react';
import { Upload, Download, Sliders, ShieldCheck, CheckCircle2, RefreshCw, FileImage } from 'lucide-react';

export default function ImageCompressor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [targetKb, setTargetKb] = useState(50);
  const [compressedBlobUrl, setCompressedBlobUrl] = useState(null);
  const [compressedSizeKb, setCompressedSizeKb] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
      compressImage(event.target.result, targetKb);
    };
    reader.readAsDataURL(file);
  };

  // Client-Side Canvas iterative compression
  const compressImage = (dataUrl, desiredKb) => {
    setIsProcessing(true);
    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      // Scale down if image is excessively large (e.g. > 2000px)
      const maxDimension = 1600;
      if (width > maxDimension || height > maxDimension) {
        if (width > height) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        } else {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Binary search for optimal JPEG quality to match target KB
      let minQ = 0.05;
      let maxQ = 0.95;
      let bestBlob = null;
      let iterations = 0;

      const attemptCompression = (q) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              setIsProcessing(false);
              return;
            }

            const currentKb = blob.size / 1024;
            bestBlob = blob;
            iterations++;

            if (iterations < 7 && Math.abs(currentKb - desiredKb) > 4) {
              if (currentKb > desiredKb) {
                maxQ = q;
              } else {
                minQ = q;
              }
              const nextQ = (minQ + maxQ) / 2;
              attemptCompression(nextQ);
            } else {
              // Final blob ready
              const url = URL.createObjectURL(bestBlob);
              setCompressedBlobUrl(url);
              setCompressedSizeKb((bestBlob.size / 1024).toFixed(1));
              setIsProcessing(false);
            }
          },
          'image/jpeg',
          (minQ + maxQ) / 2
        );
      };

      attemptCompression((minQ + maxQ) / 2);
    };
  };

  const handleTargetChange = (kb) => {
    setTargetKb(kb);
    if (selectedImage) {
      compressImage(selectedImage, kb);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setOriginalFile(null);
    setCompressedBlobUrl(null);
    setCompressedSizeKb(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      {/* Tool Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>১০০% প্রাইভেট ও ক্লায়েন্ট-সাইড প্রসেসিং</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-bengali">
            অনলাইন ইমেজ কম্প্রেসার (নির্দিষ্ট KB সাইজ)
          </h2>
          <p className="text-sm text-slate-500">
            সরকারি আবেদন (SSC, PSC, WBP, Voter, PAN) এর জন্য ছবির সাইজ সহজে নির্দিষ্ট কিলোবাইটে (KB) নামিয়ে আনুন।
          </p>
        </div>

        {selectedImage && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-3.5 py-2 rounded-xl transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> নতুন ছবি
          </button>
        )}
      </div>

      {/* Main Workspace */}
      {!selectedImage ? (
        /* Upload Area */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-emerald-300 hover:border-brand-600 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-2xl p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center space-y-4"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30">
            <Upload className="w-8 h-8 animate-bounce" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-bengali">
              এখানে ছবি ড্রপ করুন অথবা ব্রাউজ করুন
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              JPG, PNG বা WebP ফরম্যাট সমর্থিত (সর্বোচ্চ 15 MB)
            </p>
          </div>
          <span className="px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl shadow transition">
            ছবি নির্বাচন করুন
          </span>
        </div>
      ) : (
        /* Compression Controls & Comparison */
        <div className="space-y-8">
          
          {/* Target Size Selector */}
          <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-brand-600" />
                <span>টার্গেট সাইজ সিলেক্ট করুন:</span>
                <span className="text-brand-700 font-black">{targetKb} KB</span>
              </label>
              <span className="text-xs text-slate-400">সরকারি চাকরির স্ট্যান্ডার্ড সাইজ</span>
            </div>

            {/* Quick Preset Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-4">
              {[20, 50, 100, 150, 200].map((kb) => (
                <button
                  key={kb}
                  onClick={() => handleTargetChange(kb)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition ${
                    targetKb === kb
                      ? 'bg-brand-700 text-white shadow-md'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {kb} KB
                </button>
              ))}
            </div>

            {/* Slider */}
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={targetKb}
              onChange={(e) => handleTargetChange(Number(e.target.value))}
              className="w-full accent-brand-600 cursor-pointer"
            />
          </div>

          {/* Comparison Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Original Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs font-bold text-slate-500 mb-3">
                <span>মূল ছবি (Original)</span>
                <span className="bg-slate-200 px-2 py-0.5 rounded text-slate-700">
                  {originalFile ? (originalFile.size / 1024).toFixed(1) : 0} KB
                </span>
              </div>
              <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-200 flex items-center justify-center">
                <img
                  src={selectedImage}
                  alt="Original Preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Compressed Card */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-300 flex flex-col items-center">
              <div className="w-full flex items-center justify-between text-xs font-bold text-emerald-900 mb-3">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  কম্প্রেসড ছবি (Compressed)
                </span>
                <span className="bg-brand-600 text-white px-2.5 py-0.5 rounded font-black">
                  {compressedSizeKb || '...'} KB
                </span>
              </div>

              <div className="w-full h-64 rounded-xl overflow-hidden bg-slate-900/5 flex items-center justify-center relative">
                {isProcessing ? (
                  <div className="text-center text-sm font-semibold text-brand-700 flex flex-col items-center gap-2">
                    <RefreshCw className="w-6 h-6 animate-spin" />
                    <span>সাইজ কমানো হচ্ছে...</span>
                  </div>
                ) : compressedBlobUrl ? (
                  <img
                    src={compressedBlobUrl}
                    alt="Compressed Preview"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : null}
              </div>

              {/* Download Action */}
              {compressedBlobUrl && !isProcessing && (
                <a
                  href={compressedBlobUrl}
                  download={`compressed_${targetKb}kb_${originalFile?.name || 'photo.jpg'}`}
                  className="w-full mt-4 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-brand-700/20 transition active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>কম্প্রেসড ছবি ডাউনলোড করুন ({compressedSizeKb} KB)</span>
                </a>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
