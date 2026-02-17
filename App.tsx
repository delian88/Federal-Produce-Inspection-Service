
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RevenuePortal from './components/RevenuePortal';
import InspectionPortal from './components/InspectionPortal';
import AgentPortal from './components/AgentPortal';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import { UserRole } from './types';
import { getSession, logout as apiLogout, seedDemoUsers, UserSession } from './services/authService';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'portal' | 'about'>('landing');
  const [session, setSession] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initApp = async () => {
      // 1. Run Migrations & Seed Data (Idempotent)
      await seedDemoUsers();
      
      // 2. Check Session
      const activeSession = await getSession();
      if (activeSession) {
        setSession(activeSession);
        setView('portal');
        
        // Auto-set tab based on role
        if (activeSession.role === UserRole.AGENT) setActiveTab('agent');
        else if (activeSession.role === UserRole.INSPECTOR) setActiveTab('inspections');
        else setActiveTab('overview');
      }
      setIsInitializing(false);
    };
    initApp();
  }, []);

  const handleAuthSuccess = (newSession: UserSession) => {
    setSession(newSession);
    if (newSession.role === UserRole.AGENT) setActiveTab('agent');
    else if (newSession.role === UserRole.INSPECTOR) setActiveTab('inspections');
    else setActiveTab('overview');
    setView('portal');
  };

  const handleLogout = async () => {
    await apiLogout();
    setSession(null);
    setView('landing');
  };

  const renderContent = () => {
    if (!session) return null;

    switch (activeTab) {
      case 'overview':
        return <Dashboard />;
      case 'revenue':
        return <RevenuePortal role={session.role} />;
      case 'inspections':
        return <InspectionPortal />;
      case 'agent':
        return <AgentPortal />;
      case 'users':
        return (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 space-y-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <p className="font-bold text-slate-500">Super Administrator Module</p>
            <p className="text-sm">Production Postgres Database: <span className="text-emerald-500 font-mono">fpis_postgres_v3</span></p>
            <p className="text-sm">Manage global system permissions and encryption keys.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-xs font-black uppercase tracking-[0.4em] animate-pulse">Initializing Production Environment...</p>
        </div>
      </div>
    );
  }

  if (view === 'about') {
    return <AboutPage onBack={() => setView('landing')} onAccess={() => setView('landing')} />;
  }

  if (view === 'landing') {
    return <LandingPage onAuthSuccess={handleAuthSuccess} onShowAbout={() => setView('about')} />;
  }

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      userRole={session?.role || UserRole.REVIEWER}
      userName={session?.name}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
