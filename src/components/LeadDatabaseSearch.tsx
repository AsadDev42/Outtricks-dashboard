import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LeadFinderHeader, 
  LeadFilterChipsBar,
  LeadFinderFilterPanel, 
  LeadFinderResultsTable, 
  LeadDetailDrawer, 
  LeadImportModal, 
  AddToListModal,
  SaveSearchModal,
  SavedSearchesDrawer
} from './lead-finder';
import { 
  LeadSearchProvider, 
  useLeadSearch, 
  LeadDetailData 
} from '../context/LeadSearchContext';
import { useToast } from '../context/ToastContext';

const LeadDatabaseSearchContent: React.FC = () => {
  const [activeLeadDetail, setActiveLeadDetail] = useState<LeadDetailData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddToListModalOpen, setIsAddToListModalOpen] = useState(false);
  const [isSaveSearchModalOpen, setIsSaveSearchModalOpen] = useState(false);
  const [isSavedSearchesDrawerOpen, setIsSavedSearchesDrawerOpen] = useState(false);

  const { selection, clearSelection } = useLeadSearch();
  const { success } = useToast();
  const navigate = useNavigate();

  const handleOpenLeadDetail = (lead: LeadDetailData) => {
    setActiveLeadDetail(lead);
    setIsDetailOpen(true);
  };

  const handlePushToSequence = () => {
    success(`Queued ${selection.selectedIds.length} leads for Cold Email sequence.`, 'Pushed to Sequence');
    navigate('/inbox');
  };

  const handleBatchAddToCrm = () => {
    success(`Converted ${selection.selectedIds.length} leads into active Opportunities in Deals CRM Kanban!`, 'Deals Created');
    navigate('/crm');
  };

  return (
    <div className="space-y-4 font-sans">
      
      {/* 1. Header (Search Query Input, Presets Trigger, Import CSV, Credits) */}
      <LeadFinderHeader
        onOpenImportModal={() => setIsImportModalOpen(true)}
        onOpenSavedSearchesDrawer={() => setIsSavedSearchesDrawerOpen(true)}
        onToggleMobileFilters={() => setIsMobileFiltersOpen(true)}
      />

      {/* 2. Dynamic Filter Chips Bar */}
      <LeadFilterChipsBar
        onOpenSaveSearchModal={() => setIsSaveSearchModalOpen(true)}
        onOpenSavedSearchesDrawer={() => setIsSavedSearchesDrawerOpen(true)}
      />

      {/* 3. Main Layout: Left 8D Filter Matrix + Right Results Table */}
      <div className="flex flex-col lg:flex-row items-start gap-6 pt-2">
        
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

      {/* Slideover Detail Drawer */}
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
          success(`Queued sub-400ms Voice SDR call to ${l.phone}.`, 'Dialer Scheduled');
          navigate('/voice-ai');
        }}
        onAddToCrm={(l) => {
          setIsDetailOpen(false);
          success(`Added ${l.name} (${l.company}) to Deals CRM!`, 'Deal Created');
          navigate('/crm');
        }}
      />

      {/* Import Spreadsheet Modal */}
      <LeadImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportComplete={(count) => {
          success(`Imported ${count} records. Ready in workspace list.`, 'Import Complete');
        }}
      />

      {/* Add To Target List Modal */}
      <AddToListModal
        isOpen={isAddToListModalOpen}
        onClose={() => setIsAddToListModalOpen(false)}
        selectedCount={selection.selectedIds.length}
      />

      {/* Save Search Preset Modal */}
      <SaveSearchModal
        isOpen={isSaveSearchModalOpen}
        onClose={() => setIsSaveSearchModalOpen(false)}
      />

      {/* Saved Searches & History Drawer */}
      <SavedSearchesDrawer
        isOpen={isSavedSearchesDrawerOpen}
        onClose={() => setIsSavedSearchesDrawerOpen(false)}
      />

    </div>
  );
};

export const LeadDatabaseSearch: React.FC = () => {
  return (
    <LeadSearchProvider>
      <LeadDatabaseSearchContent />
    </LeadSearchProvider>
  );
};
