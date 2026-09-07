import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { 
  LeadSearchProvider, 
  useLeadSearch 
} from '../../context/LeadSearchContext';
import { 
  LeadsManagementProvider 
} from '../../context/LeadsManagementContext';
import { 
  LeadFinderNavTab,
  LeadFinderFindPeopleView,
  LeadFinderOverview,
  SavedSearchesView,
  SearchHistoryView,
  LeadFinderMyLeadsView,
  LeadFinderProspectListsView,
  LeadFinderImportsView,
  SaveSearchModal
} from '../../components/lead-finder';

const AppLeadFinderContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Helper to resolve tab from URL pathname or search params
  const resolveTabFromUrl = useCallback((): LeadFinderNavTab => {
    const path = location.pathname.toLowerCase();
    if (path.includes('/find-people')) return 'find-people';
    if (path.includes('/overview')) return 'overview';
    if (path.includes('/saved-searches') || path.includes('/saved')) return 'saved-searches';
    if (path.includes('/search-history') || path.includes('/history')) return 'search-history';
    if (path.includes('/my-leads')) return 'my-leads';
    if (path.includes('/prospect-lists')) return 'prospect-lists';
    if (path.includes('/imports')) return 'imports';

    const tabQuery = searchParams.get('tab');
    if (tabQuery) {
      if (tabQuery === 'search') return 'find-people';
      if (tabQuery === 'saved') return 'saved-searches';
      if (tabQuery === 'history') return 'search-history';
      if (['find-people', 'overview', 'saved-searches', 'search-history', 'my-leads', 'prospect-lists', 'imports'].includes(tabQuery)) {
        return tabQuery as LeadFinderNavTab;
      }
    }
    return 'find-people';
  }, [location.pathname, searchParams]);

  const [activeTab, setActiveTab] = useState<LeadFinderNavTab>(() => resolveTabFromUrl());
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  // Synchronize route with activeTab
  useEffect(() => {
    const current = resolveTabFromUrl();
    setActiveTab(current);
  }, [location.pathname, resolveTabFromUrl]);

  const handleSelectTab = (tabId: LeadFinderNavTab) => {
    setActiveTab(tabId);
    navigate(`/lead-finder/${tabId}`);
  };

  return (
    <div className="space-y-4 font-sans">
      <SEOHead 
        title="8D B2B Lead Finder | Outtricks Platform"
        description="Search 480M+ global decision makers with multi-dimensional firmographic, tech stack, and intent filters."
        noindex={true}
      />

      {/* Active Tab Sub-View Rendering (Single Global Tab Bar at top, Sub-Sidebar for module navigation) */}
      {activeTab === 'find-people' && <LeadFinderFindPeopleView />}

      {activeTab === 'overview' && (
        <LeadFinderOverview
          onSwitchToSearch={() => handleSelectTab('find-people')}
          onOpenImportModal={() => handleSelectTab('imports')}
        />
      )}

      {activeTab === 'saved-searches' && (
        <SavedSearchesView
          onRunSearch={() => handleSelectTab('find-people')}
          onOpenSaveModal={() => setIsSaveModalOpen(true)}
        />
      )}

      {activeTab === 'search-history' && (
        <SearchHistoryView
          onRunSearch={() => handleSelectTab('find-people')}
        />
      )}

      {activeTab === 'my-leads' && (
        <LeadFinderMyLeadsView />
      )}

      {activeTab === 'prospect-lists' && (
        <LeadFinderProspectListsView
          onOpenListDetail={() => handleSelectTab('find-people')}
        />
      )}

      {activeTab === 'imports' && (
        <LeadFinderImportsView />
      )}

      {/* Save Search Modal */}
      <SaveSearchModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
      />
    </div>
  );
};

export const AppLeadFinderPage: React.FC = () => {
  return <AppLeadFinderContent />;
};

export default AppLeadFinderPage;
