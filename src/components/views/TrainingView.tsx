'use client';

import React, { useState } from 'react';
import { useAudit } from '../../context/AuditContext';
import { TrainingRecord } from '../../types';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { SECTOR_DEPARTMENTS, DEPARTMENTS } from '../../data';
import { exportToCsv } from '../../utils/export';

export const TrainingView: React.FC = () => {
  const {
    isAr,
    currentSector,
    trainings,
    addTrainingRecord,
    updateTrainingRecord,
    deleteTrainingRecord,
    dispatchWhatsApp,
    showToast,
  } = useAudit();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourseType, setFilterCourseType] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [previewPassRecord, setPreviewPassRecord] = useState<TrainingRecord | null>(null);

  const sectorDeptKeys = SECTOR_DEPARTMENTS[currentSector] || [];

  // Form State
  const [newTraining, setNewTraining] = useState({
    courseName: '',
    courseType: 'HACCP',
    employeeName: '',
    employeeId: '',
    deptKey: '',
    completionDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    score: 95,
    trainer: '',
    passIssued: true,
  });

  const filteredTrainings = trainings.filter(t => {
    const matchesSearch =
      t.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.trainer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterCourseType === 'ALL' || t.courseType === filterCourseType;
    const matchesStatus = filterStatus === 'ALL' || t.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  // KPI Calculations
  const totalEmployees = trainings.length;
  const validCerts = trainings.filter(t => t.status === 'VALID').length;
  const expiringSoon = trainings.filter(t => t.status === 'EXPIRING_SOON').length;
  const expiredCount = trainings.filter(t => t.status === 'EXPIRED').length;
  const complianceRate =
    totalEmployees > 0 ? Math.round(((validCerts + expiringSoon) / totalEmployees) * 100) : 100;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTraining.employeeName.trim() || !newTraining.courseName.trim() || !newTraining.deptKey) {
      showToast(
        isAr ? 'يرجى إكمال بيانات الموظف والدورة والقسم' : 'Please fill all required training details',
        'warning'
      );
      return;
    }

    const deptName = DEPARTMENTS[newTraining.deptKey]?.[isAr ? 'ar' : 'en'] || newTraining.deptKey;

    let computedStatus: 'VALID' | 'EXPIRING_SOON' | 'EXPIRED' = 'VALID';
    const expTime = new Date(newTraining.expiryDate).getTime();
    const now = Date.now();
    const daysLeft = (expTime - now) / (1000 * 60 * 60 * 24);

    if (daysLeft < 0) {
      computedStatus = 'EXPIRED';
    } else if (daysLeft < 30) {
      computedStatus = 'EXPIRING_SOON';
    }

    addTrainingRecord({
      courseName: newTraining.courseName,
      courseType: newTraining.courseType,
      employeeName: newTraining.employeeName,
      employeeId: newTraining.employeeId || `EMP-${Date.now().toString().slice(-4)}`,
      dept: deptName,
      completionDate: newTraining.completionDate,
      expiryDate: newTraining.expiryDate,
      score: Number(newTraining.score) || 85,
      status: computedStatus,
      trainer: newTraining.trainer || (isAr ? 'مدرب الجودة المعتمد' : 'Certified QA Trainer'),
      passIssued: newTraining.passIssued,
    });

    setIsAddModalOpen(false);
    setNewTraining({
      courseName: '',
      courseType: 'HACCP',
      employeeName: '',
      employeeId: '',
      deptKey: '',
      completionDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      score: 95,
      trainer: '',
      passIssued: true,
    });
  };

  const handleRenewCertification = (rec: TrainingRecord) => {
    const nextYear = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];

    updateTrainingRecord(rec.id, {
      completionDate: today,
      expiryDate: nextYear,
      status: 'VALID',
      passIssued: true,
    });

    showToast(
      isAr
        ? `تم تجديد شهادة الموظف (${rec.employeeName}) لمدة عام كامل بنجاح`
        : `Certification renewed for (${rec.employeeName}) for 1 year`,
      'success'
    );
  };

  const handleShareWhatsAppReminder = (rec: TrainingRecord) => {
    const msg = isAr
      ? `*تنبيه موعد تجديد دورة الجودة والكفاءة التدريبية*\nالموظف: ${rec.employeeName} (${rec.employeeId})\nالقسم: ${rec.dept}\nالدورة: ${rec.courseName}\nحالة الشهادة: ${rec.status === 'EXPIRED' ? 'منتهية الصلاحية (مطلوب إعادة التدريب فوراً)' : 'تقترب من الانتهاء'}\nتاريخ الانتهاء: ${rec.expiryDate}\nيرجى التنسيق مع إدارة الجودة لحضور الجلسة التنشيطية.`
      : `*Training & Competency Renewal Notice*\nEmployee: ${rec.employeeName} (${rec.employeeId})\nDept: ${rec.dept}\nCourse: ${rec.courseName}\nStatus: ${rec.status}\nExpiry Date: ${rec.expiryDate}\nPlease schedule refresher training.`;

    dispatchWhatsApp(msg);
  };

  const handleExportCsv = () => {
    const headers = [
      isAr ? 'كود السجل' : 'Record ID',
      isAr ? 'اسم الموظف' : 'Employee Name',
      isAr ? 'الرقم الوظيفي' : 'Employee ID',
      isAr ? 'القسم' : 'Department',
      isAr ? 'الدورة التدريبية' : 'Course Name',
      isAr ? 'نوع التدريب' : 'Course Type',
      isAr ? 'تاريخ الإتمام' : 'Completion Date',
      isAr ? 'تاريخ الانتهاء' : 'Expiry Date',
      isAr ? 'الدرجة (%)' : 'Score (%)',
      isAr ? 'الحالة' : 'Status',
      isAr ? 'المدرب / الجهة' : 'Trainer',
      isAr ? 'بطاقة الكفاءة' : 'Pass Issued',
    ];

    const rows = filteredTrainings.map(t => [
      t.id,
      t.employeeName,
      t.employeeId,
      t.dept,
      t.courseName,
      t.courseType,
      t.completionDate,
      t.expiryDate,
      t.score,
      t.status,
      t.trainer,
      t.passIssued ? 'YES' : 'NO',
    ]);

    exportToCsv(`Training_Matrix_Report_${Date.now()}`, headers, rows);
    showToast(isAr ? 'تم تصدير سجل التدريب والكفاءة بنجاح' : 'Exported Training Matrix to CSV', 'success');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
            <i className="fa-solid fa-graduation-cap text-lg"></i>
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              {isAr ? 'مصفوفة التدريب وسجل كفاءة العاملين والشهادات الصحية' : 'Training & Competency Matrix & Hygiene Passes'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isAr
                ? 'تتبع دورات سلامة الغذاء (HACCP)، الكيماويات (OSHA)، والنظافة وإصدار بطاقات الكفاءة المهنية'
                : 'Track HACCP, OSHA, Hygiene training validity, and issue staff digital passes'}
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
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 active:scale-95"
          >
            <i className="fa-solid fa-user-plus"></i>
            {isAr ? 'تسجيل دورة تدريبية' : 'Log Training'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={isAr ? 'نسبة الامتثال للتدريب' : 'Training Compliance'}
          value={`${complianceRate}%`}
          subtitle={isAr ? `إجمالي السجلات: ${totalEmployees}` : `Total records: ${totalEmployees}`}
          icon={<i className="fa-solid fa-chart-line text-xl"></i>}
          variant="emerald"
        />
        <StatCard
          title={isAr ? 'شهادات سارية المفعول' : 'Active Certifications'}
          value={validCerts}
          subtitle={isAr ? 'كفاءة معتمدة واجتياز للاختبار' : 'Valid and compliant'}
          icon={<i className="fa-solid fa-id-card-clip text-xl"></i>}
          variant="teal"
        />
        <StatCard
          title={isAr ? 'تستحق التجديد قريباً (<30 يوم)' : 'Expiring Soon (<30d)'}
          value={expiringSoon}
          subtitle={isAr ? 'يتطلب جدولة دورة تنشيطية' : 'Refresher needed'}
          icon={<i className="fa-solid fa-hourglass-half text-xl"></i>}
          variant="amber"
        />
        <StatCard
          title={isAr ? 'شهادات منتهية الصلاحية' : 'Expired / Non-Compliant'}
          value={expiredCount}
          subtitle={isAr ? 'حظر العمل المباشر لحين التجديد' : 'Immediate action required'}
          icon={<i className="fa-solid fa-triangle-exclamation text-xl"></i>}
          variant={expiredCount > 0 ? 'rose' : 'sky'}
        />
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm">
        <div className="relative flex-1">
          <i className="fa-solid fa-magnifying-glass absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5 text-slate-400 text-sm"></i>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={
              isAr
                ? 'بحث باسم الموظف، الرقم الوظيفي، اسم الدورة، القسم، أو المدرب...'
                : 'Search by employee, ID, course, dept, or trainer...'
            }
            className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={filterCourseType}
            onChange={e => setFilterCourseType(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none"
          >
            <option value="ALL">{isAr ? 'جميع مسارات التدريب' : 'All Course Types'}</option>
            <option value="HACCP">HACCP (سلامة الغذاء)</option>
            <option value="HYGIENE">{isAr ? 'النظافة الشخصية والاشتراطات الصحية' : 'GHP Hygiene'}</option>
            <option value="OSHA">OSHA (السلامة المهنية والكيماويات)</option>
            <option value="FIRE_SAFETY">{isAr ? 'مكافحة الحرائق والإخلاء' : 'Fire Safety'}</option>
            <option value="FIRST_AID">{isAr ? 'الإسعافات الأولية' : 'First Aid'}</option>
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none"
          >
            <option value="ALL">{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="VALID">{isAr ? 'سارية المفعول (Valid)' : 'Valid'}</option>
            <option value="EXPIRING_SOON">{isAr ? 'توشك على الانتهاء (Expiring)' : 'Expiring Soon'}</option>
            <option value="EXPIRED">{isAr ? 'منتهية الصلاحية (Expired)' : 'Expired'}</option>
          </select>
        </div>
      </div>

      {/* Trainings Table */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 text-start">{isAr ? 'الموظف والرقم الوظيفي' : 'Employee & ID'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'القسم والدورة التدريبية' : 'Department & Course'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? 'الدرجة والتقييم' : 'Score'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'صلاحية الشهادة' : 'Validity & Expiry'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? 'الحالة' : 'Status'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? 'إجراءات وبطاقة الكفاءة' : 'Actions & Pass'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
              {filteredTrainings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <i className="fa-solid fa-user-graduate text-3xl opacity-40"></i>
                      <p>{isAr ? 'لا توجد سجلات تدريب مطابقة لبحثك' : 'No training records found'}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTrainings.map(rec => {
                  const isExpired = rec.status === 'EXPIRED';
                  const isExpiring = rec.status === 'EXPIRING_SOON';

                  return (
                    <tr
                      key={rec.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                    >
                      {/* Employee Info */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-sm">
                              {rec.employeeName}
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                            {rec.employeeId}
                          </p>
                        </div>
                      </td>

                      {/* Course & Dept */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-800 dark:text-slate-200">
                            {rec.courseName}
                          </p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                              {rec.dept}
                            </span>
                            <Badge
                              variant={
                                rec.courseType === 'HACCP'
                                  ? 'emerald'
                                  : rec.courseType === 'OSHA'
                                  ? 'amber'
                                  : rec.courseType === 'FIRE_SAFETY'
                                  ? 'rose'
                                  : 'sky'
                              }
                              size="sm"
                            >
                              {rec.courseType}
                            </Badge>
                          </div>
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`font-black font-mono text-sm ${
                            rec.score >= 90
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : rec.score >= 80
                              ? 'text-sky-600 dark:text-sky-400'
                              : 'text-amber-600 dark:text-amber-400'
                          }`}
                        >
                          {rec.score}%
                        </span>
                      </td>

                      {/* Validity Dates */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5 text-[11px]">
                          <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <span>{isAr ? 'الإتمام:' : 'Completed:'}</span>
                            <span className="font-mono text-slate-700 dark:text-slate-300">{rec.completionDate}</span>
                          </p>
                          <p
                            className={`font-bold flex items-center gap-1 ${
                              isExpired
                                ? 'text-rose-600 dark:text-rose-400'
                                : isExpiring
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-emerald-600 dark:text-emerald-400'
                            }`}
                          >
                            <span>{isAr ? 'الانتهاء:' : 'Expires:'}</span>
                            <span className="font-mono">{rec.expiryDate}</span>
                          </p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        <Badge
                          variant={
                            rec.status === 'VALID'
                              ? 'emerald'
                              : rec.status === 'EXPIRING_SOON'
                              ? 'amber'
                              : 'rose'
                          }
                          size="md"
                        >
                          {rec.status}
                        </Badge>
                      </td>

                      {/* Actions & Digital Pass */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setPreviewPassRecord(rec)}
                            title={isAr ? 'عرض وطباعة بطاقة الكفاءة والصحة' : 'Digital Competency Pass'}
                            className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                          >
                            <i className="fa-solid fa-id-badge"></i>
                            <span>{isAr ? 'البطاقة' : 'Pass'}</span>
                          </button>

                          <button
                            onClick={() => handleRenewCertification(rec)}
                            title={isAr ? 'تجديد الشهادة لعام إضافي' : 'Renew for 1 year'}
                            className="w-7 h-7 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-all shadow-sm"
                          >
                            <i className="fa-solid fa-rotate-right text-xs"></i>
                          </button>

                          {(isExpired || isExpiring) && (
                            <button
                              onClick={() => handleShareWhatsAppReminder(rec)}
                              title={isAr ? 'إرسال تنبيه تجديد واتساب' : 'WhatsApp Reminder'}
                              className="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-all shadow-sm"
                            >
                              <i className="fa-brands fa-whatsapp text-xs"></i>
                            </button>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(isAr ? 'هل أنت متأكد من حذف هذا السجل التدريبي؟' : 'Delete this record?')) {
                                deleteTrainingRecord(rec.id);
                              }
                            }}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-50 dark:bg-slate-700 dark:hover:bg-rose-900/30 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-all"
                          >
                            <i className="fa-solid fa-trash text-xs"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Training Record Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-xl w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isAr ? 'تسجيل دورة تدريبية واعتماد كفاءة موظف' : 'Log Employee Training & Certification'}
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
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'اسم الموظف *' : 'Employee Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTraining.employeeName}
                    onChange={e => setNewTraining({ ...newTraining, employeeName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={isAr ? 'مثال: محمد سالم الدوسري' : 'e.g. John Doe'}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'الرقم الوظيفي' : 'Employee ID'}
                  </label>
                  <input
                    type="text"
                    value={newTraining.employeeId}
                    onChange={e => setNewTraining({ ...newTraining, employeeId: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="EMP-4421"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'اسم الدورة التدريبية *' : 'Course Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newTraining.courseName}
                    onChange={e => setNewTraining({ ...newTraining, courseName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={isAr ? 'مثال: سلامة الأغذية وتطبيق نظام الهاسب HACCP Level 3' : 'e.g. HACCP Food Safety Level 3'}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'نوع التدريب' : 'Course Type'}
                  </label>
                  <select
                    value={newTraining.courseType}
                    onChange={e => setNewTraining({ ...newTraining, courseType: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="HACCP">HACCP (سلامة الغذاء)</option>
                    <option value="HYGIENE">GHP (النظافة والاشتراطات الصحية)</option>
                    <option value="OSHA">OSHA (السلامة المهنية والكيماويات)</option>
                    <option value="FIRE_SAFETY">Fire Safety (مكافحة الحرائق)</option>
                    <option value="FIRST_AID">First Aid (الإسعافات الأولية)</option>
                    <option value="ISO">ISO Standards (أنظمة الجودة)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'القسم التابع له *' : 'Department *'}
                  </label>
                  <select
                    required
                    value={newTraining.deptKey}
                    onChange={e => setNewTraining({ ...newTraining, deptKey: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">{isAr ? '-- اختر القسم --' : '-- Select Dept --'}</option>
                    {sectorDeptKeys.map(k => (
                      <option key={k} value={k}>
                        {DEPARTMENTS[k]?.[isAr ? 'ar' : 'en'] || k}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'تاريخ الإتمام' : 'Completion Date'}
                  </label>
                  <input
                    type="date"
                    value={newTraining.completionDate}
                    onChange={e => setNewTraining({ ...newTraining, completionDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'تاريخ انتهاء الصلاحية' : 'Expiry Date'}
                  </label>
                  <input
                    type="date"
                    value={newTraining.expiryDate}
                    onChange={e => setNewTraining({ ...newTraining, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'درجة الاختبار (%)' : 'Score (%)'}
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={newTraining.score}
                    onChange={e => setNewTraining({ ...newTraining, score: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'المدرب / جهة الاعتماد' : 'Trainer / Institution'}
                  </label>
                  <input
                    type="text"
                    value={newTraining.trainer}
                    onChange={e => setNewTraining({ ...newTraining, trainer: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder={isAr ? 'مثال: أكاديمية سلامة الغذاء الدولية' : 'e.g. Food Safety Academy'}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="issuePass"
                  checked={newTraining.passIssued}
                  onChange={e => setNewTraining({ ...newTraining, passIssued: e.target.checked })}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="issuePass" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                  {isAr ? 'إصدار بطاقة كفاءة صحية ومهنية رقمية فورية للموظف' : 'Issue digital competency hygiene pass'}
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
                >
                  {isAr ? 'حفظ وتوثيق الكفاءة' : 'Save & Issue Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Digital Competency Pass Preview Modal */}
      {previewPassRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-md w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <i className="fa-solid fa-id-card text-emerald-500"></i>
                {isAr ? 'بطاقة الكفاءة والشهادة الصحية الرقمية' : 'Digital Competency & Hygiene Pass'}
              </h3>
              <button
                onClick={() => setPreviewPassRecord(null)}
                className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            {/* Badge Card Layout (Printable) */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-sm">
                    Q
                  </div>
                  <div>
                    <h4 className="text-xs font-black tracking-wider uppercase">
                      {isAr ? 'لوحة التدقيق الرقمية' : 'Digital Audit Panel'}
                    </h4>
                    <p className="text-[10px] text-emerald-400 font-bold">
                      {isAr ? 'اعتماد الجودة والسلامة المهنية' : 'Verified QA Competency'}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                  {previewPassRecord.employeeId}
                </span>
              </div>

              <div className="py-2 border-y border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-black text-white">{previewPassRecord.employeeName}</p>
                  <p className="text-xs text-slate-400">{previewPassRecord.dept}</p>
                </div>
                <div className="text-end">
                  <span className="text-xl font-black font-mono text-emerald-400">
                    {previewPassRecord.score}%
                  </span>
                  <p className="text-[9px] text-slate-400 uppercase font-bold">PASS SCORE</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-200">{previewPassRecord.courseName}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{isAr ? 'المدرب:' : 'Trainer:'} {previewPassRecord.trainer}</span>
                  <span className="text-emerald-400 font-mono font-bold">
                    EXP: {previewPassRecord.expiryDate}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-[10px] text-slate-400">
                <div className="flex items-center gap-1 text-emerald-400">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>{isAr ? 'مصرح بالعمل التشغيلي' : 'Authorized Personnel'}</span>
                </div>
                <span className="font-mono">{previewPassRecord.id}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setPreviewPassRecord(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold"
              >
                {isAr ? 'إغلاق' : 'Close'}
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-emerald-500/20"
              >
                <i className="fa-solid fa-print"></i>
                {isAr ? 'طباعة البطاقة' : 'Print Badge'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
