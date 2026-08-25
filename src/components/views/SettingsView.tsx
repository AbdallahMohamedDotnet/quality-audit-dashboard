'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { SECTORS, SECTOR_DEPARTMENTS } from '../../data';
import { StatCard } from '../common/StatCard';
import { AnimatedPage, StaggerGrid } from '../common/AnimatedPage';
import { ScrollReveal } from '../common/ScrollReveal';

export const SettingsView: React.FC = () => {
  const {
    isAr,
    isDark,
    language,
    setLanguage,
    toggleTheme,
    currentSector,
    setCurrentSector,
    commSettings,
    setCommSettings,
    dispatchWhatsApp,
    dispatchEmail,
    showToast,
    suppliers,
    capas,
    trainings,
    calibrations,
    archivedAudits,
    ncrs,
  } = useAudit();

  const [formData, setFormData] = useState({
    deptHeadEmail: commSettings.deptHeadEmail,
    gmEmail: commSettings.gmEmail,
    ownerEmail: commSettings.ownerEmail,
    gmWhatsapp: commSettings.gmWhatsapp,
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setCommSettings(formData);
    setIsSaved(true);
    showToast(isAr ? 'تم حفظ إعدادات النظام وقنوات الاتصال بنجاح' : 'Communication settings saved', 'success');
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleTestWhatsApp = () => {
    const msg = isAr
      ? `*اختبار قناة إشعارات الواتساب المعتمدة*\nتم ربط النظام بنجاح برقم: ${formData.gmWhatsapp || '+966500000000'}\nمنصة التدقيق وضمان الجودة الرقمية جاهزة للإرسال الفوري.`
      : `*WhatsApp Notification Test*\nSuccessfully connected to: ${formData.gmWhatsapp || '+966500000000'}\nCertified Quality Audit Platform ready.`;
    dispatchWhatsApp(msg);
  };

  const handleTestEmail = () => {
    const subject = isAr ? 'اختبار قناة البريد الإلكتروني للمدير العام' : 'Executive Email Channel Test';
    const body = isAr
      ? 'هذه رسالة اختبارية لتأكيد صحة إعدادات البريد الإلكتروني لمنصة التدقيق الرقمية.'
      : 'This is a test message confirming digital audit platform email dispatch.';
    dispatchEmail(subject, body);
  };

  const handleExportSystemBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      version: '9.8.0-PRO',
      commSettings,
      suppliers,
      capas,
      trainings,
      calibrations,
      archivedAudits,
      ncrs,
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Quality_Audit_Backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(isAr ? 'تم تنزيل النسخة الاحتياطية للنظام JSON' : 'System backup JSON downloaded', 'success');
  };

  const sectorDeptCount = (SECTOR_DEPARTMENTS[currentSector] || []).length;

  return (
    <AnimatedPage>
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-500 flex items-center justify-center">
              <i className="fa-solid fa-sliders"></i>
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'إعدادات النظام وقنوات الاتصال والتكامل' : 'System Configuration & Dispatch Channels'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'تخصيص أرقام الواتساب، إيميلات الإدارة العليا، النسخ الاحتياطي، وإعدادات المظهر واللغة'
              : 'Manage GM WhatsApp & emails, system backups, branding, and interface localization'}
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          type="button"
          onClick={handleExportSystemBackup}
          className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-download"></i>
          <span>{isAr ? 'نسخ احتياطي كامل (JSON)' : 'Full System Backup'}</span>
        </motion.button>
      </div>

      {/* System Metrics Cards */}
      <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={isAr ? 'إصدار النظام' : 'Platform Version'}
          value="v9.8.0 PRO"
          subtitle={isAr ? 'محدث ومتوافق مع المعايير' : 'Enterprise Edition'}
          icon={<i className="fa-solid fa-code-commit text-xl"></i>}
          variant="sky"
        />

        <StatCard
          title={isAr ? 'أقسام القطاع النشط' : 'Active Sector Depts'}
          value={sectorDeptCount.toString()}
          subtitle={isAr ? 'أقسام تشغيلية جاهزة للتدقيق' : 'Configured operational units'}
          icon={<i className="fa-solid fa-building text-xl"></i>}
          variant="indigo"
        />

        <StatCard
          title={isAr ? 'السجلات المخزنة محلياً' : 'Stored System Records'}
          value={(suppliers.length + capas.length + trainings.length + calibrations.length + archivedAudits.length).toString()}
          subtitle={isAr ? 'متزامنة مع الذاكرة الآمنة' : 'Encrypted & persistent'}
          icon={<i className="fa-solid fa-database text-xl"></i>}
          variant="emerald"
        />

        <StatCard
          title={isAr ? 'حالة المزامنة والاتصال' : 'Cloud & Telemetry'}
          value="ACTIVE"
          subtitle={isAr ? 'جاهز للإرسال والبث' : 'Online & Ready'}
          icon={<i className="fa-solid fa-signal text-xl"></i>}
          variant="teal"
        />
      </StaggerGrid>

      {/* Settings Grid */}
      <ScrollReveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Communication Dispatch Channels (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <i className="fa-solid fa-envelopes-bulk text-sky-500"></i>
                <span>{isAr ? 'قنوات الإرسال وتوجيه البلاغات' : 'Communication & Alert Channels'}</span>
              </h3>
              {isSaved && (
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 animate-fadeIn">
                  <i className="fa-solid fa-check"></i>
                  {isAr ? 'تم الحفظ' : 'Saved'}
                </span>
              )}
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  {isAr ? 'رقم واتساب الإدارة العليا / الطوارئ' : 'GM / Emergency WhatsApp Phone'}
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <i className="fa-brands fa-whatsapp absolute left-3 rtl:right-3 top-3.5 text-[#25D366]"></i>
                    <input
                      type="text"
                      value={formData.gmWhatsapp}
                      onChange={e => setFormData({ ...formData, gmWhatsapp: e.target.value })}
                      placeholder="+966500000000"
                      className={`w-full p-2.5 pl-9 rtl:pr-9 rtl:pl-3 rounded-xl border text-xs font-mono font-bold outline-none transition-colors focus:border-emerald-500 ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleTestWhatsApp}
                    className="px-3 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shrink-0 transition-all flex items-center gap-1"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>{isAr ? 'اختبار' : 'Test'}</span>
                  </motion.button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  {isAr ? 'بريد المدير العام (GM Email)' : 'General Manager (GM) Email'}
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <i className="fa-regular fa-envelope absolute left-3 rtl:right-3 top-3.5 text-sky-500"></i>
                    <input
                      type="email"
                      value={formData.gmEmail}
                      onChange={e => setFormData({ ...formData, gmEmail: e.target.value })}
                      placeholder="gm@enterprise-hospitality.com"
                      className={`w-full p-2.5 pl-9 rtl:pr-9 rtl:pl-3 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-sky-500 ${
                        isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleTestEmail}
                    className="px-3 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shrink-0 transition-all flex items-center gap-1"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>{isAr ? 'اختبار' : 'Test'}</span>
                  </motion.button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  {isAr ? 'بريد مدير الجودة ورئيس القسم (Quality Head Email)' : 'Quality Director / Dept Head Email'}
                </label>
                <div className="relative">
                  <i className="fa-solid fa-user-shield absolute left-3 rtl:right-3 top-3.5 text-indigo-500"></i>
                  <input
                    type="email"
                    value={formData.deptHeadEmail}
                    onChange={e => setFormData({ ...formData, deptHeadEmail: e.target.value })}
                    placeholder="quality@enterprise-hospitality.com"
                    className={`w-full p-2.5 pl-9 rtl:pr-9 rtl:pl-3 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-indigo-500 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300 block mb-1">
                  {isAr ? 'بريد المالك / مجلس الإدارة (Owner / Board Email)' : 'Owner / Board Representative Email'}
                </label>
                <div className="relative">
                  <i className="fa-solid fa-crown absolute left-3 rtl:right-3 top-3.5 text-amber-500"></i>
                  <input
                    type="email"
                    value={formData.ownerEmail}
                    onChange={e => setFormData({ ...formData, ownerEmail: e.target.value })}
                    placeholder="owner@enterprise-hospitality.com"
                    className={`w-full p-2.5 pl-9 rtl:pr-9 rtl:pl-3 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-amber-500 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-black shadow-md transition-all flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-floppy-disk"></i>
                <span>{isAr ? 'حفظ إعدادات الاتصال' : 'Save Communication Settings'}</span>
              </motion.button>
            </form>
          </div>

          {/* Right Column: Preferences & Environment (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="text-sm font-black text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <i className="fa-solid fa-palette text-sky-500"></i>
              <span>{isAr ? 'تفضيلات العرض والواجهة' : 'Display & Localization'}</span>
            </h3>

            <div className="space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    {isAr ? 'نمط المظهر (Dark / Light)' : 'Interface Theme'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">
                    {isDark ? (isAr ? 'الوضع الليلي نشط' : 'Dark Mode Active') : (isAr ? 'الوضع النهاري نشط' : 'Light Mode Active')}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={toggleTheme}
                  className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors"
                >
                  <i className={`fa-solid ${isDark ? 'fa-sun text-amber-400' : 'fa-moon text-sky-600'} text-base`}></i>
                </motion.button>
              </div>

              {/* Language Toggle */}
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
                <div className="space-y-0.5">
                  <span className="text-xs font-black text-slate-900 dark:text-white block">
                    {isAr ? 'لغة النظام (Language)' : 'System Language'}
                  </span>
                  <span className="text-[11px] text-slate-400 font-bold">
                    {isAr ? 'العربية (RTL)' : 'English (LTR)'}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                  className="px-3.5 py-2 rounded-xl bg-sky-600 text-white text-xs font-black hover:bg-sky-700 transition-colors"
                >
                  {isAr ? 'English' : 'عربي'}
                </motion.button>
              </div>

              {/* Sector Default */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-black text-slate-900 dark:text-white block">
                  {isAr ? 'القطاع الافتراضي النشط' : 'Active Sector Default'}
                </span>
                <select
                  value={currentSector}
                  onChange={e => setCurrentSector(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs font-bold outline-none transition-colors focus:border-sky-500 ${
                    isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                  }`}
                >
                  {SECTORS.map(s => (
                    <option key={s.val} value={s.val}>
                      {isAr ? s.ar : s.en}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </AnimatedPage>
  );
};
