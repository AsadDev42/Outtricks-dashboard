import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  Mail, 
  Search, 
  Clock, 
  User, 
  Building2, 
  Layers, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  SlidersHorizontal, 
  Flame, 
  Eye, 
  X, 
  Tag, 
  TrendingUp, 
  Award, 
  Target, 
  Zap, 
  Send
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface EmailTemplate {
  id: string;
  name: string;
  useCase: string;
  category: 'Featured' | 'First-Touch' | 'Follow-Up' | 'Industry' | 'Persona' | 'Trigger-Based';
  recommendedPersona: string;
  expectedReplyRate: string;
  subjectLine: string;
  body: string;
  tags: string[];
}

interface FaqItem {
  question: string;
  answer: string;
}

const ALL_TEMPLATES: EmailTemplate[] = [
  // SECTION 1: FEATURED TEMPLATES
  {
    id: 'feat-01',
    name: 'The 3-Sentence CEO Cold Intro',
    useCase: 'Cold Intro Hook',
    category: 'Featured',
    recommendedPersona: 'CEOs & Founders',
    expectedReplyRate: '14.8%',
    subjectLine: '{{company}} sales deliverability',
    body: 'Hi {{first_name}},\n\nSaw you are actively scaling sales headcount at {{company}}.\n\nWe helped {{similar_company}} double their booked demo rate by consolidating cold email and Voice AI onto one database with zero webhook drift.\n\nOpen to a brief 5-min chat this Thursday?',
    tags: ['Short', 'Executive', 'High Conversion']
  },
  {
    id: 'feat-02',
    name: 'Context-Led Personalized Outreach',
    useCase: 'Personalized First Touch',
    category: 'Featured',
    recommendedPersona: 'VP of Growth / VP Sales',
    expectedReplyRate: '16.2%',
    subjectLine: 'question regarding {{company}}\'s outbound stack',
    body: 'Hi {{first_name}},\n\nLoved your recent insights on {{recent_topic}}—especially your point on team operational friction.\n\nMost revenue teams lose 15+ hours a week troubleshooting broken Zapier syncs between email and CRM tools. Outtricks runs lead search, contact search, and multi-inbox dispatch on one native PostgreSQL database.\n\nWorth a quick look this week?',
    tags: ['Personalized', 'B2B SaaS', 'Pain-Point']
  },
  {
    id: 'feat-03',
    name: 'Founder-to-Founder Peer Note',
    useCase: 'Peer Validation',
    category: 'Featured',
    recommendedPersona: 'Early-Stage Founders',
    expectedReplyRate: '18.4%',
    subjectLine: 'quick founder note / {{company}}',
    body: 'Hi {{first_name}},\n\nAs a fellow founder building in B2B tech, I know how brutal domain burn and deliverability drops are when scaling outbound.\n\nWe built Outtricks to give founders an enterprise-grade outbound engine with 24-inbox smart rotation that closes initial pipeline without hiring $120k/yr SDRs.\n\nHappy to share our exact setup if helpful?',
    tags: ['Founder', 'Peer-to-Peer', 'Low Friction']
  },
  {
    id: 'feat-04',
    name: 'Speed-to-Lead Demo Converter',
    useCase: 'Demo Request Confirmation',
    category: 'Featured',
    recommendedPersona: 'Inbound Inquiries',
    expectedReplyRate: '34.6%',
    subjectLine: '{{first_name}} - your {{company}} demo request',
    body: 'Hi {{first_name}},\n\nThanks for requesting an Outtricks demo.\n\nI have reserved a sandbox workspace for {{company}} with 500 free contact search credits and 24-inbox rotation pre-configured.\n\nDoes Thursday at 2:00 PM EST work for a 15-min walkthrough?',
    tags: ['Inbound', 'Speed-to-Lead', 'High Intent']
  },

  // SECTION 2: FIRST-TOUCH EMAILS
  {
    id: 'ft-01',
    name: 'The Problem-Led Agitator',
    useCase: 'Problem-Led Hook',
    category: 'First-Touch',
    recommendedPersona: 'VP Sales / Head of Outbound',
    expectedReplyRate: '13.5%',
    subjectLine: 'quick question about {{company}}\'s inbox health',
    body: 'Hi {{first_name}},\n\nAre your sales reps losing 5+ hours every week reconciling bounce rates across disconnected dialers and email tools?\n\nOuttricks solves this by running lead discovery, MultiDimensional Lead Search, and multi-inbox rotation on one unified core.\n\nWould you be open to a 3-minute video showing how it works?',
    tags: ['Agitation', 'Time Saver']
  },
  {
    id: 'ft-02',
    name: 'The Trigger-Based Intent Touch',
    useCase: 'Trigger-Based',
    category: 'First-Touch',
    recommendedPersona: 'Sales Leaders',
    expectedReplyRate: '15.9%',
    subjectLine: 'congrats on the {{event_trigger}} at {{company}}',
    body: 'Hi {{first_name}},\n\nCongrats on {{company}}\'s recent {{event_trigger}}!\n\nWhen scaling into new target accounts, most teams struggle with outdated contact data that burns domain reputation. Our multiDimensional query filters guarantees 85%+ verified direct dials and emails before you hit send.\n\nOpen to seeing a 5-contact test batch for {{company}}?',
    tags: ['Trigger', 'Hiring', 'Funding']
  },
  {
    id: 'ft-03',
    name: '50-Word Short Teaser',
    useCase: 'Short-Form Hook',
    category: 'First-Touch',
    recommendedPersona: 'C-Level Executives',
    expectedReplyRate: '12.4%',
    subjectLine: 'idea for {{company}}',
    body: 'Hi {{first_name}},\n\nWe helped {{similar_company}} book 48 qualified sales meetings in 30 days while cutting their SaaS tool stack cost by 60%.\n\nOpen to exploring how {{company}} could duplicate these numbers?',
    tags: ['Micro-Copy', 'Fast Read']
  },

  // SECTION 3: FOLLOW-UP SEQUENCES
  {
    id: 'fu-01',
    name: 'Follow-Up #1: The Gentle Value Bump',
    useCase: 'Sequence Step 2',
    category: 'Follow-Up',
    recommendedPersona: 'All Decision Makers',
    expectedReplyRate: '11.8%',
    subjectLine: 'Re: {{company}} sales deliverability',
    body: 'Hi {{first_name}},\n\nFollowing up on my previous note. Thought you might find this relevant—we just published a case study on how CloudScale AI generated $148K+ pipeline in 30 days using unified multi-channel workflows: {{case_study_link}}\n\nWorth a 5-minute chat this week?',
    tags: ['Follow-Up 1', 'Case Study']
  },
  {
    id: 'fu-02',
    name: 'Follow-Up #2: The Video Teardown',
    useCase: 'Sequence Step 3',
    category: 'Follow-Up',
    recommendedPersona: 'Technical & Growth Leads',
    expectedReplyRate: '14.2%',
    subjectLine: 'recorded a quick 2-min loom for {{company}}',
    body: 'Hi {{first_name}},\n\nI put together a quick 2-minute video showing 3 target ICP accounts in {{target_industry}} and their verified phone numbers currently missing from standard Apollo searches: {{video_link}}\n\nLet me know if you would like me to send over the full list?',
    tags: ['Follow-Up 2', 'Loom Video']
  },
  {
    id: 'fu-03',
    name: 'The Breakup Email: Low Friction',
    useCase: 'Sequence Step 4',
    category: 'Follow-Up',
    recommendedPersona: 'Non-Responsive Prospects',
    expectedReplyRate: '17.6%',
    subjectLine: 'closing the loop / {{company}}',
    body: 'Hi {{first_name}},\n\nAssuming scaling outbound revenue isn\'t a priority for {{company}} right now—totally understand!\n\nI will pause my outreach here. If anything changes next quarter, feel free to explore Outtricks at your convenience.\n\nBest of luck with Q3 goals!',
    tags: ['Breakup', 'Psychology', 'High Reply']
  },

  // SECTION 4: INDUSTRY TEMPLATES
  {
    id: 'ind-01',
    name: 'B2B SaaS Pipeline Accelerant',
    useCase: 'Software & Cloud Providers',
    category: 'Industry',
    recommendedPersona: 'VP Sales / CRO',
    expectedReplyRate: '15.1%',
    subjectLine: '{{company}}\'s pipeline generation',
    body: 'Hi {{first_name}},\n\nFor high-growth SaaS teams, maintaining 99%+ deliverability across 20+ SDR inboxes is usually a nightmare of manual spreadsheet tracking.\n\nOuttricks automates mailbox rotation, warmup, and Voice SDR follow-ups on 1 database with 0ms webhook lag.\n\nOpen to exploring a pilot with {{company}}?',
    tags: ['SaaS', 'B2B Tech']
  },
  {
    id: 'ind-02',
    name: 'Lead Generation Agency Retainer Scale',
    useCase: 'Agencies & Fractional SDRs',
    category: 'Industry',
    recommendedPersona: 'Agency Owners',
    expectedReplyRate: '19.2%',
    subjectLine: 'scaling client portals at {{company}}',
    body: 'Hi {{first_name}},\n\nManaging 20+ client outbound campaigns across Clay, Smartlead, and Zapier creates endless sync errors and expensive tool sprawl.\n\nGrowthPilot Media consolidated 25 client portals onto Outtricks, saving $2,400/mo while scaling operator leverage from 6 to 18 clients per manager.\n\nWorth a look for {{company}}?',
    tags: ['Agency', 'Multi-Tenant']
  },
  {
    id: 'ind-03',
    name: 'Recruiting & Staffing Candidate Sourcing',
    useCase: 'Staffing & Headhunting',
    category: 'Industry',
    recommendedPersona: 'Recruiting Directors',
    expectedReplyRate: '16.7%',
    subjectLine: 'sourcing {{key_role}} candidates for {{company}}',
    body: 'Hi {{first_name}},\n\nFinding senior {{key_role}} talent before competitors requires fresh data and multi-channel outreach across email and LinkedIn.\n\nOuttricks searches 480M+ profiles and automates dual recruiting motions for client acquisition and candidate placement on 1 database.\n\nOpen to a brief 5-min demo?',
    tags: ['Recruiting', 'Staffing']
  },

  // SECTION 5: PERSONA TEMPLATES
  {
    id: 'per-01',
    name: 'RevOps Leader: Tool Sprawl Elimination',
    useCase: 'RevOps & Infrastructure',
    category: 'Persona',
    recommendedPersona: 'Head of RevOps / SalesOps',
    expectedReplyRate: '14.4%',
    subjectLine: 'consolidating {{company}}\'s outbound architecture',
    body: 'Hi {{first_name}},\n\nRevOps leaders spend hours every week managing webhook failures and contact sync drift across fragmented point solutions.\n\nOuttricks is built on a single PostgreSQL core schema where lead search, contact search, cold email, LinkedIn, and CRM share one atomic record with 0ms lag.\n\nOpen to a brief technical overview this Thursday?',
    tags: ['RevOps', 'Single Database']
  },
  {
    id: 'per-02',
    name: 'Marketing Director: Inbound Signal Conversion',
    useCase: 'Demand Gen & Marketing',
    category: 'Persona',
    recommendedPersona: 'VP Marketing / CMO',
    expectedReplyRate: '13.9%',
    subjectLine: 'turning {{company}}\'s intent signals into revenue',
    body: 'Hi {{first_name}},\n\nWhen high-intent prospects visit {{company}}\'s pricing page or fill out a form, waiting 30 minutes for SDR outreach cuts conversion by 391%.\n\nOuttricks deploys sub-400ms Voice SDRs that call and qualify warm leads within 45 seconds of form submission.\n\nOpen to seeing a live test call?',
    tags: ['Marketing', 'Speed-to-Lead']
  },

  // SECTION 6: TRIGGER-BASED / HIGH-INTENT TEMPLATES
  {
    id: 'trig-01',
    name: 'Executive Hiring Trigger',
    useCase: 'New VP / C-Level Hire',
    category: 'Trigger-Based',
    recommendedPersona: 'Newly Appointed Executives',
    expectedReplyRate: '21.5%',
    subjectLine: 'congrats on the new role at {{company}}',
    body: 'Hi {{first_name}},\n\nCongrats on stepping into the {{role}} role at {{company}}!\n\nDuring your first 90 days of auditing outbound tooling, I wanted to share how we helped {{similar_company}} double their booked pipeline while cutting sales software costs by 60%.\n\nOpen to a brief 5-min intro next week?',
    tags: ['New Role', '90-Day Window', 'High Reply']
  },
  {
    id: 'trig-02',
    name: 'Recent Funding Announcement Trigger',
    useCase: 'Seed / Series A / Series B Raised',
    category: 'Trigger-Based',
    recommendedPersona: 'Founders & VP Growth',
    expectedReplyRate: '18.9%',
    subjectLine: 'congrats on the round, {{first_name}}',
    body: 'Hi {{first_name}},\n\nHuge congrats to you and the team on {{company}}\'s recent funding round!\n\nAs you ramp outbound hiring and sales quota targets, Outtricks gives your revenue team 480M+ verified leads and 24-inbox rotation on one unified platform.\n\nHappy to set up an executive sandbox for {{company}} if helpful?',
    tags: ['Funding', 'High Velocity']
  }
];

