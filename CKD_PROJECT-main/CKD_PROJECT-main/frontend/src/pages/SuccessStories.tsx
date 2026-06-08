
import { motion } from 'framer-motion';
import { UserCheck, TrendingDown, Clock, ShieldAlert } from 'lucide-react';
import { successStories } from '../data/mockData';

const SuccessStories = () => {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Clinical Success Stories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real-world impact of the AI prediction engine on patient care and decision making.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {successStories.map((story, idx) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-10 bg-slate-50 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <UserCheck className="h-48 w-48 text-blue-600" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">{story.title}</h3>
                <div className="space-y-6 mb-10">
                  <div>
                    <h4 className="font-bold text-blue-600 uppercase tracking-widest text-xs mb-2">Scenario</h4>
                    <p className="text-slate-600 leading-relaxed text-lg">{story.scenario}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-emerald-600 uppercase tracking-widest text-xs mb-2">AI Intervention</h4>
                    <p className="text-slate-600 leading-relaxed text-lg">{story.intervention}</p>
                  </div>
                  <div className="p-6 bg-white rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 uppercase tracking-widest text-xs mb-4">Outcome</h4>
                    <p className="text-slate-700 font-medium text-lg leading-relaxed italic">"{story.outcome}"</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-red-100 rounded-xl">
                      <ShieldAlert className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <span className="block text-sm text-slate-400 font-bold uppercase tracking-wider">Initial Risk</span>
                      <span className="text-2xl font-black text-slate-900">{story.initialRisk}%</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-emerald-100 rounded-xl">
                      <TrendingDown className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <span className="block text-sm text-slate-400 font-bold uppercase tracking-wider">Post-Action Risk</span>
                      <span className="text-2xl font-black text-slate-900">{story.finalRisk}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
