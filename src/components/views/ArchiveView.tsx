'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { exportToCsv } from '../../utils/export';
import { AnimatedPage, StaggerGrid } from '../common/AnimatedPage';
import { AnimatedModal } from '../common/AnimatedModal';
import { staggerChild } from '../../utils/animations';

export const ArchiveView: React.FC = () => {
  const {
    isAr,
    isDark,
    archivedAudits,
    deleteArchivedAudit,
    dispatchWhatsApp,
    printReport,
    showToast,
  } = useAudit();

  const [selectedAuditModal, setSelectedAuditModal] = useState<(typeof archivedAudits)[0] | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAudits = archivedAudits.filter(a => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      a.dept.toLowerCase().includes(q) ||
      a.user.toLowerCase().includes(q) ||
      a.date.toLowerCase().includes(q) ||
      a.score.toLowerCase().includes(q)
    );
  });

  const handleShareAuditWhatsApp = (audit: (typeof archivedAudits)[0]) => {
    const msg = isAr
      ? `*شهادة وتوثيق تقرير تدقيق الجودة (AUDIT RECORD)*\nالقسم: ${audit.dept}\nنسبة الامتثال: ${audit.score}\nالمدقق المسؤول: ${audit.user}\nالتاريخ والتوقيت: ${audit.date} - ${audit.time}\nرقم المرجع: #${audit.id}\n------------------------\nتم اعتماد التقرير بالتوقيع الرقمي وإدراجه في السجل الرسمي.`
      : `*Certified Quality Audit Record*\nDepartment: ${audit.dept}\nCompliance Score: ${audit.score}\nAuditor: ${audit.user}\nTimestamp: ${audit.date} - ${audit.time}\nRecord Ref: #${audit.id}\n------------------------\nDigitally signed and recorded in certified archives.`;

    dispatchWhatsApp(msg);
  };

  const handleExportCsv = () => {
    const headers = [
      isAr ? 'رقم السجل' : 'Record ID',
      isAr ? 'القسم' : 'Department',
      isAr ? 'نسبة الامتثال' : 'Score',
      isAr ? 'المدقق المعتمد' : 'Auditor',
      isAr ? 'التاريخ' : 'Date',
      isAr ? 'التوقيت' : 'Time',
    ];

    const rows = filteredAudits.map(a => [
      a.id,
      a.dept,
      a.score,
      a.user,
      a.date,
      a.time,
    ]);

    exportToCsv(`Audit_Archives_${Date.now()}`, headers, rows);
    showToast(isAr ? 'تم تصدير أرشيف التدقيق بنجاح' : 'Exported audit archive', 'success');
  };

  return (
    <AnimatedPage>
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <i className="fa-solid fa-box-archive"></i>
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'أرشيف وسجلات التدقيق المعتمدة' : 'Certified Audit Archives & Certificates'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'سجل غير قابل للتعديل لجولات التدقيق المكتملة بالتوقيع الرقمي والختم الزمني'
              : 'Immutable record of completed audit checklists with digital signatures & timestamps'}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={handleExportCsv}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-file-excel text-emerald-500"></i>
            <span>{isAr ? 'تصدير الأرشيف CSV' : 'Export CSV'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={printReport}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-print"></i>
            <span>{isAr ? 'طباعة تقرير A4' : 'Print A4 PDF'}</span>
          </motion.button>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={
            isAr
              ? 'بحث في الأرشيف بالقسم أو المدقق أو التاريخ أو النسبة...'
              : 'Filter archive by department, auditor, date, or score...'
          }
          className={`w-full p-3 rounded-xl border text-xs font-bold outline-none px-9 transition-colors ${
            isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}
        />
        <i className="fa-solid fa-magnifying-glass absolute top-3.5 ltr:left-3 rtl:right-3 text-xs text-slate-400"></i>
      </div>

      {/* Mobile Card List (< md) */}
      <div className="block md:hidden space-y-3.5">
        <StaggerGrid className="space-y-3.5">
          {filteredAudits.map(audit => {
            const scoreNum = parseInt(audit.score, 10);
            const isPassed = !isNaN(scoreNum) && scoreNum >= 80;
            return (
              <motion.div
                key={audit.id}
                variants={staggerChild}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors content-visibility-auto transform-gpu"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      <i className="fa-solid fa-clipboard-check text-sky-500 text-xs"></i>
                      <span className="text-sm">{audit.dept}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">REF #{audit.id}</span>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-mono font-black shadow-sm ${
                      isPassed
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                        : 'bg-rose-500/10 text-rose-600 border border-rose-500/30'
                    }`}
                  >
                    <i className={`fa-solid ${isPassed ? 'fa-circle-check' : 'fa-triangle-exclamation'} text-[10px]`}></i>
                    {audit.score}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isAr ? 'المدقق المعتمد:' : 'Auditor:'}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200 block truncate">{audit.user}</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <i className="fa-solid fa-signature text-[9px]"></i>
                      <span>{isAr ? 'موقّع' : 'Signed'}</span>
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">{isAr ? 'التاريخ والوقت:' : 'Timestamp:'}</span>
                    <span className="font-mono text-slate-900 dark:text-white block">{audit.date}</span>
                    <span className="font-mono text-[10px] text-slate-400 block">{audit.time}</span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setSelectedAuditModal(audit)}
                    className="px-3 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500 text-sky-600 hover:text-white text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <i className="fa-solid fa-eye"></i>
                    <span>{isAr ? 'معاينة' : 'View'}</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handleShareAuditWhatsApp(audit)}
                    className="p-1.5 rounded-xl text-[#25D366] bg-emerald-50 dark:bg-emerald-950/30"
                    title={isAr ? 'واتساب' : 'WhatsApp'}
                  >
                    <i className="fa-brands fa-whatsapp text-sm"></i>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => deleteArchivedAudit(audit.id)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500"
                    title={isAr ? 'حذف' : 'Delete'}
                  >
                    <i className="fa-solid fa-trash text-xs"></i>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </StaggerGrid>
      </div>

      {/* Desktop Audit Table (>= md) */}
      <div className="hidden md:block bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto [touch-action:pan-x] [-webkit-overflow-scrolling:touch]">
          <table className="w-full text-xs text-start">
            <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-black text-[10px] tracking-wider">
              <tr>
                <th className="p-4 text-start">{isAr ? 'القسم محل الفحص' : 'Audited Department'}</th>
                <th className="p-4 text-center">{isAr ? 'درجة الامتثال' : 'Compliance Score'}</th>
                <th className="p-4 text-start">{isAr ? 'المدقق المعتمد' : 'Auditor'}</th>
                <th className="p-4 text-center">{isAr ? 'التاريخ والوقت' : 'Timestamp'}</th>
                <th className="p-4 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-bold">
              {filteredAudits.map(audit => {
                const scoreNum = parseInt(audit.score, 10);
                const isPassed = !isNaN(scoreNum) && scoreNum >= 80;

                return (
                  <tr
                    key={audit.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-black text-slate-900 dark:text-white flex items-center gap-2">
                        <i className="fa-solid fa-clipboard-check text-sky-500"></i>
                        <span>{audit.dept}</span>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">REF #{audit.id}</div>
                    </td>

                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-mono font-black shadow-sm ${
                          isPassed
                            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/30'
                            : 'bg-rose-500/10 text-rose-600 border border-rose-500/30'
                        }`}
                      >
                        <i className={`fa-solid ${isPassed ? 'fa-circle-check' : 'fa-triangle-exclamation'}`}></i>
                        {audit.score}
                      </span>
                    </td>

                    <td className="p-4">
                      <div className="text-slate-800 dark:text-slate-200">{audit.user}</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <i className="fa-solid fa-signature"></i>
                        <span>{isAr ? 'موقّع رقمياً' : 'Digitally Signed'}</span>
                      </div>
                    </td>

                    <td className="p-4 text-center font-mono">
                      <div className="text-slate-900 dark:text-white">{audit.date}</div>
                      <div className="text-[10px] text-slate-400">{audit.time}</div>
                    </td>

                    <td className="p-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setSelectedAuditModal(audit)}
                          className="px-2.5 py-1.5 rounded-xl bg-sky-500/10 hover:bg-sky-500 text-sky-600 hover:text-white text-[11px] font-bold transition-all"
                          title={isAr ? 'عرض التقرير' : 'View Certificate'}
                        >
                          <i className="fa-solid fa-eye mx-1"></i>
                          <span>{isAr ? 'معاينة' : 'View'}</span>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => handleShareAuditWhatsApp(audit)}
                          className="p-1.5 rounded-xl text-[#25D366] hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                          title={isAr ? 'إرسال عبر واتساب' : 'Share via WhatsApp'}
                        >
                          <i className="fa-brands fa-whatsapp text-sm"></i>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => deleteArchivedAudit(audit.id)}
                          className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title={isAr ? 'حذف من الأرشيف' : 'Delete Record'}
                        >
                          <i className="fa-solid fa-trash-can text-xs"></i>
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredAudits.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-800">
          <i className="fa-solid fa-folder-open text-4xl text-slate-400 mb-2 block"></i>
          <p className="text-xs font-bold text-slate-500">
            {isAr ? 'لا توجد سجلات تدقيق محفوظة في الأرشيف.' : 'No audit records found in archive.'}
          </p>
        </div>
      )}

      {/* Audit Record Certificate Modal with AnimatedModal */}
      <AnimatedModal isOpen={!!selectedAuditModal} onClose={() => setSelectedAuditModal(null)} className="max-w-lg">
        {selectedAuditModal && (
          <div
            className={`w-full rounded-3xl p-5 sm:p-8 shadow-2xl border transition-colors max-h-[85dvh] overflow-y-auto overscroll-y-contain [touch-action:pan-y] [-webkit-overflow-scrolling:touch] ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                  <i className="fa-solid fa-certificate"></i>
                </div>
                <h3 className="text-base font-black">
                  {isAr ? 'شهادة توثيق جولة التدقيق' : 'Certified Audit Summary Certificate'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAuditModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold">{isAr ? 'القسم محل التدقيق:' : 'Audited Dept:'}</span>
                  <span className="font-black text-slate-900 dark:text-white">{selectedAuditModal.dept}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold">{isAr ? 'نسبة الامتثال المحققة:' : 'Compliance Score:'}</span>
                  <span className="font-mono font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    {selectedAuditModal.score}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold">{isAr ? 'المدقق المعتمد:' : 'Certified Auditor:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedAuditModal.user}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold">{isAr ? 'الختم الزمني:' : 'Timestamp:'}</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400">
                    {selectedAuditModal.date} - {selectedAuditModal.time}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-bold">{isAr ? 'الرقم المرجعي:' : 'Reference ID:'}</span>
                  <span className="font-mono text-slate-400">#{selectedAuditModal.id}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-xs font-black text-emerald-600 dark:text-emerald-400">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>{isAr ? 'تقرير موثق ومختوم رقمياً' : 'Authenticated & Digitally Signed'}</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  {isAr
                    ? 'هذا السجل رسمي ومطابق لمتطلبات الجودة والأيزو والرقابة الصحية.'
                    : 'Official record compliant with ISO, OSHA, and QA standards.'}
                </p>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => handleShareAuditWhatsApp(selectedAuditModal)}
                  className="flex-1 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <i className="fa-brands fa-whatsapp text-sm"></i>
                  <span>{isAr ? 'إرسال واتساب' : 'WhatsApp'}</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="button"
                  onClick={() => {
                    setSelectedAuditModal(null);
                    printReport();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-print text-sm"></i>
                  <span>{isAr ? 'طباعة تقرير' : 'Print PDF'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        )}
      </AnimatedModal>
    </AnimatedPage>
  );
};
