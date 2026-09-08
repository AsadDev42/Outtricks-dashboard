import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Lock, Smartphone, FileText } from 'lucide-react';
import { AdminParentSectionLayout } from './AdminParentSectionLayout';
import { AdminSecurityView } from './AdminSecurityView';
import { AdminSessionsView } from './AdminSessionsView';
import { AdminAuditCenterView } from './AdminAuditCenterView';

export type SecurityTabType = 'security' | 'sessions' | 'audit-center';

export const AdminSecurityHubView: React.FC<{ initialTab?: SecurityTabType }> = ({ initialTab = 'security' }) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialTab = (): SecurityTabType => {
    const p = location.pathname.toLowerCase();
    if (p.includes('/workspace/sessions') || p.includes('/admin/sessions')) return 'sessions';
    if (p.includes('/workspace/audit-center') || p.includes('/workspace/audit') || p.includes('/admin/audit-center') || p.includes('/admin/audit')) return 'audit-center';
    if (p.includes('/workspace/security') || p.includes('/admin/security')) return 'security';

    const tabParam = searchParams.get('tab') as SecurityTabType | null;
    if (tabParam && ['security', 'sessions', 'audit-center'].includes(tabParam)) {
      return tabParam;
    }
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<SecurityTabType>(getInitialTab);

  useEffect(() => {
    const p = location.pathname.toLowerCase();
    let nextTab: SecurityTabType = 'security';
    if (p.includes('/workspace/sessions') || p.includes('/admin/sessions')) nextTab = 'sessions';
    else if (p.includes('/workspace/audit-center') || p.includes('/workspace/audit') || p.includes('/admin/audit-center') || p.includes('/admin/audit')) nextTab = 'audit-center';
    else if (p.includes('/workspace/security') || p.includes('/admin/security')) nextTab = 'security';
    else {
      const tabParam = searchParams.get('tab') as SecurityTabType | null;
      if (tabParam && ['security', 'sessions', 'audit-center'].includes(tabParam)) {
        nextTab = tabParam;
      }
    }
    setActiveTab(nextTab);
  }, [location.pathname, searchParams]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as SecurityTabType);
    setSearchParams({ tab: tabId }, { replace: true });
  };

  const tabs = [
    { id: 'security', title: 'Security', icon: Lock },
    { id: 'sessions', title: 'Sessions', icon: Smartphone },
    { id: 'audit-center', title: 'Audit Center', icon: FileText },
  ];

  return (
    <AdminParentSectionLayout
      title="Security Policy & Audit Governance"
      description="Configure MFA enforcement, SOC2 compliance policies, monitor active user JWT sessions, and inspect immutable system audit logs."
      icon={ShieldCheck}
      badges={[
        { label: 'SOC2 & HIPAA Compliant', variant: 'emerald' },
        { label: '2FA Enforced', variant: 'blue' },
      ]}
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={handleTabChange}
    >
      {activeTab === 'security' && <AdminSecurityView />}
      {activeTab === 'sessions' && <AdminSessionsView />}
      {activeTab === 'audit-center' && <AdminAuditCenterView />}
    </AdminParentSectionLayout>
  );
};