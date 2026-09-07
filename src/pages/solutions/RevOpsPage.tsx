import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  LineChart, 
  Search, 
  Database, 
  Mail, 
  PhoneCall, 
  Linkedin, 
  Building2, 
  Workflow, 
  Layers, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  Play, 
  Pause, 
  Zap, 
  Check, 
  Bot, 
  Target, 
  DollarSign, 
  Clock, 
  Send, 
  X, 
  UserCheck, 
  TrendingUp, 
  Award, 
  MoveRight, 
  ExternalLink,
  Users,
  Briefcase,
  SlidersHorizontal,
  FolderLock,
  GitBranch,
  Terminal,
  Activity,
  Server
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface DataEntity {
  id: string;
  title: string;
  schemaDesc: string;
  recordCount: string;
  health: string;
  icon: any;
  fields: string[];
}

interface RevOpsRule {
  id: string;
  ruleNum: string;
  title: string;
  ifCondition: string;
  thenAction: string;
  status: string;
  executionRate: string;
  ruleConfigJson: string;
}

interface LiveActivityItem {
  id: string;
  timestamp: string;
  eventType: string;
  message: string;
  latency: string;
  status: 'success' | 'processing';
}

interface FaqItem {
  question: string;
  answer: string;
}

const DATA_ENTITIES: DataEntity[] = [
  {
    id: 'contacts',
    title: 'Contacts',
    schemaDesc: '480M+ B2B profiles, deduplicated email hashes & verified cell dials.',
    recordCount: '1.4M Active',
    health: '99.8% Valid',
    icon: Users,
    fields: ['email_hash', 'phone_e164', 'linkedin_url', 'icp_score', 'suppression_flag']
  },
  {
    id: 'companies',
    title: 'Companies',
    schemaDesc: 'Technographics, headcount tiers, Series funding, and active hiring intent.',
    recordCount: '48K Accounts',
    health: '100% Synced',
    icon: Building2,
    fields: ['domain', 'employee_count', 'tech_stack', 'intent_score', 'rev_tier']
  },
  {
    id: 'activities',
    title: 'Activities',
    schemaDesc: 'Real-time telemetry of email opens, clicks, residential LinkedIn visits & WebRTC calls.',
    recordCount: '480K Events',
    health: '0ms Latency',
    icon: Activity,
    fields: ['event_type', 'timestamp_utc', 'channel', 'payload_meta', 'actor_id']
  },
  {
    id: 'conversations',
    title: 'Conversations',
    schemaDesc: 'Full multi-inbox thread histories and Voice AI transcript audio recordings.',
    recordCount: '24K Threads',
    health: 'Auto-Logged',
    icon: Mail,
    fields: ['thread_id', 'sentiment_score', 'call_transcript', 'booking_status']
  },
  {
    id: 'deals',
    title: 'Deals & Pipeline',
    schemaDesc: '5-stage Kanban sales pipeline with stage progression timestamps and ARR values.',
    recordCount: '$440K ARR',
    health: '0 Sync Drift',
    icon: BarChart3,
    fields: ['deal_id', 'stage', 'contract_arr', 'owner_rep_id', 'close_target_date']
  },
  {
    id: 'revenue',
    title: 'Revenue Attribution',
    schemaDesc: 'First-touch, multi-touch, and campaign ROI models connected directly to closed-won deals.',
    recordCount: '100% Closed-Loop',
    health: 'PostgreSQL Core',
    icon: DollarSign,
    fields: ['attributed_campaign', 'cac_ratio', 'ltv_projected', 'payback_months']
  }
];

