'use client';

import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Toast } from './Toast';
import { LogoModal } from './LogoModal';
import { PrintReportTemplate } from '../views/PrintReportTemplate';

export const MainLayoutShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAr, isDark, dir, isSidebarCollapsed, toggleSidebarCollapse } = useAudit();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      dir={dir}
      className={`h-screen flex flex-col font-sans transition-colors duration-300 overflow-hidden ${
        isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
    >
      {/* Header - Fixed 56px top row */}
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Main App Workspace: Persistent Full-Height Sidebar + Scrollable Content */}
      <div className="flex-1 flex w-full min-h-0 overflow-hidden relative">
        {/* Sidebar - Full height from header to bottom of screen */}
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Floating Expand Sidebar Button when hidden on Desktop */}
        <AnimatePresence>
          {isSidebarCollapsed && (
            <motion.button
              initial={{ opacity: 0, x: dir === 'rtl' ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir === 'rtl' ? 24 : -24 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              type="button"
              onClick={toggleSidebarCollapse}
              className={`hidden lg:flex fixed top-20 z-30 ${
                dir === 'rtl' ? 'right-4' : 'left-4'
              } px-3.5 py-2.5 rounded-2xl border shadow-2xl items-center gap-2 transition-all ${
                isDark
                  ? 'bg-slate-950/95 border-sky-500/40 text-sky-400 hover:bg-slate-900 hover:border-sky-400 shadow-black/60'
                  : 'bg-white/95 border-sky-300 text-sky-600 hover:bg-sky-50 shadow-slate-300/80'
              } backdrop-blur-md text-xs font-bold`}
              title={isAr ? 'إظهار القائمة الجانبية' : 'Show Sidebar'}
              aria-label={isAr ? 'إظهار القائمة الجانبية' : 'Show Sidebar'}
            >
              <i className={`fa-solid ${dir === 'rtl' ? 'fa-angles-left' : 'fa-angles-right'} text-sm text-sky-500`} />
              <span>{isAr ? 'إظهار القائمة' : 'Show Sidebar'}</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable Main Content & Footer Area */}
        <div className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto overflow-x-hidden no-print">
          <main className="flex-1 p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="max-w-[1440px] w-full mx-auto">
              {children}
            </div>
          </main>
          <Footer />
        </div>
      </div>

      {/* Global Overlays */}
      <Toast />
      <LogoModal />
      <PrintReportTemplate />
    </div>
  );
};
