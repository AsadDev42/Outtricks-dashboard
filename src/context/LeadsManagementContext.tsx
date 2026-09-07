import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { LeadDetailData } from './LeadSearchContext';

export type LeadStatusType = 'New' | 'Verified' | 'In Sequence' | 'Meeting Booked' | 'Replied' | 'Unresponsive' | 'Archived';
export type LeadOwnerType = 'Sarah Jenkins' | 'Marcus Vance' | 'Alex Rivera' | 'Unassigned';

export interface WorkspaceLead extends LeadDetailData {
  owner: LeadOwnerType;
  status: LeadStatusType;
  tags: string[];
  source: '8D Lead Finder' | 'CSV Import' | 'LinkedIn Sync' | 'Inbound Form' | 'API';
  addedAt: string;
  lastActivity: string;
  listIds: string[];
  dealValue?: number;
}

export interface CustomLeadList {
  id: string;
  name: string;
  description: string;
  count: number;
  createdAt: string;
}

export type LeadsSortField = 'icpScore' | 'name' | 'company' | 'addedAt' | 'lastActivity' | 'status' | 'deliverabilityScore';
export type LeadsSortOrder = 'asc' | 'desc';

interface LeadsManagementContextType {
  leads: WorkspaceLead[];
  allFilteredLeads: WorkspaceLead[];
  customLists: CustomLeadList[];
  activeSegment: string;
  selectedListId: string;
  searchQuery: string;
  filterOwner: string;
  filterSource: string;
  filterTag: string;
  sorting: { field: LeadsSortField; order: LeadsSortOrder };
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
  
  // Segment & Filter Setters
  setActiveSegment: (segment: string) => void;
  setSelectedListId: (listId: string) => void;
  setSearchQuery: (query: string) => void;
  setFilterOwner: (owner: string) => void;
  setFilterSource: (source: string) => void;
  setFilterTag: (tag: string) => void;
  resetAllFilters: () => void;
  
  // Sorting & Pagination
  setSorting: (field: LeadsSortField) => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;

  // Selection
  toggleSelectLead: (id: string) => void;
  toggleSelectAllOnPage: () => void;
  selectAllMatches: () => void;
  clearSelection: () => void;

  // Lead Mutations
  createLead: (lead: Partial<WorkspaceLead>) => void;
  updateLead: (updatedLead: WorkspaceLead) => void;
  updateLeadStatus: (id: string, status: LeadStatusType) => void;
  updateLeadOwner: (id: string, owner: LeadOwnerType) => void;
  addLeadTag: (id: string, tag: string) => void;
  removeLeadTag: (id: string, tag: string) => void;
  archiveLead: (id: string) => void;
  deleteLead: (id: string) => void;

  // Bulk Operations
  bulkUpdateStatus: (status: LeadStatusType) => void;
  bulkUpdateOwner: (owner: LeadOwnerType) => void;
  bulkAddTag: (tag: string) => void;
  bulkAddToList: (listId: string) => void;
  bulkArchive: () => void;
  bulkDelete: () => void;

  // Lists
  createCustomList: (name: string, description?: string) => void;
  deleteCustomList: (listId: string) => void;

  // Export
  exportLeadsToCsv: () => void;
}

