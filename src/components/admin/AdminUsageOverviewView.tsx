import React from 'react';
import { 
  BarChart3, 
  Mail, 
  PhoneCall, 
  Search, 
  Linkedin, 
  Sparkles, 
  TrendingUp, 
  Layers 
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useAdmin } from '../../context/AdminContext';

export const AdminUsageOverviewView: React.FC = () => {
  const { teams, users } = useAdmin();

  const totalEmails = teams.reduce((acc, t) => acc + t.usage.emailsSent, 0);
  const totalVoice = teams.reduce((acc, t) => acc + t.usage.voiceMinutes, 0);
  const totalLeads = teams.reduce((acc, t) => acc + t.usage.leadsSearched, 0);
  const totalLinkedIn = teams.reduce((acc, t) => acc + t.usage.linkedInActions, 0);
  const totalAi = teams.reduce((acc, t) => acc + t.usage.aiRequests, 0);

  const usageCards = [
    { title: 'Outbound Cold Emails', value: totalEmails.toLocaleString(), cap: '310,000 / mo', pct: 35, icon: Mail, color: 'bg-primary' },
    { title: '8D Verified Lead Searches', value: totalLeads.toLocaleString(), cap: '130,000 / mo', pct: 40, icon: Search, color: 'bg-primary' },
    { title: 'Voice AI SDR Minutes', value: `${totalVoice.toLocaleString()} min`, cap: '10,000 min / mo', pct: 14, icon: PhoneCall, color: 'bg-primary' },
    { title: 'LinkedIn Safe Actions', value: totalLinkedIn.toLocaleString(), cap: '62,000 / mo', pct: 31, icon: Linkedin, color: 'bg-primary' },
    { title: 'TRIXIE AI Inference Prompts', value: totalAi.toLocaleString(), cap: '200,000 / mo', pct: 26, icon: Sparkles, color: 'bg-primary' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Platform-Wide Usage & Resource Telemetry
            </h2>
            <Badge variant="primary" size="sm">Real-Time Telemetry</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Monitor real-time consumption velocity across multi-channel email pipelines, voice AI telephony, lead enrichment, and AI token engines.
          </p>
        </div>
      </div>

      {/* 2. Meters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usageCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 dark:text-slate-300">{card.title}</span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-2xl font-black text-slate-950 dark:text-white font-mono">
                  {card.value}
                </div>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>Capacity Cap: {card.cap}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">{card.pct}% used</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-[#181818] overflow-hidden">
                <div 
                  className={`h-full ${card.color} rounded-full transition-all duration-500`}
                  style={{ width: `${card.pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Team Usage Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50/80 dark:bg-[#1C1C1C] border-b border-slate-200/80 dark:border-[#2A2A2A] font-bold text-sm text-slate-950 dark:text-white">
          Workspace Consumption Breakdown
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#202020] text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Workspace</th>
                <th className="py-3 px-4">Emails Sent</th>
                <th className="py-3 px-4">Voice Minutes</th>
                <th className="py-3 px-4">Leads Found</th>
                <th className="py-3 px-4">LinkedIn Touches</th>
                <th className="py-3 px-4">AI Prompts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {teams.map((team) => (
                <tr key={team.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {team.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {team.usage.emailsSent.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {team.usage.voiceMinutes.toLocaleString()} min
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {team.usage.leadsSearched.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {team.usage.linkedInActions.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    {team.usage.aiRequests.toLocaleString()}
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
