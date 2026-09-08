import React, { useState } from 'react';
import { 
  Workflow, 
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
  Plus,
  Trash2,
  Copy,
  Edit3,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Save,
  ArrowLeft,
  ArrowDown,
  GitBranch,
  Database,
  FileCode,
  Settings,
  AlertCircle,
  Briefcase,
  ChevronRight,
  ChevronDown,
  GripVertical,
  X,
  Split,
  Eye,
  MessageSquare,
  UserPlus,
  FileText,
  Sliders,
  DollarSign,
  Send,
  Flame,
  ShieldCheck,
  Filter,
  LayoutTemplate,
  BarChart3
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useWorkflows, WorkflowNode, NodeType } from '../../context/WorkflowsContext';
import { useToast } from '../../context/ToastContext';

export interface CanvasPresetNode {
  type: NodeType;
  title: string;
  subtitle: string;
  channel: 'Cold Email' | 'LinkedIn' | 'Upwork' | 'Voice AI' | 'Condition' | 'Delay' | 'CRM';
  iconName: string;
  badge: string;
  config: Record<string, any>;
}

export const PALETTE_ITEMS: { category: string; icon: any; items: CanvasPresetNode[] }[] = [
  {
    category: 'Cold Email',
    icon: Mail,
    items: [
      {
        type: 'action',
        title: 'Send Initial Cold Email',
        subtitle: 'Personalized pitch with rotating mailbox',
        channel: 'Cold Email',
        iconName: 'Mail',
        badge: 'Email #1',
        config: {
          subject: 'Quick question regarding {{company}} outreach',
          body: 'Hi {{firstName}},\n\nSaw your team\'s recent milestones at {{company}}. We help similar teams scale outbound pipeline by 3.2x without burning domain health.\n\nOpen to reviewing the playbook?',
          rotateMailbox: true,
          trackOpens: true
        }
      },
      {
        type: 'action',
        title: 'Send Follow-up Email',
        subtitle: 'Threaded reply in same email thread',
        channel: 'Cold Email',
        iconName: 'Mail',
        badge: 'Follow-up',
        config: {
          threadReply: true,
          body: 'Hi {{firstName}},\n\nWanted to quickly follow up on my note from Tuesday. Did you get a chance to review the pipeline benchmark for {{industry}}?',
          delayDays: 3
        }
      },
      {
        type: 'action',
        title: 'Email A/B Variant Split',
        subtitle: '50/50 Subject & Copy Split test',
        channel: 'Cold Email',
        iconName: 'Split',
        badge: 'A/B Test',
        config: {
          variantASubject: 'Outreach scaling for {{company}}',
          variantBSubject: '{{firstName}}, quick question',
          splitRatio: 50
        }
      }
    ]
  },
  {
    category: 'LinkedIn',
    icon: Linkedin,
    items: [
      {
        type: 'action',
        title: 'LinkedIn Safe Profile Visit',
        subtitle: 'View profile to warm up prospect',
        channel: 'LinkedIn',
        iconName: 'Eye',
        badge: 'Warmup',
        config: {
          actionType: 'profile_visit',
          safeDelayHours: 2
        }
      },
      {
        type: 'action',
        title: 'Send Connection Request',
        subtitle: 'Invitation with AI personalized note',
        channel: 'LinkedIn',
        iconName: 'UserPlus',
        badge: 'Connect',
        config: {
          actionType: 'connection_request',
          note: 'Hi {{firstName}}, noticed your work leading {{title}} at {{company}}. Would love to connect and exchange notes on {{industry}} trends!',
          fallbackInMail: true
        }
      },
      {
        type: 'action',
        title: 'Send Direct Message',
        subtitle: 'Dispatched once connection is accepted',
        channel: 'LinkedIn',
        iconName: 'MessageSquare',
        badge: 'DM',
        config: {
          actionType: 'direct_message',
          message: 'Thanks for connecting {{firstName}}! Thought you might find this benchmark study relevant to your growth at {{company}}.'
        }
      },
      {
        type: 'action',
        title: 'Like Recent Post / Endorse',
        subtitle: 'Social proof touchpoint before pitching',
        channel: 'LinkedIn',
        iconName: 'Sparkles',
        badge: 'Engage',
        config: {
          actionType: 'like_post'
        }
      }
    ]
  },
  {
    category: 'Upwork',
    icon: Briefcase,
    items: [
      {
        type: 'trigger',
        title: 'Upwork RSS Job Feed Filter',
        subtitle: 'Auto-trigger on $5k+ verified payment jobs',
        channel: 'Upwork',
        iconName: 'Briefcase',
        badge: 'Trigger',
        config: {
          minBudget: 5000,
          paymentVerifiedOnly: true,
          matchKeywords: ['Next.js', 'React', 'AI SaaS', 'FastAPI'],
          maxProposalsFilter: 15
        }
      },
      {
        type: 'action',
        title: 'AI Tailored Proposal & Bid',
        subtitle: 'Instant submission with client pain-point match',
        channel: 'Upwork',
        iconName: 'Send',
        badge: 'Auto-Bid',
        config: {
          connectsLimit: 16,
          bidRate: 75,
          proposalPrompt: 'Analyze job description, cite 2 case studies, pitch architecture first, include Loom demo link.',
          attachPortfolio: true
        }
      },
      {
        type: 'action',
        title: 'Proposal Viewed Follow-up',
        subtitle: 'Dispatched if client reviews bid without chat',
        channel: 'Upwork',
        iconName: 'MessageSquare',
        badge: 'Nurture',
        config: {
          delayHours: 24,
          followupMessage: 'Hi! Noticed you reviewed my proposal for {{jobTitle}}. Happy to jump on a quick 10-minute discovery call to map out the tech stack.'
        }
      }
    ]
  },
  {
    category: 'Smart Conditions',
    icon: GitBranch,
    items: [
      {
        type: 'condition',
        title: 'If Lead Replied',
        subtitle: 'Branch into CRM Deal vs Follow-up',
        channel: 'Condition',
        iconName: 'GitBranch',
        badge: 'If Replied',
        config: {
          criteria: 'reply_received',
          waitTimeoutHours: 48
        }
      },
      {
        type: 'condition',
        title: 'If Email Opened (2+ times)',
        subtitle: 'Detect high-intent engagement',
        channel: 'Condition',
        iconName: 'Eye',
        badge: 'If Opened',
        config: {
          criteria: 'email_opened_gt_1',
          waitTimeoutHours: 24
        }
      },
      {
        type: 'condition',
        title: 'If LinkedIn Connected',
        subtitle: 'Branch between DM vs Email fallback',
        channel: 'Condition',
        iconName: 'Linkedin',
        badge: 'If Connected',
        config: {
          criteria: 'linkedin_connected',
          waitTimeoutDays: 4
        }
      },
      {
        type: 'condition',
        title: 'If Upwork Interview Booked',
        subtitle: 'Pause auto-bidding & notify SDR',
        channel: 'Condition',
        iconName: 'Briefcase',
        badge: 'Upwork Chat',
        config: {
          criteria: 'upwork_interview_started'
        }
      }
    ]
  },
  {
    category: 'Delays & Timing',
    icon: Clock,
    items: [
      {
        type: 'delay',
        title: 'Wait 2 Days',
        subtitle: 'Standard cold outreach cadence delay',
        channel: 'Delay',
        iconName: 'Clock',
        badge: 'Wait 2d',
        config: {
          delayDays: 2,
          businessDaysOnly: true,
          sendingWindow: '09:00 - 17:00'
        }
      },
      {
        type: 'delay',
        title: 'Wait 4 Hours',
        subtitle: 'Short delay between social touch and message',
        channel: 'Delay',
        iconName: 'Clock',
        badge: 'Wait 4h',
        config: {
          delayHours: 4
        }
      }
    ]
  },
  {
    category: 'CRM & Actions',
    icon: Building2,
    items: [
      {
        type: 'action',
        title: 'Create Deal in CRM',
        subtitle: 'Push interested lead to Sales Pipeline',
        channel: 'CRM',
        iconName: 'Building2',
        badge: 'CRM Deal',
        config: {
          pipelineStage: 'Qualified Opportunity',
          dealValue: 24000,
          assignOwner: 'Asad Farooq'
        }
      },
      {
        type: 'action',
        title: 'Voice AI SDR Qualifying Call',
        subtitle: 'Sub-400ms WebRTC autonomous call',
        channel: 'Voice AI',
        iconName: 'PhoneCall',
        badge: 'AI Call',
        config: {
          agentId: 'sophia-enterprise',
          maxDurationMinutes: 5
        }
      },
      {
        type: 'integration',
        title: 'Send Slack Alert & Webhook',
        subtitle: 'Ping #deals-live channel with lead metadata',
        channel: 'CRM',
        iconName: 'Zap',
        badge: 'Webhook',
        config: {
          webhookUrl: 'https://hooks.slack.com/services/outtricks/alerts'
        }
      }
    ]
  }
];

