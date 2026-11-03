import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Sparkles, Calendar, FileText, CheckCircle2, 
  ArrowRight, Download, MessageSquare, Target, Megaphone, Share2 
} from 'lucide-react';
import SiteHeader from './SiteHeader';
import BrochureViewer from './BrochureViewer';

interface MarketingServicesPageProps {
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

export default function MarketingServicesPage({
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
}: MarketingServicesPageProps) {
  const [showBrochure, setShowBrochure] = useState(false);

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
            Revenue Integration Series
          </span>
        </div>

        {/* Hero Section with EXACTLY ONE H1 HEADING */}
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Sales-Marketing Integration Services
          </h1>
        </div>

        {/* Primary Diagnosis Box - EXACT UNCHANGED BODY TEXT REQUIRED */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 md:p-8 rounded-2xl bg-neutral-900/60 border border-emerald-850/80 hover:border-emerald-600/70 shadow-xl backdrop-blur-md transition-all space-y-4"
        >
          <div className="text-sm md:text-base text-neutral-200 leading-relaxed font-medium">
            Sales-Marketing Integration: Bridging the gap between marketing initiatives and revenue generation. I ensure your brand assets, client testimonials, and digital presence are systematically engineered to feed the sales pipeline, accelerate deals, and maintain absolute messaging consistency.
          </div>
        </motion.div>

        {/* In-Depth Breakdown & Strategic Alignment Context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-neutral-900/40 border border-neutral-850/80 rounded-2xl p-6 md:p-10 backdrop-blur-xs space-y-6"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Ending Friction Between Lead Generation and Deal Closing
          </h2>

          <div className="space-y-4 text-xs md:text-sm text-neutral-300 leading-relaxed font-normal">
            <p>
              For a growing company, the costliest bottleneck is a disconnect between the team generating leads and the team closing deals. When marketing operates in a vacuum, they often optimize for metrics like views or clicks, resulting in collateral, websites, and video assets that look beautiful but fail to move the needle for sales. By integrating marketing directly into your sales strategy, I eliminate this friction. We transform your marketing footprint from a passive cost center into an active sales enablement engine, ensuring that every asset produced is directly engineered to handle objections, build credibility, and pre-qualify prospects before they ever hop on a discovery call.
            </p>
            <p>
              What this means for you as a founder is complete pipeline clarity and a significantly accelerated sales cycle. Your sales team will no longer waste time correcting misaligned expectations set by generic marketing materials. Instead, they will be armed with hyper-targeted testimonials, case studies, and collateral that perfectly mirror the live sales conversation. This seamless handoff not only maximizes the return on your marketing spend but also presents a highly sophisticated, unified front to your market—ultimately driving higher conversion rates and predictable revenue growth.
            </p>
          </div>

          {/* Integration Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-neutral-800/80">
            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Consistent Messaging</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Realign top-of-funnel copywriting, ad campaigns, and landing pages to echo the precise pain points and value drivers proven in actual sales conversations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Targeted Proof Assets</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Structure customer case studies, client video testimonials, and competitive battlecards engineered specifically to dismantle late-stage buyer objections.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/60 border border-neutral-850 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
                <Megaphone className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white">Pipeline-Fed Campaigns</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Orchestrate email nurture sequences and automated outreach that seamlessly hand off warm, qualified prospects directly into sales rep calendars.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center gap-4">
            <a
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-bold rounded-xl shadow-md border border-emerald-500/30 transition-all cursor-pointer group"
            >
              <Calendar className="w-4 h-4 text-emerald-200 group-hover:scale-105 transition-transform" />
              <span>Schedule Strategy Session</span>
              <span className="font-mono text-emerald-200">→</span>
            </a>

            <button
              type="button"
              onClick={() => setShowBrochure(prev => !prev)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-850 text-neutral-200 hover:text-white text-xs font-semibold rounded-xl border border-neutral-800 hover:border-emerald-600/60 transition-all cursor-pointer group"
            >
              <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-105 transition-transform" />
              <span>{showBrochure ? 'Hide Brochure' : 'View Brochure'}</span>
              <span className="font-mono text-xs text-emerald-400">↓</span>
            </button>
          </div>

          {/* Embedded Full PDF Brochure Viewer */}
          <BrochureViewer 
            isOpen={showBrochure}
            onToggle={() => setShowBrochure(prev => !prev)}
            className="mt-6"
          />
        </motion.div>
      </main>

      {/* Corporate Footer */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>VIZHIN LLC • SALES-MARKETING INTEGRATION SERVICES</span>
        </div>
      </footer>
    </div>
  );
}
