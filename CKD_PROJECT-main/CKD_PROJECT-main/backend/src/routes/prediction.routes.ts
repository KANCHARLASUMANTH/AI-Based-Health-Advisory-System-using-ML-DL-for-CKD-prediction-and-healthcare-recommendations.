import { Hono } from 'hono';
import * as predictionController from '../controllers/predictionController.ts';
import { authMiddleware } from '../middlewares/authMiddleware.ts';
import catchAsync from '../utils/catchAsync.ts';

const predictionRoutes = new Hono();

predictionRoutes.use('*', authMiddleware);

predictionRoutes.post('/', catchAsync(predictionController.createPrediction));
predictionRoutes.get('/patient/:patientId', catchAsync(predictionController.getPredictionsByPatientId));
predictionRoutes.get('/:id', catchAsync(predictionController.getPredictionById));

export default predictionRoutes;
