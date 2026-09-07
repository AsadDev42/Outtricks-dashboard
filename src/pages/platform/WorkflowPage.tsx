import { SEOHead } from '../../components/seo/SEOHead';
﻿import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Workflow, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  Database, 
  Zap, 
  Clock, 
  GitBranch, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  Filter, 
  Split, 
  Activity,
  Sliders,
  Check
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

// 6 Core Sequential Workflow Nodes for Hero & Canvas
const WORKFLOW_NODES = [
  {
    id: 0,
    step: "01",
    name: "New Lead",
    channel: "Lead Finder",
    icon: Search,
    triggerText: "ICP Match: VP of Product @ FinTech ($10M-$50M ARR)",
    actionText: "Discovered via 8D targeting filters. Enrolled into sequence.",
    badgeColor: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]/70 border-blue-200 dark:border-blue-900"
  },
  {
    id: 1,
    step: "02",
    name: "Verify Contact",
    channel: "Lead Data",
    icon: Database,
    triggerText: "Domain verification passed (multiAttribute search)",
    actionText: "Extracted direct dial (+1 415-892-4910) & valid work email.",
    badgeColor: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]/70 border-blue-200 dark:border-blue-900"
  },
  {
    id: 2,
    step: "03",
    name: "Email Outreach",
    channel: "Cold Email",
    icon: Mail,
    triggerText: "Email sequence dispatched from active mailbox-04",
    actionText: "Personalized with custom spintax token & value proposition.",
    badgeColor: "text-sky-600 bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-900"
  },
  {
    id: 3,
    step: "04",
    name: "LinkedIn Touch",
    channel: "LinkedIn API",
    icon: Linkedin,
    triggerText: "Email opened 2x without reply in 48 hours",
    actionText: "Safe OAuth profile view and personalized connection invite sent.",
    badgeColor: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]/70 border-blue-200 dark:border-blue-900"
  },
  {
    id: 4,
    step: "05",
    name: "Voice AI SDR",
    channel: "Voice AI",
    icon: PhoneCall,
    triggerText: "LinkedIn connected but no message response",
    actionText: "Sub-400ms qualifying call initiated. Qualified budget and booked demo.",
    badgeColor: "text-amber-600 bg-amber-50 dark:bg-amber-950/70 border-amber-200 dark:border-amber-900"
  },
  {
    id: 5,
    step: "06",
    name: "CRM Update",
    channel: "Unified Deals CRM",
    icon: Building2,
    triggerText: "Call transcript & demo booking confirmed",
    actionText: "Created $48,000 opportunity in 'Proposal' stage & assigned AE.",
    badgeColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-900"
  }
];

// Workflow Templates
const TEMPLATES = [
  {
    id: 'sprint',
    title: "The 3-Channel Outbound Sprint",
    category: "Cold Outbound",
    description: "Coordinated cold email, LinkedIn profile engagement, and Voice AI SDR calling sequence.",
    steps: "Email → LinkedIn → Voice SDR → Deals CRM",
    metric: "18.4% Reply Rate",
    badge: "Most Popular"
  },
  {
    id: 'inbound',
    title: "High-Intent Inbound Lightning Response",
    category: "Speed-to-Lead",
    description: "Trigger sub-400ms Voice SDR call within 60 seconds of website demo request form submission.",
    steps: "Form Submit → multiAttribute Verify → Voice Call → Calendar",
    metric: "< 60s Response",
    badge: "Speed to Lead"
  },
  {
    id: 'winback',
    title: "Lost Opportunity Win-Back Flow",
    category: "Re-Engagement",
    description: "Automatically re-engages closed-lost opportunities after 60 days when job change signals occur.",
    steps: "60-Day Delay → Signal Check → Cold Email → AE Alert",
    metric: "12.8% Reactivation",
    badge: "Pipeline Multiplier"
  }
];

