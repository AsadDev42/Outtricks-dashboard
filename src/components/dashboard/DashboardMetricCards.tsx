import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Mail, 
  PhoneCall, 
  Users, 
  ShieldCheck, 
  Linkedin, 
  ArrowUpRight, 
  Sparkles,
  Info,
  ChevronRight 
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Tooltip } from '../ui/Tooltip';
import { Modal } from '../ui/Modal';
import { GsapStagger } from '../ui/GsapStagger';

export interface DashboardMetricCardsProps {
  onNavigateTab: (tabId: string) => void;
}

interface MetricCardItem {
  id: string;
  title: string;
  value: string;
  unit?: string;
  change: string;
  isPositive: boolean;
  comparisonText: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
  targetTab: string;
  tooltip: string;
  breakdown: { label: string; value: string }[];
}

export const DashboardMetricCards: React.FC<DashboardMetricCardsProps> = ({ onNavigateTab }) => {
  const [activeModalMetric, setActiveModalMetric] = useState<MetricCardItem | null>(null);

  const metrics: MetricCardItem[] = [
    {
      id: 'pipeline',
      title: 'Active Pipeline Value',
      value: '$573,000',
      change: '+14.8%',
      isPositive: true,
      comparisonText: 'vs. previous 7 days',
      icon: DollarSign,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      targetTab: 'pipeline',
      tooltip: 'Total unweighted sum of active deals currently in discovery, demo, and proposal stages.',
      breakdown: [
        { label: 'Discovery Stage', value: '$140,000 (8 Deals)' },
        { label: 'Demo Completed', value: '$225,000 (6 Deals)' },
        { label: 'Proposal Sent', value: '$208,000 (4 Deals)' },
        { label: 'Weighted Expected ARR', value: '$345,600' },
      ],
    },
    {
      id: 'reply_rate',
      title: 'Average Reply Rate',
      value: '11.8%',
      change: '+2.4%',
      isPositive: true,
      comparisonText: 'across 24 inboxes',
      icon: Mail,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      targetTab: 'inbox',
      tooltip: 'Real-time positive response rate across all rotating cold email pools with dynamic spintax.',
      breakdown: [
        { label: 'Total Dispatched', value: '4,120 emails' },
        { label: 'Primary Inbox Open Rate', value: '74.2%' },
        { label: 'Positive Buying Intent', value: '88.6%' },
        { label: 'Meetings Booked via Email', value: '28 demos' },
      ],
    },
    {
      id: 'voice_sdr',
      title: 'Voice AI SDR Calls',
      value: '4 Active',
      change: '+100%',
      isPositive: true,
      comparisonText: '2 demos booked today',
      icon: PhoneCall,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      targetTab: 'voice',
      tooltip: 'Sub-400ms WebRTC conversational voice agents currently qualifying inbound & outbound leads.',
      breakdown: [
        { label: 'Median Response Latency', value: '0.38 seconds' },
        { label: 'Average Call Duration', value: '2m 44s' },
        { label: 'Qualification Accuracy', value: '94.8%' },
        { label: 'Calendar Direct Bookings', value: '14 this week' },
      ],
    },
    {
      id: 'lead_sourcing',
      title: '8D Verified Contacts',
      value: '14,280',
      change: '+3,420',
      isPositive: true,
      comparisonText: '99.4% deliverable',
      icon: Users,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      targetTab: 'leads',
      tooltip: 'Verified contacts discovered across 480M+ global profiles with real-time MX validation.',
      breakdown: [
        { label: 'Corporate Work Emails', value: '14,280 (100%)' },
        { label: 'Direct Mobile Numbers', value: '8,420 (59%)' },
        { label: 'Contact Match Rate', value: '91.4%' },
        { label: 'Zero-Bounce Protection', value: 'Active' },
      ],
    },
    {
      id: 'deliverability',
      title: 'Deliverability Sentinel',
      value: '100%',
      change: 'Optimal',
      isPositive: true,
      comparisonText: '24 mailboxes green',
      icon: ShieldCheck,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      targetTab: 'command',
      tooltip: 'Domain reputation monitor verifying SPF, DKIM 2048-bit, DMARC Reject, and blacklist health.',
      breakdown: [
        { label: 'SPF & DKIM Alignment', value: '100% Passed' },
        { label: 'DMARC Enforcement', value: 'p=reject' },
        { label: 'Custom Tracking CNAME', value: 'Verified' },
        { label: 'Blacklist Status', value: '0 / 120 lists clean' },
      ],
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Safe Invites',
      value: '840 Sent',
      change: '42.4%',
      isPositive: true,
      comparisonText: 'acceptance rate',
      icon: Linkedin,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      targetTab: 'flow',
      tooltip: 'Official cloud API touches with dedicated residential proxies and human rate pacing.',
      breakdown: [
        { label: 'Profile Views', value: '1,420' },
        { label: 'Connection Requests', value: '840' },
        { label: 'Accepted Invites', value: '356 (42.4%)' },
        { label: 'Sequence DMs Dispatched', value: '290' },
      ],
    },
  ];

  return (
    <>
      <GsapStagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 font-sans" stagger={0.05} duration={0.4}>
        {metrics.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.id}
              onClick={() => onNavigateTab(card.targetTab)}
              className="group relative p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3"
            >
              
              {/* Card Header: Icon + Tooltip */}
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex items-center gap-1.5">
                  <Tooltip content={card.tooltip} placement="top">
                    <span className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                      <Info className="w-3.5 h-3.5" />
                    </span>
                  </Tooltip>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-500 transition-colors">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Body: Metric & Title */}
              <div className="space-y-0.5 min-w-0">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 truncate">
                  {card.title}
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight font-sans">
                  {card.value}
                </div>
              </div>

              {/* Card Footer: Trend & Comparison */}
              <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-[11px] font-medium">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" />
                  {card.change}
                </span>
                <span className="text-slate-400 truncate ml-1 text-[10px]">
                  {card.comparisonText}
                </span>
              </div>

            </div>
          );
        })}
      </GsapStagger>

      {/* Metric Detail Modal */}
      {activeModalMetric && (
        <Modal
          isOpen={!!activeModalMetric}
          onClose={() => setActiveModalMetric(null)}
          title={activeModalMetric.title}
          description={`Comprehensive telemetry breakdown and performance attribution for ${activeModalMetric.title.toLowerCase()}.`}
          size="sm"
        >
          <div className="space-y-4 font-sans">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">Current Metric</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white mt-0.5 font-sans">
                  {activeModalMetric.value}
                </div>
              </div>
              <Badge variant="emerald" size="md">
                {activeModalMetric.change}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Telemetry Breakdown
              </div>
              <div className="divide-y divide-slate-100 dark:divide-white/[0.04] border border-slate-200/80 dark:border-[#202020] rounded-2xl overflow-hidden bg-white dark:bg-[#161616]">
                {activeModalMetric.breakdown.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300 font-medium">{item.label}</span>
                    <span className="font-bold text-slate-950 dark:text-white font-mono">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  const target = activeModalMetric.targetTab;
                  setActiveModalMetric(null);
                  onNavigateTab(target);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Open in Engine View</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};
