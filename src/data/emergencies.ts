import { EmergencyProtocol } from '../types';

export const EMERGENCY_PROTOCOLS: EmergencyProtocol[] = [
  {
    "val": "poisoning",
    "ar": "تسمم غذائي مؤكد",
    "en": "Confirmed Food Poisoning",
    "sectors": [
      "hotels",
      "restaurants",
      "food_factories"
    ]
  },
  {
    "val": "contamination",
    "ar": "تلوث ميكروبي",
    "en": "Microbial Contamination",
    "sectors": [
      "hotels",
      "restaurants",
      "food_factories",
      "pharma_factories"
    ]
  },
  {
    "val": "allergen",
    "ar": "تعرض/بلاغ حساسية غذائية غير معلنة",
    "en": "Undeclared Allergen Exposure",
    "sectors": [
      "hotels",
      "restaurants",
      "food_factories"
    ]
  },
  {
    "val": "foreign_object",
    "ar": "جسم غريب داخل المنتج",
    "en": "Foreign Object Found in Product",
    "sectors": [
      "hotels",
      "restaurants",
      "food_factories",
      "textile_factories",
      "metal_factories"
    ]
  },
  {
    "val": "chemical",
    "ar": "تلوث كيميائي بالمنتج",
    "en": "Chemical Contamination of Product",
    "sectors": [
      "hotels",
      "restaurants",
      "food_factories",
      "pharma_factories",
      "textile_factories"
    ]
  },
  {
    "val": "coldchain",
    "ar": "انقطاع سلسلة التبريد",
    "en": "Cold Chain Failure",
    "sectors": [
      "hotels",
      "restaurants",
      "food_factories",
      "pharma_factories"
    ]
  },
  {
    "val": "recall",
    "ar": "بلاغ سحب من المورد/المصنّع",
    "en": "Supplier/Manufacturer Recall Notice",
    "sectors": [
      "hotels",
      "restaurants",
      "clinics",
      "food_factories",
      "pharma_factories",
      "textile_factories",
      "metal_factories",
      "construction_factories"
    ]
  },
  {
    "val": "outbreak",
    "ar": "اشتباه تفشي عدوى",
    "en": "Suspected Infection Outbreak",
    "sectors": [
      "hospitals",
      "clinics"
    ]
  },
  {
    "val": "meddevice",
    "ar": "سحب دواء/جهاز طبي",
    "en": "Medical Device/Drug Recall",
    "sectors": [
      "hospitals",
      "clinics",
      "pharma_factories"
    ]
  },
  {
    "val": "chemical_spill",
    "ar": "تسرب/انسكاب مادة كيميائية خطرة",
    "en": "Hazardous Chemical Spill/Leak",
    "sectors": [
      "chemical_factories",
      "textile_factories",
      "pharma_factories"
    ]
  },
  {
    "val": "machine_injury",
    "ar": "إصابة عمل خطيرة بالمعدات",
    "en": "Serious Machine-Related Injury",
    "sectors": [
      "metal_factories",
      "textile_factories",
      "construction_factories",
      "food_factories",
      "chemical_factories"
    ]
  },
  {
    "val": "structural",
    "ar": "خطر إنشائي/انهيار جزئي",
    "en": "Structural Hazard/Partial Collapse",
    "sectors": [
      "construction_factories",
      "metal_factories"
    ]
  },
  {
    "val": "fire",
    "ar": "حريق أو اشتباه حريق",
    "en": "Fire or Suspected Fire",
    "sectors": [
      "hotels",
      "restaurants",
      "hospitals",
      "clinics",
      "food_factories",
      "pharma_factories",
      "chemical_factories",
      "textile_factories",
      "metal_factories",
      "construction_factories"
    ]
  }
];
