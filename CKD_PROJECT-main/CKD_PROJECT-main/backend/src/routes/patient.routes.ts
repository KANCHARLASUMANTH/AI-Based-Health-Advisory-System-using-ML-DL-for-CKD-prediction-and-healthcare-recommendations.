import { Hono } from 'hono';
import * as patientController from '../controllers/patientController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import catchAsync from '../utils/catchAsync.ts';

const patientRoutes = new Hono();

patientRoutes.use('*', authMiddleware);

patientRoutes.post('/', catchAsync(patientController.createPatient));
patientRoutes.get('/', catchAsync(patientController.getAllPatients));
patientRoutes.get('/:id', catchAsync(patientController.getPatientById));
patientRoutes.patch('/:id', catchAsync(patientController.updatePatient));
patientRoutes.delete('/:id', catchAsync(patientController.deletePatient));

export default patientRoutes;
