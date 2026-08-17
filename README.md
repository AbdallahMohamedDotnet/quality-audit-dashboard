# 📊 Digital Quality Audit & Compliance Platform (v9.8 PRO)
### لوحة التدقيق الرقمية وإدارة الامتثال والجودة

A production-ready, enterprise-grade Digital Quality Audit, Incident Response, and Compliance Management Platform built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**.

---

## 🌟 Key Features & Modules

1. **Executive Dashboard (`DashboardView`)**:
   - Real-time compliance score calculations with dynamic threshold coloring.
   - Live IoT Telemetry Simulator (temperature, humidity, autoclave pressure, vibration, particulate counter, gas leak detectors).
   - Department compliance score distribution progress charts.
   - Quick instant audit session triggers per department.
   - Estimated cost savings and penalty avoidance metrics.
   - Direct WhatsApp executive summary broadcasting.

2. **Operational Audit Checklist (`AuditFormView`)**:
   - 216+ specialized standards categorized across 10 industry sectors (Hotels, Restaurants, Hospitals, Clinics, Food, Pharma, Chemical, Textile, Metal, and Construction).
   - Automatic operator threshold validation (`<=`, `>=`, `==`).
   - Root Cause Analysis (RCA) & CAPA approval workflow for deviations.
   - Evidence photo attachment (with zoom and deletion).
   - Certified HTML5 Digital Signature canvas with touch and mouse support.
   - Confetti celebration on high compliance scores.

3. **Standards & KPI Catalog (`KpiStandardsView`)**:
   - Comprehensive directory of 216+ ISO (9001, 22000, 14001, 45001), OSHA, HACCP, SFDA, JCI, and GMP standards.
   - Instant search by code, standard number, or keyword in Arabic and English.
   - One-click "Log NCR" from any standard.

4. **Non-Conformance Incident Manager (`NcrView`)**:
   - Severity classification: `CRITICAL (CCP)`, `TECHNICAL`, `OBSERVATION`.
   - CAPA tracking and status verification (`OPEN` / `CLOSED`).
   - Direct WhatsApp notification dispatch to department heads.
   - Excel / CSV report export.

5. **AI Complaint & Root-Cause Assistant (`AiAssistantView`)**:
   - Customer complaint intake with AI Root-Cause models.
   - Formal customer redress & apology generator.
   - 3-tier CAPA timeline (Immediate containment: 2h, 5-Whys investigation: 48h, Systemic prevention: 7d).
   - Direct escalation to General Manager via pre-formatted Email & WhatsApp.

6. **HACCP Process Flow & Recall Matrix (`HaccpView`)**:
   - Visual HACCP step hierarchy with Critical Control Point (CCP) badges.
   - Interactive 5×5 Severity vs. Probability Recall Risk Matrix with real-time Risk Priority Number (RPN) computation.
   - Standard quarantine & containment blueprints.

7. **Visitor & Contractor Gate Pass Register (`VisitorsView`)**:
   - Digital gate pass check-in with mandatory PPE issuance and health & safety declaration.
   - Live timestamped check-in / check-out.
   - CSV export for security logs and audit traceability.

8. **ESG & Sustainability Tracker (`SustainabilityView`)**:
   - Electricity (kWh), Water (m³), and Waste (kg) inputs.
   - Real-time Carbon Footprint calculation in Metric Tons CO2e.
   - Eco-efficiency rating and green facility recommendations.

9. **Emergency Crisis Protocols (`EmergencyView`)**:
   - Sector-tailored crisis protocols (Food Poisoning, Chemical Spill, Biohazard, Fire Safety, Structural Breakdown).
   - Step-by-step containment checklist.
   - One-click emergency red alert broadcast via WhatsApp.

10. **Certified Audit Archives (`ArchiveView`)**:
    - Immutable archive of all finalized and digitally signed audit sessions.
    - Official summary certificates.
    - Full Excel / CSV export.
    - Print-ready A4 executive audit certificate view.

---

## 🛠 Technology Stack

- **Framework**: Next.js 14 (App Router) / React 18 / TypeScript
- **Rendering**: Hybrid Server-Side Rendering (SSR) & Static Optimization
- **Routing**: Next.js File-Based URL Routing (`/audit`, `/capa`, `/suppliers`, `/ncr`, `/iot`, `/haccp`, etc.)
- **Styling**: Tailwind CSS with custom responsive tokens and dark/light modes
- **Icons**: Font Awesome 6.5.2 & Lucide React
- **Typography**: Google Fonts (Tajawal, Cairo, Inter)
- **State & Storage**: React Context + SSR-safe `localStorage` synchronization

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Start Production Server
```bash
npm run start
```

---

## 👨‍💼 Developed & Supervised by
**Eng. Mostafa Hamed Salem**  
*Registered & Certified Quality Audit Platform*
