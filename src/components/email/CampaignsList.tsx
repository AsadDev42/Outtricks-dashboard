import React, { useState } from 'react';
import { 
  Send, 
  Play, 
  Pause, 
  Copy, 
  Trash2, 
  MoreHorizontal, 
  Users, 
  Mail, 
  Flame, 
  Calendar, 
  TrendingUp, 
  Search,
  RotateCcw,
  Eye
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { useEmail, EmailCampaign } from '../../context/EmailContext';
import { CampaignDetailDrawer } from './CampaignDetailDrawer';

export interface CampaignsListProps {
  onOpenCreateCampaign: () => void;
}

export const CampaignsList: React.FC<CampaignsListProps> = ({
  onOpenCreateCampaign,
}) => {
  const {
    campaigns,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    toggleCampaignStatus,
    duplicateCampaign,
    deleteCampaign,
  } = useEmail();

  const [activeCampaignDetail, setActiveCampaignDetail] = useState<EmailCampaign | null>(null);

  const filteredCampaigns = campaigns.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesName = c.name.toLowerCase().includes(q);
      const matchesTags = c.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchesName && !matchesTags) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4 font-sans">
      
      {/* Search and Status Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search campaigns by name or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="Running">Running</option>
            <option value="Paused">Paused</option>
            <option value="Scheduled">Scheduled</option>
            <option value="Completed">Completed</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div className="text-slate-400 text-[11px] font-mono">
          Showing {filteredCampaigns.length} campaigns
        </div>
      </div>

      {/* Campaigns Table / Cards */}
      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs">
        {filteredCampaigns.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs space-y-2">
            <Send className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
            <div className="font-bold text-slate-700 dark:text-slate-300">No Campaigns Found</div>
            <p className="text-slate-400">Create your first cold email campaign or adjust your search filter.</p>
            <Button variant="primary" size="sm" onClick={onOpenCreateCampaign} className="mt-2">
              + Launch Campaign
            </Button>
          </div>
        ) : (
          filteredCampaigns.map((camp) => {
            const openRate = camp.sent > 0 ? Math.round((camp.opened / camp.sent) * 100) : 0;
            const replyRate = camp.sent > 0 ? ((camp.replied / camp.sent) * 100).toFixed(1) : '0.0';

            return (
              <div
                key={camp.id}
                onClick={() => setActiveCampaignDetail(camp)}
                className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-[#1C1C1C]/40 transition-colors cursor-pointer"
              >
                {/* Left: Campaign Info */}
                <div className="space-y-2 min-w-0 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                      {camp.name}
                    </span>
                    <Badge
                      variant={camp.status === 'Running' ? 'emerald' : camp.status === 'Paused' ? 'slate' : 'primary'}
                      size="sm"
                      dot={camp.status === 'Running'}
                    >
                      {camp.status}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-mono">
                      <Users className="w-3 h-3 text-slate-400" />
                      {camp.audienceCount.toLocaleString()} leads
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Mail className="w-3 h-3 text-emerald-500" />
                      {camp.mailboxesCount} inboxes rotating
                    </span>
                    <span>•</span>
                    <span className="text-[11px] text-slate-400 font-mono">Active {camp.lastActivity}</span>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {camp.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-400 text-[10px] font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Middle: Performance Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shrink-0">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5 min-w-[95px]">
                    <div className="text-[10px] text-slate-400">Sent / Delivered</div>
                    <div className="font-extrabold text-slate-900 dark:text-white font-mono">
                      {camp.sent} / {camp.delivered}
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5 min-w-[95px]">
                    <div className="text-[10px] text-slate-400">Open Rate</div>
                    <div className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                      {openRate}%
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5 min-w-[95px]">
                    <div className="text-[10px] text-slate-400">Reply Rate</div>
                    <div className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                      {replyRate}%
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5 min-w-[95px]">
                    <div className="text-[10px] text-slate-400">Meetings Booked</div>
                    <div className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                      {camp.meetings} Demos
                    </div>
                  </div>
                </div>

                {/* Right: Quick Action Controls */}
                <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    onClick={() => toggleCampaignStatus(camp.id)}
                    className="p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
                    title={camp.status === 'Running' ? 'Pause Campaign' : 'Resume Campaign'}
                  >
                    {camp.status === 'Running' ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}
                  </button>

                  <Dropdown
                    trigger={
                      <button
                        type="button"
                        className="p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                      >
                        <MoreHorizontal className="w-3.5 h-3.5" />
                      </button>
                    }
                    items={[
                      { label: 'View Campaign Funnel', onClick: () => setActiveCampaignDetail(camp) },
                      { label: 'Duplicate Campaign', onClick: () => duplicateCampaign(camp.id) },
                      { label: 'Delete Campaign', onClick: () => deleteCampaign(camp.id) },
                    ]}
                    placement="bottom-right"
                  />
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Campaign 360° Detail Slideover */}
      <CampaignDetailDrawer
        campaign={activeCampaignDetail}
        isOpen={!!activeCampaignDetail}
        onClose={() => setActiveCampaignDetail(null)}
      />

    </div>
  );
};
