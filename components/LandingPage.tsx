
import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import CountUp from './CountUp';
import { login, UserSession } from '../services/authService';

interface LandingPageProps {
  onAuthSuccess: (session: UserSession) => void;
  onShowAbout: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAuthSuccess, onShowAbout }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

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
    const imageInterval = setInterval(() => setCurrentImage((prev) => (prev + 1) % backgroundImages.length), 6000);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(imageInterval);
    };
  }, []);

  const handleRoleLogin = async (roleId: UserRole) => {
    setIsLoggingIn(true);
    const emailMap: Record<string, string> = {
      [UserRole.SUPERADMIN]: 'admin@fpis.gov.ng',
      [UserRole.INSPECTOR]: 'inspector@fpis.gov.ng',
      [UserRole.AGENT]: 'agent@fpis.gov.ng',
      [UserRole.REVIEWER]: 'reviewer@fpis.gov.ng',
    };

    const session = await login(emailMap[roleId]);
    if (session) {
      onAuthSuccess(session);
    }
    setIsLoggingIn(false);
  };

  const objectives = [
    { title: 'Boost Revenue', desc: 'Minimizing leakages through automated checks and enhanced compliance.' },
    { title: 'Increase Efficiency', desc: 'Streamlining processes to reduce processing time and operational costs.' },
    { title: 'Data Accuracy', desc: 'Real-time reporting and accurate data collection for transparency.' },
    { title: 'Strengthen Compliance', desc: 'Ensuring adherence to global quality standards through digital verification.' }
  ];

  const roles = [
    { id: UserRole.SUPERADMIN, title: 'Super Admin', desc: 'System governance & global policy.', icon: '🔐' },
    { id: UserRole.INSPECTOR, title: 'Inspector', desc: 'Field quality verification.', icon: '🌾' },
    { id: UserRole.AGENT, title: 'Revenue Agent', desc: 'Direct tax collection.', icon: '💸' },
    { id: UserRole.REVIEWER, title: 'Reviewer', desc: 'Financial oversight.', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 overflow-x-hidden text-slate-900">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ${scrolled ? 'bg-white/95 backdrop-blur-xl shadow-lg py-2' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3 group cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-600 rounded-lg md:rounded-xl flex items-center justify-center font-black text-white text-lg md:text-xl shadow-lg shadow-emerald-500/30">F</div>
            <div className="flex flex-col">
              <span className={`font-black text-base md:text-xl leading-none tracking-tight transition-colors duration-500 ${scrolled ? 'text-slate-900' : 'text-white'}`}>FPIS PORTAL</span>
              <span className={`text-[8px] md:text-[10px] font-black tracking-[0.1em] md:tracking-[0.2em] uppercase transition-colors duration-500 ${scrolled ? 'text-slate-400' : 'text-emerald-400'}`}>Federal Produce Inspection</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-6">
            <button onClick={onShowAbout} className={`hidden sm:block font-bold text-xs md:text-sm uppercase tracking-widest transition-colors duration-500 ${scrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-slate-200 hover:text-white'}`}>About</button>
            <button onClick={() => setShowLogin(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest transition-all">Sign In</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 md:px-12 overflow-hidden">
        {backgroundImages.map((img, idx) => (
          <div key={idx} className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${currentImage === idx ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `url(${img})`, transform: currentImage === idx ? 'scale(1)' : 'scale(1.1)' }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/90 z-[1]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6 md:space-y-10 animate-reveal">
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 bg-white/10 backdrop-blur-2xl text-emerald-400 text-[10px] md:text-xs font-black rounded-full border border-white/20 uppercase tracking-[0.2em] mx-auto animate-float">FMITI & Five Stars ICT Production Node 01</div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter text-white">Securing Our <br/><span className="shining-text-hero">National Wealth</span></h1>
          <p className="text-base md:text-2xl text-slate-200 max-w-4xl mx-auto font-medium tracking-tight px-4 opacity-0 animate-reveal stagger-2">Revolutionizing Nigeria's produce economy through automation, transparency, and a strategic Public-Private Partnership.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-6 md:pt-10 opacity-0 animate-reveal stagger-3 px-6">
            <button onClick={() => setShowLogin(true)} className="px-8 md:px-14 py-4 md:py-6 bg-emerald-600 text-white rounded-2xl md:rounded-3xl font-black text-base md:text-xl hover:bg-emerald-700 shadow-2xl transition-all">Portal Access</button>
            <button onClick={onShowAbout} className="px-8 md:px-14 py-4 md:py-6 bg-white/10 backdrop-blur-2xl text-white border-2 border-white/20 rounded-2xl md:rounded-3xl font-black text-base md:text-xl hover:bg-white/20 transition-all">Learn More</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-24 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12 text-center">
          {[
            { label: 'Revenue Growth', val: 45, prefix: '+', suffix: '%', desc: 'Postgres Linked' },
            { label: 'Leakage Reduced', val: 99, suffix: '%', desc: 'Secure Ledger' },
            { label: 'Neo Nodes', val: 120, suffix: '+', desc: 'Supply Chain Graph' },
            { label: 'Active Sessions', val: 12, suffix: 'k', desc: 'Distributed Auth' }
          ].map((s, i) => (
            <div key={i} className="group p-4 md:p-8 rounded-2xl md:rounded-3xl hover:bg-emerald-50/50 transition-all">
              <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-2 md:mb-4 group-hover:text-emerald-600 transition-colors tracking-tighter"><CountUp end={s.val} prefix={s.prefix} suffix={s.suffix} /></p>
              <p className="text-[10px] md:text-sm font-black text-slate-900 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Objectives Section */}
      <section className="py-20 px-4 md:px-12 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">Strategic Pillars</h2>
            <p className="text-slate-500 font-medium max-w-2xl mx-auto">The FPIS modernization project is built upon five key objectives aimed at boosting Nigeria's agricultural export competitiveness.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((obj, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center mb-6 font-black text-xl group-hover:scale-110 transition-transform">{i + 1}</div>
                <h4 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{obj.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{obj.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 md:py-32 px-4 md:px-12 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-emerald-600/5 blur-[80px] md:blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-10">
            <div className="inline-flex px-4 py-1.5 bg-emerald-600/10 border border-emerald-600/20 rounded-full text-emerald-400 text-[10px] font-black uppercase tracking-widest">The PPP Advantage</div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
              Five Stars ICT & <br/>
              <span className="shining-text-hero">FMITI Strategic Alliance</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              A comprehensive Design-Finance-Build-Operate-Transfer (DFBOT) model ensuring that the Federal Produce Inspection Service leverages world-class technology with zero financial risk to the ministry.
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <h5 className="font-black text-emerald-400 text-sm uppercase tracking-widest">Shared Risk</h5>
                <p className="text-slate-500 text-sm">Aligning interests towards achieving peak revenue and service delivery goals.</p>
              </div>
              <div className="space-y-3">
                <h5 className="font-black text-emerald-400 text-sm uppercase tracking-widest">Innovation</h5>
                <p className="text-slate-500 text-sm">Introducing cutting-edge ICT solutions and digital record-keeping best practices.</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
             <div className="absolute -inset-10 bg-emerald-500/10 blur-[100px] rounded-full"></div>
             <div className="bg-slate-900 border border-slate-800 p-8 md:p-12 rounded-[48px] shadow-2xl relative">
                <h3 className="text-2xl font-black mb-6">Project Scope</h3>
                <ul className="space-y-6">
                  <li className="flex gap-4 items-start">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1"><svg className="text-white w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg></div>
                    <span className="text-slate-300 font-medium italic">Integrated Revenue Management System (RMS)</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1"><svg className="text-white w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg></div>
                    <span className="text-slate-300 font-medium italic">Comprehensive Staff Training & Capacity Building</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-1"><svg className="text-white w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7"/></svg></div>
                    <span className="text-slate-300 font-medium italic">Continuous System Reliability & Performance Support</span>
                  </li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Full-Page Login Portal */}
      {showLogin && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col transition-all duration-700 overflow-y-auto animate-in fade-in duration-500">
          {/* Portal Header */}
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-10 md:pt-20 pb-8 flex justify-between items-center">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-emerald-600 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-white text-xl md:text-3xl shadow-lg shadow-emerald-500/20">F</div>
              <div>
                <h2 className="text-2xl md:text-5xl font-black text-slate-900 tracking-tighter">Portal Gateway</h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-sm mt-1">Select your administrative role to continue</p>
              </div>
            </div>
            <button 
              onClick={() => setShowLogin(false)} 
              className="p-3 md:p-5 bg-slate-100 hover:bg-rose-500 hover:text-white rounded-2xl md:rounded-3xl text-slate-600 transition-all flex items-center gap-2 group"
            >
              <span className="hidden sm:inline font-black uppercase text-xs tracking-widest">Close Gateway</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pb-20">
            {isLoggingIn ? (
              <div className="flex flex-col items-center justify-center py-40 space-y-8">
                <div className="w-20 h-20 border-8 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-center space-y-2">
                  <p className="text-2xl font-black text-slate-900 uppercase tracking-[0.2em] animate-pulse">Establishing Session</p>
                  <p className="text-slate-500 font-medium">Connecting to production PostgreSQL node...</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mt-10">
                {roles.map((role) => (
                  <button 
                    key={role.id} 
                    onClick={() => handleRoleLogin(role.id)} 
                    className="p-8 md:p-12 rounded-[40px] md:rounded-[60px] border-[8px] border-slate-50 bg-slate-50 hover:border-emerald-500 hover:bg-emerald-50/20 group transition-all text-left relative overflow-hidden shadow-sm hover:shadow-2xl"
                  >
                    <span className="text-4xl md:text-7xl mb-8 md:mb-12 block group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">{role.icon}</span>
                    <h4 className="font-black text-slate-900 text-2xl md:text-3xl tracking-tight group-hover:text-emerald-700">{role.title}</h4>
                    <p className="text-slate-500 text-sm md:text-base mt-4 leading-relaxed font-medium">{role.desc}</p>
                    <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            
            {/* Project Compliance Footer in Gateway */}
            <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              <div className="flex items-center gap-6">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/7/74/Coat_of_arms_of_Nigeria.svg" className="h-16 md:h-20" alt="Nigeria Arms" />
                 <div className="text-left">
                   <p className="font-black text-slate-900 text-sm">FMITI FEDERAL REPUBLIC OF NIGERIA</p>
                   <p className="text-xs font-bold text-slate-500">Ministry of Industry, Trade and Investment</p>
                 </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center font-black text-emerald-700">5S</div>
                <div className="text-left">
                  <p className="font-black text-slate-900 text-sm">FIVE STARS ICT LTD</p>
                  <p className="text-xs font-bold text-slate-500">Official Infrastructure Partner</p>
                </div>
              </div>
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
