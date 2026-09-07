import React from 'react';
import { Settings, ShieldCheck, CheckCircle2, Award, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUpwork } from '../../context/UpworkContext';

export const UpworkAccountsView: React.FC = () => {
  const { accounts } = useUpwork();
  const acc = accounts[0];

  return (
    <div className="space-y-4 font-sans">
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Connected Upwork OAuth Accounts ({accounts.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Official Upwork GraphQL API integration with automated OAuth token rotation and client messaging sync.
        </p>
      </div>

      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={acc.avatar} alt={acc.name} className="w-12 h-12 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-950 dark:text-white">{acc.name}</span>
                <Badge variant="emerald" size="sm">{acc.status}</Badge>
              </div>
              <div className="text-xs text-slate-500">{acc.title}</div>
            </div>
          </div>

          <div className="text-right font-mono text-xs">
            <div className="text-emerald-600 font-bold">{acc.topRatedBadge}</div>
            <div className="text-slate-400">JSS: {acc.jss}% • {acc.totalEarnings}</div>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>OAuth 2.0 API connection verified. Automated proposal submission and Master Inbox sync active.</span>
        </div>
      </div>
    </div>
  );
};
