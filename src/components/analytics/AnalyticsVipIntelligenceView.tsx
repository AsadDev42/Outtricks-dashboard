import React, { useState } from 'react';
import { 
  Crown, 
  TrendingUp, 
  Download, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Building2, 
  Zap, 
  ShieldCheck, 
  Users,
  Target,
  ArrowUpRight,
  Radio
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAnalytics } from '../../context/AnalyticsContext';
import { MetricCard } from './shared/MetricCard';
import { 
  formatNumber, 
  formatCurrency, 
  formatCompactNumber, 
  formatPercentage, 
  formatDate 
} from '../../utils/formatters';

export const AnalyticsVipIntelligenceView: React.FC = () => {
  const { vipAccounts, tricksyInsights, exportReport } = useAnalytics();
  const [selectedVip, setSelectedVip] = useState<string | null>(null);

  // VIP Intelligence Signals (Part 17)
  const intelligenceSignals = [
    { id: 'sig-1', category: 'Revenue Velocity', title: 'Revenue expanded +32.0% this period', type: 'positive', desc: 'Closed won revenue from enterprise tiers accelerated from $139K to $184K.' },
    { id: 'sig-2', category: 'Channel Alpha', title: 'Voice AI SDR outperforming benchmark by +34%', type: 'positive', desc: 'Voice connects converted into booked meetings at a 38.2% rate.' },
    { id: 'sig-3', category: 'Campaign Risk Signal', title: 'Shopify E-commerce campaign reply rate dropped 7%', type: 'warning', desc: 'Subject line fatigue detected in batch sequence #3. Recommend A/B refresh.' },
    { id: 'sig-4', category: 'Credit Runway', title: 'Credit consumption rate increased +18%', type: 'neutral', desc: '8D Lead Finder bulk exports expanded to 8,400 queries. Ledger runway is 18 days.' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              VIP Executive Intelligence & High-Value Signals
            </h2>
            <Badge variant="amber" size="sm">Tier-1 Signal Feed</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Algorithmic signal detection, cross-module intent anomalies, and high-ticket enterprise buyer tracking.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => exportReport('CSV')}
          leftIcon={<Download className="w-3.5 h-3.5" />}
        >
          Export Intelligence CSV
        </Button>
      </div>

      {/* 2. Top Executive Signal Scorecard */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <MetricCard
          title="Monitored VIP Accounts"
          value="48 Orgs"
          supportingLabel="Tier-1 Enterprise radar"
        />
        <MetricCard
          title="High Intent Buyers"
          value="14 Accounts"
          change="+3 This week"
          isPositive={true}
          supportingLabel="Intent score > 88"
        />
        <MetricCard
          title="VIP Pipeline Value"
          value={340000}
          type="currency"
          change="+28.5%"
          isPositive={true}
          supportingLabel="High-ticket deals"
        />
        <MetricCard
          title="Actionable Opportunities"
          value="6 Signals"
          supportingLabel="Ready for immediate SDR touch"
        />
      </div>

      {/* 3. Executive Intelligence Signals Grid (Part 17) */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-500" />
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Deterministic Platform Signals & Trends
            </h3>
          </div>
          <Badge variant="emerald" size="sm">Real-Time ML Ingest</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {intelligenceSignals.map((sig) => (
            <div
              key={sig.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2 text-xs flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono font-bold uppercase">{sig.category}</span>
                  <Badge variant={sig.type === 'positive' ? 'emerald' : sig.type === 'warning' ? 'rose' : 'amber'} size="sm">
                    {sig.type === 'positive' ? 'Growth Signal' : sig.type === 'warning' ? 'Risk Signal' : 'Telemetry Note'}
                  </Badge>
                </div>
                <div className="font-extrabold text-slate-950 dark:text-white text-xs">{sig.title}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{sig.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. High-Value Target Accounts Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
          <div>
            <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
              Target Enterprise Intent Matrix
            </h3>
            <p className="text-xs text-slate-500">
              High-value organizations showing intent signals and recommended sequence execution.
            </p>
          </div>
          <Badge variant="amber" size="sm">{(vipAccounts || []).length} High-Intent Accounts</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans min-w-[700px]">
            <thead>
              <tr className="text-slate-400 font-mono text-[11px] border-b border-slate-100 dark:border-[#202020]">
                <th className="pb-3">Enterprise Account</th>
                <th className="pb-3">Executive Contact</th>
                <th className="pb-3">Deal Potential</th>
                <th className="pb-3">Intent Score</th>
                <th className="pb-3">Key Signals</th>
                <th className="pb-3">Recommended SDR Action</th>
                <th className="pb-3 text-right">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] font-mono">
              {(vipAccounts || []).map((vip) => (
                <tr key={vip.id} className="hover:bg-slate-50/60 dark:hover:bg-[#1C1C1C] transition-colors">
                  <td className="py-3.5 font-bold font-sans text-slate-900 dark:text-white">
                    <div>{vip.companyName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{vip.domain}</div>
                  </td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300 font-sans">{vip.executiveContact}</td>
                  <td className="py-3.5 font-extrabold text-emerald-600 dark:text-emerald-400">{vip.dealPotential}</td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 font-bold">
                      {vip.intentScore}/100
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-500 font-sans text-[11px]">
                    {(vip.signals || []).join(' • ')}
                  </td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300 font-sans">{vip.recommendedAction}</td>
                  <td className="py-3.5 text-right font-sans">
                    <Badge variant={vip.priority === 'Critical' ? 'rose' : 'amber'} size="sm">
                      {vip.priority}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
