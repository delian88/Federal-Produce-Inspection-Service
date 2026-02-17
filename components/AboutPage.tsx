
import React from 'react';

interface AboutPageProps {
  onBack: () => void;
  onAccess: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onAccess }) => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-y-auto animate-in fade-in duration-500">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onBack}>
          <div className="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center font-bold text-white">F</div>
          <span className="font-bold text-slate-800 hidden sm:inline">FPIS Project Information</span>
        </div>
        <button 
          onClick={onBack}
          className="text-slate-600 hover:text-emerald-600 font-bold flex items-center gap-2 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          Back to Landing
        </button>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto space-y-20">
        
        {/* Title Section */}
        <section className="text-center space-y-6">
          <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-black rounded-full border border-emerald-100 uppercase tracking-widest animate-pulse">
            PPP Project Concept Note
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight">
            Automation and Boosting of <br/>
            <span className="text-emerald-600">Revenue Generation Processes</span>
          </h1>
          <p className="text-xl text-slate-500 font-medium">
            Federal Produce Inspection Service (FPIS) of the Federal Ministry of Industry, Trade and Investment.
          </p>
        </section>

        {/* Project Background */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 flex items-center gap-4">
              <span className="w-8 h-1 bg-emerald-600 rounded"></span>
              Introduction
            </h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              The Federal Produce Inspection Service (FPIS) is responsible for inspecting agricultural produce and ensuring compliance with quality standards. Current manual processes lead to inefficiencies and revenue leakages.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg font-medium bg-slate-50 p-6 rounded-3xl border-l-4 border-emerald-600 italic">
              "This project aims to automate processes to enhance efficiency, accuracy, and transparency, thereby boosting stakeholder confidence."
            </p>
          </div>
          <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl space-y-8 relative overflow-hidden">
             <div className="relative z-10">
               <h3 className="text-emerald-400 font-black uppercase tracking-widest text-sm mb-4">Lead Partners</h3>
               <div className="space-y-4">
                 <div>
                   <p className="text-slate-400 text-xs font-bold">FIVE STARS ICT LTD DIRECTORS</p>
                   <p className="text-xl font-bold">Mr. Muhammad Qaim Aliyu Sambo MNCS</p>
                   <p className="text-xl font-bold text-slate-300">Mr. Jabir Abubakar</p>
                 </div>
                 <div className="pt-4 border-t border-slate-800">
                   <p className="text-slate-400 text-xs font-bold">MDA INVOLVED</p>
                   <p className="text-lg font-bold">Federal Ministry of Industry, Trade and Investment (FMITI)</p>
                 </div>
               </div>
             </div>
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
             </div>
          </div>
        </div>

        {/* Strategic Pillars */}
        <section className="space-y-12">
          <h2 className="text-3xl font-black text-slate-900 text-center">Core Objectives of Automation</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Boost Revenue", desc: "Minimizing leakages and enhancing compliance through automated systems.", icon: "💰" },
              { title: "Increase Efficiency", desc: "Streamlining generation processes to reduce processing time and costs.", icon: "⚡" },
              { title: "Data Accuracy", desc: "Ensuring real-time reporting, accountability, and digital record-keeping.", icon: "📊" },
              { title: "Operational Savings", desc: "Cutting costs associated with outdated manual systems and inefficiency.", icon: "📉" },
              { title: "Strengthen Compliance", desc: "Ensuring adherence to international standards and automated checks.", icon: "🛡️" },
              { title: "Staff Training", desc: "Equipping FPIS staff with modern digital skills via capacity building.", icon: "👨‍🏫" }
            ].map((obj, i) => (
              <div key={i} className="p-8 bg-white border border-slate-100 rounded-[32px] shadow-sm hover:shadow-xl transition-all group">
                <span className="text-4xl block mb-6 group-hover:scale-125 transition-transform">{obj.icon}</span>
                <h4 className="text-xl font-black text-slate-900 mb-3">{obj.title}</h4>
                <p className="text-slate-500 leading-relaxed text-sm">{obj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Financial Benefits Box */}
        <section className="bg-emerald-600 rounded-[48px] p-12 text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
           <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
             <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Projected Financial Impact</h2>
                <p className="text-emerald-100 text-lg leading-relaxed">
                  The automation initiative is designed as a long-term economic driver for the agricultural sector.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-bold">₦</div>
                    <div>
                      <p className="text-2xl font-black">₦149,275,000,000</p>
                      <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest">Total Benefits over 25 Years</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center font-bold">✓</div>
                    <div>
                      <p className="text-2xl font-black">₦116,786,875,000</p>
                      <p className="text-emerald-200 text-xs font-bold uppercase tracking-widest">Net Financial Benefits</p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[32px] border border-white/20 space-y-6">
               <h4 className="font-black text-xl">Revenue Growth Breakdown</h4>
               <ul className="space-y-4 text-sm">
                 <li className="flex justify-between border-b border-white/10 pb-2">
                   <span className="text-emerald-200 font-medium">Increased Revenue Collection</span>
                   <span className="font-bold">₦123.75B</span>
                 </li>
                 <li className="flex justify-between border-b border-white/10 pb-2">
                   <span className="text-emerald-200 font-medium">Reduced Leakages</span>
                   <span className="font-bold">₦9.37B</span>
                 </li>
                 <li className="flex justify-between border-b border-white/10 pb-2">
                   <span className="text-emerald-200 font-medium">Operational Efficiency Savings</span>
                   <span className="font-bold">₦3.75B</span>
                 </li>
                 <li className="flex justify-between">
                   <span className="text-emerald-200 font-medium">Transparency Benefits</span>
                   <span className="font-bold">₦6.05B</span>
                 </li>
               </ul>
             </div>
           </div>
           {/* Decorative elements */}
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl"></div>
        </section>

        {/* PPP Model Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-black text-slate-900">The DFBOT Model</h2>
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p>
              The project utilizes a <strong>Design-Finance-Build-Operate-Transfer (DFBOT)</strong> Public-Private Partnership arrangement. Five Stars ICT Ltd leads the technical implementation and operational management for a 25-year concession period, ensuring world-class service delivery without immediate government capital strain.
            </p>
            <div className="grid md:grid-cols-2 gap-8 mt-10">
              <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                <h5 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest text-emerald-600">Private Sector Role</h5>
                <p className="text-sm">Design, finance, build, and operate the automated system, provide staff training, and ensure data integrity and security framework.</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100">
                <h5 className="font-bold text-slate-900 mb-2 uppercase text-xs tracking-widest text-emerald-600">Public Sector Role (FPIS)</h5>
                <p className="text-sm">Project oversight, policy allocation, stakeholder engagement, and regulatory compliance auditing to protect national interests.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-10">
          <button 
            onClick={onAccess}
            className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-slate-800 shadow-2xl transition-all hover:-translate-y-1"
          >
            Access Portal Gateway
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 py-12 px-6 border-t border-slate-100">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400 font-bold uppercase tracking-widest">
           <p>Five Stars ICT Ltd Partnership &copy; 2026</p>
           <p>Federal Ministry of Industry, Trade and Investment</p>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
