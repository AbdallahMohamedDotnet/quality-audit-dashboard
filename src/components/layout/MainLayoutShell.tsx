'use client';

import React, { useState, ReactNode } from 'react';
import { useAudit } from '../../context/AuditContext';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';
import { Toast } from './Toast';
import { LogoModal } from './LogoModal';
import { LoginModal } from './LoginModal';
import { PrintReportTemplate } from '../views/PrintReportTemplate';

export const MainLayoutShell: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isDark, dir } = useAudit();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      dir={dir}
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 overflow-x-hidden ${
        isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
    >
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Body: sidebar + main — full width, no max-w here to avoid RTL offset */}
      <div className="flex-1 flex w-full min-h-0">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-5 lg:p-6 no-print overflow-x-hidden">
          <div className="max-w-[1400px] w-full mx-auto">
            {children}
          </div>
        </main>
      </div>

      <Footer />

      {/* Global Overlays */}
      <Toast />
      <LogoModal />
      <LoginModal />
      <PrintReportTemplate />
    </div>
  );
};
