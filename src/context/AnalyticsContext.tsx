import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { useToast } from './ToastContext';
import { 
  formatNumber, 
  formatCurrency, 
  formatCompactNumber, 
  formatPercentage, 
  formatDate,
  formatDuration 
} from '../utils/formatters';

export type DateRangeType = 
  | 'TODAY'
  | 'YESTERDAY'
  | '7D' 
  | '30D' 
  | '90D' 
  | 'THIS_MONTH'
  | 'LAST_MONTH'
  | 'THIS_QUARTER'
  | 'YTD' 
  | '12M' 
  | 'CUSTOM';

export type ComparisonPeriod = 
  | 'PREVIOUS_PERIOD'
  | 'PREVIOUS_MONTH'
  | 'PREVIOUS_QUARTER'
  | 'PREVIOUS_YEAR';

export type AnalyticsSubTab = 
  | 'overview' 
  | 'campaigns' 
  | 'revenue' 
  | 'forecast' 
  | 'crm' 
  | 'email' 
  | 'linkedin' 
  | 'voice' 
  | 'billing' 
  | 'ai-usage' 
  | 'credits' 
  | 'reports' 
  | 'vip-intelligence';

export interface AnalyticsFilterState {
  dateRange: DateRangeType;
  comparison: ComparisonPeriod;
  team: string;
  workspace: string;
  module: string;
  campaign: string;
  channel: string;
  user: string;
  plan: string;
}

export interface KpiMetric {
  id: string;
  name: string;
  value: string;
  rawValue: number;
  change: string;
  isPositive: boolean;
  period: string;
  supportingLabel: string;
  sparkline: number[];
}

export interface RevenueDataPoint {
  date: string;
  pipeline: number;
  revenue: number;
  meetings: number;
  qualifiedLeads: number;
  conversion: number;
}

export interface ChannelPerformanceRecord {
  id: string;
  channel: string;
  volume: number;
  volumeLabel: string;
  leads: number;
  meetings: number;
  pipeline: number;
  pipelineLabel: string;
  closedWon: number;
  closedWonLabel: string;
  conversionRate: number;
  trend: 'up' | 'down' | 'steady';
  colorHex: string;
}

export interface ModulePerformanceRecord {
  id: string;
  name: string;
  category: string;
  usageLabel: string;
  leads: number;
  actions: number;
  meetings: number;
  pipeline: number;
  pipelineLabel: string;
  revenue: number;
  revenueLabel: string;
  successRate: number;
  status: 'optimal' | 'attention' | 'idle';
}

export interface FunnelStage {
  id: string;
  name: string;
  count: number;
  countLabel: string;
  conversionPct: number;
  dropoffPct: number;
  avgVelocityDays: number;
}

export interface CampaignAnalyticsRecord {
  id: string;
  name: string;
  module: string;
  channel: string;
  audience: string;
  targetIcp: string;
  spend: string;
  leads: number;
  actions: number;
  replies: number;
  qualifiedLeads: number;
  meetings: number;
  opportunities: number;
  pipeline: number;
  pipelineLabel: string;
  revenue: number;
  revenueLabel: string;
  winRate: string;
  roi: string;
  conversionRate: number;
  status: 'Top Performing' | 'Needs Attention' | 'Active' | 'Paused';
  trend: number[];
}

export interface TeamPerformanceRecord {
  id: string;
  teamName: string;
  membersCount: number;
  leads: number;
  meetings: number;
  pipeline: number;
  pipelineLabel: string;
  revenue: number;
  revenueLabel: string;
  conversionRate: number;
  activitiesCount: number;
}

export interface UserPerformanceRecord {
  id: string;
  name: string;
  avatar: string;
  role: string;
  activities: number;
  leads: number;
  meetings: number;
  pipeline: number;
  pipelineLabel: string;
  revenue: number;
  revenueLabel: string;
  winRate: number;
}

export interface TricksyIntelligenceMetric {
  aiRequestsCount: number;
  aiCreditsUsed: number;
  aiAgentRuns: number;
  aiAssistedLeads: number;
  aiAssistedMeetings: number;
  aiAssistedPipeline: number;
  aiAssistedRevenue: number;
  averageAiCost: number;
  aiSuccessRate: number;
  monthlyTrend: number[];
}

export interface TricksyInsightCard {
  id: string;
  title: string;
  type: 'opportunity' | 'recommendation' | 'gap' | 'anomaly';
  tag: string;
  description: string;
  recommendation: string;
  potentialPipeline: string;
  confidence: number;
}

export interface ActivityTrendPoint {
  timestamp: string;
  emailsSent: number;
  linkedInActions: number;
  callsMade: number;
  leadsFound: number;
  workflowsExecuted: number;
  aiRequests: number;
  crmUpdates: number;
}

export interface CreditUsageBreakdown {
  totalCredits: number;
  usedCredits: number;
  remainingCredits: number;
  usageRatePct: number;
  projectedDepletionDays: number;
  byModule: {
    leadFinder: number;
    email: number;
    linkedIn: number;
    voice: number;
    tricksyAi: number;
    other: number;
  };
}

export interface PlatformHealthService {
  id: string;
  name: string;
  category: string;
  status: 'Healthy' | 'Warning' | 'Degraded' | 'Offline';
  latencyMs: number;
  uptimePct: number;
  failedJobsCount: number;
  failedAutomationsCount: number;
  apiErrors: number;
  webhookErrors: number;
}

export interface BillingInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  amount: string;
  status: 'Paid' | 'Pending';
  pdfUrl: string;
}

export interface ReportItem {
  id: string;
  title: string;
  type: 'Attribution' | 'Campaign ROI' | 'Executive Summary' | 'Channel Breakdown' | 'AI Usage';
  generatedDate: string;
  dateRange: string;
  fileSize: string;
  status: 'Ready' | 'Generating';
  frequency?: 'One-time' | 'Daily' | 'Weekly' | 'Monthly';
  recipients?: string[];
}

export interface VipAccountIntelligence {
  id: string;
  companyName: string;
  domain: string;
  executiveContact: string;
  dealPotential: string;
  intentScore: number;
  signals: string[];
  recommendedAction: string;
  priority: 'Critical' | 'High' | 'Medium';
}

export interface OpportunityForecast {
  id: string;
  company: string;
  dealSize: string;
  stage: string;
  probability: number;
  closeDate: string;
  owner: string;
  category: 'Commit' | 'Best Case' | 'Pipeline';
  riskFactor?: string;
}

interface AnalyticsContextType {
  activeTab: AnalyticsSubTab;
  setActiveTab: (tab: AnalyticsSubTab) => void;
  