export interface AutomationBlueprint {
  id: string;
  name: string;
  badge: string;
  channel: 'all' | 'linkedin' | 'upwork';
  description: string;
  nodes: WorkflowNode[];
}

export const PREBUILT_BLUEPRINTS: AutomationBlueprint[] = [
  {
    id: 'omni-channel-closer',
    name: 'Omni-Channel B2B Outbound Waterfall',
    badge: 'Email + LinkedIn + Voice',
    channel: 'all',
    description: 'Cold Email #1 → 2d Delay → LinkedIn Profile Visit & Invite → If Opened/Replied → Sync CRM Deal',
    nodes: [
      {
        id: 'node-1',
        type: 'trigger',
        title: 'Lead Enrolled from ICP Prospect List',
        subtitle: 'B2B Decision Maker Enters Cadence',
        channel: 'Cold Outbound',
        iconName: 'Zap',
        position: { x: 0, y: 0 },
        config: { listName: 'VP Sales & RevOps Leaders' }
      },
      {
        id: 'node-2',
        type: 'action',
        title: 'Send Personalized Cold Email #1',
        subtitle: 'Value-First Pitch with Rotating Mailbox',
        channel: 'Cold Email',
        iconName: 'Mail',
        position: { x: 0, y: 1 },
        config: {
          subject: 'Quick question regarding {{company}} outreach',
          body: 'Hi {{firstName}},\n\nSaw your team\'s recent milestones at {{company}}. We help revenue teams scale outbound by 3.2x without burning domain health.\n\nOpen to reviewing our live benchmark?'
        }
      },
      {
        id: 'node-3',
        type: 'delay',
        title: 'Wait 2 Business Days',
        subtitle: 'Pacing Interval',
        channel: 'Delay',
        iconName: 'Clock',
        position: { x: 0, y: 2 },
        config: { delayDays: 2 }
      },
      {
        id: 'node-4',
        type: 'condition',
        title: 'If Email Opened or Replied',
        subtitle: 'Branch: Interested vs Unresponsive',
        channel: 'Condition',
        iconName: 'GitBranch',
        position: { x: 0, y: 3 },
        config: { criteria: 'has_opened_or_replied' }
      },
      {
        id: 'node-5',
        type: 'action',
        title: 'LinkedIn Safe Connect & Note',
        subtitle: 'Social Touchpoint with Email Context',
        channel: 'LinkedIn',
        iconName: 'Linkedin',
        position: { x: 0, y: 4 },
        config: { note: 'Hi {{firstName}}, following up on my email regarding {{company}}!' }
      },
      {
        id: 'node-6',
        type: 'action',
        title: 'Create Deal in Deals CRM & Alert SDR',
        subtitle: 'Push High-Intent Lead into Pipeline',
        channel: 'CRM',
        iconName: 'Building2',
        position: { x: 0, y: 5 },
        config: { stage: 'Qualified Lead', dealValue: 12500 }
      }
    ]
  },
  {
    id: 'upwork-auto-bidder',
    name: 'Upwork Rapid Auto-Bid & Pipeline Nurture',
    badge: 'Upwork + AI + CRM',
    channel: 'upwork',
    description: 'Instant RSS Filter ($5k+ Verified) → AI Tailored Proposal → Follow-up if Viewed → Auto-Create Contract Deal in CRM',
    nodes: [
      {
        id: 'node-up-1',
        type: 'trigger',
        title: 'New Upwork RSS Job Match Filter',
        subtitle: 'Criteria: >$5k Budget, Payment Verified, <10 Proposals',
        channel: 'Upwork',
        iconName: 'Briefcase',
        position: { x: 0, y: 0 },
        config: { minBudget: 5000, paymentVerifiedOnly: true, maxProposals: 10 }
      },
      {
        id: 'node-up-2',
        type: 'action',
        title: 'AI Proposal & Screening Questions Solver',
        subtitle: 'Instant Pitch + Past Case Studies Attached',
        channel: 'Upwork',
        iconName: 'Send',
        position: { x: 0, y: 1 },
        config: { connectsBid: 12, attachCaseStudy: true, autoAnswerQuestions: true }
      },
      {
        id: 'node-up-3',
        type: 'delay',
        title: 'Wait 24 Hours',
        subtitle: 'Proposal Review Period',
        channel: 'Delay',
        iconName: 'Clock',
        position: { x: 0, y: 2 },
        config: { delayHours: 24 }
      },
      {
        id: 'node-up-4',
        type: 'condition',
        title: 'If Client Initiated Interview / Chat',
        subtitle: 'Detect Client Message Back',
        channel: 'Condition',
        iconName: 'GitBranch',
        position: { x: 0, y: 3 },
        config: { criteria: 'interview_initiated' }
      },
      {
        id: 'node-up-5',
        type: 'action',
        title: 'Proposal Viewed Follow-up Note',
        subtitle: 'Dispatched if client reviews bid without chat',
        channel: 'Upwork',
        iconName: 'MessageSquare',
        position: { x: 0, y: 4 },
        config: { delayHours: 24, followupMessage: 'Hi! Noticed you reviewed my proposal. Happy to jump on a quick 10-minute discovery call.' }
      },
      {
        id: 'node-up-6',
        type: 'action',
        title: 'Create Upwork Deal in Deals Pipeline',
        subtitle: 'Track Project Scope & Milestones',
        channel: 'CRM',
        iconName: 'Building2',
        position: { x: 0, y: 5 },
        config: { stage: 'Interview Booked', dealValue: 8500 }
      }
    ]
  },
  {
    id: 'linkedin-social-selling',
    name: 'LinkedIn Social Selling & InMail Waterfall',
    badge: 'LinkedIn Only',
    channel: 'linkedin',
    description: 'Profile Visit → Like Recent Post → Connection Request with Note → If Accepted → Send DM → If Pending → InMail',
    nodes: [
      {
        id: 'node-li-1',
        type: 'trigger',
        title: 'Sales Navigator Saved Search List',
        subtitle: '250 Target Prospects Loaded',
        channel: 'LinkedIn',
        iconName: 'Users',
        position: { x: 0, y: 0 },
        config: { searchUrl: 'https://linkedin.com/sales/search' }
      },
      {
        id: 'node-li-2',
        type: 'action',
        title: 'Silent Profile Visit',
        subtitle: 'Trigger Warm Notification on Prospect Profile',
        channel: 'LinkedIn',
        iconName: 'Eye',
        position: { x: 0, y: 1 },
        config: { actionType: 'profile_visit', safeDelayHours: 3 }
      },
      {
        id: 'node-li-3',
        type: 'delay',
        title: 'Wait 6 Hours',
        subtitle: 'Safe Warmup Pacing Interval',
        channel: 'Delay',
        iconName: 'Clock',
        position: { x: 0, y: 2 },
        config: { delayHours: 6 }
      },
      {
        id: 'node-li-4',
        type: 'action',
        title: 'Like Latest Post or Published Article',
        subtitle: 'Build Warm Familiarity before Pitch',
        channel: 'LinkedIn',
        iconName: 'Sparkles',
        position: { x: 0, y: 3 },
        config: { actionType: 'like_post' }
      },
      {
        id: 'node-li-5',
        type: 'action',
        title: 'Personalized Connection Request with Note',
        subtitle: 'Custom Icebreaker mentioning Recent Milestone',
        channel: 'LinkedIn',
        iconName: 'UserPlus',
        position: { x: 0, y: 4 },
        config: { note: 'Hi {{firstName}}, noticed your work leading {{title}} at {{company}}. Would love to exchange notes!' }
      },
      {
        id: 'node-li-6',
        type: 'condition',
        title: 'If Connection Accepted within 4 Days',
        subtitle: 'Branch DM vs InMail Touchpoint',
        channel: 'Condition',
        iconName: 'GitBranch',
        position: { x: 0, y: 5 },
        config: { criteria: 'invite_accepted', timeoutDays: 4 }
      },
      {
        id: 'node-li-7',
        type: 'action',
        title: 'Send Value-Add Direct Message (DM)',
        subtitle: 'Share High-Conversion Benchmark Deck',
        channel: 'LinkedIn',
        iconName: 'MessageSquare',
        position: { x: 0, y: 6 },
        config: { message: 'Thanks for connecting {{firstName}}! Thought you might find this benchmark study relevant.' }
      }
    ]
  },
  {
    id: 'speed-to-lead',
    name: 'Instant Speed-to-Lead Inbound Closer',
    badge: 'Email + Voice AI + CRM',
    channel: 'all',
    description: 'Inbound Webhook → 60s Confirmation Email → 5-Min Voice AI Prequalification Call → Sync CRM Deal',
    nodes: [
      {
        id: 'node-in-1',
        type: 'trigger',
        title: 'Inbound Webhook / Demo Request',
        subtitle: 'Prospect submits interest form',
        channel: 'Cold Outbound',
        iconName: 'Zap',
        position: { x: 0, y: 0 },
        config: { webhookTrigger: 'demo_requested' }
      },
      {
        id: 'node-in-2',
        type: 'action',
        title: 'Instant Confirmation & Calendar Link',
        subtitle: 'Sent within 60 seconds of form fill',
        channel: 'Cold Email',
        iconName: 'Mail',
        position: { x: 0, y: 1 },
        config: { subject: 'Confirmed: Discovery session with Outtricks team' }
      },
      {
        id: 'node-in-3',
        type: 'action',
        title: 'Voice AI Discovery Prequalification Call',
        subtitle: 'Instant phone outreach within 5 minutes',
        channel: 'Voice AI',
        iconName: 'PhoneCall',
        position: { x: 0, y: 2 },
        config: { agentPrompt: 'Friendly SDR qualifying team size, budget, and timeline.' }
      },
      {
        id: 'node-in-4',
        type: 'action',
        title: 'Sync Qualified Deal to Pipeline & Alert Slack',
        subtitle: 'Instant Rep Notification for Warm Hand-off',
        channel: 'CRM',
        iconName: 'Building2',
        position: { x: 0, y: 3 },
        config: { stage: 'Discovery Scheduled', dealValue: 24000 }
      }
    ]
  }
];

