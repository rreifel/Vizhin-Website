import React from 'react';
import { motion } from 'motion/react';
import { Handshake, ArrowLeft, ShieldCheck, Calendar, Mail } from 'lucide-react';
import SiteHeader from './SiteHeader';

interface JointDeliveryPartnersPageProps {
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
  onEnterPortal: () => void;
  onEnterOrg?: () => void;
  onRequestAccount: () => void;
}

export default function JointDeliveryPartnersPage({
  currentUser,
  onSignOut,
  onSignOutOrg,
  onSignOutCRM,
  onSwitchUser,
  onNavigateHome,
  onNavigateMeddpicc,
  onNavigateMarketingAnalysis,
  onNavigateJointDeliveryPartners,
  onEnterPortal,
  onEnterOrg,
  onRequestAccount
}: JointDeliveryPartnersPageProps) {
  return (
    <div className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col relative overflow-hidden font-sans">
      {/* Absolute Decorative Glows */}
      <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-emerald-950/25 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#0D5C46]/20 blur-[150px] pointer-events-none" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none" />

      {/* Site Header */}
      <SiteHeader
        currentPage="partners"
        currentUser={currentUser}
        onSignOut={onSignOut}
        onSignOutOrg={onSignOutOrg}
        onSignOutCRM={onSignOutCRM}
        onSwitchUser={onSwitchUser}
        onNavigateHome={onNavigateHome}
        onNavigateMeddpicc={onNavigateMeddpicc}
        onNavigateMarketingAnalysis={onNavigateMarketingAnalysis}
        onNavigateJointDeliveryPartners={onNavigateJointDeliveryPartners}
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
            Verified Partner Network
          </span>
        </div>

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-xs font-mono font-medium">
            <Handshake className="w-3.5 h-3.5" />
            <span>Collaborative Ecosystem</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Joint Delivery{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              Partners
            </span>
          </h1>

          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Vizhin partners with elite creative, media, and technical specialists to co-deliver comprehensive revenue engine assessments and execution frameworks.
          </p>
        </div>

        {/* Category: Marketing Partners */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-800/80 pb-3">
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <span>Marketing Partners</span>
            </h2>
          </div>

          {/* Featured Partner Card: Sublime Designs Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          className="bg-neutral-900/40 border border-neutral-800/90 hover:border-emerald-700/60 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl space-y-8 transition-all group"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-neutral-800/80">
            {/* Logo Container - Hotlinked to Sublime Designs Media */}
            <div className="w-full md:w-auto flex justify-center">
              <a
                href="https://www.sublimedesignsmedia.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 md:p-8 bg-white rounded-2xl shadow-xl hover:shadow-emerald-500/10 hover:scale-[1.02] transition-all border border-neutral-200 cursor-pointer group/logo"
                title="Visit Sublime Designs Media (Opens in new tab)"
              >
                <img
                  src="/assets/aistudio/Sublime-Designs-Media-Logo_d227f9d2.svg"
                  alt="Sublime Designs Media"
                  className="h-16 md:h-20 w-auto object-contain transition-transform group-hover/logo:scale-105"
                />
              </a>
            </div>

            {/* Partner Details */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold uppercase tracking-wider">
                  Featured Joint Delivery Partner
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  Creative & Digital Media
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Sublime Designs Media
              </h2>

              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed max-w-xl">
                Sublime Designs Media and Vizhin collaborate directly on comprehensive GTM revenue assessments, brand collateral, and high-impact digital storytelling that align sales and marketing engines for sustainable, repeatable expansion.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="https://zcal.co/rreifel/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-950/40 border border-emerald-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Inquire About Joint Engagement</span>
                </a>
              </div>
            </div>
          </div>

          {/* Collaborative Value Framework */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-850/80 space-y-1.5">
              <p className="text-xs font-bold text-emerald-400 font-mono">01 • Unified GTM Funnel</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Sales leadership and creative marketing alignment that prevents pipeline leakage and accelerates lead velocity.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-850/80 space-y-1.5">
              <p className="text-xs font-bold text-emerald-400 font-mono">02 • High-Impact Collateral</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Bespoke video assets, case studies, and digital assets engineered to handle objections and pre-qualify buyers.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-850/80 space-y-1.5">
              <p className="text-xs font-bold text-emerald-400 font-mono">03 • Rapid Deployment</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Synchronized onboarding and execution frameworks that start delivering actionable clarity without months of delay.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Category: CRM Partners */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 border-b border-neutral-800/80 pb-3">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
            <span>CRM Partners</span>
          </h2>
        </div>

        {/* Featured Partner Card: Hive Strategy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-neutral-900/40 border border-neutral-800/90 hover:border-emerald-700/60 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl space-y-8 transition-all group"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-neutral-800/80">
            {/* Logo Container - Hotlinked to Hive Strategy */}
            <div className="w-full md:w-auto flex justify-center">
              <a
                href="https://www.hivestrategy.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-6 md:p-8 bg-white rounded-2xl shadow-xl hover:shadow-amber-500/10 hover:scale-[1.02] transition-all border border-neutral-200 cursor-pointer group/logo"
                title="Visit Hive Strategy (Opens in new tab)"
              >
                <img
                  src="/assets/aistudio/HIVE-Strategy-Logo-2025-V1.1_7478f797.webp"
                  alt="Hive Strategy"
                  className="h-16 md:h-20 w-auto object-contain transition-transform group-hover/logo:scale-105"
                />
              </a>
            </div>

            {/* Partner Details */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-teal-950 text-teal-400 border border-teal-800/60 font-bold uppercase tracking-wider">
                  Featured Joint Delivery Partner
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  HubSpot & CRM Architecture
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Hive Strategy
              </h2>

              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed max-w-xl">
                Hive Strategy is the HubSpot growth consultancy for mid-market and enterprise companies that takes HubSpot further than anyone else. By designing AI-powered ecosystems, crafting sophisticated HubSpot portals, building complex integrations, and curating growth marketing campaigns, we multiply the impact of your marketing, sales, and service teams for true scale.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href="https://zcal.co/rreifel/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-950/40 border border-emerald-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Inquire About Joint Engagement</span>
                </a>
              </div>
            </div>
          </div>

          {/* Collaborative Value Framework */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-850/80 space-y-1.5">
              <p className="text-xs font-bold text-teal-400 font-mono">01 • Sophisticated HubSpot Portals</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Tailored enterprise architecture and customized workflows configured to remove pipeline friction and scale your revenue operations.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-850/80 space-y-1.5">
              <p className="text-xs font-bold text-teal-400 font-mono">02 • AI-Powered Ecosystems</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Automated sales workflows, smart enrichment, and complex systems integrations linking your sales stack end-to-end.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-850/80 space-y-1.5">
              <p className="text-xs font-bold text-teal-400 font-mono">03 • Scaled Sales & Service Impact</p>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Aligning marketing, sales, and service teams around a single source of truth for predictable revenue and high customer retention.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      </main>

      {/* Corporate Footer */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>VIZHIN LLC • SECURED GTM LEADERSHIP & WHITE-LABELED TECHNOLOGY SOLUTIONS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
