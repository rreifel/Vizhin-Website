import React, { useState } from 'react';
import { 
  Building2, 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  CheckCircle2, 
  Radio, 
  FileSpreadsheet, 
  ShieldAlert, 
  ChevronDown, 
  Briefcase, 
  Network, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  KeyRound, 
  HelpCircle, 
  AlertTriangle, 
  Layers, 
  LockKeyhole, 
  Server, 
  Check, 
  Shield, 
  ArrowLeft, 
  Maximize2 
} from 'lucide-react';
import SiteHeader from './SiteHeader';
import { MovieOrgChartView } from './OrgChart/MovieOrgChartView';

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
  // Mode: 'signin' (default per requirement) | 'signup' | 'forgot-password' | 'forgot-username'
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'forgot-password' | 'forgot-username'>('signin');
  
  // Full 100-employee Cinema Tech Org Chart View
  const [isFullOrgChartOpen, setIsFullOrgChartOpen] = useState(false);
  
  // Step for Signup: 1 = Initial account creation; 2 = Inverted Sandbox choice
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

  // Node selection in sample preview
  const [selectedPreviewNode, setSelectedPreviewNode] = useState<string>('sarah');
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  const standaloneAppUrl = "https://ais-dev-k3dq5q47ugexrlhpj2wpqo-615362750641.us-west2.run.app";

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    setIsFullOrgChartOpen(true);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = workEmail.trim().toLowerCase();

    if (!firstName.trim() || !lastName.trim() || !cleanEmail || !companyName.trim()) {
      return;
    }

    // CHECK IF EMAIL IS ALREADY REGISTERED
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

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotPasswordEmail.trim()) return;
    setForgotPasswordSubmitted(true);
  };

  const handleForgotUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotUsernameEmail.trim()) return;
    setForgotUsernameSubmitted(true);
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
          setIsFullOrgChartOpen(false);
          setAuthMode('signin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRequestAccount={onRequestAccount}
      />

      {/* =========================================================================
          FULL 100-EMPLOYEE CINEMA TECH ORG CHART (Triggered by Clicking Preview Sample)
          ========================================================================= */}
      {isFullOrgChartOpen ? (
        <div className="flex-1 flex flex-col w-full animate-in fade-in duration-200">
          <MovieOrgChartView onBackToLogin={() => setIsFullOrgChartOpen(false)} />
        </div>
      ) : (
        /* =========================================================================
            MODEL 1: SPLIT-PANE EXECUTIVE TERMINAL LAYOUT
            ========================================================================= */
        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 lg:py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ---------------------------------------------------------------------
              LEFT PANE: Interactive Org Architecture & Trust Signals (7 cols)
              --------------------------------------------------------------------- */}
          <section className="lg:col-span-7 space-y-6">
            
            {/* Header Title & Badges */}
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[10px] font-mono uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Enterprise Workforce Architecture</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Recursive RBAC Org Charts & Performance Intelligence
              </h1>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl">
                Deterministic PostgreSQL CTE ancestry permissions, two-pass HRIS roster ingestion, and executive review calibration across multi-tenant enterprise hierarchies.
              </p>
            </div>

            {/* Interactive Org Chart Simulation Preview - Light Grey Background with Pure White Boxes & Black Text */}
            <div 
              onClick={() => setIsFullOrgChartOpen(true)}
              className="bg-slate-200 border-2 border-slate-300 hover:border-emerald-500 rounded-2xl p-4 sm:p-5 shadow-2xl relative overflow-hidden transition-all cursor-pointer group select-none"
              title="Click to open the full 100-employee interactive org chart"
            >
              
              {/* Subtle dot grid on preview canvas */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  backgroundImage: 'radial-gradient(circle, #94a3b8 1.5px, transparent 1.5px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Top Banner with 100-Headcount Exploration CTA */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-300 text-xs bg-white/90 p-2.5 rounded-xl border shadow-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-mono font-bold text-black text-[11px] tracking-wide">
                    100-HEADCOUNT CINEMA TECH ORG CHART (SAMPLE)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-mono text-[10px] font-bold flex items-center gap-1 group-hover:scale-105 transition-transform shadow-xs">
                    <span>Explore 100 Employees</span>
                    <Maximize2 className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Department Filter Chips */}
              <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto text-[10px] font-mono border-b border-slate-300 relative z-10">
                <span className="text-slate-600 mr-1 uppercase font-bold">Filter Branch:</span>
                {[
                  { id: 'all', label: 'All Branches (15)' },
                  { id: 'Executive', label: 'Executive (2)' },
                  { id: 'Engineering', label: 'Engineering (5)' },
                  { id: 'Operations', label: 'Operations (2)' },
                  { id: 'Revenue', label: 'Revenue (3)' },
                  { id: 'People', label: 'People (2)' },
                ].map(dept => (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBranch(dept.id);
                    }}
                    className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap cursor-pointer ${
                      selectedBranch === dept.id
                        ? 'bg-emerald-600 text-white font-bold'
                        : 'bg-white text-slate-700 hover:text-black border border-slate-300'
                    }`}
                  >
                    {dept.label}
                  </button>
                ))}
              </div>

              {/* COMPACT MULTI-TIER TREE VISUALIZER (White boxes with Black text) */}
              <div className="py-4 space-y-3 overflow-x-auto relative z-10">
                
                {/* TIER 1: ROOT EXECUTIVE */}
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPreviewNode('sarah');
                    }}
                    className={`px-3 py-2 rounded-xl border-2 text-left transition-all w-60 shadow-sm cursor-pointer flex items-center gap-2.5 ${
                      selectedPreviewNode === 'sarah'
                        ? 'bg-white border-emerald-600 ring-2 ring-emerald-500'
                        : 'bg-white border-slate-300 hover:border-slate-800'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-black text-white flex items-center justify-center font-bold text-xs shrink-0">
                      SC
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-black truncate">Sarah Connor</span>
                        <span className="text-[8px] font-mono bg-amber-100 text-amber-900 border border-amber-300 px-1 py-0.2 rounded uppercase font-bold">CEO</span>
                      </div>
                      <p className="text-[10px] text-slate-700 truncate font-medium">Chief Executive Officer</p>
                    </div>
                    <div className="text-[9px] font-mono text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-300 font-bold shrink-0">
                      God Mode
                    </div>
                  </button>

                  <div className="w-[2px] h-3.5 bg-slate-700"></div>
                  <div className="w-full max-w-xl h-[2px] bg-slate-700 relative">
                    <div className="absolute left-1/2 -top-1 w-2 h-2 -ml-1 rounded-full bg-emerald-600"></div>
                  </div>
                </div>

                {/* TIER 2: VPs & DIRECT C-SUITE REPORTS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-2xl mx-auto pt-1">
                  
                  {/* David Chen */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPreviewNode('david');
                    }}
                    className={`p-2 rounded-xl border-2 text-left transition-all cursor-pointer bg-white ${
                      selectedPreviewNode === 'david'
                        ? 'border-emerald-600 ring-2 ring-emerald-500'
                        : 'border-slate-300 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-black truncate">David Chen</span>
                      <span className="text-[8px] font-mono bg-blue-100 text-blue-900 font-bold px-1 rounded border border-blue-200">VP</span>
                    </div>
                    <p className="text-[9px] text-slate-700 truncate font-medium">VP Engineering</p>
                    <p className="text-[8px] font-mono text-slate-500 mt-1 font-semibold">4 Directs · R&D</p>
                  </button>

                  {/* Your Account */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPreviewNode('you');
                    }}
                    className={`p-2 rounded-xl border-2 text-left transition-all relative overflow-hidden cursor-pointer bg-emerald-50 ${
                      selectedPreviewNode === 'you'
                        ? 'border-emerald-600 ring-2 ring-emerald-500'
                        : 'border-emerald-500 hover:border-emerald-700'
                    }`}
                  >
                    <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[7px] font-black px-1 uppercase tracking-tight font-mono">
                      You Report Here
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] font-black text-emerald-950 truncate">Your Account</span>
                      <span className="text-[8px] font-mono bg-emerald-200 text-emerald-950 px-1 rounded font-bold">Admin</span>
                    </div>
                    <p className="text-[9px] text-emerald-900 truncate font-semibold">VP Operations</p>
                    <p className="text-[8px] font-mono text-emerald-800 mt-1 font-bold">CEO Direct · God Mode</p>
                  </button>

                  {/* Sarah Lin */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPreviewNode('slin');
                    }}
                    className={`p-2 rounded-xl border-2 text-left transition-all cursor-pointer bg-white ${
                      selectedPreviewNode === 'slin'
                        ? 'border-emerald-600 ring-2 ring-emerald-500'
                        : 'border-slate-300 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-black truncate">Sarah Lin</span>
                      <span className="text-[8px] font-mono bg-purple-100 text-purple-900 font-bold px-1 rounded border border-purple-200">CPO</span>
                    </div>
                    <p className="text-[9px] text-slate-700 truncate font-medium">Chief People Officer</p>
                    <p className="text-[8px] font-mono text-slate-500 mt-1 font-semibold">2 Directs · People</p>
                  </button>

                  {/* Marcus Vance */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPreviewNode('mvance');
                    }}
                    className={`p-2 rounded-xl border-2 text-left transition-all cursor-pointer bg-white ${
                      selectedPreviewNode === 'mvance'
                        ? 'border-emerald-600 ring-2 ring-emerald-500'
                        : 'border-slate-300 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-black truncate">Marcus Vance</span>
                      <span className="text-[8px] font-mono bg-amber-100 text-amber-900 font-bold px-1 rounded border border-amber-200">VP</span>
                    </div>
                    <p className="text-[9px] text-slate-700 truncate font-medium">VP Revenue Ops</p>
                    <p className="text-[8px] font-mono text-slate-500 mt-1 font-semibold">3 Directs · GTM</p>
                  </button>

                </div>

                {/* TIER 3: MANAGERS */}
                <div className="pt-2">
                  <div className="grid grid-cols-3 gap-2.5">
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPreviewNode('elena');
                      }}
                      className={`p-2 rounded-lg border-2 text-left transition-all cursor-pointer bg-white ${
                        selectedPreviewNode === 'elena'
                          ? 'border-emerald-600 ring-2 ring-emerald-500'
                          : 'border-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-black truncate">Elena Rostova</span>
                        <span className="text-[7px] font-mono bg-blue-100 text-blue-900 font-bold px-1 rounded border border-blue-200">MGR</span>
                      </div>
                      <p className="text-[9px] text-slate-700 truncate font-medium">Engineering Manager</p>
                      <p className="text-[8px] text-emerald-800 font-mono mt-0.5 font-bold">Directs: Marcus, Chloe</p>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPreviewNode('rachel');
                      }}
                      className={`p-2 rounded-lg border-2 text-left transition-all cursor-pointer bg-white ${
                        selectedPreviewNode === 'rachel'
                          ? 'border-emerald-600 ring-2 ring-emerald-500'
                          : 'border-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-black truncate">Rachel Kim</span>
                        <span className="text-[7px] font-mono bg-purple-100 text-purple-900 font-bold px-1 rounded border border-purple-200">LEAD</span>
                      </div>
                      <p className="text-[9px] text-slate-700 truncate font-medium">Lead Talent Architect</p>
                      <p className="text-[8px] text-purple-800 font-mono mt-0.5 font-bold">Comp & Design</p>
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPreviewNode('liam');
                      }}
                      className={`p-2 rounded-lg border-2 text-left transition-all cursor-pointer bg-white ${
                        selectedPreviewNode === 'liam'
                          ? 'border-emerald-600 ring-2 ring-emerald-500'
                          : 'border-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-black truncate">Liam Patel</span>
                        <span className="text-[7px] font-mono bg-amber-100 text-amber-900 font-bold px-1 rounded border border-amber-200">DIR</span>
                      </div>
                      <p className="text-[9px] text-slate-700 truncate font-medium">Sales Director</p>
                      <p className="text-[8px] text-amber-800 font-mono mt-0.5 font-bold">Directs: Maya, Jordan</p>
                    </button>

                  </div>
                </div>

              </div>

              {/* Bottom Click Hint */}
              <div className="relative z-10 bg-white border border-slate-300 p-2.5 rounded-xl text-xs text-slate-900 flex items-center justify-between mt-3 font-semibold shadow-xs">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Click anywhere to explore the full 100-person cinema-themed tech org chart</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase underline">
                  Launch View →
                </span>
              </div>

            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#0c0d10] border border-neutral-800/80 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>SOC-2 Certified</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  Enterprise security controls & audit trail logging for every review access.
                </p>
              </div>

              <div className="bg-[#0c0d10] border border-neutral-800/80 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
                  <Server className="w-4 h-4" />
                  <span>Deterministic RLS</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  Multi-tenant row-level database security prevents cross-tenant data leakage.
                </p>
              </div>

              <div className="bg-[#0c0d10] border border-neutral-800/80 p-3.5 rounded-xl">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                  <Radio className="w-4 h-4" />
                  <span>HRIS Sync</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                  Native connectors for ADP Workforce Now, BambooHR, and Workday.
                </p>
              </div>
            </div>

          </section>

          {/* ---------------------------------------------------------------------
              RIGHT PANE: The Dual Gateway Terminal Card (5 cols)
              --------------------------------------------------------------------- */}
          <section className="lg:col-span-5 w-full">
            
            <div className="bg-[#0c0d10] rounded-2xl shadow-2xl border border-neutral-800/90 overflow-hidden backdrop-blur-sm">
              
              {/* Warning Banner: Shown when already registered user attempts new signup */}
              {isExistingUserRedirected && (
                <div className="bg-amber-950/40 border-b border-amber-800/80 p-4 text-xs text-amber-200 flex items-start gap-3 animate-in fade-in slide-in-from-top-1 duration-150">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-amber-300">
                      Existing Account Detected
                    </p>
                    <p className="text-[11px] text-amber-200/90 leading-relaxed">
                      An active organization account is already registered for <strong>{redirectedWarningEmail}</strong>. You have been redirected to the <strong>Active User Login</strong> terminal.
                    </p>
                  </div>
                </div>
              )}

              {/* Segmented Top Control: "Existing Member Sign In" / "Active User Login" vs "Setup New Workspace" */}
              <div className="p-3 bg-[#08090b] border-b border-neutral-800/80">
                <div className="grid grid-cols-2 p-1 bg-neutral-900/90 rounded-xl border border-neutral-800 text-xs font-semibold">
                  
                  {/* Tab 1: Sign In (Default) */}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signin');
                    }}
                    className={`py-2 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                      authMode === 'signin' || authMode === 'forgot-password' || authMode === 'forgot-username'
                        ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>
                      {isExistingUserRedirected ? 'Active User Login' : 'Existing Member Sign In'}
                    </span>
                  </button>

                  {/* Tab 2: Setup New Account */}
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('signup');
                      setStep(1);
                    }}
                    className={`py-2 px-3 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                      authMode === 'signup'
                        ? 'bg-emerald-500 text-neutral-950 font-bold shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Setup New Account</span>
                  </button>

                </div>
              </div>

              {/* Body Content based on active state */}
              <div className="p-6 sm:p-8">

                {/* ===============================================================
                    STATE A: EXISTING MEMBER SIGN IN / ACTIVE USER LOGIN (Default)
                    =============================================================== */}
                {authMode === 'signin' && (
                  <div className="space-y-5">
                    
                    <div>
                      <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                        <span>{isExistingUserRedirected ? 'Active User Authentication' : 'Sign In to VizhinORG'}</span>
                        {isExistingUserRedirected && (
                          <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded uppercase">
                            Registered
                          </span>
                        )}
                      </h2>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Enter your corporate credentials to access your organization workspace.
                      </p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      
                      {/* Corporate Work Email */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-neutral-300">
                            Corporate Work Email
                          </label>
                          <button
                            type="button"
                            onClick={() => setAuthMode('forgot-username')}
                            className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                          >
                            Forgot Username?
                          </button>
                        </div>
                        <div className="relative">
                          <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                          <input
                            type="email"
                            required
                            placeholder="name@company.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            className="w-full text-xs pl-8 pr-3 py-2.5 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-semibold text-neutral-300">
                            Password
                          </label>
                          <button
                            type="button"
                            onClick={() => setAuthMode('forgot-password')}
                            className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                          >
                            Forgot Password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="••••••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            className="w-full text-xs pl-8 pr-10 py-2.5 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                          >
                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Remember Device Toggle */}
                      <div className="flex items-center justify-between text-xs pt-1">
                        <label className="flex items-center gap-2 text-neutral-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rememberDevice}
                            onChange={(e) => setRememberDevice(e.target.checked)}
                            className="rounded border-neutral-700 bg-[#08090b] text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                          />
                          <span>Remember this corporate device for 30 days</span>
                        </label>
                      </div>

                      {/* Primary Sign In Button */}
                      <button
                        type="submit"
                        className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer mt-2"
                      >
                        <span>{isExistingUserRedirected ? 'Authenticate Active User' : 'Sign In to VizhinORG'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                    </form>

                    {/* SSO Divider */}
                    <div className="relative my-4">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-neutral-800"></div>
                      </div>
                      <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
                        <span className="bg-[#0c0d10] px-3 text-neutral-500">Or Enterprise SSO</span>
                      </div>
                    </div>

                    {/* SSO Button */}
                    <button
                      type="button"
                      onClick={() => setIsFullOrgChartOpen(true)}
                      className="w-full py-2.5 px-4 bg-[#08090b] hover:bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-700 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Single Sign-On (SAML / Okta / Azure AD)</span>
                    </button>

                    {/* Switcher Footer */}
                    <p className="text-center text-xs text-neutral-400 pt-2 border-t border-neutral-800/60">
                      Need a new corporate instance?{' '}
                      <button
                        type="button"
                        onClick={() => {
                          setAuthMode('signup');
                          setStep(1);
                        }}
                        className="text-emerald-400 font-bold hover:underline cursor-pointer"
                      >
                        Setup organization workspace →
                      </button>
                    </p>

                  </div>
                )}

                {/* ===============================================================
                    STATE B: FORGOT PASSWORD FLOW
                    =============================================================== */}
                {authMode === 'forgot-password' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAuthMode('signin')}
                        className="p-1 rounded hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <div>
                        <h2 className="text-lg font-bold text-white">
                          Reset Corporate Password
                        </h2>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          Dispatch a verified reset link to your corporate inbox.
                        </p>
                      </div>
                    </div>

                    {forgotPasswordSubmitted ? (
                      <div className="p-5 bg-emerald-950/40 border border-emerald-800/80 rounded-xl space-y-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-white">
                          Password Reset Link Dispatched
                        </p>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">
                          If an account exists for <strong>{forgotPasswordEmail}</strong>, an authentication reset link with a 15-minute token has been sent to your email.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setForgotPasswordSubmitted(false);
                            setAuthMode('signin');
                          }}
                          className="text-xs text-emerald-400 font-semibold hover:underline cursor-pointer"
                        >
                          ← Return to Sign In
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">
                            Registered Corporate Work Email
                          </label>
                          <div className="relative">
                            <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                            <input
                              type="email"
                              required
                              placeholder="name@company.com"
                              value={forgotPasswordEmail}
                              onChange={(e) => setForgotPasswordEmail(e.target.value)}
                              className="w-full text-xs pl-8 pr-3 py-2.5 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-lg text-[11px] text-neutral-400 leading-relaxed">
                          For security reasons, password resets are restricted to your verified company domain.
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          <span>Send Password Reset Instructions</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setAuthMode('signin')}
                          className="w-full text-center text-xs text-neutral-400 hover:text-white cursor-pointer"
                        >
                          Cancel and return to sign in
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* ===============================================================
                    STATE C: FORGOT USERNAME / WORKSPACE LOOKUP FLOW
                    =============================================================== */}
                {authMode === 'forgot-username' && (
                  <div className="space-y-5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAuthMode('signin')}
                        className="p-1 rounded hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <div>
                        <h2 className="text-lg font-bold text-white">
                          Lookup Workspace & Username
                        </h2>
                        <p className="text-xs text-neutral-400 mt-0.5">
                          Recover your active organization domain and user ID.
                        </p>
                      </div>
                    </div>

                    {forgotUsernameSubmitted ? (
                      <div className="p-5 bg-emerald-950/40 border border-emerald-800/80 rounded-xl space-y-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold text-white">
                          Workspace Details Dispatched
                        </p>
                        <p className="text-[11px] text-neutral-300 leading-relaxed">
                          We scanned our tenant directories. If an organization profile is attached to <strong>{forgotUsernameEmail}</strong>, your workspace sign-in URL and corporate user ID have been sent to your inbox.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setForgotUsernameSubmitted(false);
                            setAuthMode('signin');
                          }}
                          className="text-xs text-emerald-400 font-semibold hover:underline cursor-pointer"
                        >
                          ← Return to Sign In
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleForgotUsernameSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-neutral-300 mb-1">
                            Corporate Work Email
                          </label>
                          <div className="relative">
                            <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                            <input
                              type="email"
                              required
                              placeholder="name@company.com"
                              value={forgotUsernameEmail}
                              onChange={(e) => setForgotUsernameEmail(e.target.value)}
                              className="w-full text-xs pl-8 pr-3 py-2.5 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-neutral-900/60 border border-neutral-800 rounded-lg text-[11px] text-neutral-400 leading-relaxed">
                          Vizhin will cross-reference your domain with tenant boundaries in our PostgreSQL RLS matrix.
                        </div>

                        <button
                          type="submit"
                          className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                        >
                          <span>Locate My Workspace</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setAuthMode('signin')}
                          className="w-full text-center text-xs text-neutral-400 hover:text-white cursor-pointer"
                        >
                          Cancel and return to sign in
                        </button>
                      </form>
                    )}
                  </div>
                )}

                {/* ===============================================================
                    STATE D: SIGNUP STEP 1 & STEP 2 (The Hook)
                    =============================================================== */}
                {authMode === 'signup' && (
                  <div>
                    {step === 1 ? (
                      <div className="space-y-4">
                        <div>
                          <h2 className="text-lg font-bold text-white">
                            Setup New Company Workspace
                          </h2>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            Step 1: Establish tenant boundary and Super Admin access.
                          </p>
                        </div>

                        <form onSubmit={handleSignUpSubmit} className="space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                                First Name
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="Jane"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full text-xs px-3 py-2 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                                Last Name
                              </label>
                              <input
                                type="text"
                                required
                                placeholder="Smith"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full text-xs px-3 py-2 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-emerald-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">
                              Corporate Work Email
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="jane@company.com"
                              value={workEmail}
                              onChange={(e) => setWorkEmail(e.target.value)}
                              className="w-full text-xs px-3 py-2 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">
                              Password
                            </label>
                            <input
                              type="password"
                              required
                              placeholder="••••••••••••"
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              className="w-full text-xs px-3 py-2 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-neutral-300 mb-1">
                              Company Name
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Apex Technologies"
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              className="w-full text-xs px-3 py-2 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 focus:outline-none focus:border-emerald-500"
                            />
                          </div>

                          <div className="p-2.5 bg-amber-950/30 border border-amber-900/60 rounded-lg text-[11px] text-amber-200">
                            <span className="font-semibold text-amber-300">God Mode Privileges:</span> As the initial tenant creator, you receive Super Admin calibration rights across all reviews.
                          </div>

                          <button
                            type="submit"
                            className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                          >
                            <span>Create Workspace & Continue</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </form>
                      </div>
                    ) : (
                      /* Step 2: Inverted Sandbox Hook */
                      <div className="space-y-4">
                        <div className="text-center pb-1">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-1.5">
                            <Check className="w-4 h-4" />
                          </div>
                          <h3 className="text-base font-bold text-white">
                            {companyName} Workspace Created!
                          </h3>
                          <p className="text-[11px] text-neutral-400">
                            Choose how you want to experience your org chart:
                          </p>
                        </div>

                        {/* Option A: Explore with Demo Data */}
                        <div className="border border-emerald-500/80 bg-emerald-950/30 rounded-xl p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">Option A: Explore with Demo Data</span>
                            <span className="text-[9px] bg-emerald-500 text-neutral-950 font-bold px-2 py-0.5 rounded-full uppercase">
                              Recommended
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-300 leading-snug">
                            Populates 100-person cinema-themed tech hierarchy with dummy performance reviews and delegations.
                          </p>
                          <div className="text-[10px] text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 p-2 rounded flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>Just for fun: You will be placed reporting directly to the CEO!</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsFullOrgChartOpen(true)}
                            className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                          >
                            Launch Sandbox Workspace →
                          </button>
                        </div>

                        {/* Option B: Connect HRIS */}
                        <div className="border border-neutral-800 bg-[#08090b] rounded-xl p-3 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-white">Option B: Connect HRIS</p>
                            <p className="text-[10px] text-neutral-400">ADP, BambooHR, or Workday via Nango</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsFullOrgChartOpen(true)}
                            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-xs font-medium rounded-lg text-neutral-200 border border-neutral-700 cursor-pointer"
                          >
                            Connect HRIS
                          </button>
                        </div>

                        {/* Option C: Import CSV */}
                        <div className="border border-neutral-800 bg-[#08090b] rounded-xl p-3 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-white">Option C: Import CSV</p>
                            <p className="text-[10px] text-neutral-400">Standard two-pass HRIS template</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsFullOrgChartOpen(true)}
                            className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-xs font-medium rounded-lg text-neutral-200 border border-neutral-700 cursor-pointer"
                          >
                            Upload CSV
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>

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
            <span>SOC-2 Type II Certified</span>
            <span>·</span>
            <span>Deterministic RLS Isolation</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
