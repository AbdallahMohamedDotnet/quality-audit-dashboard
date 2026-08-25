'use client';

import React, { ReactNode } from 'react';
import { useAudit } from '@/context/AuditContext';
import { Toast } from '@/components/layout/Toast';

export default function AuthGroupLayout({ children }: { children: ReactNode }) {
  const { isDark, dir } = useAudit();

  return (
    <div
      dir={dir}
      className={`min-h-screen flex flex-col items-center justify-center p-4 font-sans transition-colors duration-300 relative overflow-hidden ${
        isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
    >
      {/* Background decorative glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Global Toast within Auth layout */}
      <Toast />

      {/* Content */}
      <div className="w-full max-w-md relative z-10">
        {children}
      </div>
    </div>
  );
}
