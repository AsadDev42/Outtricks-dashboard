import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Workflow, 
  Sliders, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Layers, 
  Zap, 
  UserCheck, 
  Cpu,
  MessageSquare,
  TrendingUp,
  Target,
  DollarSign,
  Users,
  Activity,
  Phone,
  FileText,
  PieChart,
  Filter,
  MoreHorizontal,
  Flame,
  CheckCheck,
  AlertCircle,
  Briefcase,
  Layers3,
  SlidersHorizontal,
  ArrowUpRight,
  TrendingDown
} from 'lucide-react';
import { SEOHead } from '../../components/seo/SEOHead';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

// ============================================================================
// PIPELINE DEMO DEALS DATA (SECTION 1 & 4)
// ============================================================================
interface DealItem {
  id: string;
  company: string;
  contact: string;
  title: string;
  value: string;
  stage: 'new_lead' | 'qualified' | 'contacted' | 'meeting' | 'proposal' | 'won';
  stageName: string;
  owner: string;
  ownerAvatar: string;
  lastActivity: string;
  nextAction: string;
  intent: 'High' | 'Medium';
}

const SAMPLE_DEALS: DealItem[] = [
  {
    id: '1',
    company: 'Northstar Systems',
    contact: 'Alex Morgan',
    title: 'VP of Sales',
    value: '$42,000',
    stage: 'proposal',
    stageName: 'Proposal',
    owner: 'David S.',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    lastActivity: 'Voice AI call (04:12)',
    nextAction: 'Follow up on MSA contract review tomorrow',
    intent: 'High'
  },
  {
    id: '2',
    company: 'CloudScale AI',
    contact: 'Sarah Jenkins',
    title: 'VP Growth & Revenue',
    value: '$36,000',
    stage: 'meeting',
    stageName: 'Meeting',
    owner: 'Elena R.',
    ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    lastActivity: 'Calendar demo confirmed for Thursday 2 PM',
    nextAction: 'Prep custom slide deck on multi-inbox rotation',
    intent: 'High'
  },
  {
    id: '3',
    company: 'Apex Data Labs',
    contact: 'Marcus Vance',
    title: 'Head of RevOps',
    value: '$28,000',
    stage: 'qualified',
    stageName: 'Qualified',
    owner: 'Marcus L.',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    lastActivity: 'Positive email reply regarding tech stack',
    nextAction: 'Dispatch AI Agent calendar booking link',
    intent: 'High'
  },
  {
    id: '4',
    company: 'Vertex Scale FinTech',
    contact: 'Elena Rostova',
    title: 'Director of Business Development',
    value: '$54,000',
    stage: 'won',
    stageName: 'Won',
    owner: 'David S.',
    ownerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    lastActivity: 'Enterprise order form signed via DocuSign',
    nextAction: 'Kick off customer onboarding sequence',
    intent: 'High'
  },
  {
    id: '5',
    company: 'Datasync Technologies',
    contact: 'David Miller',
    title: 'Founder & CEO',
    value: '$18,000',
    stage: 'contacted',
    stageName: 'Contacted',
    owner: 'Sarah M.',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    lastActivity: 'LinkedIn connection accepted + Message 1 sent',
    nextAction: 'Monitor open signals for email step 2 dispatch',
    intent: 'Medium'
  },
  {
    id: '6',
    company: 'SaaSify Global',
    contact: 'Liam Campbell',
    title: 'Chief Revenue Officer',
    value: '$24,000',
    stage: 'new_lead',
    stageName: 'New Lead',
    owner: 'Elena R.',
    ownerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    lastActivity: 'Ingested via Lead Finder (Hiring +4 SDRs)',
    nextAction: 'Trigger multiAttribute search Contact Search',
    intent: 'High'
  }
];

