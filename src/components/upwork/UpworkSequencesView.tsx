import React, { useState } from 'react';
import { 
  Workflow, 
  Plus, 
  ArrowRight, 
  Briefcase, 
  Send, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Play, 
  Sliders, 
  Copy, 
  Trash2, 
  Edit3,
  Flame,
  Zap,
  DollarSign,
  TrendingUp,
  Mail,
  Linkedin
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';
import { MultiChannelCanvasModal } from '../workflows/MultiChannelCanvasModal';

interface UpworkSequenceItem {
  id: string;
  name: string;
  category: string;
  status: 'Active' | 'Paused';
  description: string;
  stepsCount: number;
  trigger: string;
  touchpoints: string[];
  stats: {
    dispatched: number;
    replies: number;
    replyRate: string;
    contractsWon: number;
    revenue: string;
  };
}

const INITIAL_UPWORK_SEQUENCES: UpworkSequenceItem[] = [
  {
    id: 'seq-1',
    name: 'High-Ticket Enterprise RSS Auto-Bid & Nurture',
    category: 'Enterprise Auto-Bid',
    status: 'Active',
    description: 'Auto-submits customized proposal within 12 minutes of job posting, followed by Loom video case study if reviewed.',
    stepsCount: 4,
    trigger: 'RSS Feed: Budget $5,000+, Payment Verified, < 15 Proposals',
    touchpoints: [
      'Trigger: Upwork RSS Match',
      'Step 1: AI Proposal & 16 Connects Bid',
      'Step 2: Wait 24h',
      'Step 3: If Proposal Viewed → Send Architecture Loom',
      'Step 4: If Interview Booked → Create CRM Deal ($25k)'
    ],
    stats: {
      dispatched: 48,
      replies: 18,
      replyRate: '37.5%',
      contractsWon: 6,
      revenue: '$28,500'
    }
  },
  {
    id: 'seq-2',
    name: 'Full-Stack React & AI SaaS Rapid Proposal Cadence',
    category: 'Niche Specialization',
    status: 'Active',
    description: 'Instant proposal tailored with live prototype links for clients seeking Next.js, FastAPI, or LLM integrations.',
    stepsCount: 3,
    trigger: 'Keywords: "Next.js" OR "React" OR "LLM Agent"',
    touchpoints: [
      'Trigger: Skill Tag Match',
      'Step 1: Tailored Case Study Proposal',
      'Step 2: Wait 48h',
      'Step 3: Follow-up with Interactive Demo Link'
    ],
    stats: {
      dispatched: 64,
      replies: 21,
      replyRate: '32.8%',
      contractsWon: 8,
      revenue: '$14,300'
    }
  },
  {
    id: 'seq-3',
    name: 'Post-Interview Auto-Booking & Discovery Cadence',
    category: 'Interview Nurture',
    status: 'Active',
    description: 'Dispatched immediately when an Upwork client initiates a message or interview room to lock in the discovery call.',
    stepsCount: 3,
    trigger: 'Event: Upwork Client Sends Message / Interview Request',
    touchpoints: [
      'Trigger: Client Message Received',
      'Step 1: Auto-Send Calendly & Agenda',
      'Step 2: Wait 24h',
      'Step 3: Technical Roadmap One-Pager'
    ],
    stats: {
      dispatched: 30,
      replies: 24,
      replyRate: '80.0%',
      contractsWon: 14,
      revenue: '$42,000'
    }
  }
];

export const UpworkSequencesView: React.FC = () => {
  const [sequences, setSequences] = useState<UpworkSequenceItem[]>(INITIAL_UPWORK_SEQUENCES);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [selectedSequence, setSelectedSequence] = useState<UpworkSequenceItem | null>(null);
  const { success, info } = useToast();

  const handleOpenCanvas = (seq?: UpworkSequenceItem) => {
    setSelectedSequence(seq || null);
    setIsCanvasOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setSequences(prev => prev.map(s => {
      if (s.id === id) {
        const nextStatus = s.status === 'Active' ? 'Paused' : 'Active';
        success(`Sequence "${s.name}" is now ${nextStatus}.`);
        return { ...s, status: nextStatus };
      }
      return s;
    }));
  };

  const handleDuplicate = (seq: UpworkSequenceItem) => {
    const cloned: UpworkSequenceItem = {
      ...seq,
      id: `seq-${Date.now()}`,
      name: `${seq.name} (Copy)`,
      status: 'Paused'
    };
    setSequences(prev => [cloned, ...prev]);
    success(`Duplicated sequence: "${cloned.name}"`);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Toolbar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Workflow className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                  Upwork Proposal & Nurture Sequences
                </h1>
                <Badge variant="emerald" size="sm">Auto-Bid Engine</Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Drag-and-drop autonomous sequences for instant bid submission, interview booking, and client follow-ups.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleOpenCanvas()}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Upwork Flow
          </Button>
        </div>
      </div>

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Sequences</div>
          <div className="text-xl font-black text-slate-950 dark:text-white">3 Active</div>
          <div className="text-[10px] text-emerald-500 font-bold">100% Health Score</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Automated Proposals</div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">142 Sent</div>
          <div className="text-[10px] text-slate-400 font-sans">Avg 11 min response time</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Interview Conversion</div>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400">38.4%</div>
          <div className="text-[10px] text-emerald-500 font-bold">2.7x Industry Baseline</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Pipeline Won</div>
          <div className="text-xl font-black text-slate-900 dark:text-white">$84,800</div>
          <div className="text-[10px] text-emerald-500 font-bold">28 Closed Contracts</div>
        </div>
      </div>

      {/* 3. Sequences List */}
      <div className="space-y-4">
        {sequences.map((seq) => (
          <div
            key={seq.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 hover:border-emerald-400/60 transition-all"
          >
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-extrabold text-base text-slate-900 dark:text-white">
                    {seq.name}
                  </span>
                  <Badge variant={seq.status === 'Active' ? 'emerald' : 'slate'} size="sm">
                    {seq.status}
                  </Badge>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40">
                    {seq.category}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {seq.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenCanvas(seq)}
                  leftIcon={<Workflow className="w-3.5 h-3.5" />}
                >
                  Open in Visual Canvas
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleStatus(seq.id)}
                >
                  {seq.status === 'Active' ? 'Pause' : 'Activate'}
                </Button>

                <button
                  type="button"
                  onClick={() => handleDuplicate(seq)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#222222] text-slate-500 cursor-pointer"
                  title="Duplicate Sequence"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Visual Touchpoints Flow Pills */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#2A2A2A] space-y-2">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center justify-between">
                <span>Touchpoint Cadence ({seq.touchpoints.length} steps)</span>
                <span className="text-emerald-500 font-bold">{seq.trigger}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                {seq.touchpoints.map((touch, i) => (
                  <React.Fragment key={i}>
                    <span className="px-2.5 py-1 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-bold text-slate-700 dark:text-slate-300 shadow-2xs">
                      {touch}
                    </span>
                    {i < seq.touchpoints.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Performance Stats Bar */}
            <div className="pt-2 border-t border-slate-100 dark:border-[#202020] grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-400 block">Proposals Dispatched</span>
                <span className="font-bold text-slate-900 dark:text-white">{seq.stats.dispatched}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Interview Replies</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{seq.stats.replies} ({seq.stats.replyRate})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Contracts Won</span>
                <span className="font-bold text-slate-900 dark:text-white">{seq.stats.contractsWon}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Revenue Generated</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{seq.stats.revenue}</span>
              </div>
              <div className="text-right flex items-end justify-end">
                <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center gap-1" onClick={() => handleOpenCanvas(seq)}>
                  <span>Drag & Drop Edit</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Multi-Channel Drag-and-Drop Lemlist-style Modal */}
      <MultiChannelCanvasModal
        isOpen={isCanvasOpen}
        onClose={() => setIsCanvasOpen(false)}
        customChannelMode="upwork"
        title={selectedSequence ? `Edit Sequence: ${selectedSequence.name}` : 'Create New Upwork Automation Sequence'}
      />

    </div>
  );
};
