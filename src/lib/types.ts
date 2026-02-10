export type ViolationType =
  | 'Face Absence'
  | 'Multiple Faces'
  | 'Abnormal Head Movement'
  | 'Tab Switching'
  | 'Window Blur';

export type Violation = {
  id: number;
  type: ViolationType;
  timestamp: Date;
};

export type Candidate = {
  id: string;
  name: string;
  jobTitle: string;
  avatarUrl: string;
};
