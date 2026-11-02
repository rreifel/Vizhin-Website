import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, UserPlus, Calendar, CheckCircle2, 
  ShieldCheck, Target, Compass
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface SalesHiringStrategyPageProps {
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

const hiringPillars = [
  'Define the exact candidate profile your business needs',
  'Create objective vetting scorecards',
  'Conduct deep-dive behavioral interviews',
  "Structure competitive compensation packages that align a rep's incentives directly with your revenue goals",
  'Build a comprehensive 30-60-90 day onboarding playbook, with the exact training, scripts, and playbooks new hires need'
];

export default function SalesHiringStrategyPage({
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
  onEnterPortal,
  onEnterOrg,
  onRequestAccount
}: SalesHiringStrategyPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof document !== 'undefined') {
      document.title = 'Sales Hiring Strategy & Recruiting Consulting | Vizhin';
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        'content',
        'End bad sales hires and missed quotas. Vizhin builds a metrics-driven vetting, scorecard, and 30-60-90 onboarding system to hire reps who consistently produce.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col relative overflow-hidden font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-emerald-950/25 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#0D5C46]/20 blur-[150px] pointer-events-none" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none" />

      {/* Persistent Site Header */}
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
            Predictable Talent Acquisition
          </span>
        </div>

        {/* Hero Section with EXACTLY ONE H1 HEADING */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shadow-md">
            <UserPlus className="w-6 h-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Predictable Sales Hiring Strategy
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
            Predictable Talent Acquisition: Ending the cycle of bad sales hires and missed quotas. I design and execute a rigorous, metrics-driven recruiting and vetting blueprint to attract, hire, and onboard elite sales professionals who fit your culture and consistently produce results.
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
              For most founders, hiring sales reps is a costly roll of the dice. Charismatic candidates routinely interview exceptionally well, only to fail miserably once they are in the seat—costing you months of lost revenue, burned leads, and thousands in wasted salary. Without a dedicated sales leader who knows exactly how to screen for grit, process discipline, and true selling capability, growth-stage companies easily fall into the trap of hiring the wrong profile for their specific sales cycle. I eliminate this expensive guesswork by building a structured, repeatable talent acquisition engine designed to source and filter for elite performers.
            </p>
          </div>

          {/* Section: What we build together */}
          <div className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-750 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs space-y-5">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>What we build together</span>
            </h2>

            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
              When you partner with me for your sales hiring strategy, we don&apos;t just find people; we build a scalable hiring infrastructure.
            </p>

            {/* Working parts list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {hiringPillars.map((item, idx) => (
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
              This ensures your new hires hit the ground running with the exact training, scripts, and playbooks they need to shorten their time-to-productivity and start closing deals quickly.
            </p>
          </div>

          {/* Action Strategy & Revenue Session CTA */}
          <div className="bg-gradient-to-r from-neutral-900/90 via-emerald-950/40 to-neutral-900/90 border border-emerald-800/60 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold text-white">
                Ready to stop costly sales hiring mistakes?
              </h3>
              <p className="text-xs md:text-sm text-neutral-400 max-w-xl">
                Book a 25-minute Talent Strategy Session to review candidate profiles, vetting scorecards, and ramp schedules for your upcoming sales hires.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="https://zcal.co/rreifel/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-bold rounded-xl shadow-md border border-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>Schedule Talent Call</span>
                <span className="font-mono text-[10px] text-emerald-300">↗</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Related Services & Bottom Navigation (Links to Sales Team Accountability and Strategic GTM Analysis) */}
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
            {/* Link to Sales Team Accountability & KPIs */}
            <a
              href="/sales-team-accountability"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateSalesTeamAccountability) {
                  onNavigateSalesTeamAccountability();
                } else {
                  window.location.href = '/sales-team-accountability';
                }
              }}
              className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-600/60 transition-all group flex items-start gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                <Target className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  <span>Sales Team Accountability & KPIs</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">
                  Shift from activity-driven to outcome-focused sales with objective KPI architecture and pipeline reviews.
                </p>
              </div>
            </a>

            {/* Link to Strategic GTM Analysis */}
            <a
              href="/strategic-gtm-analysis"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateStrategicGtmAnalysis) {
                  onNavigateStrategicGtmAnalysis();
                } else {
                  window.location.href = '/strategic-gtm-analysis';
                }
              }}
              className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-600/60 transition-all group flex items-start gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                <Compass className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  <span>Strategic Go-to-Market Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">
                  Diagnose hidden friction in your revenue engine, buyer personas, and market opportunity.
                </p>
              </div>
            </a>
          </div>

          <div className="pt-4 flex items-center justify-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Vizhin Consulting Home</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>VIZHIN LLC • PREDICTABLE SALES TALENT ACQUISITION & RECRUITING BLUEPRINTS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