// ============================================================================
// TIMELINE ACTIVITIES (SECTION 6)
// ============================================================================
interface TimelineEvent {
  id: string;
  time: string;
  category: 'email' | 'linkedin' | 'calls' | 'crm' | 'tasks' | 'notes';
  title: string;
  description: string;
  badge: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  { id: '1', time: '16:10', category: 'tasks', title: 'Follow-Up Task Scheduled', description: 'Automated follow-up sequence set for Thursday at 10:00 AM CST', badge: 'Task' },
  { id: '2', time: '15:08', category: 'crm', title: 'Deal Created ($42,000 ARR)', description: 'Advanced opportunity to Stage 4: Proposal / Contract Review', badge: 'CRM' },
  { id: '3', time: '15:05', category: 'email', title: 'Prospect Replied to Cold Email', description: '"Looks interesting, send over the pricing breakdown for 25 seats."', badge: 'Email' },
  { id: '4', time: '14:22', category: 'calls', title: 'Voice AI Discovery Call Completed', description: '04:12 full-duplex call with Alex Morgan. BANT Intent Score: 94%', badge: 'Voice AI' },
  { id: '5', time: '11:18', category: 'linkedin', title: 'LinkedIn Profile Interaction', description: 'Alex Morgan accepted connection request and viewed Outtricks overview deck', badge: 'LinkedIn' },
  { id: '6', time: '10:03', category: 'email', title: 'Personalized Email Step 1 Sent', description: 'Dispatched via rotated mailbox alex@outtricks.io referencing current tech stack', badge: 'Email' },
  { id: '7', time: '09:45', category: 'crm', title: 'Company Verified via multiAttribute search', description: 'Verified work email, direct mobile phone dial, and installed Salesforce/AWS stack', badge: 'Contact Search' },
  { id: '8', time: '09:42', category: 'crm', title: 'Lead Discovered in 480M+ Database', description: 'Matched Northstar Systems (200-500 employees, B2B SaaS, $25M ARR)', badge: 'Lead Finder' }
];

// ============================================================================
// 12 DETAILED FAQS (SECTION 14)
// ============================================================================
const CRM_FAQS = [
  {
    question: 'What is Outtricks Unified CRM?',
    answer: 'Outtricks Unified CRM is a centralized revenue management system natively connected to prospect discovery, Lead Search, multi-inbox cold email, cloud LinkedIn automation, and real-time Voice AI. Unlike traditional standalone CRMs that require fragile third-party integrations, Outtricks operates on a single synchronized database to keep every contact, conversation, task, and deal connected from first touch to closed revenue.'
  },
  {
    question: 'How is Outtricks CRM different from a traditional CRM?',
    answer: 'Traditional CRMs act as passive databases that require reps to manually log notes, import CSV files, and connect 5 different tools via Zapier. Outtricks Unified CRM automatically captures every email send, LinkedIn interaction, Voice AI call transcript, and reply in real time with sub-10ms database synchronization and zero manual data entry.'
  },
  {
    question: 'Can I manage custom deals and sales pipelines?',
    answer: 'Yes. You can create multiple custom pipelines (e.g., Enterprise Outbound, Inbound SaaS, Partner Sales) with configurable deal stages, probability weighting, custom fields, and automated stage progression rules.'
  },
  {
    question: 'Can I track email activity directly in the CRM?',
    answer: 'Yes. Every outbound email sent across your rotated multi-inbox infrastructure—including opens, clicks, replies, and sentiment ratings—is automatically attached to the prospect activity timeline.'
  },
  {
    question: 'Can I track LinkedIn activity in the CRM?',
    answer: 'Yes. Connection requests, InMail messages, message replies, and profile views executed through Outtricks cloud LinkedIn automation are automatically synchronized to the unified contact record.'
  },
  {
    question: 'Can Voice AI conversations and call recordings appear in the CRM?',
    answer: 'Yes. Whenever a Voice AI SDR completes a live discovery or qualification call, the full audio recording, timestamped transcript, sentiment score, and BANT qualification summary are logged instantly to the deal card.'
  },
  {
    question: 'Can I manage contacts, accounts, and company hierarchies?',
    answer: 'Yes. Outtricks organizes your database into 360-degree account records, grouping multiple decision-makers, past touchpoints, technographic stacks, and open opportunities under a parent company profile.'
  },
  {
    question: 'Can CRM activity trigger automated revenue actions?',
    answer: 'Yes. You can configure automated triggers such as: moving a deal to "Meeting" when a calendar demo is booked, launching a re-engagement sequence when a deal goes inactive for 14 days, or alerting sales management on Slack when a high-value opportunity is created.'
  },
  {
    question: 'Can I assign deals and leads to specific team members?',
    answer: 'Yes. Outtricks supports round-robin lead routing, account executive territory assignment, deal ownership transfers, and role-based permissions.'
  },
  {
    question: 'Can I track follow-up tasks and schedule reminders?',
    answer: 'Yes. Centralized task management organizes your daily actions into Today Tasks, Overdue, Upcoming, and High Priority queues with automated reminders.'
  },
  {
    question: 'Can I customize pipeline stages and probability weights?',
    answer: 'Yes. You can add, rename, reorder, or remove deal stages (e.g., New Lead, Qualified, Meeting, Proposal, Negotiation, Won, Lost) and assign custom win probability percentages for accurate revenue forecasting.'
  },
  {
    question: 'Can I view the complete historical journey of a prospect?',
    answer: 'Yes. The unified activity timeline displays the exact chronological record of every touchpoint—from initial database discovery and Contact Search to the final signed contract.'
  }
];

