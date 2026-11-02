import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X, Mail, Building2, Network } from 'lucide-react';
import VizhinLogo from './VizhinLogo';
import { redirectToVizhinOrg, getVizhinOrgUrl, USE_STANDALONE_VIZHIN_ORG } from '../config/orgRouting';

interface SiteHeaderProps {
  currentPage?: 'landing' | 'meddpicc' | 'marketing-analysis' | 'org' | 'portal' | 'partners' | 'about' | 'services';
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

export default function SiteHeader({
  currentPage = 'landing',
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
}: SiteHeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const getPortalOrigin = () => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('portalOrigin');
    }
    return null;
  };

  const VIZHIN_HOMEPAGE_URL = 'https://vizhin.co';

  const handleLogoClick = (e?: React.MouseEvent) => {
    if (typeof window !== 'undefined') {
      // If already on vizhin.co root homepage, smoothly scroll to top
      if (
        (window.location.hostname === 'vizhin.co' || window.location.hostname === 'www.vizhin.co') &&
        window.location.pathname === '/'
      ) {
        if (e) e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // If in local preview mode and already on landing view, smoothly scroll to top
      if (currentPage === 'landing' && window.location.pathname === '/' && onNavigateHome) {
        if (e) e.preventDefault();
        onNavigateHome();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Always navigate directly to https://vizhin.co homepage!
      if (e) e.preventDefault();
      window.location.href = VIZHIN_HOMEPAGE_URL;
    }
  };

  const handleMeddpiccNav = () => {
    const origin = getPortalOrigin();
    if (origin) {
      window.location.assign(`${origin.replace(/\/+$/, '')}/meddpicc`);
      return;
    }
    onNavigateMeddpicc();
  };

  const handleMarketingAnalysisNav = () => {
    const origin = getPortalOrigin();
    if (origin) {
      window.location.assign(`${origin.replace(/\/+$/, '')}/marketing-analysis`);
      return;
    }
    onNavigateMarketingAnalysis?.();
  };

  const handleCrmNav = () => {
    const origin = getPortalOrigin();
    if (origin) {
      window.location.assign(`${origin.replace(/\/+$/, '')}/login`);
      return;
    }
    onEnterPortal();
  };

  const navItems = [
    { type: 'disabled', label: 'Why Vizhin' },
    { 
      type: 'dropdown', 
      name: 'products',
      label: 'Products', 
      content: (
        <div className="p-2.5 w-64 space-y-1.5 text-left">
          {/* Top: ORGVision */}
          <a
            href="https://vizhin.co/org/"
            onClick={() => {
              setActiveDropdown(null);
              setMobileMenuOpen(false);
            }}
            className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-900 transition-colors flex items-center gap-3 cursor-pointer group border border-transparent hover:border-cyan-850/60 block"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
              <Network className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-200 group-hover:text-cyan-400 transition-colors">
                  ORGVision
                </span>
                <span className="text-[10px] font-mono text-cyan-400">→</span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                Workforce Architecture
              </p>
            </div>
          </a>

          {/* Below: VizhinCRM */}
          <button
            type="button"
            onClick={() => {
              setActiveDropdown(null);
              setMobileMenuOpen(false);
              handleCrmNav();
            }}
            className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-900 transition-colors flex items-center gap-3 cursor-pointer group border border-transparent hover:border-emerald-850/60"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
              <Building2 className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-200 group-hover:text-emerald-400 transition-colors">
                  VizhinCRM
                </span>
                <span className="text-[10px] font-mono text-emerald-400">→</span>
              </div>
              <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                Partner & Customer Portal
              </p>
            </div>
          </button>
        </div>
      )
    },
    { 
      type: 'dropdown', 
      name: 'services',
      label: 'Services', 
      content: (
        <div className="p-4 w-80 space-y-4 text-left">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">GTM Acceleration</p>
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => {
                setActiveDropdown(null);
                setMobileMenuOpen(false);
                if (onNavigateStrategicGtmAnalysis) {
                  onNavigateStrategicGtmAnalysis();
                } else {
                  window.location.assign('/strategic-gtm-analysis');
                }
              }}
              className="w-full text-left block p-2 rounded hover:bg-neutral-900 transition-colors cursor-pointer group"
            >
              <p className="text-xs font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>Strategic Go-to-Market Analysis</span>
                <span className="text-[10px] text-emerald-400 font-mono">Explore →</span>
              </p>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Deep-dive audit assessing channel readiness, structural enablement gaps, and partner pipeline health.</p>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveDropdown(null);
                setMobileMenuOpen(false);
                if (onNavigateGtmTech) {
                  onNavigateGtmTech();
                } else {
                  window.location.assign('/gtm-tech');
                }
              }}
              className="w-full text-left block p-2 rounded hover:bg-neutral-900 transition-colors cursor-pointer group"
            >
              <p className="text-xs font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>GTM Technology Stack Optimization</span>
                <span className="text-[10px] text-emerald-400 font-mono">Explore →</span>
              </p>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Audit and optimize CRM, email, revenue operations, and conversation intelligence tools.</p>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveDropdown(null);
                setMobileMenuOpen(false);
                if (onNavigateAuditCompliance) {
                  onNavigateAuditCompliance();
                } else {
                  window.location.assign('/audit-compliance');
                }
              }}
              className="w-full text-left block p-2 rounded hover:bg-neutral-900 transition-colors cursor-pointer group"
            >
              <p className="text-xs font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>Sales Governance & Audit Readiness</span>
                <span className="text-[10px] text-emerald-400 font-mono">Explore →</span>
              </p>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Prepare sales teams for review by senior managers and boards; verify partner accountability and access.</p>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveDropdown(null);
                setMobileMenuOpen(false);
                if (onNavigateMarketingServices) {
                  onNavigateMarketingServices();
                } else {
                  window.location.assign('/marketing-services');
                }
              }}
              className="w-full text-left block p-2 rounded hover:bg-neutral-900 transition-colors cursor-pointer group"
            >
              <p className="text-xs font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>Sales-Marketing Integration Services</span>
                <span className="text-[10px] text-emerald-400 font-mono">Explore →</span>
              </p>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Bridge marketing and sales so every asset feeds your pipeline; align messaging, testimonials, and campaigns.</p>
            </button>
            <button
              onClick={() => {
                setActiveDropdown(null);
                setMobileMenuOpen(false);
                handleMarketingAnalysisNav();
              }}
              className="w-full text-left block p-2 rounded hover:bg-neutral-900 transition-colors cursor-pointer group"
            >
              <p className="text-xs font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                <span>Marketing Analysis</span>
                <span className="text-[10px] text-emerald-400 font-mono">View Brochure →</span>
              </p>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Sublime x Vizhin sales & marketing GTM assessment: find pipeline leaks and align your revenue engine.</p>
            </button>
          </div>
        </div>
      )
    },
    { 
      type: 'action', 
      label: 'MEDDPICC', 
      onClick: handleMeddpiccNav,
      isActive: currentPage === 'meddpicc'
    },
    { type: 'disabled', label: 'Resources' },
    { 
      type: 'dropdown', 
      name: 'partners',
      label: 'Partners', 
      content: (
        <div className="p-4 w-80 space-y-3 text-left">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Partner Ecosystem</p>
          <div className="space-y-2.5">
            <div className="block p-2 rounded hover:bg-neutral-900 transition-colors group">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-neutral-200 group-hover:text-white">Consulting Partners</p>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 uppercase font-semibold">Coming Soon</span>
              </div>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Strategic advisory and GTM consulting firms driving enterprise methodology and client growth.</p>
            </div>

            <div className="block p-2 rounded hover:bg-neutral-900 transition-colors group">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-neutral-200 group-hover:text-white">Technology Partners</p>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 uppercase font-semibold">Coming Soon</span>
              </div>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">ISV platforms, CRM tooling integrations, and architecture solution ecosystems.</p>
            </div>

            <a
              href="/Partners/Joint_Delivery"
              onClick={(e) => {
                if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  setActiveDropdown(null);
                  setMobileMenuOpen(false);
                  if (onNavigateJointDeliveryPartners) {
                    onNavigateJointDeliveryPartners();
                  } else {
                    window.location.assign('/Partners/Joint_Delivery');
                  }
                }
              }}
              className="block p-2 rounded hover:bg-neutral-900 transition-colors group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-neutral-200 group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>Joint Delivery Partners</span>
                  <span className="font-mono text-[10px] text-emerald-400">→</span>
                </p>
              </div>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Collaborative implementation with Sublime Designs Media co-delivering client projects.</p>
            </a>

            <div className="block p-2 rounded hover:bg-neutral-900 transition-colors group">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-neutral-200 group-hover:text-white">Reseller Partners</p>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 uppercase font-semibold">Coming Soon</span>
              </div>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Authorized channel distributors and value-added resellers scaling software licenses and services.</p>
            </div>
          </div>
        </div>
      )
    },
    { 
      type: 'dropdown', 
      name: 'company',
      label: 'Company', 
      content: (
        <div className="p-4 w-64 space-y-2 text-left">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Vizhin LLC</p>
          <div className="space-y-1 text-xs">
            <a
              href="/Company/About"
              onClick={(e) => {
                if (e.button === 0 && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
                  e.preventDefault();
                  setActiveDropdown(null);
                  setMobileMenuOpen(false);
                  if (onNavigateAbout) {
                    onNavigateAbout();
                  } else {
                    window.location.assign('/Company/About');
                  }
                }
              }}
              className="w-full text-left block p-2 rounded hover:bg-neutral-900 text-neutral-200 hover:text-emerald-400 transition-colors cursor-pointer flex items-center justify-between group"
            >
              <span className="font-semibold">About</span>
              <span className="font-mono text-[10px] text-emerald-400">→</span>
            </a>
            <button 
              onClick={() => {
                setActiveDropdown(null);
                window.location.href = 'mailto:rreifel@vizhin.co?subject=Inquiry to Vizhin LLC';
              }}
              className="w-full text-left block p-2 rounded hover:bg-neutral-900 text-neutral-200 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>Contact Us</span>
            </button>
            <div className="block p-2 rounded hover:bg-neutral-900 text-neutral-500 hover:text-neutral-400 transition-colors cursor-not-allowed opacity-60">
              Careers (Inactive)
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <>
      {/* Background Catcher for click-away */}
      {activeDropdown && (
        <div 
          className="fixed inset-0 z-40 cursor-default" 
          onClick={() => setActiveDropdown(null)} 
        />
      )}


      {/* HEADER BAR */}
      <header className="sticky top-0 border-b border-neutral-900/80 bg-[#070708]/90 backdrop-blur-md px-6 py-4 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a
              href="https://vizhin.co"
              onClick={handleLogoClick}
              className="flex items-center hover:opacity-85 transition-opacity focus:outline-none cursor-pointer text-left"
              title="Return to Vizhin Homepage (vizhin.co)"
            >
              <VizhinLogo className="h-14 md:h-16 w-auto" />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navItems.map((item, idx) => {
                if (item.type === 'disabled') {
                  return (
                    <span 
                      key={idx} 
                      className="text-xs font-semibold text-neutral-500 cursor-not-allowed select-none opacity-60 transition-opacity"
                      title="This section is currently disabled"
                    >
                      {item.label}
                    </span>
                  );
                } else if (item.type === 'action') {
                  return (
                    <button
                      key={idx}
                      onClick={item.onClick}
                      className={`text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${
                        item.isActive 
                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60 shadow-sm shadow-emerald-950/50' 
                          : 'text-neutral-300 hover:text-white hover:bg-neutral-900 border-transparent hover:border-neutral-800'
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                } else {
                  const isOpen = activeDropdown === item.name;
                  return (
                    <div key={idx} className="relative">
                      <button
                        onClick={() => toggleDropdown(item.name!)}
                        className={`text-xs font-semibold flex items-center gap-1 transition-colors hover:text-white cursor-pointer ${
                          isOpen ? 'text-emerald-400' : 'text-neutral-350'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : 'text-neutral-500'}`} />
                      </button>

                      {isOpen && (
                        <div className="absolute top-full left-0 mt-3 bg-neutral-950/95 border border-neutral-800 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-sm">
                          {item.content}
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pt-4 border-t border-neutral-900/60 space-y-3"
            >
              {navItems.map((item, idx) => {
                if (item.type === 'disabled') {
                  return (
                    <div 
                      key={idx} 
                      className="px-2 py-1 text-xs font-semibold text-neutral-600 cursor-not-allowed select-none opacity-60"
                    >
                      {item.label} (Inactive)
                    </div>
                  );
                } else if (item.type === 'action') {
                  return (
                    <div key={idx} className="px-2 py-1">
                      <button
                        onClick={() => {
                          setMobileMenuOpen(false);
                          item.onClick?.();
                        }}
                        className={`w-full text-left text-xs font-bold flex items-center justify-between py-1 cursor-pointer ${
                          item.isActive ? 'text-emerald-400 font-extrabold' : 'text-neutral-300 hover:text-white'
                        }`}
                      >
                        <span>{item.label}</span>
                      </button>
                    </div>
                  );
                } else {
                  const isOpen = activeDropdown === item.name;
                  return (
                    <div key={idx} className="space-y-1">
                      <button
                        onClick={() => toggleDropdown(item.name!)}
                        className="w-full px-2 py-1.5 text-xs font-bold flex items-center justify-between text-neutral-350 hover:text-white cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-400' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="pl-4 pr-2 py-2 bg-neutral-950/60 rounded-lg border border-neutral-900 text-xs">
                          {item.content}
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
