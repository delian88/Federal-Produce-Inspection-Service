
import React, { useState } from 'react';
import { ICONS, COLORS } from '../constants';
import { UserRole } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, userRole, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getAllowedItems = () => {
    const items = [
      { id: 'overview', name: 'Dashboard', icon: ICONS.Dashboard, roles: [UserRole.SUPERADMIN, UserRole.REVIEWER, UserRole.INSPECTOR, UserRole.AGENT] },
      { id: 'revenue', name: 'Revenue Portal', icon: ICONS.Wallet, roles: [UserRole.SUPERADMIN, UserRole.REVIEWER, UserRole.AGENT] },
      { id: 'inspections', name: 'Inspections', icon: ICONS.FileCheck, roles: [UserRole.SUPERADMIN, UserRole.INSPECTOR] },
      { id: 'agent', name: 'Agent Operations', icon: ICONS.Wallet, roles: [UserRole.SUPERADMIN, UserRole.AGENT] },
      { id: 'users', name: 'User Management', icon: ICONS.Users, roles: [UserRole.SUPERADMIN] },
    ];
    return items.filter(item => item.roles.includes(userRole));
  };

  const menuItems = getAllowedItems();

  const SidebarContent = () => (
    <>
      <div className="p-6 md:p-8 flex items-center gap-4 border-b border-slate-900 h-20 md:h-24 overflow-hidden">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-600 rounded-xl flex items-center justify-center font-black text-xl md:text-2xl shadow-xl shadow-emerald-500/20 shrink-0">F</div>
        {(isSidebarOpen || isMobileMenuOpen) && (
          <div className="flex flex-col transition-all duration-500">
            <span className="font-black text-lg md:text-xl tracking-tighter whitespace-nowrap">FPIS PORTAL</span>
            <span className="text-[10px] text-emerald-500 font-black tracking-widest uppercase">Admin v2.0</span>
          </div>
        )}
      </div>
      
      <nav className="flex-1 mt-6 md:mt-10 px-4 md:px-6 space-y-2 md:space-y-3 overflow-y-auto scrollbar-hide">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-4 md:gap-5 p-3 md:p-4 rounded-xl md:rounded-[20px] transition-all duration-300 group ${
              activeTab === item.id ? 'bg-emerald-600 text-white shadow-xl md:shadow-2xl shadow-emerald-600/30' : 'hover:bg-slate-900 text-slate-500'
            }`}
          >
            <item.icon className={`w-5 h-5 md:w-6 md:h-6 shrink-0 transition-transform duration-500 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
            {(isSidebarOpen || isMobileMenuOpen) && <span className="font-bold text-xs md:text-sm tracking-tight">{item.name}</span>}
          </button>
        ))}
      </nav>

      <div className="p-6 md:p-8 border-t border-slate-900 space-y-4 md:space-y-6">
         <button 
           onClick={onLogout}
           className="w-full flex items-center gap-4 md:gap-5 p-3 md:p-4 rounded-xl md:rounded-[20px] text-rose-500 hover:bg-rose-500/10 transition-all font-bold group"
         >
           <svg className="group-hover:translate-x-1 transition-transform w-5 h-5 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
           {(isSidebarOpen || isMobileMenuOpen) && <span className="text-xs md:text-sm">Log Out</span>}
         </button>
         {(isSidebarOpen || isMobileMenuOpen) && (
           <div className="text-[10px] text-slate-600 leading-tight font-black uppercase tracking-widest text-center">
              Five Stars ICT &copy; 2026
           </div>
         )}
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">
      {/* Sidebar Desktop */}
      <aside className={`hidden md:flex bg-slate-950 text-white transition-all duration-500 ease-in-out ${isSidebarOpen ? 'w-72' : 'w-24'} flex-col z-50 relative border-r border-slate-900`}>
        <SidebarContent />
      </aside>

      {/* Sidebar Mobile Toggle */}
      <div className={`md:hidden fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMobileMenuOpen(false)}>
        <aside className={`absolute left-0 top-0 bottom-0 bg-slate-950 text-white w-72 flex flex-col transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`} onClick={(e) => e.stopPropagation()}>
          <SidebarContent />
        </aside>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative bg-white">
        <header className="h-16 md:h-24 bg-white/80 backdrop-blur-md flex items-center justify-between px-4 md:px-10 shrink-0 z-40 border-b border-slate-100">
          <div className="flex items-center gap-4 md:gap-8">
            <button onClick={() => {
              if (window.innerWidth < 768) {
                setIsMobileMenuOpen(true);
              } else {
                setIsSidebarOpen(!isSidebarOpen);
              }
            }} className="p-2 md:p-3 hover:bg-slate-100 rounded-xl transition-all active:scale-90 text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" md-width="24" md-height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div className="animate-reveal-right">
              <h1 className="text-lg md:text-2xl font-black text-slate-900 tracking-tighter truncate max-w-[150px] md:max-w-none">
                {menuItems.find(m => m.id === activeTab)?.name || 'Dashboard'}
              </h1>
              <p className="text-[8px] md:text-[10px] text-emerald-600 font-black uppercase tracking-[0.1em] md:tracking-[0.2em] mt-0.5">{userRole}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-8">
             <div className="hidden lg:block text-right">
               <p className="text-sm font-black text-slate-900 tracking-tight">M. Qaim Aliyu Sambo</p>
               <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Global Operations</p>
             </div>
             <div className="w-10 h-10 md:w-14 md:h-14 bg-slate-100 rounded-xl md:rounded-3xl border border-emerald-500/20 overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer group">
               <img className="group-hover:scale-110 transition-transform duration-500 w-full h-full object-cover" src={`https://picsum.photos/seed/${userRole}/120/120`} alt="Profile" />
             </div>
          </div>
        </header>

        <div key={activeTab} className="flex-1 overflow-y-auto p-4 md:p-10 lg:p-14 scroll-smooth animate-reveal stagger-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
