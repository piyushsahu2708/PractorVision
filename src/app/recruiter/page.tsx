import Dashboard from './components/dashboard';
import { Logo } from '@/components/logo';

export default function RecruiterPage() {
  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-card px-6 shrink-0">
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8" />
          <h1 className="text-xl font-bold text-primary">ProctorVision Dashboard</h1>
        </div>
        <div className="text-right">
          <p className="font-semibold">Recruiter Mode</p>
          <p className="text-sm text-muted-foreground">Live Monitoring</p>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <Dashboard />
      </main>
    </div>
  );
}
