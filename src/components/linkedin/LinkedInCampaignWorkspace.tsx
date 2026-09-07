import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Workflow, 
  Users, 
  Send, 
  BarChart3, 
  Sliders, 
  CheckCircle2, 
  AlertTriangle, 
  Play, 
  Pause, 
  Star, 
  Settings as SettingsIcon, 
  MoreHorizontal,
  Copy,
  Trash2,
  Archive,
  ChevronDown
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Dropdown } from '../ui/Dropdown';
import { 
  useLinkedIn, 
  LinkedInCampaign, 
  LinkedInWorkspaceTab 
} from '../../context/LinkedInContext';
import { LinkedInAutomationCanvasView } from './LinkedInAutomationCanvasView';
import { LinkedInCampaignLeadsView } from './LinkedInCampaignLeadsView';
import { LinkedInCampaignLaunchView } from './LinkedInCampaignLaunchView';
import { LinkedInCampaignPerformanceView } from './LinkedInCampaignPerformanceView';
import { LinkedInCampaignSettingsView } from './LinkedInCampaignSettingsView';

export interface LinkedInCampaignWorkspaceProps {
  campaign: LinkedInCampaign;
  onBack: () => void;
}

export const LinkedInCampaignWorkspace: React.FC<LinkedInCampaignWorkspaceProps> = ({
  campaign,
  onBack,
}) => {
  const { 
    toggleCampaignStatus, 
    duplicateCampaign, 
    deleteCampaign, 
    archiveCampaign,
    activeWorkspaceTab,
    setActiveWorkspaceTab 
  } = useLinkedIn();

  const [isStarred, setIsStarred] = useState(false);

  // Check readiness
  const isAllSet = campaign.leadsList.length > 0 && campaign.sequence.length > 0 && Boolean(campaign.accountName);

  return (
    <div className="space-y-5 font-sans">
      
      {/* 1. Benchmark Top Bar (matches benchmark screenshots 1-5) */}
      <div className="p-4 sm:p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        
        {/* Left: Campaign Identity & Controls */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onBack}
            className="p-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-[#252525] text-slate-500 cursor-pointer transition-colors shrink-0"
            title="Back to Campaigns"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-500 border border-orange-500/20 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-base sm:text-lg font-black text-slate-950 dark:text-white tracking-tight truncate">
                {campaign.name}
              </h1>

              {/* Status Badge Dropdown */}
              <button
                type="button"
                onClick={() => toggleCampaignStatus(campaign.id)}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer font-mono ${
                  campaign.status === 'Running'
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-500/30'
                }`}
              >
                {campaign.status === 'Running' ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
                <span>{campaign.status}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {/* Star Favorite */}
              <button
                type="button"
                onClick={() => setIsStarred(!isStarred)}
                className={`p-1 text-slate-400 hover:text-amber-400 cursor-pointer ${isStarred ? 'text-amber-400' : ''}`}
              >
                <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-current' : ''}`} />
              </button>

              {/* Quick Settings Icon */}
              <button
                type="button"
                onClick={() => setActiveWorkspaceTab('settings')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <SettingsIcon className="w-3.5 h-3.5" />
              </button>

              {/* Actions Dropdown */}
              <Dropdown
                trigger={
                  <button type="button" className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                }
                items={[
                  {
                    label: 'Duplicate Campaign',
                    icon: <Copy className="w-3.5 h-3.5 text-blue-500" />,
                    onClick: () => duplicateCampaign(campaign.id),
                  },
                  {
                    label: 'Archive Campaign',
                    icon: <Archive className="w-3.5 h-3.5 text-amber-500" />,
                    onClick: () => archiveCampaign(campaign.id),
                  },
                  {
                    label: 'Delete Campaign',
                    icon: <Trash2 className="w-3.5 h-3.5 text-rose-500" />,
                    variant: 'danger',
                    onClick: () => {
                      deleteCampaign(campaign.id);
                      onBack();
                    },
                  },
                ]}
              />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {campaign.targetAudience} • Sender: {campaign.accountName} • {campaign.leadsList.length} Leads
            </div>
          </div>
        </div>

        {/* Right: Workspace Navigation Tabs + All Set Pill (matches benchmark screenshot 1) */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#262626]">
            {[
              { id: 'sequence', label: 'Sequence', icon: Workflow },
              { id: 'leads', label: 'Leads list', icon: Users },
              { id: 'launch', label: 'Launch', icon: Send },
              { id: 'performance', label: 'Performance', icon: BarChart3 },
              { id: 'settings', label: 'Settings', icon: Sliders },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeWorkspaceTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveWorkspaceTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-[#2A2A2A] text-slate-950 dark:text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Readiness Pill (matches screenshot 1) */}
          <button
            type="button"
            onClick={() => setActiveWorkspaceTab('launch')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              isAllSet
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-500/30'
            }`}
          >
            {isAllSet ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
            <span>{isAllSet ? 'All set' : 'Needs attention'}</span>
          </button>
        </div>

      </div>

      {/* 2. Workspace View Routing */}
      <div className="animate-in fade-in duration-150">
        {activeWorkspaceTab === 'sequence' && (
          <LinkedInAutomationCanvasView campaign={campaign} />
        )}

        {activeWorkspaceTab === 'leads' && (
          <LinkedInCampaignLeadsView campaign={campaign} />
        )}

        {activeWorkspaceTab === 'launch' && (
          <LinkedInCampaignLaunchView campaign={campaign} />
        )}

        {activeWorkspaceTab === 'performance' && (
          <LinkedInCampaignPerformanceView campaign={campaign} />
        )}

        {activeWorkspaceTab === 'settings' && (
          <LinkedInCampaignSettingsView campaign={campaign} />
        )}
      </div>

    </div>
  );
};
