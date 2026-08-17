'use client';

import React, { useState } from 'react';
import { useAudit } from '../../context/AuditContext';
import { CapaRecord } from '../../types';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { SECTOR_DEPARTMENTS, DEPARTMENTS } from '../../data';
import { exportToCsv } from '../../utils/export';

export const CapaTrackerView: React.FC = () => {
  const {
    isAr,
    currentSector,
    capas,
    addCapa,
    updateCapaStatus,
    deleteCapa,
    dispatchWhatsApp,
    showToast,
  } = useAudit();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterPriority, setFilterPriority] = useState<string>('ALL');
  const [filterSource, setFilterSource] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [verifyModalCapa, setVerifyModalCapa] = useState<CapaRecord | null>(null);
  const [verifyRating, setVerifyRating] = useState<number>(5);
  const [verifierName, setVerifierName] = useState('');

  const sectorDeptKeys = SECTOR_DEPARTMENTS[currentSector] || [];

  // New CAPA Form State
  const [newCapaForm, setNewCapaForm] = useState({
    title: '',
    source: 'NCR',
    sourceRefId: '',
    deptKey: '',
    assignedTo: '',
    priority: 'HIGH' as 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW',
    rootCause: '',
    correctiveAction: '',
    preventiveAction: '',
    targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  });

  const filteredCapas = capas.filter(c => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.sourceRefId && c.sourceRefId.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    const matchesPriority = filterPriority === 'ALL' || c.priority === filterPriority;
    const matchesSource = filterSource === 'ALL' || c.source === filterSource;

    return matchesSearch && matchesStatus && matchesPriority && matchesSource;
  });

  // KPI Metrics
  const totalOpen = capas.filter(c => c.status === 'OPEN' || c.status === 'INVESTIGATION').length;
  const totalImplemented = capas.filter(c => c.status === 'IMPLEMENTED').length;
  const totalClosed = capas.filter(c => c.status === 'CLOSED' || c.status === 'VERIFIED').length;
  const criticalCount = capas.filter(c => c.priority === 'CRITICAL' && c.status !== 'CLOSED').length;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCapaForm.title.trim() || !newCapaForm.deptKey) {
      showToast(
        isAr ? 'يرجى تحديد القسم وكتابة عنوان الإجراء التصحيحي' : 'Please select department and enter title',
        'warning'
      );
      return;
    }

    const deptName = DEPARTMENTS[newCapaForm.deptKey]?.[isAr ? 'ar' : 'en'] || newCapaForm.deptKey;

    addCapa({
      title: newCapaForm.title,
      source: newCapaForm.source,
      sourceRefId: newCapaForm.sourceRefId || 'N/A',
      dept: deptName,
      assignedTo: newCapaForm.assignedTo || (isAr ? 'فريق الجودة المناوب' : 'QA Duty Team'),
      priority: newCapaForm.priority,
      rootCause: newCapaForm.rootCause || (isAr ? 'قيد التحليل وتطبيق نموذج 5-Whys' : 'Under 5-Whys root cause analysis'),
      correctiveAction: newCapaForm.correctiveAction || (isAr ? 'إجراء احتوائي عاجل' : 'Urgent containment action'),
      preventiveAction: newCapaForm.preventiveAction || (isAr ? 'تحديث المعايير وتدريب الطاقم' : 'Update SOP and retrain crew'),
      targetDate: newCapaForm.targetDate,
      status: 'OPEN',
    });

    setIsAddModalOpen(false);
    setNewCapaForm({
      title: '',
      source: 'NCR',
      sourceRefId: '',
      deptKey: '',
      assignedTo: '',
      priority: 'HIGH',
      rootCause: '',
      correctiveAction: '',
      preventiveAction: '',
      targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  };

  const handleVerifyAndClose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyModalCapa) return;

    const auditor = verifierName.trim() || (isAr ? 'مدير الجودة والاعتماد' : 'Quality & Audit Director');

    updateCapaStatus(verifyModalCapa.id, 'CLOSED', {
      verifiedBy: auditor,
      effectivenessRating: verifyRating,
    });

    setVerifyModalCapa(null);
    setVerifierName('');
  };

  const handleShareWhatsApp = (capa: CapaRecord) => {
    const msg = isAr
      ? `*سجل الإجراء التصحيحي والوقائي (CAPA)*\nرقم التذكرة: ${capa.id}\nالمصدر: ${capa.source} (${capa.sourceRefId || 'N/A'})\nالقسم: ${capa.dept}\nالمسؤول: ${capa.assignedTo}\nالأولوية: ${capa.priority}\nالعنوان: ${capa.title}\nالسبب الجذري: ${capa.rootCause}\nالإجراء التصحيحي: ${capa.correctiveAction}\nالإجراء الوقائي: ${capa.preventiveAction}\nالموعد المستهدف: ${capa.targetDate}\nالحالة الحالية: ${capa.status}`
      : `*CAPA Action Notice*\nID: ${capa.id}\nSource: ${capa.source} (${capa.sourceRefId || 'N/A'})\nDept: ${capa.dept}\nAssigned: ${capa.assignedTo}\nPriority: ${capa.priority}\nTitle: ${capa.title}\nRoot Cause: ${capa.rootCause}\nCorrective: ${capa.correctiveAction}\nPreventive: ${capa.preventiveAction}\nDeadline: ${capa.targetDate}\nStatus: ${capa.status}`;

    dispatchWhatsApp(msg);
  };

  const handleExportCsv = () => {
    const headers = [
      isAr ? 'رقم CAPA' : 'CAPA ID',
      isAr ? 'المصدر' : 'Source',
      isAr ? 'المرجع' : 'Reference ID',
      isAr ? 'العنوان' : 'Title',
      isAr ? 'القسم' : 'Department',
      isAr ? 'المسؤول' : 'Assigned To',
      isAr ? 'الأولوية' : 'Priority',
      isAr ? 'الحالة' : 'Status',
      isAr ? 'السبب الجذري' : 'Root Cause',
      isAr ? 'الإجراء التصحيحي' : 'Corrective Action',
      isAr ? 'الإجراء الوقائي' : 'Preventive Action',
      isAr ? 'تاريخ الإنشاء' : 'Created Date',
      isAr ? 'الموعد المستهدف' : 'Target Date',
      isAr ? 'تاريخ الإغلاق' : 'Closed Date',
      isAr ? 'المحقق / المدقق' : 'Verified By',
    ];

    const rows = filteredCapas.map(c => [
      c.id,
      c.source,
      c.sourceRefId || '',
      c.title,
      c.dept,
      c.assignedTo,
      c.priority,
      c.status,
      c.rootCause,
      c.correctiveAction,
      c.preventiveAction,
      c.createdAt,
      c.targetDate,
      c.closedAt || '',
      c.verifiedBy || '',
    ]);

    exportToCsv(`CAPA_Master_Tracker_${Date.now()}`, headers, rows);
    showToast(isAr ? 'تم تصدير سجل CAPA بنجاح' : 'Exported CAPA Tracker to CSV', 'success');
  };

  const getStatusStageIndex = (status: CapaRecord['status']) => {
    switch (status) {
      case 'OPEN':
        return 0;
      case 'INVESTIGATION':
        return 1;
      case 'IMPLEMENTED':
        return 2;
      case 'VERIFIED':
        return 3;
      case 'CLOSED':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-600 flex items-center justify-center text-white shadow-md">
            <i className="fa-solid fa-arrows-spin text-lg"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              {isAr ? 'منظومة إدارة الإجراءات التصحيحية والوقائية (CAPA Master Tracker)' : 'Corrective & Preventive Action Tracker (CAPA)'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isAr
                ? 'تتبع مسار الحيود من الرصد والتحقيق (5-Whys) حتى التنفيذ والتحقق من الفعالية والإغلاق'
                : 'Track lifecycle: Investigation (5-Whys) -> Implementation -> Verification -> Closure'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportCsv}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <i className="fa-solid fa-file-csv text-emerald-500"></i>
            {isAr ? 'تصدير CSV' : 'Export CSV'}
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-rose-500/20 active:scale-95"
          >
            <i className="fa-solid fa-plus"></i>
            {isAr ? 'فتح إجراء CAPA جديد' : 'New CAPA Ticket'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={isAr ? 'قيد المعالجة والتحقيق' : 'Active / In-Progress'}
          value={totalOpen}
          subtitle={isAr ? 'مطلوب إنجاز خطة 5-Whys' : 'Requires 5-Whys root cause'}
          icon={<i className="fa-solid fa-magnifying-glass-chart text-xl"></i>}
          variant="amber"
        />
        <StatCard
          title={isAr ? 'تم التنفيذ (بانتظار التحقق)' : 'Implemented (Pending Audit)'}
          value={totalImplemented}
          subtitle={isAr ? 'تم تطبيق الإجراء وبانتظار قياس الأثر' : 'Ready for effectiveness check'}
          icon={<i className="fa-solid fa-clock-rotate-left text-xl"></i>}
          variant="sky"
        />
        <StatCard
          title={isAr ? 'تم الإغلاق والتحقق بنجاح' : 'Closed & Verified'}
          value={totalClosed}
          subtitle={isAr ? 'إجراءات مكتملة وموثقة' : 'Completed actions'}
          icon={<i className="fa-solid fa-circle-check text-xl"></i>}
          variant="emerald"
        />
        <StatCard
          title={isAr ? 'حالات حرجة مفتوحة (SLA)' : 'Critical Active SLA'}
          value={criticalCount}
          subtitle={isAr ? 'مهلة قصوى 48 ساعة' : 'Requires 48h resolution'}
          icon={<i className="fa-solid fa-fire text-xl"></i>}
          variant={criticalCount > 0 ? 'rose' : 'indigo'}
        />
      </div>

      {/* Search & Filtering Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
        <div className="relative flex-1">
          <i className="fa-solid fa-magnifying-glass absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5 text-slate-400 text-sm"></i>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={
              isAr
                ? 'بحث برقم CAPA، العنوان، القسم، المسؤول، أو المرجع...'
                : 'Search by CAPA ID, title, dept, owner, or source ref...'
            }
            className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none"
          >
            <option value="ALL">{isAr ? 'جميع المراحل' : 'All Stages'}</option>
            <option value="OPEN">{isAr ? 'مفتوح (Open)' : 'Open'}</option>
            <option value="INVESTIGATION">{isAr ? 'قيد التحقيق (Investigation)' : 'Investigation'}</option>
            <option value="IMPLEMENTED">{isAr ? 'تم التنفيذ (Implemented)' : 'Implemented'}</option>
            <option value="VERIFIED">{isAr ? 'تم التحقق (Verified)' : 'Verified'}</option>
            <option value="CLOSED">{isAr ? 'مغلق نهائياً (Closed)' : 'Closed'}</option>
          </select>

          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none"
          >
            <option value="ALL">{isAr ? 'جميع درجات الأولوية' : 'All Priorities'}</option>
            <option value="CRITICAL">{isAr ? 'حرجة جداً (Critical)' : 'Critical'}</option>
            <option value="HIGH">{isAr ? 'عالية (High)' : 'High'}</option>
            <option value="MEDIUM">{isAr ? 'متوسطة (Medium)' : 'Medium'}</option>
            <option value="LOW">{isAr ? 'منخفضة (Low)' : 'Low'}</option>
          </select>

          <select
            value={filterSource}
            onChange={e => setFilterSource(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none"
          >
            <option value="ALL">{isAr ? 'جميع المصادر' : 'All Sources'}</option>
            <option value="NCR">NCR</option>
            <option value="COMPLAINT">{isAr ? 'شكاوى النزلاء / الذكاء الاصطناعي' : 'Complaints / AI'}</option>
            <option value="AUDIT">{isAr ? 'تدقيق الجودة' : 'Quality Audit'}</option>
            <option value="INCIDENT">{isAr ? 'حادث تشغيلي' : 'Incident'}</option>
          </select>
        </div>
      </div>

      {/* CAPA Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCapas.length === 0 ? (
          <div className="bg-white dark:bg-slate-800/80 p-12 rounded-2xl border border-slate-200 dark:border-slate-700 text-center text-slate-400">
            <i className="fa-solid fa-clipboard-check text-4xl mb-3 opacity-30"></i>
            <p className="font-bold text-sm">
              {isAr ? 'لا توجد سجلات CAPA مطابقة للتصفية' : 'No CAPA records found matching criteria'}
            </p>
          </div>
        ) : (
          filteredCapas.map(capa => {
            const currentStageIdx = getStatusStageIndex(capa.status);
            const isCritical = capa.priority === 'CRITICAL';
            const isClosed = capa.status === 'CLOSED';

            return (
              <div
                key={capa.id}
                className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-black text-slate-900 dark:text-white text-base">
                        {capa.title}
                      </span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                        {capa.id}
                      </span>
                      <Badge
                        variant={
                          capa.source === 'NCR'
                            ? 'rose'
                            : capa.source === 'COMPLAINT'
                            ? 'purple'
                            : 'sky'
                        }
                        size="sm"
                      >
                        {capa.source} {capa.sourceRefId ? `(${capa.sourceRefId})` : ''}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                      <span>
                        <i className="fa-solid fa-layer-group text-[10px] me-1 text-slate-400"></i>
                        {capa.dept}
                      </span>
                      <span>•</span>
                      <span>
                        <i className="fa-solid fa-user-shield text-[10px] me-1 text-slate-400"></i>
                        {capa.assignedTo}
                      </span>
                      <span>•</span>
                      <span>
                        <i className="fa-regular fa-clock text-[10px] me-1 text-slate-400"></i>
                        {isAr ? 'المهلة:' : 'Target:'} {capa.targetDate}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <Badge
                      variant={
                        isCritical
                          ? 'rose'
                          : capa.priority === 'HIGH'
                          ? 'amber'
                          : capa.priority === 'MEDIUM'
                          ? 'indigo'
                          : 'slate'
                      }
                      size="md"
                    >
                      {capa.priority} PRIORITY
                    </Badge>

                    <Badge
                      variant={
                        capa.status === 'CLOSED'
                          ? 'emerald'
                          : capa.status === 'VERIFIED'
                          ? 'teal'
                          : capa.status === 'IMPLEMENTED'
                          ? 'sky'
                          : capa.status === 'INVESTIGATION'
                          ? 'amber'
                          : 'rose'
                      }
                      size="md"
                    >
                      {capa.status}
                    </Badge>
                  </div>
                </div>

                {/* Lifecycle Stepper */}
                <div className="py-2">
                  <div className="grid grid-cols-5 gap-2 relative">
                    {[
                      { key: 'OPEN', labelAr: '1. فتح التذكرة', labelEn: '1. Open' },
                      { key: 'INVESTIGATION', labelAr: '2. تحليل الأسباب (5-Whys)', labelEn: '2. Root Cause' },
                      { key: 'IMPLEMENTED', labelAr: '3. تنفيذ الإجراء', labelEn: '3. Implemented' },
                      { key: 'VERIFIED', labelAr: '4. التحقق والقياس', labelEn: '4. Verified' },
                      { key: 'CLOSED', labelAr: '5. إغلاق نهائي', labelEn: '5. Closed' },
                    ].map((step, idx) => {
                      const isPassed = currentStageIdx >= idx;
                      const isCurrent = currentStageIdx === idx;
                      return (
                        <div key={step.key} className="flex flex-col items-center text-center gap-1.5">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isPassed
                                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                                : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                            } ${isCurrent ? 'ring-4 ring-emerald-500/20 scale-110' : ''}`}
                          >
                            {isPassed ? <i className="fa-solid fa-check text-[10px]"></i> : idx + 1}
                          </div>
                          <span
                            className={`text-[10px] font-bold tracking-tight truncate max-w-full ${
                              isPassed
                                ? 'text-slate-900 dark:text-white'
                                : 'text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            {isAr ? step.labelAr : step.labelEn}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-slate-50/80 dark:bg-slate-900/40 p-4 rounded-xl text-xs border border-slate-200/50 dark:border-slate-700/50">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <i className="fa-solid fa-microscope text-amber-500 text-[11px]"></i>
                      {isAr ? 'السبب الجذري (Root Cause):' : 'Root Cause (5-Whys):'}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                      {capa.rootCause}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <i className="fa-solid fa-bolt text-rose-500 text-[11px]"></i>
                      {isAr ? 'التصحيح الفوري (Corrective):' : 'Immediate Corrective:'}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                      {capa.correctiveAction}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <i className="fa-solid fa-shield-halved text-emerald-500 text-[11px]"></i>
                      {isAr ? 'الإجراء الوقائي طويل المدى (Preventive):' : 'Long-Term Preventive:'}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                      {capa.preventiveAction}
                    </p>
                  </div>
                </div>

                {/* Card Footer / Status Workflow Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    {capa.closedAt && (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                        <i className="fa-solid fa-circle-check"></i>
                        {isAr ? `أغلق في ${capa.closedAt} بواسطة (${capa.verifiedBy})` : `Closed on ${capa.closedAt} by ${capa.verifiedBy}`}
                      </span>
                    )}
                    {capa.effectivenessRating && (
                      <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                        {[...Array(capa.effectivenessRating)].map((_, i) => (
                          <i key={i} className="fa-solid fa-star"></i>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    <button
                      onClick={() => handleShareWhatsApp(capa)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <i className="fa-brands fa-whatsapp"></i>
                      {isAr ? 'واتساب' : 'Share'}
                    </button>

                    {/* Progress Workflow Buttons */}
                    {capa.status === 'OPEN' && (
                      <button
                        onClick={() => updateCapaStatus(capa.id, 'INVESTIGATION')}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <i className="fa-solid fa-arrow-right rtl:rotate-180"></i>
                        {isAr ? 'بدء التحقيق (5-Whys)' : 'Start Investigation'}
                      </button>
                    )}

                    {capa.status === 'INVESTIGATION' && (
                      <button
                        onClick={() => updateCapaStatus(capa.id, 'IMPLEMENTED')}
                        className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <i className="fa-solid fa-wrench"></i>
                        {isAr ? 'تم تطبيق الإجراءات' : 'Mark Implemented'}
                      </button>
                    )}

                    {capa.status === 'IMPLEMENTED' && (
                      <button
                        onClick={() => setVerifyModalCapa(capa)}
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <i className="fa-solid fa-check-double"></i>
                        {isAr ? 'تدقيق الفعالية والإغلاق' : 'Verify & Close'}
                      </button>
                    )}

                    {capa.status === 'VERIFIED' && (
                      <button
                        onClick={() => updateCapaStatus(capa.id, 'CLOSED')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <i className="fa-solid fa-lock"></i>
                        {isAr ? 'إغلاق نهائي' : 'Final Close'}
                      </button>
                    )}

                    {isClosed && (
                      <button
                        onClick={() => updateCapaStatus(capa.id, 'OPEN')}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <i className="fa-solid fa-rotate-left me-1"></i>
                        {isAr ? 'إعادة فتح' : 'Re-Open'}
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (confirm(isAr ? 'هل أنت متأكد من حذف هذا السجل؟' : 'Delete this CAPA?')) {
                          deleteCapa(capa.id);
                        }
                      }}
                      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-rose-50 dark:bg-slate-700 dark:hover:bg-rose-900/30 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-all"
                    >
                      <i className="fa-solid fa-trash text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add New CAPA Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
                  <i className="fa-solid fa-arrows-spin"></i>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isAr ? 'فتح تذكرة إجراء تصحيحي ووقائي (CAPA Master Record)' : 'Create CAPA Master Record'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'عنوان الإجراء التصحيحي *' : 'CAPA Title / Summary *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newCapaForm.title}
                    onChange={e => setNewCapaForm({ ...newCapaForm, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder={isAr ? 'مثال: حيود في درجة حرارة ثلاجة التبريد' : 'e.g. Temperature deviation in chiller'}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'المصدر' : 'Source'}
                  </label>
                  <select
                    value={newCapaForm.source}
                    onChange={e => setNewCapaForm({ ...newCapaForm, source: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="NCR">NCR (مذكرة عدم مطابقة)</option>
                    <option value="COMPLAINT">COMPLAINT (شكوى عميل / ذكاء اصطناعي)</option>
                    <option value="AUDIT">AUDIT (تدقيق دوري)</option>
                    <option value="INCIDENT">INCIDENT (حادث تشغيلي / طارئ)</option>
                    <option value="INSPECTION">INSPECTION (تفتيش خارجي)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'رقم التذكرة المرجعية' : 'Source Reference ID'}
                  </label>
                  <input
                    type="text"
                    value={newCapaForm.sourceRefId}
                    onChange={e => setNewCapaForm({ ...newCapaForm, sourceRefId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder="e.g. NCR-1001 / CMP-442"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'القسم المعني *' : 'Department *'}
                  </label>
                  <select
                    required
                    value={newCapaForm.deptKey}
                    onChange={e => setNewCapaForm({ ...newCapaForm, deptKey: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="">{isAr ? '-- اختر القسم --' : '-- Select Dept --'}</option>
                    {sectorDeptKeys.map(key => (
                      <option key={key} value={key}>
                        {DEPARTMENTS[key]?.[isAr ? 'ar' : 'en'] || key}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'المسؤول المكلف بالتنفيذ' : 'Assigned Owner'}
                  </label>
                  <input
                    type="text"
                    value={newCapaForm.assignedTo}
                    onChange={e => setNewCapaForm({ ...newCapaForm, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder={isAr ? 'اسم المهندس / المشرف' : 'Name of supervisor'}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'درجة الأولوية' : 'Priority Level'}
                  </label>
                  <select
                    value={newCapaForm.priority}
                    onChange={e => setNewCapaForm({ ...newCapaForm, priority: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="CRITICAL">{isAr ? 'حرجة للغاية (Critical 24-48h)' : 'Critical (24-48h)'}</option>
                    <option value="HIGH">{isAr ? 'عالية (High 5-7 Days)' : 'High (5-7 Days)'}</option>
                    <option value="MEDIUM">{isAr ? 'متوسطة (Medium 14 Days)' : 'Medium (14 Days)'}</option>
                    <option value="LOW">{isAr ? 'منخفضة (Low 30 Days)' : 'Low (30 Days)'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'الموعد المستهدف للإغلاق' : 'Target SLA Date'}
                  </label>
                  <input
                    type="date"
                    value={newCapaForm.targetDate}
                    onChange={e => setNewCapaForm({ ...newCapaForm, targetDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? 'تحليل السبب الجذري (Root Cause Analysis / 5-Whys)' : 'Root Cause Analysis (5-Whys)'}
                </label>
                <textarea
                  rows={2}
                  value={newCapaForm.rootCause}
                  onChange={e => setNewCapaForm({ ...newCapaForm, rootCause: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                  placeholder={isAr ? 'لماذا حدث الخلل؟ ما هو السبب الجذري الفعلي؟' : 'Why did it happen? What is the core root cause?'}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'الإجراء التصحيحي العاجل (Corrective)' : 'Immediate Corrective Action'}
                  </label>
                  <textarea
                    rows={2}
                    value={newCapaForm.correctiveAction}
                    onChange={e => setNewCapaForm({ ...newCapaForm, correctiveAction: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder={isAr ? 'الإجراء الفوري لاحتواء الموقف...' : 'Immediate containment...'}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'الإجراء الوقائي الدائم (Preventive)' : 'Permanent Preventive Action'}
                  </label>
                  <textarea
                    rows={2}
                    value={newCapaForm.preventiveAction}
                    onChange={e => setNewCapaForm({ ...newCapaForm, preventiveAction: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                    placeholder={isAr ? 'تعديل سياسة التشغيل لمنع التكرار...' : 'Systemic fix to prevent recurrence...'}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-bold shadow-md shadow-rose-500/20"
                >
                  {isAr ? 'إنشاء وقيد ملف CAPA' : 'Create & Assign CAPA'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Verify & Close Modal */}
      {verifyModalCapa && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                  <i className="fa-solid fa-check-double"></i>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isAr ? 'التحقق من الفعالية والإغلاق النهائي' : 'Effectiveness Verification & Closure'}
                </h3>
              </div>
              <button
                onClick={() => setVerifyModalCapa(null)}
                className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleVerifyAndClose} className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <p className="font-bold text-slate-900 dark:text-white">
                  {verifyModalCapa.title}
                </p>
                <p className="text-slate-500 font-mono text-[11px]">
                  {verifyModalCapa.id} | {verifyModalCapa.dept}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? 'اسم المدقق / المعتمد المسؤول *' : 'Lead Auditor / Verifier Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={verifierName}
                  onChange={e => setVerifierName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder={isAr ? 'مثال: د. فيصل الشريف (مدير الجودة)' : 'e.g. Dr. Faisal (QA Director)'}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? 'تقييم فعالية الإجراء المطبق (Effectiveness Rating)' : 'Effectiveness Score'}
                </label>
                <div className="flex items-center justify-center gap-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setVerifyRating(star)}
                      className={`text-2xl transition-all ${
                        star <= verifyRating ? 'text-amber-500 scale-110' : 'text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      <i className="fa-solid fa-star"></i>
                    </button>
                  ))}
                </div>
                <p className="text-center text-[11px] text-slate-500 font-medium">
                  {verifyRating === 5
                    ? isAr
                      ? 'فعالية 100% - القضاء التام على السبب الجذري'
                      : '100% Effective - Root cause fully eliminated'
                    : verifyRating >= 4
                    ? isAr
                      ? 'فعالية عالية - مطابقة تامة'
                      : 'Highly Effective'
                    : isAr
                    ? 'فعالية مقبولة مع ملاحظات'
                    : 'Acceptable'}
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setVerifyModalCapa(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-500/20"
                >
                  {isAr ? 'اعتماد الإغلاق النهائي وتوثيقه' : 'Confirm Closure'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
