import React, { useState } from 'react';
import { AuditProvider, useAudit } from './context/AuditContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { Toast } from './components/layout/Toast';
import { LogoModal } from './components/layout/LogoModal';
import { LoginModal } from './components/layout/LoginModal';

import { DashboardView } from './components/views/DashboardView';
import { AuditFormView } from './components/views/AuditFormView';
import { KpiStandardsView } from './components/views/KpiStandardsView';
import { NcrView } from './components/views/NcrView';
import { CapaTrackerView } from './components/views/CapaTrackerView';
import { SuppliersView } from './components/views/SuppliersView';
import { TrainingView } from './components/views/TrainingView';
import { CalibrationView } from './components/views/CalibrationView';
import { IotTelemetryView } from './components/views/IotTelemetryView';
import { HaccpView } from './components/views/HaccpView';
import { RecallView } from './components/views/RecallView';
import { AiAssistantView } from './components/views/AiAssistantView';
import { VisitorsView } from './components/views/VisitorsView';
import { SustainabilityView } from './components/views/SustainabilityView';
import { EmergencyView } from './components/views/EmergencyView';
import { ArchiveView } from './components/views/ArchiveView';
import { SettingsView } from './components/views/SettingsView';
import { PrintReportTemplate } from './components/views/PrintReportTemplate';

const MainLayout: React.FC = () => {
  const { activeTab, isDark, dir } = useAudit();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      dir={dir}
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        isDark ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-800'
      }`}
    >
      <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <main className="flex-1 min-w-0 p-3 sm:p-5 lg:p-8 no-print">
          {activeTab === 'dashboard' && <DashboardView />}
          {activeTab === 'audit_form' && <AuditFormView />}
          {activeTab === 'kpi' && <KpiStandardsView />}
          {activeTab === 'ncr' && <NcrView />}
          {activeTab === 'capa' && <CapaTrackerView />}
          {activeTab === 'suppliers' && <SuppliersView />}
          {activeTab === 'training' && <TrainingView />}
          {activeTab === 'calibration' && <CalibrationView />}
          {activeTab === 'iot' && <IotTelemetryView />}
          {activeTab === 'haccp' && <HaccpView />}
          {activeTab === 'recall' && <RecallView />}
          {activeTab === 'ai' && <AiAssistantView />}
          {activeTab === 'visitors' && <VisitorsView />}
          {activeTab === 'sustainability' && <SustainabilityView />}
          {activeTab === 'emergency' && <EmergencyView />}
          {activeTab === 'archive' && <ArchiveView />}
          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      <Footer />

      {/* Overlays & Modals */}
      <Toast />
      <LogoModal />
      <LoginModal />
      <PrintReportTemplate />
    </div>
  );
};

export function App() {
  return (
    <AuditProvider>
      <MainLayout />
    </AuditProvider>
  );
}

export default App;
