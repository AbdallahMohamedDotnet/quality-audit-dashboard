import { ContainmentTemplate } from '../types';

export const CONTAINMENT_TEMPLATES: Record<string, ContainmentTemplate[]> = {
  "_food": [
    {
      "titleAr": "العزل الكلي بالمستودع",
      "titleEn": "Total Warehouse Isolation",
      "descAr": "تم التحفظ على الشحنة/التشغيلة المذكورة وإرفاق بطاقة \"محظور الاستخدام\".",
      "descEn": "Shipment/batch secured and tagged \"Do Not Use\"."
    },
    {
      "titleAr": "سحب العينات (Sampling)",
      "titleEn": "Pull Samples for Analysis",
      "descAr": "تم سحب العينات بطريقة معقمة وإرسالها لمعمل معتمد (ISO 17025).",
      "descEn": "Samples collected aseptically and sent to an accredited (ISO 17025) lab."
    }
  ],
  "hospitals": [
    {
      "titleAr": "عزل المنطقة/الجناح المتأثر",
      "titleEn": "Isolate Affected Ward/Area",
      "descAr": "تم عزل الجناح أو المنطقة المتأثرة وتقييد الحركة الدخول والخروج.",
      "descEn": "The affected ward/area has been isolated with restricted entry/exit."
    },
    {
      "titleAr": "إخطار مكافحة العدوى والجهة الصحية",
      "titleEn": "Notify Infection Control & Health Authority",
      "descAr": "تم إبلاغ لجنة مكافحة العدوى والجهة الصحية المختصة (GAHAR) فوراً.",
      "descEn": "Infection Control Committee and the relevant health authority (GAHAR) notified immediately."
    }
  ],
  "clinics": [
    {
      "titleAr": "عزل المنطقة/الجناح المتأثر",
      "titleEn": "Isolate Affected Area",
      "descAr": "تم عزل المنطقة المتأثرة وتقييد الدخول والخروج.",
      "descEn": "The affected area has been isolated with restricted entry/exit."
    },
    {
      "titleAr": "إخطار مكافحة العدوى والجهة الصحية",
      "titleEn": "Notify Infection Control & Health Authority",
      "descAr": "تم إبلاغ المسؤول الصحي والجهة الرقابية المختصة فوراً.",
      "descEn": "The health officer and relevant regulatory authority notified immediately."
    }
  ],
  "pharma_factories": [
    {
      "titleAr": "حجر الدفعة المتأثرة (Quarantine)",
      "titleEn": "Quarantine Affected Batch",
      "descAr": "تم حجر الدفعة كاملة وإرفاق بطاقة \"محظور الإفراج\" حتى انتهاء التحقيق.",
      "descEn": "The entire batch has been quarantined and tagged \"Release Hold\" pending investigation."
    },
    {
      "titleAr": "إخطار المسؤول المعتمد (QP)",
      "titleEn": "Notify Qualified Person (QP)",
      "descAr": "تم إخطار الشخص المعتمد وإدارة الشؤون التنظيمية فوراً.",
      "descEn": "The Qualified Person and Regulatory Affairs have been notified immediately."
    }
  ],
  "chemical_factories": [
    {
      "titleAr": "إخلاء وعزل المنطقة المتأثرة",
      "titleEn": "Evacuate & Isolate Affected Zone",
      "descAr": "تم إخلاء المنطقة وتفعيل محيط أمان وفق نشرة السلامة (MSDS).",
      "descEn": "The zone has been evacuated and a safety perimeter set per the MSDS."
    },
    {
      "titleAr": "تفعيل فريق الاستجابة للطوارئ الكيميائية",
      "titleEn": "Activate Chemical Emergency Response Team",
      "descAr": "تم استدعاء فريق الاستجابة المتخصص والجهات الرقابية المعنية.",
      "descEn": "The specialized response team and relevant regulators have been called in."
    }
  ],
  "textile_factories": [
    {
      "titleAr": "حجر التشغيلة المتأثرة",
      "titleEn": "Quarantine Affected Lot",
      "descAr": "تم حجر التشغيلة المذكورة وإرفاق بطاقة \"محظور الاستخدام\".",
      "descEn": "The affected lot has been quarantined and tagged \"Do Not Use\"."
    },
    {
      "titleAr": "سحب عينات لفحص المواد المقيدة",
      "titleEn": "Pull Samples for Restricted-Substance Testing",
      "descAr": "تم سحب عينات وإرسالها لمعمل معتمد لفحص قائمة ZDHC MRSL.",
      "descEn": "Samples collected and sent to an accredited lab for ZDHC MRSL testing."
    }
  ],
  "metal_factories": [
    {
      "titleAr": "حجر الدفعة/المعدة المتأثرة",
      "titleEn": "Quarantine Affected Batch/Equipment",
      "descAr": "تم حجر القطع المتأثرة وإيقاف المعدة المشتبه بها عن التشغيل.",
      "descEn": "Affected parts have been quarantined and the suspect equipment taken offline."
    },
    {
      "titleAr": "فحص هندسي للعيب المكتشف",
      "titleEn": "Engineering Inspection of the Defect",
      "descAr": "تم استدعاء مهندس الجودة لفحص العيب (لحام/أبعاد/مادة) وتوثيقه.",
      "descEn": "A quality engineer has been called to inspect and document the defect (weld/dimensional/material)."
    }
  ],
  "construction_factories": [
    {
      "titleAr": "تطويق المنطقة المتأثرة",
      "titleEn": "Cordon Off the Affected Area",
      "descAr": "تم تطويق المنطقة ومنع الدخول حتى التقييم الهندسي.",
      "descEn": "The area has been cordoned off and entry denied pending engineering assessment."
    },
    {
      "titleAr": "تقييم هندسي إنشائي عاجل",
      "titleEn": "Urgent Structural Engineering Assessment",
      "descAr": "تم استدعاء مهندس إنشائي معتمد لتقييم السلامة قبل استئناف العمل.",
      "descEn": "A certified structural engineer has been called to assess safety before work resumes."
    }
  ],
  "hotels": [
    {
      "titleAr": "العزل الكلي بالمستودع",
      "titleEn": "Total Warehouse Isolation",
      "descAr": "تم التحفظ على الشحنة/التشغيلة المذكورة وإرفاق بطاقة \"محظور الاستخدام\".",
      "descEn": "Shipment/batch secured and tagged \"Do Not Use\"."
    },
    {
      "titleAr": "سحب العينات (Sampling)",
      "titleEn": "Pull Samples for Analysis",
      "descAr": "تم سحب العينات بطريقة معقمة وإرسالها لمعمل معتمد (ISO 17025).",
      "descEn": "Samples collected aseptically and sent to an accredited (ISO 17025) lab."
    }
  ],
  "restaurants": [
    {
      "titleAr": "العزل الكلي بالمستودع",
      "titleEn": "Total Warehouse Isolation",
      "descAr": "تم التحفظ على الشحنة/التشغيلة المذكورة وإرفاق بطاقة \"محظور الاستخدام\".",
      "descEn": "Shipment/batch secured and tagged \"Do Not Use\"."
    },
    {
      "titleAr": "سحب العينات (Sampling)",
      "titleEn": "Pull Samples for Analysis",
      "descAr": "تم سحب العينات بطريقة معقمة وإرسالها لمعمل معتمد (ISO 17025).",
      "descEn": "Samples collected aseptically and sent to an accredited (ISO 17025) lab."
    }
  ],
  "food_factories": [
    {
      "titleAr": "العزل الكلي بالمستودع",
      "titleEn": "Total Warehouse Isolation",
      "descAr": "تم التحفظ على الشحنة/التشغيلة المذكورة وإرفاق بطاقة \"محظور الاستخدام\".",
      "descEn": "Shipment/batch secured and tagged \"Do Not Use\"."
    },
    {
      "titleAr": "سحب العينات (Sampling)",
      "titleEn": "Pull Samples for Analysis",
      "descAr": "تم سحب العينات بطريقة معقمة وإرسالها لمعمل معتمد (ISO 17025).",
      "descEn": "Samples collected aseptically and sent to an accredited (ISO 17025) lab."
    }
  ]
};
