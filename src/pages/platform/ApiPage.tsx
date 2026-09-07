import { SEOHead } from '../../components/seo/SEOHead';
﻿import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Copy, 
  Check, 
  Lock, 
  ShieldCheck, 
  Zap, 
  Database, 
  Mail, 
  Building2, 
  Workflow, 
  Terminal, 
  Key, 
  Activity, 
  Layers, 
  RefreshCw, 
  ChevronDown, 
  ChevronUp,
  Cpu,
  Server,
  FileCode2,
  Globe
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

// Interactive Endpoint Tabs
const ENDPOINTS = [
  {
    id: 'leads',
    method: 'POST',
    path: '/v1/leads/search',
    title: 'Lead Search',
    description: 'Query 480M+ verified B2B profiles using 8D ICP targeting filters.',
    request: `curl -X POST https://api.outtricks.com/v1/leads/search \\
  -H "Authorization: Bearer out_live_94f8a12e" \\
  -H "Content-Type: application/json" \\
  -d '{
    "job_titles": ["VP Sales", "Head of Growth"],
    "seniority": ["executive", "director"],
    "headcount_min": 50,
    "tech_stack": ["Salesforce", "Stripe"],
    "limit": 10
  }'`,
    response: `{
  "status": "success",
  "count": 10,
  "data": [
    {
      "id": "lead_89a4bc71",
      "full_name": "Sarah Jenkins",
      "title": "VP of Product",
      "company": "Stripe",
      "verified_email": "s.jenkins@stripe.com",
      "direct_dial": "+1 (415) 892-4910",
      "confidence_score": 0.98
    }
  ]
}`
  },
  {
    id: 'Contact Search',
    method: 'POST',
    path: '/v1/contacts/Verify',
    title: 'contact search',
    description: 'Verify domain, work email, and direct phone dials using multiAttribute search.',
    request: `curl -X POST https://api.outtricks.com/v1/contacts/Verify \\
  -H "Authorization: Bearer out_live_94f8a12e" \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "marcus@cloudscale.ai",
    "include_technographics": true
  }'`,
    response: `{
  "status": "success",
  "contact": {
    "email": "marcus@cloudscale.ai",
    "deliverability": "valid",
    "inbox_health": 0.994,
    "linkedin_url": "https://linkedin.com/in/marcus-vance",
    "company": {
      "name": "CloudScale AI",
      "headcount": "150-500",
      "funding_stage": "Series B",
      "tech_stack": ["PostgreSQL", "React", "AWS"]
    }
  }
}`
  },
  {
    id: 'campaigns',
    method: 'POST',
    path: '/v1/campaigns/dispatch',
    title: 'Campaign Dispatch',
    description: 'Programmatically enroll prospects in multi-inbox cold email & LinkedIn cadences.',
    request: `curl -X POST https://api.outtricks.com/v1/campaigns/dispatch \\
  -H "Authorization: Bearer out_live_94f8a12e" \\
  -H "Content-Type: application/json" \\
  -d '{
    "campaign_id": "cmp_77b312",
    "recipient_email": "s.jenkins@stripe.com",
    "variables": {
      "first_name": "Sarah",
      "pain_point": "multi-inbox deliverability"
    }
  }'`,
    response: `{
  "status": "dispatched",
  "dispatch_id": "dsp_11894a",
  "assigned_mailbox": "outbound-04@company-growth.io",
  "scheduled_at": "2026-08-26T14:30:00Z",
  "suppression_check": "passed"
}`
  },
  {
    id: 'deals',
    method: 'POST',
    path: '/v1/deals/create',
    title: 'Deals CRM',
    description: 'Write contacts, deals, notes, and activity directly to the native PostgreSQL core.',
    request: `curl -X POST https://api.outtricks.com/v1/deals/create \\
  -H "Authorization: Bearer out_live_94f8a12e" \\
  -H "Content-Type: application/json" \\
  -d '{
    "deal_name": "Stripe - Enterprise Expansion",
    "amount": 48000,
    "stage": "proposal",
    "contact_id": "lead_89a4bc71",
    "close_date": "2026-09-30"
  }'`,
    response: `{
  "status": "created",
  "deal": {
    "id": "deal_004918",
    "amount": 48000,
    "stage": "proposal",
    "win_probability": 0.82,
    "created_at": "2026-08-26T06:40:00Z"
  }
}`
  },
  {
    id: 'workflows',
    method: 'POST',
    path: '/v1/workflows/trigger',
    title: 'Workflow Trigger',
    description: 'Execute multi-channel automated workflows with custom webhook payloads.',
    request: `curl -X POST https://api.outtricks.com/v1/workflows/trigger \\
  -H "Authorization: Bearer out_live_94f8a12e" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workflow_id": "wf_rev_engine_01",
    "event_type": "inbound_signup",
    "lead_email": "alex@mercury.com"
  }'`,
    response: `{
  "status": "active",
  "execution_id": "exec_99014",
  "steps_total": 6,
  "next_action": "Verify_and_qualify_voice_sdr"
}`
  }
];

