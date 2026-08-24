'use client';

import React from 'react';
import { useAudit } from '../../context/AuditContext';
import { RECALL_ITEMS, CONTAINMENT_TEMPLATES, SECTORS } from '../../data';
import { getRiskLevel } from '../../utils/calculations';
import { StatCard } from '../common/StatCard';

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
    clocks,
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
    const sectorName = currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector;
    const msg = isAr
      ? `*🚨 إنذار استدعاء وسحب فوري (URGENT RECALL & QUARANTINE)*\nالقطاع: ${sectorName}\nالتاريخ والتوقيت: ${clocks.gregorianDate} - ${clocks.time}\n------------------------\n• المادة/المعدة المستهدفة: ${selectedItemName}\n• مؤشر الخطورة (RPN): ${rpnScore} / 25 [${riskInfo.labelAr}]\n• معامل الشدة (Severity): ${recallRisk.severity} / 5\n• معامل الاحتمالية (Probability): ${recallRisk.probability} / 5\n------------------------\n⚠️ الإجراء المطلوب: تفعيل الحظر الفوري، عزل الدفعة بالمستودع، ووقف التوزيع لحين استكمال التحقيق الفني.\n------------------------\nصادر عن منصة التدقيق وضمان الجودة الرقمية.`
      : `*🚨 IMMEDIATE RECALL & QUARANTINE PROTOCOL*\nSector: ${sectorName}\nTimestamp: ${clocks.gregorianDate} - ${clocks.time}\n------------------------\n• Suspect Item/Equipment: ${selectedItemName}\n• Risk Priority Index (RPN): ${rpnScore} / 25 [${riskInfo.labelEn}]\n• Severity: ${recallRisk.severity} / 5\n• Probability: ${recallRisk.probability} / 5\n------------------------\n⚠️ Required Action: Lock inventory immediately, initiate quarantine zone, and pause delivery.\n------------------------\nCertified Digital Quality Platform.`;

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
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
          <button
            type="button"
            onClick={printReport}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-print"></i>
            <span>{isAr ? 'تصدير PDF' : 'Print PDF'}</span>
          </button>

          <button
            type="button"
            onClick={handleShareRecallWhatsApp}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>{isAr ? 'إشعار واتساب' : 'WhatsApp'}</span>
          </button>

          <button
            type="button"
            onClick={handleSendRecallEmail}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-envelope"></i>
            <span>{isAr ? 'إيميل الإدارة' : 'Email GM'}</span>
          </button>
        </div>
      </div>

      {/* Sector Selection */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
          <i className="fa-solid fa-industry text-sky-500"></i>
          <span>{isAr ? 'تحديد القطاع لتقييم خطورة السحب:' : 'Select Industry for Recall Assessment:'}</span>
        </span>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {SECTORS.map(sec => {
            const isSelected = currentSector === sec.val;
            return (
              <button
                key={sec.val}
                type="button"
                onClick={() => setCurrentSector(sec.val)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isAr ? sec.ar : sec.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Risk Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={isAr ? 'معامل الشدة (Severity)' : 'Severity Level'}
          value={`${recallRisk.severity} / 5`}
          subtitle={isAr ? 'تأثير الخطر على المستهلك' : 'Impact on health & compliance'}
          icon={<i className="fa-solid fa-burst text-xl"></i>}
          variant={recallRisk.severity >= 4 ? 'rose' : recallRisk.severity >= 3 ? 'amber' : 'sky'}
        />

        <StatCard
          title={isAr ? 'معامل الاحتمالية (Probability)' : 'Occurrence Probability'}
          value={`${recallRisk.probability} / 5`}
          subtitle={isAr ? 'تكرار وفرصة وقوع الخلل' : 'Likelihood of occurrence'}
          icon={<i className="fa-solid fa-chart-line text-xl"></i>}
          variant={recallRisk.probability >= 4 ? 'rose' : recallRisk.probability >= 3 ? 'amber' : 'sky'}
        />

        <StatCard
          title={isAr ? 'رقم أولوية الخطر (RPN Index)' : 'Risk Priority Number (RPN)'}
          value={`${rpnScore} / 25`}
          subtitle={isAr ? 'الشدة مضروبة في الاحتمالية' : 'Severity × Probability score'}
          icon={<i className="fa-solid fa-triangle-exclamation text-xl"></i>}
          variant={rpnScore >= 15 ? 'rose' : rpnScore >= 9 ? 'amber' : 'emerald'}
        />

        <StatCard
          title={isAr ? 'تصنيف الخطورة الإجمالي' : 'Overall Risk Classification'}
          value={isAr ? riskInfo.labelAr : riskInfo.labelEn}
          subtitle={isAr ? 'البروتوكول الموصى به' : 'Mandatory action tier'}
          icon={<i className="fa-solid fa-shield-virus text-xl"></i>}
          variant={rpnScore >= 15 ? 'rose' : rpnScore >= 9 ? 'amber' : 'emerald'}
        />
      </div>

      {/* Interactive RPN Assessment & Containment Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 cols: RPN Matrix Calculator */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
            {isAr ? 'معايير تقييم المخاطر (RPN Calculator)' : 'RPN Risk Parameters'}
          </h3>

          <div className="space-y-4">
            {/* Suspect Item / Lot Selector */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                {isAr ? 'الصنف أو المعدة المشتبه بها' : 'Suspect Item / Equipment'}
              </label>
              <select
                value={recallRisk.item}
                onChange={e => setRecallRisk({ ...recallRisk, item: e.target.value })}
                className={`w-full p-3 rounded-xl border text-xs font-bold outline-none focus:border-rose-500 ${
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

            {/* Severity Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '1. درجة الشدة والأثر (Severity 1-5):' : '1. Severity (1 = Minor, 5 = Catastrophic):'}
                </span>
                <span className="font-mono font-black text-rose-600 dark:text-rose-400">
                  {recallRisk.severity} / 5
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={recallRisk.severity}
                onChange={e => setRecallRisk({ ...recallRisk, severity: parseInt(e.target.value) || 1 })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
                <span>{isAr ? '1 (ملاحظة طفيفة)' : '1 (Negligible)'}</span>
                <span>{isAr ? '3 (تأثير متوسط)' : '3 (Moderate)'}</span>
                <span>{isAr ? '5 (كارثي / استدعاء فوري)' : '5 (Critical Recall)'}</span>
              </div>
            </div>

            {/* Probability Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '2. احتمالية التكرار (Probability 1-5):' : '2. Probability (1 = Rare, 5 = Frequent):'}
                </span>
                <span className="font-mono font-black text-amber-600 dark:text-amber-400">
                  {recallRisk.probability} / 5
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={recallRisk.probability}
                onChange={e => setRecallRisk({ ...recallRisk, probability: parseInt(e.target.value) || 1 })}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1">
                <span>{isAr ? '1 (نادر الحدوث)' : '1 (Rare)'}</span>
                <span>{isAr ? '3 (محتمل دورياً)' : '3 (Possible)'}</span>
                <span>{isAr ? '5 (متكرر ومستمر)' : '5 (Frequent)'}</span>
              </div>
            </div>

            {/* 1-Click Push to CAPA Tracker */}
            <div className="pt-3">
              <button
                type="button"
                onClick={handleEscalateToCapaTracker}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white text-xs font-black shadow-lg shadow-rose-500/20 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <i className="fa-solid fa-arrows-spin"></i>
                <span>
                  {isAr
                    ? 'تصعيد وتوليد خطة CAPA تلقائية للاستدعاء'
                    : '1-Click Escalate Recall to CAPA Tracker'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right 6 cols: Containment & Quarantine Checklist */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
            <i className="fa-solid fa-shield-halved text-rose-500"></i>
            <span>{isAr ? 'خطة الحظر والاحتواء الفوري المعتمدة' : 'Mandatory Containment Protocol'}</span>
          </h3>

          <div className="space-y-3">
            {containmentList.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0 mt-0.5">
                  <i className="fa-solid fa-lock text-xs"></i>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white">
                    {isAr ? item.titleAr : item.titleEn}
                  </h4>
                  <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                    {isAr ? item.descAr : item.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
