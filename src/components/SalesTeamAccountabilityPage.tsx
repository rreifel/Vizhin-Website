import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Target, Calendar, CheckCircle2, 
  BarChart3, Users, TrendingUp, ShieldCheck, Mail 
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

        {/* Detailed Analysis Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-neutral-900/40 border border-neutral-850/80 rounded-2xl p-6 md:p-10 backdrop-blur-xs space-y-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Building an Objective, Metrics-Driven Sales Culture
          </h2>

          <div className="space-y-4 text-xs md:text-sm text-neutral-300 leading-relaxed font-normal">
            <p>
              For many founders, managing a sales team feels like a constant guessing game. Reps report that they are &ldquo;busy&rdquo; and that deals are &ldquo;just around the corner,&rdquo; but those promises rarely translate into predictable revenue. Without a seasoned sales leader enforcing standard expectations, sales cultures can easily drift into complacency. I eliminate this ambiguity by building an objective, metrics-driven performance framework tailored to your specific business model. We define the precise leading indicators—such as meaningful executive conversations and pipeline velocity—that actually dictate closed deals, stripping the guesswork out of sales management.
            </p>
            <p>
              What this means for you as a founder is the freedom to stop micro-managing and start leading. I establish a culture of absolute ownership where sales reps are accountable to their data, not their excuses. Through structured weekly pipeline reviews, performance tracking, and direct coaching, I identify your top performers, support middle-tier reps, and decisively manage out underperformers. You gain total confidence that your sales payroll is actively driving profit, backed by a culture that prioritizes execution over effort.
            </p>
          </div>

          {/* Pillars of Accountability */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-neutral-800/80">
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <BarChart3 className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Leading Indicator Metrics</h3>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Prioritize high-impact pipeline velocity, executive engagement, and deal qualification over vanity activity dials.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Rigorous Pipeline Reviews</h3>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Weekly deal-stage inspectability with standardized MEDDPICC criteria eliminating deal slippage and pipeline bloat.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Performance Governance</h3>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Clear expectation matrices and coaching playbooks that enable reps to self-correct and consistently hit quota.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Strategy & Revenue Session CTA */}
        <div className="bg-gradient-to-r from-neutral-900/90 via-emerald-950/40 to-neutral-900/90 border border-emerald-800/60 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold text-white">
              Ready to institute sales accountability and predictable targets?
            </h3>
            <p className="text-xs md:text-sm text-neutral-400 max-w-xl">
              Schedule a 25-minute Revenue Strategy Session to evaluate your current KPI structure, pipeline hygiene, and team accountability framework.
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
              <span>Schedule Strategy Call</span>
              <span className="font-mono text-[10px] text-emerald-300">↗</span>
            </a>
            <a
              href="mailto:rreifel@vizhin.co?subject=Sales%20Team%20Accountability%20Inquiry"
              className="px-4 py-3 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white text-xs font-semibold rounded-xl border border-neutral-800 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Email Ric Directly</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>VIZHIN LLC • SALES PERFORMANCE & ACCOUNTABILITY FRAMEWORKS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
