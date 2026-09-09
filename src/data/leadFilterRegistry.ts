import { LeadFilterState } from '../context/LeadSearchContext';

export type FilterCategory = 
  | 'person' 
  | 'company' 
  | 'engagement' 
  | 'conversation' 
  | 'source' 
  | 'misc';

export interface FilterCategoryMeta {
  id: FilterCategory;
  label: string;
  description: string;
}

export const FILTER_CATEGORIES: FilterCategoryMeta[] = [
  { id: 'person', label: 'Person Info', description: 'Individual prospect title, seniority, education, and contact channels' },
  { id: 'company', label: 'Company Info', description: 'Firmographics, headcount, technographics, funding, and revenue' },
  { id: 'engagement', label: 'Engagement Activity', description: 'Campaign sequences, email interactions, and outreach history' },
  { id: 'conversation', label: 'Conversation', description: 'Dialer recordings and spoken tracker keyword signals' },
  { id: 'source', label: 'Created Source', description: 'Import origins, CSV uploads, and connected integrations' },
  { id: 'misc', label: 'Misc.', description: 'List memberships, territories, and CRM duplicate protection' },
];

export interface FilterDefinition {
  id: string;
  label: string;
  category: FilterCategory;
  iconName: string;
  searchKeywords: string[];
  locked?: boolean;
  beta?: boolean;
  hasHelpTooltip?: string;
  controlType: string;
  calculateActiveCount: (state: LeadFilterState) => number;
}

export const DEFAULT_PINNED_FILTER_IDS = ['jobTitles', 'company', 'location', 'industryKeywords'];

