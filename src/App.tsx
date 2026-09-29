import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, ShieldAlert, Code2, Users, Building, Activity, 
  HelpCircle, Settings, Key, UserCheck, ShieldClose
} from 'lucide-react';
import { Partner, Customer, PortalUser, AuditLog, Lead, Task } from './types';
import { 
  INITIAL_PARTNERS, INITIAL_CUSTOMERS, INITIAL_USERS, 
  INITIAL_LEADS, INITIAL_TASKS, INITIAL_AUDITS 
} from './mockData';
import LoginScreen from './components/LoginScreen';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import PartnerDashboard from './components/PartnerDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import IntegrationGuide from './components/IntegrationGuide';
import LandingPage from './components/LandingPage';
import RequestAccessScreen from './components/RequestAccessScreen';
import MeddpiccPage from './components/MeddpiccPage';
import VizhinLogo from './components/VizhinLogo';
import VizhinCRMLogo from './components/VizhinCRMLogo';

export default function App() {
  // Navigation state for unauthenticated users (landing, login, sandbox request screen, or meddpicc guide)
  const [unauthScreen, setUnauthScreen] = useState<'landing' | 'login' | 'request' | 'meddpicc'>('landing');

  // Global Database state persisted to local storage
  const [partners, setPartners] = useState<Partner[]>(() => {
    const saved = localStorage.getItem('vzn_partners');
    return saved ? JSON.parse(saved) : INITIAL_PARTNERS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem('vzn_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [users, setUsers] = useState<PortalUser[]>(() => {
    const saved = localStorage.getItem('vzn_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed.map((u: PortalUser) => {
            if (u.email === 'super@vizhin.co') {
              return { ...u, email: 'rreifel@vizhin.co' };
            }
            return u;
          });
        }
      } catch (e) {
        console.error('Error parsing saved users, falling back to initial data', e);
      }
    }
    return INITIAL_USERS;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('vzn_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('vzn_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('vzn_audits');
    return saved ? JSON.parse(saved) : INITIAL_AUDITS();
  });

  // Authentication State
  const [currentUser, setCurrentUser] = useState<PortalUser | null>(() => {
    const saved = localStorage.getItem('vzn_current_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.email === 'super@vizhin.co') {
          return { ...parsed, email: 'rreifel@vizhin.co' };
        }
        return parsed;
      } catch (e) {
        console.error('Error parsing current user', e);
      }
    }
    return null;
  });

  // UI Active Navigation Section inside Main App
  const [activeWorkspace, setActiveWorkspace] = useState<'dashboard' | 'guide'>('dashboard');

  // Trigger LocalStorage save whenever backend registers a write operation
  useEffect(() => {
    localStorage.setItem('vzn_partners', JSON.stringify(partners));
  }, [partners]);

  useEffect(() => {
    localStorage.setItem('vzn_customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('vzn_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('vzn_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('vzn_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('vzn_audits', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('vzn_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('vzn_current_user');
    }
  }, [currentUser]);

  // Log successful session initiation
  const handleLoginSuccess = (user: PortalUser) => {
    const updatedUser = {
      ...user,
      lastLogin: new Date().toISOString()
    };
    
    // Update logged state
    setUsers(prev => prev.map(u => u.id === user.id ? updatedUser : u));
    setCurrentUser(updatedUser);

    // Append to security ledger
    const log: AuditLog = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toISOString(),
      actorEmail: user.email,
      action: 'USER_LOGIN_SUCCESS',
      ipAddress: '192.168.1.56',
      details: `User session active [${user.role}]. Granted isolated permissions.`,
      severity: 'info'
    };
    setAuditLogs(prev => [log, ...prev]);
  };

  const handleLogout = () => {
    if (currentUser) {
      const log: AuditLog = {
        id: `aud_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorEmail: currentUser.email,
        action: 'USER_LOGOUT',
        ipAddress: '192.168.1.56',
        details: 'User session closed successfully. Tokens expired.',
        severity: 'info'
      };
      setAuditLogs(prev => [log, ...prev]);
    }
    setCurrentUser(null);
    setActiveWorkspace('dashboard');
  };

  const resetToFactoryDefault = () => {
    localStorage.clear();
    setPartners(INITIAL_PARTNERS);
    setCustomers(INITIAL_CUSTOMERS);
    setUsers(INITIAL_USERS);
    setLeads(INITIAL_LEADS);
    setTasks(INITIAL_TASKS);
    setAuditLogs(INITIAL_AUDITS());
    setCurrentUser(null);
    alert('System Database reset to initial enterprise seed state!');
  };

  // If session is unauthenticated, show either modern landing page, the CRM portal login, or sandbox request page!
  if (!currentUser) {
    if (unauthScreen === 'landing') {
      return (
        <LandingPage 
          onEnterPortal={() => setUnauthScreen('login')}
          onRequestAccount={() => setUnauthScreen('request')}
          onNavigateMeddpicc={() => setUnauthScreen('meddpicc')}
        />
      );
    }

    if (unauthScreen === 'meddpicc') {
      return (
        <MeddpiccPage 
          onBack={() => setUnauthScreen('landing')}
          onEnterPortal={() => setUnauthScreen('login')}
          onRequestAccount={() => setUnauthScreen('request')}
        />
      );
    }

    if (unauthScreen === 'request') {
      return (
        <RequestAccessScreen 
          onBack={() => setUnauthScreen('landing')}
        />
      );
    }

    return (
      <div className="relative min-h-screen">
        <LoginScreen 
          onLoginSuccess={handleLoginSuccess}
          users={users}
          onBack={() => setUnauthScreen('landing')}
        />
      </div>
    );
  }

  // Calculate customized accent brand styling dynamically
  let resolvedLogo = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80';
  let resolvedAccent = '#3b82f6'; // Indigo Default
  let currentPartnerObj: Partner | null = null;
  let currentCustomerObj: Customer | null = null;

  if (currentUser.role === 'PARTNER_ADMIN' && currentUser.partnerId) {
    currentPartnerObj = partners.find(p => p.id === currentUser.partnerId) || null;
    if (currentPartnerObj) {
      resolvedLogo = currentPartnerObj.logoUrl;
      resolvedAccent = currentPartnerObj.accentColor;
    }
  } else if (currentUser.role === 'CUSTOMER_ADMIN' && currentUser.customerId) {
    currentCustomerObj = customers.find(c => c.id === currentUser.customerId) || null;
    if (currentCustomerObj) {
      // White label logic: If Customer belongs to a Partner, display the Partner's custom logo inside the top header wrapper!
      if (currentCustomerObj.partnerId) {
        currentPartnerObj = partners.find(p => p.id === currentCustomerObj!.partnerId) || null;
      }
      resolvedLogo = currentCustomerObj.logoUrl;
      resolvedAccent = currentCustomerObj.accentColor;
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-neutral-100 flex flex-col font-sans selection:bg-neutral-800" id="main_shell">
      
      {/* GLOBAL ENTERPRISE TOP NAVIGATION RAIL */}
      <header className="bg-neutral-900/60 border-b border-neutral-850 sticky top-0 backdrop-blur-md z-45 px-6 py-4 flex items-center justify-between" id="header_rail">
        <div className="flex items-center gap-6" id="header_branding">
          {/* Dynamically branded Logo */}
          <div className="flex items-center">
            {currentUser.role === 'SUPER_ADMIN' ? (
              <VizhinCRMLogo className="h-8 w-auto" />
            ) : (
              <div className="flex items-center gap-3">
                {resolvedLogo && (
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden bg-neutral-950 border border-neutral-805" style={{ borderColor: `${resolvedAccent}44` }}>
                    <img src={resolvedLogo} alt="Co Brand Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                )}
                <div>
                  <span className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                    {currentUser.role === 'PARTNER_ADMIN' && currentPartnerObj?.name}
                    {currentUser.role === 'CUSTOMER_ADMIN' && currentCustomerObj?.name}
                  </span>
                  <span className="text-[10px] block font-mono text-neutral-500 uppercase tracking-widest font-semibold">
                    {currentUser.role === 'PARTNER_ADMIN' && 'Reseller Co-Branded Portal'}
                    {currentUser.role === 'CUSTOMER_ADMIN' && 'Agency Portal Services'}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Switch for Developer Guidance Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-950/80 p-1 rounded-lg border border-neutral-800" id="header_nav">
            <button
              onClick={() => setActiveWorkspace('dashboard')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeWorkspace === 'dashboard' ? 'bg-neutral-850 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Portal Workspace
            </button>
            <button
              onClick={() => setActiveWorkspace('guide')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeWorkspace === 'guide' ? 'bg-neutral-850 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              Developer Integration Guide
            </button>
          </nav>
        </div>

        {/* Current user session & controls */}
        <div className="flex items-center gap-4" id="header_user_module">
          <div className="hidden sm:flex items-center gap-2.5 text-right">
            <div>
              <div className="text-xs font-bold text-neutral-200">{currentUser.name}</div>
              <div className="text-[10px] text-neutral-500 font-mono">{currentUser.email}</div>
            </div>
          </div>

          {/* Logout Trigger button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded bg-neutral-950 hover:bg-neutral-850 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5 text-xs font-semibold"
            title="Disconnect portal terminal safely"
            id="btn_logout"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* DEV WATERMARK WARNING BAR */}
      <div className="bg-gradient-to-r from-[#0D5C46]/80 via-slate-900 to-emerald-950/80 px-6 py-2 border-b border-emerald-900/40 text-center text-[10px] md:text-xs text-emerald-300 font-medium font-mono flex items-center justify-center gap-2" id="dev_alert_strip">
        <Activity className="w-3.5 h-3.5 animate-pulse text-emerald-400 shrink-0" />
        <span>DEVELOPMENT SANDBOX ACTIVE: Access is restricted and credentials verification is protected. Click the <strong>Developer Integration Guide</strong> tab to view tables & recipes.</span>
        <button 
          onClick={resetToFactoryDefault}
          className="underline text-yellow-400 font-semibold hover:text-yellow-300 cursor-pointer ml-2 shrink-0"
        >
          Reset Demo Database
        </button>
      </div>

      {/* MAIN CONTAINER CONTENT SECTION */}
      <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto" id="main_layout_body">
        <AnimatePresence mode="wait">
          {activeWorkspace === 'guide' ? (
            <motion.div
              key="guide_view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              <IntegrationGuide />
            </motion.div>
          ) : (
            <motion.div
              key="workspace_view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
            >
              {/* Conditional dashboards depending on resolved role */}
              {currentUser.role === 'SUPER_ADMIN' && (
                <SuperAdminDashboard
                  currentUser={currentUser}
                  partners={partners}
                  setPartners={setPartners}
                  customers={customers}
                  setCustomers={setCustomers}
                  users={users}
                  setUsers={setUsers}
                  auditLogs={auditLogs}
                  setAuditLogs={setAuditLogs}
                />
              )}

              {currentUser.role === 'PARTNER_ADMIN' && currentPartnerObj && (
                <PartnerDashboard
                  currentUser={currentUser}
                  currentPartner={currentPartnerObj}
                  setPartners={setPartners}
                  customers={customers}
                  setCustomers={setCustomers}
                  users={users}
                  setUsers={setUsers}
                  setAuditLogs={setAuditLogs}
                />
              )}

              {currentUser.role === 'CUSTOMER_ADMIN' && currentCustomerObj && (
                <CustomerDashboard
                  currentUser={currentUser}
                  currentCustomer={currentCustomerObj}
                  currentPartner={currentPartnerObj}
                  leads={leads}
                  setLeads={setLeads}
                  tasks={tasks}
                  setTasks={setTasks}
                  users={users}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER CO-BRAND BANNER */}
      <footer className="mt-12 bg-neutral-905 border-t border-neutral-850 py-8 px-6 text-center text-xs text-neutral-500 font-mono" id="app_footer">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl w-full mx-auto">
          <div>
            VIZHIN TECHNOLOGIES CO • ACTIVE ROLE SECURE PORTAL
          </div>
          <div className="flex gap-4">
            <span className="hover:text-neutral-400 transition-colors">SSL Secured</span>
            <span>•</span>
            <span className="hover:text-neutral-400 transition-colors">Supabase Connected</span>
            <span>•</span>
            <span className="hover:text-neutral-400 transition-colors">Enterprise Isolation</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