const REVOPS_RULES: RevOpsRule[] = [
  {
    id: 'r1',
    ruleNum: '01',
    title: 'Positive Sentiment Auto-Deal Creation',
    ifCondition: 'Prospect replies with positive intent (Sentiment Score > 85%)',
    thenAction: 'Create Deal in stage "Meeting Booked" + Notify assigned AE on Slack',
    status: 'Active',
    executionRate: '342 runs today',
    ruleConfigJson: `{
  "trigger": "email.reply.received",
  "condition": {
    "sentiment": "positive",
    "score_threshold": 0.85
  },
  "actions": [
    { "type": "deals_crm.create_deal", "stage": "meeting_booked" },
    { "type": "slack.notify_channel", "channel": "#sales-pipeline" }
  ]
}`
  },
  {
    id: 'r2',
    ruleNum: '02',
    title: 'No-Reply Multi-Channel Escalation',
    ifCondition: 'Cold Email #1 has no open/reply event after 48 hours',
    thenAction: 'Trigger Safe LinkedIn Residential Cloud Proxy profile visit + personalized DM',
    status: 'Active',
    executionRate: '1,280 runs today',
    ruleConfigJson: `{
  "trigger": "cadence.step.timeout",
  "condition": {
    "elapsed_hours": 48,
    "has_replied": false
  },
  "actions": [
    { "type": "linkedin.profile_view", "proxy_type": "residential_us" },
    { "type": "linkedin.send_dm", "delay_minutes": 15 }
  ]
}`
  },
  {
    id: 'r3',
    ruleNum: '03',
    title: 'High-Intent Round-Robin AE Routing',
    ifCondition: 'Account visits /pricing 3x & ICP Score > 90%',
    thenAction: 'Route round-robin to dedicated AE + trigger Sub-400ms Voice SDR Call',
    status: 'Active',
    executionRate: '88 runs today',
    ruleConfigJson: `{
  "trigger": "intent.pageview.threshold",
  "condition": {
    "url": "/pricing",
    "visits_count": 3,
    "icp_match_min": 90
  },
  "actions": [
    { "type": "routing.round_robin", "pool": "enterprise_aes" },
    { "type": "voice_ai.queue_call", "latency_target_ms": 364 }
  ]
}`
  }
];

const LIVE_OPS_ACTIVITY: LiveActivityItem[] = [
  { id: 'a1', timestamp: '14:28:02.102', eventType: 'POSTGRES_WRITE', message: 'Lead #84920 verified across multiDimensional filters', latency: '14ms', status: 'success' },
  { id: 'a2', timestamp: '14:28:01.890', eventType: 'EMAIL_ROTATOR', message: 'Dispatched via inbox-14.cloudscale.ai (SPF/DKIM 100%)', latency: '4ms', status: 'success' },
  { id: 'a3', timestamp: '14:27:59.412', eventType: 'RULE_TRIGGERED', message: 'Rule #01 executed: Deal created for $36,000 ARR', latency: '2ms', status: 'success' },
  { id: 'a4', timestamp: '14:27:55.100', eventType: 'LINKEDIN_PROXY', message: 'Residential proxy session verified (Zero ban risk)', latency: '32ms', status: 'success' },
  { id: 'a5', timestamp: '14:27:48.330', eventType: 'VOICE_WEBRTC', message: 'Sub-400ms Voice SDR completed demo qualification', latency: '364ms', status: 'success' }
];

