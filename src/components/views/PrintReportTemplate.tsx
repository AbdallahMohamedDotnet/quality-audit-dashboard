'use client';

import React from 'react';
import { useAudit } from '../../context/AuditContext';
import { SECTORS, DEPARTMENTS, SECTOR_DEPARTMENTS, STANDARDS } from '../../data';
import { calculateSectorMetrics, getSectorLatestScores } from '../../utils/calculations';
import { formatLiveClocks } from '../../utils/date';

export const PrintReportTemplate: React.FC = () => {
  const {
    isAr,
    currentSector,
    selectedDept,
    currentRole,
    logoSvg,
    auditAnswers,
    archivedAudits,
    ncrs,
  } = useAudit();

  const [mounted, setMounted] = React.useState(false);
  const [printClocks, setPrintClocks] = React.useState<ReturnType<typeof formatLiveClocks> | null>(null);
  const [isoTimestamp, setIsoTimestamp] = React.useState<string>('');

  React.useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setPrintClocks(formatLiveClocks(now, isAr));
      setIsoTimestamp(now.toISOString());
    };
    updateTime();

    window.addEventListener('beforeprint', updateTime);
    return () => window.removeEventListener('beforeprint', updateTime);
  }, [isAr]);

  const currentSectorObj = SECTORS.find(s => s.val === currentSector);
  const sectorDeptKeys = SECTOR_DEPARTMENTS[currentSector] || [];
  const sectorScores = getSectorLatestScores(archivedAudits, sectorDeptKeys);
  const metrics = calculateSectorMetrics(sectorScores, sectorDeptKeys, ncrs);

  const relevantStandards = STANDARDS.filter(
    std => std.sectors.includes(currentSector) && (!selectedDept || std.depts.includes(selectedDept))
  );

  return (
    <div className="hidden print:block text-black bg-white p-6 space-y-6 max-w-4xl mx-auto font-sans">
      {/* Official Header */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-slate-900">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white"
            dangerouslySetInnerHTML={{ __html: logoSvg }}
          />
          <div>
            <h1 className="text-xl font-black tracking-tight">
              {isAr ? '📋 تقرير التدقيق والجودة الرقمي المعتمد' : '📋 Certified Digital Quality Audit Report'}
            </h1>
            <p className="text-xs text-slate-600 font-bold">
              {isAr
                ? 'المنصة الرقمية لإدارة الامتثال والمعايير الدولية (v9.8 PRO)'
                : 'Digital Quality & Compliance Management System (v9.8 PRO)'}
            </p>
          </div>
        </div>

        <div className="text-end text-xs space-y-0.5" suppressHydrationWarning>
          <div className="font-bold" suppressHydrationWarning>
            {isAr ? '📅 التاريخ:' : '📅 Date:'} {mounted && printClocks ? printClocks.gregorianDate : ''}
          </div>
          <div className="font-mono text-[11px] text-slate-600" suppressHydrationWarning>
            ⏰ {mounted && printClocks ? printClocks.time : ''}
          </div>
          <div className="font-mono text-[10px] text-slate-500" suppressHydrationWarning>
            REF #AUDIT-CERT
          </div>
        </div>
      </div>

      {/* Audit Meta Grid */}
      <div className="grid grid-cols-3 gap-3 p-4 rounded-xl border border-slate-300 bg-slate-50 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 font-bold block uppercase">
            {isAr ? '🏭 القطاع التشغيلي' : '🏭 Sector'}
          </span>
          <span className="font-black">
            {currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector}
          </span>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 font-bold block uppercase">
            {isAr ? '🏢 القسم المفحوص' : '🏢 Department'}
          </span>
          <span className="font-black">
            {selectedDept
              ? DEPARTMENTS[selectedDept]?.[isAr ? 'ar' : 'en'] || selectedDept
              : isAr
              ? 'كافة الأقسام'
              : 'All Departments'}
          </span>
        </div>

        <div>
          <span className="text-[10px] text-slate-500 font-bold block uppercase">
            {isAr ? '🎖️ المدقق المعتمد' : '🎖️ Lead Auditor'}
          </span>
          <span className="font-black">{currentRole}</span>
        </div>
      </div>

      {/* Summary KPI Pills */}
      <div className="grid grid-cols-4 gap-3 text-center">
        <div className="p-3 border rounded-xl bg-slate-50">
          <span className="text-[10px] text-slate-500 font-bold block">
            {isAr ? '🎯 نسبة الامتثال' : '🎯 Compliance'}
          </span>
          <span className="text-lg font-black font-mono">{metrics.averageScore}%</span>
        </div>

        <div className="p-3 border rounded-xl bg-slate-50">
          <span className="text-[10px] text-slate-500 font-bold block">
            {isAr ? '📜 المعايير المفحوصة' : '📜 Standards Evaluated'}
          </span>
          <span className="text-lg font-black font-mono">{relevantStandards.length}</span>
        </div>

        <div className="p-3 border rounded-xl bg-slate-50">
          <span className="text-[10px] text-slate-500 font-bold block">
            {isAr ? '⚠️ مذكرات NCR المفتوحة' : '⚠️ Open NCRs'}
          </span>
          <span className="text-lg font-black font-mono">{metrics.openNcrs}</span>
        </div>

        <div className="p-3 border rounded-xl bg-slate-50">
          <span className="text-[10px] text-slate-500 font-bold block">
            {isAr ? '💰 الوفورات التقديرية' : '💰 Estimated Savings'}
          </span>
          <span className="text-lg font-black font-mono">${metrics.estimatedSavings}</span>
        </div>
      </div>

      {/* Standards Evaluation Checklist Table */}
      <div className="space-y-2">
        <h3 className="text-sm font-black border-b pb-1">
          {isAr ? '📋 بنود الفحص والمعايير المعتمدة' : '📋 Evaluated Standards & Checklist Readings'}
        </h3>

        <table className="w-full text-xs border border-slate-300">
          <thead className="bg-slate-100 border-b border-slate-300 font-black text-[10px]">
            <tr>
              <th className="p-2 text-start">#</th>
              <th className="p-2 text-start">{isAr ? '📜 المعيار / الكود' : '📜 Standard / Code'}</th>
              <th className="p-2 text-start">{isAr ? '📝 الوصف' : '📝 Description'}</th>
              <th className="p-2 text-center">{isAr ? '📏 الحد القياسي' : '📏 Baseline'}</th>
              <th className="p-2 text-center">{isAr ? '⚡ القراءة الفعلية' : '⚡ Actual'}</th>
              <th className="p-2 text-center">{isAr ? '🚦 الحالة' : '🚦 Result'}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {relevantStandards.slice(0, 35).map((std, i) => {
              const answer = auditAnswers[std.id];
              const actual = answer ? answer.actual : '—';
              const isDev = answer ? answer.isDeviation : false;

              return (
                <tr key={std.id} className="print-break-inside-avoid">
                  <td className="p-2 font-mono">{i + 1}</td>
                  <td className="p-2 font-black">
                    {std.standard} - {std.code}
                  </td>
                  <td className="p-2">{isAr ? std.desc.ar : std.desc.en}</td>
                  <td className="p-2 text-center font-mono">
                    {std.operator} {std.baseline} {std.unit}
                  </td>
                  <td className="p-2 text-center font-mono font-bold">
                    {actual} {std.unit}
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={`font-black text-[10px] px-2 py-0.5 rounded ${
                        isDev ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {isDev ? (isAr ? '⚠️ حيود' : '⚠️ Deviation') : isAr ? '✅ مطابق' : '✅ Compliant'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Signature and Seal Section */}
      <div className="pt-6 border-t-2 border-slate-900 flex items-center justify-between text-xs print-break-inside-avoid">
        <div className="space-y-1">
          <p className="font-bold">{isAr ? '✍️ اعتماد مدقق الجودة والسلامة:' : '✍️ Lead Auditor Approval:'}</p>
          <div className="w-48 h-16 border border-slate-300 rounded flex items-center justify-center text-slate-400 font-mono text-[10px]">
            [ Digitally Authenticated Seal ]
          </div>
          <p className="text-[10px] text-slate-500 font-mono" suppressHydrationWarning>
            {mounted && isoTimestamp ? `TIMESTAMP: ${isoTimestamp}` : 'TIMESTAMP: --'}
          </p>
        </div>

        <div className="space-y-1 text-end">
          <p className="font-bold">{isAr ? '🏛️ ختم الإدارة العامة للجودة:' : '🏛️ Corporate QA Stamp:'}</p>
          <div className="w-48 h-16 border border-slate-300 rounded flex items-center justify-center text-slate-400 font-mono text-[10px]">
            [ Official Quality Seal ]
          </div>
        </div>
      </div>
    </div>
  );
};
