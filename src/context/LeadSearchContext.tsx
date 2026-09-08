import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';

export interface CustomFilterRule {
  id: string;
  field: string;
  operator: 'equals' | 'contains' | 'greater_than' | 'less_than' | 'not_equals';
  value: string;
  logic: 'AND' | 'OR';
}

export interface LeadDetailData {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  headcount: string;
  revenue: string;
  location: string;
  email: string;
  phone: string;
  tech: string[];
  intentSignal: string;
  icpScore: number;
  avatar: string;
  linkedinUrl?: string;
  domain?: string;
  profileStatus: 'Complete' | 'Direct Contact' | 'Verified Email' | 'Standard';
  deliverabilityScore: number;
  phoneStatus: 'Verified Mobile' | 'Direct Dial' | 'HQ Only';
  fundingStage?: string;
  
  // Advanced Filter Attributes
  department?: string;
  seniorityLevel?: string;
  yearsInRole?: string;
  companyType?: string;
  totalFunding?: string;
  foundedYear?: number;
  operatingStatus?: string;
  employeeGrowth?: string;
  hiringActivity?: string;
  workplaceType?: string;
  timeZone?: string;
  intentTopics?: string[];
  activityRecency?: string;
  contactQuality?: string[];
  techCategories?: string[];
  companySignals?: string[];
  buyingSignals?: string[];
  leadSource?: string;
  dataFreshness?: string;
  engagement?: string;
  isExistingCustomer?: boolean;
  isOpenOpportunity?: boolean;
}

export interface LeadFilterState {
  searchQuery: string;
  
  // 1. CONTACT
  contactTypes: string[]; // e.g. 'direct_email', 'verified_email', 'direct_mobile', 'verified_phone', 'both_available'
  
  // 2. COMPANY
  headcount: string[]; // '1-10', '11-50', '51-200', '201-500', '501-1,000', '1,001-5,000', '5,001-10,000', '10,001+'
  revenue: string[]; // '$0-$1M', '$1M-$10M', '$10M-$50M', '$50M-$100M', '$100M-$500M', '$500M+'
  industries: string[];
  growthRate: string[];
  companyTypes: string[];
  fundingStage: string[];
  totalFunding: string[];
  foundedYear: string[];
  operatingStatus: string[];
  employeeGrowth: string[];
  hiringActivity: string[];
  
  // 3. PERSON
  roles: string[];
  departments: string[];
  seniority: string[];
  yearsInRole: string[];
  managementLevel: string[];
  education: string[];
  skills: string[];
  languages: string[];
  
  // 4. LOCATION
  locations: string[];
  statesRegions: string[];
  cities: string[];
  workplaceType: string[];
  timeZones: string[];
  
  // 5. INTENT
  intentSignals: string[];
  intentTopics: string[];
  
  // 6. ACTIVITY
  activityRecency: string[];
  activityDateRange: string;
  
  // 7. CONTACT QUALITY
  contactQuality: string[];
  qualityScoreMin: number;
  qualityScoreMax: number;
  
  // 8. TECHNOLOGY
  technologies: string[];
  techCategories: string[];
  techAdoption: string[];
  
  // 9. COMPANY SIGNALS
  companySignals: string[];
  
  // 10. BUYING SIGNALS
  buyingSignals: string[];
  
  // 11. LEAD SOURCE
  leadSources: string[];
  
  // 12. DATA FRESHNESS
  dataFreshness: string[];
  
  // 13. DUPLICATE / EXISTING DATA
  excludeExistingLeads: boolean;
  excludeExistingContacts: boolean;
  excludeExistingCompanies: boolean;
  excludePreviouslyContacted: boolean;
  excludeCurrentCustomers: boolean;
  excludeOpenOpportunities: boolean;
  excludeClosedOpportunities: boolean;
  
  // 14. ENGAGEMENT
  engagementStatus: string[];
  engagementDateRange: string;
  
  // 15. CUSTOM FILTERS
  customRules: CustomFilterRule[];
  customLogic: 'AND' | 'OR';
  
  // Legacy compatibility props
  deliverability: 'all' | 'verified_only';
  hasPhone: boolean;
}

export const INITIAL_LEAD_FILTERS: LeadFilterState = {
  searchQuery: '',
  contactTypes: [],
  headcount: [],
  revenue: [],
  industries: [],
  growthRate: [],
  companyTypes: [],
  fundingStage: [],
  totalFunding: [],
  foundedYear: [],
  operatingStatus: [],
  employeeGrowth: [],
  hiringActivity: [],
  roles: [],
  departments: [],
  seniority: [],
  yearsInRole: [],
  managementLevel: [],
  education: [],
  skills: [],
  languages: [],
  locations: [],
  statesRegions: [],
  cities: [],
  workplaceType: [],
  timeZones: [],
  intentSignals: [],
  intentTopics: [],
  activityRecency: [],
  activityDateRange: 'all',
  contactQuality: [],
  qualityScoreMin: 0,
  qualityScoreMax: 100,
  technologies: [],
  techCategories: [],
  techAdoption: [],
  companySignals: [],
  buyingSignals: [],
  leadSources: [],
  dataFreshness: [],
  excludeExistingLeads: false,
  excludeExistingContacts: false,
  excludeExistingCompanies: false,
  excludePreviouslyContacted: false,
  excludeCurrentCustomers: false,
  excludeOpenOpportunities: false,
  excludeClosedOpportunities: false,
  engagementStatus: [],
  engagementDateRange: 'all',
  customRules: [],
  customLogic: 'AND',
  deliverability: 'all',
  hasPhone: false,
};

