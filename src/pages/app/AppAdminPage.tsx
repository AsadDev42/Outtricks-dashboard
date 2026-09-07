import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { GsapPageTransition } from '../../components/ui/GsapPageTransition';
import { useAdmin } from '../../context/AdminContext';
import { 
  AdminDashboardView,
  AdminPeopleView,
  AdminProductView,
  AdminAssignmentsView,
  AdminBillingView,
  AdminUsageView,
  AdminPlatformView,
  AdminSecurityHubView,
  AdminConfigurationView,
  AdminAccessDenied
} from '../../components/admin';

export type AdminSubSection = 
  | 'overview'
  | 'people'
  | 'product'
  | 'assignments'
  | 'billing'
  | 'usage'
  | 'platform'
  | 'security'
  | 'configuration'
  | 'users'
  | 'teams'
  | 'roles'
  | 'modules'
  | 'plans'
  | 'bundles'
  | 'feature-access'
  | 'user-assignments'
  | 'team-assignments'
  | 'access-overrides'
  | 'subscriptions'
  | 'payments'
  | 'invoices'
  | 'credits'
  | 'coupons'
  | 'usage-overview'
  | 'resource-limits'
  | 'credit-usage'
  | 'integrations'
  | 'navigation'
  | 'tricksy-ai'
  | 'sessions'
  | 'audit-center'
  | 'notifications'
  | 'branding'
  | 'global-settings';

export const resolveAdminSection = (pathname: string): AdminSubSection => {
  const p = pathname.toLowerCase();
  
  // Parent Route Matches
  if (p.includes('/admin/people')) return 'people';
  if (p.includes('/admin/product')) return 'product';
  if (p.includes('/admin/assignments')) return 'assignments';
  if (p.includes('/admin/billing')) return 'billing';
  if (p.includes('/admin/usage')) return 'usage';
  if (p.includes('/admin/platform')) return 'platform';
  if (p.includes('/admin/security')) return 'security';
  if (p.includes('/admin/configuration')) return 'configuration';

  // Sub-route deep-link compatibility
  if (p.includes('/admin/users')) return 'users';
  if (p.includes('/admin/teams')) return 'teams';
  if (p.includes('/admin/roles')) return 'roles';
  if (p.includes('/admin/modules')) return 'modules';
  if (p.includes('/admin/plans')) return 'plans';
  if (p.includes('/admin/bundles')) return 'bundles';
  if (p.includes('/admin/feature-access')) return 'feature-access';
  if (p.includes('/admin/user-assignments')) return 'user-assignments';
  if (p.includes('/admin/team-assignments')) return 'team-assignments';
  if (p.includes('/admin/access-overrides')) return 'access-overrides';
  if (p.includes('/admin/subscriptions')) return 'subscriptions';
  if (p.includes('/admin/payments')) return 'payments';
  if (p.includes('/admin/invoices')) return 'invoices';
  if (p.includes('/admin/credits')) return 'credits';
  if (p.includes('/admin/coupons')) return 'coupons';
  if (p.includes('/admin/usage-overview')) return 'usage-overview';
  if (p.includes('/admin/resource-limits')) return 'resource-limits';
  if (p.includes('/admin/credit-usage')) return 'credit-usage';
  if (p.includes('/admin/integrations')) return 'integrations';
  if (p.includes('/admin/navigation')) return 'navigation';
  if (p.includes('/admin/tricksy-ai') || p.includes('/admin/tricksy') || p.includes('/admin/ai')) return 'tricksy-ai';
  if (p.includes('/admin/sessions')) return 'sessions';
  if (p.includes('/admin/audit-center') || p.includes('/admin/audit')) return 'audit-center';
  if (p.includes('/admin/notifications')) return 'notifications';
  if (p.includes('/admin/branding')) return 'branding';
  if (p.includes('/admin/global-settings') || p.includes('/admin/settings')) return 'global-settings';
  if (p === '/admin' || p === '/app/admin' || p.includes('/admin/overview')) return 'overview';
  return 'overview';
};

