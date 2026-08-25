'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAudit } from '../../context/AuditContext';
import { SECTORS } from '../../data';

export const Header: React.FC<{ onOpenMobileMenu?: () => void }> = ({ onOpenMobileMenu }) => {
  const router = useRouter();
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
    logout,
  } = useAudit();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);

  const currentSectorObj = SECTORS.find(s => s.val === currentSector);

  /* ─── Shared class atoms ─────────────────────────────────────── */
  const pillBase =
    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold ' +
    'transition-all duration-150 cursor-pointer select-none shrink-0';

  const pillMuted = isDark
    ? 'bg-slate-900 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:border-slate-600 hover:text-white'
    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800';

  const divider = `hidden md:block w-px h-4 shrink-0 ${isDark ? 'bg-slate-700/60' : 'bg-slate-200'}`;

  return (
    <header
      className={`sticky top-0 z-40 no-print transition-colors ${
        isDark
          ? 'bg-slate-950/95 border-b border-slate-800/80 backdrop-blur-sm'
          : 'bg-white/95 border-b border-slate-200 backdrop-blur-sm'
      }`}
    >
      {/* Single 56 px row — full width, no nested max-w to keep RTL/LTR symmetric */}
      <div className="w-full px-3 sm:px-5 h-14 flex items-center justify-between gap-3">

        {/* ── LEFT / START: Brand ─────────────────────────────────── */}
        <div className="flex items-center gap-2.5 min-w-0">

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
            <i className="fa-solid fa-bars text-sm" />
          </button>

          {/* Logo */}
          <div
            onClick={() => setIsLogoModalOpen(true)}
            className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600
              flex items-center justify-center cursor-pointer shadow-md
              hover:shadow-sky-500/30 hover:scale-105 transition-all duration-200 shrink-0"
            title={isAr ? 'انقر لتغيير الشعار' : 'Customize logo'}
            dangerouslySetInnerHTML={{ __html: logoSvg }}
          />

          {/* Brand text — hidden on xs */}
          <div className="min-w-0 hidden sm:flex flex-col gap-0">
            <div className="flex items-center gap-1.5">
              <span
                className={`text-sm font-black tracking-tight leading-tight ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                {isAr ? 'منصة التدقيق الرقمية' : 'Digital Audit Platform'}
              </span>
              <span
                className="text-[9px] font-black px-1.5 py-0.5 rounded-full
                  bg-sky-500/10 text-sky-500 border border-sky-500/25
                  font-mono leading-none shrink-0"
              >
                v9.8 PRO
              </span>
            </div>
            <p
              suppressHydrationWarning
              className={`text-[10px] font-medium truncate max-w-[190px] leading-tight ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              {currentSectorObj
                ? (isAr ? currentSectorObj.ar : currentSectorObj.en)
                : (isAr ? 'القطاع' : 'Sector')}
            </p>
          </div>
        </div>

        {/* ── RIGHT / END: Controls ────────────────────────────────── */}
        <div className="flex items-center gap-2 shrink-0">

          {/* Date / Time pill — hidden below md */}
          <div
            suppressHydrationWarning
            className={`hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border
              text-[10px] font-semibold shrink-0 ${
                isDark
                  ? 'bg-slate-900 border-slate-700/60 text-slate-400'
                  : 'bg-slate-50 border-slate-200 text-slate-500'
              }`}
          >
            <span suppressHydrationWarning className="flex items-center gap-1 text-sky-500">
              <i className="fa-regular fa-clock text-[9px]" />
              {mounted ? clocks.time : ''}
            </span>
            <span className="opacity-25">|</span>
            <span suppressHydrationWarning>
              {mounted ? clocks.gregorianDate : ''}
            </span>
            <span
              suppressHydrationWarning
              className="hidden lg:flex items-center gap-1 text-emerald-500"
            >
              <span className="opacity-25 mx-0.5">|</span>
              <i className="fa-solid fa-moon text-[9px]" />
              {mounted ? clocks.hijriDate : ''}
            </span>
          </div>

          {/* Divider */}
          <div className={divider} />

          {/* ── Theme Switcher — fixed-size icon pill ─────────────── */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark
              ? (isAr ? 'التبديل إلى الوضع الفاتح' : 'Switch to Light Mode')
              : (isAr ? 'التبديل إلى الوضع الداكن' : 'Switch to Dark Mode')}
            title={isDark
              ? (isAr ? 'الوضع الفاتح' : 'Light Mode')
              : (isAr ? 'الوضع الداكن' : 'Dark Mode')}
            className={`group relative flex items-center shrink-0 w-[52px] h-7 rounded-lg border
              transition-colors duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-1
              ${isDark
                ? 'bg-slate-900 border-slate-700/70 hover:border-slate-600'
                : 'bg-slate-100 border-slate-300 hover:border-slate-400'
              }`}
          >
            {/* Sliding active chip */}
            <span
              aria-hidden="true"
              className={`absolute top-[3px] left-[3px] w-[22px] h-[calc(100%-6px)] rounded-md
                transition-transform duration-300 ease-in-out pointer-events-none
                ${isDark
                  ? 'translate-x-[22px] bg-slate-700 shadow-sm'
                  : 'translate-x-0 bg-white shadow-sm'
                }`}
            />

            {/* ☀️ Sun — left half */}
            <span className="relative z-10 flex items-center justify-center w-[26px] h-full overflow-hidden">
              <span
                key={`sun-${String(!isDark)}`}
                aria-hidden="true"
                className={[
                  'leading-none select-none',
                  // active state: spin + pop-in on mount
                  !isDark
                    ? 'text-[13px] theme-sun-active theme-emoji-pop opacity-100'
                    // inactive: shrink, fade; hover on the whole pill previews it
                    : 'text-[11px] opacity-35 scale-90 transition-all duration-200 group-hover:opacity-60 group-hover:scale-100',
                ].join(' ')}
              >
                ☀️
              </span>
            </span>

            {/* 🌙 Moon — right half */}
            <span className="relative z-10 flex items-center justify-center w-[26px] h-full overflow-hidden">
              <span
                key={`moon-${String(isDark)}`}
                aria-hidden="true"
                className={[
                  'leading-none select-none',
                  isDark
                    ? 'text-[13px] theme-moon-active theme-emoji-pop opacity-100'
                    : 'text-[11px] opacity-35 scale-90 transition-all duration-200 group-hover:opacity-60 group-hover:scale-100',
                ].join(' ')}
              >
                🌙
              </span>
            </span>
          </button>

          {/* Divider */}
          <div className={divider} />

          {/* Language toggle */}
          <button
            type="button"
            onClick={() => setLanguage(isAr ? 'en' : 'ar')}
            className={`${pillBase} ${pillMuted} font-bold min-w-[2.25rem] justify-center`}
            aria-label={isAr ? 'English' : 'العربية'}
          >
            {isAr ? 'EN' : 'عر'}
          </button>

          {/* Divider */}
          <div className={divider} />

          {/* Auth button */}
          {isLoggedIn ? (
            <button
              type="button"
              onClick={logout}
              className={`${pillBase} ${
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
              onClick={() => router.push('/auth/login')}
              className={`${pillBase} bg-sky-600 hover:bg-sky-500 text-white border-sky-600 hover:border-sky-500 shadow-sm`}
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
