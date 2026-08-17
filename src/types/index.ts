export type Language = 'ar' | 'en';
export type Theme = 'dark' | 'light';

export type TabKey =
  | 'dashboard'
  | 'audit_form'
  | 'kpi'
  | 'ncr'
  | 'capa'
  | 'suppliers'
  | 'training'
  | 'calibration'
  | 'iot'
  | 'haccp'
  | 'recall'
  | 'ai'
  | 'visitors'
  | 'sustainability'
  | 'emergency'
  | 'archive'
  | 'settings';

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

export interface SupplierRecord {
  id: string;
  name: string;
  category: string;
  contactPerson: string;
  phone: string;
  email: string;
  rating: number; // 0-100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  isoCerts: string[];
  certExpiry: string;
  status: 'APPROVED' | 'CONDITIONAL' | 'SUSPENDED' | 'BLACKLISTED';
  rejectionRate: number; // percentage e.g. 1.2
  lastAuditDate: string;
  notes?: string;
}

export interface CapaRecord {
  id: string;
  source: 'NCR' | 'AUDIT' | 'COMPLAINT' | 'INCIDENT' | 'INSPECTION' | string;
  sourceRefId?: string;
  title: string;
  dept: string;
  assignedTo: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  rootCause: string;
  correctiveAction: string;
  preventiveAction: string;
  targetDate: string;
  status: 'OPEN' | 'INVESTIGATION' | 'IMPLEMENTED' | 'VERIFIED' | 'CLOSED';
  createdAt: string;
  closedAt?: string;
  verifiedBy?: string;
  effectivenessRating?: number;
}

export interface TrainingRecord {
  id: string;
  courseName: string;
  courseType: 'HACCP' | 'HYGIENE' | 'OSHA' | 'ISO' | 'FIRE_SAFETY' | 'FIRST_AID' | string;
  employeeName: string;
  employeeId: string;
  dept: string;
  completionDate: string;
  expiryDate: string;
  score: number;
  status: 'VALID' | 'EXPIRING_SOON' | 'EXPIRED';
  trainer: string;
  passIssued: boolean;
}

export interface CalibrationRecord {
  id: string;
  equipmentName: string;
  equipmentCode: string;
  dept: string;
  location: string;
  lastCalibrationDate: string;
  nextCalibrationDate: string;
  calibratedBy: string;
  certificateNumber: string;
  acceptableTolerance: string;
  status: 'VALID' | 'DUE_SOON' | 'OVERDUE' | 'OUT_OF_SERVICE';
  notes?: string;
}
