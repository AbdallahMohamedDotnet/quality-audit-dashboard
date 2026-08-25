'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { SECTOR_DEPARTMENTS, DEPARTMENTS } from '../../data';
import { AnimatedPage, StaggerGrid } from '../common/AnimatedPage';
import { ScrollReveal } from '../common/ScrollReveal';
import { staggerChild } from '../../utils/animations';

export const AiAssistantView: React.FC = () => {
  const {
    isAr,
    isDark,
    currentSector,
    complaint,
    setComplaint,
    analyzeComplaintAi,
    escalateToCapa,
    setActiveTab,
    dispatchWhatsApp,
    dispatchEmail,
    showToast,
  } = useAudit();

  const sectorDeptKeys = SECTOR_DEPARTMENTS[currentSector] || [];

  const handleShareApologyWhatsApp = () => {
    if (!complaint.output?.reply) return;
    dispatchWhatsApp(complaint.output.reply);
  };

  const handleEscalateGmEmail = () => {
    if (!complaint.output) return;
    const deptName = DEPARTMENTS[complaint.dept]?.[isAr ? 'ar' : 'en'] || complaint.dept;
    const subject = isAr
      ? `[عاجل] تصعيد شكوى عميل وخطة CAPA - قسم (${deptName})`
      : `[URGENT] Customer Incident Escalation & CAPA - (${deptName})`;

    const body = `${complaint.output.report}\n\n• الإجراء الفوري: ${complaint.output.capaImmediate}\n• التحقيق الجذري: ${complaint.output.capaRootCause}\n• الإجراء الوقائي: ${complaint.output.capaPreventive}\n• المهل الزمنية: ${complaint.output.capaDeadline}`;

    dispatchEmail(subject, body);
  };

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    showToast(
      isAr ? `تم نسخ ${label} إلى الحافظة` : `Copied ${label} to clipboard`,
      'success'
    );
  };

  const handleLoadPreset = (scenario: 'food' | 'cleanliness' | 'ac' | 'safety') => {
    if (scenario === 'food') {
      const targetDept = sectorDeptKeys.find(k => k.includes('kitchen') || k.includes('f_b') || k.includes('production')) || sectorDeptKeys[0] || 'main_kitchen';
      setComplaint({
        guestName: isAr ? 'أ. عبد الرحمن السعيد' : 'Mr. John Anderson',
        room: 'Table 14 / Order #892',
        dept: targetDept,
        text: isAr
          ? 'تم استلام وجبة الطعام بدرجة حرارة باردة جداً وكان هناك تأخير تجاوز 45 دقيقة وسوء تعامل من مشرف الصالة.'
          : 'Food served completely cold with a 45-minute delay and unresponsive service supervisor.',
        output: null,
      });
    } else if (scenario === 'cleanliness') {
      const targetDept = sectorDeptKeys.find(k => k.includes('housekeeping') || k.includes('hygiene') || k.includes('clean')) || sectorDeptKeys[0] || 'housekeeping';
      setComplaint({
        guestName: isAr ? 'د. سارة محمود' : 'Dr. Sarah Jenkins',
        room: 'Suite 405',
        dept: targetDept,
        text: isAr
          ? 'ملاحظة وجود بقع في الشراشف وعدم تعقيم أدوات الحمام عند استلام الغرفة.'
          : 'Found stains on linens and unsterilized bathroom amenities upon room check-in.',
        output: null,
      });
    } else if (scenario === 'ac') {
      const targetDept = sectorDeptKeys.find(k => k.includes('engineering') || k.includes('maintenance')) || sectorDeptKeys[0] || 'engineering';
      setComplaint({
        guestName: isAr ? 'م. طارق العوضي' : 'Eng. Michael Chang',
        room: 'Ward / Unit B',
        dept: targetDept,
        text: isAr
          ? 'عطل في وحدة التكييف المركزية وارتفاع درجة الحرارة لأكثر من 28 درجة مئوية مع تسريب مياه.'
          : 'Central HVAC failure causing ambient temperature to spike to 28°C with condensation leak.',
        output: null,
      });
    } else {
      const targetDept = sectorDeptKeys.find(k => k.includes('safety') || k.includes('er') || k.includes('warehouse')) || sectorDeptKeys[0] || 'safety';
      setComplaint({
        guestName: isAr ? 'أ. ياسر القحطاني' : 'Mr. David Miller',
        room: 'Corridor 2 East',
        dept: targetDept,
        text: isAr
          ? 'انسداد مخرج الطوارئ بكراتين المخزون وعدم إضاءة كشافات الهروب الاحتياطية.'
          : 'Emergency fire exit blocked with storage pallets and emergency backup lighting offline.',
        output: null,
      });
    }

    showToast(
      isAr ? 'تم تحميل سيناريو الشكوى التجريبي' : 'Loaded sample incident scenario',
      'info'
    );
  };

  return (
    <AnimatedPage>
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <i className="fa-solid fa-brain"></i>
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'مساعد الذكاء الاصطناعي لتحليل الشكاوى والـ CAPA' : 'AI Complaint & Root-Cause CAPA Engine'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'تحليل الشكاوى وتوليد خطة استجابة فورية، تحليل 5-Whys، وبروتوكول إجراء تصحيحي وقائي مؤتمت'
              : 'Analyze guest complaints with 5-Whys Root Cause models and auto-generate executive CAPA'}
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold text-slate-400 uppercase">
            {isAr ? 'أمثلة سريعة:' : 'Quick Presets:'}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleLoadPreset('food')}
            className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-purple-600 hover:text-white text-[11px] font-bold transition-all"
          >
            🍔 {isAr ? 'جودة طعام' : 'Food'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleLoadPreset('cleanliness')}
            className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-purple-600 hover:text-white text-[11px] font-bold transition-all"
          >
            🛏️ {isAr ? 'نظافة' : 'Hygiene'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleLoadPreset('ac')}
            className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-purple-600 hover:text-white text-[11px] font-bold transition-all"
          >
            ❄️ {isAr ? 'تكييف' : 'HVAC'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => handleLoadPreset('safety')}
            className="px-2.5 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500 text-purple-600 hover:text-white text-[11px] font-bold transition-all"
          >
            ⚠️ {isAr ? 'سلامة' : 'Safety'}
          </motion.button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Complaint Input Form (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
            {isAr ? 'بيانات البلاغ أو الشكوى الواردة' : 'Incoming Incident Details'}
          </h3>

          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  {isAr ? 'اسم العميل / النزيل' : 'Customer Name'}
                </label>
                <input
                  type="text"
                  value={complaint.guestName}
                  onChange={e => setComplaint({ ...complaint, guestName: e.target.value })}
                  placeholder={isAr ? 'أ. عبد الله محمد' : 'e.g. John Doe'}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-purple-500 ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  {isAr ? 'رقم الغرفة / الطلب' : 'Room / Order Ref'}
                </label>
                <input
                  type="text"
                  value={complaint.room}
                  onChange={e => setComplaint({ ...complaint, room: e.target.value })}
                  placeholder="e.g. Room 402"
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-purple-500 ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                {isAr ? 'القسم محل الواقعة' : 'Incident Department'}
              </label>
              <select
                value={complaint.dept}
                onChange={e => setComplaint({ ...complaint, dept: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none focus:border-purple-500 cursor-pointer transition-colors ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                <option value="">{isAr ? '-- اختر القسم --' : '-- Select Department --'}</option>
                {sectorDeptKeys.map(key => (
                  <option key={key} value={key}>
                    {DEPARTMENTS[key]?.[isAr ? 'ar' : 'en'] || key}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block mb-1">
                {isAr ? 'نص الشكوى أو الملاحظة بالتفصيل' : 'Complaint Narrative'}
              </label>
              <textarea
                rows={4}
                value={complaint.text}
                onChange={e => setComplaint({ ...complaint, text: e.target.value })}
                placeholder={
                  isAr
                    ? 'مثال: وجبة العشاء في المطعم وصلت باردة وكان هناك تأخير 45 دقيقة وسوء تعامل من النادل...'
                    : 'e.g. Food delivered cold with 45 minutes delay and unprofessional server behavior...'
                }
                className={`w-full p-3 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-purple-500 ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={analyzeComplaintAi}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              <span>{isAr ? 'تحليل ومطابقة بالذكاء الاصطناعي' : 'Run AI Root-Cause Analysis'}</span>
            </motion.button>
          </div>
        </div>

        {/* Right Column: AI Output & CAPA Timeline (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-microchip text-purple-500"></i>
              {isAr ? 'مخرجات التحليل الاستراتيجي وخطة CAPA' : 'AI Strategic Findings & CAPA Blueprint'}
            </h3>

            {complaint.output && (
              <span className="text-[10px] font-mono font-black text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                100% AI Confidence
              </span>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!complaint.output ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-16 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl space-y-2"
              >
                <i className="fa-solid fa-robot text-4xl text-slate-400 mb-2 block animate-pulse"></i>
                <p className="text-xs font-bold text-slate-500">
                  {isAr
                    ? 'أدخل بيانات الشكوى واضغط "تحليل" لتوليد الرد الرسمي وخطة الإجراءات التصحيحية فوراً'
                    : 'Enter incident details and run AI analysis to produce actionable root-cause resolutions.'}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="space-y-4"
              >
                {/* 1. Official Customer Apology */}
                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                      <i className="fa-regular fa-comment-dots"></i>
                      {isAr ? 'صيغة الاعتذار والاسترضاء المعتمدة للعميل' : 'Customer Apology & Redress Response'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyText(complaint.output!.reply, isAr ? 'صيغة الرد' : 'Response')}
                        className="text-[11px] font-bold text-slate-500 hover:text-sky-500 flex items-center gap-1 transition-colors"
                      >
                        <i className="fa-regular fa-copy"></i>
                        <span>{isAr ? 'نسخ' : 'Copy'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleShareApologyWhatsApp}
                        className="text-[11px] font-bold text-[#25D366] hover:underline flex items-center gap-1"
                      >
                        <i className="fa-brands fa-whatsapp"></i>
                        <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed bg-white/70 dark:bg-slate-950/70 p-3 rounded-xl">
                    {complaint.output.reply}
                  </p>
                </div>

                {/* 2. Executive Incident Brief */}
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                      <i className="fa-solid fa-chart-line"></i>
                      {isAr ? 'التقرير الفني للإدارة العليا' : 'Executive Incident Brief'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyText(complaint.output!.report, isAr ? 'التقرير الفني' : 'Report')}
                        className="text-[11px] font-bold text-slate-500 hover:text-purple-500 flex items-center gap-1 transition-colors"
                      >
                        <i className="fa-regular fa-copy"></i>
                        <span>{isAr ? 'نسخ' : 'Copy'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleEscalateGmEmail}
                        className="text-[11px] font-bold text-sky-500 hover:underline flex items-center gap-1"
                      >
                        <i className="fa-regular fa-envelope"></i>
                        <span>{isAr ? 'تصعيد بالإيميل' : 'Email GM'}</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                    {complaint.output.report}
                  </p>
                </div>

                {/* 3. CAPA 3-Stage Blueprint */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-black text-slate-700 dark:text-slate-300 block">
                    {isAr ? 'بروتوكول المعالجة ثلاثي المراحل (CAPA Timeline)' : '3-Tier CAPA Timeline'}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-1"
                    >
                      <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase block">
                        {isAr ? '1. الاحتواء الفوري (2h)' : '1. Immediate Containment'}
                      </span>
                      <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {complaint.output.capaImmediate}
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-1"
                    >
                      <span className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase block">
                        {isAr ? '2. التحقيق الجذري (48h)' : '2. 5-Whys Root Cause'}
                      </span>
                      <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {complaint.output.capaRootCause}
                      </p>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-1"
                    >
                      <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase block">
                        {isAr ? '3. الوقاية الشاملة (7d)' : '3. Preventative Systemic'}
                      </span>
                      <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                        {complaint.output.capaPreventive}
                      </p>
                    </motion.div>
                  </div>

                  {/* 1-Click Push to CAPA Tracker */}
                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => {
                        const deptName = DEPARTMENTS[complaint.dept]?.[isAr ? 'ar' : 'en'] || complaint.dept;
                        const title = isAr
                          ? `معالجة شكوى (${complaint.guestName || 'عميل'}) - قسم ${deptName}`
                          : `Customer Incident Resolution (${complaint.guestName || 'Client'}) - ${deptName}`;

                        escalateToCapa(
                          'COMPLAINT',
                          complaint.room || 'GUEST',
                          title,
                          deptName,
                          complaint.output!.capaRootCause,
                          complaint.output!.capaImmediate,
                          complaint.output!.capaPreventive,
                          'HIGH'
                        );
                        setActiveTab('capa');
                      }}
                      className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white text-xs font-black shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-2"
                    >
                      <i className="fa-solid fa-arrows-spin"></i>
                      <span>
                        {isAr
                          ? 'اعتماد وتصدير الخطة مباشرة إلى سجل CAPA Master Tracker'
                          : 'Push & Escalate Plan Directly to CAPA Tracker'}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AnimatedPage>
  );
};
