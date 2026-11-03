import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Network, Bell, CheckCircle2, ArrowRight, ShieldCheck, Mail, X, Building, Send, Sparkles
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface OrgComingSoonPageProps {
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

export default function OrgComingSoonPage({
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
}: OrgComingSoonPageProps) {
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [savedData, setSavedData] = useState<{ company: string; email: string } | null>(null);

  const handleDone = () => {
    setShowNotifyModal(false);
    if (typeof window !== 'undefined' && (window.location.hostname === 'vizhin.co' || window.location.hostname === 'www.vizhin.co')) {
      window.location.assign('https://vizhin.co');
      return;
    }
    onNavigateHome();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedCompany = companyName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedCompany) {
      setErrorMessage('Please enter your company name.');
      return;
    }

    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setErrorMessage('Please enter a valid work email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Retain information locally in localStorage
      const newEntry = {
        id: `waitlist_${Date.now()}`,
        companyName: trimmedCompany,
        email: trimmedEmail,
        source: 'vizhin.co/org',
        recipient: 'rreifel@vizhin.co',
        submittedAt: new Date().toISOString()
      };

      const existingRaw = localStorage.getItem('vzn_org_waitlist');
      const list = existingRaw ? JSON.parse(existingRaw) : [];
      list.unshift(newEntry);
      localStorage.setItem('vzn_org_waitlist', JSON.stringify(list));

      setSavedData({ company: trimmedCompany, email: trimmedEmail });
      setIsSubmitted(true);
      setCompanyName('');
      setEmail('');
    } catch (err) {
      console.error('Error saving waitlist notification:', err);
      setErrorMessage('Unable to save notification request. Please try again or email rreifel@vizhin.co directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-100 relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-black flex flex-col justify-between">
      {/* Absolute Decorative Glows matching Homepage */}
      <div className="absolute top-[-30%] left-[-20%] w-[80vw] h-[80vw] rounded-full bg-emerald-950/25 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#0D5C46]/20 blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-teal-950/20 blur-[130px] pointer-events-none" />

      {/* Grid Pattern Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.15] pointer-events-none" />

      {/* Persistent Global Header */}
      <SiteHeader 
        currentPage="org"
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

      {/* MAIN BODY: IDENTICAL TO HOME SCREEN, BUT BELOW HEADER JUST SAYS 'ORGVizhin is coming soon.' */}
      <main className="relative flex-1 flex flex-col items-center justify-center px-6 py-20 z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 backdrop-blur shadow-sm shadow-cyan-950/40"
          >
            <Network className="w-3.5 h-3.5 text-cyan-400" />
            <span>ORGVizhin • Workforce Architecture</span>
          </motion.div>

          {/* Core Headline */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            ORGVizhin is coming soon.
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed font-normal"
          >
            Dynamic workforce modeling, real-time organizational visualization, and cross-functional team alignment for high-performance enterprises.
          </motion.p>

          {/* Action Trigger */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              type="button"
              onClick={() => {
                setShowNotifyModal(true);
                setIsSubmitted(false);
                setErrorMessage('');
              }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-cyan-950/50 border border-cyan-400/30 transition-all transform hover:-translate-y-0.5 cursor-pointer group"
            >
              <Bell className="w-4 h-4 text-cyan-200 group-hover:scale-110 transition-transform" />
              <span>Notify me when it's ready</span>
              <span className="font-mono text-cyan-200 group-hover:translate-x-0.5 transition-transform">→</span>
            </button>

            <button
              type="button"
              onClick={onNavigateHome}
              className="px-5 py-3.5 bg-neutral-900/90 hover:bg-neutral-850 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 rounded-xl text-sm font-medium transition-all cursor-pointer"
            >
              Back to Home
            </button>
          </motion.div>

          {/* Inline notification info badge */}
          {savedData && !showNotifyModal && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-800/60 max-w-md mx-auto text-left flex items-start gap-3 text-xs text-neutral-300"
            >
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-cyan-300">Notification Request Retained</p>
                <p className="text-neutral-400 mt-0.5">
                  We'll contact <span className="text-neutral-200 font-medium">{savedData.email}</span> ({savedData.company}) at launch. Notification forwarded to <span className="font-mono text-neutral-300">rreifel@vizhin.co</span>.
                </p>
              </div>
            </motion.div>
          )}

        </div>
      </main>

      {/* NOTIFY ME MODAL / DIALOG */}
      <AnimatePresence>
        {showNotifyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifyModal(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-md bg-[#0d0d10] border border-cyan-800/70 rounded-2xl shadow-2xl p-6 sm:p-7 z-10 text-left overflow-hidden"
            >
              {/* Decorative top accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-500" />

              {/* Close button */}
              <button
                type="button"
                onClick={() => setShowNotifyModal(false)}
                className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-950/90 border border-cyan-800/70 flex items-center justify-center text-cyan-400 shrink-0 shadow-sm shadow-cyan-950/60">
                      <Bell className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        Notify me when it's ready
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Get early access updates for ORGVizhin
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-400 mb-5 leading-relaxed">
                    Leave your details below. We retain your request and forward notification details directly to <span className="font-mono text-cyan-300">rreifel@vizhin.co</span> so our leadership team can contact you.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMessage && (
                      <div className="p-2.5 rounded-lg bg-red-950/50 border border-red-800/60 text-xs text-red-300">
                        {errorMessage}
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label htmlFor="companyName" className="block text-xs font-semibold text-neutral-300">
                        Company Name <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                        <input
                          id="companyName"
                          type="text"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Acme Corporation"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-cyan-500 focus:outline-none rounded-xl text-xs text-neutral-100 placeholder:text-neutral-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="email" className="block text-xs font-semibold text-neutral-300">
                        Work Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
                        <input
                          id="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@company.com"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-neutral-950 border border-neutral-800 focus:border-cyan-500 focus:outline-none rounded-xl text-xs text-neutral-100 placeholder:text-neutral-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowNotifyModal(false)}
                        className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-white rounded-xl text-xs font-medium transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-cyan-950/50 cursor-pointer flex items-center gap-2"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmitting ? 'Recording...' : 'Notify Me'}</span>
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="space-y-5 py-2 text-center">
                  <div className="w-12 h-12 rounded-full bg-cyan-950 border border-cyan-800/80 flex items-center justify-center text-cyan-400 mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      You're on the list!
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto leading-relaxed">
                      Thank you. Your request for <span className="text-neutral-200 font-semibold">{savedData?.company}</span> has been retained and forwarded to <span className="font-mono text-cyan-300">rreifel@vizhin.co</span>.
                    </p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleDone}
                      className="w-full py-3 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-bold tracking-wider rounded-xl transition-all shadow-md shadow-emerald-950/40 cursor-pointer"
                    >
                      DONE
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CORPORATE FOOTER ADDRESS & DIRECT EMAIL SYSTEM (IDENTICAL TO HOMEPAGE) */}
      <section className="px-6 py-12 border-t border-neutral-900/60 bg-[#070708]/90 z-10 w-full" id="org_corporate_footer">
        <div className="max-w-md mx-auto">
          <div className="space-y-1.5 font-mono text-xs text-neutral-300 leading-relaxed bg-neutral-950 border border-neutral-900 p-6 rounded-xl shadow-inner text-center">
            <p className="font-sans font-bold text-sm text-white tracking-tight">Vizhin LLC</p>
            <p>951 20th St #652</p>
            <p>Denver, CO 80201</p>
            
            <div className="pt-4 mt-4 border-t border-neutral-900/80 flex justify-center">
              <a
                href="/contact"
                className="px-6 py-2.5 bg-[#0e0e11] hover:bg-neutral-850 border border-neutral-800 hover:border-emerald-500/50 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-2 group"
              >
                <Mail className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                <span>Contact Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CO-BRAND BANNER (IDENTICAL TO HOMEPAGE) */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10" id="org_footer">
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
