import { HaccpFlowStep } from '../types';

export const HACCP_FLOWS: Record<string, HaccpFlowStep[]> = {
  "_food": [
    {
      "label": {
        "ar": "استلام المواد الخام",
        "en": "Raw Material Receiving"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التخزين (مبرد/مجمد/جاف)",
        "en": "Storage (Chilled/Frozen/Dry)"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التحضير والتجهيز",
        "en": "Preparation & Prep"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "الطهي — مرحلة الطهي اللبي",
        "en": "Cooking — Core Temperature"
      },
      "isCCP": true,
      "limit": "> 75°C"
    },
    {
      "label": {
        "ar": "الحفظ الساخن / التبريد السريع",
        "en": "Hot Holding / Rapid Chilling"
      },
      "isCCP": true,
      "limit": "> 63°C"
    },
    {
      "label": {
        "ar": "التقديم للعميل",
        "en": "Service to Guest"
      },
      "isCCP": false
    }
  ],
  "hospitals": [
    {
      "label": {
        "ar": "استخدام الأداة (نقطة الاستخدام)",
        "en": "Instrument Use (Point of Use)"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التنظيف الأولي والتحلل",
        "en": "Pre-Cleaning & Decontamination"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "الفحص والتغليف",
        "en": "Inspection & Packaging"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التعقيم بالأوتوكلاف",
        "en": "Autoclave Sterilization"
      },
      "isCCP": true,
      "limit": "> 134°C"
    },
    {
      "label": {
        "ar": "التخزين المعقم",
        "en": "Sterile Storage"
      },
      "isCCP": true,
      "limit": "Event-Related"
    },
    {
      "label": {
        "ar": "التوزيع لنقطة الاستخدام",
        "en": "Distribution to Point of Use"
      },
      "isCCP": false
    }
  ],
  "clinics": [
    {
      "label": {
        "ar": "استخدام الأداة (نقطة الاستخدام)",
        "en": "Instrument Use (Point of Use)"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التنظيف الأولي والتحلل",
        "en": "Pre-Cleaning & Decontamination"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "الفحص والتغليف",
        "en": "Inspection & Packaging"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التعقيم بالأوتوكلاف",
        "en": "Autoclave Sterilization"
      },
      "isCCP": true,
      "limit": "> 121°C"
    },
    {
      "label": {
        "ar": "اختبار المؤشر الحيوي",
        "en": "Biological Indicator Test"
      },
      "isCCP": true,
      "limit": "Negative"
    },
    {
      "label": {
        "ar": "التخزين والتوزيع",
        "en": "Storage & Distribution"
      },
      "isCCP": false
    }
  ],
  "pharma_factories": [
    {
      "label": {
        "ar": "استلام المواد الخام/الفعالة",
        "en": "Raw Material/API Receiving"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "الوزن والصرف",
        "en": "Weighing & Dispensing"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التصنيع (خلط/تحبيب)",
        "en": "Manufacturing (Mixing/Granulation)"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التعقيم النهائي",
        "en": "Terminal Sterilization"
      },
      "isCCP": true,
      "limit": "> 121°C / 15min"
    },
    {
      "label": {
        "ar": "التعبئة بالغرف النظيفة",
        "en": "Filling in Cleanroom"
      },
      "isCCP": true,
      "limit": "≥ 15 Pa"
    },
    {
      "label": {
        "ar": "إفراج QP والتوزيع",
        "en": "QP Release & Distribution"
      },
      "isCCP": false
    }
  ],
  "chemical_factories": [
    {
      "label": {
        "ar": "استلام المواد الخام",
        "en": "Raw Material Receiving"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التخزين الآمن للمواد الخطرة",
        "en": "Hazmat Storage"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التغذية والخلط",
        "en": "Feed & Mixing"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التفاعل — تحكم حرارة/ضغط المفاعل",
        "en": "Reaction — Reactor Temp/Pressure"
      },
      "isCCP": true,
      "limit": "Safe Envelope"
    },
    {
      "label": {
        "ar": "الفحص المعملي للجودة",
        "en": "QC Lab Testing"
      },
      "isCCP": true,
      "limit": "PRV Set-Point"
    },
    {
      "label": {
        "ar": "التعبئة والشحن",
        "en": "Filling & Dispatch"
      },
      "isCCP": false
    }
  ],
  "textile_factories": [
    {
      "label": {
        "ar": "استلام الأقمشة/الخيوط",
        "en": "Fabric/Yarn Receiving"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التحضير (غسيل/تبييض)",
        "en": "Preparation (Scouring/Bleaching)"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "الصباغة — تحكم تركيز/حرارة",
        "en": "Dyeing — Chemical/Temp Control"
      },
      "isCCP": true,
      "limit": "Per Recipe"
    },
    {
      "label": {
        "ar": "القص والخياطة",
        "en": "Cutting & Sewing"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "كشف الإبر قبل التعبئة",
        "en": "Needle Detection Before Packing"
      },
      "isCCP": true,
      "limit": "0 Needles"
    },
    {
      "label": {
        "ar": "التعبئة والشحن",
        "en": "Packing & Dispatch"
      },
      "isCCP": false
    }
  ],
  "metal_factories": [
    {
      "label": {
        "ar": "استلام الخامات المعدنية",
        "en": "Raw Metal Receiving"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التشكيل/التشغيل الآلي",
        "en": "Forming/Machining"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "المعالجة الحرارية — تحكم الفرن",
        "en": "Heat Treatment — Furnace Control"
      },
      "isCCP": true,
      "limit": "Per Spec"
    },
    {
      "label": {
        "ar": "اللحام والتجميع",
        "en": "Welding & Assembly"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "فحص الأبعاد والجودة",
        "en": "Dimensional QC Checkpoint"
      },
      "isCCP": true,
      "limit": "± Tolerance"
    },
    {
      "label": {
        "ar": "التعبئة والشحن",
        "en": "Packing & Dispatch"
      },
      "isCCP": false
    }
  ],
  "construction_factories": [
    {
      "label": {
        "ar": "استلام الخامات (رمل/أسمنت/إلخ)",
        "en": "Raw Material Receiving"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "الخلط والمعايرة",
        "en": "Mixing & Batching"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التشكيل/الصب",
        "en": "Forming/Molding"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "الحرق/المعالجة — تحكم حرارة الفرن",
        "en": "Firing/Curing — Kiln Temp Control"
      },
      "isCCP": true,
      "limit": "Per Curve"
    },
    {
      "label": {
        "ar": "اختبار مقاومة الضغط",
        "en": "Compressive Strength Test"
      },
      "isCCP": true,
      "limit": "Per Grade"
    },
    {
      "label": {
        "ar": "التعبئة والشحن",
        "en": "Packing & Dispatch"
      },
      "isCCP": false
    }
  ],
  "hotels": [
    {
      "label": {
        "ar": "استلام المواد الخام",
        "en": "Raw Material Receiving"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التخزين (مبرد/مجمد/جاف)",
        "en": "Storage (Chilled/Frozen/Dry)"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التحضير والتجهيز",
        "en": "Preparation & Prep"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "الطهي — مرحلة الطهي اللبي",
        "en": "Cooking — Core Temperature"
      },
      "isCCP": true,
      "limit": "> 75°C"
    },
    {
      "label": {
        "ar": "الحفظ الساخن / التبريد السريع",
        "en": "Hot Holding / Rapid Chilling"
      },
      "isCCP": true,
      "limit": "> 63°C"
    },
    {
      "label": {
        "ar": "التقديم للعميل",
        "en": "Service to Guest"
      },
      "isCCP": false
    }
  ],
  "restaurants": [
    {
      "label": {
        "ar": "استلام المواد الخام",
        "en": "Raw Material Receiving"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التخزين (مبرد/مجمد/جاف)",
        "en": "Storage (Chilled/Frozen/Dry)"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التحضير والتجهيز",
        "en": "Preparation & Prep"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "الطهي — مرحلة الطهي اللبي",
        "en": "Cooking — Core Temperature"
      },
      "isCCP": true,
      "limit": "> 75°C"
    },
    {
      "label": {
        "ar": "الحفظ الساخن / التبريد السريع",
        "en": "Hot Holding / Rapid Chilling"
      },
      "isCCP": true,
      "limit": "> 63°C"
    },
    {
      "label": {
        "ar": "التقديم للعميل",
        "en": "Service to Guest"
      },
      "isCCP": false
    }
  ],
  "food_factories": [
    {
      "label": {
        "ar": "استلام المواد الخام",
        "en": "Raw Material Receiving"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التخزين (مبرد/مجمد/جاف)",
        "en": "Storage (Chilled/Frozen/Dry)"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "التحضير والتجهيز",
        "en": "Preparation & Prep"
      },
      "isCCP": false
    },
    {
      "label": {
        "ar": "الطهي — مرحلة الطهي اللبي",
        "en": "Cooking — Core Temperature"
      },
      "isCCP": true,
      "limit": "> 75°C"
    },
    {
      "label": {
        "ar": "الحفظ الساخن / التبريد السريع",
        "en": "Hot Holding / Rapid Chilling"
      },
      "isCCP": true,
      "limit": "> 63°C"
    },
    {
      "label": {
        "ar": "التقديم للعميل",
        "en": "Service to Guest"
      },
      "isCCP": false
    }
  ]
};
