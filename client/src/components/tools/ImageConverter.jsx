import React, { useState, useRef } from 'react';
import { Upload, Download, FileImage, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function ImageConverter() {
  const [imageSrc, setImageSrc] = useState(null);
  const [fileName, setFileName] = useState('');
  const [format, setFormat] = useState('image/png');
  const [convertedUrl, setConvertedUrl] = useState(null);
  const [newSizeKb, setNewSizeKb] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      processConversion(event.target.result, format);
    };
    reader.readAsDataURL(file);
  };

  const processConversion = (dataUrl, targetMime) => {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setConvertedUrl(url);
          setNewSizeKb((blob.size / 1024).toFixed(1));
        },
        targetMime,
        0.92
      );
    };
  };

  const handleFormatChange = (newFormat) => {
    setFormat(newFormat);
    if (imageSrc) {
      processConversion(imageSrc, newFormat);
    }
  };

  const extMap = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-1 text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>১০০% নিরাপদ ফরম্যাট কনভার্টার</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-bengali">
            ইমেজ ফরম্যাট কনভার্টার (JPG, PNG, WebP)
          </h2>
          <p className="text-sm text-slate-500">
            ছবির রেজোলিউশন না হারিয়ে যেকোনো ইমেজ ফাইলকে দ্রুত কাঙ্ক্ষিত এক্সটেনশনে পরিবর্তন করুন।
          </p>
        </div>

        {imageSrc && (
          <button
            onClick={() => {
              setImageSrc(null);
              setConvertedUrl(null);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 px-3.5 py-2 rounded-xl transition"
          >
            <RefreshCw className="w-3.5 h-3.5" /> রিসেট
          </button>
        )}
      </div>

      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-emerald-300 hover:border-brand-600 bg-emerald-50/30 hover:bg-emerald-50/70 rounded-2xl p-12 text-center cursor-pointer transition flex flex-col items-center justify-center space-y-4"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30">
            <FileImage className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-bengali">
              যে ছবিটি কনভার্ট করতে চান তা সিলেক্ট করুন
            </h3>
            <p className="text-xs text-slate-500 mt-1">PNG, JPG, JPEG বা WebP ফরম্যাট আপলোড করুন</p>
          </div>
          <span className="px-5 py-2.5 bg-brand-700 hover:bg-brand-800 text-white text-xs font-bold rounded-xl shadow transition">
            ফাইল বাছাই করুন
          </span>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              টার্গেট ফরম্যাট সিলেক্ট করুন:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'image/png', label: 'PNG ফরম্যাট', desc: 'স্বচ্ছ ব্যাকগ্রাউন্ড ও হাই কোয়ালিটি' },
                { id: 'image/jpeg', label: 'JPG / JPEG ফরম্যাট', desc: 'ফর্ম ফিলাপ ও ডকুমেন্টস' },
                { id: 'image/webp', label: 'WebP ফরম্যাট', desc: 'সর্বাধুনিক আল্ট্রা-লাইট ওয়েব ফরম্যাট' },
              ].map((fmt) => (
                <button
                  key={fmt.id}
                  onClick={() => handleFormatChange(fmt.id)}
                  className={`p-3 rounded-xl text-left border transition ${
                    format === fmt.id
                      ? 'bg-brand-50 border-brand-600 text-brand-800 ring-2 ring-brand-500/20 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <p className="font-bold text-xs">{fmt.label}</p>
                  <p className="text-[10px] text-slate-500">{fmt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {convertedUrl && (
            <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    কনভার্সন সম্পন্ন হয়েছে! (সাইজ: {newSizeKb} KB)
                  </h4>
                  <p className="text-xs text-slate-600">
                    নতুন ফরম্যাট: <span className="font-bold uppercase text-emerald-800">.{extMap[format]}</span>
                  </p>
                </div>
              </div>

              <a
                href={convertedUrl}
                download={`${fileName}_converted.${extMap[format]}`}
                className="w-full sm:w-auto px-6 py-3 bg-brand-700 hover:bg-brand-800 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow transition"
              >
                <Download className="w-4 h-4" />
                <span>কনভার্ট করা ফাইল ডাউনলোড</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
