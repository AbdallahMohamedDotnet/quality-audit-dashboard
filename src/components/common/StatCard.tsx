'use client';

import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  variant?: 'sky' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'purple' | 'teal';
  trend?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  variant = 'sky',
  trend,
  onClick,
}) => {
  const variantStyles = {
    sky: {
      bg: 'bg-sky-500/10 border-sky-500/30 text-sky-500',
      iconBg: 'bg-sky-600 text-white',
      accent: 'text-sky-500',
    },
    emerald: {
      bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',
      iconBg: 'bg-emerald-600 text-white',
      accent: 'text-emerald-500',
    },
    amber: {
      bg: 'bg-amber-500/10 border-amber-500/30 text-amber-500',
      iconBg: 'bg-amber-600 text-white',
      accent: 'text-amber-500',
    },
    rose: {
      bg: 'bg-rose-500/10 border-rose-500/30 text-rose-500',
      iconBg: 'bg-rose-600 text-white',
      accent: 'text-rose-500',
    },
    indigo: {
      bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-500',
      iconBg: 'bg-indigo-600 text-white',
      accent: 'text-indigo-500',
    },
    purple: {
      bg: 'bg-purple-500/10 border-purple-500/30 text-purple-500',
      iconBg: 'bg-purple-600 text-white',
      accent: 'text-purple-500',
    },
    teal: {
      bg: 'bg-teal-500/10 border-teal-500/30 text-teal-500',
      iconBg: 'bg-teal-600 text-white',
      accent: 'text-teal-500',
    },
  }[variant];

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 border transition-all duration-300 ${
        onClick ? 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]' : ''
      } bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/80 shadow-md backdrop-blur-sm group`}
    >
      <div className="flex items-start justify-between gap-2.5 sm:gap-3">
        <div className="space-y-1 min-w-0">
          <p className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">
            {title}
          </p>
          <div className="flex items-baseline gap-1.5 sm:gap-2">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white truncate">
              {value}
            </h3>
            {trend && (
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 shrink-0">
                <i className="fa-solid fa-arrow-trend-up text-[9px] sm:text-[10px]"></i>
                {trend}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 truncate font-medium">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-lg shrink-0 ${variantStyles.iconBg} group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${
          variant === 'sky'
            ? 'from-sky-500 to-blue-600'
            : variant === 'emerald'
            ? 'from-emerald-500 to-teal-600'
            : variant === 'amber'
            ? 'from-amber-500 to-orange-600'
            : variant === 'rose'
            ? 'from-rose-500 to-red-600'
            : 'from-indigo-500 to-purple-600'
        }`}
      />
    </div>
  );
};
