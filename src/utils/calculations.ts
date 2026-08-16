import { AuditRecord, NcrRecord } from '../types';

export function evaluateStandardCompliance(
  actualValue: string,
  baselineValue: number | string,
  operator: string
): boolean {
  const actualNum = parseFloat(actualValue);
  const baselineNum = parseFloat(String(baselineValue));

  if (isNaN(actualNum)) {
    return true; // Not yet evaluated or empty
  }

  if (operator === '<=') {
    return actualNum <= baselineNum;
  }
  if (operator === '>=') {
    return actualNum >= baselineNum;
  }
  if (operator === '==') {
    return actualNum === baselineNum;
  }

  return true;
}

export function getSectorLatestScores(
  audits: AuditRecord[],
  sectorDeptKeys: string[]
): Record<string, number> {
  const scores: Record<string, number> = {};

  audits.forEach(audit => {
    if (audit.type === 'AUDIT' && audit.deptKey && !(audit.deptKey in scores)) {
      const parsed = parseInt(audit.score, 10);
      if (!isNaN(parsed) && sectorDeptKeys.includes(audit.deptKey)) {
        scores[audit.deptKey] = parsed;
      }
    }
  });

  return scores;
}

export function calculateSectorMetrics(
  sectorScores: Record<string, number>,
  sectorDeptKeys: string[],
  ncrs: NcrRecord[]
) {
  const auditedKeys = Object.keys(sectorScores).filter(k => sectorDeptKeys.includes(k));
  const totalDepts = sectorDeptKeys.length;

  const averageScore =
    auditedKeys.length > 0
      ? Math.round(
          auditedKeys.reduce((acc, k) => acc + sectorScores[k], 0) / auditedKeys.length
        )
      : 0;

  const coveragePercent =
    totalDepts > 0 ? Math.round((auditedKeys.length / totalDepts) * 100) : 0;

  const closedNcrs = ncrs.filter(n => n.status === 'CLOSED').length;
  const openNcrs = ncrs.filter(n => n.status === 'OPEN').length;

  const estimatedSavings =
    closedNcrs * 3500 + Math.max(0, averageScore - 80) * 500;

  const penaltiesAvoided = closedNcrs * 12000;

  return {
    auditedCount: auditedKeys.length,
    totalDepts,
    averageScore,
    coveragePercent,
    closedNcrs,
    openNcrs,
    estimatedSavings,
    penaltiesAvoided,
  };
}

export function calculateCarbonFootprint(
  electricityKWh: number,
  waterM3: number,
  wasteKg: number
): string {
  // Electricity factor: ~0.0005 MT CO2e / kWh
  // Water factor: ~0.0003 MT CO2e / m3
  // Waste factor: ~0.001 MT CO2e / kg
  const carbon =
    electricityKWh * 0.0005 + waterM3 * 0.0003 + wasteKg * 0.001;
  return carbon.toFixed(3);
}

export function getRiskLevel(score: number): {
  labelAr: string;
  labelEn: string;
  color: string;
  bgLight: string;
  bgDark: string;
} {
  if (score >= 20) {
    return {
      labelAr: 'حرج جداً (Extreme Risk)',
      labelEn: 'Extreme Risk',
      color: 'text-rose-500',
      bgLight: 'bg-rose-50',
      bgDark: 'dark:bg-rose-900/30',
    };
  }
  if (score >= 15) {
    return {
      labelAr: 'مرتفع (High Risk)',
      labelEn: 'High Risk',
      color: 'text-amber-500',
      bgLight: 'bg-amber-50',
      bgDark: 'dark:bg-amber-900/30',
    };
  }
  if (score >= 9) {
    return {
      labelAr: 'متوسط (Medium Risk)',
      labelEn: 'Medium Risk',
      color: 'text-yellow-500',
      bgLight: 'bg-yellow-50',
      bgDark: 'dark:bg-yellow-900/30',
    };
  }
  return {
    labelAr: 'منخفض ومقبول (Low Risk)',
    labelEn: 'Low Risk',
    color: 'text-emerald-500',
    bgLight: 'bg-emerald-50',
    bgDark: 'dark:bg-emerald-900/30',
  };
}
