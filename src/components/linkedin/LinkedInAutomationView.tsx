import React, { useState } from 'react';
import { 
  Zap, 
  Plus, 
  Play, 
  Pause, 
  Trash2, 
  Copy, 
  Edit3, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Workflow, 
  Sliders, 
  Send, 
  Eye, 
  MessageSquare,
  X,
  AlertTriangle,
  History,
  Check
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useLinkedIn, LinkedInAutomationRule } from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';

export interface LinkedInAutomationViewProps {
  onOpenCreateRule: () => void;
}

export const LinkedInAutomationView: React.FC<LinkedInAutomationViewProps> = ({
  onOpenCreateRule,
}) => {
  const { automationRules, toggleAutomationRule, deleteAutomationRule, createAutomationRule } = useLinkedIn();
  const { success } = useToast();

  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Paused'>('All');
  const [selectedWorkflow, setSelectedWorkflow] = useState<LinkedInAutomationRule | null>(null);
  const [editingRule, setEditingRule] = useState<LinkedInAutomationRule | null>(null);
  const [deletingRule, setDeletingRule] = useState<LinkedInAutomationRule | null>(null);
  const [runsModalRule, setRunsModalRule] = useState<LinkedInAutomationRule | null>(null);

  // Edit form state
  const [editName, setEditName] = useState('');
  const [editTrigger, setEditTrigger] = useState('');
  const [editAction, setEditAction] = useState('');
  const [editDelay, setEditDelay] = useState(2);
  const [editCondition, setEditCondition] = useState('');

  const filteredRules = automationRules.filter((r) => {
    if (activeTab === 'Active') return r.status === 'Active';
    if (activeTab === 'Paused') return r.status === 'Paused';
    return true;
  });

  const handleDuplicate = (rule: LinkedInAutomationRule) => {
    createAutomationRule({
      name: `${rule.name} (Copy)`,
      trigger: rule.trigger,
      action: rule.action,
      steps: [...rule.steps],
      stepsCount: rule.steps.length,
      delayHours: rule.delayHours,
      condition: rule.condition,
    });
  };

  const handleStartEdit = (rule: LinkedInAutomationRule) => {
    setEditingRule(rule);
    setEditName(rule.name);
    setEditTrigger(rule.trigger);
    setEditAction(rule.action);
    setEditDelay(rule.delayHours);
    setEditCondition(rule.condition);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRule || !editName.trim()) return;
    // In our context, we can delete and re-create or update
    editingRule.name = editName.trim();
    editingRule.trigger = editTrigger;
    editingRule.action = editAction;
    editingRule.delayHours = Number(editDelay) || 2;
    editingRule.condition = editCondition;
    success(`Automation rule "${editName}" updated.`, 'Rule Updated');
    setEditingRule(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingRule) return;
    deleteAutomationRule(deletingRule.id);
    setDeletingRule(null);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header & Primary CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>Automation Workflows</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Cloud multi-step automation engines executing profile visits, warm connection notes, and smart follow-ups.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={onOpenCreateRule}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shadow-md shadow-emerald-600/20"
        >
          Create Automation
        </Button>
      </div>

      {/* 2. Visual Multi-Step Workflow Blueprint */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-[#161616] to-[#0a1510] border border-emerald-500/20 shadow-lg shadow-emerald-950/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Workflow className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Standard 7-Stage Outreach Sequence Flow
            </span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Anti-Ban Humanized Pacing
          </span>
        </div>

        {/* Horizontal Visual Step Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
          {[
            { step: '1', title: 'Visit Profile', icon: Eye, delay: '0s delay', desc: 'Stealth residential IP' },
            { step: '2', title: 'Wait Period', icon: Clock, delay: '24h wait', desc: 'Human pacing delay' },
            { step: '3', title: 'Connection Note', icon: Send, delay: 'Smart Note', desc: 'Personalized pitch' },
            { step: '4', title: 'Detect Accept', icon: CheckCircle2, delay: 'Webhook SLA', desc: 'Real-time check' },
            { step: '5', title: 'Welcome DM', icon: MessageSquare, delay: '2h delay', desc: 'Case study delivery' },
            { step: '6', title: 'Wait Period', icon: Clock, delay: '72h wait', desc: 'No-reply timeout' },
            { step: '7', title: 'Follow-Up / Call', icon: Zap, delay: 'Final Touch', desc: 'Calendar link drop' },
          ].map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.06] hover:border-emerald-500/40 transition-all space-y-1.5 text-center"
              >
                <div className="w-7 h-7 mx-auto rounded-xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="font-bold text-white text-[11px] truncate">{s.title}</div>
                <div className="text-[9px] font-mono text-slate-400">{s.delay}</div>
                <div className="text-[9px] text-slate-500 truncate">{s.desc}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Filter Tabs & Summary */}
      <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1">
          {(['All', 'Active', 'Paused'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {tab} ({tab === 'All' ? automationRules.length : automationRules.filter(r => r.status === tab).length})
            </button>
          ))}
        </div>

        <span className="text-[11px] text-slate-400 font-mono hidden sm:inline-block">
          Total Runs: {automationRules.reduce((acc, r) => acc + (r.runsCount || 0), 0)} executions
        </span>
      </div>

      {/* 4. Automation Rules List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRules.map((rule) => (
          <div
            key={rule.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 hover:border-emerald-500/40 transition-all"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    {rule.name}
                  </span>
                  <Badge variant={rule.status === 'Active' ? 'emerald' : 'slate'} size="sm" dot={rule.status === 'Active'}>
                    {rule.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  Trigger: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{rule.trigger}</span> • Condition: {rule.condition}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant={rule.status === 'Active' ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => toggleAutomationRule(rule.id)}
                  leftIcon={rule.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                >
                  {rule.status === 'Active' ? 'Pause' : 'Activate'}
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleStartEdit(rule)}
                  leftIcon={<Edit3 className="w-3.5 h-3.5" />}
                >
                  Edit
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDuplicate(rule)}
                  leftIcon={<Copy className="w-3.5 h-3.5" />}
                >
                  Duplicate
                </Button>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setRunsModalRule(rule)}
                  leftIcon={<History className="w-3.5 h-3.5" />}
                >
                  View Runs
                </Button>

                <button
                  onClick={() => setDeletingRule(rule)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                  title="Delete Automation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Workflow Step Sequence Pills */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Workflow Sequence Steps ({rule.steps?.length || rule.stepsCount} Steps)
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {rule.steps?.map((stepText, sIdx) => (
                  <React.Fragment key={sIdx}>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#202020] text-xs font-semibold text-slate-800 dark:text-slate-200">
                      <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px] font-bold">
                        {sIdx + 1}
                      </span>
                      <span>{stepText}</span>
                    </div>
                    {sIdx < (rule.steps.length - 1) && (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Telemetry Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono border-t border-slate-100 dark:border-[#202020]">
              <div>
                <span className="text-[10px] text-slate-400 block">Total Runs</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{rule.runsCount} executions</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Success SLA</span>
                <span className="font-bold text-emerald-600">{rule.successRate}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Execution Delay</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{rule.delayHours} Hours</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Last Executed</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{rule.lastRun}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Edit Automation Modal */}
      {editingRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Edit Automation Rule</h3>
              <button onClick={() => setEditingRule(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Rule Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Trigger Event</label>
                  <input
                    type="text"
                    required
                    value={editTrigger}
                    onChange={(e) => setEditTrigger(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Delay (Hours)</label>
                  <input
                    type="number"
                    value={editDelay}
                    onChange={(e) => setEditDelay(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Action Flow</label>
                <input
                  type="text"
                  required
                  value={editAction}
                  onChange={(e) => setEditAction(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Condition</label>
                <input
                  type="text"
                  value={editCondition}
                  onChange={(e) => setEditCondition(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button type="button" variant="secondary" size="sm" onClick={() => setEditingRule(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. View Runs Telemetry Modal */}
      {runsModalRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase">Execution Run Telemetry</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{runsModalRule.name}</h3>
                <span className="text-xs text-slate-400">Total Runs: {runsModalRule.runsCount} • Success Rate: {runsModalRule.successRate}%</span>
              </div>
              <button onClick={() => setRunsModalRule(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Recent Automation Execution Traces
              </span>

              <div className="divide-y divide-slate-100 dark:divide-white/[0.04] bg-slate-50 dark:bg-[#141414]/60 rounded-2xl border border-slate-200/60 dark:border-[#202020] overflow-hidden">
                {[
                  { time: '4m ago', status: 'Success', prospect: 'David Chen', delay: '240ms', details: 'Profile viewed + warm invite sent' },
                  { time: '18m ago', status: 'Success', prospect: 'Elena Rostova', delay: '510ms', details: 'Touch #2 value prop delivered' },
                  { time: '1h ago', status: 'Success', prospect: 'Michael Torres', delay: '380ms', details: 'Step 1 stealth view completed' },
                ].map((run, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between font-mono text-[11px]">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white font-sans">{run.prospect}</div>
                      <div className="text-[10px] text-slate-400">{run.details}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-emerald-500 font-bold">✓ {run.status}</span>
                      <div className="text-[10px] text-slate-400">{run.time} ({run.delay})</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setRunsModalRule(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Delete Confirmation Modal */}
      {deletingRule && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Delete Automation?</h3>
                <p className="text-[11px] text-slate-400">This rule will stop triggering.</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Are you sure you want to delete <strong className="text-slate-900 dark:text-white">{deletingRule.name}</strong>?
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setDeletingRule(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmDelete} leftIcon={<Trash2 className="w-3.5 h-3.5" />}>
                Delete Rule
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
