import React, { useState } from 'react';
import { 
  Building2, Users, Network, Shield, ArrowRight, ArrowLeft,
  Lock, Mail, User, CheckCircle2, AlertTriangle, Sparkles, 
  Radio, FileSpreadsheet, ShieldAlert, ShieldCheck, ExternalLink,
  ChevronRight, Eye, EyeOff, Zap, Check, Server, Maximize2
} from 'lucide-react';
import SiteHeader from './SiteHeader';
import { OrgProvider } from '../context/OrgContext';
import { OrgChartView } from './OrgChart/OrgChartView';

interface VizhinOrgPageProps {
  onBack: () => void;
  onEnterPortal: () => void;
  onRequestAccount: () => void;
  onNavigateMeddpicc: () => void;
  onNavigateMarketingAnalysis?: () => void;
}

export default function VizhinOrgPage({
  onBack,
  onEnterPortal,
  onRequestAccount,
  onNavigateMeddpicc,
  onNavigateMarketingAnalysis,
}: VizhinOrgPageProps) {
  const standaloneAppUrl = "https://ais-dev-k3dq5q47ugexrlhpj2wpqo-615362750641.us-west2.run.app";

  const handleOpenAppNewTab = () => {
    window.open(standaloneAppUrl, '_blank');
  };

  return (
    <OrgProvider>
      <div className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-neutral-950">
        
        {/* 1. COMPLETE VIZHIN.CO SITE HEADER */}
        <SiteHeader
          currentPage="org"
          onNavigateHome={onBack}
          onNavigateMeddpicc={onNavigateMeddpicc}
          onNavigateMarketingAnalysis={onNavigateMarketingAnalysis}
          onEnterPortal={onEnterPortal}
          onEnterOrg={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onRequestAccount={onRequestAccount}
        />

        {/* 2. SUB-HERO BREADCRUMB & CONTEXT TOOLBAR */}
        <div className="border-b border-neutral-900 bg-[#0a0b0d]/90 px-6 py-2.5">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-400">
              <button 
                onClick={onBack}
                className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Home</span>
              </button>
              <span className="text-neutral-600">/</span>
              <span className="text-emerald-400 font-semibold font-mono">VIZHIN ORG</span>
              <span className="text-neutral-600">/</span>
              <span className="text-neutral-200 font-medium">
                Live Interactive Org Chart Workspace
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Deterministic Recursive RBAC</span>
              </span>

              <button 
                onClick={handleOpenAppNewTab}
                className="px-3 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-[11px] font-mono text-emerald-400 border border-neutral-800 hover:border-emerald-500/60 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Open full standalone application in new tab"
              >
                <span>Open Full Screen</span>
                <Maximize2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. NATIVE EMBEDDED ORG CHART VIEW (Light Grey Canvas, White Boxes, Black Text) */}
        <div className="flex-1 w-full bg-slate-200 flex flex-col relative h-[calc(100vh-112px)] min-h-[750px] overflow-hidden">
          <OrgChartView onOpenReview={(revieweeId) => {
            console.log('Selected reviewee:', revieweeId);
          }} />
        </div>

        {/* 4. COMPLETE VIZHIN.CO CORPORATE FOOTER */}
        <footer className="border-t border-neutral-900/80 bg-[#060607] py-4 px-6 text-center text-xs text-neutral-500 font-mono z-10 shrink-0">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>VIZHIN LLC • SECURED WORKFORCE ARCHITECTURE & RECURSIVE RBAC SYSTEMS</span>
            </div>
            <div className="flex items-center gap-4 text-neutral-400 text-[11px]">
              <span>SOC-2 Type II Certified</span>
              <span>·</span>
              <span>Deterministic RLS Isolation</span>
            </div>
          </div>
        </footer>

      </div>
    </OrgProvider>
  );
}
