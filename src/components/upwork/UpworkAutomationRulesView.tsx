import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  ArrowRight, 
  Clock, 
  Workflow, 
  AlertOctagon, 
  ShieldCheck, 
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Radio
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUpwork } from '../../context/UpworkContext';
import { UpworkExecutionLogsView } from './UpworkExecutionLogsView';
import { MultiChannelCanvasModal } from '../workflows/MultiChannelCanvasModal';

export type AutomationSubTab = 'rules' | 'logs';

export interface UpworkAutomationRulesViewProps {
  onOpenCreateRule: () => void;
  initialTab?: AutomationSubTab;
}

export const UpworkAutomationRulesView: React.FC<UpworkAutomationRulesViewProps> = ({
  onOpenCreateRule,
  initialTab = 'rules',
}) => {
  const { 
    automationRules, 
    toggleAutomationRule, 
    executionLogs, 
    isEmergencyPaused, 
    emergencyPauseReason,
    toggleEmergencyPause,
    todayConnectsUsed,
    todayConnectsBudget,
    resetTodayConnects
  } = useUpwork();

  const [activeTab, setActiveTab] = useState<AutomationSubTab>(initialTab);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);

  return (
    <div className="space-y-5 font-sans">

      {/* EMERGENCY SAFETY & GUARDRAILS PANEL */}
      <div className={`p-5 sm:p-6 rounded-3xl border transition-all ${
        isEmergencyPaused 
          ? 'bg-rose-500/10 border-rose-500/40 text-rose-950 dark:text-rose-100 shadow-lg ring-2 ring-rose-500/20' 
          : 'bg-white dark:bg-[#161616] border-slate-200/80 dark:border-[#2A2A2A] shadow-xs'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                isEmergencyPaused ? 'bg-rose-600 text-white' : 'bg-emerald-500/10 text-emerald-500'
              }`}>
                {isEmergencyPaused ? <AlertOctagon className="w-5 h-5 animate-pulse" /> : <ShieldCheck className="w-5 h-5" />}
              </div>
              <h3 className="font-extrabold text-base sm:text-lg">
                {isEmergencyPaused ? 'Emergency Bidding Kill Switch Active' : 'Autonomous Safety Guardrails Active'}
              </h3>
              <Badge variant={isEmergencyPaused ? 'rose' : 'emerald'} size="sm">
                {isEmergencyPaused ? 'EXECUTION HALTED' : 'ALL SYSTEMS SAFE'}
              </Badge>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isEmergencyPaused 
                ? (emergencyPauseReason || 'All automated Upwork bidding, proposal dispatching, and background scans have been immediately frozen.')
                : 'Hard safety boundaries protecting your Upwork account standing, Connects consumption, and client response rate.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {/* Daily Connects Safety Meter */}
            <div className="px-3.5 py-2 rounded-2xl bg-slate-50 dark:bg-[#202020] border border-slate-200/60 dark:border-[#2A2A2A] text-xs font-mono">
              <div className="text-[10px] text-slate-400 flex items-center justify-between gap-2">
                <span>Daily Connects Meter</span>
                <button 
                  type="button" 
                  onClick={resetTodayConnects}
                  className="text-primary hover:underline font-bold cursor-pointer"
                  title="Reset daily usage counter"
                >
                  Reset
                </button>
              </div>
              <div className="font-bold text-slate-900 dark:text-white mt-0.5">
                {todayConnectsUsed} / {todayConnectsBudget} Connects
              </div>
            </div>

            {/* Kill Switch Toggle Button */}
            <button
              type="button"
              onClick={() => toggleEmergencyPause()}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 cursor-pointer transition-all shadow-xs ${
                isEmergencyPaused
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-rose-600 hover:bg-rose-700 text-white'
              }`}
            >
              <AlertOctagon className="w-4 h-4" />
              <span>{isEmergencyPaused ? 'Resume Automated Bidding' : 'Emergency Kill Switch'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Automation Hub Header */}
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
              Cloud background workers auto-drafting and dispatching proposals for high-intent matching opportunities.
            </p>
          </div>

          {activeTab === 'rules' && (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsCanvasOpen(true)} 
                leftIcon={<Workflow className="w-3.5 h-3.5 text-orange-500" />}
                className="border-orange-500/30 hover:border-orange-500 text-orange-600 dark:text-orange-400 bg-orange-500/5 hover:bg-orange-500/10 font-bold"
              >
                Visual Canvas (Lemlist Style)
              </Button>
              <Button variant="primary" size="sm" onClick={onOpenCreateRule} leftIcon={<Plus className="w-3.5 h-3.5" />}>
                New Rule
              </Button>
            </div>
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
            <span>Execution Logs & Skip Reasons</span>
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
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    {rule.name}
                  </span>
                  <Badge variant={rule.status === 'Active' ? 'emerald' : 'slate'} size="sm">
                    {rule.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono flex-wrap">
                  <span className="bg-slate-100 dark:bg-[#222222] px-2 py-0.5 rounded-md text-slate-700 dark:text-slate-300 font-bold">
                    IF: {rule.trigger}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="bg-slate-100 dark:bg-[#222222] px-2 py-0.5 rounded-md text-slate-700 dark:text-slate-300 font-bold">
                    CONDITION: {rule.condition}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="bg-primary-muted px-2 py-0.5 rounded-md text-primary font-bold">
                    THEN: {rule.action}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleAutomationRule(rule.id)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    rule.status === 'Active'
                      ? 'border-amber-500/30 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30'
                      : 'border-emerald-500/30 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
                  }`}
                >
                  {rule.status === 'Active' ? 'Pause Rule' : 'Activate Rule'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <UpworkExecutionLogsView />
      )}

      {/* Visual Canvas Modal */}
      <MultiChannelCanvasModal
        isOpen={isCanvasOpen}
        onClose={() => setIsCanvasOpen(false)}
        customChannelMode="upwork"
        title="Upwork Visual Automation Canvas (Lemlist Style)"
      />

    </div>
  );
};
