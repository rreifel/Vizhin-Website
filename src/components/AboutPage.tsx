import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ShieldCheck, Calendar, Globe2, Target, Award, CheckCircle, Zap } from 'lucide-react';
import SiteHeader from './SiteHeader';

interface AboutPageProps {
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
  onEnterPortal: () => void;
  onEnterOrg?: () => void;
  onRequestAccount: () => void;
}

export default function AboutPage({
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
  onEnterPortal,
  onEnterOrg,
  onRequestAccount
}: AboutPageProps) {
  return (
    <div className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col relative overflow-hidden font-sans">
      {/* Absolute Decorative Glows */}
      <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-emerald-950/25 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#0D5C46]/20 blur-[150px] pointer-events-none" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none" />

      {/* Site Header */}
      <SiteHeader
        currentPage="about"
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
        </div>

        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            About{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              Vizhin
            </span>
          </h1>

          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto">
            Providing founders and CEOs with senior go-to-market leadership, operational discipline, and battlefield-tested execution.
          </p>
        </div>

        {/* Section 1: The Vizhin Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-neutral-900/40 border border-neutral-800/90 hover:border-emerald-700/60 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl space-y-6 transition-all"
        >
          <div className="flex items-center gap-3 border-b border-neutral-800/80 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">Core Principle</span>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                The Vizhin Philosophy: Senior Elite Expertise. Zero Bloat.
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs md:text-sm text-neutral-300 leading-relaxed font-normal">
            <p>
              Growth-stage companies do not need massive consulting firms, endless slide decks, or armies of junior analysts learning the ropes on your dime. When you are scaling a company, every dollar matters, and every hire must deliver immediate, measurable ROI. Vizhin was built on a simple premise: provide founders and CEOs with the elite sales governance and go-to-market leadership they need, completely stripped of corporate overhead.
            </p>
            <p>
              We are a lean, agile consultancy. When you partner with Vizhin, you are working directly with seasoned, battlefield-tested sales executives. We do not have a flashy corporate headquarters, we do not pass your business down to junior account managers, and we do not bundle unnecessary software or retainers into your invoice. Instead, we plug directly into your leadership ecosystem, diagnose your bottlenecks, and build the repeatable sales engines your company requires to hit the next tier of valuation.
            </p>
          </div>
        </motion.div>

        {/* Section 2: An Elite, On-Demand Network */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="bg-neutral-900/40 border border-neutral-800/90 hover:border-emerald-700/60 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl space-y-6 transition-all"
        >
          <div className="flex items-center gap-3 border-b border-neutral-800/80 pb-4">
            <div className="w-10 h-10 rounded-xl bg-teal-950/80 border border-teal-800/60 flex items-center justify-center text-teal-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400">Execution Framework</span>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                An Elite, On-Demand Network Built for Impact
              </h2>
            </div>
          </div>

          <div className="space-y-4 text-xs md:text-sm text-neutral-300 leading-relaxed font-normal">
            <p>
              While we keep our core footprint small to protect your capital, our reach is intentionally broad. Over decades in the technology and sales ecosystems, we have built a trusted, deeply vetted network of independent specialists—from CRM integration architects to specialized technical project managers.
            </p>
            <p>
              We don't force you into a massive, one-size-fits-all contract that pays for talent you don't actually need. Instead, we assemble modular, project-specific dream teams tailored precisely to your current operational milestone. You get the surgical execution of an elite enterprise agency with the speed, cost-efficiency, and highly personalized attention of a boutique partner. We scale up when your project demands it, and scale down when it is done, keeping your runway protected while maximizing your market impact.
            </p>
          </div>
        </motion.div>

        {/* Section 3: Founder & Leadership Spotlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-neutral-900/40 border border-emerald-850/70 hover:border-emerald-600/70 rounded-3xl p-8 md:p-12 backdrop-blur-md shadow-2xl space-y-8 transition-all"
        >
          <div className="flex items-center gap-3 border-b border-neutral-800/80 pb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">Leadership Spotlight</span>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                Founder & Principal Executive
              </h2>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
            {/* Founder Photo & Quick Details */}
            <div className="flex flex-col items-center text-center shrink-0 w-full sm:w-64">
              <div className="relative group/photo">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-30 blur group-hover/photo:opacity-60 transition duration-300" />
                <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-emerald-800/80 shadow-2xl bg-neutral-950">
                  <img
                    src="/assets/aistudio/1741789882645_090db614.jpg"
                    alt="Richard Reifel - Founder of Vizhin"
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover/photo:scale-105"
                  />
                </div>
              </div>

              <div className="mt-4 space-y-1">
                <h3 className="text-lg font-bold text-white tracking-tight">Richard Reifel</h3>
                <p className="text-xs font-mono text-emerald-400 font-semibold">Founder & Chief Revenue Executive</p>
                <p className="text-[11px] text-neutral-400 font-mono">Vizhin LLC</p>
              </div>

              <div className="mt-4 pt-4 border-t border-neutral-800/80 w-full flex flex-col gap-2">
                <a
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-bold rounded-xl shadow-md border border-emerald-500/30 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Book Strategy Call</span>
                </a>
              </div>
            </div>

            {/* Founder Biography Content */}
            <div className="flex-1 space-y-5 text-left">
              <div className="space-y-1">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60 font-bold uppercase tracking-wider">
                  Executive Profile
                </span>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                  Global Sales Leader & Fractional Chief Revenue Officer
                </h3>
              </div>

              <div className="space-y-3.5 text-xs md:text-sm text-neutral-300 leading-relaxed font-normal">
                <p className="text-neutral-200 font-medium text-sm md:text-base border-l-2 border-emerald-500 pl-3">
                  Global Sales Leader/Chief Revenue Officer with experience building high-performing teams in startups and large corporations. Success focused.
                </p>

                <p>
                  Experienced in developing best practices, cadence and disciplines for GTM, laying the foundation for growth and investment.
                </p>

                <p className="flex items-start gap-2">
                  <Globe2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Having lived and worked in the Middle East and conducted extensive business in Europe and Asia, I bring a well-rounded global perspective with a proven track record in the international arena.
                  </span>
                </p>
              </div>

              {/* Specialties Section */}
              <div className="pt-3">
                <div className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-850/90 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <h4 className="text-xs md:text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Specialties & Core Competencies
                    </h4>
                  </div>
                  
                  <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                    Driving revenue, turning around struggling sales teams, building channel relationships, ensuring customer success with technology, team leadership, and high personal energy.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      • Driving Revenue
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      • Sales Team Turnaround
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      • Channel & Partner Ecosystems
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      • Customer Success With Technology
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      • Disciplined GTM Cadence
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300">
                      • High Personal Energy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Corporate Footer */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>VIZHIN LLC • SENIOR GO-TO-MARKET LEADERSHIP & PROVEN REVENUE EXECUTION</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
