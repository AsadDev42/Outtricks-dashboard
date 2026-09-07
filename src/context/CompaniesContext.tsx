import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { LeadOwnerType } from './LeadsManagementContext';

export type CompanyStatusType = 'Target' | 'Prospecting' | 'In Outreach' | 'Customer' | 'Churned' | 'Archived';

export interface WorkspaceCompany {
  id: string;
  name: string;
  domain: string;
  logo: string;
  industry: string;
  headcount: string;
  revenue: string;
  funding: string;
  location: string;
  website: string;
  linkedinUrl: string;
  description: string;
  techStack: string[];
  intentSignal: string;
  status: CompanyStatusType;
  owner: LeadOwnerType;
  tags: string[];
  contactsCount: number;
  openDealsValue: number;
  dataStatus: string;
  addedAt: string;
  lastActivity: string;
  listIds: string[];
}

export interface CustomCompanyList {
  id: string;
  name: string;
  description: string;
  count: number;
  createdAt: string;
}

export type CompaniesSortField = 'name' | 'headcount' | 'revenue' | 'contactsCount' | 'openDealsValue' | 'status' | 'addedAt';
export type CompaniesSortOrder = 'asc' | 'desc';

interface CompaniesContextType {
  companies: WorkspaceCompany[];
  allFilteredCompanies: WorkspaceCompany[];
  customLists: CustomCompanyList[];
  activeSegment: string;
  selectedListId: string;
  searchQuery: string;
  filterIndustry: string;
  filterHeadcount: string;
  filterOwner: string;
  sorting: { field: CompaniesSortField; order: CompaniesSortOrder };
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

