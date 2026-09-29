import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, Sparkles, 
  Target, Users, ShieldAlert, FileText, Flame, Trophy, Swords, 
  HelpCircle, Compass, ChevronRight, Zap, RefreshCw, BarChart3,
  Layers, Lock, Mail, ExternalLink, Activity, X
} from 'lucide-react';
import VizhinLogo from './VizhinLogo';
import SiteHeader from './SiteHeader';

interface MeddpiccPageProps {
  onBack: () => void;
  onEnterPortal: () => void;
  onRequestAccount: () => void;
}

interface MeddpiccItem {
  id: string;
  letter: string;
  name: string;
  acronymIndex: number;
  realLifeStage: 'anchor' | 'engine' | 'close';
  realLifeOrder: number;
  stageName: string;
  tagline: string;
  icon: React.ElementType;
  accentColor: string;
  badgeBg: string;
  coreQuestion: string;
  executiveReality: string;
  failureMode: string;
  tacticalAdvice: string;
  acronymTrap: string;
}

const MEDDPICC_DATA: MeddpiccItem[] = [
  {
    id: 'pain',
    letter: 'I',
    name: 'Identify Pain',
    acronymIndex: 5,
    realLifeStage: 'anchor',
    realLifeOrder: 1,
    stageName: 'Stage 1: The Anchor',
    tagline: 'The catalyst for budget, urgency, and executive sponsorship.',
    icon: Flame,
    accentColor: 'from-amber-500 to-red-500',
    badgeBg: 'bg-red-950/60 text-red-400 border-red-800/60',
    coreQuestion: 'What critical operational or financial hemorrhage occurs if they do nothing for the next 12 months?',
    executiveReality: 'No pain means no urgency, no budget allocation, and guaranteed inertia. In enterprise sales, pain is not an annoyance; it is measurable financial bleed, compliance exposure, or existential competitive risk.',
    failureMode: 'Selling "vitamins" instead of "painkillers." The prospect nods along, claims the demo is cool, but delays the project indefinitely when priority battles arise.',
    tacticalAdvice: 'Never pitch features until the customer explicitly quantifies what the current situation costs their business in headcount, downtime, or missed revenue.',
    acronymTrap: 'Spelled 6th in textbook, yet without pain a deal is already dead on arrival.'
  },
  {
    id: 'competition',
    letter: 'C',
    name: 'Competition',
    acronymIndex: 7,
    realLifeStage: 'anchor',
    realLifeOrder: 2,
    stageName: 'Stage 1: The Anchor',
    tagline: 'Understand the rival in the room — especially the status quo.',
    icon: Swords,
    accentColor: 'from-orange-500 to-amber-500',
    badgeBg: 'bg-orange-950/60 text-orange-400 border-orange-800/60',
    coreQuestion: 'Who or what are you truly competing against — another vendor, an internal DIY build, or doing nothing?',
    executiveReality: 'Your biggest competitor in 80% of lost enterprise deals is not another vendor; it is the customer deciding to live with the problem or build a fragile spreadsheet workaround in-house.',
    failureMode: 'Focusing exclusively on competing software features while the executive team quietly decides to reallocate the budget to an unrelated HR or ERP project.',
    tacticalAdvice: 'Ask early: "If you don\'t select us or anyone else this quarter, what breaks, and who gets in trouble?" This immediately exposes whether you are fighting a vendor or apathy.',
    acronymTrap: 'Spelled 8th in textbook, yet status quo inertia kills 80% of pipeline in early discovery.'
  },
  {
    id: 'champion',
    letter: 'C',
    name: 'Champion',
    acronymIndex: 6,
    realLifeStage: 'anchor',
    realLifeOrder: 3,
    stageName: 'Stage 1: The Anchor',
    tagline: 'Your inside operator who sells on your behalf when you are not in the room.',
    icon: Trophy,
    accentColor: 'from-yellow-400 to-amber-500',
    badgeBg: 'bg-yellow-950/60 text-yellow-400 border-yellow-800/60',
    coreQuestion: 'Does this person have organizational influence, access to the Economic Buyer, and a personal win tied to your success?',
    executiveReality: 'A friendly contact who likes your product is just a "coach" or fan. A true Champion has organizational respect, direct access to power, and will actively defend your proposal behind closed executive doors.',
    failureMode: 'Mistaking a responsive mid-level manager for a Champion. They love your slides, but lack the political capital to request budget from the CFO.',
    tacticalAdvice: 'Test your Champion before committing pipeline: Ask them to introduce you to the Economic Buyer or share internal procurement hurdles. If they refuse or hesitate, they are a coach, not a Champion.',
    acronymTrap: 'Spelled 7th in textbook, yet without an internal champion to guide you, you will never reach the Economic Buyer.'
  },
  {
    id: 'metrics',
    letter: 'M',
    name: 'Metrics',
    acronymIndex: 0,
    realLifeStage: 'engine',
    realLifeOrder: 4,
    stageName: 'Stage 2: The Value Engine',
    tagline: 'Translate operational pain into undeniable board-level math.',
    icon: BarChart3,
    accentColor: 'from-emerald-600 to-[#0D5C46]',
    badgeBg: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60',
    coreQuestion: 'What is the quantifiable financial return, risk reduction, or payback timeline of this investment?',
    executiveReality: 'CFOs and Economic Buyers do not buy technical elegance; they buy financial yields. Metrics quantify the Delta between the status quo cost and the future state yield.',
    failureMode: 'Using generic industry ROI statistics from marketing whitepapers instead of co-creating custom financial models using the customer\'s own internal numbers.',
    tacticalAdvice: 'Sit down with your Champion to calculate: "If we eliminate 30 hours of partner onboarding friction per month across 45 agencies, that recovers $280k in direct annual overhead."',
    acronymTrap: 'Spelled 1st in textbook, but demanding proprietary financial models on call 1 before uncovering pain gets reps ejected.'
  },
  {
    id: 'decision-criteria',
    letter: 'D',
    name: 'Decision Criteria',
    acronymIndex: 2,
    realLifeStage: 'engine',
    realLifeOrder: 5,
    stageName: 'Stage 2: The Value Engine',
    tagline: 'Shape the RFP scorecard before it gets etched in stone.',
    icon: Target,
    accentColor: 'from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60',
    coreQuestion: 'What exact technical, commercial, and operational standards are they scoring candidates against?',
    executiveReality: 'If you arrive after the Decision Criteria have been established, a competitor likely helped write them. Top enterprise reps bias the scorecard toward their architectural differentiators early.',
    failureMode: 'Allowing the evaluation to degrade into a 200-row feature checklist where every vendor checks "yes," commoditizing your value and forcing a price race to the bottom.',
    tacticalAdvice: 'Anchor criteria around unique business outcomes: "Make sure your evaluation committee requires sub-second partner sync and SOC2 Type II isolation, because without those, scale collapses."',
    acronymTrap: 'Spelled 3rd in textbook, but criteria can only be influenced after understanding customer pain.'
  },
  {
    id: 'decision-process',
    letter: 'D',
    name: 'Decision Process',
    acronymIndex: 3,
    realLifeStage: 'engine',
    realLifeOrder: 6,
    stageName: 'Stage 2: The Value Engine',
    tagline: 'Map the technical and business evaluation gates before seeking final budget sign-off.',
    icon: Compass,
    accentColor: 'from-teal-600 to-emerald-600',
    badgeBg: 'bg-teal-950/60 text-teal-400 border-teal-800/60',
    coreQuestion: 'What exact sequence of technical evaluations, committee reviews, and sign-offs govern their decision?',
    executiveReality: 'Decision Process is rarely a single gate (note: there may be both technical and business decision processes spanning all three stages). In Stage 2, you must map the technical evaluation milestones, architecture reviews, and committee scorecards required to become the confirmed vendor of choice before requesting commercial budget authorization.',
    failureMode: 'Assuming that a successful demo or trial automatically moves you to procurement, without knowing which internal committees vote, when they convene, or who holds veto authority.',
    tacticalAdvice: 'Ask your Champion: "Walk me through how your organization evaluated and approved its last major enterprise platform. What technical validation and stakeholder gates did it pass through before reaching executive sign-off?"',
    acronymTrap: 'Spelled 4th in textbook, but decision gates span all 3 stages: technical discovery, executive business case, and procurement.'
  },
  {
    id: 'economic-buyer',
    letter: 'E',
    name: 'Economic Buyer',
    acronymIndex: 1,
    realLifeStage: 'engine',
    realLifeOrder: 7,
    stageName: 'Stage 2: The Value Engine',
    tagline: 'The individual with discretionary check-writing and veto authority.',
    icon: Users,
    accentColor: 'from-emerald-500 to-teal-500',
    badgeBg: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/60',
    coreQuestion: 'Have you directly aligned with the person who can say "yes" when everyone else says "no"?',
    executiveReality: 'The Economic Buyer rarely attends standard technical demos. They care about strategic risks, corporate KPIs, and capital allocation. You earn access to them through your Champion and your business case.',
    failureMode: 'Accepting "I have full purchasing authority" from a Director who actually needs approval from the CFO or Investment Committee to release purchase orders over $50k.',
    tacticalAdvice: 'Never pitch the EB a demo. Deliver a 15-minute executive briefing summarizing the quantified problem their team brought to you, the business impact, and the investment payback timeline.',
    acronymTrap: 'Spelled 2nd in textbook, but demanding a CFO meeting before earning trust with a Champion leads to immediate rejection.'
  },
  {
    id: 'paper-process',
    letter: 'P',
    name: 'Paper Process',
    acronymIndex: 4,
    realLifeStage: 'close',
    realLifeOrder: 8,
    stageName: 'Stage 3: The Finish Line',
    tagline: 'The legal, procurement, and Infosec gauntlet where deals slip quarters.',
    icon: FileText,
    accentColor: 'from-emerald-700 to-teal-800',
    badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60',
    coreQuestion: 'What are the exact administrative mechanics: MSA redlines, Infosec review, vendor onboarding, and signature hierarchy?',
    executiveReality: 'More deals slip end-of-quarter due to legal indemnification clauses, privacy addendums, and vendor onboarding queues than competitive losses. The Paper Process is an operational marathon.',
    failureMode: 'Dropping your contract on the customer at the end of the quarter without prior alignment, only to discover customer legal requires their own paper and has a 6-week review backlog.',
    tacticalAdvice: 'Request their standard vendor onboarding packet and Master Services Agreement (MSA) the moment technical validation concludes, parallel-processing security while commercial terms finalize.',
    acronymTrap: 'Spelled 5th in textbook, but dragging legal and procurement into early discovery creates unnecessary bureaucracy before value is proven.'
  }
];

