import React, { useState } from 'react';
import { SEOHead } from '../../components/seo/SEOHead';
import { 
  CompaniesProvider, 
  useCompanies, 
  WorkspaceCompany 
} from '../../context/CompaniesContext';
import { 
  CompaniesHeader, 
  CompaniesSegmentTabs, 
  CompaniesTable, 
  CompanyDetailDrawer,
  CreateCompanyModal,
  EditCompanyModal,
  CreateCompanyListModal,
  BulkCompanyStatusModal,
  BulkCompanyAssignModal,
  BulkCompanyTagModal,
  BulkCompanyAddToListModal
} from '../../components/companies';

const AppCompaniesPageContent: React.FC = () => {
  const [activeCompany, setActiveCompany] = useState<WorkspaceCompany | null>(null);
  const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateListModalOpen, setIsCreateListModalOpen] = useState(false);

  // Bulk Modals
  const [isBulkStatusModalOpen, setIsBulkStatusModalOpen] = useState(false);
  const [isBulkAssignModalOpen, setIsBulkAssignModalOpen] = useState(false);
  const [isBulkTagModalOpen, setIsBulkTagModalOpen] = useState(false);
  const [isBulkAddToListModalOpen, setIsBulkAddToListModalOpen] = useState(false);

  const handleOpenCompanyDetail = (company: WorkspaceCompany) => {
    setActiveCompany(company);
    setIsDetailDrawerOpen(true);
  };

  const handleOpenEditModal = (company: WorkspaceCompany) => {
    setActiveCompany(company);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6 font-sans">
      <SEOHead
        title="Companies & Target Accounts | Outtricks Platform"
        description="Account-based prospecting, firmographics, and buying intent tracking for enterprise accounts."
        noindex={true}
      />

      {/* 1. Header Toolbar & Metrics */}
      <CompaniesHeader
        onOpenCreateCompanyModal={() => setIsCreateModalOpen(true)}
      />

      {/* 2. Segment Tabs & Account List Filter */}
      <CompaniesSegmentTabs
        onOpenCreateListModal={() => setIsCreateListModalOpen(true)}
      />

      {/* 3. Main Accounts Table */}
      <CompaniesTable
        onOpenCompanyDetail={handleOpenCompanyDetail}
        onOpenBulkStatusModal={() => setIsBulkStatusModalOpen(true)}
        onOpenBulkAssignModal={() => setIsBulkAssignModalOpen(true)}
        onOpenBulkTagModal={() => setIsBulkTagModalOpen(true)}
        onOpenAddToListModal={() => setIsBulkAddToListModalOpen(true)}
      />

      {/* Slideover 360° Company Detail Drawer */}
      <CompanyDetailDrawer
        company={activeCompany}
        isOpen={isDetailDrawerOpen}
        onClose={() => setIsDetailDrawerOpen(false)}
        onOpenEditModal={handleOpenEditModal}
      />

      {/* Create Company Modal */}
      <CreateCompanyModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Edit Company Modal */}
      <EditCompanyModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        company={activeCompany}
      />

      {/* Create Account List Modal */}
      <CreateCompanyListModal
        isOpen={isCreateListModalOpen}
        onClose={() => setIsCreateListModalOpen(false)}
      />

      {/* Bulk Action Modals */}
      <BulkCompanyStatusModal
        isOpen={isBulkStatusModalOpen}
        onClose={() => setIsBulkStatusModalOpen(false)}
      />

      <BulkCompanyAssignModal
        isOpen={isBulkAssignModalOpen}
        onClose={() => setIsBulkAssignModalOpen(false)}
      />

      <BulkCompanyTagModal
        isOpen={isBulkTagModalOpen}
        onClose={() => setIsBulkTagModalOpen(false)}
      />

      <BulkCompanyAddToListModal
        isOpen={isBulkAddToListModalOpen}
        onClose={() => setIsBulkAddToListModalOpen(false)}
      />

    </div>
  );
};

export const AppCompaniesPage: React.FC = () => {
  return <AppCompaniesPageContent />;
};

export default AppCompaniesPage;
