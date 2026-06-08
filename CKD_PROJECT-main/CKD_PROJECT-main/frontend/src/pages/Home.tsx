
import { ArrowRight, Activity, Brain, Shield, UserCheck, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-emerald-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100" fill="none" stroke="white" strokeWidth="0.1" />
            <path d="M0 80 C 30 20 60 20 100 80" fill="none" stroke="white" strokeWidth="0.1" />
            <path d="M0 60 C 40 40 70 40 100 60" fill="none" stroke="white" strokeWidth="0.1" />
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Predicting Dialysis Initiation Using <span className="text-emerald-400">AI and Deep Learning</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-2xl">
              A state-of-the-art clinical decision support system designed to help clinicians 
              identify at-risk chronic kidney disease patients before they reach critical stages.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/demo"
                className="px-8 py-4 bg-emerald-500 text-white rounded-lg font-bold text-lg hover:bg-emerald-600 transition-all transform hover:scale-105 shadow-lg flex items-center"
              >
                View Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-lg font-bold text-lg hover:bg-white/20 transition-all"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating elements to simulate AI/Healthcare visuals */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block pr-20">
          <motion.div
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-[400px] h-[400px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative"
          >
            <div className="absolute -top-10 -left-10 p-4 bg-blue-500 rounded-2xl shadow-xl">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <div className="space-y-6">
              <div className="h-4 bg-blue-400/20 rounded w-3/4 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-emerald-400/20 rounded-xl"></div>
                <div className="h-20 bg-blue-400/20 rounded-xl"></div>
              </div>
              <div className="h-32 bg-white/5 rounded-2xl flex items-center justify-center">
                <Brain className="h-16 w-16 text-emerald-400 opacity-40" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-blue-400/20 rounded w-1/3"></div>
                <div className="h-8 w-20 bg-emerald-500 rounded-lg"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Chronic Kidney Disease (CKD)?</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Chronic Kidney Disease (CKD) is a progressive condition where kidney function gradually decreases over time. 
                When kidneys can no longer filter blood effectively, toxins build up, leading to the need for dialysis 
                or a kidney transplant.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                The CKD Dialysis Prediction System uses advanced temporal fusion transformers to analyze clinical parameters 
                and predict when a patient might require dialysis, enabling earlier intervention and better care management.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <span className="block text-3xl font-bold text-blue-600 mb-1">94.5%</span>
                  <span className="text-gray-500 text-sm">Model Accuracy</span>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <span className="block text-3xl font-bold text-emerald-600 mb-1">CDSS</span>
                  <span className="text-gray-500 text-sm">Decision Support</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Brain, title: "Deep Learning", desc: "LSTM & Temporal Fusion Transformers for longitudinal data analysis." },
                { icon: Shield, title: "Privacy First", desc: "HIPAA-compliant processing ensuring patient data security." },
                { icon: UserCheck, title: "Clinician Centric", desc: "Designed to augment medical expertise with predictive insights." },
                { icon: Stethoscope, title: "Evidence Based", desc: "Trained on high-quality multi-center clinical datasets." },
              ].map((feature, idx) => (
                <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <feature.icon className="h-8 w-8 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Ready to explore the clinical decision support dashboard?</h2>
          <div className="flex justify-center space-x-4">
            <Link
              to="/dashboard"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Access Dashboard
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition-colors"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Project Updates</h2>
              <p className="text-gray-500">Stay informed about our latest research and system improvements.</p>
            </div>
            <Link to="/resources" className="text-blue-600 font-bold hover:underline flex items-center">
              View All News <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { date: 'Oct 24, 2023', title: 'New Multi-center Validation Study Published', tag: 'Research' },
              { date: 'Nov 02, 2023', title: 'System Updated with TFT Model v2.4', tag: 'System' },
              { date: 'Nov 15, 2023', title: 'Upcoming Webinar: AI in Nephrology', tag: 'Event' },
            ].map((news, idx) => (
              <div key={idx} className="p-8 rounded-[2rem] border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all group">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full mb-4">{news.tag}</span>
                <p className="text-sm text-gray-400 mb-2 font-medium">{news.date}</p>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-6">{news.title}</h3>
                <button className="text-slate-400 group-hover:text-blue-600 transition-colors">
                  <ArrowRight className="h-6 w-6" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
