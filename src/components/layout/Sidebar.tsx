'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAudit } from '../../context/AuditContext';
import { TabKey } from '../../types';
import { TAB_TO_PATH } from '../../utils/routes';

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
  const {
    isAr,
    isDark,
    activeTab,
    setActiveTab,
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
      titleEn: 'Core Operations',
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
          labelEn: 'Conduct Live Audit',
          icon: 'fa-clipboard-check',
        },
        {
          id: 'kpi',
          labelAr: 'دليل المعايير والمؤشرات (KPIs)',
          labelEn: 'Standards & KPIs',
          icon: 'fa-list-check',
        },
      ],
    },
    {
      titleAr: 'الجودة والحيود وCAPA',
      titleEn: 'Quality & Compliance',
      items: [
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
          labelAr: 'سجل الإجراءات التصحيحية (CAPA)',
          labelEn: 'CAPA Master Tracker',
          icon: 'fa-arrows-spin',
          badge: activeCapasCount > 0 ? activeCapasCount : undefined,
          badgeColor: 'bg-rose-600 text-white',
        },
        {
          id: 'suppliers',
          labelAr: 'الموردين وسلاسل الإمداد (AVL)',
          labelEn: 'Suppliers & Vendor AVL',
          icon: 'fa-truck-field',
          badge: suppliers.length > 0 ? suppliers.length : undefined,
          badgeColor: 'bg-indigo-600 text-white',
        },
        {
          id: 'training',
          labelAr: 'مصفوفة التدريب وبطاقات الكفاءة',
          labelEn: 'Training & Competency',
          icon: 'fa-graduation-cap',
          badge: trainings.length > 0 ? trainings.length : undefined,
          badgeColor: 'bg-emerald-600 text-white',
        },
        {
          id: 'calibration',
          labelAr: 'معايرة الأجهزة ومعدات الفحص',
          labelEn: 'Calibration Log',
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
          labelAr: 'المراقبة اللحظية للمجسات (IoT)',
          labelEn: 'Live IoT Telemetry',
          icon: 'fa-tower-broadcast',
        },
        {
          id: 'haccp',
          labelAr: 'مسار الهاسب ونقاط التحكم (CCPs)',
          labelEn: 'HACCP & CCP Flow',
          icon: 'fa-shield-halved',
        },
        {
          id: 'recall',
          labelAr: 'مصفوفة استدعاء وعزل المنتجات',
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
          labelAr: 'سجل الزوار وإقرارات الصحة والـPPE',
          labelEn: 'Visitor Pass & PPE',
          icon: 'fa-id-card-clip',
          badge: activeVisitorsCount > 0 ? activeVisitorsCount : undefined,
          badgeColor: 'bg-emerald-500 text-white',
        },
        {
          id: 'sustainability',
          labelAr: 'الاستدامة والبصمة الكربونية (ESG)',
          labelEn: 'ESG & Carbon Footprint',
          icon: 'fa-leaf',
        },
        {
          id: 'emergency',
          labelAr: 'إدارة الطوارئ والأزمات الفورية',
          labelEn: 'Emergency Crisis Action',
          icon: 'fa-bell-concierge',
          badgeColor: 'bg-amber-500 text-white',
        },
      ],
    },
    {
      titleAr: 'الأرشيف والإعدادات',
      titleEn: 'System & Governance',
      items: [
        {
          id: 'archive',
          labelAr: 'أرشيف وسجلات التدقيق المعتمدة',
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

  const router = useRouter();

  const handleSelectTab = (id: TabKey) => {
    setActiveTab(id);
    const targetPath = TAB_TO_PATH[id] || '/';
    router.push(targetPath);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Navigation Drawer */}
      <aside
        className={`fixed md:sticky top-0 md:top-[60px] bottom-0 z-50 md:z-30 w-72 md:w-64 shrink-0 transition-transform duration-300 ease-in-out no-print ${
          isAr
            ? isOpen
              ? 'translate-x-0'
              : 'translate-x-full md:translate-x-0'
            : isOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        } ${
          isDark
            ? 'bg-slate-950/95 md:bg-slate-950 border-slate-800'
            : 'bg-white/95 md:bg-white border-slate-200'
        } border-r border-l shadow-xl md:shadow-none flex flex-col justify-between overflow-y-auto h-screen md:h-[calc(100vh-60px)]`}
      >
        <div className="p-4 space-y-1.5">
          {/* Mobile Header in Drawer */}
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-200 dark:border-slate-800 md:hidden">
            <span className="text-xs font-black text-sky-600 dark:text-sky-400">
              {isAr ? 'القائمة الرئيسية' : 'Navigation Menu'}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <i className="fa-solid fa-xmark text-base"></i>
            </button>
          </div>

          {navSections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-1 pt-2 first:pt-0">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-1">
                {isAr ? section.titleAr : section.titleEn}
              </p>
              {section.items.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-xs transition-all text-start group ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                        : isDark
                        ? 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <i
                        className={`fa-solid ${item.icon} text-xs w-4 text-center transition-transform group-hover:scale-110 ${
                          isActive
                            ? 'text-white'
                            : isDark
                            ? 'text-sky-400'
                            : 'text-sky-600'
                        }`}
                      />
                      <span className="truncate">{isAr ? item.labelAr : item.labelEn}</span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[9px] font-black font-mono px-1.5 py-0.5 rounded-full shrink-0 shadow-sm ${
                          isActive ? 'bg-white text-sky-600' : item.badgeColor || 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        {/* Quick System Status Card in Sidebar bottom */}
        <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-950 border border-slate-300 dark:border-slate-800 text-center space-y-1.5 shadow-inner">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{isAr ? 'النظام متصل ونشط' : 'System Live & Active'}</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            {isAr ? '216 معياراً معتمداً • v9.8 PRO' : '216 Active Standards • v9.8 PRO'}
          </p>
        </div>
      </aside>
    </>
  );
};
