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
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
    >
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-8 no-print">
          {children}
        </main>
      </div>

      <Footer />

      {/* Overlays & Global Modals */}
      <Toast />
      <LogoModal />
      <LoginModal />
      <PrintReportTemplate />
    </div>
  );
};
