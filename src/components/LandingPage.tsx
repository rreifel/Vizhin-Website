import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, Layers, Users, Activity, Sparkles, Mail, BarChart3, Calendar, ArrowUpRight, FileText, Download, Target, UserPlus
} from 'lucide-react';
import SiteHeader from './SiteHeader';

interface ExpandablePillar {
  title: string;
  intro: string;
  bullets: {
    label: string;
    text: string;
  }[];
}

interface ExpandableSectionData {
  pillars: ExpandablePillar[];
  synergy: {
    title: string;
    text: string;
  };
}

interface DetailedSectionItem {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  summary: string;
  paragraphs: string[];
  offerUrl?: string;
  expandableContent?: ExpandableSectionData;
}

const DETAILED_SECTIONS: DetailedSectionItem[] = [
  {
    id: 'strategic-gtm-analysis',
    title: 'Strategic GTM Analysis',
    icon: Layers,
    summary: 'Market Position Diagnosis: Uncovering the hidden friction in your revenue engine. I conduct a comprehensive evaluation of your target verticals, pricing models, and buyer personas to realign your sales strategy with maximum market opportunity.',
    paragraphs: [
      "When sales and marketing pull in different directions, growth gets expensive. Leads stall, messages conflict, and your CRM becomes a place where pipeline goes to hide. The bottom line: your team isn't performing. The fix isn't more headcount or another tool—it's alignment and getting the right people in the right seats, with the right expectations.",
      "Sublime and Vizhin have joined forces to offer a GTM assessment that looks across your entire revenue engine—sales and marketing together—to find exactly where momentum is leaking and what to do about it. Together, we bring decades of experience on both sides of the funnel, so nothing gets lost in the gap between teams.",
      "You'll walk away with a clear-eyed read on what's working, what isn't, and a prioritized plan to fix it. No fluff. No 80-page reports nobody opens. Just answers you can act on."
    ],
    offerUrl: '/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf'
  },
  {
    id: 'gtm-tech',
    title: 'GTM Tech',
    icon: Users,
    summary: 'Sales Infrastructure Efficiency: Transforming your CRM from an expensive digital filing cabinet into an automated revenue driver. I audit, restructure, and optimize your sales technology stack to eliminate administrative friction and give you flawless pipeline visibility.',
    paragraphs: [
      "Scaling a business demands a unified infrastructure that seamlessly connects customer relationships, internal team structures, and employee growth. Modern enterprise platforms eliminate operational bottlenecks by integrating CRM, dynamic organizational charting, and data-driven performance evaluations into a single, cohesive ecosystem. This centralized approach gives leadership the clarity needed to make strategic decisions while ensuring that departments no longer operate in isolated silos.",
      "By linking revenue pipelines directly to workforce planning and talent development, your company can grow predictably and sustainably. The system captures critical data at every stage of the business lifecycle—from winning a customer to onboarding a new hire and promoting top talent. Ultimately, these integrated tools empower your organization to maintain structural alignment, optimize resource allocation, and build a high-performing team capable of supporting rapid growth.",
      "A poorly configured CRM is one of the quietest killers of sales productivity and data integrity. Growth-stage companies frequently suffer from bloated tech stacks, where expensive software tools are stitched together haphazardly, forcing sales reps to spend more time entering data than actually selling. Even worse, messy pipelines lead to inaccurate forecasting, meaning you can't accurately predict your cash flow or revenue. I step in to audit your current ecosystem, cutting out redundant software subscriptions and re-engineering your CRM to match a highly optimized, repeatable sales process.",
      "For you, this means a clean, frictionless engine where technology actually accelerates deals instead of slowing them down. We automate the repetitive administrative tasks that eat up your reps' days, allowing them to focus entirely on high-value selling activities. More importantly, it gives you a clean, real-time dashboard showing the true health of your business. You will finally have data you can actually trust to forecast revenue, report to investors, and make critical strategic scaling decisions."
    ],
    expandableContent: {
      pillars: [
        {
          title: '1. Advanced Customer Relationship Management (CRM)',
          intro: 'A modern CRM serves as your central revenue engine, moving far beyond basic contact management to drive predictable business growth.',
          bullets: [
            {
              label: 'Pipeline Visibility',
              text: 'Tracks every deal, interaction, and touchpoint in real-time to generate highly accurate revenue forecasts.'
            },
            {
              label: 'Process Automation',
              text: 'Minimizes administrative burdens by automating lead routing, follow-up sequences, and routine data entry.'
            },
            {
              label: 'Cross-Department Alignment',
              text: 'Unifies sales, marketing, and customer success teams around a single, comprehensive history for every client account.'
            }
          ]
        },
        {
          title: '2. Dynamic Organizational Charting',
          intro: 'As headcount increases, visual transparency is vital to prevent confusion, maintain cultural alignment, and streamline collaboration.',
          bullets: [
            {
              label: 'Real-Time Visualization',
              text: "Automatically updates your company's hierarchy, reporting structures, and internal directories as you hire or promote."
            },
            {
              label: 'Strategic Workforce Modeling',
              text: 'Enables leadership to build "what-if" organizational designs, map out future departments, and identify immediate resource gaps.'
            },
            {
              label: 'Accelerated Onboarding',
              text: 'Helps new team members rapidly understand company architecture, functional owners, and where their role fits into the bigger picture.'
            }
          ]
        },
        {
          title: '3. Comprehensive Performance Evaluations',
          intro: 'To sustain expansion, you must actively align individual achievements with overarching corporate objectives while retaining your top talent.',
          bullets: [
            {
              label: '360-Degree Insights',
              text: 'Gathers balanced, multi-perspective feedback from peers, direct reports, and managers to eliminate reviewer bias.'
            },
            {
              label: 'Continuous Goal Tracking',
              text: 'Integrates key metric frameworks (like OKRs or KPIs) directly into daily workflows to keep teams focused on high-impact objectives.'
            },
            {
              label: 'Data-Driven Mobility',
              text: 'Utilizes objective performance analytics to build clear promotion tracks, identify high-potential leaders, and proactively address skill gaps.'
            }
          ]
        }
      ],
      synergy: {
        title: 'The Synergy of an Integrated System',
        text: 'When these three pillars operate together, they create a powerful operational feedback loop. Demand data from your CRM signals exactly when and where the business needs to expand. Your organizational chart instantly visualizes how to structure those expanding teams without creating operational friction. Finally, your performance evaluation system highlights the seasoned internal candidates ready to step up and lead those new initiatives. This interconnected framework ensures your business scales with absolute precision.'
      }
    }
  },
  {
    id: 'audit-compliance',
    title: 'Audit Compliance',
    icon: ShieldCheck,
    summary: 'Sales Governance: Partner Accountability and Audit Readiness',
    paragraphs: [
      "When scaling a sales organization with external leadership, operational discipline is non-negotiable. As your Fractional VP of Sales, I establish rigorous governance frameworks where every system modification, user assignment, and profile creation is continuously logged and monitored. This ensures absolute transparency and strict partner accountability across your entire sales infrastructure. You will always have full visibility into who has access to your customer data, who modified your pipeline stages, and how administrative permissions are managed, completely eliminating operational blind spots.",
      "This level of structural oversight ensures your company is always prepared for enterprise-level scrutiny, due diligence, or board reviews without the typical scramble. By embedding clean, continuous audit trails into your daily sales operations, we protect your company's valuation and build a mature, compliant sales function. This gives you, your investors, and your future enterprise clients total confidence that your sales engine is built on a secure, accountable, and legally sound foundation."
    ]
  },
  {
    id: 'marketing-services',
    title: 'Marketing Services',
    icon: Sparkles,
    summary: 'Sales-Marketing Integration: Bridging the gap between marketing initiatives and revenue generation. I ensure your brand assets, client testimonials, and digital presence are systematically engineered to feed the sales pipeline, accelerate deals, and maintain absolute messaging consistency.',
    paragraphs: [
      "For a growing company, the costliest bottleneck is a disconnect between the team generating leads and the team closing deals. When marketing operates in a vacuum, they often optimize for metrics like views or clicks, resulting in collateral, websites, and video assets that look beautiful but fail to move the needle for sales. By integrating marketing directly into your sales strategy, I eliminate this friction. We transform your marketing footprint from a passive cost center into an active sales enablement engine, ensuring that every asset produced is directly engineered to handle objections, build credibility, and pre-qualify prospects before they ever hop on a discovery call.",
      "What this means for you as a founder is complete pipeline clarity and a significantly accelerated sales cycle. Your sales team will no longer waste time correcting misaligned expectations set by generic marketing materials. Instead, they will be armed with hyper-targeted testimonials, case studies, and collateral that perfectly mirror the live sales conversation. This seamless handoff not only maximizes the return on your marketing spend but also presents a highly sophisticated, unified front to your market—ultimately driving higher conversion rates and predictable revenue growth."
    ]
  },
  {
    id: 'marketing-analysis',
    title: 'Marketing Analysis',
    icon: BarChart3,
    summary: 'Revenue Analytics & ROI Optimization: Turning marketing data into executive decision-making power. I implement deep funnel tracking and ROI modeling to map exactly how marketing dollars convert into closed-won revenue, maximizing your demand generation efficiency.',
    paragraphs: [
      'To scale a company predictably, you cannot afford to guess which marketing efforts are actually driving revenue. Many growth-stage companies suffer from "vanity metrics"—reporting high website traffic or lead volumes that ultimately result in zero closed deals. I look past the surface-level data to run deep conversion funnel diagnostics and attribution modeling. By tracking a prospect\'s journey from the first click to the signed contract, we uncover exactly which campaigns are yielding high-value sales opportunities and which ones are simply draining your budget.',
      'For you as a founder, this means complete financial clarity and data-backed confidence. Instead of wondering if your marketing budget is working, you will have clear ROI models that prove exactly how much revenue is generated for every dollar spent. This level of analytics strips the emotion and guesswork out of your growth strategy, giving you and your board the precise insights needed to confidently scale up your winning channels, cut the waste, and optimize your entire customer acquisition cost.'
    ]
  },
  {
    id: 'sales-team-accountability',
    title: 'Sales Team Accountability & KPIs',
    icon: Target,
    summary: 'Performance Architecture: Shifting your sales culture from activity-driven to outcome-focused. I establish clear, high-impact key performance indicators (KPIs) and accountability structures that ensure every sales rep owns their pipeline and consistently hits their targets.',
    paragraphs: [
      'For many founders, managing a sales team feels like a constant guessing game. Reps report that they are "busy" and that deals are "just around the corner," but those promises rarely translate into predictable revenue. Without a seasoned sales leader enforcing standard expectations, sales cultures can easily drift into complacency. I eliminate this ambiguity by building an objective, metrics-driven performance framework tailored to your specific business model. We define the precise leading indicators—such as meaningful executive conversations and pipeline velocity—that actually dictate closed deals, stripping the guesswork out of sales management.',
      'What this means for you as a founder is the freedom to stop micro-managing and start leading. I establish a culture of absolute ownership where sales reps are accountable to their data, not their excuses. Through structured weekly pipeline reviews, performance tracking, and direct coaching, I identify your top performers, support middle-tier reps, and decisively manage out underperformers. You gain total confidence that your sales payroll is actively driving profit, backed by a culture that prioritizes execution over effort.'
    ]
  },
  {
    id: 'sales-hiring-strategy',
    title: 'Sales Hiring Strategy',
    icon: UserPlus,
    summary: 'Predictable Talent Acquisition: Ending the cycle of bad sales hires and missed quotas. I design and execute a rigorous, metrics-driven recruiting and vetting blueprint to attract, hire, and onboard elite sales professionals who fit your culture and consistently produce results.',
    paragraphs: [
      'For most founders, hiring sales reps is a costly roll of the dice. Charismatic candidates routinely interview exceptionally well, only to fail miserably once they are in the seat—costing you months of lost revenue, burned leads, and thousands in wasted salary. Without a dedicated sales leader who knows exactly how to screen for grit, process discipline, and true selling capability, growth-stage companies easily fall into the trap of hiring the wrong profile for their specific sales cycle. I eliminate this expensive guesswork by building a structured, repeatable talent acquisition engine designed to source and filter for elite performers.',
      "When you partner with me for your sales hiring strategy, we don't just find people; we build a scalable hiring infrastructure. I define the exact candidate profile your business needs, create objective vetting scorecards, conduct deep-dive behavioral interviews, and structure competitive compensation packages that align a rep's incentives directly with your revenue goals. Furthermore, I build out a comprehensive 30-60-90 day onboarding playbook. This ensures your new hires hit the ground running with the exact training, scripts, and playbooks they need to shorten their time-to-productivity and start closing deals quickly."
    ]
  },
  {
    id: 'project-management',
    title: 'Technology Project Management',
    icon: Activity,
    summary: 'Strategic Technology Deployment: Removing the risk, delays, and hidden costs from your critical IT initiatives. I provide expert, platform-agnostic oversight for complex software selections, legacy migrations, and system implementations to ensure your tech investments deliver immediate operational value.',
    paragraphs: [
      'Software selections, system migrations, and digital transformations are notoriously risky undertakings for a growing business. When a company attempts to implement enterprise software, re-deploy a legacy system, or switch core platforms without dedicated technical leadership, projects routinely run over budget, stall out, or fail to gain team adoption. Founders simply do not have the time to sit through hours of vendor demos, manage integration engineers, or troubleshoot deployment bottlenecks. I act as your objective, expert project executive, sitting on your side of the table to protect your capital and ensure project execution matches your business goals.',
      'Hiring me for your technology project management means you eliminate the operational chaos that typically derails major IT shifts. I handle the heavy lifting: defining technical requirements, vetting vendors to avoid hidden fees, mapping out aggressive implementation timelines, and managing the change management process across your team. Your technical projects get delivered on time and within scope, allowing you to unlock the operational efficiencies you paid for without pulling your focus away from running the company.'
    ]
  },
  {
    id: 'call-to-action',
    title: 'Ready to build a predictable, self-sustaining sales engine?',
    icon: Calendar,
    summary: 'Let’s skip the high-pressure sales pitch. Schedule a 25-minute Revenue Strategy Session where we will look at your current pipeline bottlenecks and map out a realistic path to scale.',
    paragraphs: []
  }
];

