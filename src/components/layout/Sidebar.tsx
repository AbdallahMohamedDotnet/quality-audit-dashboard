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
      titleEn: 'Audit & Operations',
      items: [
        { id: 'dashboard', labelAr: 'لوحة التحكم الرئيسية', labelEn: 'Executive Dashboard', icon: 'fa-gauge-high' },
        { id: 'audit_form', labelAr: 'بدء التدقيق والفحص الميداني', labelEn: 'Conduct Audit Session', icon: 'fa-clipboard-check' },
        { id: 'kpi', labelAr: 'دليل المعايير والـ KPIs', labelEn: 'Standards & KPIs', icon: 'fa-list-check' },
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
          labelAr: 'سجل الموردين (AVL)',
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
        { id: 'iot', labelAr: 'المراقبة اللحظية للمجسات', labelEn: 'Live IoT Telemetry', icon: 'fa-tower-broadcast' },
        { id: 'haccp', labelAr: 'مسار الهاسب والـ CCPs', labelEn: 'HACCP & CCP Flow', icon: 'fa-shield-halved' },
        { id: 'recall', labelAr: 'استدعاء وعزل المنتجات', labelEn: 'Recall & Quarantine', icon: 'fa-boxes-packing' },
        { id: 'ai', labelAr: 'محلل الشكاوى بالذكاء الاصطناعي', labelEn: 'AI Complaint & CAPA', icon: 'fa-brain' },
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
        { id: 'sustainability', labelAr: 'الاستدامة وخفض الكربون (ESG)', labelEn: 'ESG & Carbon Footprint', icon: 'fa-leaf' },
        { id: 'emergency', labelAr: 'إدارة الطوارئ والأزمات الفورية', labelEn: 'Emergency Crisis Action', icon: 'fa-bell-concierge' },
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
        { id: 'settings', labelAr: 'إعدادات النظام وقنوات الاتصال', labelEn: 'System Settings', icon: 'fa-sliders' },
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
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Navigation Drawer */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-14 bottom-0 z-50 lg:z-30 w-64 xl:w-[260px] shrink-0 transition-transform duration-300 ease-in-out no-print ${
          isAr
            ? isOpen ? 'translate-x-0 right-0' : 'translate-x-full right-0 lg:translate-x-0 lg:right-auto'
            : isOpen ? 'translate-x-0 left-0' : '-translate-x-full left-0 lg:translate-x-0 lg:left-auto'
        } ${
          isDark
            ? 'bg-slate-950 border-slate-800'
            : 'bg-white border-slate-200'
        } border-e shadow-xl lg:shadow-none flex flex-col h-[100dvh] lg:h-[calc(100vh-56px)]`}
      >
        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto p-3 space-y-0.5">

          {/* Mobile Close Header */}
          <div className="flex items-center justify-between pb-3 mb-1 lg:hidden">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              {isAr ? 'القائمة الرئيسية' : 'Navigation'}
            </span>
            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
          </div>

          {navSections.map((section, sIdx) => (
            <div key={sIdx} className={sIdx > 0 ? 'pt-3 mt-1 border-t border-slate-200/60 dark:border-slate-800/80' : ''}>
              {/* Section label */}
              <p className={`text-[9px] font-black uppercase tracking-[0.12em] px-2.5 py-1.5 mb-0.5 ${
                isDark ? 'text-slate-600' : 'text-slate-400'
              }`}>
                {isAr ? section.titleAr : section.titleEn}
              </p>

              {/* Nav Items */}
              {section.items.map(item => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl font-semibold text-[12px] transition-all text-start gap-2 group ${
                      isActive
                        ? isDark
                          ? 'bg-sky-600/15 text-sky-400 border border-sky-600/30'
                          : 'bg-sky-50 text-sky-700 border border-sky-200'
                        : isDark
                        ? 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <i
                        className={`fa-solid ${item.icon} text-[11px] w-4 text-center shrink-0 ${
                          isActive
                            ? isDark ? 'text-sky-400' : 'text-sky-600'
                            : isDark ? 'text-slate-500 group-hover:text-sky-400' : 'text-slate-400 group-hover:text-sky-600'
                        }`}
                      />
                      <span className="leading-snug flex-1 truncate text-[11.5px]">
                        {isAr ? item.labelAr : item.labelEn}
                      </span>
                    </div>

                    {item.badge !== undefined && (
                      <span
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 font-mono ${
                          isActive
                            ? isDark ? 'bg-sky-500/20 text-sky-400' : 'bg-sky-100 text-sky-600'
                            : item.badgeColor || 'bg-slate-200 text-slate-600'
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

        {/* System Status Footer */}
        <div className={`p-3 border-t shrink-0 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className={`px-3 py-2.5 rounded-xl text-center ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
            <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{isAr ? 'النظام متصل ونشط' : 'System Live & Active'}</span>
            </div>
            <p className="text-[9px] text-slate-500 font-medium mt-0.5">
              {isAr ? '216 معياراً • v9.8 PRO' : '216 Standards • v9.8 PRO'}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
