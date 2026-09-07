import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  useLeadsManagement, 
  WorkspaceLead 
} from '../../context/LeadsManagementContext';
import { 
  LeadsHeader, 
  LeadsSegmentTabs, 
  LeadsTable, 
  CreateLeadModal, 
  CreateListModal,
  BulkStatusModal,
  BulkAssignModal,
  BulkTagModal,
  BulkAddToListModal
} from '../leads-management';
import { 
  LeadDetailDrawer, 
  LeadImportModal, 
  QuickEmailModal, 
  LogCallModal 
} from './index';
import { useToast } from '../../context/ToastContext';

export const LeadFinderMyLeadsView: React.FC = () => {
  const [activeLead, setActiveLead] = useState<WorkspaceLead | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isCreateLeadModalOpen, setIsCreateLeadModalOpen] = useState(false);
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isLogCallModalOpen, setIsLogCallModalOpen] = useState(false);
  
  // Bulk Modals
  const [isBulkStatusModalOpen, setIsBulkStatusModalOpen] = useState(false);
  const [isBulkAssignModalOpen, setIsBulkAssignModalOpen] = useState(false);
  const [isBulkTagModalOpen, setIsBulkTagModalOpen] = useState(false);
  const [isBulkAddToListModalOpen, setIsBulkAddToListModalOpen] = useState(false);

  const { updateLead, deleteLead } = useLeadsManagement();
  const { success } = useToast();
  const navigate = useNavigate();

  const handleOpenLeadDetail = (lead: WorkspaceLead) => {
    setActiveLead(lead);
    setIsDetailDrawerOpen(true);
  };

  const handleOpenQuickEmail = (lead: WorkspaceLead) => {
    setActiveLead(lead);
    setIsEmailModalOpen(true);
  };

  const handleOpenLogCall = (lead: WorkspaceLead) => {
    setActiveLead(lead);
    setIsLogCallModalOpen(true);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Header Toolbar & Metrics */}
      <LeadsHeader
        onOpenCreateLeadModal={() => setIsCreateLeadModalOpen(true)}
        onOpenImportModal={() => setIsImportModalOpen(true)}
      />

      {/* 2. Segment Tabs & Target List Filter */}
      <LeadsSegmentTabs
        onOpenCreateListModal={() => setIsCreateListModalOpen(true)}
      />

      {/* 3. Main High-Density Leads Table */}
      <LeadsTable
        onOpenLeadDetail={handleOpenLeadDetail}
        onOpenQuickEmail={handleOpenQuickEmail}
        onOpenLogCall={handleOpenLogCall}
        onOpenBulkStatusModal={() => setIsBulkStatusModalOpen(true)}
        onOpenBulkAssignModal={() => setIsBulkAssignModalOpen(true)}
        onOpenBulkTagModal={() => setIsBulkTagModalOpen(true)}
        onOpenAddToListModal={() => setIsBulkAddToListModalOpen(true)}
      />

      {/* Slideover 360° Lead Detail Drawer */}
      <LeadDetailDrawer
        lead={activeLead}
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        onUpdateLead={(updated) => updateLead(updated as WorkspaceLead)}
        onDeleteLead={(id) => deleteLead(id)}
        onDispatchEmail={(l) => {
          setIsDetailDrawerOpen(false);
          setActiveLead(l as WorkspaceLead);
          setIsEmailModalOpen(true);
        }}
        onQueueVoiceCall={(l) => {
          setIsDetailDrawerOpen(false);
          success(`Initiated Voice SDR call to ${l.phone}.`, 'Dialer Scheduled');
          navigate('/voice-ai');
        }}
        onAddToCrm={(l) => {
          setIsDetailDrawerOpen(false);
          success(`Added ${l.name} (${l.company}) to Deals CRM!`, 'Deal Created');
          navigate('/crm');
        }}
      />

      {/* Create Lead Modal */}
      <CreateLeadModal
        isOpen={isCreateLeadModalOpen}
        onClose={() => setIsCreateLeadModalOpen(false)}
      />

      {/* Create List Modal */}
      <CreateListModal
        isOpen={isCreateListModalOpen}
        onClose={() => setIsCreateListModalOpen(false)}
      />

      {/* Import CSV Modal */}
      <LeadImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportComplete={(count) => {
          success(`Imported ${count} leads into workspace.`, 'Import Complete');
        }}
      />

      {/* Quick Email Modal */}
      <QuickEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        lead={activeLead}
      />

      {/* Log Call Modal */}
      <LogCallModal
        isOpen={isLogCallModalOpen}
        onClose={() => setIsLogCallModalOpen(false)}
        lead={activeLead}
      />

      {/* Bulk Status Modal */}
      <BulkStatusModal
        isOpen={isBulkStatusModalOpen}
        onClose={() => setIsBulkStatusModalOpen(false)}
      />

      {/* Bulk Assign Modal */}
      <BulkAssignModal
        isOpen={isBulkAssignModalOpen}
        onClose={() => setIsBulkAssignModalOpen(false)}
      />

      {/* Bulk Tag Modal */}
      <BulkTagModal
        isOpen={isBulkTagModalOpen}
        onClose={() => setIsBulkTagModalOpen(false)}
      />

      {/* Bulk Add To List Modal */}
      <BulkAddToListModal
        isOpen={isBulkAddToListModalOpen}
        onClose={() => setIsBulkAddToListModalOpen(false)}
      />
    </div>
  );
};
