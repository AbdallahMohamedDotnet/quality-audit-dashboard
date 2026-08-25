'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { toastVariants } from '../../utils/animations';

export const Toast: React.FC = () => {
  const { toast } = useAudit();

  const typeConfig = {
    success: {
      bg: 'bg-emerald-600 border-emerald-400 text-white shadow-emerald-600/30',
      icon: 'fa-circle-check',
    },
    error: {
      bg: 'bg-rose-600 border-rose-400 text-white shadow-rose-600/30',
      icon: 'fa-circle-xmark',
    },
    warning: {
      bg: 'bg-amber-600 border-amber-400 text-white shadow-amber-600/30',
      icon: 'fa-triangle-exclamation',
    },
    info: {
      bg: 'bg-sky-600 border-sky-400 text-white shadow-sky-600/30',
      icon: 'fa-circle-info',
    },
  }[toast?.type || 'info'];

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          layout
          className="fixed top-24 sm:top-20 left-1/2 -translate-x-1/2 z-[100] no-print pointer-events-none max-w-[calc(100vw-2rem)] w-auto"
        >
          <div
            className={`flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl shadow-2xl border font-bold text-xs sm:text-sm ${typeConfig.bg}`}
          >
            <i className={`fa-solid ${typeConfig.icon} text-base shrink-0`}></i>
            <span className="leading-snug">{toast.message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