export interface SavedSearch {
  id: string;
  name: string;
  filters: LeadFilterState;
  createdAt: string;
  resultsCount: number;
}

export interface SearchHistoryItem {
  id: string;
  querySummary: string;
  filters: LeadFilterState;
  timestamp: string;
  resultsCount: number;
}

export type SortField = 'icpScore' | 'name' | 'company' | 'deliverability';
export type SortOrder = 'asc' | 'desc';

interface LeadSearchContextType {
  filters: LeadFilterState;
  sorting: { field: SortField; order: SortOrder };
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalResults: number;
  };
  selection: {
    selectedIds: string[];
    isAllSelectedOnPage: boolean;
    isAllMatchesSelected: boolean;
  };
  searchStatus: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string | null;
  results: LeadDetailData[];
  allMatchingResults: LeadDetailData[];
  savedSearches: SavedSearch[];
  searchHistory: SearchHistoryItem[];
  isAdvancedFiltersDrawerOpen: boolean;
  
  // Actions
  setSearchQuery: (query: string) => void;
  updateFilters: (partial: Partial<LeadFilterState>) => void;
  toggleFilterValue: (category: keyof LeadFilterState, value: string) => void;
  removeFilterChip: (category: keyof LeadFilterState, value?: string) => void;
  resetFilters: () => void;
  setSorting: (field: SortField) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  toggleSelectLead: (id: string) => void;
  toggleSelectAllOnPage: () => void;
  selectAllMatches: () => void;
  clearSelection: () => void;
  saveCurrentSearch: (name: string) => void;
  deleteSavedSearch: (id: string) => void;
  loadSavedSearch: (saved: SavedSearch) => void;
  clearHistory: () => void;
  refreshSearch: () => void;
  exportToCsv: () => void;
  copyShareableSearchUrl: () => void;
  setIsAdvancedFiltersDrawerOpen: (open: boolean) => void;
}

