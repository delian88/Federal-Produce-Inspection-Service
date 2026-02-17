
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

  // Define nav items based on roles
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

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col z-50`}>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800 h-20">
          <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-bold text-xl shadow-lg shadow-emerald-500/20">F</div>
          {isSidebarOpen && <span className="font-bold text-xl tracking-tight">FPIS PORTAL</span>}
        </div>
        
        <nav className="flex-1 mt-6 px-4 space-y-2 overflow-y-auto scrollbar-hide">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                activeTab === item.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <item.icon className={`w-6 h-6 shrink-0 transition-transform ${activeTab === item.id ? 'scale-110' : ''}`} />
              {isSidebarOpen && <span className="font-semibold text-sm">{item.name}</span>}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800">
           <button 
             onClick={onLogout}
             className="w-full flex items-center gap-4 p-3 rounded-xl text-rose-400 hover:bg-rose-500/10 transition-colors"
           >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
             {isSidebarOpen && <span className="font-bold text-sm">Sign Out</span>}
           </button>
           <div className="mt-6 text-[10px] text-slate-500 leading-tight">
            {isSidebarOpen ? (
              <p>Five Stars ICT Ltd Partnership &copy; 2026</p>
            ) : (
              <p className="text-center">5★</p>
            )}
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 z-40">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                {menuItems.find(m => m.id === activeTab)?.name || 'Dashboard'}
              </h1>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">{userRole} Session Active</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
             <div className="hidden md:block text-right">
               <p className="text-sm font-bold text-slate-900">Muhammad Qaim Aliyu Sambo</p>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">FPIS Global Operations</p>
             </div>
             <div className="w-12 h-12 bg-slate-100 rounded-2xl border-2 border-emerald-500/30 overflow-hidden shadow-sm hover:scale-105 transition-transform cursor-pointer">
               <img src={`https://picsum.photos/seed/${userRole}/48/48`} alt="Profile" />
             </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 scroll-smooth">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
