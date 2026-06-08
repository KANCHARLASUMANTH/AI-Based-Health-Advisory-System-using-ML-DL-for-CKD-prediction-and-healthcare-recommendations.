
import { motion } from 'framer-motion';
import { Database, Filter, Cpu, Layers, Info, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { ckdFeatures } from '../data/mockData';

const DataMethods = () => {
  const missingData = ckdFeatures.map(f => ({ name: f.name, missing: f.missing })).slice(0, 10);
  const categories = [
    { name: 'Numerical', value: ckdFeatures.filter(f => f.category === 'Numerical').length },
    { name: 'Nominal', value: ckdFeatures.filter(f => f.category === 'Nominal').length },
  ];
  const COLORS = ['#3b82f6', '#10b981'];

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Data & Methodology</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Understanding the building blocks of our prediction engine: high-fidelity clinical data 
            and temporal deep learning architectures.
          </p>
        </div>

        {/* Dataset Overview */}
        <section className="mb-24">
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Database className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Dataset Description</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
                Feature Distribution & Missing Data
              </h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={missingData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend />
                    <Bar dataKey="missing" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Missing Values Count" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-emerald-500" />
                Feature Categories
              </h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categories}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Numerical Features:</span>
                  <span className="font-bold text-blue-600">8 (e.g., Age, eGFR, SC)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Nominal Features:</span>
                  <span className="font-bold text-emerald-600">16 (e.g., HTN, DM, RBC)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 font-bold text-slate-700">Feature</th>
                  <th className="px-6 py-4 font-bold text-slate-700">Description</th>
                  <th className="px-6 py-4 font-bold text-slate-700">Category</th>
                  <th className="px-6 py-4 font-bold text-slate-700">Units</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ckdFeatures.slice(0, 6).map((feature, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-blue-600 font-mono text-sm uppercase">{feature.name}</td>
                    <td className="px-6 py-4 text-slate-600">{feature.description}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${feature.category === 'Numerical' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {feature.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{feature.scale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Model Architecture */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-3 bg-indigo-600 rounded-xl">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Temporal Fusion Transformer (TFT) Architecture</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-indigo-50 rounded-2xl">
                    <Layers className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Long-term Temporal Dependencies</h3>
                    <p className="text-slate-600 leading-relaxed">
                      Traditional models ignore the time-series nature of clinical data. Our TFT model utilizes 
                      multi-head attention and LSTM layers to capture long-range interactions between historic 
                      clinical lab results and future risk projections.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-emerald-50 rounded-2xl">
                    <Info className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Interpretable Attention Weights</h3>
                    <p className="text-slate-600 leading-relaxed">
                      By visualizing the attention weights, clinicians can see exactly which time periods 
                      and clinical features (like eGFR vs Creatinine) influenced a specific patient's risk score.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 p-12 rounded-[3rem] text-white relative h-full flex flex-col justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent"></div>
              <h3 className="text-2xl font-bold mb-12 text-center">Prediction Pipeline</h3>
              <div className="space-y-12 relative z-10">
                {[
                  { step: '01', title: 'Data Ingestion', desc: 'Secure clinical lab extraction (JSON/SQL)' },
                  { step: '02', title: 'Preprocessing', desc: 'Missing value imputation (MICE) & Normalization' },
                  { step: '03', title: 'TFT Processing', desc: 'Variable selection networks & Gated residual connections' },
                  { step: '04', title: 'Risk Score', desc: 'Quantile regression for uncertainty-aware predictions' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-6">
                    <div className="h-12 w-12 rounded-full border-2 border-indigo-400 flex items-center justify-center font-bold text-indigo-400 shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-lg">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DataMethods;
