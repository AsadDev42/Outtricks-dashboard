import React, { useState } from 'react';
import { Zap, Plus, ArrowRight, Clock } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUpwork } from '../../context/UpworkContext';
import { UpworkExecutionLogsView } from './UpworkExecutionLogsView';

export type AutomationSubTab = 'rules' | 'logs';

export interface UpworkAutomationRulesViewProps {
  onOpenCreateRule: () => void;
  initialTab?: AutomationSubTab;
}

export const UpworkAutomationRulesView: React.FC<UpworkAutomationRulesViewProps> = ({
  onOpenCreateRule,
  initialTab = 'rules',
}) => {
  const { automationRules, toggleAutomationRule, executionLogs } = useUpwork();
  const [activeTab, setActiveTab] = useState<AutomationSubTab>(initialTab);

  return (
    <div className="space-y-4 font-sans">
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
                Autonomous Bidding & Trigger Automation
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Cloud background workers auto-drafting and dispatching proposals for high-intent matching jobs.
            </p>
          </div>

          {activeTab === 'rules' && (
            <Button variant="primary" size="sm" onClick={onOpenCreateRule} leftIcon={<Plus className="w-3.5 h-3.5" />}>
              New Rule
            </Button>
          )}
        </div>

        {/* Sub-Tabs: [ Automation Rules ] [ Execution Logs ] */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-t border-slate-100 dark:border-[#222222] pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('rules')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-slate-50 dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#252525] border border-slate-200/60 dark:border-[#262626]'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Automation Rules</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
              activeTab === 'rules' ? 'bg-black/25 text-white font-bold' : 'bg-slate-200 dark:bg-[#2E2E2E] text-slate-700 dark:text-slate-300'
            }`}>
              {automationRules.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 shrink-0 cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-slate-50 dark:bg-[#1C1C1C] text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-[#252525] border border-slate-200/60 dark:border-[#262626]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Execution Logs</span>
            <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
              activeTab === 'logs' ? 'bg-black/25 text-white font-bold' : 'bg-slate-200 dark:bg-[#2E2E2E] text-slate-700 dark:text-slate-300'
            }`}>
              {executionLogs.length}
            </span>
          </button>
        </div>
      </div>

      {activeTab === 'rules' ? (
        <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
          {automationRules.map((rule) => (
            <div key={rule.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">{rule.name}</span>
                  <Badge variant={rule.status === 'Active' ? 'emerald' : 'slate'} size="sm">{rule.status}</Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-slate-500 font-mono text-[11px]">
                  <span className="text-primary font-bold">When: {rule.trigger}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="text-slate-900 dark:text-white font-bold">{rule.action}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Condition: {rule.condition}</div>
              </div>

              <Button variant={rule.status === 'Active' ? 'outline' : 'primary'} size="sm" onClick={() => toggleAutomationRule(rule.id)}>
                {rule.status === 'Active' ? 'Pause Rule' : 'Activate'}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <UpworkExecutionLogsView />
      )}
    </div>
  );
};
