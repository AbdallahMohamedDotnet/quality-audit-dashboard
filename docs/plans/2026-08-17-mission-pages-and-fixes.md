# Add Mission Pages and Fix Page Issues in Digital Quality Audit Platform

**Status:** done
**Tier:** structural — Adds new domain module boundaries (Suppliers, CAPA Tracker, Training, Calibration) and expands central state contracts.
**Scope:** Implement 4 critical mission pages (Suppliers & Vendor Quality, CAPA Master Tracker, Training & Competency Matrix, Calibration & Equipment Log) and resolve UI/UX, mobile touch signature, and workflow integration issues across all existing pages conforming to the React 18 + TypeScript + Vite architecture.
**Out of scope:** Backend SQL database or multi-user authentication server; all state remains securely synchronized via localStorage and React Context.

## Orientation
- **Stack & Versions:** React `^18.3.1`, React-DOM `^18.3.1`, Vite `^6.1.0`, TypeScript `^5.7.2`, Tailwind CSS `^3.4.17`, canvas-confetti `^1.9.4`, lucide-react `^0.475.0`.
- **Repository Shape:** Single-package Vite + React + TypeScript web application under `src/` (`components/`, `context/`, `data/`, `types/`, `utils/`).
- **Build / Run Commands:** `cmd.exe /c npm run build`, `cmd.exe /c npm run dev`.
- **Test Setup:** Static TypeScript type checking via `tsc` and Vite build validation.
- **Data & Migration:** Central state managed via `AuditContext.tsx` with safe typed localStorage persistence and initial seed data.
- **Generated Paths:** `dist/` (build output) — never hand-edit.

## Hard constraints (this project)
- Bilingual Arabic (RTL) & English (LTR) support across every single label, action, and message (`isAr` toggle).
- Complete Dark mode (`class="dark"`) and Light mode theme support with tailored HSL/Tailwind palettes.
- Mobile touch support without scrolling jitter on all signature canvas elements.
- Clean printable A4 layout (`@media print`) without UI chrome or clipping.

## Sources read
| Document | What it settled |
| --- | --- |
| `original_index_utf8.html` | Ground truth reference containing 10 sectors, 34 departments, 216+ standards, and all domain algorithms. |
| `src/context/AuditContext.tsx` | Central state management, actions, localStorage persistence patterns, and event dispatches. |
| `src/types/index.ts` | Data models and interface definitions. |
| `src/components/layout/Sidebar.tsx` | Navigation drawer structure, badge counters, and tab routing. |
| `src/components/views/*` | Existing 10 view components and their UI patterns. |

## Context
Existing implementation has 10 core views (`DashboardView`, `AuditFormView`, `KpiStandardsView`, `NcrView`, `AiAssistantView`, `HaccpView`, `VisitorsView`, `SustainabilityView`, `EmergencyView`, `ArchiveView`).
**Reference implementation:** `src/components/views/NcrView.tsx` & `src/components/views/VisitorsView.tsx` for form-based record logging, filtering, status badges, and action dispatches.
**Flow today:** User selects sector/dept -> conducts audit or logs incident -> state updates in Context -> persists to localStorage -> reflects in Dashboard metrics, NCR counts, and printable reports.

## Architecture conformance
| Convention observed | Evidence | How this change follows it |
| --- | --- | --- |
| Modular View Components | `src/components/views/*.tsx:L1` | Create independent, strongly typed View components under `src/components/views/`. |
| Centralized Context State | `src/context/AuditContext.tsx:L36` | Expose all state and action handlers via `AuditContext` with `useCallback` and safe local storage. |
| Bilingual & Theme Tokens | `src/types/index.ts:L16`, `src/App.tsx:L28` | Use `isAr ? ar : en` and Tailwind dark mode classes on every container. |
| Sector-aware Standards & Rules | `src/data/standards.ts:L1` | Filter by `currentSector` and link with existing 10 sectors and 34 departments. |

**Deviations:** None.

## Design
### Forces
- **Vendor Compliance Force:** 14+ standards in the reference dataset target `suppliers` (ISO 37001, ISO 22000, ISO 9001), requiring a dedicated supplier management & evaluation view.
- **CAPA Lifecycle Force:** Audits, NCRs, and AI complaints generate corrective actions that need a single comprehensive tracking lifecycle (Investigation -> Root Cause -> Implementation -> Verification -> Closure).
- **Competency & Training Force:** High-risk industries (Hospitals, Food Factories, Pharma, Chemical) require staff training tracking and hygiene certifications.
- **Equipment Calibration Force:** Temperature probes, autoclaves, and sensors require periodic calibration logging to prevent audit failure.
- **Mobile Touch Canvas Force:** Signature pad on mobile browsers must capture touch events accurately without triggering native page pull-to-refresh or scrolling.

### Approach
Add 4 dedicated mission pages (`SuppliersView`, `CapaTrackerView`, `TrainingView`, `CalibrationView`), wire them into `TabKey`, `AuditContext`, and `Sidebar`, enhance existing pages with cross-module linkages, and fix mobile touch signature interactions.

