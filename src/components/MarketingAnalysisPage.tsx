import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, BarChart3, Calendar, CheckCircle2, 
  Sparkles, Compass, Download, FileText, ChevronDown, ChevronUp, Printer,
  ExternalLink
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface MarketingAnalysisPageProps {
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
  onBack?: () => void;
}

const workingParts = [
  'Clear ROI models that prove revenue generated for every dollar spent',
  'Winning channels confidently scaled up',
  'Waste cut, instead of continuing to fund campaigns that drain budget',
  'Customer acquisition cost optimized across the funnel',
  'Precise, board-ready insights for growth decisions'
];

export default function MarketingAnalysisPage({
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
}: MarketingAnalysisPageProps) {
  const [showBrochure, setShowBrochure] = useState(false);

  const handleBack = () => {
    if (onNavigateHome) onNavigateHome();
    else if (onBack) onBack();
    else window.location.assign('/');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof document !== 'undefined') {
      document.title = 'Marketing ROI & Revenue Analytics Consulting | Vizhin';
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute(
        'content',
        'Stop guessing which marketing drives revenue. Vizhin maps funnel attribution and ROI from first click to closed-won deal, so you can scale what works.'
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
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-semibold uppercase tracking-wider">
            Revenue Analytics &amp; Marketing ROI
          </span>
        </div>

        {/* Hero Section with EXACTLY ONE H1 HEADING */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shadow-md">
            <BarChart3 className="w-6 h-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Revenue Analytics &amp; Marketing ROI Optimization
          </h1>
        </div>

        {/* Primary Diagnosis Box - EXACT REQUIRED TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-emerald-850/80 hover:border-emerald-600/70 shadow-xl backdrop-blur-md transition-all space-y-4"
        >
          <p className="text-sm md:text-base text-neutral-200 leading-relaxed font-normal">
            Revenue Analytics &amp; ROI Optimization: Turning marketing data into executive decision-making power. I implement deep funnel tracking and ROI modeling to map exactly how marketing dollars convert into closed-won revenue, maximizing your demand generation efficiency.
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
          <div className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-750 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>The problem</span>
            </h2>
            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
              To scale a company predictably, you cannot afford to guess which marketing efforts are actually driving revenue. Many growth-stage companies suffer from &ldquo;vanity metrics&rdquo;—reporting high website traffic or lead volumes that ultimately result in zero closed deals. I look past the surface-level data to run deep conversion funnel diagnostics and attribution modeling. By tracking a prospect&apos;s journey from the first click to the signed contract, we uncover exactly which campaigns are yielding high-value sales opportunities and which ones are simply draining your budget.
            </p>
          </div>

          {/* Section: What this means for you */}
          <div className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-750 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs space-y-5">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>What this means for you</span>
            </h2>

            <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-normal">
              For you as a founder, this means complete financial clarity and data-backed confidence. Instead of wondering if your marketing budget is working, you will have clear ROI models that prove exactly how much revenue is generated for every dollar spent.
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
              This level of analytics strips the emotion and guesswork out of your growth strategy, giving you and your board the precise insights needed to confidently scale up your winning channels, cut the waste, and optimize your entire customer acquisition cost.
            </p>
          </div>

          {/* Action Strategy CTA */}
          <div className="bg-gradient-to-r from-neutral-900/90 via-emerald-950/40 to-neutral-900/90 border border-emerald-800/60 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg md:text-xl font-bold text-white">
                Ready to map real marketing attribution to closed-won revenue?
              </h3>
              <p className="text-xs md:text-sm text-neutral-400 max-w-xl">
                Schedule a 25-minute Marketing Analytics Strategy Session to diagnose your current conversion funnel and attribution tracking.
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
                href="/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3 bg-neutral-900 hover:bg-neutral-850 text-neutral-300 hover:text-white text-xs font-semibold rounded-xl border border-neutral-800 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-105 transition-transform" />
                <span>View Brochure</span>
                <span className="font-mono text-[10px] text-emerald-400">↗</span>
              </a>
            </div>
          </div>

          {/* Collapsible GTM Assessment Brochure Viewer */}
          <div className="border border-neutral-850/80 rounded-2xl overflow-hidden bg-neutral-900/20">
            <button
              onClick={() => setShowBrochure(prev => !prev)}
              className="w-full p-4 md:p-5 flex items-center justify-between text-left hover:bg-neutral-900/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs md:text-sm font-bold text-white">
                    Sublime x Vizhin GTM Assessment Brochure
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Click to {showBrochure ? 'collapse' : 'preview'} the 2-page executive evaluation brochure
                  </p>
                </div>
              </div>
              <div className="text-neutral-400">
                {showBrochure ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {showBrochure && (
              <div className="p-4 md:p-6 border-t border-neutral-850 bg-neutral-950/80 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-neutral-850 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-neutral-300 font-medium">Full Executive Assessment Brochure (Complete 2-Page Document)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 hover:bg-neutral-850 text-emerald-400 border border-neutral-800 hover:border-emerald-600/60 flex items-center gap-1.5 transition-colors cursor-pointer group"
                    >
                      <ExternalLink className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                      <span>Open in New Tab</span>
                    </a>
                    <a
                      href="/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf"
                      download="Vizhin_GTM_Assessment.pdf"
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-950/80 hover:bg-emerald-900 text-emerald-400 border border-emerald-800/60 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>

                {/* Embedded High-Fidelity PDF Document Viewer */}
                <div className="w-full h-[650px] md:h-[850px] lg:h-[950px] rounded-xl overflow-hidden border border-neutral-800 bg-[#1e1e1e] shadow-2xl relative">
                  <object
                    data="/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf#view=FitH&toolbar=1"
                    type="application/pdf"
                    className="w-full h-full"
                    title="Sublime x Vizhin GTM Assessment Brochure"
                  >
                    <iframe
                      src="/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf#view=FitH"
                      className="w-full h-full border-0"
                      title="Sublime x Vizhin GTM Assessment Brochure"
                    >
                      <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4 text-neutral-300">
                        <FileText className="w-12 h-12 text-emerald-400" />
                        <p className="text-sm font-medium">Your browser does not support inline PDF viewing.</p>
                        <div className="flex items-center gap-3">
                          <a
                            href="/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Open Brochure in New Tab</span>
                          </a>
                          <a
                            href="/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf"
                            download="Vizhin_GTM_Assessment.pdf"
                            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download PDF</span>
                          </a>
                        </div>
                      </div>
                    </iframe>
                  </object>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Related Services & Bottom Navigation */}
        <div className="pt-8 border-t border-neutral-850/80 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Related Advisory Services
            </span>
            <button
              onClick={handleBack}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All Services</span>
              <span>→</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Link to Sales-Marketing Integration Services */}
            <a
              href="/marketing-services"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateMarketingServices) {
                  onNavigateMarketingServices();
                } else {
                  window.location.href = '/marketing-services';
                }
              }}
              className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 hover:border-emerald-600/60 transition-all group flex items-start gap-3 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                  <span>Sales-Marketing Integration Services</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed line-clamp-2">
                  Bridge the gap between marketing initiatives and revenue generation so every brand asset feeds pipeline.
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
                handleBack();
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
          <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
          <span>VIZHIN LLC • REVENUE ANALYTICS &amp; MARKETING ROI OPTIMIZATION</span>
        </div>
      </footer>
    </div>
  );
}