// Master Raw Dataset (Enriched with 15 dimensions)
const MASTER_DATABASE: LeadDetailData[] = [
  {
    id: 'lead_1',
    name: 'Sarah Jenkins',
    title: 'VP of Growth & Revenue',
    company: 'CloudScale AI',
    industry: 'Enterprise B2B SaaS',
    headcount: '51-200',
    revenue: '$10M-$50M',
    location: 'San Francisco Bay Area, United States',
    email: 'sarah.j@cloudscale.ai',
    phone: '+1 (415) 892-4910',
    tech: ['Salesforce', 'Stripe', 'PostgreSQL', 'AWS', 'HubSpot'],
    intentSignal: 'Hiring +6 SDRs & Scaling Outbound',
    icpScore: 98,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    profileStatus: 'Complete',
    deliverabilityScore: 100,
    phoneStatus: 'Verified Mobile',
    fundingStage: 'Series B',
    domain: 'cloudscale.ai',
    department: 'Sales',
    seniorityLevel: 'VP',
    yearsInRole: '3-5 Years',
    companyType: 'Private',
    totalFunding: '$10M - $50M',
    foundedYear: 2020,
    operatingStatus: 'Active / Operating',
    employeeGrowth: 'High (>20%)',
    hiringActivity: 'Active Hiring (>5 jobs)',
    workplaceType: 'Hybrid',
    timeZone: 'US Pacific (PST)',
    intentTopics: ['Pricing Page Visit', 'Hiring Intent', 'Expansion Intent'],
    activityRecency: 'Recently Active',
    contactQuality: ['Verified Email', 'Verified Mobile', 'High Confidence', 'Complete Profile'],
    techCategories: ['CRM', 'Cloud', 'Payments', 'Analytics'],
    companySignals: ['Hiring', 'Funding', 'Expansion'],
    buyingSignals: ['Visiting Pricing Pages', 'Hiring for Relevant Roles', 'Technology Evaluation'],
    leadSource: 'LinkedIn',
    dataFreshness: 'Updated This Week',
    engagement: 'Visited Website'
  },
  {
    id: 'lead_2',
    name: 'Marcus Vance',
    title: 'Head of Revenue Operations',
    company: 'Apex Data Labs',
    industry: 'Cybersecurity & DevOps',
    headcount: '51-200',
    revenue: '$10M-$50M',
    location: 'New York Metro Area, United States',
    email: 'marcus@apexdata.io',
    phone: '+1 (212) 749-1120',
    tech: ['HubSpot', 'Snowflake', 'React', 'GCP'],
    intentSignal: 'Recent Venture Funding (Series B $32M)',
    icpScore: 96,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    profileStatus: 'Complete',
    deliverabilityScore: 100,
    phoneStatus: 'Verified Mobile',
    fundingStage: 'Series B',
    domain: 'apexdata.io',
    department: 'Operations',
    seniorityLevel: 'Head',
    yearsInRole: '1-3 Years',
    companyType: 'Private',
    totalFunding: '$10M - $50M',
    foundedYear: 2021,
    operatingStatus: 'Active / Operating',
    employeeGrowth: 'High (>20%)',
    hiringActivity: 'Active Hiring (>5 jobs)',
    workplaceType: 'Remote',
    timeZone: 'US Eastern (EST)',
    intentTopics: ['Product Interest', 'Funding Event'],
    activityRecency: 'Recently Funded',
    contactQuality: ['Verified Email', 'Verified Mobile', 'High Confidence'],
    techCategories: ['CRM', 'Analytics', 'Cloud'],
    companySignals: ['Funding', 'Hiring'],
    buyingSignals: ['Researching Solution', 'Comparing Vendors'],
    leadSource: 'Direct Database',
    dataFreshness: 'Updated Today',
    engagement: 'Opened Email'
  },
  {
    id: 'lead_3',
    name: 'Elena Rostova',
    title: 'Chief Revenue Officer',
    company: 'FinTech Stack Systems',
    industry: 'FinTech & B2B Payments',
    headcount: '201-500',
    revenue: '$50M-$100M',
    location: 'London, United Kingdom',
    email: 'elena@fintechstack.com',
    phone: '+44 20 7946 0912',
    tech: ['Salesforce', 'Segment', 'Stripe', 'Datadog'],
    intentSignal: 'Tool Migration / Tech Shift',
    icpScore: 94,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    profileStatus: 'Complete',
    deliverabilityScore: 99,
    phoneStatus: 'Direct Dial',
    fundingStage: 'Series C',
    domain: 'fintechstack.com',
    department: 'Sales',
    seniorityLevel: 'C-Level',
    yearsInRole: '5+ Years',
    companyType: 'Private',
    totalFunding: '$50M+',
    foundedYear: 2018,
    operatingStatus: 'Active / Operating',
    employeeGrowth: 'Positive (>0%)',
    hiringActivity: 'Executive Hiring',
    workplaceType: 'Hybrid',
    timeZone: 'Europe (CET/GMT)',
    intentTopics: ['Technology Change', 'Competitor Research'],
    activityRecency: 'Recently Promoted',
    contactQuality: ['Verified Email', 'High Confidence', 'Complete Profile'],
    techCategories: ['CRM', 'Payments', 'Analytics', 'Security'],
    companySignals: ['Leadership Change', 'Technology Change'],
    buyingSignals: ['Comparing Vendors', 'Searching for Alternatives', 'Technology Evaluation'],
    leadSource: 'LinkedIn',
    dataFreshness: 'Updated This Month',
    engagement: 'Replied'
  },
  {
    id: 'lead_4',
    name: 'David Chen',
    title: 'Head of Demand Generation',
    company: 'SaaSFlow Global',
    industry: 'Enterprise B2B SaaS',
    headcount: '51-200',
    revenue: '$10M-$50M',
    location: 'New York Metro Area, United States',
    email: 'david@saasflow.co',
    phone: '+1 (212) 555-0182',
    tech: ['HubSpot', 'PostgreSQL', 'React', 'AWS'],
    intentSignal: 'Evaluating Multi-Inbox Outreach',
    icpScore: 92,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    profileStatus: 'Complete',
    deliverabilityScore: 96,
    phoneStatus: 'HQ Only',
    fundingStage: 'Series A',
    domain: 'saasflow.co',
    department: 'Marketing',
    seniorityLevel: 'Head',
    yearsInRole: '1-3 Years',
    companyType: 'Private',
    totalFunding: '$1M - $10M',
    foundedYear: 2022,
    operatingStatus: 'Active / Operating',
    employeeGrowth: 'High (>20%)',
    hiringActivity: 'Active Hiring (>5 jobs)',
    workplaceType: 'Remote',
    timeZone: 'US Eastern (EST)',
    intentTopics: ['Category Interest', 'Website Visit'],
    activityRecency: 'Recently Active',
    contactQuality: ['Verified Email', 'Medium Confidence'],
    techCategories: ['Marketing Automation', 'CRM', 'Cloud'],
    companySignals: ['Expansion', 'Hiring'],
    buyingSignals: ['Researching Solution', 'Visiting Pricing Pages'],
    leadSource: 'Company Website',
    dataFreshness: 'Updated This Week',
    engagement: 'Clicked Email'
  },
  {
    id: 'lead_5',
    name: 'Amira Patel',
    title: 'Founder / CEO / Co-Founder',
    company: 'ScaleWave Media',
    industry: 'Marketing & Growth Agencies',
    headcount: '11-50',
    revenue: '$1M-$10M',
    location: 'Toronto, Canada',
    email: 'amira@scalewave.agency',
    phone: '+1 (416) 555-0199',
    tech: ['Stripe', 'React', 'AWS'],
    intentSignal: 'Hiring +5 Sales Reps / SDRs',
    icpScore: 95,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    profileStatus: 'Complete',
    deliverabilityScore: 100,
    phoneStatus: 'Verified Mobile',
    fundingStage: 'Bootstrapped',
    domain: 'scalewave.agency',
    department: 'Operations',
    seniorityLevel: 'Founder',
    yearsInRole: '3-5 Years',
    companyType: 'Private',
    totalFunding: '< $1M',
    foundedYear: 2021,
    operatingStatus: 'Active / Operating',
    employeeGrowth: 'High (>20%)',
    hiringActivity: 'Active Hiring (>5 jobs)',
    workplaceType: 'Remote',
    timeZone: 'US Eastern (EST)',
    intentTopics: ['Hiring Intent', 'Expansion Intent'],
    activityRecency: 'Recently Hired',
    contactQuality: ['Verified Email', 'Verified Mobile', 'High Confidence', 'Complete Profile'],
    techCategories: ['Payments', 'Cloud'],
    companySignals: ['Hiring', 'Expansion'],
    buyingSignals: ['Hiring for Relevant Roles', 'Increasing Headcount'],
    leadSource: 'Enriched Contact',
    dataFreshness: 'Updated Today',
    engagement: 'Booked Meeting'
  },
  {
    id: 'lead_6',
    name: 'Tom Hiddleston',
    title: 'VP of Sales / CRO',
    company: 'Apex Global Logistics',
    industry: 'E-Commerce & Supply Chain',
    headcount: '501-1,000',
    revenue: '$50M-$100M',
    location: 'Austin, Texas, United States',
    email: 'tom@apexlogistics.com',
    phone: '+1 (512) 555-0144',
    tech: ['Salesforce', 'AWS', 'Datadog'],
    intentSignal: 'Leadership Change / Promotion',
    icpScore: 91,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
    profileStatus: 'Complete',
    deliverabilityScore: 98,
    phoneStatus: 'Direct Dial',
    fundingStage: 'Series D',
    domain: 'apexlogistics.com',
    department: 'Sales',
    seniorityLevel: 'VP',
    yearsInRole: '< 1 Year',
    companyType: 'Private',
    totalFunding: '$50M+',
    foundedYear: 2016,
    operatingStatus: 'Active / Operating',
    employeeGrowth: 'Positive (>0%)',
    hiringActivity: 'Active Hiring (>5 jobs)',
    workplaceType: 'On-Site',
    timeZone: 'US Central (CST)',
    intentTopics: ['Leadership Change', 'Technology Change'],
    activityRecency: 'Recently Changed Job',
    contactQuality: ['Verified Email', 'High Confidence'],
    techCategories: ['CRM', 'Cloud', 'Analytics'],
    companySignals: ['Leadership Change', 'New Office'],
    buyingSignals: ['Evaluating Solutions', 'Comparing Vendors'],
    leadSource: 'LinkedIn',
    dataFreshness: 'Updated Last 90 Days',
    engagement: 'No Engagement'
  },
  {
    id: 'lead_7',
    name: 'Sophia Martinez',
    title: 'Director of Business Development',
    company: 'HealthTech Connect',
    industry: 'Healthcare & Life Sciences',
    headcount: '201-500',
    revenue: '$10M-$50M',
    location: 'Boston, Massachusetts, United States',
    email: 'sophia.m@healthconnect.io',
    phone: '+1 (617) 555-0133',
    tech: ['HubSpot', 'Stripe', 'Segment'],
    intentSignal: 'High Intent: B2B Expansion',
    icpScore: 93,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
    profileStatus: 'Complete',
    deliverabilityScore: 99,
    phoneStatus: 'Verified Mobile',
    fundingStage: 'Series B',
    domain: 'healthconnect.io',
    department: 'Sales',
    seniorityLevel: 'Director',
    yearsInRole: '3-5 Years',
    companyType: 'Private',
    totalFunding: '$10M - $50M',
    foundedYear: 2019,
    operatingStatus: 'Active / Operating',
    employeeGrowth: 'High (>20%)',
    hiringActivity: 'Active Hiring (>5 jobs)',
    workplaceType: 'Hybrid',
    timeZone: 'US Eastern (EST)',
    intentTopics: ['Expansion Intent', 'Pricing Page Visit'],
    activityRecency: 'Recently Active',
    contactQuality: ['Verified Email', 'Verified Mobile', 'High Confidence', 'Complete Profile'],
    techCategories: ['CRM', 'Payments', 'Analytics'],
    companySignals: ['Expansion', 'Product Launch'],
    buyingSignals: ['Visiting Pricing Pages', 'Researching Solution'],
    leadSource: 'Direct Database',
    dataFreshness: 'Updated This Week',
    engagement: 'Responded to Outreach'
  },
  {
    id: 'lead_8',
    name: 'Alexandre Dubois',
    title: 'Chief Technology Officer',
    company: 'NeuralGrid Systems',
    industry: 'Enterprise B2B SaaS',
    headcount: '51-200',
    revenue: '$10M-$50M',
    location: 'Paris, France',
    email: 'alex@neuralgrid.ai',
    phone: '+33 1 42 68 55 00',
    tech: ['PostgreSQL', 'AWS', 'React', 'Datadog'],
    intentSignal: 'AI Model Infrastructure Upgrade',
    icpScore: 97,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
    profileStatus: 'Complete',
    deliverabilityScore: 100,
    phoneStatus: 'Verified Mobile',
    fundingStage: 'Series A',
    domain: 'neuralgrid.ai',
    department: 'Engineering',
    seniorityLevel: 'C-Level',
    yearsInRole: '1-3 Years',
    companyType: 'Private',
    totalFunding: '$1M - $10M',
    foundedYear: 2023,
    operatingStatus: 'Active / Operating',
    employeeGrowth: 'High (>20%)',
    hiringActivity: 'Active Hiring (>5 jobs)',
    workplaceType: 'Remote',
    timeZone: 'Europe (CET/GMT)',
    intentTopics: ['Technology Change', 'Category Interest'],
    activityRecency: 'Recently Launched',
    contactQuality: ['Verified Email', 'Verified Mobile', 'High Confidence', 'Complete Profile'],
    techCategories: ['Cloud', 'Analytics', 'Security'],
    companySignals: ['Product Launch', 'Funding'],
    buyingSignals: ['Technology Evaluation', 'Searching for Alternatives'],
    leadSource: 'LinkedIn',
    dataFreshness: 'Updated Today',
    engagement: 'Opened Email'
  }
];

