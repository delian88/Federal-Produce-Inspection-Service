
import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';

interface LandingPageProps {
  onEnter: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const roles = [
    { id: UserRole.SUPERADMIN, title: 'Super Admin', desc: 'System governance, global policy & security audits.', icon: '🔐' },
    { id: UserRole.INSPECTOR, title: 'Inspection Officer', desc: 'Field quality verification for cocoa, cashew, and grains.', icon: '🌾' },
    { id: UserRole.AGENT, title: 'Revenue Agent', desc: 'Direct tax collection from traders & wallet management.', icon: '💸' },
    { id: UserRole.REVIEWER, title: 'Reviewer', desc: 'Revenue analysis & financial oversight (View-Only).', icon: '📈' },
  ];

  const features = [
    { title: 'Produce Grading', desc: 'Automated grading system for Cocoa, Ginger, and Sesame Seeds to meet ISO standards.' },
    { title: 'Revenue Protection', desc: 'DFBOT model integration with Five Stars ICT ensures 0% leakage via real-time monitoring.' },
    { title: 'Exporter Compliance', desc: 'Instant issuance of quality certificates tied to secure payment validation.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 overflow-x-hidden text-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-emerald-500/30">F</div>
            <div className="flex flex-col">
              <span className="font-bold text-slate-800 text-lg leading-none tracking-tight">FPIS PORTAL</span>
              <span className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">Federal Produce Inspection</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowLogin(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2.5 rounded-full font-bold transition-all shadow-xl shadow-emerald-200 active:scale-95"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Live: Five Stars ICT Partnership 2026
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Securing Nigeria's <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">Agricultural Wealth</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-xl leading-relaxed">
              Automation of revenue generation for the Federal Produce Inspection Service (FPIS). 
              Empowering global trade with transparent, digitalized quality inspection and tax collection.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button 
                onClick={() => setShowLogin(true)}
                className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg hover:bg-emerald-700 shadow-2xl shadow-emerald-200 transition-all hover:-translate-y-1 active:scale-95"
              >
                Access Portal
              </button>
              <button className="px-10 py-5 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center gap-3">
                Watch Demo
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-500"><path d="m7 4 12 8-12 8V4z"/></svg>
              </button>
            </div>
          </div>
          
          <div className="relative lg:h-[600px] flex items-center justify-center">
             <div className="w-full h-full bg-emerald-600/5 absolute rounded-full blur-3xl -z-10 animate-pulse"></div>
             <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-4 translate-y-8">
                  <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <h4 className="font-black text-emerald-600">COCOA</h4>
                    <p className="text-xs text-slate-500">Quality Verified</p>
                  </div>
                  <div className="bg-slate-900 p-6 rounded-3xl shadow-xl text-white animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <h4 className="font-black">REVENUE</h4>
                    <p className="text-2xl font-bold">₦123B</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-3xl shadow-xl border border-slate-100 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                    <h4 className="font-black text-amber-600">CASHEW</h4>
                    <p className="text-xs text-slate-500">Export Ready</p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-3xl shadow-xl border border-emerald-100 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                    <h4 className="font-black text-emerald-800">SESAME</h4>
                    <p className="text-xs text-slate-700">ISO Certified</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Revenue Growth', val: '+45%' },
            { label: 'Leakage Reduction', val: '99%' },
            { label: 'MDAs Integrated', val: '12' },
            { label: 'Digital Receipts', val: '2M+' }
          ].map((s, i) => (
            <div key={i} className="text-center group">
              <p className="text-4xl md:text-5xl font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{s.val}</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter">Revolutionizing Field <br/><span className="text-emerald-600">Inspections</span></h2>
              <p className="text-lg text-slate-600">Leveraging Five Stars ICT Ltd's advanced infrastructure to automate the manual hurdles of FPIS.</p>
            </div>
            <button className="text-emerald-600 font-black hover:underline flex items-center gap-2">View Compliance Docs →</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 hover:shadow-2xl transition-all hover:-translate-y-2">
                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 font-black text-2xl">{i + 1}</div>
                <h3 className="text-xl font-black text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[200] flex items-center justify-center p-6 transition-all duration-300">
          <div className="bg-white rounded-[40px] p-10 max-w-2xl w-full shadow-2xl border border-slate-200 animate-fade-in-up">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Portal Gateway</h2>
                <p className="text-slate-500 font-medium mt-1">Authorized personnel only</p>
              </div>
              <button onClick={() => setShowLogin(false)} className="p-3 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => onEnter(role.id)}
                  className="p-8 rounded-[32px] border-2 border-slate-100 hover:border-emerald-500 hover:bg-emerald-50/50 group transition-all text-left relative overflow-hidden"
                >
                  <span className="text-4xl mb-6 block group-hover:scale-125 transition-transform duration-500">{role.icon}</span>
                  <h4 className="font-black text-slate-900 text-xl group-hover:text-emerald-700 transition-colors">{role.title}</h4>
                  <p className="text-slate-500 text-sm mt-2 leading-snug">{role.desc}</p>
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-12 text-center">
               <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                 System Secured by Five Stars ICT Ltd Cybersecurity Framework
               </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-20 px-6 md:px-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="space-y-6 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-white text-xl">F</div>
              <span className="font-bold text-2xl tracking-tight">FPIS REVENUE</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Automating produce inspection and tax revenue for the Federal Ministry of Industry, Trade and Investment through Public-Private Partnership.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h5 className="font-bold uppercase text-xs tracking-widest text-emerald-500">Resource</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Keys</a></li>
                <li><a href="#" className="hover:text-white transition-colors">DFBOT Details</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold uppercase text-xs tracking-widest text-emerald-500">Legal</h5>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">NDPR Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FMITI Bylaws</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
          <p>Five Stars ICT Ltd Partnership &copy; 2026</p>
          <p>Federal Produce Inspection Service Nigeria</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
