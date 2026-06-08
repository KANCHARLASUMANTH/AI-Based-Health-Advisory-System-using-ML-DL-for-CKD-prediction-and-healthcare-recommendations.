
import { CKDFeature, ModelMetric, SuccessStory, FAQItem, PatientRecord } from '../types';

export const ckdFeatures: CKDFeature[] = [
  { name: 'age', description: 'Age', category: 'Numerical', scale: 'Years', missing: 8 },
  { name: 'bp', description: 'Blood pressure', category: 'Numerical', scale: 'mm / Hg', missing: 12 },
  { name: 'sg', description: 'Specific gravity', category: 'Nominal', scale: '1.005 – 1.025', missing: 47, pca: 'sg' },
  { name: 'al', description: 'Albumin', category: 'Nominal', scale: '0 – 5', missing: 46, pca: 'al' },
  { name: 'su', description: 'Sugar', category: 'Nominal', scale: '0 – 5', missing: 49, pca: 'su' },
  { name: 'rbc', description: 'Red blood cells', category: 'Nominal', scale: 'Abnormal / Normal', missing: 152 },
  { name: 'rc', description: 'Red blood cell count', category: 'Nominal', scale: 'millions / cmm', missing: 131, pca: 'rc' },
  { name: 'pc', description: 'Pus cell', category: 'Nominal', scale: 'Abnormal / Normal', missing: 65 },
  { name: 'pcc', description: 'Pus cell clumps', category: 'Nominal', scale: 'Not present / Present', missing: 4 },
  { name: 'ba', description: 'Bacteria', category: 'Nominal', scale: 'Not present / Present', missing: 4 },
  { name: 'htn', description: 'Hypertension', category: 'Nominal', scale: 'No / Yes', missing: 2 },
  { name: 'dm', description: 'Diabetes mellitus', category: 'Nominal', scale: 'No / Yes', missing: 2, pca: 'dm' },
  { name: 'cad', description: 'Coronary artery disease', category: 'Nominal', scale: 'No / Yes', missing: 2 },
  { name: 'appet', description: 'Appetite', category: 'Nominal', scale: 'Poor / Good', missing: 1 },
  { name: 'pe', description: 'Pedal edema', category: 'Nominal', scale: 'No / Yes', missing: 1 },
  { name: 'ane', description: 'Anemia', category: 'Nominal', scale: 'No / Yes', missing: 1 },
  { name: 'bgr', description: 'Blood glucose (random)', category: 'Numerical', scale: 'mgs / dl', missing: 44, pca: 'bgr' },
  { name: 'bu', description: 'Blood urea', category: 'Numerical', scale: 'mgs / dl', missing: 19 },
  { name: 'sc', description: 'Serum creatinine', category: 'Numerical', scale: 'mgs / dl', missing: 17, pca: 'sc' },
  { name: 'sod', description: 'Sodium', category: 'Numerical', scale: 'mEq / L', missing: 87 },
  { name: 'pot', description: 'Potassium', category: 'Numerical', scale: 'mEq / L', missing: 88, pca: 'pot' },
  { name: 'hemo', description: 'Hemoglobin', category: 'Numerical', scale: 'gms', missing: 52 },
  { name: 'pcv', description: 'Packed cell volume', category: 'Numerical', scale: '%', missing: 71, pca: 'pcv' },
  { name: 'wc', description: 'White blood cell count', category: 'Numerical', scale: 'cells / cumm', missing: 106, pca: 'wc' },
];

export const modelMetrics: ModelMetric[] = [
  { name: 'Accuracy', value: 0.945, description: 'Overall prediction accuracy on test set' },
  { name: 'Sensitivity', value: 0.912, description: 'Ability to correctly identify dialysis initiation' },
  { name: 'Specificity', value: 0.968, description: 'Ability to correctly identify non-dialysis cases' },
  { name: 'AUC-ROC', value: 0.978, description: 'Area Under Receiver Operating Characteristic curve' },
];

export const featureImportance = [
  { name: 'eGFR', importance: 0.85 },
  { name: 'Serum Creatinine', importance: 0.72 },
  { name: 'Blood Urea Nitrogen', importance: 0.58 },
  { name: 'Hemoglobin', description: 'Hemoglobin', importance: 0.45 },
  { name: 'Age', importance: 0.38 },
  { name: 'Blood Glucose', importance: 0.32 },
];

export const successStories: SuccessStory[] = [
  {
    id: '1',
    title: 'Early Detection Leads to Proactive Care',
    scenario: 'A 58-year-old patient with Stage 3 CKD showed stable creatinine but declining hemoglobin.',
    intervention: 'Model predicted high dialysis risk within 6 months. Care plan adjusted immediately.',
    outcome: 'Dialysis initiation delayed by 14 months through optimized diet and anemia management.',
    initialRisk: 78,
    finalRisk: 42,
  },
  {
    id: '2',
    title: 'Crisis Averted in Diabetic Nephropathy',
    scenario: '65-year-old with longstanding diabetes and hypertension.',
    intervention: 'Temporal Fusion Transformer flagged rapid risk escalation despite asymptomatic status.',
    outcome: 'Early nephrologist referral and medication adjustment stabilized kidney function.',
    initialRisk: 92,
    finalRisk: 65,
  },
];

export const faqs: FAQItem[] = [
  {
    question: 'How accurate is the AI prediction?',
    answer: 'The system achieves 94.5% accuracy using temporal fusion transformers validated on multi-center clinical data. However, it is designed to support clinical judgment, not replace it.',
  },
  {
    question: 'How is patient privacy maintained?',
    answer: 'All data is processed using end-to-end encryption and adheres to HIPAA and GDPR standards. Local processing ensures sensitive identifiers are never stored.',
  },
  {
    question: 'Can this replace a clinician?',
    answer: 'Absolutely not. This is a clinical decision support system (CDSS) intended to provide data-driven insights to help clinicians make more informed decisions.',
  },
  {
    question: 'How often should data be updated?',
    answer: 'For patients at risk, updating clinical parameters every 3 months is recommended to maintain the accuracy of temporal predictions.',
  },
];

export const mockPatients: PatientRecord[] = [
  {
    id: 'P001',
    age: 62,
    bp: 140,
    sg: 1.015,
    al: 3,
    su: 1,
    rbc: 'Normal',
    sc: 2.4,
    bu: 45,
    eGFR: 32,
    date: '2023-10-15',
    riskScore: 68,
  },
  {
    id: 'P002',
    age: 45,
    bp: 120,
    sg: 1.020,
    al: 1,
    su: 0,
    rbc: 'Normal',
    sc: 1.2,
    bu: 20,
    eGFR: 75,
    date: '2023-11-02',
    riskScore: 12,
  },
  {
    id: 'P003',
    age: 71,
    bp: 155,
    sg: 1.010,
    al: 4,
    su: 2,
    rbc: 'Abnormal',
    sc: 4.8,
    bu: 88,
    eGFR: 14,
    date: '2023-12-20',
    riskScore: 94,
  },
];
