
import { motion } from 'framer-motion';
import { Settings, Database, Server, Smartphone, Layout, Globe, Workflow, ShieldCheck, Database as DBIcon, Layers, Code2, LineChart } from 'lucide-react';

const Implementation = () => {
  const stack = [
    { icon: Globe, title: 'Frontend', items: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Lucide React', 'Framer Motion'] },
    { icon: Server, title: 'Backend (AI Service)', items: ['Python 3.10+', 'FastAPI', 'TensorFlow 2.x', 'Keras', 'PyTorch'] },
    { icon: DBIcon, title: 'Data Management', items: ['MySQL 8.0', 'Redis Cache', 'Pandas', 'NumPy', 'Scikit-learn'] },
    { icon: ShieldCheck, title: 'Security & Ops', items: ['Docker', 'Nginx', 'JWT Auth', 'HIPAA Compliance', 'GitLab CI/CD'] },
  ];

  return (
    <div className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-4">
            <Settings className="h-4 w-4 mr-2" />
            System Architecture
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Implementation & Tech Stack</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A robust, scalable, and secure architecture designed for mission-critical 
            clinical decision support and patient data management.
          </p>
        </div>

        {/* Tech Stack Grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stack.map((group, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4 bg-white rounded-2xl w-fit shadow-sm border border-slate-100 mb-6">
                  <group.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-6">{group.title}</h3>
                <ul className="space-y-4">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-center space-x-3 text-slate-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                      <span className="font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* System Flowchart */}
        <section className="mb-24">
          <div className="flex items-center justify-center space-x-3 mb-16">
            <Workflow className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">System Information Flow</h2>
          </div>

          <div className="relative">
            {/* Background Line for Desktop */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-100 hidden lg:block -translate-y-1/2 -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
              {[
                { icon: Database, title: 'Data Collection', desc: 'Secure ingestion of EMR and laboratory data via encrypted API.' },
                { icon: Layers, title: 'Preprocessing', desc: 'Auto-cleaning, feature scaling, and temporal sequences generation.' },
                { icon: Code2, title: 'AI Prediction', desc: 'Deep learning inference via Temporal Fusion Transformers (TFT).' },
                { icon: LineChart, title: 'Decision Support', desc: 'Risk visualization and proactive clinical recommendations.' },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-6 bg-white border-4 border-slate-50 rounded-full shadow-lg mb-6 group transition-all cursor-default"
                  >
                    <step.icon className="h-10 w-10 text-blue-600 group-hover:text-emerald-500 transition-colors" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed max-w-[240px]">{step.desc}</p>
                  
                  {/* Step Connector for Mobile/Tablet */}
                  {idx < 3 && (
                    <div className="h-12 w-1 bg-slate-100 my-8 lg:hidden"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {[
            { 
              title: 'Economic Feasibility', 
              color: 'border-blue-200 bg-blue-50',
              text: 'Reduces long-term healthcare costs by minimizing emergency dialysis initiations and associated hospital stays.' 
            },
            { 
              title: 'Technical Feasibility', 
              color: 'border-emerald-200 bg-emerald-50',
              text: 'Uses standard cloud infrastructures and open-source frameworks, ensuring portability and cost-effectiveness.' 
            },
            { 
              title: 'Social Impact', 
              color: 'border-indigo-200 bg-indigo-50',
              text: 'Empowers patients with personalized risk data and improves equity in chronic care management across demographics.' 
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className={`p-8 rounded-3xl border ${item.color}`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed font-medium">
                {item.text}
              </p>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Implementation;
