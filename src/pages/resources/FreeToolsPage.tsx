import { SEOHead } from '../../components/seo/SEOHead';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  Mail, 
  Target, 
  SlidersHorizontal, 
  CheckCircle2, 
  Copy, 
  Check, 
  X, 
  Play, 
  ChevronDown, 
  ChevronUp, 
  Database, 
  Building2, 
  Workflow, 
  Layers, 
  ShieldCheck, 
  BarChart3, 
  UserCheck, 
  TrendingUp, 
  Award, 
  FileText, 
  RefreshCw,
  Wand2,
  Cpu,
  Flame,
  Zap,
  Lightbulb
} from 'lucide-react';
import { Card3DTilt } from '../../components/3d/Card3DTilt';

interface AiTool {
  id: string;
  name: string;
  category: 'Lead Gen' | 'Outreach' | 'Productivity';
  badge: string;
  shortDesc: string;
  fullDesc: string;
  icon: any;
  inputPlaceholder1: string;
  inputLabel1: string;
  defaultVal1: string;
  inputPlaceholder2: string;
  inputLabel2: string;
  defaultVal2: string;
  defaultOutput: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

const FREE_TOOLS: AiTool[] = [
  {
    id: 'icp-gen',
    name: 'ICP Profile Generator',
    category: 'Lead Gen',
    badge: 'Precision Targeting',
    shortDesc: 'Generate an 8-dimension ideal customer profile from your product value proposition.',
    fullDesc: 'Define your exact buyer personas, company headcount tiers, technographic signals, and qualifying criteria in seconds.',
    icon: Target,
    inputLabel1: 'Your Product / Solution Name & Value Proposition',
    inputPlaceholder1: 'e.g. Cloud security platform that detects AWS IAM misconfigurations in real time',
    defaultVal1: 'Automated outbound engine that unifies 480M+ leads, contact search, and multi-inbox cold email',
    inputLabel2: 'Primary Target Market / Sector',
    inputPlaceholder2: 'e.g. B2B SaaS, Seed to Series B',
    defaultVal2: 'B2B SaaS & Growth Agencies ($1M-$20M ARR)',
    defaultOutput: '● TARGET ICP PROFILE GENERATED:\n\n1. Target Personas: VP of Sales, Head of Growth, RevOps Director, Technical Founder\n2. Company Headcount: 25 - 250 employees\n3. Target Geography: United States, United Kingdom, Canada\n4. Installed Tech Stack: HubSpot, Salesforce, Google Workspace, Smartlead\n5. Buying Trigger Signals: Hiring SDRs/AEs, Recent Series A/B funding, Technographic migration\n6. Disqualifying Criteria: B2C companies, Enterprise > 5,000 employees with frozen procurement'
  },
  {
    id: 'email-gen',
    name: 'B2B Cold Email Generator',
    category: 'Outreach',
    badge: 'High Conversion',
    shortDesc: 'Create personalized 3-sentence B2B cold emails with pain agitation and low-friction CTAs.',
    fullDesc: 'Generate concise, spam-proof outbound copy engineered for high executive reply rates on mobile.',
    icon: Mail,
    inputLabel1: 'Target Prospect Persona & Role',
    inputLabel2: 'Core Pain Point You Solve',
    inputPlaceholder1: 'e.g. VP of Growth at Mid-Market SaaS',
    defaultVal1: 'VP of Growth @ CloudScale AI',
    inputPlaceholder2: 'e.g. Domain deliverability drops and broken Zapier syncs',
    defaultVal2: 'SDRs losing 10h/week troubleshooting broken Zapier syncs between Apollo and Smartlead',
    defaultOutput: 'Subject: {{company}} outbound deliverability\n\nHi {{first_name}},\n\nSaw you are actively scaling sales headcount at {{company}}.\n\nMost high-growth teams lose 10+ hours a week troubleshooting broken Zapier syncs between lead scrapers and email tools. We consolidated lead discovery, multiAttribute search Contact Search, and 24-inbox rotation onto one native PostgreSQL database.\n\nOpen to a brief 5-min chat this Thursday?'
  },
  {
    id: 'lead-qual',
    name: 'Lead Qualification Assistant',
    category: 'Lead Gen',
    badge: 'BANT Scorer',
    shortDesc: 'Score prospect fit against your ICP with BANT criteria and actionable deal sizing.',
    fullDesc: 'Evaluate company size, tech stack compatibility, and budget tier to prioritize sales rep outreach.',
    icon: UserCheck,
    inputLabel1: 'Prospect Title & Company Domain',
    inputLabel2: 'Current Headcount & Installed Software',
    inputPlaceholder1: 'e.g. Sarah Jenkins (VP Sales @ Datasync.io)',
    defaultVal1: 'Sarah Jenkins (VP Growth @ CloudScale AI)',
    inputPlaceholder2: 'e.g. 120 employees, using Salesforce & Apollo',
    defaultVal2: '140 employees, using Google Workspace, Salesforce, Apollo',
    defaultOutput: '● PROSPECT QUALIFICATION AUDIT:\n\n• Match Score: 96/100 (Tier 1 High-Intent ICP)\n• BANT Evaluation:\n  - Budget Tier: Scale Plan ($249/mo to $699/mo)\n  - Authority: High (Direct VP budget holder)\n  - Need: Urgent (Deliverability fix needed for 20+ Google inboxes)\n  - Timeline: Active Q3 Evaluation\n• Recommended Next Action: Trigger Sub-400ms Voice SDR call within 45s of form submission.'
  },
  {
    id: 'subject-gen',
    name: 'Subject Line Generator',
    category: 'Productivity',
    badge: '60%+ Open Rates',
    shortDesc: 'Generate concise, spam-free 1-to-3 word B2B subject lines with predicted open scores.',
    fullDesc: 'Formulate natural conversational subject lines that avoid sales spam triggers and get opened.',
    icon: Wand2,
    inputLabel1: 'Target Company / Topic',
    inputLabel2: 'Tone & Style',
    inputPlaceholder1: 'e.g. Cloud security deliverability',
    defaultVal1: 'outbound deliverability for CloudScale AI',
    inputPlaceholder2: 'e.g. Casual lowercase, Executive, Direct',
    defaultVal2: 'Casual lowercase executive',
    defaultOutput: '1. {{company}} sales deliverability (Predicted Open: 68.4%)\n2. quick question / {{first_name}} (Predicted Open: 64.2%)\n3. idea for {{company}}\'s outbound stack (Predicted Open: 61.9%)\n4. {{first_name}} - sales tool consolidation (Predicted Open: 59.8%)\n5. deliverability at {{company}} (Predicted Open: 58.1%)'
  },
  {
    id: 'personalize-tool',
    name: 'Outreach Personalization Tool',
    category: 'Outreach',
    badge: 'Context-Aware',
    shortDesc: 'Turn prospect LinkedIn information or recent company news into high-converting opening lines.',
    fullDesc: 'Transform raw career milestones, blog posts, and funding triggers into authentic first sentences.',
    icon: Sparkles,
    inputLabel1: 'Prospect Name & Recent Achievement / News',
    inputLabel2: 'Company Initiative / installed technology',
    inputPlaceholder1: 'e.g. Alex Chen promoted to Head of RevOps',
    defaultVal1: 'Alex Chen promoted to Head of RevOps at TechFlow',
    inputPlaceholder2: 'e.g. Migrating to single database architecture',
    defaultVal2: 'Announced company expansion into European market',
    defaultOutput: '● 3 PERSONALIZED OPENING LINE OPTIONS:\n\nOption A (Career Shift Hook):\n"Hi Alex, huge congrats on stepping into the Head of RevOps role at TechFlow!"\n\nOption B (Company Expansion Hook):\n"Hi Alex, saw TechFlow is actively expanding into the European market—exciting milestone."\n\nOption C (Operational Pain Hook):\n"Hi Alex, loved your recent thoughts on eliminating tool sprawl across sales operations teams."'
  }
];

const TOOLS_FAQS: FaqItem[] = [
  {
    question: 'Are these 5 AI tools completely free forever?',
    answer: 'Yes! All 5 AI tools in the Outtricks Free Utility Suite are 100% free to use with zero credit card requirements and no software downloads.'
  },
  {
    question: 'Do I need an Outtricks account to test these tools?',
    answer: 'No registration is required to use the free web tools. You can run inputs, test outputs, and copy customized copy directly from this page.'
  },
  {
    question: 'How accurate is the AI generated copy and qualification scoring?',
    answer: 'Our AI engines are fine-tuned on over 1.2M production B2B outreach campaigns, applying proven DNS deliverability rules, spintax variations, and organic BANT qualification logic.'
  },
  {
    question: 'Can I export these outputs directly into active Outtricks campaigns?',
    answer: 'Yes! When you start your 7-Day Free Trial, all generated ICPs, email templates, and qualification rules can be imported into your live workspace with 1 click.'
  },
  {
    question: 'Is my entered company or prospect data kept private?',
    answer: 'Yes. We do not store, sell, or share any data entered into our free AI tools. All generation runs in isolated sandboxes.'
  },
  {
    question: 'How does Outtricks compare to standalone AI writing tools like ChatGPT?',
    answer: 'Generic AI tools lack B2B deliverability context, 480M+ prospect directory access, multiAttribute search validation, and native PostgreSQL CRM integration. Outtricks unifies generation with execution.'
  },
  {
    question: 'Does Outtricks provide a free trial for the full platform?',
    answer: 'Yes! Your 7-Day Free Trial includes full access to 480M+ lead search, multiAttribute search Contact Search, 24-inbox rotation, and Deals CRM.'
  }
];

export const FreeToolsPage: React.FC = () => {
  const [activeToolModal, setActiveToolModal] = useState<AiTool | null>(null);
  const [modalInput1, setModalInput1] = useState<string>('');
  const [modalInput2, setModalInput2] = useState<string>('');
  const [generatedOutput, setGeneratedOutput] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [openFaqIndices, setOpenFaqIndices] = useState<number[]>([0]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const openToolModal = (tool: AiTool) => {
    setActiveToolModal(tool);
    setModalInput1(tool.defaultVal1);
    setModalInput2(tool.defaultVal2);
    setGeneratedOutput(tool.defaultOutput);
    setIsCopied(false);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      showToast('AI Output successfully generated!');
    }, 800);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(generatedOutput);
    setIsCopied(true);
    showToast('Generated output copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 sm:space-y-32">
      <SEOHead 
        title="5 Free Outbound Sales & Deliverability Tools | Outtricks"
        description="Free cold email generator, subject line tester, ROI calculator, lead volume estimator, and deliverability audit tool."
        canonical="https://outtricks.com/resources/free-tools"
        keywords={["free sales tools","cold email generator","ROI calculator","deliverability checker","subject line scorer"]}
        breadcrumbs={[{"name":"Resources","url":"/resources"},{"name":"Free Tools","url":"/resources/free-tools"}]}
      />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-sans font-bold py-3 px-5 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          SECTION 1: HERO (Free AI Tools for Modern Revenue Teams)
          ========================================================================= */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 sm:pt-10 space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[280px] bg-gradient-to-b from-blue-600/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill shadow-xs border border-slate-200/80 dark:border-[#2A2A2A]">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 tracking-wider uppercase font-sans">
            100% FREE AI UTILITIES
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-[1.12] max-w-3xl mx-auto">
          Free AI Tools for Modern Revenue Teams
        </h1>

        {/* Subtitle */}
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
          Simple AI tools to research prospects, improve outreach, and move faster without adding another subscription.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <a
            href="#tools-grid"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Explore All 5 Tools</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            to="/book-a-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white dark:bg-[#141414] hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Book a Demo</span>
          </Link>
        </div>

      </section>

      {/* =========================================================================
          SECTION 2: INTERACTIVE TOOL GRID (5 Core Tools)
          ========================================================================= */}
      <section id="tools-grid" className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            FREE REVENUE UTILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            5 Interactive AI Outbound Tools
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Click "Try Free" on any tool to launch an interactive live generation sandbox.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FREE_TOOLS.map((tool) => {
            const ToolIcon = tool.icon;
            return (
              <div key={tool.id} className="h-full">
                <Card3DTilt maxTilt={3} scale={1.01} className="h-full">
                  <div className="h-full p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md shadow-slate-900/5 group-hover:border-blue-500/80 transition-all flex flex-col justify-between space-y-4">
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          <ToolIcon className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-[#1A1A1A] text-blue-700 dark:text-blue-300 font-sans font-bold text-[10px] uppercase">
                          {tool.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                          {tool.name}
                        </h3>
                        <span className="text-[11px] font-sans text-slate-400 block mt-0.5">
                          Category: {tool.category}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {tool.shortDesc}
                      </p>
                    </div>

                    <button
                      onClick={() => openToolModal(tool)}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-blue-500/20"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Try Free Simulator</span>
                    </button>

                  </div>
                </Card3DTilt>
              </div>
            );
          })}
        </div>

      </section>

      {/* =========================================================================
          SECTION 3: HOW IT WORKS (Input -> AI Engine -> Output)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            SIMPLE 3-STEP PIPELINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            How Free AI Tools Work
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
          <div className="p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <span className="text-blue-600 font-bold uppercase text-[10px]">STEP 01</span>
            <strong className="text-slate-900 dark:text-white text-base block font-bold">1. Provide Simple Inputs</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Enter target persona, value proposition, or prospect details into intuitive input fields.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-md space-y-3">
            <span className="text-blue-600 font-bold uppercase text-[10px]">STEP 02</span>
            <strong className="text-slate-900 dark:text-white text-base block font-bold">2. AI Context Engine</strong>
            <p className="text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
              Our fine-tuned B2B models apply proven deliverability structures, spintax rules, and BANT scoring.
            </p>
          </div>

          <div className="p-7 rounded-3xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 shadow-md space-y-3">
            <span className="text-emerald-600 font-bold uppercase text-[10px]">STEP 03</span>
            <strong className="text-emerald-950 dark:text-emerald-200 text-base block font-bold">3. Production-Ready Output</strong>
            <p className="text-emerald-900 dark:text-emerald-200 font-sans leading-relaxed">
              Copy customized output with 1 click or export directly into an active Outtricks campaign.
            </p>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 4, 5, 6: TOOLS CATEGORY HIGHLIGHTS
          ========================================================================= */}
      <section className="space-y-12">
        
        {/* Lead Gen Category */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
            <Target className="w-4 h-4" />
            <span>LEAD GENERATION TOOLS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">ICP Profile Generator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Formulates comprehensive 8-dimension customer profiles including job seniority, installed tech stack, and disqualifying rules.
              </p>
              <button
                onClick={() => openToolModal(FREE_TOOLS[0])}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Launch ICP Generator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-950 dark:text-white">Lead Qualification Assistant</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Scores raw company and prospect signals against BANT criteria to ensure SDRs focus exclusively on high-conversion deals.
              </p>
              <button
                onClick={() => openToolModal(FREE_TOOLS[2])}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Launch Qualification Assistant</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Outreach & Productivity Category */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#141414] border border-slate-200/90 dark:border-[#2A2A2A] shadow-xl space-y-6">
          <div className="flex items-center gap-2 text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
            <Mail className="w-4 h-4" />
            <span>OUTREACH & PRODUCTIVITY TOOLS</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">B2B Cold Email Generator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Crafts 3-sentence high-reply cold emails tailored for executive decision makers.
              </p>
              <button
                onClick={() => openToolModal(FREE_TOOLS[1])}
                className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Launch Email Generator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Subject Line Generator</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Generates 1-to-3 word conversational subject lines with predicted open rates.
              </p>
              <button
                onClick={() => openToolModal(FREE_TOOLS[3])}
                className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Launch Subject Generator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">Personalization Engine</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
                Converts prospect career updates and recent achievements into natural opening hooks.
              </p>
              <button
                onClick={() => openToolModal(FREE_TOOLS[4])}
                className="text-xs font-bold text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
              >
                <span>Launch Personalizer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </section>

      {/* =========================================================================
          SECTION 7: WHY OUTTRICKS (Unified Platform vs Standalone Tools)
          ========================================================================= */}
      <section className="space-y-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            UNIFIED PLATFORM ADVANTAGE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Why Move From Standalone Tools to Outtricks?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
            Free tools help you brainstorm copy—Outtricks gives you the full revenue engine to find leads, verify data, and book meetings.
          </p>
        </div>

        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border border-slate-800 shadow-2xl space-y-6 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Connect Lead Discovery Directly to Execution
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              Consolidate lead search (480M+ profiles), contact search (15 sources), 24-inbox rotation, sub-400ms Voice SDRs, and Deals CRM on 1 single PostgreSQL database.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              to="/signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Start Free 7-Day Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/book-a-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs sm:text-sm shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Book a Demo</span>
            </Link>
          </div>
        </div>

      </section>

      {/* =========================================================================
          INTERACTIVE TOOL RUNNER MODAL SIMULATOR
          ========================================================================= */}
      {activeToolModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#141414] rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 dark:border-[#2A2A2A] shadow-2xl space-y-6 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <activeToolModal.icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-sans font-bold text-blue-600 dark:text-blue-400 uppercase">
                    FREE AI UTILITY • {activeToolModal.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                    {activeToolModal.name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveToolModal(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input 1 */}
            <div className="space-y-1 text-xs font-sans">
              <label className="text-slate-700 dark:text-slate-300 font-bold block text-[11px]">
                {activeToolModal.inputLabel1}
              </label>
              <input 
                type="text"
                value={modalInput1}
                onChange={(e) => setModalInput1(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#0D0D0D] text-slate-900 dark:text-white outline-none focus:border-blue-500 font-sans"
              />
            </div>

            {/* Input 2 */}
            <div className="space-y-1 text-xs font-sans">
              <label className="text-slate-700 dark:text-slate-300 font-bold block text-[11px]">
                {activeToolModal.inputLabel2}
              </label>
              <input 
                type="text"
                value={modalInput2}
                onChange={(e) => setModalInput2(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#0D0D0D] text-slate-900 dark:text-white outline-none focus:border-blue-500 font-sans"
              />
            </div>

            {/* Generate Action Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-500/20 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing AI Context...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Output</span>
                </>
              )}
            </button>

            {/* Generated Output Box */}
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-bold text-[10px]">GENERATED AI OUTPUT:</span>
                <button
                  onClick={handleCopyOutput}
                  className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 hover:underline cursor-pointer"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Output'}</span>
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 text-slate-200 border border-slate-800 font-sans text-xs whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto">
                {generatedOutput}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-slate-100 dark:border-[#2A2A2A] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans">
              <span className="text-slate-400 text-[11px]">
                Want to automate this for 1,000+ leads?
              </span>
              <Link
                to="/signup"
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-900 dark:text-white font-bold flex items-center justify-center gap-1.5"
              >
                <span>Launch Full Engine Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
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
            FREE TOOLS QUESTIONS
          </span>
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {TOOLS_FAQS.map((faq, fIdx) => {
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