const REVOPS_FAQS: FaqItem[] = [
  {
    question: 'What is Outtricks from an infrastructure perspective?',
    answer: 'Outtricks is the AI Revenue Operating System. It replaces fragmented point solutions by providing a single, immutable PostgreSQL core that natively powers lead discovery (480M+ pool), contact search, multi-inbox rotation, safe LinkedIn proxies, WebRTC Voice AI, and CRM pipelines without webhook glue.'
  },
  {
    question: 'Can Outtricks replace multiple revenue tools?',
    answer: 'Yes. Outtricks consolidates 6 separate tool subscriptions (Apollo for data, Clay for Contact Search, Smartlead/Instantly for cold email, Expandi for LinkedIn, Orum/Air for calling, and HubSpot/Pipedrive for CRM) into a single platform for $79/mo.'
  },
  {
    question: 'How does the unified data layer eliminate sync drift?',
    answer: 'Because all tools share the same PostgreSQL database schema, data never leaves the platform. When a prospect opens an email or a Voice AI SDR finishes a qualification call, the activity and deal state write directly to the database in 0ms with zero webhook failure risk.'
  },
  {
    question: 'Can RevOps teams build custom automation rules and webhooks?',
    answer: 'Yes! Flow Builder provides an advanced IF/THEN visual workflow engine with custom JavaScript/JSON rule execution, branching logic, delay conditions, and external webhook triggers.'
  },
  {
    question: 'Can we automate CRM updates without manual rep logging?',
    answer: '100%. Every outbound touch, email reply, LinkedIn message, and AI call recording automatically logs to the deal record with complete transcriptions and sentiment scoring.'
  },
  {
    question: 'Can different revenue teams (Sales, Marketing, Recruiters) use the same platform?',
    answer: 'Yes. Outtricks supports multi-tenant role-based workspaces. Sales reps, marketing teams, founders, and recruiters can collaborate with isolated suppression lists, shared credits, and custom permission tiers.'
  },
  {
    question: 'How does Outtricks reduce overall revenue operations cost?',
    answer: 'A traditional 5-rep sales stack costs $3,500+/mo across multiple software licenses and requires 20+ hours/month of RevOps maintenance to fix broken syncs. Outtricks replaces the entire stack for $79/mo with zero maintenance overhead.'
  }
];

