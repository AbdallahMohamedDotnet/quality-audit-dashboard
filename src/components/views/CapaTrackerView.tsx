'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { CapaRecord } from '../../types';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { AnimatedPage, StaggerGrid } from '../common/AnimatedPage';
import { AnimatedModal } from '../common/AnimatedModal';
import { SECTOR_DEPARTMENTS, DEPARTMENTS } from '../../data';
import { exportToCsv } from '../../utils/export';
import { staggerChild } from '../../utils/animations';

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

    showToast(
      isAr ? 'تم إنشاء قيد CAPA وإسناده للمسؤول بنجاح' : 'CAPA created and assigned successfully',
      'success'
    );
  };

  const handleVerifyAndClose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyModalCapa) return;
    if (!verifierName.trim()) {
      showToast(isAr ? 'يرجى كتابة اسم المعتمد المسؤول' : 'Verifier name required', 'warning');
      return;
    }

    updateCapaStatus(verifyModalCapa.id, 'CLOSED', {
      verifiedBy: verifierName,
      effectivenessRating: verifyRating,
      closedAt: new Date().toISOString().split('T')[0],
    });
    setVerifyModalCapa(null);
    setVerifierName('');
    setVerifyRating(5);
    showToast(
      isAr ? `تم إغلاق وتوثيق الفعالية للإجراء [${verifyModalCapa.id}]` : `Verified & closed [${verifyModalCapa.id}]`,
      'success'
    );
  };

  const handleShareWhatsApp = (capa: CapaRecord) => {
    const msg = isAr
      ? `*إجراء تصحيحي وقائي (CAPA Master)*\nالكود: ${capa.id}\nالعنوان: ${capa.title}\nالقسم: ${capa.dept}\nالأولوية: ${capa.priority}\nالحالة: ${capa.status}\nالمسؤول: ${capa.assignedTo}\nتاريخ الإنجاز: ${capa.targetDate}\nالسبب الجذري: ${capa.rootCause}\nالإجراء المتخذ: ${capa.correctiveAction}\nيرجى المتابعة وتحديث المرحلة.`
      : `*CAPA Action Notice*\nID: ${capa.id}\nTitle: ${capa.title}\nDept: ${capa.dept}\nPriority: ${capa.priority}\nStatus: ${capa.status}\nOwner: ${capa.assignedTo}\nDue Date: ${capa.targetDate}\nRoot Cause: ${capa.rootCause}\nAction: ${capa.correctiveAction}\nPlease review and update progress.`;
    dispatchWhatsApp(msg);
  };

  const handleExportCsv = () => {
    const headers = [
      isAr ? 'كود CAPA' : 'CAPA ID',
      isAr ? 'العنوان' : 'Title',
      isAr ? 'المصدر' : 'Source',
      isAr ? 'المرجع' : 'Source Ref',
      isAr ? 'القسم' : 'Department',
      isAr ? 'المسؤول' : 'Owner',
      isAr ? 'الأولوية' : 'Priority',
      isAr ? 'الحالة' : 'Status',
      isAr ? 'تاريخ الهدف' : 'Target Date',
      isAr ? 'السبب الجذري' : 'Root Cause',
      isAr ? 'الإجراء التصحيحي' : 'Corrective Action',
      isAr ? 'الإجراء الوقائي' : 'Preventive Action',
    ];
    const rows = filteredCapas.map(c => [
      c.id,
      c.title,
      c.source,
      c.sourceRefId || 'N/A',
      c.dept,
      c.assignedTo,
      c.priority,
      c.status,
      c.targetDate,
      c.rootCause,
      c.correctiveAction,
      c.preventiveAction,
    ]);
    exportToCsv(`CAPA_Master_Tracker_${new Date().toISOString().split('T')[0]}`, headers, rows);
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
    <AnimatedPage>
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center text-lg">
            <span>🔄</span>
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
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleExportCsv}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <span>📊</span>
            {isAr ? 'تصدير CSV' : 'Export CSV'}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsAddModalOpen(true)}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-700 hover:to-amber-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-rose-500/20"
          >
            <span>➕</span>
            {isAr ? 'فتح إجراء CAPA جديد' : 'New CAPA Ticket'}
          </motion.button>
        </div>
      </div>

      {/* KPI Cards */}
      <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={isAr ? '🔍 قيد المعالجة والتحقيق' : '🔍 Active / In-Progress'}
          value={totalOpen}
          subtitle={isAr ? 'مطلوب إنجاز خطة 5-Whys' : 'Requires 5-Whys root cause'}
          icon={<span className="text-xl">🔍</span>}
          variant="amber"
        />
        <StatCard
          title={isAr ? '⚙️ تم التنفيذ (بانتظار التحقق)' : '⚙️ Implemented (Pending Audit)'}
          value={totalImplemented}
          subtitle={isAr ? 'تم تطبيق الإجراء وبانتظار قياس الأثر' : 'Ready for effectiveness check'}
          icon={<span className="text-xl">⚙️</span>}
          variant="sky"
        />
        <StatCard
          title={isAr ? '✅ تم الإغلاق والتحقق بنجاح' : '✅ Closed & Verified'}
          value={totalClosed}
          subtitle={isAr ? 'إجراءات مكتملة وموثقة' : 'Completed actions'}
          icon={<span className="text-xl">✅</span>}
          variant="emerald"
        />
        <StatCard
          title={isAr ? '🚨 حالات حرجة مفتوحة (SLA)' : '🚨 Critical Active SLA'}
          value={criticalCount}
          subtitle={isAr ? 'مهلة قصوى 48 ساعة' : 'Requires 48h resolution'}
          icon={<span className="text-xl">🚨</span>}
          variant={criticalCount > 0 ? 'rose' : 'indigo'}
        />
      </StaggerGrid>

      {/* Search & Filtering Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-colors">
        <div className="relative flex-1">
          <span className="absolute top-3 left-3.5 rtl:left-auto rtl:right-3.5 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={
              isAr
                ? '🔍 بحث برقم CAPA، العنوان، القسم، المسؤول، أو المرجع...'
                : '🔍 Search by CAPA ID, title, dept, owner, or source ref...'
            }
            className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none transition-colors"
          >
            <option value="ALL">{isAr ? '📑 جميع المراحل' : '📑 All Stages'}</option>
            <option value="OPEN">{isAr ? '⏳ مفتوح (Open)' : '⏳ Open'}</option>
            <option value="INVESTIGATION">{isAr ? '🔍 قيد التحقيق (Investigation)' : '🔍 Investigation'}</option>
            <option value="IMPLEMENTED">{isAr ? '⚙️ تم التنفيذ (Implemented)' : '⚙️ Implemented'}</option>
            <option value="VERIFIED">{isAr ? '✅ تم التحقق (Verified)' : '✅ Verified'}</option>
            <option value="CLOSED">{isAr ? '🔒 مغلق نهائياً (Closed)' : '🔒 Closed'}</option>
          </select>

          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none transition-colors"
          >
            <option value="ALL">{isAr ? '🚨 جميع درجات الأولوية' : '🚨 All Priorities'}</option>
            <option value="CRITICAL">{isAr ? '🚨 حرجة جداً (Critical)' : '🚨 Critical'}</option>
            <option value="HIGH">{isAr ? '⚠️ عالية (High)' : '⚠️ High'}</option>
            <option value="MEDIUM">{isAr ? '⚡ متوسطة (Medium)' : '⚡ Medium'}</option>
            <option value="LOW">{isAr ? '🛡️ منخفضة (Low)' : '🛡️ Low'}</option>
          </select>

          <select
            value={filterSource}
            onChange={e => setFilterSource(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none transition-colors"
          >
            <option value="ALL">{isAr ? '📑 جميع المصادر' : '📑 All Sources'}</option>
            <option value="NCR">{isAr ? '⚠️ NCR' : '⚠️ NCR'}</option>
            <option value="COMPLAINT">{isAr ? '🤖 شكاوى / ذكاء اصطناعي' : '🤖 Complaints / AI'}</option>
            <option value="AUDIT">{isAr ? '📋 تدقيق الجودة' : '📋 Quality Audit'}</option>
            <option value="INCIDENT">{isAr ? '🚨 حادث تشغيلي' : '🚨 Incident'}</option>
          </select>
        </div>
      </div>

      {/* CAPA Cards List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredCapas.length === 0 ? (
          <div className="bg-white dark:bg-slate-800/80 p-12 rounded-2xl border border-slate-200 dark:border-slate-700 text-center text-slate-400">
            <span className="text-4xl mb-3 block opacity-30">✅</span>
            <p className="font-bold text-sm">
              {isAr ? 'لا توجد سجلات CAPA مطابقة للتصفية' : 'No CAPA records found matching criteria'}
            </p>
          </div>
        ) : (
          <StaggerGrid className="grid grid-cols-1 gap-4">
            {filteredCapas.map(capa => {
              const currentStageIdx = getStatusStageIndex(capa.status);
              const isCritical = capa.priority === 'CRITICAL';
              const isClosed = capa.status === 'CLOSED';

              return (
                <motion.div
                  key={capa.id}
                  variants={staggerChild}
                  className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-5 shadow-sm hover:shadow-md transition-all space-y-4 content-visibility-auto transform-gpu"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-700">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-slate-900 dark:text-white text-base">
                          {capa.title}
                        </span>
                        <span className="font-mono text-xs px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold">
                          #{capa.id}
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
                          {capa.source === 'NCR' ? '⚠️ NCR' : capa.source === 'COMPLAINT' ? '🤖 AI COMPLAINT' : '📋 ' + capa.source} {capa.sourceRefId ? `(${capa.sourceRefId})` : ''}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                        <span className="flex items-center gap-1">
                          <span>🏢</span>
                          <span>{capa.dept}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span>👤</span>
                          <span>{capa.assignedTo}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span>📅</span>
                          <span>{isAr ? 'المهلة:' : 'Target:'} {capa.targetDate}</span>
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
                        {isCritical ? '🚨 CRITICAL' : capa.priority === 'HIGH' ? '⚠️ HIGH' : capa.priority === 'MEDIUM' ? '⚡ MEDIUM' : '🛡️ LOW'}
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
                        {capa.status === 'CLOSED' ? '🔒 CLOSED' : capa.status === 'VERIFIED' ? '✅ VERIFIED' : capa.status === 'IMPLEMENTED' ? '⚙️ IMPLEMENTED' : capa.status === 'INVESTIGATION' ? '🔍 INVESTIGATION' : '⏳ OPEN'}
                      </Badge>
                    </div>
                  </div>

                  {/* Lifecycle Stepper */}
                  <div className="py-2">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 relative">
                      {[
                        { key: 'OPEN', labelAr: '1. ⏳ فتح التذكرة', labelEn: '1. ⏳ Open' },
                        { key: 'INVESTIGATION', labelAr: '2. 🔍 تحليل الأسباب (5-Whys)', labelEn: '2. 🔍 Root Cause' },
                        { key: 'IMPLEMENTED', labelAr: '3. ⚙️ تنفيذ الإجراء', labelEn: '3. ⚙️ Implemented' },
                        { key: 'VERIFIED', labelAr: '4. ✅ التحقق والقياس', labelEn: '4. ✅ Verified' },
                        { key: 'CLOSED', labelAr: '5. 🔒 إغلاق نهائي', labelEn: '5. 🔒 Closed' },
                      ].map((step, idx) => {
                        const isPassed = currentStageIdx >= idx;
                        const isCurrent = currentStageIdx === idx;
                        return (
                          <div key={step.key} className="flex flex-col items-center text-center gap-1.5">
                            <motion.div
                              animate={isCurrent ? { scale: [1, 1.15, 1] } : {}}
                              transition={{ repeat: Infinity, duration: 2 }}
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                isPassed
                                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-400'
                              } ${isCurrent ? 'ring-4 ring-emerald-500/20 scale-110' : ''}`}
                            >
                              {isPassed ? <span>✓</span> : idx + 1}
                            </motion.div>
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
                        <span>🔍</span>
                        <span>{isAr ? 'السبب الجذري (Root Cause):' : 'Root Cause (5-Whys):'}</span>
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                        {capa.rootCause}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <span>⚡</span>
                        <span>{isAr ? 'التصحيح الفوري (Corrective):' : 'Immediate Corrective:'}</span>
                      </span>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
                        {capa.correctiveAction}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <span>🛡️</span>
                        <span>{isAr ? 'الإجراء الوقائي طويل المدى (Preventive):' : 'Long-Term Preventive:'}</span>
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
                          <span>✅</span>
                          <span>{isAr ? `أغلق في ${capa.closedAt} بواسطة (${capa.verifiedBy})` : `Closed on ${capa.closedAt} by ${capa.verifiedBy}`}</span>
                        </span>
                      )}
                      {capa.effectivenessRating && (
                        <div className="flex items-center gap-0.5 text-amber-500 text-xs">
                          {[...Array(capa.effectivenessRating)].map((_, i) => (
                            <span key={i}>⭐</span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 flex-wrap justify-end">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShareWhatsApp(capa)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                      >
                        <span>📲</span>
                        <span>{isAr ? 'واتساب' : 'Share'}</span>
                      </motion.button>

                      {/* Progress Workflow Buttons */}
                      {capa.status === 'OPEN' && (
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateCapaStatus(capa.id, 'INVESTIGATION')}
                          className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <span>🔍</span>
                          <span>{isAr ? 'بدء التحقيق (5-Whys)' : 'Start Investigation'}</span>
                        </motion.button>
                      )}

                      {capa.status === 'INVESTIGATION' && (
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateCapaStatus(capa.id, 'IMPLEMENTED')}
                          className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <span>⚙️</span>
                          <span>{isAr ? 'تم تطبيق الإجراءات' : 'Mark Implemented'}</span>
                        </motion.button>
                      )}

                      {capa.status === 'IMPLEMENTED' && (
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setVerifyModalCapa(capa)}
                          className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <span>✅</span>
                          <span>{isAr ? 'تدقيق الفعالية والإغلاق' : 'Verify & Close'}</span>
                        </motion.button>
                      )}

                      {capa.status === 'VERIFIED' && (
                        <motion.button
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateCapaStatus(capa.id, 'CLOSED')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <span>🔒</span>
                          <span>{isAr ? 'إغلاق نهائي' : 'Final Close'}</span>
                        </motion.button>
                      )}

                      {isClosed && (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => updateCapaStatus(capa.id, 'OPEN')}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <span>🔄</span>
                          <span>{isAr ? 'إعادة فتح' : 'Re-Open'}</span>
                        </motion.button>
                      )}

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (confirm(isAr ? 'هل أنت متأكد من حذف هذا السجل؟' : 'Delete this CAPA?')) {
                            deleteCapa(capa.id);
                          }
                        }}
                        className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-rose-50 dark:bg-slate-700 dark:hover:bg-rose-900/30 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-all"
                      >
                        <span className="text-xs">🗑️</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </StaggerGrid>
        )}
      </div>

      {/* Add New CAPA Modal with AnimatedModal */}
      <AnimatedModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} className="max-w-2xl">
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[85dvh] overflow-y-auto overscroll-y-contain [touch-action:pan-y] [-webkit-overflow-scrolling:touch]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-md">
                <span className="text-sm">➕</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isAr ? 'فتح تذكرة إجراء تصحيحي ووقائي (CAPA Master Record)' : 'Create CAPA Master Record'}
              </h3>
            </div>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
            >
              <i className="fa-solid fa-xmark text-sm"></i>
            </button>
          </div>

          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '📝 عنوان الإجراء التصحيحي *' : '📝 CAPA Title / Summary *'}
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
                  {isAr ? '📑 المصدر' : '📑 Source'}
                </label>
                <select
                  value={newCapaForm.source}
                  onChange={e => setNewCapaForm({ ...newCapaForm, source: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="NCR">{isAr ? '⚠️ NCR (مذكرة عدم مطابقة)' : '⚠️ NCR'}</option>
                  <option value="COMPLAINT">{isAr ? '🤖 COMPLAINT (شكوى عميل / ذكاء اصطناعي)' : '🤖 COMPLAINT'}</option>
                  <option value="AUDIT">{isAr ? '📋 AUDIT (تدقيق دوري)' : '📋 AUDIT'}</option>
                  <option value="INCIDENT">{isAr ? '🚨 INCIDENT (حادث تشغيلي / طارئ)' : '🚨 INCIDENT'}</option>
                  <option value="INSPECTION">{isAr ? '🔍 INSPECTION (تفتيش خارجي)' : '🔍 INSPECTION'}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '📜 رقم التذكرة المرجعية' : '📜 Source Reference ID'}
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
                  {isAr ? '🏢 القسم المعني *' : '🏢 Department *'}
                </label>
                <select
                  required
                  value={newCapaForm.deptKey}
                  onChange={e => setNewCapaForm({ ...newCapaForm, deptKey: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="">{isAr ? '🏢 -- اختر القسم --' : '🏢 -- Select Dept --'}</option>
                  {sectorDeptKeys.map(key => (
                    <option key={key} value={key}>
                      {DEPARTMENTS[key]?.[isAr ? 'ar' : 'en'] || key}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '👤 المسؤول المكلف بالتنفيذ' : '👤 Assigned Owner'}
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
                  {isAr ? 'Priority Level' : 'Priority Level'}
                </label>
                <select
                  value={newCapaForm.priority}
                  onChange={e => setNewCapaForm({ ...newCapaForm, priority: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="CRITICAL">{isAr ? '🚨 حرجة للغاية (Critical 24-48h)' : 'Critical (24-48h)'}</option>
                  <option value="HIGH">{isAr ? '⚠️ عالية (High 5-7 Days)' : 'High (5-7 Days)'}</option>
                  <option value="MEDIUM">{isAr ? '⚡ متوسطة (Medium 14 Days)' : 'Medium (14 Days)'}</option>
                  <option value="LOW">{isAr ? '🛡️ منخفضة (Low 30 Days)' : 'Low (30 Days)'}</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '📅 الموعد المستهدف للإغلاق' : '📅 Target SLA Date'}
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
                {isAr ? '🔍 تحليل السبب الجذري (Root Cause Analysis / 5-Whys)' : '🔍 Root Cause Analysis (5-Whys)'}
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
                  {isAr ? '⚡ الإجراء التصحيحي العاجل (Corrective)' : '⚡ Immediate Corrective Action'}
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
                  {isAr ? '🛡️ الإجراء الوقائي الدائم (Preventive)' : '🛡️ Permanent Preventive Action'}
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
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span>❌</span>
                <span>{isAr ? 'إلغاء' : 'Cancel'}</span>
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-white text-xs font-bold shadow-md shadow-rose-500/20 flex items-center gap-1.5"
              >
                <span>💾</span>
                <span>{isAr ? 'إنشاء وقيد ملف CAPA' : 'Create & Assign CAPA'}</span>
              </motion.button>
            </div>
          </form>
        </div>
      </AnimatedModal>

      {/* Verify & Close Modal with AnimatedModal */}
      <AnimatedModal isOpen={!!verifyModalCapa} onClose={() => setVerifyModalCapa(null)} className="max-w-lg">
        {verifyModalCapa && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[85dvh] overflow-y-auto overscroll-y-contain [touch-action:pan-y] [-webkit-overflow-scrolling:touch]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md">
                  <span className="text-sm">✅</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isAr ? 'التحقق من الفعالية والإغلاق النهائي' : 'Effectiveness Verification & Closure'}
                </h3>
              </div>
              <button
                onClick={() => setVerifyModalCapa(null)}
                className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
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
                  #{verifyModalCapa.id} | 🏢 {verifyModalCapa.dept}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '✍️ اسم المدقق / المعتمد المسؤول *' : '✍️ Lead Auditor / Verifier Name *'}
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
                  {isAr ? '⭐ تقييم فعالية الإجراء المطبق (Effectiveness Rating)' : '⭐ Effectiveness Score'}
                </label>
                <div className="flex items-center justify-center gap-3 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  {[1, 2, 3, 4, 5].map(star => (
                    <motion.button
                      whileHover={{ scale: 1.25, rotate: 8 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      key={star}
                      onClick={() => setVerifyRating(star)}
                      className={`text-2xl transition-colors ${
                        star <= verifyRating ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'
                      }`}
                    >
                      <i className="fa-solid fa-star"></i>
                    </motion.button>
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
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  <span>❌</span>
                  <span>{isAr ? 'إلغاء' : 'Cancel'}</span>
                </button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-500/20 flex items-center gap-1.5"
                >
                  <span>✅</span>
                  <span>{isAr ? 'اعتماد الإغلاق النهائي وتوثيقه' : 'Confirm Closure'}</span>
                </motion.button>
              </div>
            </form>
          </div>
        )}
      </AnimatedModal>
    </AnimatedPage>
  );
};