const TEMPLATE_FAQS: FaqItem[] = [
  {
    question: 'What makes a cold email template effective in 2026?',
    answer: 'Effective cold email templates are short (under 75 words), problem-centric rather than feature-heavy, use personalized context in the first sentence, and conclude with a low-friction question rather than demanding a 45-minute call.'
  },
  {
    question: 'How should I customize the {{variables}} for each prospect?',
    answer: 'Use variables like {{first_name}}, {{company}}, and {{role}} alongside context variables such as {{similar_company}} and {{recent_topic}}. In Outtricks, these variables are Verified and populated automatically from the 480M+ lead directory.'
  },
  {
    question: 'Why do short cold emails outperform long pitch decks?',
    answer: 'Over 70% of B2B decision makers read cold emails on mobile devices. Long paragraphs trigger visual fatigue and spam filters, whereas 3-to-4 sentence emails are easy to read and reply to immediately.'
  },
  {
    question: 'How many follow-ups should I include in an outbound sequence?',
    answer: 'We recommend a 3-to-4 touch sequence spaced 3 to 4 days apart across email, supplemented with a LinkedIn connection touch and Voice SDR call for maximum reply lift without domain burn.'
  },
  {
    question: 'What subject line formats generate 60%+ open rates?',
    answer: 'Subject lines with 1 to 3 lowercase words, no punctuation or emojis, and natural conversational phrasing (e.g. "quick question / {{company}}", "{{company}} sales stack") achieve the highest open and inbox placement rates.'
  },
  {
    question: 'How does Outtricks prevent email templates from triggering spam filters?',
    answer: 'Outtricks uses dynamic spintax syntax (e.g. "{Hi|Hello|Hey}") to automatically generate thousands of unique grammatical variations, preventing spam algorithms from flagging identical template bodies.'
  },
  {
    question: 'Does Outtricks include a free trial to test these templates?',
    answer: 'Yes! Your 7-Day Free Trial includes full access to all 50+ pre-built email templates, 24-inbox rotation, 480M+ lead finder, and Deals CRM.'
  }
];

