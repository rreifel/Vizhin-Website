import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LogOut, ShieldAlert, Code2, Users, Building, Activity, 
  HelpCircle, Settings, Key, UserCheck, ShieldClose, ChevronDown, Network, Building2
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
import MarketingAnalysisPage from './components/MarketingAnalysisPage';
import JointDeliveryPartnersPage from './components/JointDeliveryPartnersPage';
import AboutPage from './components/AboutPage';
import StrategicGtmAnalysisPage from './components/StrategicGtmAnalysisPage';
import GtmTechPage from './components/GtmTechPage';
import AuditCompliancePage from './components/AuditCompliancePage';
import MarketingServicesPage from './components/MarketingServicesPage';
import SalesTeamAccountabilityPage from './components/SalesTeamAccountabilityPage';
import SalesHiringStrategyPage from './components/SalesHiringStrategyPage';
import TechnologyProjectManagementPage from './components/TechnologyProjectManagementPage';
import ContactPage from './components/ContactPage';
import OrgComingSoonPage from './components/OrgComingSoonPage';
import VizhinOrgPage from "./components/VizhinOrgPage";
import VizhinOrgLoginScreen from './components/VizhinOrgLoginScreen';
import VizhinLogo from './components/VizhinLogo';
import VizhinCRMLogo from './components/VizhinCRMLogo';
import { USE_STANDALONE_VIZHIN_ORG, redirectToVizhinOrg, getVizhinOrgUrl } from './config/orgRouting';

