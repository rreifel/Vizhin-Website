import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Menu, X, Mail, Building2, Network, LogOut, User } from 'lucide-react';
import VizhinLogo from './VizhinLogo';

interface SiteHeaderProps {
  currentPage?: 'landing' | 'meddpicc' | 'marketing-analysis' | 'org' | 'portal';
  currentUser?: {
    email: string;
    name?: string;
    role?: string;
  } | null;
  onSignOut?: () => void;
  onNavigateHome: () => void;
  onNavigateMeddpicc: () => void;
  onNavigateMarketingAnalysis?: () => void;
  onEnterPortal: () => void;
  onEnterOrg?: () => void;
  onRequestAccount: () => void;
}

export default function SiteHeader({
  currentPage = 'landing',
  currentUser,
  onSignOut,
  onNavigateHome,
  onNavigateMeddpicc,
  onNavigateMarketingAnalysis,
  onEnterPortal,
  onEnterOrg,
  onRequestAccount
}: SiteHeaderProps) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [signInDropdownOpen, setSignInDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDropdown = (name: string) => {
    setSignInDropdownOpen(false);
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const navItems = [
    { type: 'disabled', label: 'Why Vizhin' },
    { 
      type: 'dropdown', 
      name: 'products',
      label: 'Products', 
      content: (
        <div className="p-4 w-40 text-center">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-widest font-mono">Coming Soon</p>
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
            <div className="block p-2 rounded hover:bg-neutral-900 transition-colors cursor-pointer group">
              <p className="text-xs font-semibold text-neutral-200 group-hover:text-white">GTM Situational Analysis</p>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Deep-dive audit assessing channel readiness, structural enablement gaps, and partner pipeline health.</p>
            </div>
            <div className="block p-2 rounded hover:bg-neutral-900 transition-colors cursor-pointer group">
              <p className="text-xs font-semibold text-neutral-200 group-hover:text-white">GTM Consulting</p>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Hands-on strategy and execution framework to scale reseller partners, define clear margins, and boost metrics.</p>
            </div>
            <button
              onClick={() => {
                setActiveDropdown(null);
                setMobileMenuOpen(false);
                onNavigateMarketingAnalysis?.();
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
      onClick: onNavigateMeddpicc,
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

            <div className="block p-2 rounded hover:bg-neutral-900 transition-colors group">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-neutral-200 group-hover:text-white">Joint Delivery Partners</p>
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 uppercase font-semibold">Coming Soon</span>
              </div>
              <p className="text-[10px] text-neutral-500 leading-normal mt-0.5">Collaborative implementation and technical rollout specialists co-delivering client projects.</p>
            </div>

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
            <div className="block p-2 rounded hover:bg-neutral-900 text-neutral-500 hover:text-neutral-400 transition-colors cursor-not-allowed opacity-60">
              About (Inactive)
            </div>
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
            <button
              onClick={onNavigateHome}
              className="flex items-center hover:opacity-85 transition-opacity focus:outline-none cursor-pointer text-left"
              title="Return to Vizhin Homepage"
            >
              <VizhinLogo className="h-14 md:h-16 w-auto" />
            </button>

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
            {currentUser ? (
              <div className="flex items-center gap-2.5">
                {/* Active User Identity Chip */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-neutral-950 font-black text-[11px] flex items-center justify-center">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : currentUser.email[0].toUpperCase()}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-white text-[11px] leading-tight truncate max-w-[140px]">
                      {currentUser.name || currentUser.email}
                    </p>
                    <p className="text-[9px] font-mono text-emerald-400 uppercase leading-none mt-0.5">
                      {currentUser.role || 'Active Session'}
                    </p>
                  </div>
                </div>

                {/* Direct Sign Out Button */}
                <button
                  type="button"
                  onClick={onSignOut}
                  className="px-3.5 py-1.5 rounded-lg bg-red-950/70 hover:bg-red-900/90 text-red-300 hover:text-white border border-red-800/70 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer hover:scale-105"
                  title="Sign out of current account to switch user"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                {/* Sign In Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setSignInDropdownOpen(prev => !prev);
                      setActiveDropdown(null);
                    }}
                    className={`px-3.5 py-2 text-xs font-bold transition-all cursor-pointer bg-neutral-900 border rounded-lg flex items-center gap-1.5 ${
                      signInDropdownOpen 
                        ? 'text-white border-emerald-500/60 bg-neutral-850 shadow-md shadow-emerald-950/40' 
                        : 'text-neutral-350 hover:text-white border-neutral-800 hover:border-neutral-700'
                    }`}
                    aria-expanded={signInDropdownOpen}
                  >
                    <span>Sign In</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${signInDropdownOpen ? 'rotate-180 text-emerald-400' : 'text-neutral-500'}`} />
                  </button>

                  {signInDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2.5 w-64 bg-neutral-950/95 border border-neutral-800 rounded-xl shadow-2xl z-50 p-2 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-md">
                      <p className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                        Select Platform
                      </p>

                      {/* Option 1: VizhinCRM */}
                      <button
                        onClick={() => {
                          setSignInDropdownOpen(false);
                          onEnterPortal();
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-900 transition-colors flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-neutral-200 group-hover:text-emerald-400 transition-colors">
                              VizhinCRM
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                            Partner & Customer Portal
                          </p>
                        </div>
                      </button>

                      {/* Option 2: Sign In to VizhinORG */}
                      <button
                        onClick={() => {
                          setSignInDropdownOpen(false);
                          onEnterOrg?.();
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-neutral-900 transition-colors flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                          <Network className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-neutral-200 group-hover:text-cyan-400 transition-colors">
                              Sign In to VizhinORG
                            </span>
                            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-700/60 font-bold">
                              COMING SOON
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">
                            Workforce & Org Architecture
                          </p>
                        </div>
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={onRequestAccount}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-semibold rounded-lg shadow-md shadow-emerald-950/40 border border-emerald-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Request Access
                </button>
              </>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-1.5 text-neutral-400 hover:text-white transition-colors"
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
                        className={`w-full text-left text-xs font-bold flex items-center justify-between py-1 ${
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
                        className="w-full px-2 py-1.5 text-xs font-bold flex items-center justify-between text-neutral-350 hover:text-white"
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

              {/* Mobile Actions: User & Sign Out OR Sign In Platforms */}
              {currentUser ? (
                <div className="pt-3 border-t border-neutral-900 space-y-2">
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{currentUser.name || currentUser.email}</p>
                      <p className="text-[10px] font-mono text-emerald-400 uppercase">{currentUser.role || 'Active Session'}</p>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onSignOut?.();
                    }}
                    className="w-full py-2.5 px-3 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/70 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-red-400" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="pt-3 border-t border-neutral-900 space-y-2">
                  <p className="px-2 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
                    Sign In Platform
                  </p>
                  <div className="grid grid-cols-2 gap-2 px-1">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onEnterPortal();
                      }}
                      className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-left cursor-pointer hover:border-emerald-700/60"
                    >
                      <p className="text-xs font-bold text-emerald-400">VizhinCRM</p>
                      <p className="text-[10px] text-neutral-400">Partner & Customer</p>
                    </button>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onEnterOrg?.();
                      }}
                      className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-left cursor-pointer hover:border-cyan-700/60"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-cyan-400">Sign In to VizhinORG</p>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950/80 text-amber-300 border border-amber-700/60 font-bold">
                          COMING SOON
                        </span>
                      </div>
                      <p className="text-[10px] text-neutral-400 mt-0.5">Workforce & Teams</p>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