  // Filter System
  filters: AnalyticsFilterState;
  setFilter: <K extends keyof AnalyticsFilterState>(key: K, value: AnalyticsFilterState[K]) => void;
  resetFilters: () => void;
  dateRange: DateRangeType;
  setDateRange: (range: DateRangeType) => void;
  comparison: ComparisonPeriod;
  setComparison: (comp: ComparisonPeriod) => void;
  comparePriorPeriod: boolean;
  setComparePriorPeriod: (enabled: boolean) => void;

  // Actions
  isRefreshing: boolean;
  refreshData: () => void;
  exportReport: (format: 'CSV' | 'PDF', customData?: any[]) => void;
  
  // Data Layers (Safely Calculated)
  kpiMetrics: KpiMetric[];
  overviewKpiCards: KpiMetric[];
  revenueData: RevenueDataPoint[];
  channelPerformance: ChannelPerformanceRecord[];
  modulePerformance: ModulePerformanceRecord[];
  conversionFunnel: FunnelStage[];
  campaigns: CampaignAnalyticsRecord[];
  teamPerformance: TeamPerformanceRecord[];
  userPerformance: UserPerformanceRecord[];
  tricksyIntelligence: TricksyIntelligenceMetric;
  tricksyInsights: TricksyInsightCard[];
  activityTrends: ActivityTrendPoint[];
  creditUsage: CreditUsageBreakdown;
  platformHealth: PlatformHealthService[];

  // Supporting views data
  invoices: BillingInvoice[];
  reports: ReportItem[];
  vipAccounts: VipAccountIntelligence[];
  forecastOpportunities: OpportunityForecast[];
  
  // Interactive Report Management
  createReport: (report: Omit<ReportItem, 'id' | 'generatedDate' | 'fileSize' | 'status'>) => void;
  scheduleReport: (report: Omit<ReportItem, 'id' | 'generatedDate' | 'fileSize' | 'status'>) => void;
  deleteReport: (reportId: string) => void;
  
