import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Activity, Calendar, CheckCircle2, 
  Layers, Cpu, ShieldCheck, Mail, Database, GitMerge 
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface TechnologyProjectManagementPageProps {
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

export default function TechnologyProjectManagementPage({
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
}: TechnologyProjectManagementPageProps) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof document !== 'undefined') {
      document.title = 'Technology Project Management & Software Selection | Vizhin';
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        'content',
        'De-risk software selection, migration, and implementation. Vizhin provides platform-agnostic oversight so your technology investments deliver value on time.'
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
            Technical Leadership & Architecture
          </span>
        </div>

        {/* Hero Section with EXACTLY ONE H1 HEADING */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shadow-md">
            <Activity className="w-6 h-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Strategic Technology Project Management
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
            Strategic Technology Deployment: Removing the risk, delays, and hidden costs from your critical IT initiatives. I provide expert, platform-agnostic oversight for complex software selections, legacy migrations, and system implementations to ensure your tech investments deliver immediate operational value.
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
            De-Risking Enterprise Implementations and Software Migrations
          </h2>

          <div className="space-y-4 text-xs md:text-sm text-neutral-300 leading-relaxed font-normal">
            <p>
              Software selections, system migrations, and digital transformations are notoriously risky undertakings for a growing business. When a company attempts to implement enterprise software, re-deploy a legacy system, or switch core platforms without dedicated technical leadership, projects routinely run over budget, stall out, or fail to gain team adoption. Founders simply do not have the time to sit through hours of vendor demos, manage integration engineers, or troubleshoot deployment bottlenecks. I act as your objective, expert project executive, sitting on your side of the table to protect your capital and ensure project execution matches your business goals.
            </p>
            <p>
              Hiring me for your technology project management means you eliminate the operational chaos that typically derails major IT shifts. I handle the heavy lifting: defining technical requirements, vetting vendors to avoid hidden fees, mapping out aggressive implementation timelines, and managing the change management process across your team. Your technical projects get delivered on time and within scope, allowing you to unlock the operational efficiencies you paid for without pulling your focus away from running the company.
            </p>
          </div>

          {/* Pillars of Project Management */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-neutral-800/80">
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Vendor-Neutral Selection</h3>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Platform-agnostic RFP management, architectural requirement scoping, and contract negotiation eliminating costly lock-in.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <GitMerge className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Migration & Implementation</h3>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Step-by-step data schema migration, integration architecture, and zero-downtime cutover plans protecting daily revenue.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Adoption Governance</h3>
              <p className="text-[11px] text-neutral-400 leading-relaxed">
                Operational change management, workflow training, and audit trails that guarantee rapid adoption across the company.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Strategy & Revenue Session CTA */}
        <div className="bg-gradient-to-r from-neutral-900/90 via-emerald-950/40 to-neutral-900/90 border border-emerald-800/60 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-lg md:text-xl font-bold text-white">
              Planning a software selection or major system migration?
            </h3>
            <p className="text-xs md:text-sm text-neutral-400 max-w-xl">
              Schedule a 25-minute Technology Project Discovery Session to de-risk your deployment roadmap, evaluate vendors, and align technical scope.
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
              <span>Schedule Tech Call</span>
              <span className="font-mono text-[10px] text-emerald-300">↗</span>
            </a>
            <a
              href="mailto:rreifel@vizhin.co?subject=Technology%20Project%20Management%20Inquiry"
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
            <span>VIZHIN LLC • PLATFORM-AGNOSTIC TECHNOLOGY PROJECT MANAGEMENT & IMPLEMENTATION</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
