export interface MenuItem {
  title: string;
  description: string;
  href: string;
  badge?: string;
  iconName: string;
}

export interface MenuSection {
  title: string;
  items: MenuItem[];
}

export const PLATFORM_MENU: MenuItem[] = [
  { title: "Platform Overview", description: "The unified AI revenue operating system", href: "/platform", iconName: "Zap", badge: "Core" },
  { title: "Lead Finder", description: "480M+ verified B2B contacts with 8D search", href: "/platform/lead-finder", iconName: "Search", badge: "8 Dimensions" },
  { title: "Email Outreach", description: "Multi-inbox rotation & automated warmup", href: "/platform/email-outreach", iconName: "Mail" },
  { title: "LinkedIn Automation", description: "100% safe official versioned API", href: "/platform/linkedin-automation", iconName: "Linkedin" },
  { title: "AI Agents", description: "Autonomous 24/7 AI Sales Development Reps", href: "/platform/ai-agents", iconName: "Bot", badge: "AI" },
  { title: "Voice AI / Calls", description: "Real-time conversational WebRTC outbound caller", href: "/platform/voice-ai", iconName: "PhoneCall", badge: "Sub-400ms" },
  { title: "CRM", description: "Native zero-sync deals & unified contact timeline", href: "/platform/crm", iconName: "Building2" },
  { title: "Workflow Automation", description: "Visual multi-step trigger & action graph", href: "/platform/workflow-automation", iconName: "Layers" },
  { title: "Analytics", description: "Cross-channel revenue & deliverability attribution", href: "/platform/analytics", iconName: "BarChart3" },
  { title: "Campaign Management", description: "Multi-channel sequence builder & testing", href: "/platform/campaign-management", iconName: "Workflow" },
  { title: "Deliverability Guard", description: "Automated SPF, DKIM & inbox health monitoring", href: "/platform/deliverability", iconName: "ShieldCheck", badge: "99.4%" },
  { title: "Integrations", description: "50+ native integrations with Google, O365 & CRMs", href: "/platform/integrations", iconName: "Cpu" },
];

export const SOLUTIONS_MENU: MenuItem[] = [
  { title: "For Sales Teams", description: "Scale meeting volume without adding headcount", href: "/solutions/sales-teams", iconName: "Users" },
  { title: "For Founders", description: "Automate founder-led outbound from day one", href: "/solutions/founders", iconName: "Sparkles", badge: "Fast Setup" },
  { title: "For Agencies", description: "White-label portals & pooled client wallets", href: "/solutions/agencies", iconName: "Building2", badge: "White-Label" },
  { title: "For Recruiters", description: "Find and engage passive top-tier candidates", href: "/solutions/recruiters", iconName: "Search" },
  { title: "For Marketing Teams", description: "Full-funnel intent capture & target account tracking", href: "/solutions/marketing", iconName: "BarChart3" },
  { title: "For Revenue Teams", description: "Zero-sync RevOps with single database governance", href: "/solutions/revops", iconName: "Layers" },
];

export const USE_CASES_MENU: MenuItem[] = [
  { title: "Cold Email Outreach", description: "High-deliverability multi-inbox campaigns", href: "/use-cases/cold-email", iconName: "Mail" },
  { title: "Lead Generation", description: "High-accuracy B2B account & lead targeting", href: "/use-cases/lead-generation", iconName: "Search" },
  { title: "LinkedIn Prospecting", description: "Automated bans-free connection & DMs", href: "/use-cases/linkedin-prospecting", iconName: "Linkedin" },
  { title: "Contact Search", description: "Multi-dimension lead discovery", href: "/use-cases/lead-Contact Search", iconName: "CheckCircle2" },
  { title: "Automated Follow-ups", description: "Smart multi-touch sequences across channels", href: "/use-cases/automated-followups", iconName: "Workflow" },
  { title: "Appointment Setting", description: "Auto-qualify leads and book calendar slots", href: "/use-cases/appointment-setting", iconName: "PhoneCall" },
  { title: "AI Sales Development", description: "Autonomous SDRs prospecting around the clock", href: "/use-cases/ai-sdr", iconName: "Bot" },
  { title: "Multi-Channel Outreach", description: "Synchronized Email + LinkedIn + Voice AI", href: "/use-cases/multichannel", iconName: "Layers" },
  { title: "Pipeline Management", description: "Zero-latency deal progression tracking", href: "/use-cases/pipeline-management", iconName: "Building2" },
  { title: "Sales Automation", description: "Replace 6 disjointed tools with 1 schema", href: "/use-cases/sales-automation", iconName: "Zap" },
];

