
import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';

interface LandingPageProps {
  onEnter: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920", // Market scene
    "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=1920", // Fresh produce
    "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&q=80&w=1920", // Trader at stall
    "https://images.unsplash.com/photo-1591033594798-33227a05780d?auto=format&fit=crop&q=80&w=1920", // Agriculture/Seeds
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1920"  // Global trade/fruit
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(imageInterval);
    };
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
      <style>{`
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shining-text {
          background: linear-gradient(90deg, #10b981, #ffffff, #10b981, #ffffff, #10b981);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shine 6s linear infinite;
          text-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
        }
        .bg-overlay {
          background: linear-gradient(to bottom, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.6));
        }
        .slide-enter { opacity: 0; }
        .slide-active { opacity: 1; transition: opacity 1.5s ease-in-out; }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center font-bold text-white text-xl shadow-lg shadow-emerald-500/30">F</div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-none tracking-tight transition-colors duration-500 ${scrolled ? 'text-slate-800' : 'text-white'}`}>FPIS PORTAL</span>
              <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-500 ${scrolled ? 'text-slate-400' : 'text-emerald-400'}`}>Federal Produce Inspection</span>
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

      {/* Hero Section with Slider */}
      <section className="relative h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
        {/* Background Image Slider */}
        {backgroundImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-1000 ${currentImage === idx ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-overlay z-[1]"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/20 backdrop-blur-md text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30 uppercase tracking-widest mx-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            Empowering Nigerian Traders & Exporters
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black leading-[1.1] tracking-tighter text-white">
            Revolutionizing <br/>
            <span className="shining-text">Market Revenue</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed font-medium">
            Bridging the gap between rural farmers and global markets. 
            Automated quality standards and secure revenue generation for a thriving Nigeria.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 pt-8">
            <button 
              onClick={() => setShowLogin(true)}
              className="px-12 py-5 bg-emerald-600 text-white rounded-2xl font-black text-xl hover:bg-emerald-700 shadow-2xl shadow-emerald-500/40 transition-all hover:-translate-y-1 active:scale-95"
            >
              Get Started Now
            </button>
            <a 
              href="#about"
              className="px-12 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-bold text-xl hover:bg-white/20 transition-all"
            >
              About the Project
            </a>
          </div>
        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 13 5 5 5-5"/><path d="m7 6 5 5 5-5"/></svg>
        </div>
      </section>

      {/* Stats Section */}
      <section id="about" className="bg-white py-24 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: 'Revenue Growth', val: '+45%' },
            { label: 'Leakage Reduction', val: '99%' },
            { label: 'MDAs Integrated', val: '12' },
            { label: 'Digital Receipts', val: '2M+' }
          ].map((s, i) => (
            <div key={i} className="text-center group">
              <p className="text-4xl md:text-6xl font-black text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors duration-500">{s.val}</p>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Market Impact Feature Grid */}
      <section className="py-24 px-6 md:px-12 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
                Transforming the <br/>
                <span className="text-emerald-600">Nigerian Produce Economy</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Our partnership with Five Stars ICT Ltd leverages real-time automation to protect small-scale traders 
                and ensure Nigerian agricultural wealth reaches its full global potential.
              </p>
            </div>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center gap-3">
              Partnership Details
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white p-12 rounded-[40px] shadow-sm border border-slate-200 hover:shadow-2xl transition-all hover:-translate-y-2 group">
                <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 font-black text-3xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                  {i + 1}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-2xl z-[200] flex items-center justify-center p-6 transition-all duration-500">
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
      <footer className="py-24 px-6 md:px-12 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="space-y-8 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center font-bold text-white text-2xl">F</div>
              <span className="font-bold text-3xl tracking-tight">FPIS REVENUE</span>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed">
              Automating produce inspection and tax revenue for the Federal Ministry of Industry, Trade and Investment through Public-Private Partnership.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h5 className="font-bold uppercase text-xs tracking-widest text-emerald-500">Resources</h5>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">DFBOT Model</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h5 className="font-bold uppercase text-xs tracking-widest text-emerald-500">Legal</h5>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">NDPR Guidelines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
          <p>Five Stars ICT Ltd Partnership &copy; 2026</p>
          <p>Federal Produce Inspection Service Nigeria</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
