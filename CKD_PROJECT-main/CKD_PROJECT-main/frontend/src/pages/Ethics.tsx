
import { ShieldCheck, Lock, UserCheck, Eye, Info, Activity } from 'lucide-react';

const Ethics = () => {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">AI Ethics & Data Privacy</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Ensuring trust, transparency, and accountability in AI-driven 
            clinical decision support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="p-10 bg-blue-50 rounded-[3rem] border border-blue-100 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="h-40 w-40 text-blue-600" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-blue-900 mb-6 flex items-center">
                <Lock className="h-6 w-6 mr-3" />
                Data Protection
              </h3>
              <ul className="space-y-6 text-blue-800 font-medium">
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                  <span>End-to-end encryption for all clinical data transmissions.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                  <span>Adherence to HIPAA, GDPR, and ISO/IEC 27001 standards.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600"></div>
                  <span>Regular independent security audits and vulnerability testing.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Eye className="h-40 w-40 text-emerald-600" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
                <UserCheck className="h-6 w-6 mr-3" />
                AI Explainability
              </h3>
              <p className="text-emerald-800 font-medium leading-relaxed mb-6">
                We believe in the 'Glass Box' approach. Every prediction generated 
                by our system is accompanied by an attention-heatmap, showing 
                clinicians exactly which features influenced the risk score.
              </p>
              <div className="p-5 bg-white rounded-2xl border border-emerald-100">
                <h4 className="text-emerald-900 font-bold mb-2">Bias Mitigation</h4>
                <p className="text-sm text-emerald-700">
                  Our models are trained on diverse, multi-ethnic datasets to minimize 
                  algorithmic bias and ensure equitable care for all patient demographics.
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-slate-900 p-12 lg:p-20 rounded-[4rem] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Clinical Accountability</h2>
              <div className="space-y-6 text-slate-400">
                <p className="text-lg leading-relaxed italic border-l-4 border-blue-500 pl-6">
                  "AI should augment, not replace, clinical expertise. Our system 
                  is designed to provide evidence-based insights that support 
                  informed decision-making between doctors and patients."
                </p>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Activity className="h-6 w-6 text-blue-400" />
                  </div>
                  <p className="text-sm">Human-in-the-loop: Final clinical decisions always remain with the qualified medical professional.</p>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <Info className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="text-sm">Transparent Limitations: The system clearly identifies cases with high uncertainty and low data quality.</p>
                </div>
              </div>
            </div>
            <div className="p-10 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 text-center">
              <div className="p-4 bg-blue-500 rounded-full w-fit mx-auto mb-6 shadow-xl shadow-blue-500/30">
                <ShieldCheck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">Ethical AI Framework</h3>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Download our comprehensive AI Ethics & Privacy whitepaper to learn 
                more about our standards and methodology.
              </p>
              <button className="w-full py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-colors">
                Download Whitepaper (PDF)
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ethics;
