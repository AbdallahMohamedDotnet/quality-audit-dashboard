'use client';

import React, { useState } from 'react';
import { useAudit } from '../../context/AuditContext';
import { exportToCsv } from '../../utils/export';

export const VisitorsView: React.FC = () => {
  const { isAr, isDark, visitors, addVisitor, checkoutVisitor, showToast, logoSvg } = useAudit();
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [selectedBadgeVisitor, setSelectedBadgeVisitor] = useState<(typeof visitors)[0] | null>(null);
  const [filterMode, setFilterMode] = useState<'ALL' | 'ACTIVE' | 'DEPARTED'>('ALL');

  const [form, setForm] = useState({
    name: '',
    company: '',
    purpose: '',
    host: '',
    ppeIssued: false,
    healthDeclared: false,
  });

  const filteredVisitors = visitors.filter(v => {
    if (filterMode === 'ACTIVE') return v.timeOut === null;
    if (filterMode === 'DEPARTED') return v.timeOut !== null;
    return true;
  });

  const handleCheckinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.host.trim()) {
      showToast(
        isAr ? 'يرجى إدخال اسم الزائر واسم المُضيف' : 'Please enter visitor name and host',
        'warning'
      );
      return;
    }

    if (!form.healthDeclared) {
      showToast(
        isAr
          ? 'يجب توقيع الإقرار الصحي والسلامة المهنية أولاً'
          : 'Health and safety declaration must be signed',
        'warning'
      );
      return;
    }

    addVisitor(form);
    setForm({
      name: '',
      company: '',
      purpose: '',
      host: '',
      ppeIssued: false,
      healthDeclared: false,
    });
    setIsCheckinModalOpen(false);
  };

  const handleExportCsv = () => {
    const headers = [
      isAr ? 'رقم السجل' : 'Log ID',
      isAr ? 'اسم الزائر' : 'Visitor Name',
      isAr ? 'الجهة / الشركة' : 'Company',
      isAr ? 'الغرض' : 'Purpose',
      isAr ? 'المُضيف' : 'Host',
      isAr ? 'تسليم PPE' : 'PPE Issued',
      isAr ? 'الإقرار الصحي' : 'Health Declared',
      isAr ? 'وقت الدخول' : 'Time In',
      isAr ? 'وقت الخروج' : 'Time Out',
    ];

    const rows = filteredVisitors.map(v => [
      v.id,
      v.name,
      v.company,
      v.purpose,
      v.host,
      v.ppeIssued ? (isAr ? 'نعم' : 'Yes') : isAr ? 'لا' : 'No',
      v.healthDeclared ? (isAr ? 'نعم' : 'Yes') : isAr ? 'لا' : 'No',
      v.timeIn,
      v.timeOut || (isAr ? 'نشط بالمنشأة' : 'Active On-Site'),
    ]);

    exportToCsv(`Visitor_Log_${Date.now()}`, headers, rows);
    showToast(isAr ? 'تم تصدير سجل الزوار بنجاح' : 'Exported visitor log', 'success');
  };

  const handlePrintBadge = () => {
    showToast(isAr ? 'جاري تجهيز بطاقة الزائر للطباعة...' : 'Preparing visitor badge for printing...', 'info');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-500 flex items-center justify-center">
              <i className="fa-solid fa-id-card-clip"></i>
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'سجل الزوار وإقرارات الصحة والسلامة' : 'Visitor & Contractor Gate Pass Register'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'توثيق دخول المقاولين والزوار وتتبع تسليم مهمات الوقاية (PPE) والإقرار الصحي'
              : 'Digital check-in tracking with PPE compliance verification and health declarations'}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleExportCsv}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-file-excel text-emerald-500"></i>
            <span>{isAr ? 'تصدير CSV' : 'Export CSV'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCheckinModalOpen(true)}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-black shadow-md shadow-teal-600/30 transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-user-plus"></i>
            <span>{isAr ? 'تسجيل دخول زائر' : 'Check-In Visitor'}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs font-bold">
        <button
          type="button"
          onClick={() => setFilterMode('ALL')}
          className={`px-3.5 py-1.5 rounded-xl transition-all ${
            filterMode === 'ALL'
              ? 'bg-sky-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {isAr ? `الكل (${visitors.length})` : `All (${visitors.length})`}
        </button>

        <button
          type="button"
          onClick={() => setFilterMode('ACTIVE')}
          className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            filterMode === 'ACTIVE'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>
            {isAr
              ? `نشط بالمنشأة (${visitors.filter(v => v.timeOut === null).length})`
              : `On-Site (${visitors.filter(v => v.timeOut === null).length})`}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFilterMode('DEPARTED')}
          className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
            filterMode === 'DEPARTED'
              ? 'bg-slate-700 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span>
            {isAr
              ? `مغادر (${visitors.filter(v => v.timeOut !== null).length})`
              : `Departed (${visitors.filter(v => v.timeOut !== null).length})`}
          </span>
        </button>
      </div>

      {/* Visitors Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-start">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-black text-[10px] tracking-wider">
              <tr>
                <th className="p-4 text-start">{isAr ? 'اسم الزائر والجهة' : 'Visitor & Company'}</th>
                <th className="p-4 text-start">{isAr ? 'الغرض والمُضيف' : 'Purpose & Host'}</th>
                <th className="p-4 text-center">{isAr ? 'مهمات الوقاية (PPE)' : 'PPE Compliance'}</th>
                <th className="p-4 text-center">{isAr ? 'الإقرار الصحي' : 'Health Declaration'}</th>
                <th className="p-4 text-center">{isAr ? 'توقيت الدخول / الخروج' : 'Time In / Out'}</th>
                <th className="p-4 text-end">{isAr ? 'الإجراء' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-bold">
              {filteredVisitors.map(v => {
                const isActive = v.timeOut === null;
                return (
                  <tr
                    key={v.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span>{v.name}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">{v.company || '—'}</div>
                    </td>

                    <td className="p-4">
                      <div className="text-slate-800 dark:text-slate-200">{v.purpose}</div>
                      <div className="text-[11px] text-sky-600 dark:text-sky-400">
                        {isAr ? 'المُضيف:' : 'Host:'} {v.host}
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black ${
                          v.ppeIssued
                            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                        }`}
                      >
                        <i className={`fa-solid ${v.ppeIssued ? 'fa-check' : 'fa-xmark'}`}></i>
                        {v.ppeIssued ? (isAr ? 'تم التسليم' : 'Issued') : isAr ? 'غير مطلوب' : 'None'}
                      </span>
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-black ${
                          v.healthDeclared
                            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                        }`}
                      >
                        <i className="fa-solid fa-file-shield"></i>
                        {v.healthDeclared
                          ? isAr
                            ? 'موقّع ومعتمد'
                            : 'Signed'
                          : isAr
                          ? 'غير موقع'
                          : 'Pending'}
                      </span>
                    </td>

                    <td className="p-4 text-center font-mono">
                      <div className="text-slate-900 dark:text-white flex items-center justify-center gap-1">
                        <i className="fa-solid fa-arrow-right-to-bracket text-emerald-500 text-[10px]"></i>
                        {v.timeIn}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1 mt-0.5">
                        <i className="fa-solid fa-arrow-right-from-bracket text-rose-500 text-[10px]"></i>
                        {v.timeOut || (isAr ? 'متواجد حالياً' : 'On-Site')}
                      </div>
                    </td>

                    <td className="p-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedBadgeVisitor(v)}
                          className="p-2 rounded-xl text-slate-400 hover:text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-950/30 transition-colors"
                          title={isAr ? 'طباعة تصريح الدخول' : 'Print Pass Badge'}
                        >
                          <i className="fa-solid fa-id-badge text-sm"></i>
                        </button>

                        {isActive ? (
                          <button
                            type="button"
                            onClick={() => checkoutVisitor(v.id)}
                            className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-black shadow-sm transition-all"
                          >
                            {isAr ? 'تسجيل خروج' : 'Check-Out'}
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-400 font-bold">
                            <i className="fa-solid fa-check-circle text-emerald-500 mr-1 ml-1"></i>
                            {isAr ? 'مغادر' : 'Departed'}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredVisitors.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-800">
          <i className="fa-solid fa-user-check text-4xl text-slate-400 mb-2 block"></i>
          <p className="text-xs font-bold text-slate-500">
            {isAr ? 'لا توجد سجلات زوار مطابقة للتصفية الحالية.' : 'No visitor records found.'}
          </p>
        </div>
      )}

      {/* Visitor Check-In Modal */}
      {isCheckinModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl border transition-colors ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                  <i className="fa-solid fa-user-plus text-sm"></i>
                </div>
                <h3 className="text-base font-black">
                  {isAr ? 'تسجيل دخول زائر / مقاول جديد' : 'Visitor & Contractor Pass'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckinModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <form onSubmit={handleCheckinSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    {isAr ? 'اسم الزائر الثلاثي' : 'Visitor Name'}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder={isAr ? 'محمد إبراهيم' : 'e.g. Alex Hunter'}
                    className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none focus:border-teal-500 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    {isAr ? 'الجهة أو الشركة' : 'Company / Entity'}
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    placeholder={isAr ? 'شركة الصيانة' : 'e.g. Apex Tech'}
                    className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none focus:border-teal-500 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    {isAr ? 'الغرض من الزيارة' : 'Visit Purpose'}
                  </label>
                  <input
                    type="text"
                    value={form.purpose}
                    onChange={e => setForm({ ...form, purpose: e.target.value })}
                    placeholder={isAr ? 'صيانة طارئة / تفتيش' : 'e.g. Inspection'}
                    className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none focus:border-teal-500 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                    {isAr ? 'المُضيف أو القسم المسؤول' : 'Host / Department'}
                  </label>
                  <input
                    type="text"
                    value={form.host}
                    onChange={e => setForm({ ...form, host: e.target.value })}
                    placeholder={isAr ? 'م. سامي (مدير الصيانة)' : 'e.g. Eng. Sami'}
                    className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none focus:border-teal-500 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={form.ppeIssued}
                    onChange={e => setForm({ ...form, ppeIssued: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>
                    {isAr
                      ? 'تم تسليم وارتداء مهمات الوقاية الشخصية (PPE: خوذة، حذاء سلامة، سترة)'
                      : 'PPE gear issued and worn (Helmet, Safety Shoes, High-Vis Vest)'}
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={form.healthDeclared}
                    onChange={e => setForm({ ...form, healthDeclared: e.target.checked })}
                    className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                  />
                  <span>
                    {isAr
                      ? 'الإقرار الصحي: خلو الزائر من الأعراض التنفسية والمعدية والالتزام بتعليمات السلامة'
                      : 'Health Declaration: No communicable disease symptoms; safety rules acknowledged'}
                  </span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsCheckinModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-black shadow-md"
                >
                  {isAr ? 'إصدار تصريح الدخول' : 'Issue Gate Pass'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visitor Security Pass ID Badge Modal */}
      {selectedBadgeVisitor && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-sm rounded-3xl p-6 shadow-2xl border transition-colors ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                  <i className="fa-solid fa-id-badge"></i>
                </div>
                <h3 className="text-sm font-black">
                  {isAr ? 'تصريح الدخول الرقمي (Security Badge)' : 'Security Gate Pass Badge'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBadgeVisitor(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            {/* Printable Pass Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-950 dark:to-slate-900 border-2 border-teal-500/40 shadow-inner space-y-4 text-center">
              <div className="flex items-center justify-between pb-2 border-b border-slate-300 dark:border-slate-800">
                <div
                  className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white"
                  dangerouslySetInnerHTML={{ __html: logoSvg }}
                />
                <span className="text-[10px] font-mono font-black text-teal-600 dark:text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded">
                  PASS #{selectedBadgeVisitor.id.toString().slice(-6)}
                </span>
              </div>

              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  {selectedBadgeVisitor.name}
                </h4>
                <p className="text-xs font-bold text-slate-500">
                  {selectedBadgeVisitor.company || (isAr ? 'زائر مستقل' : 'Independent Visitor')}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-start space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">{isAr ? 'المُضيف:' : 'Host:'}</span>
                  <span className="font-black">{selectedBadgeVisitor.host}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">{isAr ? 'الغرض:' : 'Purpose:'}</span>
                  <span className="font-black">{selectedBadgeVisitor.purpose}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-bold">{isAr ? 'وقت الدخول:' : 'Time In:'}</span>
                  <span className="font-mono">{selectedBadgeVisitor.timeIn}</span>
                </div>
              </div>

              {/* Barcode / QR Simulation */}
              <div className="pt-2">
                <div className="w-full h-8 bg-slate-900 dark:bg-white rounded flex items-center justify-center font-mono text-[9px] tracking-widest font-black text-white dark:text-slate-900">
                  ||| | |||| | ||||| |||| | |||
                </div>
                <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 block mt-1">
                  ✓ {isAr ? 'إقرار صحي ومهمات سلامة معتمدة' : 'Health & PPE Certified'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-4">
              <button
                type="button"
                onClick={() => setSelectedBadgeVisitor(null)}
                className="flex-1 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
              <button
                type="button"
                onClick={handlePrintBadge}
                className="flex-1 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-black shadow-md flex items-center justify-center gap-1.5"
              >
                <i className="fa-solid fa-print"></i>
                <span>{isAr ? 'طباعة البطاقة' : 'Print Badge'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