export interface MultiChannelAutomationCanvasProps {
  initialWorkflow?: any;
  customChannelMode?: 'all' | 'linkedin' | 'upwork' | 'email';
  onClose?: () => void;
}

export const MultiChannelAutomationCanvas: React.FC<MultiChannelAutomationCanvasProps> = ({
  initialWorkflow,
  customChannelMode = 'all',
  onClose,
}) => {
  const { 
    activeWorkflow: contextWorkflow, 
    updateWorkflowNode, 
    removeWorkflowNode, 
    addWorkflowNode, 
    runWorkflowNow,
    setActiveTab 
  } = useWorkflows();
  const { success, info } = useToast();

  const currentWorkflow = initialWorkflow || contextWorkflow;

  // Initialize nodes based on channel mode if no workflow provided
  const getDefaultNodes = () => {
    if (currentWorkflow?.nodes && currentWorkflow.nodes.length > 0) {
      return currentWorkflow.nodes;
    }
    if (customChannelMode === 'upwork') {
      return PREBUILT_BLUEPRINTS[1].nodes;
    }
    if (customChannelMode === 'linkedin') {
      return PREBUILT_BLUEPRINTS[2].nodes;
    }
    return PREBUILT_BLUEPRINTS[0].nodes;
  };

  const [nodes, setNodes] = useState<WorkflowNode[]>(getDefaultNodes());
  const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || 'node-1');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStepIndex, setSimStepIndex] = useState<number>(-1);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [draggedPreset, setDraggedPreset] = useState<CanvasPresetNode | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [showBlueprintMenu, setShowBlueprintMenu] = useState<boolean>(false);
  const [showStatsMode, setShowStatsMode] = useState<boolean>(false);
  const [insertPopoverIdx, setInsertPopoverIdx] = useState<number | null>(null);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const filteredPalette = PALETTE_ITEMS.filter(cat => {
    if (customChannelMode === 'linkedin' && cat.category !== 'LinkedIn' && cat.category !== 'Smart Conditions' && cat.category !== 'Delays & Timing' && cat.category !== 'CRM & Actions') return false;
    if (customChannelMode === 'upwork' && cat.category !== 'Upwork' && cat.category !== 'Smart Conditions' && cat.category !== 'Delays & Timing' && cat.category !== 'CRM & Actions') return false;
    if (activeCategory !== 'All' && cat.category !== activeCategory) return false;
    return true;
  }).map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.channel.toLowerCase().includes(searchFilter.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  const getNodeColorClass = (channel: string, isSelected: boolean) => {
    const ch = channel.toLowerCase();
    if (isSelected) {
      return 'bg-emerald-600 text-white border-emerald-500 shadow-xl shadow-emerald-600/30 scale-[1.02] ring-2 ring-emerald-400';
    }
    if (ch.includes('email')) {
      return 'bg-white dark:bg-[#161616] border-blue-200 dark:border-blue-900/40 text-slate-900 dark:text-white hover:border-blue-500';
    }
    if (ch.includes('linkedin')) {
      return 'bg-white dark:bg-[#161616] border-indigo-200 dark:border-indigo-900/40 text-slate-900 dark:text-white hover:border-indigo-500';
    }
    if (ch.includes('upwork')) {
      return 'bg-white dark:bg-[#161616] border-emerald-200 dark:border-emerald-900/40 text-slate-900 dark:text-white hover:border-emerald-500';
    }
    if (ch.includes('condition')) {
      return 'bg-white dark:bg-[#161616] border-amber-200 dark:border-amber-900/40 text-slate-900 dark:text-white hover:border-amber-500';
    }
    if (ch.includes('delay')) {
      return 'bg-white dark:bg-[#161616] border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white hover:border-slate-400';
    }
    if (ch.includes('voice')) {
      return 'bg-white dark:bg-[#161616] border-purple-200 dark:border-purple-900/40 text-slate-900 dark:text-white hover:border-purple-500';
    }
    return 'bg-white dark:bg-[#161616] border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white hover:border-emerald-500';
  };

  const getNodeIconBadge = (channel: string) => {
    const ch = channel.toLowerCase();
    if (ch.includes('email')) return { icon: Mail, bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400' };
    if (ch.includes('linkedin')) return { icon: Linkedin, bg: 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' };
    if (ch.includes('upwork')) return { icon: Briefcase, bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' };
    if (ch.includes('condition')) return { icon: GitBranch, bg: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400' };
    if (ch.includes('delay')) return { icon: Clock, bg: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300' };
    if (ch.includes('voice')) return { icon: PhoneCall, bg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400' };
    return { icon: Zap, bg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400' };
  };

  const handleAddPresetNode = (preset: CanvasPresetNode, targetIndex?: number) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      type: preset.type,
      title: preset.title,
      subtitle: preset.subtitle,
      channel: preset.channel,
      iconName: preset.iconName,
      position: { x: 0, y: targetIndex !== undefined ? targetIndex : nodes.length },
      config: { ...preset.config }
    };

    if (targetIndex !== undefined) {
      const updated = [...nodes];
      updated.splice(targetIndex, 0, newNode);
      setNodes(updated);
    } else {
      setNodes(prev => [...prev, newNode]);
    }
    setSelectedNodeId(newNode.id);
    success(`Added step: ${newNode.title}`);
  };

  const handleRemoveNode = (nodeId: string) => {
    if (nodes.length <= 1) {
      info('Workflow requires at least 1 node.');
      return;
    }
    const updated = nodes.filter(n => n.id !== nodeId);
    setNodes(updated);
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(updated[0]?.id || '');
    }
    success('Step removed from sequence.');
  };

  const handleMoveNode = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === nodes.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...nodes];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setNodes(updated);
  };

  const handleDuplicateNode = (node: WorkflowNode, index: number) => {
    const cloned: WorkflowNode = {
      ...node,
      id: `node-${Date.now()}`,
      title: `${node.title} (Copy)`,
      position: { x: 0, y: index + 1 }
    };
    const updated = [...nodes];
    updated.splice(index + 1, 0, cloned);
    setNodes(updated);
    setSelectedNodeId(cloned.id);
    success('Step duplicated.');
  };

  const handleUpdateSelectedNode = (field: string, val: any) => {
    if (!selectedNode) return;
    const updated = nodes.map(n => {
      if (n.id === selectedNode.id) {
        if (field.startsWith('config.')) {
          const configKey = field.replace('config.', '');
          return {
            ...n,
            config: { ...n.config, [configKey]: val }
          };
        }
        return { ...n, [field]: val };
      }
      return n;
    });
    setNodes(updated);
  };

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStepIndex(0);

    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current < nodes.length) {
        setSimStepIndex(current);
        setSelectedNodeId(nodes[current].id);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSimulating(false);
          setSimStepIndex(nodes.length);
          success(`Simulation complete! All ${nodes.length} multi-channel steps executed successfully.`, 'Cadence Verified');
        }, 500);
      }
    }, 600);
  };

  const handleResetSimulation = () => {
    setIsSimulating(false);
    setSimStepIndex(-1);
    setSelectedNodeId(nodes[0]?.id || '');
  };

  const handleSaveAutomation = () => {
    success(`Automation sequence saved with ${nodes.length} steps! Ready to launch.`, 'Workflow Saved');
    if (onClose) onClose();
  };

  return (
    <div className="space-y-4 font-sans h-[calc(100vh-12rem)] flex flex-col min-w-0">
      
      {/* 1. Top Control Bar */}
      <div className="p-4 bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-wrap items-center justify-between gap-3 shrink-0">
        
        {/* Left: Info */}
        <div className="flex items-center gap-3">
          {onClose && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
            >
              Back
            </Button>
          )}

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                {currentWorkflow?.name || 'Multi-Channel Autonomous Sequence'}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Lemlist-Style Canvas
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2">
              <span>{nodes.length} Visual Steps</span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Smart Intent Branching Active</span>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          
          {/* Pre-Built Blueprints Dropdown (Lemlist Style Recipes) */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBlueprintMenu(!showBlueprintMenu)}
              leftIcon={<LayoutTemplate className="w-3.5 h-3.5 text-blue-500" />}
            >
              <span>Blueprints ({PREBUILT_BLUEPRINTS.length})</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </Button>

            {showBlueprintMenu && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2C2C2C] rounded-2xl shadow-xl z-50 p-3 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#242424] pb-2">
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Pre-Built Multi-Channel Recipes</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowBlueprintMenu(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                  {PREBUILT_BLUEPRINTS.map((bp) => (
                    <button
                      key={bp.id}
                      type="button"
                      onClick={() => {
                        setNodes(bp.nodes);
                        setSelectedNodeId(bp.nodes[0].id);
                        setShowBlueprintMenu(false);
                        success(`Loaded "${bp.name}" with ${bp.nodes.length} steps!`);
                      }}
                      className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-[#252525] border border-transparent hover:border-slate-200 dark:hover:border-[#333333] transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-500 truncate">
                          {bp.name}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold shrink-0">
                          {bp.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{bp.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Live Stats Mode Toggle */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs">
            <button
              type="button"
              onClick={() => setShowStatsMode(false)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                !showStatsMode
                  ? 'bg-white dark:bg-[#2A2A2A] text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              🛠️ Edit
            </button>
            <button
              type="button"
              onClick={() => setShowStatsMode(true)}
              className={`px-2.5 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                showStatsMode
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              📊 Live Stats
            </button>
          </div>

          {/* Zoom */}
          <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs">
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.max(prev - 10, 60))}
              className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 font-mono text-[10px] font-bold text-slate-600 dark:text-slate-300">
              {zoomLevel}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel(prev => Math.min(prev + 10, 140))}
              className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Simulation */}
          {simStepIndex === nodes.length ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetSimulation}
              leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            >
              Replay Cadence
            </Button>
          ) : (
            <Button
              variant={isSimulating ? "outline" : "secondary"}
              size="sm"
              onClick={handleRunSimulation}
              disabled={isSimulating}
              leftIcon={<Play className={`w-3.5 h-3.5 ${isSimulating ? 'text-blue-500 animate-pulse' : 'fill-current'}`} />}
            >
              {isSimulating ? `Simulating Step ${simStepIndex + 1}...` : 'Simulate Cadence'}
            </Button>
          )}

          <Button
            variant="primary"
            size="sm"
            onClick={handleSaveAutomation}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Save & Launch
          </Button>
        </div>

      </div>

      {/* 2. Main 3-Column Workspace: Left Palette | Center Canvas | Right Inspector */}
      <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-4 overflow-hidden">
        
        {/* ===================== LEFT: DRAGGABLE & CLICKABLE PALETTE ===================== */}
        <div className="w-full lg:w-72 shrink-0 bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs p-4 flex flex-col overflow-hidden">
          
          <div className="pb-3 border-b border-slate-100 dark:border-[#202020] space-y-2 shrink-0">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Step Library</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">Drag or Click</span>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                placeholder="Search steps..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pt-1">
              {['All', 'Cold Email', 'LinkedIn', 'Upwork', 'Smart Conditions'].map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold whitespace-nowrap cursor-pointer transition-all ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Draggable Step Cards List */}
          <div className="flex-1 overflow-y-auto pt-3 space-y-4 pr-1">
            {filteredPalette.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <category.icon className="w-3 h-3 text-blue-500" />
                  <span>{category.category}</span>
                </div>

                <div className="space-y-1.5">
                  {category.items.map((preset, idx) => {
                    const { icon: StepIcon, bg } = getNodeIconBadge(preset.channel);
                    return (
                      <div
                        key={idx}
                        draggable={true}
                        onDragStart={(e) => {
                          setDraggedPreset(preset);
                          e.dataTransfer.setData('text/plain', JSON.stringify(preset));
                        }}
                        onClick={() => handleAddPresetNode(preset)}
                        className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-[#1C1C1C]/80 hover:bg-white dark:hover:bg-[#222222] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-400 dark:hover:border-emerald-500 transition-all cursor-grab active:cursor-grabbing group shadow-2xs space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${bg}`}>
                              <StepIcon className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
                              {preset.title}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white dark:bg-black/30 border border-slate-200 dark:border-white/10 text-slate-500 shrink-0">
                            {preset.badge}
                          </span>
                        </div>

                        <div className="text-[10px] text-slate-400 truncate flex items-center justify-between">
                          <span>{preset.subtitle}</span>
                          <Plus className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ===================== CENTER: VISUAL LEMLIST-STYLE FLOW CANVAS ===================== */}
        <div 
          className="flex-1 bg-slate-50/80 dark:bg-[#080d1a] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs p-6 overflow-auto relative min-h-[420px]"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (draggedPreset) {
              handleAddPresetNode(draggedPreset);
              setDraggedPreset(null);
            }
          }}
        >
          {/* Zoom scaling wrapper */}
          <div 
            className="w-full h-full transition-transform origin-top flex flex-col items-center py-4"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            
            <div className="w-full max-w-xl space-y-3">
              
              {nodes.map((node, idx) => {
                const isSelected = selectedNodeId === node.id;
                const isSimActive = simStepIndex === idx;
                const isStepCompleted = simStepIndex > idx || simStepIndex === nodes.length;
                const { icon: NodeIcon, bg: iconBg } = getNodeIconBadge(node.channel);
                const isCondition = node.type === 'condition';

                return (
                  <React.Fragment key={node.id}>
                    
                    {/* Inter-step Connector with optional Delay tag & Insert Dropzone */}
                    {idx > 0 && (
                      <div 
                        className={`flex flex-col items-center py-1 relative group ${
                          dragOverIndex === idx ? 'bg-emerald-500/10 rounded-2xl py-3 border border-dashed border-emerald-500' : ''
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOverIndex(idx);
                        }}
                        onDragLeave={() => setDragOverIndex(null)}
                        onDrop={(e) => {
                          e.preventDefault();
                          if (draggedPreset) {
                            handleAddPresetNode(draggedPreset, idx);
                            setDraggedPreset(null);
                            setDragOverIndex(null);
                          }
                        }}
                      >
                        {/* Connecting Line */}
                        <div className="w-0.5 h-6 bg-slate-300 dark:bg-[#2A2A2A]" />

                        {/* Inter-step Insert button */}
                        <div className="relative -my-1 z-10">
                          <button
                            type="button"
                            onClick={() => {
                              setInsertPopoverIdx(insertPopoverIdx === idx ? null : idx);
                            }}
                            className="w-6 h-6 rounded-full bg-white dark:bg-[#1E1E1E] border border-slate-300 dark:border-[#333333] hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-400 hover:text-emerald-500 shadow-xs flex items-center justify-center transition-all cursor-pointer"
                            title="Insert Step Here (Lemlist Style)"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Step Inserter Popover (Lemlist Style) */}
                          {insertPopoverIdx === idx && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-72 bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2C2C2C] rounded-2xl shadow-2xl z-50 p-2.5 space-y-1.5 animate-in fade-in">
                              <div className="flex items-center justify-between text-[10px] font-extrabold text-slate-400 uppercase tracking-wider px-1 border-b border-slate-100 dark:border-[#262626] pb-1.5">
                                <span>Insert Next Step</span>
                                <button
                                  type="button"
                                  onClick={() => setInsertPopoverIdx(null)}
                                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                              <div className="grid grid-cols-2 gap-1 text-[11px]">
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleAddPresetNode(PALETTE_ITEMS[0].items[1], idx);
                                    setInsertPopoverIdx(null);
                                  }}
                                  className="p-1.5 rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-left font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <Mail className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                                  <span>Cold Email</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleAddPresetNode(PALETTE_ITEMS[1].items[1], idx);
                                    setInsertPopoverIdx(null);
                                  }}
                                  className="p-1.5 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950/30 text-left font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <Linkedin className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                                  <span>LinkedIn Step</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleAddPresetNode(PALETTE_ITEMS[2].items[1], idx);
                                    setInsertPopoverIdx(null);
                                  }}
                                  className="p-1.5 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-950/30 text-left font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <Briefcase className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                                  <span>Upwork Bid</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleAddPresetNode(PALETTE_ITEMS[4].items[0], idx);
                                    setInsertPopoverIdx(null);
                                  }}
                                  className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#252525] text-left font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                  <span>Wait Delay</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleAddPresetNode(PALETTE_ITEMS[3].items[0], idx);
                                    setInsertPopoverIdx(null);
                                  }}
                                  className="p-1.5 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/30 text-left font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <GitBranch className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                                  <span>Condition</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleAddPresetNode(PALETTE_ITEMS[5].items[0], idx);
                                    setInsertPopoverIdx(null);
                                  }}
                                  className="p-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                                >
                                  <Building2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                                  <span>CRM Deal</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Arrow */}
                        <div className="w-0.5 h-6 bg-slate-300 dark:bg-[#2A2A2A] relative">
                          <ArrowDown className="w-3 h-3 text-slate-400 absolute -bottom-1.5 -left-[5px]" />
                        </div>
                      </div>
                    )}

                    {/* The Node Card */}
                    <div
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`p-4 rounded-3xl transition-all cursor-pointer border relative shadow-xs group ${
                        getNodeColorClass(node.channel, isSelected || isSimActive)
                      }`}
                    >
                      {/* Top Meta Row */}
                      <div className="flex items-center justify-between gap-2 pb-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                            isSelected || isSimActive ? 'bg-white/20 text-white' : iconBg
                          }`}>
                            <NodeIcon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className={`text-[10px] font-mono font-extrabold uppercase ${
                              isSelected || isSimActive ? 'text-white/80' : 'text-slate-400'
                            }`}>
                              STEP {idx + 1} • {node.channel}
                            </span>
                            <div className="font-extrabold text-sm truncate">{node.title}</div>
                          </div>
                        </div>

                        {/* Quick Card Controls */}
                        <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                          {idx > 0 && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleMoveNode(idx, 'up'); }}
                              className="p-1 hover:bg-black/10 rounded text-xs"
                              title="Move Up"
                            >
                              ↑
                            </button>
                          )}
                          {idx < nodes.length - 1 && (
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleMoveNode(idx, 'down'); }}
                              className="p-1 hover:bg-black/10 rounded text-xs"
                              title="Move Down"
                            >
                              ↓
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleDuplicateNode(node, idx); }}
                            className="p-1 hover:bg-black/10 rounded"
                            title="Duplicate"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); handleRemoveNode(node.id); }}
                            className="p-1 hover:bg-red-500/20 text-red-400 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Subtitle / Preview */}
                      <div className={`text-xs ${
                        isSelected || isSimActive ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        {node.subtitle}
                      </div>

                      {/* Condition Branch Visualization */}
                      {isCondition && (
                        <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-2 gap-2 text-[10px] font-mono font-bold">
                          <div className="p-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>YES / REPLIED → Create CRM Deal</span>
                          </div>
                          <div className="p-2 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>NO REPLY → Next Touchpoint</span>
                          </div>
                        </div>
                      )}

                      {/* Live Stats Performance Badges (Lemlist Style) */}
                      {showStatsMode && (
                        <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-[10px] font-mono font-bold flex-wrap gap-2">
                          {node.channel === 'Cold Email' && (
                            <>
                              <span className="text-emerald-500">✓ 98.4% Delivered</span>
                              <span className="text-blue-500">64.2% Opened</span>
                              <span className="text-purple-500">14.8% Replied</span>
                            </>
                          )}
                          {node.channel === 'LinkedIn' && (
                            <>
                              <span className="text-emerald-500">✓ 840 Sent</span>
                              <span className="text-blue-500">44.8% Accepted</span>
                              <span className="text-purple-500">22.1% Replied</span>
                            </>
                          )}
                          {node.channel === 'Upwork' && (
                            <>
                              <span className="text-emerald-500">✓ 36 Auto-Bids</span>
                              <span className="text-blue-500">33.3% Interview</span>
                              <span className="text-amber-500">$42.5k Won</span>
                            </>
                          )}
                          {node.channel === 'Condition' && (
                            <>
                              <span className="text-emerald-500">78% Yes ➔</span>
                              <span className="text-rose-500">22% No ➔</span>
                            </>
                          )}
                          {node.channel === 'Delay' && (
                            <>
                              <span className="text-slate-400">Pacing: {node.config.delayDays || 2}d</span>
                              <span className="text-emerald-500">100% Executed</span>
                            </>
                          )}
                          {node.channel === 'CRM' && (
                            <>
                              <span className="text-emerald-500">✓ CRM Synced</span>
                              <span className="text-blue-500">Deal: ${(node.config.dealValue || 12500).toLocaleString()}</span>
                            </>
                          )}
                          {(node.channel !== 'Cold Email' && node.channel !== 'LinkedIn' && node.channel !== 'Upwork' && node.channel !== 'Condition' && node.channel !== 'Delay' && node.channel !== 'CRM') && (
                            <>
                              <span className="text-emerald-500">Active</span>
                              <span className="text-blue-500">100% Paced</span>
                            </>
                          )}
                        </div>
                      )}

                      {/* Completed Badge in Simulation */}
                      {isStepCompleted && (
                        <div className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-emerald-500 text-white font-mono text-[9px] font-black shadow-sm flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>PASSED</span>
                        </div>
                      )}

                    </div>

                  </React.Fragment>
                );
              })}

              {/* End of Sequence Dropzone */}
              <div 
                className="p-4 rounded-3xl border-2 border-dashed border-slate-300 dark:border-[#2A2A2A] hover:border-emerald-500 text-center text-slate-400 hover:text-emerald-500 transition-all cursor-pointer space-y-1"
                onClick={() => handleAddPresetNode(PALETTE_ITEMS[0].items[1])}
              >
                <Plus className="w-5 h-5 mx-auto text-emerald-500" />
                <div className="text-xs font-bold">Drop or Click to Append Next Touchpoint</div>
                <div className="text-[10px] text-slate-500">Email, LinkedIn message, Upwork bid, or Delay</div>
              </div>

            </div>

          </div>
        </div>

        {/* ===================== RIGHT: INSPECTOR & SETTINGS PANEL ===================== */}
        {selectedNode && (
          <div className="w-full lg:w-80 shrink-0 bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs p-5 flex flex-col justify-between overflow-y-auto space-y-4 text-xs font-sans">
            
            <div className="space-y-4">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                    Step Inspector
                  </span>
                </div>
                <Badge variant="blue" size="sm">
                  {selectedNode.channel}
                </Badge>
              </div>

              {/* Step Title Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Step Name</label>
                <input
                  type="text"
                  value={selectedNode.title}
                  onChange={(e) => handleUpdateSelectedNode('title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] font-bold text-slate-900 dark:text-white"
                />
              </div>

              {/* Step Subtitle */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Description / Purpose</label>
                <input
                  type="text"
                  value={selectedNode.subtitle}
                  onChange={(e) => handleUpdateSelectedNode('subtitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-300"
                />
              </div>

              {/* Channel Specific Configurations */}
              {selectedNode.channel.toLowerCase().includes('email') && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-[#202020]">
                  <div className="text-[10px] font-mono font-bold text-blue-500 uppercase">Email Configuration</div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Subject Line</label>
                    <input
                      type="text"
                      value={selectedNode.config?.subject || ''}
                      onChange={(e) => handleUpdateSelectedNode('config.subject', e.target.value)}
                      placeholder="e.g. {{firstName}}, quick question"
                      className="w-full px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Email Body & Variables</label>
                    <textarea
                      rows={4}
                      value={selectedNode.config?.body || ''}
                      onChange={(e) => handleUpdateSelectedNode('config.body', e.target.value)}
                      placeholder="Hi {{firstName}}, ..."
                      className="w-full p-2.5 rounded-xl text-xs bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] font-mono text-[11px]"
                    />
                  </div>

                  {/* Variable Chips */}
                  <div className="flex flex-wrap gap-1">
                    {['{{firstName}}', '{{company}}', '{{title}}', '{{industry}}'].map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          const current = selectedNode.config?.body || '';
                          handleUpdateSelectedNode('config.body', current + ' ' + tag);
                        }}
                        className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 text-[10px] font-mono cursor-pointer hover:bg-blue-100"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedNode.channel.toLowerCase().includes('linkedin') && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-[#202020]">
                  <div className="text-[10px] font-mono font-bold text-indigo-500 uppercase">LinkedIn Settings</div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Personalized Connection Note</label>
                    <textarea
                      rows={3}
                      value={selectedNode.config?.note || ''}
                      onChange={(e) => handleUpdateSelectedNode('config.note', e.target.value)}
                      placeholder="Hi {{firstName}}, love your work at {{company}}..."
                      className="w-full p-2.5 rounded-xl text-xs bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] font-sans text-xs"
                    />
                  </div>

                  <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-800/40 text-[11px] text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>Enforces LinkedIn algorithm safe-mode (max 25 invites/day with proxy rotation).</span>
                  </div>
                </div>
              )}

              {selectedNode.channel.toLowerCase().includes('upwork') && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-[#202020]">
                  <div className="text-[10px] font-mono font-bold text-emerald-500 uppercase">Upwork Auto-Bid Settings</div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Max Connects Allowed per Bid</label>
                    <input
                      type="number"
                      value={selectedNode.config?.connectsLimit || 16}
                      onChange={(e) => handleUpdateSelectedNode('config.connectsLimit', Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">AI Proposal Instructions</label>
                    <textarea
                      rows={3}
                      value={selectedNode.config?.proposalPrompt || 'Pitch architecture first, cite similar React/FastAPI projects, request 10m Loom review.'}
                      onChange={(e) => handleUpdateSelectedNode('config.proposalPrompt', e.target.value)}
                      className="w-full p-2 rounded-xl text-xs bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs"
                    />
                  </div>
                </div>
              )}

              {selectedNode.channel.toLowerCase().includes('delay') && (
                <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-[#202020]">
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase">Cadence Timing</div>
                  
                  <div className="space-y-1">
                    <label className="text-[10px] text-slate-400">Delay Length (Days)</label>
                    <input
                      type="number"
                      value={selectedNode.config?.delayDays || 2}
                      onChange={(e) => handleUpdateSelectedNode('config.delayDays', Number(e.target.value))}
                      className="w-full px-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A]"
                    />
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={selectedNode.config?.businessDaysOnly ?? true}
                      onChange={(e) => handleUpdateSelectedNode('config.businessDaysOnly', e.target.checked)}
                      className="rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-300">Skip weekends (Mon-Fri only)</span>
                  </label>
                </div>
              )}

            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-[#202020] space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                onClick={() => handleRemoveNode(selectedNode.id)}
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              >
                Delete Step
              </Button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
