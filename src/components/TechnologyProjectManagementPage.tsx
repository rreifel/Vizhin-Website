import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, Activity, Calendar, CheckCircle2, 
  Layers, Users, ShieldCheck, Download
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
  onBack?: () => void;
}

const workingParts = [
  'Defining technical requirements',
  'Vetting vendors to avoid hidden fees',
  'Mapping out aggressive implementation timelines',
  'Managing the change management process across your team'
];

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
  onEnterPortal,
  onEnterOrg,
  onRequestAccount,
  onBack
}: TechnologyProjectManagementPageProps) {
  const handleBack = () => {
    if (onNavigateHome) onNavigateHome();
    else if (onBack) onBack();
    else window.location.assign('/');
  };

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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070708] text-slate-900 dark:text-neutral-100 flex flex-col relative overflow-hidden font-sans transition-colors">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-emerald-200/40 dark:bg-emerald-950/25 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-teal-200/30 dark:bg-[#0D5C46]/20 blur-[150px] pointer-events-none" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.45] dark:opacity-[0.15] pointer-events-none" />

      {/* Persistent Site Header */}
      <SiteHeader
        currentPage="services"
        currentUser={currentUser}
        onSignOut={onSignOut}
        onSignOutOrg={onSignOutOrg}
        onSignOutCRM={onSignOutCRM}
        onSwitchUser={onSwitchUser}
        onNavigateHome={handleBack}
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
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-neutral-400 hover:text-[#0D5C46] dark:hover:text-emerald-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-[#0D5C46] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60 font-semibold uppercase tracking-wider">
            Technology Project Management
          </span>
        </div>

        {/* Hero Section with EXACTLY ONE H1 HEADING */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-[#0D5C46] dark:text-emerald-400 shadow-sm dark:shadow-md">
            <Activity className="w-6 h-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Strategic Technology Project Management
          </h1>
        </div>

        {/* Primary Diagnosis Box - EXACT REQUIRED TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 md:p-8 rounded-2xl bg-white dark:bg-neutral-900/60 border border-emerald-200 dark:border-emerald-800/80 hover:border-[#0D5C46]/60 dark:hover:border-emerald-600/70 shadow-md dark:shadow-xl backdrop-blur-md transition-all space-y-4"
        >
          <p className="text-sm md:text-base text-slate-700 dark:text-neutral-200 leading-relaxed font-normal">
            Strategic Technology Deployment: Removing the risk, delays, and hidden costs from your critical IT initiatives. We provide expert, platform-agnostic oversight for complex software selections, legacy migrations, and system implementations to ensure your tech investments deliver immediate operational value.
          </p>
        </motion.div>

        {/* Detailed Sections in Exact Specified Order */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Section: The problem */}
          <div className="bg-white dark:bg-neutral-900/40 border border-slate-200 dark:border-neutral-800/80 hover:border-slate-300 dark:hover:border-neutral-700 transition-all rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-none backdrop-blur-xs space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
              <span>The problem</span>
            </h2>
            <p className="text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed font-normal">
              Software selections, system migrations, and digital transformations are notoriously risky undertakings for a growing business. When a company attempts to implement enterprise software, re-deploy a legacy system, or switch core platforms without dedicated technical leadership, projects routinely run over budget, stall out, or fail to gain team adoption. Founders simply do not have the time to sit through hours of vendor demos, manage integration engineers, or troubleshoot deployment bottlenecks. We act as your objective, expert project executive, sitting on your side of the table to protect your capital and ensure project execution matches your business goals.
            </p>
          </div>

          {/* Section: What we handle */}
          <div className="bg-white dark:bg-neutral-900/40 border border-slate-200 dark:border-neutral-800/80 hover:border-slate-300 dark:hover:border-neutral-700 transition-all rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-none backdrop-blur-xs space-y-5">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
              <span>What we handle</span>
            </h2>

            <p className="text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed font-normal">
              Hiring us for your technology project management means you eliminate the operational chaos that typically derails major IT shifts.
            </p>

            {/* Working parts list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {workingParts.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-neutral-950/60 border border-slate-200 dark:border-neutral-800/80 flex items-start gap-3 group hover:border-[#0D5C46]/50 dark:hover:border-emerald-600/50 transition-all"
                >
                  <div className="w-5 h-5 rounded-md bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-[#0D5C46] dark:text-emerald-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs md:text-sm text-slate-700 dark:text-neutral-200 font-medium leading-snug">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-sm md:text-base text-slate-600 dark:text-neutral-300 leading-relaxed font-normal pt-2 border-t border-slate-200 dark:border-neutral-800/70">
              Your technical projects get delivered on time and within scope, allowing you to unlock the operational efficiencies you paid for without pulling your focus away from running the company.
            </p>
          </div>

          {/* Action Strategy CTA */}
          <div className="bg-gradient-to-r from-emerald-50/90 via-white to-teal-50/90 dark:from-neutral-900/90 dark:via-emerald-950/40 dark:to-neutral-900/90 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md dark:shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                Planning a software selection or major system migration?
              </h3>
              <p className="text-xs md:text-sm text-slate-600 dark:text-neutral-400 max-w-xl">
                Schedule a 25-minute Technology Project Discovery Session to de-risk your deployment roadmap, evaluate vendors, and align technical scope.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <a
                href="/contact"
                className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-bold rounded-xl shadow-md border border-emerald-500/30 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <Calendar className="w-4 h-4 text-emerald-100 dark:text-emerald-300 group-hover:scale-110 transition-transform" />
                <span>Schedule Strategy Call</span>
                <span className="font-mono text-[10px] text-emerald-100 dark:text-emerald-300">→</span>
              </a>

              <a
                href="/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf"
                download="Vizhin_GTM_Assessment.pdf"
                className="px-4 py-3 bg-white dark:bg-neutral-900 hover:bg-slate-50 dark:hover:bg-neutral-800 text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white text-xs font-semibold rounded-xl border border-slate-200 dark:border-neutral-800 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#0D5C46] dark:text-emerald-400" />
                <span>Download Assessment</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Bottom Related Service Cards & Navigation */}
        <div className="pt-8 border-t border-slate-200 dark:border-neutral-800/80 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-semibold">
              Explore Related Strategic Services
            </h3>
            <span className="text-xs text-slate-500 dark:text-neutral-500 font-mono">Vizhin Advisory</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="/gtm-tech"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateGtmTech) onNavigateGtmTech();
                else window.location.href = '/gtm-tech';
              }}
              className="p-5 rounded-xl bg-white dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800 hover:border-[#0D5C46]/50 dark:hover:border-emerald-600/60 shadow-sm dark:shadow-none transition-all flex items-start gap-4 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-[#0D5C46] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0D5C46] dark:group-hover:text-emerald-300 transition-colors">
                  <span>GTM Tech: Sales Technology Stack Optimization</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
                  Transform your CRM and tech stack into an automated revenue engine with clean pipeline visibility.
                </p>
              </div>
            </a>

            <a
              href="/gtm"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateStrategicGtmAnalysis) onNavigateStrategicGtmAnalysis();
                else window.location.href = '/gtm';
              }}
              className="p-5 rounded-xl bg-white dark:bg-neutral-900/50 border border-slate-200 dark:border-neutral-800 hover:border-[#0D5C46]/50 dark:hover:border-emerald-600/60 shadow-sm dark:shadow-none transition-all flex items-start gap-4 group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-center text-[#0D5C46] dark:text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#0D5C46] dark:group-hover:text-emerald-300 transition-colors">
                  <span>Strategic Go-to-Market Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-slate-600 dark:text-neutral-400 leading-relaxed line-clamp-2">
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
                handleBack();
              }}
              className="inline-flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-neutral-400 hover:text-[#0D5C46] dark:hover:text-emerald-400 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Vizhin Consulting Home</span>
            </a>
          </div>
        </div>
      </main>

      {/* Corporate Footer */}
      <footer className="border-t border-slate-200 dark:border-neutral-900/80 bg-white dark:bg-[#060607] py-8 px-6 text-center text-xs text-slate-500 dark:text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#0D5C46] dark:text-emerald-400" />
          <span>VIZHIN LLC • STRATEGIC TECHNOLOGY PROJECT MANAGEMENT</span>
        </div>
      </footer>
    </div>
  );
}
