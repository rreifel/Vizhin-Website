import React, { useState } from 'react';
import { 
  Building2, Users, Network, Shield, ArrowRight, ArrowLeft,
  Lock, Mail, User, CheckCircle2, AlertTriangle, Sparkles, 
  Radio, FileSpreadsheet, ShieldAlert, ShieldCheck, ExternalLink,
  ChevronRight, Eye, EyeOff, Zap, Check, Server, Maximize2
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface VizhinOrgPageProps {
  onBack: () => void;
  onEnterPortal: () => void;
  onRequestAccount: () => void;
  onNavigateMeddpicc: () => void;
  onNavigateMarketingAnalysis?: () => void;
}

const REGISTERED_CORPORATE_EMAILS = [
  'rreifel@vizhin.co',
  'sarah.connor@strataorg.com',
  'david.chen@strataorg.com',
  'elena.rostova@strataorg.com',
  'cpo@vizhin.co',
  'revops@vizhin.co'
];

export default function VizhinOrgPage({
  onBack,
  onEnterPortal,
  onRequestAccount,
  onNavigateMeddpicc,
  onNavigateMarketingAnalysis,
}: VizhinOrgPageProps) {
  // Mode: Default directly to 'workspace' so no second click is needed!
  const [viewMode, setViewMode] = useState<'workspace' | 'auth'>('workspace');

  // Auth Mode: 'signin' | 'signup' | 'forgot-password' | 'forgot-username'
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot-password' | 'forgot-username'>('signin');
  const [step, setStep] = useState<1 | 2>(1);

  // If already registered user attempts new workspace creation
  const [isExistingUserRedirected, setIsExistingUserRedirected] = useState(false);
  const [redirectedWarningEmail, setRedirectedWarningEmail] = useState<string | null>(null);

  // Sign In Form Fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Sign Up Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [companyName, setCompanyName] = useState('');

  // Recovery States
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);

  const [forgotUsernameEmail, setForgotUsernameEmail] = useState('');
  const [forgotUsernameSubmitted, setForgotUsernameSubmitted] = useState(false);

  // Department branch filter and preview node
  const [selectedBranch, setSelectedBranch] = useState<string>('all');
  const [selectedPreviewNode, setSelectedPreviewNode] = useState<string>('sarah');

  const standaloneAppUrl = "https://ais-dev-k3dq5q47ugexrlhpj2wpqo-615362750641.us-west2.run.app";

  const handleOpenAppNewTab = () => {
    window.open(standaloneAppUrl, '_blank');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setViewMode('workspace');
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = workEmail.trim().toLowerCase();

    if (!firstName.trim() || !lastName.trim() || !cleanEmail || !companyName.trim()) {
      return;
    }

    const isAlreadyRegistered = REGISTERED_CORPORATE_EMAILS.some(
      e => e.toLowerCase() === cleanEmail
    ) || cleanEmail.endsWith('@vizhin.co');

    if (isAlreadyRegistered) {
      setIsExistingUserRedirected(true);
      setRedirectedWarningEmail(cleanEmail);
      setLoginEmail(cleanEmail);
      setLoginPassword('');
      setAuthMode('signin');
      return;
    }

    setStep(2);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-neutral-950">
      
      {/* 1. COMPLETE VIZHIN.CO SITE HEADER */}
      <SiteHeader
        currentPage="org"
        onNavigateHome={onBack}
        onNavigateMeddpicc={onNavigateMeddpicc}
        onNavigateMarketingAnalysis={onNavigateMarketingAnalysis}
        onEnterPortal={onEnterPortal}
        onEnterOrg={() => {
          setViewMode('workspace');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRequestAccount={onRequestAccount}
      />

      {/* 2. SUB-HERO TOOLBAR */}
      <div className="border-b border-neutral-900 bg-[#0a0b0d]/90 px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-400">
            <button 
              onClick={onBack}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Home</span>
            </button>
            <span className="text-neutral-600">/</span>
            <span className="text-emerald-400 font-semibold font-mono">VIZHIN ORG</span>
            <span className="text-neutral-600">/</span>
            <span className="text-neutral-300 font-medium">
              {viewMode === 'workspace' ? 'Interactive Standalone Workspace' : 'Authentication & Tenant Setup'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'workspace' ? 'auth' : 'workspace')}
              className="text-[11px] font-mono text-neutral-400 hover:text-white transition-colors underline cursor-pointer"
            >
              {viewMode === 'workspace' ? 'Open Auth & Recovery Terminal ⚙' : '← Back to Live Workspace'}
            </button>

            <button 
              onClick={handleOpenAppNewTab}
              className="px-3 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-[11px] font-mono text-emerald-400 border border-neutral-800 hover:border-emerald-500/60 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Open full standalone application in new tab"
            >
              <span>Full Screen Window</span>
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE OR AUTH CONTAINER */}
      {viewMode === 'workspace' ? (
        /* =====================================================================
           DIRECT STANDALONE WORKSPACE (No Second Click Required!)
           ===================================================================== */
        <div className="flex-1 w-full bg-slate-200 flex flex-col relative h-[calc(100vh-112px)] min-h-[750px]">
          <iframe
            src={standaloneAppUrl}
            title="VizhinORG Standalone Interactive Workspace"
            className="w-full h-full border-0 flex-1"
            allow="clipboard-write"
          />
        </div>
      ) : (
        /* =====================================================================
           OPTIONAL AUTH & RECOVERY TERMINAL
           ===================================================================== */
        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 lg:py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Pane: Org Chart Simulation Preview */}
          <section className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[10px] font-mono uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Enterprise Workforce Architecture</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Recursive RBAC Org Charts & Performance Calibration
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl">
                Deterministic PostgreSQL CTE ancestry permissions, two-pass HRIS roster ingestion, and executive review calibration across multi-tenant enterprise hierarchies.
              </p>
            </div>

            <div className="bg-[#0c0d10] border border-neutral-800/90 rounded-2xl p-4 shadow-2xl relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80 text-xs">
                <span className="font-mono font-bold text-neutral-200 text-[11px]">HIERARCHY SIMULATION</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                  Recursive RBAC Active
                </span>
              </div>

              <div className="py-4 text-center">
                <button
                  type="button"
                  onClick={() => setViewMode('workspace')}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Enter Live Org Chart Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </section>

          {/* Right Pane: Auth Terminal Card */}
          <section className="lg:col-span-5 w-full">
            <div className="bg-[#0c0d10] rounded-2xl shadow-2xl border border-neutral-800/90 overflow-hidden backdrop-blur-sm p-6 space-y-4">
              <h2 className="text-base font-bold text-white">Sign In to VizhinORG</h2>
              <p className="text-xs text-neutral-400">Enter your corporate email and password.</p>

              <form onSubmit={handleLoginSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Corporate Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-[#08090b] border border-neutral-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-[#08090b] border border-neutral-800 rounded-lg text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold text-xs rounded-lg transition-all"
                >
                  Sign In to Workspace
                </button>
              </form>
            </div>
          </section>

        </main>
      )}

      {/* 4. COMPLETE VIZHIN.CO CORPORATE FOOTER */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-6 px-6 text-center text-xs text-neutral-500 font-mono z-10 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>VIZHIN LLC • SECURED WORKFORCE ARCHITECTURE & RECURSIVE RBAC SYSTEMS</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>SOC-2 Type II</span>
            <span>·</span>
            <span>Deterministic RLS Isolation</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
