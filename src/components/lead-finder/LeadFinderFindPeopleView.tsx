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
      {/* 1. Dynamic Filter Chips Bar */}
      <LeadFilterChipsBar
        onOpenSaveSearchModal={() => setIsSaveSearchModalOpen(true)}
        onOpenSavedSearchesDrawer={() => setIsSavedSearchesDrawerOpen(true)}
        onOpenAdvancedFilters={() => setIsAdvancedFiltersDrawerOpen(true)}
      />

      {/* 2. Main 8D Search Layout: Left Filter Panel + Right Results Table */}
      <div className="flex flex-col lg:flex-row items-start gap-6 pt-1">
        
        {/* Left Filter Matrix Panel */}
        <LeadFinderFilterPanel
          isOpenMobile={isMobileFiltersOpen}
          onCloseMobile={() => setIsMobileFiltersOpen(false)}
        />

        {/* Right Results Table Area */}
        <div className="flex-1 w-full min-w-0">
          <LeadFinderResultsTable
            onOpenLeadDetail={handleOpenLeadDetail}
            onTriggerAddToListModal={() => setIsAddToListModalOpen(true)}
            onPushToSequence={handlePushToSequence}
            onBatchAddToCrm={handleBatchAddToCrm}
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