export const AppAdminPage: React.FC = () => {
  const location = useLocation();
  const { currentAdminRole, isAdmin, hasPermission } = useAdmin();

  const currentSection = useMemo(() => resolveAdminSection(location.pathname), [location.pathname]);

  // Authorization Security Guard
  const canAccessAdmin = isAdmin || 
    hasPermission('adminPanel') || 
    currentAdminRole === 'super-admin' || 
    currentAdminRole === 'admin' || 
    currentAdminRole === 'billing-admin';

  if (!canAccessAdmin) {
    return <AdminAccessDenied />;
  }

  const renderSectionView = () => {
    switch (currentSection) {
      case 'overview': return <AdminDashboardView />;
      case 'people': return <AdminPeopleView initialTab="users" />;
      case 'users': return <AdminPeopleView initialTab="users" />;
      case 'teams': return <AdminPeopleView initialTab="teams" />;
      case 'roles': return <AdminPeopleView initialTab="roles" />;

      case 'product': return <AdminProductView initialTab="modules" />;
      case 'modules': return <AdminProductView initialTab="modules" />;
      case 'plans': return <AdminProductView initialTab="plans" />;
      case 'bundles': return <AdminProductView initialTab="bundles" />;
      case 'feature-access': return <AdminProductView initialTab="feature-access" />;

      case 'assignments': return <AdminAssignmentsView initialTab="user-assignments" />;
      case 'user-assignments': return <AdminAssignmentsView initialTab="user-assignments" />;
      case 'team-assignments': return <AdminAssignmentsView initialTab="team-assignments" />;
      case 'access-overrides': return <AdminAssignmentsView initialTab="access-overrides" />;

      case 'billing': return <AdminBillingView initialTab="subscriptions" />;
      case 'subscriptions': return <AdminBillingView initialTab="subscriptions" />;
      case 'payments': return <AdminBillingView initialTab="payments" />;
      case 'invoices': return <AdminBillingView initialTab="invoices" />;
      case 'credits': return <AdminBillingView initialTab="credits" />;
      case 'coupons': return <AdminBillingView initialTab="coupons" />;

      case 'usage': return <AdminUsageView initialTab="usage-overview" />;
      case 'usage-overview': return <AdminUsageView initialTab="usage-overview" />;
      case 'resource-limits': return <AdminUsageView initialTab="resource-limits" />;
      case 'credit-usage': return <AdminUsageView initialTab="credit-usage" />;

      case 'platform': return <AdminPlatformView initialTab="integrations" />;
      case 'integrations': return <AdminPlatformView initialTab="integrations" />;
      case 'navigation': return <AdminPlatformView initialTab="navigation" />;
      case 'tricksy-ai': return <AdminPlatformView initialTab="tricksy-ai" />;

      case 'security': return <AdminSecurityHubView initialTab="security" />;
      case 'sessions': return <AdminSecurityHubView initialTab="sessions" />;
      case 'audit-center': return <AdminSecurityHubView initialTab="audit-center" />;

      case 'configuration': return <AdminConfigurationView initialTab="notifications" />;
      case 'notifications': return <AdminConfigurationView initialTab="notifications" />;
      case 'branding': return <AdminConfigurationView initialTab="branding" />;
      case 'global-settings': return <AdminConfigurationView initialTab="global-settings" />;
      default: return <AdminDashboardView />;
    }
  };

  const getPageTitle = () => {
    const formatted = currentSection.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    return `${formatted} | Admin Panel - Outtricks Platform`;
  };

  return (
    <GsapPageTransition className="space-y-6 font-sans pb-12">
      <SEOHead
        title={getPageTitle()}
        description="Comprehensive enterprise administration, user and team management, role-based access control, billing operations, resource quotas, and platform security."
        noindex={true}
      />
      {renderSectionView()}
    </GsapPageTransition>
  );
};
