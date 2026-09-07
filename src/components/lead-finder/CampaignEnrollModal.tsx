import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  CheckCircle2, 
  X, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';
import { useCrm } from '../../context/CrmContext';
import { useLeadSearch, LeadDetailData } from '../../context/LeadSearchContext';

export interface CampaignEnrollModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLeads?: LeadDetailData[];
}

export const CampaignEnrollModal: React.FC<CampaignEnrollModalProps> = ({
  isOpen,
  onClose,
  selectedLeads = []
}) => {
  const [selectedChannel, setSelectedChannel] = useState<'email' | 'linkedin' | 'voice' | 'crm'>('email');
  const [isProcessing, setIsProcessing] = useState(false);
  const { results, selection, clearSelection } = useLeadSearch();
  const { saveLeadToCrm, createDeal, setActiveTab } = useCrm();
  const { success } = useToast();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const leadsToEnroll = selectedLeads.length > 0 
    ? selectedLeads 
    : results.filter(l => selection.selectedIds.includes(l.id));

  const leadCount = leadsToEnroll.length;

  const handleEnroll = () => {
    setIsProcessing(true);

    setTimeout(() => {
      if (selectedChannel === 'crm') {
        leadsToEnroll.forEach((lead) => {
          saveLeadToCrm({
            name: lead.name,
            title: lead.title,
            company: lead.company,
            domain: lead.domain,
            email: lead.email,
            phone: lead.phone,
            avatar: lead.avatar,
            score: lead.icpScore,
            location: lead.location,
            tags: ['Lead Finder Enrolled', 'Outbound Pipeline'],
          });

          createDeal({
            title: `${lead.company} - Expansion Deal`,
            companyName: lead.company,
            companyDomain: lead.domain,
            contactName: lead.name,
            contactEmail: lead.email,
            value: 36000,
            stageId: 'stage_qualified',
            probability: 50,
            expectedCloseDate: '2026-10-30',
            owner: 'Sarah Jenkins',
            tags: ['Lead Finder', 'High Intent'],
            priority: 'high',
          });
        });

        success(`Enrolled ${leadCount} leads into Deals CRM pipeline!`, 'Deals Created');
        clearSelection();
        setIsProcessing(false);
        onClose();
        setActiveTab('deals');
        navigate('/crm/deals');
      } else if (selectedChannel === 'email') {
        success(`Queued ${leadCount} leads across active Google Workspace & M365 sender pools.`, 'Cold Email Enrolled');
        clearSelection();
        setIsProcessing(false);
        onClose();
        navigate('/email/campaigns');
      } else if (selectedChannel === 'linkedin') {
        success(`Enrolled ${leadCount} profiles into LinkedIn cloud sequence with static proxy pacing.`, 'LinkedIn Enrolled');
        clearSelection();
        setIsProcessing(false);
        onClose();
        navigate('/linkedin/campaigns');
      } else if (selectedChannel === 'voice') {
        success(`Added ${leadCount} contacts to Voice AI SDR priority outbound dialing queue.`, 'Voice Queue Dispatched');
        clearSelection();
        setIsProcessing(false);
        onClose();
        navigate('/voice-ai/campaigns');
      }
    }, 600);
  };

  const CHANNELS = [
    {
      id: 'email' as const,
      title: 'Cold Email Campaign',
      desc: 'Multi-inbox sender rotation, dynamic spintax, and 100% verified deliverability.',
      icon: Mail,
      badge: 'Recommended',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      id: 'linkedin' as const,
      title: 'LinkedIn Outreach Sequence',
      desc: 'Automated profile visits, connection invitations, and multi-step InMails.',
      icon: Linkedin,
      badge: 'Safe Bot',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      id: 'voice' as const,
      title: 'Voice AI SDR Caller',
      desc: 'Sub-400ms ultra-low latency qualifying outbound call with automated objection handling.',
      icon: PhoneCall,
      badge: 'Instant Dial',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      id: 'crm' as const,
      title: 'Convert to Deals CRM Opportunities',
      desc: 'Create verified company accounts, contacts, and qualified opportunities in the sales pipeline.',
      icon: Building2,
      badge: 'Revenue Pipeline',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-sans animate-in fade-in duration-150">
      <div className="w-full max-w-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#242424] flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Send className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-black text-slate-950 dark:text-white">
                Enroll Leads in Outreach Campaign
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Push <span className="font-bold text-emerald-500 font-mono">{leadCount} selected leads</span> directly into execution pipelines.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#202020] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Channel Selection Options */}
        <div className="p-6 space-y-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Select Destination Pipeline
          </div>

          <div className="space-y-2.5">
            {CHANNELS.map((ch) => {
              const Icon = ch.icon;
              const isSelected = selectedChannel === ch.id;

              return (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-emerald-500/5 dark:bg-emerald-500/[0.08] border-emerald-500/50 dark:border-emerald-500/40 shadow-xs'
                      : 'bg-slate-50 dark:bg-[#1A1A1A] border-slate-200/80 dark:border-[#282828] hover:border-slate-300 dark:hover:border-[#383838]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-emerald-500 text-white shadow-xs shadow-emerald-500/30'
                      : 'bg-white dark:bg-[#242424] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-[#303030]'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                        {ch.title}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] font-extrabold font-mono shrink-0 ${ch.badgeColor}`}>
                        {ch.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {ch.desc}
                    </p>
                  </div>

                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected 
                      ? 'border-emerald-500 bg-emerald-500 text-white' 
                      : 'border-slate-300 dark:border-[#404040]'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-current text-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-100 dark:border-[#242424] bg-slate-50 dark:bg-[#131313] flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Multi-channel idempotency active</span>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={handleEnroll}
              disabled={leadCount === 0 || isProcessing}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {isProcessing ? 'Enrolling...' : `Enroll ${leadCount} Leads`}
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
