'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { TabKey } from '../../types';
import { TAB_TO_PATH, PATH_TO_TAB } from '../../utils/routes';
import {
  backdropVariants,
  sidebarVariants,
  sidebarVariantsRTL,
  staggerFast,
  staggerChild,
} from '../../utils/animations';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: TabKey;
  labelAr: string;
  labelEn: string;
  icon: string;
  badge?: number | string;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isAr,
    isDark,
    activeTab,
    setActiveTab,
    isSidebarCollapsed,
    toggleSidebarCollapse,
    ncrs,
    visitors,
    archivedAudits,
    suppliers,
    capas,
    trainings,
    calibrations,
  } = useAudit();

  const openNcrsCount = ncrs.filter(n => n.status === 'OPEN').length;
  const activeVisitorsCount = visitors.filter(v => v.timeOut === null).length;
  const activeCapasCount = capas.filter(c => c.status !== 'CLOSED').length;
  const dueCalibrationCount = calibrations.filter(
    c => c.status === 'DUE_SOON' || c.status === 'OVERDUE'
  ).length;

  const navSections: { titleAr: string; titleEn: string; items: NavItem[] }[] = [
    {
      titleAr: 'التدقيق والتشغيل',
      titleEn: 'Audit & Operations',
      items: [
        {
          id: 'dashboard',
          labelAr: 'لوحة التحكم الرئيسية',
          labelEn: 'Executive Dashboard',
          icon: 'fa-gauge-high',
        },
        {
          id: 'audit_form',
          labelAr: 'بدء التدقيق والفحص الميداني',
          labelEn: 'Conduct Audit Session',
          icon: 'fa-clipboard-check',
        },
        {
          id: 'kpi',
          labelAr: 'دليل المعايير والـ KPIs',
          labelEn: 'Standards & KPIs',
          icon: 'fa-list-check',
        },
        {
          id: 'ncr',
          labelAr: 'إدارة مذكرات الحيود (NCR)',
          labelEn: 'NCR Incident Manager',
          icon: 'fa-triangle-exclamation',
          badge: openNcrsCount > 0 ? openNcrsCount : undefined,
          badgeColor: 'bg-rose-500 text-white',
        },
        {
          id: 'capa',
          labelAr: 'سجل إجراءات CAPA',
          labelEn: 'CAPA Master Tracker',
          icon: 'fa-arrows-spin',
          badge: activeCapasCount > 0 ? activeCapasCount : undefined,
          badgeColor: 'bg-rose-600 text-white',
        },
        {
          id: 'suppliers',
          labelAr: 'سجل الموردين المعتمدين (AVL)',
          labelEn: 'Suppliers & Vendor AVL',
          icon: 'fa-truck-field',
          badge: suppliers.length > 0 ? suppliers.length : undefined,
          badgeColor: 'bg-indigo-600 text-white',
        },
        {
          id: 'training',
          labelAr: 'كفاءة وتدريب الطاقم',
          labelEn: 'Staff Training & Pass',
          icon: 'fa-graduation-cap',
          badge: trainings.length > 0 ? trainings.length : undefined,
          badgeColor: 'bg-emerald-600 text-white',
        },
        {
          id: 'calibration',
          labelAr: 'معايرة الأجهزة والمجسات',
          labelEn: 'Equipment Calibration',
          icon: 'fa-scale-balanced',
          badge: dueCalibrationCount > 0 ? dueCalibrationCount : undefined,
          badgeColor: 'bg-amber-600 text-white',
        },
      ],
    },
    {
      titleAr: 'المراقبة والاستجابة الذكية',
      titleEn: 'Monitoring & Response',
      items: [
        {
          id: 'iot',
          labelAr: 'المراقبة اللحظية للمجسات',
          labelEn: 'Live IoT Telemetry',
          icon: 'fa-tower-broadcast',
        },
        {
          id: 'haccp',
          labelAr: 'مسار الهاسب والـ CCPs',
          labelEn: 'HACCP & CCP Flow',
          icon: 'fa-shield-halved',
        },
        {
          id: 'recall',
          labelAr: 'استدعاء وعزل المنتجات',
          labelEn: 'Recall & Quarantine',
          icon: 'fa-boxes-packing',
        },
        {
          id: 'ai',
          labelAr: 'محلل الشكاوى بالذكاء الاصطناعي',
          labelEn: 'AI Complaint & CAPA',
          icon: 'fa-brain',
        },
        {
          id: 'visitors',
          labelAr: 'سجل الزوار وتصاريح الـ PPE',
          labelEn: 'Visitor Pass & PPE',
          icon: 'fa-id-card-clip',
          badge: activeVisitorsCount > 0 ? activeVisitorsCount : undefined,
          badgeColor: 'bg-emerald-500 text-white',
        },
      ],
    },
    {
      titleAr: 'الاستدامة والطوارئ',
      titleEn: 'Sustainability & Emergency',
      items: [
        {
          id: 'sustainability',
          labelAr: 'الاستدامة وخفض الكربون (ESG)',
          labelEn: 'ESG & Carbon Footprint',
          icon: 'fa-leaf',
        },
        {
          id: 'emergency',
          labelAr: 'إدارة الطوارئ والأزمات الفورية',
          labelEn: 'Emergency Crisis Action',
          icon: 'fa-bell-concierge',
        },
      ],
    },
    {
      titleAr: 'الأرشيف والإعدادات',
      titleEn: 'System & Governance',
      items: [
        {
          id: 'archive',
          labelAr: 'أرشيف التدقيق المعتمد',
          labelEn: 'Certified Audit Archives',
          icon: 'fa-box-archive',
          badge: archivedAudits.length > 0 ? archivedAudits.length : undefined,
          badgeColor: 'bg-sky-600 text-white',
        },
        {
          id: 'settings',
          labelAr: 'إعدادات النظام وقنوات الاتصال',
          labelEn: 'System Settings',
          icon: 'fa-sliders',
        },
      ],
    },
  ];

  const handleSelectTab = (id: TabKey) => {
    setActiveTab(id);
    const targetPath = TAB_TO_PATH[id] || '/';
    if (pathname !== targetPath) {
      router.push(targetPath);
    }
    onClose();
  };

  const isTabActive = (id: TabKey) => {
    if (pathname && PATH_TO_TAB[pathname]) {
      return PATH_TO_TAB[pathname] === id;
    }
    return activeTab === id;
  };

  const navContent = (
    <div className="flex-1 sidebar-scroll p-3 space-y-2 overflow-y-auto overflow-x-hidden">
      {/* Mobile Close Header */}
      <div className="flex items-center justify-between pb-3 mb-1 lg:hidden border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-600 flex items-center justify-center text-white text-xs">
            <i className="fa-solid fa-layer-group" />
          </div>
          <span className="text-xs font-black text-slate-800 dark:text-slate-200">
            {isAr ? 'القائمة الرئيسية' : 'Navigation Menu'}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={isAr ? 'إغلاق القائمة' : 'Close Menu'}
          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            isDark
              ? 'text-slate-400 hover:text-white hover:bg-slate-800'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          }`}
        >
          <i className="fa-solid fa-xmark text-sm" />
        </button>
      </div>

      <motion.div variants={staggerFast} initial="hidden" animate="visible" className="space-y-3">
        {navSections.map((section, sIdx) => (
          <div
            key={sIdx}
            className={sIdx > 0 ? 'pt-2.5 border-t border-slate-200/60 dark:border-slate-800/70' : ''}
          >
            {/* Section label */}
            <p
              className={`text-[10px] font-black uppercase tracking-[0.08em] px-3 py-1 mb-1 select-none flex items-center justify-between ${
                isDark ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              <span>{isAr ? section.titleAr : section.titleEn}</span>
              <span className="text-[9px] font-mono opacity-50">{section.items.length}</span>
            </p>

            {/* Nav Items */}
            <div className="space-y-0.5">
              {section.items.map(item => {
                const isActive = isTabActive(item.id);
                return (
                  <motion.div key={item.id} variants={staggerChild}>
                    <button
                      type="button"
                      onClick={() => handleSelectTab(item.id)}
                      title={isAr ? item.labelAr : item.labelEn}
                      className={`relative flex items-center justify-between w-full min-h-[38px] px-3 py-2 rounded-xl text-[12px] font-semibold transition-all duration-150 text-start gap-2.5 group select-none ${
                        isActive
                          ? isDark
                            ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm shadow-sky-950/40 font-bold'
                            : 'bg-sky-50 text-sky-700 border border-sky-200/90 shadow-sm shadow-sky-100 font-bold'
                          : isDark
                          ? 'text-slate-400 hover:bg-slate-900/80 hover:text-slate-100 hover:border-slate-800/80 border border-transparent'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-200 border border-transparent'
                      }`}
                    >
                      {/* Active Indicator Accent Strip on inline-start */}
                      {isActive && (
                        <span className="absolute inset-y-2 start-0 w-1 rounded-e-full bg-sky-500 shadow-sm shadow-sky-500/50" />
                      )}

                      {/* Icon */}
                      <div className="w-5 h-5 flex items-center justify-center shrink-0 text-center">
                        <i
                          className={`fa-solid ${item.icon} text-xs transition-transform duration-150 group-hover:scale-110 ${
                            isActive
                              ? 'text-sky-500 dark:text-sky-400 scale-105'
                              : isDark
                              ? 'text-slate-500 group-hover:text-sky-400'
                              : 'text-slate-400 group-hover:text-sky-600'
                          }`}
                        />
                      </div>

                      {/* Label Text */}
                      <span className="flex-1 min-w-0 truncate text-start text-[12px] leading-snug font-bold">
                        {isAr ? item.labelAr : item.labelEn}
                      </span>

                      {/* Badge Counter */}
                      {item.badge !== undefined && (
                        <span
                          className={`shrink-0 ms-auto font-mono text-[10px] font-black px-2 py-0.5 rounded-full leading-none transition-transform group-hover:scale-105 shadow-sm ${
                            isActive
                              ? 'bg-sky-500 text-white'
                              : item.badgeColor || 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );

  const statusFooter = (
    <div
      className={`p-3 border-t shrink-0 backdrop-blur-sm space-y-2.5 transition-colors ${
        isDark
          ? 'bg-slate-950/90 border-slate-800/90'
          : 'bg-slate-50/90 border-slate-200/90'
      }`}
    >
      {/* System Status Card with Emojis */}
      <div
        className={`p-3 rounded-2xl border text-center transition-all ${
          isDark
            ? 'bg-slate-900/90 border-slate-800/90 text-slate-200 shadow-sm'
            : 'bg-white border-slate-200/90 text-slate-800 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
          <span className="text-sm">🟢</span>
          <span>{isAr ? 'النظام متصل ونشط' : 'System Live & Active'}</span>
          <span className="text-xs">⚡</span>
        </div>
        <div className="mt-1.5 flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500 dark:text-slate-400 font-semibold flex-wrap">
          <span className="flex items-center gap-1">
            <span>📊</span>
            <span>{isAr ? '216 معياراً معتمداً' : '216 Standards'}</span>
          </span>
          <span>•</span>
          <span className="px-1.5 py-0.5 rounded-md bg-sky-500/10 text-sky-500 dark:text-sky-400 font-bold border border-sky-500/20 flex items-center gap-1">
            <span>🚀</span>
            <span>v9.8 PRO</span>
          </span>
        </div>
      </div>

      {/* Hide / Collapse Sidebar Button with Emoji */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="button"
        onClick={toggleSidebarCollapse}
        className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-[11px] font-bold transition-all shadow-sm ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-sky-500/40'
            : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-200 hover:border-sky-300'
        }`}
        title={isAr ? 'إخفاء القائمة الجانبية' : 'Hide Sidebar'}
      >
        <span>{isAr ? '◀️' : '▶️'}</span>
        <span>{isAr ? 'إخفاء القائمة الجانبية' : 'Hide Sidebar'}</span>
        <span>🔒</span>
      </motion.button>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <div className="lg:hidden">
            {/* Backdrop */}
            <motion.div
              variants={backdropVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={onClose}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
            />

            {/* Slide-in Drawer */}
            <motion.aside
              variants={isAr ? sidebarVariantsRTL : sidebarVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`fixed top-0 bottom-0 z-50 w-[290px] max-w-[86vw] shrink-0 no-print transform-gpu ${
                isAr ? 'right-0' : 'left-0'
              } ${
                isDark
                  ? 'bg-slate-950 border-slate-800'
                  : 'bg-white border-slate-200'
              } border-e shadow-2xl flex flex-col h-[100dvh] pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]`}
            >
              {navContent}
              {statusFooter}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Persistent Full-Height Sidebar (when not collapsed) */}
      {!isSidebarCollapsed && (
        <aside
          className={`hidden lg:flex w-[270px] min-w-[270px] max-w-[270px] h-full shrink-0 no-print ${
            isDark
              ? 'bg-slate-950/95 border-slate-800/80'
              : 'bg-white/95 border-slate-200/80'
          } border-e flex-col overflow-hidden select-none transition-colors z-20`}
        >
          {navContent}
          {statusFooter}
        </aside>
      )}
    </>
  );
};