export const RESOURCES_MENU: MenuItem[] = [
  { title: "Blog", description: "Insights, tactics & benchmarks for outbound revenue", href: "/resources/blog", iconName: "FileText" },
  { title: "Guides & Masterclasses", description: "Deep-dive playbooks for outbound scaling", href: "/resources/guides", iconName: "BookOpen" },
  { title: "Case Studies", description: "Proven revenue ROI from high-growth teams", href: "/resources/case-studies", iconName: "TrendingUp" },
  { title: "Customer Stories", description: "How agencies & SaaS founders win with Outtricks", href: "/resources/customer-stories", iconName: "Heart" },
  { title: "Playbooks", description: "Step-by-step cold outreach execution blueprints", href: "/resources/playbooks", iconName: "Workflow" },
  { title: "Cold Outreach Templates", description: "50+ battle-tested email & LinkedIn scripts", href: "/resources/templates", iconName: "Copy" },
  { title: "Outreach Academy", description: "Certified B2B outbound masterclass", href: "/resources/academy", iconName: "Award", badge: "Free" },
  { title: "Free Tools Hub", description: "AI writers, calculators, and deliverability checkers", href: "/resources/free-tools", iconName: "Sparkles", badge: "5 Tools" },
  { title: "Help Center & Docs", description: "API documentation & setup walkthroughs", href: "/resources/help-center", iconName: "HelpCircle" },
  { title: "Changelog", description: "Weekly product updates and release notes", href: "/resources/changelog", iconName: "Clock" },
];

export const FREE_TOOLS_MENU: MenuItem[] = [
  { title: "Cold Email Generator", description: "Generate hyper-personalized cold emails with AI", href: "/free-tools/cold-email-generator", iconName: "Mail", badge: "AI Tool" },
  { title: "Subject Line Generator", description: "Generate & score subject lines for high open rates", href: "/free-tools/subject-line-generator", iconName: "Zap" },
  { title: "Cold Email ROI Calculator", description: "Calculate your pipeline & revenue impact", href: "/free-tools/roi-calculator", iconName: "DollarSign" },
  { title: "Lead Generation Calculator", description: "Estimate your ICP TAM & required send volume", href: "/free-tools/lead-calculator", iconName: "Users" },
  { title: "Email Deliverability Checker", description: "Test SPF, DKIM, DMARC & spam score", href: "/free-tools/deliverability-checker", iconName: "ShieldCheck", badge: "Live Test" },
];

export const COMPARISONS_MENU: MenuItem[] = [
  { title: "Outtricks vs Apollo", description: "Why single-database outreach beats siloed data", href: "/comparisons/outtricks-vs-apollo", iconName: "Flame" },
  { title: "Outtricks vs Instantly", description: "Voice AI & Official LinkedIn vs email-only", href: "/comparisons/outtricks-vs-instantly", iconName: "Flame" },
  { title: "Outtricks vs Clay", description: "Built-in execution & dialing vs spreadsheet-only", href: "/comparisons/outtricks-vs-clay", iconName: "Flame" },
  { title: "Outtricks vs Smartlead", description: "Full CRM & autonomous calling vs sending tool", href: "/comparisons/outtricks-vs-smartlead", iconName: "Flame" },
  { title: "Outtricks vs Lemlist", description: "Autonomous AI Voice SDR & 0 sync hops", href: "/comparisons/outtricks-vs-lemlist", iconName: "Flame", badge: "Popular" },
  { title: "Outtricks vs Outreach", description: "Modern AI-first architecture at 1/5th the cost", href: "/comparisons/outtricks-vs-outreach", iconName: "Flame" },
];
