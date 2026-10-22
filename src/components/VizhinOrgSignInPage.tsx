import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users, Network, ShieldCheck, Lock, Mail, Eye, EyeOff, 
  CheckCircle2, ArrowRight, ArrowLeft, Sparkles, AlertTriangle, 
  Layers, BarChart3, UserCheck, ChevronRight, LogOut, Check, X,
  FolderTree, GitFork, Briefcase, Globe, Shield, Terminal
} from 'lucide-react';
import SiteHeader from './SiteHeader';
import PasswordStrengthValidator, { calculatePasswordStrength } from './PasswordStrengthValidator';

interface VizhinOrgSignInPageProps {
  onBack: () => void;
  onEnterPortal: () => void;
  onRequestAccount: () => void;
  onNavigateMeddpicc: () => void;
  onNavigateMarketingAnalysis: () => void;
  initialMode?: 'signup' | 'signin';
}

interface OrgUser {
  id: string;
  name: string;
  email: string;
  role: string;
  title: string;
  department: string;
}

const DEMO_ORG_USERS: OrgUser[] = [
  {
    id: 'org_cpo',
    name: 'Sarah Lin',
    email: 'cpo@vizhin.co',
    role: 'Executive',
    title: 'Chief People & Strategy Officer',
    department: 'People Operations & Organization Design'
  },
  {
    id: 'org_revops',
    name: 'Marcus Vance',
    email: 'revops@vizhin.co',
    role: 'Operations Lead',
    title: 'VP of Revenue Operations',
    department: 'Go-To-Market Operations'
  },
  {
    id: 'org_architect',
    name: 'Elena Rostova',
    email: 'architect@vizhin.co',
    role: 'Org Architect',
    title: 'Principal Organization Architect',
    department: 'Workforce Intelligence'
  }
];

