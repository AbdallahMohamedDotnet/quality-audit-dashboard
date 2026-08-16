import { RecallItem } from '../types';

export const RECALL_ITEMS: Record<string, RecallItem[]> = {
  "_food": [
    {
      "val": "poultry",
      "emoji": "🍗",
      "ar": "دواجن (السالمونيلا)",
      "en": "Poultry (Salmonella)"
    },
    {
      "val": "meat",
      "emoji": "🥩",
      "ar": "لحوم حمراء (E. coli / Listeria)",
      "en": "Red Meat (E. coli / Listeria)"
    },
    {
      "val": "seafood",
      "emoji": "🐟",
      "ar": "أسماك وأغذية بحرية (هيستامين/فيبريو)",
      "en": "Seafood (Histamine / Vibrio)"
    },
    {
      "val": "eggs",
      "emoji": "🥚",
      "ar": "بيض ومنتجاته (السالمونيلا المعوية)",
      "en": "Eggs & Egg Products (S. Enteritidis)"
    },
    {
      "val": "dairy",
      "emoji": "🧀",
      "ar": "ألبان ومشتقاتها (الليستيريا)",
      "en": "Dairy Products (Listeria)"
    },
    {
      "val": "rice",
      "emoji": "🍚",
      "ar": "أرز ونشويات مطبوخة (Bacillus cereus)",
      "en": "Cooked Rice & Starches (Bacillus cereus)"
    },
    {
      "val": "rte",
      "emoji": "🥗",
      "ar": "أطعمة جاهزة للأكل/سلطات (تلوث تبادلي)",
      "en": "Ready-to-Eat/Salads (Cross-Contamination)"
    },
    {
      "val": "canned",
      "emoji": "🥫",
      "ar": "معلبات ومعبأ بالفراغ (Botulinum)",
      "en": "Canned/Vacuum-Packed (C. Botulinum)"
    },
    {
      "val": "allergen",
      "emoji": "⚠️",
      "ar": "مسببات الحساسية (تلوث تبادلي)",
      "en": "Allergens (Cross-Contact)"
    },
    {
      "val": "chemical",
      "emoji": "🧪",
      "ar": "تلوث كيميائي (مواد تنظيف)",
      "en": "Chemical Contamination (Cleaning Agents)"
    }
  ],
  "hospitals": [
    {
      "val": "ssi",
      "emoji": "🩸",
      "ar": "عدوى موقع جراحي (SSI)",
      "en": "Surgical Site Infection (SSI)"
    },
    {
      "val": "sterilfail",
      "emoji": "🧫",
      "ar": "فشل دورة تعقيم",
      "en": "Sterilization Cycle Failure"
    },
    {
      "val": "medication",
      "emoji": "💊",
      "ar": "خطأ دوائي عالي الخطورة",
      "en": "High-Alert Medication Error"
    },
    {
      "val": "bloodborne",
      "emoji": "🩹",
      "ar": "تعرض لسوائل جسدية/دم",
      "en": "Bloodborne/Body-Fluid Exposure"
    },
    {
      "val": "crossinfect",
      "emoji": "🦠",
      "ar": "عدوى متقاطعة بين المرضى",
      "en": "Cross-Infection Between Patients"
    }
  ],
  "clinics": [
    {
      "val": "sterilfail",
      "emoji": "🧫",
      "ar": "فشل دورة تعقيم",
      "en": "Sterilization Cycle Failure"
    },
    {
      "val": "crossinfect",
      "emoji": "🦠",
      "ar": "عدوى متقاطعة بين المرضى",
      "en": "Cross-Infection Between Patients"
    },
    {
      "val": "biopsy",
      "emoji": "🧪",
      "ar": "خطأ تسمية عينة خزعة",
      "en": "Biopsy Specimen Mislabeling"
    },
    {
      "val": "duwl",
      "emoji": "🚰",
      "ar": "تلوث خطوط مياه اليونيت السني",
      "en": "Dental Unit Waterline Contamination"
    }
  ],
  "pharma_factories": [
    {
      "val": "crosscontam",
      "emoji": "💊",
      "ar": "تلوث تبادلي بين المنتجات",
      "en": "Cross-Contamination Between Products"
    },
    {
      "val": "particulate",
      "emoji": "🔬",
      "ar": "تلوث جسيمي في الغرف النظيفة",
      "en": "Particulate Contamination in Cleanrooms"
    },
    {
      "val": "sterility",
      "emoji": "🧫",
      "ar": "فشل ضمان التعقيم",
      "en": "Sterility Assurance Failure"
    },
    {
      "val": "mislabel",
      "emoji": "🏷️",
      "ar": "خطأ في وسم الدفعة",
      "en": "Batch Mislabeling"
    }
  ],
  "chemical_factories": [
    {
      "val": "thermal",
      "emoji": "🔥",
      "ar": "انفلات حراري بالمفاعل",
      "en": "Reactor Thermal Runaway"
    },
    {
      "val": "toxicrelease",
      "emoji": "☣️",
      "ar": "تسرب مادة سامة",
      "en": "Toxic Substance Release"
    },
    {
      "val": "reactivemix",
      "emoji": "⚗️",
      "ar": "تفاعل خطر بين مواد",
      "en": "Hazardous Reactive Mixing"
    },
    {
      "val": "staticignite",
      "emoji": "⚡",
      "ar": "اشتعال بشحنة استاتيكية",
      "en": "Static-Charge Ignition"
    }
  ],
  "textile_factories": [
    {
      "val": "azodye",
      "emoji": "🎨",
      "ar": "أصباغ آزو محظورة",
      "en": "Restricted Azo Dyes"
    },
    {
      "val": "heavymetal",
      "emoji": "⚙️",
      "ar": "معادن ثقيلة بالصبغة",
      "en": "Heavy Metals in Dye"
    },
    {
      "val": "formaldehyde",
      "emoji": "🧪",
      "ar": "فورمالدهيد زائد بالقماش",
      "en": "Excess Formaldehyde in Fabric"
    },
    {
      "val": "needlebreak",
      "emoji": "🪡",
      "ar": "كسر إبرة داخل المنتج",
      "en": "Broken Needle in Product"
    }
  ],
  "metal_factories": [
    {
      "val": "welddefect",
      "emoji": "🔩",
      "ar": "عيب لحام غير مكتشف",
      "en": "Undetected Weld Defect"
    },
    {
      "val": "coolantcontam",
      "emoji": "🛢️",
      "ar": "تلوث بسائل التبريد",
      "en": "Coolant/Lubricant Contamination"
    },
    {
      "val": "dimensional",
      "emoji": "📏",
      "ar": "انحراف أبعاد حرج",
      "en": "Critical Dimensional Deviation"
    },
    {
      "val": "hydrogen",
      "emoji": "⚠️",
      "ar": "هشاشة هيدروجينية بالمعدن",
      "en": "Hydrogen Embrittlement"
    }
  ],
  "construction_factories": [
    {
      "val": "strengthfail",
      "emoji": "🧱",
      "ar": "فشل مقاومة الضغط",
      "en": "Compressive Strength Failure"
    },
    {
      "val": "silicadust",
      "emoji": "💨",
      "ar": "غبار سيليكا متبلور",
      "en": "Respirable Crystalline Silica"
    },
    {
      "val": "curingdefect",
      "emoji": "🌡️",
      "ar": "عيب معالجة/تصلب",
      "en": "Curing Process Defect"
    },
    {
      "val": "moisture",
      "emoji": "💧",
      "ar": "تسرب رطوبة بالمنتج المُخزَّن",
      "en": "Moisture Ingress in Stored Product"
    }
  ],
  "hotels": [
    {
      "val": "poultry",
      "emoji": "🍗",
      "ar": "دواجن (السالمونيلا)",
      "en": "Poultry (Salmonella)"
    },
    {
      "val": "meat",
      "emoji": "🥩",
      "ar": "لحوم حمراء (E. coli / Listeria)",
      "en": "Red Meat (E. coli / Listeria)"
    },
    {
      "val": "seafood",
      "emoji": "🐟",
      "ar": "أسماك وأغذية بحرية (هيستامين/فيبريو)",
      "en": "Seafood (Histamine / Vibrio)"
    },
    {
      "val": "eggs",
      "emoji": "🥚",
      "ar": "بيض ومنتجاته (السالمونيلا المعوية)",
      "en": "Eggs & Egg Products (S. Enteritidis)"
    },
    {
      "val": "dairy",
      "emoji": "🧀",
      "ar": "ألبان ومشتقاتها (الليستيريا)",
      "en": "Dairy Products (Listeria)"
    },
    {
      "val": "rice",
      "emoji": "🍚",
      "ar": "أرز ونشويات مطبوخة (Bacillus cereus)",
      "en": "Cooked Rice & Starches (Bacillus cereus)"
    },
    {
      "val": "rte",
      "emoji": "🥗",
      "ar": "أطعمة جاهزة للأكل/سلطات (تلوث تبادلي)",
      "en": "Ready-to-Eat/Salads (Cross-Contamination)"
    },
    {
      "val": "canned",
      "emoji": "🥫",
      "ar": "معلبات ومعبأ بالفراغ (Botulinum)",
      "en": "Canned/Vacuum-Packed (C. Botulinum)"
    },
    {
      "val": "allergen",
      "emoji": "⚠️",
      "ar": "مسببات الحساسية (تلوث تبادلي)",
      "en": "Allergens (Cross-Contact)"
    },
    {
      "val": "chemical",
      "emoji": "🧪",
      "ar": "تلوث كيميائي (مواد تنظيف)",
      "en": "Chemical Contamination (Cleaning Agents)"
    }
  ],
  "restaurants": [
    {
      "val": "poultry",
      "emoji": "🍗",
      "ar": "دواجن (السالمونيلا)",
      "en": "Poultry (Salmonella)"
    },
    {
      "val": "meat",
      "emoji": "🥩",
      "ar": "لحوم حمراء (E. coli / Listeria)",
      "en": "Red Meat (E. coli / Listeria)"
    },
    {
      "val": "seafood",
      "emoji": "🐟",
      "ar": "أسماك وأغذية بحرية (هيستامين/فيبريو)",
      "en": "Seafood (Histamine / Vibrio)"
    },
    {
      "val": "eggs",
      "emoji": "🥚",
      "ar": "بيض ومنتجاته (السالمونيلا المعوية)",
      "en": "Eggs & Egg Products (S. Enteritidis)"
    },
    {
      "val": "dairy",
      "emoji": "🧀",
      "ar": "ألبان ومشتقاتها (الليستيريا)",
      "en": "Dairy Products (Listeria)"
    },
    {
      "val": "rice",
      "emoji": "🍚",
      "ar": "أرز ونشويات مطبوخة (Bacillus cereus)",
      "en": "Cooked Rice & Starches (Bacillus cereus)"
    },
    {
      "val": "rte",
      "emoji": "🥗",
      "ar": "أطعمة جاهزة للأكل/سلطات (تلوث تبادلي)",
      "en": "Ready-to-Eat/Salads (Cross-Contamination)"
    },
    {
      "val": "canned",
      "emoji": "🥫",
      "ar": "معلبات ومعبأ بالفراغ (Botulinum)",
      "en": "Canned/Vacuum-Packed (C. Botulinum)"
    },
    {
      "val": "allergen",
      "emoji": "⚠️",
      "ar": "مسببات الحساسية (تلوث تبادلي)",
      "en": "Allergens (Cross-Contact)"
    },
    {
      "val": "chemical",
      "emoji": "🧪",
      "ar": "تلوث كيميائي (مواد تنظيف)",
      "en": "Chemical Contamination (Cleaning Agents)"
    }
  ],
  "food_factories": [
    {
      "val": "poultry",
      "emoji": "🍗",
      "ar": "دواجن (السالمونيلا)",
      "en": "Poultry (Salmonella)"
    },
    {
      "val": "meat",
      "emoji": "🥩",
      "ar": "لحوم حمراء (E. coli / Listeria)",
      "en": "Red Meat (E. coli / Listeria)"
    },
    {
      "val": "seafood",
      "emoji": "🐟",
      "ar": "أسماك وأغذية بحرية (هيستامين/فيبريو)",
      "en": "Seafood (Histamine / Vibrio)"
    },
    {
      "val": "eggs",
      "emoji": "🥚",
      "ar": "بيض ومنتجاته (السالمونيلا المعوية)",
      "en": "Eggs & Egg Products (S. Enteritidis)"
    },
    {
      "val": "dairy",
      "emoji": "🧀",
      "ar": "ألبان ومشتقاتها (الليستيريا)",
      "en": "Dairy Products (Listeria)"
    },
    {
      "val": "rice",
      "emoji": "🍚",
      "ar": "أرز ونشويات مطبوخة (Bacillus cereus)",
      "en": "Cooked Rice & Starches (Bacillus cereus)"
    },
    {
      "val": "rte",
      "emoji": "🥗",
      "ar": "أطعمة جاهزة للأكل/سلطات (تلوث تبادلي)",
      "en": "Ready-to-Eat/Salads (Cross-Contamination)"
    },
    {
      "val": "canned",
      "emoji": "🥫",
      "ar": "معلبات ومعبأ بالفراغ (Botulinum)",
      "en": "Canned/Vacuum-Packed (C. Botulinum)"
    },
    {
      "val": "allergen",
      "emoji": "⚠️",
      "ar": "مسببات الحساسية (تلوث تبادلي)",
      "en": "Allergens (Cross-Contact)"
    },
    {
      "val": "chemical",
      "emoji": "🧪",
      "ar": "تلوث كيميائي (مواد تنظيف)",
      "en": "Chemical Contamination (Cleaning Agents)"
    }
  ]
};
