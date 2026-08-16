import React from 'react';
import { useAudit } from '../../context/AuditContext';
import { HACCP_FLOWS, RECALL_ITEMS, CONTAINMENT_TEMPLATES } from '../../data';
import { getRiskLevel } from '../../utils/calculations';

export const HaccpView: React.FC = () => {
  const {
    isAr,
    isDark,
    currentSector,
    recallRisk,
    setRecallRisk,
    dispatchWhatsApp,
  } = useAudit();

  const flowSteps = HACCP_FLOWS[currentSector] || HACCP_FLOWS._food || [];
  const recallItems = RECALL_ITEMS[currentSector] || RECALL_ITEMS._food || [];
  const containmentList = CONTAINMENT_TEMPLATES[currentSector] || CONTAINMENT_TEMPLATES._food || [];

  const rpnScore = recallRisk.severity * recallRisk.probability;
  const riskInfo = getRiskLevel(rpnScore);

  const selectedItemObj = recallItems.find(i => i.val === recallRisk.item);

  const handleShareRecallWhatsApp = () => {
    const itemName = selectedItemObj ? (isAr ? selectedItemObj.ar : selectedItemObj.en) : recallRisk.item;
    const msg = isAr
      ? `*تنبيه استدعاء وإيقاف تشغيل فوري (RECALL ALERT)*\nالصنف/المعدة: ${itemName}\nدرجة الخطورة: ${riskInfo.labelAr}\nمعامل RPN: ${rpnScore} / 25\nالشدة (Severity): ${recallRisk.severity}/5 | الاحتمالية (Probability): ${recallRisk.probability}/5\n------------------------\nالإجراء المطلوب: تفعيل خطة الاحتواء وعزل الدفعة فوراً وإبلاغ الإدارة العليا.`
      : `*IMMEDIATE RECALL & CONTAINMENT ALERT*\nItem/Equipment: ${itemName}\nRisk Level: ${riskInfo.labelEn}\nRPN Index: ${rpnScore} / 25 (Severity: ${recallRisk.severity}, Probability: ${recallRisk.probability})\n------------------------\nRequired Action: Quarantine batch immediately and initiate crisis protocols.`;

    dispatchWhatsApp(msg);
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
              {isAr ? 'مسار الهاسب (HACCP) ومصفوفة مخاطر الاستدعاء' : 'HACCP Process Flow & Recall Matrix'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'مراقبة نقاط التحكم الحرجة (CCPs) وتحليل احتمالية التلوث وتفعيل بروتوكولات العزل'
              : 'Monitor Critical Control Points (CCPs), calculate RPN risk index, and trigger containment'}
          </p>
        </div>

        <button
          type="button"
          onClick={handleShareRecallWhatsApp}
          className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
        >
          <i className="fa-brands fa-whatsapp text-sm"></i>
          <span>{isAr ? 'إرسال إنذار عاجل' : 'Dispatch Recall Alert'}</span>
        </button>
      </div>

      {/* HACCP Process Flow Steps */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-arrows-split-up-and-left text-sky-500"></i>
          {isAr ? 'مخطط التدفق التشغيلي ونقاط التحكم الحرجة (HACCP Flow)' : 'HACCP Flow & CCP Hierarchy'}
        </h3>

        <div className="flex items-center gap-3 overflow-x-auto pb-3">
          {flowSteps.map((step, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <div
                className={`p-3.5 rounded-2xl border transition-all text-center min-w-[140px] max-w-[180px] space-y-1.5 ${
                  step.isCCP
                    ? 'bg-rose-500/10 border-rose-500/50 shadow-md shadow-rose-500/10'
                    : 'bg-slate-50 dark:bg-slate-950/60 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-black text-slate-400">
                    #{idx + 1}
                  </span>
                  {step.isCCP && (
                    <span className="px-1.5 py-0.5 rounded bg-rose-500 text-white font-black text-[9px]">
                      CCP
                    </span>
                  )}
                </div>

                <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                  {isAr ? step.label.ar : step.label.en}
                </p>
              </div>

              {idx < flowSteps.length - 1 && (
                <i className="fa-solid fa-arrow-left rtl:inline ltr:hidden text-slate-300 dark:text-slate-700 text-sm"></i>
              )}
              {idx < flowSteps.length - 1 && (
                <i className="fa-solid fa-arrow-right ltr:inline rtl:hidden text-slate-300 dark:text-slate-700 text-sm"></i>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5x5 Recall Risk Matrix & Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Risk Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
            {isAr ? 'محاكاة تقييم المخاطر (5x5 Risk Assessment)' : '5x5 Risk Assessment Parameters'}
          </h3>

          <div className="space-y-4">
            {/* Contamination Item */}
            <div>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                {isAr ? 'عنصر الخطر أو الصنف المعني' : 'Hazard / Item Category'}
              </label>
              <select
                value={recallRisk.item}
                onChange={e => setRecallRisk({ ...recallRisk, item: e.target.value })}
                className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none focus:border-emerald-500 ${
                  isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                }`}
              >
                {recallItems.map(item => (
                  <option key={item.val} value={item.val}>
                    {item.emoji} {isAr ? item.ar : item.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Severity Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-300">
                  {isAr ? 'شدة الأثر (Severity: 1-5)' : 'Severity (1-5)'}
                </span>
                <span className="font-mono font-black text-rose-500">{recallRisk.severity}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={recallRisk.severity}
                onChange={e =>
                  setRecallRisk({ ...recallRisk, severity: parseInt(e.target.value, 10) })
                }
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            {/* Probability Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-300">
                  {isAr ? 'احتمالية الحدوث (Probability: 1-5)' : 'Probability (1-5)'}
                </span>
                <span className="font-mono font-black text-amber-500">{recallRisk.probability}</span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={recallRisk.probability}
                onChange={e =>
                  setRecallRisk({ ...recallRisk, probability: parseInt(e.target.value, 10) })
                }
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>

            {/* Calculated Risk Index Card */}
            <div className={`p-4 rounded-2xl border ${riskInfo.bgLight} ${riskInfo.bgDark} space-y-1`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  {isAr ? 'معامل أولوية الخطر (RPN Index):' : 'Risk Priority Number (RPN):'}
                </span>
                <span className="text-xl font-mono font-black text-slate-900 dark:text-white">
                  {rpnScore} / 25
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black">
                <span className={riskInfo.color}>●</span>
                <span className={riskInfo.color}>{isAr ? riskInfo.labelAr : riskInfo.labelEn}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 5x5 Heatmap & Containment Blueprint (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
            {isAr ? 'مصفوفة الخطر التفاعلية 5×5 (Interactive Heatmap)' : '5×5 Risk Matrix Heatmap'}
          </h3>

          {/* 5x5 Grid */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold text-slate-500 text-center">
              {isAr ? '← شدة الأثر (Severity) مقابل الاحتمالية (Probability) ↑' : 'Severity vs Probability'}
            </div>

            <div className="grid grid-cols-5 gap-1.5 max-w-sm mx-auto">
              {[5, 4, 3, 2, 1].map(s =>
                [1, 2, 3, 4, 5].map(p => {
                  const score = s * p;
                  const isCurrent = s === recallRisk.severity && p === recallRisk.probability;
                  const cellColor =
                    score >= 20
                      ? 'bg-rose-600 text-white'
                      : score >= 15
                      ? 'bg-amber-500 text-white'
                      : score >= 9
                      ? 'bg-yellow-400 text-slate-900'
                      : 'bg-emerald-500 text-white';

                  return (
                    <div
                      key={`${s}-${p}`}
                      onClick={() => setRecallRisk({ ...recallRisk, severity: s, probability: p })}
                      className={`aspect-square rounded-xl flex items-center justify-center font-mono font-black text-xs cursor-pointer transition-all ${cellColor} ${
                        isCurrent
                          ? 'ring-4 ring-sky-500 scale-110 z-10 shadow-lg'
                          : 'opacity-80 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      {score}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Containment Action Blueprints */}
          <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-black text-slate-700 dark:text-slate-300">
              {isAr ? 'بروتوكولات العزل والتحفظ القياسية (Quarantine Plan):' : 'Standard Containment Protocols:'}
            </h4>

            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              {containmentList.map((tpl, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-1"
                >
                  <span className="text-xs font-black text-sky-600 dark:text-sky-400 block">
                    {isAr ? tpl.titleAr : tpl.titleEn}
                  </span>
                  <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400 leading-relaxed">
                    {isAr ? tpl.descAr : tpl.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
