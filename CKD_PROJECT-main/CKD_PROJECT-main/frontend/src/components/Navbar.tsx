import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Activity, LayoutDashboard, Info, Database, BarChart3, Settings, Phone, Menu, X, LogIn, LogOut } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { authService } from '../services/auth.service';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  const navItems = [
    { name: 'Home', path: '/', icon: Activity },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Data', path: '/data', icon: Database },
    { name: 'Results', path: '/results', icon: BarChart3 },
    { name: 'Implementation', path: '/implementation', icon: Settings },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg shadow-sm">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden md:block">CKD Prediction</span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-3 py-2 rounded-xl text-sm font-bold transition-all",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  )
                }
              >
                <item.icon className="h-4 w-4 mr-1.5" />
                {item.name}
              </NavLink>
            ))}
            
            <div className="h-8 w-px bg-slate-100 mx-2"></div>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-slate-600 hover:text-red-600 font-bold text-sm transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1.5" />
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center px-4 py-2 text-blue-600 font-bold text-sm transition-colors"
              >
                <LogIn className="h-4 w-4 mr-1.5" />
                Sign In
              </NavLink>
            )}

            <NavLink
              to="/demo"
              className="ml-2 px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
            >
              Live Demo
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 rounded-xl text-base font-bold",
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                  )
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.name}
              </NavLink>
            ))}
            
            <div className="pt-4 border-t border-slate-100 space-y-2">
              {isAuthenticated ? (
                <button
                  onClick={() => { handleLogout(); setIsOpen(false); }}
                  className="w-full flex items-center px-4 py-3 text-red-600 font-bold"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center px-4 py-3 text-blue-600 font-bold"
                >
                  <LogIn className="h-5 w-5 mr-3" />
                  Sign In
                </NavLink>
              )}
              <NavLink
                to="/demo"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-4 py-3 bg-blue-600 text-white rounded-xl text-base font-bold hover:bg-blue-700 transition-colors"
              >
                Live Demo
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
