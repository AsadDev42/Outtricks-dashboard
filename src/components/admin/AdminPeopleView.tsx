import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Users, Building2, ShieldCheck } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { AdminParentSectionLayout } from './AdminParentSectionLayout';
import { AdminUsersView } from './AdminUsersView';
import { AdminTeamsView } from './AdminTeamsView';
import { AdminRolesView } from './AdminRolesView';

export type PeopleTabType = 'users' | 'teams' | 'roles';

export const AdminPeopleView: React.FC<{ initialTab?: PeopleTabType }> = ({ initialTab = 'users' }) => {
  const { users, teams, roles } = useAdmin();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): PeopleTabType => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/workspace/teams') || p.includes('/admin/teams')) return 'teams';
    if (p.includes('/workspace/roles') || p.includes('/admin/roles')) return 'roles';
    if (p.includes('/workspace/users') || p.includes('/admin/users')) return 'users';
    
    const tabParam = searchParams.get('tab') as PeopleTabType | null;
    if (tabParam && ['users', 'teams', 'roles'].includes(tabParam)) {
      return tabParam;
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<PeopleTabType>(getInitialTab);

  useEffect(() => {
    const p = location.pathname.toLowerCase();
    let nextTab: PeopleTabType = 'users';
    if (p.includes('/workspace/teams') || p.includes('/admin/teams')) nextTab = 'teams';
    else if (p.includes('/workspace/roles') || p.includes('/admin/roles')) nextTab = 'roles';
    else if (p.includes('/workspace/users') || p.includes('/admin/users')) nextTab = 'users';
    else {
      const tabParam = searchParams.get('tab') as PeopleTabType | null;
      if (tabParam && ['users', 'teams', 'roles'].includes(tabParam)) {
        nextTab = tabParam;
      }
    }
    setActiveTab(nextTab);
  }, [location.pathname, searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as PeopleTabType);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  const tabs = [
    { id: 'users', title: 'Users', icon: Users, count: users.length },
    { id: 'teams', title: 'Teams', icon: Building2, count: teams.length },
    { id: 'roles', title: 'Roles & Permissions', icon: ShieldCheck, count: roles.length },
  ];

  return (
    <AdminParentSectionLayout
      title="People & Organization Management"
      description="Centralized directory for user provisioning, workspace organization units, and granular RBAC security roles."
      icon={Users}
      badges={[
        { label: `${users.length} Users`, variant: 'blue' },
        { label: `${teams.length} Teams`, variant: 'purple' },
        { label: `${roles.length} Roles`, variant: 'slate' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'users' && <AdminUsersView hideHeader={true} />}
      {activeTab === 'teams' && <AdminTeamsView hideHeader={true} />}
      {activeTab === 'roles' && <AdminRolesView hideHeader={true} />}
    </AdminParentSectionLayout>
  );
};