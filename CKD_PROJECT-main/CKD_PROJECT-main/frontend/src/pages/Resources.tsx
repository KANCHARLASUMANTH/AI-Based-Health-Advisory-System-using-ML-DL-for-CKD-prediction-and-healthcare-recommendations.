
import { FileText, Download, Github, Database, Layers, ArrowRight } from 'lucide-react';

const Resources = () => {
  const resources = [
    { title: 'Project Research Report', type: 'PDF', size: '2.4 MB', icon: FileText, color: 'text-blue-600 bg-blue-50' },
    { title: 'Deep Learning Model Specs', type: 'DOCX', size: '1.8 MB', icon: Layers, color: 'text-emerald-600 bg-emerald-50' },
    { title: 'Synthetic Dataset Sample', type: 'CSV', size: '4.2 MB', icon: Database, color: 'text-indigo-600 bg-indigo-50' },
    { title: 'Clinician Integration Guide', type: 'PDF', size: '3.1 MB', icon: FileText, color: 'text-purple-600 bg-purple-50' },
  ];

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Educational Knowledge Hub</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Access technical documentation, research papers, and synthetic datasets 
            powering the CKD Dialysis Prediction System.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {resources.map((resource, idx) => (
            <div key={idx} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 hover:border-blue-200 hover:bg-white transition-all group flex items-start space-x-6">
              <div className={`p-5 rounded-2xl ${resource.color} group-hover:scale-110 transition-transform`}>
                <resource.icon className="h-8 w-8" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{resource.title}</h3>
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100">{resource.type}</span>
                </div>
                <p className="text-slate-500 font-medium mb-6">File size: {resource.size}</p>
                <button className="flex items-center text-blue-600 font-bold hover:underline">
                  Download Resource <Download className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 p-12 lg:p-16 rounded-[3rem] text-white flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
          <div className="lg:max-w-lg mb-10 lg:mb-0">
            <h2 className="text-3xl font-bold mb-6">Open Source Research</h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              We believe in open science and reproducible research. Access our full source code 
              and model training pipelines on GitHub.
            </p>
            <a 
              href="#" 
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-colors flex items-center justify-center lg:w-fit"
            >
              <Github className="h-5 w-5 mr-3" />
              Browse Repository
            </a>
          </div>
          <div className="w-full lg:w-[400px] h-[300px] bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-md relative overflow-hidden group">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full translate-x-1/2 group-hover:translate-x-0 transition-transform duration-1000"></div>
            <div className="relative z-10 space-y-6">
              <div className="h-4 bg-white/10 rounded-full w-3/4"></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-20 bg-emerald-500/20 rounded-2xl"></div>
                <div className="h-20 bg-white/10 rounded-2xl"></div>
              </div>
              <div className="h-20 bg-indigo-500/20 rounded-2xl"></div>
              <div className="flex justify-between items-center">
                <div className="h-4 bg-white/10 rounded-full w-1/3"></div>
                <ArrowRight className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