export const FILTER_DEFINITIONS: FilterDefinition[] = [
  // ==========================================
  // PERSON INFO
  // ==========================================
  {
    id: 'jobTitles',
    label: 'Job Titles',
    category: 'person',
    iconName: 'Briefcase',
    searchKeywords: ['job titles', 'roles', 'title', 'position', 'designation', 'occupation', 'decision maker'],
    controlType: 'jobTitles',
    calculateActiveCount: (state) => {
      let c = 0;
      if (state.roles?.length) c += state.roles.length;
      if (state.excludeRoles?.length) c += state.excludeRoles.length;
      if (state.seniority?.length) c += state.seniority.length;
      if (state.departments?.length) c += state.departments.length;
      if (state.includeSimilarTitles) c += 1;
      if (state.includePastTitles) c += 1;
      return c;
    },
  },
  {
    id: 'persona',
    label: 'Persona',
    category: 'person',
    iconName: 'UserCheck',
    searchKeywords: ['persona', 'icp', 'target buyer', 'buyer persona', 'archetype'],
    controlType: 'persona',
    calculateActiveCount: (state) => state.managementLevel?.length || 0,
  },
  {
    id: 'emailStatus',
    label: 'Email Status',
    category: 'person',
    iconName: 'MailCheck',
    searchKeywords: ['email status', 'deliverability', 'verified email', 'valid email', 'catchall', 'email'],
    controlType: 'emailStatus',
    calculateActiveCount: (state) => {
      let c = 0;
      if (state.deliverability === 'verified_only') c += 1;
      if (state.contactTypes?.length) c += state.contactTypes.length;
      return c;
    },
  },
  {
    id: 'name',
    label: 'Name',
    category: 'person',
    iconName: 'User',
    searchKeywords: ['name', 'first name', 'last name', 'person name'],
    controlType: 'name',
    calculateActiveCount: (state) => (state.searchQuery?.trim() ? 1 : 0),
  },
  {
    id: 'education',
    label: 'Education',
    category: 'person',
    iconName: 'GraduationCap',
    searchKeywords: ['education', 'school', 'university', 'college', 'degree', 'major', 'graduation year'],
    controlType: 'education',
    calculateActiveCount: (state) => {
      let c = 0;
      if (state.educationSchools?.length) c += state.educationSchools.length;
      if (state.educationDegrees?.length) c += state.educationDegrees.length;
      if (state.educationMajors?.length) c += state.educationMajors.length;
      if (state.graduationYearMin || state.graduationYearMax) c += 1;
      if (state.education?.length) c += state.education.length;
      return c;
    },
  },
  {
    id: 'awardsCertifications',
    label: 'Awards & Certifications',
    category: 'person',
    iconName: 'Award',
    beta: true,
    searchKeywords: ['awards', 'certifications', 'pmp', 'aws certified', 'badges', 'honors'],
    controlType: 'awardsCertifications',
    calculateActiveCount: (state) => state.skills?.length || 0,
  },
  {
    id: 'workUrls',
    label: 'Work URLs',
    category: 'person',
    iconName: 'Link2',
    searchKeywords: ['work urls', 'linkedin url', 'profile url', 'github', 'social profile', 'website'],
    controlType: 'workUrls',
    calculateActiveCount: () => 0,
  },
  {
    id: 'timeZone',
    label: 'Time Zone',
    category: 'person',
    iconName: 'Globe',
    searchKeywords: ['time zone', 'timezone', 'pst', 'est', 'gmt', 'utc', 'hours'],
    controlType: 'timeZone',
    calculateActiveCount: (state) => state.timeZones?.length || 0,
  },
  {
    id: 'experience',
    label: 'Total Years of Experience',
    category: 'person',
    iconName: 'Calendar',
    searchKeywords: ['years of experience', 'experience', 'total experience', 'career years'],
    controlType: 'experience',
    calculateActiveCount: (state) => state.yearsInRole?.length || 0,
  },
  {
    id: 'jobChange',
    label: 'Job Change',
    category: 'person',
    iconName: 'ArrowRightLeft',
    searchKeywords: ['job change', 'new hire', 'promoted', 'changed jobs', 'recent change'],
    controlType: 'jobChange',
    calculateActiveCount: () => 0,
  },
  {
    id: 'timeInRole',
    label: 'Time in Current Role',
    category: 'person',
    iconName: 'Clock',
    searchKeywords: ['time in role', 'tenure', 'months in role', 'role duration'],
    controlType: 'timeInRole',
    calculateActiveCount: () => 0,
  },
  {
    id: 'territories',
    label: 'Territories',
    category: 'person',
    iconName: 'Compass',
    locked: true,
    searchKeywords: ['territories', 'territory', 'sales region', 'assigned territory'],
    controlType: 'territories',
    calculateActiveCount: () => 0,
  },
  {
    id: 'personDeleted',
    label: 'Person Deleted',
    category: 'person',
    iconName: 'Trash2',
    hasHelpTooltip: 'Filter out prospects who have been soft-deleted or marked as removed in CRM',
    searchKeywords: ['person deleted', 'deleted', 'removed contacts', 'trash'],
    controlType: 'personDeleted',
    calculateActiveCount: () => 0,
  },

  // ==========================================
  // COMPANY INFO
  // ==========================================
  {
    id: 'company',
    label: 'Company',
    category: 'company',
    iconName: 'Building2',
    searchKeywords: ['company', 'account', 'employer', 'organization', 'domains', 'website'],
    controlType: 'company',
    calculateActiveCount: (state) => {
      let c = 0;
      if (state.companies?.length) c += state.companies.length;
      if (state.excludeCompanies?.length) c += state.excludeCompanies.length;
      if (state.companyDomains?.length) c += state.companyDomains.length;
      if (state.excludeCompanyDomains?.length) c += state.excludeCompanyDomains.length;
      return c;
    },
  },
  {
    id: 'companyLookalikes',
    label: 'Company Lookalikes',
    category: 'company',
    iconName: 'Sparkles',
    locked: true,
    searchKeywords: ['lookalikes', 'similar companies', 'ai match', 'competitor lookalike'],
    controlType: 'companyLookalikes',
    calculateActiveCount: () => 0,
  },
  {
    id: 'employees',
    label: '# Employees',
    category: 'company',
    iconName: 'Users',
    searchKeywords: ['employees', 'headcount', 'company size', 'team size', 'number of employees', 'staff'],
    controlType: 'employees',
    calculateActiveCount: (state) => {
      if (state.headcountRangeType === 'custom' && (state.customHeadcountMin || state.customHeadcountMax)) return 1;
      return (state.headcount?.length || 0) + (state.excludeHeadcount?.length || 0);
    },
  },
  {
    id: 'location',
    label: 'Location',
    category: 'company',
    iconName: 'MapPin',
    searchKeywords: ['location', 'geography', 'city', 'state', 'country', 'zip', 'postal code', 'metro', 'region', 'headquarters', 'hq'],
    controlType: 'location',
    calculateActiveCount: (state) => {
      let c = 0;
      const contactLocs = (state.contactLocations?.length) ? state.contactLocations : state.locations;
      const excludeContactLocs = (state.excludeContactLocations?.length) ? state.excludeContactLocations : (state.excludeLocations || []);
      if (contactLocs?.length) c += contactLocs.length;
      if (excludeContactLocs?.length) c += excludeContactLocs.length;
      if (state.accountLocations?.length) c += state.accountLocations.length;
      if (state.excludeAccountLocations?.length) c += state.excludeAccountLocations.length;
      if (state.zipPostalRadius?.enabled && state.zipPostalRadius.zip.trim()) c += 1;
      return c;
    },
  },
  {
    id: 'industryKeywords',
    label: 'Industry & Keywords',
    category: 'company',
    iconName: 'Layers',
    searchKeywords: ['industry', 'keywords', 'vertical', 'niche', 'tags', 'sector', 'company keywords'],
    controlType: 'industryKeywords',
    calculateActiveCount: (state) => {
      let c = 0;
      if (state.industries?.length) c += state.industries.length;
      if (state.excludeIndustries?.length) c += state.excludeIndustries.length;
      if (state.industryKeywords?.length) c += state.industryKeywords.length;
      if (state.excludeIndustryKeywords?.length) c += state.excludeIndustryKeywords.length;
      return c;
    },
  },
  {
    id: 'marketSegments',
    label: 'Market Segments',
    category: 'company',
    iconName: 'PieChart',
    searchKeywords: ['market segments', 'segments', 'smb', 'mid-market', 'enterprise', 'b2b', 'b2c'],
    controlType: 'marketSegments',
    calculateActiveCount: (state) => state.companyTypes?.length || 0,
  },
  {
    id: 'sicNaics',
    label: 'SIC and NAICS',
    category: 'company',
    iconName: 'Hash',
    searchKeywords: ['sic', 'naics', 'industry codes', 'government classification', 'code'],
    controlType: 'sicNaics',
    calculateActiveCount: () => 0,
  },
  {
    id: 'buyingIntent',
    label: 'Buying Intent',
    category: 'company',
    iconName: 'TrendingUp',
    searchKeywords: ['buying intent', 'intent topics', 'signals', 'in market', 'high intent', 'hiring surge'],
    controlType: 'buyingIntent',
    calculateActiveCount: (state) => {
      let c = 0;
      if (state.intentTopics?.length) c += state.intentTopics.length;
      if (state.excludeIntentTopics?.length) c += state.excludeIntentTopics.length;
      if (state.intentSignals?.length) c += state.intentSignals.length;
      if (state.excludeIntentSignals?.length) c += state.excludeIntentSignals.length;
      return c;
    },
  },
  {
    id: 'technologies',
    label: 'Technologies',
    category: 'company',
    iconName: 'Cpu',
    searchKeywords: ['technologies', 'tech stack', 'software', 'salesforce', 'hubspot', 'aws', 'tools', 'installed tech'],
    controlType: 'technologies',
    calculateActiveCount: (state) => (state.technologies?.length || 0) + (state.excludeTechnologies?.length || 0),
  },
  {
    id: 'employeesByDept',
    label: '# Employees by Dept.',
    category: 'company',
    iconName: 'UsersRound',
    locked: true,
    searchKeywords: ['employees by dept', 'engineering headcount', 'sales headcount', 'department size'],
    controlType: 'employeesByDept',
    calculateActiveCount: () => 0,
  },
  {
    id: 'headcountGrowth',
    label: 'Headcount Growth',
    category: 'company',
    iconName: 'LineChart',
    searchKeywords: ['headcount growth', 'growth rate', 'fast growing', 'hiring velocity', 'growth %'],
    controlType: 'headcountGrowth',
    calculateActiveCount: (state) => {
      let c = 0;
      if (state.headcountGrowthMin || state.headcountGrowthMax) c += 1;
      if (state.headcountGrowthDepartment?.length) c += state.headcountGrowthDepartment.length;
      if (state.growthRate?.length) c += state.growthRate.length;
      return c;
    },
  },
  {
    id: 'revenue',
    label: 'Revenue',
    category: 'company',
    iconName: 'DollarSign',
    searchKeywords: ['revenue', 'arr', 'annual revenue', 'turnover', 'sales volume', 'financials'],
    controlType: 'revenue',
    calculateActiveCount: (state) => (state.revenue?.length || 0) + (state.excludeRevenue?.length || 0),
  },
  {
    id: 'funding',
    label: 'Funding',
    category: 'company',
    iconName: 'Banknote',
    searchKeywords: ['funding', 'series a', 'series b', 'venture capital', 'seed', 'total funding', 'investors'],
    controlType: 'funding',
    calculateActiveCount: (state) => (state.fundingStage?.length || 0) + (state.totalFunding?.length || 0),
  },
  {
    id: 'foundedYear',
    label: 'Founded Year',
    category: 'company',
    iconName: 'CalendarDays',
    searchKeywords: ['founded year', 'year founded', 'vintage', 'company age', 'startup year'],
    controlType: 'foundedYear',
    calculateActiveCount: (state) => state.foundedYear?.length || 0,
  },
  {
    id: 'languages',
    label: 'Languages',
    category: 'company',
    iconName: 'Languages',
    searchKeywords: ['languages', 'language', 'english', 'spanish', 'german', 'multilingual'],
    controlType: 'languages',
    calculateActiveCount: (state) => state.languages?.length || 0,
  },
  {
    id: 'retailLocations',
    label: 'Retail Locations',
    category: 'company',
    iconName: 'Store',
    locked: true,
    searchKeywords: ['retail locations', 'stores', 'branches', 'physical locations'],
    controlType: 'retailLocations',
    calculateActiveCount: () => 0,
  },
  {
    id: 'jobPostings',
    label: 'Job Postings',
    category: 'company',
    iconName: 'BriefcaseBusiness',
    locked: true,
    searchKeywords: ['job postings', 'active hiring', 'open roles', 'job openings'],
    controlType: 'jobPostings',
    calculateActiveCount: () => 0,
  },
  {
    id: 'news',
    label: 'News',
    category: 'company',
    iconName: 'Newspaper',
    locked: true,
    searchKeywords: ['news', 'press releases', 'media coverage', 'pr announcements'],
    controlType: 'news',
    calculateActiveCount: () => 0,
  },
  {
    id: 'websiteVisitors',
    label: 'Website Visitors',
    category: 'company',
    iconName: 'Radar',
    searchKeywords: ['website visitors', 'visitor tracking', 'ip de-anonymization', 'traffic', 'inbound'],
    controlType: 'websiteVisitors',
    calculateActiveCount: () => 0,
  },

  // ==========================================
  // ENGAGEMENT ACTIVITY
  // ==========================================
  {
    id: 'sequence',
    label: 'Sequence',
    category: 'engagement',
    iconName: 'Send',
    searchKeywords: ['sequence', 'cadence', 'campaign', 'active sequence', 'finished sequence'],
    controlType: 'sequence',
    calculateActiveCount: (state) => state.engagementStatus?.length || 0,
  },
  {
    id: 'workflows',
    label: 'Workflows',
    category: 'engagement',
    iconName: 'Zap',
    searchKeywords: ['workflows', 'automation', 'triggers', 'active flows'],
    controlType: 'workflows',
    calculateActiveCount: () => 0,
  },
  {
    id: 'emailOpened',
    label: 'Email Opened',
    category: 'engagement',
    iconName: 'MailOpen',
    hasHelpTooltip: 'Contacts who have opened at least one campaign email',
    searchKeywords: ['email opened', 'opens', 'read email', 'open tracking'],
    controlType: 'emailOpened',
    calculateActiveCount: () => 0,
  },
  {
    id: 'lastActivity',
    label: 'Last Activity',
    category: 'engagement',
    iconName: 'History',
    searchKeywords: ['last activity', 'last contacted', 'recency', 'recent activity'],
    controlType: 'lastActivity',
    calculateActiveCount: (state) => state.activityRecency?.length || 0,
  },
  {
    id: 'emailSent',
    label: 'Email Sent',
    category: 'engagement',
    iconName: 'Mail',
    hasHelpTooltip: 'Target prospects who have received outreach emails',
    searchKeywords: ['email sent', 'sent count', 'outreach delivered'],
    controlType: 'emailSent',
    calculateActiveCount: () => 0,
  },
  {
    id: 'emailClicked',
    label: 'Email Clicked',
    category: 'engagement',
    iconName: 'MousePointerClick',
    hasHelpTooltip: 'Contacts who clicked a link in outreach messages',
    searchKeywords: ['email clicked', 'clicks', 'link click', 'engagement click'],
    controlType: 'emailClicked',
    calculateActiveCount: () => 0,
  },
  {
    id: 'emailReplied',
    label: 'Email Replied',
    category: 'engagement',
    iconName: 'MessageSquareReply',
    hasHelpTooltip: 'Contacts who sent an active response to outreach',
    searchKeywords: ['email replied', 'replies', 'response', 'answered'],
    controlType: 'emailReplied',
    calculateActiveCount: () => 0,
  },
  {
    id: 'emailMeetingSet',
    label: 'Email Meeting Set',
    category: 'engagement',
    iconName: 'CalendarCheck',
    hasHelpTooltip: 'Contacts who booked a demo or meeting through outreach',
    searchKeywords: ['email meeting set', 'demo booked', 'meeting', 'calendar schedule'],
    controlType: 'emailMeetingSet',
    calculateActiveCount: () => 0,
  },
  {
    id: 'emailBounced',
    label: 'Email Bounced',
    category: 'engagement',
    iconName: 'MailX',
    hasHelpTooltip: 'Emails that failed delivery due to hard or soft bounce',
    searchKeywords: ['email bounced', 'bounces', 'delivery failure', 'invalid email'],
    controlType: 'emailBounced',
    calculateActiveCount: () => 0,
  },
  {
    id: 'emailUnsubscribed',
    label: 'Email Unsubscribed',
    category: 'engagement',
    iconName: 'UserMinus',
    hasHelpTooltip: 'Contacts who opted out of future campaigns',
    searchKeywords: ['email unsubscribed', 'opt out', 'unsubscribes', 'dnc email'],
    controlType: 'emailUnsubscribed',
    calculateActiveCount: () => 0,
  },
  {
    id: 'emailSpamblocked',
    label: 'Email Spamblocked',
    category: 'engagement',
    iconName: 'ShieldAlert',
    hasHelpTooltip: 'Emails blocked by spam filter or marked as junk',
    searchKeywords: ['email spamblocked', 'spam complaint', 'blocked'],
    controlType: 'emailSpamblocked',
    calculateActiveCount: () => 0,
  },
  {
    id: 'emailAutoResponder',
    label: 'Email Auto Responder',
    category: 'engagement',
    iconName: 'Bot',
    searchKeywords: ['email auto responder', 'out of office', 'ooo', 'auto reply'],
    controlType: 'emailAutoResponder',
    calculateActiveCount: () => 0,
  },
  {
    id: 'callRestrictions',
    label: 'Call Restrictions',
    category: 'engagement',
    iconName: 'PhoneOff',
    hasHelpTooltip: 'Do Not Call list checks and country dialer compliance',
    searchKeywords: ['call restrictions', 'do not call', 'dnc', 'phone restriction'],
    controlType: 'callRestrictions',
    calculateActiveCount: () => 0,
  },

  // ==========================================
  // CONVERSATION
  // ==========================================
  {
    id: 'conversationRecording',
    label: 'Conversation Recording',
    category: 'conversation',
    iconName: 'Mic',
    hasHelpTooltip: 'Filter prospects that have associated AI dialer audio recordings',
    searchKeywords: ['conversation recording', 'audio recording', 'call transcript', 'call audio'],
    controlType: 'conversationRecording',
    calculateActiveCount: () => 0,
  },
  {
    id: 'conversationKeywords',
    label: 'Conversation Tracker Keywords',
    category: 'conversation',
    iconName: 'FileText',
    hasHelpTooltip: 'Search spoken keywords identified by AI transcript analysis',
    searchKeywords: ['conversation keywords', 'tracker keywords', 'spoken terms', 'transcription'],
    controlType: 'conversationKeywords',
    calculateActiveCount: () => 0,
  },

  // ==========================================
  // CREATED SOURCE
  // ==========================================
  {
    id: 'leadSource',
    label: 'Source',
    category: 'source',
    iconName: 'Database',
    searchKeywords: ['source', 'origin', 'apollo', 'zoominfo', 'linkedin', 'web crawler'],
    controlType: 'source',
    calculateActiveCount: (state) => state.leadSources?.length || 0,
  },
  {
    id: 'csvImport',
    label: 'Contact CSV Import',
    category: 'source',
    iconName: 'FileSpreadsheet',
    searchKeywords: ['csv import', 'uploaded list', 'file upload', 'batch import'],
    controlType: 'csvImport',
    calculateActiveCount: () => 0,
  },
  {
    id: 'manualImport',
    label: 'Manual Import / Created',
    category: 'source',
    iconName: 'UserPlus',
    searchKeywords: ['manual import', 'manually created', 'direct input', 'user added'],
    controlType: 'manualImport',
    calculateActiveCount: () => 0,
  },

  // ==========================================
  // MISC
  // ==========================================
  {
    id: 'prospectLists',
    label: 'Lists',
    category: 'misc',
    iconName: 'ListChecks',
    searchKeywords: ['lists', 'prospect lists', 'static lists', 'saved list'],
    controlType: 'prospectLists',
    calculateActiveCount: () => 0,
  },
  {
    id: 'duplicateProtection',
    label: 'Duplicate Protection',
    category: 'misc',
    iconName: 'ShieldCheck',
    searchKeywords: ['duplicate protection', 'exclude current customers', 'exclude open opportunities', 'exclude previously contacted'],
    controlType: 'duplicateProtection',
    calculateActiveCount: (state) => {
      let c = 0;
      if (state.excludeCurrentCustomers) c += 1;
      if (state.excludeOpenOpportunities) c += 1;
      if (state.excludePreviouslyContacted) c += 1;
      return c;
    },
  },
  {
    id: 'parentCompany',
    label: 'Parent Company',
    category: 'misc',
    iconName: 'Network',
    searchKeywords: ['parent company', 'subsidiary', 'holding company', 'corporate hierarchy'],
    controlType: 'parentCompany',
    calculateActiveCount: () => 0,
  },
  {
    id: 'contactQuality',
    label: 'Contact Quality Score',
    category: 'misc',
    iconName: 'Activity',
    searchKeywords: ['contact quality', 'quality score', 'deliverability rating', 'confidence score'],
    controlType: 'contactQuality',
    calculateActiveCount: (state) => (state.qualityScoreMin > 0 || state.qualityScoreMax < 100 ? 1 : 0),
  },
];
