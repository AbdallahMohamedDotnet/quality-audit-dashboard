import { Standard } from '../types';

export const STANDARDS: Standard[] = [
  {
    "id": "FO-01",
    "sectors": [
      "hotels",
      "clinics"
    ],
    "depts": [
      "front_office"
    ],
    "code": "ISO9001-FO",
    "standard": "ISO 9001",
    "baseline": 5,
    "operator": "<=",
    "unit": "Min",
    "desc": {
      "ar": "معدل زمن انتظار العميل/النزيل لإتمام إجراءات الوصول.",
      "en": "Average guest/patient waiting time for intake procedures."
    },
    "autoAction": {
      "ar": "فتح كاونتر استقبال إضافي واستدعاء مدير المناوبة.",
      "en": "Open an additional reception counter and call Duty Manager."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FO-02",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "front_office"
    ],
    "code": "USALI-REV",
    "standard": "USALI",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة تقرير المراجعة الليلية للإيرادات.",
      "en": "Night Audit Revenue Reconciliation Match."
    },
    "autoAction": {
      "ar": "إيقاف إغلاق الوردية في النظام وبدء تسوية يدوية للدفاتر.",
      "en": "Suspend PMS shift closure and initiate manual ledger reconciliation."
    },
    "timeline": {
      "ar": "قبل انتهاء الوردية",
      "en": "Before Shift End"
    }
  },
  {
    "id": "HK-01",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "guest_rooms",
      "housekeeping"
    ],
    "code": "CRISTAL-CLN",
    "standard": "Intertek Cristal",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "معدل تطهير وتعقيم نقاط اللمس المتكررة بالغرف.",
      "en": "Disinfection of high-contact objects in guest suites."
    },
    "autoAction": {
      "ar": "إلزام موظفي الإشراف بإعادة تطهير الهواتف والأسطح.",
      "en": "Instruct housekeeping crew to re-sanitize objects."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "WH-01",
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
    ],
    "depts": [
      "warehouses",
      "cold_storage"
    ],
    "code": "HACCP-TEMP",
    "standard": "HACCP / GAHAR",
    "baseline": 4,
    "operator": "<=",
    "unit": "°C",
    "desc": {
      "ar": "درجة حرارة ثلاجات التبريد للحفظ (أغذية/أدوية).",
      "en": "Cold Storage / Chiller Temperature limit."
    },
    "autoAction": {
      "ar": "نقل المحتويات لثلاجة بديلة فوراً واستدعاء الصيانة.",
      "en": "Transfer items to backup chiller. Call maintenance."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "WH-02",
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
    ],
    "depts": [
      "warehouses"
    ],
    "code": "ISO14001-HUM",
    "standard": "ISO 14001",
    "baseline": 60,
    "operator": "<=",
    "unit": "%",
    "desc": {
      "ar": "مراقبة الرطوبة النسبية داخل المستودع.",
      "en": "Monitoring relative humidity inside the storage."
    },
    "autoAction": {
      "ar": "تشغيل أجهزة سحب الرطوبة فوراً لتجنب التعفن.",
      "en": "Activate dehumidifiers immediately."
    },
    "timeline": {
      "ar": "خلال ساعتين",
      "en": "Within 2 Hours"
    }
  },
  {
    "id": "WH-03",
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
    ],
    "depts": [
      "warehouses"
    ],
    "code": "GMP-FIFO",
    "standard": "GMP / ISO 9001",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام بتدوير المخزون (FIFO) وتواريخ الصلاحية.",
      "en": "FIFO & Expiry Date Rotation Compliance."
    },
    "autoAction": {
      "ar": "عزل المواد منتهية الصلاحية وإيقاف الصرف.",
      "en": "Quarantine expired items and lock warehouse issuing."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SUP-01",
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
    ],
    "depts": [
      "suppliers"
    ],
    "code": "ISO37001-AB",
    "standard": "ISO 37001",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تضمين بنود الحوكمة ومكافحة الرشوة في العقود.",
      "en": "Inclusion of Anti-Bribery clauses in supplier contracts."
    },
    "autoAction": {
      "ar": "تجميد عقود المورد الممتنع وإعادة صياغة الشروط.",
      "en": "Suspend supplier contracts and rewrite terms."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "REC-01",
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
    ],
    "depts": [
      "receiving"
    ],
    "code": "ISO22000-REC",
    "standard": "ISO 22000 / HACCP",
    "baseline": 4,
    "operator": "<=",
    "unit": "°C",
    "desc": {
      "ar": "نظافة ودرجة حرارة سيارات التوريد المبرد.",
      "en": "Inbound Delivery Vehicle Temperature verification."
    },
    "autoAction": {
      "ar": "رفض الشحنة فوراً على الرصيف وإخطار المورد.",
      "en": "Reject delivery instantly at dock."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "KIT-01",
    "sectors": [
      "hotels",
      "restaurants"
    ],
    "depts": [
      "main_kitchen",
      "prep_area"
    ],
    "code": "IFS-CC",
    "standard": "IFS / HACCP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "منع التلوث التبادلي عبر ألواح التقطيع الملونة.",
      "en": "Eliminating cross-contamination via color-coded boards."
    },
    "autoAction": {
      "ar": "مصادرة ألواح التقطيع التالفة وتوزيع المعتمدة.",
      "en": "Confiscate non-compliant cutting boards."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "KIT-02",
    "sectors": [
      "hotels",
      "restaurants"
    ],
    "depts": [
      "main_kitchen"
    ],
    "code": "HACCP-CORE",
    "standard": "HACCP",
    "baseline": 75,
    "operator": ">=",
    "unit": "°C",
    "desc": {
      "ar": "وصول حرارة لب اللحوم المطبوخة للحد الآمن.",
      "en": "Cooking core temperature reaching safe limits."
    },
    "autoAction": {
      "ar": "إعادة الطهي فوراً لضمان القضاء على البكتيريا.",
      "en": "Re-cook food immediately to secure thermal limits."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MED-01",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "cssd",
      "dental"
    ],
    "code": "GAHAR-INF",
    "standard": "GAHAR / ISO 13485",
    "baseline": 121,
    "operator": ">=",
    "unit": "°C",
    "desc": {
      "ar": "درجة حرارة دورة التعقيم بجهاز الأوتوكلاف.",
      "en": "Autoclave Sterilization Cycle Temp."
    },
    "autoAction": {
      "ar": "رفض الدورة، حجر الأدوات الطبية، وإجراء اختبار.",
      "en": "Reject cycle, quarantine instruments, run test."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MED-02",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "er",
      "icu",
      "or"
    ],
    "code": "JCI-PAT",
    "standard": "JCI / ISO 9001",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة بروتوكول تحديد هوية المريض المزدوج.",
      "en": "Dual patient identification protocol compliance."
    },
    "autoAction": {
      "ar": "إيقاف الإجراء الطبي فوراً وتأكيد الهوية.",
      "en": "Halt medical procedure instantly and confirm ID."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MED-03",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "medical_waste"
    ],
    "code": "ISO14001-WST",
    "standard": "ISO 14001",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الفصل السليم للنفايات الطبية الخطرة في حاويات معتمدة.",
      "en": "Proper segregation of hazardous medical waste."
    },
    "autoAction": {
      "ar": "إعادة فرز الحاويات وتطبيق بروتوكول مكافحة العدوى.",
      "en": "Re-sort containers and apply infection control protocol."
    },
    "timeline": {
      "ar": "نفس الوردية",
      "en": "Same Shift"
    }
  },
  {
    "id": "FAC-01",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "FSSC-PRD",
    "standard": "FSSC 22000",
    "baseline": 0,
    "operator": "<=",
    "unit": "Count",
    "desc": {
      "ar": "خلو خط الإنتاج من الملوثات الفيزيائية (زجاج/معادن).",
      "en": "Production line free of physical contaminants."
    },
    "autoAction": {
      "ar": "إيقاف الخط فوراً وإعادة معايرة كاشف المعادن.",
      "en": "Halt line instantly and recalibrate metal detector."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FAC-02",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "GMP-HYG",
    "standard": "GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تطهير الأيدي والأحذية قبل دخول صالة الإنتاج.",
      "en": "Hand and footwear sanitization before entry."
    },
    "autoAction": {
      "ar": "منع دخول العامل وتوجيهه لإعادة التطهير بالكامل.",
      "en": "Deny entry and instruct worker to re-sanitize completely."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ENG-01",
    "sectors": [
      "hotels",
      "restaurants",
      "food_factories",
      "hospitals"
    ],
    "depts": [
      "engineering",
      "safety"
    ],
    "code": "ISO50001-ENG",
    "standard": "ISO 50001",
    "baseline": 90,
    "operator": ">=",
    "unit": "%",
    "desc": {
      "ar": "كفاءة عمل أنظمة التكييف المركزي وترشيد الطاقة.",
      "en": "HVAC efficiency and energy conservation."
    },
    "autoAction": {
      "ar": "صيانة الفلاتر وضبط إعدادات التبريد.",
      "en": "Clean filters and adjust cooling settings."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "ENG-02",
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
    ],
    "depts": [
      "safety"
    ],
    "code": "OSHA-FIRE",
    "standard": "OSHA",
    "baseline": 7,
    "operator": ">=",
    "unit": "Bar",
    "desc": {
      "ar": "فحص جاهزية مضخات الحريق وضغط الشبكة.",
      "en": "Fire pump pressure and operational status."
    },
    "autoAction": {
      "ar": "إصلاح الخلل بمضخة الحريق آلياً.",
      "en": "Fix emergency fire pump leakage."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FO-03",
    "sectors": [
      "hotels",
      "clinics"
    ],
    "depts": [
      "front_office"
    ],
    "code": "ISO27001-PRIV",
    "standard": "ISO/IEC 27001",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تخزين بيانات النزلاء/المرضى الشخصية بشكل آمن ومؤمن بكلمة مرور دون تركها ظاهرة على الشاشات.",
      "en": "Guest/patient personal data secured and password-protected, never left visible on unattended screens."
    },
    "autoAction": {
      "ar": "قفل الشاشة فوراً وتغيير كلمة مرور النظام المشتركة.",
      "en": "Lock screen immediately and rotate the shared system password."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FO-04",
    "sectors": [
      "hotels",
      "clinics"
    ],
    "depts": [
      "front_office"
    ],
    "code": "NFPA101-EVAC",
    "standard": "NFPA 101 / Civil Defense",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "وضوح لافتات مخارج الطوارئ وخريطة الإخلاء عند منطقة الاستقبال.",
      "en": "Emergency exit signage and evacuation map clearly displayed at the reception area."
    },
    "autoAction": {
      "ar": "تركيب اللافتات المضيئة فوراً وإبلاغ مسؤول السلامة.",
      "en": "Install illuminated signage immediately and notify the safety officer."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "FO-05",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "front_office"
    ],
    "code": "PCI-DSS-PAY",
    "standard": "PCI-DSS v4.0",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "عدم تدوين أو تصوير بيانات بطاقات الدفع الكاملة (رقم البطاقة/CVV) على أي مستند ورقي.",
      "en": "Full payment card data (PAN/CVV) never handwritten or photographed on paper documents."
    },
    "autoAction": {
      "ar": "إتلاف المستند فوراً بآلة التمزيق وإبلاغ إدارة المالية.",
      "en": "Shred the document immediately and notify Finance."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FO-06",
    "sectors": [
      "hotels",
      "clinics"
    ],
    "depts": [
      "front_office"
    ],
    "code": "ISO10002-CMPL",
    "standard": "ISO 10002",
    "baseline": 48,
    "operator": "<=",
    "unit": "Hour",
    "desc": {
      "ar": "زمن الرد الرسمي على شكاوى النزلاء/المرضى المسجلة عبر أي قناة.",
      "en": "Formal response time to logged guest/patient complaints across any channel."
    },
    "autoAction": {
      "ar": "تصعيد الشكوى لمدير الجودة وإرسال رد مبدئي للعميل خلال ساعة.",
      "en": "Escalate to the QA Manager and send an initial acknowledgment within one hour."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "FO-07",
    "sectors": [
      "hotels",
      "clinics"
    ],
    "depts": [
      "front_office"
    ],
    "code": "EOS-ACCS",
    "standard": "EOS / Universal Access Code",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توفر ممر وحمام يسمحان بوصول ذوي الإعاقة إلى منطقة الاستقبال دون عوائق.",
      "en": "A barrier-free ramp and accessible restroom are available for guests/patients with disabilities."
    },
    "autoAction": {
      "ar": "إزالة العائق فوراً وتوفير كرسي متحرك احتياطي.",
      "en": "Remove the obstruction immediately and provide a backup wheelchair."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "HK-02",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "guest_rooms",
      "housekeeping"
    ],
    "code": "WHO-LEGIO",
    "standard": "WHO Water Safety / ISO 22000",
    "baseline": 50,
    "operator": "<=",
    "unit": "°C",
    "desc": {
      "ar": "درجة حرارة مياه التسخين المركزي عند أبعد نقطة صرف لمنع تكاثر بكتيريا الليجيونيلا (خزان >60°C، نقطة الصرف >50°C).",
      "en": "Hot water temperature at the furthest outlet to control Legionella growth (tank >60°C, outlet >50°C)."
    },
    "autoAction": {
      "ar": "تصريف الخط وتعقيمه حرارياً فوراً وإبلاغ الهندسة.",
      "en": "Flush and thermally disinfect the line immediately and notify Engineering."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "HK-03",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "housekeeping"
    ],
    "code": "COSHH-CHEM",
    "standard": "COSHH / GHS",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تخزين المواد الكيماوية للتنظيف في عبواتها الأصلية المعنونة وبعيداً عن مواد الأغذية.",
      "en": "Cleaning chemicals stored in original labeled containers, segregated from any food-contact items."
    },
    "autoAction": {
      "ar": "إعادة التعنون فوراً وعزل المواد غير المعنونة.",
      "en": "Re-label immediately and quarantine unlabeled containers."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "HK-04",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "housekeeping"
    ],
    "code": "CDC-LINEN",
    "standard": "CDC / WHO Linen Guidance",
    "baseline": 71,
    "operator": ">=",
    "unit": "°C",
    "desc": {
      "ar": "درجة حرارة غسيل المفروشات والمناشف لضمان القضاء على الميكروبات (دورة ساخنة لا تقل عن 71°C لمدة 25 دقيقة).",
      "en": "Linen wash cycle temperature to ensure microbial kill (hot cycle ≥71°C for 25 minutes)."
    },
    "autoAction": {
      "ar": "إعادة غسل الدفعة على دورة التطهير الحراري الصحيحة.",
      "en": "Re-wash the batch on the correct thermal-disinfection cycle."
    },
    "timeline": {
      "ar": "نفس الوردية",
      "en": "Same Shift"
    }
  },
  {
    "id": "HK-05",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "housekeeping"
    ],
    "code": "OSHA-BBP",
    "standard": "OSHA Bloodborne Pathogens",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توفر عدة التعامل مع الإبر/المخلفات الحادة الموجودة بالغرف مع بروتوكول تبليغ واضح.",
      "en": "A sharps/biohazard handling kit is available with a clear reporting protocol for items found in rooms."
    },
    "autoAction": {
      "ar": "عزل الغرفة، ارتداء القفازات المقاومة للثقب، وإبلاغ رئيس الأمن.",
      "en": "Isolate the room, don puncture-resistant gloves, and notify Security."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "HK-06",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "guest_rooms"
    ],
    "code": "EOS-ELEC",
    "standard": "EOS / IEC 60335",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سلامة الأسلاك الكهربائية للأجهزة داخل الغرفة (غلاية، ثلاجة صغيرة) بدون أي تلف ظاهر.",
      "en": "Electrical safety of in-room appliances (kettle, mini-fridge) with no visible cord damage."
    },
    "autoAction": {
      "ar": "سحب الجهاز التالف فوراً واستبداله.",
      "en": "Remove the damaged appliance immediately and replace it."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SPA-01",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "spa_recreation"
    ],
    "code": "WHO-POOL",
    "standard": "WHO / EOS Pool Water Code",
    "baseline": 3,
    "operator": ">=",
    "unit": "ppm",
    "desc": {
      "ar": "تركيز الكلور الحر المتبقي في مياه المسبح ضمن الحد الآمن (1-3 ppm).",
      "en": "Free residual chlorine level in pool water within the safe range (1-3 ppm)."
    },
    "autoAction": {
      "ar": "إغلاق المسبح فوراً وضبط جرعة الكلور قبل إعادة الفتح.",
      "en": "Close the pool immediately and correct the chlorine dosing before reopening."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SPA-02",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "spa_recreation"
    ],
    "code": "WHO-POOL-PH",
    "standard": "WHO / EOS Pool Water Code",
    "baseline": 7.6,
    "operator": "<=",
    "unit": "pH",
    "desc": {
      "ar": "درجة حموضة مياه المسبح ضمن النطاق الآمن (7.2 - 7.6 pH).",
      "en": "Pool water pH maintained within the safe range (7.2 - 7.6 pH)."
    },
    "autoAction": {
      "ar": "إعادة معايرة جرعة الأحماض/القلويات فوراً.",
      "en": "Recalibrate the acid/alkaline dosing pump immediately."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SPA-03",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "spa_recreation"
    ],
    "code": "ISO9001-LIFEGUARD",
    "standard": "ISO 9001 / Local Safety Code",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "وجود منقذ معتمد (Lifeguard) أثناء ساعات تشغيل المسبح مع سارية إنقاذ وطوق نجاة ظاهرين.",
      "en": "A certified lifeguard is present during pool operating hours, with a visible rescue pole and ring buoy."
    },
    "autoAction": {
      "ar": "إغلاق المسبح فوراً حتى حضور منقذ معتمد.",
      "en": "Close the pool immediately until a certified lifeguard is present."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SPA-04",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "spa_recreation"
    ],
    "code": "WHO-LEGIO-SPA",
    "standard": "WHO Water Safety",
    "baseline": 40,
    "operator": "<=",
    "unit": "°C",
    "desc": {
      "ar": "ضبط درجة حرارة أحواض الجاكوزي لمنع تكاثر الليجيونيلا مع صيانة دورية لفلاتر الهواء والماء.",
      "en": "Jacuzzi/hot-tub temperature controlled to limit Legionella growth, with scheduled air/water filter maintenance."
    },
    "autoAction": {
      "ar": "إخلاء الحوض وتطهيره بالكلور المركز قبل إعادة الاستخدام.",
      "en": "Drain the tub and shock-chlorinate it before returning to service."
    },
    "timeline": {
      "ar": "خلال ساعتين",
      "en": "Within 2 Hours"
    }
  },
  {
    "id": "SPA-05",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "spa_recreation"
    ],
    "code": "ISO9001-LIC",
    "standard": "ISO 9001 / MOH License",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان تراخيص المعالجين وأخصائيي التدليك واعتمادهم من الجهات الصحية المختصة.",
      "en": "Massage therapists and spa practitioners hold valid, current licensing from the relevant health authority."
    },
    "autoAction": {
      "ar": "إيقاف المعالج غير المرخص عن العمل فوراً لحين التجديد.",
      "en": "Suspend the unlicensed practitioner from duty immediately pending renewal."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FB-01",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "f_b"
    ],
    "code": "HACCP-BUFFET",
    "standard": "HACCP",
    "baseline": 63,
    "operator": ">=",
    "unit": "°C",
    "desc": {
      "ar": "درجة حرارة حفظ الأطعمة الساخنة على خط البوفيه المفتوح (يجب ألا تقل عن 63°C).",
      "en": "Hot-holding temperature of open buffet items (must not drop below 63°C)."
    },
    "autoAction": {
      "ar": "سحب الصنف فوراً لإعادة تسخينه أو التخلص منه إذا تجاوز ساعتين خارج النطاق.",
      "en": "Pull the item immediately for reheating, or discard if it exceeded 2 hours out of range."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FB-02",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "f_b"
    ],
    "code": "ES-ALLERGEN",
    "standard": "EOS / Codex Alimentarius",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توفر بطاقات بيان مسببات الحساسية الـ14 (Allergen Matrix) بجانب كل صنف بالبوفيه.",
      "en": "The 14-allergen declaration matrix is displayed alongside every buffet item."
    },
    "autoAction": {
      "ar": "تغطية الصنف فوراً لحين استكمال بطاقة البيان.",
      "en": "Cover the item immediately until the declaration card is completed."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FB-03",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "f_b"
    ],
    "code": "ISO9001-BAR",
    "standard": "ISO 9001",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "نظافة وتعقيم أدوات تحضير المشروبات (الشيكر، السكين، لوح التقطيع) بين كل استخدام.",
      "en": "Beverage preparation tools (shaker, knife, cutting board) sanitized between each use."
    },
    "autoAction": {
      "ar": "سحب الأداة فوراً لإعادة الغسيل والتعقيم.",
      "en": "Pull the tool immediately for re-washing and sanitizing."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FB-04",
    "sectors": [
      "hotels"
    ],
    "depts": [
      "f_b"
    ],
    "code": "HACCP-GLASS",
    "standard": "GMP / Glass & Brittle Plastic Policy",
    "baseline": 0,
    "operator": "<=",
    "unit": "Count",
    "desc": {
      "ar": "خلو منطقة تقديم الطعام من أي زجاج مكسور أو بلاستيك هش عقب حادث كسر.",
      "en": "Food service area free of broken glass or brittle plastic fragments following any breakage incident."
    },
    "autoAction": {
      "ar": "تفعيل بروتوكول كسر الزجاج: عزل المنطقة والتخلص من كل الأطعمة المكشوفة القريبة.",
      "en": "Trigger the glass-breakage protocol: cordon the area and discard all nearby exposed food."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "HR-01",
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
    ],
    "depts": [
      "hr"
    ],
    "code": "LAW12-2003",
    "standard": "Egyptian Labor Law No. 12/2003",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان الفحص الطبي الدوري (كارنيه صحي) لجميع العاملين في مناولة الأغذية أو الرعاية المباشرة للمرضى.",
      "en": "Periodic medical fitness certificates (health cards) current for all staff handling food or direct patient care."
    },
    "autoAction": {
      "ar": "إيقاف الموظف عن مباشرة العمل فوراً لحين تجديد الفحص.",
      "en": "Suspend the employee from duty immediately pending medical re-certification."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "HR-02",
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
    ],
    "depts": [
      "hr"
    ],
    "code": "ISO45001-TRN",
    "standard": "ISO 45001:2018",
    "baseline": 90,
    "operator": ">=",
    "unit": "%",
    "desc": {
      "ar": "نسبة إتمام العاملين لتدريب السلامة والصحة المهنية الإلزامي السنوي.",
      "en": "Completion rate of mandatory annual occupational health & safety training."
    },
    "autoAction": {
      "ar": "جدولة دورة تدريبية عاجلة للموظفين المتبقين خلال أسبوع.",
      "en": "Schedule an urgent make-up training session for remaining staff within one week."
    },
    "timeline": {
      "ar": "خلال أسبوع",
      "en": "Within 1 Week"
    }
  },
  {
    "id": "HR-03",
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
    ],
    "depts": [
      "hr"
    ],
    "code": "LAW12-HOURS",
    "standard": "Egyptian Labor Law No. 12/2003",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام بالحد الأقصى لساعات العمل اليومية وفترات الراحة المقررة قانوناً.",
      "en": "Compliance with the statutory maximum daily working hours and mandated rest breaks."
    },
    "autoAction": {
      "ar": "تعديل جدول المناوبات فوراً وإبلاغ إدارة الموارد البشرية.",
      "en": "Adjust the shift roster immediately and notify HR management."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "HR-04",
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
    ],
    "depts": [
      "hr"
    ],
    "code": "ISO45001-PPE-ISSUE",
    "standard": "ISO 45001:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "وجود سجل موقّع لاستلام العاملين معدات الوقاية الشخصية (PPE) المطابقة لطبيعة عملهم.",
      "en": "A signed issuance log exists confirming staff received PPE appropriate to their role."
    },
    "autoAction": {
      "ar": "صرف المعدة الناقصة فوراً وتوثيق الاستلام.",
      "en": "Issue the missing PPE item immediately and log the acknowledgment."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "HR-05",
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
    ],
    "depts": [
      "hr"
    ],
    "code": "ISO45001-GRIEV",
    "standard": "ISO 45001:2018 / ISO 9001",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "وجود آلية معلنة وسرية للإبلاغ عن التنمر أو التحرش في مكان العمل مع سجل متابعة.",
      "en": "A confidential, publicized grievance/anti-harassment reporting mechanism exists with a follow-up log."
    },
    "autoAction": {
      "ar": "تفعيل التحقيق العاجل بمعرفة لجنة الموارد البشرية خلال 48 ساعة.",
      "en": "Trigger an urgent HR committee investigation within 48 hours."
    },
    "timeline": {
      "ar": "خلال 48 ساعة",
      "en": "Within 48 Hours"
    }
  },
  {
    "id": "ENG-03",
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
    ],
    "depts": [
      "engineering"
    ],
    "code": "OSHA-LOTO",
    "standard": "OSHA / ISO 45001:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تطبيق إجراء العزل والتأمين (Lockout-Tagout) قبل أي صيانة على معدات تحمل طاقة مخزنة.",
      "en": "Lockout-Tagout (LOTO) procedure applied before servicing any equipment with stored energy."
    },
    "autoAction": {
      "ar": "إيقاف أعمال الصيانة فوراً حتى تطبيق إجراء LOTO الكامل.",
      "en": "Halt maintenance work immediately until full LOTO procedure is applied."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ENG-04",
    "sectors": [
      "hotels",
      "food_factories",
      "hospitals"
    ],
    "depts": [
      "engineering"
    ],
    "code": "OSHA-BOILER",
    "standard": "ASME / OSHA Pressure Vessel Code",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان شهادة الفحص الدوري لمرجل البخار أو أوعية الضغط الصادرة عن جهة معتمدة.",
      "en": "Current third-party inspection certificate for the boiler / pressure vessel."
    },
    "autoAction": {
      "ar": "إيقاف تشغيل المرجل فوراً حتى استكمال الفحص.",
      "en": "Take the boiler out of service immediately pending re-inspection."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ENG-05",
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
    ],
    "depts": [
      "engineering"
    ],
    "code": "EOS-LIFT",
    "standard": "EOS / EN 81 Lift Safety Code",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان شهادة الفحص الدوري للمصاعد وتوفر خط اتصال طوارئ فعّال داخل الكابينة.",
      "en": "Current periodic lift inspection certificate, with a working emergency intercom line inside the cabin."
    },
    "autoAction": {
      "ar": "إخراج المصعد من الخدمة فوراً ووضع لافتة صيانة.",
      "en": "Take the lift out of service immediately and post an out-of-order notice."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ENG-06",
    "sectors": [
      "hospitals",
      "food_factories"
    ],
    "depts": [
      "engineering"
    ],
    "code": "ISO45001-GEN",
    "standard": "ISO 45001:2018 / NFPA 110",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "نجاح اختبار تحميل المولد الاحتياطي وانتقال الأحمال الحرجة خلال المدة المقررة (≤10 ثواني).",
      "en": "Backup generator load-transfer test succeeds for critical loads within the specified window (≤10 seconds)."
    },
    "autoAction": {
      "ar": "إصلاح فوري لدائرة النقل الآلي (ATS) وإعادة الاختبار.",
      "en": "Repair the Automatic Transfer Switch (ATS) immediately and re-test."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "SAFE-01",
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
    ],
    "depts": [
      "safety"
    ],
    "code": "NFPA10-EXT",
    "standard": "NFPA 10",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "صلاحية بطاقة الفحص الشهري لطفايات الحريق وسهولة الوصول إليها دون عوائق.",
      "en": "Fire extinguisher monthly inspection tag current, and the unit is unobstructed and accessible."
    },
    "autoAction": {
      "ar": "استبدال الطفاية منتهية الصلاحية فوراً وإزالة أي عائق.",
      "en": "Replace the expired extinguisher immediately and clear any obstruction."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SAFE-02",
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
    ],
    "depts": [
      "safety"
    ],
    "code": "NFPA101-EGRESS",
    "standard": "NFPA 101 Life Safety Code",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "خلو مسارات ومخارج الطوارئ من أي عوائق أو تخزين مؤقت يعيق الإخلاء.",
      "en": "Emergency egress routes and exits are completely clear of obstructions or temporary storage."
    },
    "autoAction": {
      "ar": "إزالة العائق فوراً وتوثيق مخالفة في سجل السلامة.",
      "en": "Remove the obstruction immediately and log a safety violation."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SAFE-03",
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
    ],
    "depts": [
      "safety"
    ],
    "code": "NFPA101-DRILL",
    "standard": "Civil Defense / NFPA 101",
    "baseline": 2,
    "operator": ">=",
    "unit": "Count",
    "desc": {
      "ar": "إجراء تدريبات الإخلاء (Fire Drill) بمعدل مرتين سنوياً على الأقل مع توثيق زمن الإخلاء.",
      "en": "Fire evacuation drills conducted at least twice a year, with evacuation time documented."
    },
    "autoAction": {
      "ar": "جدولة تدريب إخلاء تعويضي خلال الشهر الحالي.",
      "en": "Schedule a make-up evacuation drill within the current month."
    },
    "timeline": {
      "ar": "خلال شهر",
      "en": "Within 1 Month"
    }
  },
  {
    "id": "SAFE-04",
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
    ],
    "depts": [
      "safety"
    ],
    "code": "ISO45001-CCTV",
    "standard": "ISO 45001:2018 / Local Security Code",
    "baseline": 95,
    "operator": ">=",
    "unit": "%",
    "desc": {
      "ar": "نسبة تغطية كاميرات المراقبة الفعالة للمناطق الحرجة (مخازن، مداخل، صيدلية/خزينة).",
      "en": "Percentage of critical areas (storage, entry points, pharmacy/cash office) with functioning CCTV coverage."
    },
    "autoAction": {
      "ar": "إصلاح الكاميرات المعطلة خلال 24 ساعة وتأمين المنطقة يدوياً مؤقتاً.",
      "en": "Repair faulty cameras within 24 hours and post manual coverage in the interim."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "SAFE-05",
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
    ],
    "depts": [
      "safety"
    ],
    "code": "OSHA-FIRSTAID",
    "standard": "OSHA / Red Crescent Guidance",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "اكتمال محتويات صندوق الإسعافات الأولية وسريان تواريخ صلاحية محتوياته.",
      "en": "First-aid kit fully stocked with all contents within their expiry dates."
    },
    "autoAction": {
      "ar": "استكمال النواقص فوراً من مخزون الطوارئ الاحتياطي.",
      "en": "Replenish missing items immediately from the emergency backup stock."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SAFE-06",
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
    ],
    "depts": [
      "safety"
    ],
    "code": "ISO45001-GUARD-CERT",
    "standard": "ISO 45001:2018 / Local Security License",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان تراخيص أفراد الأمن واجتيازهم تدريب مكافحة الحريق الأساسي.",
      "en": "Security personnel hold current licensing and have completed basic fire-response training."
    },
    "autoAction": {
      "ar": "إعادة جدولة الفرد غير المدرَّب لدورة تدريبية عاجلة.",
      "en": "Reschedule the untrained individual for an urgent refresher course."
    },
    "timeline": {
      "ar": "خلال أسبوع",
      "en": "Within 1 Week"
    }
  },
  {
    "id": "WH-04",
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
    ],
    "depts": [
      "warehouses"
    ],
    "code": "ISO22000-PEST",
    "standard": "ISO 22000:2018 / PRP",
    "baseline": 0,
    "operator": "<=",
    "unit": "Count",
    "desc": {
      "ar": "خلو محطات مكافحة الآفات (Bait Stations) من أي دليل نشاط حشري أو قوارض عند المراجعة الشهرية.",
      "en": "Pest-control bait stations show zero evidence of insect or rodent activity at the monthly review."
    },
    "autoAction": {
      "ar": "إخطار شركة المكافحة المتعاقدة فوراً لمعالجة الموقع.",
      "en": "Notify the contracted pest-control provider immediately for site treatment."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "WH-05",
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
    ],
    "depts": [
      "warehouses"
    ],
    "code": "OSHA-RACK",
    "standard": "OSHA / EOS Racking Safety",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سلامة الرفوف الإنشائية (عدم وجود انحناء أو صدأ) ووضوح لافتة الحد الأقصى للحمل.",
      "en": "Structural racking integrity (no bending/corrosion) with maximum load-capacity signage clearly displayed."
    },
    "autoAction": {
      "ar": "تفريغ الرف المتضرر فوراً ومنع استخدامه لحين الإصلاح.",
      "en": "Unload the damaged rack immediately and tag it out of use pending repair."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "WH-06",
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
    ],
    "depts": [
      "warehouses"
    ],
    "code": "GMP-SEGREGATE",
    "standard": "GMP / ISO 22000:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الفصل الفيزيائي الكامل بين المواد الغذائية والمواد الكيماوية/غير الغذائية داخل المخزن.",
      "en": "Complete physical segregation between food items and chemical/non-food materials in storage."
    },
    "autoAction": {
      "ar": "نقل المواد الكيماوية فوراً لمنطقة معزولة مخصصة.",
      "en": "Relocate chemical materials immediately to a dedicated isolated area."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "WH-07",
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
    ],
    "depts": [
      "warehouses"
    ],
    "code": "OSHA-FORKLIFT",
    "standard": "OSHA / ISO 45001:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان تراخيص تشغيل عربات الرفع الشوكية (Forklift) لجميع المشغلين.",
      "en": "Forklift operator certification current for all personnel operating lifting equipment."
    },
    "autoAction": {
      "ar": "إيقاف المشغل غير المرخص فوراً عن القيادة.",
      "en": "Stop the uncertified operator from driving immediately."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CS-01",
    "sectors": [
      "restaurants",
      "hotels",
      "food_factories"
    ],
    "depts": [
      "cold_storage"
    ],
    "code": "HACCP-DEFROST",
    "standard": "HACCP",
    "baseline": 4,
    "operator": "<=",
    "unit": "°C",
    "desc": {
      "ar": "عدم تجاوز درجة حرارة الثلاجة 4°C خلال 15 دقيقة من انتهاء دورة الذوبان الآلي (Defrost).",
      "en": "Chiller temperature does not exceed 4°C within 15 minutes of the automatic defrost cycle ending."
    },
    "autoAction": {
      "ar": "تمديد فاصل دورة الذوبان وإعادة معايرة الثرموستات.",
      "en": "Extend the defrost cycle interval and recalibrate the thermostat."
    },
    "timeline": {
      "ar": "خلال ساعتين",
      "en": "Within 2 Hours"
    }
  },
  {
    "id": "CS-02",
    "sectors": [
      "restaurants",
      "hotels",
      "food_factories"
    ],
    "depts": [
      "cold_storage"
    ],
    "code": "ISO22000-SEAL",
    "standard": "ISO 22000:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سلامة إحكام أبواب غرف التبريد (Door Seals) لمنع تسرب الهواء الدافئ.",
      "en": "Cold room door seals maintain a complete airtight closure with no visible gaps."
    },
    "autoAction": {
      "ar": "استبدال الحشية التالفة فوراً وإخطار الصيانة.",
      "en": "Replace the damaged gasket immediately and notify Maintenance."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "CS-03",
    "sectors": [
      "restaurants",
      "hotels",
      "food_factories"
    ],
    "depts": [
      "cold_storage"
    ],
    "code": "HACCP-FEFO",
    "standard": "HACCP / GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام بترتيب المخزون حسب تاريخ انتهاء الصلاحية الأقرب أولاً (FEFO) ووضوح ملصقات التاريخ.",
      "en": "Stock arranged by First-Expired-First-Out (FEFO) with clearly visible date labels."
    },
    "autoAction": {
      "ar": "إعادة ترتيب المخزون فوراً وفصل الأصناف قريبة الانتهاء.",
      "en": "Re-arrange stock immediately and segregate near-expiry items."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "REC-02",
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
    ],
    "depts": [
      "receiving"
    ],
    "code": "ISO22000-COA",
    "standard": "ISO 22000:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة شهادة التحليل (COA) المرفقة مع الشحنة الواردة للمواصفة المتفق عليها.",
      "en": "The delivery Certificate of Analysis (COA) matches the agreed specification for the incoming shipment."
    },
    "autoAction": {
      "ar": "حجز الشحنة في منطقة العزل لحين مطابقة الشهادة.",
      "en": "Hold the shipment in the quarantine area pending certificate verification."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "REC-03",
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
    ],
    "depts": [
      "receiving"
    ],
    "code": "NFSA-REJECT",
    "standard": "NFSA Law 181/2020",
    "baseline": 0,
    "operator": "<=",
    "unit": "Count",
    "desc": {
      "ar": "خلو الشحنات الواردة من أي علامات تلف أو دليل نشاط آفات على العبوات الخارجية.",
      "en": "Incoming shipments show zero signs of damage or pest evidence on outer packaging."
    },
    "autoAction": {
      "ar": "رفض الشحنة كاملة على الرصيف وتوثيق سبب الرفض بالصور.",
      "en": "Reject the shipment entirely at the dock and photo-document the reason."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "REC-04",
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
    ],
    "depts": [
      "receiving"
    ],
    "code": "ISO9001-QTY",
    "standard": "ISO 9001:2015",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة الكمية والوزن الفعلي للشحنة مع أمر الشراء (PO) وفاتورة المورد.",
      "en": "Actual delivered quantity/weight matches the Purchase Order and supplier invoice."
    },
    "autoAction": {
      "ar": "تسجيل الفارق في تقرير استلام واستدعاء مسؤول المشتريات.",
      "en": "Log the discrepancy in the receiving report and call the Procurement officer."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SUP-02",
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
    ],
    "depts": [
      "suppliers"
    ],
    "code": "ISO22000-SUPCERT",
    "standard": "ISO 22000:2018 / HACCP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان شهادات الجودة/سلامة الغذاء للموردين المسجلين (ISO 22000، HACCP، أو ما يعادلها).",
      "en": "Registered suppliers hold current food-safety/quality certificates (ISO 22000, HACCP, or equivalent)."
    },
    "autoAction": {
      "ar": "تعليق التعامل مع المورد فوراً لحين تقديم شهادة سارية.",
      "en": "Suspend dealings with the supplier immediately pending a valid certificate."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "SUP-03",
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
    ],
    "depts": [
      "suppliers"
    ],
    "code": "ISO9001-REEVAL",
    "standard": "ISO 9001:2015",
    "baseline": 1,
    "operator": ">=",
    "unit": "Count",
    "desc": {
      "ar": "إجراء إعادة تقييم سنوية موثقة لكل مورد ضمن القائمة المعتمدة.",
      "en": "A documented annual re-evaluation is completed for each supplier on the approved list."
    },
    "autoAction": {
      "ar": "جدولة إعادة التقييم فوراً وتقييد المورد مؤقتاً كـ\"تحت المراجعة\".",
      "en": "Schedule the re-evaluation immediately and flag the supplier as \"Under Review\"."
    },
    "timeline": {
      "ar": "خلال أسبوع",
      "en": "Within 1 Week"
    }
  },
  {
    "id": "SUP-04",
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
    ],
    "depts": [
      "suppliers"
    ],
    "code": "ISO9001-NCRATE",
    "standard": "ISO 9001:2015",
    "baseline": 5,
    "operator": "<=",
    "unit": "%",
    "desc": {
      "ar": "معدل رفض شحنات المورد (Rejection Rate) خلال آخر 3 أشهر ضمن الحد المقبول.",
      "en": "Supplier shipment rejection rate over the past 3 months remains within the acceptable threshold."
    },
    "autoAction": {
      "ar": "إخطار المورد رسمياً بطلب خطة تصحيحية (CAPA) خلال 7 أيام.",
      "en": "Formally notify the supplier requiring a corrective action plan (CAPA) within 7 days."
    },
    "timeline": {
      "ar": "خلال أسبوع",
      "en": "Within 1 Week"
    }
  },
  {
    "id": "KIT-03",
    "sectors": [
      "hotels",
      "restaurants"
    ],
    "depts": [
      "main_kitchen"
    ],
    "code": "HACCP-OIL",
    "standard": "HACCP / EOS",
    "baseline": 25,
    "operator": "<=",
    "unit": "%",
    "desc": {
      "ar": "نسبة المركبات القطبية الكلية (TPM) في زيت القلي العميق ضمن الحد الآمن قبل التغيير الإلزامي.",
      "en": "Total Polar Materials (TPM) reading in deep-fry oil remains below the mandatory-change threshold."
    },
    "autoAction": {
      "ar": "تغيير الزيت فوراً وتنظيف حوض القلاية بالكامل.",
      "en": "Change the oil immediately and fully clean the fryer basin."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "KIT-04",
    "sectors": [
      "hotels",
      "restaurants"
    ],
    "depts": [
      "main_kitchen"
    ],
    "code": "NFPA96-HOOD",
    "standard": "NFPA 96",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "خلو مجاري ومرشحات شفاط المطبخ (Exhaust Hood) من تراكم الشحوم بما يتجاوز الحد الآمن لخطر الحريق.",
      "en": "Kitchen exhaust hood ducts and filters are free of grease buildup beyond the fire-risk threshold."
    },
    "autoAction": {
      "ar": "جدولة تنظيف طارئ للشفاط خلال 24 ساعة.",
      "en": "Schedule emergency hood cleaning within 24 hours."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "KIT-05",
    "sectors": [
      "hotels",
      "restaurants"
    ],
    "depts": [
      "main_kitchen"
    ],
    "code": "HACCP-PROBE",
    "standard": "HACCP / ISO 22000:2018",
    "baseline": 1,
    "operator": "<=",
    "unit": "°C",
    "desc": {
      "ar": "دقة معايرة ترمومتر السبر (Probe Thermometer) عند اختباره في ماء مثلج (± 1°C).",
      "en": "Probe thermometer calibration accuracy when tested in an ice-water bath (± 1°C)."
    },
    "autoAction": {
      "ar": "سحب الترمومتر من الخدمة فوراً وإرساله للمعايرة.",
      "en": "Withdraw the thermometer from service immediately and send it for calibration."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "KIT-06",
    "sectors": [
      "hotels",
      "restaurants"
    ],
    "depts": [
      "main_kitchen"
    ],
    "code": "ISO22000-ALLERGEN-ZONE",
    "standard": "ISO 22000:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "وجود منطقة تحضير مخصصة ومعزولة لطلبات الحساسية الغذائية لمنع التلوث التبادلي.",
      "en": "A dedicated, segregated preparation zone exists for allergen-specific orders to prevent cross-contact."
    },
    "autoAction": {
      "ar": "إيقاف تحضير الطلب فوراً حتى توفر منطقة نظيفة معزولة.",
      "en": "Halt order preparation immediately until a clean segregated zone is available."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SVC-01",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "service_foh"
    ],
    "code": "ES-ALLERGEN-MENU",
    "standard": "EOS / Codex Alimentarius",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توفر قائمة بيان مسببات الحساسية للعملاء عند الطلب سواء مطبوعة أو عبر الطاقم المدرَّب.",
      "en": "Allergen information is available to guests at time of order, either printed or via trained staff."
    },
    "autoAction": {
      "ar": "استدعاء الشيف المسؤول فوراً لتوضيح المكونات قبل تقديم الطلب.",
      "en": "Call the responsible chef immediately to clarify ingredients before serving."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SVC-02",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "service_foh"
    ],
    "code": "ISO22000-SURFACE",
    "standard": "ISO 22000:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تعقيم أسطح الطاولات وقوائم الطعام بين كل عميل ومراجعة تكرار تغيير قماش التنظيف.",
      "en": "Table surfaces and menus are sanitized between guests, with wiping-cloth change frequency reviewed."
    },
    "autoAction": {
      "ar": "إعادة تعقيم الطاولة فوراً باستخدام محلول معتمد.",
      "en": "Re-sanitize the table immediately using an approved solution."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SVC-03",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "service_foh"
    ],
    "code": "HACCP-SERVETEMP",
    "standard": "HACCP",
    "baseline": 5,
    "operator": "<=",
    "unit": "Min",
    "desc": {
      "ar": "الفاصل الزمني بين خروج الطبق من المطبخ وتقديمه للعميل (لضمان بقائه ضمن نطاق الحرارة الآمن).",
      "en": "Time elapsed between a dish leaving the kitchen and reaching the guest (to stay within the safe temperature window)."
    },
    "autoAction": {
      "ar": "إعادة الطبق للمطبخ لإعادة التسخين إذا تجاوز الحد الزمني.",
      "en": "Return the dish to the kitchen for reheating if the time limit is exceeded."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "SVC-04",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "service_foh"
    ],
    "code": "ISO10002-LOG",
    "standard": "ISO 10002",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توثيق كل شكوى عميل متعلقة بجودة أو سلامة الطعام في سجل مركزي للمتابعة.",
      "en": "Every guest complaint related to food quality/safety is logged centrally for follow-up."
    },
    "autoAction": {
      "ar": "تسجيل الشكوى فوراً وتصعيدها لمدير المطعم.",
      "en": "Log the complaint immediately and escalate it to the Restaurant Manager."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PREP-01",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "prep_area"
    ],
    "code": "HACCP-CROSS",
    "standard": "HACCP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الفصل الفيزيائي والزمني بين تحضير اللحوم النيئة والخضروات/الأطعمة الجاهزة للأكل.",
      "en": "Physical/temporal separation between raw meat preparation and vegetables/ready-to-eat food."
    },
    "autoAction": {
      "ar": "إيقاف التحضير فوراً وتطهير منطقة العمل بالكامل قبل الاستئناف.",
      "en": "Halt preparation immediately and fully sanitize the workstation before resuming."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PREP-02",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "prep_area"
    ],
    "code": "HACCP-HANDWASH",
    "standard": "HACCP / WHO",
    "baseline": 1,
    "operator": ">=",
    "unit": "Count",
    "desc": {
      "ar": "توفر محطة غسيل أيدٍ مخصصة (صابون + مجفف) في متناول منطقة التحضير مباشرة.",
      "en": "A dedicated handwashing station (soap + dryer) is directly accessible within the prep area."
    },
    "autoAction": {
      "ar": "تركيب محطة مؤقتة فوراً حتى إصلاح المحطة الأساسية.",
      "en": "Install a temporary station immediately until the main one is repaired."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PREP-03",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "prep_area"
    ],
    "code": "GMP-GLOVES",
    "standard": "GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام بتغيير القفازات عند التبديل بين المهام المختلفة (نيء/مطبوخ) وعدم إعادة استخدامها.",
      "en": "Gloves are changed when switching between tasks (raw/cooked) and are never reused."
    },
    "autoAction": {
      "ar": "إيقاف الموظف فوراً لتغيير القفازات وغسل اليدين.",
      "en": "Stop the employee immediately to change gloves and wash hands."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PREP-04",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "prep_area"
    ],
    "code": "ISO22000-PEST-TRAP",
    "standard": "ISO 22000:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "خلو منطقة التحضير من الفتحات أو الشقوق التي قد تسمح بدخول الحشرات أو القوارض.",
      "en": "The prep area is free of gaps or cracks that could allow pest ingress."
    },
    "autoAction": {
      "ar": "سد الفجوة فوراً بمادة معتمدة غذائياً وإخطار الصيانة.",
      "en": "Seal the gap immediately with a food-grade sealant and notify Maintenance."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "STW-01",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "stewarding"
    ],
    "code": "HACCP-RINSE",
    "standard": "HACCP",
    "baseline": 82,
    "operator": ">=",
    "unit": "°C",
    "desc": {
      "ar": "درجة حرارة الشطف النهائي بماكينة غسيل الأطباق لضمان التطهير الحراري الكامل.",
      "en": "Final rinse temperature of the dishwashing machine ensures complete thermal disinfection."
    },
    "autoAction": {
      "ar": "إيقاف الماكينة فوراً وإعادة غسل الدفعة الحالية يدوياً بالتعقيم الكيميائي.",
      "en": "Stop the machine immediately and manually re-wash the current batch with chemical sanitizer."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "STW-02",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "stewarding"
    ],
    "code": "HACCP-SANITIZER",
    "standard": "HACCP / EOS",
    "baseline": 200,
    "operator": "<=",
    "unit": "ppm",
    "desc": {
      "ar": "تركيز محلول التعقيم الكيميائي (كلور) لغسيل الأواني اليدوي ضمن النطاق الفعّال (100-200 ppm).",
      "en": "Chemical sanitizer (chlorine) concentration for manual dishwashing stays within the effective range (100-200 ppm)."
    },
    "autoAction": {
      "ar": "إعادة تحضير محلول التعقيم فوراً وفق التركيز الصحيح.",
      "en": "Re-prepare the sanitizer solution immediately at the correct concentration."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "STW-03",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "stewarding"
    ],
    "code": "GMP-STORAGE",
    "standard": "GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تجفيف الأواني هوائياً بالكامل قبل التخزين، دون استخدام قماش مشترك للتجفيف.",
      "en": "Utensils are fully air-dried before storage, with no shared cloth used for drying."
    },
    "autoAction": {
      "ar": "سحب الأواني الرطبة فوراً وإعادتها لرف التجفيف.",
      "en": "Pull the damp utensils immediately and return them to the drying rack."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "STW-04",
    "sectors": [
      "restaurants"
    ],
    "depts": [
      "stewarding"
    ],
    "code": "ISO22000-BIN",
    "standard": "ISO 22000:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "إحكام أغطية حاويات المخلفات ونظافة منطقة التجميع لمنع جذب الآفات.",
      "en": "Waste bin lids close tightly and the collection area is kept clean to avoid attracting pests."
    },
    "autoAction": {
      "ar": "إغلاق الحاويات فوراً وجدولة تفريغ إضافي.",
      "en": "Close the bins immediately and schedule an extra collection run."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FAC-03",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "FSSC-METAL",
    "standard": "FSSC 22000 V7",
    "baseline": 1,
    "operator": ">=",
    "unit": "Count",
    "desc": {
      "ar": "اجتياز اختبار كفاءة كاشف المعادن بالكرات المرجعية (Fe/Non-Fe/SS) في بداية كل وردية.",
      "en": "Metal detector passes the reference test-ball challenge (Fe/Non-Fe/SS) at the start of every shift."
    },
    "autoAction": {
      "ar": "إيقاف الخط فوراً وإعادة معايرة الكاشف قبل الاستئناف.",
      "en": "Halt the line immediately and recalibrate the detector before resuming."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FAC-04",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "FSSC-ALLERGEN-CHG",
    "standard": "FSSC 22000 V7",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "التحقق من فاعلية التنظيف عند تبديل خط الإنتاج بين منتج يحتوي مسببات حساسية وآخر لا يحتوي.",
      "en": "Cleaning validation (allergen swab test) confirmed when switching the line between allergen and non-allergen products."
    },
    "autoAction": {
      "ar": "إعادة تنظيف الخط بالكامل وإعادة الاختبار قبل التشغيل.",
      "en": "Re-clean the entire line and re-test before restarting production."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FAC-05",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "OSHA-NOISE",
    "standard": "OSHA / ISO 45001:2018",
    "baseline": 85,
    "operator": "<=",
    "unit": "dB",
    "desc": {
      "ar": "مستوى الضوضاء بمنطقة التشغيل ضمن الحد المسموح دون معدات وقاية سمعية (85 dB لـ 8 ساعات).",
      "en": "Operating-area noise level stays within the permissible exposure limit without hearing protection (85 dB / 8-hr TWA)."
    },
    "autoAction": {
      "ar": "صرف واقيات سمع فورية للعاملين وتقييم مصدر الضوضاء.",
      "en": "Issue hearing protection to workers immediately and assess the noise source."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FAC-06",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "ISO45001-GUARD",
    "standard": "ISO 45001:2018 / OSHA",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سلامة أغطية الحماية الميكانيكية (Machine Guards) على الأجزاء المتحركة بالماكينات.",
      "en": "Mechanical machine guards on moving parts are intact and properly secured."
    },
    "autoAction": {
      "ar": "إيقاف الماكينة فوراً حتى إعادة تركيب الغطاء الواقي.",
      "en": "Stop the machine immediately until the guard is reinstalled."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "HYG-01",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "GMP-AIRSHOWER",
    "standard": "GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "كفاءة عمل غرفة الهواء (Air Shower) في إزالة الجسيمات العالقة قبل دخول صالة الإنتاج.",
      "en": "The air-shower chamber effectively removes loose particles before entry to the production floor."
    },
    "autoAction": {
      "ar": "إيقاف الدخول من هذه البوابة وتحويل العمال لبوابة بديلة.",
      "en": "Suspend entry via this gate and redirect workers to an alternate gate."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "HYG-02",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "GMP-JEWELRY",
    "standard": "GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام بسياسة منع المجوهرات والساعات والأظافر الصناعية قبل دخول منطقة الإنتاج.",
      "en": "No-jewelry / no-watches / no-artificial-nails policy is enforced before entering the production zone."
    },
    "autoAction": {
      "ar": "منع دخول العامل فوراً حتى إزالة المخالفة.",
      "en": "Deny entry to the worker immediately until the violation is corrected."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "HYG-03",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "GMP-HAIRNET",
    "standard": "GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "التغطية الكاملة للشعر واللحية بأغطية الرأس واللحية المعتمدة لكل العاملين.",
      "en": "Complete hair and beard coverage with approved hairnets/beard-nets for all personnel."
    },
    "autoAction": {
      "ar": "منع الدخول فوراً حتى ارتداء الغطاء المطابق.",
      "en": "Deny entry immediately until the correct covering is worn."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "QC-01",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "ISO17025-CAL",
    "standard": "ISO/IEC 17025",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان شهادات معايرة أجهزة القياس المختبرية (موازين، أجهزة pH، ترمومترات) من جهة معتمدة.",
      "en": "Laboratory instrument calibration certificates (balances, pH meters, thermometers) are current from an accredited body."
    },
    "autoAction": {
      "ar": "سحب الجهاز من الاستخدام فوراً وتعليق نتائجه لحين المعايرة.",
      "en": "Withdraw the instrument from use immediately and flag its results pending calibration."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "QC-02",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "ISO22000-RETAIN",
    "standard": "ISO 22000:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الاحتفاظ بعينات مرجعية (Retained Samples) من كل دفعة إنتاج للمدة المقررة في السياسة.",
      "en": "Retained samples from every production batch are kept for the policy-defined duration."
    },
    "autoAction": {
      "ar": "سحب عينة إضافية فوراً من المخزون المتاح إن أمكن وتوثيق الاستثناء.",
      "en": "Pull an additional sample from available stock immediately if possible, and document the exception."
    },
    "timeline": {
      "ar": "خلال نفس اليوم",
      "en": "Same Day"
    }
  },
  {
    "id": "QC-03",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "ISO22000-MICRO-TAT",
    "standard": "ISO 22000:2018",
    "baseline": 48,
    "operator": "<=",
    "unit": "Hour",
    "desc": {
      "ar": "زمن استجابة نتائج الفحص الميكروبيولوجي الحرج من وقت أخذ العينة.",
      "en": "Turnaround time for critical microbiological test results from the moment of sampling."
    },
    "autoAction": {
      "ar": "تصعيد الفحص كأولوية قصوى للمختبر الخارجي المعتمد.",
      "en": "Escalate the test as top priority to the accredited external lab."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "QC-04",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "GHS-MSDS",
    "standard": "GHS / OSHA HazCom",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توفر نشرات بيانات السلامة (MSDS/SDS) لكل المواد الكيماوية المستخدمة داخل المختبر.",
      "en": "Safety Data Sheets (MSDS/SDS) are available for every chemical reagent used in the lab."
    },
    "autoAction": {
      "ar": "طلب النشرة من المورد فوراً وعزل المادة حتى توفرها.",
      "en": "Request the data sheet from the supplier immediately and quarantine the substance until received."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "QC-05",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "ISO45001-BIOSAFETY",
    "standard": "ISO 45001:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "ارتداء فنيي المختبر لمعدات الوقاية الشخصية المطابقة (نظارات، معاطف، قفازات مقاومة كيميائياً).",
      "en": "Lab technicians wear compliant PPE (goggles, lab coats, chemical-resistant gloves)."
    },
    "autoAction": {
      "ar": "إيقاف الفني عن العمل فوراً حتى ارتداء المعدات كاملة.",
      "en": "Stop the technician working immediately until full PPE is worn."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PKG-01",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "ISO22000-SEAL-TEST",
    "standard": "ISO 22000:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "اجتياز اختبار إحكام غلق العبوات (Seal Integrity Test) بمعدل عينة كل ساعة تشغيل.",
      "en": "Package seal-integrity test passes at a rate of one sample per operating hour."
    },
    "autoAction": {
      "ar": "إيقاف خط التعبئة فوراً وإعادة ضبط رأس اللحام الحراري.",
      "en": "Halt the packaging line immediately and readjust the heat-sealing head."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PKG-02",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "ISO22005-TRACE",
    "standard": "ISO 22005",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة بيانات ملصق الدفعة (رقم اللوت وتاريخ الإنتاج/الصلاحية) لسجل الإنتاج الفعلي.",
      "en": "Batch label data (lot number, production/expiry date) matches the actual production record."
    },
    "autoAction": {
      "ar": "إيقاف الطباعة فوراً وتصحيح قالب الملصق قبل الاستئناف.",
      "en": "Halt printing immediately and correct the label template before resuming."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PKG-03",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "EOS-FOODGRADE",
    "standard": "EOS / FDA 21 CFR 177",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "حيازة شهادة ملامسة الأغذية (Food-Grade Certificate) لكل مواد التغليف المستخدمة.",
      "en": "Food-contact (food-grade) certification is on file for every packaging material in use."
    },
    "autoAction": {
      "ar": "إيقاف استخدام الدفعة غير المعتمدة فوراً وعزلها.",
      "en": "Stop using the uncertified batch immediately and quarantine it."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PKG-04",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "FSSC-FOREIGN",
    "standard": "FSSC 22000 V7",
    "baseline": 0,
    "operator": "<=",
    "unit": "Count",
    "desc": {
      "ar": "خلو خط التعبئة من مخلفات القطع البلاستيكية الهشة أو دبابيس التثبيت المفقودة.",
      "en": "Packaging line is free of brittle-plastic fragments or missing staple/fastener debris."
    },
    "autoAction": {
      "ar": "إيقاف الخط فوراً والتفتيش الشامل قبل استئناف التعبئة.",
      "en": "Halt the line immediately for a full sweep before resuming packaging."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "DSP-01",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "HACCP-COLDCHAIN",
    "standard": "HACCP",
    "baseline": 4,
    "operator": "<=",
    "unit": "°C",
    "desc": {
      "ar": "درجة حرارة صندوق شاحنة التوزيع المبردة عند التحميل قبل مغادرة المنشأة.",
      "en": "Refrigerated delivery truck box temperature at loading, prior to leaving the facility."
    },
    "autoAction": {
      "ar": "رفض الشحن فوراً حتى تبريد الصندوق للحد المطلوب.",
      "en": "Reject dispatch immediately until the box reaches the required temperature."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "DSP-02",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "ISO22000-DOCK",
    "standard": "ISO 22000:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "منع التلامس المباشر بين المنتج التام ومواد أخرى غير غذائية أثناء التحميل على الرصيف.",
      "en": "No direct contact between finished product and non-food materials during dock loading."
    },
    "autoAction": {
      "ar": "إعادة تنظيم منطقة التحميل فوراً وفصل المواد.",
      "en": "Reorganize the loading area immediately and separate the materials."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "DSP-03",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "ISO22005-DOCS",
    "standard": "ISO 22005",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة مستندات الشحن (بوليصة الشحن، أرقام اللوت) مع المنتج الفعلي المُحمَّل.",
      "en": "Shipping documents (waybill, lot numbers) match the physically loaded product."
    },
    "autoAction": {
      "ar": "إيقاف الشحنة فوراً حتى تصحيح المستندات.",
      "en": "Hold the shipment immediately until documentation is corrected."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "DSP-04",
    "sectors": [
      "food_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "HACCP-LOGGER",
    "standard": "HACCP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سلامة عمل جهاز تسجيل درجة الحرارة (Data Logger) داخل مركبة النقل طوال الرحلة.",
      "en": "The in-transit temperature data logger functions correctly for the entire delivery route."
    },
    "autoAction": {
      "ar": "استبدال الجهاز فوراً بجهاز احتياطي قبل المغادرة.",
      "en": "Replace the unit immediately with a backup logger before departure."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ER-01",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "er"
    ],
    "code": "JCI-TRIAGE",
    "standard": "JCI 8th Ed. / GAHAR 2025",
    "baseline": 15,
    "operator": "<=",
    "unit": "Min",
    "desc": {
      "ar": "زمن تقييم الفرز (Triage) لكل مريض وارد من لحظة الوصول لتحديد درجة الأولوية.",
      "en": "Triage assessment time for each arriving patient, from arrival to priority classification."
    },
    "autoAction": {
      "ar": "استدعاء ممرض فرز إضافي فوراً لتخفيف الازدحام.",
      "en": "Call an additional triage nurse immediately to relieve the backlog."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ER-02",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "er"
    ],
    "code": "JCI-CRASH",
    "standard": "JCI 8th Ed.",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "اكتمال محتويات عربة الإنعاش (Crash Cart) ووضوح ختم الأمان اليومي غير المفتوح.",
      "en": "Crash cart contents complete, with the daily tamper-evident seal intact and unbroken."
    },
    "autoAction": {
      "ar": "استكمال النواقص فوراً واستبدال أي دواء منتهي الصلاحية.",
      "en": "Replenish missing items immediately and replace any expired medication."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ER-03",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "er"
    ],
    "code": "WHO-HANDHYG",
    "standard": "WHO 5 Moments / JCI 8th Ed.",
    "baseline": 90,
    "operator": ">=",
    "unit": "%",
    "desc": {
      "ar": "معدل التزام الطاقم الطبي بفرص نظافة اليدين الخمس وفق منظمة الصحة العالمية.",
      "en": "Clinical staff compliance rate with the WHO 5 Moments for Hand Hygiene."
    },
    "autoAction": {
      "ar": "تنبيه فوري للموظف وإعادة تدريب سريع بجانب السرير.",
      "en": "Immediate staff coaching with a rapid bedside refresher."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ER-04",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "er"
    ],
    "code": "GAHAR-BOARD",
    "standard": "GAHAR 2025",
    "baseline": 4,
    "operator": "<=",
    "unit": "Hour",
    "desc": {
      "ar": "مدة بقاء المريض في الطوارئ قبل نقله لسرير التنويم أو الخروج (ER Boarding Time).",
      "en": "ER boarding time before a patient is transferred to an inpatient bed or discharged."
    },
    "autoAction": {
      "ar": "تفعيل بروتوكول تصريف الطوارئ (Surge Protocol) وإخطار مدير المناوبة.",
      "en": "Activate the ER surge/overflow protocol and notify the duty manager."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ICU-01",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "icu"
    ],
    "code": "JCI-CLABSI",
    "standard": "JCI 8th Ed. / CDC Bundle",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام الكامل بحزمة الوقاية من عدوى مجرى الدم المرتبطة بالقسطرة المركزية (CLABSI Bundle).",
      "en": "Full compliance with the Central Line-Associated Bloodstream Infection (CLABSI) prevention bundle."
    },
    "autoAction": {
      "ar": "مراجعة فورية لموقع القسطرة وتوثيق الانحراف في سجل مكافحة العدوى.",
      "en": "Immediate review of the line insertion site and log the deviation in the infection-control register."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ICU-02",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "icu"
    ],
    "code": "JCI-VAP",
    "standard": "JCI 8th Ed. / CDC Bundle",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام بحزمة الوقاية من التهاب رئوي مرتبط بجهاز التنفس الصناعي (رفع الرأس 30-45°، عناية الفم).",
      "en": "Compliance with the Ventilator-Associated Pneumonia (VAP) prevention bundle (head-of-bed elevation, oral care)."
    },
    "autoAction": {
      "ar": "تصحيح وضعية السرير فوراً وتوثيق في ملف المريض.",
      "en": "Correct the bed position immediately and document in the patient chart."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ICU-03",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "icu"
    ],
    "code": "GAHAR-RATIO",
    "standard": "GAHAR 2025 / JCI 8th Ed.",
    "baseline": 2,
    "operator": "<=",
    "unit": "Count",
    "desc": {
      "ar": "نسبة المرضى لكل ممرضة بوحدة العناية المركزة (لا تتجاوز مريضين لكل ممرضة).",
      "en": "ICU nurse-to-patient ratio does not exceed 2 patients per nurse."
    },
    "autoAction": {
      "ar": "استدعاء ممرضة إضافية فوراً من التجمع الاحتياطي (Float Pool).",
      "en": "Call an additional nurse immediately from the float pool."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "ICU-04",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "icu"
    ],
    "code": "JCI-HIGHALERT",
    "standard": "JCI 8th Ed.",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تطبيق إجراء التحقق المزدوج (Double-Check) قبل صرف أي دواء عالي الخطورة (High-Alert Medication).",
      "en": "Double-check verification is performed before administering any high-alert medication."
    },
    "autoAction": {
      "ar": "إيقاف الصرف فوراً حتى استكمال تحقق ممرضتين مستقلتين.",
      "en": "Halt administration immediately until two independent nurses complete verification."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "OR-01",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "or"
    ],
    "code": "WHO-SSC",
    "standard": "WHO Surgical Safety Checklist / JCI 8th Ed.",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "إتمام قائمة التحقق الجراحي الآمن لمنظمة الصحة العالمية (Sign In / Time Out / Sign Out) بالكامل.",
      "en": "The WHO Surgical Safety Checklist (Sign In / Time Out / Sign Out) is fully completed for every case."
    },
    "autoAction": {
      "ar": "إيقاف الجراحة فوراً حتى استكمال القائمة كاملة.",
      "en": "Halt the surgery immediately until the checklist is fully completed."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "OR-02",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "or"
    ],
    "code": "GAHAR-OR-PRESS",
    "standard": "GAHAR 2025 / ASHRAE 170",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الحفاظ على الضغط الموجب داخل غرفة العمليات مع كفاءة فلاتر الهيبا (HEPA).",
      "en": "Positive air pressure inside the OR is maintained with HEPA filtration functioning correctly."
    },
    "autoAction": {
      "ar": "إيقاف العمليات غير الطارئة فوراً وإخطار الهندسة لفحص نظام التهوية.",
      "en": "Suspend non-emergency surgeries immediately and notify Engineering to inspect the HVAC system."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "OR-03",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "or"
    ],
    "code": "JCI-COUNT",
    "standard": "JCI 8th Ed.",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة عد الأدوات والشاش الجراحي (Sponge/Instrument Count) قبل وبعد إغلاق الجرح.",
      "en": "Surgical instrument and sponge counts reconcile completely before and after wound closure."
    },
    "autoAction": {
      "ar": "إيقاف إغلاق الجرح فوراً وإجراء تصوير إشعاعي للتأكد من عدم وجود جسم متبقٍ.",
      "en": "Halt wound closure immediately and obtain an X-ray to rule out a retained object."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "OR-04",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "or"
    ],
    "code": "GAHAR-SSI-PROPHYLAXIS",
    "standard": "GAHAR 2025 / CDC",
    "baseline": 60,
    "operator": "<=",
    "unit": "Min",
    "desc": {
      "ar": "توقيت إعطاء المضاد الحيوي الوقائي قبل الشق الجراحي (خلال 60 دقيقة قبل الجراحة).",
      "en": "Prophylactic antibiotic administration timing before the surgical incision (within 60 minutes pre-op)."
    },
    "autoAction": {
      "ar": "تأخير الشق الجراحي حتى تفعيل الجرعة الوقائية.",
      "en": "Delay the incision until the prophylactic dose has taken effect."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "OR-05",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "or"
    ],
    "code": "GAHAR-OR-TEMP",
    "standard": "GAHAR 2025",
    "baseline": 20,
    "operator": ">=",
    "unit": "°C",
    "desc": {
      "ar": "درجة حرارة ورطوبة غرفة العمليات ضمن النطاق المعتمد (20-24°C) لمنع انخفاض حرارة المريض.",
      "en": "OR temperature/humidity is maintained within the approved range (20-24°C) to prevent patient hypothermia."
    },
    "autoAction": {
      "ar": "تعديل إعدادات التكييف فوراً والاستعانة ببطانية تدفئة للمريض.",
      "en": "Adjust HVAC settings immediately and use a patient warming blanket."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "IPT-01",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "inpatient"
    ],
    "code": "JCI-FALLRISK",
    "standard": "JCI 8th Ed.",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تطبيق تقييم خطر السقوط لكل مريض عند الدخول ووضع السوار/اللافتة التحذيرية المناسبة.",
      "en": "Fall-risk assessment is completed at admission for every patient, with the correct wristband/signage applied."
    },
    "autoAction": {
      "ar": "تفعيل احتياطات السقوط فوراً (سرير منخفض، جرس قريب، حراسة).",
      "en": "Activate fall precautions immediately (low bed, call bell within reach, sitter if needed)."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "IPT-02",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "inpatient"
    ],
    "code": "JCI-PRESSUREULCER",
    "standard": "JCI 8th Ed. / NPUAP",
    "baseline": 2,
    "operator": "<=",
    "unit": "Hour",
    "desc": {
      "ar": "دورية تغيير وضعية المريض المستلقي طويل الأمد للوقاية من قرح الفراش (كل ساعتين كحد أقصى).",
      "en": "Repositioning frequency for immobile patients to prevent pressure ulcers (at least every 2 hours)."
    },
    "autoAction": {
      "ar": "تغيير وضعية المريض فوراً وتوثيق في سجل التمريض.",
      "en": "Reposition the patient immediately and document in the nursing record."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "IPT-03",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "inpatient"
    ],
    "code": "JCI-MEDERROR",
    "standard": "JCI 8th Ed.",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "التحقق من الهوية بمعرفين اثنين (الاسم + الرقم الطبي) قبل إعطاء أي دواء.",
      "en": "Two-identifier verification (name + medical record number) performed before any medication administration."
    },
    "autoAction": {
      "ar": "إيقاف إعطاء الدواء فوراً حتى التأكد الكامل من الهوية.",
      "en": "Halt medication administration immediately until identity is fully confirmed."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "IPT-04",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "inpatient"
    ],
    "code": "GAHAR-CALLBELL",
    "standard": "GAHAR 2025",
    "baseline": 5,
    "operator": "<=",
    "unit": "Min",
    "desc": {
      "ar": "زمن استجابة الطاقم التمريضي لجرس استدعاء المريض.",
      "en": "Nursing staff response time to the patient call bell."
    },
    "autoAction": {
      "ar": "تصعيد فوري للمشرف وتوزيع مهام إضافي على الوردية.",
      "en": "Escalate immediately to the supervisor and redistribute shift workload."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHM-01",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "pharmacy"
    ],
    "code": "JCI-HIGHALERT-STORE",
    "standard": "JCI 8th Ed.",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تخزين الأدوية عالية الخطورة (High-Alert) بخزانة مقفلة منفصلة عن باقي المخزون العام.",
      "en": "High-alert medications are stored in a separate, double-locked cabinet away from general stock."
    },
    "autoAction": {
      "ar": "نقل الأدوية فوراً للخزانة المخصصة وتقييد الوصول.",
      "en": "Relocate the medications immediately to the dedicated cabinet and restrict access."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHM-02",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "pharmacy"
    ],
    "code": "GAHAR-COLDCHAIN-MED",
    "standard": "GAHAR 2025 / WHO",
    "baseline": 8,
    "operator": "<=",
    "unit": "°C",
    "desc": {
      "ar": "درجة حرارة ثلاجة حفظ الأدوية والأمصال المبردة ضمن النطاق المعتمد (2-8°C).",
      "en": "Vaccine/medication refrigerator temperature stays within the approved cold-chain range (2-8°C)."
    },
    "autoAction": {
      "ar": "نقل المحتويات فوراً لثلاجة بديلة معايرة وإخطار الصيدلي المسؤول.",
      "en": "Transfer contents immediately to a calibrated backup fridge and notify the responsible pharmacist."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHM-03",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "pharmacy"
    ],
    "code": "GAHAR-EXPIRY",
    "standard": "GAHAR 2025",
    "baseline": 0,
    "operator": "<=",
    "unit": "Count",
    "desc": {
      "ar": "خلو أرفف الصرف النشط من أي عبوات أدوية منتهية الصلاحية.",
      "en": "Active dispensing shelves contain zero expired medication packages."
    },
    "autoAction": {
      "ar": "سحب العبوة فوراً وعزلها في منطقة الإتلاف المعتمدة.",
      "en": "Remove the item immediately and quarantine it in the approved disposal area."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHM-04",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "pharmacy"
    ],
    "code": "INCB-NARCOTICS",
    "standard": "INCB / MOH Narcotics Register",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة سجل العهدة الورقي/الإلكتروني للمواد المخدرة والمؤثرات العقلية للرصيد الفعلي.",
      "en": "The controlled-substance (narcotics) register reconciles exactly with physical stock on hand."
    },
    "autoAction": {
      "ar": "إيقاف الصرف فوراً وفتح تحقيق داخلي حتى مطابقة الرصيد.",
      "en": "Halt dispensing immediately and open an internal investigation until the count reconciles."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHM-05",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "pharmacy"
    ],
    "code": "JCI-RX-VERIFY",
    "standard": "JCI 8th Ed.",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "التحقق المزدوج من الصيدلي قبل صرف أي وصفة طبية (الجرعة، التداخلات الدوائية، الحساسية).",
      "en": "Pharmacist double-check before dispensing any prescription (dose, drug interactions, allergies)."
    },
    "autoAction": {
      "ar": "إيقاف الصرف فوراً للتواصل مع الطبيب المعالج لتأكيد الوصفة.",
      "en": "Halt dispensing immediately and contact the prescribing physician to confirm the order."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CSSD-02",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "cssd"
    ],
    "code": "AAMI-BIOIND",
    "standard": "AAMI ST79 / GAHAR 2025",
    "baseline": 1,
    "operator": ">=",
    "unit": "Count",
    "desc": {
      "ar": "اجتياز اختبار المؤشر الحيوي (Spore Test) الأسبوعي لجهاز الأوتوكلاف بنتيجة سلبية.",
      "en": "Weekly biological (spore) indicator test for the autoclave returns a negative result."
    },
    "autoAction": {
      "ar": "حجر كل الدفعات المعقمة منذ آخر اختبار سلبي مؤكد وإعادة التعقيم.",
      "en": "Quarantine all loads sterilized since the last confirmed negative test and re-sterilize."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CSSD-03",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "cssd"
    ],
    "code": "AAMI-SHELFLIFE",
    "standard": "AAMI ST79",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام بمدة الصلاحية المرتبطة بسلامة التغليف (Event-Related Shelf Life) للأدوات المعقمة.",
      "en": "Sterile packs are used within their event-related shelf life based on packaging integrity."
    },
    "autoAction": {
      "ar": "سحب الحزمة منتهية الصلاحية فوراً وإعادة تعقيمها.",
      "en": "Withdraw the expired pack immediately and re-sterilize it."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CSSD-04",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "cssd"
    ],
    "code": "AAMI-PACKINTEGRITY",
    "standard": "AAMI ST79",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "خلو عبوات وأكياس التعقيم من أي ثقوب أو تمزق أو رطوبة قبل التخزين.",
      "en": "Sterilization pouches/wraps show no punctures, tears, or moisture before storage."
    },
    "autoAction": {
      "ar": "إعادة تغليف وتعقيم الأداة فوراً.",
      "en": "Re-wrap and re-sterilize the instrument immediately."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "DEN-01",
    "sectors": [
      "clinics"
    ],
    "depts": [
      "dental"
    ],
    "code": "CDC-DUWL",
    "standard": "CDC Dental Guidelines",
    "baseline": 500,
    "operator": "<=",
    "unit": "Count",
    "desc": {
      "ar": "جودة مياه خطوط اليونيت السني (DUWL) ضمن حد البكتيريا المقبول (≤500 CFU/mL) وفق معايير مياه الشرب.",
      "en": "Dental unit waterline (DUWL) quality within the accepted bacterial limit (≤500 CFU/mL), per drinking-water standard."
    },
    "autoAction": {
      "ar": "تشغيل دورة تطهير خطوط المياه فوراً وإيقاف اليونيت حتى المطابقة.",
      "en": "Run an immediate waterline disinfection cycle and take the unit out of service until compliant."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "DEN-02",
    "sectors": [
      "clinics"
    ],
    "depts": [
      "dental"
    ],
    "code": "EPA-AMALGAM",
    "standard": "EPA Amalgam Rule / ISO 14001:2026",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تركيب فاصل الملغم (Amalgam Separator) ومتابعة صيانته لمنع تسرب الزئبق للصرف الصحي.",
      "en": "An amalgam separator is installed and maintained to prevent mercury discharge into wastewater."
    },
    "autoAction": {
      "ar": "إيقاف إجراءات حشو الملغم فوراً حتى إصلاح الفاصل.",
      "en": "Suspend amalgam filling procedures immediately until the separator is repaired."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "DEN-03",
    "sectors": [
      "clinics"
    ],
    "depts": [
      "dental"
    ],
    "code": "CDC-XRAY-SHIELD",
    "standard": "CDC / NCRP Radiation Guidance",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توفر مريلة الرصاص (Lead Apron) وطوق الغدة الدرقية للمريض أثناء التصوير بالأشعة السنية.",
      "en": "A lead apron and thyroid collar are provided to the patient during dental radiography."
    },
    "autoAction": {
      "ar": "إيقاف التصوير فوراً حتى توفر معدات الوقاية.",
      "en": "Halt the X-ray immediately until shielding equipment is available."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "RAD-01",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "radiology"
    ],
    "code": "NCRP-ALARA",
    "standard": "NCRP / IAEA ALARA Principle",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تطبيق مبدأ الحد الأدنى المعقول من الإشعاع (ALARA) وتوثيق جرعة كل فحص بسجل المريض.",
      "en": "The ALARA (As Low As Reasonably Achievable) radiation principle is applied, with dose logged per patient."
    },
    "autoAction": {
      "ar": "إعادة ضبط بروتوكول الجرعة فوراً بمعرفة فيزيائي طبي مؤهل.",
      "en": "Immediately readjust the dose protocol with a qualified medical physicist."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "RAD-02",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "radiology"
    ],
    "code": "NCRP-SHIELD",
    "standard": "NCRP / GAHAR 2025",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سلامة مرايل ودروع الرصاص الواقية من الإشعاع (فحص سنوي بالأشعة للتأكد من خلوها من الشروخ).",
      "en": "Lead radiation-shielding aprons/shields are intact (annual fluoroscopic check confirms no cracks)."
    },
    "autoAction": {
      "ar": "سحب المريلة التالفة فوراً من الخدمة.",
      "en": "Withdraw the damaged apron from service immediately."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "RAD-03",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "radiology"
    ],
    "code": "NCRP-DOSIMETER",
    "standard": "NCRP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "التزام العاملين بارتداء شارة قياس الجرعة الإشعاعية الشخصية (Dosimeter Badge) طوال الدوام.",
      "en": "Staff wear personal radiation dosimeter badges throughout their shift."
    },
    "autoAction": {
      "ar": "منع العامل من دخول غرفة التصوير فوراً حتى ارتداء الشارة.",
      "en": "Deny the staff member entry to the imaging room immediately until the badge is worn."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "RAD-04",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "radiology"
    ],
    "code": "GAHAR-CONTRAST",
    "standard": "GAHAR 2025",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توفر عربة طوارئ ودواء مضاد للتحسس بجوار غرفة الأشعة الملونة (Contrast Media) لحالات فرط التحسس.",
      "en": "An emergency cart with anti-allergic medication is available beside the contrast-imaging room for reaction events."
    },
    "autoAction": {
      "ar": "تفعيل بروتوكول الطوارئ الفوري واستدعاء الطبيب المناوب.",
      "en": "Activate the immediate emergency protocol and call the on-duty physician."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "LAB-01",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "lab"
    ],
    "code": "ISO15189-LABEL",
    "standard": "ISO 15189",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة بيانات ملصق العينة (اسم/رقم المريض) لطلب الفحص قبل قبولها بالمختبر.",
      "en": "Specimen label data (patient name/ID) matches the test request before lab acceptance."
    },
    "autoAction": {
      "ar": "رفض العينة فوراً وطلب إعادة سحبها بالبيانات الصحيحة.",
      "en": "Reject the specimen immediately and request re-collection with correct labeling."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "LAB-02",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "lab"
    ],
    "code": "JCI-CRITICALVALUE",
    "standard": "JCI 8th Ed.",
    "baseline": 30,
    "operator": "<=",
    "unit": "Min",
    "desc": {
      "ar": "زمن إبلاغ الطبيب المعالج بالقيم الحرجة (Critical Values) من لحظة صدور النتيجة.",
      "en": "Time to notify the treating physician of critical lab values from result release."
    },
    "autoAction": {
      "ar": "الاتصال الفوري بالطبيب المعالج أو نائبه المناوب دون تأخير.",
      "en": "Call the treating physician or covering physician immediately without delay."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "LAB-03",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "lab"
    ],
    "code": "ISO15189-BIOHAZARD",
    "standard": "ISO 15189 / OSHA BBP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الفصل الصحيح للنفايات الحيوية الخطرة (عينات دم/أنسجة) في أكياس صفراء معتمدة.",
      "en": "Biohazardous waste (blood/tissue samples) is correctly segregated into approved yellow bags."
    },
    "autoAction": {
      "ar": "إعادة الفرز فوراً وإخطار مسؤول مكافحة العدوى.",
      "en": "Re-sort immediately and notify the infection-control officer."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "LAB-04",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "lab"
    ],
    "code": "ISO15189-EQA",
    "standard": "ISO 15189",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "المشاركة الفعالة ببرنامج تقييم الجودة الخارجي (EQA/Proficiency Testing) لكل فحص حرج.",
      "en": "Active participation in an External Quality Assurance (EQA/Proficiency Testing) program for every critical assay."
    },
    "autoAction": {
      "ar": "التسجيل الفوري ببرنامج EQA معتمد للفحص غير المغطى.",
      "en": "Enroll immediately in an accredited EQA program for the uncovered test."
    },
    "timeline": {
      "ar": "خلال أسبوع",
      "en": "Within 1 Week"
    }
  },
  {
    "id": "LAB-05",
    "sectors": [
      "hospitals",
      "clinics"
    ],
    "depts": [
      "lab"
    ],
    "code": "OSHA-BSC",
    "standard": "OSHA / ISO 15189",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان شهادة المعايرة السنوية لخزانة الأمان الحيوي (Biosafety Cabinet).",
      "en": "The Biosafety Cabinet holds a current annual certification."
    },
    "autoAction": {
      "ar": "إيقاف استخدام الخزانة فوراً لحين إعادة المعايرة.",
      "en": "Take the cabinet out of service immediately pending recalibration."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MW-02",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "medical_waste"
    ],
    "code": "WHO-SHARPS",
    "standard": "WHO / OSHA Bloodborne Pathogens",
    "baseline": 75,
    "operator": "<=",
    "unit": "%",
    "desc": {
      "ar": "عدم امتلاء صناديق الأدوات الحادة (Sharps Containers) بأكثر من 3/4 السعة قبل الإغلاق والاستبدال.",
      "en": "Sharps containers are replaced before exceeding 3/4 fill capacity."
    },
    "autoAction": {
      "ar": "إغلاق الصندوق فوراً واستبداله بآخر فارغ.",
      "en": "Seal the container immediately and replace it with an empty one."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MW-03",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "medical_waste"
    ],
    "code": "WHO-MANIFEST",
    "standard": "WHO / Egyptian EEAA Regulations",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "اكتمال مستند تتبع النفايات الخطرة (Cradle-to-Grave Manifest) من التوليد حتى المعالجة النهائية.",
      "en": "The hazardous-waste tracking manifest is complete from generation through final treatment."
    },
    "autoAction": {
      "ar": "إيقاف نقل الدفعة فوراً حتى استكمال المستند.",
      "en": "Halt the batch transfer immediately until documentation is complete."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MW-04",
    "sectors": [
      "hospitals"
    ],
    "depts": [
      "medical_waste"
    ],
    "code": "WHO-COLORCODE",
    "standard": "WHO Waste Management Guidance",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام بنظام الأكياس الملونة حسب تصنيف منظمة الصحة العالمية (أصفر/أحمر/أسود) لكل نوع نفايات.",
      "en": "Color-coded bag compliance per WHO waste classification (yellow/red/black) for each waste type."
    },
    "autoAction": {
      "ar": "إعادة الفرز الفوري ونقل المخالفة لمنطقة العزل.",
      "en": "Re-sort immediately and move the violation to the isolation area."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "DER-01",
    "sectors": [
      "clinics"
    ],
    "depts": [
      "derma"
    ],
    "code": "ANSI-LASER",
    "standard": "ANSI Z136.1 Laser Safety",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توفر نظارات واقية من الليزر مطابقة للطول الموجي المستخدم أثناء جلسات الليزر/IPL.",
      "en": "Laser-safety eyewear matched to the specific wavelength in use is available during laser/IPL sessions."
    },
    "autoAction": {
      "ar": "إيقاف الجلسة فوراً حتى توفير النظارة الصحيحة.",
      "en": "Halt the session immediately until the correct eyewear is provided."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "DER-02",
    "sectors": [
      "clinics"
    ],
    "depts": [
      "derma"
    ],
    "code": "ISO15189-BIOPSY",
    "standard": "ISO 15189",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توثيق عينات الخزعة الجلدية (موقع الأخذ + بيانات المريض) قبل إرسالها للمختبر.",
      "en": "Skin biopsy specimens are documented (site + patient data) before transport to the lab."
    },
    "autoAction": {
      "ar": "إيقاف الإرسال فوراً حتى استكمال بطاقة البيانات.",
      "en": "Halt transport immediately until the data card is completed."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "DER-03",
    "sectors": [
      "clinics"
    ],
    "depts": [
      "derma"
    ],
    "code": "OSHA-CRYO",
    "standard": "OSHA / NFPA 55",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تهوية كافية لمنطقة تخزين النيتروجين السائل (Cryotherapy) لمنع تراكم الأكسجين المنخفض.",
      "en": "Adequate ventilation in the liquid-nitrogen (cryotherapy) storage area to prevent oxygen displacement."
    },
    "autoAction": {
      "ar": "إخلاء الغرفة فوراً وتشغيل التهوية الطارئة.",
      "en": "Evacuate the room immediately and activate emergency ventilation."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FAC-INF-01",
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
    ],
    "depts": [
      "facility_infrastructure"
    ],
    "code": "ISO22002-LAYOUT",
    "standard": "ISO/TS 22002-1 / GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توفر مخطط هندسي (Layout Drawing) معتمد يوضح مسار حركة المنتج/المريض والعاملين لمنع تقاطع النظيف بالملوث.",
      "en": "An approved facility layout drawing exists showing product/patient and personnel flow to prevent clean-vs-contaminated crossover."
    },
    "autoAction": {
      "ar": "تعليق التشغيل في المنطقة محل الشك فوراً حتى مراجعة المخطط الهندسي مع مسؤول الجودة.",
      "en": "Suspend operations in the affected area immediately until the layout is reviewed with the QA lead."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "FAC-INF-02",
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
    ],
    "depts": [
      "facility_infrastructure"
    ],
    "code": "ISO22002-FLOOR",
    "standard": "ISO/TS 22002-1 / GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الأرضيات من مادة غير مسامية وسهلة التطهير وخالية من الشروخ أو التجمعات المائية الراكدة.",
      "en": "Flooring is non-porous, easily sanitized, and free of cracks or standing-water pooling."
    },
    "autoAction": {
      "ar": "عزل المنطقة المتضررة فوراً وإخطار الصيانة لإصلاح الأرضية.",
      "en": "Cordon the affected area immediately and notify Maintenance to repair the flooring."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "FAC-INF-03",
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
    ],
    "depts": [
      "facility_infrastructure"
    ],
    "code": "ISO22002-COVING",
    "standard": "ISO/TS 22002-1 / GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "التقاء الأرضيات بالحوائط بشكل مقوّس (Coving) بدلاً من الزاوية القائمة، لمنع تجمع الأوساخ وتسهيل التطهير.",
      "en": "Floor-to-wall junctions are coved (rounded) rather than a 90° right angle, preventing dirt buildup and easing sanitation."
    },
    "autoAction": {
      "ar": "إدراج بند تصحيح الزاوية ضمن خطة الصيانة الدورية القادمة.",
      "en": "Log the angle correction in the next scheduled maintenance plan."
    },
    "timeline": {
      "ar": "خلال شهر",
      "en": "Within 1 Month"
    }
  },
  {
    "id": "FAC-INF-04",
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
    ],
    "depts": [
      "facility_infrastructure"
    ],
    "code": "ISO22002-WALLCEIL",
    "standard": "ISO/TS 22002-1 / GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الحوائط والأسقف بلون فاتح، أملس، قابل للغسيل، وخالٍ من تقشر الدهان أو آثار الرطوبة/العفن.",
      "en": "Walls and ceilings are light-colored, smooth, washable, and free of peeling paint or mold/moisture staining."
    },
    "autoAction": {
      "ar": "جدولة إعادة الطلاء بدهان معتمد غذائياً/صحياً خلال الأسبوع الحالي.",
      "en": "Schedule repainting with an approved food-/sanitary-grade coating within the current week."
    },
    "timeline": {
      "ar": "خلال أسبوع",
      "en": "Within 1 Week"
    }
  },
  {
    "id": "FAC-INF-05",
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
    ],
    "depts": [
      "facility_infrastructure"
    ],
    "code": "EN12464-LUX",
    "standard": "EN 12464-1 / ISO/TS 22002-1",
    "baseline": 200,
    "operator": ">=",
    "unit": "Lux",
    "desc": {
      "ar": "شدة الإضاءة في مناطق العمل والفحص الدقيق ضمن الحد الأدنى المطلوب (200 لوكس على الأقل بمناطق التصنيع/الفحص).",
      "en": "Lighting intensity in work/inspection areas meets the minimum requirement (at least 200 lux in production/inspection zones)."
    },
    "autoAction": {
      "ar": "تركيب وحدات إضاءة إضافية فورية أو نقل العملية لمنطقة أفضل إضاءة.",
      "en": "Install additional lighting fixtures immediately or relocate the task to a better-lit area."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FAC-INF-06",
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
    ],
    "depts": [
      "facility_infrastructure"
    ],
    "code": "ISO22002-LIGHTGUARD",
    "standard": "ISO/TS 22002-1 / GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تركيب أغطية واقية ضد التهشم (Shatterproof Covers) على جميع وحدات الإضاءة أعلى مناطق التصنيع/التعبئة المكشوفة.",
      "en": "Shatterproof protective covers are fitted on all light fixtures above exposed production/packing areas."
    },
    "autoAction": {
      "ar": "إيقاف التشغيل أسفل الوحدة غير المحمية فوراً حتى التركيب.",
      "en": "Halt operations beneath the unprotected fixture immediately until a cover is installed."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FAC-INF-07",
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
    ],
    "depts": [
      "facility_infrastructure"
    ],
    "code": "ISO22002-HYGDESIGN",
    "standard": "ISO/TS 22002-1 / EHEDG",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تصميم المعدات صحياً (Hygienic Design): بلا زوايا ميتة (Dead Legs)، لحامات ملساء، ومواد ملامسة معتمدة.",
      "en": "Equipment follows hygienic design principles: no dead legs, smooth welds, and approved contact materials."
    },
    "autoAction": {
      "ar": "وضع علامة \"خارج الخدمة\" على المعدة فوراً حتى معالجة عيب التصميم.",
      "en": "Tag the equipment \"Out of Service\" immediately until the design flaw is corrected."
    },
    "timeline": {
      "ar": "خلال أسبوع",
      "en": "Within 1 Week"
    }
  },
  {
    "id": "FAC-INF-08",
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
    ],
    "depts": [
      "facility_infrastructure"
    ],
    "code": "ISO22002-MSS",
    "standard": "ISO/TS 22002-1 / GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "وجود جدول تطهير ونظافة رئيسي موثّق (Master Sanitation Schedule) يغطي كل منطقة ومعدة بتكرار محدد، مع سجل تنفيذ موقّع.",
      "en": "A documented Master Sanitation Schedule (MSS) exists covering every area/equipment with a defined frequency and a signed completion log."
    },
    "autoAction": {
      "ar": "إعداد الجدول فوراً بالتعاون مع مسؤول الجودة وتوثيق الفجوة كملاحظة كبرى.",
      "en": "Draft the schedule immediately with the QA lead and log the gap as a major finding."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "FAC-INF-09",
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
    ],
    "depts": [
      "facility_infrastructure"
    ],
    "code": "ISO22002-CHEMLOG",
    "standard": "ISO/TS 22002-1 / GHS",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "التحقق الدوري من تركيز مواد التطهير الكيميائية المستخدمة فعلياً (شرائط اختبار) مطابق للتركيز الموصى به من المُصنّع.",
      "en": "Periodic verification (test strips) confirms in-use disinfectant concentration matches the manufacturer-recommended dose."
    },
    "autoAction": {
      "ar": "إعادة تحضير محلول التطهير فوراً وفق النسبة الصحيحة، وسحب الدفعة المُحضّرة خطأً.",
      "en": "Re-prepare the disinfectant solution immediately at the correct ratio, and withdraw the incorrectly mixed batch."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FAC-INF-10",
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
    ],
    "depts": [
      "facility_infrastructure"
    ],
    "code": "ISO22002-COLORCODE",
    "standard": "ISO/TS 22002-1 / GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "أدوات التنظيف (فرش، ممسحات) مُرمّزة بالألوان حسب المنطقة لمنع التلوث التبادلي، ومُخزَّنة معلّقة وجافة.",
      "en": "Cleaning tools (brushes, mops) are color-coded by zone to prevent cross-contamination, and stored hung and dry."
    },
    "autoAction": {
      "ar": "سحب الأداة غير المطابقة فوراً واستبدالها باللون الصحيح للمنطقة.",
      "en": "Withdraw the mismatched tool immediately and replace it with the correct color for the zone."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "FAC-INF-11",
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
    ],
    "depts": [
      "facility_infrastructure"
    ],
    "code": "ISO22002-DRAINAGE",
    "standard": "ISO/TS 22002-1",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مصارف الأرضيات مُتجهة بعيداً عن مناطق الإنتاج/الفحص الحرجة ومُغطاة بشبك يمنع دخول الآفات مع صيانة دورية لمنع الانسداد.",
      "en": "Floor drains flow away from critical production/exam areas, are pest-screened, and are maintained to prevent blockage."
    },
    "autoAction": {
      "ar": "تنظيف المصرف فوراً وتصحيح اتجاه الانحدار إن أمكن، أو إخطار الهندسة.",
      "en": "Clear the drain immediately and correct the slope direction where possible, or notify Engineering."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "VIS-01",
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
    ],
    "depts": [
      "visitor_log"
    ],
    "code": "ISO22002-VISIT",
    "standard": "ISO/TS 22002-1 / ISO 45001:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توقيع كل زائر على إقرار السلامة/الصحة (تصريح صحي وعدم وجود أعراض معدية) قبل الدخول لمناطق التشغيل.",
      "en": "Every visitor signs a health/safety declaration (no infectious symptoms) before entering operational areas."
    },
    "autoAction": {
      "ar": "منع دخول الزائر فوراً حتى استيفاء واستكمال الإقرار.",
      "en": "Deny the visitor entry immediately until the declaration is completed."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "VIS-02",
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
    ],
    "depts": [
      "visitor_log"
    ],
    "code": "ISO22002-VISITPPE",
    "standard": "ISO/TS 22002-1 / GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "صرف معدات الوقاية الشخصية المطابقة للزائر (معطف/غطاء رأس/واقي أحذية حسب المنطقة) قبل الدخول.",
      "en": "Visitors are issued area-appropriate PPE (coat/hairnet/shoe covers as applicable) before entry."
    },
    "autoAction": {
      "ar": "إيقاف الجولة فوراً حتى صرف المعدات الناقصة.",
      "en": "Halt the visit immediately until the missing PPE is issued."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "VIS-03",
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
    ],
    "depts": [
      "visitor_log"
    ],
    "code": "ISO45001-ESCORT",
    "standard": "ISO 45001:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مرافقة الزائر بمُضيف/مُرافق مسؤول طوال مدة الزيارة دون ترك الزائر يتجول بمفرده في المناطق التشغيلية.",
      "en": "Visitors are accompanied by a responsible host/escort for the entire visit, never left to roam operational areas unaccompanied."
    },
    "autoAction": {
      "ar": "إيقاف تحرك الزائر فوراً وتعيين مرافق مسؤول على الفور.",
      "en": "Halt the visitor movement immediately and assign a responsible escort at once."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "VIS-04",
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
    ],
    "depts": [
      "visitor_log"
    ],
    "code": "ISO22002-VISITLOG",
    "standard": "ISO/TS 22002-1",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تسجيل بيانات الزائر كاملة في سجل الدخول (الاسم، الجهة، الغرض، وقت الدخول والخروج) دون أي فراغات.",
      "en": "Full visitor data is recorded in the entry log (name, organization, purpose, time in/out) with no blank fields."
    },
    "autoAction": {
      "ar": "استكمال بيانات السجل فوراً قبل السماح بالدخول.",
      "en": "Complete the log entry immediately before granting entry."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "VIS-05",
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
    ],
    "depts": [
      "visitor_log"
    ],
    "code": "ISO45001-INDUCTION",
    "standard": "ISO 45001:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "إطلاع الزائر على تعليمات السلامة الأساسية ومسارات الإخلاء قبل بدء الجولة (توجيه سلامة مختصر).",
      "en": "Visitors receive a brief safety induction covering basic hazards and evacuation routes before the tour begins."
    },
    "autoAction": {
      "ar": "إيقاف الجولة فوراً لإجراء التوجيه المختصر قبل المتابعة.",
      "en": "Pause the tour immediately to deliver the brief induction before continuing."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "VIS-06",
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
    ],
    "depts": [
      "visitor_log"
    ],
    "code": "ISO22002-RESTRICT",
    "standard": "ISO/TS 22002-1 / GAHAR 2025",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "منع الزوار من الاقتراب المباشر من المنتج المكشوف/المريض أو لمس المعدات دون إذن صريح من المُضيف.",
      "en": "Visitors are kept from direct contact with exposed product/patients or equipment without explicit host permission."
    },
    "autoAction": {
      "ar": "التدخل الفوري لإبعاد الزائر ومنع أي ملامسة مباشرة.",
      "en": "Intervene immediately to move the visitor away and prevent any direct contact."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "VIS-07",
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
    ],
    "depts": [
      "visitor_log"
    ],
    "code": "ISO22002-VISITBAN",
    "standard": "ISO/TS 22002-1",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام بسياسة منع اصطحاب الطعام أو الشراب أو الأمتعة الشخصية غير الضرورية للزائر داخل مناطق الإنتاج/العناية الحرجة.",
      "en": "Visitors comply with the no food/drink/unnecessary personal belongings policy inside critical production/care areas."
    },
    "autoAction": {
      "ar": "مطالبة الزائر فوراً بترك الأغراض المخالفة عند نقطة الدخول.",
      "en": "Ask the visitor immediately to leave the non-compliant items at the entry point."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHF-01",
    "sectors": [
      "pharma_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "ISO14644-CLEAN",
    "standard": "ISO 14644-1 / EU GMP Annex 1",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تصنيف غرف الإنتاج النظيفة (Cleanroom Grade) مطابق للمواصفة المعتمدة، مع سجل عدّ جسيمات دوري.",
      "en": "Production cleanroom classification matches the approved grade, with a periodic particle-count log."
    },
    "autoAction": {
      "ar": "إيقاف التصنيع فوراً وعزل الدفعة الحالية حتى إعادة التحقق من تصنيف الغرفة.",
      "en": "Halt manufacturing immediately and quarantine the current batch until the room classification is re-verified."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHF-02",
    "sectors": [
      "pharma_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "FDA21CFR211-BMR",
    "standard": "FDA 21 CFR 211 / EU GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "استيفاء سجل تصنيع الدفعة (Batch Manufacturing Record) لحظياً بلا أي فراغات أو تصحيحات غير موثّقة.",
      "en": "The Batch Manufacturing Record (BMR) is completed in real time with no blank fields or undocumented corrections."
    },
    "autoAction": {
      "ar": "إيقاف الخط فوراً حتى استكمال التوثيق الناقص بمعرفة المشرف المسؤول.",
      "en": "Halt the line immediately until the missing documentation is completed by the responsible supervisor."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHF-03",
    "sectors": [
      "pharma_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "GMP-LINECLEAR",
    "standard": "EU GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "إتمام إجراء \"مخالصة الخط\" (Line Clearance) الموثّق قبل بدء تصنيع أي دفعة جديدة، لمنع اختلاط المنتجات.",
      "en": "Documented Line Clearance is completed before starting any new batch, preventing product mix-up."
    },
    "autoAction": {
      "ar": "إيقاف بدء الدفعة الجديدة فوراً حتى استكمال واعتماد مخالصة الخط.",
      "en": "Halt the new batch start immediately until Line Clearance is completed and signed off."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHF-04",
    "sectors": [
      "pharma_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "USP-REFSTD",
    "standard": "USP / EU GMP",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تتبع صلاحية المعايير المرجعية (Reference/Working Standards) المستخدمة في الفحوصات المعملية.",
      "en": "Traceability and expiry status of reference/working standards used in lab testing is verified."
    },
    "autoAction": {
      "ar": "سحب المعيار منتهي الصلاحية فوراً وتعليق النتائج المرتبطة به.",
      "en": "Withdraw the expired standard immediately and suspend results linked to it."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHF-05",
    "sectors": [
      "pharma_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "ICH-STABILITY",
    "standard": "ICH Q1A / EU GMP",
    "baseline": 25,
    "operator": "<=",
    "unit": "°C",
    "desc": {
      "ar": "ضبط درجة حرارة ورطوبة غرف دراسة الثبات (Stability Chambers) ضمن الظروف المعتمدة للدراسة.",
      "en": "Stability testing chamber temperature/humidity is maintained within the approved study conditions."
    },
    "autoAction": {
      "ar": "نقل العينات فوراً لغرفة بديلة معايرة وتوثيق الانحراف كحدث خارج المواصفة (OOS).",
      "en": "Transfer samples immediately to a calibrated backup chamber and log the deviation as an OOS event."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHF-06",
    "sectors": [
      "pharma_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "GS1-SERIAL",
    "standard": "GS1 / FDA DSCSA",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "التحقق من طباعة وقراءة كود التتبع التسلسلي (Serialization) على كل عبوة لمكافحة التزييف.",
      "en": "Serialization code print-and-verify (anti-counterfeiting track-and-trace) is confirmed on every pack."
    },
    "autoAction": {
      "ar": "إيقاف خط التعبئة فوراً وعزل العبوات غير المقروءة للفحص اليدوي.",
      "en": "Halt the packaging line immediately and quarantine unreadable packs for manual verification."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHF-07",
    "sectors": [
      "pharma_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "GMP-RECONCILE",
    "standard": "EU GMP",
    "baseline": 98,
    "operator": ">=",
    "unit": "%",
    "desc": {
      "ar": "مطابقة تسوية الدفعة (Batch Reconciliation) بين الكمية بالمواد الأولية والوحدات المُعبأة الفعلية ضمن الحد المسموح.",
      "en": "Batch reconciliation between bulk material issued and actual packed units falls within the permitted tolerance."
    },
    "autoAction": {
      "ar": "إيقاف الإفراج عن الدفعة فوراً حتى تحقيق قسم الجودة في فارق التسوية.",
      "en": "Hold batch release immediately until QA investigates the reconciliation variance."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHF-08",
    "sectors": [
      "pharma_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "GDP-COLDCHAIN",
    "standard": "WHO GDP / EU GMP",
    "baseline": 8,
    "operator": "<=",
    "unit": "°C",
    "desc": {
      "ar": "استمرارية سلسلة التبريد لمنتجات الأدوية الحساسة حرارياً أثناء التحميل والنقل (2-8°C).",
      "en": "Cold-chain continuity for temperature-sensitive pharmaceuticals is maintained during loading and transport (2-8°C)."
    },
    "autoAction": {
      "ar": "رفض الشحن فوراً حتى استعادة النطاق الحراري المطلوب.",
      "en": "Reject dispatch immediately until the required temperature range is restored."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHF-09",
    "sectors": [
      "pharma_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "GMP-QPRELEASE",
    "standard": "EU GMP Annex 16",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "التحقق من حالة \"الإفراج\" الرسمية (QP Release/Certificate of Conformance) قبل السماح بشحن أي دفعة.",
      "en": "Formal QP Release / Certificate of Conformance status is verified before any batch is permitted to ship."
    },
    "autoAction": {
      "ar": "إيقاف الشحن فوراً حتى صدور شهادة الإفراج الرسمية.",
      "en": "Hold the shipment immediately until formal release documentation is issued."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHF-10",
    "sectors": [
      "pharma_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "EUGMP-GOWNING",
    "standard": "EU GMP Annex 1",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "اجتياز العامل لتأهيل إجراء الارتداء (Gowning Qualification) المعتمد قبل دخول الغرف النظيفة.",
      "en": "Personnel have passed the validated Gowning Qualification procedure before entering cleanrooms."
    },
    "autoAction": {
      "ar": "منع الدخول فوراً حتى إعادة التأهيل على إجراء الارتداء الصحيح.",
      "en": "Deny entry immediately until the worker is re-qualified on correct gowning procedure."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "PHF-11",
    "sectors": [
      "pharma_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "EUGMP-CASCADE",
    "standard": "EU GMP Annex 1",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "استمرار كسر الضغط التصاعدي الصحيح (Pressure Cascade) بين غرف الأقفال الهوائية (Airlocks) والغرف النظيفة.",
      "en": "The correct positive-pressure cascade between airlocks and cleanrooms is continuously maintained."
    },
    "autoAction": {
      "ar": "إيقاف الدخول والخروج من الغرفة فوراً وإخطار الهندسة لفحص نظام التهوية.",
      "en": "Halt room entry/exit immediately and notify Engineering to inspect the HVAC system."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CHF-01",
    "sectors": [
      "chemical_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "OSHA-PSM-PHA",
    "standard": "OSHA PSM 1910.119",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان دراسة تحليل مخاطر العمليات (Process Hazard Analysis) للعمليات الكيماوية الحرجة دون تجاوز موعد المراجعة.",
      "en": "The Process Hazard Analysis (PHA) for critical chemical processes is current and not overdue for review."
    },
    "autoAction": {
      "ar": "تعليق تشغيل الوحدة فوراً حتى استكمال مراجعة الـ PHA.",
      "en": "Suspend unit operation immediately until the PHA review is completed."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CHF-02",
    "sectors": [
      "chemical_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "OSHA-ESD",
    "standard": "OSHA PSM / IEC 61511",
    "baseline": 1,
    "operator": ">=",
    "unit": "Count",
    "desc": {
      "ar": "اجتياز اختبار نظام الإيقاف الطارئ (Emergency Shutdown System) الدوري بنجاح.",
      "en": "The periodic Emergency Shutdown System (ESD) functional test passes successfully."
    },
    "autoAction": {
      "ar": "إيقاف الوحدة يدوياً فوراً وتعليق التشغيل حتى إصلاح واختبار نظام الإيقاف.",
      "en": "Manually shut down the unit immediately and suspend operation until the ESD is repaired and re-tested."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CHF-03",
    "sectors": [
      "chemical_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "ASME-PRV",
    "standard": "ASME BPVC / OSHA PSM",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان شهادة فحص صمامات تخفيف الضغط (Pressure Relief Valves) على المفاعلات والأوعية الكيماوية.",
      "en": "Pressure Relief Valve (PRV) inspection certification on reactors and chemical vessels is current."
    },
    "autoAction": {
      "ar": "إيقاف تشغيل الوعاء فوراً حتى استكمال فحص واعتماد الصمام.",
      "en": "Take the vessel out of service immediately until the valve is inspected and certified."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CHF-04",
    "sectors": [
      "chemical_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "OSHA-FUMEHOOD",
    "standard": "OSHA / NFPA 45",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "كفاءة سحب هواء خزانة السحب الكيماوي (Fume Hood) عند فحص العينات التفاعلية أو شديدة التطاير.",
      "en": "Fume hood face-velocity performance is adequate when handling reactive or highly volatile samples."
    },
    "autoAction": {
      "ar": "إيقاف الفحص فوراً ونقل العينة لخزانة سحب بديلة تعمل بكفاءة.",
      "en": "Halt testing immediately and move the sample to a properly functioning backup fume hood."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CHF-05",
    "sectors": [
      "chemical_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "NFPA497-EXPROOF",
    "standard": "NFPA 497 / ATEX",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "استخدام معدات معتمدة ضد الانفجار (Explosion-Proof) داخل مناطق فحص المذيبات القابلة للاشتعال.",
      "en": "Certified explosion-proof equipment is used within areas testing flammable solvents."
    },
    "autoAction": {
      "ar": "إيقاف العمل فوراً بالمعدة غير المعتمدة واستبدالها بمعدة متوافقة.",
      "en": "Stop work with the non-certified equipment immediately and substitute a compliant unit."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CHF-06",
    "sectors": [
      "chemical_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "GHS-COMPAT",
    "standard": "GHS / REACH",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "توافق مادة عبوة التغليف كيميائياً مع المادة المُعبأة (عدم التفاعل أو التآكل).",
      "en": "Packaging container material is chemically compatible with the filled substance (no reaction or corrosion)."
    },
    "autoAction": {
      "ar": "إيقاف التعبئة فوراً وتحويل الدفعة لعبوات متوافقة.",
      "en": "Halt filling immediately and transfer the batch to compatible containers."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CHF-07",
    "sectors": [
      "chemical_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "GHS-LABEL",
    "standard": "GHS Rev. 9",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "وجود بطاقة بيان مخاطر GHS كاملة (الرموز التحذيرية، بيانات المخاطر) على كل عبوة صادرة.",
      "en": "Complete GHS hazard labeling (pictograms, hazard statements) is present on every outgoing container."
    },
    "autoAction": {
      "ar": "إيقاف الشحن فوراً حتى استكمال اللصق الصحيح للبطاقات.",
      "en": "Hold shipment immediately until correct labeling is applied."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CHF-08",
    "sectors": [
      "chemical_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "ADR-DGDOC",
    "standard": "ADR / UN Model Regulations",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "اكتمال مستندات نقل البضائع الخطرة (رقم الأمم المتحدة، لوحات التحذير) قبل مغادرة الشحنة.",
      "en": "Dangerous Goods transport documentation (UN number, hazard placards) is complete before the shipment departs."
    },
    "autoAction": {
      "ar": "إيقاف الشحنة فوراً حتى استكمال كل المستندات واللوحات المطلوبة.",
      "en": "Hold the shipment immediately until all required documents and placards are in place."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CHF-09",
    "sectors": [
      "chemical_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "ADR-DRIVERCERT",
    "standard": "ADR",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان شهادة تدريب سائق نقل المواد الخطرة (ADR/Hazmat Certification).",
      "en": "The hazardous-materials transport driver holds a current ADR/Hazmat certification."
    },
    "autoAction": {
      "ar": "منع مغادرة الشحنة فوراً حتى توفير سائق مؤهل بديل.",
      "en": "Prevent the shipment from departing immediately until a qualified replacement driver is available."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CHF-10",
    "sectors": [
      "chemical_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "OSHA-RESPFIT",
    "standard": "OSHA 1910.134",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان اختبار ملاءمة أقنعة التنفس (Respirator Fit-Test) السنوي للعاملين في مناطق التعرض الكيميائي.",
      "en": "Annual respirator fit-test certification is current for workers in chemical-exposure areas."
    },
    "autoAction": {
      "ar": "منع دخول العامل فوراً للمنطقة حتى اجتياز اختبار الملاءمة.",
      "en": "Deny the worker area entry immediately until the fit-test is passed."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CHF-11",
    "sectors": [
      "chemical_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "ANSI-EYEWASH",
    "standard": "ANSI Z358.1",
    "baseline": 1,
    "operator": ">=",
    "unit": "Count",
    "desc": {
      "ar": "اجتياز اختبار تدفق محطة غسيل العين ودُش الطوارئ (Emergency Shower/Eyewash) الأسبوعي.",
      "en": "The weekly flow test of the emergency shower/eyewash station passes."
    },
    "autoAction": {
      "ar": "وضع علامة خارج الخدمة فوراً وتوفير محطة طوارئ متنقلة بديلة.",
      "en": "Tag the station out of service immediately and provide a portable backup emergency station."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "TXF-01",
    "sectors": [
      "textile_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "OSHA-NEEDLEGUARD",
    "standard": "OSHA 1910.212",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تركيب أغطية واقية على إبر ماكينات الخياطة وسكاكين ماكينات القص لمنع إصابات الأطراف.",
      "en": "Needle guards on sewing machines and blade guards on cutting machines are fitted to prevent hand injuries."
    },
    "autoAction": {
      "ar": "إيقاف الماكينة فوراً حتى إعادة تركيب الغطاء الواقي.",
      "en": "Stop the machine immediately until the protective guard is reinstalled."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "TXF-02",
    "sectors": [
      "textile_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "OSHA-LINTDUST",
    "standard": "OSHA / NFPA 654",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "كفاءة نظام شفط الغبار والوبر (Lint Extraction) لمنع تراكمه كخطر حريق وتنفسي.",
      "en": "The lint/dust extraction system operates effectively to prevent fire and respiratory hazards from buildup."
    },
    "autoAction": {
      "ar": "إيقاف التشغيل فوراً وتنظيف التراكم قبل الاستئناف.",
      "en": "Halt operation immediately and clear the buildup before resuming."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "TXF-03",
    "sectors": [
      "textile_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "ISO8124-NEEDLECTRL",
    "standard": "ISO 8124 / Customer Code",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تطبيق بروتوكول التحكم بالإبر المكسورة في منطقة القص والخياطة (سجل جرد الإبر بداية ونهاية الوردية).",
      "en": "Broken-needle control protocol is enforced in cutting/sewing areas (needle inventory logged at shift start/end)."
    },
    "autoAction": {
      "ar": "وقف الخط فوراً والبحث عن الإبرة المفقودة قبل استئناف الإنتاج.",
      "en": "Stop the line immediately and search for the missing needle before resuming production."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "TXF-04",
    "sectors": [
      "textile_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "ZDHC-MRSL",
    "standard": "ZDHC MRSL / OEKO-TEX",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "فحص المواد الكيماوية المقيدة (Restricted Substances) في الأصباغ والأقمشة مطابق لقائمة ZDHC MRSL.",
      "en": "Restricted-substance testing of dyes and fabrics complies with the ZDHC MRSL list."
    },
    "autoAction": {
      "ar": "عزل الدفعة فوراً وإعادة الفحص قبل الإفراج عنها للإنتاج.",
      "en": "Quarantine the batch immediately and re-test before releasing it to production."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "TXF-05",
    "sectors": [
      "textile_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "ISO105-COLORFAST",
    "standard": "ISO 105 / AATCC",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان معايرة جهاز اختبار ثبات اللون (Colorfastness Tester) المستخدم في قبول الأقمشة.",
      "en": "The colorfastness testing equipment used for fabric acceptance holds a current calibration."
    },
    "autoAction": {
      "ar": "تعليق نتائج الفحص فوراً وإرسال الجهاز للمعايرة.",
      "en": "Suspend test results immediately and send the equipment for calibration."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "TXF-06",
    "sectors": [
      "textile_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "ISO8124-NEEDLEDET",
    "standard": "ISO 8124 / Customer Code",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مرور كل قطعة عبر جهاز كاشف الإبر المعدنية (Needle Detector) قبل التعبئة النهائية.",
      "en": "Every finished garment passes through a metal needle detector before final packing."
    },
    "autoAction": {
      "ar": "إيقاف التعبئة فوراً وإعادة فحص الدفعة كاملة عبر الكاشف.",
      "en": "Halt packing immediately and re-scan the entire batch through the detector."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "TXF-07",
    "sectors": [
      "textile_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "ISO3758-LABEL",
    "standard": "ISO 3758 (Care Labelling)",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة بطاقة العناية ومحتوى الألياف المطبوعة للمواصفة الفعلية للمنتج المُعبأ.",
      "en": "The printed care label and fiber-content declaration match the actual specification of the packed product."
    },
    "autoAction": {
      "ar": "إيقاف الشحن فوراً وتصحيح البطاقات غير المطابقة.",
      "en": "Hold shipment immediately and correct the mismatched labels."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "TXF-08",
    "sectors": [
      "textile_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "ISO9001-CTNMATCH",
    "standard": "ISO 9001:2015",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة بيانات كرتونة الشحن (رقم الطلبية، الكمية) للمستندات المرفقة قبل التحميل.",
      "en": "Shipping carton data (order number, quantity) matches the accompanying documents before loading."
    },
    "autoAction": {
      "ar": "إيقاف التحميل فوراً حتى تصحيح بيانات الكرتونة.",
      "en": "Halt loading immediately until carton data is corrected."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "TXF-09",
    "sectors": [
      "textile_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "ISO9001-MOISTURE",
    "standard": "ISO 9001:2015",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "استخدام أغلفة واقية من الرطوبة (Poly Bags) للمنتجات النسيجية أثناء النقل لمنع التعفن أو البقع.",
      "en": "Moisture-protective poly wrapping is used for textile goods during transport to prevent mildew or staining."
    },
    "autoAction": {
      "ar": "إيقاف الشحن فوراً حتى استكمال التغليف الواقي.",
      "en": "Hold shipment immediately until protective wrapping is completed."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "TXF-10",
    "sectors": [
      "textile_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "OSHA-NOISE-TEX",
    "standard": "OSHA 1910.95",
    "baseline": 85,
    "operator": "<=",
    "unit": "dB",
    "desc": {
      "ar": "مستوى الضوضاء في مناطق النسيج والغزل ضمن الحد المسموح دون معدات وقاية سمعية.",
      "en": "Weaving/spinning area noise level stays within the permissible limit without hearing protection."
    },
    "autoAction": {
      "ar": "صرف واقيات سمع فورية وتقييم الحاجة لعزل صوتي إضافي.",
      "en": "Issue hearing protection immediately and assess the need for additional acoustic treatment."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "TXF-11",
    "sectors": [
      "textile_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "OSHA-DYEVENT",
    "standard": "OSHA / NFPA 91",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "كفاءة التهوية في مناطق الصبغ والمعالجة الكيميائية لمنع تراكم الأبخرة.",
      "en": "Ventilation in dyeing and chemical-treatment areas is effective at preventing vapor buildup."
    },
    "autoAction": {
      "ar": "إخلاء المنطقة فوراً وتشغيل التهوية الطارئة حتى استعادة معدل التجديد المطلوب.",
      "en": "Evacuate the area immediately and run emergency ventilation until the required air-change rate is restored."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MTF-01",
    "sectors": [
      "metal_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "OSHA-POG",
    "standard": "OSHA 1910.212",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سلامة أغطية نقطة التشغيل (Point-of-Operation Guards) على المكابس والمخارط وماكينات CNC.",
      "en": "Point-of-operation guards on presses, lathes, and CNC machines are intact and functioning."
    },
    "autoAction": {
      "ar": "إيقاف الماكينة فوراً حتى إعادة تركيب الغطاء الواقي.",
      "en": "Stop the machine immediately until the guard is reinstalled."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MTF-02",
    "sectors": [
      "metal_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "OSHA-WELDFUME",
    "standard": "OSHA 1910.252 / ACGIH",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "كفاءة نظام شفط أبخرة اللحام (Welding Fume Extraction) عند محطات اللحام.",
      "en": "The welding fume extraction system performs effectively at welding stations."
    },
    "autoAction": {
      "ar": "إيقاف اللحام فوراً حتى استعادة كفاءة الشفط أو توفير تهوية بديلة.",
      "en": "Halt welding immediately until extraction efficiency is restored or alternate ventilation is provided."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MTF-03",
    "sectors": [
      "metal_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "OSHA-LOTO-DIE",
    "standard": "OSHA 1910.147",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تطبيق إجراء العزل والتأمين (LOTO) الكامل أثناء تغيير القوالب أو صيانة الماكينات الثقيلة.",
      "en": "Full Lockout-Tagout (LOTO) procedure is applied during die changes or heavy machinery maintenance."
    },
    "autoAction": {
      "ar": "إيقاف العمل فوراً حتى تطبيق إجراء LOTO الكامل.",
      "en": "Halt work immediately until full LOTO is applied."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MTF-04",
    "sectors": [
      "metal_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "ISO9001-CALDIM",
    "standard": "ISO 9001:2015 / ISO/IEC 17025",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان شهادات معايرة أدوات القياس الأبعادي (فرجار، ميكرومتر، أجهزة CMM).",
      "en": "Dimensional measuring equipment (calipers, micrometers, CMM) holds current calibration certificates."
    },
    "autoAction": {
      "ar": "سحب الأداة فوراً من الاستخدام وتعليق نتائج الفحص المرتبطة بها.",
      "en": "Withdraw the tool from use immediately and suspend related inspection results."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MTF-05",
    "sectors": [
      "metal_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "ISO9001-MTC",
    "standard": "ISO 9001:2015",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تتبع شهادات فحص المواد الخام (Mill Test Certificates) ومطابقتها لدفعة الإنتاج الفعلية.",
      "en": "Raw-material Mill Test Certificates are traceable and match the actual production batch."
    },
    "autoAction": {
      "ar": "إيقاف استخدام الخامة فوراً حتى مطابقة أو استخراج الشهادة الصحيحة.",
      "en": "Stop using the material immediately until the correct certificate is matched or obtained."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MTF-06",
    "sectors": [
      "metal_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "ISO9001-EDGEPROT",
    "standard": "ISO 9001:2015",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "استخدام حواف واقية (Edge Protectors) على القطع المعدنية الحادة قبل التعبئة والشحن.",
      "en": "Edge protectors are applied to sharp metal parts before packing and shipment."
    },
    "autoAction": {
      "ar": "إيقاف التعبئة فوراً حتى تركيب الحواف الواقية.",
      "en": "Halt packing immediately until edge protectors are installed."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MTF-07",
    "sectors": [
      "metal_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "ISO9001-LOADRATE",
    "standard": "ISO 9001:2015",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة تصنيف تحمل عبوة الشحن (Load Rating) لوزن المنتج المعدني الفعلي.",
      "en": "Packaging load rating matches the actual weight of the metal product being shipped."
    },
    "autoAction": {
      "ar": "إيقاف الشحن فوراً واستبدال العبوة بأخرى بتصنيف تحمل مناسب.",
      "en": "Hold shipment immediately and replace the packaging with an appropriately rated one."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MTF-08",
    "sectors": [
      "metal_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "OSHA-LOADSECURE",
    "standard": "OSHA 1917 / ISO 45001:2018",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تأمين حمولة الشحنات الثقيلة بالسلاسل/الأربطة المعتمدة أثناء الرفع بالرافعة أو الشوكية.",
      "en": "Heavy shipment loads are secured with approved chains/straps during crane or forklift lifting."
    },
    "autoAction": {
      "ar": "إيقاف الرفع فوراً حتى إعادة تأمين الحمولة بشكل صحيح.",
      "en": "Halt the lift immediately until the load is properly re-secured."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MTF-09",
    "sectors": [
      "metal_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "ISO9001-CORROSION",
    "standard": "ISO 9001:2015",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تطبيق طبقة حماية من الصدأ (زيت/طلاء واقٍ) على المنتجات المعدنية قبل الشحن لمسافات طويلة أو التصدير.",
      "en": "A corrosion-protection coating (oil/protective paint) is applied to metal products before long-haul or export shipping."
    },
    "autoAction": {
      "ar": "إيقاف الشحن فوراً حتى تطبيق طبقة الحماية.",
      "en": "Hold shipment immediately until the protective coating is applied."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MTF-10",
    "sectors": [
      "metal_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "OSHA-NOISE-MTL",
    "standard": "OSHA 1910.95",
    "baseline": 85,
    "operator": "<=",
    "unit": "dB",
    "desc": {
      "ar": "مستوى الضوضاء في مناطق التشغيل الآلي (خراطة/تفريز) ضمن الحد المسموح دون معدات وقاية.",
      "en": "Noise level in machining areas (turning/milling) stays within the permissible limit without protection."
    },
    "autoAction": {
      "ar": "صرف واقيات سمع فورية وتقييم مصدر الضوضاء.",
      "en": "Issue hearing protection immediately and assess the noise source."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "MTF-11",
    "sectors": [
      "metal_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "OSHA-EYEFACE",
    "standard": "OSHA 1910.133",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام بارتداء واقيات العين والوجه الإلزامية في محطات اللحام والصنفرة.",
      "en": "Mandatory eye/face protection is worn at welding and grinding stations."
    },
    "autoAction": {
      "ar": "إيقاف العامل فوراً عن العمل حتى ارتداء المعدات المطلوبة.",
      "en": "Stop the worker immediately until the required protection is worn."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CNF-01",
    "sectors": [
      "construction_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "ISO9001-KILNTEMP",
    "standard": "ISO 9001:2015",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سجل مراقبة درجة حرارة الأفران (Kiln/Furnace) مستمر ومطابق لمنحنى الحرق المعتمد للمنتج.",
      "en": "Kiln/furnace temperature monitoring log is continuous and matches the approved firing curve for the product."
    },
    "autoAction": {
      "ar": "إيقاف دفعة الحرق فوراً وتصحيح منحنى الحرارة قبل المتابعة.",
      "en": "Halt the firing batch immediately and correct the temperature curve before continuing."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CNF-02",
    "sectors": [
      "construction_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "OSHA-SILICA",
    "standard": "OSHA 1910.1053",
    "baseline": 50,
    "operator": "<=",
    "unit": "µg/m³",
    "desc": {
      "ar": "تركيز غبار السيليكا المتبلور القابل للاستنشاق (RCS) ضمن الحد المسموح بموجب معيار OSHA للسيليكا.",
      "en": "Respirable Crystalline Silica (RCS) concentration stays within the OSHA silica standard permissible limit."
    },
    "autoAction": {
      "ar": "إيقاف العملية المولّدة للغبار فوراً وتفعيل نظام قمع الغبار بالماء أو الشفط.",
      "en": "Halt the dust-generating process immediately and activate water suppression or extraction."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CNF-03",
    "sectors": [
      "construction_factories"
    ],
    "depts": [
      "production_line"
    ],
    "code": "OSHA-CONVEYOR",
    "standard": "OSHA 1910.212",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سلامة أغطية الحماية على السيور الناقلة (Conveyor Belts) عند نقاط الالتقام ونقل المواد الخام.",
      "en": "Protective guarding on conveyor belts is intact at nip points and raw-material transfer zones."
    },
    "autoAction": {
      "ar": "إيقاف السير فوراً حتى إعادة تركيب الغطاء الواقي.",
      "en": "Stop the conveyor immediately until the guard is reinstalled."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CNF-04",
    "sectors": [
      "construction_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "ASTM-COMPSTRENGTH",
    "standard": "ASTM C39 / EN 12390",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سريان معايرة جهاز فحص مقاومة الضغط (Compressive Strength Tester) لمكعبات الخرسانة/الأسمنت.",
      "en": "The compressive-strength tester used for concrete/cement cubes holds a current calibration."
    },
    "autoAction": {
      "ar": "تعليق نتائج الفحص فوراً وإرسال الجهاز للمعايرة قبل إصدار أي شهادة.",
      "en": "Suspend test results immediately and send the equipment for calibration before issuing any certificate."
    },
    "timeline": {
      "ar": "خلال 24 ساعة",
      "en": "Within 24 Hours"
    }
  },
  {
    "id": "CNF-05",
    "sectors": [
      "construction_factories"
    ],
    "depts": [
      "qc_lab"
    ],
    "code": "ISO9001-RAWCOMP",
    "standard": "ISO 9001:2015 / EN 197-1",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة نسب مكونات الخامة الأولية للمواصفة المعتمدة قبل إدخالها لخط الإنتاج.",
      "en": "Raw-material composition ratios match the approved specification before entering the production line."
    },
    "autoAction": {
      "ar": "إيقاف إدخال الخامة فوراً حتى تصحيح النسب أو استبدال الدفعة.",
      "en": "Halt raw-material intake immediately until ratios are corrected or the batch is replaced."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CNF-06",
    "sectors": [
      "construction_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "OIML-BAGWEIGHT",
    "standard": "OIML R 61",
    "baseline": 2,
    "operator": "<=",
    "unit": "%",
    "desc": {
      "ar": "دقة وزن أكياس الأسمنت/المواد المُعبأة ضمن هامش الخطأ المسموح مقارنة بالوزن المُعلن.",
      "en": "Cement/material bag weight accuracy stays within the permitted tolerance versus the declared weight."
    },
    "autoAction": {
      "ar": "إيقاف خط التعبئة فوراً وإعادة معايرة ميزان التعبئة.",
      "en": "Halt the packing line immediately and recalibrate the filling scale."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CNF-07",
    "sectors": [
      "construction_factories"
    ],
    "depts": [
      "packaging"
    ],
    "code": "ISO9001-PALLETWRAP",
    "standard": "ISO 9001:2015",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "سلامة تغليف الطبليات بغطاء بلاستيكي واقٍ من الرطوبة والعوامل الجوية قبل التخزين الخارجي.",
      "en": "Pallet shrink-wrap protection against moisture/weather is intact before outdoor storage."
    },
    "autoAction": {
      "ar": "إعادة تغليف الطبلية فوراً قبل نقلها لمنطقة التخزين الخارجي.",
      "en": "Re-wrap the pallet immediately before moving it to outdoor storage."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CNF-08",
    "sectors": [
      "construction_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "OSHA-BULKDUST",
    "standard": "OSHA 1910.94",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تفعيل نظام التحكم بالغبار أثناء التحميل السائب (Bulk Loading) لشاحنات الأسمنت/الركام.",
      "en": "Dust-control system is active during bulk loading of cement/aggregate trucks."
    },
    "autoAction": {
      "ar": "إيقاف التحميل فوراً حتى تفعيل نظام التحكم بالغبار.",
      "en": "Halt loading immediately until the dust-control system is activated."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CNF-09",
    "sectors": [
      "construction_factories"
    ],
    "depts": [
      "dispatch"
    ],
    "code": "ISO9001-AXLELOAD",
    "standard": "Local Traffic Law / ISO 9001:2015",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "مطابقة وزن الحمولة الموزع على المحاور (Axle Load) للحد القانوني المسموح قبل مغادرة الشاحنة.",
      "en": "Truck axle-load weight distribution complies with the legal limit before the vehicle departs."
    },
    "autoAction": {
      "ar": "إيقاف مغادرة الشاحنة فوراً حتى إعادة توزيع الحمولة.",
      "en": "Prevent the truck from departing immediately until the load is redistributed."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CNF-10",
    "sectors": [
      "construction_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "OSHA-SILICA-PPE",
    "standard": "OSHA 1910.1053",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "الالتزام الكامل بارتداء واقي التنفس المطابق (N95 أو أعلى) في مناطق الغبار العالي.",
      "en": "Full compliance with appropriately rated respiratory protection (N95 or higher) in high-dust zones."
    },
    "autoAction": {
      "ar": "منع دخول العامل فوراً للمنطقة حتى ارتداء واقي التنفس الصحيح.",
      "en": "Deny the worker area entry immediately until correct respiratory protection is worn."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  },
  {
    "id": "CNF-11",
    "sectors": [
      "construction_factories"
    ],
    "depts": [
      "hygiene_gates"
    ],
    "code": "OSHA-HEATSTRESS",
    "standard": "OSHA / NIOSH Heat Stress",
    "baseline": 100,
    "operator": "==",
    "unit": "%",
    "desc": {
      "ar": "تطبيق بروتوكول الوقاية من إجهاد الحرارة (فترات راحة، مياه) للعاملين قرب الأفران عالية الحرارة.",
      "en": "Heat-stress prevention protocol (rest breaks, water access) is applied for workers near high-temperature kilns."
    },
    "autoAction": {
      "ar": "سحب العامل فوراً لمنطقة تبريد وتفعيل بروتوكول الطوارئ الحراري.",
      "en": "Pull the worker immediately to a cooling area and activate the heat-emergency protocol."
    },
    "timeline": {
      "ar": "فوري",
      "en": "Immediate"
    }
  }
];
