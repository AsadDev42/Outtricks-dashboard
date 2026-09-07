import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  Search, 
  Sparkles, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  Check, 
  ArrowRight, 
  Clock, 
  Layers, 
  Zap, 
  CheckCircle2,
  Workflow
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card3DTilt } from './3d/Card3DTilt';

interface FlowNode {
  id: number;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  channel: string;
  trigger: string;
  action: string;
  nextStep: string;
  color: string;
  bgLight: string;
}

const WORKFLOW_NODES: FlowNode[] = [
  {
    id: 0,
    step: "01",
    title: "Lead Found",
    subtitle: "Find verified decision-makers",
    description: "Search 480M+ global profiles with 8D targeting filters (Title, Tech Stack, Funding).",
    icon: Search,
    channel: "Prospecting",
    trigger: "New prospect matches ICP criteria (VP Sales / Head of Growth)",
    action: "Extract verified contact and company data from 480M+ database",
    nextStep: "Forward to email verification stage",
    color: "text-blue-600 dark:text-blue-400",
    bgLight: "bg-blue-50 dark:bg-[#1A1A1A]/70 border-blue-200 dark:border-blue-900"
  },
  {
    id: 1,
    step: "02",
    title: "Verify & Format",
    subtitle: "Add company and buying signals",
    description: "Validate work emails and direct phone dials using MultiDimensional Lead Search.",
    icon: Sparkles,
    channel: "Validation",
    trigger: "Contact extracted from database search",
    action: "Real-time deliverability check + company property mapping",
    nextStep: "Enroll in multi-inbox cold email sequence",
    color: "text-blue-600 dark:text-blue-400",
    bgLight: "bg-blue-50 dark:bg-[#1A1A1A]/70 border-blue-200 dark:border-blue-900"
  },
  {
    id: 2,
    step: "03",
    title: "Email Outreach",
    subtitle: "Send personalized sequences",
    description: "Rotate dispatch across 24 warmed inboxes with AI spintax and dynamic value propositions.",
    icon: Mail,
    channel: "Cold Email",
    trigger: "Prospect verified with 100% deliverable work email",
    action: "Send personalized 3-step cold email cadence from optimal mailbox",
    nextStep: "Monitor open and reply signals for 48 hours",
    color: "text-blue-600 dark:text-blue-400",
    bgLight: "bg-blue-50 dark:bg-[#1A1A1A]/70 border-blue-200 dark:border-blue-900"
  },
  {
    id: 3,
    step: "04",
    title: "LinkedIn Touch",
    subtitle: "Follow up with relevant prospects",
    description: "Send safe connection request and personalized message via official OAuth API.",
    icon: Linkedin,
    channel: "LinkedIn API",
    trigger: "Email opened 2x but no reply received within 48 hours",
    action: "Dispatch profile view and connection message via dedicated proxy",
    nextStep: "If accepted without reply, advance to Voice AI SDR",
    color: "text-sky-600 dark:text-sky-400",
    bgLight: "bg-sky-50 dark:bg-sky-950/70 border-sky-200 dark:border-sky-900"
  },
  {
    id: 4,
    step: "05",
    title: "Voice AI",
    subtitle: "Call and qualify high-intent leads",
    description: "Sub-400ms WebRTC conversational caller handles objections and qualifies live.",
    icon: PhoneCall,
    channel: "Voice AI SDR",
    trigger: "Prospect viewed LinkedIn profile & clicked email link",
    action: "Trigger autonomous sub-400ms phone call to qualify buying intent",
    nextStep: "Book demo on rep's Google Calendar and advance deal",
    color: "text-blue-600 dark:text-blue-400",
    bgLight: "bg-blue-50 dark:bg-[#1A1A1A]/70 border-blue-200 dark:border-blue-900"
  },
  {
    id: 5,
    step: "06",
    title: "CRM Update",
    subtitle: "Automatically update the opportunity",
    description: "Log full call recordings, email transcripts, and create a qualified deal in CRM.",
    icon: Building2,
    channel: "Deals CRM",
    trigger: "Meeting booked by Voice AI SDR",
    action: "Create $48,000 ARR deal opportunity and alert Slack #sales-wins",
    nextStep: "Workflow completed (0 manual handoffs)",
    color: "text-emerald-600 dark:text-emerald-400",
    bgLight: "bg-emerald-50 dark:bg-emerald-950/70 border-emerald-200 dark:border-emerald-900"
  }
];

