'use client';

import React, { useState } from 'react';
import { useAudit } from '../../context/AuditContext';
import { HACCP_FLOWS, SECTORS } from '../../data';
import { StatCard } from '../common/StatCard';

export const HaccpView: React.FC = () => {
  const {
    isAr,
    currentSector,
    setCurrentSector,
    addNcr,
    setActiveTab,
    dispatchWhatsApp,
    printReport,
    showToast,
    clocks,
  } = useAudit();

  const currentSectorObj = SECTORS.find(s => s.val === currentSector);
  const flowSteps = HACCP_FLOWS[currentSector] || HACCP_FLOWS._food || [];

  const [selectedStepIndex, setSelectedStepIndex] = useState<number>(0);
  const selectedStep = flowSteps[selectedStepIndex] || flowSteps[0];

  const ccpSteps = flowSteps.filter(s => s.isCCP);

  const handleShareHaccpWhatsApp = () => {
    const sectorName = currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector;
    const ccpListText = ccpSteps
      .map((s, idx) => `• CCP #${idx + 1}: ${isAr ? s.label.ar : s.label.en}`)
      .join('\n');

    const msg = isAr
      ? `*🛡️ خطة الهاسب ونقاط التحكم الحرجة (HACCP Plan)*\nالقطاع: ${sectorName}\nالتاريخ: ${clocks.gregorianDate}\nإجمالي مراحل التدفق: ${flowSteps.length} مراحل\nنقاط التحكم الحرجة المعتمدة (CCPs): ${ccpSteps.length}\n------------------------\n${ccpListText}\n------------------------\nتم التوثيق والاعتماد وفق معايير ISO 22000 & Codex Alimentarius.`
      : `*🛡️ Certified HACCP Flow & CCP Plan*\nSector: ${sectorName}\nDate: ${clocks.gregorianDate}\nTotal Flow Stages: ${flowSteps.length}\nCritical Control Points (CCPs): ${ccpSteps.length}\n------------------------\n${ccpListText}\n------------------------\nCertified under ISO 22000 & Codex Alimentarius standards.`;

    dispatchWhatsApp(msg);
  };

  const handleLogCcpDeviation = (step: (typeof flowSteps)[0]) => {
    const stepName = isAr ? step.label.ar : step.label.en;
    addNcr({
      type: 'CRITICAL',
      deptName: currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector,
      std: 'HACCP-CCP-CRITICAL',
      desc: isAr
        ? `حيود حرج في نقطة التحكم الحرجة (CCP): تجاوز الحدود الحرجة في مرحلة "${stepName}"`
        : `Critical breach at Critical Control Point (CCP): Critical limits violated at "${stepName}" stage`,
    });
    showToast(isAr ? 'تم قيد مذكرة حيود حرج CCP فوراً' : 'Logged Critical CCP deviation', 'error');
    setActiveTab('ncr');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <i className="fa-solid fa-shield-halved"></i>
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'مسار الهاسب ونقاط التحكم الحرجة (HACCP & CCPs)' : 'HACCP Flow & Critical Control Points (CCP)'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'مخطط التدفق التشغيلي، تحديد المخاطر البيولوجية والكيميائية والفيزيائية، وتعيين الحدود الحرجة (ISO 22000)'
              : 'Process flow analysis, hazard control (Biological, Chemical, Physical), and Critical Limits monitoring'}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={printReport}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-print"></i>
            <span>{isAr ? 'طباعة خطة HACCP' : 'Print Plan'}</span>
          </button>

          <button
            type="button"
            onClick={handleShareHaccpWhatsApp}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>{isAr ? 'مشاركة الوثيقة' : 'Share WhatsApp'}</span>
          </button>
        </div>
      </div>

      {/* Sector Switcher */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
          <i className="fa-solid fa-industry text-sky-500"></i>
          <span>{isAr ? 'تحديد قطاع خط الإنتاج والتجهيز:' : 'Select Industry Production Stream:'}</span>
        </span>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {SECTORS.map(sec => {
            const isSelected = currentSector === sec.val;
            return (
              <button
                key={sec.val}
                type="button"
                onClick={() => {
                  setCurrentSector(sec.val);
                  setSelectedStepIndex(0);
                }}
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

      {/* HACCP KPI Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard
          title={isAr ? 'إجمالي مراحل التدفق' : 'Total Process Steps'}
          value={flowSteps.length.toString()}
          subtitle={isAr ? 'مخطط تسلسل العمليات' : 'Sequential process chain'}
          icon={<i className="fa-solid fa-arrows-split-up-and-left text-xl"></i>}
          variant="sky"
        />

        <StatCard
          title={isAr ? 'نقاط التحكم الحرجة (CCPs)' : 'Critical Control Points'}
          value={ccpSteps.length.toString()}
          subtitle={isAr ? 'تتطلب مراقبة مستمرة' : 'Mandatory monitoring'}
          icon={<i className="fa-solid fa-triangle-exclamation text-xl"></i>}
          variant="rose"
        />

        <StatCard
          title={isAr ? 'برامج الاشتراطات المسبقة (PRPs)' : 'Prerequisite Programs'}
          value={(flowSteps.length - ccpSteps.length).toString()}
          subtitle={isAr ? 'إجراءات النظافة والتعقيم' : 'GHP & Sanitation baseline'}
          icon={<i className="fa-solid fa-list-check text-xl"></i>}
          variant="emerald"
        />

        <StatCard
          title={isAr ? 'مطابقة معيار الأيزو' : 'ISO 22000 Compliance'}
          value="100%"
          subtitle={isAr ? 'معتمد وفق الكود الدولي' : 'Codex validated'}
          icon={<i className="fa-solid fa-stamp text-xl"></i>}
          variant="indigo"
        />
      </div>

      {/* Process Flow Interactive Stepper */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-diagram-project text-sky-500"></i>
            <span>{isAr ? 'مخطط تسلسل العمليات التشغيلية (Process Flow)' : 'Process Flow Hierarchy'}</span>
          </h3>
          <span className="text-xs text-slate-400 font-bold">
            {isAr ? 'اضغط على المرحلة لعرض تفاصيلها' : 'Click stage to inspect CCP parameters'}
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1">
          {flowSteps.map((step, idx) => {
            const isSelected = selectedStepIndex === idx;
            return (
              <div key={idx} className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setSelectedStepIndex(idx)}
                  className={`p-4 rounded-2xl border text-center min-w-[150px] max-w-[190px] space-y-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-sky-500 scale-105 shadow-md ' +
                        (step.isCCP
                          ? 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300'
                          : 'bg-sky-500/15 border-sky-500 text-sky-700 dark:text-sky-300')
                      : step.isCCP
                      ? 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/40 text-slate-800 dark:text-slate-200 hover:border-rose-500'
                      : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black text-slate-400">
                      Step #{idx + 1}
                    </span>
                    {step.isCCP ? (
                      <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white font-black text-[9px] shadow-sm animate-pulse">
                        CCP
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold text-[9px]">
                        PRP
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-black leading-tight">
                    {isAr ? step.label.ar : step.label.en}
                  </p>
                </button>

                {idx < flowSteps.length - 1 && (
                  <i className="fa-solid fa-arrow-left rtl:inline ltr:hidden text-slate-300 dark:text-slate-700 text-base"></i>
                )}
                {idx < flowSteps.length - 1 && (
                  <i className="fa-solid fa-arrow-right ltr:inline rtl:hidden text-slate-300 dark:text-slate-700 text-base"></i>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Step Deep Dive Details */}
      {selectedStep && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 gap-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black ${
                  selectedStep.isCCP
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                }`}
              >
                #{selectedStepIndex + 1}
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{isAr ? selectedStep.label.ar : selectedStep.label.en}</span>
                  {selectedStep.isCCP && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-black">
                      {isAr ? 'نقطة تحكم حرجة معتمدة (Critical Control Point)' : 'Certified CCP'}
                    </span>
                  )}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedStep.isCCP
                    ? isAr
                      ? 'تتطلب قياساً دورياً وتسجيل قراءات الحدود الحرجة مع خطة إجراء تصحيحي فوري'
                      : 'Requires continuous monitoring, calibration logs, and defined corrective actions'
                    : isAr
                    ? 'خاضعة لاشتراطات النظافة والممارسات الصحية الجيدة (GHP)'
                    : 'Governed by Good Hygiene Practices (GHP) and standard sanitation SOPs'}
                </p>
              </div>
            </div>

            {selectedStep.isCCP && (
              <button
                type="button"
                onClick={() => handleLogCcpDeviation(selectedStep)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
              >
                <i className="fa-solid fa-triangle-exclamation"></i>
                <span>{isAr ? 'قيد حيود CCP عاجل' : 'Log CCP Deviation'}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Hazard Identification */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
              <span className="text-xs font-black text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <i className="fa-solid fa-virus"></i>
                {isAr ? '1. تحليل المخاطر المحتملة (Hazards)' : '1. Potential Hazards'}
              </span>
              <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedStep.isCCP
                  ? isAr
                    ? 'بكتيريا ممرضة (Salmonella, Listeria)، بقايا كيميائية، أو أجسام فيزيائية حادة.'
                    : 'Pathogenic bacteria (Salmonella, Listeria), chemical residues, or foreign matter.'
                  : isAr
                  ? 'تلوث عرضي سطحي أو أخطاء تداول بشرية.'
                  : 'Surface cross-contamination or personnel handling errors.'}
              </p>
            </div>

            {/* 2. Critical Limits */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 space-y-2">
              <span className="text-xs font-black text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                <i className="fa-solid fa-ruler-combined"></i>
                {isAr ? '2. الحدود الحرجة (Critical Limits)' : '2. Critical Limits'}
              </span>
              <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedStep.isCCP
                  ? isAr
                    ? 'درجة الحرارة: ≤ 4°C للتبريد أو ≥ 75°C للطهي، ضغط التعقيم: 1.2 bar، مدة المعاملة: 15 دقيقة.'
                    : 'Temperature: ≤ 4°C chilling or ≥ 75°C core cooking, Pressure: 1.2 bar, Time: 15 mins.'
                  : isAr
                  ? 'الالتزام بجدول التنظيف والتعقيم المعياري (SSOP).'
                  : 'Full adherence to Sanitation Standard Operating Procedures (SSOP).'}
              </p>
            </div>

            {/* 3. Monitoring & Corrective Action */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
              <span className="text-xs font-black text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <i className="fa-solid fa-list-check"></i>
                {isAr ? '3. المراقبة والإجراء التصحيحي' : '3. Monitoring & Corrective Action'}
              </span>
              <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                {selectedStep.isCCP
                  ? isAr
                    ? 'فحص رقمي كل 30 دقيقة بمجسات معايرة. في حال الحيود: إيقاف الخط فوراً وعزل المنتج وإعادة المعالجة.'
                    : 'Digital probe check every 30m. If breached: stop line, quarantine product, and reprocess.'
                  : isAr
                  ? 'فحص بصري دوري وتوثيق التوقيع في سجل الهاسب.'
                  : 'Periodic visual inspection and supervisor sign-off in logbook.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
