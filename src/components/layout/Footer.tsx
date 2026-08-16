import React from 'react';
import { useAudit } from '../../context/AuditContext';

export const Footer: React.FC = () => {
  const { isAr, isDark } = useAudit();

  return (
    <footer
      className={`mt-auto py-4 border-t z-20 relative transition-colors no-print ${
        isDark ? 'bg-slate-950 border-slate-800 text-slate-500' : 'bg-slate-100 border-slate-300 text-slate-600'
      }`}
    >
      <div className="max-w-[1600px] w-full mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold">
        {/* Attribution Info */}
        <div className="order-2 md:order-1 text-center md:text-start space-y-1">
          <p className="uppercase tracking-widest opacity-90">
            {isAr
              ? '© 2026 لوحة التدقيق الرقمية لـ 216 معياراً صناعياً وتخصصياً. جميع الحقوق محفوظة.'
              : '© 2026 Digital Audit Panel - 216 Industrial & Specialized Standards. All Rights Reserved.'}
          </p>
          <p className="opacity-75 text-[9px] text-sky-600 dark:text-sky-400">
            {isAr
              ? 'بإشراف وتطوير المهندس مصطفى حامد سالم • معتمد لدى هيئات الجودة والرقابة'
              : 'Supervised & Developed by Eng. Mostafa Hamed Salem • Certified for Quality & Compliance'}
          </p>
        </div>

        {/* Copyrighted.com Registered Badge */}
        <div className="order-1 md:order-2 flex items-center gap-4">
          <a
            className="inline-block hover:scale-105 transition-transform"
            title="Copyrighted.com Registered"
            target="_blank"
            rel="noreferrer"
            href="https://app.copyrighted.com/work/G3F9UXAxZaoitXjq/"
          >
            <img
              alt="Copyrighted.com Registered"
              width="125"
              height="25"
              srcSet="https://static.copyrighted.com/badges/125x25/01_1_2x.png 2x"
              src="https://static.copyrighted.com/badges/125x25/01_1.png"
              className="rounded shadow-sm opacity-90 hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};
