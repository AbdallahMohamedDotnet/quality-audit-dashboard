import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Language,
  Theme,
  TabKey,
  AuditAnswer,
  AuditRecord,
  NcrRecord,
  VisitorRecord,
  ComplaintForm,
  CommunicationSettings,
} from '../types';
import {
  getStoredItem,
  setStoredItem,
} from '../utils/storage';
import {
  ROLES,
  DEPARTMENTS,
  STANDARDS,
  IOT_SENSORS,
  RECALL_ITEMS,
  EMERGENCY_PROTOCOLS,
} from '../data';
import { formatLiveClocks, LiveClocks } from '../utils/date';
import { sendWhatsAppMessage, sendEmailClient, triggerPrintReport } from '../utils/export';

const DEFAULT_LOGO_SVG = `<svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;

interface ToastInfo {
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AuditContextType {
  // Localization & Theme
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  isAr: boolean;
  isDark: boolean;
  dir: 'rtl' | 'ltr';

  // Authentication & Role
  isLoggedIn: boolean;
  currentRole: string;
  login: (role: string, password?: string) => boolean;
  logout: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  // Navigation & Sector
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
  currentSector: string;
  setCurrentSector: (sector: string) => void;
  selectedDept: string;
  setSelectedDept: (dept: string) => void;
  startAudit: (deptKey: string) => void;

  // Clocks
  clocks: LiveClocks;

  // Toast
  toast: ToastInfo | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;

  // Logo & Branding
  logoSvg: string;
  setLogoSvg: (svg: string) => void;
  isLogoModalOpen: boolean;
  setIsLogoModalOpen: (open: boolean) => void;

  // Live Audit execution
  auditAnswers: Record<string, AuditAnswer>;
  setAuditAnswerValue: (standardId: string, actual: string, baseline: number | string, operator: string) => void;
  setAuditAnswerRca: (standardId: string, rca: string) => void;
  toggleAuditCapaApproved: (standardId: string) => void;
  attachPhotoEvidence: (standardId: string, file: File) => void;
  removePhotoEvidence: (standardId: string) => void;
  finalizeAuditSession: (hasSignature: boolean) => boolean;
  clearAuditSession: () => void;

  // Archive
  archivedAudits: AuditRecord[];
  deleteArchivedAudit: (id: number) => void;

  // NCRs
  ncrs: NcrRecord[];
  addNcr: (ncr: Omit<NcrRecord, 'id' | 'date' | 'status'>) => void;
  closeNcr: (id: string) => void;
  deleteNcr: (id: string) => void;

  // Visitors
  visitors: VisitorRecord[];
  addVisitor: (visitor: Omit<VisitorRecord, 'id' | 'timeIn' | 'timeOut'>) => void;
  checkoutVisitor: (id: number) => void;

  // AI & Complaints
  complaint: ComplaintForm;
  setComplaint: React.Dispatch<React.SetStateAction<ComplaintForm>>;
  analyzeComplaintAi: () => void;

  // Communication Settings
  commSettings: CommunicationSettings;
  setCommSettings: React.Dispatch<React.SetStateAction<CommunicationSettings>>;

  // HACCP & Recall
  recallRisk: { item: string; severity: number; probability: number };
  setRecallRisk: React.Dispatch<React.SetStateAction<{ item: string; severity: number; probability: number }>>;

  // Sustainability / ESG
  utilities: { elec: number; water: number; waste: number };
  setUtilities: React.Dispatch<React.SetStateAction<{ elec: number; water: number; waste: number }>>;

  // Emergency Crisis Management
  emergency: { type: string; food: string; lot: string; action: string };
  setEmergency: React.Dispatch<React.SetStateAction<{ type: string; food: string; lot: string; action: string }>>;

  // IoT Telemetry Live Monitor
  iotTelemetry: Record<string, number | string>;
  isTelemetrySimulating: boolean;
  toggleTelemetrySimulation: () => void;

  // Global Actions
  dispatchWhatsApp: (message: string, phone?: string) => void;
  dispatchEmail: (subject: string, body: string, recipient?: string) => void;
  printReport: () => void;
}

const AuditContext = createContext<AuditContextType | undefined>(undefined);

export const AuditProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Localization & Theme
  const [language, setLanguageState] = useState<Language>(() => getStoredItem('audit_lang', 'ar'));
  const [theme, setThemeState] = useState<Theme>(() => getStoredItem('audit_theme', 'dark'));
  const isAr = language === 'ar';
  const isDark = theme === 'dark';
  const dir = isAr ? 'rtl' : 'ltr';

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    setStoredItem('audit_lang', lang);
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    setStoredItem('audit_theme', t);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }, [theme, setTheme]);

  // Auth & Roles
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => getStoredItem('audit_is_logged_in', false));
  const [currentRole, setCurrentRole] = useState<string>(() => getStoredItem('audit_current_role', 'ceo'));
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Navigation
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [currentSector, setCurrentSectorState] = useState<string>(() => getStoredItem('audit_current_sector', 'hotels'));
  const [selectedDept, setSelectedDept] = useState<string>('');

  const setCurrentSector = useCallback((sector: string) => {
    setCurrentSectorState(sector);
    setStoredItem('audit_current_sector', sector);
  }, []);

  // Branding & Toast
  const [logoSvg, setLogoSvgState] = useState<string>(() => getStoredItem('audit_logo_svg', DEFAULT_LOGO_SVG));
  const [isLogoModalOpen, setIsLogoModalOpen] = useState(false);
  const [toast, setToast] = useState<ToastInfo | null>(null);

  const setLogoSvg = useCallback((svg: string) => {
    setLogoSvgState(svg);
    setStoredItem('audit_logo_svg', svg);
  }, []);

  const showToast = useCallback((message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  // Live Clocks
  const [clocks, setClocks] = useState<LiveClocks>(() => formatLiveClocks(new Date(), isAr));

  useEffect(() => {
    const timer = setInterval(() => {
      setClocks(formatLiveClocks(new Date(), isAr));
    }, 1000);
    return () => clearInterval(timer);
  }, [isAr]);

  // Sync HTML tags for Dark Mode & Language
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [language, dir]);

  // Audit Execution & State
  const [auditAnswers, setAuditAnswers] = useState<Record<string, AuditAnswer>>({});
  const [archivedAudits, setArchivedAudits] = useState<AuditRecord[]>(() =>
    getStoredItem('audit_archives', [
      {
        id: 1722256000000,
        type: 'AUDIT',
        date: new Date().toLocaleDateString('en-GB'),
        time: '10:30 AM',
        dept: 'المكاتب الأمامية والاستقبال',
        deptKey: 'front_office',
        score: '92%',
        user: 'الرئيس التنفيذي (CEO)',
      },
      {
        id: 1722256100000,
        type: 'AUDIT',
        date: new Date().toLocaleDateString('en-GB'),
        time: '11:45 AM',
        dept: 'المطبخ الرئيسي',
        deptKey: 'main_kitchen',
        score: '85%',
        user: 'مدير الجودة (QA Manager)',
      },
    ])
  );

  const [ncrs, setNcrs] = useState<NcrRecord[]>(() =>
    getStoredItem('audit_ncrs', [
      {
        id: 'NCR-1001',
        type: 'CRITICAL',
        deptName: 'المطبخ الرئيسي',
        std: 'HACCP-CC01',
        desc: 'درجة حرارة ثلاجة اللحوم 7 درجات مئوية متجاوزة الحد الحرج (4 درجات).',
        date: new Date().toLocaleDateString('en-GB'),
        status: 'OPEN',
      },
      {
        id: 'NCR-1002',
        type: 'TECHNICAL',
        deptName: 'الهندسة والصيانة',
        std: 'OSHA-LOTO',
        desc: 'عدم وجود أقفال السلامة LOTO في لوحة التوزيع الفرعية.',
        date: new Date().toLocaleDateString('en-GB'),
        status: 'CLOSED',
      },
    ])
  );

  const [visitors, setVisitors] = useState<VisitorRecord[]>(() =>
    getStoredItem('audit_visitors', [
      {
        id: 1,
        name: 'م. أحمد خالد',
        company: 'شركة الصيانة الهندسية',
        purpose: 'صيانة دورية للمصاعد والمولدات',
        host: 'م. سامي (رئيس الصيانة)',
        ppeIssued: true,
        healthDeclared: true,
        timeIn: '09:15 AM',
        timeOut: null,
      },
    ])
  );

  // Save changes to localStorage
  useEffect(() => {
    setStoredItem('audit_archives', archivedAudits);
  }, [archivedAudits]);

  useEffect(() => {
    setStoredItem('audit_ncrs', ncrs);
  }, [ncrs]);

  useEffect(() => {
    setStoredItem('audit_visitors', visitors);
  }, [visitors]);

  // AI Complaint State
  const [complaint, setComplaint] = useState<ComplaintForm>({
    guestName: '',
    room: '',
    text: '',
    dept: '',
    output: null,
  });

  // Communication Settings
  const [commSettings, setCommSettings] = useState<CommunicationSettings>(() =>
    getStoredItem('audit_comm_settings', {
      deptHeadEmail: '',
      gmEmail: '',
      ownerEmail: '',
      gmWhatsapp: '',
    })
  );

  useEffect(() => {
    setStoredItem('audit_comm_settings', commSettings);
  }, [commSettings]);

  // HACCP & Recall State
  const [recallRisk, setRecallRisk] = useState<{ item: string; severity: number; probability: number }>(() => {
    const items = RECALL_ITEMS[currentSector] || RECALL_ITEMS._food || [];
    return {
      item: items.length > 0 ? items[0].val : 'poultry',
      severity: 5,
      probability: 4,
    };
  });

  // Auto-sync recall items on sector change
  useEffect(() => {
    const items = RECALL_ITEMS[currentSector] || RECALL_ITEMS._food || [];
    if (items.length && !items.some(i => i.val === recallRisk.item)) {
      setRecallRisk(prev => ({ ...prev, item: items[0].val }));
    }
  }, [currentSector, recallRisk.item]);

  // Sustainability State
  const [utilities, setUtilities] = useState<{ elec: number; water: number; waste: number }>(() =>
    getStoredItem('audit_utilities', {
      elec: 1250,
      water: 85,
      waste: 180,
    })
  );

  useEffect(() => {
    setStoredItem('audit_utilities', utilities);
  }, [utilities]);

  // Emergency State
  const [emergency, setEmergency] = useState<{ type: string; food: string; lot: string; action: string }>(() => {
    const protocols = EMERGENCY_PROTOCOLS.filter(p => p.sectors.includes(currentSector));
    return {
      type: protocols.length > 0 ? protocols[0].val : 'poisoning',
      food: '',
      lot: '',
      action: '',
    };
  });

  // Auto-sync emergency protocol on sector change
  useEffect(() => {
    const protocols = EMERGENCY_PROTOCOLS.filter(p => p.sectors.includes(currentSector));
    if (protocols.length && !protocols.some(p => p.val === emergency.type)) {
      setEmergency(prev => ({ ...prev, type: protocols[0].val }));
    }
  }, [currentSector, emergency.type]);

  // IoT Telemetry State & Simulator
  const [iotTelemetry, setIotTelemetry] = useState<Record<string, number | string>>({});
  const [isTelemetrySimulating, setIsTelemetrySimulating] = useState(true);

  // Initialize sensors for sector
  useEffect(() => {
    const sensors = IOT_SENSORS[currentSector] || IOT_SENSORS.hotels || [];
    const initVals: Record<string, number | string> = {};
    sensors.forEach(s => {
      initVals[s.id] = s.isDetector ? 'CLEAR' : s.init;
    });
    setIotTelemetry(initVals);
  }, [currentSector]);

  // Live telemetry pulse
  useEffect(() => {
    if (!isTelemetrySimulating || activeTab !== 'dashboard') return;

    const interval = setInterval(() => {
      const sensors = IOT_SENSORS[currentSector] || IOT_SENSORS.hotels || [];
      setIotTelemetry(prev => {
        const next = { ...prev };
        sensors.forEach(sensor => {
          if (sensor.isDetector) {
            next[sensor.id] = Math.random() > 0.98 ? 'WARNING' : 'CLEAR';
          } else {
            const currentVal = typeof prev[sensor.id] === 'number' ? (prev[sensor.id] as number) : sensor.init;
            const delta = Math.random() * sensor.step * 2 - sensor.step;
            const bounded = Math.max(sensor.min, Math.min(sensor.max, currentVal + delta));
            next[sensor.id] = +bounded.toFixed(sensor.decimals);
          }
        });
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isTelemetrySimulating, activeTab, currentSector]);

  const toggleTelemetrySimulation = useCallback(() => {
    setIsTelemetrySimulating(prev => !prev);
  }, []);

  // Auth Handlers
  const login = useCallback(
    (role: string, password: string = '123'): boolean => {
      if (role && password === '123') {
        setIsLoggedIn(true);
        setCurrentRole(role);
        setStoredItem('audit_is_logged_in', true);
        setStoredItem('audit_current_role', role);
        setActiveTab('dashboard');
        showToast(
          isAr
            ? 'تم تسجيل الدخول لمساحة العمل بنجاح'
            : 'Successfully logged into executive workspace',
          'success'
        );
        return true;
      }
      showToast(
        isAr ? 'اسم المستخدم أو كلمة المرور غير صحيحة' : 'Invalid credentials. Use 123',
        'error'
      );
      return false;
    },
    [isAr, showToast]
  );

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setStoredItem('audit_is_logged_in', false);
    showToast(
      isAr ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully',
      'info'
    );
  }, [isAr, showToast]);

  // Audit Actions
  const startAudit = useCallback(
    (deptKey: string) => {
      setSelectedDept(deptKey);
      setAuditAnswers({});
      setActiveTab('audit_form');
      showToast(
        isAr
          ? `تم بدء جلسة تدقيق لقسم: ${DEPARTMENTS[deptKey]?.[isAr ? 'ar' : 'en'] || deptKey}`
          : `Started audit session for: ${DEPARTMENTS[deptKey]?.[isAr ? 'ar' : 'en'] || deptKey}`,
        'info'
      );
    },
    [isAr, showToast]
  );

  const setAuditAnswerValue = useCallback(
    (standardId: string, actual: string, baseline: number | string, operator: string) => {
      const actualNum = parseFloat(actual);
      const baselineNum = parseFloat(String(baseline));
      let isDev = false;

      if (!isNaN(actualNum)) {
        if (operator === '<=') isDev = actualNum > baselineNum;
        else if (operator === '>=') isDev = actualNum < baselineNum;
        else if (operator === '==') isDev = actualNum !== baselineNum;
      }

      setAuditAnswers(prev => ({
        ...prev,
        [standardId]: {
          actual,
          isDeviation: isDev,
          rca: prev[standardId]?.rca || '',
          capaApproved: prev[standardId]?.capaApproved || false,
          photo: prev[standardId]?.photo || null,
        },
      }));
    },
    []
  );

  const setAuditAnswerRca = useCallback((standardId: string, rca: string) => {
    setAuditAnswers(prev => ({
      ...prev,
      [standardId]: {
        ...prev[standardId],
        actual: prev[standardId]?.actual || '',
        isDeviation: prev[standardId]?.isDeviation || false,
        photo: prev[standardId]?.photo || null,
        capaApproved: prev[standardId]?.capaApproved || false,
        rca,
      },
    }));
  }, []);

  const toggleAuditCapaApproved = useCallback((standardId: string) => {
    setAuditAnswers(prev => ({
      ...prev,
      [standardId]: {
        ...prev[standardId],
        actual: prev[standardId]?.actual || '',
        isDeviation: prev[standardId]?.isDeviation || false,
        photo: prev[standardId]?.photo || null,
        rca: prev[standardId]?.rca || '',
        capaApproved: !prev[standardId]?.capaApproved,
      },
    }));
  }, []);

  const attachPhotoEvidence = useCallback(
    (standardId: string, file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        setAuditAnswers(prev => ({
          ...prev,
          [standardId]: {
            ...prev[standardId],
            actual: prev[standardId]?.actual || '',
            isDeviation: prev[standardId]?.isDeviation || false,
            rca: prev[standardId]?.rca || '',
            capaApproved: prev[standardId]?.capaApproved || false,
            photo: reader.result as string,
          },
        }));
        showToast(
          isAr ? 'تم إرفاق صورة التوثيق بنجاح' : 'Evidence photo attached successfully',
          'success'
        );
      };
      reader.readAsDataURL(file);
    },
    [isAr, showToast]
  );

  const removePhotoEvidence = useCallback((standardId: string) => {
    setAuditAnswers(prev => ({
      ...prev,
      [standardId]: {
        ...prev[standardId],
        photo: null,
      },
    }));
  }, []);

  const clearAuditSession = useCallback(() => {
    setAuditAnswers({});
  }, []);

  const finalizeAuditSession = useCallback(
    (hasSignature: boolean): boolean => {
      if (!hasSignature) {
        showToast(
          isAr
            ? 'يجب التوقيع الرقمي لتوثيق التقرير أولاً'
            : 'Digital signature required to authenticate and finalize audit',
          'warning'
        );
        return false;
      }

      const relevantStandards = STANDARDS.filter(
        std => std.sectors.includes(currentSector) && std.depts.includes(selectedDept)
      );

      let compliantCount = 0;
      let evaluatedCount = 0;

      relevantStandards.forEach(std => {
        const answer = auditAnswers[std.id];
        if (answer && answer.actual !== '') {
          evaluatedCount++;
          if (!answer.isDeviation) {
            compliantCount++;
          }
        }
      });

      const scorePercent = evaluatedCount > 0 ? Math.round((compliantCount / evaluatedCount) * 100) : 0;
      const deptName = DEPARTMENTS[selectedDept]?.[isAr ? 'ar' : 'en'] || selectedDept;
      const roleName = ROLES.find(r => r.val === currentRole)?.[isAr ? 'ar' : 'en'] || currentRole;

      const record: AuditRecord = {
        id: Date.now(),
        type: 'AUDIT',
        date: clocks.gregorianDate,
        time: clocks.time,
        dept: deptName,
        deptKey: selectedDept,
        score: `${scorePercent}%`,
        user: roleName,
      };

      setArchivedAudits(prev => [record, ...prev]);

      // Confetti celebration if score is high!
      if (scorePercent >= 80) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore if canvas confetti is unavailable
        }
      }

      showToast(
        isAr
          ? 'تم ختم الوقت وحفظ التقرير وإدراجه بالأرشيف بنجاح'
          : 'Audit finalized, timestamped and archived successfully',
        'success'
      );

      setActiveTab('archive');
      return true;
    },
    [
      auditAnswers,
      clocks,
      currentRole,
      currentSector,
      isAr,
      selectedDept,
      showToast,
    ]
  );

  const deleteArchivedAudit = useCallback((id: number) => {
    setArchivedAudits(prev => prev.filter(a => a.id !== id));
  }, []);

  // NCR Actions
  const addNcr = useCallback(
    (ncrData: Omit<NcrRecord, 'id' | 'date' | 'status'>) => {
      const newNcr: NcrRecord = {
        id: `NCR-${Date.now()}`,
        type: ncrData.type,
        deptName: ncrData.deptName,
        std: ncrData.std || 'N/A',
        desc: ncrData.desc,
        date: clocks.gregorianDate,
        status: 'OPEN',
      };
      setNcrs(prev => [newNcr, ...prev]);
      showToast(
        isAr
          ? 'تم قيد مذكرة الـ NCR وتفعيل التنبيهات'
          : 'NCR logged and automated alerts dispatched',
        'success'
      );
    },
    [clocks.gregorianDate, isAr, showToast]
  );

  const closeNcr = useCallback(
    (id: string) => {
      setNcrs(prev =>
        prev.map(n => (n.id === id ? { ...n, status: 'CLOSED' as const } : n))
      );
      showToast(
        isAr
          ? 'تم إغلاق المذكرة والتحقق من الإجراء التصحيحي (CAPA)'
          : 'NCR closed and corrective action verified',
        'success'
      );
    },
    [isAr, showToast]
  );

  const deleteNcr = useCallback((id: string) => {
    setNcrs(prev => prev.filter(n => n.id !== id));
  }, []);

  // Visitor Actions
  const addVisitor = useCallback(
    (v: Omit<VisitorRecord, 'id' | 'timeIn' | 'timeOut'>) => {
      const newVisitor: VisitorRecord = {
        id: Date.now(),
        ...v,
        timeIn: clocks.time,
        timeOut: null,
      };
      setVisitors(prev => [newVisitor, ...prev]);
      showToast(
        isAr ? 'تم تسجيل دخول الزائر بنجاح' : 'Visitor checked in successfully',
        'success'
      );
    },
    [clocks.time, isAr, showToast]
  );

  const checkoutVisitor = useCallback(
    (id: number) => {
      setVisitors(prev =>
        prev.map(v => (v.id === id ? { ...v, timeOut: clocks.time } : v))
      );
      showToast(
        isAr ? 'تم تسجيل خروج الزائر وختم التوقيت' : 'Visitor checked out successfully',
        'info'
      );
    },
    [clocks.time, isAr, showToast]
  );

  // AI Complaint Analysis
  const analyzeComplaintAi = useCallback(() => {
    if (!complaint.text || !complaint.dept) {
      showToast(
        isAr ? 'يرجى إدخال الشكوى وتحديد القسم المعني' : 'Enter complaint text and select department',
        'warning'
      );
      return;
    }

    showToast(
      isAr
        ? 'جاري التحليل والمطابقة بالذكاء الاصطناعي...'
        : 'Analyzing and matching with AI root-cause models...',
      'info'
    );

    const deptName = DEPARTMENTS[complaint.dept]?.[isAr ? 'ar' : 'en'] || complaint.dept;

    setTimeout(() => {
      setComplaint(prev => ({
        ...prev,
        output: {
          reply: isAr
            ? `عزيزي العميل، نعتذر بشدة عن الإزعاج بخصوص (${deptName}). تم توجيه فريق الجودة والتدقيق للتعامل مع ملاحظاتك لضمان عدم تكرارها نهائياً.`
            : `Dear Valued Guest, we sincerely apologize for the inconvenience in (${deptName}). We have dispatched our quality audit team immediately.`,
          report: isAr
            ? `تحليل الذكاء الاصطناعي: رصد حيود تشغيلي يخرق بروتوكولات الجودة القياسية في (${deptName}). تم تفعيل بروتوكول CAPA وتصعيد التقرير للإدارة العليا.`
            : `AI Root Cause Analysis: Operational deviation detected breaching quality protocols in (${deptName}). Action: Auto-CAPA triggered and escalated to GM.`,
          capaImmediate: isAr
            ? `عزل السبب المباشر للشكوى في (${deptName}) فوراً، وتقديم اعتذار واسترضاء مباشر للعميل المتضرر.`
            : `Immediately contain the root cause in (${deptName}) and provide direct redress to the affected client.`,
          capaRootCause: isAr
            ? `تحقيق السبب الجذري (5-Whys) مطلوب من مشرف (${deptName}) خلال 48 ساعة: هل السبب نقص تدريب، إجراء غير موثّق، أم عطل معدة؟`
            : `Root-Cause Investigation (5-Whys) required from ${deptName} supervisor within 48h: training deficiency, unstandardized process, or hardware breakdown?`,
          capaPreventive: isAr
            ? `تحديث بند التدقيق الدوري الخاص بـ(${deptName}) وإضافة تدريب تعويضي للفريق لمنع التكرار.`
            : `Update recurring audit checklist for (${deptName}) and schedule refresher training for team.`,
          capaDeadline: isAr
            ? 'التصحيح الفوري: خلال ساعتين | التحقيق: 48 ساعة | الإجراء الوقائي: 7 أيام'
            : 'Immediate fix: 2 hours | Investigation: 48 hours | Preventive action: 7 days',
        },
      }));

      showToast(
        isAr
          ? 'تم توليد التقرير الاستراتيجي وتصعيده بنجاح'
          : 'Strategic CAPA report generated and escalated successfully',
        'success'
      );
    }, 1200);
  }, [complaint.dept, complaint.text, isAr, showToast]);

  // Global Dispatches
  const dispatchWhatsApp = useCallback(
    (message: string, phone?: string) => {
      sendWhatsAppMessage(message, phone || commSettings.gmWhatsapp);
      showToast(
        isAr ? 'جاري التحويل للواتساب...' : 'Redirecting to WhatsApp...',
        'info'
      );
    },
    [commSettings.gmWhatsapp, isAr, showToast]
  );

  const dispatchEmail = useCallback(
    (subject: string, body: string, recipient?: string) => {
      sendEmailClient(subject, body, recipient || commSettings.gmEmail);
      showToast(
        isAr ? 'جاري فتح تطبيق البريد الإلكتروني...' : 'Opening email client...',
        'info'
      );
    },
    [commSettings.gmEmail, isAr, showToast]
  );

  const printReport = useCallback(() => {
    showToast(
      isAr
        ? 'جاري تجهيز تقرير A4 للطباعة و PDF...'
        : 'Preparing A4 PDF report...',
      'info'
    );
    triggerPrintReport();
  }, [isAr, showToast]);

  return (
    <AuditContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        isAr,
        isDark,
        dir,
        isLoggedIn,
        currentRole,
        login,
        logout,
        isLoginModalOpen,
        setIsLoginModalOpen,
        activeTab,
        setActiveTab,
        currentSector,
        setCurrentSector,
        selectedDept,
        setSelectedDept,
        startAudit,
        clocks,
        toast,
        showToast,
        logoSvg,
        setLogoSvg,
        isLogoModalOpen,
        setIsLogoModalOpen,
        auditAnswers,
        setAuditAnswerValue,
        setAuditAnswerRca,
        toggleAuditCapaApproved,
        attachPhotoEvidence,
        removePhotoEvidence,
        finalizeAuditSession,
        clearAuditSession,
        archivedAudits,
        deleteArchivedAudit,
        ncrs,
        addNcr,
        closeNcr,
        deleteNcr,
        visitors,
        addVisitor,
        checkoutVisitor,
        complaint,
        setComplaint,
        analyzeComplaintAi,
        commSettings,
        setCommSettings,
        recallRisk,
        setRecallRisk,
        utilities,
        setUtilities,
        emergency,
        setEmergency,
        iotTelemetry,
        isTelemetrySimulating,
        toggleTelemetrySimulation,
        dispatchWhatsApp,
        dispatchEmail,
        printReport,
      }}
    >
      {children}
    </AuditContext.Provider>
  );
};

export const useAudit = (): AuditContextType => {
  const context = useContext(AuditContext);
  if (!context) {
    throw new Error('useAudit must be used within an AuditProvider');
  }
  return context;
};
