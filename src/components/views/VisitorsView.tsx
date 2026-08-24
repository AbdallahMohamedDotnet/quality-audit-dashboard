'use client';

import React, { useState, useMemo } from 'react';
import { useAudit } from '../../context/AuditContext';
import { exportToCsv } from '../../utils/export';

export const VisitorsView: React.FC = () => {
  const { isAr, isDark, visitors, addVisitor, checkoutVisitor, showToast, logoSvg } = useAudit();
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [selectedBadgeVisitor, setSelectedBadgeVisitor] = useState<(typeof visitors)[0] | null>(null);
  const [filterMode, setFilterMode] = useState<'ALL' | 'ACTIVE' | 'DEPARTED'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [form, setForm] = useState({
    name: '',
    company: '',
    purpose: '',
    host: '',
    ppeIssued: false,
    healthDeclared: false,
  });

  const activeCount = visitors.filter(v => v.timeOut === null).length;
  const departedCount = visitors.filter(v => v.timeOut !== null).length;
  const ppeCompliantCount = visitors.filter(v => v.ppeIssued).length;
  const healthDeclaredCount = visitors.filter(v => v.healthDeclared).length;

  const filteredVisitors = useMemo(() => {
    let list = visitors;
    if (filterMode === 'ACTIVE') list = list.filter(v => v.timeOut === null);
    if (filterMode === 'DEPARTED') list = list.filter(v => v.timeOut !== null);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        v =>
          v.name.toLowerCase().includes(q) ||
          v.company.toLowerCase().includes(q) ||
          v.purpose.toLowerCase().includes(q) ||
          v.host.toLowerCase().includes(q)
      );
    }
    return list;
  }, [visitors, filterMode, searchQuery]);

  const handleCheckinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.host.trim()) {
      showToast(
        isAr ? 'يرجى إدخال اسم الزائر واسم المُضيف' : 'Please enter visitor name and host',
        'warning'
      );
      return;
    }
    if (!form.healthDeclared) {
      showToast(
        isAr
          ? 'يجب توقيع الإقرار الصحي والسلامة المهنية أولاً'
          : 'Health and safety declaration must be signed',
        'warning'
      );
      return;
    }
    addVisitor(form);
    setForm({ name: '', company: '', purpose: '', host: '', ppeIssued: false, healthDeclared: false });
    setIsCheckinModalOpen(false);
  };

  const handleExportCsv = () => {
    const headers = [
      isAr ? 'رقم السجل' : 'Log ID',
      isAr ? 'اسم الزائر' : 'Visitor Name',
      isAr ? 'الجهة / الشركة' : 'Company',
      isAr ? 'الغرض' : 'Purpose',
      isAr ? 'المُضيف' : 'Host',
      isAr ? 'تسليم PPE' : 'PPE Issued',
      isAr ? 'الإقرار الصحي' : 'Health Declared',
      isAr ? 'وقت الدخول' : 'Time In',
      isAr ? 'وقت الخروج' : 'Time Out',
    ];
    const rows = filteredVisitors.map(v => [
      v.id,
      v.name,
      v.company,
      v.purpose,
      v.host,
      v.ppeIssued ? (isAr ? 'نعم' : 'Yes') : isAr ? 'لا' : 'No',
      v.healthDeclared ? (isAr ? 'نعم' : 'Yes') : isAr ? 'لا' : 'No',
      v.timeIn,
      v.timeOut || (isAr ? 'نشط بالمنشأة' : 'Active On-Site'),
    ]);
    exportToCsv(`Visitor_Log_${Date.now()}`, headers, rows);
    showToast(isAr ? 'تم تصدير سجل الزوار بنجاح' : 'Exported visitor log', 'success');
  };

  const handlePrintBadge = () => {
    showToast(isAr ? 'جاري تجهيز بطاقة الزائر للطباعة...' : 'Preparing visitor badge for printing...', 'info');
    setTimeout(() => { window.print(); }, 300);
  };

  const inputBase = `w-full px-3 py-2.5 rounded-xl border text-xs font-semibold outline-none transition-colors focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 ${
    isDark
      ? 'bg-slate-950 border-slate-700 text-white placeholder:text-slate-600'
      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400'
  }`;

  return (
    <div className="space-y-4 animate-fadeIn">

      {/* ═══════════════════════════════════════════════════════════════
          PAGE HEADER — Title + Actions
      ═══════════════════════════════════════════════════════════════ */}
      <div className={`rounded-2xl border px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between shadow-sm ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-id-card-clip text-teal-500 text-sm" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-black text-slate-900 dark:text-white leading-snug">
              {isAr ? 'سجل الزوار وإقرارات الصحة والسلامة' : 'Visitor & Contractor Gate Pass Register'}
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              {isAr
                ? 'تتبع دخول الزوار، امتثال PPE، الإقرارات الصحية، وسجلات الدخول والخروج.'
                : 'Track visitor entries, PPE compliance, health declarations, and entry/exit activity.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleExportCsv}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-colors ${
              isDark
                ? 'border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                : 'border-slate-300 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            <i className="fa-solid fa-file-csv text-emerald-500 text-[11px]" />
            <span>{isAr ? 'تصدير CSV' : 'Export CSV'}</span>
          </button>
          <button
            type="button"
            onClick={() => setIsCheckinModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black shadow-md shadow-teal-600/25 transition-all"
          >
            <i className="fa-solid fa-user-plus text-[11px]" />
            <span>{isAr ? '+ تسجيل دخول زائر' : '+ Check-In Visitor'}</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          SUMMARY STATS
      ═══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            label: isAr ? 'إجمالي الزوار' : 'Total Visitors',
            value: visitors.length,
            icon: 'fa-users',
            color: 'text-sky-500',
            bg: 'bg-sky-500/10 border-sky-500/20',
            pulse: false,
          },
          {
            label: isAr ? 'نشط بالمنشأة' : 'Active On-Site',
            value: activeCount,
            icon: 'fa-circle-dot',
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10 border-emerald-500/20',
            pulse: activeCount > 0,
          },
          {
            label: isAr ? 'امتثال PPE' : 'PPE Compliant',
            value: visitors.length ? `${Math.round((ppeCompliantCount / visitors.length) * 100)}%` : '—',
            icon: 'fa-hard-hat',
            color: 'text-amber-500',
            bg: 'bg-amber-500/10 border-amber-500/20',
            pulse: false,
          },
          {
            label: isAr ? 'إقرارات صحية' : 'Health Declared',
            value: visitors.length ? `${Math.round((healthDeclaredCount / visitors.length) * 100)}%` : '—',
            icon: 'fa-file-shield',
            color: 'text-teal-500',
            bg: 'bg-teal-500/10 border-teal-500/20',
            pulse: false,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`rounded-xl border p-3.5 flex items-center gap-3 shadow-sm ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${stat.bg}`}>
              {stat.pulse ? (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              ) : (
                <i className={`fa-solid ${stat.icon} text-sm ${stat.color}`} />
              )}
            </div>
            <div className="min-w-0">
              <div className={`text-lg font-black leading-none ${stat.color}`}>{stat.value}</div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FILTER & SEARCH CONTROLS
      ═══════════════════════════════════════════════════════════════ */}
      <div className={`rounded-2xl border px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between shadow-sm ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 shrink-0">
          {(
            [
              { key: 'ALL' as const, labelAr: 'الكل', labelEn: 'All', count: visitors.length },
              { key: 'ACTIVE' as const, labelAr: 'نشط', labelEn: 'Active', count: activeCount },
              { key: 'DEPARTED' as const, labelAr: 'مغادر', labelEn: 'Departed', count: departedCount },
            ]
          ).map(tab => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilterMode(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black transition-all whitespace-nowrap ${
                filterMode === tab.key
                  ? tab.key === 'ACTIVE'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : tab.key === 'DEPARTED'
                    ? 'bg-slate-600 text-white shadow-sm'
                    : 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {tab.key === 'ACTIVE' && filterMode === tab.key && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
              <span>{isAr ? tab.labelAr : tab.labelEn}</span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono leading-none ${
                filterMode === tab.key
                  ? 'bg-white/20 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className={`relative flex items-center w-full sm:w-64 rounded-xl border text-xs transition-colors focus-within:ring-2 focus-within:ring-teal-500/30 focus-within:border-teal-500 ${
          isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-300'
        }`}>
          <i className={`fa-solid fa-magnifying-glass absolute ${isAr ? 'right-3' : 'left-3'} text-slate-400 pointer-events-none text-[11px]`} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={isAr ? 'البحث باسم الزائر أو الشركة...' : 'Search by name or company...'}
            className={`w-full bg-transparent py-2 text-[11px] font-semibold outline-none placeholder:text-slate-400 ${
              isAr ? 'pr-8 pl-3' : 'pl-8 pr-3'
            } ${isDark ? 'text-white' : 'text-slate-900'}`}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={`absolute ${isAr ? 'left-2' : 'right-2'} text-slate-400 hover:text-slate-600 dark:hover:text-slate-200`}
            >
              <i className="fa-solid fa-xmark text-[11px]" />
            </button>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE CARD LIST (< md)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="block md:hidden space-y-3">
        {filteredVisitors.length === 0 ? (
          <EmptyState isAr={isAr} isDark={isDark} />
        ) : (
          filteredVisitors.map(v => {
            const isActive = v.timeOut === null;
            return (
              <div
                key={v.id}
                className={`rounded-2xl border p-4 space-y-3 shadow-sm ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                      <span className="text-sm font-black text-slate-900 dark:text-white truncate">{v.name}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium ps-4">{v.company || '—'}</div>
                  </div>
                  <VisitStatusBadge isActive={isActive} isAr={isAr} />
                </div>
                <div className={`grid grid-cols-2 gap-2 p-3 rounded-xl text-xs ${isDark ? 'bg-slate-950 border border-slate-800' : 'bg-slate-50 border border-slate-100'}`}>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-black block">{isAr ? 'الغرض' : 'Purpose'}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200 block">{v.purpose || '—'}</span>
                    <span className="text-[10px] text-sky-500 dark:text-sky-400 font-semibold">{v.host}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-black block">{isAr ? 'التوقيت' : 'Timing'}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold block">{v.timeIn}</span>
                    <span className="font-mono text-slate-500 text-[11px] block">{v.timeOut || (isAr ? 'متواجد حالياً' : 'On-Site')}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <PpeBadge issued={v.ppeIssued} isAr={isAr} />
                  <HealthBadge declared={v.healthDeclared} isAr={isAr} />
                </div>
                <div className={`flex items-center justify-end gap-2 pt-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <button
                    type="button"
                    onClick={() => setSelectedBadgeVisitor(v)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                      isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <i className="fa-solid fa-id-badge text-sky-500 text-[11px]" />
                    <span>{isAr ? 'طباعة التصريح' : 'Pass Badge'}</span>
                  </button>
                  {isActive && (
                    <button
                      type="button"
                      onClick={() => checkoutVisitor(v.id)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black shadow-sm transition-all"
                    >
                      <i className="fa-solid fa-arrow-right-from-bracket text-[11px]" />
                      <span>{isAr ? 'تسجيل خروج' : 'Check-Out'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          DESKTOP TABLE (>= md)
      ═══════════════════════════════════════════════════════════════ */}
      <div className={`hidden md:block rounded-2xl border overflow-hidden shadow-sm ${
        isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs" style={{ minWidth: '720px' }}>
            <thead className={`border-b text-[10px] font-black uppercase tracking-wider ${
              isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}>
              <tr>
                <th scope="col" className="px-4 py-3 text-start">{isAr ? 'الزائر والجهة' : 'Visitor & Company'}</th>
                <th scope="col" className="px-4 py-3 text-start">{isAr ? 'الغرض والمُضيف' : 'Purpose & Host'}</th>
                <th scope="col" className="px-4 py-3 text-center">{isAr ? 'PPE' : 'PPE'}</th>
                <th scope="col" className="px-4 py-3 text-center">{isAr ? 'الإقرار الصحي' : 'Health Dec.'}</th>
                <th scope="col" className="px-4 py-3 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                <th scope="col" className="px-4 py-3 text-center">{isAr ? 'التوقيت' : 'Timing'}</th>
                <th scope="col" className="px-4 py-3 text-end">{isAr ? 'الإجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-slate-800' : 'divide-slate-100'}`}>
              {filteredVisitors.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState isAr={isAr} isDark={isDark} />
                  </td>
                </tr>
              ) : (
                filteredVisitors.map(v => {
                  const isActive = v.timeOut === null;
                  return (
                    <tr
                      key={v.id}
                      className={`transition-colors ${
                        isDark ? 'hover:bg-slate-800/60' : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Visitor */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 ${
                            isActive
                              ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                          }`}>
                            {v.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <div className="font-black text-slate-900 dark:text-white text-[12px] leading-snug truncate max-w-[140px]">{v.name}</div>
                            <div className="text-[10px] text-slate-400 font-medium mt-0.5 truncate max-w-[140px]">{v.company || '—'}</div>
                          </div>
                        </div>
                      </td>

                      {/* Purpose */}
                      <td className="px-4 py-3.5">
                        <div className="text-[12px] font-bold text-slate-800 dark:text-slate-200 leading-snug truncate max-w-[150px]">{v.purpose || '—'}</div>
                        <div className="text-[10px] text-sky-500 dark:text-sky-400 font-semibold mt-0.5 truncate max-w-[150px]">
                          <i className={`fa-solid fa-user-tie text-[9px] ${isAr ? 'ml-1' : 'mr-1'}`} />
                          {v.host}
                        </div>
                      </td>

                      {/* PPE */}
                      <td className="px-4 py-3.5 text-center">
                        <PpeBadge issued={v.ppeIssued} isAr={isAr} />
                      </td>

                      {/* Health */}
                      <td className="px-4 py-3.5 text-center">
                        <HealthBadge declared={v.healthDeclared} isAr={isAr} />
                      </td>

                      {/* Visit Status */}
                      <td className="px-4 py-3.5 text-center">
                        <VisitStatusBadge isActive={isActive} isAr={isAr} />
                      </td>

                      {/* Timing */}
                      <td className="px-4 py-3.5 text-center">
                        <div className="font-mono text-[11px] leading-snug">
                          <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                            <i className="fa-solid fa-arrow-right-to-bracket text-[9px]" />
                            <span>{v.timeIn}</span>
                          </div>
                          <div className="flex items-center justify-center gap-1 text-slate-400 mt-0.5">
                            <i className="fa-solid fa-arrow-right-from-bracket text-[9px]" />
                            <span>{v.timeOut || (isAr ? 'متواجد' : 'On-Site')}</span>
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-end">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedBadgeVisitor(v)}
                            className={`p-2 rounded-xl transition-colors ${
                              isDark
                                ? 'text-slate-500 hover:text-sky-400 hover:bg-sky-500/10'
                                : 'text-slate-400 hover:text-sky-600 hover:bg-sky-50'
                            }`}
                            title={isAr ? 'طباعة تصريح الدخول' : 'Print Pass Badge'}
                          >
                            <i className="fa-solid fa-id-badge text-sm" />
                          </button>
                          {isActive ? (
                            <button
                              type="button"
                              onClick={() => checkoutVisitor(v.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-black shadow-sm transition-all"
                            >
                              <i className="fa-solid fa-arrow-right-from-bracket text-[9px]" />
                              <span>{isAr ? 'خروج' : 'Check-Out'}</span>
                            </button>
                          ) : (
                            <span className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[10px] font-black ${
                              isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                            }`}>
                              <i className="fa-solid fa-circle-check text-emerald-500 text-[9px]" />
                              {isAr ? 'مغادر' : 'Departed'}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredVisitors.length > 0 && (
          <div className={`px-4 py-2.5 border-t text-[10px] font-bold flex items-center justify-between ${
            isDark ? 'border-slate-800 bg-slate-950 text-slate-500' : 'border-slate-100 bg-slate-50 text-slate-400'
          }`}>
            <span>
              {isAr
                ? `عرض ${filteredVisitors.length} من أصل ${visitors.length} سجل`
                : `Showing ${filteredVisitors.length} of ${visitors.length} records`}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {isAr ? 'سجل مباشر' : 'Live Record'}
            </span>
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          CHECK-IN MODAL
      ═══════════════════════════════════════════════════════════════ */}
      {isCheckinModalOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-lg rounded-2xl shadow-2xl border max-h-[92vh] overflow-y-auto ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between px-5 py-4 border-b sticky top-0 z-10 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center text-white shrink-0">
                  <i className="fa-solid fa-user-plus text-sm" />
                </div>
                <div>
                  <h3 className="text-sm font-black">
                    {isAr ? 'تسجيل دخول زائر / مقاول' : 'Visitor & Contractor Check-In'}
                  </h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    {isAr ? 'أدخل بيانات الزائر وأكمل الإجراءات المطلوبة' : 'Fill in visitor details and complete required steps'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckinModalOpen(false)}
                className={`p-2 rounded-xl transition-colors ${
                  isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}
              >
                <i className="fa-solid fa-xmark text-base" />
              </button>
            </div>

            <form onSubmit={handleCheckinSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    {isAr ? 'اسم الزائر الثلاثي' : 'Full Name'} <span className="text-rose-500">*</span>
                  </label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={isAr ? 'محمد إبراهيم' : 'e.g. Alex Hunter'} className={inputBase} />
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    {isAr ? 'الجهة أو الشركة' : 'Company / Entity'}
                  </label>
                  <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder={isAr ? 'شركة الصيانة' : 'e.g. Apex Tech'} className={inputBase} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    {isAr ? 'الغرض من الزيارة' : 'Visit Purpose'}
                  </label>
                  <input type="text" value={form.purpose} onChange={e => setForm({ ...form, purpose: e.target.value })} placeholder={isAr ? 'صيانة طارئة / تفتيش' : 'e.g. Inspection'} className={inputBase} />
                </div>
                <div>
                  <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
                    {isAr ? 'المُضيف أو القسم' : 'Host / Department'} <span className="text-rose-500">*</span>
                  </label>
                  <input type="text" value={form.host} onChange={e => setForm({ ...form, host: e.target.value })} placeholder={isAr ? 'م. سامي (مدير الصيانة)' : 'e.g. Eng. Sami'} className={inputBase} />
                </div>
              </div>

              <div className={`space-y-2.5 p-4 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                  {isAr ? 'متطلبات الامتثال الإلزامية' : 'Mandatory Compliance Requirements'}
                </p>
                <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-xl transition-colors border ${
                  form.ppeIssued ? 'bg-emerald-500/5 border-emerald-500/20' : isDark ? 'border-transparent hover:bg-slate-900' : 'border-transparent hover:bg-white'
                }`}>
                  <input type="checkbox" checked={form.ppeIssued} onChange={e => setForm({ ...form, ppeIssued: e.target.checked })} className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-black text-slate-700 dark:text-slate-300">{isAr ? 'تسليم مهمات الوقاية الشخصية (PPE)' : 'PPE Gear Issued & Worn'}</div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">{isAr ? 'خوذة، حذاء سلامة، سترة عالية الوضوح' : 'Helmet, Safety Shoes, High-Vis Vest'}</div>
                  </div>
                </label>
                <label className={`flex items-start gap-3 cursor-pointer p-3 rounded-xl transition-colors border ${
                  form.healthDeclared ? 'bg-emerald-500/5 border-emerald-500/20' : isDark ? 'border-transparent hover:bg-slate-900' : 'border-transparent hover:bg-white'
                }`}>
                  <input type="checkbox" checked={form.healthDeclared} onChange={e => setForm({ ...form, healthDeclared: e.target.checked })} className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-black text-slate-700 dark:text-slate-300">
                      {isAr ? 'الإقرار الصحي وسلامة المهنية' : 'Health & Safety Declaration'}{' '}
                      <span className="text-rose-500 text-[10px]">{isAr ? '(مطلوب)' : '(Required)'}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">{isAr ? 'خلو من الأعراض المعدية والالتزام بتعليمات السلامة' : 'No communicable symptoms; safety rules acknowledged'}</div>
                  </div>
                </label>
              </div>

              <div className={`flex items-center justify-end gap-2 pt-1 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <button
                  type="button"
                  onClick={() => setIsCheckinModalOpen(false)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold transition-colors ${
                    isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white' : 'border-slate-300 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black shadow-md shadow-teal-600/25 transition-all flex items-center gap-1.5">
                  <i className="fa-solid fa-id-card text-[11px]" />
                  <span>{isAr ? 'إصدار تصريح الدخول' : 'Issue Gate Pass'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          BADGE MODAL
      ═══════════════════════════════════════════════════════════════ */}
      {selectedBadgeVisitor && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className={`w-full max-w-sm rounded-2xl shadow-2xl border ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className={`flex items-center justify-between px-5 py-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-teal-600 flex items-center justify-center text-white shrink-0">
                  <i className="fa-solid fa-id-badge text-sm" />
                </div>
                <h3 className="text-sm font-black">{isAr ? 'تصريح الدخول الرقمي' : 'Security Gate Pass'}</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBadgeVisitor(null)}
                className={`p-2 rounded-xl transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'}`}
              >
                <i className="fa-solid fa-xmark text-base" />
              </button>
            </div>
            <div className="p-5">
              <div className={`rounded-2xl border-2 border-teal-500/30 p-5 space-y-4 text-center ${
                isDark ? 'bg-gradient-to-br from-slate-950 to-slate-900' : 'bg-gradient-to-br from-slate-50 to-slate-100'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white" dangerouslySetInnerHTML={{ __html: logoSvg }} />
                  <span className="text-[10px] font-mono font-black text-teal-500 bg-teal-500/10 px-2 py-1 rounded-lg border border-teal-500/20">
                    PASS #{selectedBadgeVisitor.id.toString().slice(-6)}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white">{selectedBadgeVisitor.name}</h4>
                  <p className="text-xs font-bold text-slate-500 mt-0.5">{selectedBadgeVisitor.company || (isAr ? 'زائر مستقل' : 'Independent Visitor')}</p>
                </div>
                <div className={`p-3 rounded-xl border text-xs text-start space-y-2 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  {[
                    { label: isAr ? 'المُضيف' : 'Host', value: selectedBadgeVisitor.host },
                    { label: isAr ? 'الغرض' : 'Purpose', value: selectedBadgeVisitor.purpose },
                    { label: isAr ? 'وقت الدخول' : 'Time In', value: selectedBadgeVisitor.timeIn, mono: true },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <span className="text-slate-400 font-bold">{row.label}:</span>
                      <span className={`font-black ${row.mono ? 'font-mono' : ''} text-slate-800 dark:text-slate-200`}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <PpeBadge issued={selectedBadgeVisitor.ppeIssued} isAr={isAr} />
                  <HealthBadge declared={selectedBadgeVisitor.healthDeclared} isAr={isAr} />
                </div>
                <div>
                  <div className={`w-full h-8 rounded-lg flex items-center justify-center font-mono text-[9px] tracking-widest font-black ${
                    isDark ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                  }`}>
                    ||| | |||| | ||||| |||| | |||
                  </div>
                  <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 block mt-1">
                    ✓ {isAr ? 'إقرار صحي ومهمات سلامة معتمدة' : 'Health & PPE Certified'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-5 pb-5">
              <button
                type="button"
                onClick={() => setSelectedBadgeVisitor(null)}
                className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-colors ${
                  isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-slate-300 text-slate-500 hover:bg-slate-100'
                }`}
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
              <button
                type="button"
                onClick={handlePrintBadge}
                className="flex-1 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-black shadow-md shadow-teal-600/25 transition-all flex items-center justify-center gap-1.5"
              >
                <i className="fa-solid fa-print text-[11px]" />
                <span>{isAr ? 'طباعة البطاقة' : 'Print Badge'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   REUSABLE STATUS BADGE COMPONENTS
───────────────────────────────────────────────────────────── */
const PpeBadge: React.FC<{ issued: boolean; isAr: boolean }> = ({ issued, isAr }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black border ${
    issued
      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25 dark:text-emerald-400'
      : 'bg-rose-500/10 text-rose-600 border-rose-500/25 dark:text-rose-400'
  }`}>
    <i className={`fa-solid ${issued ? 'fa-check' : 'fa-xmark'} text-[9px]`} />
    <span>PPE: {issued ? (isAr ? 'مستلم' : 'Issued') : (isAr ? 'غير مستلم' : 'Pending')}</span>
  </span>
);

const HealthBadge: React.FC<{ declared: boolean; isAr: boolean }> = ({ declared, isAr }) => (
  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black border ${
    declared
      ? 'bg-teal-500/10 text-teal-600 border-teal-500/25 dark:text-teal-400'
      : 'bg-amber-500/10 text-amber-600 border-amber-500/25 dark:text-amber-400'
  }`}>
    <i className={`fa-solid ${declared ? 'fa-file-shield' : 'fa-clock'} text-[9px]`} />
    <span>{declared ? (isAr ? 'موقّع ومعتمد' : 'Signed') : (isAr ? 'معلّق' : 'Pending')}</span>
  </span>
);

const VisitStatusBadge: React.FC<{ isActive: boolean; isAr: boolean }> = ({ isActive, isAr }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-black border ${
    isActive
      ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25 dark:text-emerald-400'
      : 'bg-slate-200/60 text-slate-500 border-slate-300/50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-400'
  }`}>
    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
    {isActive ? (isAr ? 'نشط' : 'Active') : (isAr ? 'مغادر' : 'Departed')}
  </span>
);

const EmptyState: React.FC<{ isAr: boolean; isDark: boolean }> = ({ isAr, isDark }) => (
  <div className={`flex flex-col items-center justify-center py-16 px-8 text-center m-4 rounded-2xl border-2 border-dashed ${
    isDark ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-slate-50'
  }`}>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}>
      <i className="fa-solid fa-user-check text-2xl text-slate-400" />
    </div>
    <h3 className="text-sm font-black text-slate-600 dark:text-slate-400">
      {isAr ? 'لا توجد سجلات مطابقة' : 'No Records Found'}
    </h3>
    <p className="text-xs text-slate-400 mt-1 max-w-xs">
      {isAr
        ? 'لا توجد سجلات زوار تطابق معايير التصفية الحالية.'
        : 'No visitor records match the current filter criteria.'}
    </p>
  </div>
);
