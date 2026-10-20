import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users, Network, Shield, ArrowRight, ArrowLeft,
  Lock, Mail, User, CheckCircle2, AlertTriangle, Sparkles, 
  Radio, FileSpreadsheet, ShieldAlert, ShieldCheck, ExternalLink,
  ChevronRight, Eye, EyeOff, Zap
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface VizhinOrgPageProps {
  onBack: () => void;
  onEnterPortal: () => void;
  onRequestAccount: () => void;
  onNavigateMeddpicc: () => void;
  onNavigateMarketingAnalysis?: () => void;
}

export default function VizhinOrgPage({
  onBack,
  onEnterPortal,
  onRequestAccount,
  onNavigateMeddpicc,
  onNavigateMarketingAnalysis,
}: VizhinOrgPageProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [authMode, setAuthMode] = useState<'signup' | 'signin'>('signup');

  // Form Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const standaloneAppUrl = "https://ais-dev-k3dq5q47ugexrlhpj2wpqo-615362750641.us-west2.run.app?signup=true";

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !workEmail.trim() || !companyName.trim()) {
      return;
    }
    // Advance to Step 2
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
        onEnterOrg={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
          </div>

          <a 
            href={standaloneAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1"
          >
            <span>Open Standalone Workspace</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* 3. MAIN ONBOARDING / SIGN IN BODY */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 flex flex-col items-center justify-center w-full">
        
        {step === 1 ? (
          /* =========================================================================
             STEP 1: The Initial Account Creation (The Empty Shell)
             ========================================================================= */
          <div className="w-full max-w-xl bg-[#0c0d10] rounded-2xl shadow-2xl border border-neutral-800/90 overflow-hidden backdrop-blur-sm">
            
            <div className="px-8 pt-8 pb-6 border-b border-neutral-800/80 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[10px] font-mono uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Workforce Architecture & RBAC Engine</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-neutral-100">
                {authMode === 'signup' ? 'Create Your VizhinORG Workspace' : 'Sign In to VizhinORG'}
              </h1>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                {authMode === 'signup' 
                  ? 'Step 1: Account Creation & Database Tenant Boundary Establishment'
                  : 'Access your company organization design and review matrix'}
              </p>

              {/* Mode Switcher Tabs */}
              <div className="flex justify-center gap-6 mt-4 text-xs font-semibold border-t border-neutral-800/80 pt-3">
                <button
                  type="button"
                  onClick={() => setAuthMode('signup')}
                  className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                    authMode === 'signup'
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-transparent text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Create Account (Sign Up)
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`pb-1 border-b-2 transition-colors cursor-pointer ${
                    authMode === 'signin'
                      ? 'border-emerald-500 text-emerald-400'
                      : 'border-transparent text-neutral-500 hover:text-neutral-300'
                  }`}
                >
                  Existing Member Sign In
                </button>
              </div>
            </div>

            <div className="p-8">
              {authMode === 'signup' ? (
                <form onSubmit={handleSignUpSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-300 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                        <input
                          type="text"
                          required
                          placeholder="Jane"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full text-xs pl-8 pr-3 py-2.5 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                        />
                      </div>
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
                        className="w-full text-xs px-3 py-2.5 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Corporate Work Email
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                      <input
                        type="email"
                        required
                        placeholder="jane.smith@company.com"
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        className="w-full text-xs pl-8 pr-3 py-2.5 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full text-xs pl-8 pr-10 py-2.5 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-neutral-500 hover:text-neutral-300"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Company / Organization Name
                    </label>
                    <div className="relative">
                      <Building2 className="w-3.5 h-3.5 absolute left-3 top-3 text-neutral-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Apex Corporation"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full text-xs pl-8 pr-3 py-2.5 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="p-3 bg-amber-950/30 border border-amber-900/60 rounded-lg text-xs text-amber-200 flex items-start gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-300">Super Admin ("God Mode") Assignment</p>
                      <p className="text-amber-400/90 mt-0.5 leading-relaxed text-[11px]">
                        As the first user creating this tenant, you are automatically assigned the Super Admin role with global read/write access across all performance evaluations, calibrations, and reporting lines.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <span>Create Account & Continue to Sandbox</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Corporate Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full text-xs px-3 py-2.5 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className="w-full text-xs px-3 py-2.5 bg-[#08090b] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleLaunchApp}
                    className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Sign In to VizhinORG Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* =========================================================================
             STEP 2: The "Inverted Sandbox" Choice (The Hook)
             ========================================================================= */
          <div className="w-full max-w-2xl bg-[#0c0d10] rounded-2xl shadow-2xl border border-neutral-800/90 overflow-hidden p-8 space-y-6 backdrop-blur-sm">
            
            <div className="text-center pb-2">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 mb-3 shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-neutral-100">
                {companyName || 'Apex Corporation'} Workspace Established!
              </h2>
              <p className="text-xs text-neutral-400 max-w-md mx-auto mt-1">
                Welcome, {firstName || 'User'}! Your enterprise boundary is provisioned. Select how you want to experience your organization:
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              
              {/* Option A: Explore with Demo Data (Recommended) */}
              <div className="relative border-2 border-emerald-500/80 bg-emerald-950/20 rounded-xl p-5 transition-all hover:bg-emerald-950/30">
                <div className="absolute top-4 right-4 bg-emerald-500 text-neutral-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                  Highly Recommended
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-neutral-950 flex items-center justify-center shrink-0 mt-0.5 shadow-sm font-bold">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pr-16">
                    <h3 className="text-sm font-bold text-neutral-100">
                      Option A: Explore with Demo Data
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                      Instantly populates a realistic 15-person company tree with pre-filled dummy evaluations and delegations. Touch and explore org chart mechanics immediately.
                    </p>

                    {/* Fun Requirement Tag */}
                    <div className="mt-3 text-[11px] font-medium text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-3 py-1.5 rounded-lg inline-flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Just for fun: You will be placed as an Executive reporting directly to the CEO!</span>
                    </div>

                    <div className="mt-4">
                      <button
                        onClick={handleLaunchApp}
                        className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                      >
                        <span>Launch Sandbox Workspace</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Option B: Connect HRIS Sync */}
              <div className="border border-neutral-800 bg-[#08090b] rounded-xl p-5 hover:border-neutral-700 transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-indigo-400 shrink-0 mt-0.5">
                  <Radio className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-neutral-100">
                    Option B: Connect HRIS Sync
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Connect ADP Workforce Now, BambooHR, or Workday via automated Nango integration gateway.
                  </p>
                  <button
                    onClick={handleLaunchApp}
                    className="mt-3 px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 border border-neutral-700 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Open HRIS Connector</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Option C: Import from CSV */}
              <div className="border border-neutral-800 bg-[#08090b] rounded-xl p-5 hover:border-neutral-700 transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-neutral-100">
                    Option C: Import from CSV
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                    Download the standardized HRIS CSV template and upload your employee roster with out-of-order two-pass stitching.
                  </p>
                  <button
                    onClick={handleLaunchApp}
                    className="mt-3 px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 border border-neutral-700 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Open CSV Importer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

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
