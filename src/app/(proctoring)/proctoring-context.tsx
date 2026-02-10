'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Violation, Candidate, ViolationType } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface ProctoringContextType {
  candidate: Candidate;
  violations: Violation[];
  addViolation: (type: ViolationType) => void;
  clearViolations: () => void;
}

const ProctoringContext = createContext<ProctoringContextType | undefined>(undefined);

const candidateAvatar = PlaceHolderImages.find(img => img.id === 'candidate-avatar');

const defaultCandidate: Candidate = {
  id: 'cand_123',
  name: 'Alex Doe',
  jobTitle: 'Senior Software Engineer',
  avatarUrl: candidateAvatar?.imageUrl ?? 'https://picsum.photos/seed/candidate1/400/400',
};

export function ProctoringProvider({ children }: { children: ReactNode }) {
  const [candidate] = useState<Candidate>(defaultCandidate);
  const [violations, setViolations] = useState<Violation[]>([]);

  const addViolation = (type: ViolationType) => {
    const newViolation: Violation = {
      id: Date.now(),
      type,
      timestamp: new Date(),
    };
    setViolations(prev => [newViolation, ...prev]);
  };
  
  const clearViolations = () => {
    setViolations([]);
  }

  return (
    <ProctoringContext.Provider value={{ candidate, violations, addViolation, clearViolations }}>
      {children}
    </ProctoringContext.Provider>
  );
}

export function useProctoring() {
  const context = useContext(ProctoringContext);
  if (context === undefined) {
    throw new Error('useProctoring must be used within a ProctoringProvider');
  }
  return context;
}
