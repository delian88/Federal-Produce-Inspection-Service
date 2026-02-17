
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
    // Map roles to their demo emails
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

  const roles = [
    { id: UserRole.SUPERADMIN, title: 'Super Admin', desc: 'System governance & global policy.', icon: '🔐' },
    { id: UserRole.INSPECTOR, title: 'Inspector', desc: 'Field quality verification.', icon: '🌾' },
    { id: UserRole.AGENT, title: 'Revenue Agent', desc: 'Direct tax collection.', icon: '💸' },
    { id: UserRole.REVIEWER, title: 'Reviewer', desc: 'Financial oversight.', icon: '📈' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-100 overflow-x-hidden text-slate-900">
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
            <button onClick={onShowAbout} className={`hidden sm:block font-bold text-xs md:text-sm uppercase tracking-widest transition-colors duration-500 ${scrolled ? 'text-slate-600 hover:text-emerald-600' : 'text-slate-200 hover:text-white'}`}>Project Note</button>
            <button onClick={() => setShowLogin(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 md:px-8 py-2 md:py-3 rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest transition-all">Sign In</button>
          </div>
        </div>
      </nav>

      <section className="relative h-screen flex items-center justify-center px-4 md:px-12 overflow-hidden">
        {backgroundImages.map((img, idx) => (
          <div key={idx} className={`absolute inset-0 z-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out ${currentImage === idx ? 'opacity-100' : 'opacity-0'}`} style={{ backgroundImage: `url(${img})`, transform: currentImage === idx ? 'scale(1)' : 'scale(1.1)' }} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/90 z-[1]"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6 md:space-y-10 animate-reveal">
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-2.5 bg-white/10 backdrop-blur-2xl text-emerald-400 text-[10px] md:text-xs font-black rounded-full border border-white/20 uppercase tracking-[0.2em] mx-auto animate-float">FMITI & Five Stars ICT Production Node 01</div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.1] tracking-tighter text-white">Securing Our <br/><span className="shining-text-hero">National Wealth</span></h1>
          <p className="text-base md:text-2xl text-slate-200 max-w-4xl mx-auto font-medium tracking-tight px-4 opacity-0 animate-reveal stagger-2">Production-ready automation with PostgreSQL persistent state and Neo4j relationship monitoring for Nigerian agricultural excellence.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-6 md:pt-10 opacity-0 animate-reveal stagger-3 px-6">
            <button onClick={() => setShowLogin(true)} className="px-8 md:px-14 py-4 md:py-6 bg-emerald-600 text-white rounded-2xl md:rounded-3xl font-black text-base md:text-xl hover:bg-emerald-700 shadow-2xl transition-all">Portal Access</button>
            <button onClick={onShowAbout} className="px-8 md:px-14 py-4 md:py-6 bg-white/10 backdrop-blur-2xl text-white border-2 border-white/20 rounded-2xl md:rounded-3xl font-black text-base md:text-xl hover:bg-white/20 transition-all">Learn More</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 md:py-24 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-12">
          {[
            { label: 'Revenue Growth', val: 45, prefix: '+', suffix: '%', desc: 'Postgres Linked' },
            { label: 'Leakage Reduced', val: 99, suffix: '%', desc: 'Secure Ledger' },
            { label: 'Neo Nodes', val: 120, suffix: '+', desc: 'Supply Chain Graph' },
            { label: 'Active Sessions', val: 12, suffix: 'k', desc: 'Distributed Auth' }
          ].map((s, i) => (
            <div key={i} className="text-center group p-4 md:p-8 rounded-2xl md:rounded-3xl hover:bg-emerald-50/50 transition-all">
              <p className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-2 md:mb-4 group-hover:text-emerald-600 transition-colors tracking-tighter"><CountUp end={s.val} prefix={s.prefix} suffix={s.suffix} /></p>
              <p className="text-[10px] md:text-sm font-black text-slate-900 uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {showLogin && (
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl z-[200] flex items-center justify-center p-4 md:p-6 transition-all duration-700">
          <div className="bg-white rounded-[30px] md:rounded-[50px] p-6 md:p-12 max-w-2xl w-full shadow-2xl border border-slate-200 animate-scale max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start md:items-center mb-8 md:mb-12">
              <div>
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">Portal Gateway</h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs mt-1 md:mt-2">Production Auth Node</p>
              </div>
              <button onClick={() => setShowLogin(false)} className="p-2 md:p-4 bg-slate-100 hover:bg-emerald-500 hover:text-white rounded-xl md:rounded-3xl text-slate-600 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            {isLoggingIn ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="font-bold text-slate-900 animate-pulse">Establishing Session...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {roles.map((role) => (
                  <button key={role.id} onClick={() => handleRoleLogin(role.id)} className="p-6 md:p-10 rounded-[24px] md:rounded-[40px] border-2 border-slate-50 bg-slate-50 hover:border-emerald-500 hover:bg-emerald-50/30 group transition-all text-left relative overflow-hidden">
                    <span className="text-3xl md:text-5xl mb-4 md:mb-8 block group-hover:scale-125 transition-transform duration-700">{role.icon}</span>
                    <h4 className="font-black text-slate-900 text-lg md:text-2xl tracking-tight group-hover:text-emerald-700">{role.title}</h4>
                    <p className="text-slate-500 text-xs md:text-sm mt-2 md:mt-3 leading-snug font-medium">{role.desc}</p>
                    <div className="absolute top-0 right-0 p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg></div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
