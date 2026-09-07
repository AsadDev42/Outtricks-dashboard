export interface SolutionData {
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  heroDescription: string;
  keyBenefits: { title: string; desc: string; icon: string }[];
  metrics: { value: string; label: string }[];
  quote: { text: string; author: string; role: string; company: string };
  actionPoints: string[];
}

export interface UseCaseData {
  slug: string;
  title: string;
  badge: string;
  tagline: string;
  description: string;
  steps: { step: string; title: string; desc: string }[];
  stats: { value: string; label: string }[];
  keyFeatures: string[];
}

export interface ComparisonData {
  slug: string;
  competitor: string;
  competitorTagline: string;
  summary: string;
  prosOuttricks: string[];
  consCompetitor: string[];
  tableRows: { feature: string; outtricks: string; competitor: string; winner: 'outtricks' | 'competitor' | 'tie' }[];
  verdict: string;
}

export const COMPARISONS_DATA: Record<string, ComparisonData> = {
  "outtricks-vs-apollo": {
    slug: "outtricks-vs-apollo",
    competitor: "Apollo.io",
    competitorTagline: "Legacy B2B database & email sequences",
    summary: "While Apollo offers a massive contact directory, its multi-inbox deliverability is limited and it lacks autonomous Voice AI, official LinkedIn API execution, and freelance bidding. Outtricks combines lead intelligence with 6 execution channels on 1 single database.",
    prosOuttricks: [
      "Real-time WebRTC Autonomous Voice AI SDR with live booking",
      "Unlimited inbox rotation with automated gradual warmup ramps",
      "100% safe Official LinkedIn API (no Chrome extensions required)",
      "24/7 Upwork & Freelancer feed bidding engine",
      "Zero sync lag with native PostgreSQL deal pipeline"
    ],
    consCompetitor: [
      "No autonomous voice calling (manual dialer only)",
      "Frequent email deliverability drops and shared domain risks",
      "Complex seat-based pricing that gets expensive at scale",
      "No freelance marketplace proposal automation"
    ],
    tableRows: [
      { feature: "Multi-Inbox Cold Email Rotation", outtricks: "Built-in SPF/DKIM auto-rotation", competitor: "Basic rotation on higher tiers", winner: "outtricks" },
      { feature: "Autonomous Real-Time Voice AI", outtricks: "Native WebRTC Assistant (Sub-400ms)", competitor: "Manual click-to-call dialer only", winner: "outtricks" },
      { feature: "LinkedIn Automation", outtricks: "100% Official Versioned API", competitor: "Chrome extension / basic tasks", winner: "outtricks" },
      { feature: "Freelance Proposal Bidding", outtricks: "Auto-submits in <3 mins (Upwork/Freelancer)", competitor: "Not supported", winner: "outtricks" },
      { feature: "B2B Lead Database", outtricks: "480M+ Contacts with contact search", competitor: "Large database (Email accuracy varies)", winner: "tie" },
      { feature: "Data Architecture", outtricks: "1 Single Immutable PostgreSQL Schema", competitor: "Separate CRM sync required", winner: "outtricks" }
    ],
    verdict: "Choose Outtricks if you want full autonomous multi-channel execution (Email, Voice, LinkedIn, Bidding) on one database without paying extra for external dialers and warmup tools."
  },
  "outtricks-vs-instantly": {
    slug: "outtricks-vs-instantly",
    competitor: "Instantly.ai",
    competitorTagline: "Cold email sending & warmup tool",
    summary: "Instantly is built primarily for high-volume cold email. Outtricks provides true multi-channel sales engagement by adding autonomous Voice AI SDRs, official LinkedIn automation, 24/7 freelance bidding, and a built-in CRM.",
    prosOuttricks: [
      "Autonomous Voice AI calling that handles objections & books meetings",
      "Official LinkedIn API for multi-touch follow-ups",
      "Upwork & Freelancer marketplace bidding engine",
      "Native Deals Pipeline & Unified Multi-Channel Inbox",
      "Row-level multi-tenant agency white-label portals"
    ],
    consCompetitor: [
      "Email-only focus (No Voice AI or LinkedIn automation)",
      "Requires external CRM (HubSpot/Salesforce) with webhook sync",
      "No freelance marketplace bidding features",
      "Requires third-party tools for phone verification"
    ],
    tableRows: [
      { feature: "Cold Email Warmup", outtricks: "Built-in automated warmup ramp", competitor: "Built-in warmup pool", winner: "tie" },
      { feature: "Autonomous Voice AI SDR", outtricks: "Native WebRTC conversational SDR", competitor: "Not supported", winner: "outtricks" },
      { feature: "LinkedIn Touchpoints", outtricks: "Official versioned API (Dedicated IP)", competitor: "Not supported", winner: "outtricks" },
      { feature: "Freelance Proposal Bidding", outtricks: "24/7 AI proposal engine", competitor: "Not supported", winner: "outtricks" },
      { feature: "Native CRM Pipeline", outtricks: "Zero-sync Deals Kanban included", competitor: "Basic CRM / External sync needed", winner: "outtricks" }
    ],
    verdict: "Instantly is a great cold email sender, but Outtricks is a full multi-channel revenue engine that contacts prospects across Email, LinkedIn, and Phone."
  },
  "outtricks-vs-clay": {
    slug: "outtricks-vs-clay",
    competitor: "Clay.com",
    competitorTagline: "Spreadsheet-based Lead Search tool",
    summary: "Clay is a powerful Lead Search canvas, but it does not execute cold emails, place autonomous phone calls, or automate LinkedIn actions. Outtricks handles both Lead Search and autonomous multi-channel execution in one product.",
    prosOuttricks: [
      "Built-in multi-inbox email sender with automated warmup",
      "Autonomous Voice AI SDR caller included natively",
      "Official LinkedIn versioned API execution",
      "No complex formula writing or credit burning per API call",
      "Native CRM & Deal Pipeline included"
    ],
    consCompetitor: [
      "Data sourcing only: requires separate sending tools like Smartlead/Instantly",
      "Steep learning curve with formula tables",
      "High credit costs for third-party API lookups ($349-$800+/mo)",
      "No autonomous voice calling or marketplace bidding"
    ],
    tableRows: [
      { feature: "B2B Lead discovery", outtricks: "Built-in 8D contact search", competitor: "Multi-provider table integrations", winner: "tie" },
      { feature: "Email Sending & Warmup", outtricks: "Native multi-inbox sending & warmup", competitor: "Requires external tool (Smartlead/Instantly)", winner: "outtricks" },
      { feature: "Voice AI Calling", outtricks: "Native autonomous SDR caller", competitor: "Not supported", winner: "outtricks" },
      { feature: "Setup Complexity", outtricks: "Instant 1-click campaigns", competitor: "Complex spreadsheet formulas", winner: "outtricks" },
      { feature: "Total Cost of Ownership", outtricks: "$79-$199/mo (All-in-one)", competitor: "$349-$1,000+/mo (Clay + Sender + Dialers)", winner: "outtricks" }
    ],
    verdict: "If you want an all-in-one revenue platform that finds leads AND executes multi-channel outreach without managing a 5-tool stack, choose Outtricks."
  },
  "outtricks-vs-smartlead": {
    slug: "outtricks-vs-smartlead",
    competitor: "Smartlead.ai",
    competitorTagline: "Cold email platform with unlimited inboxes",
    summary: "Smartlead is focused on cold email infrastructure. Outtricks matches Smartlead's multi-inbox rotation and warmup while adding autonomous Voice AI SDRs, official LinkedIn outreach, and freelance proposal bidding.",
    prosOuttricks: [
      "Autonomous Voice AI calling with live calendar booking",
      "100% Official LinkedIn API automation",
      "Upwork & Freelancer feed proposal bidding",
      "Built-in 8D B2B contact database (480M+ leads)",
      "Native Deals Pipeline & unified activity stream"
    ],
    consCompetitor: [
      "Email-only platform (no native Voice SDR)",
      "No freelance marketplace bidding engine",
      "Requires third-party B2B contact databases for list building",
      "External CRM synchronization needed"
    ],
    tableRows: [
      { feature: "Multi-Inbox Sending", outtricks: "Google, O365 & SES rotation", competitor: "Google & O365 rotation", winner: "tie" },
      { feature: "Voice AI SDR Caller", outtricks: "Native WebRTC conversational SDR", competitor: "Not supported", winner: "outtricks" },
      { feature: "LinkedIn Outreach", outtricks: "Official versioned API (Dedicated IP)", competitor: "Not supported", winner: "outtricks" },
      { feature: "B2B Lead Database", outtricks: "480M+ verified contacts built-in", competitor: "Requires external vendor (Apollo/ListKit)", winner: "outtricks" }
    ],
    verdict: "Outtricks gives you everything Smartlead offers plus Voice AI, LinkedIn, Upwork Bidding, and a 480M+ Lead Database in one login."
  },
  "outtricks-vs-lemlist": {
    slug: "outtricks-vs-lemlist",
    competitor: "Lemlist",
    competitorTagline: "Multichannel sales engagement platform",
    summary: "Lemlist popularized multi-channel outreach, but its calling is manual and relies on Chrome extensions for LinkedIn. Outtricks provides autonomous Voice AI calling, official LinkedIn API safety, 24/7 Upwork bidding, and 1 single database.",
    prosOuttricks: [
      "Autonomous Voice AI SDR that dials & converses automatically",
      "100% Official LinkedIn API (0% ban risk vs extension bots)",
      "Freelance Bidding Engine for Upwork & Freelancer",
      "Zero-sync single PostgreSQL database architecture",
      "Append-only transparent credit ledger"
    ],
    consCompetitor: [
      "Manual phone calls only (requires rep to dial manually)",
      "LinkedIn automation uses risky browser extensions",
      "High per-user pricing ($87-$150+/seat/mo)",
      "No freelance marketplace proposal automation"
    ],
    tableRows: [
      { feature: "Voice Calling Capability", outtricks: "Autonomous WebRTC Voice AI SDR", competitor: "Manual click-to-dial only", winner: "outtricks" },
      { feature: "LinkedIn Automation Safety", outtricks: "100% Official Versioned API", competitor: "Chrome extension bot", winner: "outtricks" },
      { feature: "Marketplace Bidding (Upwork)", outtricks: "Auto-submits in <3 mins", competitor: "Not supported", winner: "outtricks" },
      { feature: "Data Sync Architecture", outtricks: "1 Single DB (0 hops, 0 sync lag)", competitor: "External CRM webhooks (4-5 hops)", winner: "outtricks" },
      { feature: "Agency Multi-Tenancy", outtricks: "Custom white-label & pooled credit ledger", competitor: "Seat-based team management", winner: "outtricks" }
    ],
    verdict: "Outtricks beats Lemlist with autonomous Voice AI, safe official LinkedIn API execution, and Upwork bidding at a fraction of the cost."
  },
  "outtricks-vs-outreach": {
    slug: "outtricks-vs-outreach",
    competitor: "Outreach.io",
    competitorTagline: "Enterprise sales execution platform",
    summary: "Outreach is an expensive enterprise platform requiring annual contracts ($150-$200+/user/month) and months of implementation. Outtricks is a modern, lightweight, AI-native revenue operating system with autonomous agents and instant self-serve setup.",
    prosOuttricks: [
      "Self-serve 7-day free trial with instant setup",
      "Autonomous Voice AI SDRs and freelance bidding",
      "Built-in 480M+ verified B2B lead database",
      "1/5th the total cost of ownership",
      "No annual lock-in contracts required"
    ],
    consCompetitor: [
      "Expensive annual enterprise contracts ($10,000+ minimums)",
      "Heavy, complex onboarding taking 2-3 months",
      "No built-in B2B contact prospecting database",
      "No autonomous voice calling SDR"
    ],
    tableRows: [
      { feature: "Onboarding Time", outtricks: "Instant (< 5 minutes self-serve)", competitor: "8-12 weeks enterprise deployment", winner: "outtricks" },
      { feature: "Voice Capabilities", outtricks: "Autonomous WebRTC Voice AI Agent", competitor: "Rep dialer & conversation intelligence", winner: "outtricks" },
      { feature: "Built-in Lead Database", outtricks: "480M+ verified contacts included", competitor: "Requires ZoomInfo/Apollo integration", winner: "outtricks" },
      { feature: "Pricing & Contracts", outtricks: "Flexible monthly / annual ($79-$199/mo)", competitor: "Strict annual contracts ($150+/seat)", winner: "outtricks" }
    ],
    verdict: "Outtricks offers modern enterprise-grade multi-channel outreach without the $15,000 annual contract or months of setup pain."
  }
};

