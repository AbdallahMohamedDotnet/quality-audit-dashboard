import { DepartmentInfo } from '../types';

export const DEPARTMENTS: Record<string, DepartmentInfo> = {
  "front_office": {
    "ar": "المكاتب الأمامية والاستقبال",
    "en": "Front Office & Reception"
  },
  "guest_rooms": {
    "ar": "غرف النزلاء",
    "en": "Guest Rooms"
  },
  "housekeeping": {
    "ar": "الإشراف الداخلي",
    "en": "Housekeeping"
  },
  "spa_recreation": {
    "ar": "السبا والأنشطة الترفيهية",
    "en": "Spa & Recreation"
  },
  "er": {
    "ar": "قسم الطوارئ (ER)",
    "en": "Emergency Room (ER)"
  },
  "icu": {
    "ar": "العناية المركزة (ICU)",
    "en": "Intensive Care Unit (ICU)"
  },
  "or": {
    "ar": "غرف العمليات (OR)",
    "en": "Operating Theaters (OR)"
  },
  "inpatient": {
    "ar": "التنويم الداخلي",
    "en": "Inpatient Wards"
  },
  "pharmacy": {
    "ar": "الصيدلية المركزية",
    "en": "Central Pharmacy"
  },
  "cssd": {
    "ar": "التعقيم المركزي (CSSD)",
    "en": "CSSD (Sterilization)"
  },
  "radiology": {
    "ar": "الأشعة والتصوير الطبي",
    "en": "Radiology Department"
  },
  "lab": {
    "ar": "المختبرات والتحاليل",
    "en": "Pathology & Labs"
  },
  "dental": {
    "ar": "عيادات الأسنان",
    "en": "Dental Clinic"
  },
  "derma": {
    "ar": "عيادات الجلدية",
    "en": "Dermatology Clinic"
  },
  "medical_waste": {
    "ar": "النفايات الطبية",
    "en": "Medical Waste Management"
  },
  "production_line": {
    "ar": "خطوط الإنتاج والتشغيل",
    "en": "Processing & Production Line"
  },
  "qc_lab": {
    "ar": "مختبر مراقبة الجودة",
    "en": "Quality Control Lab"
  },
  "packaging": {
    "ar": "التعبئة والتغليف",
    "en": "Packaging & Labeling"
  },
  "dispatch": {
    "ar": "الشحن والتوزيع",
    "en": "Dispatch & Shipping"
  },
  "main_kitchen": {
    "ar": "المطبخ الرئيسي",
    "en": "Main Kitchen"
  },
  "f_b": {
    "ar": "الأغذية والمشروبات",
    "en": "Food & Beverage (F&B)"
  },
  "prep_area": {
    "ar": "منطقة التحضير",
    "en": "Preparation Area"
  },
  "service_foh": {
    "ar": "منطقة الخدمة (FOH)",
    "en": "Service Area (FOH)"
  },
  "stewarding": {
    "ar": "الاستيوارد وغسيل المعدات",
    "en": "Stewarding & Sanitation"
  },
  "warehouses": {
    "ar": "المخازن والمستودعات الشاملة",
    "en": "Warehouses & Storage"
  },
  "cold_storage": {
    "ar": "ثلاجات التبريد والتجميد",
    "en": "Cold Storage / Freezers"
  },
  "receiving": {
    "ar": "الاستلام والفحص الفني",
    "en": "Receiving & Inspection"
  },
  "suppliers": {
    "ar": "إدارة الموردين والتعاقدات",
    "en": "Supplier Management"
  },
  "engineering": {
    "ar": "الهندسة والصيانة",
    "en": "Engineering & Maintenance"
  },
  "safety": {
    "ar": "الأمن والسلامة",
    "en": "Security & Safety"
  },
  "hr": {
    "ar": "الموارد البشرية",
    "en": "Human Resources"
  },
  "hygiene_gates": {
    "ar": "بوابات التعقيم والنظافة",
    "en": "Personnel Hygiene Gates"
  },
  "facility_infrastructure": {
    "ar": "البنية التحتية والتصميم الصحي",
    "en": "Facility Infrastructure & Sanitary Design"
  },
  "visitor_log": {
    "ar": "سجل وإجراءات الزوار",
    "en": "Visitor Log & Procedures"
  }
};

export const SECTOR_DEPARTMENTS: Record<string, string[]> = {
  "hotels": [
    "front_office",
    "guest_rooms",
    "f_b",
    "main_kitchen",
    "housekeeping",
    "engineering",
    "spa_recreation",
    "safety",
    "hr",
    "warehouses",
    "receiving",
    "suppliers",
    "facility_infrastructure",
    "visitor_log"
  ],
  "restaurants": [
    "service_foh",
    "main_kitchen",
    "prep_area",
    "warehouses",
    "cold_storage",
    "stewarding",
    "engineering",
    "safety",
    "hr",
    "receiving",
    "suppliers",
    "facility_infrastructure",
    "visitor_log"
  ],
  "hospitals": [
    "er",
    "icu",
    "or",
    "inpatient",
    "pharmacy",
    "cssd",
    "radiology",
    "lab",
    "medical_waste",
    "engineering",
    "safety",
    "hr",
    "warehouses",
    "receiving",
    "suppliers",
    "facility_infrastructure",
    "visitor_log"
  ],
  "clinics": [
    "front_office",
    "dental",
    "derma",
    "cssd",
    "pharmacy",
    "lab",
    "engineering",
    "safety",
    "hr",
    "warehouses",
    "receiving",
    "suppliers",
    "facility_infrastructure",
    "visitor_log"
  ],
  "food_factories": [
    "warehouses",
    "production_line",
    "qc_lab",
    "packaging",
    "dispatch",
    "engineering",
    "hygiene_gates",
    "safety",
    "hr",
    "receiving",
    "suppliers",
    "facility_infrastructure",
    "visitor_log"
  ],
  "pharma_factories": [
    "warehouses",
    "production_line",
    "qc_lab",
    "packaging",
    "dispatch",
    "engineering",
    "hygiene_gates",
    "safety",
    "hr",
    "receiving",
    "suppliers",
    "facility_infrastructure",
    "visitor_log"
  ],
  "chemical_factories": [
    "warehouses",
    "production_line",
    "qc_lab",
    "packaging",
    "dispatch",
    "engineering",
    "hygiene_gates",
    "safety",
    "hr",
    "receiving",
    "suppliers",
    "facility_infrastructure",
    "visitor_log"
  ],
  "textile_factories": [
    "warehouses",
    "production_line",
    "qc_lab",
    "packaging",
    "dispatch",
    "engineering",
    "hygiene_gates",
    "safety",
    "hr",
    "receiving",
    "suppliers",
    "facility_infrastructure",
    "visitor_log"
  ],
  "metal_factories": [
    "warehouses",
    "production_line",
    "qc_lab",
    "packaging",
    "dispatch",
    "engineering",
    "hygiene_gates",
    "safety",
    "hr",
    "receiving",
    "suppliers",
    "facility_infrastructure",
    "visitor_log"
  ],
  "construction_factories": [
    "warehouses",
    "production_line",
    "qc_lab",
    "packaging",
    "dispatch",
    "engineering",
    "hygiene_gates",
    "safety",
    "hr",
    "receiving",
    "suppliers",
    "facility_infrastructure",
    "visitor_log"
  ]
};
