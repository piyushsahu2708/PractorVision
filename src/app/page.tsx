import Link from 'next/link';
import { ArrowRight, LayoutDashboard, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <div className="text-center mb-12">
        <Logo className="w-24 h-24 mx-auto mb-4" />
        <h1 className="text-5xl font-bold text-primary font-headline">
          ProctorVision
        </h1>
        <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
          Ensuring fair, secure, and cheat-free online interviews with AI-powered proctoring and monitoring.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-2xl font-semibold">
              Recruiter
            </CardTitle>
            <LayoutDashboard className="w-8 h-8 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Monitor candidates, receive real-time alerts, and access detailed violation reports.
            </p>
            <Button asChild className="w-full">
              <Link href="/recruiter">
                Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-2xl font-semibold">
              Candidate
            </CardTitle>
            <User className="w-8 h-8 text-accent" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Join your secure interview session. Please ensure your camera and microphone are ready.
            </p>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/login">
                Login to Interview <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-20 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ProctorVision. All rights reserved.</p>
        <p className="mt-1">A demonstration of AI-powered interview integrity.</p>
      </footer>
    </main>
  );
}
