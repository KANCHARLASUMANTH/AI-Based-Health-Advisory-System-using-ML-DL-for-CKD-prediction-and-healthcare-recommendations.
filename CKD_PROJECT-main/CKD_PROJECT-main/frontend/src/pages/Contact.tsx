
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, FileText, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In real app, send data to backend
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="py-16 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-4">
            <Mail className="h-4 w-4 mr-2" />
            Get in Touch
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Contact & Collaboration</h1>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            We welcome inquiries from researchers, clinicians, and healthcare providers 
            interested in AI-driven nephrology solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Mail, label: 'Email Address', value: 'contact@ckd-ai.org', color: 'bg-blue-600' },
                { icon: Phone, label: 'Phone Number', value: '+1 (555) 012-3456', color: 'bg-emerald-600' },
                { icon: MapPin, label: 'Office Location', value: 'Stanford, CA 94305', color: 'bg-indigo-600' },
                { icon: FileText, label: 'Research Paper', value: 'View on ArXiv', color: 'bg-purple-600' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 bg-white rounded-[2rem] shadow-sm border border-slate-200"
                >
                  <div className={`p-4 ${item.color} rounded-2xl w-fit mb-6 shadow-sm`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">{item.label}</h3>
                  <p className="text-lg font-bold text-slate-900 leading-tight">{item.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-slate-900 p-12 rounded-[3rem] text-white">
              <h3 className="text-2xl font-bold mb-6">Connect with Us</h3>
              <div className="flex space-x-4 mb-8">
                <a href="#" className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group">
                  <Github className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="p-4 bg-white/10 rounded-2xl hover:bg-white/20 transition-all group">
                  <Linkedin className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
                </a>
              </div>
              <div className="space-y-4">
                <p className="text-slate-400 leading-relaxed font-medium">
                  We're actively seeking clinical partners for multi-center validation 
                  and real-world pilot studies. Join us in shaping the future of 
                  kidney disease management.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-10 lg:p-14 rounded-[3rem] shadow-sm border border-slate-200"
          >
            <div className="flex items-center space-x-3 mb-10">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <Send className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Send us a Message</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Full Name</label>
                  <input 
                    type="text" required
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Email Address</label>
                  <input 
                    type="email" required
                    className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Subject</label>
                <select className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-medium appearance-none">
                  <option>Collaboration Request</option>
                  <option>Clinical Pilot Program</option>
                  <option>Technical Inquiry</option>
                  <option>Research Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-tight">Message</label>
                <textarea 
                  required rows={5}
                  className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white transition-all outline-none font-medium resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className={`w-full py-5 text-white rounded-[2rem] font-bold text-lg transition-all shadow-xl flex items-center justify-center ${isSubmitted ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/30'}`}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle2 className="mr-2 h-6 w-6" />
                    Message Sent Successfully!
                  </>
                ) : (
                  <>
                    Submit Message <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
