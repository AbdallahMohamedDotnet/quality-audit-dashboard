'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { SECTORS } from '../../data';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { formatLiveClocks, LiveClocks } from '../../utils/date';

/** Isolated Clock Pill that ticks locally every second without re-rendering parent components */
const HeaderTimePill: React.FC<{ isAr: boolean; isDark: boolean }> = React.memo(({ isAr, isDark }) => {
  const [clocks, setClocks] = React.useState<LiveClocks>(() => formatLiveClocks(new Date(), isAr));
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setClocks(formatLiveClocks(new Date(), isAr));
    }, 1000);
    return () => clearInterval(interval);
  }, [isAr]);

  return (
    <div
      suppressHydrationWarning
      className={`hidden md:inline-flex items-center gap-1.5 h-9 px-2.5 lg:px-3 rounded-xl border text-[11px] font-semibold shrink-0 transition-colors select-none ${
        isDark
          ? 'bg-slate-900/90 border-slate-800 text-slate-300 shadow-sm'
          : 'bg-slate-50 border-slate-200 text-slate-600 shadow-sm'
      }`}
    >
      <span suppressHydrationWarning className="flex items-center gap-1 text-sky-500 font-mono font-bold">
        <span className="text-xs">⏱️</span>
        {mounted ? clocks.time : ''}
      </span>
      <span
        suppressHydrationWarning
        className="hidden lg:flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium"
      >
        <span className="opacity-30 mx-0.5">|</span>
        <span className="text-[11px]">📅</span>
        {mounted ? clocks.gregorianDate : ''}
      </span>
      <span
        suppressHydrationWarning
        className="hidden xl:flex items-center gap-1 text-emerald-500 font-medium"
      >
        <span className="opacity-30 mx-0.5">|</span>
        <span className="text-xs">🌙</span>
        {mounted ? clocks.hijriDate : ''}
      </span>
    </div>
  );
});
HeaderTimePill.displayName = 'HeaderTimePill';