export const CrmPage: React.FC = () => {
  const [selectedPipelineFilter, setSelectedPipelineFilter] = useState<string>('all');
  const [selectedTimelineCategory, setSelectedTimelineCategory] = useState<string>('all');
  const [activeAccountTab, setActiveAccountTab] = useState<'overview' | 'activities' | 'emails' | 'calls' | 'notes' | 'deals' | 'tasks'>('overview');
  const [activeTaskTab, setActiveTaskTab] = useState<'today' | 'overdue' | 'upcoming' | 'priority'>('today');
  const [analyticsTimeframe, setAnalyticsTimeframe] = useState<'7d' | '30d' | '90d'>('30d');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedDealId, setSelectedDealId] = useState<string>('1');

  const activeDeal = SAMPLE_DEALS.find((d) => d.id === selectedDealId) || SAMPLE_DEALS[0];

  const filteredDeals = SAMPLE_DEALS.filter((d) => {
    if (selectedPipelineFilter === 'all') return true;
    return d.stage === selectedPipelineFilter;
  });

  const filteredTimeline = TIMELINE_EVENTS.filter((ev) => {
    if (selectedTimelineCategory === 'all') return true;
    return ev.category === selectedTimelineCategory;
  });

  return (
    <div className="space-y-24 sm:space-y-32 pt-20 pb-24 overflow-x-hidden">
      
      {/* 1. SEO Head & Structured Data Schema */}
      <SEOHead 
        title="Unified CRM for Sales & Complete Revenue Pipelines | Outtricks"
        description="Bring leads, conversations, activities, follow-ups, and deals into one connected revenue workspace. Outtricks Unified CRM keeps every prospect connected from first touch to closed deal."
        canonical="https://outtricks.com/platform/crm"
        keywords={[
          'Unified CRM for sales',
          'unified CRM',
          'sales CRM',
          'revenue CRM',
          'CRM for sales teams',
          'B2B CRM',
          'sales pipeline management',
          'deal management CRM',
          'CRM automation',
          'revenue operations CRM',
          'sales activity tracking',
          'lead management CRM',
          'unified sales platform'
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://outtricks.com/' },
          { name: 'Platform', url: 'https://outtricks.com/platform' },
          { name: 'Unified CRM', url: 'https://outtricks.com/platform/crm' }
        ]}
        faqs={CRM_FAQS}
        schema={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "Outtricks Unified CRM",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web, Cloud",
          "description": "Unified Revenue CRM natively connected to lead discovery, Contact Search, multi-inbox cold email, LinkedIn, and Voice AI.",
          "offers": {
            "@type": "Offer",
            "price": "39.00",
            "priceCurrency": "USD"
          }
        }}
      />

      {/* =========================================================================
          SECTION 1: HERO & INTERACTIVE CRM DASHBOARD
          ========================================================================= */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] sm:h-[550px] bg-gradient-to-tr from-blue-600/15 via-blue-500/10 to-indigo-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs font-sans text-slate-500 dark:text-slate-400">
            <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/platform" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Platform</Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-slate-200 font-bold">Unified CRM</span>
          </nav>

          {/* Hero Main Copy */}
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse shadow-[0_0_8px_#2563eb]" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
                UNIFIED CRM
              </span>
            </div>

            {/* H1 Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08]">
              One CRM for Your{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Entire Revenue Workflow
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto font-sans">
              Bring leads, conversations, activities, follow-ups, and deals into one connected revenue workspace. Outtricks Unified CRM keeps every prospect and opportunity connected from first touch to closed deal.
            </p>

            {/* Hero Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <a
                href="#crm-pipeline"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-sans"
              >
                <span>Explore Unified CRM</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/book-a-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:border-blue-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group font-sans"
              >
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
                <span>Book a Demo</span>
              </Link>
            </div>

            {/* Key Metrics Strip */}
            <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto border-t border-slate-200/60 dark:border-white/[0.07]">
              <div className="text-center space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 font-sans">1 Record</div>
                <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Unified Single Database</div>
              </div>
              <div className="text-center space-y-0.5 border-x border-slate-200/60 dark:border-white/[0.07]">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-sans">0 Manual</div>
                <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Data Entry Required</div>
              </div>
              <div className="text-center space-y-0.5">
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white font-sans">&lt; 10ms</div>
                <div className="text-[11px] sm:text-xs font-sans text-slate-500 dark:text-slate-400 font-medium">Real-Time Sync</div>
              </div>
            </div>

          </div>

          {/* =====================================================================
              HERO VISUAL: INTERACTIVE UNIFIED CRM WORKSPACE
              ===================================================================== */}
          <div id="crm-pipeline" className="pt-4 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-4 sm:p-7 shadow-2xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.7)] space-y-6">
              
              {/* Cockpit Top Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-white/[0.07] pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white font-sans">
                        Outtricks Revenue Pipeline
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold font-sans border border-emerald-500/20">
                        Live DB Sync Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-sans">
                      Active Pipeline: <span className="font-bold text-slate-700 dark:text-slate-300">Q3 Tier-1 Enterprise Sales</span>
                    </p>
                  </div>
                </div>

                {/* Stage Quick Filter */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] text-xs">
                  {(['all', 'qualified', 'meeting', 'proposal', 'won'] as const).map((stageKey) => (
                    <button
                      key={stageKey}
                      onClick={() => setSelectedPipelineFilter(stageKey)}
                      className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                        selectedPipelineFilter === stageKey
                          ? 'bg-white dark:bg-[#222222] text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {stageKey}
                    </button>
                  ))}
                </div>
              </div>

              {/* CRM Interactive Grid: Pipeline Kanban Cards + Detail Inspector */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-sans">
                
                {/* Left: Deal Cards (7 Cols) */}
                <div className="lg:col-span-7 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
                    <span>ACTIVE OPPORTUNITIES ({filteredDeals.length})</span>
                    <span>STAGE & VALUE</span>
                  </div>

                  <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                    {filteredDeals.map((deal) => {
                      const isSelected = activeDeal.id === deal.id;

                      return (
                        <div
                          key={deal.id}
                          onClick={() => setSelectedDealId(deal.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                            isSelected
                              ? 'bg-blue-50/80 dark:bg-[#131d35] border-blue-500 shadow-md ring-2 ring-blue-500/20'
                              : 'bg-slate-50/60 dark:bg-[#1C1C1C] border-slate-200/60 dark:border-[#202020] hover:border-blue-400/40'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                                  {deal.company}
                                </h4>
                                <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                                  {deal.stageName}
                                </span>
                              </div>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {deal.contact} • {deal.title}
                              </p>
                            </div>
                            <span className="text-sm font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                              {deal.value}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-[#202020] text-[11px]">
                            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 truncate">
                              <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                              <span className="truncate">{deal.lastActivity}</span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <img
                                src={deal.ownerAvatar}
                                alt={deal.owner}
                                className="w-5 h-5 rounded-full object-cover"
                              />
                              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">{deal.owner}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right: Selected Deal 360° Inspector Card (5 Cols) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-2xl bg-slate-50/80 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-4">
                    
                    <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200/60 dark:border-[#202020]">
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">SELECTED ACCOUNT</span>
                        <h4 className="text-base font-extrabold text-slate-900 dark:text-white mt-0.5">{activeDeal.company}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{activeDeal.contact} ({activeDeal.title})</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-extrabold text-sm border border-emerald-500/20">
                        {activeDeal.value}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020] space-y-0.5">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Current Stage</span>
                        <span className="font-bold text-blue-600 dark:text-blue-400 text-xs">
                          {activeDeal.stageName}
                        </span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020] space-y-0.5">
                        <span className="text-slate-400 text-[10px] uppercase font-bold block">Buyer Intent</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-current" /> {activeDeal.intent} Intent
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-[#222222] border border-slate-200/60 dark:border-[#202020] space-y-1.5 text-xs">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Scheduled Action:</span>
                      <p className="text-slate-800 dark:text-slate-200 font-bold leading-snug">
                        {activeDeal.nextAction}
                      </p>
                    </div>

                    {/* Compact Activity Channels Strip */}
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-[#222222] text-xs space-y-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Connected Channel Activity:</span>
                      <div className="flex items-center justify-between text-[11px] text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-blue-500" /> 3 Emails</span>
                        <span className="flex items-center gap-1"><Linkedin className="w-3 h-3 text-sky-500" /> 2 Touches</span>
                        <span className="flex items-center gap-1"><PhoneCall className="w-3 h-3 text-emerald-500" /> 1 Call</span>
                        <span className="flex items-center gap-1"><CheckCheck className="w-3 h-3 text-indigo-500" /> 1 Task</span>
                      </div>
                    </div>

                    <Link
                      to="/signup"
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs text-center block transition-all shadow-md shadow-blue-500/25"
                    >
                      Open Account in Unified CRM →
                    </Link>

                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ONE REVENUE RECORD (4 Digital Feature Blocks)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50/80 dark:bg-[#0e1526] border border-slate-200/80 dark:border-[#2A2A2A] space-y-8">
          
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-sans border border-slate-200/80 dark:border-[#2A2A2A]">
              ONE REVENUE RECORD
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Every Prospect. Every Conversation.{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                One Place.
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Revenue teams lose valuable deals because lead data, outreach touchpoints, conversation transcripts, activities, and opportunities live scattered across disconnected software tools. Outtricks keeps every piece of context unified on one shared data layer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Unified Contact Records</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Keep prospect profiles, company firmographics, verified emails, direct dials, and conversations unified on a single screen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Complete Activity History</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                See every cold email, LinkedIn message, Voice AI call transcript, note, and stage change in one chronological timeline.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Deal Management</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Move deals smoothly through customizable pipeline stages with automated value calculations and win probability weighting.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <CheckCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Next-Step Visibility</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Always know what happened, what needs immediate rep attention, and what automated action should trigger next.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: FROM LEAD TO CLOSED DEAL (Connected Workflow)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              From Lead to{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Closed Deal
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              The CRM is not a separate destination at the end of your process. It is the continuous operational system keeping your entire revenue journey synchronized.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {[
              { title: 'Lead Finder', desc: '480M+ Database' },
              { title: 'Contact Search', desc: 'multiAttribute search' },
              { title: 'Email Outreach', desc: 'Multi-Inbox Cadence' },
              { title: 'LinkedIn', desc: 'Cloud Automation' },
              { title: 'Voice AI SDR', desc: 'Sub-400ms Discovery' },
              { title: 'Follow-Up', desc: 'Intelligent Cadence' },
              { title: 'Unified CRM', desc: 'Single Data Record' },
              { title: 'Closed Deal', desc: 'Revenue Won' }
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1 text-center"
              >
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 block">0{idx + 1} STAGE</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{step.title}</h4>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4: SMART PIPELINES (Build Pipelines Around the Way You Sell)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-sans border border-slate-200/80 dark:border-[#2A2A2A]">
              SMART PIPELINES
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Build Pipelines Around the{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Way You Sell
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Design custom pipelines matching your deal velocity, contract sizes, and qualification stages.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: '1. New Lead', count: 42, value: '$240K' },
              { name: '2. Qualified', count: 28, value: '$182K' },
              { name: '3. Contacted', count: 19, value: '$145K' },
              { name: '4. Meeting', count: 14, value: '$127K' },
              { name: '5. Proposal', count: 9, value: '$98K' },
              { name: '6. Won', count: 12, value: '$164K' }
            ].map((stage, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] space-y-2">
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">{stage.name}</span>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">{stage.count} Deals</span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{stage.value}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5: COMPLETE VIEW OF EVERY ACCOUNT (360° Profile UI)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              A Complete View of{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Every Account
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Sales reps should never have to search 4 different tabs just to understand an account before hopping on a sales call.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* Account Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white font-extrabold text-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  NS
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">Northstar Systems</h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                      Stage: Proposal ($42,000 ARR)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Alex Morgan • VP of Sales • 200–500 Headcount • B2B SaaS
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-500/20 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-current" /> High Buying Intent (94%)
                </span>
              </div>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 dark:border-[#202020] pb-3 text-xs">
              {(['overview', 'activities', 'emails', 'calls', 'notes', 'deals', 'tasks'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveAccountTab(tab)}
                  className={`px-3.5 py-1.5 rounded-xl font-bold capitalize transition-all cursor-pointer ${
                    activeAccountTab === tab
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-50 dark:hover:bg-[#1C1C1C]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Account Details Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Contact</span>
                <p className="font-bold text-slate-900 dark:text-white">Alex Morgan (VP of Sales)</p>
                <p className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">a.morgan@northstarsystems.io</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Last Activity</span>
                <p className="font-bold text-slate-900 dark:text-white">Voice AI Call (04:12 Completed)</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">BANT Intent Verified (+0.94 score)</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Next Action</span>
                <p className="font-bold text-blue-600 dark:text-blue-400">Follow up on MSA contract review</p>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">Scheduled for tomorrow 10:00 AM</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6: ACTIVITY TIMELINE (Chronological Event Feed)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 font-sans">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-sans border border-slate-200/80 dark:border-[#2A2A2A]">
                ACTIVITY TIMELINE
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight mt-2">
                Never Lose the Context{' '}
                <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                  Behind a Deal
                </span>
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] text-xs">
              {(['all', 'email', 'linkedin', 'calls', 'crm', 'tasks'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedTimelineCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                    selectedTimelineCategory === cat
                      ? 'bg-white dark:bg-[#222222] text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <div className="divide-y divide-slate-100 dark:divide-white/[0.06]">
              {filteredTimeline.map((item) => (
                <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="font-mono text-slate-400 text-xs shrink-0">{item.time}</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px] shrink-0">
                      {item.badge}
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white mr-2">{item.title}:</span>
                      <span className="text-slate-600 dark:text-slate-300">{item.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7: SMART TASKS & ACTIONS (Know What Needs Attention)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50/80 dark:bg-[#0e1526] border border-slate-200/80 dark:border-[#2A2A2A] space-y-8 font-sans">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Know What Needs{' '}
                <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                  Immediate Attention
                </span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
                Centralized action queues prevent high-value opportunities from slipping through the cracks.
              </p>
            </div>

            {/* Task Category Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] text-xs">
              {[
                { id: 'today', label: "Today's Tasks (4)" },
                { id: 'overdue', label: 'Overdue (0)' },
                { id: 'upcoming', label: 'Upcoming (12)' },
                { id: 'priority', label: 'High Priority (3)' }
              ].map((tt) => (
                <button
                  key={tt.id}
                  onClick={() => setActiveTaskTab(tt.id as any)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeTaskTab === tt.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {tt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-[10px]">
                High Intent Meeting
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Follow up with Northstar Systems</h4>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Review MSA contract terms with Alex Morgan before Thursday demo call.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                Inbound Lead
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Review Qualified Lead (CloudScale AI)</h4>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Hiring +6 SDRs detected. Assign Account Executive territory owner in Deals CRM.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-[10px]">
                Stalled Account
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Update Inactive Proposal (Apex Data)</h4>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Deal inactive for 5 days. Trigger automated re-engagement cadence via email.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8: TURN ACTIVITY INTO REVENUE VISIBILITY (CRM Analytics)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 font-sans">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Turn Activity Into{' '}
                <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                  Revenue Visibility
                </span>
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm mt-1">
                Real-time pipeline metrics and conversion forecasting across all stages (Sample Demo Data).
              </p>
            </div>

            {/* Timeframe Filter */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] text-xs">
              {(['7d', '30d', '90d'] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setAnalyticsTimeframe(tf)}
                  className={`px-3 py-1 rounded-lg font-bold uppercase transition-all cursor-pointer ${
                    analyticsTimeframe === tf
                      ? 'bg-white dark:bg-[#222222] text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1 shadow-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Pipeline Value</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">$1.84M</div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +18.4% this month
              </span>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1 shadow-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Open Opportunities</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">124</div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">Across 6 stages</span>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1 shadow-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Qualified Leads</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">68</div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">BANT Verified</span>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1 shadow-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Win Rate</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">34%</div>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">+4.2% QoQ</span>
            </div>

            <div className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1 shadow-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold">Average Deal Value</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">$14.8K</div>
              <span className="text-[10px] font-bold text-slate-500">ARR per contract</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9: AUTOMATION (Let Your CRM Trigger the Next Action)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full liquid-glass-pill text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider font-sans border border-slate-200/80 dark:border-[#2A2A2A]">
              CRM AUTOMATION
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Let Your CRM Trigger{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                the Next Action
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
              Outtricks Unified CRM acts as an active automation engine rather than a passive records store.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-sans">
            {[
              { trigger: 'New Qualified Lead', action: 'Create opportunity & assign AE territory owner in sub-10ms.' },
              { trigger: 'Meeting Booked via Calendar', action: 'Advance deal stage to Meeting and notify account team.' },
              { trigger: 'Positive Email Reply Received', action: 'Halt cold follow-up sequence and post instant alert on Slack.' },
              { trigger: 'Voice AI Qualification Completed', action: 'Attach audio transcript and update intent score to High.' },
              { trigger: 'No Response in 14 Days', action: 'Enroll contact in automated multi-channel re-engagement sequence.' },
              { trigger: 'Deal Marked Closed-Won', action: 'Trigger customer onboarding sequence and update revenue reports.' }
            ].map((rule, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2.5">
                <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">RULE 0{idx + 1}</span>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">{rule.trigger}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">→ {rule.action}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 10: BUILT FOR EVERY REVENUE ROLE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Built for Every{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Revenue Role
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Designed to empower sales reps, managers, founders, RevOps, and lead generation teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { role: 'Sales Representatives', desc: 'See every active conversation, email reply, and next task in one place without manual data logging.' },
              { role: 'Sales Managers', desc: 'Monitor pipeline health, individual rep activity, deal movement velocity, and stage conversion rates.' },
              { role: 'Founders & Leadership', desc: 'Gain complete revenue visibility and forecast accuracy without managing 5 disconnected point tools.' },
              { role: 'RevOps Teams', desc: 'Enforce clean data governance, zero CSV synchronization drift, and unified cross-channel workflows.' },
              { role: 'Lead Generation Teams', desc: 'Push qualified B2B prospects directly into the sales pipeline with verified contact records.' },
              { role: 'Account Executives', desc: 'Access full Voice AI transcripts, email history, and technographic context before every demo.' }
            ].map((persona, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{persona.role}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{persona.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 11: WHY USE A UNIFIED CRM? (Comparison Table)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Why Use a{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Unified CRM?
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Compare fragmented point-tool stacks with the Outtricks unified revenue architecture.
            </p>
          </div>

          <div className="bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-8 shadow-xl overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px] text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-[#2A2A2A]">
                  <th className="pb-4 font-bold uppercase tracking-wider text-slate-400 w-1/3">Feature</th>
                  <th className="pb-4 font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/3">Disconnected CRM Setup</th>
                  <th className="pb-4 font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 w-1/3">Outtricks Unified CRM</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Data Architecture</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Scattered across 4-6 different SaaS tools</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Single synchronized PostgreSQL database</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Activity Logging</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Manual rep notes or brittle Zapier syncs</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">100% automated multi-channel logging</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Voice AI Integration</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Disconnected third-party phone systems</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Native sub-400ms WebRTC transcripts logged</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Lead discovery</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Manual CSV uploads or separate vendor credits</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Built-in multiDimensional query filters</td>
                </tr>
                <tr>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">Next Action Automation</td>
                  <td className="py-4 text-slate-500 dark:text-slate-400">Requires manual calendar booking checks</td>
                  <td className="py-4 font-bold text-blue-600 dark:text-blue-400">Direct trigger execution across email & LinkedIn</td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 12: EVERYTHING YOUR TEAM NEEDS TO MANAGE REVENUE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12 font-sans">
          
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Everything Your Team Needs to{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Manage Revenue
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Full-featured CRM capabilities engineered for speed, high conversion, and seamless team collaboration.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs">
            {[
              'Contact Management',
              'Deal Pipelines',
              'Company Records',
              'Activity Timeline',
              'Task Queues',
              'Internal Rep Notes',
              'Custom Fields',
              'Deal Stages',
              'Pipeline Analytics',
              'Lead Ownership',
              'Follow-Up Automation',
              'Conversation History'
            ].map((cap, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-[#0b101f] border border-slate-200/80 dark:border-[#2A2A2A] flex items-center gap-2.5 font-bold text-slate-900 dark:text-white shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{cap}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 13: ONE SOURCE OF TRUTH (Explanatory Section)
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50/80 dark:bg-[#0e1526] border border-slate-200/80 dark:border-[#2A2A2A] space-y-6 font-sans">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              One Source of Truth for Your{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Revenue Team
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
              When sales teams operate in silos, deals slip through the cracks, leads receive duplicate outreach, and revenue forecasting becomes guesswork. Outtricks Unified CRM acts as the single source of truth where all outbound prospecting, multichannel messaging, voice interactions, and closing stages converge seamlessly.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14: FREQUENTLY ASKED QUESTIONS (12 FAQs)
          ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 font-sans">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Frequently Asked{' '}
              <span className="font-serif italic text-blue-600 dark:text-blue-400 font-normal">
                Questions
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Everything you need to know about Outtricks Unified CRM, pipeline management, and platform synchronization.
            </p>
          </div>

          <div className="space-y-3">
            {CRM_FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;

              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] bg-white dark:bg-[#0b101f] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="p-1 rounded-lg bg-slate-100 dark:bg-[#222222] text-slate-600 dark:text-slate-300 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-[#202020] pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 15: FINAL CONVERSION CTA BANNER
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-600 to-indigo-700 text-white p-8 sm:p-14 text-center overflow-hidden shadow-2xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[11px] font-bold uppercase tracking-wider font-sans border border-white/20">
            ONE WORKSPACE. EVERY OPPORTUNITY.
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Stop Losing Revenue{' '}
            <span className="font-serif italic font-normal underline decoration-white/30">
              Between Tools.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-blue-100 font-normal max-w-2xl mx-auto leading-relaxed font-sans">
            Bring prospect data, conversations, activities, follow-ups, and deals into one connected revenue workspace with Outtricks Unified CRM.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-xs sm:text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-sans"
            >
              Explore Unified CRM
            </Link>
            <Link
              to="/book-a-demo"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 font-bold text-xs sm:text-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer font-sans"
            >
              Book a Demo
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};