const INITIAL_WORKSPACE_LEADS: WorkspaceLead[] = [
  {
    id: 'wlead_1',
    name: 'Sarah Jenkins',
    title: 'VP of Growth & Revenue',
    company: 'CloudScale AI',
    industry: 'Enterprise B2B SaaS',
    headcount: '51-200',
    revenue: '$25M - $50M',
    location: 'San Francisco Bay Area',
    email: 'sarah.j@cloudscale.ai',
    phone: '+1 (415) 892-4910',
    tech: ['Salesforce', 'Stripe', 'PostgreSQL', 'AWS'],
    intentSignal: 'Hiring +6 SDRs & Scaling Outbound',
    icpScore: 98,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    profileStatus: 'Complete',
    deliverabilityScore: 100,
    phoneStatus: 'Verified Mobile',
    fundingStage: 'Series B',
    domain: 'cloudscale.ai',
    owner: 'Sarah Jenkins',
    status: 'In Sequence',
    tags: ['High Priority', 'Q3 Target', 'SaaS Buyer'],
    source: '8D Lead Finder',
    addedAt: '2026-08-20',
    lastActivity: 'Opened Email Step 2 (Today)',
    listIds: ['list_1'],
    dealValue: 48000
  },
  {
    id: 'wlead_2',
    name: 'Marcus Vance',
    title: 'Head of Revenue Operations',
    company: 'Apex Data Labs',
    industry: 'Cybersecurity & DevOps',
    headcount: '51-200',
    revenue: '$10M - $25M',
    location: 'New York Metro Area',
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
    owner: 'Marcus Vance',
    status: 'Meeting Booked',
    tags: ['Demo Scheduled', 'Series B', 'Hot Lead'],
    source: '8D Lead Finder',
    addedAt: '2026-08-19',
    lastActivity: 'Voice AI SDR Call Confirmed (Yesterday)',
    listIds: ['list_1'],
    dealValue: 36000
  },
  {
    id: 'wlead_3',
    name: 'Elena Rostova',
    title: 'Chief Revenue Officer',
    company: 'FinTech Stack Systems',
    industry: 'FinTech & B2B Payments',
    headcount: '201-500',
    revenue: '$50M - $100M',
    location: 'United Kingdom',
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
    owner: 'Sarah Jenkins',
    status: 'Replied',
    tags: ['Enterprise Deal', 'FinTech', 'UK Buyer'],
    source: 'CSV Import',
    addedAt: '2026-08-18',
    lastActivity: 'Replied with Positive Intent (2d ago)',
    listIds: ['list_2'],
    dealValue: 72000
  },
  {
    id: 'wlead_4',
    name: 'David Chen',
    title: 'Head of Demand Generation',
    company: 'SaaSFlow Global',
    industry: 'Enterprise B2B SaaS',
    headcount: '51-200',
    revenue: '$10M - $25M',
    location: 'New York Metro Area',
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
    owner: 'Unassigned',
    status: 'New',
    tags: ['Demand Gen', 'Evaluating Outbound'],
    source: '8D Lead Finder',
    addedAt: '2026-08-22',
    lastActivity: 'Added to Workspace (3d ago)',
    listIds: ['list_1'],
    dealValue: 24000
  },
  {
    id: 'wlead_5',
    name: 'Amira Patel',
    title: 'Founder / CEO / Co-Founder',
    company: 'ScaleWave Media',
    industry: 'Marketing & Growth Agencies',
    headcount: '11-50',
    revenue: '$1M - $10M',
    location: 'Canada',
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
    owner: 'Alex Rivera',
    status: 'In Sequence',
    tags: ['Agency Founder', 'Canada', 'High Growth'],
    source: 'LinkedIn Sync',
    addedAt: '2026-08-21',
    lastActivity: 'Dispatched LinkedIn Connection (Today)',
    listIds: [],
    dealValue: 18000
  },
  {
    id: 'wlead_6',
    name: 'Tom Hiddleston',
    title: 'VP of Sales / CRO',
    company: 'Apex Global Logistics',
    industry: 'E-Commerce & Supply Chain',
    headcount: '501-1000',
    revenue: '$50M - $100M',
    location: 'Austin, Texas',
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
    owner: 'Sarah Jenkins',
    status: 'Unresponsive',
    tags: ['Enterprise Logistics', 'Follow Up Q4'],
    source: '8D Lead Finder',
    addedAt: '2026-08-15',
    lastActivity: 'Sequence Completed (5 Steps)',
    listIds: ['list_1'],
    dealValue: 55000
  }
];

const INITIAL_CUSTOM_LISTS: CustomLeadList[] = [
  { id: 'list_1', name: 'Q3 Enterprise SaaS VPs', description: 'Targeting US & UK Vice Presidents of Sales & Growth', count: 4, createdAt: '2026-08-15' },
  { id: 'list_2', name: 'FinTech CROs & Directors', description: 'B2B payment platforms with $25M+ ARR', count: 1, createdAt: '2026-08-18' },
  { id: 'list_3', name: 'Series A/B High Growth Founders', description: 'Funded startups actively expanding outbound SDR teams', count: 0, createdAt: '2026-08-21' },
];

const LeadsManagementContext = createContext<LeadsManagementContextType | undefined>(undefined);

