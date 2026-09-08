import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { 
  Eye, 
  Send, 
  MessageSquare, 
  Workflow, 
  Clock, 
  Plus, 
  Check, 
  X, 
  Trash2, 
  Sparkles, 
  Copy, 
  Users, 
  Calendar, 
  ShieldCheck, 
  ThumbsUp, 
  UserPlus, 
  Mail,
  ChevronDown, 
  ChevronUp,
  Edit2, 
  CheckCircle2, 
  ArrowRight,
  Split,
  GitMerge,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Zap,
  Bot,
  HelpCircle,
  CornerDownRight,
  Info,
  Mic,
  AlertCircle,
  AlertTriangle,
  MoreHorizontal,
  Search,
  Building2,
  Building,
  UserCheck,
  UserX,
  MessageCircle,
  Tag,
  Tags,
  CheckSquare,
  Layers,
  FileText,
  PlayCircle,
  ChevronRight,
  CalendarClock,
  Undo2,
  Heart,
  ListPlus,
  StopCircle,
  UserCog,
  Phone,
  Globe,
  Code,
  Share2,
  Brain,
  ArrowLeft,
  Filter,
  Link2,
  MailOpen,
  MailX,
  CalendarCheck,
  PhoneCall,
  MessageSquareCode,
  Database
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { 
  LinkedInStep, 
  LinkedInStepType, 
  LinkedInStepConfig 
} from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';
import { validateSequenceGraph, WorkflowValidationResult } from './workflowValidation';

export interface LinkedInEmbeddedCanvasStepProps {
  sequence: LinkedInStep[];
  onChangeSequence: (steps: LinkedInStep[]) => void;
  leadCount?: number;
  accountName?: string;
}

export type TemplatePresetId = 'multitouch' | 'warmup' | 'direct' | 'multichannel' | 'blank';

const TEMPLATE_PRESETS: {
  id: TemplatePresetId;
  name: string;
  badge?: string;
  description: string;
  steps: LinkedInStep[];
}[] = [
  {
    id: 'multitouch',
    name: 'High-Converting Multi-Touch',
    badge: 'Recommended',
    description: 'Visit Profile → Connection Request → If Accepted: Chat Message → Wait 2d → Like Post',
    steps: [
      {
        id: 'step_visit_1',
        type: 'visit',
        title: 'Visit Profile',
        subtitle: 'Stealth profile viewing via residential proxy',
        timingLabel: 'Send immediately',
        waitDurationHours: 0,
      },
      {
        id: 'step_connect_2',
        type: 'connect',
        title: 'Connection Request',
        subtitle: 'Send personalized invite note (max 300 chars)',
        timingLabel: 'Wait 1 hour',
        waitDurationHours: 1,
        config: {
          note: 'Hi {{firstName}}, noticed your leadership at {{companyName}}. Would love to connect and share notes on {{industry}} outbound strategies!',
          spintax: true,
          variables: ['firstName', 'companyName', 'industry'],
          characterLimit: 300,
        },
      },
      {
        id: 'step_cond_3',
        type: 'condition',
        title: 'If Invitation Accepted',
        subtitle: 'Checks 1st-degree connection status for up to 30 days',
        config: {
          conditionType: 'invite_accepted',
          conditionTargetDays: 30,
        },
        yesBranch: [
          {
            id: 'step_msg_yes_1',
            type: 'message',
            title: 'Welcome Follow-up Message',
            subtitle: 'Direct LinkedIn chat message once connected',
            timingLabel: 'Wait 1 day',
            waitDurationDays: 1,
            config: {
              body: 'Thanks for connecting, {{firstName}}! Saw your recent initiatives at {{companyName}}. We recently helped similar growth teams 3x outbound reply rates.\n\nOpen to comparing playbooks sometime this week?',
              variables: ['firstName', 'companyName'],
            },
          },
          {
            id: 'step_delay_yes_2',
            type: 'delay',
            title: 'Wait 2 Days',
            subtitle: 'Pacing delay before soft engagement',
            timingLabel: 'Wait 2 days',
            waitDurationDays: 2,
          },
          {
            id: 'step_like_yes_3',
            type: 'like_post',
            title: 'Like Recent Post',
            subtitle: 'Engage with prospect latest article or update',
            timingLabel: 'Send immediately',
          },
        ],
        noBranch: [
          {
            id: 'step_end_no_1',
            type: 'stop',
            title: 'End Sequence',
            subtitle: 'Conclude outreach for unaccepted or timed-out leads',
            timingLabel: 'Send immediately',
            branch: 'no',
            parentConditionId: 'step_cond_3',
            config: {
              stopReason: 'timeout_or_rejected',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'warmup',
    name: 'Warm Relationship Builder',
    description: 'Visit Profile → Wait 1d → Like Post → Connection Request → Chat Message with resource',
    steps: [
      {
        id: 'step_w_visit',
        type: 'visit',
        title: 'Stealth Profile Visit',
        subtitle: 'Triggers viewing notification on prospect device',
        timingLabel: 'Send immediately',
      },
      {
        id: 'step_w_delay1',
        type: 'delay',
        title: 'Wait 1 Day',
        subtitle: 'Simulate natural human browsing cadence',
        timingLabel: 'Wait 1 day',
        waitDurationDays: 1,
      },
      {
        id: 'step_w_like',
        type: 'like_post',
        title: 'Like Top Recent Post',
        subtitle: 'Build brand familiarity before outreach',
        timingLabel: 'Send immediately',
      },
      {
        id: 'step_w_connect',
        type: 'connect',
        title: 'Warm Connection Request',
        subtitle: 'Personalized invite referencing their industry',
        timingLabel: 'Wait 4 hours',
        waitDurationHours: 4,
        config: {
          note: 'Hey {{firstName}}, loved your latest post on {{industry}}. Great perspective on team velocity! Would be great to stay connected.',
          spintax: true,
          variables: ['firstName', 'industry'],
          characterLimit: 300,
        },
      },
      {
        id: 'step_w_cond',
        type: 'condition',
        title: 'If Invitation Accepted',
        subtitle: 'Wait up to 14 days for acceptance',
        config: {
          conditionType: 'invite_accepted',
          conditionTargetDays: 14,
        },
        yesBranch: [
          {
            id: 'step_w_msg',
            type: 'message',
            title: 'Asset Share Message',
            subtitle: 'Send high-value benchmark report link',
            timingLabel: 'Wait 1 day',
            waitDurationDays: 1,
            config: {
              body: 'Hi {{firstName}}, great connecting! Thought you might find our latest 2026 Outbound Benchmark report interesting for {{companyName}}.\n\nNo pitch, just useful data: outtricks.io/report',
              variables: ['firstName', 'companyName'],
            },
          },
        ],
        noBranch: [
          {
            id: 'step_w_no_email',
            type: 'email',
            title: 'Send Fallback Email',
            subtitle: 'Multi-channel outreach when connection invite is pending',
            timingLabel: 'Wait 1 day',
            waitDurationDays: 1,
            config: {
              subject: 'Connecting regarding {{companyName}}',
              body: 'Hi {{firstName}},\n\nReaching out via email as well — thought you might find our growth benchmarks interesting!',
              variables: ['firstName', 'companyName'],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'direct',
    name: 'Direct Fast Invite',
    description: 'Connection Request → If Accepted: Quick Intro Chat Message',
    steps: [
      {
        id: 'step_d_connect',
        type: 'connect',
        title: 'Direct Connection Request',
        subtitle: 'Concise value proposition invite note',
        timingLabel: 'Send immediately',
        config: {
          note: 'Hi {{firstName}}, noticed you lead {{jobTitle}} at {{companyName}}. Would love to connect and share quick notes on pipeline growth.',
          spintax: true,
          variables: ['firstName', 'jobTitle', 'companyName'],
          characterLimit: 300,
        },
      },
      {
        id: 'step_d_cond',
        type: 'condition',
        title: 'If Accepted',
        subtitle: 'Branch on connection acceptance within 14 days',
        config: {
          conditionType: 'invite_accepted',
          conditionTargetDays: 14,
        },
        yesBranch: [
          {
            id: 'step_d_msg',
            type: 'message',
            title: 'Value Intro Message',
            subtitle: 'Introductory chat message with clear CTA',
            timingLabel: 'Wait 2 hours',
            waitDurationHours: 2,
            config: {
              body: 'Thanks for connecting, {{firstName}}! Would you be open to a 5-minute chat next Tuesday regarding how {{companyName}} scales multi-channel outbound?',
              variables: ['firstName', 'companyName'],
            },
          },
        ],
        noBranch: [
          {
            id: 'step_d_no_email',
            type: 'email',
            title: 'Send Fallback Email',
            subtitle: 'Direct email touchpoint if invite not accepted',
            timingLabel: 'Wait 1 day',
            waitDurationDays: 1,
            config: {
              subject: 'Quick question for {{firstName}}',
              body: 'Hi {{firstName}},\n\nSent a LinkedIn request earlier, reaching out directly here as well.',
              variables: ['firstName'],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'multichannel',
    name: 'Multi-Channel LinkedIn + Email',
    badge: 'Omni-Channel',
    description: 'LinkedIn Invite → If Accepted: LinkedIn Message · If Not Accepted: Fallback Cold Email',
    steps: [
      {
        id: 'step_mc_visit',
        type: 'visit',
        title: 'Visit Profile',
        subtitle: 'Initial multi-channel stealth touch',
        timingLabel: 'Send immediately',
      },
      {
        id: 'step_mc_connect',
        type: 'connect',
        title: 'LinkedIn Invite Note',
        subtitle: 'Personalized invite note',
        timingLabel: 'Wait 2 hours',
        waitDurationHours: 2,
        config: {
          note: 'Hi {{firstName}}, great to connect with peers in {{industry}}. Looking forward to following {{companyName}}\'s updates!',
          variables: ['firstName', 'industry', 'companyName'],
          characterLimit: 300,
        },
      },
      {
        id: 'step_mc_cond',
        type: 'condition',
        title: 'If Accepted within 5 days',
        subtitle: 'Branch into LinkedIn Chat vs Cold Email fallback',
        config: {
          conditionType: 'invite_accepted',
          conditionTargetDays: 5,
        },
        yesBranch: [
          {
            id: 'step_mc_yes_msg',
            type: 'message',
            title: 'LinkedIn Chat Follow-up',
            subtitle: 'Native LinkedIn message',
            timingLabel: 'Wait 1 day',
            waitDurationDays: 1,
            config: {
              body: 'Thanks for connecting, {{firstName}}! Wondering how {{companyName}} currently manages prospecting across email and LinkedIn?',
              variables: ['firstName', 'companyName'],
            },
          },
        ],
        noBranch: [
          {
            id: 'step_mc_no_email',
            type: 'email',
            title: 'Fallback Cold Email',
            subtitle: 'Automated email dispatch when LinkedIn invite is pending',
            timingLabel: 'Wait 1 day',
            waitDurationDays: 1,
            config: {
              subject: 'Quick question for {{firstName}} re: {{companyName}}',
              body: 'Hi {{firstName}},\n\nTried connecting on LinkedIn earlier this week! Reaching out here as I noticed what {{companyName}} is doing in {{industry}}.\n\nWould you be open to a quick 5-min intro this Thursday?\n\nBest,\nAsad',
              variables: ['firstName', 'companyName', 'industry'],
            },
          },
        ],
      },
    ],
  },
  {
    id: 'blank',
    name: 'Blank Custom Flow',
    description: 'Start from scratch and build custom branching logic',
    steps: [
      {
        id: 'step_b_visit',
        type: 'visit',
        title: 'Visit Profile',
        subtitle: 'First stealth touchpoint',
        timingLabel: 'Send immediately',
      },
    ],
  },
];

const SAMPLE_LEAD = {
  firstName: 'Sarah',
  lastName: 'Jenkins',
  companyName: 'Acme Cloud Dynamics',
  jobTitle: 'VP of Sales & Growth',
  industry: 'Enterprise SaaS',
  location: 'San Francisco, CA',
};

export interface MoreActionDefinition {
  id: string;
  category: 'conditions' | 'linkedin' | 'channels' | 'other' | 'smart';
  categoryLabel: string;
  type: LinkedInStepType;
  title: string;
  subtitle: string;
  isCondition?: boolean;
  initialConfig?: Partial<LinkedInStepConfig>;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  badge?: string;
  badgeColor?: 'emerald' | 'amber' | 'purple' | 'cyan' | 'slate';
}

export const MORE_ACTION_ITEMS: MoreActionDefinition[] = [
  // 1. CONDITIONS (14 items)
  {
    id: 'cond_connected',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Is in LinkedIn network (1st)',
    subtitle: 'Branch if contact is already connected as 1st-degree connection',
    isCondition: true,
    initialConfig: { conditionType: 'connected', conditionTargetDays: 14 },
    icon: UserCheck,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    badge: 'Network Check',
    badgeColor: 'emerald',
  },
  {
    id: 'cond_has_email',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Has email address',
    subtitle: 'Check if verified business or personal email is present',
    isCondition: true,
    initialConfig: { conditionType: 'has_email', conditionTargetDays: 7 },
    icon: Mail,
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-500',
    badge: 'Data Filter',
    badgeColor: 'cyan',
  },
  {
    id: 'cond_has_linkedin',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Has LinkedIn URL',
    subtitle: 'Verify if lead has a valid public or Sales Navigator profile link',
    isCondition: true,
    initialConfig: { conditionType: 'has_linkedin', conditionTargetDays: 7 },
    icon: Link2,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    badge: 'Data Filter',
    badgeColor: 'slate',
  },
  {
    id: 'cond_variable',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Lead variable',
    subtitle: 'Branch based on job title, industry, country, or custom property',
    isCondition: true,
    initialConfig: { conditionType: 'variable_match', conditionTargetDays: 7 },
    icon: Filter,
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
    badge: 'Rule Match',
    badgeColor: 'purple',
  },
  {
    id: 'cond_score',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Has score',
    subtitle: 'Evaluate if lead AI fit/engagement score exceeds threshold',
    isCondition: true,
    initialConfig: { conditionType: 'score_threshold', conditionTargetDays: 7 },
    icon: Sparkles,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
    badge: 'Score Gate',
    badgeColor: 'amber',
  },
  {
    id: 'cond_opened_email',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Opened email',
    subtitle: 'Detect if cold email tracking pixel was loaded by recipient',
    isCondition: true,
    initialConfig: { conditionType: 'email_opened', conditionTargetDays: 3 },
    icon: MailOpen,
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-500',
    badge: 'Engagement',
    badgeColor: 'cyan',
  },
  {
    id: 'cond_clicked_link',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Clicked on link in email',
    subtitle: 'Detect if recipient clicked tracked links or attachments',
    isCondition: true,
    initialConfig: { conditionType: 'email_clicked', conditionTargetDays: 3 },
    icon: Link2,
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-500',
    badge: 'Engagement',
    badgeColor: 'purple',
  },
  {
    id: 'cond_unsub',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Unsubscribe from email',
    subtitle: 'Divert contacts who unsubscribed or opted out from campaigns',
    isCondition: true,
    initialConfig: { conditionType: 'email_unsubscribed', conditionTargetDays: 1 },
    icon: MailX,
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-500',
    badge: 'Safety',
    badgeColor: 'slate',
  },
  {
    id: 'cond_meeting',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Booked a meeting',
    subtitle: 'Calendar booking detected via Calendly or Outtricks scheduler',
    isCondition: true,
    initialConfig: { conditionType: 'meeting_booked', conditionTargetDays: 14 },
    icon: CalendarCheck,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    badge: 'High Intent',
    badgeColor: 'emerald',
  },
  {
    id: 'cond_accepted_invite',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Accepted invite',
    subtitle: 'Branch when sent LinkedIn connection invitation is accepted',
    isCondition: true,
    initialConfig: { conditionType: 'invite_accepted', conditionTargetDays: 30 },
    icon: CheckCircle2,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    badge: 'Connection',
    badgeColor: 'emerald',
  },
  {
    id: 'cond_opened_msg',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Opened LinkedIn message',
    subtitle: 'Check if LinkedIn direct message or InMail was viewed',
    isCondition: true,
    initialConfig: { conditionType: 'message_opened', conditionTargetDays: 7 },
    icon: Eye,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    badge: 'Read Receipt',
    badgeColor: 'slate',
  },
  {
    id: 'cond_whatsapp',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Has WhatsApp account',
    subtitle: 'Check if contact mobile number is registered on WhatsApp',
    isCondition: true,
    initialConfig: { conditionType: 'has_whatsapp', conditionTargetDays: 7 },
    icon: MessageCircle,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    badge: 'Channel Check',
    badgeColor: 'emerald',
  },
  {
    id: 'cond_phone',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Has phone number',
    subtitle: 'Check if mobile number or direct dial line is available',
    isCondition: true,
    initialConfig: { conditionType: 'has_phone', conditionTargetDays: 7 },
    icon: Phone,
    iconBg: 'bg-teal-500/10',
    iconColor: 'text-teal-500',
    badge: 'Data Filter',
    badgeColor: 'cyan',
  },
  {
    id: 'cond_call',
    category: 'conditions',
    categoryLabel: 'Conditions',
    type: 'condition',
    title: 'Call status',
    subtitle: 'Branch based on call completion, voicemail, or no-answer status',
    isCondition: true,
    initialConfig: { conditionType: 'call_status', conditionTargetDays: 5 },
    icon: PhoneCall,
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
    badge: 'Telephony',
    badgeColor: 'amber',
  },

  // 2. LINKEDIN ACTIONS (10 items)
  {
    id: 'act_withdraw',
    category: 'linkedin',
    categoryLabel: 'LinkedIn Actions',
    type: 'withdraw',
    title: 'Withdraw invitation',
    subtitle: 'Cancel pending invitation after timeout window to protect quota',
    icon: Undo2,
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-500',
    badge: 'Safety',
    badgeColor: 'slate',
  },
  {
    id: 'act_visit',
    category: 'linkedin',
    categoryLabel: 'LinkedIn Actions',
    type: 'visit',
    title: 'Visit profile',
    subtitle: 'Stealth profile viewing via residential proxy IP',
    icon: Eye,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
  },
  {
    id: 'act_invite',
    category: 'linkedin',
    categoryLabel: 'LinkedIn Actions',
    type: 'connect',
    title: 'Invitation',
    subtitle: 'Send 1st-degree connection invitation with customized note',
    icon: UserPlus,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
  },
  {
    id: 'act_chat',
    category: 'linkedin',
    categoryLabel: 'LinkedIn Actions',
    type: 'message',
    title: 'Chat message',
    subtitle: 'Direct conversation message with personalization tokens',
    icon: MessageSquare,
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
  },
  {
    id: 'act_voice',
    category: 'linkedin',
    categoryLabel: 'LinkedIn Actions',
    type: 'voice_note',
    title: 'Voice message',
    subtitle: 'Send authentic recorded audio clip in LinkedIn chat',
    icon: Mic,
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-500',
    badge: 'Audio Note',
    badgeColor: 'purple',
  },
  {
    id: 'act_ai_voice',
    category: 'linkedin',
    categoryLabel: 'LinkedIn Actions',
    type: 'ai_voice',
    title: 'AI Voice message',
    subtitle: 'Synthesize hyper-personalized AI voice message for prospect',
    icon: Bot,
    iconBg: 'bg-fuchsia-500/10',
    iconColor: 'text-fuchsia-500',
    badge: 'AI Telephony',
    badgeColor: 'purple',
  },
  {
    id: 'act_follow',
    category: 'linkedin',
    categoryLabel: 'LinkedIn Actions',
    type: 'follow',
    title: 'Follow User',
    subtitle: 'Follow user profile to generate notification and signal intent',
    icon: UserCheck,
    iconBg: 'bg-teal-500/10',
    iconColor: 'text-teal-500',
  },
  {
    id: 'act_like_post',
    category: 'linkedin',
    categoryLabel: 'LinkedIn Actions',
    type: 'like_post',
    title: 'Like last post',
    subtitle: 'Organic engagement on prospect most recent post',
    icon: ThumbsUp,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
  },
  {
    id: 'act_comment',
    category: 'linkedin',
    categoryLabel: 'LinkedIn Actions',
    type: 'comment',
    title: 'Comment last post',
    subtitle: 'Post thoughtful, AI-assisted comment on latest publication',
    icon: MessageCircle,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
  },
  {
    id: 'act_endorse',
    category: 'linkedin',
    categoryLabel: 'LinkedIn Actions',
    type: 'endorse',
    title: 'Endorse skill',
    subtitle: 'Endorse top 1-3 highlighted skills on prospect profile',
    icon: Sparkles,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
  },

  // 3. OTHER CHANNELS (5 items)
  {
    id: 'chan_wa_msg',
    category: 'channels',
    categoryLabel: 'Other Channels',
    type: 'whatsapp_message',
    title: 'WhatsApp chat message',
    subtitle: 'Deliver direct WhatsApp message to recipient phone number',
    icon: MessageCircle,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    badge: 'WhatsApp',
    badgeColor: 'emerald',
  },
  {
    id: 'chan_wa_voice',
    category: 'channels',
    categoryLabel: 'Other Channels',
    type: 'whatsapp_voice',
    title: 'WhatsApp voice message',
    subtitle: 'Send voice audio message via WhatsApp messaging pipeline',
    icon: Mic,
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-500',
    badge: 'WhatsApp',
    badgeColor: 'emerald',
  },
  {
    id: 'chan_sms',
    category: 'channels',
    categoryLabel: 'Other Channels',
    type: 'sms',
    title: 'SMS',
    subtitle: 'High-deliverability SMS text reminder or touchpoint',
    icon: MessageSquare,
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-500',
    badge: 'SMS Gateway',
    badgeColor: 'cyan',
  },
  {
    id: 'chan_email',
    category: 'channels',
    categoryLabel: 'Other Channels',
    type: 'email',
    title: 'Email',
    subtitle: 'Cold outreach or follow-up email from Outtricks email pool',
    icon: Send,
    iconBg: 'bg-cyan-500/10',
    iconColor: 'text-cyan-500',
    badge: 'Email Pool',
    badgeColor: 'cyan',
  },
  {
    id: 'chan_call',
    category: 'channels',
    categoryLabel: 'Other Channels',
    type: 'call',
    title: 'Call',
    subtitle: 'Trigger automated AI voice agent or queue SDR phone task',
    icon: Phone,
    iconBg: 'bg-orange-500/10',
    iconColor: 'text-orange-500',
    badge: 'Voice Agent',
    badgeColor: 'amber',
  },

  // 4. OTHER STEPS (3 items)
  {
    id: 'oth_task',
    category: 'other',
    categoryLabel: 'Other Steps',
    type: 'create_task',
    title: 'Manual task',
    subtitle: 'Assign manual review, phone call, or prep task to SDR',
    icon: CheckSquare,
    iconBg: 'bg-indigo-500/10',
    iconColor: 'text-indigo-500',
    badge: 'CRM Task',
    badgeColor: 'purple',
  },
  {
    id: 'oth_api',
    category: 'other',
    categoryLabel: 'Other Steps',
    type: 'call_api',
    title: 'Call an API',
    subtitle: 'Dispatch webhook or REST payload to Zapier, CRM, or backend',
    icon: Code,
    iconBg: 'bg-purple-500/10',
    iconColor: 'text-purple-500',
    badge: 'Webhook',
    badgeColor: 'purple',
  },
  {
    id: 'oth_campaign',
    category: 'other',
    categoryLabel: 'Other Steps',
    type: 'send_to_campaign',
    title: 'Send to campaign',
    subtitle: 'Enroll prospect into downstream email or multichannel flow',
    icon: Share2,
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-500',
    badge: 'Campaign Router',
    badgeColor: 'slate',
  },
  {
    id: 'oth_stop',
    category: 'other',
    categoryLabel: 'Other Steps',
    type: 'stop',
    title: 'End Sequence',
    subtitle: 'Conclude sequence outreach and mark contact completed',
    icon: StopCircle,
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-500',
    badge: 'Conclude',
    badgeColor: 'slate',
  },

  // 5. SMART STEPS (3 items)
  {
    id: 'smart_enrich',
    category: 'smart',
    categoryLabel: 'Smart Steps',
    type: 'lead_enrichment',
    title: 'Lead enrichment',
    subtitle: 'Discover verified work emails, phone numbers & firmographics',
    icon: Sparkles,
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-500',
    badge: '3 Credits',
    badgeColor: 'amber',
  },
  {
    id: 'smart_verify',
    category: 'smart',
    categoryLabel: 'Smart Steps',
    type: 'verify_email',
    title: 'Verify Email Deliverability',
    subtitle: 'Real-time SMTP handshake and bounce prevention check',
    icon: CheckCircle2,
    iconBg: 'bg-teal-500/10',
    iconColor: 'text-teal-500',
    badge: 'Hygiene',
    badgeColor: 'emerald',
  },
  {
    id: 'smart_intent',
    category: 'smart',
    categoryLabel: 'Smart Steps',
    type: 'ai_intent',
    title: 'AI Intent & Tone Analysis',
    subtitle: 'Score prospect intent and suggest optimal objection reply',
    icon: Brain,
    iconBg: 'bg-fuchsia-500/10',
    iconColor: 'text-fuchsia-500',
    badge: 'AI Engine',
    badgeColor: 'purple',
  },
];

export const LinkedInEmbeddedCanvasStep: React.FC<LinkedInEmbeddedCanvasStepProps> = ({
  sequence,
  onChangeSequence,
  leadCount = 3,
  accountName = 'Asad Farooq',
}) => {
  const { success, info, error } = useToast();

  // Condition deletion confirmation state
  const [conditionToDelete, setConditionToDelete] = useState<{
    id: string;
    title: string;
    descCount: number;
  } | null>(null);

  // Active selected step for inspector drawer
  const [selectedStepId, setSelectedStepId] = useState<string | null>(
    sequence[0]?.id || null
  );

  // Zoom scale state for canvas (0.4x to 1.5x)
  const [zoomScale, setZoomScale] = useState(1);
  const zoomScaleRef = useRef(zoomScale);
  zoomScaleRef.current = zoomScale;

  // Viewport pan offset state for free-form 2D navigation (infinite workspace)
  const [pan, setPan] = useState({ x: 450, y: 40 });
  const panRef = useRef(pan);
  panRef.current = pan;

  // Interactive panning states & refs
  const [isPanning, setIsPanning] = useState(false);
  const isPanningRef = useRef(false);
  const startMouseRef = useRef({ x: 0, y: 0 });
  const startPanRef = useRef({ x: 0, y: 0 });
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const isSpacePressedRef = useRef(false);

  // Viewport & World refs
  const canvasViewportRef = useRef<HTMLDivElement>(null);
  const canvasWorldRef = useRef<HTMLDivElement>(null);

  // Zoom change handler with mathematically exact cursor-centered anchoring
  const handleZoomChange = useCallback((nextScale: number, cursor?: { clientX: number; clientY: number }) => {
    const clamped = Math.min(1.5, Math.max(0.4, +nextScale.toFixed(2)));
    const prevScale = zoomScaleRef.current;
    if (clamped === prevScale) return;

    const viewportEl = canvasViewportRef.current;
    if (viewportEl) {
      const rect = viewportEl.getBoundingClientRect();
      // If cursor provided, anchor to cursor; otherwise anchor to viewport center
      const cursorX = cursor ? cursor.clientX - rect.left : rect.width / 2;
      const cursorY = cursor ? cursor.clientY - rect.top : rect.height / 2;

      // Exact cursor-centered zoom equation:
      const ratio = clamped / prevScale;
      const nextPanX = cursorX - (cursorX - panRef.current.x) * ratio;
      const nextPanY = cursorY - (cursorY - panRef.current.y) * ratio;

      const updatedPan = { x: nextPanX, y: nextPanY };
      panRef.current = updatedPan;
      setPan(updatedPan);
    }

    zoomScaleRef.current = clamped;
    setZoomScale(clamped);
  }, []);

  // Recenter canvas view and reset zoom to 100%
  const handleResetView = useCallback(() => {
    const width = canvasViewportRef.current?.clientWidth || 800;
    zoomScaleRef.current = 1;
    setZoomScale(1);
    const resetPan = { x: Math.round(width / 2), y: 40 };
    panRef.current = resetPan;
    setPan(resetPan);
  }, []);

  // Auto-center workflow spine horizontally on initial mount
  useEffect(() => {
    if (canvasViewportRef.current) {
      const width = canvasViewportRef.current.clientWidth;
      if (width > 0) {
        const initPan = { x: Math.round(width / 2), y: 40 };
        panRef.current = initPan;
        setPan(initPan);
      }
    }
  }, []);

  // Native non-passive listeners for smooth pan & zoom interactions
  useEffect(() => {
    const viewport = canvasViewportRef.current;
    if (!viewport) return;

    // 1. Wheel: Zoom if Ctrl/Cmd held; Pan if normal scroll
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.ctrlKey || e.metaKey) {
        // Smooth delta: wheel up zooms in, wheel down zooms out
        const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
        const nextScale = Math.min(1.5, Math.max(0.4, +(zoomScaleRef.current * zoomFactor).toFixed(2)));
        handleZoomChange(nextScale, { clientX: e.clientX, clientY: e.clientY });
      } else {
        // Pan canvas with mouse wheel / touchpad
        const nextPan = {
          x: panRef.current.x - e.deltaX,
          y: panRef.current.y - e.deltaY,
        };
        panRef.current = nextPan;
        setPan(nextPan);
      }
    };

    // 2. MouseDown (Capture Phase): Intercept Middle Mouse Button (button === 1) before child nodes
    const onMouseDownCapture = (e: MouseEvent) => {
      // Middle Mouse Button (button === 1) -> drag-to-pan everywhere
      if (e.button === 1) {
        e.preventDefault();
        e.stopPropagation();
        isPanningRef.current = true;
        setIsPanning(true);
        startMouseRef.current = { x: e.clientX, y: e.clientY };
        startPanRef.current = { ...panRef.current };
        document.body.style.userSelect = 'none';
        return;
      }

      // Left Click (button === 0) on canvas background or when Spacebar is held
      if (e.button === 0) {
        const target = e.target as HTMLElement;
        const isCanvasBackground = 
          target === viewport || 
          target.getAttribute('data-canvas-bg') === 'true' ||
          target.classList.contains('canvas-bg-layer');

        if (isSpacePressedRef.current || isCanvasBackground) {
          e.preventDefault();
          isPanningRef.current = true;
          setIsPanning(true);
          startMouseRef.current = { x: e.clientX, y: e.clientY };
          startPanRef.current = { ...panRef.current };
          document.body.style.userSelect = 'none';
        }
      }
    };

    // 3. AuxClick (Capture Phase): Suppress Chrome native autoscroll
    const onAuxClickCapture = (e: MouseEvent) => {
      if (e.button === 1) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // 4. Global MouseMove & MouseUp
    const onMouseMove = (e: MouseEvent) => {
      if (!isPanningRef.current) return;
      e.preventDefault();

      const dx = e.clientX - startMouseRef.current.x;
      const dy = e.clientY - startMouseRef.current.y;

      const nextPan = {
        x: startPanRef.current.x + dx,
        y: startPanRef.current.y + dy,
      };

      panRef.current = nextPan;
      setPan(nextPan);
    };

    const onMouseUp = (e: MouseEvent) => {
      if (isPanningRef.current) {
        isPanningRef.current = false;
        setIsPanning(false);
        document.body.style.userSelect = '';
        if (e.button === 1) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    // 5. Spacebar Shortcut for Quick Hand Pan
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      if (e.code === 'Space' && !e.repeat) {
        isSpacePressedRef.current = true;
        setIsSpacePressed(true);
      }
      // Ctrl/Cmd + 0 to Recenter View
      if (e.key === '0' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        handleResetView();
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePressedRef.current = false;
        setIsSpacePressed(false);
      }
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('mousedown', onMouseDownCapture, { capture: true });
    viewport.addEventListener('auxclick', onAuxClickCapture, { capture: true });
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp, { capture: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    return () => {
      viewport.removeEventListener('wheel', onWheel);
      viewport.removeEventListener('mousedown', onMouseDownCapture, { capture: true });
      viewport.removeEventListener('auxclick', onAuxClickCapture, { capture: true });
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp, { capture: true });
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      document.body.style.userSelect = '';
    };
  }, [handleZoomChange, handleResetView]);

  // Action Picker Modal State
  const [isActionPickerOpen, setIsActionPickerOpen] = useState(false);
  const [actionPickerInsertionTarget, setActionPickerInsertionTarget] = useState<{
    branch: 'main' | 'yes' | 'no';
    parentConditionId?: string;
    parentBranchId?: string;
    parentTitle?: string;
    index?: number;
  }>({ branch: 'main' });

  // "More" Secondary Action Picker States
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [moreSearchQuery, setMoreSearchQuery] = useState('');
  const [moreCategoryFilter, setMoreCategoryFilter] = useState<'all' | 'conditions' | 'linkedin' | 'channels' | 'other' | 'smart'>('all');

  // Sample lead preview mode
  const [isPreviewingSampleLead, setIsPreviewingSampleLead] = useState(false);

  // Find currently selected step recursively in sequence tree
  const findStepById = (steps: LinkedInStep[], id: string): LinkedInStep | null => {
    for (const step of steps) {
      if (step.id === id) return step;
      if (step.yesBranch) {
        const found = findStepById(step.yesBranch, id);
        if (found) return found;
      }
      if (step.noBranch) {
        const found = findStepById(step.noBranch, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedStep = useMemo(() => {
    if (!selectedStepId) return null;
    return findStepById(sequence, selectedStepId);
  }, [sequence, selectedStepId]);

  // Real-time Sequence Graph Validation
  const validation = useMemo(() => validateSequenceGraph(sequence), [sequence]);
  const [showValidationPopover, setShowValidationPopover] = useState(false);

  // Quick Action helper to immediately conclude branch or add condition
  const handleQuickAdd = (branch: 'yes' | 'no', parentConditionId: string, actionType: 'stop' | 'condition') => {
    if (actionType === 'stop') {
      const newStep: LinkedInStep = {
        id: `step_${Date.now()}_end`,
        type: 'stop',
        title: 'End Sequence',
        subtitle: 'Conclude outreach for leads reaching this step',
        timingLabel: 'Send immediately',
        branch,
        parentConditionId,
        config: {
          stopReason: 'manual',
        },
      };
      const addInBranch = (steps: LinkedInStep[]): LinkedInStep[] => {
        return steps.map((s) => {
          if (s.id === parentConditionId) {
            if (branch === 'yes') {
              return { ...s, yesBranch: [...(s.yesBranch || []), newStep] };
            } else {
              return { ...s, noBranch: [...(s.noBranch || []), newStep] };
            }
          }
          let newS = { ...s };
          if (newS.yesBranch) newS.yesBranch = addInBranch(newS.yesBranch);
          if (newS.noBranch) newS.noBranch = addInBranch(newS.noBranch);
          return newS;
        });
      };
      onChangeSequence(addInBranch(sequence));
      setSelectedStepId(newStep.id);
      success('Added End Sequence node to branch.', 'Step Added');
    } else if (actionType === 'condition') {
      const newConditionId = `step_${Date.now()}_cond`;
      const newStep: LinkedInStep = {
        id: newConditionId,
        type: 'condition',
        title: 'If Condition Met',
        subtitle: 'Wait up to 14 days for prospect response',
        branch,
        parentConditionId,
        config: {
          conditionType: 'invite_accepted',
          conditionTargetDays: 14,
        },
        yesBranch: [],
        noBranch: [
          {
            id: `step_${Date.now()}_end`,
            type: 'stop',
            title: 'End Sequence',
            subtitle: 'Conclude outreach for unaccepted or timed-out leads',
            timingLabel: 'Send immediately',
            branch: 'no',
            parentConditionId: newConditionId,
            config: {
              stopReason: 'timeout_or_rejected',
            },
          },
        ],
      };
      const addInBranch = (steps: LinkedInStep[]): LinkedInStep[] => {
        return steps.map((s) => {
          if (s.id === parentConditionId) {
            if (branch === 'yes') {
              return { ...s, yesBranch: [...(s.yesBranch || []), newStep] };
            } else {
              return { ...s, noBranch: [...(s.noBranch || []), newStep] };
            }
          }
          let newS = { ...s };
          if (newS.yesBranch) newS.yesBranch = addInBranch(newS.yesBranch);
          if (newS.noBranch) newS.noBranch = addInBranch(newS.noBranch);
          return newS;
        });
      };
      onChangeSequence(addInBranch(sequence));
      setSelectedStepId(newStep.id);
      success('Added Condition Split to branch.', 'Step Added');
    }
  };

  // Filtered More Action Items for secondary picker view
  const filteredMoreItems = useMemo(() => {
    return MORE_ACTION_ITEMS.filter((item) => {
      if (moreCategoryFilter !== 'all' && item.category !== moreCategoryFilter) {
        return false;
      }
      if (moreSearchQuery.trim()) {
        const q = moreSearchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.subtitle.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [moreCategoryFilter, moreSearchQuery]);

  const moreCategorySections = useMemo(() => [
    { key: 'conditions' as const, title: 'CONDITIONS', desc: 'Rule triggers & branch gates' },
    { key: 'linkedin' as const, title: 'LINKEDIN ACTIONS', desc: 'Direct network interactions' },
    { key: 'channels' as const, title: 'OTHER CHANNELS', desc: 'WhatsApp, SMS, Email & Calling' },
    { key: 'other' as const, title: 'OTHER STEPS', desc: 'Tasks, Webhooks & Router' },
    { key: 'smart' as const, title: 'SMART STEPS', desc: 'AI synthesis & Enrichment' },
  ], []);

  // Recursively update a step
  const updateStepInTree = (
    steps: LinkedInStep[],
    id: string,
    updates: Partial<LinkedInStep>
  ): LinkedInStep[] => {
    return steps.map((s) => {
      if (s.id === id) {
        return {
          ...s,
          ...updates,
          config: updates.config ? { ...s.config, ...updates.config } : s.config,
        };
      }
      let newS = { ...s };
      if (newS.yesBranch) {
        newS.yesBranch = updateStepInTree(newS.yesBranch, id, updates);
      }
      if (newS.noBranch) {
        newS.noBranch = updateStepInTree(newS.noBranch, id, updates);
      }
      return newS;
    });
  };

  const handleUpdateSelectedStep = (updates: Partial<LinkedInStep>) => {
    if (!selectedStepId) return;
    const nextSeq = updateStepInTree(sequence, selectedStepId, updates);
    onChangeSequence(nextSeq);
  };

  // Recursively delete a step with full branch verification (no early return bug)
  const deleteStepFromTree = (steps: LinkedInStep[], id: string): { steps: LinkedInStep[]; deleted: boolean } => {
    let wasDeleted = false;
    const filtered = steps.filter((s) => {
      if (s.id === id) {
        wasDeleted = true;
        return false;
      }
      return true;
    });

    const mapped = filtered.map((s) => {
      let newS = { ...s };
      if (newS.yesBranch) {
        const res = deleteStepFromTree(newS.yesBranch, id);
        if (res.deleted) wasDeleted = true;
        newS.yesBranch = res.steps;
      }
      if (newS.noBranch) {
        const res = deleteStepFromTree(newS.noBranch, id);
        if (res.deleted) wasDeleted = true;
        newS.noBranch = res.steps;
      }
      return newS;
    });

    return { steps: mapped, deleted: wasDeleted };
  };

  // Count nested descendant steps in a branch hierarchy
  const countDescendants = (step: LinkedInStep): number => {
    let count = 0;
    if (step.yesBranch) {
      for (const s of step.yesBranch) {
        count += 1 + countDescendants(s);
      }
    }
    if (step.noBranch) {
      for (const s of step.noBranch) {
        count += 1 + countDescendants(s);
      }
    }
    return count;
  };

  const executeDeleteStep = (id: string) => {
    const res = deleteStepFromTree(sequence, id);
    if (res.deleted) {
      onChangeSequence(res.steps);
      // Immediately reset inspector if the deleted step was selected or was inside the deleted hierarchy
      if (selectedStepId === id || (selectedStepId && !findStepById(res.steps, selectedStepId))) {
        setSelectedStepId(null);
      }
      success('Step removed from sequence.', 'Step Deleted');
    } else {
      error('Unable to delete this step. Please try again.', 'Deletion Failed');
    }
  };

  const handleDeleteStep = (id: string) => {
    const targetStep = findStepById(sequence, id);
    if (targetStep && targetStep.type === 'condition') {
      const descCount = countDescendants(targetStep);
      if (descCount > 0) {
        setConditionToDelete({ id, title: targetStep.title, descCount });
        return;
      }
    }
    executeDeleteStep(id);
  };

  // Duplicate a step (with deep clone of nested condition sub-branches and fresh IDs)
  const handleDuplicateStep = (step: LinkedInStep) => {
    let idCounter = Date.now();
    const deepCloneWithFreshIds = (s: LinkedInStep, parentId?: string, isRootClone = true): LinkedInStep => {
      const freshId = `step_${idCounter++}_${Math.random().toString(36).substr(2, 5)}`;
      const node: LinkedInStep = {
        ...s,
        id: freshId,
        parentConditionId: parentId || (isRootClone ? s.parentConditionId : parentId),
        title: isRootClone ? `${s.title} (Copy)` : s.title,
        config: s.config ? JSON.parse(JSON.stringify(s.config)) : undefined,
      };
      if (s.yesBranch) {
        node.yesBranch = s.yesBranch.map((child) => deepCloneWithFreshIds(child, freshId, false));
      }
      if (s.noBranch) {
        node.noBranch = s.noBranch.map((child) => deepCloneWithFreshIds(child, freshId, false));
      }
      return node;
    };

    const cloned = deepCloneWithFreshIds(step);

    const insertAfterInTree = (steps: LinkedInStep[], targetId: string): LinkedInStep[] => {
      const idx = steps.findIndex((s) => s.id === targetId);
      if (idx !== -1) {
        const next = [...steps];
        next.splice(idx + 1, 0, cloned);
        return next;
      }
      return steps.map((s) => {
        let newS = { ...s };
        if (newS.yesBranch) {
          newS.yesBranch = insertAfterInTree(newS.yesBranch, targetId);
        }
        if (newS.noBranch) {
          newS.noBranch = insertAfterInTree(newS.noBranch, targetId);
        }
        return newS;
      });
    };

    const nextSeq = insertAfterInTree(sequence, step.id);
    onChangeSequence(nextSeq);
    setSelectedStepId(cloned.id);
    success(`Duplicated step "${step.title}".`, 'Step Duplicated');
  };

  // Move step up or down in main sequence or inside branch
  const handleMoveStep = (id: string, direction: 'up' | 'down') => {
    const moveInList = (list: LinkedInStep[]): { updated: LinkedInStep[]; found: boolean } => {
      const idx = list.findIndex((s) => s.id === id);
      if (idx !== -1) {
        if (direction === 'up' && idx === 0) return { updated: list, found: true };
        if (direction === 'down' && idx === list.length - 1) return { updated: list, found: true };
        const next = [...list];
        const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
        const temp = next[idx];
        next[idx] = next[targetIdx];
        next[targetIdx] = temp;
        return { updated: next, found: true };
      }
      let foundAny = false;
      const nextList = list.map((s) => {
        let newS = s;
        if (newS.yesBranch) {
          const res = moveInList(newS.yesBranch);
          if (res.found) {
            foundAny = true;
            newS = { ...newS, yesBranch: res.updated };
          }
        }
        if (newS.noBranch) {
          const res = moveInList(newS.noBranch);
          if (res.found) {
            foundAny = true;
            newS = { ...newS, noBranch: res.updated };
          }
        }
        return newS;
      });
      return { updated: nextList, found: foundAny };
    };

    const res = moveInList(sequence);
    if (res.found) {
      onChangeSequence(res.updated);
    }
  };

  // Add Step from Action Picker
  const handleAddStepFromPicker = (
    type: LinkedInStepType,
    title: string,
    subtitle: string,
    isCondition = false,
    initialConfig?: Partial<LinkedInStepConfig>
  ) => {
    const newStepId = `step_${Date.now()}`;
    const newStep: LinkedInStep = {
      id: newStepId,
      type,
      title,
      subtitle,
      timingLabel: isCondition ? undefined : 'Send immediately',
      config: {
        body:
          type === 'message'
            ? 'Hi {{firstName}},\n\nThanks for connecting! Would love to learn more about {{companyName}}.'
            : type === 'email'
            ? 'Hi {{firstName}},\n\nSaw what you\'re building at {{companyName}} and wanted to connect!'
            : type === 'whatsapp_message' || type === 'sms'
            ? 'Hi {{firstName}}, this is regarding {{companyName}}. Let me know when you have a quick minute!'
            : type === 'voice_note' || type === 'ai_voice' || type === 'whatsapp_voice'
            ? 'Hey {{firstName}}, noticed what your team is building at {{companyName}} and wanted to leave a quick voice note.'
            : type === 'comment'
            ? 'Great insights on {{industry}}, {{firstName}}!'
            : undefined,
        note:
          type === 'connect'
            ? 'Hi {{firstName}}, noticed your leadership at {{companyName}}. Would love to connect!'
            : undefined,
        subject:
          type === 'email'
            ? 'Quick note regarding {{companyName}}'
            : type === 'inmail'
            ? 'Partnership exploration with {{companyName}}'
            : undefined,
        characterLimit: type === 'connect' ? 300 : undefined,
        variables: ['firstName', 'companyName'],
        conditionType: isCondition ? (initialConfig?.conditionType || 'invite_accepted') : undefined,
        conditionTargetDays: isCondition ? (initialConfig?.conditionTargetDays || 14) : undefined,
        apiUrl: type === 'call_api' ? 'https://api.yourdomain.com/webhook/lead' : undefined,
        apiMethod: type === 'call_api' ? 'POST' : undefined,
        campaignTargetName: type === 'send_to_campaign' ? 'Executive Inbound Nurture' : undefined,
        taskTitle: type === 'create_task' ? 'Follow up with {{firstName}} {{lastName}}' : undefined,
        taskDueDateDays: type === 'create_task' ? 1 : undefined,
        enrichmentType: type === 'lead_enrichment' ? 'all' : undefined,
        ...initialConfig,
      },
    };

    const { branch, parentConditionId, parentBranchId, index } = actionPickerInsertionTarget;
    const resolvedParentBranchId = parentBranchId || (parentConditionId && branch !== 'main' ? `${parentConditionId}_${branch}` : undefined);

    if (branch !== 'main' && parentConditionId) {
      newStep.parentConditionId = parentConditionId;
      newStep.parentBranchId = resolvedParentBranchId;
      newStep.branch = branch as 'yes' | 'no';
    }

    if (isCondition) {
      const yesBranchId = `${newStepId}_yes`;
      const noBranchId = `${newStepId}_no`;
      newStep.yesBranchId = yesBranchId;
      newStep.noBranchId = noBranchId;
      newStep.yesBranch = [];
      newStep.noBranch = [
        {
          id: `${newStepId}_end`,
          type: 'stop',
          title: 'End Sequence',
          subtitle: 'Conclude outreach for unaccepted or timed-out leads',
          timingLabel: 'Send immediately',
          branch: 'no',
          parentConditionId: newStepId,
          parentBranchId: noBranchId,
          config: {
            stopReason: 'timeout_or_rejected',
          },
        },
      ];
    }

    if (branch === 'main') {
      const nextSeq = [...sequence];
      if (typeof index === 'number') {
        nextSeq.splice(index, 0, newStep);
      } else {
        nextSeq.push(newStep);
      }
      onChangeSequence(nextSeq);
    } else if (parentConditionId) {
      // Add inside a yes/no branch
      const addInBranch = (steps: LinkedInStep[]): LinkedInStep[] => {
        return steps.map((s) => {
          if (s.id === parentConditionId) {
            if (branch === 'yes') {
              const currentBranch = s.yesBranch || [];
              const nextBranch = [...currentBranch];
              if (typeof index === 'number') {
                nextBranch.splice(index, 0, newStep);
              } else {
                nextBranch.push(newStep);
              }
              return { ...s, yesBranch: nextBranch };
            } else {
              const currentBranch = s.noBranch || [];
              const nextBranch = [...currentBranch];
              if (typeof index === 'number') {
                nextBranch.splice(index, 0, newStep);
              } else {
                nextBranch.push(newStep);
              }
              return { ...s, noBranch: nextBranch };
            }
          }
          let newS = { ...s };
          if (newS.yesBranch) {
            newS.yesBranch = addInBranch(newS.yesBranch);
          }
          if (newS.noBranch) {
            newS.noBranch = addInBranch(newS.noBranch);
          }
          return newS;
        });
      };
      const nextSeq = addInBranch(sequence);
      onChangeSequence(nextSeq);
    }

    setIsActionPickerOpen(false);
    setShowMoreActions(false);
    setSelectedStepId(newStepId);
    success(`Added step "${title}".`, 'Step Added');
  };

  // Interpolate mock lead data into template text
  const renderSamplePreview = (text?: string) => {
    if (!text) return '';
    return text
      .replace(/{{firstName}}/g, SAMPLE_LEAD.firstName)
      .replace(/{{lastName}}/g, SAMPLE_LEAD.lastName)
      .replace(/{{companyName}}/g, SAMPLE_LEAD.companyName)
      .replace(/{{company}}/g, SAMPLE_LEAD.companyName)
      .replace(/{{jobTitle}}/g, SAMPLE_LEAD.jobTitle)
      .replace(/{{industry}}/g, SAMPLE_LEAD.industry)
      .replace(/{{location}}/g, SAMPLE_LEAD.location);
  };

  // Count total steps across main sequence and sub-branches
  const calculateTotalSteps = (steps: LinkedInStep[]): number => {
    let count = 0;
    for (const s of steps) {
      count++;
      if (s.yesBranch) count += calculateTotalSteps(s.yesBranch);
      if (s.noBranch) count += calculateTotalSteps(s.noBranch);
    }
    return count;
  };

  const totalStepCount = useMemo(() => calculateTotalSteps(sequence), [sequence]);

  // Node icon and styling helper
  const getNodeVisuals = (type: LinkedInStepType) => {
    switch (type) {
      case 'visit':
        return {
          icon: Eye,
          bgColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
          badgeText: 'Profile Visit',
        };
      case 'connect':
        return {
          icon: UserPlus,
          bgColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          badgeText: 'Connection Request',
        };
      case 'message':
      case 'followup':
        return {
          icon: MessageSquare,
          bgColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
          badgeText: 'Direct Message',
        };
      case 'inmail':
        return {
          icon: Mail,
          bgColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          badgeText: 'LinkedIn InMail',
        };
      case 'email':
        return {
          icon: Send,
          bgColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
          badgeText: 'Cold Email',
        };
      case 'delay':
        return {
          icon: Clock,
          bgColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
          badgeText: 'Wait Delay',
        };
      case 'like_post':
      case 'endorse':
        return {
          icon: ThumbsUp,
          bgColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          badgeText: 'Engagement',
        };
      case 'condition':
        return {
          icon: Workflow,
          bgColor: 'bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20',
          badgeText: 'Smart Condition',
        };
      case 'withdraw':
        return {
          icon: Undo2,
          bgColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          badgeText: 'Withdraw Invite',
        };
      case 'voice_note':
        return {
          icon: Mic,
          bgColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          badgeText: 'Voice Note',
        };
      case 'ai_voice':
        return {
          icon: Bot,
          bgColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
          badgeText: 'AI Voice Memo',
        };
      case 'follow':
        return {
          icon: UserCheck,
          bgColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
          badgeText: 'Follow Contact',
        };
      case 'unfollow':
        return {
          icon: UserX,
          bgColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
          badgeText: 'Unfollow Contact',
        };
      case 'comment':
        return {
          icon: MessageCircle,
          bgColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          badgeText: 'Comment on Post',
        };
      case 'whatsapp_message':
        return {
          icon: MessageCircle,
          bgColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          badgeText: 'WhatsApp Chat',
        };
      case 'whatsapp_voice':
        return {
          icon: Mic,
          bgColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
          badgeText: 'WhatsApp Voice',
        };
      case 'sms':
        return {
          icon: MessageSquare,
          bgColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20',
          badgeText: 'SMS Message',
        };
      case 'call':
        return {
          icon: Phone,
          bgColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
          badgeText: 'Outbound Call',
        };
      case 'create_task':
        return {
          icon: CheckSquare,
          bgColor: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
          badgeText: 'Manual Task',
        };
      case 'call_api':
        return {
          icon: Code,
          bgColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
          badgeText: 'API Webhook',
        };
      case 'send_to_campaign':
        return {
          icon: Share2,
          bgColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
          badgeText: 'Send to Campaign',
        };
      case 'lead_enrichment':
        return {
          icon: Sparkles,
          bgColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
          badgeText: 'Lead Enrichment (3 Cr)',
        };
      case 'verify_email':
        return {
          icon: ShieldCheck,
          bgColor: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
          badgeText: 'Verify Email',
        };
      case 'ai_intent':
        return {
          icon: Brain,
          bgColor: 'bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border-fuchsia-500/20',
          badgeText: 'AI Intent & Tone',
        };
      case 'stop':
        return {
          icon: ShieldCheck,
          bgColor: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
          badgeText: 'End Sequence',
        };
      default:
        return {
          icon: Zap,
          bgColor: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
          badgeText: 'Action',
        };
    }
  };

  // Calculate precise layout width required for a branch to prevent card cramping and button overflow
  const getBranchLayoutWidth = (branchSteps: LinkedInStep[] | undefined): number => {
    if (!branchSteps || branchSteps.length === 0) return 300;
    let maxWidth = 300;
    for (const s of branchSteps) {
      if (s.type === 'condition') {
        const yesW = getBranchLayoutWidth(s.yesBranch);
        const noW = getBranchLayoutWidth(s.noBranch);
        const condW = yesW + noW + 20; // 20px gap between sub-columns
        if (condW > maxWidth) maxWidth = condW;
      }
    }
    return Math.max(300, maxWidth);
  };

  // Recursive renderer for branch steps (supporting arbitrary nesting of conditions & empty states)
  const renderBranchSteps = (
    branchSteps: LinkedInStep[] | undefined,
    branchType: 'yes' | 'no',
    parentCondId: string,
    depth = 1,
    parentTitle?: string,
    parentBranchId?: string
  ) => {
    const isYes = branchType === 'yes';
    const accentBorder = isYes ? 'border-emerald-400/80 dark:border-emerald-700/80' : 'border-rose-400/80 dark:border-rose-700/80';
    const accentText = isYes ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400';
    const accentHover = isYes ? 'hover:bg-emerald-50 dark:hover:bg-emerald-950/40' : 'hover:bg-rose-50 dark:hover:bg-rose-950/40';
    const lineColor = isYes ? 'bg-emerald-400/80 dark:bg-emerald-600/80' : 'bg-rose-400/80 dark:bg-rose-600/80';
    const dotBorder = isYes ? 'border-emerald-400 dark:border-emerald-600 text-emerald-500' : 'border-rose-400 dark:border-rose-600 text-rose-500';
    const effectiveBranchId = parentBranchId || `${parentCondId}_${branchType}`;

    if (!branchSteps || branchSteps.length === 0) {
      return (
        <div className="w-full flex flex-col items-center space-y-2">
          <div className="w-full py-2 px-3 rounded-xl border border-dashed border-slate-300 dark:border-[#333] text-center my-1 bg-white/40 dark:bg-[#181818]/40">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
              No steps configured
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              setActionPickerInsertionTarget({
                branch: branchType,
                parentConditionId: parentCondId,
                parentBranchId: effectiveBranchId,
                parentTitle,
              });
              setIsActionPickerOpen(true);
            }}
            className={`w-full py-2 rounded-xl border border-dashed ${accentBorder} ${accentText} ${accentHover} text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs`}
          >
            <Plus className="w-3.5 h-3.5" /> Add {isYes ? 'YES' : 'NO'} Step
          </button>
        </div>
      );
    }

    return (
      <div className="w-full flex flex-col items-center space-y-2">
        {branchSteps.map((bStep, bIdx) => {
          const isBSelected = selectedStepId === bStep.id;
          const visuals = getNodeVisuals(bStep.type);
          const StepIcon = visuals.icon;
          const isEndStep = bStep.type === 'stop';

          // NESTED CONDITION NODE INSIDE BRANCH
          if (bStep.type === 'condition') {
            const subYesW = getBranchLayoutWidth(bStep.yesBranch);
            const subNoW = getBranchLayoutWidth(bStep.noBranch);
            const subTotalW = subYesW + subNoW + 20;

            return (
              <div key={bStep.id} className="w-full flex flex-col items-center space-y-2">
                {/* Nested Condition Card */}
                <div
                  onClick={() => setSelectedStepId(bStep.id)}
                  className={`w-full max-w-[380px] p-3 rounded-xl bg-white dark:bg-[#181818] border-2 transition-all cursor-pointer shadow-2xs overflow-hidden ${
                    isBSelected
                      ? 'border-purple-500 ring-2 ring-purple-500/20 shadow-md'
                      : 'border-purple-300/80 dark:border-purple-900/50 hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${visuals.bgColor}`}>
                        <Workflow className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-slate-900 dark:text-white text-[11px] truncate">
                            {bStep.title}
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-purple-500/10 text-purple-600 border border-purple-500/20 shrink-0">
                            Nested
                          </span>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-0.5 truncate">
                          {bStep.subtitle || `Wait up to ${bStep.config?.conditionTargetDays || 14} days`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleDuplicateStep(bStep)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded"
                        title="Duplicate"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteStep(bStep.id)}
                        className="text-slate-400 hover:text-rose-500 p-0.5 rounded"
                        title="Delete Condition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* SVG Fork Connecting Lines for Nested Condition */}
                <div className="w-full flex justify-center py-0.5">
                  <svg 
                    className="h-6 overflow-visible" 
                    style={{ width: `${subTotalW}px` }} 
                    viewBox={`0 0 ${subTotalW} 24`}
                  >
                    <path
                      d={`M ${subTotalW / 2} 0 C ${subTotalW / 2} 12, ${subYesW / 2} 12, ${subYesW / 2} 24`}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                    <path
                      d={`M ${subTotalW / 2} 0 C ${subTotalW / 2} 12, ${subYesW + 20 + subNoW / 2} 12, ${subYesW + 20 + subNoW / 2} 24`}
                      fill="none"
                      stroke="#f43f5e"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                  </svg>
                </div>

                {/* Sub-branches for nested condition */}
                <div 
                  className="flex items-start gap-5 pt-1 transition-all duration-200"
                  style={{ width: `${subTotalW}px` }}
                >
                  {/* Nested YES Branch */}
                  <div 
                    className="p-2.5 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/15 border border-emerald-200/50 dark:border-emerald-900/30 flex flex-col items-center transition-all shrink-0 min-w-0"
                    style={{ width: `${subYesW}px` }}
                  >
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-emerald-500 text-white shadow-2xs mb-1.5">
                      <Check className="w-2.5 h-2.5" /> YES
                    </div>
                    <div className="w-0.5 h-2 bg-emerald-400/80 dark:bg-emerald-600/80 mb-1" />
                    {renderBranchSteps(bStep.yesBranch, 'yes', bStep.id, depth + 1, bStep.title, bStep.yesBranchId || `${bStep.id}_yes`)}
                  </div>

                  {/* Nested NO Branch */}
                  <div 
                    className="p-2.5 rounded-xl bg-rose-50/40 dark:bg-rose-950/15 border border-rose-200/50 dark:border-rose-900/30 flex flex-col items-center transition-all shrink-0 min-w-0"
                    style={{ width: `${subNoW}px` }}
                  >
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-rose-500 text-white shadow-2xs mb-1.5">
                      <X className="w-2.5 h-2.5" /> NO
                    </div>
                    <div className="w-0.5 h-2 bg-rose-400/80 dark:bg-rose-600/80 mb-1" />
                    {renderBranchSteps(bStep.noBranch, 'no', bStep.id, depth + 1, bStep.title, bStep.noBranchId || `${bStep.id}_no`)}
                  </div>
                </div>

                {/* Downstream connection: Converging merge vs discrete continue */}
                {bIdx < branchSteps.length - 1 ? (
                  /* Condition Merges into next step in parent branch */
                  <div className="w-full flex flex-col items-center pt-2">
                    <div className="w-full flex justify-center">
                      <svg 
                        className="h-6 overflow-visible" 
                        style={{ width: `${subTotalW}px` }} 
                        viewBox={`0 0 ${subTotalW} 24`}
                      >
                        <path
                          d={`M ${subYesW / 2} 0 C ${subYesW / 2} 12, ${subTotalW / 2} 12, ${subTotalW / 2} 24`}
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                        <path
                          d={`M ${subYesW + 20 + subNoW / 2} 0 C ${subYesW + 20 + subNoW / 2} 12, ${subTotalW / 2} 12, ${subTotalW / 2} 24`}
                          fill="none"
                          stroke="#f43f5e"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                      </svg>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-white dark:bg-[#1A1A1A] border border-purple-300 dark:border-purple-800/60 text-purple-600 dark:text-purple-400 shadow-2xs z-10 -mt-1">
                      <GitMerge className="w-2.5 h-2.5 text-purple-500" />
                      <span>Merge &amp; Continue</span>
                    </div>
                    <div className="flex flex-col items-center relative py-1">
                      <div className={`w-0.5 h-3 ${lineColor}`} />
                      <button
                        type="button"
                        onClick={() => {
                          setActionPickerInsertionTarget({
                            branch: branchType,
                            parentConditionId: parentCondId,
                            parentBranchId: effectiveBranchId,
                            parentTitle,
                            index: bIdx + 1,
                          });
                          setIsActionPickerOpen(true);
                        }}
                        className={`w-4 h-4 rounded-full bg-white dark:bg-[#1E1E1E] border ${dotBorder} hover:scale-110 flex items-center justify-center -my-2 z-10 cursor-pointer shadow-xs transition-transform group`}
                        title="Insert Step into Merged Path"
                      >
                        <Plus className="w-2.5 h-2.5 group-hover:scale-110" />
                      </button>
                      <div className={`w-0.5 h-3 ${lineColor}`} />
                    </div>
                  </div>
                ) : (
                  /* Condition is terminal in this branch with optional continue */
                  <div className="w-full flex flex-col items-center pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActionPickerInsertionTarget({
                          branch: branchType,
                          parentConditionId: parentCondId,
                          parentBranchId: effectiveBranchId,
                          parentTitle,
                          index: bIdx + 1,
                        });
                        setIsActionPickerOpen(true);
                      }}
                      className="py-1 px-2.5 rounded-full border border-dashed border-purple-300/80 dark:border-purple-800/60 hover:border-purple-500 text-purple-600/90 dark:text-purple-400/90 hover:text-purple-500 hover:bg-purple-500/5 text-[9px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-all hover:scale-[1.02] shadow-2xs"
                      title="Merge sub-branches and continue this path"
                    >
                      <GitMerge className="w-2.5 h-2.5 text-purple-500" />
                      + Continue After Condition
                    </button>
                  </div>
                )}
              </div>
            );
          }

          // REGULAR ACTION STEP
          return (
            <div key={bStep.id} className="w-full flex flex-col items-center">
              <div
                onClick={() => setSelectedStepId(bStep.id)}
                className={`w-full max-w-[380px] p-3 rounded-xl bg-white dark:bg-[#181818] border transition-all cursor-pointer shadow-2xs overflow-hidden ${
                  isBSelected
                    ? isYes ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-rose-500 ring-2 ring-rose-500/20'
                    : isEndStep
                    ? 'border-rose-400/80 dark:border-rose-800/60'
                    : 'border-slate-200 dark:border-[#2C2C2C] hover:border-slate-300 dark:hover:border-[#383838]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className={`text-[9px] font-mono font-bold shrink-0 ${isYes ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
                      {bStep.timingLabel || 'Send immediately'}
                    </span>
                    {isEndStep && (
                      <span className="px-1.5 py-0.2 rounded text-[8px] font-extrabold bg-rose-500/10 text-rose-500 border border-rose-500/20 shrink-0">
                        End of Branch
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => handleMoveStep(bStep.id, 'up')}
                      disabled={bIdx === 0}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-20 p-0.5 rounded"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveStep(bStep.id, 'down')}
                      disabled={bIdx === branchSteps.length - 1}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-20 p-0.5 rounded"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateStep(bStep)}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 rounded"
                      title="Duplicate"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteStep(bStep.id)}
                      className="text-slate-400 hover:text-rose-500 p-0.5 rounded"
                      title="Delete Step"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 min-w-0">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border ${visuals.bgColor}`}>
                    <StepIcon className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200 truncate text-[11px]">
                    {bStep.title}
                  </span>
                </div>
              </div>

              {/* Connector: Between steps vs Leading to bottom add button */}
              {bIdx < branchSteps.length - 1 ? (
                <div className="flex flex-col items-center relative py-1">
                  <div className={`w-0.5 h-3 ${lineColor}`} />
                  <button
                    type="button"
                    onClick={() => {
                      setActionPickerInsertionTarget({
                        branch: branchType,
                        parentConditionId: parentCondId,
                        parentBranchId: effectiveBranchId,
                        parentTitle,
                        index: bIdx + 1,
                      });
                      setIsActionPickerOpen(true);
                    }}
                    className={`w-4 h-4 rounded-full bg-white dark:bg-[#1E1E1E] border ${dotBorder} hover:scale-110 flex items-center justify-center -my-2 z-10 cursor-pointer shadow-xs transition-transform group`}
                    title="Insert Step Here"
                  >
                    <Plus className="w-2.5 h-2.5 group-hover:scale-110" />
                  </button>
                  <div className={`w-0.5 h-3 ${lineColor}`} />
                </div>
              ) : (
                <div className={`w-0.5 h-3 ${lineColor} my-1`} />
              )}
            </div>
          );
        })}

        {/* Add Step button at bottom of branch (shown when branch does not end in a condition) */}
        {(!branchSteps.length || branchSteps[branchSteps.length - 1].type !== 'condition') && (
          <button
            type="button"
            onClick={() => {
              setActionPickerInsertionTarget({
                branch: branchType,
                parentConditionId: parentCondId,
                parentBranchId: effectiveBranchId,
                parentTitle,
              });
              setIsActionPickerOpen(true);
            }}
            className={`w-full max-w-[380px] py-2 rounded-xl border border-dashed ${accentBorder} ${accentText} ${accentHover} text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-2xs`}
          >
            <Plus className="w-3.5 h-3.5" /> Add {isYes ? 'YES' : 'NO'} Step
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full min-h-0 font-sans text-xs">
      
      {/* MAIN WORKSPACE: Flow Canvas (Left/Center) + Node Inspector (Right) */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch gap-4 min-h-0 h-full overflow-hidden">
        
        {/* Visual Node Flow Canvas Viewport (Permanently Fixed Viewport Frame) */}
        <div 
          ref={canvasViewportRef}
          data-canvas-bg="true"
          className={`flex-1 relative rounded-3xl bg-slate-50/50 dark:bg-[#111111] border border-slate-200/80 dark:border-[#242424] overflow-hidden select-none ${
            isPanning ? 'cursor-grabbing' : isSpacePressed ? 'cursor-grab' : 'cursor-default'
          }`}
        >
          {/* Infinite Moving Dot Grid Pattern */}
          <div 
            data-canvas-bg="true"
            className="absolute inset-0 opacity-[0.05] pointer-events-none transition-none" 
            style={{ 
              backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', 
              backgroundSize: `${24 * zoomScale}px ${24 * zoomScale}px`,
              backgroundPosition: `${pan.x}px ${pan.y}px` 
            }} 
          />

          {/* Interactive Canvas Background Catch-all Layer */}
          <div 
            data-canvas-bg="true"
            className="canvas-bg-layer absolute inset-0 z-0" 
          />

          {/* INFINITE CANVAS WORLD CONTAINER (Transformed with pan & zoom) */}
          <div 
            ref={canvasWorldRef}
            className={`absolute left-0 top-0 will-change-transform z-10 ${
              isPanning ? 'pointer-events-none' : ''
            }`}
            style={{ 
              transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoomScale})`,
              transformOrigin: '0 0'
            }}
          >
            {/* Flowchart Spine Centered on X=0 */}
            <div 
              className="w-max flex flex-col items-center space-y-4 pb-72 px-8"
              style={{ transform: 'translateX(-50%)' }}
            >
            
            {/* Root Trigger Node (Start: Enrolled Leads) - Controlled Fixed Sizing */}
            <div className="w-[480px] max-w-full p-4 rounded-2xl bg-white dark:bg-[#181818] border-2 border-emerald-500/40 dark:border-emerald-500/30 shadow-md shadow-emerald-500/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center font-bold shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 dark:text-white text-xs">
                      Trigger: Campaign Launch
                    </span>
                    <span className="px-1.5 py-0.2 rounded-md text-[9px] font-bold bg-emerald-500/10 text-emerald-500">
                      Auto-Start
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {leadCount} leads enrolled · Sender: <span className="font-semibold text-slate-700 dark:text-slate-300">{accountName}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold block">
                  {leadCount} Prospects Ready
                </span>
                <span className="text-[9px] text-slate-400">Deduped & Validated</span>
              </div>
            </div>

            {/* SVG Connector from Root Node to Sequence */}
            <div className="flex flex-col items-center relative py-1">
              <div className="w-0.5 h-6 bg-slate-300 dark:bg-[#333]" />
              {/* Inline Insert Step Button */}
              <button
                type="button"
                onClick={() => {
                  setActionPickerInsertionTarget({ branch: 'main', index: 0 });
                  setIsActionPickerOpen(true);
                }}
                className="w-5 h-5 rounded-full bg-white dark:bg-[#202020] border border-slate-300 dark:border-[#383838] hover:border-emerald-500 text-slate-400 hover:text-emerald-500 shadow-2xs flex items-center justify-center transition-all cursor-pointer -my-2.5 z-20 group"
                title="Insert Step Here"
              >
                <Plus className="w-3 h-3 group-hover:scale-125 transition-transform" />
              </button>
              <div className="w-0.5 h-6 bg-slate-300 dark:bg-[#333]" />
            </div>

            {/* Sequence Steps Render Loop */}
            {sequence.map((step, idx) => {
              const isSelected = selectedStepId === step.id;
              const visuals = getNodeVisuals(step.type);
              const NodeIcon = visuals.icon;

              // RENDER CONDITION BRANCH NODE (n8n Style)
              if (step.type === 'condition') {
                return (
                  <div key={step.id} className="flex flex-col items-center space-y-4 shrink-0">
                    
                    {/* Condition Diamond/Card - Fixed Controlled Sizing */}
                    <div
                      onClick={() => setSelectedStepId(step.id)}
                      className={`w-[480px] max-w-full p-4 rounded-2xl bg-white dark:bg-[#181818] border-2 transition-all cursor-pointer shadow-sm relative shrink-0 ${
                        isSelected
                          ? 'border-emerald-500 ring-4 ring-emerald-500/15 shadow-md shadow-emerald-500/10'
                          : 'border-purple-300/70 dark:border-purple-900/50 hover:border-purple-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${visuals.bgColor}`}>
                            <Workflow className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900 dark:text-white text-xs">
                                {step.title}
                              </span>
                              <Badge variant="purple" size="sm">
                                Conditional Split
                              </Badge>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {step.subtitle || `Wait up to ${step.config?.conditionTargetDays || 30} days`}
                            </p>
                          </div>
                        </div>

                        {/* Node Card Controls */}
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => handleDuplicateStep(step)}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-[#252525] transition-colors"
                            title="Duplicate Condition"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteStep(step.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                            title="Delete Condition"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Branching Split Container: YES vs NO Forks - Dynamically Sized Columns */}
                    {(() => {
                      const rootYesWidth = getBranchLayoutWidth(step.yesBranch);
                      const rootNoWidth = getBranchLayoutWidth(step.noBranch);
                      const rootTotalWidth = Math.max(640, rootYesWidth + rootNoWidth + 24);

                      return (
                        <>
                          <div 
                            className="max-w-none relative pt-2 shrink-0 transition-all duration-200"
                            style={{ width: `${rootTotalWidth}px`, minWidth: '640px' }}
                          >
                            {/* SVG Fork Connecting Lines */}
                            <div className="w-full flex justify-center">
                              <svg 
                                className="h-8 overflow-visible" 
                                style={{ width: `${rootTotalWidth}px` }} 
                                viewBox={`0 0 ${rootTotalWidth} 32`}
                              >
                                <path
                                  d={`M ${rootTotalWidth / 2} 0 C ${rootTotalWidth / 2} 16, ${rootYesWidth / 2} 16, ${rootYesWidth / 2} 32`}
                                  fill="none"
                                  stroke="#10b981"
                                  strokeWidth="2"
                                  strokeDasharray="4 2"
                                />
                                <path
                                  d={`M ${rootTotalWidth / 2} 0 C ${rootTotalWidth / 2} 16, ${rootYesWidth + 24 + rootNoWidth / 2} 16, ${rootYesWidth + 24 + rootNoWidth / 2} 32`}
                                  fill="none"
                                  stroke="#f43f5e"
                                  strokeWidth="2"
                                  strokeDasharray="4 2"
                                />
                              </svg>
                            </div>

                            {/* Two Sub-Columns: YES (Left) & NO (Right) - Dynamically Growing Containers */}
                            <div 
                              className="flex items-start gap-6 pt-1 transition-all duration-200"
                              style={{ width: `${rootTotalWidth}px` }}
                            >
                              {/* LEFT COLUMN: YES Branch (Path taken when condition succeeds) */}
                              <div 
                                className="flex flex-col items-center space-y-2 p-3.5 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/15 border border-emerald-200/60 dark:border-emerald-900/30 transition-all shrink-0 min-w-0"
                                style={{ width: `${rootYesWidth}px` }}
                              >
                                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500 text-white shadow-2xs">
                                  <Check className="w-3 h-3" /> YES (Condition Met)
                                </div>

                                {/* Connector from header to branch steps */}
                                <div className="w-0.5 h-3 bg-emerald-400/80 dark:bg-emerald-600/80" />

                                {/* Steps inside YES branch */}
                                {renderBranchSteps(step.yesBranch, 'yes', step.id, 1, step.title, step.yesBranchId || `${step.id}_yes`)}
                              </div>

                              {/* RIGHT COLUMN: NO Branch (Fallback path) */}
                              <div 
                                className="flex flex-col items-center space-y-2 p-3.5 rounded-2xl bg-rose-50/40 dark:bg-rose-950/15 border border-rose-200/60 dark:border-rose-900/30 transition-all shrink-0 min-w-0"
                                style={{ width: `${rootNoWidth}px` }}
                              >
                                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white shadow-2xs">
                                  <X className="w-3 h-3" /> NO (Timeout / Rejected)
                                </div>

                                {/* Connector from header to branch steps */}
                                <div className="w-0.5 h-3 bg-rose-400/80 dark:bg-rose-600/80" />

                                {/* Steps inside NO branch */}
                                {renderBranchSteps(step.noBranch, 'no', step.id, 1, step.title, step.noBranchId || `${step.id}_no`)}
                              </div>

                            </div>
                          </div>

                          {/* MERGE VS CLEAN TERMINATION */}
                          {idx < sequence.length - 1 ? (
                            /* REAL MERGE: Visually connects both YES and NO paths into center continuation node */
                            <div 
                              className="max-w-none flex flex-col items-center pt-2 shrink-0 transition-all duration-200"
                              style={{ width: `${rootTotalWidth}px`, minWidth: '640px' }}
                            >
                              <div className="w-full flex justify-center">
                                <svg 
                                  className="h-8 overflow-visible" 
                                  style={{ width: `${rootTotalWidth}px` }} 
                                  viewBox={`0 0 ${rootTotalWidth} 32`}
                                >
                                  <path
                                    d={`M ${rootYesWidth / 2} 0 C ${rootYesWidth / 2} 20, ${rootTotalWidth / 2} 12, ${rootTotalWidth / 2} 32`}
                                    fill="none"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    strokeDasharray="4 2"
                                  />
                                  <path
                                    d={`M ${rootYesWidth + 24 + rootNoWidth / 2} 0 C ${rootYesWidth + 24 + rootNoWidth / 2} 20, ${rootTotalWidth / 2} 12, ${rootTotalWidth / 2} 32`}
                                    fill="none"
                                    stroke="#f43f5e"
                                    strokeWidth="2"
                                    strokeDasharray="4 2"
                                  />
                                </svg>
                              </div>

                              {/* Merge Continuation Node */}
                              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-white dark:bg-[#1A1A1A] border border-purple-300 dark:border-purple-800/60 text-purple-600 dark:text-purple-400 shadow-xs z-10">
                                <GitMerge className="w-3 h-3 text-purple-500" />
                                <span>Branches Merge &amp; Continue</span>
                              </div>

                              {/* Connector line down to next step */}
                              <div className="flex flex-col items-center relative py-1">
                                <div className="w-0.5 h-4 bg-slate-300 dark:bg-[#333]" />
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActionPickerInsertionTarget({ branch: 'main', index: idx + 1 });
                                    setIsActionPickerOpen(true);
                                  }}
                                  className="w-5 h-5 rounded-full bg-white dark:bg-[#202020] border border-slate-300 dark:border-[#383838] hover:border-emerald-500 text-slate-400 hover:text-emerald-500 shadow-2xs flex items-center justify-center transition-all cursor-pointer -my-2.5 z-20 group"
                                  title="Insert Step into Merged Path"
                                >
                                  <Plus className="w-3 h-3 group-hover:scale-125 transition-transform" />
                                </button>
                                <div className="w-0.5 h-4 bg-slate-300 dark:bg-[#333]" />
                              </div>
                            </div>
                          ) : (
                            /* NO MERGE: Both branches terminate cleanly. Optional discrete merge action */
                            <div 
                              className="max-w-none flex flex-col items-center pt-2 pb-1 shrink-0 transition-all duration-200"
                              style={{ width: `${rootTotalWidth}px`, minWidth: '640px' }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setActionPickerInsertionTarget({ branch: 'main', index: idx + 1 });
                                  setIsActionPickerOpen(true);
                                }}
                                className="py-1.5 px-3 rounded-full border border-dashed border-purple-300/80 dark:border-purple-800/60 hover:border-purple-500 text-purple-600/90 dark:text-purple-400/90 hover:text-purple-500 hover:bg-purple-500/5 text-[10px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02] shadow-2xs"
                                title="Merge both YES and NO paths into a shared continuation step"
                              >
                                <GitMerge className="w-3 h-3 text-purple-500" />
                                + Merge Paths &amp; Continue Flow
                              </button>
                            </div>
                          )}
                        </>
                      );
                    })()}

                  </div>
                );
              }

              // RENDER LINEAR ACTION NODE (Profile Visit, Connect, Message, InMail, Email, Delay)
              return (
                <div key={step.id} className="w-[480px] max-w-full flex flex-col items-center space-y-2 shrink-0">
                  
                  {/* Step Card - Controlled Fixed Sizing */}
                  <div
                    onClick={() => setSelectedStepId(step.id)}
                    className={`w-full p-4 rounded-2xl bg-white dark:bg-[#181818] border-2 transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'border-emerald-500 ring-4 ring-emerald-500/15 shadow-md shadow-emerald-500/10'
                        : 'border-slate-200/90 dark:border-[#282828] hover:border-slate-300 dark:hover:border-[#383838]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${visuals.bgColor}`}>
                          <NodeIcon className="w-4 h-4" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 dark:text-white text-xs">
                              {step.title}
                            </span>
                            <Badge variant={step.type === 'connect' ? 'emerald' : step.type === 'email' ? 'cyan' : 'slate'} size="sm">
                              {visuals.badgeText}
                            </Badge>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[280px]">
                            {step.subtitle || step.config?.note || step.config?.body || 'Configured action'}
                          </p>
                        </div>
                      </div>

                      {/* Right controls: timing pill + move / duplicate / delete buttons */}
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {step.timingLabel && (
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-slate-300 font-mono text-[10px] font-semibold">
                            {step.timingLabel}
                          </span>
                        )}

                        <div className="flex items-center gap-0.5">
                          <button
                            type="button"
                            onClick={() => handleMoveStep(step.id, 'up')}
                            disabled={idx === 0}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-20 rounded"
                            title="Move Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveStep(step.id, 'down')}
                            disabled={idx === sequence.length - 1}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 disabled:opacity-20 rounded"
                            title="Move Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicateStep(step)}
                            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteStep(step.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Note/Body snippet preview if present */}
                    {(step.config?.note || step.config?.body) && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-[#222] text-[10px] text-slate-500 dark:text-slate-400 font-mono line-clamp-1">
                        "{step.config.note || step.config.body}"
                      </div>
                    )}
                  </div>

                  {/* Flow Connector Line with Inline Add Button */}
                  {idx < sequence.length - 1 && (
                    <div className="flex flex-col items-center relative py-1">
                      <div className="w-0.5 h-6 bg-slate-300 dark:bg-[#333]" />
                      <button
                        type="button"
                        onClick={() => {
                          setActionPickerInsertionTarget({ branch: 'main', index: idx + 1 });
                          setIsActionPickerOpen(true);
                        }}
                        className="w-5 h-5 rounded-full bg-white dark:bg-[#202020] border border-slate-300 dark:border-[#383838] hover:border-emerald-500 text-slate-400 hover:text-emerald-500 shadow-2xs flex items-center justify-center transition-all cursor-pointer -my-2.5 z-20 group"
                        title="Insert Step Here"
                      >
                        <Plus className="w-3 h-3 group-hover:scale-125 transition-transform" />
                      </button>
                      <div className="w-0.5 h-6 bg-slate-300 dark:bg-[#333]" />
                    </div>
                  )}

                </div>
              );
            })}

            {/* Bottom "+ Add Step to Automation Flow" Button - Rendered only when sequence does NOT end with a condition */}
            {sequence.length > 0 && sequence[sequence.length - 1].type !== 'condition' && (
              <div className="w-[480px] max-w-full flex flex-col items-center pt-2 shrink-0">
                <div className="w-0.5 h-6 bg-slate-300 dark:bg-[#333]" />
                <button
                  type="button"
                  onClick={() => {
                    setActionPickerInsertionTarget({ branch: 'main' });
                    setIsActionPickerOpen(true);
                  }}
                  className="w-full py-3 rounded-2xl bg-white dark:bg-[#181818] border-2 border-dashed border-slate-300 dark:border-[#303030] hover:border-emerald-500 text-slate-700 dark:text-slate-300 hover:text-emerald-500 shadow-xs font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01]"
                >
                  <Plus className="w-4 h-4 text-emerald-500" />
                  Add Step to Automation Flow
                </button>
              </div>
            )}

          </div>
        </div>

        {/* PERMANENTLY FIXED OVERLAYS: Anchored to Non-Scrolling Viewport Frame */}

        {/* Floating Top-Right Compact Step Count Indicator */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 select-none pointer-events-auto">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/90 dark:bg-[#1A1A1A]/90 backdrop-blur-md border border-slate-200/90 dark:border-[#2C2C2C] text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-bold shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>{totalStepCount} Steps Active</span>
          </div>
        </div>

        {/* Floating Bottom-Left Permanently Fixed Compact Zoom & Pan Controls */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center bg-white/95 dark:bg-[#1A1A1A]/95 backdrop-blur-md border border-slate-200/90 dark:border-[#2C2C2C] rounded-xl p-1 shadow-lg shadow-black/10 gap-0.5 select-none pointer-events-auto">
          <button
            type="button"
            onClick={() => handleZoomChange(Math.max(0.4, +(zoomScale - 0.1).toFixed(2)))}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-[#282828] transition-colors cursor-pointer"
            title="Zoom Out (Ctrl + Wheel Down)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-300 font-bold min-w-[38px] text-center">
            {Math.round(zoomScale * 100)}%
          </span>
          <button
            type="button"
            onClick={() => handleZoomChange(Math.min(1.5, +(zoomScale + 0.1).toFixed(2)))}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-[#282828] transition-colors cursor-pointer"
            title="Zoom In (Ctrl + Wheel Up)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <div className="w-[1px] h-3.5 bg-slate-200 dark:bg-[#333] mx-1" />
          <button
            type="button"
            onClick={handleResetView}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-[#282828] transition-colors cursor-pointer"
            title="Recenter Workflow & Reset Zoom (Ctrl + 0)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

        {/* 3. NODE CONFIGURATION INSPECTOR DRAWER (Right Sidebar) */}
        {selectedStep ? (
          <div className="w-full lg:w-[420px] xl:w-[460px] 2xl:w-[480px] rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#262626] shadow-md p-5 sm:p-6 flex flex-col space-y-4 shrink-0 overflow-y-auto">
            
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#262626]">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center border ${getNodeVisuals(selectedStep.type).bgColor}`}>
                  {React.createElement(getNodeVisuals(selectedStep.type).icon, { className: 'w-4 h-4' })}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                    Node Inspector
                  </h4>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                    {getNodeVisuals(selectedStep.type).badgeText}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedStepId(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-[#252525] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step Title Editor */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                Step Display Label
              </label>
              <input
                type="text"
                value={selectedStep.title}
                onChange={(e) => handleUpdateSelectedStep({ title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-medium focus:outline-hidden focus:border-emerald-500 text-xs"
              />
            </div>

            {/* Delay / Timing Configuration */}
            {selectedStep.type !== 'condition' && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Execution Delay / Timing
                </label>
                <select
                  value={selectedStep.timingLabel || 'Send immediately'}
                  onChange={(e) => handleUpdateSelectedStep({ timingLabel: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-medium focus:outline-hidden focus:border-emerald-500 text-xs cursor-pointer"
                >
                  <option value="Send immediately">Send immediately</option>
                  <option value="Wait 1 hour">Wait 1 hour</option>
                  <option value="Wait 2 hours">Wait 2 hours</option>
                  <option value="Wait 4 hours">Wait 4 hours</option>
                  <option value="Wait 1 day">Wait 1 business day</option>
                  <option value="Wait 2 days">Wait 2 business days</option>
                  <option value="Wait 3 days">Wait 3 business days</option>
                  <option value="Wait 5 days">Wait 5 business days</option>
                </select>
                <span className="text-[10px] text-slate-400">
                  Delay is counted from completion of the previous step.
                </span>
              </div>
            )}

            {/* Condition Parameters (for Condition Steps) */}
            {selectedStep.type === 'condition' && (
              <div className="space-y-3 p-3 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-purple-900 dark:text-purple-300">
                    Condition Trigger Rule
                  </label>
                  <select
                    value={selectedStep.config?.conditionType || 'invite_accepted'}
                    onChange={(e) =>
                      handleUpdateSelectedStep({
                        config: {
                          ...selectedStep.config,
                          conditionType: e.target.value as any,
                        },
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-purple-200 dark:border-purple-900/60 text-slate-900 dark:text-white text-xs cursor-pointer"
                  >
                    <optgroup label="Network & Contact Rules">
                      <option value="connected">Is in LinkedIn network (1st)</option>
                      <option value="invite_accepted">Accepted invite (Within window)</option>
                      <option value="has_email">Has email address</option>
                      <option value="has_linkedin">Has LinkedIn URL</option>
                      <option value="has_phone">Has phone number</option>
                      <option value="has_whatsapp">Has WhatsApp account</option>
                      <option value="variable_match">Lead variable</option>
                      <option value="score_threshold">Has score</option>
                    </optgroup>
                    <optgroup label="Outreach & Engagement Rules">
                      <option value="email_opened">Opened email</option>
                      <option value="email_clicked">Clicked on link in email</option>
                      <option value="email_unsubscribed">Unsubscribe from email</option>
                      <option value="meeting_booked">Booked a meeting</option>
                      <option value="message_opened">Opened LinkedIn message</option>
                      <option value="call_status">Call status</option>
                      <option value="replied">Prospect Sent Any Reply</option>
                      <option value="has_profile">Profile Is Accessible</option>
                    </optgroup>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-purple-900 dark:text-purple-300">
                    Evaluation Window (Days)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={selectedStep.config?.conditionTargetDays || 14}
                    onChange={(e) =>
                      handleUpdateSelectedStep({
                        config: {
                          ...selectedStep.config,
                          conditionTargetDays: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-purple-200 dark:border-purple-900/60 text-slate-900 dark:text-white text-xs font-mono"
                  />
                  <span className="text-[10px] text-slate-400">
                    If condition evaluates to TRUE within this period, proceed to YES branch. Otherwise, divert to NO branch.
                  </span>
                </div>
              </div>
            )}

            {/* InMail & Email Subject Line Field */}
            {(selectedStep.type === 'inmail' || selectedStep.type === 'email') && (
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                  Subject Line
                </label>
                <input
                  type="text"
                  placeholder="e.g. Quick inquiry regarding {{companyName}}"
                  value={selectedStep.config?.subject || ''}
                  onChange={(e) =>
                    handleUpdateSelectedStep({
                      config: {
                        ...selectedStep.config,
                        subject: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-medium focus:outline-hidden focus:border-emerald-500 text-xs"
                />
              </div>
            )}

            {/* Webhook API Action Config */}
            {selectedStep.type === 'call_api' && (
              <div className="space-y-3 p-3 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-900/40">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-sky-900 dark:text-sky-300">
                    Endpoint URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://api.yourdomain.com/webhook/lead"
                    value={selectedStep.config?.apiUrl || ''}
                    onChange={(e) =>
                      handleUpdateSelectedStep({
                        config: { ...selectedStep.config, apiUrl: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-sky-200 dark:border-sky-900/60 text-slate-900 dark:text-white text-xs font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-sky-900 dark:text-sky-300">
                    HTTP Method
                  </label>
                  <select
                    value={selectedStep.config?.apiMethod || 'POST'}
                    onChange={(e) =>
                      handleUpdateSelectedStep({
                        config: { ...selectedStep.config, apiMethod: e.target.value as any },
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-sky-200 dark:border-sky-900/60 text-slate-900 dark:text-white text-xs cursor-pointer"
                  >
                    <option value="POST">POST (Lead payload JSON)</option>
                    <option value="GET">GET (Query params)</option>
                    <option value="PUT">PUT (Update resource)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Campaign Routing Config */}
            {selectedStep.type === 'send_to_campaign' && (
              <div className="space-y-2 p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40">
                <label className="text-[11px] font-bold text-indigo-900 dark:text-indigo-300">
                  Target Destination Campaign
                </label>
                <input
                  type="text"
                  placeholder="e.g. Enterprise Inbound Nurture"
                  value={selectedStep.config?.campaignTargetName || ''}
                  onChange={(e) =>
                    handleUpdateSelectedStep({
                      config: { ...selectedStep.config, campaignTargetName: e.target.value },
                    })
                  }
                  className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-indigo-200 dark:border-indigo-900/60 text-slate-900 dark:text-white text-xs"
                />
                <span className="text-[10px] text-slate-400">
                  When reached, lead will be automatically enrolled into this sequence.
                </span>
              </div>
            )}

            {/* Manual Task Config */}
            {selectedStep.type === 'create_task' && (
              <div className="space-y-3 p-3 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                    Task Title / Summary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Manual phone research for {{firstName}}"
                    value={selectedStep.config?.taskTitle || ''}
                    onChange={(e) =>
                      handleUpdateSelectedStep({
                        config: { ...selectedStep.config, taskTitle: e.target.value },
                      })
                    }
                    className="w-full px-3 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-amber-200 dark:border-amber-900/60 text-slate-900 dark:text-white text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                    Due in Days
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={14}
                    value={selectedStep.config?.taskDueDateDays || 1}
                    onChange={(e) =>
                      handleUpdateSelectedStep({
                        config: { ...selectedStep.config, taskDueDateDays: Number(e.target.value) },
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-amber-200 dark:border-amber-900/60 text-slate-900 dark:text-white text-xs font-mono"
                  />
                </div>
              </div>
            )}

            {/* Smart Lead Enrichment Config (Requires 3 Credits matching AdminCreditsView) */}
            {selectedStep.type === 'lead_enrichment' && (
              <div className="space-y-3 p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/25 border border-amber-300 dark:border-amber-800/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-300 text-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    Enrichment Engine
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-white shadow-2xs">
                    ⚡ 3 Credits / Lead
                  </span>
                </div>
                <p className="text-[10px] text-amber-800 dark:text-amber-300/80 leading-relaxed">
                  Requires <strong>3 Credits</strong> per prospect (matching the rate in AdminCreditsView). Automatically finds verified direct dials, corporate email addresses, and firmographics before next step.
                </p>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Data Scope
                  </label>
                  <select
                    value={selectedStep.config?.enrichmentType || 'all'}
                    onChange={(e) =>
                      handleUpdateSelectedStep({
                        config: { ...selectedStep.config, enrichmentType: e.target.value as any },
                      })
                    }
                    className="w-full px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2C2C2C] text-slate-900 dark:text-white text-xs cursor-pointer"
                  >
                    <option value="all">Full Enrichment (Email + Direct Phone + Firmographics)</option>
                    <option value="emails">Corporate Email Only</option>
                    <option value="phones">Direct Mobile Phone Only</option>
                    <option value="profiles">LinkedIn Company & Profile Only</option>
                  </select>
                </div>
              </div>
            )}

            {/* Verify Email Deliverability Config */}
            {selectedStep.type === 'verify_email' && (
              <div className="p-3.5 rounded-2xl bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/50 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-cyan-900 dark:text-cyan-300 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
                  Real-Time Hygiene Gateway
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Executes MX record query, disposable domain filtering, and real-time SMTP handshake. Protects sender reputation by terminating bounces before outbound emails are scheduled.
                </p>
              </div>
            )}

            {/* AI Intent & Tone Analysis Config */}
            {selectedStep.type === 'ai_intent' && (
              <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-purple-900 dark:text-purple-300 text-xs">
                  <Brain className="w-3.5 h-3.5 text-purple-500" />
                  Neural Persona Analyzer
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Parses prospect recent posts, bio, and company positioning to generate high-conversion conversation starters and predictive objection tokens.
                </p>
              </div>
            )}

            {/* Message / Note Content Editor (Connect, Message, InMail, Email, WhatsApp, SMS, Voice, Comment, Call) */}
            {(selectedStep.type === 'connect' ||
              selectedStep.type === 'message' ||
              selectedStep.type === 'followup' ||
              selectedStep.type === 'inmail' ||
              selectedStep.type === 'email' ||
              selectedStep.type === 'whatsapp_message' ||
              selectedStep.type === 'whatsapp_voice' ||
              selectedStep.type === 'sms' ||
              selectedStep.type === 'call' ||
              selectedStep.type === 'voice_note' ||
              selectedStep.type === 'ai_voice' ||
              selectedStep.type === 'comment') && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    {selectedStep.type === 'connect'
                      ? 'Connection Invitation Note'
                      : selectedStep.type === 'email'
                      ? 'Email Body (Markdown supported)'
                      : selectedStep.type === 'whatsapp_message'
                      ? 'WhatsApp Message Body'
                      : selectedStep.type === 'sms'
                      ? 'SMS Text Body'
                      : selectedStep.type === 'voice_note' || selectedStep.type === 'ai_voice' || selectedStep.type === 'whatsapp_voice'
                      ? 'Voice Memo Script'
                      : selectedStep.type === 'comment'
                      ? 'Post Comment Content'
                      : selectedStep.type === 'call'
                      ? 'Dialer Call Script / Prompt'
                      : 'Message Content'}
                  </label>

                  {/* Sample Lead Preview Switch */}
                  <button
                    type="button"
                    onClick={() => setIsPreviewingSampleLead(!isPreviewingSampleLead)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                      isPreviewingSampleLead
                        ? 'bg-purple-500/10 text-purple-600 border-purple-500/20'
                        : 'text-slate-400 hover:text-slate-600 border-transparent'
                    }`}
                  >
                    {isPreviewingSampleLead ? '● Preview Mode' : '○ Raw Edit Mode'}
                  </button>
                </div>

                {/* Variable Token Insertion Chips */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { token: '{{firstName}}', label: 'First Name' },
                    { token: '{{lastName}}', label: 'Last Name' },
                    { token: '{{companyName}}', label: 'Company' },
                    { token: '{{jobTitle}}', label: 'Job Title' },
                    { token: '{{industry}}', label: 'Industry' },
                  ].map((v) => (
                    <button
                      key={v.token}
                      type="button"
                      onClick={() => {
                        const current =
                          selectedStep.type === 'connect'
                            ? selectedStep.config?.note || ''
                            : selectedStep.config?.body || '';
                        const updated = `${current} ${v.token}`.trim();
                        handleUpdateSelectedStep({
                          config: {
                            ...selectedStep.config,
                            [selectedStep.type === 'connect' ? 'note' : 'body']: updated,
                          },
                        });
                      }}
                      className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#202020] hover:bg-emerald-500/10 hover:text-emerald-500 text-slate-600 dark:text-slate-300 text-[10px] font-mono transition-colors cursor-pointer border border-transparent hover:border-emerald-500/20"
                    >
                      + {v.token}
                    </button>
                  ))}
                </div>

                {/* Textarea or Preview */}
                {isPreviewingSampleLead ? (
                  <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-900/40 text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans text-xs leading-relaxed min-h-[120px]">
                    <div className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold mb-1.5">
                      Preview for: {SAMPLE_LEAD.firstName} {SAMPLE_LEAD.lastName} ({SAMPLE_LEAD.companyName})
                    </div>
                    {renderSamplePreview(
                      selectedStep.type === 'connect'
                        ? selectedStep.config?.note
                        : selectedStep.config?.body
                    ) || <span className="text-slate-400 italic">No message written yet.</span>}
                  </div>
                ) : (
                  <textarea
                    rows={selectedStep.type === 'connect' ? 4 : 6}
                    value={
                      selectedStep.type === 'connect'
                        ? selectedStep.config?.note || ''
                        : selectedStep.config?.body || ''
                    }
                    onChange={(e) =>
                      handleUpdateSelectedStep({
                        config: {
                          ...selectedStep.config,
                          [selectedStep.type === 'connect' ? 'note' : 'body']: e.target.value,
                        },
                      })
                    }
                    placeholder={
                      selectedStep.type === 'connect'
                        ? 'Hi {{firstName}}, noticed your work at {{companyName}}...'
                        : 'Hi {{firstName}},\n\nSaw what your team is building...'
                    }
                    className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-sans text-xs focus:outline-hidden focus:border-emerald-500"
                  />
                )}

                {/* Character Count & AI Polish Bar */}
                <div className="flex items-center justify-between text-[11px]">
                  <span
                    className={`font-mono ${
                      selectedStep.type === 'connect' &&
                      (selectedStep.config?.note?.length || 0) > 300
                        ? 'text-rose-500 font-bold'
                        : 'text-slate-400'
                    }`}
                  >
                    {selectedStep.type === 'connect'
                      ? `${selectedStep.config?.note?.length || 0} / 300 characters`
                      : `${selectedStep.config?.body?.length || 0} characters`}
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      const polished =
                        selectedStep.type === 'connect'
                          ? `Hi {{firstName}}, noticed what you're leading at {{companyName}}. Would love to connect and share notes on enterprise outbound!`
                          : `Hi {{firstName}},\n\nThanks for connecting! Scaling multi-channel outbound is tricky—we recently helped similar growth teams 3x reply rates.\n\nOpen to comparing playbooks sometime this week?`;
                      handleUpdateSelectedStep({
                        config: {
                          ...selectedStep.config,
                          [selectedStep.type === 'connect' ? 'note' : 'body']: polished,
                        },
                      });
                      success('Message humanized and polished.', 'AI Polish Applied');
                    }}
                    className="flex items-center gap-1 text-purple-600 dark:text-purple-400 font-bold hover:underline cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" /> AI Polish
                  </button>
                </div>
              </div>
            )}

            {/* Node Operations Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-[#262626] flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                leftIcon={<Copy className="w-3.5 h-3.5" />}
                onClick={() => handleDuplicateStep(selectedStep)}
              >
                Duplicate
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="flex-1"
                leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={() => handleDeleteStep(selectedStep.id)}
              >
                Delete
              </Button>
            </div>

          </div>
        ) : (
          <div className="w-full lg:w-[420px] xl:w-[460px] 2xl:w-[480px] rounded-3xl bg-slate-50/50 dark:bg-[#141414] border border-dashed border-slate-200 dark:border-[#262626] p-6 flex flex-col items-center justify-center text-center space-y-3 shrink-0">
            <Workflow className="w-8 h-8 text-slate-400" />
            <span className="font-bold text-slate-800 dark:text-slate-200">
              No Step Selected
            </span>
            <p className="text-[11px] text-slate-400 max-w-[240px]">
              Click on any action node or condition card in the canvas to configure delay timing, messages, and branch rules.
            </p>
          </div>
        )}

      </div>

      {/* 4. ACTION PICKER MODAL ("+ Add Step") */}
      <Modal
        isOpen={isActionPickerOpen}
        onClose={() => {
          setIsActionPickerOpen(false);
          setShowMoreActions(false);
        }}
        title={showMoreActions ? "More Actions & Branch Conditions" : "Add Step to LinkedIn Sequence"}
        description={
          showMoreActions
            ? "Select from 35 advanced multi-channel actions, conditional gates, and AI enrichments."
            : "Select a multi-channel action, delay, or condition branch to expand your outreach flow."
        }
        size={showMoreActions ? "xl" : "lg"}
      >
        <div className="space-y-4 font-sans text-xs">

          {/* Target Insertion Indicator */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#282828] text-xs">
            <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Inserting into:</span>
            {actionPickerInsertionTarget.branch === 'main' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                <Workflow className="w-3 h-3" />
                Main Sequence Flow
              </span>
            ) : actionPickerInsertionTarget.branch === 'yes' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3 h-3" />
                YES Branch {actionPickerInsertionTarget.parentTitle ? `(${actionPickerInsertionTarget.parentTitle})` : ''}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                <X className="w-3 h-3" />
                NO Branch {actionPickerInsertionTarget.parentTitle ? `(${actionPickerInsertionTarget.parentTitle})` : ''}
              </span>
            )}
          </div>

          {/* VIEW A: DEFAULT QUICK STEP VIEW (Preserves original 9 visible options exactly + More card at bottom) */}
          {!showMoreActions ? (
            <>
              {/* LinkedIn Channel Actions */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  LinkedIn Native Actions
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleAddStepFromPicker(
                        'visit',
                        'Visit Profile',
                        'Stealth profile viewing via residential proxy'
                      )
                    }
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/10 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Eye className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Visit Profile</div>
                      <div className="text-[10px] text-slate-400">Generates a notification on prospect device</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddStepFromPicker(
                        'connect',
                        'Connection Request',
                        'Send 1st-degree connection invitation with note'
                      )
                    }
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/10 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <UserPlus className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Send Connection Request</div>
                      <div className="text-[10px] text-slate-400">Invite with customized note (300 chars max)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddStepFromPicker(
                        'message',
                        'LinkedIn Chat Message',
                        'Direct message in 1st-degree conversation'
                      )
                    }
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/10 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Direct Message</div>
                      <div className="text-[10px] text-slate-400">Value message with personalization tags</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddStepFromPicker(
                        'inmail',
                        'Send LinkedIn InMail',
                        'Direct outreach to out-of-network leads'
                      )
                    }
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/10 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">LinkedIn InMail</div>
                      <div className="text-[10px] text-slate-400">Reaches inboxes even if invite is pending</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddStepFromPicker(
                        'like_post',
                        'Like Recent Post',
                        'Engage with latest published article or post'
                      )
                    }
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/10 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <ThumbsUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Like Recent Post</div>
                      <div className="text-[10px] text-slate-400">Organic engagement touchpoint</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddStepFromPicker(
                        'endorse',
                        'Endorse Top Skills',
                        'Endorse 1-3 highlighted skills'
                      )
                    }
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/10 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Endorse Top Skills</div>
                      <div className="text-[10px] text-slate-400">Warm touch before reaching out</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Omni-Channel Email Action */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Omni-Channel Email Touchpoint
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleAddStepFromPicker(
                        'email',
                        'Send Cold Email',
                        'Cross-channel email touchpoint'
                      )
                    }
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-cyan-500 hover:bg-cyan-50/10 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Send className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Send Cold Email</div>
                      <div className="text-[10px] text-slate-400">Delivered via Outtricks connected email pool</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleAddStepFromPicker(
                        'delay',
                        'Wait Delay',
                        'Configurable pacing wait period'
                      )
                    }
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-[#202020] text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-slate-500/10 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Wait Delay Period</div>
                      <div className="text-[10px] text-slate-400">Pause execution for hours or business days</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Condition Branching */}
              <div className="space-y-2">
                <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                  Smart Branching Conditions
                </h5>
                <div className="grid grid-cols-1 gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      handleAddStepFromPicker(
                        'condition',
                        'If Invitation Accepted',
                        'Branch into YES (Chat Message) and NO (Fallback / End)',
                        true
                      )
                    }
                    className="p-3 rounded-xl border border-purple-200 dark:border-purple-900/60 hover:border-purple-500 hover:bg-purple-50/10 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Workflow className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">
                        IF Invitation Accepted within X Days
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Creates parallel YES and NO execution branches for smart lead nurturing
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Compact "More" Card at Bottom */}
              <div className="pt-2 border-t border-slate-100 dark:border-[#242424]">
                <button
                  type="button"
                  onClick={() => {
                    setShowMoreActions(true);
                    setMoreCategoryFilter('all');
                    setMoreSearchQuery('');
                  }}
                  className="w-full p-3.5 rounded-2xl border-2 border-dashed border-purple-300 dark:border-purple-900/60 bg-gradient-to-r from-purple-500/5 via-indigo-500/5 to-cyan-500/5 hover:from-purple-500/10 hover:via-indigo-500/10 hover:to-cyan-500/10 hover:border-purple-500 transition-all flex items-center justify-between group cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <MoreHorizontal className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 dark:text-white text-xs">
                          More Actions, Channels & Conditions
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-purple-500 text-white shadow-2xs">
                          35 Actions
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Conditions, WhatsApp, SMS, Call, Webhooks, and Smart Lead Enrichment
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400 text-xs font-bold group-hover:translate-x-1 transition-transform">
                    Browse More <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              </div>
            </>
          ) : (
            /* VIEW B: ORGANIZED SECONDARY MENU ("More" View) */
            <div className="space-y-4">
              
              {/* Back button & Search Bar */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowMoreActions(false)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 dark:border-[#2C2C2C] hover:border-purple-500 text-slate-700 dark:text-slate-300 hover:text-purple-500 text-xs font-bold transition-colors cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Quick Steps</span>
                </button>

                <div className="relative flex-1">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search 35 actions, conditions, channels..."
                    value={moreSearchQuery}
                    onChange={(e) => setMoreSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2C2C2C] text-slate-900 dark:text-white text-xs focus:outline-hidden focus:border-purple-500"
                    autoFocus
                  />
                  {moreSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setMoreSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all' as const, label: 'All', count: MORE_ACTION_ITEMS.length },
                  { id: 'conditions' as const, label: 'Conditions', count: 14 },
                  { id: 'linkedin' as const, label: 'LinkedIn Actions', count: 10 },
                  { id: 'channels' as const, label: 'Other Channels', count: 5 },
                  { id: 'other' as const, label: 'Other Steps', count: 4 },
                  { id: 'smart' as const, label: 'Smart Steps', count: 3 },
                ].map((tab) => {
                  const isActive = moreCategoryFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setMoreCategoryFilter(tab.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-purple-600 text-white shadow-2xs'
                          : 'bg-slate-100 dark:bg-[#1E1E1E] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-200/60 dark:border-[#2C2C2C]'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[9px] font-mono ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-200 dark:bg-[#282828] text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Categorized Action Cards Grid */}
              <div className="max-h-[62vh] overflow-y-auto pr-1 space-y-5">
                {moreCategorySections.map((section) => {
                  const sectionItems = filteredMoreItems.filter((i) => i.category === section.key);
                  if (sectionItems.length === 0) return null;

                  return (
                    <div key={section.key} className="space-y-2.5">
                      <div className="flex items-center justify-between pb-1 border-b border-slate-100 dark:border-[#262626]">
                        <div className="flex items-center gap-2">
                          <h5 className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                            {section.title}
                          </h5>
                          <span className="px-1.5 py-0.2 rounded-md text-[9px] font-mono bg-slate-100 dark:bg-[#222] text-slate-500 dark:text-slate-400 font-bold">
                            {sectionItems.length}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 hidden sm:inline">
                          {section.desc}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {sectionItems.map((item) => {
                          const ItemIcon = item.icon;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() =>
                                handleAddStepFromPicker(
                                  item.type,
                                  item.title,
                                  item.subtitle,
                                  item.isCondition,
                                  item.initialConfig
                                )
                              }
                              className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-purple-500 hover:bg-purple-50/10 text-left flex items-start gap-2.5 cursor-pointer transition-all group"
                            >
                              <div
                                className={`w-7 h-7 rounded-lg ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform`}
                              >
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="font-bold text-slate-900 dark:text-white truncate">
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <span
                                      className={`px-1.5 py-0.2 rounded text-[9px] font-extrabold shrink-0 ${
                                        item.badge === '3 Credits'
                                          ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                                          : item.badgeColor === 'emerald'
                                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                          : item.badgeColor === 'cyan'
                                          ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                                          : item.badgeColor === 'purple'
                                          ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                                          : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'
                                      }`}
                                    >
                                      {item.badge}
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">
                                  {item.subtitle}
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {filteredMoreItems.length === 0 && (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
                    <Search className="w-8 h-8 text-slate-400" />
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      No actions match "{moreSearchQuery}"
                    </span>
                    <p className="text-[11px] text-slate-400 max-w-[280px]">
                      Try searching with different terms like "WhatsApp", "Credit", "Condition", or "Email".
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setMoreSearchQuery('');
                        setMoreCategoryFilter('all');
                      }}
                      className="mt-2 px-3 py-1.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-500 transition-colors cursor-pointer"
                    >
                      Clear Search & Filters
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

        </div>
      </Modal>

      {/* 5. CONDITION DELETION CONFIRMATION MODAL */}
      <Modal
        isOpen={!!conditionToDelete}
        onClose={() => setConditionToDelete(null)}
        title="Delete Conditional Split?"
        size="sm"
      >
        <div className="space-y-4 p-1 font-sans">
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-xs text-rose-600 dark:text-rose-400 block">
                Destructive Action
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Delete this condition? Its YES and NO branch steps will also be affected.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setConditionToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              onClick={() => {
                if (conditionToDelete) {
                  const id = conditionToDelete.id;
                  setConditionToDelete(null);
                  executeDeleteStep(id);
                }
              }}
            >
              Delete Condition & Steps
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
