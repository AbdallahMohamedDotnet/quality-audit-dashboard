'use client';

import React from 'react';
import { useAudit } from '../../context/AuditContext';
import { SECTORS, ROLES } from '../../data';

export const Header: React.FC<{ onOpenMobileMenu?: () => void }> = ({ onOpenMobileMenu }) => {
  const {
    isAr,
    isDark,
    toggleTheme,
    setLanguage,
    clocks,
    isLoggedIn,
    currentRole,
    currentSector,
    logoSvg,
    setIsLogoModalOpen,
    setIsLoginModalOpen,
    logout,
  } = useAudit();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentSectorObj = SECTORS.find(s => s.val === currentSector);
  const currentRoleObj = ROLES.find(r => r.val === currentRole);

  return (
    <header
      className={`sticky top-0 z-40 shadow-md transition-colors no-print min-h-[60px] flex items-center ${
        isDark ? 'bg-slate-950 border-b border-slate-800' : 'bg-white border-b border-slate-200'
      }`}
    >
      <div className="max-w-[1600px] w-full mx-auto px-2.5 sm:px-4 py-2 flex flex-col md:flex-row items-center justify-between gap-1.5 md:gap-0">
        {/* Left Section: Logo & Brand */}
        <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open Menu"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>

            {/* Logo Clickable for Customization */}
            <div
              onClick={() => setIsLogoModalOpen(true)}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform"
              title={isAr ? 'انقر لتغيير الشعار والبيانات' : 'Click to customize logo'}
              dangerouslySetInnerHTML={{ __html: logoSvg }}
            />

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-black tracking-tight text-slate-900 dark:text-white">
                  {isAr ? 'منصة التدقيق الرقمية' : 'Digital Audit Platform'}
                </span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-mono">
                  v9.8 PRO
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block font-medium">
                {isAr
                  ? `${currentSectorObj ? currentSectorObj.ar : 'القطاع'} • نظام إدارة الامتثال والجودة`
                  : `${currentSectorObj ? currentSectorObj.en : 'Sector'} • Quality & Compliance`}
              </p>
            </div>
          </div>

          {/* Quick Language Toggle on Mobile */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className="px-2.5 py-1 rounded-lg text-xs font-black border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
          </div>
        </div>

        {/* Center/Right Section: Tri-Calendar & Clocks + Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-[9px] sm:text-[10px] md:text-xs font-bold w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {/* Live Clocks & Dates */}
          <div
            suppressHydrationWarning
            className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border shadow-inner whitespace-nowrap shrink-0 ${
              isDark ? 'bg-slate-900 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}
          >
            {/* Live Time */}
            <span suppressHydrationWarning className="text-sky-600 dark:text-sky-400 flex items-center gap-1">
              <i className="fa-regular fa-clock"></i> {mounted ? clocks.time : ''}
            </span>
            <span className="opacity-40">|</span>

            {/* Gregorian Date */}
            <span suppressHydrationWarning className="text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <i className="fa-regular fa-calendar"></i> {mounted ? clocks.gregorianDate : ''}
            </span>
            <span className="opacity-40 hidden sm:inline">|</span>

            {/* Hijri Date */}
            <span suppressHydrationWarning className="text-emerald-600 dark:text-emerald-400 hidden sm:flex items-center gap-1">
              <i className="fa-solid fa-moon"></i> {mounted ? clocks.hijriDate : ''}
            </span>
            <span className="opacity-40 hidden lg:inline">|</span>

            {/* Coptic Date */}
            <span suppressHydrationWarning className="text-purple-600 dark:text-purple-400 hidden lg:flex items-center gap-1">
              <i className="fa-solid fa-cross"></i> {mounted ? clocks.copticDate : ''}
            </span>
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
              }`}
              title={isAr ? 'تبديل المظهر (ليلي / نهاري)' : 'Toggle Theme (Dark / Light)'}
            >
              <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
            </button>

            {/* Language Switcher */}
            <button
              type="button"
              onClick={() => setLanguage(isAr ? 'en' : 'ar')}
              className={`px-3 py-1.5 rounded-lg border font-bold text-xs transition-colors ${
                isDark
                  ? 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <i className="fa-solid fa-globe mr-1 ml-1 text-sky-500"></i>
              {isAr ? 'English' : 'العربية'}
            </button>

            {/* Auth Button */}
            {isLoggedIn ? (
              <button
                type="button"
                onClick={logout}
                className="px-3 py-1.5 rounded-lg bg-rose-600/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span>{isAr ? 'خروج' : 'Logout'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(true)}
                className="px-3.5 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <i className="fa-solid fa-right-to-bracket"></i>
                <span>{isAr ? 'تسجيل الدخول' : 'Sign In'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
