import React, { useRef, useEffect } from 'react';

/**
 * 6-digit modern split OTP Input component
 */
export default function OtpInput({ value = '', onChange, length = 6, disabled = false, autoFocus = true }) {
  const inputRefs = useRef([]);

  // Ensure value is padded array of length
  const digits = Array.from({ length }, (_, i) => value[i] || '');

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const handleChange = (e, index) => {
    const val = e.target.value;
    // Only accept numeric digits
    const cleaned = val.replace(/\D/g, '');

    if (!cleaned) {
      // Clear this digit
      const nextOtp = digits.map((d, i) => (i === index ? '' : d)).join('');
      onChange(nextOtp);
      return;
    }

    if (cleaned.length > 1) {
      // User pasted or typed multiple characters
      handlePasteData(cleaned, index);
      return;
    }

    // Single digit input
    const singleDigit = cleaned.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = singleDigit;
    const nextOtp = newDigits.join('');
    onChange(nextOtp);

    // Focus next input
    if (index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0 && inputRefs.current[index - 1]) {
        // Move to previous input on backspace if current is empty
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    handlePasteData(pastedData, 0);
  };

  const handlePasteData = (data, startIndex = 0) => {
    const cleaned = data.replace(/\D/g, '').slice(0, length);
    if (!cleaned) return;

    const newDigits = [...digits];
    for (let i = 0; i < cleaned.length; i++) {
      const targetIdx = startIndex + i;
      if (targetIdx < length) {
        newDigits[targetIdx] = cleaned[i];
      }
    }
    const nextOtp = newDigits.join('');
    onChange(nextOtp);

    // Focus the next empty input or the last input
    const nextFocusIdx = Math.min(startIndex + cleaned.length, length - 1);
    if (inputRefs.current[nextFocusIdx]) {
      inputRefs.current[nextFocusIdx].focus();
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 my-3">
      {Array.from({ length }).map((_, index) => {
        const isFilled = Boolean(digits[index]);
        return (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digits[index]}
            disabled={disabled}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            className={`w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-black rounded-xl border transition-all duration-200 outline-none select-all ${
              disabled
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : isFilled
                ? 'bg-emerald-50/70 border-emerald-500 text-emerald-950 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-800 focus:bg-white focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15'
            }`}
          />
        );
      })}
    </div>
  );
}
