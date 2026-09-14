import React, { useState } from 'react';
import { 
  Printer, 
  X, 
  UploadCloud, 
  Check, 
  MessageSquare
} from 'lucide-react';

export default function PrintOrderModal({ isOpen, onClose }) {
  const [printType, setPrintType] = useState('bw'); // 'bw' or 'color'
  const [paperSize, setPaperSize] = useState('A4');
  const [sided, setSided] = useState('single');
  const [copies, setCopies] = useState(1);
  const [binding, setBinding] = useState(false);
  const [lamination, setLamination] = useState(false);
  const [fileName, setFileName] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const calculateEstimate = () => {
    let perPage = printType === 'color' ? 5 : 2;
    if (sided === 'double') perPage = perPage * 1.6;
    let base = perPage * copies * 10; // assuming default ~10 pages estimate
    if (binding) base += 35;
    if (lamination) base += 20 * copies;
    return Math.round(base);
  };

  const handleSendPrintOrder = (e) => {
    e.preventDefault();
    const orderDetails = [
      `*🖨️ Online Print Order - E-Tek Solution*`,
      `*Customer Name:* ${customerName || 'Customer'}`,
      `*File Name:* ${fileName || 'Will send file on WhatsApp'}`,
      `*Print Mode:* ${printType === 'color' ? 'Full Color Print' : 'Black & White'}`,
      `*Paper Size:* ${paperSize}`,
      `*Sides:* ${sided === 'double' ? 'Double Sided (Back-to-Back)' : 'Single Sided'}`,
      `*Copies:* ${copies}`,
      `*Binding:* ${binding ? 'Spiral Binding Needed' : 'No'}`,
      `*Lamination:* ${lamination ? 'Lamination Needed' : 'No'}`,
      notes ? `*Special Notes:* ${notes}` : '',
      `*Est. Cost:* ₹${calculateEstimate()}`
    ].filter(Boolean).join('\n');

    const encoded = encodeURIComponent(orderDetails);
    window.open(`https://wa.me/919647479787?text=${encoded}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20">
              <Printer className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">Express Print Service</h3>
              <p className="text-xs text-emerald-100">
                High-Speed Laser Printing • Lamination • Spiral Binding
              </p>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSendPrintOrder} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          {/* File Upload simulation */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Upload Document (PDF / Image / DOCX)
            </label>
            <div className="relative border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer transition-colors bg-slate-50">
              <input 
                type="file" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-1" />
              <p className="text-xs font-semibold text-slate-700">
                {fileName ? fileName : "Tap to browse or attach file"}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                PDF, JPG, PNG or send directly on WhatsApp
              </p>
            </div>
          </div>

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Your Name / Contact Person
            </label>
            <input 
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Color vs B&W Selection */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPrintType('bw')}
              className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                printType === 'bw'
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              <div>
                <div className="text-xs font-bold">Black & White</div>
                <div className="text-[10px] text-slate-500">Fast laser printing</div>
              </div>
              {printType === 'bw' && <Check className="w-4 h-4 text-emerald-600" />}
            </button>

            <button
              type="button"
              onClick={() => setPrintType('color')}
              className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                printType === 'color'
                  ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 font-bold'
                  : 'border-slate-200 bg-white text-slate-700'
              }`}
            >
              <div>
                <div className="text-xs font-bold">Full Color</div>
                <div className="text-[10px] text-slate-500">HD vivid color output</div>
              </div>
              {printType === 'color' && <Check className="w-4 h-4 text-emerald-600" />}
            </button>
          </div>

          {/* Side & Copies */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Printing Sides
              </label>
              <select
                value={sided}
                onChange={(e) => setSided(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="single">Single Sided</option>
                <option value="double">Back-to-Back (Double Sided)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Number of Sets / Copies
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCopies(Math.max(1, copies - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-sm text-slate-700"
                >
                  -
                </button>
                <span className="flex-1 text-center font-bold text-sm text-slate-800">
                  {copies}
                </span>
                <button
                  type="button"
                  onClick={() => setCopies(copies + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-sm text-slate-700"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Finishing Checkboxes */}
          <div className="space-y-2 pt-1">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={binding}
                onChange={(e) => setBinding(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span>Add Spiral Binding with Clear Sheet Cover (+₹35)</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
              <input 
                type="checkbox" 
                checked={lamination}
                onChange={(e) => setLamination(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span>Heavy Duty Waterproof Lamination</span>
            </label>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Special Instructions / Page Range
            </label>
            <input 
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Only pages 1 to 5, urgent delivery"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Submit & Send to WhatsApp Desk</span>
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2">
              Instant print pickup from E-Tek Solution Centre or local delivery.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