export const LeadsManagementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, info, error } = useToast();

  const [leads, setLeads] = useState<WorkspaceLead[]>(() => {
    try {
      const stored = localStorage.getItem('outtricks_workspace_leads');
      return stored ? JSON.parse(stored) : INITIAL_WORKSPACE_LEADS;
    } catch {
      return INITIAL_WORKSPACE_LEADS;
    }
  });

  const [customLists, setCustomLists] = useState<CustomLeadList[]>(() => {
    try {
      const stored = localStorage.getItem('outtricks_custom_lists');
      return stored ? JSON.parse(stored) : INITIAL_CUSTOM_LISTS;
    } catch {
      return INITIAL_CUSTOM_LISTS;
    }
  });

  // Filter & Segment State
  const [activeSegment, setActiveSegment] = useState<string>('all');
  const [selectedListId, setSelectedListId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterOwner, setFilterOwner] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');

  // Sorting & Pagination State
  const [sorting, setSortingState] = useState<{ field: LeadsSortField; order: LeadsSortOrder }>({
    field: 'icpScore',
    order: 'desc',
  });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAllMatchesSelected, setIsAllMatchesSelected] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('outtricks_workspace_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('outtricks_custom_lists', JSON.stringify(customLists));
  }, [customLists]);

  // Filtering Engine
  const allFilteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // 1. Segment Tab Filter
      if (activeSegment === 'verified' && lead.status !== 'Verified' && lead.deliverabilityScore < 98) return false;
      if (activeSegment === 'in_sequence' && lead.status !== 'In Sequence') return false;
      if (activeSegment === 'replied' && lead.status !== 'Replied') return false;
      if (activeSegment === 'booked' && lead.status !== 'Meeting Booked') return false;
      if (activeSegment === 'unassigned' && lead.owner !== 'Unassigned') return false;
      if (activeSegment === 'archived' && lead.status !== 'Archived') return false;
      if (activeSegment !== 'archived' && lead.status === 'Archived') return false;

      // 2. Custom List Filter
      if (selectedListId !== 'all' && !lead.listIds?.includes(selectedListId)) return false;

      // 3. Text Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = lead.name.toLowerCase().includes(q);
        const matchesTitle = lead.title.toLowerCase().includes(q);
        const matchesCompany = lead.company.toLowerCase().includes(q);
        const matchesEmail = lead.email.toLowerCase().includes(q);
        const matchesPhone = lead.phone?.toLowerCase().includes(q);
        const matchesTag = lead.tags.some((t) => t.toLowerCase().includes(q));

        if (!matchesName && !matchesTitle && !matchesCompany && !matchesEmail && !matchesPhone && !matchesTag) {
          return false;
        }
      }

      // 4. Owner Filter
      if (filterOwner !== 'all' && lead.owner !== filterOwner) return false;

      // 5. Source Filter
      if (filterSource !== 'all' && lead.source !== filterSource) return false;

      // 6. Tag Filter
      if (filterTag !== 'all' && !lead.tags.includes(filterTag)) return false;

      return true;
    });
  }, [leads, activeSegment, selectedListId, searchQuery, filterOwner, filterSource, filterTag]);

  // Sorting Engine
  const sortedLeads = useMemo(() => {
    const items = [...allFilteredLeads];
    items.sort((a, b) => {
      let comp = 0;
      if (sorting.field === 'icpScore') comp = b.icpScore - a.icpScore;
      else if (sorting.field === 'name') comp = a.name.localeCompare(b.name);
      else if (sorting.field === 'company') comp = a.company.localeCompare(b.company);
      else if (sorting.field === 'status') comp = a.status.localeCompare(b.status);
      else if (sorting.field === 'deliverabilityScore') comp = b.deliverabilityScore - a.deliverabilityScore;
      else if (sorting.field === 'addedAt') comp = new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
      return sorting.order === 'asc' ? -comp : comp;
    });
    return items;
  }, [allFilteredLeads, sorting]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedLeads.length / pageSize));
  const paginatedLeads = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedLeads.slice(start, start + pageSize);
  }, [sortedLeads, page, pageSize]);

  // Actions
  const resetAllFilters = useCallback(() => {
    setActiveSegment('all');
    setSelectedListId('all');
    setSearchQuery('');
    setFilterOwner('all');
    setFilterSource('all');
    setFilterTag('all');
    setPage(1);
    setSelectedIds([]);
  }, []);

  const setSorting = useCallback((field: LeadsSortField) => {
    setSortingState((prev) => ({
      field,
      order: prev.field === field && prev.order === 'desc' ? 'asc' : 'desc',
    }));
  }, []);

  const toggleSelectLead = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const isAllSelectedOnPage = paginatedLeads.length > 0 && paginatedLeads.every((l) => selectedIds.includes(l.id));

  const toggleSelectAllOnPage = useCallback(() => {
    if (isAllSelectedOnPage) {
      const pageIds = paginatedLeads.map((l) => l.id);
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
      setIsAllMatchesSelected(false);
    } else {
      const pageIds = paginatedLeads.map((l) => l.id);
      setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
    }
  }, [isAllSelectedOnPage, paginatedLeads]);

  const selectAllMatches = useCallback(() => {
    setSelectedIds(allFilteredLeads.map((l) => l.id));
    setIsAllMatchesSelected(true);
    success(`Selected all ${allFilteredLeads.length} matching leads.`, 'Selection Complete');
  }, [allFilteredLeads, success]);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
    setIsAllMatchesSelected(false);
  }, []);

  // Mutations
  const createLead = useCallback((leadData: Partial<WorkspaceLead>) => {
    const newLead: WorkspaceLead = {
      id: `wlead_${Date.now()}`,
      name: leadData.name || 'New Prospect',
      title: leadData.title || 'Decision Maker',
      company: leadData.company || 'Enterprise Account',
      industry: leadData.industry || 'B2B SaaS',
      headcount: leadData.headcount || '51-200',
      revenue: leadData.revenue || '$10M - $25M',
      location: leadData.location || 'United States',
      email: leadData.email || '',
      phone: leadData.phone || '',
      tech: leadData.tech || ['Salesforce', 'AWS'],
      intentSignal: leadData.intentSignal || 'Evaluating Outbound Tools',
      icpScore: leadData.icpScore || 90,
      avatar: leadData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      profileStatus: 'Complete',
      deliverabilityScore: 100,
      phoneStatus: 'Verified Mobile',
      owner: leadData.owner || 'Sarah Jenkins',
      status: leadData.status || 'New',
      tags: leadData.tags || ['Manual Add'],
      source: leadData.source || 'CSV Import',
      addedAt: new Date().toISOString().split('T')[0],
      lastActivity: 'Added to Workspace (Just now)',
      listIds: leadData.listIds || [],
      dealValue: leadData.dealValue || 30000,
    };

    setLeads((prev) => [newLead, ...prev]);
    success(`Added new lead "${newLead.name}" (${newLead.company}) to workspace.`, 'Lead Created');
  }, [success]);

  const updateLead = useCallback((updated: WorkspaceLead) => {
    setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    success(`Saved changes for ${updated.name}.`, 'Lead Updated');
  }, [success]);

  const updateLeadStatus = useCallback((id: string, status: LeadStatusType) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status, lastActivity: `Status changed to ${status}` } : l))
    );
    success(`Status updated to "${status}".`, 'Status Changed');
  }, [success]);

  const updateLeadOwner = useCallback((id: string, owner: LeadOwnerType) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, owner, lastActivity: `Assigned to ${owner}` } : l))
    );
    success(`Owner assigned to "${owner}".`, 'Owner Assigned');
  }, [success]);

  const addLeadTag = useCallback((id: string, tag: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id && !l.tags.includes(tag) ? { ...l, tags: [...l.tags, tag] } : l))
    );
  }, []);

  const removeLeadTag = useCallback((id: string, tag: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, tags: l.tags.filter((t) => t !== tag) } : l))
    );
  }, []);

  const archiveLead = useCallback((id: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'Archived', lastActivity: 'Archived' } : l))
    );
    info('Lead archived.', 'Archived');
  }, [info]);

  const deleteLead = useCallback((id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    setSelectedIds((prev) => prev.filter((i) => i !== id));
    info('Lead deleted from workspace.', 'Deleted');
  }, [info]);

  // Bulk operations
  const bulkUpdateStatus = useCallback((status: LeadStatusType) => {
    setLeads((prev) =>
      prev.map((l) => (selectedIds.includes(l.id) ? { ...l, status, lastActivity: `Bulk status: ${status}` } : l))
    );
    success(`Updated status for ${selectedIds.length} leads to "${status}".`, 'Bulk Update Complete');
    clearSelection();
  }, [selectedIds, success, clearSelection]);

  const bulkUpdateOwner = useCallback((owner: LeadOwnerType) => {
    setLeads((prev) =>
      prev.map((l) => (selectedIds.includes(l.id) ? { ...l, owner, lastActivity: `Assigned to ${owner}` } : l))
    );
    success(`Reassigned ${selectedIds.length} leads to "${owner}".`, 'Bulk Reassigned');
    clearSelection();
  }, [selectedIds, success, clearSelection]);

  const bulkAddTag = useCallback((tag: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        selectedIds.includes(l.id) && !l.tags.includes(tag)
          ? { ...l, tags: [...l.tags, tag] }
          : l
      )
    );
    success(`Added tag "${tag}" to ${selectedIds.length} leads.`, 'Bulk Tagged');
    clearSelection();
  }, [selectedIds, success, clearSelection]);

  const bulkAddToList = useCallback((listId: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        selectedIds.includes(l.id) && !l.listIds?.includes(listId)
          ? { ...l, listIds: [...(l.listIds || []), listId] }
          : l
      )
    );
    const targetList = customLists.find((list) => list.id === listId);
    success(`Added ${selectedIds.length} leads to list "${targetList?.name || 'Custom List'}".`, 'List Updated');
    clearSelection();
  }, [selectedIds, customLists, success, clearSelection]);

  const bulkArchive = useCallback(() => {
    setLeads((prev) =>
      prev.map((l) => (selectedIds.includes(l.id) ? { ...l, status: 'Archived' } : l))
    );
    info(`Archived ${selectedIds.length} leads.`, 'Archived');
    clearSelection();
  }, [selectedIds, info, clearSelection]);

  const bulkDelete = useCallback(() => {
    setLeads((prev) => prev.filter((l) => !selectedIds.includes(l.id)));
    info(`Deleted ${selectedIds.length} leads from workspace.`, 'Deleted');
    clearSelection();
  }, [selectedIds, info, clearSelection]);

  // Lists
  const createCustomList = useCallback((name: string, description = '') => {
    const newList: CustomLeadList = {
      id: `list_${Date.now()}`,
      name,
      description,
      count: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setCustomLists((prev) => [...prev, newList]);
    success(`Created custom target list "${name}".`, 'List Created');
  }, [success]);

  const deleteCustomList = useCallback((listId: string) => {
    setCustomLists((prev) => prev.filter((l) => l.id !== listId));
    if (selectedListId === listId) setSelectedListId('all');
    info('Target list deleted.', 'Removed');
  }, [selectedListId, info]);

  // Export
  const exportLeadsToCsv = useCallback(() => {
    const targets = selectedIds.length > 0
      ? leads.filter((l) => selectedIds.includes(l.id))
      : allFilteredLeads;

    const rows = targets.map(
      (l) => `"${l.name}","${l.title}","${l.company}","${l.email}","${l.phone}","${l.location}","${l.status}","${l.owner}","${l.tags.join(';')}"`
    );

    const csvContent = 'data:text/csv;charset=utf-8,Name,Title,Company,Email,Phone,Location,Status,Owner,Tags\n' + rows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `outtricks_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    success(`Exported ${targets.length} leads to CSV.`, 'Export Downloaded');
  }, [selectedIds, leads, allFilteredLeads, success]);

  return (
    <LeadsManagementContext.Provider
      value={{
        leads: paginatedLeads,
        allFilteredLeads,
        customLists,
        activeSegment,
        selectedListId,
        searchQuery,
        filterOwner,
        filterSource,
        filterTag,
        sorting,
        pagination: {
          page,
          pageSize,
          totalPages,
          totalResults: allFilteredLeads.length,
        },
        selection: {
          selectedIds,
          isAllSelectedOnPage,
          isAllMatchesSelected,
        },
        setActiveSegment,
        setSelectedListId,
        setSearchQuery,
        setFilterOwner,
        setFilterSource,
        setFilterTag,
        resetAllFilters,
        setSorting,
        setPage,
        setPageSize,
        toggleSelectLead,
        toggleSelectAllOnPage,
        selectAllMatches,
        clearSelection,
        createLead,
        updateLead,
        updateLeadStatus,
        updateLeadOwner,
        addLeadTag,
        removeLeadTag,
        archiveLead,
        deleteLead,
        bulkUpdateStatus,
        bulkUpdateOwner,
        bulkAddTag,
        bulkAddToList,
        bulkArchive,
        bulkDelete,
        createCustomList,
        deleteCustomList,
        exportLeadsToCsv,
      }}
    >
      {children}
    </LeadsManagementContext.Provider>
  );
};

export const useLeadsManagement = () => {
  const context = useContext(LeadsManagementContext);
  if (!context) {
    throw new Error('useLeadsManagement must be used within a LeadsManagementProvider');
  }
  return context;
};