  // Credits Action
  topUpCredits: (amount: number, price: string) => void;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

// Helper function to trigger browser file download for CSV
function triggerCsvDownload(filename: string, csvContent: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { success, info } = useToast();

  const [activeTab, setActiveTab] = useState<AnalyticsSubTab>('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Global Filter State
  const [filters, setFilters] = useState<AnalyticsFilterState>({
    dateRange: '30D',
    comparison: 'PREVIOUS_PERIOD',
    team: 'all',
    workspace: 'all',
    module: 'all',
    campaign: 'all',
    channel: 'all',
    user: 'all',
    plan: 'all',
  });

  const setFilter = useCallback(<K extends keyof AnalyticsFilterState>(key: K, value: AnalyticsFilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const setDateRange = useCallback((range: DateRangeType) => {
    setFilters(prev => ({ ...prev, dateRange: range }));
  }, []);

  const setComparison = useCallback((comp: ComparisonPeriod) => {
    setFilters(prev => ({ ...prev, comparison: comp }));
  }, []);

  const [comparePriorPeriod, setComparePriorPeriodState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('outtricks_analytics_compare_period');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  const setComparePriorPeriod = useCallback((enabled: boolean) => {
    setComparePriorPeriodState(enabled);
    try {
      localStorage.setItem('outtricks_analytics_compare_period', String(enabled));
    } catch (e) {
      console.warn('Failed to save analytics comparison setting', e);
    }
    if (enabled) {
      success('Period-over-period delta comparison enabled.', 'Comparison Active');
    } else {
      info('Period-over-period delta comparison disabled. Showing current period metrics.', 'Comparison Paused');
    }
  }, [success, info]);

  const resetFilters = useCallback(() => {
    setFilters({
      dateRange: '30D',
      comparison: 'PREVIOUS_PERIOD',
      team: 'all',
      workspace: 'all',
      module: 'all',
      campaign: 'all',
      channel: 'all',
      user: 'all',
      plan: 'all',
    });
    info('Global filters reset to platform defaults.', 'Filters Reset');
  }, [info]);

  // Refresh data simulation with actual telemetry recalculation
  const refreshData = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setRefreshKey(prev => prev + 1);
      setIsRefreshing(false);
      success('Analytics Hub telemetry recalculated with real-time sync.', 'Analytics Refreshed');
    }, 450);
  }, [success]);

  // Dynamic multiplier based on date range & filters
  const multiplier = useMemo(() => {
    let m = 1.0;
    if (filters.dateRange === 'TODAY') m = 0.05;
    else if (filters.dateRange === 'YESTERDAY') m = 0.045;
    else if (filters.dateRange === '7D') m = 0.25;
    else if (filters.dateRange === 'THIS_MONTH') m = 0.85;
    else if (filters.dateRange === 'LAST_MONTH') m = 0.95;
    else if (filters.dateRange === '30D') m = 1.0;
    else if (filters.dateRange === '90D' || filters.dateRange === 'THIS_QUARTER') m = 2.8;
    else if (filters.dateRange === 'YTD') m = 6.4;
    else if (filters.dateRange === '12M') m = 11.2;

    if (filters.channel !== 'all') m *= 0.65;
    if (filters.module !== 'all') m *= 0.7;
    if (filters.team !== 'all') m *= 0.8;
    if (filters.user !== 'all') m *= 0.4;
    return Math.max(0.01, m);
  }, [filters]);

  const comparisonPeriodLabel = useMemo(() => {
    switch (filters.comparison) {
      case 'PREVIOUS_MONTH': return 'vs previous month';
      case 'PREVIOUS_QUARTER': return 'vs previous quarter';
      case 'PREVIOUS_YEAR': return 'vs previous year';
      case 'PREVIOUS_PERIOD':
      default:
        return 'vs previous period';
    }
  }, [filters.comparison]);

  // 1. Executive KPI Metrics (8 Cards)
  const kpiMetrics: KpiMetric[] = useMemo(() => {
    const pipeline = Math.round(485000 * multiplier);
    const revenue = Math.round(184000 * multiplier);
    const meetings = Math.round(84 * multiplier);
    const leads = Math.round(326 * multiplier);
    const outreach = Math.round(32480 * multiplier);
    const aiUsage = Math.round(18420 * multiplier);
    const creditsUsed = Math.round(21350 * multiplier);

    return [
      {
        id: 'kpi-pipeline',
        name: 'Pipeline Influenced',
        value: formatCurrency(pipeline),
        rawValue: pipeline,
        change: '+24.2%',
        isPositive: true,
        period: comparisonPeriodLabel,
        supportingLabel: 'Qualified deals active in CRM stages',
        sparkline: [32, 45, 52, 60, 78, 85, 96, 110, 125, 140, 155, 170]
      },
      {
        id: 'kpi-closed-won',
        name: 'Closed Won Revenue',
        value: formatCurrency(revenue),
        rawValue: revenue,
        change: '+32.0%',
        isPositive: true,
        period: comparisonPeriodLabel,
        supportingLabel: 'ARR recognized from closed accounts',
        sparkline: [12, 18, 22, 28, 35, 42, 55, 68, 82, 94, 110, 130]
      },
      {
        id: 'kpi-meetings',
        name: 'Meetings Generated',
        value: formatNumber(meetings),
        rawValue: meetings,
        change: '+18.5%',
        isPositive: true,
        period: comparisonPeriodLabel,
        supportingLabel: 'Executive discovery & demo calls booked',
        sparkline: [4, 6, 8, 12, 15, 18, 24, 28, 34, 40, 48, 56]
      },
      {
        id: 'kpi-qualified-leads',
        name: 'Qualified Leads',
        value: formatNumber(leads),
        rawValue: leads,
        change: '+21.4%',
        isPositive: true,
        period: comparisonPeriodLabel,
        supportingLabel: 'ICP accounts meeting BANT qualification',
        sparkline: [20, 28, 35, 48, 58, 72, 85, 98, 115, 130, 148, 165]
      },
      {
        id: 'kpi-conversion',
        name: 'Conversion Rate',
        value: '28.4%',
        rawValue: 28.4,
        change: '+4.1%',
        isPositive: true,
        period: comparisonPeriodLabel,
        supportingLabel: 'Lead-to-opportunity acceleration index',
        sparkline: [22, 23, 24, 24.5, 25, 26, 26.8, 27.2, 27.8, 28.1, 28.4, 28.4]
      },
      {
        id: 'kpi-outreach',
        name: 'Total Outreach Actions',
        value: formatNumber(outreach),
        rawValue: outreach,
        change: '+16.8%',
        isPositive: true,
        period: comparisonPeriodLabel,
        supportingLabel: 'Emails, LinkedIn touches, calls & bids',
        sparkline: [1200, 1800, 2400, 3100, 3900, 4800, 5600, 6500, 7400, 8300, 9200, 10400]
      },
      {
        id: 'kpi-ai-usage',
        name: 'AI / Tricksy Usage',
        value: formatNumber(aiUsage),
        rawValue: aiUsage,
        change: '+12.4%',
        isPositive: true,
        period: comparisonPeriodLabel,
        supportingLabel: 'Autonomous agent steps & prompt completions',
        sparkline: [600, 900, 1400, 1900, 2500, 3200, 4000, 4900, 5800, 6800, 7800, 8900]
      },
      {
        id: 'kpi-credits',
        name: 'Credits Used',
        value: formatNumber(creditsUsed),
        rawValue: creditsUsed,
        change: '49.8% Cap',
        isPositive: true,
        period: 'of 42,850 allocated',
        supportingLabel: 'Dynamic ledger consumption across modules',
        sparkline: [1000, 2200, 3800, 5400, 7200, 9100, 11200, 13400, 15800, 18100, 20400, 21350]
      }
    ];
  }, [multiplier, refreshKey, comparisonPeriodLabel]);

  // 10 Detailed Overview KPI Cards (Part 4 specification)
  const overviewKpiCards: KpiMetric[] = useMemo(() => {
    const totalRev = Math.round(184000 * multiplier);
    const activeUsers = Math.round(48 * Math.max(0.5, multiplier));
    const newUsers = Math.round(14 * Math.max(0.5, multiplier));
    const leads = Math.round(326 * multiplier);
    const emails = Math.round(24800 * multiplier);
    const calls = Math.round(1420 * multiplier);
    const linkedIn = Math.round(3100 * multiplier);
    const aiUsage = Math.round(18420 * multiplier);
    const creditsUsed = Math.round(21350 * multiplier);

    return [
      { id: 'okpi-1', name: 'Total Revenue', value: formatCurrency(totalRev), rawValue: totalRev, change: '+18.4%', isPositive: true, period: comparisonPeriodLabel, supportingLabel: 'Net recognized ARR', sparkline: [10, 20, 35, 45, 60, 80, 110, 140] },
      { id: 'okpi-2', name: 'Revenue Growth', value: '+32.0%', rawValue: 32.0, change: '+4.5%', isPositive: true, period: comparisonPeriodLabel, supportingLabel: 'Quarterly velocity', sparkline: [12, 14, 18, 22, 26, 29, 32] },
      { id: 'okpi-3', name: 'Active Users', value: formatNumber(activeUsers), rawValue: activeUsers, change: '+12.5%', isPositive: true, period: comparisonPeriodLabel, supportingLabel: 'Active platform seats', sparkline: [20, 25, 30, 35, 40, 45, 48] },
      { id: 'okpi-4', name: 'New Users', value: formatNumber(newUsers), rawValue: newUsers, change: '+25.0%', isPositive: true, period: comparisonPeriodLabel, supportingLabel: 'New onboarded members', sparkline: [4, 6, 8, 10, 12, 14] },
      { id: 'okpi-5', name: 'Leads Generated', value: formatNumber(leads), rawValue: leads, change: '+21.4%', isPositive: true, period: comparisonPeriodLabel, supportingLabel: 'ICP qualified accounts', sparkline: [120, 160, 210, 260, 290, 326] },
      { id: 'okpi-6', name: 'Emails Sent', value: formatNumber(emails), rawValue: emails, change: '+16.8%', isPositive: true, period: comparisonPeriodLabel, supportingLabel: '99.4% inbox delivery rate', sparkline: [8000, 12000, 16000, 20000, 24800] },
      { id: 'okpi-7', name: 'Calls Made', value: formatNumber(calls), rawValue: calls, change: '+38.2%', isPositive: true, period: comparisonPeriodLabel, supportingLabel: 'Voice AI SDR connections', sparkline: [400, 650, 900, 1150, 1420] },
      { id: 'okpi-8', name: 'LinkedIn Actions', value: formatNumber(linkedIn), rawValue: linkedIn, change: '+14.2%', isPositive: true, period: comparisonPeriodLabel, supportingLabel: 'Safe proxy automations', sparkline: [1000, 1500, 2000, 2500, 3100] },
      { id: 'okpi-9', name: 'AI / Tricksy Usage', value: formatNumber(aiUsage), rawValue: aiUsage, change: '+12.4%', isPositive: true, period: comparisonPeriodLabel, supportingLabel: 'Inference requests', sparkline: [5000, 8000, 11000, 14500, 18420] },
      { id: 'okpi-10', name: 'Credits Used', value: formatNumber(creditsUsed), rawValue: creditsUsed, change: '49.8% Cap', isPositive: true, period: 'of 42,850 allocated', supportingLabel: 'Runway: 18 days', sparkline: [4000, 8000, 12000, 16000, 21350] },
    ];
  }, [multiplier, refreshKey, comparisonPeriodLabel]);

  // 2. Main Revenue & Pipeline Time-Series Data
  const revenueData: RevenueDataPoint[] = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((m, idx) => {
      const basePipeline = (28000 + idx * 4200 + (idx % 3) * 2500) * multiplier;
      const baseRevenue = (11000 + idx * 1900 + (idx % 2) * 1200) * multiplier;
      const baseMeetings = Math.round((5 + idx * 0.8) * multiplier);
      const baseLeads = Math.round((22 + idx * 2.8) * multiplier);
      return {
        date: m,
        pipeline: Math.round(basePipeline),
        revenue: Math.round(baseRevenue),
        meetings: baseMeetings,
        qualifiedLeads: baseLeads,
        conversion: +(24 + idx * 0.4).toFixed(1),
      };
    });
  }, [multiplier, refreshKey]);

  // 3. Channel Performance Records
  const channelPerformance: ChannelPerformanceRecord[] = useMemo(() => {
    return [
      {
        id: 'chn-email',
        channel: 'Cold Email',
        volume: Math.round(24800 * multiplier),
        volumeLabel: `${formatCompactNumber(24800 * multiplier)} actions`,
        leads: Math.round(326 * multiplier),
        meetings: Math.round(38 * multiplier),
        pipeline: Math.round(192000 * multiplier),
        pipelineLabel: formatCurrency(192000 * multiplier, '$0', true),
        closedWon: Math.round(74000 * multiplier),
        closedWonLabel: formatCurrency(74000 * multiplier, '$0', true),
        conversionRate: 32.4,
        trend: 'up',
        colorHex: '#2563EB',
      },
      {
        id: 'chn-voice',
        channel: 'Voice AI SDR',
        volume: Math.round(1420 * multiplier),
        volumeLabel: `${formatCompactNumber(1420 * multiplier)} calls`,
        leads: Math.round(96 * multiplier),
        meetings: Math.round(26 * multiplier),
        pipeline: Math.round(148000 * multiplier),
        pipelineLabel: formatCurrency(148000 * multiplier, '$0', true),
        closedWon: Math.round(58000 * multiplier),
        closedWonLabel: formatCurrency(58000 * multiplier, '$0', true),
        conversionRate: 38.2,
        trend: 'up',
        colorHex: '#10B981',
      },
      {
        id: 'chn-linkedin',
        channel: 'LinkedIn Safe',
        volume: Math.round(3100 * multiplier),
        volumeLabel: `${formatCompactNumber(3100 * multiplier)} touches`,
        leads: Math.round(142 * multiplier),
        meetings: Math.round(14 * multiplier),
        pipeline: Math.round(98000 * multiplier),
        pipelineLabel: formatCurrency(98000 * multiplier, '$0', true),
        closedWon: Math.round(36000 * multiplier),
        closedWonLabel: formatCurrency(36000 * multiplier, '$0', true),
        conversionRate: 24.1,
        trend: 'steady',
        colorHex: '#0066FF',
      },
      {
        id: 'chn-upwork',
        channel: 'Upwork Studio',
        volume: Math.round(185 * multiplier),
        volumeLabel: `${formatNumber(185 * multiplier)} proposals`,
        leads: Math.round(42 * multiplier),
        meetings: Math.round(6 * multiplier),
        pipeline: Math.round(47000 * multiplier),
        pipelineLabel: formatCurrency(47000 * multiplier, '$0', true),
        closedWon: Math.round(16000 * multiplier),
        closedWonLabel: formatCurrency(16000 * multiplier, '$0', true),
        conversionRate: 42.0,
        trend: 'up',
        colorHex: '#8B5CF6',
      },
      {
        id: 'chn-leadfinder',
        channel: '8D Lead Finder',
        volume: Math.round(8400 * multiplier),
        volumeLabel: `${formatCompactNumber(8400 * multiplier)} searches`,
        leads: Math.round(512 * multiplier),
        meetings: Math.round(18 * multiplier),
        pipeline: Math.round(64000 * multiplier),
        pipelineLabel: formatCurrency(64000 * multiplier, '$0', true),
        closedWon: Math.round(22000 * multiplier),
        closedWonLabel: formatCurrency(22000 * multiplier, '$0', true),
        conversionRate: 28.5,
        trend: 'up',
        colorHex: '#F59E0B',
      },
      {
        id: 'chn-other',
        channel: 'Inbound & API Webhooks',
        volume: Math.round(620 * multiplier),
        volumeLabel: `${formatNumber(620 * multiplier)} events`,
        leads: Math.round(28 * multiplier),
        meetings: Math.round(4 * multiplier),
        pipeline: Math.round(24000 * multiplier),
        pipelineLabel: formatCurrency(24000 * multiplier, '$0', true),
        closedWon: Math.round(9000 * multiplier),
        closedWonLabel: formatCurrency(9000 * multiplier, '$0', true),
        conversionRate: 31.0,
        trend: 'steady',
        colorHex: '#64748B',
      }
    ];
  }, [multiplier, refreshKey]);

  // 4. Module Performance Records
  const modulePerformance: ModulePerformanceRecord[] = useMemo(() => {
    return [
      { id: 'mod-email', name: 'Cold Email Outreach', category: 'Outreach', usageLabel: '24.8K sends', leads: Math.round(326 * multiplier), actions: Math.round(24800 * multiplier), meetings: Math.round(38 * multiplier), pipeline: Math.round(192000 * multiplier), pipelineLabel: formatCurrency(192000 * multiplier, '$0', true), revenue: Math.round(74000 * multiplier), revenueLabel: formatCurrency(74000 * multiplier, '$0', true), successRate: 98.4, status: 'optimal' },
      { id: 'mod-voice', name: 'Voice AI SDR', category: 'Telephony', usageLabel: '1.42K calls', leads: Math.round(96 * multiplier), actions: Math.round(1420 * multiplier), meetings: Math.round(26 * multiplier), pipeline: Math.round(148000 * multiplier), pipelineLabel: formatCurrency(148000 * multiplier, '$0', true), revenue: Math.round(58000 * multiplier), revenueLabel: formatCurrency(58000 * multiplier, '$0', true), successRate: 94.2, status: 'optimal' },
      { id: 'mod-linkedin', name: 'LinkedIn Automation', category: 'Social', usageLabel: '3.1K actions', leads: Math.round(142 * multiplier), actions: Math.round(3100 * multiplier), meetings: Math.round(14 * multiplier), pipeline: Math.round(98000 * multiplier), pipelineLabel: formatCurrency(98000 * multiplier, '$0', true), revenue: Math.round(36000 * multiplier), revenueLabel: formatCurrency(36000 * multiplier, '$0', true), successRate: 96.8, status: 'optimal' },
      { id: 'mod-leadfinder', name: '8D Lead Finder', category: 'Data', usageLabel: '8.4K queries', leads: Math.round(512 * multiplier), actions: Math.round(8400 * multiplier), meetings: Math.round(18 * multiplier), pipeline: Math.round(64000 * multiplier), pipelineLabel: formatCurrency(64000 * multiplier, '$0', true), revenue: Math.round(22000 * multiplier), revenueLabel: formatCurrency(22000 * multiplier, '$0', true), successRate: 99.1, status: 'optimal' },
      { id: 'mod-upwork', name: 'Upwork Studio', category: 'Bidding', usageLabel: '185 bids', leads: Math.round(42 * multiplier), actions: Math.round(185 * multiplier), meetings: Math.round(6 * multiplier), pipeline: Math.round(47000 * multiplier), pipelineLabel: formatCurrency(47000 * multiplier, '$0', true), revenue: Math.round(16000 * multiplier), revenueLabel: formatCurrency(16000 * multiplier, '$0', true), successRate: 91.5, status: 'optimal' },
      { id: 'mod-agents', name: 'Tricksy AI Agents', category: 'Autonomous', usageLabel: '6.2K missions', leads: Math.round(88 * multiplier), actions: Math.round(6200 * multiplier), meetings: Math.round(12 * multiplier), pipeline: Math.round(54000 * multiplier), pipelineLabel: formatCurrency(54000 * multiplier, '$0', true), revenue: Math.round(19000 * multiplier), revenueLabel: formatCurrency(19000 * multiplier, '$0', true), successRate: 97.4, status: 'optimal' },
      { id: 'mod-workflows', name: 'DAG Workflows', category: 'Automation', usageLabel: '14.2K runs', leads: Math.round(64 * multiplier), actions: Math.round(14200 * multiplier), meetings: Math.round(8 * multiplier), pipeline: Math.round(38000 * multiplier), pipelineLabel: formatCurrency(38000 * multiplier, '$0', true), revenue: Math.round(12000 * multiplier), revenueLabel: formatCurrency(12000 * multiplier, '$0', true), successRate: 99.8, status: 'optimal' },
      { id: 'mod-crm', name: 'Deals CRM', category: 'Pipeline', usageLabel: '482 deals managed', leads: Math.round(482 * multiplier), actions: Math.round(1840 * multiplier), meetings: Math.round(84 * multiplier), pipeline: Math.round(485000 * multiplier), pipelineLabel: formatCurrency(485000 * multiplier, '$0', true), revenue: Math.round(184000 * multiplier), revenueLabel: formatCurrency(184000 * multiplier, '$0', true), successRate: 99.9, status: 'optimal' },
    ];
  }, [multiplier, refreshKey]);

  // 5. Revenue Conversion Funnel
  const conversionFunnel: FunnelStage[] = useMemo(() => {
    const p = Math.round(50000 * multiplier);
    const c = Math.round(18420 * multiplier);
    const e = Math.round(4820 * multiplier);
    const q = Math.round(1240 * multiplier);
    const m = Math.round(326 * multiplier);
    const o = Math.round(118 * multiplier);
    const w = Math.round(42 * multiplier);

    return [
      { id: 'stg-prospects', name: 'Prospects Discovered', count: p, countLabel: formatNumber(p), conversionPct: 100, dropoffPct: 0, avgVelocityDays: 1 },
      { id: 'stg-contacted', name: 'Accounts Contacted', count: c, countLabel: formatNumber(c), conversionPct: +((c / Math.max(1, p)) * 100).toFixed(1), dropoffPct: +(((p - c) / Math.max(1, p)) * 100).toFixed(1), avgVelocityDays: 2 },
      { id: 'stg-engaged', name: 'Engaged & Replied', count: e, countLabel: formatNumber(e), conversionPct: +((e / Math.max(1, c)) * 100).toFixed(1), dropoffPct: +(((c - e) / Math.max(1, c)) * 100).toFixed(1), avgVelocityDays: 4 },
      { id: 'stg-qualified', name: 'ICP BANT Qualified', count: q, countLabel: formatNumber(q), conversionPct: +((q / Math.max(1, e)) * 100).toFixed(1), dropoffPct: +(((e - q) / Math.max(1, e)) * 100).toFixed(1), avgVelocityDays: 7 },
      { id: 'stg-meetings', name: 'Meetings Booked', count: m, countLabel: formatNumber(m), conversionPct: +((m / Math.max(1, q)) * 100).toFixed(1), dropoffPct: +(((q - m) / Math.max(1, q)) * 100).toFixed(1), avgVelocityDays: 11 },
      { id: 'stg-opportunities', name: 'CRM Opportunities', count: o, countLabel: formatNumber(o), conversionPct: +((o / Math.max(1, m)) * 100).toFixed(1), dropoffPct: +(((m - o) / Math.max(1, m)) * 100).toFixed(1), avgVelocityDays: 16 },
      { id: 'stg-closedwon', name: 'Closed Won ARR', count: w, countLabel: formatCurrency(w * 4400), conversionPct: +((w / Math.max(1, o)) * 100).toFixed(1), dropoffPct: +(((o - w) / Math.max(1, o)) * 100).toFixed(1), avgVelocityDays: 28 },
    ];
  }, [multiplier, refreshKey]);

  // 6. Campaign Performance Records
  const campaigns: CampaignAnalyticsRecord[] = useMemo(() => {
    return [
      { id: 'cmp-1', name: 'Enterprise Fintech CFOs Q3', module: 'Cold Email', channel: 'Email', audience: 'Fintech Series B-D', targetIcp: 'Fintech CFOs & VPs', spend: '$2,400', leads: Math.round(92 * multiplier), actions: Math.round(6200 * multiplier), replies: Math.round(340 * multiplier), qualifiedLeads: Math.round(92 * multiplier), meetings: Math.round(18 * multiplier), opportunities: Math.round(8 * multiplier), pipeline: Math.round(112000 * multiplier), pipelineLabel: formatCurrency(112000 * multiplier, '$0', true), revenue: Math.round(48000 * multiplier), revenueLabel: formatCurrency(48000 * multiplier, '$0', true), winRate: '38.5%', roi: '20.0x', conversionRate: 36.4, status: 'Top Performing', trend: [12, 18, 24, 32, 48, 64, 92] },
      { id: 'cmp-2', name: 'AI SaaS Heads of Revenue', module: 'Voice AI SDR', channel: 'Voice AI', audience: 'AI Tech US & EU', targetIcp: 'SaaS CROs & VPs', spend: '$1,800', leads: Math.round(64 * multiplier), actions: Math.round(840 * multiplier), replies: Math.round(195 * multiplier), qualifiedLeads: Math.round(64 * multiplier), meetings: Math.round(16 * multiplier), opportunities: Math.round(7 * multiplier), pipeline: Math.round(94000 * multiplier), pipelineLabel: formatCurrency(94000 * multiplier, '$0', true), revenue: Math.round(38000 * multiplier), revenueLabel: formatCurrency(38000 * multiplier, '$0', true), winRate: '43.7%', roi: '21.1x', conversionRate: 41.2, status: 'Top Performing', trend: [8, 14, 22, 35, 48, 56, 64] },
      { id: 'cmp-3', name: 'Healthcare CTOs Cloud Migration', module: 'LinkedIn Safe', channel: 'LinkedIn', audience: 'HealthTech 500+', targetIcp: 'HealthTech CTOs', spend: '$1,200', leads: Math.round(48 * multiplier), actions: Math.round(1420 * multiplier), replies: Math.round(110 * multiplier), qualifiedLeads: Math.round(48 * multiplier), meetings: Math.round(8 * multiplier), opportunities: Math.round(4 * multiplier), pipeline: Math.round(62000 * multiplier), pipelineLabel: formatCurrency(62000 * multiplier, '$0', true), revenue: Math.round(24000 * multiplier), revenueLabel: formatCurrency(24000 * multiplier, '$0', true), winRate: '33.3%', roi: '20.0x', conversionRate: 26.8, status: 'Active', trend: [6, 12, 18, 25, 34, 42, 48] },
      { id: 'cmp-4', name: 'Upwork DevOps Infrastructure Bids', module: 'Upwork Studio', channel: 'Upwork', audience: 'Enterprise Gig Bids', targetIcp: 'Enterprise Buyers', spend: '$450', leads: Math.round(18 * multiplier), actions: Math.round(120 * multiplier), replies: Math.round(34 * multiplier), qualifiedLeads: Math.round(18 * multiplier), meetings: Math.round(4 * multiplier), opportunities: Math.round(2 * multiplier), pipeline: Math.round(32000 * multiplier), pipelineLabel: formatCurrency(32000 * multiplier, '$0', true), revenue: Math.round(14000 * multiplier), revenueLabel: formatCurrency(14000 * multiplier, '$0', true), winRate: '50.0%', roi: '31.1x', conversionRate: 44.0, status: 'Top Performing', trend: [2, 4, 8, 11, 14, 16, 18] },
      { id: 'cmp-5', name: 'Mid-Market E-commerce Re-engagement', module: 'Cold Email', channel: 'Email', audience: 'Shopify Plus Brands', targetIcp: 'E-commerce Founders', spend: '$900', leads: Math.round(22 * multiplier), actions: Math.round(4800 * multiplier), replies: Math.round(120 * multiplier), qualifiedLeads: Math.round(22 * multiplier), meetings: Math.round(2 * multiplier), opportunities: Math.round(1 * multiplier), pipeline: Math.round(14000 * multiplier), pipelineLabel: formatCurrency(14000 * multiplier, '$0', true), revenue: Math.round(4000 * multiplier), revenueLabel: formatCurrency(4000 * multiplier, '$0', true), winRate: '20.0%', roi: '4.4x', conversionRate: 14.2, status: 'Needs Attention', trend: [10, 12, 14, 16, 18, 20, 22] },
    ];
  }, [multiplier, refreshKey]);

  // 7. Team Performance
  const teamPerformance: TeamPerformanceRecord[] = useMemo(() => {
    return [
      { id: 'tm-1', teamName: 'CloudScale Revenue Ops', membersCount: 12, leads: Math.round(482 * multiplier), meetings: Math.round(84 * multiplier), pipeline: Math.round(485000 * multiplier), pipelineLabel: formatCurrency(485000 * multiplier, '$0', true), revenue: Math.round(184000 * multiplier), revenueLabel: formatCurrency(184000 * multiplier, '$0', true), conversionRate: 28.4, activitiesCount: Math.round(32480 * multiplier) },
      { id: 'tm-2', teamName: 'Apex Outbound Growth', membersCount: 6, leads: Math.round(240 * multiplier), meetings: Math.round(36 * multiplier), pipeline: Math.round(210000 * multiplier), pipelineLabel: formatCurrency(210000 * multiplier, '$0', true), revenue: Math.round(78000 * multiplier), revenueLabel: formatCurrency(78000 * multiplier, '$0', true), conversionRate: 26.2, activitiesCount: Math.round(16200 * multiplier) },
      { id: 'tm-3', teamName: 'Solaris Strategic Deals', membersCount: 4, leads: Math.round(110 * multiplier), meetings: Math.round(18 * multiplier), pipeline: Math.round(140000 * multiplier), pipelineLabel: formatCurrency(140000 * multiplier, '$0', true), revenue: Math.round(52000 * multiplier), revenueLabel: formatCurrency(52000 * multiplier, '$0', true), conversionRate: 34.8, activitiesCount: Math.round(8400 * multiplier) },
    ];
  }, [multiplier, refreshKey]);

  // 8. Top Performers
  const userPerformance: UserPerformanceRecord[] = useMemo(() => {
    return [
      { id: 'usr-1', name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', role: 'Head of Growth', activities: Math.round(8420 * multiplier), leads: Math.round(142 * multiplier), meetings: Math.round(34 * multiplier), pipeline: Math.round(198000 * multiplier), pipelineLabel: formatCurrency(198000 * multiplier, '$0', true), revenue: Math.round(78000 * multiplier), revenueLabel: formatCurrency(78000 * multiplier, '$0', true), winRate: 38.5 },
      { id: 'usr-2', name: 'David Zhao', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', role: 'Senior Outbound Lead', activities: Math.round(7100 * multiplier), leads: Math.round(118 * multiplier), meetings: Math.round(24 * multiplier), pipeline: Math.round(142000 * multiplier), pipelineLabel: formatCurrency(142000 * multiplier, '$0', true), revenue: Math.round(54000 * multiplier), revenueLabel: formatCurrency(54000 * multiplier, '$0', true), winRate: 34.0 },
      { id: 'usr-3', name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', role: 'Account Executive', activities: Math.round(6200 * multiplier), leads: Math.round(96 * multiplier), meetings: Math.round(18 * multiplier), pipeline: Math.round(98000 * multiplier), pipelineLabel: formatCurrency(98000 * multiplier, '$0', true), revenue: Math.round(36000 * multiplier), revenueLabel: formatCurrency(36000 * multiplier, '$0', true), winRate: 31.2 },
      { id: 'usr-4', name: 'Elena Rostova', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', role: 'Voice SDR Specialist', activities: Math.round(4800 * multiplier), leads: Math.round(78 * multiplier), meetings: Math.round(16 * multiplier), pipeline: Math.round(84000 * multiplier), pipelineLabel: formatCurrency(84000 * multiplier, '$0', true), revenue: Math.round(32000 * multiplier), revenueLabel: formatCurrency(32000 * multiplier, '$0', true), winRate: 42.0 },
    ];
  }, [multiplier, refreshKey]);

  // 9. Tricksy AI Intelligence & ROI
  const tricksyIntelligence: TricksyIntelligenceMetric = useMemo(() => {
    return {
      aiRequestsCount: Math.round(18420 * multiplier),
      aiCreditsUsed: Math.round(36840 * multiplier),
      aiAgentRuns: Math.round(6240 * multiplier),
      aiAssistedLeads: Math.round(184 * multiplier),
      aiAssistedMeetings: Math.round(42 * multiplier),
      aiAssistedPipeline: Math.round(148000 * multiplier),
      aiAssistedRevenue: Math.round(62000 * multiplier),
      averageAiCost: 0.0034,
      aiSuccessRate: 98.2,
      monthlyTrend: [4200, 6800, 9400, 12800, 15400, 18420]
    };
  }, [multiplier, refreshKey]);

  // 10. Tricksy Actionable Insights
  const tricksyInsights: TricksyInsightCard[] = useMemo(() => {
    return [
      {
        id: 'ins-voice',
        title: 'Voice AI SDR Outperforming Platform Benchmark',
        type: 'opportunity',
        tag: 'Channel Alpha',
        description: 'Voice qualification is converting at 38.2%, above the platform baseline average of 28.4%.',
        recommendation: 'Increase Voice SDR daily allocation by +40% for US West Coast tech ICP accounts.',
        potentialPipeline: '+$42,000 Pipeline',
        confidence: 96
      },
      {
        id: 'ins-linkedin',
        title: 'Fintech Decision-Maker Signal Momentum',
        type: 'opportunity',
        tag: 'Targeting Alpha',
        description: 'Fintech CFO campaigns are generating 36.4% meeting booking rates with zero deliverability friction.',
        recommendation: 'Expand audience search parameters in 8D Lead Finder for Tier-1 Series B-D companies.',
        potentialPipeline: '+$28,000 Pipeline',
        confidence: 92
      },
      {
        id: 'ins-gap',
        title: 'Email Follow-up Latency Anomaly',
        type: 'gap',
        tag: 'Attention Required',
        description: 'Several qualified leads in the E-commerce campaign have not received sequence follow-up within 24 hours.',
        recommendation: 'Activate automatic 4-hour Smart Delay follow-up trigger in Visual Workflow engine.',
        potentialPipeline: '+$14,000 Pipeline',
        confidence: 88
      }
    ];
  }, []);

  // 11. Activity Stream Telemetry
  const activityTrends: ActivityTrendPoint[] = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((d, i) => ({
      timestamp: d,
      emailsSent: Math.round((3200 + (i % 3) * 600) * multiplier),
      linkedInActions: Math.round((420 + (i % 2) * 80) * multiplier),
      callsMade: Math.round((180 + (i % 4) * 40) * multiplier),
      leadsFound: Math.round((950 + (i % 2) * 200) * multiplier),
      workflowsExecuted: Math.round((1800 + (i % 3) * 300) * multiplier),
      aiRequests: Math.round((2400 + (i % 4) * 400) * multiplier),
      crmUpdates: Math.round((280 + (i % 2) * 50) * multiplier),
    }));
  }, [multiplier, refreshKey]);

  // 12. Credit Usage Breakdown
  const creditUsage: CreditUsageBreakdown = useMemo(() => {
    const total = 42850;
    const used = Math.min(total, Math.round(21350 * multiplier));
    const remaining = Math.max(0, total - used);
    const rate = +((used / total) * 100).toFixed(1);
    const days = Math.max(5, Math.round(18 / Math.max(0.5, multiplier)));

    return {
      totalCredits: total,
      usedCredits: used,
      remainingCredits: remaining,
      usageRatePct: rate,
      projectedDepletionDays: days,
      byModule: {
        leadFinder: 32,
        email: 28,
        voice: 18,
        tricksyAi: 14,
        linkedIn: 6,
        other: 2,
      }
    };
  }, [multiplier, refreshKey]);

  // 13. Platform Health Services
  const platformHealth: PlatformHealthService[] = useMemo(() => {
    return [
      { id: 'srv-1', name: '8D Lead Finder Engine', category: 'Data & Enrichment', status: 'Healthy', latencyMs: 38, uptimePct: 99.98, failedJobsCount: 0, failedAutomationsCount: 0, apiErrors: 0, webhookErrors: 0 },
      { id: 'srv-2', name: 'Cold Email SMTP Delivery Queue', category: 'Outreach Protocol', status: 'Healthy', latencyMs: 65, uptimePct: 99.94, failedJobsCount: 2, failedAutomationsCount: 0, apiErrors: 1, webhookErrors: 0 },
      { id: 'srv-3', name: 'LinkedIn Safe Cloud Proxies', category: 'Social Automation', status: 'Healthy', latencyMs: 110, uptimePct: 99.85, failedJobsCount: 0, failedAutomationsCount: 1, apiErrors: 0, webhookErrors: 0 },
      { id: 'srv-4', name: 'Voice AI SDR Sub-400ms Gateway', category: 'Telephony Media', status: 'Healthy', latencyMs: 180, uptimePct: 99.91, failedJobsCount: 0, failedAutomationsCount: 0, apiErrors: 0, webhookErrors: 0 },
      { id: 'srv-5', name: 'DAG Workflow Execution Engine', category: 'Orchestration', status: 'Healthy', latencyMs: 45, uptimePct: 99.99, failedJobsCount: 0, failedAutomationsCount: 0, apiErrors: 0, webhookErrors: 0 },
      { id: 'srv-6', name: 'Deals CRM Database Cluster', category: 'Core Storage', status: 'Healthy', latencyMs: 12, uptimePct: 99.99, failedJobsCount: 0, failedAutomationsCount: 0, apiErrors: 0, webhookErrors: 0 },
      { id: 'srv-7', name: 'Tricksy AI Inference Cluster', category: 'AI Intelligence', status: 'Healthy', latencyMs: 320, uptimePct: 99.95, failedJobsCount: 0, failedAutomationsCount: 0, apiErrors: 0, webhookErrors: 0 },
    ];
  }, []);

  // Supporting Invoices
  const [invoices] = useState<BillingInvoice[]>([
    { id: 'inv-1', invoiceNumber: 'INV-2026-0814', date: '2026-08-01', amount: '$799.00', status: 'Paid', pdfUrl: '#' },
    { id: 'inv-2', invoiceNumber: 'INV-2026-0714', date: '2026-07-01', amount: '$799.00', status: 'Paid', pdfUrl: '#' },
    { id: 'inv-3', invoiceNumber: 'INV-2026-0614', date: '2026-06-01', amount: '$799.00', status: 'Paid', pdfUrl: '#' },
  ]);

  // Supporting Reports
  const [reports, setReports] = useState<ReportItem[]>([
    { id: 'rep-1', title: 'Q3 Enterprise Revenue Attribution & ROI', type: 'Attribution', generatedDate: '2026-08-28', dateRange: 'Last 30 Days', fileSize: '3.4 MB', status: 'Ready' },
    { id: 'rep-2', title: 'Voice AI vs Cold Email Conversion Benchmark', type: 'Channel Breakdown', generatedDate: '2026-08-25', dateRange: 'Last 90 Days', fileSize: '2.1 MB', status: 'Ready' },
    { id: 'rep-3', title: 'Tricksy AI Autonomous Execution Audit', type: 'AI Usage', generatedDate: '2026-08-20', dateRange: 'Last 30 Days', fileSize: '1.8 MB', status: 'Ready' },
  ]);

  // Supporting VIP Accounts
  const [vipAccounts] = useState<VipAccountIntelligence[]>([
    { id: 'vip-1', companyName: 'Stripe Inc.', domain: 'stripe.com', executiveContact: 'Patrick Collison', dealPotential: '$180,000', intentScore: 94, signals: ['Hiring 24 Sales Leaders', 'Funding Round Announced', 'Tech Stack Evaluation'], recommendedAction: 'Deploy Voice SDR personalized executive intro sequence.', priority: 'Critical' },
    { id: 'vip-2', companyName: 'Databricks', domain: 'databricks.com', executiveContact: 'Ali Ghodsi', dealPotential: '$240,000', intentScore: 91, signals: ['G2 High Intent Spike', 'Website Pricing Visit', 'LinkedIn Growth 18%'], recommendedAction: 'Send multi-channel LinkedIn + Cold Email sequence.', priority: 'Critical' },
    { id: 'vip-3', companyName: 'Ramp Financial', domain: 'ramp.com', executiveContact: 'Eric Glyman', dealPotential: '$120,000', intentScore: 88, signals: ['Expansion into UK', 'New VP Outbound Hired'], recommendedAction: 'Schedule fintech benchmark strategy demo call.', priority: 'High' },
  ]);

  // Supporting Forecast
  const [forecastOpportunities] = useState<OpportunityForecast[]>([
    { id: 'fc-1', company: 'Stripe Inc.', dealSize: '$180,000', stage: 'Proposal / Contract SLA', probability: 90, closeDate: '2026-09-15', owner: 'Sarah Jenkins', category: 'Commit' },
    { id: 'fc-2', company: 'Databricks', dealSize: '$240,000', stage: 'Executive Demo Completed', probability: 75, closeDate: '2026-09-30', owner: 'David Zhao', category: 'Commit' },
    { id: 'fc-3', company: 'Ramp Financial', dealSize: '$120,000', stage: 'Technical Security Review', probability: 60, closeDate: '2026-10-15', owner: 'Alex Rivera', category: 'Best Case' },
    { id: 'fc-4', company: 'Retool', dealSize: '$85,000', stage: 'Discovery Meeting Booked', probability: 40, closeDate: '2026-10-31', owner: 'Elena Rostova', category: 'Pipeline' },
  ]);

  // Export Action
  const exportReport = useCallback((format: 'CSV' | 'PDF', customData?: any[]) => {
    if (format === 'CSV') {
      const rows = [
        ['Outtricks Platform - Revenue Intelligence Export'],
        ['Generated At', new Date().toISOString()],
        ['Date Range', filters.dateRange],
        ['Comparison Mode', filters.comparison],
        ['Team Filter', filters.team],
        ['Channel Filter', filters.channel],
        [],
        ['Metric', 'Value', 'Growth vs Comparison', 'Supporting Info'],
        ...kpiMetrics.map(k => [k.name, k.value, k.change, k.supportingLabel]),
        [],
        ['Channel', 'Volume', 'Leads', 'Meetings', 'Pipeline', 'Closed Won', 'Conversion Rate'],
        ...channelPerformance.map(c => [c.channel, formatNumber(c.volume), formatNumber(c.leads), formatNumber(c.meetings), formatCurrency(c.pipeline), formatCurrency(c.closedWon), `${c.conversionRate}%`]),
        [],
        ['Campaign', 'Module', 'Audience', 'Actions', 'Replies', 'Leads', 'Meetings', 'Pipeline', 'Revenue', 'Status'],
        ...campaigns.map(cp => [cp.name, cp.module, cp.audience, formatNumber(cp.actions), formatNumber(cp.replies), formatNumber(cp.qualifiedLeads), formatNumber(cp.meetings), cp.pipelineLabel, cp.revenueLabel, cp.status]),
      ];

      const csvString = rows.map(r => r.map(cell => `"${(cell || '').toString().replace(/"/g, '""')}"`).join(',')).join('\n');
      triggerCsvDownload(`outtricks-analytics-export-${filters.dateRange.toLowerCase()}-${Date.now()}.csv`, csvString);
      success('Analytics Hub data exported to CSV file successfully.', 'CSV Exported');
    } else {
      window.print();
      info('Print & PDF export dialog opened.', 'PDF Export');
    }
  }, [filters, kpiMetrics, channelPerformance, campaigns, success, info]);

  // Report Creation & Scheduling
  const createReport = useCallback((reportData: Omit<ReportItem, 'id' | 'generatedDate' | 'fileSize' | 'status'>) => {
    const newRep: ReportItem = {
      ...reportData,
      id: `rep-${Date.now()}`,
      generatedDate: new Date().toISOString().split('T')[0],
      fileSize: '2.4 MB',
      status: 'Ready',
    };
    setReports(prev => [newRep, ...prev]);
    success(`Generated ${reportData.title} successfully.`, 'Report Ready');
  }, [success]);

  const scheduleReport = useCallback((reportData: Omit<ReportItem, 'id' | 'generatedDate' | 'fileSize' | 'status'>) => {
    const newRep: ReportItem = {
      ...reportData,
      id: `rep-${Date.now()}`,
      generatedDate: new Date().toISOString().split('T')[0],
      fileSize: 'Scheduled',
      status: 'Ready',
    };
    setReports(prev => [newRep, ...prev]);
    success(`Scheduled recurring ${reportData.frequency || 'Weekly'} report delivery.`, 'Report Scheduled');
  }, [success]);

  const deleteReport = useCallback((reportId: string) => {
    setReports(prev => prev.filter(r => r.id !== reportId));
    info('Report removed from archive.', 'Report Deleted');
  }, [info]);

  const topUpCredits = useCallback((amount: number, price: string) => {
    success(`Added ${formatNumber(amount)} credits to workspace ledger (${price}).`, 'Credits Purchased');
  }, [success]);

  return (
    <AnalyticsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        filters,
        setFilter,
        resetFilters,
        dateRange: filters.dateRange,
        setDateRange,
        comparison: filters.comparison,
        setComparison,
        comparePriorPeriod,
        setComparePriorPeriod,
        isRefreshing,
        refreshData,
        exportReport,
        kpiMetrics,
        overviewKpiCards,
        revenueData,
        channelPerformance,
        modulePerformance,
        conversionFunnel,
        campaigns,
        teamPerformance,
        userPerformance,
        tricksyIntelligence,
        tricksyInsights,
        activityTrends,
        creditUsage,
        platformHealth,
        invoices,
        reports,
        vipAccounts,
        forecastOpportunities,
        createReport,
        scheduleReport,
        deleteReport,
        topUpCredits,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};
