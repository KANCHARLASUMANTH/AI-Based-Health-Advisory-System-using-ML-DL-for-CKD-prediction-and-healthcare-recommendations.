
export interface CKDFeature {
  name: string;
  description: string;
  category: 'Numerical' | 'Nominal';
  scale: string;
  missing: number;
  pca?: string;
}

export interface ModelMetric {
  name: string;
  value: number;
  description: string;
}

export interface PatientRecord {
  id: string;
  age: number;
  bp: number;
  sg: number;
  al: number;
  su: number;
  rbc: 'Normal' | 'Abnormal';
  sc: number;
  bu: number;
  eGFR: number;
  date: string;
  riskScore: number;
}

export interface SuccessStory {
  id: string;
  title: string;
  scenario: string;
  intervention: string;
  outcome: string;
  initialRisk: number;
  finalRisk: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}
