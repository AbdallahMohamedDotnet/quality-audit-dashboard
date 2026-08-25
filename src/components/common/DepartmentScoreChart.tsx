'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { staggerFast, staggerChild } from '../../utils/animations';

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
    <motion.div
      variants={staggerFast}
      initial="hidden"
      animate="visible"
      className="space-y-2.5 w-full"
    >
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
          <motion.div
            key={item.deptKey || index}
            variants={staggerChild}
            onClick={() => onSelectDept?.(item.deptKey)}
            className={`flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 p-1.5 rounded-xl transition-all duration-200 ${
              onSelectDept ? 'cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/60' : ''
            }`}
          >
            <div className="flex items-center justify-between sm:justify-start sm:w-36 md:w-48 lg:w-52 shrink-0">
              <span
                className={`text-[11px] sm:text-xs font-bold truncate ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
                title={item.name}
              >
                {item.name}
              </span>
              <span
                className="sm:hidden text-xs font-mono font-black shrink-0"
                style={{ color }}
              >
                {hasScore ? `${item.score}%` : '—'}
              </span>
            </div>

            <div
              className={`relative flex-1 h-3.5 sm:h-5 rounded-full overflow-hidden shadow-inner ${
                isDark ? 'bg-slate-800' : 'bg-slate-100'
              }`}
            >
              {hasScore && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.score}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.05 + index * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute top-0 bottom-0 rounded-full shadow-sm"
                  style={{
                    backgroundColor: color,
                    [isAr ? 'right' : 'left']: 0,
                  }}
                />
              )}
            </div>

            <span
              className="hidden sm:inline-block w-10 sm:w-12 shrink-0 text-end text-xs font-mono font-black"
              style={{ color }}
            >
              {hasScore ? `${item.score}%` : '—'}
            </span>
          </motion.div>
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
    </motion.div>
  );
};
