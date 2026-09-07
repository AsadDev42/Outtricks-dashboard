import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { SEOHead } from '../../components/seo/SEOHead';
import { ErrorBoundary } from '../../components/ui/ErrorBoundary';
import { AnalyticsErrorState } from '../../components/analytics/shared/AnalyticsErrorState';
import { 
  AnalyticsProvider, 
  AnalyticsSubTab,
  useAnalytics 
} from '../../context/AnalyticsContext';
import { 
  AnalyticsHeader,
  AnalyticsOverviewView,
  AnalyticsCampaignsView,
  AnalyticsRevenueView,
  AnalyticsForecastView,
  AnalyticsCrmView,
  AnalyticsEmailView,
  AnalyticsLinkedInView,
  AnalyticsVoiceView,
  AnalyticsBillingView,
  AnalyticsAiUsageView,
  AnalyticsCreditsView,
  AnalyticsReportsView,
  AnalyticsVipIntelligenceView
} from '../../components/analytics';

export const resolveAnalyticsSection = (pathname: string): AnalyticsSubTab => {
  const p = pathname.toLowerCase();
  if (p.includes('/campaigns')) return 'campaigns';
  if (p.includes('/revenue')) return 'revenue';
  if (p.includes('/forecast')) return 'forecast';
  if (p.includes('/crm')) return 'crm';
  if (p.includes('/email')) return 'email';
  if (p.includes('/linkedin')) return 'linkedin';
  if (p.includes('/voice') || p.includes('/calling')) return 'voice';
  if (p.includes('/billing')) return 'billing';
  if (p.includes('/ai-usage') || p.includes('/ai')) return 'ai-usage';
  if (p.includes('/credits')) return 'credits';
  if (p.includes('/reports')) return 'reports';
  if (p.includes('/vip-intelligence') || p.includes('/vip')) return 'vip-intelligence';
  if (p === '/analytics' || p === '/app/analytics' || p.includes('/overview')) return 'overview';
  return 'overview';
};

import { GsapPageTransition } from '../../components/ui/GsapPageTransition';

const AppAnalyticsContent: React.FC = () => {
  const location = useLocation();
  const currentSection = useMemo(() => resolveAnalyticsSection(location.pathname), [location.pathname]);
  const { refreshData } = useAnalytics();

  return (
    <GsapPageTransition className="space-y-6 font-sans">
      <SEOHead
        title="Revenue Intelligence & Analytics Hub | Outtricks Platform"
        description="Multi-touch revenue attribution, campaign conversion rates, channel ROI comparisons, and predictive pipeline forecasting."
        noindex={true}
      />

      {/* Header & Sub-Tabs Navigation */}
      <AnalyticsHeader currentSection={currentSection} />

      {/* Dynamic Sub-Tab Content with Error Isolation */}
      <ErrorBoundary fallback={<AnalyticsErrorState onRetry={refreshData} />}>
        <div className="animate-in fade-in duration-150">
          {currentSection === 'overview' && (
            <AnalyticsOverviewView />
          )}

          {currentSection === 'campaigns' && (
            <AnalyticsCampaignsView />
          )}

          {currentSection === 'revenue' && (
            <AnalyticsRevenueView />
          )}

          {currentSection === 'forecast' && (
            <AnalyticsForecastView />
          )}

          {currentSection === 'crm' && (
            <AnalyticsCrmView />
          )}

          {currentSection === 'email' && (
            <AnalyticsEmailView />
          )}

          {currentSection === 'linkedin' && (
            <AnalyticsLinkedInView />
          )}

          {currentSection === 'voice' && (
            <AnalyticsVoiceView />
          )}

          {currentSection === 'billing' && (
            <AnalyticsBillingView />
          )}

          {currentSection === 'ai-usage' && (
            <AnalyticsAiUsageView />
          )}

          {currentSection === 'credits' && (
            <AnalyticsCreditsView />
          )}

          {currentSection === 'reports' && (
            <AnalyticsReportsView />
          )}

          {currentSection === 'vip-intelligence' && (
            <AnalyticsVipIntelligenceView />
          )}
        </div>
      </ErrorBoundary>

    </GsapPageTransition>
  );
};

export const AppAnalyticsPage: React.FC = () => {
  return <AppAnalyticsContent />;
};

export default AppAnalyticsPage;
