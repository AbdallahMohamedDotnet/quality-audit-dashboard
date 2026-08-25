'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { SECTORS, DEPARTMENTS, SECTOR_DEPARTMENTS, STANDARDS } from '../../data';
import { SignatureCanvas, SignatureCanvasHandle } from '../common/SignatureCanvas';
import { PhotoUploader } from '../common/PhotoUploader';
import { Badge } from '../common/Badge';
import { AnimatedPage, StaggerGrid } from '../common/AnimatedPage';
import { ScrollReveal } from '../common/ScrollReveal';
import { AnimatedModal } from '../common/AnimatedModal';
import { staggerChild, backdropVariants, modalVariants } from '../../utils/animations';

export const AuditFormView: React.FC = () => {
  const {
    isAr,
    isDark,
    currentSector,
    selectedDept,
    setSelectedDept,
    auditAnswers,
    setAuditAnswerValue,
    setAuditAnswerRca,
    toggleAuditCapaApproved,
    attachPhotoEvidence,
    removePhotoEvidence,
    finalizeAuditSession,
    clearAuditSession,
    addNcr,
    showToast,
  } = useAudit();

  const signatureRef = useRef<SignatureCanvasHandle | null>(null);
  const [hasSignature, setHasSignature] = useState(false);
  const [filterState, setFilterState] = useState<'ALL' | 'DEVIATIONS' | 'COMPLIANT' | 'PENDING'>('ALL');
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const sectorDeptKeys = SECTOR_DEPARTMENTS[currentSector] || [];
  const currentSectorObj = SECTORS.find(s => s.val === currentSector);

  // Auto-reset department if switched to a sector where selectedDept is invalid
  React.useEffect(() => {
    if (selectedDept && !sectorDeptKeys.includes(selectedDept)) {
      setSelectedDept('');
      clearAuditSession();
      signatureRef.current?.clear();
      setHasSignature(false);
    }
  }, [currentSector, selectedDept, sectorDeptKeys, setSelectedDept, clearAuditSession]);

  const relevantStandards = STANDARDS.filter(
    std => std.sectors.includes(currentSector) && std.depts.includes(selectedDept)
  );

  let compliantCount = 0;
  let deviationCount = 0;
  let evaluatedCount = 0;

  relevantStandards.forEach(std => {
    const answer = auditAnswers[std.id];
    if (answer && answer.actual !== '') {
      evaluatedCount++;
      if (answer.isDeviation) {
        deviationCount++;
      } else {
        compliantCount++;
      }
    }
  });

  const liveScore = evaluatedCount > 0 ? Math.round((compliantCount / evaluatedCount) * 100) : null;
  const progressPercent =
    relevantStandards.length > 0 ? Math.round((evaluatedCount / relevantStandards.length) * 100) : 0;

  const filteredList = relevantStandards.filter(std => {
    const answer = auditAnswers[std.id];
    const hasActual = answer && answer.actual !== '';
    if (filterState === 'DEVIATIONS') return hasActual && answer.isDeviation;
    if (filterState === 'COMPLIANT') return hasActual && !answer.isDeviation;
    if (filterState === 'PENDING') return !hasActual;
    return true;
  });

  const handleMarkAllCompliant = () => {
    relevantStandards.forEach(std => {
      // Set to baseline value
      const targetVal = String(std.baseline);
      setAuditAnswerValue(std.id, targetVal, std.baseline, std.operator);
    });
    showToast(
      isAr ? 'تم تعيين جميع البنود كمطابقة للمعيار' : 'All standards marked as compliant',
      'info'
    );
  };

  const handleQuickCreateNcrFromItem = (std: (typeof STANDARDS)[0], answer: any) => {
    const deptName = DEPARTMENTS[selectedDept]?.[isAr ? 'ar' : 'en'] || selectedDept;
    addNcr({
      type: 'TECHNICAL',
      deptName,
      std: `${std.standard} - ${std.code}`,
      desc: isAr
        ? `حيود في المعيار [${std.id}]: القراءة الفعلية (${answer.actual} ${std.unit}) تخالف الحد المطلوب (${std.operator} ${std.baseline} ${std.unit}). ${answer.rca || ''}`
        : `Deviation on [${std.id}]: Actual reading (${answer.actual} ${std.unit}) breached baseline (${std.operator} ${std.baseline} ${std.unit}). ${answer.rca || ''}`,
    });
  };

  const handleFinalize = (e: React.FormEvent) => {
    e.preventDefault();
    const success = finalizeAuditSession(hasSignature);
    if (success) {
      signatureRef.current?.clear();
      setHasSignature(false);
    }
  };

  return (
    <AnimatedPage>
      {/* Header Banner: Sector & Department Selector */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs border border-sky-500/20">
              {currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector}
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'جلسة التدقيق والفحص التشغيلي' : 'Operational Audit Checklist'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isAr
              ? 'قم بتسجيل القياسات الفعلية وإرفاق الأدلة والحيود لتوثيق تقرير الجودة'
              : 'Record actual readings, attach evidence, and document deviations'}
          </p>
        </div>

        {/* Department Switcher Dropdown */}
        <div className="w-full md:w-96">
          <label className="text-[11px] font-bold text-slate-500 block mb-1">
            {isAr ? 'القسم محل الفحص:' : 'Audited Department:'}
          </label>
          <select
            value={selectedDept}
            onChange={e => {
              setSelectedDept(e.target.value);
              clearAuditSession();
              signatureRef.current?.clear();
              setHasSignature(false);
            }}
            className="w-full p-2.5 rounded-xl border font-bold text-xs bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 outline-none focus:border-sky-500 cursor-pointer transition-colors"
          >
            <option value="">
              {isAr ? '-- اختر القسم للبدء في التدقيق --' : '-- Select Department to Audit --'}
            </option>
            {sectorDeptKeys.map(key => {
              const deptInfo = DEPARTMENTS[key];
              return (
                <option key={key} value={key}>
                  {deptInfo ? (isAr ? deptInfo.ar : deptInfo.en) : key}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Live Compliance Score Tracker Sticky Bar */}
      {selectedDept && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="sticky top-0 md:top-[var(--header-height,65px)] z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 border border-slate-200 dark:border-slate-800 shadow-xl space-y-3"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-black text-sm shadow-md shrink-0">
                <i className="fa-solid fa-clipboard-check"></i>
              </div>
              <div className="min-w-0">
                <span className="text-xs font-black block text-slate-900 dark:text-white truncate">
                  {DEPARTMENTS[selectedDept]?.[isAr ? 'ar' : 'en'] || selectedDept}
                </span>
                <span className="text-[11px] text-slate-500 font-bold">
                  {isAr
                    ? `تم تقييم ${evaluatedCount} من ${relevantStandards.length} معياراً (${progressPercent}%)`
                    : `Evaluated ${evaluatedCount} of ${relevantStandards.length} standards (${progressPercent}%)`}
                </span>
              </div>
            </div>

            {/* Quick Actions & Live Score */}
            <div className="flex items-center gap-3 justify-between sm:justify-end">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleMarkAllCompliant}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white dark:text-emerald-400 dark:hover:text-white text-xs font-bold border border-emerald-500/30 transition-all flex items-center gap-1.5"
                title={isAr ? 'تعيين كافة البنود كمطابقة' : 'Mark all compliant'}
              >
                <i className="fa-solid fa-check-double"></i>
                <span className="hidden sm:inline">{isAr ? 'مطابقة الكل' : 'Pass All'}</span>
              </motion.button>

              <div className="flex items-center gap-2 border-l border-r px-3 border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">
                  {isAr ? 'الدرجة:' : 'Score:'}
                </span>
                <span
                  className={`text-xl sm:text-2xl font-mono font-black transition-colors ${
                    liveScore === null
                      ? 'text-slate-400'
                      : liveScore >= 90
                      ? 'text-emerald-500'
                      : liveScore >= 80
                      ? 'text-amber-500'
                      : 'text-rose-500'
                  }`}
                >
                  {liveScore !== null ? `${liveScore}%` : '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Progress Bar with smooth animation */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-sky-500 to-emerald-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-1 text-[11px] font-bold scrollbar-none">
            <button
              type="button"
              onClick={() => setFilterState('ALL')}
              className={`px-3 py-1 rounded-lg transition-all ${
                filterState === 'ALL'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {isAr ? `الكل (${relevantStandards.length})` : `All (${relevantStandards.length})`}
            </button>
            <button
              type="button"
              onClick={() => setFilterState('DEVIATIONS')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                filterState === 'DEVIATIONS'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
              <span>{isAr ? `الحيود (${deviationCount})` : `Deviations (${deviationCount})`}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterState('COMPLIANT')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                filterState === 'COMPLIANT'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>{isAr ? `المطابق (${compliantCount})` : `Compliant (${compliantCount})`}</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterState('PENDING')}
              className={`px-3 py-1 rounded-lg transition-all flex items-center gap-1 ${
                filterState === 'PENDING'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>{isAr ? `المتبقي (${relevantStandards.length - evaluatedCount})` : `Pending (${relevantStandards.length - evaluatedCount})`}</span>
            </button>
          </div>
        </motion.div>
      )}

      {/* Standards List */}
      {!selectedDept ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
          <i className="fa-solid fa-list-check text-4xl text-slate-400 dark:text-slate-600 block animate-bounce"></i>
          <h3 className="text-base font-black text-slate-700 dark:text-slate-300">
            {isAr ? 'اختر القسم للبدء في استعراض المعايير' : 'Select a department to load standards'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            {isAr
              ? 'تتضمن كل قائمة تدقيق كافة المعايير المعتمدة لسلامة الغذاء والأيزو والأوشا الخاصة بالقسم المختار.'
              : 'Checklists include specialized ISO, OSHA, HACCP and SFDA standards for each department.'}
          </p>
        </div>
      ) : filteredList.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 text-center border border-slate-200 dark:border-slate-800">
          <p className="text-xs font-bold text-slate-500">
            {isAr
              ? 'لا توجد بنود معايير مطابقة للتصفية الحالية.'
              : 'No standards match the selected filter.'}
          </p>
        </div>
      ) : (
        <form onSubmit={handleFinalize} className="space-y-4">
          <StaggerGrid className="space-y-4">
            {filteredList.map((std, idx) => {
              const answer = auditAnswers[std.id] || {
                actual: '',
                isDeviation: false,
                rca: '',
                capaApproved: false,
                photo: null,
              };

              const hasAnswer = answer.actual !== '';
              const isDeviation = answer.isDeviation;

              return (
                <motion.div
                  key={std.id}
                  variants={staggerChild}
                  className={`bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border-2 transition-all duration-300 shadow-sm ${
                    hasAnswer
                      ? isDeviation
                        ? 'border-rose-500/60 bg-rose-500/5 shadow-rose-500/5'
                        : 'border-emerald-500/60 bg-emerald-500/5 shadow-emerald-500/5'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-3">
                    <div className="space-y-1.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-black text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-lg border border-sky-500/20">
                          #{idx + 1} {std.id}
                        </span>
                        <Badge variant="indigo" size="sm">
                          {std.standard}
                        </Badge>
                        <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                          {std.code}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                        {isAr ? std.desc.ar : std.desc.en}
                      </p>

                      {std.autoAction && (
                        <div className="text-[11px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-1.5">
                          <i className="fa-solid fa-lightbulb"></i>
                          <span>
                            {isAr ? 'الإجراء المقترح:' : 'Recommended Action:'}{' '}
                            {isAr ? std.autoAction.ar : std.autoAction.en}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Baseline info badge */}
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shrink-0 text-center min-w-[120px]">
                      <span className="text-[10px] font-bold text-slate-500 block uppercase">
                        {isAr ? 'الحد القياسي' : 'Baseline Limit'}
                      </span>
                      <span className="text-xs font-mono font-black text-slate-800 dark:text-slate-200">
                        {std.operator} {std.baseline} {std.unit}
                      </span>
                    </div>
                  </div>

                  {/* Input & Evaluation Row */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <div className="relative flex-1 sm:max-w-xs">
                        <input
                          type="text"
                          value={answer.actual}
                          onChange={e =>
                            setAuditAnswerValue(std.id, e.target.value, std.baseline, std.operator)
                          }
                          placeholder={isAr ? 'أدخل القيمة الفعلية...' : 'Enter actual reading...'}
                          className={`w-full p-2.5 rounded-xl border text-xs font-mono font-bold outline-none transition-all ${
                            hasAnswer
                              ? isDeviation
                                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-700 dark:text-rose-300'
                                : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-300'
                              : isDark
                              ? 'bg-slate-950 border-slate-700 text-slate-100 focus:border-sky-500'
                              : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-sky-500'
                          }`}
                        />
                        <span className="absolute top-2.5 ltr:right-3 rtl:left-3 text-[11px] font-bold text-slate-400 pointer-events-none">
                          {std.unit}
                        </span>
                      </div>

                      {/* Status indicator */}
                      {hasAnswer && (
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 ${
                            isDeviation
                              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                              : 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                          }`}
                        >
                          <i
                            className={`fa-solid ${
                              isDeviation ? 'fa-triangle-exclamation' : 'fa-check'
                            }`}
                          />
                          <span>
                            {isDeviation
                              ? isAr
                                ? 'حيود مرصود'
                                : 'Deviation'
                              : isAr
                              ? 'مطابق'
                              : 'Compliant'}
                          </span>
                        </motion.span>
                      )}
                    </div>

                    {/* Photo Evidence Uploader */}
                    <div className="flex items-center gap-2">
                      {answer.photo && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => setPreviewPhoto(answer.photo)}
                          className="px-2.5 py-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold text-xs hover:bg-sky-500 hover:text-white transition-all flex items-center gap-1"
                        >
                          <i className="fa-solid fa-magnifying-glass-plus"></i>
                          <span>{isAr ? 'تكبير الصورة' : 'Zoom'}</span>
                        </motion.button>
                      )}

                      <PhotoUploader
                        photo={answer.photo}
                        onUpload={file => attachPhotoEvidence(std.id, file)}
                        onRemove={() => removePhotoEvidence(std.id)}
                      />
                    </div>
                  </div>

                  {/* Root Cause Analysis (RCA) & CAPA when deviation is detected */}
                  <AnimatePresence>
                    {isDeviation && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-3 overflow-hidden"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-black text-rose-600 dark:text-rose-400">
                            <i className="fa-solid fa-wrench"></i>
                            <span>
                              {isAr
                                ? 'تحليل السبب الجذري والإجراء التصحيحي الفوري (RCA / CAPA)'
                                : 'Root Cause Analysis & Corrective Action (RCA / CAPA)'}
                            </span>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => handleQuickCreateNcrFromItem(std, answer)}
                            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold shadow-sm transition-all flex items-center gap-1"
                          >
                            <i className="fa-solid fa-triangle-exclamation"></i>
                            <span>{isAr ? 'قيد مذكرة NCR رسمية' : 'Create NCR Ticket'}</span>
                          </motion.button>
                        </div>

                        <textarea
                          rows={2}
                          value={answer.rca}
                          onChange={e => setAuditAnswerRca(std.id, e.target.value)}
                          placeholder={
                            isAr
                              ? 'اكتب السبب الجذري للحيود والإجراء المتخذ فوراً...'
                              : 'Describe root cause and immediate corrective actions...'
                          }
                          className={`w-full p-2.5 rounded-xl border text-xs font-bold transition-colors outline-none focus:border-rose-500 ${
                            isDark
                              ? 'bg-slate-950 border-rose-900/50 text-white'
                              : 'bg-white border-rose-200 text-slate-900'
                          }`}
                        />

                        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                          <input
                            type="checkbox"
                            checked={answer.capaApproved}
                            onChange={() => toggleAuditCapaApproved(std.id)}
                            className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                          />
                          <span>
                            {isAr
                              ? 'تم التحقق من تنفيذ الإجراء التصحيحي واعتماده'
                              : 'CAPA execution verified and approved by lead auditor'}
                          </span>
                        </label>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </StaggerGrid>

          {/* Digital Signature & Submission Block */}
          <ScrollReveal>
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <SignatureCanvas
                ref={signatureRef}
                onSignedChange={signed => setHasSignature(signed)}
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 font-bold text-center sm:text-start">
                  <i className="fa-solid fa-stamp text-sky-500 mr-1 ml-1"></i>
                  {isAr
                    ? 'سيتم ختم التقرير آلياً بالتوقيت الزمني وإدراجه في الأرشيف المعتمد'
                    : 'Report will be timestamped and permanently archived upon signing'}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-sm shadow-xl shadow-sky-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-file-signature"></i>
                  <span>{isAr ? 'اعتماد التقرير وتوثيق الأرشيف' : 'Finalize & Authenticate Audit'}</span>
                </motion.button>
              </div>
            </div>
          </ScrollReveal>
        </form>
      )}

      {/* Lightbox Photo Preview Modal with AnimatedModal */}
      <AnimatedModal isOpen={!!previewPhoto} onClose={() => setPreviewPhoto(null)} className="max-w-2xl">
        {previewPhoto && (
          <div className="relative max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20">
            <img src={previewPhoto} alt="Evidence Zoom" className="w-full h-full object-contain" />
            <button
              type="button"
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>
        )}
      </AnimatedModal>
    </AnimatedPage>
  );
};
