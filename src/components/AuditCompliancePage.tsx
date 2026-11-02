import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, ShieldCheck, FileCheck, Users, Eye, CheckCircle2, 
  Calendar, ShieldAlert, ArrowRight, Lock, ClipboardCheck 
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
  onEnterPortal: () => void;
  onEnterOrg?: () => void;
  onRequestAccount?: () => void;
}

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
  onEnterPortal,
  onEnterOrg,
  onRequestAccount
}: AuditCompliancePageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col relative overflow-hidden font-sans">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-emerald-950/25 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#0D5C46]/20 blur-[150px] pointer-events-none" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none" />

      {/* Site Header */}
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
      <main className="flex-1 px-6 pt-12 pb-24 max-w-5xl mx-auto z-10 w-full space-y-12">
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
            Sales Governance & Compliance
          </span>
        </div>

        {/* Hero Section with EXACTLY ONE H1 HEADING */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Sales Governance, Partner Accountability & Audit Readiness
          </h1>

          <p className="text-sm md:text-base text-neutral-400 max-w-3xl leading-relaxed">
            Preparing and verifying that your sales team and partner channels are fully ready for review by senior managers, boards of directors, and due diligence reviewers—ensuring total accountability, verified access controls, and transparent audit trails.
          </p>
        </div>

        {/* Primary Overview Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-emerald-850/80 hover:border-emerald-600/70 shadow-xl backdrop-blur-md transition-all space-y-4"
        >
          <div className="text-sm md:text-base text-neutral-200 leading-relaxed font-medium">
            When scaling a sales organization with external channels and distributed teams, operational discipline is non-negotiable. Vizhin prepares your sales organization for rigorous scrutiny by senior managers, boards, and due diligence reviewers, verifying partner accountability, user access permissions, and continuous audit trails across every stage of your revenue process.
          </div>
        </motion.div>

        {/* Core Review & Verification Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-850 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Partner Accountability</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Verifying clear channel guidelines, verifying deal registration integrity, and establishing strict operational expectations so reseller and referral partners remain fully aligned and accountable.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-850 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Access & Permissions Verification</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Checking user access rights, role scopes, customer data boundaries, and administrative privileges to eliminate data leakage and maintain security compliance.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-850 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
              <ClipboardCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Audit Trail Inspection</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Confirming that pipeline updates, stage progressions, pricing approvals, and contract versions maintain verifiable event histories ready for instant audit retrieval.
            </p>
          </div>
        </div>

        {/* Detailed Advisory & Preparation Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-neutral-900/40 border border-neutral-850/80 rounded-2xl p-6 md:p-10 backdrop-blur-xs space-y-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Preparing Sales Teams for Senior Leadership & Due Diligence Scrutiny
          </h2>

          <div className="space-y-4 text-xs md:text-sm text-neutral-300 leading-relaxed font-normal">
            <p>
              When external reviewers, board members, or potential acquiring entities inspect a revenue engine, unverified claims and sloppy recordkeeping quickly erode valuation. As your Fractional VP of Sales and governance advisor, I prepare and verify your entire sales infrastructure for executive-level scrutiny. We inspect who has access to customer records, confirm that pipeline movements reflect authentic buyer commitments, and verify that administrative permissions prevent unauthorized modifications.
            </p>
            <p>
              This level of structural oversight ensures your company is always prepared for enterprise-level scrutiny, due diligence, or board reviews without the typical scramble. By verifying clean, continuous audit trails throughout daily sales workflows, we protect your company's valuation and confirm that your sales operations operate with high transparency, accountability, and reliability.
            </p>
            <p>
              This gives you, your executive peers, investors, and prospective enterprise partners total confidence that your revenue operations are thoroughly verified, accountable, and legally sound.
            </p>
          </div>

          {/* Diligence Checklist */}
          <div className="pt-4 border-t border-neutral-800/80 space-y-3">
            <p className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Key Areas of Verification & Audit Preparation:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Checking partner tier eligibility and contract adherence</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Verifying user role scopes and sensitive customer data access</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Validating change logs for deal amounts, stages, and discounts</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Preparing documentation for board reviews and M&A due diligence</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://zcal.co/rreifel/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-bold rounded-xl shadow-md border border-emerald-500/30 transition-all cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-emerald-200 group-hover:scale-105 transition-transform" />
              <span>Schedule Audit Readiness Review</span>
              <span className="font-mono text-emerald-200">↗</span>
            </a>

            <button
              onClick={onNavigateHome}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 hover:text-white text-xs font-semibold rounded-xl border border-neutral-800 hover:border-emerald-600/60 transition-all cursor-pointer"
            >
              <span>Explore All GTM Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>
        </motion.div>
      </main>

      {/* Corporate Footer */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>VIZHIN LLC • SALES GOVERNANCE, PARTNER ACCOUNTABILITY & AUDIT READINESS</span>
        </div>
      </footer>
    </div>
  );
}