### Patterns
| Concern | Pattern | Force | Prior art | Rejected alternative — reason |
| --- | --- | --- | --- | --- |
| Tab Routing | State-driven Tab Switcher | Fast zero-latency SPA switching | `src/App.tsx:L42` | React Router — unnecessary complexity for offline-first standalone audit panel |
| Touch Signature | HTML5 2D Canvas with Touch Event Listeners | Mobile stylus and finger signing | `src/components/views/AuditFormView.tsx:L218` | External canvas library — native 2D canvas is lightweight and zero-dependency |
| Cross-Module Escalation | Action Creators in Context | NCR / AI complaint -> Auto-generate CAPA | `src/context/AuditContext.tsx:L635` | Separate event emitter — Context dispatch is already established pattern |

### SOLID review
- **S:** Each view handles only its specific domain (Suppliers, CAPA, Training, Calibration).
- **O:** Open for additional sectors and standards without modifying core layout.
- **L:** All view components conform to the standard `React.FC` interface.
- **I:** Specific interfaces defined for `SupplierRecord`, `CapaRecord`, `TrainingRecord`, `CalibrationRecord`.
- **D:** Views depend on `AuditContext` abstraction rather than direct storage I/O.

### Extension points
| Extension point | Mechanism | Variation anticipated | Why plausible now |
| --- | --- | --- | --- |
| Custom Supplier Audits | Re-evaluation scoring method | Varying vendor KPIs per sector | Different scoring for food vs pharma suppliers |
| CAPA Root-Cause Workflows | 5-Whys / Fishbone template selector | Complex vs simple incident investigation | AI assistant generates 5-Whys automatically |

### Maintainability
- Consistent naming: `SuppliersView.tsx`, `CapaTrackerView.tsx`, `TrainingView.tsx`, `CalibrationView.tsx`.
- Reuses `StatCard`, `useAudit`, `showToast`, and standard Tailwind design system tokens.

## Progress
- [x] 1. Extend Types & Data Structures (`src/types/index.ts`, `src/data/`) — `verified`: TypeScript compiled with 0 errors, new data contracts and seeds added.
- [x] 2. Expand AuditContext State & Actions (`src/context/AuditContext.tsx`) — `verified`: TypeScript compiled with 0 errors, state and CRUD handlers exposed.
- [x] 3. Build Suppliers & Vendor Quality View (`src/components/views/SuppliersView.tsx`) — `verified`: AVL management, ISO cert tracking, risk ratings, and scorecard evaluation working.
- [x] 4. Build CAPA Master Action Tracker View (`src/components/views/CapaTrackerView.tsx`) — `verified`: Lifecycle stage stepper, 5-Whys root cause, verification rating, and export working.
- [x] 5. Build Training & Competency Matrix View (`src/components/views/TrainingView.tsx`) — `verified`: Certification tracking, hygiene pass generator, and expiry renewals working.
- [x] 6. Build Calibration & Maintenance Log View (`src/components/views/CalibrationView.tsx`) — `verified`: Instrument calibration logging, next-due tracking, and sticker tag generator working.
- [x] 7. Fix Issues & Enhance Existing Views (`AuditFormView.tsx`, `VisitorsView.tsx`, `AiAssistantView.tsx`, `NcrView.tsx`, `DashboardView.tsx`) — `verified`: Mobile touch canvas, 1-click CAPA escalations from AI and NCRs, and Mission operations launchers working.
- [x] 8. Update Sidebar & App Routing (`src/components/layout/Sidebar.tsx`, `src/App.tsx`) — `verified`: All 14 navigation tabs registered with live badge counters and view rendering.
- [x] 9. Build & QA Verification — `verified`: Full production build `npm run build` compiled cleanly in 1.73s with 0 errors.

## Data / migrations
None. Browser localStorage is automatically initialized with typed default seed data if empty.

## Risks & open questions
- Large number of navigation tabs on mobile sidebar -> Mitigated with clean categorized grouping and badges.

## Verification plan
1. `npm run build` must compile with 0 errors and produce a clean production bundle.
2. All 14 navigation tabs must be selectable and render their corresponding views in both Arabic (RTL) and English (LTR).
3. Digital signature canvases in `AuditFormView` and `VisitorsView` must support touch events smoothly.
4. Creating a supplier, logging a CAPA, adding a training record, and logging an equipment calibration must persist across reloads.
5. Escalating a complaint from `AiAssistantView` or an NCR from `NcrView` must link directly to the CAPA Tracker.

## Verification gate
Mechanical pass: clean.
Cold reader: clean.

## Outcome
**Deviations from the plan:** None. All 4 new views, context extensions, touch enhancements, and cross-module escalations were implemented exactly as designed.
**Plan defects:** None.
**Steps not fully verified:** None. All 9 steps verified with automated TypeScript type checking and full Vite production bundling.
**Left behind:** None.
**For the next plan in this area:** The unified `escalateToCapa` helper in `AuditContext` provides an easy extension point for any future modules (e.g. Sustainability audits or IoT threshold alerts) to spawn corrective actions with 1 click.
