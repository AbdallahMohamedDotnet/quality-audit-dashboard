export type Language = 'ar' | 'en';
export type Theme = 'dark' | 'light';

export type TabKey =
  | 'dashboard'
  | 'audit_form'
  | 'kpi'
  | 'ncr'
  | 'ai'
  | 'haccp'
  | 'visitors'
  | 'sustainability'
  | 'emergency'
  | 'archive';

export interface LocalizedString {
  ar: string;
  en: string;
}

export interface Sector {
  val: string;
  ar: string;
  en: string;
}

export interface Role {
  val: string;
  ar: string;
  en: string;
}

export interface DepartmentInfo {
  ar: string;
  en: string;
}

export interface Standard {
  id: string;
  sectors: string[];
  depts: string[];
  code: string;
  standard: string;
  baseline: number | string;
  operator: '<=' | '>=' | '==' | string;
  unit: string;
  desc: LocalizedString;
  autoAction?: LocalizedString;
  timeline?: LocalizedString;
}

export interface AuditAnswer {
  actual: string;
  isDeviation: boolean;
  rca: string;
  capaApproved: boolean;
  photo: string | null;
}

export interface AuditRecord {
  id: number;
  type: string;
  date: string;
  time: string;
  dept: string;
  deptKey: string;
  score: string;
  user: string;
}

export interface NcrRecord {
  id: string;
  type: 'TECHNICAL' | 'CRITICAL' | 'OBSERVATION' | string;
  deptName: string;
  std: string;
  desc: string;
  date: string;
  status: 'OPEN' | 'CLOSED';
}

export interface VisitorRecord {
  id: number;
  name: string;
  company: string;
  purpose: string;
  host: string;
  ppeIssued: boolean;
  healthDeclared: boolean;
  timeIn: string;
  timeOut: string | null;
}

export interface ComplaintAiOutput {
  reply: string;
  report: string;
  capaImmediate: string;
  capaRootCause: string;
  capaPreventive: string;
  capaDeadline: string;
}

export interface ComplaintForm {
  guestName: string;
  room: string;
  text: string;
  dept: string;
  output: ComplaintAiOutput | null;
}

export interface CommunicationSettings {
  deptHeadEmail: string;
  gmEmail: string;
  ownerEmail: string;
  gmWhatsapp: string;
}

export interface TelemetrySensor {
  id: string;
  icon: string;
  labelAr: string;
  labelEn: string;
  unit: string;
  min: number;
  max: number;
  init: number;
  step: number;
  decimals: number;
  isDetector?: boolean;
  warnAbove?: number;
  warnBelow?: number;
}

export interface HaccpFlowStep {
  label: LocalizedString;
  isCCP: boolean;
  limit?: string;
  cl?: LocalizedString;
  action?: LocalizedString;
}

export interface RecallItem {
  val: string;
  emoji: string;
  ar: string;
  en: string;
}

export interface EmergencyProtocol {
  val: string;
  ar: string;
  en: string;
  sectors: string[];
  priority?: LocalizedString;
  steps?: {
    ar: string[];
    en: string[];
  };
}

export interface ContainmentTemplate {
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
}

export interface ColorThemeBadge {
  active: string;
  hover: string;
  icon: string;
  border?: string;
}
