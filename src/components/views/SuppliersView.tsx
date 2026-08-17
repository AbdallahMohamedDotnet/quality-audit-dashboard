'use client';

import React, { useState } from 'react';
import { useAudit } from '../../context/AuditContext';
import { SupplierRecord } from '../../types';
import { StatCard } from '../common/StatCard';
import { Badge } from '../common/Badge';
import { exportToCsv } from '../../utils/export';

export const SuppliersView: React.FC = () => {
  const {
    isAr,
    suppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier,
    dispatchWhatsApp,
    showToast,
  } = useAudit();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterRisk, setFilterRisk] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<SupplierRecord | null>(null);
  const [evalSupplier, setEvalSupplier] = useState<SupplierRecord | null>(null);

  // Form state for adding new supplier
  const [newSup, setNewSup] = useState({
    name: '',
    category: '',
    contactPerson: '',
    phone: '',
    email: '',
    rating: 90,
    riskLevel: 'LOW' as 'LOW' | 'MEDIUM' | 'HIGH',
    isoCerts: 'ISO 9001, ISO 22000',
    certExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'APPROVED' as 'APPROVED' | 'CONDITIONAL' | 'SUSPENDED' | 'BLACKLISTED',
    rejectionRate: 0.5,
    notes: '',
  });

  // Scorecard Evaluation state
  const [evalScores, setEvalScores] = useState({
    qualityCompliance: 95,
    deliveryTimeliness: 90,
    documentation: 90,
    packagingSafety: 95,
    pricingResponse: 85,
  });

  // Filtered suppliers
  const filteredSuppliers = suppliers.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'ALL' || s.status === filterStatus;
    const matchesRisk = filterRisk === 'ALL' || s.riskLevel === filterRisk;

    return matchesSearch && matchesStatus && matchesRisk;
  });

  // KPI Calculations
  const totalApproved = suppliers.filter(s => s.status === 'APPROVED').length;
  const topRated = suppliers.filter(s => s.rating >= 90).length;
  const highRiskOrConditional = suppliers.filter(
    s => s.riskLevel === 'HIGH' || s.status === 'CONDITIONAL' || s.status === 'SUSPENDED'
  ).length;
  const avgRejection =
    suppliers.length > 0
      ? (suppliers.reduce((acc, curr) => acc + curr.rejectionRate, 0) / suppliers.length).toFixed(1)
      : '0.0';

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSup.name.trim() || !newSup.category.trim()) {
      showToast(
        isAr ? 'يرجى إدخال اسم المورد وتحديد التصنيف' : 'Please enter supplier name and category',
        'warning'
      );
      return;
    }

    const certsArray = newSup.isoCerts
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    addSupplier({
      name: newSup.name,
      category: newSup.category,
      contactPerson: newSup.contactPerson || 'N/A',
      phone: newSup.phone || '',
      email: newSup.email || '',
      rating: Number(newSup.rating) || 85,
      riskLevel: newSup.riskLevel,
      isoCerts: certsArray,
      certExpiry: newSup.certExpiry,
      status: newSup.status,
      rejectionRate: Number(newSup.rejectionRate) || 0,
      lastAuditDate: new Date().toISOString().split('T')[0],
      notes: newSup.notes,
    });

    setIsAddModalOpen(false);
    setNewSup({
      name: '',
      category: '',
      contactPerson: '',
      phone: '',
      email: '',
      rating: 90,
      riskLevel: 'LOW',
      isoCerts: 'ISO 9001, ISO 22000',
      certExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'APPROVED',
      rejectionRate: 0.5,
      notes: '',
    });
  };

  const handleUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSupplier) return;

    updateSupplier(editingSupplier.id, {
      name: editingSupplier.name,
      category: editingSupplier.category,
      contactPerson: editingSupplier.contactPerson,
      phone: editingSupplier.phone,
      email: editingSupplier.email,
      rating: editingSupplier.rating,
      riskLevel: editingSupplier.riskLevel,
      status: editingSupplier.status,
      certExpiry: editingSupplier.certExpiry,
      rejectionRate: editingSupplier.rejectionRate,
      notes: editingSupplier.notes,
    });

    setEditingSupplier(null);
  };

  const handleEvaluationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evalSupplier) return;

    const weightedScore = Math.round(
      evalScores.qualityCompliance * 0.35 +
        evalScores.deliveryTimeliness * 0.25 +
        evalScores.packagingSafety * 0.2 +
        evalScores.documentation * 0.1 +
        evalScores.pricingResponse * 0.1
    );

    let calculatedStatus = evalSupplier.status;
    let calculatedRisk = evalSupplier.riskLevel;

    if (weightedScore >= 88) {
      calculatedStatus = 'APPROVED';
      calculatedRisk = 'LOW';
    } else if (weightedScore >= 75) {
      calculatedStatus = 'CONDITIONAL';
      calculatedRisk = 'MEDIUM';
    } else {
      calculatedStatus = 'SUSPENDED';
      calculatedRisk = 'HIGH';
    }

    updateSupplier(evalSupplier.id, {
      rating: weightedScore,
      status: calculatedStatus,
      riskLevel: calculatedRisk,
      lastAuditDate: new Date().toISOString().split('T')[0],
    });

    showToast(
      isAr
        ? `تم اعتماد تقييم المورد بنجاح (النتيجة: ${weightedScore}%) والحالة (${calculatedStatus})`
        : `Supplier evaluated successfully (Score: ${weightedScore}%) - Status: ${calculatedStatus}`,
      'success'
    );
    setEvalSupplier(null);
  };

  const handleContactWhatsApp = (sup: SupplierRecord) => {
    const msg = isAr
      ? `*إشعار رسمي من إدارة الجودة والاعتماد*\nعزيزي المورد: ${sup.name}\nنحيطكم علماً بأن تصنيفكم الحالي بقائمة الموردين المعتمدين هو (${sup.status}) ومعدل الأداء (${sup.rating}%).\nيرجى موافاتنا بأحدث شهادات الجودة سارية المفعول لتجديد الملف السنوي.`
      : `*Official Notice from Quality & Vendor Management*\nDear Vendor: ${sup.name}\nYour AVL status is (${sup.status}) with performance rating (${sup.rating}%).\nPlease submit your renewed ISO certificates.`;

    dispatchWhatsApp(msg, sup.phone);
  };

  const handleExportCsv = () => {
    const headers = [
      isAr ? 'كود المورد' : 'Supplier ID',
      isAr ? 'اسم الشركة / المورد' : 'Supplier Name',
      isAr ? 'التصنيف' : 'Category',
      isAr ? 'مسؤول الاتصال' : 'Contact Person',
      isAr ? 'الهاتف' : 'Phone',
      isAr ? 'التقييم (%)' : 'Rating (%)',
      isAr ? 'مستوى المخاطر' : 'Risk Level',
      isAr ? 'حالة الاعتماد' : 'Status',
      isAr ? 'تاريخ انتهاء الشهادة' : 'Cert Expiry',
      isAr ? 'نسبة المرتجعات (%)' : 'Rejection Rate (%)',
      isAr ? 'آخر تاريخ تدقيق' : 'Last Audit Date',
    ];

    const rows = filteredSuppliers.map(s => [
      s.id,
      s.name,
      s.category,
      s.contactPerson,
      s.phone,
      s.rating,
      s.riskLevel,
      s.status,
      s.certExpiry,
      s.rejectionRate,
      s.lastAuditDate,
    ]);

    exportToCsv(`Suppliers_AVL_Report_${Date.now()}`, headers, rows);
    showToast(isAr ? 'تم تصدير قائمة الموردين المعتمدين بنجاح' : 'Exported AVL report to CSV', 'success');
  };

  const isCertExpiringSoon = (expiryDate: string) => {
    const exp = new Date(expiryDate).getTime();
    const now = Date.now();
    const daysLeft = (exp - now) / (1000 * 60 * 60 * 24);
    return daysLeft < 45;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md">
              <i className="fa-solid fa-truck-field text-lg"></i>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                {isAr ? 'سجل الموردين المعتمدين وضمان جودة سلاسل الإمداد (AVL)' : 'Approved Vendor List & Supply Chain Quality (AVL)'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isAr
                  ? 'مراقبة تقييم الموردين، صلاحية شهادات ISO/HACCP، ونسب رفض الشحنات ومطابقة المواصفات'
                  : 'Track vendor scores, ISO/HACCP cert validity, rejection rates, and compliance'}
              </p>
            </div>
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
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-500/20 active:scale-95"
          >
            <i className="fa-solid fa-plus"></i>
            {isAr ? 'إضافة مورد معتمد' : 'Add Vendor'}
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={isAr ? 'إجمالي الموردين المعتمدين' : 'Total Approved Vendors'}
          value={totalApproved}
          subtitle={isAr ? `من إجمالي ${suppliers.length} مورد مسجل` : `Out of ${suppliers.length} total vendors`}
          icon={<i className="fa-solid fa-building-circle-check text-xl"></i>}
          variant="indigo"
        />
        <StatCard
          title={isAr ? 'الموردين الفئة أ (امتياز >90%)' : 'Tier-A High Performers (>90%)'}
          value={topRated}
          subtitle={isAr ? 'مطابقة قياسية كاملة للمواصفات' : 'Full standard compliance'}
          icon={<i className="fa-solid fa-star text-xl"></i>}
          variant="emerald"
        />
        <StatCard
          title={isAr ? 'موردين قيد الملاحظة / مشروط' : 'Conditional / High Risk'}
          value={highRiskOrConditional}
          subtitle={isAr ? 'يتطلب إجراءات تصحيحية وتدقيق' : 'Requires CAPA & monitoring'}
          icon={<i className="fa-solid fa-triangle-exclamation text-xl"></i>}
          variant="amber"
        />
        <StatCard
          title={isAr ? 'متوسط نسبة رفض الشحنات' : 'Avg Rejection Rate'}
          value={`${avgRejection}%`}
          subtitle={isAr ? 'الحد الأقصى المسموح 2.0%' : 'Allowable threshold: 2.0%'}
          icon={<i className="fa-solid fa-ban text-xl"></i>}
          variant={Number(avgRejection) > 2 ? 'rose' : 'sky'}
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
                ? 'بحث باسم المورد، كود المورد، التصنيف، أو مسؤول الاتصال...'
                : 'Search by supplier name, ID, category, or contact...'
            }
            className="w-full pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">{isAr ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="APPROVED">{isAr ? 'معتمد (Approved)' : 'Approved'}</option>
            <option value="CONDITIONAL">{isAr ? 'مشروط (Conditional)' : 'Conditional'}</option>
            <option value="SUSPENDED">{isAr ? 'موقوف مؤقتاً (Suspended)' : 'Suspended'}</option>
            <option value="BLACKLISTED">{isAr ? 'محظور (Blacklisted)' : 'Blacklisted'}</option>
          </select>

          <select
            value={filterRisk}
            onChange={e => setFilterRisk(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white text-xs font-semibold outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ALL">{isAr ? 'جميع مستويات المخاطر' : 'All Risk Levels'}</option>
            <option value="LOW">{isAr ? 'مخاطر منخفضة (Low)' : 'Low Risk'}</option>
            <option value="MEDIUM">{isAr ? 'مخاطر متوسطة (Medium)' : 'Medium Risk'}</option>
            <option value="HIGH">{isAr ? 'مخاطر عالية (High)' : 'High Risk'}</option>
          </select>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4 text-start">{isAr ? 'المورد والتصنيف' : 'Supplier & Category'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'الاتصال والمسؤول' : 'Contact Person'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? 'التقييم السنوي' : 'Performance Score'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? 'المخاطر والحالة' : 'Risk & Status'}</th>
                <th className="py-3.5 px-4 text-start">{isAr ? 'شهادات الجودة والصلاحية' : 'Certificates & Expiry'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? 'نسبة الرفض' : 'Rejection %'}</th>
                <th className="py-3.5 px-4 text-center">{isAr ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
              {filteredSuppliers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <i className="fa-solid fa-box-open text-3xl opacity-40"></i>
                      <p>{isAr ? 'لا توجد بيانات موردين مطابقة لبحثك' : 'No suppliers match your filter criteria'}</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSuppliers.map(sup => {
                  const expiring = isCertExpiringSoon(sup.certExpiry);
                  return (
                    <tr
                      key={sup.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors"
                    >
                      {/* Name & ID */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 dark:text-white text-sm">
                              {sup.name}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                              {sup.id}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            {sup.category}
                          </p>
                          {sup.notes && (
                            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 italic">
                              {sup.notes}
                            </p>
                          )}
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-4">
                        <div className="space-y-0.5">
                          <p className="text-slate-800 dark:text-slate-200 font-semibold">
                            {sup.contactPerson}
                          </p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                            {sup.phone}
                          </p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[140px]">
                            {sup.email}
                          </p>
                        </div>
                      </td>

                      {/* Score */}
                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex flex-col items-center">
                          <span
                            className={`text-base font-black font-mono ${
                              sup.rating >= 90
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : sup.rating >= 75
                                ? 'text-sky-600 dark:text-sky-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {sup.rating}%
                          </span>
                          <div className="w-16 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-1">
                            <div
                              className={`h-full rounded-full ${
                                sup.rating >= 90
                                ? 'bg-emerald-500'
                                : sup.rating >= 75
                                ? 'bg-sky-500'
                                : 'bg-rose-500'
                              }`}
                              style={{ width: `${sup.rating}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Risk & Status */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex flex-col items-center gap-1.5">
                          <Badge
                            variant={
                              sup.status === 'APPROVED'
                                ? 'emerald'
                                : sup.status === 'CONDITIONAL'
                                ? 'amber'
                                : sup.status === 'SUSPENDED'
                                ? 'purple'
                                : 'rose'
                            }
                            size="sm"
                          >
                            {sup.status}
                          </Badge>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider ${
                              sup.riskLevel === 'LOW'
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : sup.riskLevel === 'MEDIUM'
                                ? 'text-amber-600 dark:text-amber-400'
                                : 'text-rose-600 dark:text-rose-400'
                            }`}
                          >
                            {sup.riskLevel} RISK
                          </span>
                        </div>
                      </td>

                      {/* Certs & Expiry */}
                      <td className="py-4 px-4">
                        <div className="space-y-1.5 max-w-[200px]">
                          <div className="flex flex-wrap gap-1">
                            {sup.isoCerts.map((cert, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800"
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400">
                            <i className="fa-regular fa-calendar-check text-[9px]"></i>
                            <span>{sup.certExpiry}</span>
                            {expiring && (
                              <span className="px-1 py-0.2 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold text-[9px]">
                                {isAr ? 'قرب الانتهاء' : 'Expiring'}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Rejection Rate */}
                      <td className="py-4 px-4 text-center">
                        <span
                          className={`font-mono font-bold text-xs ${
                            sup.rejectionRate > 2.0
                              ? 'text-rose-600 dark:text-rose-400'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {sup.rejectionRate}%
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleContactWhatsApp(sup)}
                            title={isAr ? 'تواصل عبر واتساب' : 'WhatsApp Contact'}
                            className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-all shadow-sm"
                          >
                            <i className="fa-brands fa-whatsapp text-xs"></i>
                          </button>

                          <button
                            onClick={() => {
                              setEvalSupplier(sup);
                              setEvalScores({
                                qualityCompliance: sup.rating,
                                deliveryTimeliness: sup.rating,
                                documentation: 90,
                                packagingSafety: 95,
                                pricingResponse: 85,
                              });
                            }}
                            title={isAr ? 'بطاقة تقييم الأداء والمطابقة' : 'Evaluate Performance'}
                            className="w-7 h-7 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center transition-all shadow-sm"
                          >
                            <i className="fa-solid fa-chart-pie text-xs"></i>
                          </button>

                          <button
                            onClick={() => setEditingSupplier(sup)}
                            title={isAr ? 'تعديل البيانات' : 'Edit Supplier'}
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 flex items-center justify-center transition-all shadow-sm"
                          >
                            <i className="fa-solid fa-pen-to-square text-xs"></i>
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(isAr ? 'هل أنت متأكد من حذف هذا المورد؟' : 'Delete this supplier?')) {
                                deleteSupplier(sup.id);
                              }
                            }}
                            title={isAr ? 'حذف المورد' : 'Delete Supplier'}
                            className="w-7 h-7 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center transition-all shadow-sm"
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

      {/* Add Supplier Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
                  <i className="fa-solid fa-truck-field"></i>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isAr ? 'إضافة مورد جديد إلى قائمة الموردين المعتمدين (AVL)' : 'Add New Approved Vendor (AVL)'}
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
                    {isAr ? 'اسم الشركة / المورد *' : 'Company / Supplier Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newSup.name}
                    onChange={e => setNewSup({ ...newSup, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={isAr ? 'مثال: شركة الأغذية المتطورة' : 'e.g. Advanced Foods Co.'}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'التصنيف ونوع التوريد *' : 'Category / Supply Type *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={newSup.category}
                    onChange={e => setNewSup({ ...newSup, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={isAr ? 'مثال: مواد خام غذائية / كيماويات / تغليف' : 'e.g. Raw Materials / Chemicals'}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'مسؤول الاتصال' : 'Contact Person'}
                  </label>
                  <input
                    type="text"
                    value={newSup.contactPerson}
                    onChange={e => setNewSup({ ...newSup, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="text"
                    value={newSup.phone}
                    onChange={e => setNewSup({ ...newSup, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="+966500000000"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'شهادات الجودة (مفصولة بفواصل)' : 'ISO Certifications (comma separated)'}
                  </label>
                  <input
                    type="text"
                    value={newSup.isoCerts}
                    onChange={e => setNewSup({ ...newSup, isoCerts: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="ISO 22000, HACCP, ISO 9001"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'تاريخ انتهاء الشهادة' : 'Cert Expiry Date'}
                  </label>
                  <input
                    type="date"
                    value={newSup.certExpiry}
                    onChange={e => setNewSup({ ...newSup, certExpiry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'مستوى المخاطر' : 'Risk Level'}
                  </label>
                  <select
                    value={newSup.riskLevel}
                    onChange={e => setNewSup({ ...newSup, riskLevel: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="LOW">{isAr ? 'منخفض (Low Risk)' : 'Low Risk'}</option>
                    <option value="MEDIUM">{isAr ? 'متوسط (Medium Risk)' : 'Medium Risk'}</option>
                    <option value="HIGH">{isAr ? 'عالي (High Risk)' : 'High Risk'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'حالة الاعتماد' : 'AVL Status'}
                  </label>
                  <select
                    value={newSup.status}
                    onChange={e => setNewSup({ ...newSup, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="APPROVED">{isAr ? 'معتمد (Approved)' : 'Approved'}</option>
                    <option value="CONDITIONAL">{isAr ? 'مشروط (Conditional)' : 'Conditional'}</option>
                    <option value="SUSPENDED">{isAr ? 'موقوف مؤقتاً (Suspended)' : 'Suspended'}</option>
                    <option value="BLACKLISTED">{isAr ? 'محظور (Blacklisted)' : 'Blacklisted'}</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? 'ملاحظات تدقيق الجودة والامتثال' : 'Quality Audit & Compliance Notes'}
                </label>
                <textarea
                  rows={2}
                  value={newSup.notes}
                  onChange={e => setNewSup({ ...newSup, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder={isAr ? 'شروط خاصة، سجل التوريد، تقارير الفحص...' : 'Special requirements, inspection records...'}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20"
                >
                  {isAr ? 'حفظ واعتماد المورد' : 'Save & Approve Vendor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Supplier Modal */}
      {editingSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-2xl w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isAr ? `تعديل بيانات المورد (${editingSupplier.id})` : `Edit Supplier (${editingSupplier.id})`}
              </h3>
              <button
                onClick={() => setEditingSupplier(null)}
                className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'اسم الشركة' : 'Company Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSupplier.name}
                    onChange={e => setEditingSupplier({ ...editingSupplier, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'التصنيف' : 'Category'}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSupplier.category}
                    onChange={e => setEditingSupplier({ ...editingSupplier, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'مسؤول الاتصال' : 'Contact Person'}
                  </label>
                  <input
                    type="text"
                    value={editingSupplier.contactPerson}
                    onChange={e => setEditingSupplier({ ...editingSupplier, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'رقم الهاتف' : 'Phone'}
                  </label>
                  <input
                    type="text"
                    value={editingSupplier.phone}
                    onChange={e => setEditingSupplier({ ...editingSupplier, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'حالة الاعتماد' : 'Status'}
                  </label>
                  <select
                    value={editingSupplier.status}
                    onChange={e => setEditingSupplier({ ...editingSupplier, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="APPROVED">{isAr ? 'معتمد (Approved)' : 'Approved'}</option>
                    <option value="CONDITIONAL">{isAr ? 'مشروط (Conditional)' : 'Conditional'}</option>
                    <option value="SUSPENDED">{isAr ? 'موقوف مؤقتاً (Suspended)' : 'Suspended'}</option>
                    <option value="BLACKLISTED">{isAr ? 'محظور (Blacklisted)' : 'Blacklisted'}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {isAr ? 'نسبة المرتجعات (%)' : 'Rejection Rate (%)'}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={editingSupplier.rejectionRate}
                    onChange={e => setEditingSupplier({ ...editingSupplier, rejectionRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {isAr ? 'ملاحظات الجودة' : 'Notes'}
                </label>
                <textarea
                  rows={2}
                  value={editingSupplier.notes || ''}
                  onChange={e => setEditingSupplier({ ...editingSupplier, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setEditingSupplier(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
                >
                  {isAr ? 'حفظ التعديلات' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Supplier Evaluation Scorecard Modal */}
      {evalSupplier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 max-w-xl w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {isAr ? 'بطاقة التقييم السنوي والتدقيق الفني للمورد' : 'Annual Supplier Evaluation & Audit Scorecard'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {evalSupplier.name} ({evalSupplier.id})
                </p>
              </div>
              <button
                onClick={() => setEvalSupplier(null)}
                className="w-8 h-8 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-center"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            <form onSubmit={handleEvaluationSubmit} className="space-y-4">
              <div className="space-y-3">
                {/* 1. Quality Compliance */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>{isAr ? '1. مطابقة جودة المواد والمواصفات القياسية (35%)' : '1. Quality & Spec Compliance (35%)'}</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{evalScores.qualityCompliance}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={evalScores.qualityCompliance}
                    onChange={e => setEvalScores({ ...evalScores, qualityCompliance: Number(e.target.value) })}
                    className="w-full accent-indigo-600"
                  />
                </div>

                {/* 2. Delivery Timeliness */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>{isAr ? '2. الالتزام بمواعيد التوريد وسلسلة التبريد (25%)' : '2. On-Time Delivery & Cold Chain (25%)'}</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{evalScores.deliveryTimeliness}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={evalScores.deliveryTimeliness}
                    onChange={e => setEvalScores({ ...evalScores, deliveryTimeliness: Number(e.target.value) })}
                    className="w-full accent-indigo-600"
                  />
                </div>

                {/* 3. Packaging & Food Safety */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>{isAr ? '3. سلامة التعبئة والتغليف والباركود (20%)' : '3. Packaging Safety & Labeling (20%)'}</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{evalScores.packagingSafety}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={evalScores.packagingSafety}
                    onChange={e => setEvalScores({ ...evalScores, packagingSafety: Number(e.target.value) })}
                    className="w-full accent-indigo-600"
                  />
                </div>

                {/* 4. Documentation & Traceability */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>{isAr ? '4. الوثائق وشهادات المنشأ والتحليل (10%)' : '4. COA & Traceability Docs (10%)'}</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{evalScores.documentation}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={evalScores.documentation}
                    onChange={e => setEvalScores({ ...evalScores, documentation: Number(e.target.value) })}
                    className="w-full accent-indigo-600"
                  />
                </div>

                {/* 5. Pricing & Response */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>{isAr ? '5. سرعة الاستجابة لشكاوى الجودة (10%)' : '5. Customer Service & CAPA Response (10%)'}</span>
                    <span className="font-mono text-indigo-600 dark:text-indigo-400">{evalScores.pricingResponse}%</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="100"
                    value={evalScores.pricingResponse}
                    onChange={e => setEvalScores({ ...evalScores, pricingResponse: Number(e.target.value) })}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>

              {/* Live Calculated Total */}
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
                    {isAr ? 'المجموع الوزني النهائي المحسوب:' : 'Weighted Total Score:'}
                  </span>
                  <p className="text-[11px] text-indigo-700 dark:text-indigo-300">
                    {Math.round(
                      evalScores.qualityCompliance * 0.35 +
                        evalScores.deliveryTimeliness * 0.25 +
                        evalScores.packagingSafety * 0.2 +
                        evalScores.documentation * 0.1 +
                        evalScores.pricingResponse * 0.1
                    ) >= 88
                      ? isAr
                        ? 'مورد فئة (أ) - معتمد بدون قيود'
                        : 'Tier-A Supplier - Full Approval'
                      : Math.round(
                          evalScores.qualityCompliance * 0.35 +
                            evalScores.deliveryTimeliness * 0.25 +
                            evalScores.packagingSafety * 0.2 +
                            evalScores.documentation * 0.1 +
                            evalScores.pricingResponse * 0.1
                        ) >= 75
                      ? isAr
                        ? 'مورد فئة (ب) - اعتماد مشروط'
                        : 'Tier-B Supplier - Conditional'
                      : isAr
                      ? 'مورد فئة (ج) - موقوف يستوجب تصحيح فوري'
                      : 'Tier-C Supplier - Suspended'}
                  </p>
                </div>
                <span className="text-2xl font-black font-mono text-indigo-600 dark:text-indigo-400">
                  {Math.round(
                    evalScores.qualityCompliance * 0.35 +
                      evalScores.deliveryTimeliness * 0.25 +
                      evalScores.packagingSafety * 0.2 +
                      evalScores.documentation * 0.1 +
                      evalScores.pricingResponse * 0.1
                  )}
                  %
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setEvalSupplier(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-xs font-bold"
                >
                  {isAr ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold shadow-md"
                >
                  {isAr ? 'اعتماد التقييم وتحديث الرتبة' : 'Commit & Update Rating'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
