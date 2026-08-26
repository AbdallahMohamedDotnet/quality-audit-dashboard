'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { RECALL_ITEMS, CONTAINMENT_TEMPLATES, SECTORS } from '../../data';
import { getRiskLevel } from '../../utils/calculations';
import { StatCard } from '../common/StatCard';
import { AnimatedPage, StaggerGrid } from '../common/AnimatedPage';
import { ScrollReveal } from '../common/ScrollReveal';
import { formatLiveClocks } from '../../utils/date';

export const RecallView: React.FC = () => {
  const {
    isAr,
    isDark,
    currentSector,
    setCurrentSector,
    recallRisk,
    setRecallRisk,
    escalateToCapa,
    setActiveTab,
    dispatchWhatsApp,
    dispatchEmail,
    printReport,
    showToast,
  } = useAudit();

  const currentSectorObj = SECTORS.find(s => s.val === currentSector);
  const recallItems = RECALL_ITEMS[currentSector] || RECALL_ITEMS._food || [];
  const containmentList = CONTAINMENT_TEMPLATES[currentSector] || CONTAINMENT_TEMPLATES._food || [];

  const rpnScore = recallRisk.severity * recallRisk.probability;
  const riskInfo = getRiskLevel(rpnScore);

  const selectedItemObj = recallItems.find(i => i.val === recallRisk.item);
  const selectedItemName = selectedItemObj
    ? isAr
      ? selectedItemObj.ar
      : selectedItemObj.en
    : recallRisk.item;

  const handleShareRecallWhatsApp = () => {
    const nowClocks = formatLiveClocks(new Date(), isAr);
    const sectorName = currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector;
    const msg = isAr
      ? `*🚨 إنذار استدعاء وسحب فوري (URGENT RECALL & QUARANTINE)*\nالقطاع: ${sectorName}\nالتاريخ والتوقيت: ${nowClocks.gregorianDate} - ${nowClocks.time}\n------------------------\n• المادة/المعدة المستهدفة: ${selectedItemName}\n• مؤشر الخطورة (RPN): ${rpnScore} / 25 [${riskInfo.labelAr}]\n• معامل الشدة (Severity): ${recallRisk.severity} / 5\n• معامل الاحتمالية (Probability): ${recallRisk.probability} / 5\n------------------------\n⚠️ الإجراء المطلوب: تفعيل الحظر الفوري، عزل الدفعة بالمستودع، ووقف التوزيع لحين استكمال التحقيق الفني.\n------------------------\nصادر عن منصة التدقيق وضمان الجودة الرقمية.`
      : `*🚨 IMMEDIATE RECALL & QUARANTINE PROTOCOL*\nSector: ${sectorName}\nTimestamp: ${nowClocks.gregorianDate} - ${nowClocks.time}\n------------------------\n• Suspect Item/Equipment: ${selectedItemName}\n• Risk Priority Index (RPN): ${rpnScore} / 25 [${riskInfo.labelEn}]\n• Severity: ${recallRisk.severity} / 5\n• Probability: ${recallRisk.probability} / 5\n------------------------\n⚠️ Required Action: Lock inventory immediately, initiate quarantine zone, and pause delivery.\n------------------------\nCertified Digital Quality Platform.`;

    dispatchWhatsApp(msg);
  };

  const handleSendRecallEmail = () => {
    const sectorName = currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector;
    const subject = `${isAr ? '🚨 أمر استدعاء عاجل وحظر منتج' : '🚨 URGENT Recall & Quarantine Notice'} - ${sectorName}`;
    const body = `${isAr ? 'المادة المستهدفة' : 'Suspect Item'}: ${selectedItemName}\nRPN Index: ${rpnScore}/25 (${riskInfo.labelEn})\nSeverity: ${recallRisk.severity}/5 | Probability: ${recallRisk.probability}/5\n${isAr ? 'يرجى تطبيق خطة الحظر والعزل الفوري.' : 'Please execute full containment checklist immediately.'}`;

    dispatchEmail(subject, body);
  };

  const handleEscalateToCapaTracker = () => {
    escalateToCapa(
      'AUDIT',
      `RECALL-${Date.now().toString().slice(-4)}`,
      isAr ? `إجراء تصحيحي لحالة استدعاء: ${selectedItemName}` : `CAPA for Product Recall: ${selectedItemName}`,
      currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector,
      isAr ? `ارتفاع مؤشر خطورة RPN إلى ${rpnScore}/25 (${riskInfo.labelAr})` : `RPN breach reached ${rpnScore}/25 (${riskInfo.labelEn})`,
      isAr ? 'عزل الدفعة بالكامل وإيقاف التداول وسحب المنتجات' : 'Quarantine total inventory lot and halt distribution',
      isAr ? 'مراجعة المورد وتحديث معايير الفحص الأولي' : 'Review raw material supplier & update incoming QC criteria',
      rpnScore >= 15 ? 'CRITICAL' : 'HIGH'
    );
    showToast(isAr ? 'تم تصدير ملف الاستدعاء إلى سجل CAPA بنجاح' : 'Exported to CAPA Tracker', 'success');
    setActiveTab('capa');
  };

  return (
    <AnimatedPage>
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <i className="fa-solid fa-boxes-packing"></i>
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'مصفوفة مخاطر الاستدعاء والعزل (Recall & Quarantine)' : 'Product Recall & Quarantine Matrix'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'احتساب رقم أولوية المخاطر (RPN = الشدة × الاحتمالية) وإدارة بروتوكولات حظر وسحب المنتجات المعيبة'
              : 'Calculate Risk Priority Number (RPN = Severity × Probability) and dispatch containment workflows'}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={printReport}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-print"></i>
            <span>{isAr ? 'تصدير PDF' : 'Print PDF'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={handleShareRecallWhatsApp}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={handleSendRecallEmail}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-envelope"></i>
            <span>{isAr ? 'إيميل' : 'Email'}</span>
          </motion.button>
        </div>
      </div>

      {/* RPN Risk KPI Cards */}
      <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={isAr ? 'مؤشر أولوية الخطر (RPN)' : 'Risk Priority Number (RPN)'}
          value={`${rpnScore} / 25`}
          subtitle={isAr ? `المستوى: ${riskInfo.labelAr}` : `Level: ${riskInfo.labelEn}`}
          icon={<i className="fa-solid fa-gauge-high text-xl"></i>}
          variant={rpnScore >= 15 ? 'rose' : rpnScore >= 8 ? 'amber' : 'emerald'}
        />

        <StatCard
          title={isAr ? 'معامل الشدة والتأثير' : 'Severity Rating'}
          value={`${recallRisk.severity} / 5`}
          subtitle={isAr ? 'شدة الضرر على السلامة' : 'Impact severity'}
          icon={<i className="fa-solid fa-skull-crossbones text-xl"></i>}
          variant="rose"
        />

        <StatCard
          title={isAr ? 'معامل احتمالية الحدوث' : 'Probability Rating'}
          value={`${recallRisk.probability} / 5`}
          subtitle={isAr ? 'تكرار وفرصة الوقوع' : 'Occurrence rate'}
          icon={<i className="fa-solid fa-chart-line text-xl"></i>}
          variant="amber"
        />

        <StatCard
          title={isAr ? 'بروتوكول الاحتواء' : 'Containment Protocol'}
          value={rpnScore >= 15 ? (isAr ? 'حظر فوري' : 'Lockdown') : isAr ? 'مراقبة' : 'Monitor'}
          subtitle={isAr ? 'الإجراء التشغيلي الموصى به' : 'Recommended action'}
          icon={<i className="fa-solid fa-shield-virus text-xl"></i>}
          variant={rpnScore >= 15 ? 'rose' : 'sky'}
        />
      </StaggerGrid>

      {/* Risk Calculation Matrix Form & Containment Checklist */}
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
              {isAr ? 'تقييم مؤشرات الخطر الميداني' : 'Field Risk Assessment'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                  {isAr ? 'المادة أو الصنف المستهدف بالفحص' : 'Target Item / Material'}
                </label>
                <select
                  value={recallRisk.item}
                  onChange={e => setRecallRisk({ ...recallRisk, item: e.target.value })}
                  className={`w-full p-3 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-sky-500 ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  {recallItems.map(item => (
                    <option key={item.val} value={item.val}>
                      {isAr ? item.ar : item.en}
                    </option>
                  ))}
                </select>
              </div>

              {/* Severity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-300">
                    {isAr ? 'معامل الشدة (Severity):' : 'Severity Impact:'}
                  </span>
                  <span className="font-mono px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400">
                    {recallRisk.severity} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={recallRisk.severity}
                  onChange={e => setRecallRisk({ ...recallRisk, severity: Number(e.target.value) })}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>

              {/* Probability Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-600 dark:text-slate-300">
                    {isAr ? 'معامل الاحتمالية (Probability):' : 'Probability Factor:'}
                  </span>
                  <span className="font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    {recallRisk.probability} / 5
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={recallRisk.probability}
                  onChange={e => setRecallRisk({ ...recallRisk, probability: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleEscalateToCapaTracker}
                className="w-full bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-black py-3.5 rounded-xl shadow-lg shadow-rose-600/20 transition-all text-xs flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-arrows-spin"></i>
                <span>{isAr ? 'تصعيد حالة الاستدعاء إلى سجل CAPA' : 'Escalate Recall to CAPA Tracker'}</span>
              </motion.button>
            </div>
          </div>

          {/* Containment Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-clipboard-check text-sky-500"></i>
              <span>{isAr ? 'قائمة التحقق من إجراءات الاحتواء والعزل' : 'Containment Protocol Verification'}</span>
            </h3>

            <div className="space-y-3">
              {containmentList.map((item, idx) => (
                <motion.label
                  key={idx}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500 mt-0.5"
                  />
                  <div className="space-y-0.5">
                    <span className="text-xs font-black text-slate-900 dark:text-white block">
                      {isAr ? item.titleAr : item.titleEn}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block leading-relaxed">
                      {isAr ? item.descAr : item.descEn}
                    </span>
                  </div>
                </motion.label>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>
    </AnimatedPage>
  );
};
