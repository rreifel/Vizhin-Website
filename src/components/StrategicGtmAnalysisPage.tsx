import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Layers, Calendar, FileText, ShieldCheck, ArrowRight, Download, Users, BarChart3, Sparkles 
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface StrategicGtmAnalysisPageProps {
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

export default function StrategicGtmAnalysisPage({
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
}: StrategicGtmAnalysisPageProps) {
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
            GTM Acceleration Series
          </span>
        </div>

        {/* Hero Section with EXACTLY ONE H1 HEADING */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shadow-md">
            <Layers className="w-6 h-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Strategic Go-to-Market Analysis
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
            Market Position Diagnosis: Uncovering the hidden friction in your revenue engine. I conduct a comprehensive evaluation of your target verticals, pricing models, and buyer personas to realign your sales strategy with maximum market opportunity.
          </div>
        </motion.div>

        {/* Detailed Strategic Analysis Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-6"
        >
          {/* Section 1: Where growth gets expensive */}
          <div className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-750 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Where growth gets expensive</span>
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
              When sales and marketing pull in different directions, growth gets expensive. Leads stall, messages conflict, and your CRM becomes a place where pipeline goes to hide. The bottom line: your team isn't performing. The fix isn't more headcount or another tool—it's alignment and getting the right people in the right seats, with the right expectations.
            </p>
          </div>

          {/* Section 2: The GTM assessment */}
          <div className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-750 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>The GTM assessment</span>
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
              Sublime and Vizhin have joined forces to offer a GTM assessment that looks across your entire revenue engine—sales and marketing together—to find exactly where momentum is leaking and what to do about it. Together, we bring decades of experience on both sides of the funnel, so nothing gets lost in the gap between teams.
            </p>
          </div>

          {/* Section 3: What you walk away with */}
          <div className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-750 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>What you walk away with</span>
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
              You'll walk away with a clear-eyed read on what's working, what isn't, and a prioritized plan to fix it. No fluff. No 80-page reports nobody opens. Just answers you can act on.
            </p>
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
              <span>Schedule Strategy Call</span>
              <span className="font-mono text-emerald-200">↗</span>
            </a>

            <a
              href="/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 hover:text-white text-xs font-semibold rounded-xl border border-neutral-800 hover:border-emerald-600/60 transition-all cursor-pointer group"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>View GTM Assessment Brochure</span>
              <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf"
              download="Vizhin_GTM_Assessment.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900/60 hover:bg-neutral-850 text-neutral-300 hover:text-white text-xs font-semibold rounded-xl border border-neutral-800 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-neutral-400" />
              <span>Download PDF</span>
            </a>
          </div>
        </motion.div>

        {/* Related Services & Bottom Navigation */}
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
            {onNavigateGtmTech && (
              <button
                type="button"
                onClick={onNavigateGtmTech}
                className="p-5 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all text-left flex items-start gap-3.5 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                    <span>GTM Technology Stack Optimization</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-emerald-400" />
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Audit and optimize CRM, email campaigns, Clari, and Gong conversation intelligence.
                  </p>
                </div>
              </button>
            )}

            {onNavigateMarketingAnalysis && (
              <button
                type="button"
                onClick={onNavigateMarketingAnalysis}
                className="p-5 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all text-left flex items-start gap-3.5 group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                    <span>Revenue Analytics & Marketing ROI</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-emerald-400" />
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Map deep funnel attribution and ROI from first click to closed-won deals.
                  </p>
                </div>
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Corporate Footer */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>VIZHIN LLC • STRATEGIC GO-TO-MARKET ANALYSIS & REVENUE ACCELERATION</span>
        </div>
      </footer>
    </div>
  );
}
