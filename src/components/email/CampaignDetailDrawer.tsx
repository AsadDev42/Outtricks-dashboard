import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Play,
  Pause,
  Trash2,
  Copy,
  Split,
  FlaskConical
} from 'lucide-react';
import { EmailCampaign, useEmail } from '../../context/EmailContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface CampaignDetailDrawerProps {
  campaign: EmailCampaign | null;
  isOpen: boolean;
  onClose: () => void;
}

type CampaignDetailSection = 'metrics' | 'leads' | 'experiments' | 'settings';

export const CampaignDetailDrawer: React.FC<CampaignDetailDrawerProps> = ({ campaign, isOpen, onClose }) => {
  const navigate = useNavigate();
  const { toggleCampaignStatus, duplicateCampaign, deleteCampaign, emailLeads, abTests } = useEmail();
  const [activeSection, setActiveSection] = useState<CampaignDetailSection>('metrics');

  if (!isOpen || !campaign) return null;

  const campaignLeads = emailLeads.filter((lead) => lead.campaignId === campaign.id || lead.campaignName === campaign.name);
  const campaignTests = abTests.filter((test) => test.campaignName === campaign.name);

  const rate = (value: number, total: number, precision = 1) => total > 0 ? ((value / total) * 100).toFixed(precision) : '0.0';
  const openRate = rate(campaign.opened, campaign.sent);
  const clickRate = rate(campaign.clicked, campaign.sent);
  const replyRate = rate(campaign.replied, campaign.sent);
  const bounceRate = rate(campaign.bounced, campaign.sent);

  const openExperiments = () => {
    onClose();
    navigate('/email/ab-testing');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200 font-sans">
      <div className="w-full max-w-2xl bg-white dark:bg-[#161616] border-l border-slate-200 dark:border-[#2A2A2A] h-full shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-200" onClick={(e) => e.stopPropagation()}>
        <div className="p-5 border-b border-slate-100 dark:border-[#2A2A2A] space-y-3 shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-black text-xl text-slate-950 dark:text-white truncate">{campaign.name}</h2>
                <Badge variant={campaign.status === 'Running' ? 'emerald' : campaign.status === 'Paused' ? 'slate' : 'primary'} size="sm" dot={campaign.status === 'Running'}>{campaign.status}</Badge>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>Created <strong className="text-slate-700 dark:text-slate-300 font-mono">{campaign.createdAt}</strong></span>
                <span>•</span>
                <span><strong className="text-slate-700 dark:text-slate-300 font-mono">{campaign.mailboxesCount}</strong> sending inboxes</span>
                <span>•</span>
                <span><strong className="text-slate-700 dark:text-slate-300 font-mono">{campaignTests.length}</strong> A/B experiments</span>
              </div>
            </div>
            <button type="button" onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.05]" aria-label="Close campaign details">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Button variant="outline" size="sm" onClick={() => toggleCampaignStatus(campaign.id)} leftIcon={campaign.status === 'Running' ? <Pause className="w-3.5 h-3.5 text-amber-500" /> : <Play className="w-3.5 h-3.5 text-emerald-500" />}>
              {campaign.status === 'Running' ? 'Pause Campaign' : 'Resume Campaign'}
            </Button>
            <Button variant="outline" size="sm" onClick={() => { duplicateCampaign(campaign.id); onClose(); }} leftIcon={<Copy className="w-3.5 h-3.5" />}>Duplicate</Button>
            <Button variant="outline" size="sm" onClick={openExperiments} leftIcon={<Split className="w-3.5 h-3.5" />}>A/B Testing</Button>
            <Button variant="ghost" size="sm" onClick={() => { deleteCampaign(campaign.id); onClose(); }} className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40" leftIcon={<Trash2 className="w-3.5 h-3.5" />}>Delete</Button>
          </div>
        </div>

        <div className="flex border-b border-slate-100 dark:border-[#2A2A2A] px-5 gap-5 text-xs font-bold shrink-0 overflow-x-auto no-scrollbar">
          {[
            { id: 'metrics', label: 'Performance' },
            { id: 'leads', label: `Leads (${campaignLeads.length})` },
            { id: 'experiments', label: `A/B Tests (${campaignTests.length})` },
            { id: 'settings', label: 'Sending & Safety' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSection(tab.id as CampaignDetailSection)}
              className={`pb-3 pt-0.5 transition-colors cursor-pointer border-b-2 -mb-px whitespace-nowrap ${activeSection === tab.id ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-5 overflow-y-auto flex-1 space-y-5 text-xs">
          {activeSection === 'metrics' && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Sent', value: campaign.sent.toLocaleString(), detail: `${campaign.delivered.toLocaleString()} delivered` },
                  { label: 'Open Rate', value: `${openRate}%`, detail: `${campaign.opened.toLocaleString()} opens` },
                  { label: 'Reply Rate', value: `${replyRate}%`, detail: `${campaign.replied.toLocaleString()} replies` },
                  { label: 'Bounce Rate', value: `${bounceRate}%`, detail: `${campaign.bounced.toLocaleString()} bounced` },
                ].map((metric) => (
                  <div key={metric.label} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#202020] space-y-1">
                    <div className="text-[10px] text-slate-400 uppercase font-bold">{metric.label}</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white font-mono">{metric.value}</div>
                    <div className="text-[10px] text-slate-500">{metric.detail}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/30 text-center">
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{campaign.interested}</div>
                  <div className="text-[11px] font-bold text-emerald-900 dark:text-emerald-200 uppercase mt-0.5">Interested</div>
                </div>
                <div className="p-4 rounded-2xl bg-primary-muted border border-primary/20 text-center">
                  <div className="text-2xl font-black text-primary font-mono">{campaign.meetings}</div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-slate-200 uppercase mt-0.5">Meetings</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#202020] text-center">
                  <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{clickRate}%</div>
                  <div className="text-[11px] font-bold text-slate-500 uppercase mt-0.5">Click Rate</div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'leads' && (
            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">Enrolled prospects</div>
              {campaignLeads.length === 0 ? (
                <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-[#2A2A2A] text-slate-500">No lead records are currently linked to this campaign in the frontend store.</div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-white/[0.04] border border-slate-100 dark:border-[#202020] rounded-2xl overflow-hidden">
                  {campaignLeads.map((lead) => (
                    <div key={lead.id} className="p-3 flex items-center justify-between gap-3 bg-white dark:bg-[#161616]">
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 dark:text-white truncate">{lead.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono truncate">{lead.email} • {lead.company}</div>
                      </div>
                      <Badge variant={lead.status === 'Replied' ? 'emerald' : 'primary'} size="sm">{lead.status}</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === 'experiments' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Campaign experiments</div>
                  <p className="text-[11px] text-slate-500 mt-0.5">Compare one controlled copy variable at a time and optimize for replies, not vanity metrics.</p>
                </div>
                <Button variant="primary" size="sm" onClick={openExperiments} leftIcon={<FlaskConical className="w-3.5 h-3.5" />}>Manage Tests</Button>
              </div>

              {campaignTests.length === 0 ? (
                <button type="button" onClick={openExperiments} className="w-full p-6 rounded-2xl border border-dashed border-slate-300 dark:border-[#333] text-left hover:bg-slate-50 dark:hover:bg-white/[0.02] cursor-pointer">
                  <div className="font-bold text-slate-900 dark:text-white">No A/B test attached</div>
                  <div className="text-[11px] text-slate-500 mt-1">Create a 50/50 subject-line experiment for this campaign.</div>
                </button>
              ) : (
                <div className="space-y-2">
                  {campaignTests.map((test) => (
                    <div key={test.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-[#202020] space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-extrabold text-slate-900 dark:text-white">{test.name}</span>
                        <Badge variant={test.status === 'Active' ? 'primary' : 'slate'} size="sm">{test.status}</Badge>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className={`p-2.5 rounded-xl border ${test.winner === 'A' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' : 'border-slate-200 dark:border-[#2A2A2A]'}`}><strong>A:</strong> {test.variantA.subject}</div>
                        <div className={`p-2.5 rounded-xl border ${test.winner === 'B' ? 'border-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' : 'border-slate-200 dark:border-[#2A2A2A]'}`}><strong>B:</strong> {test.variantB.subject}</div>
                      </div>
                      <div className="text-[10px] text-slate-500">{test.winner ? `Winner: Variant ${test.winner}` : 'Winner pending'}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#202020] space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Mailbox rotation</div>
                <p className="text-slate-500 leading-relaxed">This campaign is assigned to {campaign.mailboxesCount} sender {campaign.mailboxesCount === 1 ? 'mailbox' : 'mailboxes'}. Detailed rotation, schedule, throttling and stop-on-reply configuration is defined during campaign setup.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200/80 dark:border-[#202020] space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Safety posture</div>
                <p className="text-slate-500 leading-relaxed">Use stop-on-reply, suppression checks, verified lead inputs, sender-health checks and deliverability monitoring before scaling volume.</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-end shrink-0">
          <Button variant="primary" size="sm" onClick={onClose}>Close Panel</Button>
        </div>
      </div>
    </div>
  );
};
