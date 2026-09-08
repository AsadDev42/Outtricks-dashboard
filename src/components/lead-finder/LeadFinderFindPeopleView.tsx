import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LeadFilterChipsBar, 
  LeadFinderFilterPanel, 
  LeadFinderResultsTable, 
  LeadDetailDrawer, 
  LeadImportModal, 
  AddToListModal, 
  SaveSearchModal, 
  SavedSearchesDrawer,
  LeadFinderAdvancedFiltersDrawer,
  CampaignEnrollModal
} from './index';
import { Tooltip } from '../ui/Tooltip';
import { Sliders, ChevronRight } from 'lucide-react';
import { useLeadSearch, LeadDetailData } from '../../context/LeadSearchContext';
import { useToast } from '../../context/ToastContext';
import { useCrm } from '../../context/CrmContext';

export const LeadFinderFindPeopleView: React.FC = () => {
  const [activeLeadDetail, setActiveLeadDetail] = useState<LeadDetailData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddToListModalOpen, setIsAddToListModalOpen] = useState(false);
  const [isSaveSearchModalOpen, setIsSaveSearchModalOpen] = useState(false);
  const [isSavedSearchesDrawerOpen, setIsSavedSearchesDrawerOpen] = useState(false);
  const [isCampaignEnrollOpen, setIsCampaignEnrollOpen] = useState(false);

  // Filter matrix collapse persistence
  const [isFilterCollapsed, setIsFilterCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('outtricks_lead_filter_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const handleToggleFilterCollapse = () => {
    setIsFilterCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('outtricks_lead_filter_collapsed', String(next));
      } catch (e) {
        console.warn('Failed to persist filter collapsed state', e);
      }
      return next;
    });
  };

  const { 
    results,
    selection, 
    isAdvancedFiltersDrawerOpen, 
    setIsAdvancedFiltersDrawerOpen,
    clearSelection
  } = useLeadSearch();

  const { saveLeadToCrm, createDeal, setActiveTab } = useCrm();
  const { success, info } = useToast();
  const navigate = useNavigate();

  const handleOpenLeadDetail = (lead: LeadDetailData) => {
    setActiveLeadDetail(lead);
    setIsDetailOpen(true);
  };

  const handlePushToSequence = () => {
    setIsCampaignEnrollOpen(true);
  };

  const handleBatchAddToCrm = () => {
    const selectedLeads = results.filter((l) => selection.selectedIds.includes(l.id));
    selectedLeads.forEach((lead) => {
      const res = saveLeadToCrm({
        name: lead.name,
        title: lead.title,
        company: lead.company,
        domain: lead.domain,
        email: lead.email,
        phone: lead.phone,
        avatar: lead.avatar,
        score: lead.icpScore,
        location: lead.location,
        tags: ['8D Lead Finder', 'Deals Batch'],
      });

      createDeal({
        title: `${lead.company} Expansion Deal`,
        companyName: lead.company,
        companyDomain: lead.domain,
        contactName: lead.name,
        contactEmail: lead.email,
        value: 48000,
        stageId: 'stage_qualified',
        probability: 60,
        expectedCloseDate: '2026-10-15',
        owner: 'Sarah Jenkins',
        tags: ['Outbound Prospecting', 'High Fit'],
        priority: 'high',
      });
    });

    success(`Converted ${selection.selectedIds.length} leads into active Opportunities in Deals CRM!`, 'Deals Created');
    clearSelection();
    setActiveTab('pipeline');
    navigate('/crm');
  };

  return (
    <div className="space-y-4 font-sans">
      {/* Dynamic Filter Chips Bar (appears when active filters exist) */}
      <LeadFilterChipsBar
        onOpenSaveSearchModal={() => setIsSaveSearchModalOpen(true)}
        onOpenSavedSearchesDrawer={() => setIsSavedSearchesDrawerOpen(true)}
        onOpenAdvancedFilters={() => setIsAdvancedFiltersDrawerOpen(true)}
      />

      {/* Main 8D Search Layout: Collapsible Left Filter Matrix + Reclaimed Width Results Table */}
      <div className="flex items-start gap-4 2xl:gap-6 w-full min-w-0 relative">
        
        {/* Desktop Filter Matrix Panel */}
        {!isFilterCollapsed && (
          <div className="hidden lg:block w-64 xl:w-72 2xl:w-80 shrink-0 transition-all duration-200">
            <LeadFinderFilterPanel
              isOpenMobile={isMobileFiltersOpen}
              onCloseMobile={() => setIsMobileFiltersOpen(false)}
              onCollapse={handleToggleFilterCollapse}
            />
          </div>
        )}

        {/* Collapsed Filter Matrix Edge Handle */}
        {isFilterCollapsed && (
          <div className="hidden lg:flex flex-col items-center shrink-0">
            <Tooltip content="Expand 8D Filter Matrix">
              <button
                type="button"
                onClick={handleToggleFilterCollapse}
                className="group flex flex-col items-center gap-2 py-3.5 px-2 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-xs cursor-pointer"
                title="Expand filters"
                aria-label="Expand filters"
              >
                <Sliders className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                <span className="[writing-mode:vertical-rl] rotate-180 text-[10px] font-extrabold tracking-wider uppercase text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 py-1">
                  Filters
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </button>
            </Tooltip>
          </div>
        )}

        {/* Mobile Filter Matrix Drawer */}
        <div className="lg:hidden">
          <LeadFinderFilterPanel
            isOpenMobile={isMobileFiltersOpen}
            onCloseMobile={() => setIsMobileFiltersOpen(false)}
          />
        </div>

        {/* Right Results Table Area (Reclaims 100% width when collapsed) */}
        <div className="flex-1 w-full min-w-0">
          <LeadFinderResultsTable
            onOpenLeadDetail={handleOpenLeadDetail}
            onTriggerAddToListModal={() => setIsAddToListModalOpen(true)}
            onPushToSequence={handlePushToSequence}
            onBatchAddToCrm={handleBatchAddToCrm}
            isFilterCollapsed={isFilterCollapsed}
            onToggleFilters={handleToggleFilterCollapse}
          />
        </div>

      </div>

      {/* 15-Dimension Advanced Filters Drawer */}
      <LeadFinderAdvancedFiltersDrawer
        isOpen={isAdvancedFiltersDrawerOpen}
        onClose={() => setIsAdvancedFiltersDrawerOpen(false)}
      />

      {/* Slideover 360° Lead Detail Drawer */}
      <LeadDetailDrawer
        lead={activeLeadDetail}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onDispatchEmail={(l) => {
          setIsDetailOpen(false);
          success(`Email composer staged for ${l.name}.`, 'Outreach Triggered');
          navigate('/inbox');
        }}
        onQueueVoiceCall={(l) => {
          setIsDetailOpen(false);
          success(`Queued Voice SDR call to ${l.phone}.`, 'Dialer Scheduled');
          navigate('/voice-ai');
        }}
        onAddToCrm={(l) => {
          setIsDetailOpen(false);
          if (l) {
            saveLeadToCrm({
              name: l.name,
              title: l.title,
              company: l.company,
              domain: l.domain,
              email: l.email,
              phone: l.phone,
              avatar: l.avatar,
              score: l.icpScore,
              location: l.location,
              tags: ['8D Lead Finder', 'Single Deal'],
            });

            createDeal({
              title: `${l.company} Opportunity`,
              companyName: l.company,
              companyDomain: l.domain,
              contactName: l.name,
              contactEmail: l.email,
              value: 65000,
              stageId: 'stage_qualified',
              probability: 60,
              expectedCloseDate: '2026-10-31',
              owner: 'Sarah Jenkins',
              tags: ['Inbound Qualified'],
              priority: 'high',
            });
          }
          success('Lead converted to CRM Opportunity', 'Added to Deals');
          setActiveTab('pipeline');
          navigate('/crm');
        }}
      />

      {/* CSV Import Modal */}
      <LeadImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportComplete={(count) => {
          setIsImportModalOpen(false);
          success(`Imported ${count} records successfully`, 'CSV Processed');
        }}
      />

      {/* Add To List Modal */}
      <AddToListModal
        isOpen={isAddToListModalOpen}
        onClose={() => setIsAddToListModalOpen(false)}
        selectedCount={selection.selectedIds.length}
      />

      {/* Save Search Criteria Modal */}
      <SaveSearchModal
        isOpen={isSaveSearchModalOpen}
        onClose={() => setIsSaveSearchModalOpen(false)}
      />

      {/* Saved Searches Drawer */}
      <SavedSearchesDrawer
        isOpen={isSavedSearchesDrawerOpen}
        onClose={() => setIsSavedSearchesDrawerOpen(false)}
      />

      {/* Campaign & CRM Enrollment Modal */}
      <CampaignEnrollModal
        isOpen={isCampaignEnrollOpen}
        onClose={() => setIsCampaignEnrollOpen(false)}
      />
    </div>
  );
};