interface LandingPageProps {
  currentUser?: {
    email: string;
    name?: string;
    role?: string;
  } | null;
  onSignOut?: () => void;
  onSignOutOrg?: () => void;
  onSignOutCRM?: () => void;
  onSwitchUser?: (user: any) => void;
  onEnterPortal: () => void;
  onEnterOrg?: () => void;
  onRequestAccount: () => void;
  onNavigateMeddpicc: () => void;
  onNavigateMarketingAnalysis: () => void;
  onNavigateJointDeliveryPartners?: () => void;
}

export default function LandingPage({ 
  currentUser,
  onSignOut,
  onSignOutOrg,
  onSignOutCRM,
  onSwitchUser,
  onEnterPortal, 
  onEnterOrg,
  onRequestAccount, 
  onNavigateMeddpicc,
  onNavigateMarketingAnalysis,
  onNavigateJointDeliveryPartners
}: LandingPageProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

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
        currentUser={currentUser}
        onSignOut={onSignOut}
        onSignOutOrg={onSignOutOrg}
        onSignOutCRM={onSignOutCRM}
        onSwitchUser={onSwitchUser}
        onNavigateHome={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onNavigateMeddpicc={onNavigateMeddpicc}
        onNavigateMarketingAnalysis={onNavigateMarketingAnalysis}
        onNavigateJointDeliveryPartners={onNavigateJointDeliveryPartners}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DETAILED_SECTIONS.slice(0, 8).map((sec) => {
            const Icon = sec.icon;
            const isMarketingAnalysis = sec.id === 'marketing-analysis';

            return (
              <div 
                key={sec.id}
                onClick={() => {
                  const el = document.getElementById(sec.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-neutral-900/35 border border-neutral-850/60 p-6 rounded-2xl space-y-4 hover:border-emerald-600/60 hover:bg-neutral-900/60 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950/80 flex items-center justify-center border border-emerald-800/60 text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-neutral-500 group-hover:text-emerald-400 transition-colors">
                      Explore ↓
                    </span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-neutral-150 group-hover:text-emerald-300 transition-colors">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {sec.summary}
                    </p>
                  </div>
                </div>

                {(isMarketingAnalysis || sec.id === 'marketing-services') && (
                  <div className="pt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigateMarketingAnalysis();
                      }}
                      className="text-[10px] font-mono font-semibold text-emerald-400 hover:text-emerald-300 bg-neutral-900/90 hover:bg-neutral-850 px-2.5 py-1 rounded-lg border border-emerald-800/60 hover:border-emerald-500 transition-all flex items-center gap-1 group/btn cursor-pointer"
                      title="View Marketing Assessment Brochure"
                    >
                      <span>View Brochure</span>
                      <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* DETAILED CONTENT SECTIONS */}
      <section className="px-6 py-10 max-w-7xl mx-auto z-10 w-full space-y-8" id="landing_detailed_sections">
        {DETAILED_SECTIONS.map((sec, idx) => {
          const Icon = sec.icon;

          if (sec.id === 'call-to-action') {
            return (
              <div
                key={sec.id}
                id={sec.id}
                className="bg-neutral-900/50 border border-emerald-850/80 hover:border-emerald-700/80 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs flex flex-col justify-between shadow-lg shadow-emerald-950/20"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                      Ready to build a predictable, self-sustaining sales engine?
                    </h2>
                  </div>

                  <p className="text-sm md:text-base text-neutral-300 leading-relaxed font-medium">
                    Let’s skip the high-pressure sales pitch. Schedule a 25-minute Revenue Strategy Session where we will look at your current pipeline bottlenecks and map out a realistic path to scale.
                  </p>

                  <div className="pt-2">
                    <a
                      href="https://zcal.co/rreifel/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs md:text-sm font-bold rounded-xl shadow-md shadow-emerald-950/40 border border-emerald-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer group"
                    >
                      <Calendar className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                      <span>Schedule Your Strategy Session</span>
                      <span className="font-mono text-xs text-emerald-300">↗</span>
                    </a>
                  </div>

                  <div className="pt-6 border-t border-neutral-850/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs md:text-sm text-neutral-400">
                    <p className="leading-relaxed">
                      Not ready to book a call? Drop me a direct note with your primary sales challenge, and I’ll send over my initial thoughts via email.
                    </p>
                    <a
                      href="mailto:rreifel@vizhin.co?subject=Primary%20Sales%20Challenge"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 hover:bg-neutral-850 text-emerald-400 hover:text-emerald-300 rounded-lg border border-neutral-800 hover:border-emerald-600/70 font-semibold transition-all shrink-0 cursor-pointer group"
                      title="Send email to rreifel@vizhin.co"
                    >
                      <Mail className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-105 transition-transform" />
                      <span>Message Me Safely</span>
                      <span className="text-neutral-500 font-mono text-xs">(rreifel@vizhin.co)</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div
              key={sec.id}
              id={sec.id}
              className="bg-neutral-900/40 border border-neutral-850/80 hover:border-neutral-700/80 transition-all rounded-2xl p-6 md:p-8 backdrop-blur-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {sec.title}
                  </h2>
                </div>

                <div className="p-4 rounded-xl bg-neutral-950/70 border border-neutral-850 text-sm md:text-base text-neutral-200 leading-relaxed font-medium">
                  {sec.summary}
                </div>

                <div className="space-y-3 pt-1 text-xs md:text-sm text-neutral-400 leading-relaxed">
                  {sec.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>
                      {para}
                    </p>
                  ))}
                </div>

                {/* Expandable toggle and delineated content */}
                {sec.expandableContent && (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => toggleSection(sec.id)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-850 border border-emerald-800/80 hover:border-emerald-500 text-emerald-400 hover:text-emerald-300 text-lg font-bold font-mono transition-all cursor-pointer shadow-sm select-none"
                      aria-expanded={expandedSections[sec.id] || false}
                      aria-label={expandedSections[sec.id] ? 'Collapse' : 'Expand'}
                      title={expandedSections[sec.id] ? 'Collapse' : 'Expand'}
                    >
                      {expandedSections[sec.id] ? '−' : '+'}
                    </button>

                    <AnimatePresence>
                      {expandedSections[sec.id] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 p-5 md:p-6 rounded-xl bg-neutral-950/90 border border-emerald-900/60 space-y-6 shadow-inner">
                            {sec.expandableContent.pillars.map((pillar, pIdx) => (
                              <div key={pIdx} className="space-y-3 pb-5 border-b border-neutral-850/80 last:border-b-0 last:pb-0">
                                <h4 className="text-sm md:text-base font-bold text-emerald-300 tracking-tight">
                                  {pillar.title}
                                </h4>
                                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                                  {pillar.intro}
                                </p>
                                <ul className="space-y-2 pt-1 pl-1">
                                  {pillar.bullets.map((b, bIdx) => (
                                    <li key={bIdx} className="text-xs md:text-sm text-neutral-400 leading-relaxed flex items-start gap-2">
                                      <span className="text-emerald-400 text-base leading-none select-none">•</span>
                                      <span>
                                        <strong className="text-neutral-200 font-semibold">{b.label}:</strong> {b.text}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}

                            {sec.expandableContent.synergy && (
                              <div className="mt-4 p-4 md:p-5 rounded-lg bg-emerald-950/30 border border-emerald-800/50 space-y-2">
                                <h4 className="text-xs md:text-sm font-bold text-emerald-300 uppercase tracking-wide flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                  {sec.expandableContent.synergy.title}
                                </h4>
                                <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                                  {sec.expandableContent.synergy.text}
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* Lower right actions */}
              <div className="pt-6 mt-4 border-t border-neutral-850/60 flex flex-col items-end gap-2.5">
                {sec.offerUrl && (
                  <div className="flex items-center gap-2">
                    <a
                      href={sec.offerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-850 text-emerald-400 hover:text-emerald-300 text-xs font-bold rounded-xl border border-emerald-800/80 hover:border-emerald-600 shadow-md transition-all flex items-center gap-2 cursor-pointer group"
                    >
                      <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-105 transition-transform" />
                      <span>View Offer</span>
                      <span className="font-mono text-[10px] text-emerald-400">↗</span>
                    </a>
                    <a
                      href={sec.offerUrl}
                      download="Vizhin_GTM_Assessment.pdf"
                      className="p-2.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-emerald-300 rounded-xl border border-neutral-800 hover:border-emerald-700/60 transition-all cursor-pointer"
                      title="Download PDF Offer"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {(sec.id === 'marketing-services' || sec.id === 'marketing-analysis') && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={onNavigateMarketingAnalysis}
                      className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-850 text-emerald-400 hover:text-emerald-300 text-xs font-bold rounded-xl border border-emerald-800/80 hover:border-emerald-600 shadow-md transition-all flex items-center gap-2 cursor-pointer group"
                    >
                      <FileText className="w-4 h-4 text-emerald-400 group-hover:scale-105 transition-transform" />
                      <span>View Brochure</span>
                      <span className="font-mono text-[10px] text-emerald-400">→</span>
                    </button>
                    <a
                      href="/assets/aistudio/Vizhin_GTM_Assessment_290913e5.pdf"
                      download="Vizhin_GTM_Assessment.pdf"
                      className="p-2.5 bg-neutral-900 hover:bg-neutral-850 text-neutral-400 hover:text-emerald-300 rounded-xl border border-neutral-800 hover:border-emerald-700/60 transition-all cursor-pointer"
                      title="Download PDF Brochure"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                )}

                <a
                  href="https://zcal.co/rreifel/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-950/40 border border-emerald-500/30 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 group"
                >
                  <Calendar className="w-4 h-4 text-emerald-300 group-hover:scale-110 transition-transform" />
                  <span>Schedule a Call</span>
                  <span className="font-mono text-[10px] text-emerald-300">↗</span>
                </a>
              </div>
            </div>
          );
        })}
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