export const RevOpsPage: React.FC = () => {
  // Data Entity Selection State
  const [selectedEntityId, setSelectedEntityId] = useState<string>('contacts');

  // Active Rule Modal State
  const [selectedRuleModal, setSelectedRuleModal] = useState<RevOpsRule | null>(null);

  // Workflow Step State
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState<number>(0);

  // FAQ Accordion State
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const selectedEntity = DATA_ENTITIES.find(e => e.id === selectedEntityId) || DATA_ENTITIES[0];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Unified Revenue Stack & Workflow Consolidation for RevOps | Outtricks"
        description="Eliminate tool sprawl, reduce Zapier maintenance, and synchronize CRM data onto a single reliable engine."
        canonical="https://outtricks.com/solutions/revops"
        keywords={["RevOps platform","revenue stack consolidation","sales tool sprawl elimination","revenue data sync"]}
        breadcrumbs={[{"name":"Solutions","url":"/solutions"},{"name":"RevOps Leaders","url":"/solutions/revops"}]}
      />
      
      {/* =========================================================================
          SECTION 1: HERO (REVOPS LEADERS)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <LineChart className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            REVOPS LEADERS
          </span>
        </div>

        {/* Balanced Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          One Revenue System.<br className="hidden sm:inline" /> Less Tool Sprawl. More Control.
        </h1>

        {/* Subheading */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Connect your data, sales workflows, outreach channels, CRM, and automation in one unified revenue infrastructure.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Talk to RevOps</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Free 7-Day Trial</span>
          </Link>
        </div>

        {/* Top Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 max-w-3xl mx-auto text-xs font-sans">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-[10px] text-slate-400 font-bold uppercase">DATABASE ARCHITECTURE</span>
            <strong className="text-slate-900 dark:text-white block font-bold text-sm">1 PostgreSQL Core Schema</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-blue-600 dark:text-blue-400 font-bold uppercase">SYNC INTEGRITY</span>
            <strong className="text-blue-600 dark:text-blue-400 block font-bold text-sm">0ms Webhook Lag</strong>
          </div>
          <div className="p-3.5 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-emerald-600 font-bold uppercase">STACK REDUCTION</span>
            <strong className="text-emerald-600 dark:text-emerald-400 block font-bold text-sm">$1,200+/mo Stack Savings</strong>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: TOOL SPRAWL (Animated Stack Consolidation)
          ========================================================================= */}
      <section className="space-y-8 max-w-5xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            STACK CONSOLIDATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Your Revenue Stack Should Work Together
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Stop debugging broken webhook integrations between separate vendors. Outtricks collapses 6 fragmented systems into 1 seamless revenue engine.
          </p>
        </div>

        {/* Visual Consolidation Graphic */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-6">
          
          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-xs font-sans text-center">
            {['Lead Data (Apollo)', 'Email (Smartlead)', 'LinkedIn (Expandi)', 'Voice AI (Orum)', 'CRM (HubSpot)', 'Automation (Zapier)'].map((tool, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818]/80 border border-slate-200/80 dark:border-[#2A2A2A]/80 text-slate-700 dark:text-slate-300">
                <span className="text-[10px] text-rose-500 font-bold block uppercase">VENDOR 0{idx + 1}</span>
                <strong className="block text-xs truncate mt-0.5">{tool}</strong>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <div className="px-4 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A]/80 border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-sans font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>NATIVELY CONSOLIDATED INTO 1 REVENUE LAYER</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg space-y-2 text-center">
            <span className="text-[10px] font-sans uppercase tracking-wider text-blue-100 font-bold">
              OUTTRICKS REVENUE INFRASTRUCTURE
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              One PostgreSQL Core • 0 Webhook Failures • Single Tenant Security
            </h3>
            <p className="text-xs text-blue-100 max-w-2xl mx-auto">
              Every prospect search, email touch, LinkedIn message, and voice call writes to the same database row instantly.
            </p>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 3: DATA (Unified Central Data Layer)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            DATABASE ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Unify Your Revenue Data
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            A single source of truth connecting contacts, accounts, activities, conversations, deals, and revenue attribution. Click any entity to view schema.
          </p>
        </div>

        {/* 6 Data Entities Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {DATA_ENTITIES.map((entity) => {
            const EIcon = entity.icon;
            const isSelected = selectedEntityId === entity.id;
            return (
              <button
                key={entity.id}
                onClick={() => setSelectedEntityId(entity.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-sans font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    {entity.recordCount}
                  </span>
                  <EIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{entity.title}</strong>
              </button>
            );
          })}
        </div>

        {/* Schema Inspector Panel */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
            <div>
              <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                ENTITY SCHEMA: {selectedEntity.title}
              </span>
              <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                {selectedEntity.schemaDesc}
              </h4>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-xs font-sans font-bold self-start sm:self-center">
              ✓ Health: {selectedEntity.health}
            </span>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">
              INDEXED POSTGRESQL COLUMNS
            </span>
            <div className="flex flex-wrap gap-2">
              {selectedEntity.fields.map((f, fIdx) => (
                <span
                  key={fIdx}
                  className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-sans font-bold text-slate-800 dark:text-slate-200"
                >
                  <code>{f}</code>
                </span>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 4: AUTOMATION (Cross-Platform Workflows)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            AUTONOMOUS EXECUTION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Automate Cross-Platform Workflows
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Trigger synchronized multi-channel actions from lead creation to final revenue attribution without writing webhook code.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {[
            { step: '01', title: 'Lead Created', desc: 'Auto-ingested via 480M+ ICP filter or website intent.', icon: Search },
            { step: '02', title: 'multiAttribute Verify', desc: 'multiDimensional filters verify emails and direct phone dials.', icon: Database },
            { step: '03', title: 'Outreach Touch', desc: '24-inbox rotation dispatches personalized cold email.', icon: Mail },
            { step: '04', title: 'Positive Reply', desc: 'AI sentiment classifier flags buyer readiness.', icon: CheckCircle2 },
            { step: '05', title: 'CRM Update', desc: 'Deals CRM updates stage to "Demo Booked" in 0ms.', icon: Building2 },
            { step: '06', title: 'Assign Rep', desc: 'Round-robin routing allocates lead to Account Exec.', icon: UserCheck },
            { step: '07', title: 'Smart Follow-Up', desc: 'AI sends calendar confirmation and agenda brief.', icon: Clock }
          ].map((s, idx) => {
            const SIcon = s.icon;
            const isSelected = activeWorkflowIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveWorkflowIdx(idx)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/25 scale-[1.02]'
                    : 'bg-white dark:bg-[#141414] border-slate-200/90 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-sans font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                    STEP {s.step}
                  </span>
                  <SIcon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`} />
                </div>
                <strong className="block text-xs font-bold truncate">{s.title}</strong>
                <p className={`text-[10px] truncate ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                  {s.desc}
                </p>
              </button>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 5: RULE ENGINE (Interactive IF / THEN Cards)
          ========================================================================= */}
      <section className="space-y-6">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            DETERMINISTIC LOGIC
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Build Rules Your Team Can Trust
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Create bulletproof IF / THEN rules that execute with zero lag across inboxes, LinkedIn, and CRM deals. Click any rule to inspect JSON config.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {REVOPS_RULES.map((rule) => (
            <div
              key={rule.id}
              onClick={() => setSelectedRuleModal(rule)}
              className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md shadow-slate-900/5 hover:border-blue-500/80 transition-all cursor-pointer space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400">
                    RULE #{rule.ruleNum}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 text-emerald-600 text-[10px] font-sans font-bold">
                    {rule.status}
                  </span>
                </div>

                <h4 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {rule.title}
                </h4>

                <div className="space-y-2 text-xs font-sans">
                  <div className="p-2.5 rounded-xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-100 dark:border-blue-900/60">
                    <span className="text-blue-600 dark:text-blue-400 font-bold block text-[10px]">IF TRIGGER:</span>
                    <span className="text-slate-800 dark:text-slate-200">{rule.ifCondition}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 dark:border-[#2A2A2A]/60">
                    <span className="text-slate-400 font-bold block text-[10px]">THEN ACTION:</span>
                    <span className="text-slate-800 dark:text-slate-200">{rule.thenAction}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between text-xs font-sans text-slate-500">
                <span>{rule.executionRate}</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform">
                  Configure Rule ›
                </span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* Rule Modal */}
      {selectedRuleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                  RULE ENGINE CONFIGURATION
                </span>
                <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
                  {selectedRuleModal.title}
                </h4>
              </div>

              <button onClick={() => setSelectedRuleModal(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-sans font-bold text-slate-400 uppercase">
                DECLARATIVE JSON RULE DEFINITION
              </span>
              <pre className="p-4 rounded-2xl bg-slate-950 text-emerald-400 text-xs font-sans overflow-x-auto">
                {selectedRuleModal.ruleConfigJson}
              </pre>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedRuleModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs cursor-pointer"
              >
                Close Rule Inspector
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 6: REAL-TIME OPERATIONS (Live Telemetry & Activity Feed)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            SYSTEM TELEMETRY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Monitor Revenue Operations in Real Time
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-sans">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-slate-400 block text-[10px]">DATA HEALTH</span>
            <strong className="text-slate-900 dark:text-white text-lg font-bold">99.8%</strong>
            <span className="text-[10px] text-emerald-600 block">0 Duplicates</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px]">PIPELINE VELOCITY</span>
            <strong className="text-blue-600 dark:text-blue-400 text-lg font-bold">14.2 Days</strong>
            <span className="text-[10px] text-slate-500 block">Lead to Close</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-blue-600 dark:text-blue-400 block text-[10px]">AUTOMATION RUNS</span>
            <strong className="text-blue-600 dark:text-blue-400 text-lg font-bold">14,280 / d</strong>
            <span className="text-[10px] text-slate-500 block">0ms Lag</span>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs space-y-1">
            <span className="text-indigo-600 dark:text-indigo-400 block text-[10px]">RESPONSE RATE</span>
            <strong className="text-indigo-600 dark:text-indigo-400 text-lg font-bold">18.4%</strong>
            <span className="text-[10px] text-slate-500 block">Positive Reply</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-2xs space-y-1">
            <span className="text-emerald-600 block text-[10px]">PIPELINE ARR</span>
            <strong className="text-emerald-700 dark:text-emerald-300 text-lg font-bold">$440,000</strong>
            <span className="text-[10px] text-emerald-600 block font-bold">PostgreSQL Synced</span>
          </div>
        </div>

        {/* Live Ops Activity Stream */}
        <div className="p-6 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-sans font-bold text-slate-300">LIVE REVENUE LOG STREAM</span>
            </div>
            <span className="text-[11px] font-sans text-emerald-400">● 100% HEALTHY</span>
          </div>

          <div className="space-y-2 text-xs font-sans">
            {LIVE_OPS_ACTIVITY.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                  <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-400 text-[10px] font-bold">
                    {log.eventType}
                  </span>
                  <span className="text-slate-300 truncate">{log.message}</span>
                </div>
                <span className="text-emerald-400 text-[10px] font-bold shrink-0">{log.latency}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: BEFORE VS AFTER (Tool Sprawl vs Revenue Layer)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ARCHITECTURE COMPARISON
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Replace Tool Sprawl With One Revenue Layer
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Before */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-[#181818]/40 border border-slate-200 dark:border-[#2A2A2A] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-[#2A2A2A]/80">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                BEFORE (6+ DISCONNECTED REVENUE TOOLS)
              </h3>
              <span className="text-[10px] font-sans text-rose-500 font-bold px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950/60 border border-rose-200">
                $1,200+/mo • High Sync Drift
              </span>
            </div>

            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              {[
                '6+ separate tools with fragmented database schemas',
                'Manual CSV syncs and brittle Zapier webhooks breaking weekly',
                'Duplicate outreach sends due to sync lag between tools',
                'Scattered attribution with zero reliable ARR metrics'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="p-6 sm:p-8 rounded-3xl bg-blue-50/60 dark:bg-white/[0.04] border border-blue-200 dark:border-blue-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200/80 dark:border-blue-800/80">
              <h3 className="font-extrabold text-base text-blue-950 dark:text-blue-100">
                AFTER (OUTTRICKS UNIFIED REVENUE LAYER)
              </h3>
              <span className="text-[10px] font-sans text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950 border border-emerald-200">
                1 Platform • $79/mo Core
              </span>
            </div>

            <ul className="space-y-3 text-xs text-blue-950 dark:text-blue-200">
              {[
                'One platform running on 1 connected PostgreSQL data layer',
                'Native 0ms execution without external webhook middleware',
                'Centralized visibility across leads, cadences, and closed deals',
                'Automated operations that scale with zero maintenance overhead'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <strong className="font-semibold">{item}</strong>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 8: FINAL CTA (RevOps Focus)
          ========================================================================= */}
      <section className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white border border-slate-800 shadow-2xl relative overflow-hidden text-center space-y-6">
        
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs font-sans text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>UNIFIED REVENUE INFRASTRUCTURE</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Make Your Revenue Stack Easier to Operate
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Connect the systems behind your revenue engine and give your team one source of truth.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 relative z-10">
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Talk to RevOps</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Start Free 7-Day Trial</span>
          </Link>
        </div>

        <p className="text-[11px] font-sans text-slate-400 relative z-10">
          7-Day Free Trial • Immutable PostgreSQL Core • Built for RevOps Leaders
        </p>

      </section>

      {/* =========================================================================
          SECTION 9: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            REVOPS ARCHITECTURE
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {REVOPS_FAQS.map((faq, fIdx) => {
            const isOpen = openFaqIndices.includes(fIdx);
            return (
              <div
                key={fIdx}
                className="rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] bg-white dark:bg-[#141414] overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => toggleFaq(fIdx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 dark:text-white cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-[#2A2A2A]/80 animate-in fade-in duration-150">
                    {faq.answer}
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
