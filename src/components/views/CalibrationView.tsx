'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAudit } from '../../context/AuditContext';
import { CalibrationRecord } from '../../types';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { AnimatedPage, StaggerGrid } from '../common/AnimatedPage';
import { AnimatedModal } from '../common/AnimatedModal';
import { SECTOR_DEPARTMENTS, DEPARTMENTS } from '../../data';
import { exportToCsv } from '../../utils/export';
import { staggerChild, tableRowVariants } from '../../utils/animations';

export const CalibrationView: React.FC = () => {
  const {
    isAr,
    currentSector,
    calibrations,
    addCalibrationRecord,
    updateCalibrationRecord,
    deleteCalibrationRecord,
    dispatchWhatsApp,
    showToast,
  } = useAudit();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterDept, setFilterDept] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tagModalRecord, setTagModalRecord] = useState<CalibrationRecord | null>(null);

  const sectorDeptKeys = SECTOR_DEPARTMENTS[currentSector] || [];

  // New Calibration Form State
  const [newCalForm, setNewCalForm] = useState({
    equipmentName: '',
    equipmentCode: '',
    deptKey: '',
    location: '',
    lastCalibrationDate: new Date().toISOString().split('T')[0],
    nextCalibrationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    calibratedBy: '',
    certificateNumber: '',
    acceptableTolerance: '±0.5°C',
    status: 'VALID' as 'VALID' | 'DUE_SOON' | 'OVERDUE' | 'OUT_OF_SERVICE',
    notes: '',
  });

  const filteredCalibrations = calibrations.filter(c => {
    const matchesSearch =
      c.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.equipmentCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.calibratedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    const matchesDept = filterDept === 'ALL' || c.dept === filterDept;

    return matchesSearch && matchesStatus && matchesDept;
  });

  // KPI Calculations
  const totalEquipment = calibrations.length;
  const validCount = calibrations.filter(c => c.status === 'VALID').length;
  const dueSoonCount = calibrations.filter(c => c.status === 'DUE_SOON').length;
  const overdueCount = calibrations.filter(
    c => c.status === 'OVERDUE' || c.status === 'OUT_OF_SERVICE'
  ).length;
  const calibrationCompliance =
    totalEquipment > 0 ? Math.round(((validCount + dueSoonCount) / totalEquipment) * 100) : 100;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCalForm.equipmentName.trim() || !newCalForm.equipmentCode.trim() || !newCalForm.deptKey) {
      showToast(
        isAr ? 'يرجى إدخال اسم الجهاز وكوده وتحديد القسم' : 'Please fill all required equipment details',
        'warning'
      );
      return;
    }

    const deptName = DEPARTMENTS[newCalForm.deptKey]?.[isAr ? 'ar' : 'en'] || newCalForm.deptKey;

    let computedStatus = newCalForm.status;
    const nextTime = new Date(newCalForm.nextCalibrationDate).getTime();
    const now = Date.now();
    const daysLeft = (nextTime - now) / (1000 * 60 * 60 * 24);

    if (daysLeft < 0) {
      computedStatus = 'OVERDUE';
    } else if (daysLeft < 30) {
      computedStatus = 'DUE_SOON';
    }

    addCalibrationRecord({
      equipmentName: newCalForm.equipmentName,
      equipmentCode: newCalForm.equipmentCode,
      dept: deptName,
      location: newCalForm.location || (isAr ? 'الموقع الرئيسي' : 'Main Area'),
      lastCalibrationDate: newCalForm.lastCalibrationDate,
      nextCalibrationDate: newCalForm.nextCalibrationDate,
      calibratedBy: newCalForm.calibratedBy || (isAr ? 'مختبر المعايرة المعتمد' : 'Accredited Calibration Lab'),
      certificateNumber: newCalForm.certificateNumber || `CERT-${Date.now().toString().slice(-5)}`,
      acceptableTolerance: newCalForm.acceptableTolerance,
      status: computedStatus,
      notes: newCalForm.notes,
    });

    setIsAddModalOpen(false);
    setNewCalForm({
      equipmentName: '',
      equipmentCode: '',
      deptKey: '',
      location: '',
      lastCalibrationDate: new Date().toISOString().split('T')[0],
      nextCalibrationDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      calibratedBy: '',
      certificateNumber: '',
      acceptableTolerance: '±0.5°C',
      status: 'VALID',
      notes: '',
    });

    showToast(
      isAr ? 'تمت إضافة جهاز القياس بنجاح' : 'Equipment registered successfully',
      'success'
    );
  };

  const handleQuickRecalibrate = (cal: CalibrationRecord) => {
    const today = new Date().toISOString().split('T')[0];
    const nextDue = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    updateCalibrationRecord(cal.id, {
      lastCalibrationDate: today,
      nextCalibrationDate: nextDue,
      status: 'VALID',
      certificateNumber: `REC-${Date.now().toString().slice(-5)}`,
    });
    showToast(
      isAr ? `تم تحديث معايرة الجهاز [${cal.equipmentCode}] بنجاح لمدة 6 أشهر` : `Re-calibrated [${cal.equipmentCode}] for 6 months`,
      'success'
    );
  };

  const handleShareWhatsApp = (cal: CalibrationRecord) => {
    const msg = isAr
      ? `*تنبيه استحقاق معايرة أجهزة القياس*\nالجهاز: ${cal.equipmentName} (${cal.equipmentCode})\nالقسم: ${cal.dept} - ${cal.location}\nالحالة: ${cal.status}\nتاريخ الاستحقاق: ${cal.nextCalibrationDate}\nنسبة السماحية: ${cal.acceptableTolerance}\nشهادة الفحص: ${cal.certificateNumber}\nيرجى التنسيق لإجراء المعايرة وتحديث السجل.`
      : `*Calibration Alert & Notice*\nEquipment: ${cal.equipmentName} (${cal.equipmentCode})\nDept: ${cal.dept} - ${cal.location}\nStatus: ${cal.status}\nNext Due: ${cal.nextCalibrationDate}\nTolerance: ${cal.acceptableTolerance}\nCert Ref: ${cal.certificateNumber}\nPlease coordinate scheduled verification.`;
    dispatchWhatsApp(msg);
  };

  const handleExportCsv = () => {
    const headers = [
      isAr ? 'كود الجهاز' : 'Code',
      isAr ? 'اسم الجهاز' : 'Name',
      isAr ? 'القسم' : 'Department',
      isAr ? 'الموقع' : 'Location',
      isAr ? 'رقم الشهادة' : 'Cert No',
      isAr ? 'جهة المعايرة' : 'Lab',
      isAr ? 'نسبة السماحية' : 'Tolerance',
      isAr ? 'آخر معايرة' : 'Last Cal',
      isAr ? 'المعايرة القادمة' : 'Next Due',
      isAr ? 'الحالة' : 'Status',
    ];
    const rows = filteredCalibrations.map(c => [
      c.equipmentCode,
      c.equipmentName,
      c.dept,
      c.location,
      c.certificateNumber,
      c.calibratedBy,
      c.acceptableTolerance,
      c.lastCalibrationDate,
      c.nextCalibrationDate,
      c.status,
    ]);
    exportToCsv(`Calibration_Log_${new Date().toISOString().split('T')[0]}`, headers, rows);
  };

  return (
    <AnimatedPage>
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-lg">
            <span>⚖️</span>
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'سجل معايرة الأجهزة والمجسات الدورية (Metrology)' : 'Equipment Calibration & Metrology Log'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isAr
                ? 'متابعة المجسات، موازين المختبر، مسجلات الحرارة الرقمية، ومطابقتها لمواصفات ISO 17025 و SASO'
                : 'Manage calibration dates, cert numbers, tolerance thresholds, and stickers'}
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
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
          >
            <span>➕</span>
            {isAr ? 'قيد جهاز قياس' : 'Add Instrument'}
          </motion.button>
        </div>
      </div>

      {/* KPI Cards */}
      <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={isAr ? '🎯 نسبة جاهزية المعايرة' : '🎯 Calibration Readiness'}
          value={`${calibrationCompliance}%`}
          subtitle={isAr ? `إجمالي الأجهزة: ${totalEquipment}` : `Total instruments: ${totalEquipment}`}
          icon={<span className="text-xl">🎯</span>}
          variant="sky"
        />
        <StatCard
          title={isAr ? '✅ أجهزة مطابقة ومعايرة' : '✅ Valid & Calibrated'}
          value={validCount}
          subtitle={isAr ? 'شهادات قياسية سارية المفعول' : 'In-tolerance & certified'}
          icon={<span className="text-xl">✅</span>}
          variant="emerald"
        />
        <StatCard
          title={isAr ? '⏳ تستحق المعايرة قريباً' : '⏳ Due Soon (<30d)'}
          value={dueSoonCount}
          subtitle={isAr ? 'يتطلب التنسيق مع جهة الفحص' : 'Schedule re-calibration'}
          icon={<span className="text-xl">⏳</span>}
          variant="amber"
        />
        <StatCard
          title={isAr ? '⚠️ أجهزة متأخرة / خارج الخدمة' : '⚠️ Overdue / Out of Service'}
          value={overdueCount}
          subtitle={isAr ? 'يمنع استخدامها بالإنتاج نهائياً' : 'Do not use for production'}
          icon={<span className="text-xl">⚠️</span>}
          variant={overdueCount > 0 ? 'rose' : 'indigo'}
        />
      </StaggerGrid>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm transition-colors">
        <div className="relative flex-1">
          <span className="absolute top-3 left-3.5 rtl:left-auto rtl:right-3.5 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={
              isAr
                ? '🔍 بحث باسم الجهاز، كود الجهاز، القسم، الموقع، رقم الشهادة، أو جهة المعايرة...'
                : '🔍 Search by device name, tag code, dept, location, cert, or lab...'
            }
            className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-sky-500 outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <select
            value={filterDept}
            onChange={e => setFilterDept(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none transition-colors"
          >
            <option value="ALL">{isAr ? '🏢 جميع الأقسام' : '🏢 All Departments'}</option>
            {sectorDeptKeys.map(k => (
              <option key={k} value={DEPARTMENTS[k]?.[isAr ? 'ar' : 'en'] || k}>
                {DEPARTMENTS[k]?.[isAr ? 'ar' : 'en'] || k}
              </option>
            ))}
          </select>

          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none transition-colors"
          >
            <option value="ALL">{isAr ? '📑 جميع الحالات' : '📑 All Statuses'}</option>
            <option value="VALID">{isAr ? '✅ سارية المفعول (Valid)' : '✅ Valid'}</option>
            <option value="DUE_SOON">{isAr ? '⏳ مستحقة قريباً (Due Soon)' : '⏳ Due Soon'}</option>
            <option value="OVERDUE">{isAr ? '⚠️ متأخرة عن الموعد (Overdue)' : '⚠️ Overdue'}</option>
            <option value="OUT_OF_SERVICE">{isAr ? '🚫 خارج الخدمة (Out of Service)' : '🚫 Out of Service'}</option>
          </select>
        </div>
      </div>

      {/* Mobile Card List (< md) */}
      <div className="block md:hidden space-y-3.5">
        {filteredCalibrations.length === 0 ? (
          <div className="bg-white dark:bg-slate-800/80 rounded-2xl p-8 text-center text-slate-400 border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-3xl opacity-40 mb-2 block">⚖️</span>
            <p className="text-xs">{isAr ? 'لا توجد أجهزة قياس مطابقة للبحث' : 'No calibration records found'}</p>
          </div>
        ) : (
          <StaggerGrid className="space-y-3.5">
            {filteredCalibrations.map(cal => {
              const isOverdue = cal.status === 'OVERDUE' || cal.status === 'OUT_OF_SERVICE';
              const isDueSoon = cal.status === 'DUE_SOON';
              return (
                <motion.div
                  key={cal.id}
                  variants={staggerChild}
                  className="bg-white dark:bg-slate-800/80 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-700/80 shadow-sm space-y-3 transition-colors content-visibility-auto transform-gpu"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">🔬 {cal.equipmentName}</span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold">
                          #{cal.equipmentCode}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">🏢 {cal.dept} • 📍 {cal.location}</p>
                    </div>
                    <Badge
                      variant={
                        cal.status === 'VALID'
                          ? 'emerald'
                          : cal.status === 'DUE_SOON'
                          ? 'amber'
                          : 'rose'
                      }
                      size="sm"
                    >
                      {cal.status === 'VALID' ? '✅ VALID' : cal.status === 'DUE_SOON' ? '⏳ DUE SOON' : '⚠️ OVERDUE'}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{isAr ? '📜 شهادة / فحص:' : '📜 Cert / Lab:'}</span>
                      <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 block truncate">{cal.certificateNumber}</span>
                      <span className="text-[10px] text-slate-500 block truncate">{cal.calibratedBy}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">{isAr ? '📅 تاريخ الاستحقاق:' : '📅 Due Date:'}</span>
                      <span className={`font-bold font-mono ${
                        isOverdue ? 'text-rose-500' : isDueSoon ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        {cal.nextCalibrationDate}
                      </span>
                      <span className="text-[10px] text-slate-400 block">±{cal.acceptableTolerance}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setTagModalRecord(cal)}
                      className="px-2.5 py-1.5 rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400 text-xs font-bold flex items-center gap-1"
                    >
                      <span>🏷️</span>
                      <span>{isAr ? 'الملصق' : 'Tag'}</span>
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuickRecalibrate(cal)}
                      className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                      title={isAr ? 'معايرة' : 'Calibrate'}
                    >
                      <span className="text-xs">🔄</span>
                    </motion.button>
                    {(isOverdue || isDueSoon) && (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleShareWhatsApp(cal)}
                        className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
                        title={isAr ? 'واتساب' : 'WhatsApp'}
                      >
                        <span>📲</span>
                      </motion.button>
                    )}
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (confirm(isAr ? 'هل أنت متأكد من حذف هذا الجهاز؟' : 'Delete this record?')) {
                          deleteCalibrationRecord(cal.id);
                        }
                      }}
                      className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
                      title={isAr ? 'حذف' : 'Delete'}
                    >
                      <span className="text-xs">🗑️</span>
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </StaggerGrid>
        )}
      </div>

      {/* Desktop Equipment Table (>= md) */}
      <div className="hidden md:block bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm overflow-hidden backdrop-blur-sm transition-colors">
        <div className="overflow-x-auto [touch-action:pan-x] [-webkit-overflow-scrolling:touch]">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 text-start">{isAr ? '🔬 الجهاز والكود والموقع' : '🔬 Equipment & Code'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? '🏢 القسم المسؤول' : '🏢 Department'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? '📜 شهادة المعايرة وجهة الفحص' : '📜 Cert & Lab'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? '📏 نسبة السماحية' : '📏 Tolerance'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? '📅 تاريخ الاستحقاق' : '📅 Calibration Dates'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? '🛡️ الحالة' : '🛡️ Status'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? '🏷️ إجراءات وملصق المعايرة' : '🏷️ Actions & Tag'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
              {filteredCalibrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="text-3xl opacity-40">⚖️</span>
                      <p>{isAr ? 'لا توجد أجهزة قياس مطابقة للبحث' : 'No calibration records found'}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCalibrations.map(cal => {
                  const isOverdue = cal.status === 'OVERDUE' || cal.status === 'OUT_OF_SERVICE';
                  const isDueSoon = cal.status === 'DUE_SOON';

                  return (
                    <tr
                      key={cal.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                    >
                      {/* Equipment & Code */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-sm">
                              🔬 {cal.equipmentName}
                            </span>
                            <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-sky-50 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 font-bold border border-sky-200 dark:border-sky-800">
                              #{cal.equipmentCode}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <span>📍</span>
                            <span>{cal.location}</span>
                          </p>
                          {cal.notes && (
                            <p className="text-[10px] text-slate-400 italic">📝 {cal.notes}</p>
                          )}
                        </div>
                      </td>

                      {/* Dept */}
                      <td className="py-4 px-4">
                        <span className="text-slate-800 dark:text-slate-200 font-semibold">
                          🏢 {cal.dept}
                        </span>
                      </td>

                      {/* Cert & Calibrated By */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5 text-[11px]">
                          <p className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                            📜 {cal.certificateNumber}
                          </p>
                          <p className="text-slate-500 dark:text-slate-400">
                            🏛️ {cal.calibratedBy}
                          </p>
                        </div>
                      </td>

                      {/* Tolerance */}
                      <td className="py-4 px-4 text-center">
                        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          ±{cal.acceptableTolerance}
                        </span>
                      </td>

                      {/* Dates */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5 text-[11px]">
                          <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <span>{isAr ? 'آخر فحص:' : 'Last:'}</span>
                            <span className="font-mono text-slate-700 dark:text-slate-300">📅 {cal.lastCalibrationDate}</span>
                          </p>
                          <p
                            className={`font-bold flex items-center gap-1 ${
                              isOverdue
                                ? 'text-rose-600 dark:text-rose-400'
                                : isDueSoon
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-emerald-600 dark:text-emerald-400'
                            }`}
                          >
                            <span>{isAr ? 'الموعد القادم:' : 'Next Due:'}</span>
                            <span className="font-mono">📅 {cal.nextCalibrationDate}</span>
                          </p>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 text-center">
                        <Badge
                          variant={
                            cal.status === 'VALID'
                              ? 'emerald'
                              : cal.status === 'DUE_SOON'
                              ? 'amber'
                              : 'rose'
                          }
                          size="md"
                        >
                          {cal.status === 'VALID' ? '✅ VALID' : cal.status === 'DUE_SOON' ? '⏳ DUE SOON' : '⚠️ OVERDUE'}
                        </Badge>
                      </td>

                      {/* Actions & Tag */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setTagModalRecord(cal)}
                            title={isAr ? 'معاينة وطباعة ملصق المعايرة المعتمد' : 'Calibration Tag Sticker'}
                            className="px-2.5 py-1 rounded-lg bg-sky-50 hover:bg-sky-100 dark:bg-sky-900/30 dark:hover:bg-sky-900/50 text-sky-600 dark:text-sky-400 text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
                          >
                            <span>🏷️</span>
                            <span>{isAr ? 'الملصق' : 'Tag'}</span>
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleQuickRecalibrate(cal)}
                            title={isAr ? 'توثيق إجراء إعادة المعايرة' : 'Log Re-calibration'}
                            className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-all shadow-sm"
                          >
                            <span className="text-xs">🔄</span>
                          </motion.button>

                          {(isOverdue || isDueSoon) && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleShareWhatsApp(cal)}
                              title={isAr ? 'إرسال تنبيه واتساب لفريق الصيانة' : 'WhatsApp Alert'}
                              className="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 dark:bg-amber-900/30 dark:hover:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center transition-all shadow-sm"
                            >
                              <span>📲</span>
                            </motion.button>
                          )}

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => {
                              if (confirm(isAr ? 'هل أنت متأكد من حذف هذا الجهاز؟' : 'Delete this record?')) {
                                deleteCalibrationRecord(cal.id);
                              }
                            }}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-50 dark:bg-slate-700 dark:hover:bg-rose-900/30 text-slate-400 hover:text-rose-600 flex items-center justify-center transition-all"
                          >
                            <span className="text-xs">🗑️</span>
                          </motion.button>
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

      {/* Add Calibration Modal with AnimatedModal */}
      <AnimatedModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} className="max-w-xl">
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[85dvh] overflow-y-auto overscroll-y-contain [touch-action:pan-y] [-webkit-overflow-scrolling:touch]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-md">
                <span className="text-sm">⚖️</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isAr ? 'قيد جهاز قياس جديد في سجل المعايرة الدورية' : 'Log New Equipment for Calibration'}
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
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '🔬 اسم الجهاز / الأداة *' : '🔬 Equipment Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={newCalForm.equipmentName}
                  onChange={e => setNewCalForm({ ...newCalForm, equipmentName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder={isAr ? 'مثال: مسبار قياس حرارة الطهي' : 'e.g. Probe Thermometer'}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '🆔 كود الجهاز / الرقم التسلسلي *' : '🆔 Equipment Code / Serial *'}
                </label>
                <input
                  type="text"
                  required
                  value={newCalForm.equipmentCode}
                  onChange={e => setNewCalForm({ ...newCalForm, equipmentCode: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="PRB-005 / SCL-015"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '🏢 القسم المسؤول *' : '🏢 Department *'}
                </label>
                <select
                  required
                  value={newCalForm.deptKey}
                  onChange={e => setNewCalForm({ ...newCalForm, deptKey: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-sky-500"
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
                  {isAr ? '📍 مكان التواجد / الخط التشغيلي' : '📍 Physical Location'}
                </label>
                <input
                  type="text"
                  value={newCalForm.location}
                  onChange={e => setNewCalForm({ ...newCalForm, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder={isAr ? 'خط الإنتاج 1 / مختبر الجودة' : 'Line 1 / QC Lab'}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '📅 تاريخ آخر معايرة' : '📅 Last Calibration Date'}
                </label>
                <input
                  type="date"
                  value={newCalForm.lastCalibrationDate}
                  onChange={e => setNewCalForm({ ...newCalForm, lastCalibrationDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '📅 تاريخ المعايرة القادمة' : '📅 Next Due Date'}
                </label>
                <input
                  type="date"
                  value={newCalForm.nextCalibrationDate}
                  onChange={e => setNewCalForm({ ...newCalForm, nextCalibrationDate: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '🏛️ جهة المعايرة المعتمدة' : '🏛️ Calibration Lab / Agency'}
                </label>
                <input
                  type="text"
                  value={newCalForm.calibratedBy}
                  onChange={e => setNewCalForm({ ...newCalForm, calibratedBy: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder={isAr ? 'مختبر المعايرة القياسية SASO' : 'Certified Metrology Lab'}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? '📏 نسبة السماحية المقبولة' : '📏 Acceptable Tolerance'}
                </label>
                <input
                  type="text"
                  value={newCalForm.acceptableTolerance}
                  onChange={e => setNewCalForm({ ...newCalForm, acceptableTolerance: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-sky-500"
                  placeholder="±0.3°C / ±0.01g / ±0.05 pH"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                {isAr ? '📝 ملاحظات المعايرة' : '📝 Notes'}
              </label>
              <textarea
                rows={2}
                value={newCalForm.notes}
                onChange={e => setNewCalForm({ ...newCalForm, notes: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-sky-500"
                placeholder={isAr ? 'طريقة الفحص، المحاليل القياسية المستخدمة...' : 'Method of test, buffer solutions used...'}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
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
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-md shadow-sky-500/20 flex items-center gap-1.5"
              >
                <span>💾</span>
                <span>{isAr ? 'قيد الجهاز واعتماد السجل' : 'Save & Log Equipment'}</span>
              </motion.button>
            </div>
          </form>
        </div>
      </AnimatedModal>

      {/* Calibration Tag Sticker Modal with AnimatedModal */}
      <AnimatedModal isOpen={!!tagModalRecord} onClose={() => setTagModalRecord(null)} className="max-w-sm">
        {tagModalRecord && (
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[85dvh] overflow-y-auto overscroll-y-contain [touch-action:pan-y] [-webkit-overflow-scrolling:touch]">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>🏷️</span>
                {isAr ? 'ملصق المعايرة المعتمد (Sticker)' : 'Official Calibration Tag'}
              </h3>
              <button
                onClick={() => setTagModalRecord(null)}
                className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            {/* Sticker Physical Layout */}
            <div className="bg-emerald-600 text-white p-5 rounded-2xl border-2 border-emerald-400 shadow-xl space-y-3 font-sans">
              <div className="flex items-center justify-between border-b border-emerald-500/80 pb-2">
                <div>
                  <h4 className="text-xs font-black tracking-wider uppercase">✅ CALIBRATED</h4>
                  <p className="text-[9px] text-emerald-100">لوحة الجودة والتدقيق الرقمية</p>
                </div>
                <span className="text-xs font-mono font-black px-2 py-0.5 rounded bg-white text-emerald-800">
                  #{tagModalRecord.equipmentCode}
                </span>
              </div>

              <div className="space-y-1 text-xs">
                <p className="font-black text-sm">🔬 {tagModalRecord.equipmentName}</p>
                <p className="text-[11px] text-emerald-100">🏢 {tagModalRecord.dept} - 📍 {tagModalRecord.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-emerald-700/60 p-2.5 rounded-xl text-[10px] font-mono">
                <div>
                  <span className="text-emerald-200 uppercase block text-[9px]">📅 CAL DATE</span>
                  <span className="font-bold">{tagModalRecord.lastCalibrationDate}</span>
                </div>
                <div>
                  <span className="text-emerald-200 uppercase block text-[9px]">⏳ NEXT DUE</span>
                  <span className="font-bold text-amber-200">{tagModalRecord.nextCalibrationDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] text-emerald-100 pt-1">
                <span>📜 CERT: {tagModalRecord.certificateNumber}</span>
                <span>📏 TOL: ±{tagModalRecord.acceptableTolerance}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
              <button
                onClick={() => setTagModalRecord(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span>❌</span>
                <span>{isAr ? 'إغلاق' : 'Close'}</span>
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-sky-500/20"
              >
                <span>🖨️</span>
                <span>{isAr ? 'طباعة الملصق' : 'Print Sticker'}</span>
              </motion.button>
            </div>
          </div>
        )}
      </AnimatedModal>
    </AnimatedPage>
  );
};
