import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuditProvider } from '../context/AuditContext';
import { MainLayoutShell } from '../components/layout/MainLayoutShell';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  title: 'لوحة التدقيق الرقمية | Digital Quality Audit Platform',
  description: 'A production-ready enterprise Digital Quality Audit, Incident Response, and Compliance Management Platform across Hospitality, Healthcare, Manufacturing & Facilities.',
  authors: [{ name: 'Eng. Mostafa Hamed Salem' }],
  keywords: ['Quality Audit', 'ISO 9001', 'HACCP', 'CAPA', 'SFDA', 'JCI', 'IoT Sensors', 'Compliance'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <head>
        {/* Google Fonts: Tajawal, Cairo, Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />

        {/* Font Awesome 6.5.2 */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
          integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pv/1H0DQqySKPvLGjbmc4t/aAQ=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 antialiased selection:bg-sky-500 selection:text-white min-h-screen">
        <AuditProvider>
          <MainLayoutShell>{children}</MainLayoutShell>
        </AuditProvider>
      </body>
    </html>
  );
}