export default function MeddpiccPage({ onBack, onEnterPortal, onRequestAccount }: MeddpiccPageProps) {
  // View mode: 'acronym' (Alphabetical theory) vs 'reality' (Chronological deal flow) - defaults to 'acronym'
  const [viewMode, setViewMode] = useState<'reality' | 'acronym'>('acronym');
  const [activeItem, setActiveItem] = useState<MeddpiccItem | null>(null);

  const handleViewModeChange = (mode: 'reality' | 'acronym') => {
    setViewMode(mode);
    setActiveItem(null);
  };

  const handleSelectPillar = (item: MeddpiccItem) => {
    if (activeItem?.id === item.id) {
      setActiveItem(null); // Click again to close window
    } else {
      setActiveItem(item); // Opens window directly below where clicked, or changes to new pillar
    }
  };

  // Order dataset based on active view mode
  const displayedItems = [...MEDDPICC_DATA].sort((a, b) => {
    if (viewMode === 'reality') {
      return a.realLifeOrder - b.realLifeOrder;
    }
    return a.acronymIndex - b.acronymIndex;
  });

  return (
    <div className="min-h-screen bg-[#070708] text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 relative overflow-x-clip">
      
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-[-25%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-emerald-950/25 blur-[160px] pointer-events-none" />
      <div className="absolute top-[35%] right-[-20%] w-[60vw] h-[60vw] rounded-full bg-[#0D5C46]/20 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-teal-950/20 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.14] pointer-events-none" />

      {/* PERSISTENT GLOBAL SITE HEADER */}
      <SiteHeader 
        currentPage="meddpicc"
        onNavigateHome={onBack}
        onNavigateMeddpicc={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onEnterPortal={onEnterPortal}
        onRequestAccount={onRequestAccount}
      />

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-14 px-6 z-10">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 backdrop-blur"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Enterprise Qualification Blueprint</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight"
          >
            MEDDPICC Isn't a Linear Checklist. <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent">
              It’s a Diagnostic.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-neutral-350 max-w-3xl mx-auto leading-relaxed"
          >
            The gold standard for enterprise B2B deal qualification — broken down by the textbook definition, and then rebuilt for how revenue is actually won in the field.
          </motion.p>

          {/* VIEW SWITCHER CONTROL */}
          <div className="pt-4 flex flex-col items-center gap-2">
            <div className="inline-flex p-1.5 rounded-xl bg-neutral-950 border border-neutral-800 shadow-xl gap-1">
              <button
                onClick={() => handleViewModeChange('acronym')}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === 'acronym'
                    ? 'bg-gradient-to-r from-emerald-700 to-[#0D5C46] text-white shadow-md shadow-emerald-950/60 ring-1 ring-emerald-400/40'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-neutral-300" />
                <span>The Alphabetical Acronym (M-E-D-D-P-I-C-C)</span>
              </button>

              <button
                onClick={() => handleViewModeChange('reality')}
                className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  viewMode === 'reality'
                    ? 'bg-gradient-to-r from-teal-700 to-emerald-700 text-white shadow-md shadow-emerald-950/60 ring-1 ring-teal-400/40'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>The Deal Journey (In Real Life)</span>
              </button>
            </div>
            <span className="text-[11px] text-neutral-500 font-mono">
              Toggle between the textbook acronym and the chronological field execution
            </span>
          </div>
        </div>
      </section>

      {/* CHRONOLOGICAL STAGES VS ACRONYM GRID */}
      <section id="qualification-engine" className="px-6 py-8 z-10 scroll-mt-24">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* REALITY VIEW: 3 DISTINCT CHRONOLOGICAL ACTS */}
          {viewMode === 'reality' ? (
            <div className="space-y-10">
              
              {/* EDITORIAL PIVOT CARD: "And this is how the story really goes..." */}
              <div className="relative rounded-2xl bg-gradient-to-br from-neutral-900/90 via-neutral-950 to-neutral-900/80 border border-neutral-800 p-8 md:p-10 shadow-2xl overflow-hidden group">
                
                {/* Ambient edge glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-600/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-emerald-600/20 transition-all duration-700" />
                <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-[#0D5C46]/10 rounded-full blur-[70px] pointer-events-none" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5" />
                      Tactical Reality Check
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">Why sequential MEDDPICC fails in the wild</span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    "And this is how the story really goes..."
                  </h2>

                  <div className="space-y-4 text-neutral-300 text-sm md:text-base leading-relaxed max-w-4xl">
                    <p>
                      If an Account Executive runs an enterprise deal following the literal letters <strong className="text-white font-semibold">M → E → D → D → P → I → C → C</strong> in sequence, the deal is dead on arrival.
                    </p>
                    <p>
                      Think about the dynamic: you cannot demand an executive's proprietary financial model (<span className="text-emerald-400 font-semibold font-mono">Metrics</span>) when you haven’t even uncovered what is bleeding inside their organization (<span className="text-red-400 font-semibold font-mono">Pain</span>). You cannot demand a sit-down with the budget authority (<span className="text-emerald-300 font-semibold font-mono">Economic Buyer</span>) without an internal leader staking their reputation on your solution (<span className="text-yellow-400 font-semibold font-mono">Champion</span>).
                    </p>
                    <p>
                      And nobody initiates contract reviews (<span className="text-teal-400 font-semibold font-mono">Paper Process</span>) in the early stages of a deal before technical validation is complete and the business case is established.
                    </p>
                    <div className="p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 flex items-start gap-3 mt-4">
                      <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-xs md:text-sm text-neutral-350">
                        <strong className="text-white font-semibold">The Executive Rule:</strong> MEDDPICC is an acronym created for easy memory, not a chronological playbook. High-performing enterprise reps anchor on <strong className="text-white font-semibold">Pain, Competition, and Champions early</strong>, quantify with <strong className="text-white font-semibold">Metrics & Criteria</strong>, map the <strong className="text-white font-semibold">Decision Process</strong> (noting there may be both technical and business decision processes spanning all three stages), and align with the <strong className="text-white font-semibold">Economic Buyer</strong> before navigating the <strong className="text-white font-semibold">Paper Process</strong> to close.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIVE VIEW SECTION: The Real-World 3-Act Qualification Engine */}
              <div className="pb-6 border-b border-neutral-900 bg-neutral-950/70 p-6 md:p-8 rounded-2xl border border-neutral-850 shadow-xl">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                      ✦ Active View: Chronological Field Flow
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">
                      3 Chronological Acts (Disqualify → Value Engine → Close)
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    The Real-World 3-Act Qualification Engine
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-400 max-w-3xl leading-relaxed">
                    How deals actually advance: Pain (I) and Competition (C) anchor early discovery, followed by financial Metrics (M), Decision Criteria (D), Decision Process (D), and Economic Buyer (E), concluding with the Paper Process (P).
                  </p>
                </div>
              </div>

              {/* ACT 1 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-950 border border-red-800 flex items-center justify-center font-bold text-xs text-red-400 font-mono">
                    01
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Act I: The Anchor (Early Discovery & Foundation)</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-red-950/80 text-red-400 border border-red-900/60">
                        Disqualify Fast
                      </span>
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Uncover the emotional and financial bleeding, assess who you are fighting, and find your internal pilot.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {displayedItems.filter(item => item.realLifeStage === 'anchor').map((item) => (
                    <PillarCard 
                      key={item.id} 
                      item={item} 
                      isSelected={activeItem?.id === item.id}
                      onSelect={() => handleSelectPillar(item)}
                    />
                  ))}
                </div>

                {/* Inline Inspector Box Directly Below Act 1 */}
                <AnimatePresence>
                  {activeItem && activeItem.realLifeStage === 'anchor' && (
                    <PillarInspectorWindow 
                      item={activeItem} 
                      onClose={() => setActiveItem(null)} 
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* ACT 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-950 border border-teal-800 flex items-center justify-center font-bold text-xs text-teal-400 font-mono">
                    02
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Act II: The Value Engine & Alignment</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-teal-950/80 text-teal-300 border border-teal-800/60">
                        Build The Math & Map The Gates
                      </span>
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Transform pain into financial models, shape evaluation criteria, map the technical decision process (noting there may be both technical and business decision processes spanning all three stages), and earn an audience with the Economic Buyer.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {displayedItems.filter(item => item.realLifeStage === 'engine').map((item) => (
                    <PillarCard 
                      key={item.id} 
                      item={item} 
                      isSelected={activeItem?.id === item.id}
                      onSelect={() => handleSelectPillar(item)}
                    />
                  ))}
                </div>

                {/* Inline Inspector Box Directly Below Act 2 */}
                <AnimatePresence>
                  {activeItem && activeItem.realLifeStage === 'engine' && (
                    <PillarInspectorWindow 
                      item={activeItem} 
                      onClose={() => setActiveItem(null)} 
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* ACT 3 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0D5C46]/50 border border-emerald-800 flex items-center justify-center font-bold text-xs text-emerald-400 font-mono">
                    03
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Act III: The Finish Line (Governance & Execution)</span>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                        Protect Close Date
                      </span>
                    </h4>
                    <p className="text-xs text-neutral-400">
                      Master the administrative procurement gauntlet, InfoSec audits, and legal redlines before quarter-end.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedItems.filter(item => item.realLifeStage === 'close').map((item) => (
                    <PillarCard 
                      key={item.id} 
                      item={item} 
                      isSelected={activeItem?.id === item.id}
                      onSelect={() => handleSelectPillar(item)}
                    />
                  ))}
                </div>

                {/* Inline Inspector Box Directly Below Act 3 */}
                <AnimatePresence>
                  {activeItem && activeItem.realLifeStage === 'close' && (
                    <PillarInspectorWindow 
                      item={activeItem} 
                      onClose={() => setActiveItem(null)} 
                    />
                  )}
                </AnimatePresence>
              </div>

            </div>
          ) : (
            /* ACRONYM VIEW: 8 CARD GRID WITH INLINE INSPECTOR DIRECTLY BELOW */
            <div className="space-y-6">
              {/* ACTIVE VIEW SECTION: Textbook Acronym Spelling */}
              <div className="pb-6 border-b border-neutral-900 bg-neutral-950/70 p-6 md:p-8 rounded-2xl border border-neutral-850 shadow-xl">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                      ✦ Active View: Textbook Acronym Spelling
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">
                      8 Letters Spelled in Literal M-E-D-D-P-I-C-C Order
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    The 8 Formal Pillars of MEDDPICC (Textbook Mnemonic)
                  </h3>
                  <p className="text-xs md:text-sm text-neutral-400 max-w-3xl leading-relaxed">
                    The classic spelling device. Notice how Metrics (M) and Economic Buyer (E) appear at steps 1 and 2, while Pain (I) and Competition (C) are placed at steps 6 and 8. Reps who attempt this order in real life get disqualified immediately.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {displayedItems.map((item) => (
                  <PillarCard 
                    key={item.id} 
                    item={item} 
                    isSelected={activeItem?.id === item.id}
                    onSelect={() => handleSelectPillar(item)}
                  />
                ))}
              </div>

              <AnimatePresence>
                {activeItem && (
                  <PillarInspectorWindow 
                    item={activeItem} 
                    onClose={() => setActiveItem(null)} 
                  />
                )}
              </AnimatePresence>
            </div>
          )}

        </div>
      </section>

      {/* QUICK COMPARISON TABLE */}
      <section className="px-6 py-12 z-10 bg-neutral-950/50 border-t border-neutral-900">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl md:text-2xl font-bold text-white">Side-by-Side: The Theory vs. The Field Reality</h3>
            <p className="text-xs text-neutral-400 max-w-xl mx-auto">
              How the sequence shifts when dealing with human stakeholders, budget cycles, and corporate politics.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-neutral-800 bg-[#070708]">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-neutral-900/80 text-neutral-400 font-mono uppercase tracking-wider border-b border-neutral-800">
                <tr>
                  <th className="p-3.5">Stage</th>
                  <th className="p-3.5">MEDDPICC Element</th>
                  <th className="p-3.5">Why At This Point?</th>
                  <th className="p-3.5">What Breaks If Out Of Order?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-850">
                <tr>
                  <td className="p-3.5 font-bold text-amber-400 font-mono">1. First</td>
                  <td className="p-3.5 font-semibold text-white">Identify Pain (I)</td>
                  <td className="p-3.5">Without burning friction, budget never frees up.</td>
                  <td className="p-3.5 text-neutral-400">Pitches turn into polite "interesting" meetings with zero next steps.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-amber-400 font-mono">2. Second</td>
                  <td className="p-3.5 font-semibold text-white">Competition (C)</td>
                  <td className="p-3.5">You must diagnose status-quo inertia and existing tools right away.</td>
                  <td className="p-3.5 text-neutral-400">You prepare a proposal only to find they decide to keep using Excel or build DIY.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-amber-400 font-mono">3. Third</td>
                  <td className="p-3.5 font-semibold text-white">Champion (C)</td>
                  <td className="p-3.5">You cannot sell from the outside; you need internal leverage.</td>
                  <td className="p-3.5 text-neutral-400">You get ghosted after sending pricing because nobody is championing the cause inside.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-emerald-400 font-mono">4. Fourth</td>
                  <td className="p-3.5 font-semibold text-white">Metrics (M)</td>
                  <td className="p-3.5">Work with your Champion to calculate business case ROI.</td>
                  <td className="p-3.5 text-neutral-400">Asking for financials before trust is built gets you generic or false numbers.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-teal-400 font-mono">5. Fifth</td>
                  <td className="p-3.5 font-semibold text-white">Decision Criteria (D)</td>
                  <td className="p-3.5">Bias the evaluation matrix toward your architectural advantages.</td>
                  <td className="p-3.5 text-neutral-400">Competitors define the criteria, forcing you into a price war.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-teal-400 font-mono">6. Sixth</td>
                  <td className="p-3.5 font-semibold text-white">
                    <span>Decision Process (D)</span>
                    <span className="block text-[10px] text-neutral-400 font-normal mt-0.5">
                      (Note: there may be both technical and business decision processes spanning all three stages)
                    </span>
                  </td>
                  <td className="p-3.5">Map the technical validation gates and committee steps to become the confirmed vendor of choice.</td>
                  <td className="p-3.5 text-neutral-400">Without understanding evaluation gates early, deals stall in endless trials or sudden scope changes.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-emerald-300 font-mono">7. Seventh</td>
                  <td className="p-3.5 font-semibold text-white">Economic Buyer (E)</td>
                  <td className="p-3.5">Earn the right to pitch the executive armed with Champion endorsement, proven ROI, and a mapped decision path.</td>
                  <td className="p-3.5 text-neutral-400">Meeting the VP too early leads to a generic feature pitch and closed doors.</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-teal-300 font-mono">8. Eighth</td>
                  <td className="p-3.5 font-semibold text-white">Paper Process (P)</td>
                  <td className="p-3.5">Legal, security, InfoSec, and procurement vendor onboarding.</td>
                  <td className="p-3.5 text-neutral-400">Premature contract review clogs legal queues before value is validated.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="px-6 py-16 z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 bg-gradient-to-b from-neutral-900/60 to-neutral-950 p-10 rounded-2xl border border-neutral-800 shadow-xl">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-400">
            <Zap className="w-6 h-6" />
          </div>
          
          <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Ready to Accelerate Your Enterprise GTM Pipeline?
          </h3>
          
          <p className="text-xs md:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Vizhin LLC delivers Go-To-Market situational analyses, reseller channel architecture, and white-labeled CRM sandbox systems to scale sales velocity.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => window.location.href = 'mailto:rreifel@vizhin.co?subject=Inquiry regarding MEDDPICC and GTM Consulting'}
              className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-[#0D5C46] hover:from-emerald-500 hover:to-[#0A4837] text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-950/40 border border-emerald-500/30 cursor-pointer flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              <span>Contact GTM Advisor</span>
            </button>

            <button
              onClick={onRequestAccount}
              className="px-6 py-3 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-emerald-500/50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Request Portal Sandbox
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-900 bg-[#060607] py-6 px-6 text-center text-xs text-neutral-500 font-mono z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
          <span>VIZHIN LLC • MEDDPICC QUALIFICATION ARCHITECTURE & GTM EXCELLENCE</span>
        </div>
      </footer>

    </div>
  );
}

interface PillarCardProps {
  item: MeddpiccItem;
  isSelected: boolean;
  onSelect: () => void;
  key?: React.Key;
}

// Sub-component for individual pillar cards
function PillarCard({ 
  item, 
  isSelected, 
  onSelect 
}: PillarCardProps) {
  const Icon = item.icon;

  return (
    <div
      onClick={onSelect}
      className={`p-5 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
        isSelected 
          ? 'bg-neutral-900 border-emerald-500 shadow-xl shadow-emerald-950/70 ring-2 ring-emerald-500/50' 
          : 'bg-neutral-950/70 border-neutral-850 hover:border-neutral-700 hover:bg-neutral-900/60'
      }`}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.accentColor} text-white font-extrabold flex items-center justify-center text-sm shadow-md`}>
              {item.letter}
            </span>
            <div>
              <span className="text-[10px] block font-mono font-bold uppercase tracking-wider text-neutral-400">
                Order #{item.realLifeOrder}
              </span>
              <h5 className={`text-sm font-bold transition-colors ${isSelected ? 'text-emerald-300' : 'text-white group-hover:text-emerald-300'}`}>
                {item.name}
              </h5>
            </div>
          </div>
          <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-emerald-400' : 'text-neutral-500 group-hover:text-emerald-400'}`} />
        </div>

        <p className="text-xs text-neutral-400 leading-snug line-clamp-2">
          {item.tagline}
        </p>
      </div>

      <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-mono transition-colors ${
        isSelected 
          ? 'border-emerald-900/80 text-emerald-400 font-bold' 
          : 'border-neutral-900/80 text-neutral-500 group-hover:text-neutral-300'
      }`}>
        <span className="flex items-center gap-1">
          {isSelected ? 'Close Details' : 'Inspect Details'}
        </span>
        {isSelected ? (
          <X className="w-3.5 h-3.5 text-emerald-400" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-neutral-300 group-hover:translate-x-0.5 transition-transform" />
        )}
      </div>
    </div>
  );
}

interface PillarInspectorWindowProps {
  item: MeddpiccItem;
  onClose: () => void;
}

// Inline inspector window that opens directly below the clicked pillar's row
function PillarInspectorWindow({ item, onClose }: PillarInspectorWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.995 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.995 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="mt-3 rounded-2xl bg-neutral-925/95 border-2 border-emerald-500/60 p-5 md:p-6 relative overflow-hidden shadow-2xl backdrop-blur-md"
      style={{
        boxShadow: '0 20px 45px -15px rgba(0, 0, 0, 0.9), 0 0 25px -4px rgba(16, 185, 129, 0.25)'
      }}
    >
      {/* Top glowing accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0D5C46] via-emerald-500 to-teal-400 opacity-90" />

      {/* Top Header with title and close button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-neutral-800">
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.accentColor} flex items-center justify-center text-white font-extrabold text-xl shadow-lg shrink-0`}>
            {item.letter}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                Inspecting Details • {item.stageName} • Order #{item.realLifeOrder}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${item.badgeBg}`}>
                Pillar #{item.acronymIndex + 1}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2 mt-0.5">
              <span>{item.name}</span>
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">{item.tagline}</p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-600 text-neutral-200 hover:text-white text-xs font-semibold cursor-pointer transition-all shadow-sm group shrink-0"
          title="Close details window"
        >
          <X className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
          <span>Close Window</span>
        </button>
      </div>

      {/* 3-Column Diagnostic Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-5">
        {/* Question */}
        <div className="p-4 rounded-xl bg-neutral-900/90 border border-neutral-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>The Diagnostic Question</span>
          </div>
          <p className="text-sm font-semibold text-neutral-100 leading-snug">
            "{item.coreQuestion}"
          </p>
          <p className="text-xs text-neutral-400 pt-1 leading-relaxed">
            {item.executiveReality}
          </p>
        </div>

        {/* Red Flag Warning */}
        <div className="p-4 rounded-xl bg-red-950/25 border border-red-900/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-red-400 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>Fatal Failure Mode</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed font-normal">
            {item.failureMode}
          </p>
        </div>

        {/* Tactical Advice */}
        <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-900/50 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4" />
            <span>The Vizhin Tactical Play</span>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed font-normal">
            {item.tacticalAdvice}
          </p>
        </div>
      </div>

      {/* Footer bar */}
      <div className="mt-4 pt-3 border-t border-neutral-900/70 flex items-center justify-between text-xs text-neutral-500">
        <span className="font-mono text-[11px] text-neutral-400">
          Click any other pillar to inspect its details, or close this window.
        </span>
        <button
          onClick={onClose}
          className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 font-semibold"
        >
          <span>Close</span>
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
