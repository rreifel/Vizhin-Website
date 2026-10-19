import React from 'react';
import { motion } from 'motion/react';
import { 
  ShieldCheck, Layers, Users, Activity, Sparkles, Mail, BarChart3
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface LandingPageProps {
  onEnterPortal: () => void;
  onEnterOrg?: () => void;
  onRequestAccount: () => void;
  onNavigateMeddpicc: () => void;
  onNavigateMarketingAnalysis: () => void;
}

export default function LandingPage({ 
  onEnterPortal, 
  onEnterOrg,
  onRequestAccount, 
  onNavigateMeddpicc,
  onNavigateMarketingAnalysis
}: LandingPageProps) {
  return (
    <div id="landing_container" className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col relative overflow-hidden font-sans">
      
      {/* Absolute Decorative Glows */}
      <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-emerald-950/25 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#0D5C46]/20 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-teal-950/20 blur-[130px] pointer-events-none" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none" />

      {/* PERSISTENT GLOBAL SITE HEADER */}
      <SiteHeader 
        currentPage="landing"
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateMeddpicc={onNavigateMeddpicc}
        onNavigateMarketingAnalysis={onNavigateMarketingAnalysis}
        onEnterPortal={onEnterPortal}
        onEnterOrg={onEnterOrg}
        onRequestAccount={onRequestAccount}
      />

      {/* HERO SECTION */}
      <section className="relative pt-16 pb-20 px-6 z-10" id="landing_hero">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 backdrop-blur"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Vizhin LLC • GTM and Consulting Services</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            Driving{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              Go-To-Market Results
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Enabling Go To Market teams with modern methodologies and technology. We provide the services you need to enable your organization to grow.
          </motion.p>

        </div>
      </section>

      {/* CORE CAPABILITIES BENTO GRID */}
      <section className="px-6 py-12 max-w-7xl mx-auto z-10 w-full" id="landing_features">
        <div className="text-center mb-12">
          <p className="text-2xl font-bold text-white tracking-tight">Accelerating Hi-Performance Go-To-Market Teams</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-neutral-900/35 border border-neutral-850/60 p-6 rounded-2xl space-y-4 hover:border-neutral-800 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 flex items-center justify-center border border-emerald-800/60 text-emerald-400 shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-neutral-150">Strategic GTM Analysis</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We design and audit strategic Go-To-Market frameworks, mapping key friction layers and helping partners operate at optimal velocity.
              </p>
            </div>
          </div>

          {/* Feature-2 */}
          <div className="bg-neutral-900/35 border border-neutral-850/60 p-6 rounded-2xl space-y-4 hover:border-neutral-800 transition-all">
            <div className="w-10 h-10 rounded-xl bg-teal-950/80 flex items-center justify-center border border-teal-800/60 text-teal-300 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-neutral-150">GTM Tech</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Modern systems supporting CRM, organizational charting, and comprehensive performance evaluations to scale your team.
              </p>
            </div>
          </div>

          {/* Feature-3 */}
          <div className="bg-neutral-900/35 border border-neutral-850/60 p-6 rounded-2xl space-y-4 hover:border-neutral-800 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#0D5C46]/50 flex items-center justify-center border border-emerald-700/60 text-emerald-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-neutral-150">Audited Compliance</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                All modifications, user assignments, and profile creations are logged continuously to ensure strict partner accountability and audit trails.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-neutral-900/35 border border-neutral-850/60 p-6 rounded-2xl space-y-4 hover:border-neutral-800 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 flex items-center justify-center border border-emerald-800/60 text-emerald-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-neutral-150">Marketing Services</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Aligning marketing with your overall go to market efforts, including the development of brand assets such as video, testimonials, collateral, and website review.
              </p>
            </div>
          </div>

          {/* Feature 5: Marketing Analysis */}
          <div 
            onClick={onNavigateMarketingAnalysis}
            className="bg-neutral-900/35 border border-neutral-850/60 p-6 rounded-2xl space-y-4 hover:border-emerald-500/60 hover:bg-neutral-900/60 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-teal-950/80 flex items-center justify-center border border-teal-800/60 text-teal-300 group-hover:scale-105 transition-transform shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-semibold text-emerald-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                View Brochure →
              </span>
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-neutral-150 group-hover:text-emerald-300 transition-colors">Marketing Analysis</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                In-depth campaign diagnostics, conversion funnel tracking, attribution analytics, and ROI modeling to optimize demand generation efficiency.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="bg-neutral-900/35 border border-neutral-850/60 p-6 rounded-2xl space-y-4 hover:border-neutral-800 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#0D5C46]/50 flex items-center justify-center border border-emerald-700/60 text-emerald-300 shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-neutral-150">Project Management</h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Expert planning, coordination, and execution of complex IT projects, delivering alignment across cross-functional engineering teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CORPORATE FOOTER ADDRESS & DIRECT EMAIL SYSTEM */}
      <section className="px-6 py-12 border-t border-neutral-900/60 bg-[#070708]/90 z-10 w-full" id="landing_corporate_footer">
        <div className="max-w-md mx-auto">
          
          {/* Address Details & Contact */}
          <div className="space-y-1.5 font-mono text-xs text-neutral-300 leading-relaxed bg-neutral-950 border border-neutral-900 p-6 rounded-xl shadow-inner text-center">
            <p className="font-sans font-bold text-sm text-white tracking-tight">Vizhin LLC</p>
            <p>951 20th St #652</p>
            <p>Denver, CO 80201</p>
            
            <div className="pt-4 mt-4 border-t border-neutral-900/80 flex justify-center">
              <button
                onClick={() => window.location.href = 'mailto:rreifel@vizhin.co?subject=Inquiry to Vizhin LLC'}
                className="px-6 py-2.5 bg-[#0e0e11] hover:bg-neutral-850 border border-neutral-800 hover:border-emerald-500/50 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2 group"
              >
                <Mail className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                <span>Contact Us</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER CO-BRAND BANNER */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10" id="landing_footer">
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

// GitHub Actions configuration sync

