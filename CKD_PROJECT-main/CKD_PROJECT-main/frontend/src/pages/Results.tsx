
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, CheckCircle2, ShieldAlert, Info, LineChart } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { modelMetrics, featureImportance } from '../data/mockData';

const Results = () => {
  const COLORS = ['#3b82f6', '#10b981', '#6366f1', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Model Performance & Insights</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Rigorous validation metrics and feature analysis demonstrate the reliability 
            and transparency of our prediction engine.
          </p>
        </div>

        {/* Performance Metrics */}
        <section className="mb-24">
          <div className="flex items-center space-x-3 mb-10">
            <div className="p-3 bg-emerald-600 rounded-xl">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Key Performance Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {modelMetrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-slate-50 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{metric.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-3">{(metric.value * 100).toFixed(1)}%</div>
                <p className="text-sm text-slate-600 leading-relaxed">{metric.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="bg-indigo-900 p-12 rounded-[3rem] text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-3 text-emerald-400" />
                  Model Accuracy Radar
                </h3>
                <p className="text-indigo-200 mb-8 leading-relaxed">
                  Our model excels in sensitivity and specificity, striking a critical balance 
                  to avoid both missed diagnoses and unnecessary clinical alarms.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-indigo-100 font-medium">Validation Sensitivity</span>
                    <span className="text-emerald-400 font-bold">91.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-indigo-100 font-medium">Clinical Specificity</span>
                    <span className="text-emerald-400 font-bold">96.8%</span>
                  </div>
                </div>
              </div>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={modelMetrics}>
                    <PolarGrid stroke="#4338ca" />
                    <PolarAngleAxis dataKey="name" stroke="#a5b4fc" />
                    <PolarRadiusAxis angle={30} domain={[0, 1]} stroke="#4338ca" />
                    <Radar
                      name="Model Performance"
                      dataKey="value"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Importance */}
        <section className="mb-24">
          <div className="flex items-center space-x-3 mb-10">
            <div className="p-3 bg-blue-600 rounded-xl">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Feature Importance Analysis</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="h-[450px] bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureImportance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[0, 1]} hide />
                  <YAxis dataKey="name" type="category" stroke="#64748b" width={120} fontSize={12} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0' }}
                  />
                  <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={24}>
                    {featureImportance.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Info className="h-6 w-6 mr-3 text-blue-500" />
                  The Clinical Impact
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our analysis reveals that eGFR (estimated Glomerular Filtration Rate) and Serum Creatinine 
                  remain the strongest predictors. However, the model assigns significant weight to 
                  longitudinal trends in Hemoglobin and Blood Urea, capturing dynamic changes that 
                  precede dialysis need.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'Temporal Trends', desc: 'Captures change over time, not just single values.' },
                  { title: 'Variable Synergy', desc: 'Identifies non-linear interactions between biomarkers.' },
                  { title: 'Explainable AI', desc: 'Visual evidence for every predictive assessment.' },
                  { title: 'Robust Data', desc: 'Validated against diverse clinical populations.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-blue-100 transition-colors">
                    <h4 className="font-bold text-blue-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Prediction Dashboard Section */}
        <section className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full translate-x-1/2"></div>
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm mb-6">
              <ShieldAlert className="h-4 w-4 mr-2" />
              Clinical Support Dashboard
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Interact with the AI Prediction Dashboard</h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Experience the full power of our AI prediction engine. Enter clinical parameters 
              manually or explore sample patient datasets to see real-time dialysis risk projections.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="/demo" className="px-10 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/20">
                Launch Risk Simulator
              </a>
              <a href="/dashboard" className="px-10 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition-all border border-white/10">
                View Patient Dashboard
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Results;
