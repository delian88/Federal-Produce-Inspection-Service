
import React from 'react';
import CountUp from './CountUp';

interface AboutPageProps {
  onBack: () => void;
  onAccess: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onAccess }) => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-y-auto animate-in fade-in duration-500">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 md:py-4 px-4 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={onBack}>
          <div className="w-6 h-6 md:w-8 md:h-8 bg-emerald-600 rounded flex items-center justify-center font-bold text-white text-sm md:text-base">F</div>
          <span className="font-bold text-slate-800 text-sm md:text-base">FPIS Project Information</span>
        </div>
        <button 
          onClick={onBack}
          className="text-slate-600 hover:text-emerald-600 font-bold text-sm md:text-base flex items-center gap-1 md:gap-2 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" md-width="20" md-height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          <span className="hidden sm:inline">Back</span>
        </button>
      </nav>

      {/* Main Content */}
      <div className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-12 max-w-5xl mx-auto space-y-12 md:space-y-20">
        
        {/* Title Section */}
        <section className="text-center space-y-4 md:space-y-6">
          <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] md:text-xs font-black rounded-full border border-emerald-100 uppercase tracking-widest">
            PPP Project Concept Note
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter px-2">
            Automation and Boosting of <br className="hidden sm:block"/>
            <span className="text-emerald-600">Revenue Processes</span>
          </h1>
          <p className="text-base md:text-xl text-slate-500 font-medium px-4">
            Federal Produce Inspection Service (FPIS) of the Federal Ministry of Industry, Trade and Investment.
          </p>
        </section>

        {/* Project Background */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="space-y-4 md:space-y-6 px-2">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-3 md:gap-4">
              <span className="w-6 md:w-8 h-1 bg-emerald-600 rounded"></span>
              Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
              The Federal Produce Inspection Service (FPIS) is responsible for inspecting agricultural produce and ensuring compliance with quality standards. 
            </p>
            <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium bg-slate-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border-l-4 border-emerald-600 italic">
              "This project aims to automate processes to enhance efficiency and transparency."
            </p>
          </div>
          <div className="bg-slate-900 rounded-[30px] md:rounded-[40px] p-6 md:p-10 text-white shadow-2xl space-y-6 md:space-y-8 relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-emerald-400 font-black uppercase tracking-widest text-[10px] md:text-sm mb-4">Lead Partners</h3>
               <div className="space-y-4">
                 <div>
                   <p className="text-slate-400 text-[10px] font-bold">FIVE STARS ICT LTD</p>
                   <p className="text-lg md:text-xl font-bold">M. Qaim Aliyu Sambo MNCS</p>
                   <p className="text-lg md:text-xl font-bold text-slate-300">Jabir Abubakar</p>
                 </div>
                 <div className="pt-4 border-t border-slate-800">
                   <p className="text-slate-400 text-[10px] font-bold">MDA</p>
                   <p className="text-base md:text-lg font-bold leading-tight">Ministry of Industry, Trade and Investment</p>
                 </div>
               </div>
             </div>
          </div>
        </div>

        {/* Financial impact card responsive */}
        <section className="bg-emerald-600 rounded-[30px] md:rounded-[48px] p-6 md:p-12 text-white relative overflow-hidden shadow-xl">
           <div className="relative z-10 flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
             <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter">Projected Impact</h2>
                <div className="space-y-4 inline-block text-left">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold shrink-0">₦</div>
                    <div>
                      <p className="text-xl md:text-3xl font-black">
                        <CountUp end={149.2} decimals={1} prefix="₦" suffix="B" />
                      </p>
                      <p className="text-emerald-200 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Gross Benefit</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center font-bold shrink-0">✓</div>
                    <div>
                      <p className="text-xl md:text-3xl font-black">
                        <CountUp end={116.7} decimals={1} prefix="₦" suffix="B" />
                      </p>
                      <p className="text-emerald-200 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Net Revenue</p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="bg-white/10 backdrop-blur-xl p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/20 w-full">
               <h4 className="font-black text-lg md:text-xl mb-4 md:mb-6 text-white">Growth Factors</h4>
               <ul className="space-y-3 md:space-y-4 text-xs md:text-sm">
                 <li className="flex justify-between border-b border-white/10 pb-2">
                   <span className="text-emerald-200">Revenue Growth</span>
                   <span className="font-bold">
                     <CountUp end={123.75} decimals={2} prefix="₦" suffix="B" />
                   </span>
                 </li>
                 <li className="flex justify-between border-b border-white/10 pb-2">
                   <span className="text-emerald-200">Leakage Reduction</span>
                   <span className="font-bold">
                     <CountUp end={9.37} decimals={2} prefix="₦" suffix="B" />
                   </span>
                 </li>
                 <li className="flex justify-between">
                   <span className="text-emerald-200">Transparency Gain</span>
                   <span className="font-bold">
                     <CountUp end={6.05} decimals={2} prefix="₦" suffix="B" />
                   </span>
                 </li>
               </ul>
             </div>
           </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-6">
          <button 
            onClick={onAccess}
            className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-slate-900 text-white rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:bg-slate-800 shadow-xl transition-all"
          >
            Access Gateway
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
