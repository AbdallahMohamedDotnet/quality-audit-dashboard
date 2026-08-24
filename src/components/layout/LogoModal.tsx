'use client';

import React, { useState } from 'react';
import { useAudit } from '../../context/AuditContext';

export const LogoModal: React.FC = () => {
  const { isAr, isDark, isLogoModalOpen, setIsLogoModalOpen, logoSvg, setLogoSvg, showToast } = useAudit();
  const [svgInput, setSvgInput] = useState(logoSvg);

  if (!isLogoModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!svgInput.trim()) {
      showToast(isAr ? 'يرجى إدخال كود SVG صحيح' : 'Please enter valid SVG markup', 'warning');
      return;
    }
    setLogoSvg(svgInput);
    setIsLogoModalOpen(false);
    showToast(isAr ? 'تم تحديث الشعار بنجاح' : 'Logo updated successfully', 'success');
  };

  const handleReset = () => {
    const defaultSvg = `<svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
    setSvgInput(defaultSvg);
    setLogoSvg(defaultSvg);
    showToast(isAr ? 'تم استعادة الشعار الافتراضي' : 'Default logo restored', 'info');
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div
        className={`w-full max-w-lg rounded-3xl p-5 sm:p-6 shadow-2xl border transition-colors max-h-[90vh] overflow-y-auto ${
          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
              <i className="fa-solid fa-pen-ruler text-sm"></i>
            </div>
            <h3 className="text-base font-black">
              {isAr ? 'تخصيص شعار المنشأة (SVG Code)' : 'Customize Facility Logo (SVG)'}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setIsLogoModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">
              {isAr ? 'معاينة الشعار المباشرة' : 'Live Logo Preview'}
            </label>
            <div className="flex items-center justify-center p-6 rounded-2xl bg-gradient-to-tr from-sky-600 to-emerald-500 w-20 h-20 mx-auto shadow-lg">
              <div dangerouslySetInnerHTML={{ __html: svgInput }} />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
              {isAr ? 'كود SVG' : 'SVG Markup'}
            </label>
            <textarea
              rows={4}
              value={svgInput}
              onChange={e => setSvgInput(e.target.value)}
              className={`w-full p-3 rounded-xl border text-xs font-mono transition-colors outline-none focus:border-sky-500 ${
                isDark ? 'bg-slate-950 border-slate-700 text-slate-100' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
              placeholder="<svg ...>...</svg>"
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center"
            >
              {isAr ? 'استعادة الافتراضي' : 'Reset to Default'}
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsLogoModalOpen(false)}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-center"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <button
                type="submit"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-black shadow-md transition-colors text-center"
              >
                {isAr ? 'حفظ وتطبيق' : 'Save & Apply'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
