import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { UserCheck, Users, Building2, Sliders } from 'lucide-react';
import { AdminParentSectionLayout } from './AdminParentSectionLayout';
import { AdminUserAssignmentsView } from './AdminUserAssignmentsView';
import { AdminTeamAssignmentsView } from './AdminTeamAssignmentsView';
import { AdminAccessOverridesView } from './AdminAccessOverridesView';

export type AssignmentsTabType = 'user-assignments' | 'team-assignments' | 'access-overrides';

export const AdminAssignmentsView: React.FC<{ initialTab?: AssignmentsTabType }> = ({ initialTab = 'user-assignments' }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): AssignmentsTabType => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/workspace/team-assignments') || p.includes('/admin/team-assignments')) return 'team-assignments';
    if (p.includes('/workspace/access-overrides') || p.includes('/admin/access-overrides')) return 'access-overrides';
    if (p.includes('/workspace/user-assignments') || p.includes('/admin/user-assignments')) return 'user-assignments';

    const tabParam = searchParams.get('tab') as AssignmentsTabType | null;
    if (tabParam && ['user-assignments', 'team-assignments', 'access-overrides'].includes(tabParam)) {
      return tabParam;
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<AssignmentsTabType>(getInitialTab);

  useEffect(() => {
    const p = location.pathname.toLowerCase();
    let nextTab: AssignmentsTabType = 'user-assignments';
    if (p.includes('/workspace/team-assignments') || p.includes('/admin/team-assignments')) nextTab = 'team-assignments';
    else if (p.includes('/workspace/access-overrides') || p.includes('/admin/access-overrides')) nextTab = 'access-overrides';
    else if (p.includes('/workspace/user-assignments') || p.includes('/admin/user-assignments')) nextTab = 'user-assignments';
    else {
      const tabParam = searchParams.get('tab') as AssignmentsTabType | null;
      if (tabParam && ['user-assignments', 'team-assignments', 'access-overrides'].includes(tabParam)) {
        nextTab = tabParam;
      }
    }
    setActiveTab(nextTab);
  }, [location.pathname, searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as AssignmentsTabType);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  const tabs = [
    { id: 'user-assignments', title: 'User Assignments', icon: Users },
    { id: 'team-assignments', title: 'Team Assignments', icon: Building2 },
    { id: 'access-overrides', title: 'Access Overrides', icon: Sliders },
  ];

  return (
    <AdminParentSectionLayout
      title="User & Team Provisioning Assignments"
      description="Assign plans, add-on capability packages, and bespoke permission overrides directly to users or workspace organization units."
      icon={UserCheck}
      badges={[
        { label: 'Role & Tier Allocation', variant: 'blue' },
        { label: 'Overrides Active', variant: 'purple' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'user-assignments' && <AdminUserAssignmentsView />}
      {activeTab === 'team-assignments' && <AdminTeamAssignmentsView />}
      {activeTab === 'access-overrides' && <AdminAccessOverridesView />}
    </AdminParentSectionLayout>
  );
};