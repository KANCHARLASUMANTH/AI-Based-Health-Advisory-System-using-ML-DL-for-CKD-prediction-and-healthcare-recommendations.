
import { Activity, Github, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Activity className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold tracking-tight">CKD Prediction System</span>
            </Link>
            <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
              Empowering healthcare professionals with state-of-the-art AI and Deep Learning to predict 
              chronic kidney disease progression and dialysis initiation.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="mailto:info@ckd-ai.org" className="text-gray-400 hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition-colors">About Project</Link></li>
              <li><Link to="/data" className="text-gray-400 hover:text-blue-400 transition-colors">Data & Methods</Link></li>
              <li><Link to="/results" className="text-gray-400 hover:text-blue-400 transition-colors">Research Results</Link></li>
              <li><Link to="/ethics" className="text-gray-400 hover:text-blue-400 transition-colors">Ethics & Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Clinical Support</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-gray-400 hover:text-blue-400 transition-colors">Clinician Dashboard</Link></li>
              <li><Link to="/demo" className="text-gray-400 hover:text-blue-400 transition-colors">Risk Simulator</Link></li>
              <li><Link to="/resources" className="text-gray-400 hover:text-blue-400 transition-colors">Knowledge Hub</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-blue-400 transition-colors">FAQs</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
            <span>HIPAA Compliant Data Processing</span>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} CKD Dialysis Prediction System. All rights reserved.</p>
            <div className="mt-1 flex justify-center md:justify-end space-x-4">
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Notice</Link>
              <Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Use</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
