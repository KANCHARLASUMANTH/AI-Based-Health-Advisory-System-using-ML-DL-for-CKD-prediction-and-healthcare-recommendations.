import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Activity, ChevronRight, FileText, Download, User, ArrowUpRight, ArrowDownRight, MoreVertical, ShieldAlert, Loader2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { patientService } from '../services/patient.service';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Dashboard = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const dashboardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await patientService.getPatients();
      setPatients(data);
      if (data.length > 0) {
        fetchPatientDetails(data[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch patients', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPatientDetails = async (id: number) => {
    try {
      const data = await patientService.getPatientById(id);
      setSelectedPatient(data);
    } catch (err) {
      console.error('Failed to fetch patient details', err);
    }
  };

  const filteredPatients = patients.filter(p => 
    (p.name || `Patient #${p.id}`).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLatestPrediction = () => {
    if (!selectedPatient?.predictions || selectedPatient.predictions.length === 0) return null;
    return selectedPatient.predictions[0];
  };

  const latestPrediction = getLatestPrediction();

  const riskData = selectedPatient?.predictions?.slice(0, 6).reverse().map((p: any) => ({
    name: new Date(p.createdAt).toLocaleDateString('en-US', { month: 'short' }),
    risk: p.riskScore
  })) || [];

  const COLORS = ['#ef4444', '#f59e0b', '#10b981'];
  
  const highRiskCount = patients.filter(p => p.predictions?.[0]?.riskScore > 75).length;
  const mediumRiskCount = patients.filter(p => p.predictions?.[0]?.riskScore > 40 && p.predictions?.[0]?.riskScore <= 75).length;
  const lowRiskCount = patients.filter(p => p.predictions?.[0]?.riskScore <= 40).length;
  
  const riskDistribution = [
    { name: 'High', value: highRiskCount || 0 },
    { name: 'Moderate', value: mediumRiskCount || 0 },
    { name: 'Low', value: lowRiskCount || 0 },
  ];

  const exportToPDF = async () => {
    if (!dashboardRef.current || !selectedPatient) return;
    
    const canvas = await html2canvas(dashboardRef.current, {
      scale: 2,
      useCORS: true,
      logging: false,
      onclone: (clonedDoc) => {
        const style = clonedDoc.createElement('style');
        style.innerHTML = `
          /* Override Tailwind 4 oklch colors for html2canvas compatibility */
          .bg-slate-50 { background-color: #f8fafc !important; }
          .bg-white { background-color: #ffffff !important; }
          .bg-blue-50 { background-color: #eff6ff !important; }
          .bg-blue-600 { background-color: #2563eb !important; }
          .bg-red-600 { background-color: #dc2626 !important; }
          .bg-amber-600 { background-color: #d97706 !important; }
          .bg-emerald-600 { background-color: #059669 !important; }
          .bg-red-50 { background-color: #fef2f2 !important; }
          .bg-amber-50 { background-color: #fffbeb !important; }
          .bg-emerald-50 { background-color: #ecfdf5 !important; }
          
          .text-slate-900 { color: #0f172a !important; }
          .text-slate-600 { color: #475569 !important; }
          .text-slate-500 { color: #64748b !important; }
          .text-slate-400 { color: #94a3b8 !important; }
          .text-blue-600 { color: #2563eb !important; }
          .text-red-500 { color: #ef4444 !important; }
          .text-amber-500 { color: #f59e0b !important; }
          .text-emerald-500 { color: #10b981 !important; }
          
          .border-slate-200 { border-color: #e2e8f0 !important; }
          .border-slate-100 { border-color: #f1f5f9 !important; }
          
          /* Force standard color format for all elements */
          * {
            -webkit-print-color-adjust: exact !important;
            color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
        `;
        clonedDoc.head.appendChild(style);
      }
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Patient_Report_${selectedPatient.id}.pdf`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
      {/* Sidebar for Patient List */}
      <aside className="w-full lg:w-96 bg-white border-r border-slate-200 overflow-y-auto max-h-screen lg:sticky lg:top-16">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900">Patients</h2>
            <Link to="/demo" className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
              <Plus className="h-5 w-5" />
            </Link>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search patients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none"
            />
          </div>
        </div>
        
        <div className="divide-y divide-slate-50">
          {filteredPatients.map((patient) => (
            <button
              key={patient.id}
              onClick={() => fetchPatientDetails(patient.id)}
              className={`w-full p-6 text-left hover:bg-slate-50 transition-colors relative group ${selectedPatient?.id === patient.id ? 'bg-blue-50/50' : ''}`}
            >
              <div className="flex items-center space-x-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold ${selectedPatient?.id === patient.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {patient.id}
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-slate-900">{patient.name || `Patient #${patient.id}`}</h3>
                    {patient.predictions?.[0] && (
                      <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${patient.predictions[0].riskScore > 75 ? 'bg-red-100 text-red-600' : patient.predictions[0].riskScore > 40 ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                        {Math.round(patient.predictions[0].riskScore)}% Risk
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-500 mt-1">{patient.age} yrs • {new Date(patient.createdAt).toLocaleDateString()}</p>
                </div>
                <ChevronRight className={`h-4 w-4 text-slate-300 transition-transform ${selectedPatient?.id === patient.id ? 'translate-x-1' : ''}`} />
              </div>
              {selectedPatient?.id === patient.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>
              )}
            </button>
          ))}
          {filteredPatients.length === 0 && (
            <div className="p-8 text-center text-slate-400">
              No patients found.
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 lg:p-8" ref={dashboardRef}>
        <div className="max-w-6xl mx-auto">
          {!selectedPatient ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-12">
               <User className="h-16 w-16 text-slate-200 mb-4" />
               <h2 className="text-2xl font-bold text-slate-400">Select a patient to view details</h2>
            </div>
          ) : (
            <>
              {/* Header */}
              <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <div>
                  <div className="flex items-center space-x-2 text-slate-500 text-sm mb-1 uppercase tracking-wider font-bold">
                    <User className="h-4 w-4" />
                    <span>Patient Profile</span>
                  </div>
                  <h1 className="text-3xl font-bold text-slate-900">{selectedPatient.name || `Patient #${selectedPatient.id}`} Details</h1>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={exportToPDF}
                    className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </button>
                  <Link to="/demo" className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20">
                    New Prediction
                  </Link>
                </div>
              </header>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Serum Creatinine', value: `${selectedPatient.serumCreatinine || 'N/A'}`, unit: 'mg/dL' },
                  { label: 'Blood Urea', value: `${selectedPatient.bloodUrea || 'N/A'}`, unit: 'mg/dL' },
                  { label: 'Hemoglobin', value: `${selectedPatient.hemoglobin || 'N/A'}`, unit: 'gms' },
                  { label: 'Latest Risk', value: latestPrediction ? `${Math.round(latestPrediction.riskScore)}` : 'N/A', unit: '%' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-slate-500 text-sm font-bold uppercase tracking-tight">{stat.label}</span>
                    </div>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                      <span className="text-slate-400 text-sm">{stat.unit}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Risk Trend Chart */}
                <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 flex items-center">
                        <Activity className="h-5 w-5 mr-2 text-blue-600" />
                        Risk Progression
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">Temporal AI prediction trend</p>
                    </div>
                  </div>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={riskData}>
                        <defs>
                          <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit="%" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#fff', borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="risk" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          fillOpacity={1} 
                          fill="url(#colorRisk)" 
                          animationDuration={1500}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Sidebar Charts */}
                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Cohort Distribution</h3>
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={riskDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={8}
                            dataKey="value"
                          >
                            {riskDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-6 space-y-3">
                      {riskDistribution.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                            <span className="text-slate-500 font-medium">{item.name} Risk</span>
                          </div>
                          <span className="font-bold text-slate-900">{item.value} Patients</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {latestPrediction && (
                    <div className={`p-8 rounded-[2rem] text-white ${latestPrediction.riskScore > 75 ? 'bg-red-600' : latestPrediction.riskScore > 40 ? 'bg-amber-600' : 'bg-emerald-600'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold">Latest Assessment</h3>
                        <div className="p-2 bg-white/20 rounded-lg">
                          <ShieldAlert className="h-4 w-4" />
                        </div>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed mb-6">
                        {latestPrediction.suggestedAction}
                      </p>
                      <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                        Dialysis Probability: {Math.round(latestPrediction.dialysisProbability)}%
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Clinical Insights List */}
              <div className="mt-8 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Prediction Logs</h3>
                <div className="space-y-4">
                  {selectedPatient.predictions?.map((p: any, idx: number) => (
                    <div key={p.id} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors">
                      <div className={`p-3 rounded-xl ${p.riskScore > 75 ? 'text-red-500 bg-red-50' : p.riskScore > 40 ? 'text-amber-500 bg-amber-50' : 'text-emerald-500 bg-emerald-50'}`}>
                        <Activity className="h-5 w-5" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between">
                          <h4 className="font-bold text-slate-900">{p.riskCategory} Risk Prediction</h4>
                          <span className="text-xs text-slate-400 font-medium">{new Date(p.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">
                          Risk Score: {Math.round(p.riskScore)}% | CKD: {p.ckdRisk} | Dialysis: {Math.round(p.dialysisProbability)}%
                        </p>
                      </div>
                    </div>
                  ))}
                  {(!selectedPatient.predictions || selectedPatient.predictions.length === 0) && (
                    <p className="text-center text-slate-400 py-8">No predictions yet for this patient.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
