
import { motion } from 'framer-motion';
import { Target, AlertCircle, TrendingUp, Info } from 'lucide-react';

const About = () => {
  const timelineSteps = [
    {
      title: 'Stage 1: Initial Damage',
      desc: 'Kidney damage with normal or high GFR (≥ 90 mL/min/1.73 m²).',
      color: 'bg-emerald-500',
    },
    {
      title: 'Stage 2: Mild Loss',
      desc: 'Mild loss of kidney function (GFR 60–89 mL/min/1.73 m²).',
      color: 'bg-green-500',
    },
    {
      title: 'Stage 3: Moderate Loss',
      desc: 'Moderate loss of kidney function (GFR 30–59 mL/min/1.73 m²).',
      color: 'bg-yellow-500',
    },
    {
      title: 'Stage 4: Severe Loss',
      desc: 'Severe loss of kidney function (GFR 15–29 mL/min/1.73 m²).',
      color: 'bg-orange-500',
    },
    {
      title: 'Stage 5: Kidney Failure',
      desc: 'End-stage renal disease (ESRD) (GFR < 15 mL/min/1.73 m²).',
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Project Overview</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between data science and clinical nephrology through innovative deep learning solutions.
          </p>
        </div>

        {/* Problem Statement & Objectives */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-blue-50 rounded-3xl border border-blue-100"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <AlertCircle className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Problem Statement</h2>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Chronic Kidney Disease (CKD) affects approximately 10% of the world's population. 
              The progression to end-stage renal disease is often silent and difficult to predict 
              with standard clinical models, which usually focus on point-in-time assessments.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Clinicians face significant challenges in accurately timing the transition to dialysis, 
              which can lead to emergency initiations, increased morbidity, and higher healthcare costs.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-3 bg-emerald-600 rounded-2xl">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Project Objectives</h2>
            </div>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start space-x-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600"></div>
                <span>Develop a deep learning framework capable of processing longitudinal clinical data.</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600"></div>
                <span>Identify key clinical biomarkers that signal an imminent need for dialysis.</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600"></div>
                <span>Provide a transparent, explainable AI interface for healthcare providers.</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-600"></div>
                <span>Improve patient outcomes by enabling proactive clinical management.</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <section className="mb-24">
          <div className="flex items-center space-x-3 mb-12 justify-center">
            <TrendingUp className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 text-center">CKD Progression & Dialysis Need</h2>
          </div>
          <div className="relative mt-20">
            {/* Timeline Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {timelineSteps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative flex flex-col items-center"
                >
                  <div className={`h-6 w-6 rounded-full ${step.color} border-4 border-white shadow-md absolute -top-3 hidden md:block`}></div>
                  <div className="mt-8 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Dialysis Trigger Point */}
            <div className="mt-12 flex justify-center">
              <div className="px-6 py-3 bg-red-100 border border-red-200 rounded-full flex items-center space-x-2 animate-pulse">
                <div className="h-2 w-2 rounded-full bg-red-600"></div>
                <span className="text-red-700 font-bold uppercase tracking-wider text-sm">Critical Dialysis Threshold</span>
              </div>
            </div>
          </div>
        </section>

        {/* Importance Section */}
        <section className="bg-gray-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Info className="h-64 w-64 text-white" />
          </div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Prediction Matters</h2>
              <div className="space-y-6 text-gray-400">
                <p className="text-lg leading-relaxed">
                  Predicting the exact timing of dialysis initiation is crucial for clinical and economic reasons. 
                  Planned dialysis initiation using an arteriovenous fistula (AVF) significantly reduces 
                  complications and mortality rates compared to emergency starts with central venous catheters (CVC).
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <span className="text-2xl font-bold text-blue-400">40%</span>
                    <p className="text-sm">Reduction in initial hospitalization costs through planned initiation.</p>
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-emerald-400">3x</span>
                    <p className="text-sm">Lower infection risk when starting dialysis with planned access.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
              <blockquote className="text-xl italic text-blue-100 mb-6">
                "Our AI model doesn't just look at today's numbers; it understands the patient's journey, 
                detecting subtle patterns in creatinine and hemoglobin trends that human eyes might overlook."
              </blockquote>
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center font-bold">DR</div>
                <div>
                  <p className="font-bold">Dr. Sarah Chen</p>
                  <p className="text-sm text-gray-400 italic">Chief Medical Informatics Officer</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
