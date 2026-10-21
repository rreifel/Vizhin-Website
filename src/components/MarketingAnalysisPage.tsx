import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Download, Printer, ArrowLeft, ExternalLink, Mail, Phone, 
  FileText, CheckCircle2, ChevronRight, Eye, Sparkles, Share2
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface MarketingAnalysisPageProps {
  currentUser?: {
    email: string;
    name?: string;
    role?: string;
  } | null;
  onSignOut?: () => void;
  onSignOutOrg?: () => void;
  onSignOutCRM?: () => void;
  onSwitchUser?: (user: any) => void;
  onBack: () => void;
  onEnterPortal: () => void;
  onEnterOrg?: () => void;
  onRequestAccount: () => void;
  onNavigateMeddpicc: () => void;
}

export default function MarketingAnalysisPage({
  currentUser,
  onSignOut,
  onSignOutOrg,
  onSignOutCRM,
  onSwitchUser,
  onBack,
  onEnterPortal,
  onEnterOrg,
  onRequestAccount,
  onNavigateMeddpicc
}: MarketingAnalysisPageProps) {
  const [activeView, setActiveView] = useState<'both' | 'page1' | 'page2'>('both');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadStandalone = () => {
    // Generate clean standalone offline HTML file with embedded styling
    const pageHtml = document.getElementById('printable_brochure_container')?.outerHTML || '';
    const fullDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Sublime x Vizhin - GTM Assessment Brochure</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page { size: letter portrait; margin: 0; }
    body { margin: 0; padding: 20px; background: #0c0d0e; color: #111; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .brochure-sheet { max-width: 8.5in; margin: 0 auto 30px auto; background: white; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border-radius: 4px; overflow: hidden; page-break-after: always; }
    @media print {
      body { padding: 0; background: white; }
      .brochure-sheet { margin: 0; box-shadow: none; border-radius: 0; page-break-after: always; }
    }
  </style>
</head>
<body>
  ${pageHtml}
</body>
</html>`;
    const blob = new Blob([fullDoc], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Sublime-Vizhin-GTM-Assessment-Brochure.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col font-sans relative selection:bg-emerald-500/30">
      
      {/* PERSISTENT GLOBAL SITE HEADER (Retained exactly as requested) */}
      <div className="no-print">
        <SiteHeader 
          currentPage="marketing-analysis"
          currentUser={currentUser}
          onSignOut={onSignOut}
          onSignOutOrg={onSignOutOrg}
          onSignOutCRM={onSignOutCRM}
          onSwitchUser={onSwitchUser}
          onNavigateHome={onBack}
          onNavigateMeddpicc={onNavigateMeddpicc}
          onNavigateMarketingAnalysis={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onEnterPortal={onEnterPortal}
          onEnterOrg={onEnterOrg}
          onRequestAccount={onRequestAccount}
        />
      </div>

      {/* TOP CONTROL BAR & BREADCRUMB (Hidden during print) */}
      <div className="no-print border-b border-neutral-850 bg-[#09090b]/80 backdrop-blur sticky top-16 z-30 px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Breadcrumb / Back button */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer px-2.5 py-1.5 rounded-lg hover:bg-neutral-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <div className="h-4 w-[1px] bg-neutral-800 hidden sm:block" />
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-neutral-500">Services</span>
              <span className="text-neutral-600">/</span>
              <span className="font-semibold text-emerald-400">Marketing Analysis</span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400 font-mono text-[11px]">GTM Assessment Brochure</span>
            </div>
          </div>

          {/* Controls: View modes & Actions */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            {/* Page View Toggle */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-0.5 flex text-xs">
              <button
                onClick={() => setActiveView('both')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  activeView === 'both' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                All Pages
              </button>
              <button
                onClick={() => setActiveView('page1')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  activeView === 'page1' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Page 1
              </button>
              <button
                onClick={() => setActiveView('page2')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  activeView === 'page2' 
                    ? 'bg-emerald-600 text-white shadow-sm' 
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Page 2
              </button>
            </div>

            {/* Print / Save to PDF Action */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-850 hover:bg-neutral-800 text-neutral-200 hover:text-white rounded-lg text-xs font-semibold border border-neutral-750 transition-all shadow-sm cursor-pointer"
              title="Print or Save as PDF using your browser dialog"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Print / Save PDF</span>
            </button>

            {/* Direct Download Action */}
            <button
              onClick={handleDownloadStandalone}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white rounded-lg text-xs font-bold border border-emerald-500/40 shadow-md shadow-emerald-950/40 transition-all cursor-pointer"
              title="Download standalone brochure file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Brochure</span>
            </button>
          </div>

        </div>
      </div>

      {/* BROCHURE VIEWER STAGE */}
      <main className="flex-1 py-8 px-3 sm:px-6 flex justify-center items-start overflow-x-hidden">
        
        {/* Printable & Interactive Brochure Container */}
        <div id="printable_brochure_container" className="w-full max-w-[850px] space-y-10">

          {/* ============================================================== */}
          {/* PAGE 1: "MULTIPLY YOUR GTM RESULTS."                           */}
          {/* ============================================================== */}
          {(activeView === 'both' || activeView === 'page1') && (
            <section 
              id="brochure_page_1" 
              className="brochure-sheet bg-[#FAFAFA] text-[#111111] rounded-xl shadow-2xl overflow-hidden border border-neutral-300 relative flex flex-col justify-between"
              style={{ minHeight: '1080px' }}
            >
              {/* Subtle top-left warm gradient wash like original */}
              <div 
                className="absolute top-0 left-0 w-96 h-96 pointer-events-none opacity-40"
                style={{
                  background: 'radial-gradient(circle at 10% 10%, rgba(217, 119, 6, 0.25) 0%, rgba(251, 191, 36, 0.1) 40%, transparent 70%)'
                }}
              />

              {/* PAGE 1 CONTENT WRAPPER */}
              <div className="p-8 sm:p-12 relative z-10 flex-1 flex flex-col justify-between space-y-8">
                
                {/* Header Bar: Sublime x Vizhin | GTM ASSESSMENT */}
                <div className="flex flex-wrap items-center justify-between pb-6 border-b border-neutral-200/80 gap-4">
                  <div className="flex items-center gap-3">
                    {/* Sublime Logo Text */}
                    <div className="text-left">
                      <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 block leading-tight">
                        sublime
                      </span>
                      <span className="text-[8px] font-sans tracking-[0.25em] text-neutral-600 block uppercase font-medium">
                        DESIGNS MEDIA
                      </span>
                    </div>

                    <span className="text-neutral-400 font-light text-lg px-1">×</span>

                    {/* Vizhin Logo Text */}
                    <div className="text-left">
                      <span className="font-sans text-xl sm:text-2xl font-black tracking-wider text-neutral-900 block leading-tight">
                        V<span className="text-emerald-600">I</span>ZH<span className="text-emerald-600">I</span>N
                      </span>
                      <span className="text-[8px] font-sans tracking-wider text-neutral-500 block italic">
                        a better way forward.
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#0D5C46] uppercase font-mono">
                      G T M &nbsp; A S S E S S M E N T
                    </span>
                  </div>
                </div>

                {/* Hero Title */}
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-950 tracking-tight leading-[1.05]">
                    Multiply your<br />
                    GTM results.
                  </h1>
                </div>

                {/* Two-Column Intro & Callout Section */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* Left Column: Narrative Copy */}
                  <div className="md:col-span-7 space-y-4 text-sm sm:text-base text-neutral-700 leading-relaxed font-sans">
                    <p>
                      When sales and marketing pull in different directions, growth gets expensive. Leads stall, messages conflict, and your CRM becomes a place where pipeline goes to hide. The bottom line: your team isn't performing. The fix isn't more headcount or another tool—it's alignment and getting the right people in the right seats, with the right expectations.
                    </p>
                    <p>
                      Sublime and Vizhin have joined forces to offer a <strong className="font-bold text-neutral-950">GTM assessment</strong> that looks across your entire revenue engine—sales and marketing together—to find exactly where momentum is leaking and what to do about it. Together, we bring decades of experience on both sides of the funnel, so nothing gets lost in the gap between teams.
                    </p>
                    <p>
                      You'll walk away with a clear-eyed read on what's working, what isn't, and a prioritized plan to fix it. No fluff. No 80-page reports nobody opens. Just answers you can act on.
                    </p>
                  </div>

                  {/* Right Column: High-Impact Typography & Bullets */}
                  <div className="md:col-span-5 space-y-6 pt-1">
                    
                    <div>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-950 leading-tight">
                        One revenue engine.<br />
                        Not two departments.
                      </h2>
                    </div>

                    {/* Sales + Marketing bullet */}
                    <div className="space-y-1 relative pl-6 border-l-2 border-pink-500/70">
                      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-pink-500 shadow-sm" />
                      <h3 className="text-lg font-bold text-neutral-950">Sales + Marketing</h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-snug">
                        One assessment across your full GTM motion—not another siloed audit
                      </p>
                    </div>

                    {/* Decades of Experience bullet */}
                    <div className="space-y-2 relative pl-6 border-l-2 border-cyan-500/70 pt-2">
                      <div className="absolute -left-[5px] top-3.5 w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-sm" />
                      <h3 className="text-lg sm:text-xl font-extrabold text-neutral-950 leading-tight">
                        Decades of combined experience building, fixing, and scaling B2B GTM teams
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-600 leading-snug">
                        We're the partners who tell you what you need to hear—not just what you want to hear.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Middle 3 Features Band */}
                <div className="bg-[#EDEDED] border border-neutral-300 rounded-xl p-6 sm:p-7 grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-neutral-300">
                  
                  {/* Feature 1 */}
                  <div className="md:pr-5 space-y-2">
                    <h4 className="text-base sm:text-lg font-bold text-neutral-950">
                      Alignment that helps you win.
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      Most GTM problems aren't sales problems or marketing problems—they're handoff problems. We assess the whole system, so the fixes stick.
                    </p>
                  </div>

                  {/* Feature 2 */}
                  <div className="pt-4 md:pt-0 md:px-5 space-y-2">
                    <h4 className="text-base sm:text-lg font-bold text-neutral-950">
                      We start with your funnel first.
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      Before recommending anything, we dig into how your buyers actually move—from first touch to closed-down—and where they're falling out along the way.
                    </p>
                  </div>

                  {/* Feature 3 */}
                  <div className="pt-4 md:pt-0 md:pl-5 space-y-2">
                    <h4 className="text-base sm:text-lg font-bold text-neutral-950">
                      Findings you can act on.
                    </h4>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      Every assessment ends with a prioritized roadmap: what to fix now, what to fix next, and what's fine to leave alone. Clarity, not homework.
                    </p>
                  </div>

                </div>

              </div>

              {/* Bottom Strip: "Is this for you?" */}
              <div className="bg-[#050505] text-white p-6 sm:px-12 sm:py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-neutral-800">
                
                {/* Yellow Question Tag */}
                <div className="shrink-0">
                  <span className="text-amber-400 font-extrabold text-xl sm:text-2xl leading-none tracking-tight block">
                    Is this<br />for you?
                  </span>
                </div>

                {/* 3 Criteria columns */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
                  
                  {/* Criteria 1: Series B */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-pink-500 shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm sm:text-base text-white leading-tight">Series B and later</h5>
                      <p className="text-xs text-neutral-400 leading-snug mt-1">
                        You've found product-market fit—now GTM efficiency is the growth lever
                      </p>
                    </div>
                  </div>

                  {/* Criteria 2: B2B tech */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-cyan-400 shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm sm:text-base text-white leading-tight">B2B tech companies</h5>
                      <p className="text-xs text-neutral-400 leading-snug mt-1">
                        We know your buyers, your funnel, and your stack inside and out
                      </p>
                    </div>
                  </div>

                  {/* Criteria 3: $10M+ in revenue */}
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-purple-500 shrink-0 mt-0.5 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm sm:text-base text-white leading-tight">$10M+ in revenue</h5>
                      <p className="text-xs text-neutral-400 leading-snug mt-1">
                        Enough GTM motion to assess—and meaningful upside to unlock
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </section>
          )}

          {/* ============================================================== */}
          {/* PAGE 2: "WHAT WE ASSESS" & "HOW IT WORKS"                      */}
          {/* ============================================================== */}
          {(activeView === 'both' || activeView === 'page2') && (
            <section 
              id="brochure_page_2" 
              className="brochure-sheet bg-[#FAFAFA] text-[#111111] rounded-xl shadow-2xl overflow-hidden border border-neutral-300 relative flex flex-col justify-between"
              style={{ minHeight: '1080px' }}
            >
              {/* PAGE 2 TOP: DARK HEADER */}
              <div className="bg-[#050505] text-white p-8 sm:px-12 sm:pt-10 sm:pb-8 relative">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b-2 border-amber-400">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                      What we assess
                    </h2>
                  </div>
                  <div className="max-w-md">
                    <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-snug">
                      We look across sales and marketing to find where your GTM engine is humming—and where it's losing power.
                    </p>
                  </div>
                </div>
              </div>

              {/* PAGE 2 BODY CONTENT */}
              <div className="p-8 sm:p-12 space-y-8 flex-1 flex flex-col justify-between">
                
                {/* 6 Dimension Assessment Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  
                  {/* Card 1: CRM & Pipeline */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-pink-500 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-neutral-950 uppercase tracking-wide">
                        CRM & Pipeline Setup
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      Is your CRM working for you—or are you working for it? Are you using automation and AI effectively? We audit your setup, stages, hygiene, and adoption so your pipeline reflects reality.
                    </p>
                  </div>

                  {/* Card 2: Messaging & Positioning */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-cyan-500 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-neutral-950 uppercase tracking-wide">
                        Messaging & Positioning
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      Does sales say what marketing promises? We test your message for consistency and impact at every touchpoint, from ads to outbound to demos.
                    </p>
                  </div>

                  {/* Card 3: Lead Flow & Handoffs */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-amber-400 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-neutral-950 uppercase tracking-wide">
                        Lead Flow & Handoffs
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      We trace how leads move from marketing to sales—routing, response time, follow-up—and find where good leads quietly die.
                    </p>
                  </div>

                  {/* Card 4: Metrics & Reporting */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-purple-500 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-neutral-950 uppercase tracking-wide">
                        Metrics & Reporting
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      Are sales and marketing measuring the same funnel? We assess your KPIs, attribution, and dashboards so both teams work from one truth.
                    </p>
                  </div>

                  {/* Card 5: Tech Stack & Tools */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-cyan-500 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-neutral-950 uppercase tracking-wide">
                        Tech Stack & Tools
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      We map your GTM stack against how your team actually works—flagging overlap, gaps, and tools you're paying for but not using.
                    </p>
                  </div>

                  {/* Card 6: Sales Content & Enablement */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-amber-400 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      </div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-neutral-950 uppercase tracking-wide">
                        Sales Content & Enablement
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                      Do your reps have what they need to sell—decks, one pagers, battlecards—and is any of it actually getting used?
                    </p>
                  </div>

                </div>

                {/* THE GTM AUDIT CALLOUT BANNER */}
                <div className="bg-[#050505] text-white p-5 sm:px-8 rounded-xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-md">
                  {/* Glowing Target Ring Graphic */}
                  <div className="w-12 h-12 rounded-full border-4 border-pink-500 flex items-center justify-center shrink-0 shadow-lg shadow-pink-500/20">
                    <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white" />
                    </div>
                  </div>

                  <div className="shrink-0 text-center sm:text-left">
                    <span className="font-black text-lg sm:text-xl text-white block leading-tight">
                      The GTM<br />Audit
                    </span>
                  </div>

                  <div className="border-t sm:border-t-0 sm:border-l border-neutral-700 pt-2 sm:pt-0 sm:pl-6 text-center sm:text-left">
                    <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                      <strong className="text-white font-semibold">GTM scorecard</strong> — an honest grade across every area we assess, benchmarked against what good looks like at your stage.
                    </p>
                  </div>
                </div>

                {/* HOW IT WORKS SECTION */}
                <div className="space-y-6">
                  <h3 className="text-2xl sm:text-3xl font-black text-neutral-950 text-center tracking-tight">
                    How it works
                  </h3>

                  {/* 4 Steps Sequence */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    
                    {/* Step 1: Discover */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center">
                          1
                        </span>
                        <h5 className="font-extrabold text-sm text-neutral-950 tracking-wider">
                          DISCOVER
                        </h5>
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed">
                        Interviews with sales, marketing, and leadership, plus access to your CRM, content, and reporting.
                      </p>
                    </div>

                    {/* Step 2: Analyze */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-pink-500 text-white font-bold text-xs flex items-center justify-center">
                          2
                        </span>
                        <h5 className="font-extrabold text-sm text-neutral-950 tracking-wider">
                          ANALYZE
                        </h5>
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed">
                        We dig into your funnel, message, data, and stack—looking at the whole engine, not the parts in isolation.
                      </p>
                    </div>

                    {/* Step 3: Readout */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center justify-center">
                          3
                        </span>
                        <h5 className="font-extrabold text-sm text-neutral-950 tracking-wider">
                          READOUT
                        </h5>
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed">
                        Scorecard and findings, delivered in a working session built for decisions—not a deck dump.
                      </p>
                    </div>

                    {/* Step 4: Act */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-bold text-xs flex items-center justify-center">
                          4
                        </span>
                        <h5 className="font-extrabold text-sm text-neutral-950 tracking-wider">
                          ACT
                        </h5>
                      </div>
                      <p className="text-xs text-neutral-700 leading-relaxed">
                        A prioritized roadmap your team can run with—or we can help you execute, from messaging to CRM cleanup.
                      </p>
                    </div>

                  </div>

                  {/* Timeline Badge */}
                  <div className="pt-2 flex items-center justify-center gap-4">
                    <div className="h-[1px] bg-neutral-300 flex-1" />
                    <span className="font-bold text-xs sm:text-sm text-neutral-900 tracking-wide font-sans">
                      Average timeline: 3–4 weeks
                    </span>
                    <div className="h-[1px] bg-neutral-300 flex-1" />
                  </div>

                </div>

              </div>

              {/* PAGE 2 FOOTER: "GET IN TOUCH" */}
              <div className="bg-[#050505] text-white p-8 sm:px-12 sm:py-9 border-t border-neutral-800">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Yellow Headline */}
                  <div className="md:col-span-4">
                    <span className="text-amber-400 font-black text-2xl sm:text-3xl tracking-tight uppercase block leading-tight">
                      GET IN<br className="hidden sm:inline" /> TOUCH
                    </span>
                  </div>

                  {/* Sublime Contact */}
                  <div className="md:col-span-4 space-y-1 text-xs text-neutral-300">
                    <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-mono block">
                      SUBLIME DESIGNS MEDIA
                    </span>
                    <p className="font-bold text-sm text-white">Megan Adler</p>
                    <p>
                      <a href="mailto:megan@sublimedesignsmedia.com" className="hover:text-emerald-400 transition-colors">
                        megan@sublimedesignsmedia.com
                      </a>
                    </p>
                    <p>
                      <a href="tel:4152251046" className="hover:text-emerald-400 transition-colors">
                        Tel. 415.225.1046
                      </a>
                    </p>
                    <p>
                      <a href="https://www.sublimedesignsmedia.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                        www.sublimedesignsmedia.com
                      </a>
                    </p>
                  </div>

                  {/* Vizhin Contact */}
                  <div className="md:col-span-4 space-y-1 text-xs text-neutral-300">
                    <span className="text-[10px] tracking-widest text-neutral-400 uppercase font-mono block">
                      VIZHIN
                    </span>
                    <p className="font-bold text-sm text-white">Ric Reifel</p>
                    <p>
                      <a href="mailto:rreifel@vizhin.co" className="hover:text-emerald-400 transition-colors">
                        rreifel@vizhin.co
                      </a>
                    </p>
                    <p>
                      <a href="tel:3035507740" className="hover:text-emerald-400 transition-colors">
                        Tel. 303.550.7740
                      </a>
                    </p>
                    <p>
                      <a href="https://www.vizhin.co" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition-colors">
                        www.vizhin.co
                      </a>
                    </p>
                  </div>

                </div>
              </div>

            </section>
          )}

        </div>

      </main>

      {/* PRINT-SPECIFIC CSS STYLES */}
      <style>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          #printable_brochure_container {
            max-width: 100% !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            space-y: 0 !important;
          }
          .brochure-sheet {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            page-break-after: always !important;
            break-after: page !important;
            width: 100% !important;
            min-height: 10.5in !important;
          }
          @page {
            size: letter portrait;
            margin: 0.25in;
          }
        }
      `}</style>

    </div>
  );
}
