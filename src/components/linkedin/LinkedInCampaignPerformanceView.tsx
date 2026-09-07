import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  Calendar, 
  Users, 
  Send, 
  Download, 
  Info, 
  CheckCircle2, 
  MessageSquare, 
  Eye, 
  UserPlus, 
  ThumbsUp, 
  Flame, 
  TrendingUp,
  Workflow,
  HelpCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { LinkedInCampaign } from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';

export interface LinkedInCampaignPerformanceViewProps {
  campaign: LinkedInCampaign;
}

export const LinkedInCampaignPerformanceView: React.FC<LinkedInCampaignPerformanceViewProps> = ({ campaign }) => {
  const { success } = useToast();

  const [subView, setSubView] = useState<'overview' | 'step_details'>('overview');
  const [timePeriod, setTimePeriod] = useState('Jul 5, 2026 → Sep 6, 2026');
  const [selectedSender, setSelectedSender] = useState("All campaign's senders");
  const [selectedChannel, setSelectedChannel] = useState('All Channels');
  const [bestStepsTab, setBestStepsTab] = useState<'Invited' | 'Sent' | 'Delivered' | 'Opened' | 'Clicked' | 'Replied'>('Sent');
  const [activeMetricFilter, setActiveMetricFilter] = useState<string>('Accepted');

  const funnel = campaign.performanceFunnel || {
    contacted: 144,
    contactedPct: 68.6,
    opened: 6,
    openedPct: 2.9,
    interaction: 6,
    interactionPct: 2.9,
    answered: 0,
    answeredPct: 0,
    interested: 0,
    interestedPct: 0,
    interrupted: 1,
    interruptedPct: 0.5,
    total: 210,
  };

  const handleExport = () => {
    success(`Campaign analytics CSV export generated for "${campaign.name}".`, 'Export Downloaded');
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 font-sans text-xs min-h-[640px]">
      
      {/* 1. Left Control Panel (Matches benchmark screenshots 3 & 4) */}
      <div className="w-full lg:w-64 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs p-4 space-y-4 shrink-0">
        
        {/* Toggle between Overview and Step Details */}
        <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-[#1F1F1F] border border-slate-200 dark:border-[#2A2A2A]">
          <button
            type="button"
            onClick={() => setSubView('overview')}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
              subView === 'overview'
                ? 'bg-white dark:bg-[#2A2A2A] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setSubView('step_details')}
            className={`py-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 cursor-pointer ${
              subView === 'step_details'
                ? 'bg-white dark:bg-[#2A2A2A] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-500'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Step details</span>
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Time period</label>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626] flex items-center justify-between text-slate-800 dark:text-slate-200 font-medium">
              <span>{timePeriod}</span>
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Senders</label>
            <select
              value={selectedSender}
              onChange={(e) => setSelectedSender(e.target.value)}
              className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626] text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
            >
              <option value="All campaign's senders">All campaign's senders</option>
              <option value="Asad Farooq">Asad Farooq</option>
              <option value="Sarah Jenkins">Sarah Jenkins</option>
            </select>
          </div>

          {subView === 'overview' && (
            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Channels</label>
              <select
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626] text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
              >
                <option value="All Channels">All Channels</option>
                <option value="LinkedIn">LinkedIn</option>
              </select>
            </div>
          )}

          {/* Statistics to Display (Only in Step details sub-view, matches screenshot 4) */}
          {subView === 'step_details' && (
            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-[#262626]">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Statistics to display
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  'Opened', 'Clicked', 'Replied', 'Booked', 
                  'Interested', 'Accepted', 'Not sent', 'Unsubscribed', 
                  'Bounced', 'Skipped'
                ].map((metric) => (
                  <button
                    key={metric}
                    type="button"
                    onClick={() => setActiveMetricFilter(metric)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer text-center ${
                      activeMetricFilter === metric
                        ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-500/30'
                        : 'border-slate-200 dark:border-[#262626] text-slate-500 hover:bg-slate-50'
                    }`}
                  >
                    {metric}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Export CTA */}
        <div className="pt-3 border-t border-slate-100 dark:border-[#262626]">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5" />}
            onClick={handleExport}
            className="w-full"
          >
            Export campaign
          </Button>
        </div>

      </div>

      {/* 2. Main Content View (Overview vs Step Details) */}
      <div className="flex-1 w-full space-y-4">
        
        {/* VIEW A: OVERVIEW (Matches benchmark screenshot 3) */}
        {subView === 'overview' && (
          <div className="space-y-4">
            
            {/* Funnel Lead Process Bar (matches screenshot 3) */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Funnel lead process
                </h3>
                <span className="flex items-center gap-1 text-[11px] text-blue-600 dark:text-blue-400 font-medium cursor-pointer">
                  <HelpCircle className="w-3.5 h-3.5" /> How it's calculated
                </span>
              </div>

              <div className="grid grid-cols-6 gap-2 pt-2 border-t border-slate-100 dark:border-[#242424] text-center">
                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400">Contacted</div>
                  <div className="h-10 rounded-lg bg-blue-400 flex items-center justify-center font-bold text-white text-xs">
                    {funnel.contacted}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">{funnel.contactedPct}%</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400">Opened</div>
                  <div className="h-10 rounded-lg bg-purple-400/80 flex items-center justify-center font-bold text-white text-xs">
                    {funnel.opened}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">{funnel.openedPct}%</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400">Interaction</div>
                  <div className="h-10 rounded-lg bg-sky-400/80 flex items-center justify-center font-bold text-white text-xs">
                    {funnel.interaction}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">{funnel.interactionPct}%</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400">Answered</div>
                  <div className="h-10 rounded-lg bg-emerald-400/40 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 text-xs">
                    {funnel.answered}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">{funnel.answeredPct}%</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400">Interested</div>
                  <div className="h-10 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white text-xs">
                    {funnel.interested}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">{funnel.interestedPct}%</div>
                </div>

                <div className="space-y-1">
                  <div className="text-[10px] text-slate-400">Interrupted</div>
                  <div className="h-10 rounded-lg bg-slate-300 dark:bg-[#2A2A2A] flex items-center justify-center font-bold text-slate-600 dark:text-slate-300 text-xs">
                    {funnel.interrupted}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">{funnel.interruptedPct}%</div>
                </div>
              </div>
            </div>

            {/* Campaign Statistics Grid (matches screenshot 3) */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Campaign statistics
              </h3>

              {/* Lead Stats */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Lead stats</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">210</div>
                    <div className="text-[11px] text-slate-400">Leads in campaign</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">100% (210)</div>
                    <div className="text-[11px] text-slate-400">Leads launched</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">68.6% (144)</div>
                    <div className="text-[11px] text-slate-400">Leads reached</div>
                  </div>
                </div>
              </div>

              {/* Deliverability Stats */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Deliverability stats</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">14</div>
                    <div className="text-[11px] text-slate-400">Messages sent</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-lg font-extrabold text-slate-900 dark:text-white font-mono">0</div>
                    <div className="text-[11px] text-slate-400">Messages not sent</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">100% (14)</div>
                    <div className="text-[11px] text-slate-400">Delivered</div>
                  </div>
                </div>
              </div>

              {/* Positive Signal Stats */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">Positive signal stats</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">57.1% (8)</div>
                    <div className="text-[10px] text-slate-400">Open rate</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">0%</div>
                    <div className="text-[10px] text-slate-400">Clicked rate</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">0%</div>
                    <div className="text-[10px] text-slate-400">Replied rate</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-base font-extrabold text-emerald-600 font-mono">10.5% (6)</div>
                    <div className="text-[10px] text-slate-400">Invitation accepted</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">0</div>
                    <div className="text-[10px] text-slate-400">Booked</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200/60 dark:border-[#262626]">
                    <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">0</div>
                    <div className="text-[10px] text-slate-400">Interested</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Performing Steps Table (matches screenshot 3) */}
            <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Best performing steps
              </h3>

              <div className="flex items-center gap-1 border-b border-slate-100 dark:border-[#242424] pb-2 overflow-x-auto">
                {(['Invited', 'Sent', 'Delivered', 'Opened', 'Clicked', 'Replied'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setBestStepsTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                      bestStepsTab === tab
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-[#242424]">
                      <th className="py-2 w-12">Rank</th>
                      <th className="py-2">Type</th>
                      <th className="py-2 text-right">Sent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#222222]">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-[#1C1C1C]">
                      <td className="py-2.5 font-bold text-slate-400">#1</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <UserPlus className="w-3.5 h-3.5 text-blue-500" />
                          <span className="font-bold text-slate-800 dark:text-slate-200">Invitation's note</span>
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-mono font-bold text-slate-900 dark:text-white">63</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-[#1C1C1C]">
                      <td className="py-2.5 font-bold text-slate-400">#2</td>
                      <td className="py-2.5">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-purple-500" />
                          <span className="font-bold text-slate-800 dark:text-slate-200">Chat message</span>
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-mono font-bold text-slate-900 dark:text-white">4</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* VIEW B: STEP DETAILS CANVAS OVERLAY (Matches benchmark screenshot 4) */}
        {subView === 'step_details' && (
          <div className="p-6 rounded-3xl bg-slate-50/50 dark:bg-[#111111] border border-slate-200/80 dark:border-[#222222] min-h-[640px] flex flex-col items-center relative overflow-x-auto">
            
            <div className="w-full max-w-md flex flex-col items-center space-y-4">
              
              {/* Header Senders + Schedule Card */}
              <div className="w-full p-3 rounded-2xl bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Senders</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{campaign.accountName}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Schedule</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Default schedule</span>
                </div>
              </div>

              <div className="w-0.5 h-4 bg-slate-300 dark:bg-[#2A2A2A]" />

              {/* Step 1: Visit Profile Telemetry Overlay (matches screenshot 4) */}
              <div className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Send immediately</span>
                  <span>65 to come</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span>Visit profile</span>
                  </div>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">👥 145</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-100 dark:border-[#242424]">
                  <span>0% (0)</span>
                </div>
              </div>

              <div className="w-0.5 h-4 bg-slate-300 dark:bg-[#2A2A2A]" />

              {/* Step 2: Invitation Telemetry Overlay (matches screenshot 4) */}
              <div className="w-full p-3.5 rounded-2xl bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>Send immediately</span>
                  <span>87 to come</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                    <UserPlus className="w-4 h-4 text-emerald-500" />
                    <span>Invitation</span>
                  </div>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">👥 57</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-mono text-emerald-600 font-bold pt-1 border-t border-slate-100 dark:border-[#242424]">
                  <span>100% (57)</span>
                  <span className="text-slate-400 font-normal">0% (0)</span>
                </div>
              </div>

              <div className="w-0.5 h-4 bg-slate-300 dark:bg-[#2A2A2A]" />

              {/* Step 3: Condition Telemetry Overlay (matches screenshot 4) */}
              <div className="w-full p-3 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/40 text-center space-y-1">
                <div className="flex items-center justify-between text-[10px] text-purple-600 dark:text-purple-400">
                  <span className="font-bold">If Accepted invite within 60 days</span>
                  <span className="font-mono">👥 32</span>
                </div>
              </div>

              {/* Branches Forks: Yes vs No */}
              <div className="w-full grid grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col items-center space-y-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border border-emerald-500/20">
                    Yes 18% (6)
                  </span>

                  {/* Chat Message 1 */}
                  <div className="w-full p-2.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
                    <div className="text-[9px] text-slate-400 font-mono flex justify-between">
                      <span>Send immediately</span>
                      <span>2 to come</span>
                    </div>
                    <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span>Chat message</span>
                      <span className="font-mono text-[10px]">👥 4</span>
                    </div>
                    <div className="text-[9px] font-mono text-emerald-600 font-bold">50% (2)</div>
                  </div>

                  {/* Chat Message 2 */}
                  <div className="w-full p-2.5 rounded-xl bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
                    <div className="text-[9px] text-slate-400 font-mono flex justify-between">
                      <span>Wait for 2 days</span>
                      <span>2 to come</span>
                    </div>
                    <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span>Chat message</span>
                      <span className="font-mono text-[10px]">👥 2</span>
                    </div>
                    <div className="text-[9px] font-mono text-slate-400">0% (0)</div>
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 border border-rose-500/20">
                    No 81% (26)
                  </span>

                  <div className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#161616] border border-slate-200/60 dark:border-[#242424] text-center">
                    <div className="font-bold text-slate-400 text-xs">End</div>
                    <div className="font-mono text-slate-500 text-[10px]">28 leads</div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
