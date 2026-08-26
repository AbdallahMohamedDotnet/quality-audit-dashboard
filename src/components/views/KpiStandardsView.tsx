'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { SECTORS, DEPARTMENTS, STANDARDS } from '../../data';
import { Badge } from '../common/Badge';
import { AnimatedPage, StaggerGrid } from '../common/AnimatedPage';
import { staggerChild, cardHover } from '../../utils/animations';

export const KpiStandardsView: React.FC = () => {
  const { isAr, isDark, currentSector, setCurrentSector, startAudit, setActiveTab, addNcr } = useAudit();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('ALL');

  const filteredStandards = useMemo(() => {
    return STANDARDS.filter(std => {
      // Sector filter
      if (!std.sectors.includes(currentSector)) return false;

      // Department filter
      if (selectedDeptFilter !== 'ALL' && !std.depts.includes(selectedDeptFilter)) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = std.id.toLowerCase().includes(q);
        const matchCode = std.code.toLowerCase().includes(q);
        const matchStd = std.standard.toLowerCase().includes(q);
        const matchDescAr = std.desc.ar.toLowerCase().includes(q);
        const matchDescEn = std.desc.en.toLowerCase().includes(q);
        return matchId || matchCode || matchStd || matchDescAr || matchDescEn;
      }

      return true;
    });
  }, [currentSector, selectedDeptFilter, searchQuery]);

  const handleQuickCreateNcr = (std: (typeof STANDARDS)[0]) => {
    const firstDept = std.depts[0] || '';
    const deptName = DEPARTMENTS[firstDept]?.[isAr ? 'ar' : 'en'] || firstDept;

    addNcr({
      type: 'TECHNICAL',
      deptName,
      std: std.standard,
      desc: isAr
        ? `حيود تشغيلي مرصود بالمعيار ${std.code}: ${std.desc.ar}`
        : `Deviation observed against ${std.code}: ${std.desc.en}`,
    });
    setActiveTab('ncr');
  };

  return (
    <AnimatedPage>
      {/* Header Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? '🎯 دليل المعايير ومؤشرات الجودة (KPIs)' : '🎯 Standards Directory & KPI Catalog'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isAr
                ? `استعراض 216 معياراً معتمداً لمطابقة الأيزو والأوشا والهاسب والهيئة العامة للغذاء والدواء`
                : `Browse 216 industrial standards across ISO, OSHA, HACCP, JCI, SFDA & GMP`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              {isAr
                ? `📊 إجمالي النتائج: ${filteredStandards.length}`
                : `📊 Total Results: ${filteredStandards.length}`}
            </span>
          </div>
        </div>

        {/* Sector Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {SECTORS.map(sec => {
            const isSelected = currentSector === sec.val;
            return (
              <motion.button
                whileTap={{ scale: 0.95 }}
                key={sec.val}
                type="button"
                onClick={() => {
                  setCurrentSector(sec.val);
                  setSelectedDeptFilter('ALL');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isAr ? sec.ar : sec.en}
              </motion.button>
            );
          })}
        </div>

        {/* Search & Dept Filters */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={
                isAr
                  ? '🔍 بحث في المعايير بالرمز أو الاسم أو رقم الأيزو أو النص...'
                  : '🔍 Search by standard ID, code, ISO number, or keyword...'
              }
              className={`w-full p-3 rounded-xl border text-xs font-bold outline-none transition-colors px-9 ${
                isDark
                  ? 'bg-slate-950 border-slate-700 text-slate-100'
                  : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
            <span className="absolute top-3.5 ltr:left-3 rtl:right-3 text-xs text-slate-400">🔍</span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute top-3 ltr:right-3 rtl:left-3 text-slate-400 hover:text-slate-600"
              >
                <i className="fa-solid fa-circle-xmark text-xs"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Standards Cards Grid */}
      <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStandards.map(std => {
          const deptNames = std.depts
            .map(d => DEPARTMENTS[d]?.[isAr ? 'ar' : 'en'] || d)
            .join(' • ');

          return (
            <motion.div
              key={std.id}
              variants={staggerChild}
              whileHover={cardHover}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-sky-500/50 transition-all group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-black text-sky-600 dark:text-sky-400 bg-sky-500/10 px-2.5 py-0.5 rounded-lg border border-sky-500/20">
                      #{std.id}
                    </span>
                    <Badge variant="indigo" size="sm">
                      {std.standard}
                    </Badge>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                    {std.code}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                  {isAr ? std.desc.ar : std.desc.en}
                </p>

                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1.5">
                  <span className="text-sky-500">🏢</span>
                  <span className="truncate">{deptNames}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 gap-3">
                <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center min-w-[100px]">
                  <span className="text-[9px] font-bold text-slate-500 block uppercase">
                    {isAr ? '📏 الحد القياسي' : '📏 Baseline'}
                  </span>
                  <span className="text-xs font-mono font-black text-slate-800 dark:text-slate-200">
                    {std.operator} {std.baseline} {std.unit}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handleQuickCreateNcr(std)}
                    className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white dark:text-rose-400 dark:hover:text-white text-xs font-bold border border-rose-500/30 transition-all flex items-center gap-1.5"
                    title={isAr ? 'قيد مذكرة NCR لهذا المعيار' : 'Create NCR from Standard'}
                  >
                    <span>⚠️</span>
                    <span className="hidden sm:inline">{isAr ? 'قيد NCR' : 'Log NCR'}</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => startAudit(std.depts[0])}
                    className="px-3 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>📋</span>
                    <span>{isAr ? 'تدقيق القسم' : 'Audit Dept'}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </StaggerGrid>

      {filteredStandards.length === 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-800">
          <i className="fa-solid fa-filter-circle-xmark text-3xl text-slate-400 mb-2 block"></i>
          <p className="text-xs font-bold text-slate-500">
            {isAr
              ? 'لم يتم العثور على معايير مطابقة لشروط البحث الحالية.'
              : 'No standards matched your search filters.'}
          </p>
        </div>
      )}
    </AnimatedPage>
  );
};
