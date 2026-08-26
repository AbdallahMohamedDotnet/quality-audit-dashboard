'use client';

import React, { useState, ReactNode } from 'react';
import { useAudit } from '../../context/AuditContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Toast } from './Toast';
import { LogoModal } from './LogoModal';
import { PrintReportTemplate } from '../views/PrintReportTemplate';

export const MainLayoutShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isDark, dir } = useAudit();
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
