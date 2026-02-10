'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd perform authentication here.
    // For this demo, we'll just redirect.
    router.push('/candidate');
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 text-primary hover:underline">
          <Logo className="w-8 h-8"/>
          <span className="font-semibold text-lg">ProctorVision</span>
        </Link>
      </div>
      <Card className="w-full max-w-md shadow-2xl">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">
              Candidate Login
            </CardTitle>
            <CardDescription>
              Enter your credentials to begin your secure interview.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="email" type="email" placeholder="m@example.com" required className="pl-10"/>
            </div>
            <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="password" type="password" placeholder="********" required className="pl-10"/>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full">
              Start Interview <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
            <p className="text-xs text-muted-foreground">
                By logging in, you consent to AI-powered monitoring of this interview session.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