export const WorkflowPage: React.FC = () => {
  const [heroActiveNode, setHeroActiveNode] = useState<number>(0);
  const [activeTemplate, setActiveTemplate] = useState<string>('sprint');
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationIndex, setSimulationIndex] = useState<number>(-1);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const selectedNode = WORKFLOW_NODES[heroActiveNode];

  // Run Flow Simulation
  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimulationIndex(0);
    setHeroActiveNode(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      if (current < WORKFLOW_NODES.length) {
        setSimulationIndex(current);
        setHeroActiveNode(current);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setSimulationIndex(WORKFLOW_NODES.length);
        }, 600);
      }
    }, 650);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimulationIndex(-1);
    setHeroActiveNode(0);
  };

  const FAQS = [
    {
      q: "What is the Visual Flow Builder?",
      a: "The Visual Flow Builder is an interactive canvas that lets you design multi-channel outbound and inbound revenue automations. You can connect Lead Finding, Email Outreach, LinkedIn, Voice AI SDR, and CRM updates without writing code or using third-party webhook tools."
    },
    {
      q: "How do triggers and actions work?",
      a: "Triggers listen for prospect events (e.g. email opened 2x, connection accepted, form submitted, CRM deal stage updated). When the condition is met, Outtricks automatically executes the configured action (e.g. dispatch follow-up, place Voice AI call, or update opportunity stage)."
    },
    {
      q: "Can I create conditional branching (IF/ELSE logic)?",
      a: "Yes. You can build advanced multi-branch decision trees based on prospect job seniority, company headcount, tech stack, email engagement, call outcome, or CRM deal size."
    },
    {
      q: "Which channels can be automated in a flow?",
      a: "All native Outtricks channels can be orchestrated seamlessly: 480M+ B2B Prospecting, Lead Lead Search, Multi-Inbox Cold Email, LinkedIn API messaging, Sub-400ms Voice AI SDR calls, Freelance Bidding AI, and Unified Deals CRM."
    },
    {
      q: "How does the flow builder prevent duplicate outreach?",
      a: "Outtricks features native database-level idempotency and unified contact suppression lists. If a prospect responds on any channel (Email, LinkedIn, or Phone), all active sequences on all other channels are immediately halted automatically."
    },
    {
      q: "Can flows be triggered via API or external webhooks?",
      a: "Yes. You can trigger any visual workflow programmatically using the `/v1/workflows/trigger` REST API endpoint or by connecting incoming webhooks from your existing application."
    },
    {
      q: "Is there a limit to how many steps a workflow can have?",
      a: "No. Workflows can scale to hundreds of conditional branches, delays, validation checks, and multi-channel actions with zero execution lag."
    },
    {
      q: "How quickly do actions execute after a trigger occurs?",
      a: "Because Outtricks runs on a single PostgreSQL core, event evaluations happen in real time with sub-100ms trigger-to-action execution latency."
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Visual Flow Builder & Multi-Channel Revenue Automation | Outtricks"
        description="Build drag-and-drop revenue automation workflows connecting email, LinkedIn, Voice AI, and CRM triggers."
        canonical="https://outtricks.com/platform/visual-flow-builder"
        keywords={["visual flow builder","sales workflow automation","multi-channel sequence builder","outbound automation"]}
        breadcrumbs={[{"name":"Platform","url":"/platform"},{"name":"Flow Builder","url":"/platform/visual-flow-builder"}]}
      />
      
      {/* =========================================================================
          HERO SECTION: VISUAL FLOW BUILDER (Clean, Spacious, Interactive)
          ========================================================================= */}
      <section className="relative pt-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTAs (Spans 6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs">
              <Workflow className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
                VISUAL FLOW BUILDER
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08]">
              Build Revenue Workflows{' '}
              <span className="animated-gradient-text">
                That Run Themselves
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Create visual, multi-step automations that respond to prospect activity, trigger the right action, and keep your revenue workflow moving automatically.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <Link
                to="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Build a Workflow</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/book-a-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Book a Demo</span>
              </Link>
            </div>

            {/* Trust Line */}
            <div className="pt-2 text-xs font-sans text-slate-500 dark:text-slate-400">
              Drag-and-Drop Canvas • Multi-Channel Branching • Sub-100ms Execution
            </div>

          </div>

          {/* Right Column: Interactive Visual Workflow Builder Canvas (Spans 6 cols) */}
          <div className="lg:col-span-6">
            <Card3DTilt maxTilt={4} scale={1.01}>
              <div className="liquid-glass rounded-3xl p-6 sm:p-7 shadow-clean space-y-5">
                
                {/* Header Strip with Live Controls */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-[#2A2A2A]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-sans font-bold text-slate-700 dark:text-slate-200">
                      Multi-Channel Outbound Flow
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {simulationIndex === WORKFLOW_NODES.length ? (
                      <button
                        onClick={handleResetSimulation}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-[11px] font-sans font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Replay</span>
                      </button>
                    ) : (
                      <button
                        onClick={handleRunSimulation}
                        disabled={isSimulating}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-sans font-bold transition-all cursor-pointer ${
                          isSimulating
                            ? 'bg-blue-100 text-blue-700 dark:bg-[#1A1A1A] dark:text-blue-300 animate-pulse'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                        }`}
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>{isSimulating ? "Running..." : "Test Flow"}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* 6 Connected Nodes Grid: New Lead → Verify → Email → LinkedIn → Voice AI → CRM */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-center text-xs">
                  {WORKFLOW_NODES.map((node, idx) => {
                    const Icon = node.icon;
                    const isSelected = heroActiveNode === idx;
                    const isSimActive = simulationIndex === idx;
                    const isCompleted = simulationIndex > idx || simulationIndex === WORKFLOW_NODES.length;

                    return (
                      <button
                        key={idx}
                        onClick={() => setHeroActiveNode(idx)}
                        className={`p-3 rounded-2xl transition-all cursor-pointer space-y-1.5 text-left border ${
                          isSelected || isSimActive
                            ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/25 scale-[1.03]'
                            : isCompleted
                            ? 'liquid-glass-card border-emerald-500/40 text-slate-800 dark:text-slate-200'
                            : 'liquid-glass-card border-slate-200/60 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                            isSelected || isSimActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-[#181818] text-blue-600 dark:text-blue-400'
                          }`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <span className={`text-[10px] font-sans font-bold ${
                            isSelected || isSimActive ? 'text-white/80' : 'text-slate-400'
                          }`}>
                            {node.step}
                          </span>
                        </div>
                        <span className="font-bold text-[11px] block truncate">{node.name}</span>
                        <span className={`text-[10px] block truncate opacity-80 ${
                          isSelected || isSimActive ? 'text-white/80' : 'text-slate-500'
                        }`}>
                          {node.channel}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Node Execution Details Drawer */}
                <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-white/[0.04] border border-blue-100 dark:border-blue-900/60 text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-900 dark:text-blue-200 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Node {selectedNode.step}: {selectedNode.name}</span>
                    </span>
                    <span className="text-[10px] font-sans px-2 py-0.5 rounded-md bg-indigo-200/50 dark:bg-blue-900/80 text-indigo-800 dark:text-blue-200 font-bold">
                      {selectedNode.channel}
                    </span>
                  </div>
                  <div className="space-y-1 text-[11px]">
                    <div className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-blue-200 font-semibold">Trigger: </strong>
                      {selectedNode.triggerText}
                    </div>
                    <div className="text-slate-600 dark:text-slate-300">
                      <strong className="text-slate-900 dark:text-blue-200 font-semibold">Automated Action: </strong>
                      {selectedNode.actionText}
                    </div>
                  </div>
                </div>

              </div>
            </Card3DTilt>
          </div>

        </div>

      </section>

      {/* =========================================================================
          1. FROM TRIGGER TO ACTION, ALL IN ONE FLOW (4 Stage Cards)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            END-TO-END ORCHESTRATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            From Trigger to Action, All in One Flow
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Connect data ingestion, multi-channel touches, and CRM updates into a continuous autonomous loop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Event Triggers",
              desc: "Listen for website form submits, email opens, LinkedIn replies, or CRM stage movements in real time.",
              icon: Zap,
              tag: "Real-Time Listeners"
            },
            {
              step: "02",
              title: "Automated Logic",
              desc: "Evaluate seniority, company headcount, tech stack, and intent signals before branching to the next touchpoint.",
              icon: Filter,
              tag: "8D ICP Rules"
            },
            {
              step: "03",
              title: "Multi-Channel Action",
              desc: "Execute cold email sequences, LinkedIn connection requests, Voice AI calls, or custom microservice webhooks.",
              icon: Workflow,
              tag: "Native Dispatch"
            },
            {
              step: "04",
              title: "Closed-Loop CRM",
              desc: "Create deals, log call recordings, assign account executives, and track complete attribution with 0ms lag.",
              icon: Building2,
              tag: "Zero-Drift Sync"
            }
          ].map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <Card3DTilt key={idx} maxTilt={5}>
                <div className="liquid-glass-card p-7 rounded-3xl shadow-clean space-y-4 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-sans font-bold text-slate-400">
                        {stage.step}
                      </span>
                    </div>
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-[#2A2A2A] text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400">
                    {stage.tag}
                  </div>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          2. DESIGN ONCE. EXECUTE AUTOMATICALLY. (Large Interactive Canvas)
          ========================================================================= */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CANVAS EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Design Once. Execute Automatically.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Build clean, visual workflows that continuously run your pipeline without human bottlenecks.
          </p>
        </div>

        {/* Large Interactive Canvas Container */}
        <div className="liquid-glass rounded-3xl p-8 sm:p-12 shadow-clean max-w-5xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-[#2A2A2A]">
            <div>
              <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                Active Orchestration Graph
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Enterprise Multi-Channel Outreach Engine
              </h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-sans text-slate-500 dark:text-slate-400">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 font-bold">
                ● 2,400 Executions / Day
              </span>
            </div>
          </div>

          {/* Connected Flow Diagram on Canvas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step A: Ingestion */}
            <div className="p-6 rounded-2xl liquid-glass-card space-y-3 border-l-4 border-l-indigo-600">
              <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                Stage 1: Lead Ingestion
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Filter & contact search
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Pulls verified prospects matching VP/Director title filters and Verifyes work emails with 99.4% deliverability health.
              </p>
            </div>

            {/* Step B: Multi-Channel Cadence */}
            <div className="p-6 rounded-2xl liquid-glass-card space-y-3 border-l-4 border-l-blue-600">
              <span className="text-[10px] font-sans font-bold text-blue-600 uppercase">
                Stage 2: Multi-Touch Cadence
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Email + LinkedIn + Voice AI
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Dispatches cold email, checks engagement, follows up on LinkedIn, and triggers a sub-400ms Voice SDR call if intent is high.
              </p>
            </div>

            {/* Step C: Conversion & CRM */}
            <div className="p-6 rounded-2xl liquid-glass-card space-y-3 border-l-4 border-l-emerald-600">
              <span className="text-[10px] font-sans font-bold text-emerald-600 uppercase">
                Stage 3: Opportunity Close
              </span>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Native Deals CRM Update
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                When a demo is booked, automatically writes the deal to PostgreSQL, logs full call transcripts, and sends Slack notification to AE.
              </p>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans">
            <span className="text-slate-300">
              Trigger Latency: <strong className="text-emerald-400">42ms</strong> • Idempotency Check: <strong className="text-emerald-400">Active</strong> • Error Rate: <strong className="text-emerald-400">0.00%</strong>
            </span>
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-bold underline">
              Deploy Canvas Flow →
            </Link>
          </div>

        </div>
      </section>

      {/* =========================================================================
          3. CONNECT EVERY REVENUE ACTION (6 Standalone Cards)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            NATIVE INTEGRATIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Connect Every Revenue Action
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Every core Outtricks module plugs directly into your visual flows as a trigger or action node.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Lead Finder",
              desc: "Automatically query 480M+ verified contacts and pull fresh ICP matches into active sequences based on company hiring signals.",
              icon: Search
            },
            {
              title: "Lead Search",
              desc: "Run real-time MultiDimensional Lead Search for work emails, direct dials, and technographic stack details.",
              icon: Database
            },
            {
              title: "Email Outreach",
              desc: "Trigger personalized cold email sequences across unlimited connected Google and Microsoft mailboxes with spintax warmup.",
              icon: Mail
            },
            {
              title: "LinkedIn Automation",
              desc: "Automate profile views, connection requests, and message follow-ups via official safe OAuth API and dedicated IPs.",
              icon: Linkedin
            },
            {
              title: "Voice AI SDR",
              desc: "Initiate sub-400ms conversational voice calls to qualify prospects who opened emails multiple times or showed high intent.",
              icon: PhoneCall
            },
            {
              title: "Unified CRM",
              desc: "Create deals, advance pipeline stages, log call recordings, and notify account executives without sync drift.",
              icon: Building2
            }
          ].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <Card3DTilt key={idx} maxTilt={5}>
                <div className="liquid-glass-card p-7 rounded-3xl shadow-clean space-y-3 h-full">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white pt-1">
                    {mod.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {mod.desc}
                  </p>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          4. BUILD WORKFLOWS THAT ADAPT (Conditional Branching)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CONDITIONAL LOGIC
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Build Workflows That Adapt
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Intelligent decision trees ensure prospects always receive the most relevant next step.
          </p>
        </div>

        {/* Branching Logic Visualizer */}
        <div className="liquid-glass rounded-3xl p-8 sm:p-12 shadow-clean max-w-4xl mx-auto space-y-4 font-sans text-xs">
          
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-900 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-900 dark:text-blue-200 font-bold">
              <Split className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>IF: Prospect replies to Cold Email</span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold text-[11px]">
              → Stop sequence & alert AE in Slack
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
              <Split className="w-4 h-4 text-blue-600" />
              <span>ELSE IF: Email opened 2x but no reply in 48h</span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-[#1A1A1A] text-blue-700 dark:text-blue-300 font-bold text-[11px]">
              → Dispatch LinkedIn invite with case study
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
              <Split className="w-4 h-4 text-blue-600" />
              <span>ELSE IF: LinkedIn accepted but no message reply</span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-blue-100 dark:bg-[#1A1A1A] text-blue-700 dark:text-blue-300 font-bold text-[11px]">
              → Trigger Voice AI SDR sub-400ms call
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold">
              <Split className="w-4 h-4 text-slate-500" />
              <span>ELSE: No engagement after 5 days</span>
            </div>
            <span className="px-2.5 py-1 rounded-md bg-slate-200 dark:bg-[#181818] text-slate-700 dark:text-slate-300 font-bold text-[11px]">
              → Move to 60-day nurture queue
            </span>
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. START WITH A PROVEN WORKFLOW (Realistic Templates)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            PRE-BUILT BLUEPRINTS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Start With a Proven Workflow
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Launch battle-tested revenue cadences with 1-click template clones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TEMPLATES.map((tmpl) => (
            <Card3DTilt key={tmpl.id} maxTilt={5}>
              <div className="liquid-glass-card p-8 rounded-3xl shadow-clean space-y-4 h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400">
                      {tmpl.category}
                    </span>
                    <span className="text-xs font-sans font-bold text-emerald-600">
                      {tmpl.metric}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    {tmpl.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 dark:border-[#2A2A2A] space-y-2">
                  <span className="text-[10px] font-sans text-slate-400 block">Sequence Path:</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block font-sans">
                    {tmpl.steps}
                  </span>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. LESS MANUAL WORK. MORE CONSISTENT EXECUTION.
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            OPERATIONAL EXCELLENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Less Manual Work. More Consistent Execution.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Eliminate human errors and ensure every single prospect is handled with precision.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {[
            {
              title: "Zero Manual Handoffs",
              desc: "No CSV exports or Zapier delays. When a prospect engages, the next multi-channel action triggers automatically.",
              icon: Layers
            },
            {
              title: "Instant Event Triggers",
              desc: "Actions execute within milliseconds of email opens, clicks, LinkedIn acceptances, or website form submissions.",
              icon: Zap
            },
            {
              title: "Fail-Safe Idempotency",
              desc: "Built-in database-level deduplication prevents duplicate outreach and halts all sequences immediately upon reply.",
              icon: ShieldCheck
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card3DTilt key={idx} maxTilt={5}>
                <div className="liquid-glass-card p-8 rounded-3xl shadow-clean space-y-3 h-full">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white pt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          7. FINAL CTA: BUILD YOUR FIRST REVENUE WORKFLOW
          ========================================================================= */}
      <section className="max-w-6xl mx-auto">
        <div className="liquid-glass rounded-3xl p-8 sm:p-14 shadow-clean text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 text-xs font-sans font-bold uppercase tracking-wider">
            AUTOMATE OUTBOUND TODAY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Build Your First Revenue Workflow
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Connect your lead generation, multi-inbox email, LinkedIn, and Voice AI SDR into one automated engine in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/book-a-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Book a Demo</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. FAQ SECTION (Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
            FLOW BUILDER FAQ
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 pt-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="liquid-glass-card rounded-2xl overflow-hidden shadow-xs">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200/50 dark:border-[#2A2A2A] pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

