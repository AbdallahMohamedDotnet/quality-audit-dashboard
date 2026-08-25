'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { staggerFast } from '../../utils/animations';

interface ResponsiveTableProps {
  /** The desktop <table> header row <tr>...</tr> */
  headerRow?: ReactNode;
  /** The desktop <table> body rows */
  children: ReactNode;
  /** The mobile view content (rendered on screens < md) */
  mobileCards?: ReactNode;
  /** Optional empty state message or component */
  emptyState?: ReactNode;
  /** Whether there is data to display */
  hasData?: boolean;
  /** Custom wrapper classes */
  className?: string;
  /** Custom table classes */
  tableClassName?: string;
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  headerRow,
  children,
  mobileCards,
  emptyState,
  hasData = true,
  className = '',
  tableClassName = '',
}) => {
  if (!hasData && emptyState) {
    return <>{emptyState}</>;
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Card View (< md) */}
      {mobileCards && (
        <motion.div
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="block md:hidden space-y-3.5"
        >
          {mobileCards}
        </motion.div>
      )}

      {/* Desktop / Tablet Table View (>= md) */}
      <div className={`${mobileCards ? 'hidden md:block' : 'block'} overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-colors`}>
        <table className={`w-full text-start text-xs border-collapse ${tableClassName}`}>
          {headerRow && (
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-[11px]">
              {headerRow}
            </thead>
          )}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {children}
          </tbody>
        </table>
      </div>
    </div>
  );
};
