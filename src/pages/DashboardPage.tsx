import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  BarChart3, 
  Users, 
  Layers, 
  PhoneCall, 
  Building2, 
  Inbox, 
  ShieldCheck, 
  Sparkles, 
  Zap, 
  Mail, 
  Search, 
  Workflow, 
  CreditCard,
  RotateCw,
  Plus
} from 'lucide-react';
import { 
  DashboardHeader, 
  DashboardMetricCards, 
  DashboardCharts, 
  DashboardActivityFeed, 
  DashboardQuickActions, 
  UnifiedInboxView, 
  NewSequenceModal, 
  ExportReportModal 
} from '../components/dashboard';
import { LeadDatabaseSearch } from '../components/LeadDatabaseSearch';
import { FlowSimulator } from '../components/FlowSimulator';
import { VoiceSimulator } from '../components/VoiceSimulator';
import { DealPipelineKanban } from '../components/DealPipelineKanban';
import { CreditLedgerSimulator } from '../components/CreditLedgerSimulator';
import { Tabs } from '../components/ui/Tabs';
import { Badge } from '../components/ui/Badge';

export const DashboardPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = (searchParams.get('tab') as any) || 'command';
  
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [dateRange, setDateRange] = useState('last_7_days');
  const [channelFilter, setChannelFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('Just now');
  const [isNewSequenceOpen, setIsNewSequenceOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const { currentWorkspace } = useAuth();
  const { success } = useToast();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchParams({ tab: tabId });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated('Just now');
      success('Dashboard telemetry and pipeline pulse refreshed.', 'Live Sync Complete');
    }, 600);
  };

  const tabs = [
    { id: 'command', label: 'Command Center', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'leads', label: '8D Lead Finder', icon: <Users className="w-4 h-4" />, badge: '480M+' },
    { id: 'flow', label: 'Flow Builder', icon: <Workflow className="w-4 h-4" /> },
    { id: 'voice', label: 'Voice AI SDR', icon: <PhoneCall className="w-4 h-4" />, badge: 'Sub-400ms' },
    { id: 'pipeline', label: 'Deals CRM', icon: <Building2 className="w-4 h-4" />, badge: '$573K' },
    { id: 'inbox', label: 'Unified Inbox', icon: <Inbox className="w-4 h-4" />, badge: '3 New' },
    { id: 'ledger', label: 'Deliverability & Ledger', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <div className="pb-16 max-w-7xl mx-auto space-y-6 font-sans">
      
      <SEOHead 
        title="Revenue Operating Dashboard & Command Center | Outtricks"
        description="Unified outbound command center: telemetry across 480M+ leads, cold email inboxes, sub-400ms Voice SDR, and CRM Kanban."
        canonical="https://outtricks.com/demo"
        keywords={["Outtricks dashboard", "revenue operating system", "multi-channel outbound command center", "voice AI SDR live"]}
        breadcrumbs={[{ name: "Dashboard", url: "/demo" }]}
      />

      {/* Main Global Dashboard Header */}
      <DashboardHeader
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        channelFilter={channelFilter}
        onChannelFilterChange={setChannelFilter}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        onOpenNewSequence={() => setIsNewSequenceOpen(true)}
        onOpenExportModal={() => setIsExportOpen(true)}
        lastUpdated={lastUpdated}
      />

      {/* Primary Navigation Tabs */}
      <div className="bg-white dark:bg-[#161616] p-2 rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={handleTabChange}
          variant="pills"
          size="md"
        />
      </div>

      {/* Tab Content Views */}
      <div className="space-y-6 animate-in fade-in duration-150">
        
        {/* VIEW 1: COMMAND CENTER */}
        {activeTab === 'command' && (
          <div className="space-y-6">
            
            {/* 6 Metric KPI Cards */}
            <DashboardMetricCards onNavigateTab={handleTabChange} />

            {/* Performance Charts (Velocity + Conversion Funnel) */}
            <DashboardCharts />

            {/* Live Telemetry Activity Stream & Overdue Follow-ups Notice */}
            <DashboardActivityFeed onNavigateTab={handleTabChange} />

            {/* Quick Engine Launch Grid */}
            <DashboardQuickActions onNavigateTab={handleTabChange} />

          </div>
        )}

        {/* VIEW 2: 8D LEAD DATABASE & PROSPECT SEARCH */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  8-Dimension B2B Lead Database
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Search 480M+ verified global profiles with real-time multiDimensional query filters.
                </p>
              </div>
              <Badge variant="blue" size="md">
                14,280 Verified in Workspace
              </Badge>
            </div>
            <LeadDatabaseSearch />
          </div>
        )}

        {/* VIEW 3: VISUAL FLOW BUILDER */}
        {activeTab === 'flow' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  Visual Flow Builder & DAG Graph Canvas
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Coordinate multi-channel triggers, behavioral branches, and fallback actions.
                </p>
              </div>
              <Badge variant="blue" size="md">
                Live Simulation Mode
              </Badge>
            </div>
            <FlowSimulator />
          </div>
        )}

        {/* VIEW 4: VOICE AI SDR STUDIO */}
        {activeTab === 'voice' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  Voice AI SDR Studio & WebRTC Dialer
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Sub-400ms conversational phone agent qualifying prospects and booking demos live.
                </p>
              </div>
              <Badge variant="blue" size="md">
                0.38s Latency Benchmark
              </Badge>
            </div>
            <VoiceSimulator />
          </div>
        )}

        {/* VIEW 5: DEALS CRM PIPELINE */}
        {activeTab === 'pipeline' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  5-Stage Deals CRM Kanban & ARR Attribution
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Direct single PostgreSQL schema with zero webhook lag and real-time revenue weighting.
                </p>
              </div>
              <Badge variant="emerald" size="md">
                $573,000 Active Pipeline
              </Badge>
            </div>
            <DealPipelineKanban />
          </div>
        )}

        {/* VIEW 6: UNIFIED INBOX */}
        {activeTab === 'inbox' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  Unified Multi-Channel Inbox
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Synchronized email replies, LinkedIn DMs, and Voice AI call transcripts with TRIXIE AI response assistant.
                </p>
              </div>
              <Badge variant="blue" size="md">
                11.8% Average Reply Rate
              </Badge>
            </div>
            <UnifiedInboxView />
          </div>
        )}

        {/* VIEW 7: DELIVERABILITY & CREDITS LEDGER */}
        {activeTab === 'ledger' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  Deliverability Guard & Credit Ledger
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Monitor SPF, DKIM, DMARC, mailbox rotation pools, and verified lead credit consumption.
                </p>
              </div>
              <Badge variant="emerald" size="md">
                100% Deliverability Health
              </Badge>
            </div>
            <CreditLedgerSimulator />
          </div>
        )}

      </div>

      {/* Global Sequence Creation Modal */}
      <NewSequenceModal
        isOpen={isNewSequenceOpen}
        onClose={() => setIsNewSequenceOpen(false)}
      />

      {/* Global Report Export Modal */}
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

    </div>
  );
};
