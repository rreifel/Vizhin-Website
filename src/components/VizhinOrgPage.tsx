import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users, Network, Shield, ArrowRight, ArrowLeft,
  Lock, Mail, User, CheckCircle2, AlertTriangle, Sparkles, 
  Radio, FileSpreadsheet, ShieldAlert, ShieldCheck, ExternalLink,
  ChevronRight, Eye, EyeOff, Zap, Check, Server
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface VizhinOrgPageProps {
  onBack: () => void;
  onEnterPortal: () => void;
  onRequestAccount: () => void;
  onNavigateMeddpicc: () => void;
  onNavigateMarketingAnalysis?: () => void;
}

// Initial registered corporate emails for collision check
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

  // Interactive node selection in left pane preview
  const [selectedPreviewNode, setSelectedPreviewNode] = useState<string>('sarah');

  const standaloneAppUrl = "https://ais-dev-k3dq5q47ugexrlhpj2wpqo-615362750641.us-west2.run.app?signup=true";

  // Login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;
    window.open(standaloneAppUrl, '_blank');
  };

  // Sign Up submission with Registered User Collision Check
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
      // Trigger warning, redirect to Sign In tab, and rename to "Active User Login"
      setIsExistingUserRedirected(true);
      setRedirectedWarningEmail(cleanEmail);
      setLoginEmail(cleanEmail);
      setLoginPassword('');
      setAuthMode('signin');
      return;
    }

    // Proceed to Step 2
    setStep(2);
  };

  const handleLaunchApp = () => {
    window.open(standaloneAppUrl, '_blank');
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
          setAuthMode('signin');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRequestAccount={onRequestAccount}
      />

      {/* 2. SUB-HERO BREADCRUMB & CONTEXT */}
      <div className="border-b border-neutral-900 bg-[#0a0b0d]/70 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
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
            <span className="text-neutral-300">
              {isExistingUserRedirected ? 'Active User Login' : authMode === 'signup' ? 'Setup Account' : 'Member Sign In'}
            </span>
          </div>

          <a 
            href={standaloneAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            <span>Launch Dedicated App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 3. MAIN SPLIT-PANE BODY */}
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
              Recursive RBAC Org Charts & Performance Calibration
            </h1>

            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl">
              Deterministic PostgreSQL CTE ancestry permissions, two-pass HRIS roster ingestion, and executive review calibration across multi-tenant enterprise hierarchies.
            </p>
          </div>

          {/* Interactive Org Chart Simulation Preview */}
          <div className="bg-[#0c0d10] border border-neutral-800/90 rounded-2xl p-5 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800/80 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="font-mono font-bold text-neutral-200 text-[11px]">
                  LIVE HIERARCHY TREE DEMO
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                Recursive RBAC Active
              </span>
            </div>

            {/* Tree Node Visualizer */}
            <div className="py-6 flex flex-col items-center space-y-4">
              
              {/* Root CEO Node */}
              <button
                type="button"
                onClick={() => setSelectedPreviewNode('sarah')}
                className={`p-3 rounded-xl border text-left transition-all w-64 shadow-md cursor-pointer ${
                  selectedPreviewNode === 'sarah'
                    ? 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500'
                    : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">Sarah Connor</span>
                  <span className="text-[9px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">CEO</span>
                </div>
                <p className="text-[10px] text-neutral-400">Chief Executive Officer</p>
                <div className="mt-2 text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>God Mode · Complete Tree Access</span>
                </div>
              </button>

              {/* Connecting line */}
              <div className="w-0.5 h-6 bg-emerald-500/40"></div>

              {/* Direct Reports Row */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
                
                {/* VP Eng Node */}
                <button
                  type="button"
                  onClick={() => setSelectedPreviewNode('david')}
                  className={`p-3 rounded-xl border text-left transition-all shadow-sm cursor-pointer ${
                    selectedPreviewNode === 'david'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500'
                      : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">David Chen</span>
                    <span className="text-[9px] font-mono bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">VP Eng</span>
                  </div>
                  <p className="text-[10px] text-neutral-400">Engineering Branch</p>
                  <p className="text-[9px] text-neutral-500 mt-1">Directs: Elena, Marcus</p>
                </button>

                {/* Newly Registered User Injected as Executive Direct Report */}
                <button
                  type="button"
                  onClick={() => setSelectedPreviewNode('you')}
                  className={`p-3 rounded-xl border text-left transition-all shadow-sm relative overflow-hidden cursor-pointer ${
                    selectedPreviewNode === 'you'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white ring-1 ring-emerald-500'
                      : 'bg-neutral-900/80 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="absolute top-0 right-0 bg-emerald-500 text-neutral-950 text-[8px] font-bold px-1.5 py-0.2 uppercase font-mono">
                    You Report Here
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs font-bold text-emerald-400">Your Account</span>
                    <span className="text-[9px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">Super Admin</span>
                  </div>
                  <p className="text-[10px] text-neutral-400">VP of Operations</p>
                  <p className="text-[9px] text-neutral-500 mt-1">Direct CEO Report · God Mode</p>
                </button>

              </div>

            </div>

            {/* Context Explainer Box */}
            <div className="bg-[#08090b] border border-neutral-800/80 p-3 rounded-xl text-xs text-neutral-400 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                {selectedPreviewNode === 'you' && "When you launch the sandbox, you are injected directly under CEO Sarah Connor with full administrative calibration rights across all department reviews."}
                {selectedPreviewNode === 'sarah' && "Sarah Connor sits at root hierarchy. By recursive RBAC rule, root executives inherit read/write calibration authority over all descendant reviews."}
                {selectedPreviewNode === 'david' && "David Chen manages the Engineering subtree. He can edit reviews for his direct reports, but cannot access peer Sales branch evaluations."}
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
                    onClick={handleLaunchApp}
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
                          Populates 15-person company tree with dummy performance reviews and delegations.
                        </p>
                        <div className="text-[10px] text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 p-2 rounded flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span>Just for fun: You will be placed reporting directly to the CEO!</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleLaunchApp}
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
                          onClick={handleLaunchApp}
                          className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-xs font-medium rounded-lg text-neutral-200 border border-neutral-700"
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
                          onClick={handleLaunchApp}
                          className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-850 text-xs font-medium rounded-lg text-neutral-200 border border-neutral-700"
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

      {/* 4. COMPLETE VIZHIN.CO CORPORATE FOOTER */}
      <section className="px-6 py-12 border-t border-neutral-900/60 bg-[#070708]/90 z-10 w-full" id="org_corporate_footer">
        <div className="max-w-md mx-auto">
          <div className="space-y-1.5 font-mono text-xs text-neutral-300 leading-relaxed bg-neutral-950 border border-neutral-900 p-6 rounded-xl shadow-inner text-center">
            <p className="font-sans font-bold text-sm text-white tracking-tight">Vizhin LLC</p>
            <p>951 20th St #652</p>
            <p>Denver, CO 80201</p>
            
            <div className="pt-4 mt-4 border-t border-neutral-900/80 flex justify-center">
              <a 
                href="mailto:rreifel@vizhin.co?subject=Inquiry to Vizhin LLC regarding VizhinORG"
                className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white rounded-lg border border-neutral-800 transition-colors text-xs font-medium cursor-pointer"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>VIZHIN LLC • SECURED WORKFORCE ARCHITECTURE & RECURSIVE RBAC SYSTEMS</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
