
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RevenuePortal from './components/RevenuePortal';
import InspectionPortal from './components/InspectionPortal';
import AgentPortal from './components/AgentPortal';
import LandingPage from './components/LandingPage';
import { UserRole } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'portal'>('landing');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.SUPERADMIN);
  const [activeTab, setActiveTab] = useState('overview');

  const handleEnterPortal = (role: UserRole) => {
    setUserRole(role);
    // Set logical starting tab based on role
    if (role === UserRole.AGENT) setActiveTab('agent');
    else if (role === UserRole.INSPECTOR) setActiveTab('inspections');
    else setActiveTab('overview');
    
    setView('portal');
  };

  const handleLogout = () => {
    setView('landing');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Dashboard />;
      case 'revenue':
        return <RevenuePortal role={userRole} />;
      case 'inspections':
        return <InspectionPortal />;
      case 'agent':
        return <AgentPortal />;
      case 'users':
        return (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 space-y-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <p className="font-bold text-slate-500">Super Administrator Module</p>
            <p className="text-sm">Manage global system permissions and encryption keys.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (view === 'landing') {
    return <LandingPage onEnter={handleEnterPortal} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      userRole={userRole}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
