import React from 'react';
import { Settings, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useWorkflows } from '../../context/WorkflowsContext';

export const WorkflowIntegrationsView: React.FC = () => {
  const { integrations } = useWorkflows();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Connected App Integrations ({integrations.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Native protocol adapters for email servers, LinkedIn cloud proxies, WebRTC dialers, and Upwork APIs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((int) => (
          <div key={int.id} className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-950 dark:text-white">{int.name}</span>
                <Badge variant="emerald" size="sm">{int.status}</Badge>
              </div>

              <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">
                Account: {int.account}
              </p>

              <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px]">
                <span>Auth: {int.authType}</span>
                <span>•</span>
                <span>{int.triggersCount} Triggers</span>
                <span>•</span>
                <span>{int.actionsCount} Actions</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Ping: {int.lastPing}</span>
              <span className="text-emerald-500 font-bold">✓ Active Session</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
