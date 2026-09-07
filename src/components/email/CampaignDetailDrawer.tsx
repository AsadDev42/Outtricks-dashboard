import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Play, 
  Pause, 
  Trash2, 
  Copy, 
  Users, 
  Mail, 
  Flame, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Settings,
  Layers
} from 'lucide-react';
import { EmailCampaign, useEmail } from '../../context/EmailContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

interface CampaignDetailDrawerProps {
  campaign: EmailCampaign | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CampaignDetailDrawer: React.FC<CampaignDetailDrawerProps> = ({
  campaign,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !campaign) return null;

  const { toggleCampaignStatus, duplicateCampaign, deleteCampaign, emailLeads } = useEmail();
  const { success, info } = useToast();
  const [activeSection, setActiveSection] = useState<'metrics' | 'leads' | 'settings'>('metrics');

  const campaignLeads = emailLeads.filter((l) => l.campaignId === campaign.id);

  const openRate = campaign.sent > 0 ? ((campaign.opened / campaign.sent) * 100).toFixed(1) : '0.0';
  const clickRate = campaign.sent > 0 ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) : '0.0';
  const replyRate = campaign.sent > 0 ? ((campaign.replied / campaign.sent) * 100).toFixed(1) : '0.0';
  const bounceRate = campaign.sent > 0 ? ((campaign.bounced / campaign.sent) * 100).toFixed(1) : '0.0';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200 font-sans">
      <div 
        className="w-full max-w-2xl bg-white dark:bg-[#161616] border-l border-slate-200 dark:border-[#2A2A2A] h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#2A2A2A] space-y-3 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-black text-xl text-slate-950 dark:text-white truncate">
                  {campaign.name}
                </h2>
                <Badge
                  variant={campaign.status === 'Running' ? 'emerald' : campaign.status === 'Paused' ? 'slate' : 'blue'}
                  size="sm"
                  dot={campaign.status === 'Running'}
                >
                  {campaign.status}
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Created: <strong className="text-slate-700 dark:text-slate-300 font-mono">{campaign.createdAt}</strong></span>
                <span>•</span>
                <span>Rotating Inboxes: <strong className="text-slate-700 dark:text-slate-300 font-mono">{campaign.mailboxesCount} sender pools</strong></span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleCampaignStatus(campaign.id)}
              className="text-xs font-semibold gap-1.5"
            >
              {campaign.status === 'Running' ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-500" />
                  <span>Pause Campaign</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Resume Campaign</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                duplicateCampaign(campaign.id);
                onClose();
              }}
              className="text-xs font-semibold gap-1.5"
            >
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Duplicate</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                deleteCampaign(campaign.id);
                onClose();
              }}
              className="text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 dark:border-[#2A2A2A] px-6 gap-6 text-xs font-bold shrink-0">
          {[
            { id: 'metrics', label: 'Funnel & Telemetry' },
            { id: 'leads', label: `Enrolled Leads (${campaignLeads.length})` },
            { id: 'settings', label: 'Rotation & Settings' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id as any)}
              className={`pb-3 transition-colors cursor-pointer border-b-2 -mb-px ${
                activeSection === tab.id
                  ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs">
          
          {activeSection === 'metrics' && (
            <div className="space-y-6">
              {/* Funnel Telemetry Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#202020] space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Sent / Delivered</div>
                  <div className="text-xl font-black text-slate-900 dark:text-white font-mono">{campaign.sent} / {campaign.delivered}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">99.4% Delivery SLA</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#202020] space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Open Rate</div>
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{openRate}%</div>
                  <div className="text-[10px] text-slate-500">{campaign.opened} opens tracked</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#202020] space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Click Rate</div>
                  <div className="text-xl font-black text-slate-900 dark:text-white font-mono">{clickRate}%</div>
                  <div className="text-[10px] text-slate-500">{campaign.clicked} links clicked</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#202020] space-y-1">
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Reply Rate</div>
                  <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{replyRate}%</div>
                  <div className="text-[10px] text-slate-500">{campaign.replied} prospect replies</div>
                </div>
              </div>

              {/* Bottom Funnel */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-center">
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{campaign.interested}</div>
                  <div className="text-[11px] font-bold text-emerald-900 dark:text-emerald-200 uppercase mt-0.5">Interested Leads</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-white/[0.04] border border-emerald-500/20 text-center">
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{campaign.meetings}</div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-emerald-200 uppercase mt-0.5">Meetings Booked</div>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40 text-center">
                  <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">{bounceRate}%</div>
                  <div className="text-[11px] font-bold text-rose-900 dark:text-rose-200 uppercase mt-0.5">Bounce Rate ({campaign.bounced})</div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'leads' && (
            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">Enrolled Prospect Recipients</div>
              <div className="divide-y divide-slate-100 dark:divide-white/[0.04] border border-slate-100 dark:border-[#202020] rounded-2xl overflow-hidden">
                {campaignLeads.map((l) => (
                  <div key={l.id} className="p-3 flex items-center justify-between gap-3 bg-white dark:bg-[#161616]">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{l.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{l.email} • {l.company}</div>
                    </div>
                    <Badge variant={l.status === 'Replied' ? 'emerald' : 'blue'} size="sm">
                      {l.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#202020] space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Sender Mailbox Rotation Strategy</div>
                <p className="text-slate-500 leading-relaxed">
                  Campaign automatically distributes daily volume across {campaign.mailboxesCount} sender pools with staggered timing (3-7 min delays) to maintain 100% domain deliverability.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-end shrink-0">
          <Button variant="primary" size="sm" onClick={onClose} className="font-bold">
            Close Panel
          </Button>
        </div>
      </div>
    </div>
  );
};
