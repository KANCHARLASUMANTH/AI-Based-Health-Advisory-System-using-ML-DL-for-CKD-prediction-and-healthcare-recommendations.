import { Context } from 'hono';
import prisma from '../client.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsync from '../utils/catchAsync.ts';

/**
 * Heuristic-based CKD Risk and Dialysis Prediction Logic
 * (Simulating a deep learning model)
 */
const predictCKDRisk = (data: any) => {
  let riskScore = 0;
  
  // Age factor
  if (data.age > 60) riskScore += 10;
  else if (data.age > 45) riskScore += 5;

  // Serum Creatinine (One of the most important features)
  // Normal is ~0.7 to 1.3 mg/dL
  if (data.serumCreatinine > 5) riskScore += 40;
  else if (data.serumCreatinine > 2) riskScore += 25;
  else if (data.serumCreatinine > 1.3) riskScore += 10;

  // Blood Urea (Normal is ~7 to 20 mg/dL)
  if (data.bloodUrea > 100) riskScore += 15;
  else if (data.bloodUrea > 50) riskScore += 8;

  // Blood Pressure
  if (data.bloodPressure > 140) riskScore += 10;
  else if (data.bloodPressure > 120) riskScore += 5;

  // Hemoglobin (Low is bad)
  if (data.hemoglobin < 8) riskScore += 15;
  else if (data.hemoglobin < 11) riskScore += 8;

  // Albumin (Presence in urine is bad)
  if (data.albumin && ['1', '2', '3', '4', '5'].includes(data.albumin)) {
    riskScore += parseInt(data.albumin) * 5;
  }

  // Diabetes and Hypertension
  if (data.diabetesMellitus) riskScore += 10;
  if (data.hypertension) riskScore += 10;

  // Normalization
  riskScore = Math.min(riskScore, 100);

  let ckdRisk = riskScore > 50 ? 'Yes' : 'No';
  let dialysisProbability = Math.max(0, riskScore - 20); // Dialysis is usually later stage
  
  let riskCategory = 'Low';
  if (riskScore > 75) riskCategory = 'High';
  else if (riskScore > 40) riskCategory = 'Medium';

  let suggestedAction = 'Monitor and maintain healthy lifestyle';
  if (riskCategory === 'High') {
    suggestedAction = 'Immediate specialist consultation required. Prepare for dialysis evaluation.';
  } else if (riskCategory === 'Medium') {
    suggestedAction = 'Consult a nephrologist soon. Monitor BP and glucose closely.';
  }

  // Feature Importance Simulation
  const featureImportance = {
    serumCreatinine: 0.45,
    hemoglobin: 0.15,
    bloodUrea: 0.12,
    bloodPressure: 0.10,
    age: 0.08,
    albumin: 0.10
  };

  return {
    riskScore,
    ckdRisk,
    dialysisProbability,
    riskCategory,
    suggestedAction,
    featureImportance
  };
};

export const createPrediction = catchAsync(async (c: Context) => {
  const doctorId = c.get('userId');
  const body = await c.req.json();
  const { patientId, ...clinicalData } = body;

  const patient = await prisma.patient.findFirst({
    where: {
      id: parseInt(patientId),
      doctorId,
    },
  });

  if (!patient) {
    throw new ApiError(404, 'Patient not found');
  }

  // Update patient data with latest clinical info
  await prisma.patient.update({
    where: { id: parseInt(patientId) },
    data: clinicalData,
  });

  const predictionResults = predictCKDRisk(clinicalData);

  const prediction = await prisma.prediction.create({
    data: {
      patientId: parseInt(patientId),
      ...predictionResults,
      inputData: clinicalData,
    },
  });

  return c.json(prediction, 201);
});

export const getPredictionsByPatientId = catchAsync(async (c: Context) => {
  const doctorId = c.get('userId');
  const patientId = parseInt(c.req.param('patientId'));

  const patient = await prisma.patient.findFirst({
    where: {
      id: patientId,
      doctorId,
    },
  });

  if (!patient) {
    throw new ApiError(404, 'Patient not found');
  }

  const predictions = await prisma.prediction.findMany({
    where: {
      patientId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return c.json(predictions);
});

export const getPredictionById = catchAsync(async (c: Context) => {
  const doctorId = c.get('userId');
  const id = parseInt(c.req.param('id'));

  const prediction = await prisma.prediction.findFirst({
    where: {
      id,
      patient: {
        doctorId,
      },
    },
    include: {
      patient: true,
    },
  });

  if (!prediction) {
    throw new ApiError(404, 'Prediction not found');
  }

  return c.json(prediction);
});
