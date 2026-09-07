import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { 
  CrmProvider, 
  useCrm, 
  CrmDeal, 
  CrmTabType 
} from '../../context/CrmContext';
import { 
  CrmHeader, 
  CrmOverviewDashboard,
  CrmDealsView,
  CrmCompaniesView,
  CrmContactsView,
  CrmPipelineView,
  CrmContractsView,
  CrmLabelsView,
  CrmSignalsView,
  CrmHealthView,
  CrmActivitiesView,
  CrmTasksView,
  CrmRemindersView,
  CrmReportsView,
  DealDetailDrawer,
  CreateDealModal,
  EditDealModal,
  CreatePipelineModal,
  BulkDealStageModal,
  BulkDealAssignModal,
  CrmCustomFieldsModal,
  CrmImportModal,
  CrmDuplicatesModal
} from '../../components/crm';

const AppCrmPageContent: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { activeTab, setActiveTab } = useCrm();

  const [activeDeal, setActiveDeal] = useState<CrmDeal | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isCreateDealModalOpen, setIsCreateDealModalOpen] = useState(false);
  const [isEditDealModalOpen, setIsEditDealModalOpen] = useState(false);
  const [isCreatePipelineModalOpen, setIsCreatePipelineModalOpen] = useState(false);

  // Additional Feature Modals
  const [isCustomFieldsModalOpen, setIsCustomFieldsModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDuplicatesModalOpen, setIsDuplicatesModalOpen] = useState(false);

  // Bulk Modals
  const [isBulkStageModalOpen, setIsBulkStageModalOpen] = useState(false);
  const [isBulkAssignModalOpen, setIsBulkAssignModalOpen] = useState(false);

  const location = useLocation();

  // 1. Sync tab from URL pathname or search params
  useEffect(() => {
    const p = location.pathname.toLowerCase();
    let resolvedTab: CrmTabType | null = null;
    if (p.includes('/deals')) resolvedTab = 'deals';
    else if (p.includes('/companies')) resolvedTab = 'companies';
    else if (p.includes('/contacts')) resolvedTab = 'contacts';
    else if (p.includes('/leads')) resolvedTab = 'leads';
    else if (p.includes('/activities')) resolvedTab = 'activities';
    else if (p.includes('/reminders') || p.includes('/tasks')) resolvedTab = 'reminders';
    else if (p.includes('/pipeline')) resolvedTab = 'pipeline';
    else if (p.includes('/reports')) resolvedTab = 'reports';
    else if (p.includes('/contracts')) resolvedTab = 'contracts';
    else if (p.includes('/labels')) resolvedTab = 'labels';
    else if (p.includes('/signals')) resolvedTab = 'signals';
    else if (p.includes('/health')) resolvedTab = 'health';
    else if (p.includes('/overview') || p === '/crm' || p === '/app/crm') resolvedTab = 'overview';
    else {
      const tabParam = searchParams.get('tab') as CrmTabType | null;
      if (tabParam && [
        'overview', 'deals', 'companies', 'contacts', 'pipeline', 
        'contracts', 'labels', 'signals', 'health', 'activities', 'tasks', 'reminders'
      ].includes(tabParam)) {
        resolvedTab = tabParam;
      }
    }

    if (resolvedTab && resolvedTab !== activeTab) {
      setActiveTab(resolvedTab);
    }
  }, [location.pathname, searchParams, activeTab, setActiveTab]);

  const handleOpenDealDetail = (deal: CrmDeal) => {
    setActiveDeal(deal);
    setIsDetailDrawerOpen(true);
  };

  const handleOpenEditModal = (deal: CrmDeal) => {
    setActiveDeal(deal);
    setIsEditDealModalOpen(true);
  };

  return (
    <GsapPageTransition className="space-y-6 font-sans">
      <SEOHead
        title="Sales OS & Deals CRM | Outtricks Platform"
        description="Unified Sales & Revenue Intelligence CRM with multi-stage Kanban pipeline, target company mapping, verified relationships, revenue contracts, signal sentinel, and automated health checks."
        noindex={true}
      />

      {/* 1. Header Toolbar & Tab Navigation Bar */}
      <CrmHeader
        onOpenCreateDealModal={() => setIsCreateDealModalOpen(true)}
        onOpenCreatePipelineModal={() => setIsCreatePipelineModalOpen(true)}
        onOpenCustomFieldsModal={() => setIsCustomFieldsModalOpen(true)}
        onOpenImportModal={() => setIsImportModalOpen(true)}
        onOpenDuplicatesModal={() => setIsDuplicatesModalOpen(true)}
      />

      {/* 2. Active Tab Content Rendering */}
      {activeTab === 'overview' && (
        <CrmOverviewDashboard
          onOpenDealDetail={handleOpenDealDetail}
          onOpenCreateDealModal={() => setIsCreateDealModalOpen(true)}
        />
      )}

      {activeTab === 'deals' && (
        <CrmDealsView
          onOpenDealDetail={handleOpenDealDetail}
          onOpenCreateDealModal={() => setIsCreateDealModalOpen(true)}
          onOpenEditModal={handleOpenEditModal}
        />
      )}

      {activeTab === 'companies' && <CrmCompaniesView />}

      {(activeTab === 'contacts' || activeTab === 'leads') && <CrmContactsView />}

      {activeTab === 'reports' && <CrmReportsView />}

      {activeTab === 'pipeline' && (
        <CrmPipelineView
          onOpenDealDetail={handleOpenDealDetail}
          onOpenCreateDealModal={() => setIsCreateDealModalOpen(true)}
        />
      )}

      {activeTab === 'contracts' && <CrmContractsView />}

      {activeTab === 'labels' && <CrmLabelsView />}

      {activeTab === 'signals' && <CrmSignalsView />}

      {activeTab === 'health' && <CrmHealthView />}

      {activeTab === 'activities' && <CrmActivitiesView />}

      {activeTab === 'tasks' && <CrmTasksView />}

      {activeTab === 'reminders' && <CrmRemindersView />}

      {/* Slideover 360° Deal Detail Drawer */}
      <DealDetailDrawer
        deal={activeDeal}
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        onOpenEditModal={handleOpenEditModal}
      />

      {/* Create Deal Modal */}
      <CreateDealModal
        isOpen={isCreateDealModalOpen}
        onClose={() => setIsCreateDealModalOpen(false)}
      />

      {/* Edit Deal Modal */}
      <EditDealModal
        isOpen={isEditDealModalOpen}
        onClose={() => setIsEditDealModalOpen(false)}
        deal={activeDeal}
      />

      {/* Create Pipeline Modal */}
      <CreatePipelineModal
        isOpen={isCreatePipelineModalOpen}
        onClose={() => setIsCreatePipelineModalOpen(false)}
      />

      {/* Custom Fields Modal */}
      <CrmCustomFieldsModal
        isOpen={isCustomFieldsModalOpen}
        onClose={() => setIsCustomFieldsModalOpen(false)}
      />

      {/* CSV Import Modal */}
      <CrmImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
      />

      {/* Duplicates Modal */}
      <CrmDuplicatesModal
        isOpen={isDuplicatesModalOpen}
        onClose={() => setIsDuplicatesModalOpen(false)}
      />

      {/* Bulk Modals */}
      <BulkDealStageModal
        isOpen={isBulkStageModalOpen}
        onClose={() => setIsBulkStageModalOpen(false)}
      />

      <BulkDealAssignModal
        isOpen={isBulkAssignModalOpen}
        onClose={() => setIsBulkAssignModalOpen(false)}
      />

    </GsapPageTransition>
  );
};

export const AppCrmPage: React.FC = () => {
  return <AppCrmPageContent />;
};

export default AppCrmPage;
