'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { SECTOR_DEPARTMENTS, DEPARTMENTS } from '../../data';
import { Badge } from '../common/Badge';
import { AnimatedPage, StaggerGrid } from '../common/AnimatedPage';
import { AnimatedModal } from '../common/AnimatedModal';
import { exportToCsv } from '../../utils/export';
import { staggerChild } from '../../utils/animations';

export const NcrView: React.FC = () => {
  const {
    isAr,
    isDark,
    currentSector,
    ncrs,
    addNcr,
    closeNcr,
    deleteNcr,
    escalateToCapa,
    setActiveTab,
    dispatchWhatsApp,
    showToast,
  } = useAudit();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'OPEN' | 'CLOSED'>('ALL');

  const [newNcr, setNewNcr] = useState({
    type: 'TECHNICAL',
    deptKey: '',
    std: '',
    desc: '',
  });

  const sectorDeptKeys = SECTOR_DEPARTMENTS[currentSector] || [];

  const filteredNcrs = ncrs.filter(n => {
    if (filterStatus === 'ALL') return true;
    return n.status === filterStatus;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNcr.desc.trim() || !newNcr.deptKey) {
      showToast(
        isAr ? 'يرجى تحديد القسم وكتابة وصف الحيود' : 'Please select department and enter description',
        'warning'
      );
      return;
    }

    const deptName = DEPARTMENTS[newNcr.deptKey]?.[isAr ? 'ar' : 'en'] || newNcr.deptKey;

    addNcr({
      type: newNcr.type,
      deptName,
      std: newNcr.std || 'N/A',
      desc: newNcr.desc,
    });

    setNewNcr({
      type: 'TECHNICAL',
      deptKey: '',
      std: '',
      desc: '',
    });
    setIsCreateModalOpen(false);
  };

  const handleShareNcrWhatsApp = (ncr: (typeof ncrs)[0]) => {
    const msg = isAr
      ? `*إشعار حيود وعدم مطابقة عاجل (NCR)*\nرقم التذكرة: ${ncr.id}\nالقسم: ${ncr.deptName}\nالدرجة: ${ncr.type}\nالمعيار: ${ncr.std}\nالوصف: ${ncr.desc}\nالحالة: ${ncr.status === 'OPEN' ? 'مفتوحة (مطلوب CAPA)' : 'مغلقة'}\n------------------------\nيرجى اتخاذ الإجراء التصحيحي خلال 24 ساعة وإفادة إدارة الجودة.`
      : `*Non-Conformance Report (NCR) Alert*\nTicket: ${ncr.id}\nDepartment: ${ncr.deptName}\nSeverity: ${ncr.type}\nStandard: ${ncr.std}\nDescription: ${ncr.desc}\nStatus: ${ncr.status}\n------------------------\nPlease execute CAPA within 24 hours and report to Quality Dept.`;

    dispatchWhatsApp(msg);
  };

  const handleExportCsv = () => {
    const headers = [
      isAr ? 'رقم التذكرة' : 'Ticket ID',
      isAr ? 'القسم' : 'Department',
      isAr ? 'نوع الحيود' : 'Severity',
      isAr ? 'المعيار' : 'Standard',
      isAr ? 'التاريخ' : 'Date',
      isAr ? 'الحالة' : 'Status',
      isAr ? 'الوصف' : 'Description',
    ];

    const rows = filteredNcrs.map(n => [
      n.id,
      n.deptName,
      n.type,
      n.std,
      n.date,
      n.status,
      n.desc,
    ]);

    exportToCsv(`NCR_Report_${Date.now()}`, headers, rows);
    showToast(isAr ? 'تم تصدير ملف CSV بنجاح' : 'Exported CSV successfully', 'success');
  };

  return (
    <AnimatedPage>
      {/* Header Actions */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <i className="fa-solid fa-triangle-exclamation"></i>
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'سجل وإدارة مذكرات عدم المطابقة (NCR)' : 'Non-Conformance Reports (NCR) Manager'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'متابعة الحيود التشغيلية والتقنية وإجراءات التحسين الوقائي (CAPA)'
              : 'Track operational & technical deviations and CAPA corrective resolutions'}
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
            <span>{isAr ? 'تصدير CSV' : 'Export CSV'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md shadow-rose-600/30 transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-plus"></i>
            <span>{isAr ? 'قيد مذكرة جديدة' : 'Log New NCR'}</span>
          </motion.button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setFilterStatus('ALL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            filterStatus === 'ALL'
              ? 'bg-sky-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          {isAr ? `الكل (${ncrs.length})` : `All (${ncrs.length})`}
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus('OPEN')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            filterStatus === 'OPEN'
              ? 'bg-rose-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          <span>
            {isAr
              ? `قيد المعالجة (${ncrs.filter(n => n.status === 'OPEN').length})`
              : `Open (${ncrs.filter(n => n.status === 'OPEN').length})`}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus('CLOSED')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            filterStatus === 'CLOSED'
              ? 'bg-emerald-600 text-white'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>
            {isAr
              ? `مغلقة ومكتملة (${ncrs.filter(n => n.status === 'CLOSED').length})`
              : `Closed (${ncrs.filter(n => n.status === 'CLOSED').length})`}
          </span>
        </button>
      </div>

      {/* NCR Cards Grid */}
      <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredNcrs.map(ncr => {
          const isOpen = ncr.status === 'OPEN';
          return (
            <motion.div
              key={ncr.id}
              variants={staggerChild}
              className={`bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border-2 transition-all shadow-sm flex flex-col justify-between content-visibility-auto transform-gpu ${
                isOpen
                  ? 'border-rose-500/40 bg-rose-500/5'
                  : 'border-emerald-500/40 bg-emerald-500/5'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                      {ncr.id}
                    </span>
                    <Badge
                      variant={
                        ncr.type === 'CRITICAL'
                          ? 'rose'
                          : ncr.type === 'TECHNICAL'
                          ? 'amber'
                          : 'sky'
                      }
                      size="sm"
                    >
                      {ncr.type}
                    </Badge>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-1 ${
                      isOpen
                        ? 'bg-rose-500 text-white shadow-sm'
                        : 'bg-emerald-500 text-white shadow-sm'
                    }`}
                  >
                    <i className={`fa-solid ${isOpen ? 'fa-clock' : 'fa-check'}`}></i>
                    {isOpen ? (isAr ? 'مفتوحة (قيد CAPA)' : 'Open (CAPA Pending)') : (isAr ? 'مغلقة' : 'Closed')}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                    {ncr.deptName}
                  </h4>
                  <p className="text-[11px] text-sky-600 dark:text-sky-400 font-mono font-bold">
                    {ncr.std}
                  </p>
                </div>

                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 leading-relaxed bg-white/60 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                  {ncr.desc}
                </p>

                <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <i className="fa-regular fa-calendar"></i>
                  <span>{ncr.date}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-800/80 gap-2">
                <div className="flex items-center gap-1.5">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handleShareNcrWhatsApp(ncr)}
                    className="px-3 py-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1"
                    title={isAr ? 'إرسال تنبيه واتساب' : 'Dispatch WhatsApp Alert'}
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    <span className="hidden sm:inline">{isAr ? 'إشعار واتساب' : 'WhatsApp'}</span>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => deleteNcr(ncr.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title={isAr ? 'حذف المذكرة' : 'Delete ticket'}
                  >
                    <i className="fa-solid fa-trash-can text-xs"></i>
                  </motion.button>
                </div>

                {isOpen && (
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => {
                        escalateToCapa(
                          'NCR',
                          ncr.id,
                          ncr.desc,
                          ncr.deptName,
                          ncr.desc,
                          isAr ? 'عزل الحالة والالتزام بالمعيار الفوري' : 'Contain non-conformance immediately',
                          isAr ? 'تدريب الفريق ومراجعة الإجراءات' : 'Retrain crew and review standard SOP',
                          ncr.type === 'CRITICAL' ? 'CRITICAL' : 'HIGH'
                        );
                        setActiveTab('capa');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                      title={isAr ? 'تصعيد وفتح مسار في CAPA Tracker' : 'Escalate to CAPA Tracker'}
                    >
                      <i className="fa-solid fa-arrows-spin"></i>
                      <span>{isAr ? 'تصعيد إلى CAPA' : 'Escalate to CAPA'}</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => closeNcr(ncr.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition-all flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-check-double"></i>
                      <span>{isAr ? 'إغلاق واعتماد' : 'Verify & Close'}</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </StaggerGrid>

      {filteredNcrs.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-800">
          <i className="fa-solid fa-circle-check text-4xl text-emerald-500 mb-2 block"></i>
          <h3 className="text-sm font-black text-slate-800 dark:text-slate-200">
            {isAr ? 'لا توجد مذكرات عدم مطابقة مسجلة' : 'No Non-Conformance tickets found'}
          </h3>
        </div>
      )}

      {/* Log New NCR Modal with AnimatedModal */}
      <AnimatedModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} className="max-w-lg">
        <div className={`w-full rounded-3xl p-5 sm:p-6 shadow-2xl border transition-colors max-h-[85dvh] overflow-y-auto overscroll-y-contain [touch-action:pan-y] [-webkit-overflow-scrolling:touch] ${
          isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <i className="fa-solid fa-plus text-sm"></i>
              </div>
              <h3 className="text-base font-black">
                {isAr ? 'قيد مذكرة حيود وعدم مطابقة جديدة' : 'Log New Non-Conformance Report'}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  {isAr ? 'تصنيف الحيود' : 'Severity'}
                </label>
                <select
                  value={newNcr.type}
                  onChange={e => setNewNcr({ ...newNcr, type: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none focus:border-sky-500 ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="TECHNICAL">{isAr ? 'حيود فني (Technical)' : 'Technical'}</option>
                  <option value="CRITICAL">{isAr ? 'حيود حرج (Critical CCP)' : 'Critical CCP'}</option>
                  <option value="OBSERVATION">{isAr ? 'ملاحظة تحسين (Observation)' : 'Observation'}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  {isAr ? 'القسم المعني' : 'Department'}
                </label>
                <select
                  value={newNcr.deptKey}
                  onChange={e => setNewNcr({ ...newNcr, deptKey: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none focus:border-sky-500 ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  <option value="">{isAr ? '-- اختر القسم --' : '-- Select Dept --'}</option>
                  {sectorDeptKeys.map(key => (
                    <option key={key} value={key}>
                      {DEPARTMENTS[key]?.[isAr ? 'ar' : 'en'] || key}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                {isAr ? 'كود المعيار أو رقم الأيزو (اختياري)' : 'Standard / ISO Ref (Optional)'}
              </label>
              <input
                type="text"
                value={newNcr.std}
                onChange={e => setNewNcr({ ...newNcr, std: e.target.value })}
                placeholder="e.g. ISO 9001 / HACCP-CC01 / OSHA 1910"
                className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none focus:border-sky-500 ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                {isAr ? 'وصف الحيود والملاحظة بالتفصيل' : 'Detailed Deviation Description'}
              </label>
              <textarea
                rows={3}
                value={newNcr.desc}
                onChange={e => setNewNcr({ ...newNcr, desc: e.target.value })}
                placeholder={
                  isAr
                    ? 'صف المشكلة المرصودة وموقعها والأثر المترتب عليها...'
                    : 'Describe observed non-conformance, location, and potential impact...'
                }
                className={`w-full p-3 rounded-xl border text-xs font-bold outline-none focus:border-sky-500 ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {isAr ? 'إلغاء' : 'Cancel'}
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-md"
              >
                {isAr ? 'تسجيل المذكرة' : 'Save NCR'}
              </motion.button>
            </div>
          </form>
        </div>
      </AnimatedModal>
    </AnimatedPage>
  );
};
