
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, Activity, ShieldAlert, CheckCircle2, Info, ChevronRight, Sparkles, Brain, User, Loader2 } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { patientService } from '../services/patient.service';
import { predictionService } from '../services/prediction.service';

const Demo = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<string>('new');
  const [patientName, setPatientName] = useState('');
  
  const [formData, setFormData] = useState({
    age: 65,
    gender: 'Male',
    bloodPressure: 140,
    bloodGlucose: 120,
    bloodUrea: 48,
    serumCreatinine: 2.8,
    sodium: 138,
    potassium: 4.5,
    hemoglobin: 12.5,
    packedCellVolume: 38,
    whiteBloodCellCount: 8000,
    redBloodCellCount: 4.5,
    albumin: '0',
    sugar: '0',
    hypertension: true,
    diabetesMellitus: true,
    coronaryArteryDisease: false,
    appetite: 'Good',
    pedalEdema: false,
    anemia: false,
  });

  const [prediction, setPrediction] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [isLoadingPatients, setIsLoadingPatients] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setIsLoadingPatients(true);
    try {
      const data = await patientService.getPatients();
      setPatients(data);
    } catch (err) {
      console.error('Failed to fetch patients', err);
    } finally {
      setIsLoadingPatients(false);
    }
  };

  const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedPatientId(id);
    if (id !== 'new') {
      const patient = patients.find(p => p.id === parseInt(id));
      if (patient) {
        setPatientName(patient.name || '');
        setFormData({
          age: patient.age || 65,
          gender: patient.gender || 'Male',
          bloodPressure: patient.bloodPressure || 140,
          bloodGlucose: patient.bloodGlucose || 120,
          bloodUrea: patient.bloodUrea || 48,
          serumCreatinine: patient.serumCreatinine || 2.8,
          sodium: patient.sodium || 138,
          potassium: patient.potassium || 4.5,
          hemoglobin: patient.hemoglobin || 12.5,
          packedCellVolume: patient.packedCellVolume || 38,
          whiteBloodCellCount: patient.whiteBloodCellCount || 8000,
          redBloodCellCount: patient.redBloodCellCount || 4.5,
          albumin: patient.albumin || '0',
          sugar: patient.sugar || '0',
          hypertension: !!patient.hypertension,
          diabetesMellitus: !!patient.diabetesMellitus,
          coronaryArteryDisease: !!patient.coronaryArteryDisease,
          appetite: patient.appetite || 'Good',
          pedalEdema: !!patient.pedalEdema,
          anemia: !!patient.anemia,
        });
      }
    } else {
      setPatientName('');
    }
  };

  const calculateRisk = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    
    try {
      let patientId: number | null = selectedPatientId === 'new' ? null : parseInt(selectedPatientId);
      
      if (patientId === null) {
        const newPatient = await patientService.createPatient({
          name: patientName || `Patient ${new Date().getTime()}`,
          ...formData
        });
        patientId = newPatient.id;
        fetchPatients();
        if (patientId) setSelectedPatientId(patientId.toString());
      }

      if (patientId === null) throw new Error('Failed to create or select patient');

      const finalPatientId: number = patientId;

      const result = await predictionService.createPrediction({
        patientId: finalPatientId,
        ...formData
      });
      
      setPrediction(result);
    } catch (err) {
      console.error('Prediction failed', err);
      alert('Failed to generate prediction. Please check all clinical parameters.');
    } finally {
      setIsCalculating(false);
    }
  };

  const COLORS = ['#10b981', '#f59e0b', '#ef4444'];
  
  const getRiskLevel = (score: number) => {
    if (score < 40) return { label: 'Low', color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100' };
    if (score < 75) return { label: 'Moderate', color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100' };
    return { label: 'High', color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100' };
  };

  const gaugeData = [
    { name: 'Risk', value: prediction?.riskScore || 0 },
    { name: 'Remaining', value: 100 - (prediction?.riskScore || 0) },
  ];

  const featureImportanceData = prediction?.featureImportance ? 
    Object.entries(prediction.featureImportance).map(([name, value]) => ({
      name: name.replace(/([A-Z])/g, ' $1').trim(),
      value: (value as number) * 100
    })) : [];

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-4">
            <Calculator className="h-4 w-4 mr-2" />
            AI-Based CKD Risk & Dialysis Prediction
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Clinical Risk Assessment</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Enter patient clinical parameters to assess the risk of Chronic Kidney Disease 
            and determine the probability of dialysis initiation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Input Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 lg:p-10 rounded-[2.5rem] shadow-sm border border-slate-200"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Patient Parameters</h2>
            </div>

            <form onSubmit={calculateRisk} className="space-y-8">
              {/* Patient Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="col-span-full">
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Select Patient</label>
                  <select 
                    value={selectedPatientId}
                    onChange={handlePatientChange}
                    className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-blue-500 transition-all outline-none font-medium"
                  >
                    <option value="new">Add New Patient</option>
                    {patients.map(p => (
                      <option key={p.id} value={p.id}>{p.name || `Patient #${p.id}`}</option>
                    ))}
                  </select>
                </div>
                {selectedPatientId === 'new' && (
                  <div className="col-span-full">
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Patient Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter full name"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-blue-500 transition-all outline-none font-medium"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Age</label>
                  <input 
                    type="number" 
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: Number(e.target.value)})}
                    className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-blue-500 transition-all outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Gender</label>
                  <select 
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full p-4 bg-white border-2 border-slate-100 rounded-2xl focus:border-blue-500 transition-all outline-none font-medium"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Lab Results */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-900 border-l-4 border-blue-600 pl-3">Laboratory Parameters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">BP (mmHg)</label>
                    <input type="number" value={formData.bloodPressure} onChange={(e) => setFormData({...formData, bloodPressure: Number(e.target.value)})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Glucose (mgs/dl)</label>
                    <input type="number" value={formData.bloodGlucose} onChange={(e) => setFormData({...formData, bloodGlucose: Number(e.target.value)})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Blood Urea (mgs/dl)</label>
                    <input type="number" value={formData.bloodUrea} onChange={(e) => setFormData({...formData, bloodUrea: Number(e.target.value)})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Serum Creatinine (mgs/dl)</label>
                    <input type="number" step="0.1" value={formData.serumCreatinine} onChange={(e) => setFormData({...formData, serumCreatinine: Number(e.target.value)})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Sodium (mEq/L)</label>
                    <input type="number" value={formData.sodium} onChange={(e) => setFormData({...formData, sodium: Number(e.target.value)})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Potassium (mEq/L)</label>
                    <input type="number" step="0.1" value={formData.potassium} onChange={(e) => setFormData({...formData, potassium: Number(e.target.value)})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Hemoglobin (gms)</label>
                    <input type="number" step="0.1" value={formData.hemoglobin} onChange={(e) => setFormData({...formData, hemoglobin: Number(e.target.value)})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">PCV (%)</label>
                    <input type="number" value={formData.packedCellVolume} onChange={(e) => setFormData({...formData, packedCellVolume: Number(e.target.value)})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Albumin (0-5)</label>
                    <select value={formData.albumin} onChange={(e) => setFormData({...formData, albumin: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                      {['0', '1', '2', '3', '4', '5'].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Sugar (0-5)</label>
                    <select value={formData.sugar} onChange={(e) => setFormData({...formData, sugar: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                      {['0', '1', '2', '3', '4', '5'].map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Medical History */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-900 border-l-4 border-blue-600 pl-3">Medical History & Symptoms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'hypertension', label: 'Hypertension' },
                    { key: 'diabetesMellitus', label: 'Diabetes Mellitus' },
                    { key: 'coronaryArteryDisease', label: 'CAD' },
                    { key: 'pedalEdema', label: 'Pedal Edema' },
                    { key: 'anemia', label: 'Anemia' },
                  ].map(({ key, label }) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-sm font-bold text-slate-700">{label}</span>
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, [key]: !((formData as any)[key])})}
                        className={`w-12 h-6 rounded-full transition-colors relative ${(formData as any)[key] ? 'bg-blue-600' : 'bg-slate-300'}`}
                      >
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${(formData as any)[key] ? 'left-6.5' : 'left-0.5'}`}></div>
                      </button>
                    </div>
                  ))}
                  <div className="flex flex-col">
                    <label className="text-xs font-bold text-slate-500 mb-1 uppercase">Appetite</label>
                    <select value={formData.appetite} onChange={(e) => setFormData({...formData, appetite: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none">
                      <option>Good</option>
                      <option>Poor</option>
                    </select>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isCalculating}
                className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/30 flex items-center justify-center disabled:opacity-70"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="h-6 w-6 animate-spin mr-3" />
                    AI Model Processing...
                  </>
                ) : (
                  <>
                    Run Prediction <Sparkles className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Results Display */}
          <div className="space-y-8 sticky top-24">
            <AnimatePresence mode="wait">
              {!prediction ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-indigo-900 text-white p-12 rounded-[2.5rem] flex flex-col items-center justify-center text-center h-[700px] border border-white/10"
                >
                  <div className="p-6 bg-white/10 rounded-full mb-8">
                    <Activity className="h-16 w-16 text-indigo-300 animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Awaiting Clinical Data</h3>
                  <p className="text-indigo-200 max-w-sm leading-relaxed">
                    Complete the form with patient parameters to generate an AI-powered 
                    CKD risk assessment and dialysis initiation probability.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-8"
                >
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-200 text-center relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-3 ${getRiskLevel(prediction.riskScore).color.replace('text', 'bg')}`}></div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">CKD Risk Assessment</h3>
                    
                    <div className="h-[240px] relative">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={gaugeData}
                            cx="50%"
                            cy="100%"
                            startAngle={180}
                            endAngle={0}
                            innerRadius={90}
                            outerRadius={120}
                            paddingAngle={0}
                            dataKey="value"
                            stroke="none"
                          >
                            <Cell fill={prediction.riskScore > 75 ? '#ef4444' : prediction.riskScore > 40 ? '#f59e0b' : '#10b981'} />
                            <Cell fill="#f1f5f9" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-end pb-4">
                        <span className="text-5xl font-black text-slate-900">{Math.round(prediction.riskScore)}%</span>
                        <span className={`text-lg font-bold uppercase tracking-widest mt-1 ${getRiskLevel(prediction.riskScore).color}`}>
                          {prediction.riskCategory} Risk
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-1">CKD Positive</span>
                        <span className={`text-xl font-bold ${prediction.ckdRisk === 'Yes' ? 'text-red-600' : 'text-emerald-600'}`}>
                          {prediction.ckdRisk}
                        </span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                        <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Dialysis Probability</span>
                        <span className="text-xl font-bold text-slate-900">
                          {Math.round(prediction.dialysisProbability)}%
                        </span>
                      </div>
                    </div>

                    <div className={`mt-6 p-6 rounded-2xl border ${getRiskLevel(prediction.riskScore).bg} ${getRiskLevel(prediction.riskScore).border} text-left`}>
                      <div className="flex items-start space-x-3">
                        <ShieldAlert className={`h-6 w-6 mt-0.5 shrink-0 ${getRiskLevel(prediction.riskScore).color}`} />
                        <div>
                          <h4 className={`font-bold mb-1 ${getRiskLevel(prediction.riskScore).color}`}>Suggested Clinical Action</h4>
                          <p className="text-slate-600 text-sm leading-relaxed">
                            {prediction.suggestedAction}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Feature Importance Chart */}
                  <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
                    <h4 className="font-bold mb-6 flex items-center">
                      <Activity className="h-5 w-5 mr-2 text-blue-400" />
                      Key Prediction Drivers
                    </h4>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={featureImportanceData} layout="vertical" margin={{ left: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(255,255,255,0.1)" />
                          <XAxis type="number" hide />
                          <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={100} />
                          <RechartsTooltip 
                            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                            itemStyle={{ color: '#60a5fa' }}
                          />
                          <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;

