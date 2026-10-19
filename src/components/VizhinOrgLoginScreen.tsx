import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users, Network, Shield, ArrowRight, ArrowLeft, 
  Lock, Mail, Eye, EyeOff, CheckCircle2, AlertTriangle, KeyRound, 
  Sparkles, Layers, BarChart3, UserCheck, ChevronRight, LogOut,
  FolderTree, GitFork, Briefcase
} from 'lucide-react';

interface VizhinOrgLoginScreenProps {
  onBack: () => void;
  onSwitchToCrm: () => void;
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

export default function VizhinOrgLoginScreen({ onBack, onSwitchToCrm }: VizhinOrgLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotFlow, setForgotFlow] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Active Session state inside VizhinORG
  const [activeOrgUser, setActiveOrgUser] = useState<OrgUser | null>(null);
  const [activeTab, setActiveTab] = useState<'chart' | 'span' | 'headcount'>('chart');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide your corporate email and password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const matched = DEMO_ORG_USERS.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (matched) {
        setActiveOrgUser(matched);
      } else {
        // Allow any business email for trial/demo
        setActiveOrgUser({
          id: `org_${Date.now()}`,
          name: email.split('@')[0].replace('.', ' ').toUpperCase(),
          email: email.trim(),
          role: 'Organization Lead',
          title: 'Organization Administrator',
          department: 'Enterprise Strategy'
        });
      }
    }, 450);
  };

  const handleSelectDemoUser = (user: OrgUser) => {
    setEmail(user.email);
    setPassword('••••••••••••');
    setActiveOrgUser(user);
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSuccess(true);
  };

  // If logged into VizhinORG, show the interactive Org intelligence portal workspace
  if (activeOrgUser) {
    return (
      <div className="min-h-screen bg-[#08090b] text-neutral-100 flex flex-col font-sans">
        {/* VizhinORG Top Bar */}
        <header className="h-16 border-b border-neutral-800 bg-[#0c0d10] px-6 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-lg tracking-wider text-white">
                VIZHIN<span className="text-cyan-400">ORG</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 uppercase font-semibold">
                Workforce Intelligence
              </span>
            </div>
            <div className="h-4 w-[1px] bg-neutral-800 hidden md:block" />
            <span className="text-xs text-neutral-400 hidden md:inline">
              Enterprise Organizational Architecture Workspace
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-neutral-200">{activeOrgUser.name}</p>
              <p className="text-[10px] text-neutral-400 font-mono">{activeOrgUser.title}</p>
            </div>
            <button
              onClick={() => setActiveOrgUser(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
            <button
              onClick={onBack}
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Exit to Vizhin.co
            </button>
          </div>
        </header>

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

  // LOGIN SCREEN FOR VIZHINORG
  return (
    <div className="min-h-screen bg-[#07080a] text-neutral-100 flex flex-col justify-between font-sans relative overflow-x-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-cyan-950/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-950/15 blur-[150px] pointer-events-none" />

      {/* Top Header */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-neutral-900/80 z-20">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer py-1 px-2.5 rounded-lg hover:bg-neutral-900"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Vizhin.co</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-neutral-400 hidden sm:inline">Looking for CRM portal?</span>
          <button
            onClick={onSwitchToCrm}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-emerald-700/60 text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer"
          >
            Sign in to VizhinCRM →
          </button>
        </div>
      </header>

      {/* Main Authentication Card */}
      <main className="flex-1 flex items-center justify-center p-4 z-10">
        <div className="w-full max-w-md space-y-6">
          
          {/* Brand Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 text-cyan-300 shadow-lg shadow-cyan-950/50 mb-1">
              <Network className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <h1 className="text-2xl font-black tracking-wider text-white">
                VIZHIN<span className="text-cyan-400">ORG</span>
              </h1>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Organizational Architecture, Workforce Intelligence & Team Topology Platform
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-[#0e1014] border border-neutral-800/90 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
            
            {/* Forgot Password Flow */}
            {forgotFlow ? (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h2 className="text-base font-bold text-white">Reset Account Access</h2>
                  <p className="text-xs text-neutral-400">
                    Enter your organization corporate email address to receive password recovery instructions.
                  </p>
                </div>

                {forgotSuccess ? (
                  <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/60 space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Recovery instructions dispatched</span>
                    </div>
                    <p className="text-neutral-300">
                      If an account exists for <strong className="text-white">{forgotEmail}</strong>, password reset credentials have been delivered.
                    </p>
                    <button
                      onClick={() => {
                        setForgotFlow(false);
                        setForgotSuccess(false);
                      }}
                      className="text-xs text-cyan-400 underline cursor-pointer"
                    >
                      Return to Sign In
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleForgotSubmit} className="space-y-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-semibold text-neutral-300">Corporate Email</label>
                      <input
                        type="email"
                        required
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="submit"
                        className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        Send Reset Link
                      </button>
                      <button
                        type="button"
                        onClick={() => setForgotFlow(false)}
                        className="px-3.5 py-2.5 bg-neutral-900 text-neutral-400 hover:text-white rounded-lg text-xs transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              /* Standard Login Form */
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {error && (
                  <div className="p-3 rounded-lg bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-neutral-300">Corporate Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="executive@company.com"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-neutral-300">Password</label>
                    <button
                      type="button"
                      onClick={() => setForgotFlow(true)}
                      className="text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-neutral-900/90 border border-neutral-800 text-white text-xs placeholder:text-neutral-600 focus:outline-none focus:border-cyan-500 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(p => !p)}
                      className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember device checkbox */}
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-neutral-400 select-none">
                    <input
                      type="checkbox"
                      checked={rememberDevice}
                      onChange={e => setRememberDevice(e.target.checked)}
                      className="rounded border-neutral-700 bg-neutral-900 text-cyan-600 focus:ring-0 cursor-pointer"
                    />
                    <span>Remember this browser</span>
                  </label>
                  <span className="text-[11px] text-neutral-500 font-mono">SAML 2.0 / SSO</span>
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
            )}

            {/* SSO Partition */}
            <div className="relative pt-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-[#0e1014] px-2 text-neutral-500 text-[10px] font-mono uppercase">
                  Or Test with Demo Persona
                </span>
              </div>
            </div>

            {/* Quick Demo Personas */}
            <div className="space-y-2">
              <p className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider text-center">
                Click a role below for instant preview access:
              </p>
              <div className="space-y-1.5">
                {DEMO_ORG_USERS.map(user => (
                  <button
                    key={user.id}
                    type="button"
                    onClick={() => handleSelectDemoUser(user)}
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

          </div>

          {/* Footer footnote */}
          <div className="text-center text-[11px] text-neutral-500 space-y-1">
            <p>Protected by Vizhin Enterprise Identity & Access Management.</p>
            <p className="text-neutral-600">Vizhin.co • Driving Go-To-Market Results</p>
          </div>

        </div>
      </main>

      {/* Footer bar */}
      <footer className="py-3 px-6 text-center text-[10px] text-neutral-600 border-t border-neutral-900/60 z-20">
        © {new Date().getFullYear()} Vizhin.co. All rights reserved.
      </footer>

    </div>
  );
}