export const FlowSimulator: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(-1); // -1 = idle
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(2); // Default to "Email Outreach"
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Sequential Live Workflow Simulation
  const handleRunWorkflow = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsCompleted(false);
    setActiveStep(0);
    setSelectedNodeIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < WORKFLOW_NODES.length) {
        setActiveStep(current);
        setSelectedNodeIndex(current);
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setIsCompleted(true);
        setActiveStep(WORKFLOW_NODES.length - 1);
      }
    }, 600); // 600ms per step = 3.6s total
  };

  const handleResetWorkflow = () => {
    setIsRunning(false);
    setActiveStep(-1);
    setIsCompleted(false);
    setSelectedNodeIndex(2);
  };

  const selectedNode = WORKFLOW_NODES[selectedNodeIndex];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* =========================================================================
          CANVAS CONTROLS BAR (Header with Run / Replay Action)
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl liquid-glass border border-slate-200/90 dark:border-[#2A2A2A]/90 shadow-clean">
        
        {/* Left Status Indicator */}
        <div className="flex items-center gap-2.5">
          <span className={`w-2.5 h-2.5 rounded-full ${
            isRunning ? 'bg-blue-600 animate-ping' : isCompleted ? 'bg-emerald-500' : 'bg-slate-400'
          }`} />
          <span className="text-xs font-sans font-bold text-slate-800 dark:text-slate-200">
            {isRunning ? `Executing Step ${activeStep + 1} of 06: ${WORKFLOW_NODES[activeStep]?.title}...` 
             : isCompleted ? "? Workflow completed � 6 actions executed automatically" 
             : "Intelligent Multi-Channel Revenue Graph"}
          </span>
        </div>

        {/* Right Run / Replay Action */}
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <button
              onClick={handleResetWorkflow}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full liquid-glass-button text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay workflow</span>
            </button>
          ) : null}

          <button
            onClick={handleRunWorkflow}
            disabled={isRunning}
            className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer shadow-md ${
              isRunning
                ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/25 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? "Running..." : "Run Workflow ?"}</span>
          </button>
        </div>

      </div>

      {/* =========================================================================
          MAIN WORKFLOW CANVAS (Connected Horizontal & Vertical Sequence)
          ========================================================================= */}
      <div className="liquid-glass rounded-3xl p-6 sm:p-10 shadow-clean border border-slate-200/90 dark:border-[#2A2A2A]/90 relative overflow-hidden">
        
        {/* Workflow Node Grid / Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative z-10">
          {WORKFLOW_NODES.map((node, idx) => {
            const Icon = node.icon;
            const isCurrentActive = activeStep === idx;
            const isStepCompleted = activeStep > idx || isCompleted;
            const isSelected = selectedNodeIndex === idx;
            const isHovered = hoveredNode === idx;

            // Status label
            let statusText = "Waiting";
            let statusColor = "text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#181818]";
            if (isCurrentActive) {
              statusText = "Running";
              statusColor = "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-[#1A1A1A]/80 border border-blue-200 dark:border-blue-800 animate-pulse";
            } else if (isStepCompleted) {
              statusText = "Complete";
              statusColor = "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800";
            }

            return (
              <div 
                key={node.id}
                className="relative flex flex-col justify-between"
                onMouseEnter={() => setHoveredNode(idx)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <Card3DTilt maxTilt={6} scale={1.03}>
                  <button
                    onClick={() => setSelectedNodeIndex(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all cursor-pointer h-full flex flex-col justify-between relative ${
                      isSelected
                        ? 'liquid-glass border-2 border-blue-600 dark:border-indigo-400 shadow-lg shadow-blue-600/10'
                        : isCurrentActive
                        ? 'liquid-glass border-2 border-blue-500 dark:border-indigo-400 shadow-md shadow-blue-500/20'
                        : isStepCompleted
                        ? 'liquid-glass-card border border-emerald-300/80 dark:border-emerald-800/80'
                        : 'liquid-glass-card border border-slate-200/80 dark:border-[#2A2A2A]/80'
                    }`}
                  >
                    
                    {/* Node Header */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${node.bgLight} ${node.color} shadow-xs`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="font-sans text-[11px] font-extrabold text-slate-400 dark:text-slate-500">
                          {node.step}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                          {node.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug mt-1 line-clamp-2">
                          {node.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Node Status Badge */}
                    <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A]/60 mt-3 flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-bold ${statusColor}`}>
                        {statusText}
                      </span>
                      {isStepCompleted && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>

                  </button>
                </Card3DTilt>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            COMPACT CONTEXTUAL DETAIL PANEL (Reveals on Node Click)
            ========================================================================= */}
        <div className="mt-6 pt-6 border-t border-slate-200/60 dark:border-[#2A2A2A]">
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-50/80 dark:bg-[#141414]/80 border border-slate-200/80 dark:border-[#2A2A2A] space-y-4">
            
            {/* Detail Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-sans font-extrabold text-xs flex items-center justify-center">
                  {selectedNode.step}
                </span>
                <div>
                  <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    {selectedNode.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedNode.description}
                  </p>
                </div>
              </div>

              <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 text-xs font-sans font-bold self-start sm:self-center">
                Channel: {selectedNode.channel}
              </span>
            </div>

            {/* Trigger -> Action -> Next Step Flow Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-white dark:bg-[#181818]/90 border border-slate-200/70 dark:border-[#2A2A2A]/70 space-y-1">
                <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">1. Trigger</span>
                <p className="font-medium text-slate-800 dark:text-slate-200 leading-snug">
                  {selectedNode.trigger}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#181818]/90 border border-slate-200/70 dark:border-[#2A2A2A]/70 space-y-1">
                <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">2. Automated Action</span>
                <p className="font-medium text-slate-800 dark:text-slate-200 leading-snug">
                  {selectedNode.action}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white dark:bg-[#181818]/90 border border-slate-200/70 dark:border-[#2A2A2A]/70 space-y-1">
                <span className="text-[10px] font-sans font-bold text-emerald-600 uppercase">3. Next Step</span>
                <p className="font-medium text-slate-800 dark:text-slate-200 leading-snug">
                  {selectedNode.nextStep}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* =========================================================================
          CLEAN OUTCOME BENEFIT PANEL BENEATH THE WORKFLOW
          ========================================================================= */}
      <div className="space-y-4 pt-2">
        <div className="text-center space-y-1">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            END-TO-END AUTOMATION
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            From first touch to closed-loop CRM update
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl liquid-glass-card space-y-1.5">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Automated</h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Every next step happens automatically based on live prospect engagement.
            </p>
          </div>

          <div className="p-5 rounded-2xl liquid-glass-card space-y-1.5">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Multi-channel</h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Email, LinkedIn, and Voice AI work together in one synchronized workflow.
            </p>
          </div>

          <div className="p-5 rounded-2xl liquid-glass-card space-y-1.5">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">Zero manual handoffs</h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your CRM stays updated in real time without duplicate data entry.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