export const Header: React.FC<{ onOpenMobileMenu?: () => void }> = ({ onOpenMobileMenu }) => {
  const router = useRouter();
  const {
    isAr,
    isDark,
    toggleTheme,
    setLanguage,
    isLoggedIn,
    currentSector,
    logoSvg,
    setIsLogoModalOpen,
    isSidebarCollapsed,
    toggleSidebarCollapse,
    logout,
  } = useAudit();

  const { isScrolled } = useScrollProgress(10);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  const currentSectorObj = SECTORS.find(s => s.val === currentSector);

  /* ─── Shared class atoms ─────────────────────────────────────── */
  const pillBase =
    'inline-flex items-center justify-center gap-1.5 h-9 rounded-xl border text-xs font-bold ' +
    'transition-all duration-150 cursor-pointer select-none shrink-0 active:scale-95 shadow-sm [touch-action:manipulation]';

  const pillMuted = isDark
    ? 'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700 hover:text-white'
    : 'bg-white/90 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300 hover:text-slate-900';

  const divider = `hidden md:block w-px h-5 shrink-0 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`;

  return (
    <motion.header
      className={`sticky top-0 z-40 no-print transition-all duration-200 ${
        isDark
          ? isScrolled
            ? 'bg-slate-950/90 border-b border-slate-800 backdrop-blur-md shadow-lg shadow-black/25'
            : 'bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-sm'
          : isScrolled
          ? 'bg-white/90 border-b border-slate-200 backdrop-blur-md shadow-md shadow-slate-200/50'
          : 'bg-white/95 border-b border-slate-200 backdrop-blur-sm'
      }`}
    >
      {/* Single 56px row — full width with responsive horizontal padding */}
      <div className="w-full px-2.5 sm:px-4 md:px-5 lg:px-6 h-14 flex items-center justify-between gap-2 sm:gap-3">

        {/* ── LEFT / START: Brand & Navigation Toggle ──────────────── */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">

          {/* Mobile / Tablet Menu Button (< lg) */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={onOpenMobileMenu}
            className={`lg:hidden w-9 h-9 flex items-center justify-center rounded-xl border transition-all shrink-0 active:scale-95 shadow-sm ${
              isDark
                ? 'bg-slate-900/90 border-slate-800 text-sky-400 hover:text-white hover:bg-slate-800 hover:border-slate-700'
                : 'bg-white/90 border-slate-200 text-sky-600 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300'
            }`}
            aria-label={isAr ? 'فتح القائمة الرئيسية' : 'Open Navigation Menu'}
            title={isAr ? 'القائمة الرئيسية 📋' : 'Main Menu 📋'}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="16" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </motion.button>

          {/* Desktop Sidebar Toggle Button (>= lg) */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            type="button"
            onClick={toggleSidebarCollapse}
            className={`hidden lg:flex items-center gap-1.5 h-9 px-3 rounded-xl border text-xs font-bold transition-all shrink-0 select-none shadow-sm ${
              isSidebarCollapsed
                ? 'bg-sky-500/15 border-sky-500/40 text-sky-400 shadow-sky-500/20'
                : isDark
                ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
                : 'bg-white/90 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 hover:border-slate-300'
            }`}
            title={
              isSidebarCollapsed
                ? (isAr ? 'إظهار القائمة الجانبية 📂' : 'Show Sidebar 📂')
                : (isAr ? 'إخفاء القائمة الجانبية 📁' : 'Hide Sidebar 📁')
            }
            aria-label={isSidebarCollapsed ? 'Show Sidebar' : 'Hide Sidebar'}
          >
            <span className="text-xs">{isSidebarCollapsed ? '📂' : '📁'}</span>
            <span className="text-[11px]">
              {isSidebarCollapsed
                ? (isAr ? 'إظهار القائمة' : 'Show Menu')
                : (isAr ? 'القائمة' : 'Menu')}
            </span>
            <svg
              className={`w-3 h-3 opacity-70 transition-transform ${
                isSidebarCollapsed
                  ? isAr
                    ? 'rotate-180'
                    : ''
                  : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points={isAr ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} />
            </svg>
          </motion.button>

          {/* Logo Button / Customize Trigger */}
          <motion.div
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsLogoModalOpen(true)}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-600
              flex items-center justify-center cursor-pointer shadow-md hover:shadow-sky-500/30
              hover:ring-2 hover:ring-sky-400/50 transition-all shrink-0"
            title={isAr ? 'انقر لتخصيص الشعار 🎨' : 'Click to customize logo 🎨'}
            role="button"
            tabIndex={0}
            aria-label={isAr ? 'تخصيص الشعار' : 'Customize Logo'}
            dangerouslySetInnerHTML={{ __html: logoSvg }}
          />

          {/* Brand text & Sector — hidden on ultra-small mobile, shown on sm/tablet/desktop */}
          <div className="min-w-0 hidden sm:flex flex-col justify-center select-none">
            <div className="flex items-center gap-1.5 leading-none">
              <span
                className={`text-xs md:text-sm font-black tracking-tight whitespace-nowrap ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {isAr ? 'منصة التدقيق الرقمية' : 'Digital Audit Platform'}
              </span>
              <span
                className="text-[9px] font-black px-1.5 py-0.5 rounded-full
                  bg-sky-500/10 text-sky-500 dark:text-sky-400 border border-sky-500/25
                  font-mono leading-none shrink-0"
              >
                v9.8 PRO
              </span>
            </div>
            <p
              suppressHydrationWarning
              className={`text-[10px] font-medium truncate max-w-[140px] md:max-w-[220px] mt-0.5 leading-tight ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              {currentSectorObj
                ? (isAr ? `🏢 ${currentSectorObj.ar}` : `🏢 ${currentSectorObj.en}`)
                : (isAr ? 'القطاع' : 'Sector')}
            </p>
          </div>
        </div>

        {/* ── RIGHT / END: Header Control Buttons ──────────────────── */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">

          {/* Date / Time pill — shown on tablet (md) and desktop */}
          <HeaderTimePill isAr={isAr} isDark={isDark} />

          {/* Divider on tablet & desktop */}
          <div className={divider} />

          {/* ── Theme Switcher — Sun ☀️ / Moon 🌙 Toggle Pill ──────── */}
          <button
            type="button"
            dir="ltr"
            onClick={toggleTheme}
            aria-label={
              isDark
                ? (isAr ? 'التبديل إلى الوضع الفاتح ☀️' : 'Switch to Light Mode ☀️')
                : (isAr ? 'التبديل إلى الوضع الداكن 🌙' : 'Switch to Dark Mode 🌙')
            }
            title={
              isDark
                ? (isAr ? 'الوضع الفاتح ☀️' : 'Light Mode ☀️')
                : (isAr ? 'الوضع الداكن 🌙' : 'Dark Mode 🌙')
            }
            className={`group relative flex items-center shrink-0 w-[58px] sm:w-[62px] h-9 rounded-xl border
              transition-all duration-200 active:scale-95 shadow-sm select-none
              focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1
              ${isDark
                ? 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                : 'bg-slate-100/90 border-slate-300/80 hover:border-slate-400'
              }`}
          >
            {/* Sliding active thumb indicator */}
            <span
              aria-hidden="true"
              className={`absolute top-[3px] left-[3px] w-[25px] sm:w-[27px] h-[calc(100%-6px)] rounded-lg
                transition-transform duration-300 ease-out pointer-events-none shadow-sm
                ${isDark
                  ? 'translate-x-[25px] sm:translate-x-[27px] bg-slate-700/90 border border-slate-600/50 shadow-black/40'
                  : 'translate-x-0 bg-white border border-slate-200/80 shadow-slate-300/60'
                }`}
            />

            {/* ☀️ Sun — left side */}
            <span className="relative z-10 flex items-center justify-center w-1/2 h-full overflow-hidden">
              <span
                key={`sun-${String(!isDark)}`}
                aria-hidden="true"
                className={[
                  'leading-none select-none transition-all duration-200',
                  !isDark
                    ? 'text-[14px] theme-sun-active theme-emoji-pop opacity-100 drop-shadow-sm'
                    : 'text-[12px] opacity-35 scale-90 group-hover:opacity-65 group-hover:scale-100',
                ].join(' ')}
              >
                ☀️
              </span>
            </span>

            {/* 🌙 Moon — right side */}
            <span className="relative z-10 flex items-center justify-center w-1/2 h-full overflow-hidden">
              <span
                key={`moon-${String(isDark)}`}
                aria-hidden="true"
                className={[
                  'leading-none select-none transition-all duration-200',
                  isDark
                    ? 'text-[14px] theme-moon-active theme-emoji-pop opacity-100 drop-shadow-sm'
                    : 'text-[12px] opacity-35 scale-90 group-hover:opacity-65 group-hover:scale-100',
                ].join(' ')}
              >
                🌙
              </span>
            </span>
          </button>

          {/* Divider on tablet & desktop */}
          <div className={divider} />

          {/* ── Language Switcher Button with Emoji ─────────────────── */}
          <button
            type="button"
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className={`${pillBase} ${pillMuted} px-2.5 sm:px-3`}
            aria-label={isAr ? 'التبديل إلى اللغة الإنجليزية' : 'Switch to Arabic'}
            title={isAr ? 'English 🌐' : 'اللغة العربية 🌐'}
          >
            <span className="text-xs select-none">🌐</span>
            <span className="font-black text-[11px] sm:text-xs">
              {isAr ? 'EN' : 'عر'}
            </span>
          </button>

          {/* Divider on tablet & desktop */}
          <div className={divider} />

          {/* ── Auth (Sign In / Logout) Button with Emoji ───────────── */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={logout}
              className={`${pillBase} px-2.5 sm:px-3.5 ${
                isDark
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-600 hover:text-white hover:border-rose-600'
                  : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-600 hover:text-white hover:border-rose-600'
              }`}
              aria-label={isAr ? 'تسجيل الخروج' : 'Logout'}
              title={isAr ? 'تسجيل الخروج 🚪' : 'Logout 🚪'}
            >
              <span className="text-xs select-none">🚪</span>
              <span className="hidden sm:inline font-black text-xs">
                {isAr ? 'خروج' : 'Logout'}
              </span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => router.push('/auth/login')}
              className={`${pillBase} px-2.5 sm:px-3.5 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white border-sky-600 hover:border-sky-500 shadow-sky-500/25`}
              aria-label={isAr ? 'تسجيل الدخول' : 'Sign In'}
              title={isAr ? 'تسجيل الدخول 🔑' : 'Sign In 🔑'}
            >
              <span className="text-xs select-none">🔑</span>
              <span className="hidden sm:inline font-black text-xs">
                {isAr ? 'دخول' : 'Sign In'}
              </span>
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

