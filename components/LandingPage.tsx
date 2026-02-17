
import React, { useState } from 'react';
import { UserRole } from '../types';

interface LandingPageProps {
  onEnter: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [showLogin, setShowLogin] = useState(false);

  const roles = [
    { id: UserRole.SUPERADMIN, title: 'Super Admin', desc: 'Full system control & analytics', icon: '🔑' },
    { id: UserRole.INSPECTOR, title: 'Inspection Officer', desc: 'Quality control & certification', icon: '🔍' },
    { id: UserRole.AGENT, title: 'Revenue Agent', desc: 'Wallet funding & tax collection', icon: '💳' },
    { id: UserRole.REVIEWER, title: 'Reviewer', desc: 'Financial audit & view-only reports', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 md:px-12 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded flex items-center justify-center font-bold text-white text-xl animate-pulse">F</div>
          <span className="font-bold text-slate-800 text-xl tracking-tight hidden sm:block">FPIS Portal</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setShowLogin(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full font-semibold transition-all shadow-lg shadow-emerald-200 active:scale-95"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 md:px-12 md:py-32 flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="animate-bounce inline-block px-4 py-1.5 mb-6 bg-emerald-50 text-emerald-700 text-sm font-bold rounded-full border border-emerald-100 uppercase tracking-widest">
          Federal Ministry of Industry, Trade and Investment
        </div>
        <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
          Modernizing <span className="text-emerald-600 relative inline-block">Revenue
            <span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-100 -z-10"></span>
          </span> Generation
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed transition-all duration-700 opacity-100 translate-y-0">
          The FPIS Automated Portal streamlines quality inspections and tax collection through 
          cutting-edge ICT solutions. Empowering agents, inspectors, and administrators with 
          real-time transparency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={() => setShowLogin(true)}
            className="px-8 py-4 bg-emerald-600 text-white rounded-xl font-bold text-lg hover:bg-emerald-700 shadow-xl shadow-emerald-200 transition-all hover:-translate-y-1 active:scale-95"
          >
            Enter Portal
          </button>
          <a 
            href="#impact"
            className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all hover:border-emerald-200"
          >
            Explore Impact
          </a>
        </div>
        
        {/* Floating Background Elements */}
        <div className="absolute top-40 left-10 w-24 h-24 bg-emerald-100 rounded-full blur-3xl -z-10 opacity-50 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-amber-100 rounded-full blur-3xl -z-10 opacity-50 animate-blob animation-delay-2000"></div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-24 px-6 md:px-12 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">Driving Efficiency in <br/><span className="text-emerald-400">Agricultural Trade</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              By automating revenue streams and quality certifications, we ensure that Nigeria's 
              agricultural produce meets international standards while maximizing government treasury intake.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div className="border-l-4 border-emerald-500 pl-6">
                <h4 className="text-4xl font-bold">95%</h4>
                <p className="text-slate-500 text-sm mt-2 font-medium">Processing Speedup</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-6">
                <h4 className="text-4xl font-bold">₦120B+</h4>
                <p className="text-slate-500 text-sm mt-2 font-medium">Revenue Growth Target</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              </div>
              <div className="space-y-4 font-mono text-emerald-400 text-sm">
                <p className="animate-pulse">> System Initialize...</p>
                <p className="text-slate-400">> Connecting to FMITI Core Database...</p>
                <p className="text-slate-400">> Loading Revenue Modules [Agent, Inspector, Admin]...</p>
                <p className="text-emerald-500">> Ready for Secure Operations.</p>
              </div>
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Role Selector Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in zoom-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-slate-100">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Portal Access</h2>
                <p className="text-slate-500 text-sm mt-1">Please select your operational role to continue</p>
              </div>
              <button onClick={() => setShowLogin(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => onEnter(role.id)}
                  className="p-6 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 group transition-all text-left relative overflow-hidden"
                >
                  <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{role.icon}</span>
                  <h4 className="font-bold text-slate-900 text-lg">{role.title}</h4>
                  <p className="text-slate-500 text-sm mt-1">{role.desc}</p>
                </button>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-slate-400">
              By signing in, you agree to the NDPR Data Protection guidelines of the FMITI.
            </p>
          </div>
        </div>
      )}

      {/* Process Section */}
      <section className="py-24 bg-white px-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">1</div>
              <h4 className="font-bold">Collection</h4>
              <p className="text-slate-500 text-sm">Agents fund wallets and collect taxes from traders at the source.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">2</div>
              <h4 className="font-bold">Inspection</h4>
              <p className="text-slate-500 text-sm">Officers verify produce quality using the automated inspection engine.</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-amber-500 text-white rounded-full flex items-center justify-center mx-auto text-xl font-bold">3</div>
              <h4 className="font-bold">Settlement</h4>
              <p className="text-slate-500 text-sm">Real-time splitting of funds between treasury and partners.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-slate-100 bg-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center font-bold text-white">F</div>
            <span className="font-bold text-slate-800">FPIS Revenue Portal</span>
          </div>
          <div className="text-slate-500 text-sm">
            Five Stars ICT Ltd Partnership &copy; 2026 FPIS Nigeria
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">Terms</a>
            <a href="#" className="text-slate-400 hover:text-emerald-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
      
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
