'use client';

import React from 'react';
import { useAudit } from '../../context/AuditContext';
import { SECTORS } from '../../data';

export const Header: React.FC<{ onOpenMobileMenu?: () => void }> = ({ onOpenMobileMenu }) => {
  const {
    isAr,
    isDark,
    toggleTheme,
    setLanguage,
    clocks,
    isLoggedIn,
    currentSector,
    logoSvg,
    setIsLogoModalOpen,
    setIsLoginModalOpen,
    logout,
  } = useAudit();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  const currentSectorObj = SECTORS.find(s => s.val === currentSector);

  return (
    <header
      className={`sticky top-0 z-40 no-print transition-colors ${
        isDark
          ? 'bg-slate-950 border-b border-slate-800'
          : 'bg-white border-b border-slate-200'
      }`}
    >
      {/* Single full-width row — no nested max-w wrapper to avoid RTL misalignment */}
      <div className="w-full px-3 sm:px-4 h-14 flex items-center justify-between gap-3">

        {/* ── BRAND SIDE (start — right in RTL, left in LTR) ── */}
        <div className="flex items-center gap-2 min-w-0">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className={`lg:hidden p-2 rounded-lg transition-colors shrink-0 ${
              isDark
                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
            aria-label={isAr ? 'القائمة' : 'Open Menu'}
          >
            <i className="fa-solid fa-bars text-base" />
          </button>

          {/* Logo */}
          <div
            onClick={() => setIsLogoModalOpen(true)}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center cursor-pointer shadow-md hover:scale-105 transition-transform shrink-0"
            title={isAr ? 'انقر لتغيير الشعار' : 'Customize logo'}
            dangerouslySetInnerHTML={{ __html: logoSvg }}
          />

          {/* Brand text */}
          <div className="min-w-0 hidden sm:block">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-sm font-black tracking-tight text-slate-900 dark:text-white">
                {isAr ? 'منصة التدقيق الرقمية' : 'Digital Audit Platform'}
              </span>
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-mono shrink-0">
                v9.8 PRO
              </span>
            </div>
            <p
              suppressHydrationWarning
              className="text-[10px] text-slate-400 font-medium truncate max-w-[200px]"
            >
              {currentSectorObj
                ? (isAr ? currentSectorObj.ar : currentSectorObj.en)
                : (isAr ? 'القطاع' : 'Sector')}
            </p>
          </div>
        </div>

        {/* ── CONTROLS SIDE (end — left in RTL, right in LTR) ── */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

          {/* Date/Time — secondary; hidden on small screens */}
          <div
            suppressHydrationWarning
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] font-semibold shrink-0 ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-400'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <span suppressHydrationWarning className="flex items-center gap-1 text-sky-500 dark:text-sky-400">
              <i className="fa-regular fa-clock text-[9px]" />
              {mounted ? clocks.time : ''}
            </span>
            <span className="opacity-30">|</span>
            <span suppressHydrationWarning>
              {mounted ? clocks.gregorianDate : ''}
            </span>
            <span
              suppressHydrationWarning
              className="hidden lg:flex items-center gap-1 text-emerald-500 dark:text-emerald-400"
            >
              <span className="opacity-30 mx-0.5">|</span>
              <i className="fa-solid fa-moon text-[9px]" />
              {mounted ? clocks.hijriDate : ''}
            </span>
          </div>

          {/* Separator */}
          <div
            className={`hidden md:block w-px h-5 shrink-0 ${
              isDark ? 'bg-slate-800' : 'bg-slate-200'
            }`}
          />

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-colors shrink-0 ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
            title={isAr ? 'تبديل المظهر' : 'Toggle Theme'}
            aria-label="Toggle Theme"
          >
            <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'} text-xs`} />
          </button>

          {/* Language */}
          <button
            type="button"
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-colors shrink-0 ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
            }`}
            aria-label={isAr ? 'English' : 'العربية'}
          >
            {isAr ? 'EN' : 'عر'}
          </button>

          {/* Auth */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={logout}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-colors shrink-0 ${
                isDark
                  ? 'bg-rose-600/10 border-rose-500/30 text-rose-400 hover:bg-rose-600 hover:text-white hover:border-rose-600'
                  : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600'
              }`}
            >
              <i className="fa-solid fa-arrow-right-from-bracket text-[10px]" />
              <span className="hidden sm:inline">{isAr ? 'خروج' : 'Logout'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsLoginModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold shadow-sm transition-colors shrink-0"
            >
              <i className="fa-solid fa-right-to-bracket text-[10px]" />
              <span className="hidden sm:inline">{isAr ? 'دخول' : 'Sign In'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
