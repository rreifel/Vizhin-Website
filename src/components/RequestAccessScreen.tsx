import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, ArrowRight, ShieldCheck, Layers, 
  Database, Users, Sparkles, CheckCircle2, Cpu, ArrowLeft, Mail
} from 'lucide-react';
import VizhinLogo from './VizhinLogo';
import ThemeToggle from './ThemeToggle';

interface RequestAccessScreenProps {
  onBack: () => void;
}

export default function RequestAccessScreen({ onBack }: RequestAccessScreenProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    tier: 'Partner Reseller',
    notes: ''
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.email || !formData.contactName) return;
    setFormSubmitted(true);
  };

  return (
    <div id="request_access_container" className="min-h-screen bg-[#F8FAFC] dark:bg-neutral-950 text-slate-900 dark:text-neutral-100 flex flex-col relative overflow-hidden font-sans transition-colors">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-200/40 dark:bg-emerald-950/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-teal-200/30 dark:bg-[#0D5C46]/20 blur-[120px] pointer-events-none" />

      {/* HEADER BAR - Identical positioning and sizing as landing page */}
      <header className="relative border-b border-slate-200 dark:border-neutral-900/80 bg-white/90 dark:bg-[#070708]/85 backdrop-blur-md px-6 py-4 z-50 w-full transition-colors" id="request_header">
        <div className="max-w-7xl mx-auto flex items-center justify-between w-full">
            <a 
              href="https://vizhin.co"
              onClick={(e) => {
                if (typeof window !== 'undefined') {
                  if (window.location.hostname === 'vizhin.co' || window.location.hostname === 'www.vizhin.co') {
                    window.location.href = 'https://vizhin.co';
                    return;
                  }
                  if (onBack) {
                    e.preventDefault();
                    onBack();
                    return;
                  }
                  window.location.href = 'https://vizhin.co';
                }
              }}
              className="flex items-center hover:opacity-85 transition-opacity focus:outline-none cursor-pointer text-left"
              title="Return to Vizhin Homepage (vizhin.co)"
            >
              <VizhinLogo className="h-14 md:h-16 w-auto" />
            </a>
            <ThemeToggle />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row relative overflow-hidden w-full">

        {/* LEFT PANEL - Enterprise Graphics and Marketing Slider */}
        <div id="request_left_panel" className="hidden md:flex md:w-5/12 bg-slate-50/90 dark:bg-neutral-900/50 border-r border-slate-200 dark:border-neutral-800 p-12 flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-50 dark:opacity-20 pointer-events-none" />
          
          {/* Dynamic Marketing Slider (Enterprise Polish) */}
          <div className="my-auto space-y-8 z-10 max-w-sm" id="request_enterprise_benefits">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950 text-[#0D5C46] dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                <Sparkles className="w-3.5 h-3.5 text-[#0D5C46] dark:text-emerald-400" /> Direct Advisory & CRM
              </span>
              <h2 className="text-3xl font-bold leading-tight text-slate-900 dark:text-white tracking-tight">
                Interactive Sandbox Provisioning.
              </h2>
              <p className="text-slate-600 dark:text-neutral-400 text-sm leading-relaxed">
                Submit your request to configure a dedicated partner staging workspace or corporate single-tenant demo instance.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded-lg bg-white dark:bg-neutral-800/80 border border-slate-200 dark:border-transparent text-[#0D5C46] dark:text-emerald-400 mt-1 shadow-xs dark:shadow-none">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-neutral-200">Bespoke Environments</h4>
                  <p className="text-xs text-slate-500 dark:text-neutral-500">Custom subdomains, preloaded seed pipelines, and customizable role assignments for client walkthroughs.</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <div className="p-1.5 rounded-lg bg-white dark:bg-neutral-800/80 border border-slate-200 dark:border-transparent text-teal-700 dark:text-teal-400 mt-1 shadow-xs dark:shadow-none">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-neutral-200">Isolated Data Tenancy</h4>
                  <p className="text-xs text-slate-500 dark:text-neutral-500">Every sandbox maintains fully segregated database layers, guaranteeing continuous RLS compliance.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-xs text-slate-500 dark:text-neutral-600 font-mono z-10" id="request_left_footer">
            VIZHIN TECHNOLOGIES CO • PORTAL V2.4 • SSL ENCRYPTED
          </div>
        </div>

        {/* RIGHT PANEL - Actual Request Form */}
        <div id="request_right_panel" className="flex-1 flex flex-col justify-center items-center p-6 md:p-16 z-10">

          <div className="w-full max-w-lg bg-white dark:bg-neutral-900/40 border border-slate-200 dark:border-neutral-800/80 backdrop-blur-md rounded-2xl p-8 lg:p-10 shadow-xl dark:shadow-2xl hover:border-slate-300 dark:hover:border-neutral-800 transition-colors">
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.div
                key="form_active"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-neutral-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-[#0D5C46] dark:text-emerald-400" />
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Interactive Sandbox Request</h3>
                  </div>
                  <button
                    onClick={onBack}
                    className="text-xs text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-500 dark:text-neutral-400 font-mono uppercase tracking-wider mb-1 font-semibold">Company / Agency Name *</label>
                      <input
                        type="text"
                        required
                        name="companyName"
                        placeholder="e.g. Apex Resellers"
                        value={formData.companyName}
                        onChange={handleFormChange}
                        className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 dark:text-neutral-400 font-mono uppercase tracking-wider mb-1 font-semibold">Contact Name *</label>
                      <input
                        type="text"
                        required
                        name="contactName"
                        placeholder="Your full name"
                        value={formData.contactName}
                        onChange={handleFormChange}
                        className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-500 dark:text-neutral-400 font-mono uppercase tracking-wider mb-1 font-semibold">Email Address *</label>
                      <input
                        type="email"
                        required
                        name="email"
                        placeholder="you@domain.com"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 dark:text-neutral-400 font-mono uppercase tracking-wider mb-1 font-semibold">Phone (Optional)</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-neutral-400 font-mono uppercase tracking-wider mb-1 font-semibold">Account Tier Requested</label>
                    <select
                      name="tier"
                      value={formData.tier}
                      onChange={handleFormChange}
                      className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                    >
                      <option>Partner Reseller (Multi-Tenant Administrator)</option>
                      <option>End Customer Agency (Single Corporate Instance)</option>
                      <option>System Sandbox Developer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-neutral-400 font-mono uppercase tracking-wider mb-1 font-semibold">Additional Environment Requirements</label>
                    <textarea
                      name="notes"
                      rows={3}
                      placeholder="State any specific region or setup guidelines..."
                      value={formData.notes}
                      onChange={handleFormChange}
                      className="w-full bg-slate-50 dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-lg px-3.5 py-2 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none placeholder:text-slate-400 dark:placeholder:text-neutral-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white font-bold rounded-lg text-xs tracking-tight transition-transform transform active:scale-95 cursor-pointer flex items-center justify-center gap-2 border border-emerald-500/30 shadow-lg shadow-emerald-900/20 dark:shadow-emerald-950/40"
                  >
                    <span>Submit Secure Application</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="form_success"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-6 space-y-4"
              >
                <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 rounded-full flex items-center justify-center mx-auto text-[#0D5C46] dark:text-emerald-400">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1.5 max-w-sm mx-auto">
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Application Received Successfully!</h4>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                    We have logged an intake record on your behalf. A system administrator will review <strong className="text-slate-900 dark:text-neutral-200">{formData.email}</strong> shortly to provision your staging CRM.
                  </p>
                </div>
                <button
                  onClick={onBack}
                  className="mt-4 px-6 py-2 bg-slate-100 dark:bg-neutral-950 hover:bg-slate-200 dark:hover:bg-neutral-900 border border-slate-200 dark:border-neutral-800 text-xs text-slate-800 dark:text-neutral-200 rounded-lg font-semibold cursor-pointer"
                >
                  Return to Homepage
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  </div>
  );
}
