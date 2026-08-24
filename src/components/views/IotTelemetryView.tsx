'use client';

import React, { useState } from 'react';
import { useAudit } from '../../context/AuditContext';
import { SECTORS, IOT_SENSORS } from '../../data';
import { StatCard } from '../common/StatCard';

export const IotTelemetryView: React.FC = () => {
  const {
    isAr,
    currentSector,
    setCurrentSector,
    iotTelemetry,
    isTelemetrySimulating,
    toggleTelemetrySimulation,
    addNcr,
    setActiveTab,
    dispatchWhatsApp,
    showToast,
    clocks,
  } = useAudit();

  const [selectedSensorFilter, setSelectedSensorFilter] = useState<'ALL' | 'CRITICAL' | 'WARNING' | 'OPTIMAL'>('ALL');

  const currentSectorObj = SECTORS.find(s => s.val === currentSector);
  const sensors = IOT_SENSORS[currentSector] || IOT_SENSORS.hotels || [];

  // Compute live readings and status for each sensor
  const sensorStatusList = sensors.map((s, idx) => {
    const rawVal = iotTelemetry[s.id];
    const val = typeof rawVal === 'number' ? rawVal : (s.min + s.max) / 2;
    const isOutOfRange = val < s.min || val > s.max;
    const isNearLimit = !isOutOfRange && (val <= s.min + (s.max - s.min) * 0.1 || val >= s.max - (s.max - s.min) * 0.1);
    const status: 'OPTIMAL' | 'WARNING' | 'CRITICAL' = isOutOfRange ? 'CRITICAL' : isNearLimit ? 'WARNING' : 'OPTIMAL';

    return {
      ...s,
      currentVal: Number(val.toFixed(1)),
      status,
      index: idx,
    };
  });

  const optimalCount = sensorStatusList.filter(s => s.status === 'OPTIMAL').length;
  const warningCount = sensorStatusList.filter(s => s.status === 'WARNING').length;
  const criticalCount = sensorStatusList.filter(s => s.status === 'CRITICAL').length;

  const filteredSensors = sensorStatusList.filter(s => {
    if (selectedSensorFilter === 'ALL') return true;
    return s.status === selectedSensorFilter;
  });

  const handleShareTelemetryWhatsApp = () => {
    const sectorName = currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector;
    const readingsSummary = sensorStatusList
      .map(
        s =>
          `• ${isAr ? s.labelAr : s.labelEn}: ${s.currentVal} ${s.unit} [${s.status}] (المسموح: ${s.min} - ${s.max} ${s.unit})`
      )
      .join('\n');

    const msg = isAr
      ? `*📡 تقرير المراقبة اللحظية للمجسات وحساسات IoT*\nالقطاع: ${sectorName}\nالتاريخ والتوقيت: ${clocks.gregorianDate} - ${clocks.time}\nالحالة: ${criticalCount > 0 ? '⚠️ يوجد حيود حرج' : '✅ جميع القراءات مطابقة'}\n------------------------\n${readingsSummary}\n------------------------\nتم الإصدار عبر وحدة المراقبة المركزية - منصة التدقيق الرقمية.`
      : `*📡 Real-Time IoT Sensors & Telemetry Stream*\nSector: ${sectorName}\nTimestamp: ${clocks.gregorianDate} - ${clocks.time}\nStatus: ${criticalCount > 0 ? '⚠️ Critical Deviation' : '✅ Optimal Operating Range'}\n------------------------\n${readingsSummary}\n------------------------\nCertified Digital Quality Platform.`;

    dispatchWhatsApp(msg);
  };

  const handleCreateSensorNcr = (s: (typeof sensorStatusList)[0]) => {
    const sectorName = currentSectorObj ? (isAr ? currentSectorObj.ar : currentSectorObj.en) : currentSector;
    addNcr({
      type: s.status === 'CRITICAL' ? 'CRITICAL' : 'TECHNICAL',
      deptName: sectorName,
      std: `IoT-${s.id.toUpperCase()}`,
      desc: isAr
        ? `تجاوز مؤشر الحساس (${s.labelAr}) النطاق الآمن المعتمد: القراءة الحالية ${s.currentVal} ${s.unit} خارج الحدود المسموحة (${s.min} - ${s.max} ${s.unit})`
        : `Sensor (${s.labelEn}) reading ${s.currentVal} ${s.unit} breached critical limits (${s.min} - ${s.max} ${s.unit})`,
    });
    showToast(isAr ? 'تم قيد مذكرة عدم مطابقة فورية' : 'Logged sensor deviation ticket', 'warning');
    setActiveTab('ncr');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <i className="fa-solid fa-tower-broadcast"></i>
            </span>
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              {isAr ? 'المراقبة اللحظية للمجسات وإنترنت الأشياء (IoT)' : 'Live IoT Sensor Telemetry Stream'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {isAr
              ? 'مراقبة درجات الحرارة، الرطوبة، الضغط، نقاء الهواء والغازات في الوقت الحقيقي مع الإنذار التلقائي'
              : 'Real-time telemetry for cold chain, autoclaves, air quality, pH, and environmental sensors'}
          </p>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={toggleTelemetrySimulation}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm ${
              isTelemetrySimulating
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isTelemetrySimulating ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'
              }`}
            />
            <span>
              {isTelemetrySimulating
                ? isAr
                  ? 'البث الحي نشط (Active Stream)'
                  : 'Live Streaming ON'
                : isAr
                ? 'تشغيل البث التجريبي'
                : 'Start Simulation'}
            </span>
          </button>

          <button
            type="button"
            onClick={handleShareTelemetryWhatsApp}
            className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
          >
            <i className="fa-brands fa-whatsapp text-sm"></i>
            <span>{isAr ? 'إرسال تقرير القراءات' : 'Share Readings'}</span>
          </button>
        </div>
      </div>

      {/* Sector Selection Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <i className="fa-solid fa-industry text-sky-500"></i>
            <span>{isAr ? 'تحديد منشأة الفحص والمجسات:' : 'Select Industry Facility:'}</span>
          </span>
          <span className="text-[11px] font-bold text-slate-400">
            {isAr ? `${sensors.length} مجساً متصلاً` : `${sensors.length} Connected Sensors`}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {SECTORS.map(sec => {
            const isSelected = currentSector === sec.val;
            return (
              <button
                key={sec.val}
                type="button"
                onClick={() => setCurrentSector(sec.val)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-sky-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isAr ? sec.ar : sec.en}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sensor KPI Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title={isAr ? 'إجمالي المجسات النشطة' : 'Total Active Sensors'}
          value={sensorStatusList.length.toString()}
          subtitle={isAr ? 'محدثة كل 3 ثوانٍ' : 'Telemetry refreshed live'}
          icon={<i className="fa-solid fa-microchip text-xl"></i>}
          variant="sky"
        />

        <StatCard
          title={isAr ? 'القراءات المثالية (Optimal)' : 'Optimal Sensors'}
          value={optimalCount.toString()}
          subtitle={isAr ? 'ضمن الحدود الآمنة' : 'Within safe parameters'}
          icon={<i className="fa-solid fa-circle-check text-xl"></i>}
          variant="emerald"
        />

        <StatCard
          title={isAr ? 'تنبيهات اقتراب الحد (Warning)' : 'Near Tolerance Threshold'}
          value={warningCount.toString()}
          subtitle={isAr ? 'تحتاج مراقبة وقائية' : 'Approaching upper/lower cap'}
          icon={<i className="fa-solid fa-triangle-exclamation text-xl"></i>}
          variant="amber"
        />

        <StatCard
          title={isAr ? 'الحيود الحرج (Critical Breach)' : 'Critical Breaches'}
          value={criticalCount.toString()}
          subtitle={isAr ? 'تتطلب تدخلاً فورياً' : 'Immediate quarantine required'}
          icon={<i className="fa-solid fa-radiation text-xl"></i>}
          variant="rose"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          type="button"
          onClick={() => setSelectedSensorFilter('ALL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedSensorFilter === 'ALL'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          {isAr ? 'جميع المجسات' : 'All Sensors'} ({sensorStatusList.length})
        </button>

        <button
          type="button"
          onClick={() => setSelectedSensorFilter('OPTIMAL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            selectedSensorFilter === 'OPTIMAL'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          {isAr ? 'المطابقة' : 'Optimal'} ({optimalCount})
        </button>

        <button
          type="button"
          onClick={() => setSelectedSensorFilter('WARNING')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedSensorFilter === 'WARNING'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          {isAr ? 'التحذيرات' : 'Warnings'} ({warningCount})
        </button>

        <button
          type="button"
          onClick={() => setSelectedSensorFilter('CRITICAL')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            selectedSensorFilter === 'CRITICAL'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
          }`}
        >
          {isAr ? 'الحيود الحرج' : 'Critical'} ({criticalCount})
        </button>
      </div>

      {/* Sensor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSensors.map(s => {
          return (
            <div
              key={s.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 ${
                s.status === 'CRITICAL'
                  ? 'bg-rose-500/5 dark:bg-rose-950/20 border-rose-500/40 shadow-lg shadow-rose-500/10'
                  : s.status === 'WARNING'
                  ? 'bg-amber-500/5 dark:bg-amber-950/20 border-amber-500/40'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-black ${
                      s.status === 'CRITICAL'
                        ? 'bg-rose-500 text-white animate-pulse'
                        : s.status === 'WARNING'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                    }`}
                  >
                    {s.status === 'CRITICAL'
                      ? isAr
                        ? 'إنذار حرج'
                        : 'CRITICAL'
                      : s.status === 'WARNING'
                      ? isAr
                        ? 'تحذير'
                        : 'WARNING'
                      : isAr
                      ? 'مطابق'
                      : 'OPTIMAL'}
                  </span>

                  <span className="text-[10px] font-mono text-slate-400 font-bold">
                    ID: #{s.id.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-black text-slate-900 dark:text-white">
                    {isAr ? s.labelAr : s.labelEn}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    {isAr
                      ? `النطاق المسموح به: ${s.min} ~ ${s.max} ${s.unit}`
                      : `Permissible range: ${s.min} ~ ${s.max} ${s.unit}`}
                  </p>
                </div>
              </div>

              {/* Gauge Display & Value */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block">
                    {isAr ? 'القراءة الآن' : 'Current Value'}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-2xl font-black font-mono ${
                        s.status === 'CRITICAL'
                          ? 'text-rose-600 dark:text-rose-400'
                          : s.status === 'WARNING'
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {s.currentVal}
                    </span>
                    <span className="text-xs font-bold text-slate-500">{s.unit}</span>
                  </div>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shadow-inner">
                  <i className="fa-solid fa-gauge text-lg"></i>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
                <button
                  type="button"
                  onClick={() => setActiveTab('calibration')}
                  className="text-[11px] font-bold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1"
                >
                  <i className="fa-solid fa-scale-balanced text-[10px]"></i>
                  <span>{isAr ? 'سجل المعايرة' : 'Calibration'}</span>
                </button>

                {s.status !== 'OPTIMAL' && (
                  <button
                    type="button"
                    onClick={() => handleCreateSensorNcr(s)}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-black shadow-sm transition-all flex items-center gap-1"
                  >
                    <i className="fa-solid fa-plus text-[9px]"></i>
                    <span>{isAr ? 'قيد NCR' : 'Log NCR'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
