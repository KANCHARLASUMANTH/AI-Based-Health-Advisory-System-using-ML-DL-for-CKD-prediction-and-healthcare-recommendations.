
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageSquare, ShieldCheck, Activity } from 'lucide-react';
import { faqs } from '../data/mockData';

const FAQ = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-4">
            <HelpCircle className="h-4 w-4 mr-2" />
            Common Questions
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about the AI prediction system, 
            data security, and clinical integration.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search for answers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-medium text-lg shadow-sm"
          />
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => (
            <div 
              key={idx} 
              className={`border-2 rounded-3xl transition-all duration-200 overflow-hidden ${openIndex === idx ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 bg-white hover:border-slate-200 shadow-sm'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center group"
              >
                <h3 className={`text-lg font-bold transition-colors ${openIndex === idx ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-600'}`}>
                  {faq.question}
                </h3>
                <div className={`p-2 rounded-xl transition-colors ${openIndex === idx ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-600'}`}>
                  {openIndex === idx ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 pb-8 pt-2">
                      <div className="h-px bg-blue-100 mb-6 w-1/4"></div>
                      <p className="text-slate-600 leading-relaxed text-lg">
                        {faq.answer}
                      </p>
                      
                      {/* Optional: Add a call to action inside open FAQ if needed */}
                      {idx === 1 && (
                        <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center space-x-3">
                          <ShieldCheck className="h-5 w-5 text-emerald-600" />
                          <span className="text-sm font-bold text-emerald-700">HIPAA Compliant Processing Certified</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          {filteredFaqs.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
              <div className="p-4 bg-white rounded-full w-fit mx-auto mb-4 shadow-sm">
                <Search className="h-8 w-8 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">No results found for "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Clear search query
              </button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-20 p-10 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          <div className="mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
            <p className="text-slate-400">Our medical informatics team is here to help.</p>
          </div>
          <a 
            href="/contact" 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/20 flex items-center"
          >
            <MessageSquare className="h-5 w-5 mr-2" />
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