export default function VizhinOrgSignInPage({
  onBack,
  onEnterPortal,
  onRequestAccount,
  onNavigateMeddpicc,
  onNavigateMarketingAnalysis,
  initialMode = 'signup'
}: VizhinOrgSignInPageProps) {
  const [mode, setMode] = useState<'signup' | 'signin'>(initialMode);
  
  // Sign Up Form State
  const [orgName, setOrgName] = useState('');
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [jobRole, setJobRole] = useState('Chief Revenue Officer');
  const [orgSize, setOrgSize] = useState('100 - 500');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isPasswordCompliant, setIsPasswordCompliant] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Sign In Form State
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [showSigninPassword, setShowSigninPassword] = useState(false);
  const [rememberTerminal, setRememberTerminal] = useState(true);
  const [signinError, setSigninError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Active Session Inside VizhinORG Workspace
  const [activeOrgUser, setActiveOrgUser] = useState<OrgUser | null>(null);
  const [activeTab, setActiveTab] = useState<'chart' | 'span' | 'headcount'>('chart');

  // Handle Account Creation
  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);

    if (!orgName.trim() || !fullName.trim() || !workEmail.trim() || !signupPassword) {
      setSignupError('All fields are required to provision an enterprise organization account.');
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError('Passwords do not match. Please verify your credentials.');
      return;
    }

    const strength = calculatePasswordStrength(signupPassword);
    if (strength.score < 3) {
      setSignupError('Please ensure your password satisfies enterprise security compliance (minimum Good or Enterprise Grade).');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSignupSuccess(true);
      setActiveOrgUser({
        id: `org_${Date.now()}`,
        name: fullName.trim(),
        email: workEmail.trim(),
        role: jobRole,
        title: `${jobRole} • ${orgName.trim()}`,
        department: 'Executive Go-To-Market Leadership'
      });
    }, 600);
  };

  // Handle Standard Sign In
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSigninError(null);

    if (!signinEmail || !signinPassword) {
      setSigninError('Please enter both your corporate email and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const matched = DEMO_ORG_USERS.find(u => u.email.toLowerCase() === signinEmail.trim().toLowerCase());
      if (matched) {
        setActiveOrgUser(matched);
      } else {
        setActiveOrgUser({
          id: `org_${Date.now()}`,
          name: signinEmail.split('@')[0].replace('.', ' ').toUpperCase(),
          email: signinEmail.trim(),
          role: 'Organization Lead',
          title: 'Organization Administrator',
          department: 'Enterprise Strategy'
        });
      }
    }, 450);
  };

  const handleLaunchDemo = (user: OrgUser) => {
    setSigninEmail(user.email);
    setSigninPassword('••••••••••••');
    setActiveOrgUser(user);
  };

  // If user is actively logged into the VizhinORG Workspace
  if (activeOrgUser) {
    return (
      <div className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col font-sans relative selection:bg-cyan-500/30">
        
        {/* Persistent Site Header */}
        <SiteHeader 
          currentPage="landing"
          onNavigateHome={onBack}
          onNavigateMeddpicc={onNavigateMeddpicc}
          onNavigateMarketingAnalysis={onNavigateMarketingAnalysis}
          onEnterPortal={onEnterPortal}
          onEnterOrg={() => {}}
          onRequestAccount={onRequestAccount}
        />

        {/* VizhinORG Top Ribbon */}
        <div className="border-b border-neutral-800 bg-[#090b0e] px-6 py-3 sticky top-16 z-30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-bold text-sm tracking-wider text-white">
              VIZHIN<span className="text-cyan-400">ORG</span>
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-semibold uppercase">
              Active Workspace
            </span>
            <div className="h-3 w-[1px] bg-neutral-800 hidden sm:block" />
            <span className="text-xs text-neutral-400 hidden sm:inline font-mono">
              {activeOrgUser.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveOrgUser(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out of ORG</span>
            </button>
            <button
              onClick={onBack}
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Return to Vizhin.co
            </button>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
          
          {/* Key Org Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#0f1115] border border-neutral-800/80 p-5 rounded-xl space-y-1">
              <p className="text-[11px] font-mono uppercase text-neutral-400">Total Workforce</p>
              <p className="text-2xl font-black text-white">428</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1 mt-1 font-mono">
                ↑ +14 new hires this quarter
              </p>
            </div>
            <div className="bg-[#0f1115] border border-neutral-800/80 p-5 rounded-xl space-y-1">
              <p className="text-[11px] font-mono uppercase text-neutral-400">Avg Span of Control</p>
              <p className="text-2xl font-black text-cyan-400">6.2 : 1</p>
              <p className="text-[10px] text-neutral-400 font-mono">Benchmark: 6.0 – 8.0</p>
            </div>
            <div className="bg-[#0f1115] border border-neutral-800/80 p-5 rounded-xl space-y-1">
              <p className="text-[11px] font-mono uppercase text-neutral-400">Management Depth</p>
              <p className="text-2xl font-black text-white">5 Layers</p>
              <p className="text-[10px] text-neutral-400 font-mono">CEO to Frontline Individual Contributor</p>
            </div>
            <div className="bg-[#0f1115] border border-neutral-800/80 p-5 rounded-xl space-y-1">
              <p className="text-[11px] font-mono uppercase text-neutral-400">GTM Alignment Score</p>
              <p className="text-2xl font-black text-emerald-400">94.2%</p>
              <p className="text-[10px] text-neutral-400 font-mono">Aligned to Revenue Coverage Targets</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 border-b border-neutral-800 pb-2">
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'chart' 
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Interactive Organization Chart</span>
            </button>
            <button
              onClick={() => setActiveTab('span')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'span' 
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <GitFork className="w-3.5 h-3.5" />
              <span>Span of Control & Ratio Diagnostics</span>
            </button>
            <button
              onClick={() => setActiveTab('headcount')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'headcount' 
                  ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>GTM Headcount Capacity Modeling</span>
            </button>
          </div>

          {/* Org Hierarchy Visualization */}
          {activeTab === 'chart' && (
            <div className="bg-[#0f1115] border border-neutral-800 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FolderTree className="w-4 h-4 text-cyan-400" />
                    <span>Go-To-Market & Revenue Architecture Hierarchy</span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Live dynamic topology mapped across Executive, Sales Leadership, Solutions Engineering, and Customer Success.
                  </p>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded border border-cyan-800/40">
                  Status: Synchronized
                </span>
              </div>

              {/* Hierarchy Tree Visual */}
              <div className="space-y-4 pt-2">
                {/* Level 1: CEO */}
                <div className="flex justify-center">
                  <div className="w-72 bg-neutral-900 border border-neutral-700/80 rounded-xl p-3.5 text-center shadow-lg shadow-black/40">
                    <p className="text-xs font-bold text-white">Chief Executive Officer</p>
                    <p className="text-[11px] text-cyan-300 font-mono">Executive Leadership</p>
                    <p className="text-[10px] text-neutral-400 mt-1">Direct Reports: 6 • Span: Optimal</p>
                  </div>
                </div>

                {/* Branch line */}
                <div className="w-0.5 h-6 bg-neutral-700 mx-auto" />

                {/* Level 2: GTM Executives */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-200">Chief Revenue Officer</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">GTM</span>
                    </div>
                    <p className="text-[11px] text-neutral-400">Oversees Sales, Partnerships & Customer Growth</p>
                    <div className="pt-2 border-t border-neutral-800/80 text-[10px] text-neutral-400 flex justify-between">
                      <span>Sub-teams: 4</span>
                      <span className="text-cyan-400 font-mono">Direct Span: 7</span>
                    </div>
                  </div>

                  <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-200">Chief Marketing Officer</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-950/80 text-amber-400 border border-amber-800/60">MKT</span>
                    </div>
                    <p className="text-[11px] text-neutral-400">Oversees Brand, Demand Gen, Content & Product Mktg</p>
                    <div className="pt-2 border-t border-neutral-800/80 text-[10px] text-neutral-400 flex justify-between">
                      <span>Sub-teams: 3</span>
                      <span className="text-cyan-400 font-mono">Direct Span: 5</span>
                    </div>
                  </div>

                  <div className="bg-neutral-900/90 border border-neutral-800 p-4 rounded-xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-200">Chief Customer Officer</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-teal-950/80 text-teal-400 border border-teal-800/60">CX</span>
                    </div>
                    <p className="text-[11px] text-neutral-400">Oversees Client Onboarding, Renewals & Professional Services</p>
                    <div className="pt-2 border-t border-neutral-800/80 text-[10px] text-neutral-400 flex justify-between">
                      <span>Sub-teams: 3</span>
                      <span className="text-cyan-400 font-mono">Direct Span: 6</span>
                    </div>
                  </div>
                </div>

                {/* Level 3: Frontline Teams */}
                <div className="bg-neutral-950/60 border border-neutral-850 p-4 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-neutral-300">Frontline GTM Pod Structure (Ratio: 1 SE to 3 AEs)</span>
                    <span className="font-mono text-emerald-400 text-[11px]">Healthy Workload Balance</span>
                  </div>
                  <p className="text-neutral-400 text-[11px]">
                    VizhinORG continuous topology analysis indicates no bottleneck in enterprise technical evaluation capacity across all 4 territories.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'span' && (
            <div className="bg-[#0f1115] border border-neutral-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">Span of Control Diagnostics</h3>
              <p className="text-xs text-neutral-400">
                Evaluation of manager-to-report ratios to prevent organizational bloat or micromanagement bottlenecks.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                  <p className="text-xs font-bold text-emerald-400">Enterprise Sales</p>
                  <p className="text-xl font-bold text-white">1 : 7.2</p>
                  <p className="text-[11px] text-neutral-400">Healthy range. High strategic autonomy without overhead latency.</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                  <p className="text-xs font-bold text-cyan-400">Solutions Engineering</p>
                  <p className="text-xl font-bold text-white">1 : 6.0</p>
                  <p className="text-[11px] text-neutral-400">Balanced technical coaching and deal review coverage.</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 space-y-2">
                  <p className="text-xs font-bold text-amber-400">Partner Enablement</p>
                  <p className="text-xl font-bold text-white">1 : 8.5</p>
                  <p className="text-[11px] text-neutral-400">Approaching maximum recommended span. Consider adding team lead.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'headcount' && (
            <div className="bg-[#0f1115] border border-neutral-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold text-white">GTM Headcount Capacity & Quota Modeling</h3>
              <p className="text-xs text-neutral-400">
                Aligning planned sales rep additions with quota ramp schedules and revenue growth milestones.
              </p>
              <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs text-neutral-300 space-y-2">
                <p>• Planned Q1 Requisitions: <strong>8 Account Executives, 3 Sales Engineers</strong></p>
                <p>• Projected Ramp Horizon: <strong>4.5 months to full productivity</strong></p>
                <p>• Target Pipeline Coverage Multiplier: <strong>3.8x required</strong></p>
              </div>
            </div>
          )}

        </main>
      </div>
    );
  }

  // STANDARD PAGE VIEW WITH VIZHIN.CO LAYOUT
  return (
    <div id="org_signin_page" className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col relative overflow-hidden font-sans">
      
      {/* Absolute Decorative Glows matching vizhin.co main page */}
      <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-cyan-950/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-950/20 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-teal-950/20 blur-[130px] pointer-events-none" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none" />

      {/* PERSISTENT GLOBAL SITE HEADER (Retained with logo, header, nav) */}
      <SiteHeader 
        currentPage="landing"
        onNavigateHome={onBack}
        onNavigateMeddpicc={onNavigateMeddpicc}
        onNavigateMarketingAnalysis={onNavigateMarketingAnalysis}
        onEnterPortal={onEnterPortal}
        onEnterOrg={() => setMode('signin')}
        onRequestAccount={onRequestAccount}
      />

      {/* MAIN CONTENT HERO CONTAINER */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 z-10 space-y-8">
        
        {/* Breadcrumb & Section Header */}
        <div className="text-center space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 backdrop-blur"
          >
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>VizhinORG • Enterprise Workforce Architecture</span>
            <span className="text-[10px] font-mono text-cyan-400/80 px-1 py-0.2 bg-cyan-900/60 rounded">vizhin.co/org/signin</span>
          </motion.div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Workforce Intelligence &<br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Organizational Design
            </span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Model sales hierarchy, optimize manager span-of-control ratios, and align engineering & revenue headcount directly to board goals.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="pt-2 flex justify-center">
            <div className="p-1 rounded-xl bg-neutral-900/90 border border-neutral-800 inline-flex gap-1 shadow-lg">
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  mode === 'signup'
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-700 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Organization Account</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  mode === 'signin'
                    ? 'bg-gradient-to-r from-cyan-600 to-teal-700 text-white shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Sign In to Existing Org</span>
              </button>
            </div>
          </div>
        </div>

        {/* FORMS CONTAINER */}
        <div className="max-w-2xl mx-auto">
          
          {/* ========================================================= */}
          {/* TAB 1: CREATE ACCOUNT (SIGN UP)                           */}
          {/* ========================================================= */}
          {mode === 'signup' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0e1014]/90 border border-neutral-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6"
            >
              <div className="space-y-1 border-b border-neutral-850 pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Create Enterprise Organization</h2>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 uppercase">
                    Step 1 of 1 • Immediate Activation
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Provision an isolated organizational tenant for your executive and GTM leadership teams.
                </p>
              </div>

              {signupError && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{signupError}</span>
                </div>
              )}

              <form onSubmit={handleSignUp} className="space-y-4">
                
                {/* Organization Name & Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-neutral-300">
                      Organization / Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                      <input
                        type="text"
                        required
                        value={orgName}
                        onChange={e => setOrgName(e.target.value)}
                        placeholder="Acme Technologies, Inc."
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-neutral-300">
                      Workforce / Employee Size
                    </label>
                    <select
                      value={orgSize}
                      onChange={e => setOrgSize(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="10 - 50">10 – 50 Employees (Seed / Series A)</option>
                      <option value="50 - 250">50 – 250 Employees (Growth $10M+)</option>
                      <option value="250 - 1000">250 – 1,000 Employees (Scale-up)</option>
                      <option value="1000+">1,000+ Employees (Global Enterprise)</option>
                    </select>
                  </div>
                </div>

                {/* Full Name & Job Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-neutral-300">
                      Administrator Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-semibold text-neutral-300">
                      Primary Role / Title
                    </label>
                    <select
                      value={jobRole}
                      onChange={e => setJobRole(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs focus:outline-none focus:border-cyan-500 transition-colors"
                    >
                      <option value="Chief Revenue Officer">Chief Revenue Officer (CRO)</option>
                      <option value="VP Revenue Operations">VP Revenue Operations (RevOps)</option>
                      <option value="Chief People Officer">Chief People Officer (CPO / HR)</option>
                      <option value="CEO / Founder">CEO / Co-Founder</option>
                      <option value="Principal Org Architect">Principal Organization Architect</option>
                    </select>
                  </div>
                </div>

                {/* Corporate Work Email */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-neutral-300">
                    Corporate Work Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={workEmail}
                      onChange={e => setWorkEmail(e.target.value)}
                      placeholder="alex.morgan@company.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-500">
                    Please use your verified company domain for enterprise authentication.
                  </p>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-300">
                      Create Master Password
                    </label>
                    <span className="text-[10px] font-mono text-neutral-500">Enterprise Policy</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      required
                      value={signupPassword}
                      onChange={e => setSignupPassword(e.target.value)}
                      placeholder="Minimum 12 characters, symbols, numbers"
                      className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(p => !p)}
                      className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                    >
                      {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* REAL-TIME PASSWORD STRENGTH VALIDATOR */}
                <PasswordStrengthValidator 
                  password={signupPassword}
                  onValidityChange={(isValid) => setIsPasswordCompliant(isValid)}
                />

                {/* Confirm Password */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-neutral-300">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      required
                      value={signupConfirmPassword}
                      onChange={e => setSignupConfirmPassword(e.target.value)}
                      placeholder="Re-type your password"
                      className={`w-full pl-9 pr-10 py-2.5 rounded-lg bg-neutral-900 border text-white text-xs placeholder:text-neutral-600 focus:outline-none transition-colors ${
                        signupConfirmPassword && signupConfirmPassword === signupPassword 
                          ? 'border-emerald-600/70 focus:border-emerald-500' 
                          : signupConfirmPassword && signupConfirmPassword !== signupPassword
                          ? 'border-red-600/70 focus:border-red-500'
                          : 'border-neutral-800 focus:border-cyan-500'
                      }`}
                    />
                    {signupConfirmPassword && (
                      <span className="absolute right-3 top-3">
                        {signupConfirmPassword === signupPassword ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <X className="w-4 h-4 text-red-400" />
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Terms agreement checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-neutral-400 select-none text-left">
                    <input
                      type="checkbox"
                      required
                      checked={agreeTerms}
                      onChange={e => setAgreeTerms(e.target.checked)}
                      className="rounded border-neutral-700 bg-neutral-900 text-cyan-600 focus:ring-0 mt-0.5 cursor-pointer"
                    />
                    <span className="text-xs leading-snug">
                      I agree to the <span className="text-neutral-200">Vizhin Enterprise Terms of Service</span> and understand data is protected under isolated Row-Level Security (RLS) policies.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-5 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 hover:from-cyan-500 hover:to-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-950/40 border border-cyan-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Provisioning Organization Tenant...</span>
                  ) : (
                    <>
                      <span>Create Account & Launch VizhinORG Workspace</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Already have an account prompt */}
              <div className="text-center pt-2 border-t border-neutral-850">
                <p className="text-xs text-neutral-400">
                  Already have an existing organization account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signin')}
                    className="text-cyan-400 font-bold hover:underline cursor-pointer"
                  >
                    Sign In here →
                  </button>
                </p>
              </div>

            </motion.div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: SIGN IN TO EXISTING ORG                             */}
          {/* ========================================================= */}
          {mode === 'signin' && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0e1014]/90 border border-neutral-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6"
            >
              <div className="space-y-1 border-b border-neutral-850 pb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-white">Sign In to VizhinORG</h2>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/60 uppercase">
                    SSO / SAML 2.0 Enabled
                  </span>
                </div>
                <p className="text-xs text-neutral-400">
                  Authenticate into your organization's workforce topology workspace.
                </p>
              </div>

              {signinError && (
                <div className="p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{signinError}</span>
                </div>
              )}

              <form onSubmit={handleSignIn} className="space-y-4">
                
                {/* Email Field */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-neutral-300">Corporate Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={signinEmail}
                      onChange={e => setSigninEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-300">Password</label>
                    <span className="text-[11px] text-cyan-400 hover:text-cyan-300 cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showSigninPassword ? 'text' : 'password'}
                      required
                      value={signinPassword}
                      onChange={e => setSigninPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSigninPassword(p => !p)}
                      className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                    >
                      {showSigninPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember device checkbox */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-400 select-none">
                    <input
                      type="checkbox"
                      checked={rememberTerminal}
                      onChange={e => setRememberTerminal(e.target.checked)}
                      className="rounded border-neutral-700 bg-neutral-900 text-cyan-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Remember this device</span>
                  </label>
                  <span className="text-[11px] text-neutral-500 font-mono">SOC 2 Type II</span>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-600 to-teal-700 hover:from-cyan-500 hover:to-teal-600 text-white font-bold text-xs rounded-lg shadow-lg shadow-cyan-950/40 border border-cyan-500/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In to VizhinORG</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>

              </form>

              {/* Demo Personas for Quick Access */}
              <div className="pt-2 border-t border-neutral-850 space-y-2">
                <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider text-center">
                  Instant Test Personas (1-Click Launch):
                </p>
                <div className="space-y-1.5">
                  {DEMO_ORG_USERS.map(user => (
                    <button
                      key={user.id}
                      type="button"
                      onClick={() => handleLaunchDemo(user)}
                      className="w-full p-2.5 rounded-lg bg-neutral-900/60 hover:bg-neutral-850 border border-neutral-800/80 hover:border-cyan-800/60 text-left transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-semibold text-neutral-200 group-hover:text-cyan-300 transition-colors">
                          {user.name} • {user.role}
                        </p>
                        <p className="text-[10px] text-neutral-500">{user.title}</p>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400 opacity-70 group-hover:opacity-100 flex items-center gap-1">
                        Launch →
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Need to create an account prompt */}
              <div className="text-center pt-2 border-t border-neutral-850">
                <p className="text-xs text-neutral-400">
                  Need to set up a new organization?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-cyan-400 font-bold hover:underline cursor-pointer"
                  >
                    Create Account here →
                  </button>
                </p>
              </div>

            </motion.div>
          )}

        </div>

      </main>

      {/* CORPORATE FOOTER (Retained exactly matching vizhin.co) */}
      <footer className="mt-auto border-t border-neutral-900/80 bg-[#060607]/80 backdrop-blur py-8 px-6 text-xs text-neutral-500 z-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-bold text-neutral-300">Vizhin.co</span>
            <span className="text-neutral-700">•</span>
            <span>Enterprise GTM Technology Solutions</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Boulder, Colorado</span>
            <a href="mailto:info@vizhin.co" className="hover:text-neutral-300 transition-colors">
              info@vizhin.co
            </a>
            <span>© {new Date().getFullYear()} Vizhin LLC</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
