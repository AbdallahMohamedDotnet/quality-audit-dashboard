'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { SECTORS, EMERGENCY_PROTOCOLS, CONTAINMENT_TEMPLATES } from '../../data';
import { AnimatedPage } from '../common/AnimatedPage';
import { ScrollReveal } from '../common/ScrollReveal';

export const EmergencyView: React.FC = () => {
  const {
    isAr,
    isDark,
    currentSector,
    emergency,
    setEmergency,
    dispatchWhatsApp,
    dispatchEmail,
    printReport,
    showToast,
    clocks,
  } = useAudit();

  const currentSectorObj = SECTORS.find(s => s.val === currentSector);
  const sectorProtocols = EMERGENCY_PROTOCOLS.filter(p => p.sectors.includes(currentSector));
  const activeProtocol =
    sectorProtocols.find(p => p.val === emergency.type) || sectorProtocols[0] || EMERGENCY_PROTOCOLS[0];

  const containmentList = CONTAINMENT_TEMPLATES[currentSector] || CONTAINMENT_TEMPLATES._food || [];

  const handleBroadcastEmergencyWhatsApp = () => {
    const title = activeProtocol ? (isAr ? activeProtocol.ar : activeProtocol.en) : emergency.type;
    const sectorName = currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector;
    const msg = `*🚨 ${isAr ? 'بلاغ طوارئ وعزل فوري' : 'EMERGENCY RECALL ALERT'} — ${sectorName}*\n${clocks.gregorianDate} - ${clocks.time}\n\n${isAr ? 'النوع' : 'Type'}: ${title}\n${isAr ? 'المادة/المصدر' : 'Item/Source'}: ${emergency.food || '-'}\n${isAr ? 'رقم التشغيلة/المرجع' : 'Batch/Ref'}: ${emergency.lot || '-'}\n${isAr ? 'الإجراء المتخذ' : 'Action Taken'}: ${emergency.action || '-'}\n------------------------\n${isAr ? 'يرجى تفعيل خطة الطوارئ والعزل الفوري.' : 'Engage immediate emergency quarantine and recall protocol.'}`;

    dispatchWhatsApp(msg);
  };

  const handleSendEmergencyEmail = () => {
    const title = activeProtocol ? (isAr ? activeProtocol.ar : activeProtocol.en) : emergency.type;
    const sectorName = currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector;
    const subject = `${isAr ? 'بلاغ طوارئ وعزل عاجل' : 'URGENT Emergency Alert'} - ${sectorName}`;
    const body = `${isAr ? 'النوع' : 'Type'}: ${title}\n${isAr ? 'المادة/المصدر' : 'Item/Source'}: ${emergency.food || '-'}\n${isAr ? 'رقم التشغيلة/المرجع' : 'Batch/Ref'}: ${emergency.lot || '-'}\n${isAr ? 'الإجراء المتخذ' : 'Action Taken'}: ${emergency.action || '-'}`;

    dispatchEmail(subject, body);
  };

  const handleTriggerRedAlert = () => {
    showToast(
      isAr ? 'تم إطلاق كود الطوارئ وتعميم الحظر بالمنشأة!' : 'Red Alert Lockdown Broadcasted!',
      'error'
    );
  };

  return (
    <AnimatedPage>
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center animate-pulse">
              <i className="fa-solid fa-truck-medical"></i>
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'طوارئ وعزل المنتجات' : 'Emergency Recall & Lockdown'}{' '}
              <span className="text-xs font-bold text-rose-500">
                ({currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector})
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'الاستجابة الفورية لحالات الحوادث، التسمم، تسرب المواد، وسحب المنتجات المعيبة'
              : 'Immediate emergency protocol for product recalls, food poisoning, and hazardous leaks'}
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
            <span>{isAr ? 'تصدير PDF' : 'Export PDF'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={handleBroadcastEmergencyWhatsApp}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>{isAr ? 'واتساب' : 'WhatsApp'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="button"
            onClick={handleSendEmergencyEmail}
            className="flex-1 sm:flex-none px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-envelope"></i>
            <span>{isAr ? 'إيميل' : 'Email'}</span>
          </motion.button>
        </div>
      </div>

      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Form Details */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
              {isAr ? 'بيانات البلاغ الميداني' : 'Field Incident Parameters'}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                  {isAr ? 'نوع البلاغ' : 'Report Type'}
                </label>
                <select
                  value={emergency.type}
                  onChange={e => setEmergency({ ...emergency, type: e.target.value })}
                  className={`w-full p-3 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-rose-500 ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                >
                  {sectorProtocols.map(p => (
                    <option key={p.val} value={p.val}>
                      {isAr ? p.ar : p.en}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                    {isAr ? 'المادة / المصدر المشتبه به' : 'Suspect Item / Source'}
                  </label>
                  <input
                    type="text"
                    value={emergency.food}
                    onChange={e => setEmergency({ ...emergency, food: e.target.value })}
                    placeholder={isAr ? 'مثال: اسم الصنف أو المعدة...' : 'e.g. Item or equipment...'}
                    className={`w-full p-3 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-rose-500 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                    {isAr ? 'رقم التشغيلة / المرجع (Lot/Ref)' : 'Batch/Lot/Ref Code'}
                  </label>
                  <input
                    type="text"
                    value={emergency.lot}
                    onChange={e => setEmergency({ ...emergency, lot: e.target.value })}
                    placeholder="e.g. LOT-2026-001"
                    className={`w-full p-3 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-rose-500 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1.5">
                  {isAr ? 'الإجراء التصحيحي المتخذ' : 'Corrective Action Taken'}
                </label>
                <textarea
                  rows={3}
                  value={emergency.action}
                  onChange={e => setEmergency({ ...emergency, action: e.target.value })}
                  placeholder={
                    isAr
                      ? 'صف الإجراء الميداني المتخذ فور اكتشاف الحادثة...'
                      : 'Describe the immediate field action taken...'
                  }
                  className={`w-full p-3 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-rose-500 ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={handleTriggerRedAlert}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3.5 rounded-xl shadow-lg shadow-rose-600/30 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-bullhorn animate-pulse"></i>
                <span>{isAr ? 'إطلاق كود الطوارئ وتعميم الحظر' : 'Trigger Red Alert Lockdown'}</span>
              </motion.button>
            </div>
          </div>

          {/* Right Column: Traceability & Containment Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-list-check text-rose-500"></i>
              <span>{isAr ? 'خطوات التعقب والسيطرة المعتمدة' : 'Traceability & Quarantine Steps'}</span>
            </h3>

            <div className="space-y-3">
              {/* Logged Action Display */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="text-xs font-black text-rose-600 dark:text-rose-400 block">
                  {isAr ? 'الإجراء المُسجَّل:' : 'Logged Action:'}
                </span>
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {emergency.action ||
                    (isAr
                      ? 'لم يُسجَّل إجراء تصحيحي بعد — يُرجى تعبئة الحقل المقابل.'
                      : 'No corrective action logged yet — fill in the field on the left.')}
                </p>
              </div>

              {/* Standard Containment Checklist Items */}
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
                    <span className="text-xs font-black text-rose-600 dark:text-rose-400 block">
                      {isAr ? item.titleAr : item.titleEn}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 block leading-relaxed">
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
