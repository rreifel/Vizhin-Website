import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Mail, MapPin, Globe, ArrowRight, ShieldCheck, 
  Send, Layers, BarChart3, Users, CheckCircle2, Shield
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface ContactPageProps {
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

export default function ContactPage({
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
}: ContactPageProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [cellPhone, setCellPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const trimmedFirst = firstName.trim();
    const trimmedLast = lastName.trim();
    const trimmedEmail = email.trim();
    const trimmedCompany = company.trim();
    const trimmedPhone = cellPhone.trim();
    const trimmedNotes = notes.trim();

    if (!trimmedFirst || !trimmedLast || !trimmedEmail || !trimmedCompany || !trimmedNotes) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    const submissionPayload = {
      firstName: trimmedFirst,
      lastName: trimmedLast,
      email: trimmedEmail,
      company: trimmedCompany,
      cellPhone: trimmedPhone,
      notes: trimmedNotes,
      timestamp: new Date().toISOString()
    };

    // Secondary local backup (never the primary submission method)
    try {
      const backupEntry = {
        ...submissionPayload,
        id: `contact_backup_${Date.now()}`,
        source: 'vizhin.co/contact',
        recipient: 'rreifel@vizhin.co'
      };
      const existingRaw = localStorage.getItem('vzn_contact_submissions_backup');
      const list = existingRaw ? JSON.parse(existingRaw) : [];
      list.unshift(backupEntry);
      localStorage.setItem('vzn_contact_submissions_backup', JSON.stringify(list));
    } catch (err) {
      console.warn('Local backup warning:', err);
    }

    try {
      // Send form data to lightweight PHP endpoint on Apache/LiteSpeed host
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(submissionPayload)
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonErr) {
        result = null;
      }

      if (response.ok && result?.success) {
        // Redirect to scheduling link ONLY after email send succeeds, pre-populating zcal invite
        const fullName = `${trimmedFirst} ${trimmedLast}`.trim();
        const zcalUrl = `https://zcal.co/rreifel/30min?name=${encodeURIComponent(fullName)}&email=${encodeURIComponent(trimmedEmail)}&a0=${encodeURIComponent(trimmedCompany)}&a1=${encodeURIComponent(trimmedNotes)}`;
        window.location.assign(zcalUrl);
      } else {
        const errorMsg = result?.error || 'Unable to submit your message right now. Please try again or email rreifel@vizhin.co directly.';
        setFormError(errorMsg);
        setIsSubmitting(false);
      }
    } catch (networkErr) {
      console.error('Contact submission error:', networkErr);
      setFormError('A network connection error occurred while sending your message. Please try again or email rreifel@vizhin.co directly.');
      setIsSubmitting(false);
    }
  };

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
      <main className="flex-1 px-6 pt-12 pb-24 max-w-4xl mx-auto z-10 w-full space-y-12">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome();
            }}
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-emerald-400 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </a>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-semibold uppercase tracking-wider">
            Direct Inquiry
          </span>
        </div>

        {/* Hero Section with EXACTLY ONE H1 HEADING */}
        <div className="space-y-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shadow-md inline-flex">
            <Mail className="w-6 h-6" />
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Contact Vizhin
          </h1>
        </div>

        {/* Contact Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8 md:p-10 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 shadow-2xl relative backdrop-blur-sm space-y-8"
        >
          {/* Intro text displayed on the form */}
          <div className="space-y-2 border-b border-neutral-800/70 pb-6">
            <p className="text-base md:text-lg text-neutral-200 font-medium">
              Give us a little info and we'll send you right to the scheduling link.
            </p>
            <p className="text-xs text-neutral-400 font-mono">
              Fields marked with an asterisk (<span className="text-emerald-400">*</span>) are required.
            </p>
          </div>

          {formError && (
            <div className="p-4 rounded-xl bg-red-950/50 border border-red-800/60 text-red-200 text-xs font-medium">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First name */}
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                  First name <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Richard"
                  className="w-full px-4 py-3 bg-neutral-950/80 border border-neutral-800 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 rounded-xl text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                />
              </div>

              {/* Last name */}
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                  Last name <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Hendricks"
                  className="w-full px-4 py-3 bg-neutral-950/80 border border-neutral-800 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 rounded-xl text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                  Email <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="r.hendricks@piedpiper.com"
                  className="w-full px-4 py-3 bg-neutral-950/80 border border-neutral-800 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 rounded-xl text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label htmlFor="company" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                  Company <span className="text-emerald-400">*</span>
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Pied Piper Inc."
                  className="w-full px-4 py-3 bg-neutral-950/80 border border-neutral-800 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 rounded-xl text-sm text-white placeholder-neutral-600 outline-none transition-colors"
                />
              </div>
            </div>

            {/* Cell phone (optional) */}
            <div className="space-y-2">
              <label htmlFor="cellPhone" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono flex items-center justify-between">
                <span>Cell phone</span>
                <span className="text-[11px] text-neutral-500 lowercase font-normal">(optional)</span>
              </label>
              <input
                id="cellPhone"
                name="cellPhone"
                type="tel"
                value={cellPhone}
                onChange={(e) => setCellPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="w-full px-4 py-3 bg-neutral-950/80 border border-neutral-800 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 rounded-xl text-sm text-white placeholder-neutral-600 outline-none transition-colors"
              />
            </div>

            {/* Tell me how I can help (notes textarea, required) */}
            <div className="space-y-2">
              <label htmlFor="notes" className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider font-mono">
                Tell me how I can help <span className="text-emerald-400">*</span>
              </label>
              <textarea
                id="notes"
                name="notes"
                required
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Give us a brief overview of your current revenue model, sales headcount, CRM stack, or primary friction point..."
                className="w-full px-4 py-3 bg-neutral-950/80 border border-neutral-800 focus:border-emerald-500/80 focus:ring-1 focus:ring-emerald-500/80 rounded-xl text-sm text-white placeholder-neutral-600 outline-none transition-colors resize-y leading-relaxed"
              />
            </div>

            {/* Submit Button labeled Send Message */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-neutral-950 rounded-xl text-base font-bold transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] cursor-pointer flex items-center justify-center gap-2 group"
              >
                <Send className="w-4 h-4 text-neutral-950 group-hover:translate-x-0.5 transition-transform" />
                <span>{isSubmitting ? 'Submitting...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Other ways to reach us section */}
        <div className="p-8 md:p-10 rounded-2xl bg-neutral-950 border border-neutral-900 shadow-xl space-y-6 text-left">
          <div className="border-b border-neutral-900 pb-4">
            <h2 className="text-xl font-bold text-white tracking-tight">
              Other ways to reach us
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-1">
              Direct communication channels & corporate headquarters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email link */}
            <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-850 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <Mail className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Direct Email</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Send inquiries directly to our leadership team:
              </p>
              <div>
                <a
                  href="mailto:rreifel@vizhin.co"
                  className="text-sm font-semibold text-emerald-400 hover:text-emerald-300 hover:underline transition-colors break-all"
                >
                  rreifel@vizhin.co
                </a>
              </div>
            </div>

            {/* Base address & nationwide service */}
            <div className="p-5 rounded-xl bg-neutral-900/40 border border-neutral-850 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">Base Location & Service Area</span>
              </div>
              <p className="text-xs text-neutral-300 font-medium">
                Vizhin LLC, 951 20th St #652, Denver, CO 80201
              </p>
              <div className="flex items-start gap-1.5 pt-1 text-[11px] text-neutral-400">
                <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Headquartered in Denver, Colorado. Vizhin serves growth-stage companies nationwide across the entire United States.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Links back to the homepage and to the services pages */}
        <div className="pt-8 border-t border-neutral-850/80 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-300 font-bold">
                Advisory Services & Navigation
              </h3>
              <p className="text-xs text-neutral-500 font-mono mt-0.5">
                Explore our full suite of go-to-market solutions
              </p>
            </div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors inline-flex items-center gap-1 cursor-pointer font-bold"
            >
              <span>Return to Homepage</span>
              <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-left">
            <a
              href="/strategic-gtm-analysis"
              onClick={(e) => {
                if (onNavigateStrategicGtmAnalysis) {
                  e.preventDefault();
                  onNavigateStrategicGtmAnalysis();
                }
              }}
              className="p-4 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all block group"
            >
              <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Strategic Go-to-Market Analysis
              </p>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Uncover hidden friction and realign pricing & buyer personas.
              </p>
            </a>

            <a
              href="/gtm-tech"
              onClick={(e) => {
                if (onNavigateGtmTech) {
                  e.preventDefault();
                  onNavigateGtmTech();
                }
              }}
              className="p-4 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all block group"
            >
              <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                GTM Tech Stack Optimization
              </p>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Audit CRM, email, RevOps, and intelligence platforms.
              </p>
            </a>

            <a
              href="/audit-compliance"
              onClick={(e) => {
                if (onNavigateAuditCompliance) {
                  e.preventDefault();
                  onNavigateAuditCompliance();
                }
              }}
              className="p-4 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all block group"
            >
              <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Sales Governance & Audit
              </p>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Verify partner accountability, access, and audit trails.
              </p>
            </a>

            <a
              href="/marketing-services"
              onClick={(e) => {
                if (onNavigateMarketingServices) {
                  e.preventDefault();
                  onNavigateMarketingServices();
                }
              }}
              className="p-4 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all block group"
            >
              <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Sales-Marketing Integration
              </p>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Bridge marketing assets and campaigns directly to revenue.
              </p>
            </a>

            <a
              href="/marketing-analysis"
              onClick={(e) => {
                if (onNavigateMarketingAnalysis) {
                  e.preventDefault();
                  onNavigateMarketingAnalysis();
                }
              }}
              className="p-4 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all block group"
            >
              <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Revenue Analytics & ROI
              </p>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Map first-click to closed-won conversion attribution.
              </p>
            </a>

            <a
              href="/sales-team-accountability"
              onClick={(e) => {
                if (onNavigateSalesTeamAccountability) {
                  e.preventDefault();
                  onNavigateSalesTeamAccountability();
                }
              }}
              className="p-4 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all block group"
            >
              <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Sales Team Accountability
              </p>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Architect KPI scorecards and quota ramp accountability.
              </p>
            </a>

            <a
              href="/sales-hiring-strategy"
              onClick={(e) => {
                if (onNavigateSalesHiringStrategy) {
                  e.preventDefault();
                  onNavigateSalesHiringStrategy();
                }
              }}
              className="p-4 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all block group"
            >
              <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Predictable Sales Hiring
              </p>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                Candidate vetting scorecards and predictable sales ramp.
              </p>
            </a>

            <a
              href="/technology-project-management"
              onClick={(e) => {
                if (onNavigateTechnologyProjectManagement) {
                  e.preventDefault();
                  onNavigateTechnologyProjectManagement();
                }
              }}
              className="p-4 rounded-xl bg-neutral-900/40 hover:bg-neutral-900/80 border border-neutral-850 hover:border-emerald-600/60 transition-all block group"
            >
              <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                Technology Project Mgmt
              </p>
              <p className="text-[11px] text-neutral-400 mt-1 leading-snug">
                De-risk deployment roadmaps and align technical scope.
              </p>
            </a>
          </div>
        </div>
      </main>

      {/* Corporate Footer (Sitewide Standard) */}
      <footer className="border-t border-neutral-900/80 bg-[#060607] py-8 px-6 text-center text-xs text-neutral-500 font-mono z-10" id="contact_footer">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>VIZHIN LLC • SECURED GTM LEADERSHIP & WHITE-LABELED TECHNOLOGY SOLUTIONS</span>
        </div>
      </footer>
    </div>
  );
}
