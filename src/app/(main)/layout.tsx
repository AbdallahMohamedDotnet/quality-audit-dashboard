'use client';

import React, { ReactNode } from 'react';
import { MainLayoutShell } from '@/components/layout/MainLayoutShell';

export default function MainGroupLayout({ children }: { children: ReactNode }) {
  return <MainLayoutShell>{children}</MainLayoutShell>;
}
