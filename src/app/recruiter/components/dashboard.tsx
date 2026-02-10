'use client';

import Image from 'next/image';
import { useState, useTransition } from 'react';
import { useProctoring } from '@/app/(proctoring)/proctoring-context';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { handleGenerateSummary } from '../actions';
import { Bot, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { format } from 'date-fns';

export default function Dashboard() {
  const { candidate, violations, clearViolations } = useProctoring();
  const [isPending, startTransition] = useTransition();
  const [summary, setSummary] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const cameraFeedImage = PlaceHolderImages.find(img => img.id === 'candidate-feed');

  const onGenerateSummary = () => {
    startTransition(async () => {
      const violationDescriptions = violations.map(v => v.type);
      const result = await handleGenerateSummary({
        candidateName: candidate.name,
        jobTitle: candidate.jobTitle,
        violations: violationDescriptions,
      });
      setSummary(result.summary);
    });
  };
  
  const getStatus = () => {
    if (violations.length === 0) return { text: 'All Clear', color: 'bg-green-500' };
    if (violations.length < 3) return { text: 'Caution', color: 'bg-yellow-500' };
    return { text: 'High Risk', color: 'bg-red-500' };
  };

  const status = getStatus();

  return (
    <div className="p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{candidate.name}</CardTitle>
                <CardDescription>{candidate.jobTitle} Interview</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${status.color}`} />
                <span className="font-medium">{status.text}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="bg-black rounded-b-lg overflow-hidden p-0">
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
      
      <div className="lg:col-span-1 space-y-8">
        <Card className="shadow-lg h-[600px] flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Violation Log</CardTitle>
              <Badge variant="destructive">{violations.length}</Badge>
            </div>
            <CardDescription>Real-time list of detected violations.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden p-0">
            <ScrollArea className="h-full">
              <Table>
                <TableHeader className="sticky top-0 bg-card">
                  <TableRow>
                    <TableHead>Violation</TableHead>
                    <TableHead className="text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {violations.length > 0 ? (
                    violations.map((v) => (
                      <TableRow key={v.id}>
                        <TableCell className="font-medium">{v.type}</TableCell>
                        <TableCell className="text-right text-muted-foreground">{format(v.timestamp, 'HH:mm:ss')}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2} className="h-24 text-center text-muted-foreground">
                        No violations detected yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
          <div className="p-4 border-t flex justify-between gap-2">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" disabled={violations.length === 0} onClick={() => setSummary(null)}>
                  <Bot className="mr-2 h-4 w-4" /> Generate AI Summary
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-2xl"><Sparkles className="text-primary"/>AI Violation Summary</DialogTitle>
                  <DialogDescription>
                    An AI-generated summary of violations for {candidate.name}.
                  </DialogDescription>
                </DialogHeader>
                <div className="prose prose-sm max-w-none text-foreground dark:prose-invert">
                  {summary ? (
                    <p>{summary}</p>
                  ) : (
                    <div className="text-center p-8">
                        {isPending ? (
                            <>
                                <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
                                <p className="mt-4 text-muted-foreground">Generating summary...</p>
                            </>
                        ) : (
                             <Button onClick={onGenerateSummary}>
                                Generate Summary
                             </Button>
                        )}
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="destructive" size="icon" onClick={clearViolations} disabled={violations.length === 0}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Clear Violations</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