export const TemplatesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTemplateModal, setSelectedTemplateModal] = useState<EmailTemplate | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  // Live variable replacement state
  const [variables, setVariables] = useState({
    firstName: 'Sarah',
    company: 'CloudScale AI',
    role: 'VP of Growth',
    similarCompany: 'HyperGrowth Labs',
    recentTopic: 'sales automation silos',
    eventTrigger: 'Series A funding round',
    keyRole: 'Staff Infrastructure Engineer'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const copyToClipboard = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    const rendered = text
      .replace(/\{\{first_name\}\}/g, variables.firstName)
      .replace(/\{\{company\}\}/g, variables.company)
      .replace(/\{\{role\}\}/g, variables.role)
      .replace(/\{\{similar_company\}\}/g, variables.similarCompany)
      .replace(/\{\{recent_topic\}\}/g, variables.recentTopic)
      .replace(/\{\{event_trigger\}\}/g, variables.eventTrigger)
      .replace(/\{\{key_role\}\}/g, variables.keyRole);

    navigator.clipboard.writeText(rendered);
    setCopiedId(id);
    showToast('Template copied to clipboard with variables!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const categories = ['All', 'Featured', 'First-Touch', 'Follow-Up', 'Industry', 'Persona', 'Trigger-Based'];

  const filteredTemplates = ALL_TEMPLATES.filter((tmpl) => {
    const matchesSearch = 
      tmpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.useCase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tmpl.recommendedPersona.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat = selectedCategory === 'All' || tmpl.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="50+ Proven Cold Email & LinkedIn Copy Templates | Outtricks"
        description="Download 50+ verified high-reply outbound message templates categorized by industry and trigger event."
        canonical="https://outtricks.com/resources/templates"
        keywords={["cold email templates","LinkedIn message copy","high converting outbound copy","sales templates"]}
        breadcrumbs={[{"name":"Resources","url":"/resources"},{"name":"Templates","url":"/resources/templates"}]}
      />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-sans font-bold py-3 px-5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          PAGE HEADER: Cold Email Templates That Start Conversations
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            50+ B2B PROVEN TEMPLATES
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Cold Email Templates That Start Conversations
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          50+ practical B2B email templates for prospecting, follow-ups, reactivation, and meeting generation.
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto pt-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search templates by persona, industry, trigger, or use case..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] text-xs sm:text-sm text-slate-900 dark:text-white outline-none shadow-md shadow-slate-900/5 focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

      </section>

      {/* =========================================================================
          LIVE VARIABLE REPLACER BOX
          ========================================================================= */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
          <div className="flex items-center gap-2 text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Variable Tester (Populate Templates Live)</span>
          </div>
          <span className="text-xs font-sans text-slate-400">Edit fields to preview changes below</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">{"{{first_name}}"}</label>
            <input 
              type="text" 
              value={variables.firstName}
              onChange={(e) => setVariables({...variables, firstName: e.target.value})}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#0D0D0D] text-slate-900 dark:text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">{"{{company}}"}</label>
            <input 
              type="text" 
              value={variables.company}
              onChange={(e) => setVariables({...variables, company: e.target.value})}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#0D0D0D] text-slate-900 dark:text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">{"{{role}}"}</label>
            <input 
              type="text" 
              value={variables.role}
              onChange={(e) => setVariables({...variables, role: e.target.value})}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#0D0D0D] text-slate-900 dark:text-white outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="text-[10px] text-slate-400 block mb-1">{"{{similar_company}}"}</label>
            <input 
              type="text" 
              value={variables.similarCompany}
              onChange={(e) => setVariables({...variables, similarCompany: e.target.value})}
              className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#0D0D0D] text-slate-900 dark:text-white outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 1 TO 6: INTERACTIVE TEMPLATES SHOWCASE
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              PROVEN TEMPLATES LIBRARY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
              Browse by Outreach Category
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold font-sans transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-[#141414] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tmpl) => {
            const renderedPreview = tmpl.body
              .replace(/\{\{first_name\}\}/g, variables.firstName)
              .replace(/\{\{company\}\}/g, variables.company)
              .replace(/\{\{role\}\}/g, variables.role)
              .replace(/\{\{similar_company\}\}/g, variables.similarCompany)
              .replace(/\{\{recent_topic\}\}/g, variables.recentTopic)
              .replace(/\{\{event_trigger\}\}/g, variables.eventTrigger)
              .replace(/\{\{key_role\}\}/g, variables.keyRole);

            const isCopied = copiedId === tmpl.id;

            return (
              <div key={tmpl.id} className="h-full">
                <Card3DTilt maxTilt={3} scale={1.01} className="h-full">
                  <div className="h-full p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md shadow-slate-900/5 flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-700 dark:text-blue-300 font-bold text-[10px] uppercase">
                          {tmpl.useCase}
                        </span>
                        <span className="text-emerald-600 font-bold text-[11px]">
                          {tmpl.expectedReplyRate} Reply Rate
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-950 dark:text-white leading-snug">
                          {tmpl.name}
                        </h3>
                        <span className="text-[11px] font-sans text-slate-400 block mt-0.5">
                          Target: {tmpl.recommendedPersona}
                        </span>
                      </div>

                      {/* Subject Line Pill */}
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#181818]/60 border border-slate-200/60 dark:border-[#2A2A2A] text-[11px] font-sans text-slate-600 dark:text-slate-300 truncate">
                        <strong className="text-slate-400">Subject:</strong> {tmpl.subjectLine}
                      </div>

                      {/* Body Preview */}
                      <div className="p-3.5 bg-slate-50/70 dark:bg-[#0D0D0D]/70 rounded-2xl border border-slate-200/60 dark:border-[#2A2A2A] text-xs font-sans text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed line-clamp-4">
                        {renderedPreview}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center gap-2">
                      <button
                        onClick={() => setSelectedTemplateModal(tmpl)}
                        className="flex-1 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Template</span>
                      </button>

                      <button
                        onClick={(e) => copyToClipboard(tmpl.body, tmpl.id, e)}
                        className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          isCopied
                            ? 'bg-emerald-600 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                        }`}
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>

                  </div>
                </Card3DTilt>
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: EMAIL OPTIMIZATION TIPS
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            CONVERSION PILLARS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Cold Email Optimization Framework
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            4 critical rules high-growth revenue teams use to consistently maintain 99.4% inbox placement and 15%+ replies.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs font-sans">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 flex items-center justify-center font-bold">
              01
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block font-bold">Subject Lines</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Use 1 to 3 lowercase words without exclamation marks or sales jargon (e.g. "sales deliverability / company").
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 flex items-center justify-center font-bold">
              02
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block font-bold">Context Personalization</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Reference specific technographic changes, installed software, or hiring milestones in sentence #1.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
              03
            </div>
            <strong className="text-slate-900 dark:text-white text-sm block font-bold">Low-Friction CTAs</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Ask simple interest-based questions ("Worth a quick look?") instead of demanding 45-minute calendar bookings.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              04
            </div>
            <strong className="text-emerald-950 dark:text-emerald-200 text-sm block font-bold">Inbox Rotation</strong>
            <p className="text-emerald-900 dark:text-emerald-200 font-sans leading-relaxed">
              Rotate sending volume across 24+ mailboxes, capping daily sends at 35 emails per inbox to guarantee 99.4% inboxing.
            </p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          FULL TEMPLATE MODAL VIEW
          ========================================================================= */}
      {selectedTemplateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141414] rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 dark:border-[#2A2A2A] shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                  {selectedTemplateModal.category} • {selectedTemplateModal.useCase}
                </span>
                <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  {selectedTemplateModal.name}
                </h3>
              </div>

              <button
                onClick={() => setSelectedTemplateModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Subject Line */}
            <div className="space-y-1 text-xs font-sans">
              <span className="text-slate-400 font-bold block text-[10px]">SUBJECT LINE:</span>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0D0D0D] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-bold">
                {selectedTemplateModal.subjectLine}
              </div>
            </div>

            {/* Email Body with Highlighted Variables */}
            <div className="space-y-1 text-xs font-sans">
              <span className="text-slate-400 font-bold block text-[10px]">EMAIL BODY WITH LIVE VARIABLES:</span>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0D0D0D] border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-sans text-xs sm:text-sm whitespace-pre-line leading-relaxed">
                {selectedTemplateModal.body
                  .replace(/\{\{first_name\}\}/g, variables.firstName)
                  .replace(/\{\{company\}\}/g, variables.company)
                  .replace(/\{\{role\}\}/g, variables.role)
                  .replace(/\{\{similar_company\}\}/g, variables.similarCompany)
                  .replace(/\{\{recent_topic\}\}/g, variables.recentTopic)
                  .replace(/\{\{event_trigger\}\}/g, variables.eventTrigger)
                  .replace(/\{\{key_role\}\}/g, variables.keyRole)}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
              <span className="text-emerald-600 font-bold">
                Expected Reply Rate: {selectedTemplateModal.expectedReplyRate}
              </span>

              <button
                onClick={() => copyToClipboard(selectedTemplateModal.body, selectedTemplateModal.id)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Personalized Email</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 8: FAQ (7 Questions Accordion)
          ========================================================================= */}
      <section className="max-w-3xl mx-auto space-y-8">
        
        <div className="text-center space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            COLD EMAIL QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {TEMPLATE_FAQS.map((faq, fIdx) => {
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
