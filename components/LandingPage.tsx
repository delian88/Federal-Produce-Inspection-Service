
import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import CountUp from './CountUp';

interface LandingPageProps {
  onEnter: (role: UserRole) => void;
  onShowAbout: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, onShowAbout }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const backgroundImages = [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1591033594798-33227a05780d?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=1920"
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length);
    }, 6000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(imageInterval);
    };
  }, []);

  const roles = [
    { id: UserRole.SUPERADMIN, title: 'Super Admin', desc: 'System governance & global policy.', icon: '🔐' },
    { id: UserRole.INSPECTOR, title: 'Inspector', desc: 'Field quality verification.', icon: '🌾' },
    { id: UserRole.AGENT, title: 'Revenue Agent', desc: 'Direct tax collection.', icon: '💸' },
    { id: UserRole.REVIEWER, title: 'Reviewer', desc: 'Financial oversight.', icon: '📈' },
  ];

  const features = [
    { title: 'Produce Grading', desc: 'Automated grading system for Cocoa and Ginger to meet ISO standards.' },
    { title: 'Revenue Protection', desc: 'DFBOT model integration ensures 0% leakage via real-time monitoring.' },
    { title: 'Exporter Compliance', desc: 'Instant issuance of quality certificates tied to secure payment.' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 overflow-x-hidden text-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-2' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-600 rounded-lg md:rounded-xl flex items-center justify-center font-black text-white text-lg md:text-xl shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">F</div>
            <div className="flex flex-col">
              <span className={`font-black text-base md:text-xl leading-none tracking-tight transition-colors duration-500 ${scrolled ? 'text-slate-900' : 'text-white'}`}>FPIS PORTAL</span>
              <span className={`text-[8px] md:text-[10px] font-black tracking-[0.1em] md:tracking-[0.2em] uppercase transition-colors duration-500 ${scrolled ? 'text-slate-400' : 'text-emerald-400'}`}>Federal Produce Inspection</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            <button 
              onClick={onShowAbout}
              className={`hidden sm:block font-bold text-xs md:text-sm uppercase tracking-widest transition-colors duration-500 ${scrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-slate-200 hover:text-white'}`}
            >
              Project Note
            </button>
            <button 
              onClick={() => setShowLogin(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 hover:-translate-y-0.5 active:scale-95"
            >
              Portal Access
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 md:px-12 overflow-hidden">
        {backgroundImages.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${currentImage === idx ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})`, transform: currentImage === idx ? 'scale(1)' : 'scale(1.1)', transitionProperty: 'opacity, transform' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/90 z-[1]"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6 md:space-y-10 animate-reveal">
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 bg-white/10 backdrop-blur-2xl text-emerald-400 text-[10px] md:text-xs font-black rounded-full border border-white/20 uppercase tracking-[0.1em] md:tracking-[0.2em] mx-auto animate-float">
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]"></span>
            FMITI & Five Stars ICT Partnership 2026
          </div>
          
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter text-white">
              Securing Our <br/>
              <span className="shining-text-hero">National Wealth</span>
            </h1>
          </div>
          
          <p className="text-base md:text-2xl text-slate-200 max-w-4xl mx-auto leading-relaxed font-medium tracking-tight opacity-0 animate-reveal stagger-2 px-4">
            Automating produce inspections to empower Nigerian farmers and traders in the global economy. 
            Digital transparency for a sustainable future.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-6 md:pt-10 opacity-0 animate-reveal stagger-3 px-6">
            <button 
              onClick={() => setShowLogin(true)}
              className="px-8 md:px-14 py-4 md:py-6 bg-emerald-600 text-white rounded-2xl md:rounded-3xl font-black text-base md:text-xl hover:bg-emerald-700 shadow-[0_20px_40px_rgba(5,150,105,0.4)] transition-all hover:-translate-y-1 active:scale-95 group"
            >
              Portal Sign In
              <span className="ml-2 md:ml-3 group-hover:translate-x-1 inline-block transition-transform">→</span>
            </button>
            <button 
              onClick={onShowAbout}
              className="px-8 md:px-14 py-4 md:py-6 bg-white/10 backdrop-blur-2xl text-white border-2 border-white/20 rounded-2xl md:rounded-3xl font-black text-base md:text-xl hover:bg-white/20 transition-all hover:border-white/40"
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer hidden sm:block" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
          <div className="w-6 md:w-8 h-10 md:h-12 rounded-full border-2 border-white/30 flex justify-center p-2">
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-emerald-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-24 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {[
            { label: 'Revenue Growth', val: 45, prefix: '+', suffix: '%', desc: 'Annual projected' },
            { label: 'Leakage Reduced', val: 99, suffix: '%', desc: 'Audit accuracy' },
            { label: 'MDAs Integrated', val: 12, desc: 'Seamless flow' },
            { label: 'Digital Receipts', val: 2, suffix: 'M+', desc: 'Secured logs' }
          ].map((s, i) => (
            <div key={i} className="text-center group p-4 md:p-8 rounded-2xl md:rounded-3xl hover:bg-emerald-50/50 transition-colors duration-500">
              <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-2 md:mb-4 group-hover:text-emerald-600 transition-colors duration-500 tracking-tighter">
                <CountUp end={s.val} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="text-[10px] md:text-sm font-black text-slate-900 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="hidden md:block text-[10px] font-medium text-slate-400 uppercase tracking-widest">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 md:py-32 px-4 md:px-12 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-emerald-600/5 blur-[80px] md:blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <div className="space-y-8 md:space-y-10 text-center lg:text-left">
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-black leading-tight tracking-tighter">
                Smart Automation for <br/>
                <span className="shining-text-hero">Global Standards</span>
              </h2>
              <p className="text-base md:text-xl text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                Our technology bridge allows the Federal Ministry to monitor every stage of produce quality, 
                from local markets to international shipping terminals.
              </p>
              <div className="space-y-4 md:space-y-6 text-left max-w-lg mx-auto lg:mx-0">
                {features.map((f, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 items-start group">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-600/20 text-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 font-black text-lg md:text-xl group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-black text-white mb-1 md:mb-2 tracking-tight">{f.title}</h4>
                      <p className="text-sm md:text-base text-slate-400 font-medium leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group hidden lg:block">
              <div className="absolute -inset-4 bg-emerald-500/20 blur-2xl rounded-[60px] opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-slate-900 border border-slate-800 p-2 rounded-[60px] shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                 <img src="https://images.unsplash.com/photo-1590779033100-9f60a05a013d?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover rounded-[52px] opacity-70 group-hover:scale-110 transition-transform duration-[2000ms]" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent flex flex-col justify-end p-12">
                   <h4 className="text-3xl font-black mb-2 text-white">Quality Verified</h4>
                   <p className="text-emerald-400 font-bold tracking-widest uppercase text-sm">FPIS Standard 2026</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl z-[200] flex items-center justify-center p-4 md:p-6 transition-all duration-700">
          <div className="bg-white rounded-[30px] md:rounded-[50px] p-6 md:p-12 max-w-2xl w-full shadow-2xl border border-slate-200 animate-scale max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start md:items-center mb-8 md:mb-12">
              <div>
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">Portal Gateway</h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] text-[10px] md:text-xs mt-1 md:mt-2">Authorized Access Point</p>
              </div>
              <button onClick={() => setShowLogin(false)} className="p-2 md:p-4 bg-slate-100 hover:bg-emerald-500 hover:text-white rounded-xl md:rounded-3xl text-slate-600 transition-all active:scale-90">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" md-width="24" md-height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => onEnter(role.id)}
                  className="p-6 md:p-10 rounded-[24px] md:rounded-[40px] border-2 border-slate-50 bg-slate-50 hover:border-emerald-500 hover:bg-emerald-50/30 group transition-all text-left relative overflow-hidden"
                >
                  <span className="text-3xl md:text-5xl mb-4 md:mb-8 block group-hover:scale-125 transition-transform duration-700">{role.icon}</span>
                  <h4 className="font-black text-slate-900 text-lg md:text-2xl tracking-tight group-hover:text-emerald-700 transition-colors">{role.title}</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-2 md:mt-3 leading-snug font-medium">{role.desc}</p>
                  <div className="absolute top-0 right-0 p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" md-width="20" md-height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-16 md:py-32 px-6 md:px-12 bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 md:gap-20">
          <div className="space-y-6 md:space-y-10 max-w-sm">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-white text-xl md:text-3xl shadow-lg shadow-emerald-500/20">F</div>
              <span className="font-black text-2xl md:text-4xl tracking-tighter">FPIS REVENUE</span>
            </div>
            <p className="text-slate-400 text-base md:text-xl leading-relaxed font-medium">
              Revolutionizing Nigeria's produce economy through Public-Private Partnership and world-class ICT integration.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-4 md:space-y-6">
              <h5 className="font-black uppercase text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-emerald-500">Infrastructure</h5>
              <ul className="space-y-2 md:space-y-4 text-slate-400 font-bold text-xs md:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Digital Ledger</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Gateway</a></li>
              </ul>
            </div>
            <div className="space-y-4 md:space-y-6">
              <h5 className="font-black uppercase text-[10px] md:text-xs tracking-[0.2em] md:tracking-[0.3em] text-emerald-500">Corporate</h5>
              <ul className="space-y-2 md:space-y-4 text-slate-400 font-bold text-xs md:text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Five Stars ICT</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FMITI Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 md:mt-32 pt-8 md:pt-12 border-t border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 md:gap-8 text-[8px] md:text-xs font-black text-slate-500 uppercase tracking-[0.2em] md:tracking-[0.4em] text-center">
          <p>Five Stars ICT Ltd &copy; 2026</p>
          <p>Federal Produce Inspection Service Nigeria</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
