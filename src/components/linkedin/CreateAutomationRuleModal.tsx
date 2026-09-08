import React, { useState, useEffect, useRef } from 'react';
import { 
  Zap, 
  Plus, 
  Workflow,
  Trash2, 
  ArrowDown, 
  ChevronUp, 
  ChevronDown, 
  Check, 
  Clock, 
  Eye, 
  Send, 
  MessageSquare, 
  UserCheck, 
  Sparkles, 
  AlertCircle, 
  Layers, 
  Tag, 
  FolderPlus, 
  XCircle, 
  ShieldCheck, 
  ThumbsUp, 
  Share2, 
  Sliders,
  CheckCircle2,
  HelpCircle,
  Edit3
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useLinkedIn, LinkedInAutomationRule } from '../../context/LinkedInContext';
import { 
  LinkedInTriggerType, 
  LinkedInTriggerConfig,
  LinkedInConditionField, 
  LinkedInRuleCondition, 
  LinkedInActionType, 
  LinkedInRuleAction, 
  AVAILABLE_TRIGGERS, 
  AVAILABLE_CONDITION_FIELDS, 
  AVAILABLE_ACTIONS, 
  MESSAGE_VARIABLES 
} from '../../types/linkedinAutomation';

export interface CreateAutomationRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRule?: LinkedInAutomationRule | null;
  onOpenCanvas?: () => void;
}