  // Setters
  setActiveSegment: (segment: string) => void;
  setSelectedListId: (listId: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterIndustry: (industry: string) => void;
  setFilterHeadcount: (headcount: string) => void;
  setFilterOwner: (owner: string) => void;
  resetAllFilters: () => void;

  // Sorting & Pagination
  setSorting: (field: CompaniesSortField) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;

  // Selection
  toggleSelectCompany: (id: string) => void;
  toggleSelectAllOnPage: () => void;
  selectAllMatches: () => void;
  clearSelection: () => void;

  // Company Mutations
  createCompany: (company: Partial<WorkspaceCompany>) => void;
  updateCompany: (updatedCompany: WorkspaceCompany) => void;
  updateCompanyStatus: (id: string, status: CompanyStatusType) => void;
  updateCompanyOwner: (id: string, owner: LeadOwnerType) => void;
  addCompanyTag: (id: string, tag: string) => void;
  removeCompanyTag: (id: string, tag: string) => void;
  archiveCompany: (id: string) => void;
  deleteCompany: (id: string) => void;

  // Bulk Operations
  bulkUpdateStatus: (status: CompanyStatusType) => void;
  bulkUpdateOwner: (owner: LeadOwnerType) => void;
  bulkAddTag: (tag: string) => void;
  bulkAddToList: (listId: string) => void;
  bulkArchive: () => void;
  bulkDelete: () => void;

  // Lists
  createCustomList: (name: string, description?: string) => void;
  deleteCustomList: (listId: string) => void;

  // Export
  exportCompaniesToCsv: () => void;
}

const INITIAL_COMPANIES: WorkspaceCompany[] = [
  {
    id: 'comp_1',
    name: 'CloudScale AI',
    domain: 'cloudscale.ai',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    industry: 'Enterprise B2B SaaS',
    headcount: '51-200',
    revenue: '$25M - $50M',
    funding: 'Series B ($32M)',
    location: 'San Francisco, CA',
    website: 'https://cloudscale.ai',
    linkedinUrl: 'https://linkedin.com/company/cloudscale-ai',
    description: 'Autonomous cloud infrastructure optimization and automated compute scaling platform for enterprise engineering orgs.',
    techStack: ['Salesforce', 'Stripe', 'PostgreSQL', 'AWS', 'Docker'],
    intentSignal: 'Hiring +6 SDRs & Scaling Outbound Sales Stack',
    status: 'In Outreach',
    owner: 'Sarah Jenkins',
    tags: ['Tier 1 Target', 'Q3 Pipeline', 'Series B'],
    contactsCount: 3,
    openDealsValue: 48000,
    dataStatus: 'Complete',
    addedAt: '2026-08-15',
    lastActivity: 'Cold Email Step 2 Opened (Today)',
    listIds: ['clist_1'],
  },
  {
    id: 'comp_2',
    name: 'Apex Data Labs',
    domain: 'apexdata.io',
    logo: 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?auto=format&fit=crop&w=120&q=80',
    industry: 'Cybersecurity & DevOps',
    headcount: '51-200',
    revenue: '$10M - $25M',
    funding: 'Series B ($32M)',
    location: 'New York, NY',
    website: 'https://apexdata.io',
    linkedinUrl: 'https://linkedin.com/company/apex-data-labs',
    description: 'Real-time telemetry and compliance analytics engine for cloud-native Kubernetes clusters.',
    techStack: ['HubSpot', 'Snowflake', 'React', 'GCP', 'Kubernetes'],
    intentSignal: 'Recent Venture Funding (Series B $32M)',
    status: 'Prospecting',
    owner: 'Marcus Vance',
    tags: ['Security Stack', 'Demo Scheduled'],
    contactsCount: 2,
    openDealsValue: 36000,
    dataStatus: 'Complete',
    addedAt: '2026-08-18',
    lastActivity: 'Voice AI SDR Call Confirmed (Yesterday)',
    listIds: ['clist_1'],
  },
  {
    id: 'comp_3',
    name: 'FinTech Stack Systems',
    domain: 'fintechstack.com',
    logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=120&q=80',
    industry: 'FinTech & B2B Payments',
    headcount: '201-500',
    revenue: '$50M - $100M',
    funding: 'Series C ($75M)',
    location: 'London, UK',
    website: 'https://fintechstack.com',
    linkedinUrl: 'https://linkedin.com/company/fintech-stack-systems',
    description: 'Global multi-currency rails and settlement infrastructure for high-volume cross-border marketplaces.',
    techStack: ['Salesforce', 'Segment', 'Stripe', 'Datadog', 'Kafka'],
    intentSignal: 'Tool Migration / Modernizing CRM Stack',
    status: 'In Outreach',
    owner: 'Sarah Jenkins',
    tags: ['Enterprise Deal', 'UK Market', 'High ARR'],
    contactsCount: 4,
    openDealsValue: 72000,
    dataStatus: 'Complete',
    addedAt: '2026-08-10',
    lastActivity: 'Replied with Positive Intent (2d ago)',
    listIds: ['clist_2'],
  },
  {
    id: 'comp_4',
    name: 'SaaSFlow Global',
    domain: 'saasflow.co',
    logo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80',
    industry: 'Enterprise B2B SaaS',
    headcount: '51-200',
    revenue: '$10M - $25M',
    funding: 'Series A ($14M)',
    location: 'New York, NY',
    website: 'https://saasflow.co',
    linkedinUrl: 'https://linkedin.com/company/saasflow-global',
    description: 'Automated revenue operations and customer lifecycle billing engine for high-velocity software companies.',
    techStack: ['HubSpot', 'PostgreSQL', 'React', 'AWS'],
    intentSignal: 'Evaluating Multi-Inbox Outreach Infrastructure',
    status: 'Target',
    owner: 'Unassigned',
    tags: ['Demand Gen Target'],
    contactsCount: 1,
    openDealsValue: 24000,
    dataStatus: 'Complete',
    addedAt: '2026-08-20',
    lastActivity: 'Profile Created (3d ago)',
    listIds: ['clist_1'],
  },
  {
    id: 'comp_5',
    name: 'ScaleWave Media',
    domain: 'scalewave.agency',
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=120&q=80',
    industry: 'Marketing & Growth Agencies',
    headcount: '11-50',
    revenue: '$1M - $10M',
    funding: 'Bootstrapped',
    location: 'Toronto, Canada',
    website: 'https://scalewave.agency',
    linkedinUrl: 'https://linkedin.com/company/scalewave-media',
    description: 'Performance acquisition and growth marketing agency scaling direct-to-consumer and B2B brands.',
    techStack: ['Stripe', 'React', 'AWS', 'Meta Ads API'],
    intentSignal: 'Hiring +5 Sales Reps / SDRs',
    status: 'In Outreach',
    owner: 'Alex Rivera',
    tags: ['Agency Cohort', 'Canada'],
    contactsCount: 2,
    openDealsValue: 18000,
    dataStatus: 'Complete',
    addedAt: '2026-08-21',
    lastActivity: 'Dispatched LinkedIn Connection (Today)',
    listIds: [],
  },
  {
    id: 'comp_6',
    name: 'Apex Global Logistics',
    domain: 'apexlogistics.com',
    logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
    industry: 'E-Commerce & Supply Chain',
    headcount: '501-1000',
    revenue: '$50M - $100M',
    funding: 'Series D ($120M)',
    location: 'Austin, TX',
    website: 'https://apexlogistics.com',
    linkedinUrl: 'https://linkedin.com/company/apex-global-logistics',
    description: 'AI-driven freight forwarding, warehouse automation, and last-mile tracking platform.',
    techStack: ['Salesforce', 'AWS', 'Datadog', 'SAP'],
    intentSignal: 'Leadership Change / Executive Expansion',
    status: 'Customer',
    owner: 'Sarah Jenkins',
    tags: ['Enterprise Customer', 'Annual Contract'],
    contactsCount: 5,
    openDealsValue: 120000,
    dataStatus: 'Complete',
    addedAt: '2026-07-15',
    lastActivity: 'Contract Renewed (Last Month)',
    listIds: ['clist_2'],
  }
];

const INITIAL_COMPANY_LISTS: CustomCompanyList[] = [
  { id: 'clist_1', name: 'US Series A/B High Growth SaaS', description: 'Funded tech accounts scaling sales organizations', count: 3, createdAt: '2026-08-15' },
  { id: 'clist_2', name: 'Global Enterprise $50M+ ARR', description: 'Large accounts with multi-million dollar procurement budgets', count: 2, createdAt: '2026-08-18' },
];

const CompaniesContext = createContext<CompaniesContextType | undefined>(undefined);

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, info } = useToast();

  const [companies, setCompanies] = useState<WorkspaceCompany[]>(() => {
    try {
      const stored = localStorage.getItem('outtricks_workspace_companies');
      return stored ? JSON.parse(stored) : INITIAL_COMPANIES;
    } catch {
      return INITIAL_COMPANIES;
    }
  });

  const [customLists, setCustomLists] = useState<CustomCompanyList[]>(() => {
    try {
      const stored = localStorage.getItem('outtricks_company_lists');
      return stored ? JSON.parse(stored) : INITIAL_COMPANY_LISTS;
    } catch {
      return INITIAL_COMPANY_LISTS;
    }
  });

  // Filter & Segment State
  const [activeSegment, setActiveSegment] = useState<string>('all');
  const [selectedListId, setSelectedListId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterIndustry, setFilterIndustry] = useState<string>('all');
  const [filterHeadcount, setFilterHeadcount] = useState<string>('all');
  const [filterOwner, setFilterOwner] = useState<string>('all');

  // Sorting & Pagination State
  const [sorting, setSortingState] = useState<{ field: CompaniesSortField; order: CompaniesSortOrder }>({
    field: 'openDealsValue',
    order: 'desc',
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAllMatchesSelected, setIsAllMatchesSelected] = useState(false);

  // Persist
  useEffect(() => {
    localStorage.setItem('outtricks_workspace_companies', JSON.stringify(companies));
  }, [companies]);

  useEffect(() => {
    localStorage.setItem('outtricks_company_lists', JSON.stringify(customLists));
  }, [customLists]);

  // Filtering
  const allFilteredCompanies = useMemo(() => {
    return companies.filter((comp) => {
      // 1. Segment Tab Filter
      if (activeSegment === 'target' && comp.status !== 'Target') return false;
      if (activeSegment === 'prospecting' && comp.status !== 'Prospecting') return false;
      if (activeSegment === 'outreach' && comp.status !== 'In Outreach') return false;
      if (activeSegment === 'customer' && comp.status !== 'Customer') return false;
      if (activeSegment === 'unassigned' && comp.owner !== 'Unassigned') return false;
      if (activeSegment === 'archived' && comp.status !== 'Archived') return false;
      if (activeSegment !== 'archived' && comp.status === 'Archived') return false;

      // 2. Custom List
      if (selectedListId !== 'all' && !comp.listIds?.includes(selectedListId)) return false;

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = comp.name.toLowerCase().includes(q);
        const matchesDomain = comp.domain.toLowerCase().includes(q);
        const matchesIndustry = comp.industry.toLowerCase().includes(q);
        const matchesLocation = comp.location.toLowerCase().includes(q);
        const matchesTech = comp.techStack.some((t) => t.toLowerCase().includes(q));
        const matchesTag = comp.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesDomain && !matchesIndustry && !matchesLocation && !matchesTech && !matchesTag) {
          return false;
        }
      }

      // 4. Industry Filter
      if (filterIndustry !== 'all' && comp.industry !== filterIndustry) return false;

      // 5. Headcount Filter
      if (filterHeadcount !== 'all' && comp.headcount !== filterHeadcount) return false;

      // 6. Owner Filter
      if (filterOwner !== 'all' && comp.owner !== filterOwner) return false;

      return true;
    });
  }, [companies, activeSegment, selectedListId, searchQuery, filterIndustry, filterHeadcount, filterOwner]);

  // Sorting
  const sortedCompanies = useMemo(() => {
    const items = [...allFilteredCompanies];
    items.sort((a, b) => {
      let comp = 0;
      if (sorting.field === 'name') comp = a.name.localeCompare(b.name);
      else if (sorting.field === 'openDealsValue') comp = b.openDealsValue - a.openDealsValue;
      else if (sorting.field === 'contactsCount') comp = b.contactsCount - a.contactsCount;
      else if (sorting.field === 'status') comp = a.status.localeCompare(b.status);
      else if (sorting.field === 'addedAt') comp = new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      return sorting.order === 'asc' ? -comp : comp;
    });
    return items;
  }, [allFilteredCompanies, sorting]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedCompanies.length / pageSize));
  const paginatedCompanies = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedCompanies.slice(start, start + pageSize);
  }, [sortedCompanies, page, pageSize]);

  // Actions
  const resetAllFilters = useCallback(() => {
    setActiveSegment('all');
    setSelectedListId('all');
    setSearchQuery('');
    setFilterIndustry('all');
    setFilterHeadcount('all');
    setFilterOwner('all');
    setPage(1);
    setSelectedIds([]);
  }, []);

  const setSorting = useCallback((field: CompaniesSortField) => {
    setSortingState((prev) => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc',
    }));
  }, []);

  const toggleSelectCompany = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const isAllSelectedOnPage = paginatedCompanies.length > 0 && paginatedCompanies.every((c) => selectedIds.includes(c.id));

  const toggleSelectAllOnPage = useCallback(() => {
    if (isAllSelectedOnPage) {
      const pageIds = paginatedCompanies.map((c) => c.id);
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
      setIsAllMatchesSelected(false);
    } else {
      const pageIds = paginatedCompanies.map((c) => c.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  }, [isAllSelectedOnPage, paginatedCompanies]);

  const selectAllMatches = useCallback(() => {
    setSelectedIds(allFilteredCompanies.map((c) => c.id));
    setIsAllMatchesSelected(true);
    success(`Selected all ${allFilteredCompanies.length} matching companies.`, 'Selection Complete');
  }, [allFilteredCompanies, success]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
    setIsAllMatchesSelected(false);
  }, []);

  // Mutations
  const createCompany = useCallback((compData: Partial<WorkspaceCompany>) => {
    const newComp: WorkspaceCompany = {
      id: `comp_${Date.now()}`,
      name: compData.name || 'New Target Account',
      domain: compData.domain || 'domain.com',
      logo: compData.logo || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
      industry: compData.industry || 'Enterprise B2B SaaS',
      headcount: compData.headcount || '51-200',
      revenue: compData.revenue || '$10M - $25M',
      funding: compData.funding || 'Series A',
      location: compData.location || 'United States',
      website: compData.website || `https://${compData.domain || 'example.com'}`,
      linkedinUrl: compData.linkedinUrl || `https://linkedin.com/company/${compData.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      description: compData.description || 'Target account enrolled for automated outbound campaigns.',
      techStack: compData.techStack || ['Salesforce', 'AWS'],
      intentSignal: compData.intentSignal || 'Evaluating Outbound Infrastructure',
      status: compData.status || 'Target',
      owner: compData.owner || 'Sarah Jenkins',
      tags: compData.tags || ['Manual Account'],
      contactsCount: 0,
      openDealsValue: compData.openDealsValue || 35000,
      dataStatus: 'Complete',
      addedAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Account Created (Just now)',
      listIds: compData.listIds || [],
    };

    setCompanies((prev) => [newComp, ...prev]);
    success(`Created new company account "${newComp.name}".`, 'Company Created');
  }, [success]);

  const updateCompany = useCallback((updated: WorkspaceCompany) => {
    setCompanies((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    success(`Saved changes for ${updated.name}.`, 'Account Updated');
  }, [success]);

  const updateCompanyStatus = useCallback((id: string, status: CompanyStatusType) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status, lastActivity: `Status updated to ${status}` } : c))
    );
    success(`Company status updated to "${status}".`, 'Status Changed');
  }, [success]);

  const updateCompanyOwner = useCallback((id: string, owner: LeadOwnerType) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, owner, lastActivity: `Assigned to ${owner}` } : c))
    );
    success(`Assigned account to "${owner}".`, 'Owner Assigned');
  }, [success]);

  const addCompanyTag = useCallback((id: string, tag: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id && !c.tags.includes(tag) ? { ...c, tags: [...c.tags, tag] } : c))
    );
  }, []);

  const removeCompanyTag = useCallback((id: string, tag: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, tags: c.tags.filter((t) => t !== tag) } : c))
    );
  }, []);

  const archiveCompany = useCallback((id: string) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'Archived', lastActivity: 'Archived' } : c))
    );
    info('Company account archived.', 'Archived');
  }, [info]);

  const deleteCompany = useCallback((id: string) => {
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    info('Company deleted from workspace.', 'Deleted');
  }, [info]);

  // Bulk operations
  const bulkUpdateStatus = useCallback((status: CompanyStatusType) => {
    setCompanies((prev) =>
      prev.map((c) => (selectedIds.includes(c.id) ? { ...c, status, lastActivity: `Bulk status: ${status}` } : c))
    );
    success(`Updated status for ${selectedIds.length} companies to "${status}".`, 'Bulk Updated');
    clearSelection();
  }, [selectedIds, success, clearSelection]);

  const bulkUpdateOwner = useCallback((owner: LeadOwnerType) => {
    setCompanies((prev) =>
      prev.map((c) => (selectedIds.includes(c.id) ? { ...c, owner, lastActivity: `Assigned to ${owner}` } : c))
    );
    success(`Reassigned ${selectedIds.length} companies to "${owner}".`, 'Bulk Reassigned');
    clearSelection();
  }, [selectedIds, success, clearSelection]);

  const bulkAddTag = useCallback((tag: string) => {
    setCompanies((prev) =>
      prev.map((c) =>
        selectedIds.includes(c.id) && !c.tags.includes(tag)
          ? { ...c, tags: [...c.tags, tag] }
          : c
      )
    );
    success(`Added tag "${tag}" to ${selectedIds.length} companies.`, 'Bulk Tagged');
    clearSelection();
  }, [selectedIds, success, clearSelection]);

  const bulkAddToList = useCallback((listId: string) => {
    setCompanies((prev) =>
      prev.map((c) =>
        selectedIds.includes(c.id) && !c.listIds?.includes(listId)
          ? { ...c, listIds: [...(c.listIds || []), listId] }
          : c
      )
    );
    const targetList = customLists.find((list) => list.id === listId);
    success(`Enrolled ${selectedIds.length} accounts into "${targetList?.name || 'Account List'}".`, 'List Updated');
    clearSelection();
  }, [selectedIds, customLists, success, clearSelection]);

  const bulkArchive = useCallback(() => {
    setCompanies((prev) =>
      prev.map((c) => (selectedIds.includes(c.id) ? { ...c, status: 'Archived' } : c))
    );
    info(`Archived ${selectedIds.length} companies.`, 'Archived');
    clearSelection();
  }, [selectedIds, info, clearSelection]);

  const bulkDelete = useCallback(() => {
    setCompanies((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
    info(`Deleted ${selectedIds.length} companies from workspace.`, 'Deleted');
    clearSelection();
  }, [selectedIds, info, clearSelection]);

  // Lists
  const createCustomList = useCallback((name: string, description = '') => {
    const newList: CustomCompanyList = {
      id: `clist_${Date.now()}`,
      name,
      description,
      count: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomLists((prev) => [...prev, newList]);
    success(`Created custom account list "${name}".`, 'List Created');
  }, [success]);

  const deleteCustomList = useCallback((listId: string) => {
    setCustomLists((prev) => prev.filter((l) => l.id !== listId));
    if (selectedListId === listId) setSelectedListId('all');
    info('Target list removed.', 'Removed');
  }, [selectedListId, info]);

  // Export
  const exportCompaniesToCsv = useCallback(() => {
    const targets = selectedIds.length > 0
      ? companies.filter((c) => selectedIds.includes(c.id))
      : allFilteredCompanies;

    const rows = targets.map(
      (c) => `"${c.name}","${c.domain}","${c.industry}","${c.headcount}","${c.revenue}","${c.funding}","${c.location}","${c.status}","${c.owner}","${c.openDealsValue}"`
    );

    const csvContent = 'data:text/csv;charset=utf-8,Company,Domain,Industry,Headcount,Revenue,Funding,Location,Status,Owner,PipelineValue\n' + rows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `outtricks_companies_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    success(`Exported ${targets.length} company accounts to CSV.`, 'Export Complete');
  }, [selectedIds, companies, allFilteredCompanies, success]);

  return (
    <CompaniesContext.Provider
      value={{
        companies: paginatedCompanies,
        allFilteredCompanies,
        customLists,
        activeSegment,
        selectedListId,
        searchQuery,
        filterIndustry,
        filterHeadcount,
        filterOwner,
        sorting,
        pagination: {
          page,
          pageSize,
          totalPages,
          totalResults: allFilteredCompanies.length,
        },
        selection: {
          selectedIds,
          isAllSelectedOnPage,
          isAllMatchesSelected,
        },
        setActiveSegment,
        setSelectedListId,
        setSearchQuery,
        setFilterIndustry,
        setFilterHeadcount,
        setFilterOwner,
        resetAllFilters,
        setSorting,
        setPage,
        setPageSize,
        toggleSelectCompany,
        toggleSelectAllOnPage,
        selectAllMatches,
        clearSelection,
        createCompany,
        updateCompany,
        updateCompanyStatus,
        updateCompanyOwner,
        addCompanyTag,
        removeCompanyTag,
        archiveCompany,
        deleteCompany,
        bulkUpdateStatus,
        bulkUpdateOwner,
        bulkAddTag,
        bulkAddToList,
        bulkArchive,
        bulkDelete,
        createCustomList,
        deleteCustomList,
        exportCompaniesToCsv,
      }}
    >
      {children}
    </CompaniesContext.Provider>
  );
};

export const useCompanies = () => {
  const context = useContext(CompaniesContext);
  if (!context) {
    throw new Error('useCompanies must be used within a CompaniesProvider');
  }
  return context;
};
