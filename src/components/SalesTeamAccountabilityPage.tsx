import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Target, Calendar, CheckCircle2, 
  ArrowRight, ShieldCheck, UserPlus, Layers 
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface SalesTeamAccountabilityPageProps {
  currentUser?: {
    email: string;
    name?: string;
    role?: string;
  } | null;
  onSignOut?: () => void;
  onSignOutOrg?: () => void;
  onSignOutCRM?: () => void;
  onSwitchUser?: (user: any) => void;
  onNavigateHome: () => void;
  onNavigateMeddpicc: () => void;
  onNavigateMarketingAnalysis?: () => void;
  onNavigateJointDeliveryPartners?: () => void;
  onNavigateAbout?: () => void;
  onNavigateStrategicGtmAnalysis?: () => void;
  onNavigateGtmTech?: () => void;
  onNavigateAuditCompliance?: () => void;
  onNavigateMarketingServices?: () => void;
  onNavigateSalesTeamAccountability?: () => void;
  onNavigateSalesHiringStrategy?: () => void;
  onNavigateTechnologyProjectManagement?: () => void;
  onEnterPortal: () => void;
  onEnterOrg?: () => void;
  onRequestAccount?: () => void;
}

export default function SalesTeamAccountabilityPage({
  currentUser,
  onSignOut,
  onSignOutOrg,
  onSignOutCRM,
  onSwitchUser,
  onNavigateHome,
  onNavigateMeddpicc,
  onNavigateMarketingAnalysis,
  onNavigateJointDeliveryPartners,
  onNavigateAbout,
  onNavigateStrategicGtmAnalysis,
  onNavigateGtmTech,
  onNavigateAuditCompliance,
  onNavigateMarketingServices,
  onNavigateSalesTeamAccountability,
  onNavigateSalesHiringStrategy,
  onNavigateTechnologyProjectManagement,
  onEnterPortal,
  onEnterOrg,
  onRequestAccount
}: SalesTeamAccountabilityPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof document !== 'undefined') {
      document.title = 'Sales Team KPIs & Accountability Framework | Vizhin';
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        'content',
        'Shift from activity-driven to outcome-focused sales. Vizhin builds KPIs, pipeline reviews, and accountability structures that help reps consistently hit targets.'
      );
    }
  }, []);

  const workingParts = [
    'Leading indicators that actually predict closed deals',
    'Structured weekly pipeline reviews',
    'Performance tracking and direct coaching',
    'Top performers identified',
    'Middle-tier reps supported',
    'Underperformers decisively managed out'
  ];

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col relative overflow-hidden font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-emerald-950/25 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#0D5C46]/20 blur-[150px] pointer-events-none" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none" />

      {/* Site Header & Navigation Toolbar */}
      <SiteHeader
        currentPage="services"
        currentUser={currentUser}
        onSignOut={onSignOut}
        onSignOutOrg={onSignOutOrg}
        onSignOutCRM={onSignOutCRM}
        onSwitchUser={onSwitchUser}
        onNavigateHome={onNavigateHome}
        onNavigateMeddpicc={onNavigateMeddpicc}
        onNavigateMarketingAnalysis={onNavigateMarketingAnalysis}
        onNavigateJointDeliveryPartners={onNavigateJointDeliveryPartners}
        onNavigateAbout={onNavigateAbout}
        onNavigateStrategicGtmAnalysis={onNavigateStrategicGtmAnalysis}
        onNavigateGtmTech={onNavigateGtmTech}
        onNavigateAuditCompliance={onNavigateAuditCompliance}
        onNavigateMarketingServices={onNavigateMarketingServices}
        onEnterPortal={onEnterPortal}
        onEnterOrg={onEnterOrg}
        onRequestAccount={onRequestAccount}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-6 pt-12 pb-24 max-w-5xl mx-auto z-10 w-full space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-semibold uppercase tracking-wider">
            Sales Performance Architecture
          </span>
        </div>

        {/* Hero Section with EXACTLY ONE H1 HEADING */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shadow-md">
            <Target className="w-6 h-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Sales Team Accountability & KPI Architecture
          </h1>
        </div>

        {/* Primary Diagnosis Box - EXACT REQUIRED BODY TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-emerald-850/80 hover:border-emerald-600/70 shadow-xl backdrop-blur-md transition-all space-y-4"
        >
          <div className="text-sm md:text-base text-neutral-200 leading-relaxed font-medium">
            Performance Architecture: Shifting your sales culture from activity-driven to outcome-focused. I establish clear, high-impact key performance indicators (KPIs) and accountability structures that ensure every sales rep owns their pipeline and consistently hits their targets.
          </div>
        </motion.div>

        {/* Detailed Sections in Exact Specified Order */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Section: The problem */}
          <div className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-750 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>The problem</span>
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
              For many founders, managing a sales team feels like a constant guessing game. Reps report that they are &ldquo;busy&rdquo; and that deals are &ldquo;just around the corner,&rdquo; but those promises rarely translate into predictable revenue. Without a seasoned sales leader enforcing standard expectations, sales cultures can easily drift into complacency. I eliminate this ambiguity by building an objective, metrics-driven performance framework tailored to your specific business model. We define the precise leading indicators—such as meaningful executive conversations and pipeline velocity—that actually dictate closed deals, stripping the guesswork out of sales management.
            </p>
          </div>

          {/* Section: What you get */}
          <div className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-750 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs space-y-5">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>What you get</span>
            </h2>

            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
              What this means for you as a founder is the freedom to stop micro-managing and start leading. I establish a culture of absolute ownership where sales reps are accountable to their data, not their excuses.
            </p>

            {/* Working parts list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {workingParts.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-850/80 flex items-start gap-3 group hover:border-emerald-600/50 transition-all"
                >
                  <div className="w-5 h-5 rounded-md bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs md:text-sm text-neutral-200 font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal pt-2 border-t border-neutral-850/70">
              You gain total confidence that your sales payroll is actively driving profit, backed by a culture that prioritizes execution over effort.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-bold rounded-xl shadow-md border border-emerald-500/30 transition-all cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-emerald-200 group-hover:scale-105 transition-transform" />
              <span>Schedule Strategy Call</span>
              <span className="font-mono text-emerald-200">→</span>
            </a>
          </div>
        </motion.div>

        {/* Related Services & Bottom Navigation (Links to Sales Hiring Strategy and Strategic GTM Analysis) */}
        <div className="pt-8 border-t border-neutral-850/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Related Advisory Services
            </span>
            <button
              onClick={onNavigateHome}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All Services</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Link to Sales Hiring Strategy */}
            <a
              href="/sales-hiring-strategy"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateSalesHiringStrategy) {
                  onNavigateSalesHiringStrategy();
                } else {
                  window.location.href = '/sales-hiring-strategy';
                }
              }}
              className="p-5 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all text-left flex items-start gap-3.5 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                <UserPlus className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <span>Sales Hiring Strategy</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-emerald-400" />
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  End bad sales hires with metrics-driven vetting, scorecards, and 30-60-90 onboarding.
                </p>
              </div>
            </a>

            {/* Link to Strategic GTM Analysis */}
            <a
              href="/gtm"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateStrategicGtmAnalysis) {
                  onNavigateStrategicGtmAnalysis();
                } else {
                  window.location.href = '/gtm';
                }
              }}
              className="p-5 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all text-left flex items-start gap-3.5 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                  <span>Strategic Go-to-Market Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-emerald-400" />
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Uncover hidden friction across your revenue engine, target verticals, and buyer personas.
                </p>
              </div>
            </a>
          </div>
        </div>
      </main>

      {/* Corporate Footer */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>VIZHIN LLC • SALES PERFORMANCE & ACCOUNTABILITY FRAMEWORKS</span>
        </div>
      </footer>
    </div>
  );
}
