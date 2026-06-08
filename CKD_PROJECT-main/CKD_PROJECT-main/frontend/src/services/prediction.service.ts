import { api } from '../lib/api.ts';

export const predictionService = {
  createPrediction: async (predictionData: any) => {
    const { data } = await api.post('/predictions', predictionData);
    return data;
  },
  
  getPredictionsByPatientId: async (patientId: number) => {
    const { data } = await api.get(`/predictions/patient/${patientId}`);
    return data;
  },
  
  getPredictionById: async (id: number) => {
    const { data } = await api.get(`/predictions/${id}`);
    return data;
  }
};