const SAVED_SEARCHES_STORAGE_KEY = 'outtricks_lead_saved_searches_v2';
const SEARCH_HISTORY_STORAGE_KEY = 'outtricks_lead_search_history_v2';

const LeadSearchContext = createContext<LeadSearchContextType | undefined>(undefined);

export const LeadSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { success, error, info } = useToast();

  const [filters, setFilters] = useState<LeadFilterState>(() => {
    const q = searchParams.get('q') || '';
    const industries = searchParams.getAll('industry');
    const roles = searchParams.getAll('role');
    const locations = searchParams.getAll('location');
    const headcount = searchParams.getAll('headcount');
    const fundingStage = searchParams.getAll('funding');

    return {
      ...INITIAL_LEAD_FILTERS,
      searchQuery: q,
      industries: industries.length > 0 ? industries : INITIAL_LEAD_FILTERS.industries,
      roles: roles.length > 0 ? roles : INITIAL_LEAD_FILTERS.roles,
      locations: locations.length > 0 ? locations : INITIAL_LEAD_FILTERS.locations,
      headcount: headcount.length > 0 ? headcount : INITIAL_LEAD_FILTERS.headcount,
      fundingStage: fundingStage.length > 0 ? fundingStage : INITIAL_LEAD_FILTERS.fundingStage,
    };
  });
  const [sorting, setSortingState] = useState<{ field: SortField; order: SortOrder }>({
    field: 'icpScore',
    order: 'desc',
  });
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAdvancedFiltersDrawerOpen, setIsAdvancedFiltersDrawerOpen] = useState(false);

  // Load Saved Searches & History from localStorage
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_SEARCHES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [
        {
          id: 'preset_1',
          name: 'Tier 1 Enterprise SaaS VPs',
          filters: {
            ...INITIAL_LEAD_FILTERS,
            industries: ['Enterprise B2B SaaS'],
            roles: ['VP of Sales / CRO'],
            seniority: ['VP', 'C-Level'],
            headcount: ['51-200', '201-500'],
            deliverability: 'verified_only',
          },
          createdAt: '2026-08-26',
          resultsCount: 24,
        },
        {
          id: 'preset_2',
          name: 'FinTech Growth Leaders (Series B+)',
          filters: {
            ...INITIAL_LEAD_FILTERS,
            industries: ['FinTech & B2B Payments'],
            fundingStage: ['Series B', 'Series C'],
            hasPhone: true,
          },
          createdAt: '2026-08-20',
          resultsCount: 18,
        }
      ];
    } catch {
      return [];
    }
  });

  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem(SEARCH_HISTORY_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [
        {
          id: 'hist_1',
          querySummary: 'Industry: SaaS, Role: VP Sales, Location: US',
          filters: {
            ...INITIAL_LEAD_FILTERS,
            industries: ['Enterprise B2B SaaS'],
            roles: ['VP of Sales / CRO'],
            locations: ['San Francisco Bay Area, United States'],
          },
          timestamp: '15 mins ago',
          resultsCount: 12,
        },
        {
          id: 'hist_2',
          querySummary: 'Funding: Series B, Tech: Salesforce, Stripe',
          filters: {
            ...INITIAL_LEAD_FILTERS,
            technologies: ['Salesforce', 'Stripe'],
            fundingStage: ['Series B'],
          },
          timestamp: '2 hours ago',
          resultsCount: 9,
        }
      ];
    } catch {
      return [];
    }
  });

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(SAVED_SEARCHES_STORAGE_KEY, JSON.stringify(savedSearches));
    } catch (e) {
      console.warn('Failed to save lead searches', e);
    }
  }, [savedSearches]);

  useEffect(() => {
    try {
      localStorage.setItem(SEARCH_HISTORY_STORAGE_KEY, JSON.stringify(searchHistory));
    } catch (e) {
      console.warn('Failed to save search history', e);
    }
  }, [searchHistory]);

  // Bi-directional URL synchronization for shareable search filter links
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.searchQuery.trim()) {
      params.set('q', filters.searchQuery.trim());
    }
    filters.industries.forEach((ind) => params.append('industry', ind));
    filters.roles.forEach((r) => params.append('role', r));
    filters.locations.forEach((loc) => params.append('location', loc));
    filters.headcount.forEach((h) => params.append('headcount', h));
    filters.fundingStage.forEach((f) => params.append('funding', f));

    const currentString = searchParams.toString();
    const newString = params.toString();
    if (currentString !== newString) {
      setSearchParams(params, { replace: true });
    }
  }, [filters, searchParams, setSearchParams]);

  // Robust Multi-Dimension Filtering Engine (AND across categories, OR within arrays)
  const allMatchingResults = useMemo(() => {
    return MASTER_DATABASE.filter((lead) => {
      // 1. Text Search Query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matches = 
          lead.name.toLowerCase().includes(q) ||
          lead.title.toLowerCase().includes(q) ||
          lead.company.toLowerCase().includes(q) ||
          lead.email.toLowerCase().includes(q) ||
          (lead.domain && lead.domain.toLowerCase().includes(q)) ||
          lead.tech.some(t => t.toLowerCase().includes(q)) ||
          lead.industry.toLowerCase().includes(q) ||
          lead.location.toLowerCase().includes(q);

        if (!matches) return false;
      }

      // 2. CONTACT FILTERS
      if (filters.contactTypes.length > 0) {
        const matchesContact = filters.contactTypes.some((type) => {
          if (type === 'email_available' || type === 'direct_email') return Boolean(lead.email);
          if (type === 'mobile_available' || type === 'direct_mobile') return Boolean(lead.phone);
          if (type === 'both_available') return Boolean(lead.email && lead.phone);
          if (type === 'verified_email') return lead.deliverabilityScore >= 98;
          if (type === 'verified_phone') return lead.phoneStatus === 'Verified Mobile';
          if (type === 'no_contact') return !lead.email && !lead.phone;
          return true;
        });
        if (!matchesContact) return false;
      }

      // 3. COMPANY HEADCOUNT
      if (filters.headcount.length > 0) {
        if (!filters.headcount.includes(lead.headcount)) return false;
      }

      // 4. REVENUE
      if (filters.revenue.length > 0) {
        if (!filters.revenue.includes(lead.revenue)) return false;
      }

      // 5. INDUSTRIES
      if (filters.industries.length > 0) {
        if (!filters.industries.includes(lead.industry)) return false;
      }

      // 6. COMPANY TYPE
      if (filters.companyTypes.length > 0 && lead.companyType) {
        if (!filters.companyTypes.includes(lead.companyType)) return false;
      }

      // 7. FUNDING STAGE
      if (filters.fundingStage.length > 0 && lead.fundingStage) {
        if (!filters.fundingStage.includes(lead.fundingStage)) return false;
      }

      // 8. TOTAL FUNDING
      if (filters.totalFunding.length > 0 && lead.totalFunding) {
        if (!filters.totalFunding.includes(lead.totalFunding)) return false;
      }

      // 9. ROLES / TITLES
      if (filters.roles.length > 0) {
        const matchesRole = filters.roles.some((r) => 
          lead.title.toLowerCase().includes(r.toLowerCase().split(' / ')[0])
        );
        if (!matchesRole) return false;
      }

      // 10. DEPARTMENTS
      if (filters.departments.length > 0 && lead.department) {
        if (!filters.departments.includes(lead.department)) return false;
      }

      // 11. SENIORITY
      if (filters.seniority.length > 0 && lead.seniorityLevel) {
        if (!filters.seniority.includes(lead.seniorityLevel)) return false;
      }

      // 12. LOCATIONS
      if (filters.locations.length > 0) {
        const matchesLoc = filters.locations.some((loc) => lead.location.toLowerCase().includes(loc.toLowerCase()));
        if (!matchesLoc) return false;
      }

      // 13. WORKPLACE TYPE
      if (filters.workplaceType.length > 0 && lead.workplaceType) {
        if (!filters.workplaceType.includes(lead.workplaceType)) return false;
      }

      // 14. TIME ZONES
      if (filters.timeZones.length > 0 && lead.timeZone) {
        if (!filters.timeZones.includes(lead.timeZone)) return false;
      }

      // 15. INTENT TOPICS & SIGNALS
      if (filters.intentSignals.length > 0) {
        const matchesSig = filters.intentSignals.some((sig) => lead.intentSignal.toLowerCase().includes(sig.toLowerCase().split(' (')[0]));
        if (!matchesSig) return false;
      }

      if (filters.intentTopics.length > 0 && lead.intentTopics) {
        const matchesTopic = filters.intentTopics.some((t) => lead.intentTopics!.includes(t));
        if (!matchesTopic) return false;
      }

      // 16. ACTIVITY RECENCY
      if (filters.activityRecency.length > 0 && lead.activityRecency) {
        if (!filters.activityRecency.includes(lead.activityRecency)) return false;
      }

      // 17. CONTACT QUALITY
      if (filters.contactQuality.length > 0 && lead.contactQuality) {
        const matchesQ = filters.contactQuality.some((q) => lead.contactQuality!.includes(q));
        if (!matchesQ) return false;
      }

      if (lead.icpScore < filters.qualityScoreMin || lead.icpScore > filters.qualityScoreMax) {
        return false;
      }

      // 18. TECHNOLOGIES & CATEGORIES
      if (filters.technologies.length > 0) {
        const matchesTech = filters.technologies.some((t) => lead.tech.includes(t));
        if (!matchesTech) return false;
      }

      if (filters.techCategories.length > 0 && lead.techCategories) {
        const matchesCat = filters.techCategories.some((cat) => lead.techCategories!.includes(cat));
        if (!matchesCat) return false;
      }

      // 19. COMPANY SIGNALS
      if (filters.companySignals.length > 0 && lead.companySignals) {
        const matchesCS = filters.companySignals.some((s) => lead.companySignals!.includes(s));
        if (!matchesCS) return false;
      }

      // 20. BUYING SIGNALS
      if (filters.buyingSignals.length > 0 && lead.buyingSignals) {
        const matchesBS = filters.buyingSignals.some((s) => lead.buyingSignals!.includes(s));
        if (!matchesBS) return false;
      }

      // 21. LEAD SOURCES
      if (filters.leadSources.length > 0 && lead.leadSource) {
        if (!filters.leadSources.includes(lead.leadSource)) return false;
      }

      // 22. DATA FRESHNESS
      if (filters.dataFreshness.length > 0 && lead.dataFreshness) {
        if (!filters.dataFreshness.includes(lead.dataFreshness)) return false;
      }

      // 23. DUPLICATE / EXCLUSIONS
      if (filters.excludeCurrentCustomers && lead.isExistingCustomer) return false;
      if (filters.excludeOpenOpportunities && lead.isOpenOpportunity) return false;

      // 24. ENGAGEMENT
      if (filters.engagementStatus.length > 0 && lead.engagement) {
        if (!filters.engagementStatus.includes(lead.engagement)) return false;
      }

      // 25. CUSTOM RULES EVALUATION
      if (filters.customRules.length > 0) {
        const ruleResults = filters.customRules.map((rule) => {
          const fieldVal = (lead as any)[rule.field] ?? '';
          if (rule.operator === 'equals') return String(fieldVal).toLowerCase() === rule.value.toLowerCase();
          if (rule.operator === 'contains') return String(fieldVal).toLowerCase().includes(rule.value.toLowerCase());
          if (rule.operator === 'not_equals') return String(fieldVal).toLowerCase() !== rule.value.toLowerCase();
          if (rule.operator === 'greater_than') return parseFloat(fieldVal) > parseFloat(rule.value);
          if (rule.operator === 'less_than') return parseFloat(fieldVal) < parseFloat(rule.value);
          return true;
        });

        if (filters.customLogic === 'AND') {
          if (!ruleResults.every(Boolean)) return false;
        } else {
          if (!ruleResults.some(Boolean)) return false;
        }
      }

      // Legacy support
      if (filters.deliverability === 'verified_only' && (!lead.email || lead.deliverabilityScore < 98)) {
        return false;
      }
      if (filters.hasPhone && (!lead.phone || lead.phoneStatus === 'HQ Only')) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Sorting Engine
  const sortedResults = useMemo(() => {
    const items = [...allMatchingResults];
    items.sort((a, b) => {
      let comparison = 0;
      if (sorting.field === 'icpScore') {
        comparison = b.icpScore - a.icpScore;
      } else if (sorting.field === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sorting.field === 'company') {
        comparison = a.company.localeCompare(b.company);
      } else if (sorting.field === 'deliverability') {
        comparison = b.deliverabilityScore - a.deliverabilityScore;
      }
      return sorting.order === 'asc' ? -comparison : comparison;
    });
    return items;
  }, [allMatchingResults, sorting]);

  // Pagination Engine
  const totalPages = Math.max(1, Math.ceil(sortedResults.length / pageSize));
  const paginatedResults = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedResults.slice(start, start + pageSize);
  }, [sortedResults, page, pageSize]);

  // Actions
  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));
    setPage(1);
  }, []);

  const updateFilters = useCallback((partial: Partial<LeadFilterState>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
    setPage(1);
  }, []);

  const toggleFilterValue = useCallback((category: keyof LeadFilterState, value: string) => {
    setFilters((prev) => {
      const current = (prev[category] as string[]) || [];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
    setPage(1);
  }, []);

  const removeFilterChip = useCallback((category: keyof LeadFilterState, value?: string) => {
    setFilters((prev) => {
      if (category === 'searchQuery') {
        return { ...prev, searchQuery: '' };
      }
      if (category === 'deliverability') {
        return { ...prev, deliverability: 'all' };
      }
      if (category === 'hasPhone') {
        return { ...prev, hasPhone: false };
      }
      if (category === 'qualityScoreMin' || category === 'qualityScoreMax') {
        return { ...prev, qualityScoreMin: 0, qualityScoreMax: 100 };
      }
      if (Array.isArray(prev[category]) && value) {
        const arr = (prev[category] as string[]).filter((v) => v !== value);
        return { ...prev, [category]: arr };
      }
      if (typeof prev[category] === 'boolean') {
        return { ...prev, [category]: false };
      }
      return prev;
    });
    setPage(1);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_LEAD_FILTERS);
    setSelectedIds([]);
    setPage(1);
    info('Filters reset to default.');
  }, [info]);

  const setSorting = useCallback((field: SortField) => {
    setSortingState((prev) => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc',
    }));
  }, []);

  const toggleSelectLead = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const toggleSelectAllOnPage = useCallback(() => {
    const pageIds = paginatedResults.map((l) => l.id);
    const allSelected = pageIds.every((id) => selectedIds.includes(id));
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  }, [paginatedResults, selectedIds]);

  const selectAllMatches = useCallback(() => {
    const allIds = allMatchingResults.map((l) => l.id);
    setSelectedIds(allIds);
    success(`Selected all ${allIds.length} matching leads!`);
  }, [allMatchingResults, success]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const saveCurrentSearch = useCallback((name: string) => {
    const newSaved: SavedSearch = {
      id: `saved_${Date.now()}`,
      name: name.trim() || `Search Preset ${savedSearches.length + 1}`,
      filters: { ...filters },
      createdAt: new Date().toISOString().split('T')[0],
      resultsCount: allMatchingResults.length,
    };
    setSavedSearches((prev) => [newSaved, ...prev]);
    success(`Saved search criteria "${newSaved.name}"!`);
  }, [filters, allMatchingResults.length, savedSearches.length, success]);

  const deleteSavedSearch = useCallback((id: string) => {
    setSavedSearches((prev) => prev.filter((s) => s.id !== id));
    info('Saved search preset deleted.');
  }, [info]);

  const loadSavedSearch = useCallback((saved: SavedSearch) => {
    setFilters(saved.filters);
    setPage(1);
    success(`Loaded "${saved.name}" search preset (${saved.resultsCount} leads).`);
  }, [success]);

  const clearHistory = useCallback(() => {
    setSearchHistory([]);
    info('Search history cleared.');
  }, [info]);

  const refreshSearch = useCallback(() => {
    setPage(1);
    success('Lead finder search index synchronized.');
  }, [success]);

  const exportToCsv = useCallback(() => {
    const headers = ['Name,Title,Company,Industry,Headcount,Revenue,Location,Email,Phone,ICP Score\n'];
    const rows = allMatchingResults.map((l) =>
      `"${l.name}","${l.title}","${l.company}","${l.industry}","${l.headcount}","${l.revenue}","${l.location}","${l.email}","${l.phone}",${l.icpScore}\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `outtricks_leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    success(`Exported ${allMatchingResults.length} leads to CSV.`);
  }, [allMatchingResults, success]);

  const copyShareableSearchUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href);
    success('Shareable search link with active filter state copied to clipboard!', 'Search Link Copied');
  }, [success]);

  return (
    <LeadSearchContext.Provider
      value={{
        filters,
        sorting,
        pagination: {
          page,
          pageSize,
          totalPages,
          totalResults: allMatchingResults.length,
        },
        selection: {
          selectedIds,
          isAllSelectedOnPage: paginatedResults.length > 0 && paginatedResults.every((l) => selectedIds.includes(l.id)),
          isAllMatchesSelected: allMatchingResults.length > 0 && selectedIds.length === allMatchingResults.length,
        },
        searchStatus: 'idle',
        errorMessage: null,
        results: paginatedResults,
        allMatchingResults,
        savedSearches,
        searchHistory,
        isAdvancedFiltersDrawerOpen,
        setSearchQuery,
        updateFilters,
        toggleFilterValue,
        removeFilterChip,
        resetFilters,
        setSorting,
        setPage,
        setPageSize,
        toggleSelectLead,
        toggleSelectAllOnPage,
        selectAllMatches,
        clearSelection,
        saveCurrentSearch,
        deleteSavedSearch,
        loadSavedSearch,
        clearHistory,
        refreshSearch,
        exportToCsv,
        copyShareableSearchUrl,
        setIsAdvancedFiltersDrawerOpen,
      }}
    >
      {children}
    </LeadSearchContext.Provider>
  );
};

export const useLeadSearch = () => {
  const context = useContext(LeadSearchContext);
  if (!context) {
    throw new Error('useLeadSearch must be used within a LeadSearchProvider');
  }
  return context;
};
