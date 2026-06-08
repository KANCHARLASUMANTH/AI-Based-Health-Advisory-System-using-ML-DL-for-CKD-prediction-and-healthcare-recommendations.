import { Context } from 'hono';
import prisma from '../client.ts';
import ApiError from '../utils/ApiError.ts';
import catchAsync from '../utils/catchAsync.ts';

export const createPatient = catchAsync(async (c: Context) => {
  const doctorId = c.get('userId');
  const body = await c.req.json();

  const patient = await prisma.patient.create({
    data: {
      ...body,
      doctorId,
    },
  });

  return c.json(patient, 201);
});

export const getAllPatients = catchAsync(async (c: Context) => {
  const doctorId = c.get('userId');
  const patients = await prisma.patient.findMany({
    where: {
      doctorId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return c.json(patients);
});

export const getPatientById = catchAsync(async (c: Context) => {
  const doctorId = c.get('userId');
  const id = parseInt(c.req.param('id'));

  const patient = await prisma.patient.findFirst({
    where: {
      id,
      doctorId,
    },
    include: {
      predictions: {
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!patient) {
    throw new ApiError(404, 'Patient not found');
  }

  return c.json(patient);
});

export const updatePatient = catchAsync(async (c: Context) => {
  const doctorId = c.get('userId');
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();

  const patient = await prisma.patient.findFirst({
    where: {
      id,
      doctorId,
    },
  });

  if (!patient) {
    throw new ApiError(404, 'Patient not found');
  }

  const updatedPatient = await prisma.patient.update({
    where: { id },
    data: body,
  });

  return c.json(updatedPatient);
});

export const deletePatient = catchAsync(async (c: Context) => {
  const doctorId = c.get('userId');
  const id = parseInt(c.req.param('id'));

  const patient = await prisma.patient.findFirst({
    where: {
      id,
      doctorId,
    },
  });

  if (!patient) {
    throw new ApiError(404, 'Patient not found');
  }

  await prisma.patient.update({
    where: { id },
    data: { isDeleted: true },
  });

  return c.json({ message: 'Patient deleted successfully' });
});
