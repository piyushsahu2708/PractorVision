'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useProctoring } from '@/app/(proctoring)/proctoring-context';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { ViolationType } from '@/lib/types';
import {
  Move,
  RectangleHorizontal,
  UserX,
  Users,
  Video,
  Monitor,
} from 'lucide-react';
import { Logo } from '@/components/logo';

const violationOptions: { type: ViolationType; icon: React.ElementType, description: string }[] = [
  { type: 'Face Absence', icon: UserX, description: 'You left the camera view.' },
  { type: 'Multiple Faces', icon: Users, description: 'Another person was detected.' },
  { type: 'Abnormal Head Movement', icon: Move, description: 'Unusual head movement detected.' },
  { type: 'Tab Switching', icon: RectangleHorizontal, description: 'You switched to another tab/window.' },
  { type: 'Window Blur', icon: Monitor, description: 'The interview window lost focus.' },
];

export default function CandidatePage() {
  const { candidate, addViolation } = useProctoring();
  const [warning, setWarning] = useState<{ title: string; description: string } | null>(null);
  const cameraFeedImage = PlaceHolderImages.find(img => img.id === 'candidate-feed');

  const handleViolation = (type: ViolationType, description: string) => {
    addViolation(type);
    setWarning({ title: `Violation Detected: ${type}`, description });
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="flex h-16 items-center justify-between border-b bg-card px-6 shrink-0">
        <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <h1 className="text-xl font-bold text-primary">ProctorVision</h1>
        </div>
        <div className="text-right">
          <p className="font-semibold">{candidate.name}</p>
          <p className="text-sm text-muted-foreground">{candidate.jobTitle}</p>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <Card className="flex-1 flex flex-col shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="text-primary" />
                  Your Camera Feed
                </CardTitle>
                <CardDescription>
                  Ensure you are centered and well-lit.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex items-center justify-center bg-black rounded-b-lg overflow-hidden">
                {cameraFeedImage && (
                  <Image
                    src={cameraFeedImage.imageUrl}
                    alt={cameraFeedImage.description}
                    width={1280}
                    height={720}
                    className="object-cover w-full h-full"
                    data-ai-hint={cameraFeedImage.imageHint}
                    priority
                  />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Violation Simulator</CardTitle>
                <CardDescription>
                  This panel is for demonstration purposes only. Click to simulate a violation.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4">
                {violationOptions.map(({ type, icon: Icon, description }) => (
                  <Button
                    key={type}
                    variant="outline"
                    className="w-full justify-start text-left h-auto py-3"
                    onClick={() => handleViolation(type, description)}
                  >
                    <Icon className="mr-3 h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-semibold">{type}</p>
                      <p className="text-xs text-muted-foreground">Trigger a "{type.toLowerCase()}" event.</p>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <AlertDialog open={!!warning} onOpenChange={() => setWarning(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-destructive text-2xl">{warning?.title}</AlertDialogTitle>
            <AlertDialogDescription className="text-lg">
              {warning?.description} Please maintain focus on the interview to ensure fairness. Repeated violations may lead to disqualification.
            </AlertDialogDescription>
          </AlertDialogHeader>
            <AlertDialogAction onClick={() => setWarning(null)}>
              I Understand
            </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
