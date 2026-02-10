'use client';

import { ProctoringProvider } from './proctoring-context';

export default function ProctoringLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProctoringProvider>{children}</ProctoringProvider>;
}
