import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, 
  Calendar, Target, Compass
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface AuditCompliancePageProps {
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
  onEnterPortal: () => void;
  onEnterOrg?: () => void;
  onRequestAccount?: () => void;
}

const verificationPillars = [
  {
    label: 'Partner accountability',
    detail: 'who owns each partner relationship, what was agreed, and what actually happened'
  },
  {
    label: 'Access',
    detail: 'who could view, change, or approve partner and sales records, and whether that matches current roles'
  },
  {
    label: 'Audit trails',
    detail: 'whether the record of decisions and changes is complete, consistent, and easy to follow'
  },
  {
    label: 'Sales governance',
    detail: 'whether approvals, responsibilities, and documentation are clear enough for an outside reviewer to understand'
  },
  {
    label: 'Readiness for review',
    detail: 'whether the team can answer the hard questions without contradicting the record'
  }
];

const reviewSteps = [
  'Review current partner, access, and governance records as they stand today',
  'Verify what holds up, and flag where the trail is thin, inconsistent, or missing',
  'Prepare the team on the questions reviewers are most likely to ask, and the evidence that answers them',
  'Organize the material so the review can be walked through in order, without hunting for documents'
];

export default function AuditCompliancePage({
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
}: AuditCompliancePageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof document !== 'undefined') {
      document.title = 'Sales Governance & Audit Readiness Consulting | Vizhin';
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        'content',
        'Vizhin prepares sales teams for review by senior managers and boards, verifying partner accountability, access, and audit trails for due diligence.'
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
            Sales Governance &amp; Audit Readiness
          </span>
        </div>

        {/* Hero Section with EXACTLY ONE H1 HEADING */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Sales Governance, Partner Accountability &amp; Audit Readiness
          </h1>
        </div>

        {/* Opening Context Box - EXACT REQUIRED TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-emerald-850/80 hover:border-emerald-600/70 shadow-xl backdrop-blur-md transition-all space-y-4"
        >
          <p className="text-sm md:text-base text-neutral-200 leading-relaxed font-normal">
            When a sales team is reviewed, the risk is rarely that people worked hard. The risk is that no one can prove, cleanly, how partner deals were handled, who was responsible, and what was approved along the way. Partner arrangements, shared access, and informal approvals can look reasonable day to day, and still look uncertain when a senior manager, a board, or a due diligence team starts asking for evidence.
          </p>
        </motion.div>

        {/* Detailed Sections in Exact Specified Order */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Section: What Vizhin verifies */}
          <div className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-750 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs space-y-5">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>What Vizhin verifies</span>
            </h2>

            <ul className="space-y-3 pt-1">
              {verificationPillars.map((item, idx) => (
                <li 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-850/80 flex items-start gap-3 group hover:border-emerald-600/50 transition-all"
                >
                  <div className="w-5 h-5 rounded-md bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs md:text-sm text-neutral-200 leading-relaxed">
                    <strong className="text-white font-semibold">{item.label}:</strong> {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: How a readiness review runs */}
          <div className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-750 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs space-y-5">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>How a readiness review runs</span>
            </h2>

            <ol className="space-y-3 pt-1">
              {reviewSteps.map((step, idx) => (
                <li 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-neutral-950/60 border border-neutral-850/80 flex items-start gap-3 group hover:border-emerald-600/50 transition-all"
                >
                  <div className="w-6 h-6 rounded-md bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs md:text-sm text-neutral-200 leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Section: What you walk away with */}
          <div className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-750 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>What you walk away with</span>
            </h2>

            <p className="text-sm md:text-base text-neutral-200 leading-relaxed font-normal">
              A sales team that can face a senior manager, board, or due diligence review with organized evidence, consistent answers, and gaps already addressed — instead of discovering those gaps during the review itself.
            </p>
          </div>

          {/* Action Strategy CTA */}
          <div className="bg-gradient-to-r from-neutral-900/90 via-emerald-950/40 to-neutral-900/90 border border-emerald-800/60 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold text-white">
                Preparing for an upcoming executive review or due diligence?
              </h3>
              <p className="text-xs md:text-sm text-neutral-400 max-w-xl">
                Schedule a 25-minute Governance &amp; Audit Readiness Session to evaluate your current partner records, access controls, and audit trails.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="/contact"
                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-bold rounded-xl shadow-md border border-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>Schedule Readiness Call</span>
                <span className="font-mono text-[10px] text-emerald-300">→</span>
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
                  <span>Sales Team Accountability &amp; KPIs</span>
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

      {/* Corporate Footer */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>VIZHIN LLC • SALES GOVERNANCE, PARTNER ACCOUNTABILITY &amp; AUDIT READINESS</span>
        </div>
      </footer>
    </div>
  );
}
