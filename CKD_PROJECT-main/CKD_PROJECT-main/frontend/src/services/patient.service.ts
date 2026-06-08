import { api } from '../lib/api.ts';

export const patientService = {
  getPatients: async () => {
    const { data } = await api.get('/patients');
    return data;
  },
  
  getPatientById: async (id: number) => {
    const { data } = await api.get(`/patients/${id}`);
    return data;
  },
  
  createPatient: async (patientData: any) => {
    const { data } = await api.post('/patients', patientData);
    return data;
  },
  
  updatePatient: async (id: number, patientData: any) => {
    const { data } = await api.patch(`/patients/${id}`, patientData);
    return data;
  },
  
  deletePatient: async (id: number) => {
    const { data } = await api.delete(`/patients/${id}`);
    return data;
  }
};