export const CreateAutomationRuleModal: React.FC<CreateAutomationRuleModalProps> = ({
  isOpen,
  onClose,
  initialRule,
  onOpenCanvas,
}) => {
  const { createAutomationRule, updateAutomationRule, campaigns } = useLinkedIn();

  // Active step in the 3-step wizard
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [ruleName, setRuleName] = useState('');
  const [selectedTrigger, setSelectedTrigger] = useState<LinkedInTriggerType>('No Reply After 3 Days');
  const [triggerConfig, setTriggerConfig] = useState<LinkedInTriggerConfig>({ days: 3, hours: 0 });

  // Conditions State
  const [conditions, setConditions] = useState<LinkedInRuleCondition[]>([
    { id: 'c_init_1', field: 'connection_degree', operator: 'equals', value: '2nd' },
    { id: 'c_init_2', field: 'lead_status', operator: 'equals', value: 'Contacted' }
  ]);
  const [conditionLogic, setConditionLogic] = useState<'AND' | 'OR'>('AND');

  // Actions Workflow State
  const [actionsList, setActionsList] = useState<LinkedInRuleAction[]>([
    { id: 'a_init_1', type: 'wait_delay', delay: 2, delayUnit: 'Hours' },
    { id: 'a_init_2', type: 'visit_profile' },
    { id: 'a_init_3', type: 'wait_delay', delay: 4, delayUnit: 'Hours' },
    { id: 'a_init_4', type: 'send_message', message: 'Hi {{first_name}}, following up on my previous note. How are things progressing at {{company}}?' },
    { id: 'a_init_5', type: 'change_lead_status', leadStatus: 'Follow-up' }
  ]);

  // UI helpers
  const [isAddActionDropdownOpen, setIsAddActionDropdownOpen] = useState(false);
  const [showConfirmActivate, setShowConfirmActivate] = useState(false);
  const [activeMessageFieldId, setActiveMessageFieldId] = useState<string | null>(null);

  // Reset or initialize when modal opens or initialRule changes
  useEffect(() => {
    if (isOpen) {
      if (initialRule) {
        setRuleName(initialRule.name);
        setSelectedTrigger((initialRule.trigger as LinkedInTriggerType) || 'No Reply After 3 Days');
        setTriggerConfig(initialRule.triggerConfig || { days: initialRule.delayHours || 2 });
        if (initialRule.conditions && initialRule.conditions.length > 0) {
          setConditions(initialRule.conditions);
        } else if (initialRule.condition) {
          setConditions([
            { id: 'c_mig_1', field: 'custom', operator: 'equals', value: initialRule.condition }
          ]);
        }
        setConditionLogic(initialRule.conditionLogic || 'AND');
        if (initialRule.actionsList && initialRule.actionsList.length > 0) {
          setActionsList(initialRule.actionsList);
        } else if (initialRule.steps && initialRule.steps.length > 0) {
          setActionsList(
            initialRule.steps.map((s, idx) => ({
              id: `a_step_${idx}`,
              type: s.toLowerCase().includes('wait') ? 'wait_delay' : s.toLowerCase().includes('message') ? 'send_message' : 'visit_profile',
              delay: 2,
              delayUnit: 'Hours',
              message: s.toLowerCase().includes('message') ? 'Hi {{first_name}}, following up...' : undefined,
            }))
          );
        }
        setCurrentStep(1);
      } else {
        // Defaults for fresh rule
        setRuleName('');
        setSelectedTrigger('No Reply After 3 Days');
        setTriggerConfig({ days: 3, hours: 0 });
        setConditions([
          { id: 'c_init_1', field: 'connection_degree', operator: 'equals', value: '2nd' },
          { id: 'c_init_2', field: 'lead_status', operator: 'equals', value: 'Contacted' }
        ]);
        setConditionLogic('AND');
        setActionsList([
          { id: 'a_init_1', type: 'wait_delay', delay: 2, delayUnit: 'Hours' },
          { id: 'a_init_2', type: 'visit_profile' },
          { id: 'a_init_3', type: 'wait_delay', delay: 4, delayUnit: 'Hours' },
          { id: 'a_init_4', type: 'send_message', message: 'Hi {{first_name}}, following up on my previous note. How are things progressing at {{company}}?' },
          { id: 'a_init_5', type: 'change_lead_status', leadStatus: 'Follow-up' }
        ]);
        setCurrentStep(1);
      }
      setShowConfirmActivate(false);
      setIsAddActionDropdownOpen(false);
    }
  }, [isOpen, initialRule]);

  // Auto-suggest rule name if empty
  const getAutoRuleName = () => {
    if (ruleName.trim()) return ruleName.trim();
    const actionDesc = actionsList.slice(0, 2).map(a => {
      if (a.type === 'wait_delay') return `Wait ${a.delay || 2}${a.delayUnit?.[0] || 'h'}`;
      if (a.type === 'visit_profile') return 'Profile Visit';
      if (a.type === 'send_message') return 'Follow-up';
      if (a.type === 'send_connection_note') return 'Invite Note';
      return a.type.replace(/_/g, ' ');
    }).join(' → ');
    return `${selectedTrigger} → ${actionDesc || 'Automated Flow'}`;
  };

  // Compile summary strings for backward-compatibility & list views
  const buildSummaryStrings = () => {
    const actionText = actionsList.map(a => {
      if (a.type === 'wait_delay') return `Wait ${a.delay || 2} ${a.delayUnit || 'Hours'}`;
      if (a.type === 'visit_profile') return 'Visit Profile';
      if (a.type === 'send_message') return 'Send Message';
      if (a.type === 'send_connection_note') return 'Send Connection Note';
      if (a.type === 'send_connection_request') return 'Send Connection Request';
      if (a.type === 'change_lead_status') return `Change Status (${a.leadStatus || 'Follow-up'})`;
      if (a.type === 'add_tag') return `Tag (${a.tag || 'Lead'})`;
      return a.type.replace(/_/g, ' ');
    }).join(' → ');

    const stepsText = actionsList.map(a => {
      if (a.type === 'wait_delay') return `Wait ${a.delay || 2} ${a.delayUnit || 'Hours'}`;
      if (a.type === 'visit_profile') return 'Visit Profile';
      if (a.type === 'send_message') return 'Send Message';
      if (a.type === 'send_connection_note') return 'Send Connection Note';
      if (a.type === 'send_connection_request') return 'Send Connection Request';
      if (a.type === 'change_lead_status') return `Change Lead Status → ${a.leadStatus || 'Follow-up'}`;
      return a.type.replace(/_/g, ' ');
    });

    const conditionsText = conditions.length > 0
      ? conditions.map(c => {
          const fieldDef = AVAILABLE_CONDITION_FIELDS.find(f => f.id === c.field);
          return `${fieldDef?.label || c.field} ${c.operator === 'equals' ? '=' : c.operator} ${c.value}`;
        }).join(` ${conditionLogic} `)
      : 'No strict conditions';

    const firstDelay = actionsList.find(a => a.type === 'wait_delay');
    const delayHours = firstDelay
      ? firstDelay.delayUnit === 'Days'
        ? (firstDelay.delay || 1) * 24
        : firstDelay.delayUnit === 'Minutes'
        ? Math.ceil((firstDelay.delay || 60) / 60)
        : firstDelay.delay || 2
      : 2;

    return { actionText, stepsText, conditionsText, delayHours };
  };

  // Save handler (Active vs Draft)
  const handleSaveRule = (status: 'Active' | 'Draft') => {
    const finalName = ruleName.trim() || getAutoRuleName();
    const { actionText, stepsText, conditionsText, delayHours } = buildSummaryStrings();

    const rulePayload: Partial<LinkedInAutomationRule> = {
      name: finalName,
      trigger: selectedTrigger,
      triggerConfig,
      action: actionText || 'Visit Profile → Send Connection Request',
      stepsCount: stepsText.length,
      steps: stepsText,
      delayHours,
      condition: conditionsText,
      conditions,
      conditionLogic,
      actionsList,
      status,
      created: initialRule?.created || 'Just now',
    };

    if (initialRule) {
      updateAutomationRule(initialRule.id, rulePayload);
    } else {
      createAutomationRule(rulePayload);
    }

    onClose();
  };

  // Conditions manipulation
  const handleAddCondition = () => {
    const newCond: LinkedInRuleCondition = {
      id: `c_${Date.now()}`,
      field: 'lead_status',
      operator: 'equals',
      value: 'Interested',
    };
    setConditions(prev => [...prev, newCond]);
  };

  const handleUpdateCondition = (id: string, updates: Partial<LinkedInRuleCondition>) => {
    setConditions(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const handleRemoveCondition = (id: string) => {
    setConditions(prev => prev.filter(c => c.id !== id));
  };

  // Actions manipulation
  const handleAddAction = (type: LinkedInActionType) => {
    const newAction: LinkedInRuleAction = {
      id: `act_${Date.now()}`,
      type,
      delay: type === 'wait_delay' ? 2 : undefined,
      delayUnit: type === 'wait_delay' ? 'Hours' : undefined,
      message: type === 'send_message' ? 'Hi {{first_name}}, following up on my previous message.' : undefined,
      connectionNote: type === 'send_connection_note' ? 'Hi {{first_name}}, noticed your work at {{company}} and would love to connect.' : undefined,
      leadStatus: type === 'change_lead_status' ? 'Interested' : undefined,
      tag: type === 'add_tag' ? 'High-Priority' : undefined,
    };
    setActionsList(prev => [...prev, newAction]);
    setIsAddActionDropdownOpen(false);
  };

  const handleUpdateAction = (id: string, updates: Partial<LinkedInRuleAction>) => {
    setActionsList(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const handleRemoveAction = (id: string) => {
    setActionsList(prev => prev.filter(a => a.id !== id));
  };

  const handleMoveAction = (index: number, direction: 'up' | 'down') => {
    setActionsList(prev => {
      const next = [...prev];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      const temp = next[index];
      next[index] = next[targetIndex];
      next[targetIndex] = temp;
      return next;
    });
  };

  // Variable insertion
  const handleInsertVariable = (actionId: string, fieldKey: 'message' | 'connectionNote', tag: string) => {
    setActionsList(prev => prev.map(a => {
      if (a.id === actionId) {
        const currentVal = a[fieldKey] || '';
        return {
          ...a,
          [fieldKey]: `${currentVal} ${tag}`
        };
      }
      return a;
    }));
  };

  const isFormValid = actionsList.length > 0;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg text-slate-950 dark:text-white">
              {initialRule ? 'Edit Automation Rule' : 'Create Automation Rule'}
            </span>
          </div>
        </div>
      }
      description="Build an automated LinkedIn workflow using triggers, conditions, delays, and actions."
      size="xl"
      footer={
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full font-sans">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {currentStep > 1 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCurrentStep(prev => (prev - 1) as any)}
                type="button"
              >
                Back
              </Button>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleSaveRule('Draft')}
              type="button"
              disabled={actionsList.length === 0}
            >
              Save Draft
            </Button>

            {currentStep < 3 ? (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCurrentStep(prev => (prev + 1) as any)}
                type="button"
              >
                Next Step →
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowConfirmActivate(true)}
                disabled={!isFormValid}
                type="button"
                leftIcon={<Zap className="w-3.5 h-3.5" />}
              >
                {initialRule ? 'Update & Activate' : 'Activate Rule'}
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div className="space-y-6 font-sans text-xs">
        
        {/* Lemlist-Style Visual Canvas Callout */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-transparent border border-blue-500/20 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Workflow className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Prefer Lemlist-Style Drag & Drop Canvas?</div>
              <div className="text-[10px] text-slate-500">Design multi-step LinkedIn touches with live condition branches, delays & metrics.</div>
            </div>
          </div>
          {onOpenCanvas && (
            <Button
              variant="outline"
              size="sm"
              type="button"
              onClick={() => {
                onClose();
                onOpenCanvas();
              }}
              className="shrink-0 border-blue-500/30 hover:border-blue-500 text-blue-600 dark:text-blue-400 text-xs font-bold bg-white dark:bg-[#1C1C1C]"
            >
              Open Canvas ➔
            </Button>
          )}
        </div>

        {/* ========================================================= */}
        {/* 1. PROGRESS STEPPER (WHEN -> IF -> THEN)                  */}
        {/* ========================================================= */}
        <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-[#121212] border border-slate-200/80 dark:border-[#242424] grid grid-cols-3 gap-1">
          {[
            { step: 1, label: 'STEP 1: WHEN', sub: 'Trigger Event' },
            { step: 2, label: 'STEP 2: IF', sub: 'Conditions & Filters' },
            { step: 3, label: 'STEP 3: THEN', sub: 'Workflow Actions & Review' },
          ].map(s => {
            const isActive = currentStep === s.step;
            const isCompleted = currentStep > s.step;
            return (
              <button
                key={s.step}
                type="button"
                onClick={() => setCurrentStep(s.step as any)}
                className={`py-2 px-3 rounded-xl transition-all cursor-pointer flex flex-col items-center sm:items-start text-center sm:text-left ${
                  isActive
                    ? 'bg-primary text-white shadow-xs font-bold'
                    : isCompleted
                    ? 'bg-white dark:bg-[#1C1C1C] text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-[#2A2A2A]'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  ) : (
                    <span className="opacity-80">#{s.step}</span>
                  )}
                  <span>{s.label}</span>
                </div>
                <span className={`text-[10px] hidden sm:block ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                  {s.sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* STEP 1: WHEN (Trigger Selector & Configuration)           */}
        {/* ========================================================= */}
        {currentStep === 1 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div>
              <label className="block text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                When should this rule run?
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Select the LinkedIn event that activates this automation.
              </p>
            </div>

            {/* Trigger Grid / Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
              {AVAILABLE_TRIGGERS.map((t) => {
                const isSelected = selectedTrigger === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTrigger(t.id)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isSelected
                        ? 'bg-primary/10 border-primary text-primary shadow-xs ring-1 ring-primary/30'
                        : 'bg-white dark:bg-[#1C1C1C] border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-[#383838]'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-[#242424] text-slate-500'
                    }`}>
                      {t.id.includes('Connection') ? <UserCheck className="w-4 h-4" /> :
                       t.id.includes('Profile') ? <Eye className="w-4 h-4" /> :
                       t.id.includes('Message') ? <MessageSquare className="w-4 h-4" /> :
                       t.id.includes('Campaign') ? <Layers className="w-4 h-4" /> :
                       t.id.includes('Engagement') ? <ThumbsUp className="w-4 h-4" /> :
                       <Clock className="w-4 h-4" />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-extrabold text-xs leading-snug ${isSelected ? 'text-primary dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                          {t.label}
                        </span>
                        {isSelected && <Check className="w-4 h-4 text-primary shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal line-clamp-2">
                        {t.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trigger Configuration Parameters */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-primary" />
                <span className="font-bold text-slate-900 dark:text-white text-xs">
                  Trigger Parameters: <span className="text-primary font-bold">{selectedTrigger}</span>
                </span>
              </div>

              {selectedTrigger.includes('No Reply') ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Timeout Threshold (Days)</label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={triggerConfig.days ?? 3}
                      onChange={(e) => setTriggerConfig(prev => ({ ...prev, days: Number(e.target.value) }))}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Additional Hours Buffer (Optional)</label>
                    <input
                      type="number"
                      min={0}
                      max={23}
                      value={triggerConfig.hours ?? 0}
                      onChange={(e) => setTriggerConfig(prev => ({ ...prev, hours: Number(e.target.value) }))}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/20"
                    />
                  </div>
                </div>
              ) : selectedTrigger.includes('Campaign') ? (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Target Campaign</label>
                  <select
                    value={triggerConfig.campaignName || 'All Active Campaigns'}
                    onChange={(e) => setTriggerConfig(prev => ({ ...prev, campaignName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-primary"
                  >
                    <option value="All Active Campaigns">All Active Campaigns</option>
                    {campaigns.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
              ) : selectedTrigger.includes('Engagement') ? (
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400">Interaction Type</label>
                  <select
                    value={triggerConfig.postEngagementType || 'Any'}
                    onChange={(e) => setTriggerConfig(prev => ({ ...prev, postEngagementType: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-primary"
                  >
                    <option value="Any">Any Interaction (Like or Comment)</option>
                    <option value="Like">Post Reaction / Like</option>
                    <option value="Comment">Post Comment</option>
                  </select>
                </div>
              ) : (
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Instant event trigger. Dispatches immediately upon detection with zero preliminary cooldown.
                </p>
              )}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 2: IF (Conditions Builder)                           */}
        {/* ========================================================= */}
        {currentStep === 2 && (
          <div className="space-y-5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Match Conditions (IF)
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Only execute the workflow actions if target prospects meet these criteria.
                </p>
              </div>

              {/* AND / OR Logic Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A]">
                <button
                  type="button"
                  onClick={() => setConditionLogic('AND')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    conditionLogic === 'AND'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Match ALL (AND)
                </button>
                <button
                  type="button"
                  onClick={() => setConditionLogic('OR')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    conditionLogic === 'OR'
                      ? 'bg-primary text-white shadow-xs'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Match ANY (OR)
                </button>
              </div>
            </div>

            {/* Conditions List */}
            <div className="space-y-3">
              {conditions.map((cond, idx) => {
                const fieldDef = AVAILABLE_CONDITION_FIELDS.find(f => f.id === cond.field);
                return (
                  <div
                    key={cond.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-[#252525] text-slate-500 flex items-center justify-center font-mono font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </div>

                    {/* Field Dropdown */}
                    <div className="sm:w-1/3">
                      <select
                        value={cond.field}
                        onChange={(e) => {
                          const newField = e.target.value as LinkedInConditionField;
                          const newFieldDef = AVAILABLE_CONDITION_FIELDS.find(f => f.id === newField);
                          handleUpdateCondition(cond.id, { 
                            field: newField, 
                            value: newFieldDef?.options ? newFieldDef.options[0] : '' 
                          });
                        }}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-medium text-xs focus:outline-hidden focus:border-primary"
                      >
                        {AVAILABLE_CONDITION_FIELDS.map(f => (
                          <option key={f.id} value={f.id}>{f.label}</option>
                        ))}
                      </select>
                    </div>

                    {/* Operator Dropdown */}
                    <div className="sm:w-1/4">
                      <select
                        value={cond.operator}
                        onChange={(e) => handleUpdateCondition(cond.id, { operator: e.target.value as any })}
                        className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-hidden focus:border-primary"
                      >
                        <option value="equals">Equals (=)</option>
                        <option value="not_equals">Does not equal (≠)</option>
                        <option value="contains">Contains</option>
                        <option value="is_true">Is Yes / True</option>
                        <option value="is_false">Is No / False</option>
                      </select>
                    </div>

                    {/* Value Input / Select */}
                    <div className="flex-1">
                      {fieldDef?.options ? (
                        <select
                          value={cond.value}
                          onChange={(e) => handleUpdateCondition(cond.id, { value: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-medium text-xs focus:outline-hidden focus:border-primary"
                        >
                          {fieldDef.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          placeholder="Condition value..."
                          value={cond.value}
                          onChange={(e) => handleUpdateCondition(cond.id, { value: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white text-xs focus:outline-hidden focus:border-primary"
                        />
                      )}
                    </div>

                    {/* Remove Condition */}
                    <button
                      type="button"
                      onClick={() => handleRemoveCondition(cond.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer shrink-0"
                      title="Remove condition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}

              {conditions.length === 0 && (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-dashed border-slate-300 dark:border-[#2E2E2E] text-center space-y-1">
                  <span className="font-bold text-slate-700 dark:text-slate-300">No Conditions Configured</span>
                  <p className="text-slate-400 text-xs">This rule will execute for 100% of prospects triggering the event.</p>
                </div>
              )}
            </div>

            {/* Add Condition Button */}
            <Button
              variant="secondary"
              size="sm"
              onClick={handleAddCondition}
              leftIcon={<Plus className="w-4 h-4" />}
              type="button"
            >
              Add Condition +
            </Button>
          </div>
        )}

        {/* ========================================================= */}
        {/* STEP 3: THEN (Workflow Actions Sequence & Summary)        */}
        {/* ========================================================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-150">
            
            {/* Rule Name Field */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#262626] space-y-1.5">
              <label className="block text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
                Rule Name *
              </label>
              <input
                type="text"
                required
                placeholder={getAutoRuleName()}
                value={ruleName}
                onChange={(e) => setRuleName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-bold text-sm focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/20"
              />
              <span className="text-[10px] text-slate-400">
                A concise descriptive name identifying the automated flow in your rule dashboard.
              </span>
            </div>

            {/* Action Sequence Header */}
            <div className="flex items-center justify-between pt-1">
              <div>
                <label className="block text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Action Workflow Sequence
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Ordered steps executed sequentially upon trigger & condition match.
                </p>
              </div>

              {/* Add Action Picker Dropdown */}
              <div className="relative">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setIsAddActionDropdownOpen(!isAddActionDropdownOpen)}
                  leftIcon={<Plus className="w-4 h-4" />}
                  type="button"
                >
                  Add Action +
                </Button>

                {isAddActionDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2E2E2E] rounded-2xl p-2 shadow-2xl z-50 space-y-1 animate-in fade-in zoom-in-95 max-h-80 overflow-y-auto">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pt-1 block">
                      Select Workflow Action
                    </span>
                    {AVAILABLE_ACTIONS.map(action => (
                      <button
                        key={action.id}
                        type="button"
                        onClick={() => handleAddAction(action.id)}
                        className="w-full text-left p-2 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200 cursor-pointer"
                      >
                        <div className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-[#252525] flex items-center justify-center shrink-0 mt-0.5">
                          {action.id.includes('message') || action.id.includes('note') ? <MessageSquare className="w-3.5 h-3.5 text-primary" /> :
                           action.id.includes('wait') ? <Clock className="w-3.5 h-3.5 text-amber-500" /> :
                           action.id.includes('status') ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> :
                           action.id.includes('tag') ? <Tag className="w-3.5 h-3.5 text-sky-500" /> :
                           <Eye className="w-3.5 h-3.5 text-primary" />}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-slate-900 dark:text-white leading-tight">{action.label}</div>
                          <div className="text-[10px] text-slate-400 truncate">{action.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Connected Vertical Workflow Graph */}
            <div className="space-y-0 relative pl-4 border-l-2 border-primary/30 ml-4 py-1">
              {/* Step 0: Trigger Badge */}
              <div className="relative mb-6 -ml-[25px]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center shadow-xs">
                    <Zap className="w-3 h-3" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/15 text-primary border border-primary/30 font-mono text-[11px] font-bold">
                    TRIGGER: {selectedTrigger}
                  </span>
                </div>
              </div>

              {/* Actions Chain */}
              {actionsList.map((act, index) => {
                const actionDef = AVAILABLE_ACTIONS.find(a => a.id === act.type);
                return (
                  <div key={act.id} className="relative mb-6 last:mb-0 group">
                    {/* Node Dot on Connected Line */}
                    <div className="absolute -left-[23px] top-4 w-3.5 h-3.5 rounded-full bg-white dark:bg-[#161616] border-2 border-primary" />

                    {/* Action Card */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 hover:border-primary/40 transition-all">
                      
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-md bg-slate-100 dark:bg-[#252525] text-slate-700 dark:text-slate-300 font-mono text-[10px] font-bold flex items-center justify-center">
                            #{index + 1}
                          </span>
                          <span className="font-extrabold text-xs text-slate-950 dark:text-white">
                            {actionDef?.label || act.type}
                          </span>
                        </div>

                        {/* Card Controls (Move up, Move down, Delete) */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveAction(index, 'up')}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            disabled={index === actionsList.length - 1}
                            onClick={() => handleMoveAction(index, 'down')}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveAction(act.id)}
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                            title="Remove action"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Card Specific Inputs */}
                      {act.type === 'wait_delay' && (
                        <div className="grid grid-cols-2 gap-3 pt-1">
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">Wait Duration</label>
                            <input
                              type="number"
                              min={1}
                              value={act.delay ?? 2}
                              onChange={(e) => handleUpdateAction(act.id, { delay: Number(e.target.value) })}
                              className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] font-mono text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] font-bold text-slate-500">Time Unit</label>
                            <select
                              value={act.delayUnit || 'Hours'}
                              onChange={(e) => handleUpdateAction(act.id, { delayUnit: e.target.value as any })}
                              className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary"
                            >
                              <option value="Minutes">Minutes</option>
                              <option value="Hours">Hours</option>
                              <option value="Days">Days</option>
                            </select>
                          </div>
                        </div>
                      )}

                      {(act.type === 'send_message' || act.type === 'send_connection_note') && (
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-bold text-slate-500">
                              {act.type === 'send_connection_note' ? 'Connection Note (Max 300 Chars)' : 'Message Body'}
                            </label>
                            
                            {/* Insert Variable Helper Pills */}
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-slate-400 font-mono">Insert Variable:</span>
                              {MESSAGE_VARIABLES.map(v => (
                                <button
                                  key={v.tag}
                                  type="button"
                                  onClick={() => handleInsertVariable(
                                    act.id, 
                                    act.type === 'send_connection_note' ? 'connectionNote' : 'message', 
                                    v.tag
                                  )}
                                  className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-[#252525] hover:bg-primary/20 hover:text-primary text-[10px] font-mono font-semibold transition-colors cursor-pointer"
                                  title={`Insert ${v.label}`}
                                >
                                  {v.tag}
                                </button>
                              ))}
                            </div>
                          </div>

                          <textarea
                            rows={3}
                            value={act.type === 'send_connection_note' ? (act.connectionNote || '') : (act.message || '')}
                            onChange={(e) => handleUpdateAction(act.id, {
                              [act.type === 'send_connection_note' ? 'connectionNote' : 'message']: e.target.value
                            })}
                            placeholder="Type your message with dynamic personalization tokens..."
                            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary/20 font-sans leading-relaxed"
                          />
                        </div>
                      )}

                      {act.type === 'change_lead_status' && (
                        <div className="space-y-1 pt-1">
                          <label className="text-[10px] font-bold text-slate-500">New Target Lead Stage</label>
                          <select
                            value={act.leadStatus || 'Follow-up'}
                            onChange={(e) => handleUpdateAction(act.id, { leadStatus: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary"
                          >
                            <option value="Cold">Cold</option>
                            <option value="In Outreach">In Outreach</option>
                            <option value="Connected">Connected</option>
                            <option value="Follow-up">Follow-up</option>
                            <option value="Interested">Interested (Hot)</option>
                            <option value="Meeting Booked">Meeting Booked</option>
                            <option value="Not Interested">Not Interested</option>
                          </select>
                        </div>
                      )}

                      {act.type === 'add_tag' && (
                        <div className="space-y-1 pt-1">
                          <label className="text-[10px] font-bold text-slate-500">Tag to Apply</label>
                          <input
                            type="text"
                            placeholder="e.g. VIP-Prospect, Re-Engage, Founder-Tier"
                            value={act.tag || ''}
                            onChange={(e) => handleUpdateAction(act.id, { tag: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary"
                          />
                        </div>
                      )}

                      {(act.type === 'add_to_campaign' || act.type === 'remove_from_campaign') && (
                        <div className="space-y-1 pt-1">
                          <label className="text-[10px] font-bold text-slate-500">Select Campaign</label>
                          <select
                            value={act.campaignName || (campaigns[0]?.name || 'Q3 Enterprise Outbound')}
                            onChange={(e) => handleUpdateAction(act.id, { campaignName: e.target.value })}
                            className="w-full px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-primary"
                          >
                            {campaigns.map(c => (
                              <option key={c.id} value={c.name}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      )}

                    </div>

                    {/* Down Arrow between steps */}
                    {index < actionsList.length - 1 && (
                      <div className="my-1.5 flex items-center justify-center -ml-[23px]">
                        <ArrowDown className="w-3.5 h-3.5 text-primary/60" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ========================================================= */}
            {/* RULE SUMMARY CARD                                         */}
            {/* ========================================================= */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414] border border-slate-200/90 dark:border-[#262626] space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Rule Execution Summary</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="font-extrabold text-primary font-mono uppercase text-[10px]">When: </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTrigger}</span>
                </div>

                <div>
                  <span className="font-extrabold text-amber-500 font-mono uppercase text-[10px]">If: </span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {conditions.length > 0
                      ? conditions.map(c => {
                          const f = AVAILABLE_CONDITION_FIELDS.find(f => f.id === c.field);
                          return `${f?.label || c.field} = "${c.value}"`;
                        }).join(` ${conditionLogic} `)
                      : 'All triggering prospects'}
                  </span>
                </div>

                <div>
                  <span className="font-extrabold text-emerald-500 font-mono uppercase text-[10px]">Then: </span>
                  <span className="text-slate-800 dark:text-slate-200 font-medium">
                    {actionsList.map(a => {
                      if (a.type === 'wait_delay') return `Wait ${a.delay || 2} ${a.delayUnit || 'Hours'}`;
                      if (a.type === 'visit_profile') return 'Visit Profile';
                      if (a.type === 'send_message') return 'Send Follow-up Message';
                      if (a.type === 'send_connection_note') return 'Send Connection Note';
                      if (a.type === 'change_lead_status') return `Change Lead Status → ${a.leadStatus || 'Follow-up'}`;
                      return a.type.replace(/_/g, ' ');
                    }).join(' → ')}
                  </span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================= */}
      {/* CONFIRMATION MODAL BEFORE ACTIVATION                      */}
      {/* ========================================================= */}
      {showConfirmActivate && (
        <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2E2E2E] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center gap-3 text-primary">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Activate Automation Rule?</h3>
                <p className="text-[11px] text-slate-400">Live cloud execution</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              This rule will automatically execute when its trigger and condition criteria are met across your connected LinkedIn profiles.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#282828] font-mono text-[11px] space-y-1">
              <div className="font-bold text-slate-900 dark:text-white">{ruleName.trim() || getAutoRuleName()}</div>
              <div className="text-slate-500 truncate">{selectedTrigger} → {actionsList.length} Steps</div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-[#282828] flex justify-end gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowConfirmActivate(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSaveRule('Active')}
                type="button"
                leftIcon={<Zap className="w-3.5 h-3.5" />}
              >
                Confirm & Activate
              </Button>
            </div>
          </div>
        </div>
      )}

    </Modal>
  );
};