export default function App() {
  type AppScreen = "landing" | "contact" | "login" | "org" | "orgdemo" | "request" | "meddpicc" | "marketing-analysis" | "partners" | "about" | "strategic-gtm-analysis" | "gtm-tech" | "audit-compliance" | "marketing-services" | "sales-team-accountability" | "sales-hiring-strategy" | "technology-project-management" | "portal";

  // Navigation state for unauthenticated users (landing, login, org-login, sandbox request screen, meddpicc guide, or marketing analysis)
  const getInitialScreen = (): AppScreen => {
    if (typeof window !== "undefined") {
      const p = window.location.pathname.toLowerCase();
      if (p === "/contact" || p === "/contact/" || p.startsWith("/contact")) {
        return "contact";
      }
      if (p === "/orgdemo" || p.startsWith("/orgdemo/")) {
        if (USE_STANDALONE_VIZHIN_ORG) {
          redirectToVizhinOrg('/org/ORGdemo');
        }
        return "orgdemo";
      }
      if (p === "/org" || p === "/org/" || p.startsWith("/org")) {
        return "org";
      }
      if (p === "/meddpicc") return "meddpicc";
      if (p === "/marketing-analysis" || p === "/revenue-analytics" || p.startsWith("/marketing-analysis")) return "marketing-analysis";
      if (p === "/gtm" || p === "/gtm/" || p === "/strategic-gtm-analysis" || p === "/strategic-go-to-market-analysis" || p.startsWith("/strategic-gtm-analysis")) return "strategic-gtm-analysis";
      if (p === "/gtm-tech" || p === "/gtm-technology-stack-optimization" || p.startsWith("/gtm-tech")) return "gtm-tech";
      if (p === "/audit-compliance" || p === "/sales-governance" || p === "/audit-readiness" || p.startsWith("/audit-compliance")) return "audit-compliance";
      if (p === "/marketing-services" || p === "/sales-marketing-integration" || p === "/sales-marketing-alignment" || p.startsWith("/marketing-services")) return "marketing-services";
      if (p === "/sales-team-accountability" || p === "/sales-team-kpis" || p === "/sales-accountability" || p.startsWith("/sales-team-accountability") || p.startsWith("/sales-team-kpis")) return "sales-team-accountability";
      if (p === "/sales-hiring-strategy" || p === "/sales-hiring" || p.startsWith("/sales-hiring-strategy") || p.startsWith("/sales-hiring")) return "sales-hiring-strategy";
      if (p === "/technology-project-management" || p === "/project-management" || p === "/software-selection" || p.startsWith("/technology-project-management") || p.startsWith("/project-management")) return "technology-project-management";
      if (p === "/joint-delivery-partners" || p === "/partners/joint_delivery" || p === "/partners" || p.startsWith("/partners/")) return "partners";
      if (p === "/company/about" || p === "/about" || p.startsWith("/company/about")) return "about";
      if (p === "/login") return "login";
      if (p === "/request") return "request";
      if (p === "/portal") return "portal";
    }
    return "landing";
  };

  const [unauthScreen, setUnauthScreen] = useState<AppScreen>(getInitialScreen);

  const navigateTo = (screen: AppScreen) => {
    setUnauthScreen(screen);
    if (typeof window !== "undefined") {
      let p = "/";
      if (screen === "contact") p = "/contact";
      else if (screen === "org") p = "/org";
      else if (screen === "orgdemo") p = "/ORGdemo";
      else if (screen === "meddpicc") p = "/meddpicc";
      else if (screen === "marketing-analysis") p = "/marketing-analysis";
      else if (screen === "strategic-gtm-analysis") p = "/gtm";
      else if (screen === "gtm-tech") p = "/gtm-tech";
      else if (screen === "audit-compliance") p = "/audit-compliance";
      else if (screen === "marketing-services") p = "/marketing-services";
      else if (screen === "sales-team-accountability") p = "/sales-team-accountability";
      else if (screen === "sales-hiring-strategy") p = "/sales-hiring-strategy";
      else if (screen === "technology-project-management") p = "/technology-project-management";
      else if (screen === "partners") p = "/Partners/Joint_Delivery";
      else if (screen === "about") p = "/Company/About";
      else if (screen === "login") p = "/login";
      else if (screen === "request") p = "/request";
      else if (screen === "portal") p = "/portal";
      window.history.pushState({ screen }, "", p);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setUnauthScreen(getInitialScreen());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }

      if (unauthScreen === 'audit-compliance') {
        document.title = 'Sales Governance & Audit Readiness Consulting | Vizhin';
        meta.setAttribute(
          'content',
          'Vizhin prepares sales teams for review by senior managers and boards, verifying partner accountability, access, and audit trails for due diligence.'
        );
      } else if (unauthScreen === 'gtm-tech') {
        document.title = 'GTM Technology Stack Optimization | Vizhin Consulting';
        meta.setAttribute(
          'content',
          'Vizhin audits and optimizes CRM, email, revenue operations, and conversation intelligence tools so your GTM stack drives pipeline instead of slowing it down.'
        );
      } else if (unauthScreen === 'strategic-gtm-analysis') {
        document.title = 'Go-to-Market Strategy Analysis | Vizhin Consulting';
        meta.setAttribute(
          'content',
          'Uncover hidden friction in your revenue engine. Vizhin analyzes target verticals, pricing, and buyer personas to realign your sales strategy for growth.'
        );
      } else if (unauthScreen === 'marketing-services') {
        document.title = 'Sales & Marketing Alignment Services | Vizhin';
        meta.setAttribute(
          'content',
          'Bridge marketing and sales so every asset feeds your pipeline. Vizhin aligns messaging, testimonials, and campaigns to accelerate deals and revenue.'
        );
      } else if (unauthScreen === 'marketing-analysis') {
        document.title = 'Marketing ROI & Revenue Analytics Consulting | Vizhin';
        meta.setAttribute(
          'content',
          'Stop guessing which marketing drives revenue. Vizhin maps funnel attribution and ROI from first click to closed-won deal, so you can scale what works.'
        );
      } else if (unauthScreen === 'sales-team-accountability') {
        document.title = 'Sales Team KPIs & Accountability Framework | Vizhin';
        meta.setAttribute(
          'content',
          'Shift from activity-driven to outcome-focused sales. Vizhin builds KPIs, pipeline reviews, and accountability structures that help reps consistently hit targets.'
        );
      } else if (unauthScreen === 'sales-hiring-strategy') {
        document.title = 'Sales Hiring Strategy & Recruiting Consulting | Vizhin';
        meta.setAttribute(
          'content',
          'End bad sales hires and missed quotas. Vizhin builds a metrics-driven vetting, scorecard, and 30-60-90 onboarding system to hire reps who consistently produce.'
        );
      } else if (unauthScreen === 'technology-project-management') {
        document.title = 'Technology Project Management & Software Selection | Vizhin';
        meta.setAttribute(
          'content',
          'De-risk software selection, migration, and implementation. Vizhin provides platform-agnostic oversight so your technology investments deliver value on time.'
        );
      } else if (unauthScreen === 'contact') {
        document.title = 'Contact Vizhin | Go-to-Market Consulting';
        meta.setAttribute(
          'content',
          'Contact Vizhin to discuss go-to-market strategy, sales performance, and sales hiring. Give us a little info and we\'ll send you right to the scheduling link.'
        );
      } else if (unauthScreen === 'org') {
        document.title = 'ORGVizhin - Workforce Architecture | Coming Soon | Vizhin';
        meta.setAttribute(
          'content',
          'ORGVizhin is coming soon. Workforce architecture, dynamic org visualization, and team alignment. Request early notification at vizhin.co/org.'
        );
      } else {
        document.title = 'Go-to-Market Consulting & Fractional VP of Sales | Vizhin';
        meta.setAttribute(
          'content',
          'Vizhin helps growth-stage companies align sales and marketing, fix CRM and pipeline friction, and build accountable teams that predictably grow revenue.'
        );
      }
    }
  }, [unauthScreen]);

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
    setOrgInitialView('coming-soon');

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

  const [orgInitialView, setOrgInitialView] = useState<'coming-soon' | 'terminal' | 'chart'>(() => {
    return currentUser ? 'coming-soon' : 'terminal';
  });
  const [crmSignOutDropdownOpen, setCrmSignOutDropdownOpen] = useState(false);

  const handleLogout = () => {
    if (currentUser) {
      const log: AuditLog = {
        id: `aud_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorEmail: currentUser.email,
        action: 'USER_LOGOUT_ALL',
        ipAddress: '192.168.1.56',
        details: 'User session closed successfully across all platforms. Tokens expired.',
        severity: 'info'
      };
      setAuditLogs(prev => [log, ...prev]);
    }
    setCurrentUser(null);
    localStorage.removeItem('vzn_current_user');
    setOrgInitialView('terminal');
    setActiveWorkspace('dashboard');
    navigateTo('landing');
  };

  const handleSignOutOrg = () => {
    if (currentUser) {
      const log: AuditLog = {
        id: `aud_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorEmail: currentUser.email,
        action: 'USER_LOGOUT_VIZHINORG',
        ipAddress: '192.168.1.56',
        details: 'User logged out of VizhinORG. Returned to split setup/sign-in screen.',
        severity: 'info'
      };
      setAuditLogs(prev => [log, ...prev]);
    }
    // Fully clear authenticated user session
    setCurrentUser(null);
    localStorage.removeItem('vzn_current_user');
    // Return to split setup / sign-in screen on VizhinORG
    setOrgInitialView('terminal');
    navigateTo('org');
  };

  const handleSignOutCRM = () => {
    if (currentUser) {
      const log: AuditLog = {
        id: `aud_${Date.now()}`,
        timestamp: new Date().toISOString(),
        actorEmail: currentUser.email,
        action: 'USER_LOGOUT_VIZHINCRM',
        ipAddress: '192.168.1.56',
        details: 'User logged out of VizhinCRM. Returned to CRM setup / login screen.',
        severity: 'info'
      };
      setAuditLogs(prev => [log, ...prev]);
    }
    setCurrentUser(null);
    localStorage.removeItem('vzn_current_user');
    setActiveWorkspace('dashboard');
    navigateTo('login');
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

  const handleEnterOrg = () => {
    if (typeof window !== 'undefined') {
      window.location.assign('https://www.orgvizhin.com');
    }
  };

  // Screen routing for both authenticated and unauthenticated sessions
  if (unauthScreen === 'landing') {
    return (
      <LandingPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateStrategicGtmAnalysis={() => navigateTo('strategic-gtm-analysis')}
        onNavigateGtmTech={() => navigateTo('gtm-tech')}
        onNavigateAuditCompliance={() => navigateTo('audit-compliance')}
        onNavigateMarketingServices={() => navigateTo('marketing-services')}
        onNavigateSalesTeamAccountability={() => navigateTo('sales-team-accountability')}
        onNavigateSalesHiringStrategy={() => navigateTo('sales-hiring-strategy')}
        onNavigateTechnologyProjectManagement={() => navigateTo('technology-project-management')}
      />
    );
  }

  if (unauthScreen === 'contact') {
    return (
      <ContactPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateStrategicGtmAnalysis={() => navigateTo('strategic-gtm-analysis')}
        onNavigateGtmTech={() => navigateTo('gtm-tech')}
        onNavigateAuditCompliance={() => navigateTo('audit-compliance')}
        onNavigateMarketingServices={() => navigateTo('marketing-services')}
        onNavigateSalesTeamAccountability={() => navigateTo('sales-team-accountability')}
        onNavigateSalesHiringStrategy={() => navigateTo('sales-hiring-strategy')}
        onNavigateTechnologyProjectManagement={() => navigateTo('technology-project-management')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'strategic-gtm-analysis') {
    return (
      <StrategicGtmAnalysisPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateStrategicGtmAnalysis={() => navigateTo('strategic-gtm-analysis')}
        onNavigateGtmTech={() => navigateTo('gtm-tech')}
        onNavigateAuditCompliance={() => navigateTo('audit-compliance')}
        onNavigateMarketingServices={() => navigateTo('marketing-services')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'gtm-tech') {
    return (
      <GtmTechPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateStrategicGtmAnalysis={() => navigateTo('strategic-gtm-analysis')}
        onNavigateGtmTech={() => navigateTo('gtm-tech')}
        onNavigateAuditCompliance={() => navigateTo('audit-compliance')}
        onNavigateMarketingServices={() => navigateTo('marketing-services')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'audit-compliance') {
    return (
      <AuditCompliancePage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateStrategicGtmAnalysis={() => navigateTo('strategic-gtm-analysis')}
        onNavigateGtmTech={() => navigateTo('gtm-tech')}
        onNavigateAuditCompliance={() => navigateTo('audit-compliance')}
        onNavigateMarketingServices={() => navigateTo('marketing-services')}
        onNavigateSalesTeamAccountability={() => navigateTo('sales-team-accountability')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'marketing-services') {
    return (
      <MarketingServicesPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateStrategicGtmAnalysis={() => navigateTo('strategic-gtm-analysis')}
        onNavigateGtmTech={() => navigateTo('gtm-tech')}
        onNavigateAuditCompliance={() => navigateTo('audit-compliance')}
        onNavigateMarketingServices={() => navigateTo('marketing-services')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'meddpicc') {
    return (
      <MeddpiccPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onBack={() => navigateTo('landing')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
      />
    );
  }

  if (unauthScreen === 'marketing-analysis') {
    return (
      <MarketingAnalysisPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onBack={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateStrategicGtmAnalysis={() => navigateTo('strategic-gtm-analysis')}
        onNavigateMarketingServices={() => navigateTo('marketing-services')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'sales-team-accountability') {
    return (
      <SalesTeamAccountabilityPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateStrategicGtmAnalysis={() => navigateTo('strategic-gtm-analysis')}
        onNavigateGtmTech={() => navigateTo('gtm-tech')}
        onNavigateAuditCompliance={() => navigateTo('audit-compliance')}
        onNavigateMarketingServices={() => navigateTo('marketing-services')}
        onNavigateSalesTeamAccountability={() => navigateTo('sales-team-accountability')}
        onNavigateSalesHiringStrategy={() => navigateTo('sales-hiring-strategy')}
        onNavigateTechnologyProjectManagement={() => navigateTo('technology-project-management')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'sales-hiring-strategy') {
    return (
      <SalesHiringStrategyPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateStrategicGtmAnalysis={() => navigateTo('strategic-gtm-analysis')}
        onNavigateGtmTech={() => navigateTo('gtm-tech')}
        onNavigateAuditCompliance={() => navigateTo('audit-compliance')}
        onNavigateMarketingServices={() => navigateTo('marketing-services')}
        onNavigateSalesTeamAccountability={() => navigateTo('sales-team-accountability')}
        onNavigateSalesHiringStrategy={() => navigateTo('sales-hiring-strategy')}
        onNavigateTechnologyProjectManagement={() => navigateTo('technology-project-management')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'technology-project-management') {
    return (
      <TechnologyProjectManagementPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateStrategicGtmAnalysis={() => navigateTo('strategic-gtm-analysis')}
        onNavigateGtmTech={() => navigateTo('gtm-tech')}
        onNavigateAuditCompliance={() => navigateTo('audit-compliance')}
        onNavigateMarketingServices={() => navigateTo('marketing-services')}
        onNavigateSalesTeamAccountability={() => navigateTo('sales-team-accountability')}
        onNavigateSalesHiringStrategy={() => navigateTo('sales-hiring-strategy')}
        onNavigateTechnologyProjectManagement={() => navigateTo('technology-project-management')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'partners') {
    return (
      <JointDeliveryPartnersPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'about') {
    return (
      <AboutPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'orgdemo') {
    if (USE_STANDALONE_VIZHIN_ORG) {
      if (typeof window !== 'undefined') {
        redirectToVizhinOrg('/org/ORGdemo');
      }
      return (
        <div className="min-h-screen bg-[#070708] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 mb-5 animate-pulse shadow-lg shadow-cyan-950/50">
            <Network className="w-7 h-7" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Connecting to VizhinORG...</h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md mb-6 leading-relaxed">
            Redirecting to the 100-employee workforce architecture workspace in the standalone Remix VizhinORG project.
          </p>
          <div className="flex items-center gap-3">
            <a
              href={getVizhinOrgUrl('/ORGdemo')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
            >
              <span>Launch Workspace Manually</span>
              <span className="font-mono">→</span>
            </a>
            <button
              onClick={() => navigateTo('landing')}
              className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 rounded-xl text-xs font-semibold cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      );
    }

    return (
      <VizhinOrgPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onLoginSuccess={handleLoginSuccess}
        initialViewMode="chart"
        onBack={() => navigateTo('landing')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateOrgDemo={() => navigateTo('orgdemo')}
      />
    );
  }

  if (unauthScreen === 'org') {
    return (
      <OrgComingSoonPage 
        currentUser={currentUser}
        onSignOut={handleLogout}
        onSignOutOrg={handleSignOutOrg}
        onSignOutCRM={handleSignOutCRM}
        onSwitchUser={handleLoginSuccess}
        onNavigateHome={() => navigateTo('landing')}
        onNavigateMeddpicc={() => navigateTo('meddpicc')}
        onNavigateMarketingAnalysis={() => navigateTo('marketing-analysis')}
        onNavigateJointDeliveryPartners={() => navigateTo('partners')}
        onNavigateAbout={() => navigateTo('about')}
        onNavigateStrategicGtmAnalysis={() => navigateTo('strategic-gtm-analysis')}
        onNavigateGtmTech={() => navigateTo('gtm-tech')}
        onNavigateAuditCompliance={() => navigateTo('audit-compliance')}
        onNavigateMarketingServices={() => navigateTo('marketing-services')}
        onNavigateSalesTeamAccountability={() => navigateTo('sales-team-accountability')}
        onNavigateSalesHiringStrategy={() => navigateTo('sales-hiring-strategy')}
        onNavigateTechnologyProjectManagement={() => navigateTo('technology-project-management')}
        onEnterPortal={() => navigateTo(currentUser ? 'portal' : 'login')}
        onEnterOrg={handleEnterOrg}
        onRequestAccount={() => navigateTo('request')}
      />
    );
  }

  if (unauthScreen === 'request') {
    return (
      <RequestAccessScreen 
        onBack={() => navigateTo('landing')}
      />
    );
  }

  // If on login route and not yet authenticated, render LoginScreen
  if (!currentUser) {
    return (
      <div className="relative min-h-screen">
        <LoginScreen 
          onLoginSuccess={handleLoginSuccess}
          users={users}
          onBack={() => navigateTo('landing')}
          onSwitchToOrg={() => navigateTo('org')}
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

          {/* Global Multi-Platform Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-neutral-950/80 p-1 rounded-lg border border-neutral-800" id="header_nav">
            <button
              onClick={() => setActiveWorkspace('dashboard')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                activeWorkspace === 'dashboard' ? 'bg-neutral-850 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              CRM Portal
            </button>
            <button
              onClick={() => navigateTo('org')}
              className="px-3 py-1.5 text-xs font-semibold rounded-md transition-colors text-neutral-400 hover:text-white cursor-pointer"
            >
              VizhinORG
            </button>
            <button
              onClick={() => navigateTo('meddpicc')}
              className="px-3 py-1.5 text-xs font-semibold rounded-md transition-colors text-neutral-400 hover:text-white cursor-pointer"
            >
              MEDDPICC
            </button>
            <button
              onClick={() => navigateTo('landing')}
              className="px-3 py-1.5 text-xs font-semibold rounded-md transition-colors text-neutral-400 hover:text-white cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => setActiveWorkspace('guide')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 cursor-pointer ${
                activeWorkspace === 'guide' ? 'bg-neutral-850 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              Dev Guide
            </button>
          </nav>
        </div>

        {/* Current user session & controls */}
        <div className="flex items-center gap-3 sm:gap-4" id="header_user_module">
          <div className="hidden sm:flex items-center gap-2.5 text-right">
            <div>
              <div className="text-xs font-bold text-neutral-200">{currentUser.name}</div>
              <div className="text-[10px] text-neutral-500 font-mono">{currentUser.email}</div>
            </div>
          </div>

          {/* Logout Trigger button with dropdown */}
          <div className="relative">
            <button
              onClick={() => setCrmSignOutDropdownOpen(prev => !prev)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900/90 border border-red-800/70 text-red-300 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1.5 text-xs font-bold shadow-xs hover:scale-105"
              title="Select application to sign out of"
              id="btn_logout"
            >
              <LogOut className="w-4 h-4 text-red-400" />
              <span>Sign Out</span>
              <ChevronDown className={`w-3 h-3 text-red-300 transition-transform ${crmSignOutDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {crmSignOutDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-neutral-950/95 border border-neutral-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-md">
                <div className="px-2.5 py-1.5 border-b border-neutral-800/80 mb-1.5">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                    Select App to Sign Out
                  </p>
                  <p className="text-[11px] text-neutral-300 font-medium">
                    Choose which platform to disconnect:
                  </p>
                </div>

                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setCrmSignOutDropdownOpen(false);
                      handleSignOutOrg();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-900 transition-colors flex items-start gap-3 cursor-pointer group border border-transparent hover:border-cyan-800/60"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                      <Network className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-neutral-200 group-hover:text-cyan-400 transition-colors">
                          Sign Out of VizhinORG
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                        Returns to the split setup & sign-in screen
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCrmSignOutDropdownOpen(false);
                      handleSignOutCRM();
                    }}
                    className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-900 transition-colors flex items-start gap-3 cursor-pointer group border border-transparent hover:border-emerald-800/60"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform mt-0.5">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-neutral-200 group-hover:text-emerald-400 transition-colors">
                          Sign Out of VizhinCRM
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                        Returns to the CRM setup / login screen
                      </p>
                    </div>
                  </button>
                </div>

                <div className="pt-2 mt-2 border-t border-neutral-800/80">
                  <button
                    type="button"
                    onClick={() => {
                      setCrmSignOutDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full py-2 px-3 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 hover:text-white border border-red-800/60 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-400" />
                    <span>Sign Out of All Platforms</span>
                  </button>
                </div>
              </div>
            )}
          </div>
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
