'use client';

import { ProctoringProvider } from './(proctoring)/proctoring-context';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <ProctoringProvider>{children}</ProctoringProvider>;
}
