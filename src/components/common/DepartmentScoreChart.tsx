'use client';

import React from 'react';
import { useAudit } from '../../context/AuditContext';

export interface DepartmentScoreItem {
  name: string;
  score: number | null;
  deptKey: string;
}

interface DepartmentScoreChartProps {
  data: DepartmentScoreItem[];
  onSelectDept?: (deptKey: string) => void;
}

export const DepartmentScoreChart: React.FC<DepartmentScoreChartProps> = ({
  data,
  onSelectDept,
}) => {
  const { isDark, isAr } = useAudit();
  const emptyColor = isDark ? '#475569' : '#cbd5e1';

  const hasAnyScore = data.some(item => item.score !== null);

  return (
    <div className="space-y-2.5 w-full">
      {data.map((item, index) => {
        const hasScore = item.score !== null;
        const color = hasScore
          ? item.score! >= 90
            ? '#059669'
            : item.score! >= 80
            ? '#f59e0b'
            : '#e11d48'
          : emptyColor;

        return (
          <div
            key={item.deptKey || index}
            onClick={() => onSelectDept?.(item.deptKey)}
            className={`flex items-center gap-2 sm:gap-3 p-1.5 rounded-xl transition-all ${
              onSelectDept ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/60' : ''
            }`}
          >
            <span
              className={`w-28 sm:w-40 md:w-52 shrink-0 text-[11px] sm:text-xs font-bold truncate ${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}
              title={item.name}
            >
              {item.name}
            </span>

            <div
              className={`relative flex-1 h-5 sm:h-6 rounded-full overflow-hidden shadow-inner ${
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              }`}
            >
              {hasScore && (
                <div
                  className="absolute top-0 bottom-0 rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${item.score}%`,
                    backgroundColor: color,
                    [isAr ? 'right' : 'left']: 0,
                  }}
                />
              )}
            </div>

            <span
              className="w-10 sm:w-12 shrink-0 text-end text-xs font-mono font-black"
              style={{ color }}
            >
              {hasScore ? `${item.score}%` : '—'}
            </span>
          </div>
        );
      })}

      {!hasAnyScore && (
        <div className="text-center py-8 px-4 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
          <i className="fa-solid fa-chart-simple text-3xl mb-2 text-slate-400 dark:text-slate-600 block"></i>
          <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
            {isAr
              ? 'لا توجد تدقيقات مكتملة بعد لهذا القطاع. أكمل تدقيقاً من "بدء تدقيق" ليظهر هنا.'
              : 'No completed audits yet for this sector. Finish an audit from "Start Audit" to see it here.'}
          </p>
        </div>
      )}
    </div>
  );
};