export const ApiPage: React.FC = () => {
  const [activeEndpointKey, setActiveEndpointKey] = useState<string>('leads');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentEndpoint = ENDPOINTS.find((e) => e.id === activeEndpointKey) || ENDPOINTS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentEndpoint.request);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const FAQS = [
    {
      q: "How do I get API access?",
      a: "API access is available on all Outtricks plans. Once you create an account, you can generate production and sandbox API keys with granular scopes directly from your workspace dashboard (Settings → API Keys)."
    },
    {
      q: "How does API versioning work?",
      a: "Outtricks utilizes explicit URI versioning (e.g. `/v1/`). We maintain backward compatibility for all stable endpoints. Any additive enhancements are introduced seamlessly, and breaking changes are only published under major version increments with a 12-month deprecation notice."
    },
    {
      q: "How is API authentication handled?",
      a: "All requests authenticate via standard HTTP Bearer token authorization (`Authorization: Bearer out_live_...`). Tokens can be restricted by IP allowlisting, read/write scopes, and workspace team boundaries."
    },
    {
      q: "How do webhooks work?",
      a: "Outtricks supports at-least-once webhook delivery for over 25 platform events (e.g. `email.replied`, `call.completed`, `deal.won`, `lead.verified`). All payloads include HMAC-SHA256 signatures for signature validation and automatic exponential backoff retries."
    },
    {
      q: "Can the API sync with my existing CRM?",
      a: "Yes. The Outtricks API provides full CRUD capabilities for contacts, companies, notes, calls, and deals, allowing bidirectional synchronization with internal systems, custom data warehouses, or external CRMs."
    },
    {
      q: "What are the API rate limits?",
      a: "Default production rate limits are 1,000 requests per minute per workspace with bursting up to 2,500 RPM. Enterprise plans include dedicated rate tiers with customizable concurrency limits."
    },
    {
      q: "Is there a sandbox environment for testing?",
      a: "Yes. Every workspace includes a dedicated sandbox environment (`https://sandbox-api.outtricks.com/v1/`) with test credit balances and mock WebRTC audio responders for safe development and CI/CD testing."
    }
  ];

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="Official Versioned REST API & Webhooks | Outtricks"
        description="Build custom workflows and integrate Outtricks data with our high-throughput REST API."
        canonical="https://outtricks.com/platform/api"
        keywords={["Outtricks API","B2B data API","outreach API","webhook documentation"]}
        breadcrumbs={[{"name":"Platform","url":"/platform"},{"name":"API Docs","url":"/platform/api"}]}
      />
      
      {/* =========================================================================
          HERO SECTION: OFFICIAL VERSIONED API (Spacious, Minimal, Technical)
          ========================================================================= */}
      <section className="relative pt-4">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Hero Copy & CTAs (Spans 6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs">
              <Code className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
                OFFICIAL VERSIONED API
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.08]">
              Build Revenue Workflows{' '}
              <span className="animated-gradient-text">
                Directly Into Your Stack
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
              Connect Outtricks to your own applications, CRM, internal tools, and revenue workflows through a stable, versioned API built for reliable automation.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
              <Link
                to="/resources/help-center"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>View API Docs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/book-a-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full liquid-glass-button text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Book a Demo</span>
              </Link>
            </div>

            {/* Small Spec Strip */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-sans text-slate-500 dark:text-slate-400">
              <span>● REST / JSON</span>
              <span>● OpenAPI 3.1</span>
              <span>● 99.99% SLA</span>
              <span>● Sub-40ms Latency</span>
            </div>

          </div>

          {/* Right Column: Interactive Code Visualizer (Spans 6 cols) */}
          <div className="lg:col-span-6">
            <Card3DTilt maxTilt={4} scale={1.01}>
              <div className="rounded-3xl bg-[#090d16] border border-slate-800 shadow-2xl overflow-hidden text-xs font-sans">
                
                {/* Code Window Titlebar */}
                <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] text-slate-400 font-bold">api.outtricks.com/v1</span>
                  </div>

                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? "Copied" : "Copy"}</span>
                  </button>
                </div>

                {/* Live Endpoint Selector Strip */}
                <div className="flex items-center gap-1 p-2 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto no-scrollbar">
                  {ENDPOINTS.slice(0, 3).map((ep) => (
                    <button
                      key={ep.id}
                      onClick={() => setActiveEndpointKey(ep.id)}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all shrink-0 cursor-pointer ${
                        activeEndpointKey === ep.id
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <span className="text-emerald-400 mr-1.5">{ep.method}</span>
                      <span>{ep.path}</span>
                    </button>
                  ))}
                </div>

                {/* Code Content Box */}
                <div className="p-4 sm:p-5 text-slate-300 space-y-3 leading-relaxed overflow-x-auto">
                  <pre className="text-emerald-400 text-[11px]">{currentEndpoint.request}</pre>
                  
                  <div className="pt-2 border-t border-slate-800/80">
                    <div className="text-[10px] text-slate-500 pb-1">Response: 200 OK (38ms)</div>
                    <pre className="text-blue-300 text-[11px]">{currentEndpoint.response}</pre>
                  </div>
                </div>

              </div>
            </Card3DTilt>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 1: CORE API CAPABILITIES (4 Clean Cards)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            API CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Can Do in the UI, Available via API
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Build custom prospecting workflows, automate outreach cadences, and sync pipeline directly into your tech stack.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Lead & Contact Data",
              desc: "Query 480M+ verified B2B profiles, extract verified emails, and Verify technographic signals programmatically.",
              icon: Database,
              badge: "/v1/leads"
            },
            {
              title: "Campaign Automation",
              desc: "Enroll prospects into multi-inbox cold email and LinkedIn sequences with dynamic personalization tokens.",
              icon: Mail,
              badge: "/v1/campaigns"
            },
            {
              title: "CRM & Pipeline",
              desc: "Read and write contacts, deals, notes, and activity directly to the native PostgreSQL database with zero sync drift.",
              icon: Building2,
              badge: "/v1/deals"
            },
            {
              title: "Workflow Triggers",
              desc: "Fire custom event webhooks and automate multi-channel actions across your internal microservices.",
              icon: Workflow,
              badge: "/v1/workflows"
            }
          ].map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <Card3DTilt key={idx} maxTilt={6} scale={1.02}>
                <div className="liquid-glass-card p-7 rounded-3xl shadow-clean space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#181818] text-blue-600 dark:text-blue-400">
                        {cap.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              </Card3DTilt>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: DEVELOPER EXPERIENCE (Interactive Endpoint Panel)
          ========================================================================= */}
      <section className="space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            DEVELOPER EXPERIENCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Clean, Predictable REST Endpoints
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Click an endpoint below to inspect request payloads and standardized JSON responses.
          </p>
        </div>

        {/* Horizontal Endpoint Selector Pills */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {ENDPOINTS.map((ep) => (
            <button
              key={ep.id}
              onClick={() => setActiveEndpointKey(ep.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-2 ${
                activeEndpointKey === ep.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-105'
                  : 'liquid-glass-pill text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              <span className="text-[10px] font-sans opacity-80">{ep.method}</span>
              <span>{ep.title}</span>
            </button>
          ))}
        </div>

        {/* Full Detailed Endpoint Viewer Card */}
        <Card3DTilt maxTilt={3} scale={1.01} className="max-w-5xl mx-auto">
          <div className="liquid-glass rounded-3xl p-6 sm:p-10 shadow-clean space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/60 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 text-xs font-sans font-extrabold border border-emerald-200 dark:border-emerald-900">
                  {currentEndpoint.method}
                </span>
                <span className="font-sans text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  https://api.outtricks.com{currentEndpoint.path}
                </span>
              </div>

              <span className="text-xs font-sans text-slate-500 dark:text-slate-400">
                Rate Limit: 1,000 RPM
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {currentEndpoint.description}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
              
              {/* Request Box */}
              <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 text-xs font-sans space-y-2">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span className="font-bold text-slate-300">Request Body</span>
                  <span className="text-[10px]">Content-Type: application/json</span>
                </div>
                <pre className="text-emerald-400 leading-relaxed overflow-x-auto pt-1">{currentEndpoint.request}</pre>
              </div>

              {/* Response Box */}
              <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 text-xs font-sans space-y-2">
                <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                  <span className="font-bold text-blue-400">Response (200 OK)</span>
                  <span className="text-[10px] text-emerald-400">Latency: 38ms</span>
                </div>
                <pre className="text-blue-300 leading-relaxed overflow-x-auto pt-1">{currentEndpoint.response}</pre>
              </div>

            </div>

          </div>
        </Card3DTilt>
      </section>

      {/* =========================================================================
          SECTION 3: PRODUCTION RELIABILITY (6 Architecture Cards)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            ENTERPRISE GRADE
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineered for Production Reliability
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Stable, documented, and resilient infrastructure powering millions of automated revenue events every month.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Versioned Endpoints",
              desc: "Strict URI versioning (/v1/) with zero breaking changes guaranteed across stable production releases.",
              icon: FileCode2
            },
            {
              title: "Predictable Responses",
              desc: "Standardized JSON schemas with RFC-7807 structured error codes for predictable integration handling.",
              icon: Server
            },
            {
              title: "Secure Authentication",
              desc: "Bearer API keys with granular role permissions, IP allowlisting, and token expiration policies.",
              icon: Key
            },
            {
              title: "Reliable Webhooks",
              desc: "At-least-once delivery with HMAC-SHA256 signature verification and automatic exponential backoff retries.",
              icon: RefreshCw
            },
            {
              title: "Standard Error Codes",
              desc: "Clear HTTP status codes (200, 201, 400, 401, 429, 500) paired with contextual debugging messages.",
              icon: Activity
            },
            {
              title: "Production Infrastructure",
              desc: "99.99% uptime SLA running on multi-region edge nodes with sub-40ms global execution latency.",
              icon: ShieldCheck
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card3DTilt key={idx} maxTilt={5}>
                <div className="liquid-glass-card p-7 rounded-3xl shadow-clean space-y-3 h-full">
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
          SECTION 4: INTEGRATION FLOW (Your App -> Outtricks API -> Revenue Data)
          ========================================================================= */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            SEAMLESS CONNECTIVITY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How Data Flows Into Your Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A continuous loop connecting your internal applications, Outtricks revenue engines, and your CRM.
          </p>
        </div>

        {/* Visual Integration Pipeline */}
        <div className="liquid-glass rounded-3xl p-8 sm:p-12 shadow-clean max-w-5xl mx-auto space-y-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto text-xs font-sans font-bold text-center pb-2">
            {[
              { label: "Your App", icon: Terminal, color: "text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#181818]" },
              { label: "Outtricks API", icon: Code, color: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]" },
              { label: "Revenue Data", icon: Database, color: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]" },
              { label: "Automation", icon: Workflow, color: "text-blue-600 bg-blue-50 dark:bg-[#1A1A1A]" },
              { label: "Closed CRM", icon: Building2, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950" }
            ].map((node, i) => {
              const Icon = node.icon;
              return (
                <div key={i} className="flex items-center gap-2 shrink-0">
                  <div className="p-3.5 rounded-2xl liquid-glass-card space-y-1.5 w-28 sm:w-32 text-center shadow-xs">
                    <div className={`w-9 h-9 rounded-xl mx-auto flex items-center justify-center ${node.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-bold block">{node.label}</span>
                  </div>
                  {i < 4 && <span className="text-slate-300 dark:text-slate-600 text-sm">→</span>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FINAL CTA
          ========================================================================= */}
      <section className="max-w-6xl mx-auto">
        <div className="liquid-glass rounded-3xl p-8 sm:p-14 shadow-clean text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 text-xs font-sans font-bold uppercase tracking-wider">
            DEVELOPER FIRST
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight max-w-3xl mx-auto leading-tight">
            Connect Outtricks to the Tools You Already Use
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
            Start building automated revenue workflows with our developer-friendly REST API. Instant sandbox keys, detailed guides, and responsive technical support.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-blue-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Get API Keys</span>
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
          SECTION 6: FAQ SECTION (Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
            VERSIONED API FAQ
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

