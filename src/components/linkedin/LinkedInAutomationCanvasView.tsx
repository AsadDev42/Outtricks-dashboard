import React, { useState } from 'react';
import { 
  Eye, 
  Send, 
  MessageSquare, 
  Workflow, 
  Clock, 
  Plus, 
  Check, 
  X, 
  MoreHorizontal, 
  Trash2, 
  Sparkles, 
  Copy, 
  Sliders, 
  Users, 
  Calendar, 
  ShieldCheck, 
  ThumbsUp, 
  UserPlus, 
  Mic, 
  MessageCircle, 
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  Edit2,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { 
  useLinkedIn, 
  LinkedInCampaign, 
  LinkedInStep, 
  LinkedInStepType 
} from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';

export interface LinkedInAutomationCanvasViewProps {
  campaign?: LinkedInCampaign;
}

export const LinkedInAutomationCanvasView: React.FC<LinkedInAutomationCanvasViewProps> = ({ 
  campaign: propCampaign 
}) => {
  const { 
    selectedCampaign: contextCampaign, 
    campaigns, 
    updateCampaignSequence, 
    accounts 
  } = useLinkedIn();
  const { success, info } = useToast();

  const campaign = propCampaign || contextCampaign || campaigns[0];

  // Active step selected for the right-hand configuration drawer
  const [selectedStep, setSelectedStep] = useState<LinkedInStep | null>(
    campaign?.sequence[0] || null
  );

  // Add Step Modal State
  const [isActionPickerOpen, setIsActionPickerOpen] = useState(false);
  const [actionPickerTargetBranch, setActionPickerTargetBranch] = useState<'main' | 'yes' | 'no'>('main');
  const [actionPickerTab, setActionPickerTab] = useState<'steps' | 'conditions'>('steps');
  const [actionSearch, setActionSearch] = useState('');

  // Sample lead for variable preview
  const sampleLead = campaign?.leadsList[0] || {
    firstName: 'Florence',
    lastName: 'Famurewa',
    company: 'FinTech Velocity UK',
    title: 'Senior Social Media Specialist',
    location: 'London, UK',
  };
  const [isPreviewingSampleLead, setIsPreviewingSampleLead] = useState(false);

  if (!campaign) {
    return (
      <div className="p-8 text-center text-slate-500">
        No active LinkedIn campaign found. Please select or create a campaign.
      </div>
    );
  }

  // Update step in sequence
  const handleUpdateStepConfig = (stepId: string, updates: Partial<LinkedInStep>) => {
    const updateInBranch = (steps: LinkedInStep[]): LinkedInStep[] => {
      return steps.map((s) => {
        if (s.id === stepId) {
          return { ...s, ...updates };
        }
        if (s.yesBranch) {
          return { ...s, yesBranch: updateInBranch(s.yesBranch) };
        }
        if (s.noBranch) {
          return { ...s, noBranch: updateInBranch(s.noBranch) };
        }
        return s;
      });
    };

    const updated = updateInBranch(campaign.sequence);
    updateCampaignSequence(campaign.id, updated);
    if (selectedStep?.id === stepId) {
      setSelectedStep((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  // Add Step from Action Picker
  const handleAddStep = (type: LinkedInStepType, title: string, subtitle: string, isCondition = false) => {
    const newStep: LinkedInStep = {
      id: `step_${Date.now()}`,
      type,
      title,
      subtitle,
      timingLabel: isCondition ? undefined : 'Send immediately',
      config: {
        body: type === 'message' ? 'Hi {{firstName}},\n\nNoticed what you are building at {{company}}!' : undefined,
        note: type === 'connect' ? 'Hi {{firstName}}, loved your work at {{company}}! Would love to connect.' : undefined,
        variables: ['firstName', 'company'],
        characterLimit: type === 'connect' ? 300 : undefined,
      },
      stats: {
        reached: 0,
        completed: 0,
        pending: 0,
        toCome: campaign.targetCount || 210,
        failed: 0,
        skipped: 0,
      },
    };

    if (isCondition) {
      newStep.yesBranch = [
        {
          id: `step_${Date.now()}_yes`,
          type: 'message',
          title: 'Chat message',
          subtitle: 'First value message in LinkedIn Chat',
          timingLabel: 'Send immediately',
          config: {
            body: 'Hi {{firstName}},\n\nThanks for connecting! Are you looking for remote creative support for your client teams?',
            variables: ['firstName'],
          },
          stats: { reached: 0, completed: 0, pending: 0, toCome: 0, failed: 0, skipped: 0 },
        }
      ];
      newStep.noBranch = [
        {
          id: `step_${Date.now()}_no`,
          type: 'stop',
          title: 'End',
          subtitle: 'Condition not met — sequence concluded',
          stats: { reached: 0, completed: 0, pending: 0, toCome: 0, failed: 0, skipped: 0 },
        }
      ];
    }

    let updatedSequence = [...campaign.sequence];
    if (actionPickerTargetBranch === 'yes') {
      // Add to yes branch of condition step
      updatedSequence = updatedSequence.map((s) => {
        if (s.type === 'condition' && s.yesBranch) {
          return { ...s, yesBranch: [...s.yesBranch, newStep] };
        }
        return s;
      });
    } else {
      updatedSequence.push(newStep);
    }

    updateCampaignSequence(campaign.id, updatedSequence);
    setIsActionPickerOpen(false);
    setSelectedStep(newStep);
    success(`Added step "${title}".`, 'Step Added');
  };

  // Replace variables for sample lead preview (with safe fallbacks to prevent undefined/null)
  const renderSamplePreview = (text?: string) => {
    if (!text) return '';
    return text
      .replace(/{{firstName}}/g, sampleLead.firstName || 'there')
      .replace(/{{lastName}}/g, sampleLead.lastName || '')
      .replace(/{{company}}/g, sampleLead.company || 'your company')
      .replace(/{{jobTitle}}/g, sampleLead.title || 'your role')
      .replace(/{{location}}/g, (sampleLead as any).location || 'your area');
  };

  return (
    <div className="flex flex-col lg:flex-row items-start gap-4 font-sans text-xs min-h-[680px]">
      
      {/* 1. Visual Node Canvas (Center) - Matches benchmark screenshot 1 */}
      <div className="flex-1 w-full p-6 sm:p-8 rounded-3xl bg-slate-50/50 dark:bg-[#111111] border border-slate-200/80 dark:border-[#222222] min-h-[680px] flex flex-col items-center relative overflow-x-auto">
        
        {/* Subtle dot-grid canvas background */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#888 1px, transparent 1px)', backgroundSize: '16px 16px' }} 
        />

        <div className="w-full max-w-md flex flex-col items-center space-y-4 relative z-10">

          {/* Top Header Card: Senders + Schedule (matches benchmark screenshot 1) */}
          <div className="w-full p-3 rounded-2xl bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Senders</div>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-orange-500 text-white font-bold text-[9px] flex items-center justify-center">
                  AF
                </div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{campaign.accountName}</span>
              </div>
            </div>

            <div className="space-y-0.5 text-right">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Schedule</div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {campaign.schedule?.days?.length === 5 ? 'Default schedule' : 'Custom schedule'}
              </span>
            </div>
          </div>

          {/* Flow Connector Line */}
          <div className="w-0.5 h-6 bg-slate-300 dark:bg-[#2A2A2A]" />

          {/* Sequence Steps Flow */}
          {campaign.sequence.map((step, idx) => {
            const isSelected = selectedStep?.id === step.id;

            // Condition Node (Diamond Branching)
            if (step.type === 'condition') {
              return (
                <div key={step.id} className="w-full flex flex-col items-center space-y-4">
                  
                  {/* Condition Node Card (Matches benchmark screenshot 1) */}
                  <div
                    onClick={() => setSelectedStep(step)}
                    className={`w-full p-3 rounded-2xl bg-white dark:bg-[#181818] border transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                        : 'border-slate-200/80 dark:border-[#2A2A2A] hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                          <Workflow className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {step.title}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {step.subtitle}
                          </div>
                        </div>
                      </div>
                      <div className="text-[10px] font-mono text-slate-400">
                        👥 {step.stats?.toCome || 32}
                      </div>
                    </div>
                  </div>

                  {/* Branching Forks: Yes (Left) vs No (Right) */}
                  <div className="w-full grid grid-cols-2 gap-4 relative pt-2">
                    
                    {/* Fork Branch Lines */}
                    <div className="absolute top-0 left-1/4 right-1/4 h-0.5 bg-slate-300 dark:bg-[#2A2A2A]" />
                    <div className="absolute top-0 left-1/4 w-0.5 h-3 bg-slate-300 dark:bg-[#2A2A2A]" />
                    <div className="absolute top-0 right-1/4 w-0.5 h-3 bg-slate-300 dark:bg-[#2A2A2A]" />

                    {/* Left Column: Yes Branch */}
                    <div className="flex flex-col items-center space-y-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Yes {step.stats?.successRate ? `${step.stats.successRate}%` : '18%'} (6)
                      </span>

                      {step.yesBranch?.map((yStep) => {
                        const isYSelected = selectedStep?.id === yStep.id;
                        return (
                          <div
                            key={yStep.id}
                            onClick={() => setSelectedStep(yStep)}
                            className={`w-full p-2.5 rounded-xl bg-white dark:bg-[#181818] border transition-all cursor-pointer shadow-xs ${
                              isYSelected
                                ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                                : 'border-slate-200/80 dark:border-[#2A2A2A] hover:border-slate-300'
                            }`}
                          >
                            <div className="text-[9px] text-slate-400 font-bold mb-1">
                              {yStep.timingLabel || 'Send immediately'}
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
                              <span className="font-bold text-slate-800 dark:text-slate-200 truncate">
                                {yStep.title}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      {/* Add Step on Yes Branch */}
                      <button
                        type="button"
                        onClick={() => {
                          setActionPickerTargetBranch('yes');
                          setIsActionPickerOpen(true);
                        }}
                        className="w-full py-1.5 rounded-xl border border-dashed border-slate-300 dark:border-[#2A2A2A] text-slate-400 hover:text-emerald-500 hover:border-emerald-500/40 text-[11px] font-bold flex items-center justify-center gap-1 cursor-pointer transition-colors"
                      >
                        <Plus className="w-3 h-3" /> Add step
                      </button>
                    </div>

                    {/* Right Column: No Branch */}
                    <div className="flex flex-col items-center space-y-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                        No 81% (26)
                      </span>

                      <div className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#161616] border border-slate-200/60 dark:border-[#242424] text-center space-y-1">
                        <div className="text-[10px] font-bold text-slate-400">
                          End
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">
                          28 leads
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              );
            }

            // Standard Linear Step Node (Visit profile, Invitation, Message)
            return (
              <div key={step.id} className="w-full flex flex-col items-center space-y-2">
                
                {/* Timing Badge above card */}
                {step.timingLabel && (
                  <div className="text-[10px] font-semibold text-slate-400 font-mono">
                    {step.timingLabel}
                  </div>
                )}

                {/* Step Card */}
                <div
                  onClick={() => setSelectedStep(step)}
                  className={`w-full p-3.5 rounded-2xl bg-white dark:bg-[#181818] border transition-all cursor-pointer shadow-xs flex items-center justify-between ${
                    isSelected
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'border-slate-200/80 dark:border-[#2A2A2A] hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      step.type === 'visit' 
                        ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400' 
                        : step.type === 'connect'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                    }`}>
                      {step.type === 'visit' && <Eye className="w-4 h-4" />}
                      {step.type === 'connect' && <UserPlus className="w-4 h-4" />}
                      {step.type === 'message' && <MessageSquare className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-xs">
                        {step.title}
                      </div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[220px]">
                        {step.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {step.stats && (
                      <span className="text-[10px] font-mono text-slate-400">
                        👥 {step.stats.reached || 0}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStep(step);
                      }}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Connector Line */}
                {idx < campaign.sequence.length - 1 && (
                  <div className="w-0.5 h-6 bg-slate-300 dark:bg-[#2A2A2A]" />
                )}

              </div>
            );
          })}

          {/* Bottom "+ Add step" Connector (matches screenshot 1) */}
          <div className="w-0.5 h-6 bg-slate-300 dark:bg-[#2A2A2A]" />
          
          <button
            type="button"
            onClick={() => {
              setActionPickerTargetBranch('main');
              setIsActionPickerOpen(true);
            }}
            className="px-4 py-2 rounded-2xl bg-white dark:bg-[#181818] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs text-slate-700 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-500 font-bold flex items-center gap-2 cursor-pointer transition-all"
          >
            <Plus className="w-3.5 h-3.5" /> + Add step
          </button>

        </div>
      </div>

      {/* 2. Step Configuration Drawer (Right) - Matches benchmark screenshot 1 */}
      {selectedStep ? (
        <div className="w-full lg:w-96 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs p-5 space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#262626]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                {selectedStep.type === 'visit' && <Eye className="w-4 h-4" />}
                {selectedStep.type === 'connect' && <UserPlus className="w-4 h-4" />}
                {selectedStep.type === 'message' && <MessageSquare className="w-4 h-4" />}
                {selectedStep.type === 'condition' && <Workflow className="w-4 h-4" />}
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                {selectedStep.title}
              </h3>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedStep(null)}
                className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#222] text-slate-400 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Safety Limit Notice Banner (matches benchmark screenshot 1) */}
          <div className="p-3 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-center justify-between text-blue-900 dark:text-blue-200">
            <span className="text-[11px] font-medium">
              This action is limited and follows your daily limit.
            </span>
            <Edit2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
          </div>

          {/* Sender Assignation (matches benchmark screenshot 1) */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">
              Sender assignation
            </label>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-orange-500 text-white font-bold text-[9px] flex items-center justify-center">
                  AF
                </div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{campaign.accountName}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>

          {/* Timing / Delay Configuration */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold text-slate-500">
              Action Timing
            </label>
            <select
              value={selectedStep.timingLabel || 'Send immediately'}
              onChange={(e) => handleUpdateStepConfig(selectedStep.id, { timingLabel: e.target.value })}
              className="w-full p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626] text-slate-800 dark:text-slate-200 font-medium cursor-pointer"
            >
              <option value="Send immediately">Send immediately</option>
              <option value="Wait for 1 day">Wait for 1 day</option>
              <option value="Wait for 2 days">Wait for 2 days</option>
              <option value="Wait for 3 days">Wait for 3 days</option>
              <option value="Wait for 5 days">Wait for 5 days</option>
            </select>
          </div>

          {/* Message / Invitation Note Editor */}
          {(selectedStep.type === 'message' || selectedStep.type === 'connect') && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-slate-500">
                  {selectedStep.type === 'connect' ? 'Connection Invitation Note' : 'Message Body'}
                </label>
                
                {/* Sample lead preview toggle */}
                <button
                  type="button"
                  onClick={() => setIsPreviewingSampleLead(!isPreviewingSampleLead)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition-all cursor-pointer ${
                    isPreviewingSampleLead
                      ? 'bg-purple-500/10 text-purple-600 border-purple-500/20'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {isPreviewingSampleLead ? 'Editing Mode' : 'Preview as Sample Lead'}
                </button>
              </div>

              {/* Variable Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {['{{firstName}}', '{{company}}', '{{jobTitle}}', '{{location}}'].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => {
                      const currentText = selectedStep.type === 'connect' ? selectedStep.config?.note : selectedStep.config?.body;
                      const nextText = `${currentText || ''} ${v}`;
                      handleUpdateStepConfig(selectedStep.id, {
                        config: {
                          ...selectedStep.config,
                          [selectedStep.type === 'connect' ? 'note' : 'body']: nextText,
                        }
                      });
                    }}
                    className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-slate-300 hover:bg-emerald-500/10 hover:text-emerald-500 text-[10px] font-mono cursor-pointer transition-colors"
                  >
                    + {v}
                  </button>
                ))}
              </div>

              {/* Text Area or Rendered Preview */}
              {isPreviewingSampleLead ? (
                <div className="p-3 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/70 dark:border-purple-900/40 text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans text-xs">
                  {renderSamplePreview(selectedStep.type === 'connect' ? selectedStep.config?.note : selectedStep.config?.body)}
                </div>
              ) : (
                <textarea
                  rows={selectedStep.type === 'connect' ? 4 : 6}
                  value={selectedStep.type === 'connect' ? selectedStep.config?.note || '' : selectedStep.config?.body || ''}
                  onChange={(e) => {
                    handleUpdateStepConfig(selectedStep.id, {
                      config: {
                        ...selectedStep.config,
                        [selectedStep.type === 'connect' ? 'note' : 'body']: e.target.value,
                      }
                    });
                  }}
                  placeholder="Write your personalized outreach note..."
                  className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#262626] text-slate-900 dark:text-white font-sans text-xs focus:outline-hidden focus:border-emerald-500"
                />
              )}

              {/* Character Limit & AI Polish Bar */}
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span>
                  {((selectedStep.type === 'connect' ? selectedStep.config?.note : selectedStep.config?.body) || '').length}
                  {selectedStep.type === 'connect' ? ' / 300 chars' : ' characters'}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const currentText = selectedStep.type === 'connect' ? selectedStep.config?.note : selectedStep.config?.body;
                    const polished = `Hi {{firstName}},\n\nNoticed {{company}} is scaling rapidly. Managing multi-channel outbound workflows is challenging—would love to connect and share some actionable frameworks!`;
                    handleUpdateStepConfig(selectedStep.id, {
                      config: {
                        ...selectedStep.config,
                        [selectedStep.type === 'connect' ? 'note' : 'body']: polished,
                      }
                    });
                    success('Message polished with conversational tone.', 'AI Polish Applied');
                  }}
                  className="flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline cursor-pointer font-bold"
                >
                  <Sparkles className="w-3 h-3" /> AI Polish
                </button>
              </div>
            </div>
          )}

          {/* Delete Step CTA */}
          <div className="pt-3 border-t border-slate-100 dark:border-[#262626]">
            <Button
              variant="danger"
              size="sm"
              leftIcon={<Trash2 className="w-3.5 h-3.5" />}
              className="w-full"
              onClick={() => {
                const filtered = campaign.sequence.filter((s) => s.id !== selectedStep.id);
                updateCampaignSequence(campaign.id, filtered);
                setSelectedStep(null);
                success('Step removed.', 'Step Deleted');
              }}
            >
              Delete Step
            </Button>
          </div>

        </div>
      ) : (
        <div className="w-full lg:w-80 p-6 rounded-3xl bg-slate-50/50 dark:bg-[#141414] border border-dashed border-slate-200 dark:border-[#2A2A2A] flex flex-col items-center justify-center text-center space-y-2">
          <Workflow className="w-8 h-8 text-slate-400" />
          <div className="font-bold text-slate-700 dark:text-slate-300">
            Select a step
          </div>
          <p className="text-slate-400 text-[11px]">
            Click on any action or condition node in the sequence to configure timings, variables, and messages.
          </p>
        </div>
      )}

      {/* 3. Action Picker Modal ("+ Add step") */}
      <Modal
        isOpen={isActionPickerOpen}
        onClose={() => setIsActionPickerOpen(false)}
        title="Add Step to LinkedIn Sequence"
        description="Choose an action or conditional branch to expand your outreach journey."
        size="lg"
      >
        <div className="space-y-4 font-sans text-xs">
          
          {/* Tabs: Steps vs Conditions */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#1F1F1F] border border-slate-200 dark:border-[#2A2A2A]">
            <button
              type="button"
              onClick={() => setActionPickerTab('steps')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                actionPickerTab === 'steps' ? 'bg-white dark:bg-[#2A2A2A] text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              <Send className="w-3.5 h-3.5" /> Action Steps
            </button>
            <button
              type="button"
              onClick={() => setActionPickerTab('conditions')}
              className={`flex-1 py-1.5 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                actionPickerTab === 'conditions' ? 'bg-white dark:bg-[#2A2A2A] text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'
              }`}
            >
              <Workflow className="w-3.5 h-3.5" /> Conditions & Branching
            </button>
          </div>

          {/* Action Steps Grid */}
          {actionPickerTab === 'steps' && (
            <div className="space-y-3">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Profile & Connection</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddStep('visit', 'Visit profile', 'Stealth residential profile viewing')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/20 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <Eye className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Visit profile</div>
                      <div className="text-[10px] text-slate-400">View profile to trigger LinkedIn notification</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddStep('connect', 'Invitation', 'Send 1st-degree connection invitation note')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/20 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <UserPlus className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Send Connection Request</div>
                      <div className="text-[10px] text-slate-400">Invite with customized Spintax note</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Direct Messaging</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddStep('message', 'Chat message', 'Direct message in LinkedIn conversation')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/20 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <MessageSquare className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Send LinkedIn Message</div>
                      <div className="text-[10px] text-slate-400">Personalized chat message with AI fallback</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddStep('endorse', 'Endorse skills', 'Auto-endorse top prospect skills')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/20 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <ThumbsUp className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Endorse Top Skills</div>
                      <div className="text-[10px] text-slate-400">Gentle touchpoint to build familiarity</div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Control & Timing</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddStep('delay', 'Wait for 2 days', 'Pacing delay between actions')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/20 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Wait Period</div>
                      <div className="text-[10px] text-slate-400">Delay for X business days</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAddStep('stop', 'End Campaign', 'Conclude sequence for lead')}
                    className="p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/20 text-left flex items-start gap-2.5 cursor-pointer transition-all"
                  >
                    <ShieldCheck className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">Stop Campaign</div>
                      <div className="text-[10px] text-slate-400">Explicit terminal sequence completion</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Conditions Grid */}
          {actionPickerTab === 'conditions' && (
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleAddStep('condition', 'If Accepted invite within 60 days', 'Branch execution based on connection acceptance', true)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/20 text-left flex items-start gap-2.5 cursor-pointer transition-all"
              >
                <Workflow className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">IF Invitation Accepted</div>
                  <div className="text-[10px] text-slate-400">Splits into YES (Send Chat Message) and NO (End / Wait) branches</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleAddStep('condition', 'IF Lead Replied', 'Halt sequence on genuine engagement', true)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:border-emerald-500 hover:bg-emerald-50/20 text-left flex items-start gap-2.5 cursor-pointer transition-all"
              >
                <Workflow className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">IF Lead Replied</div>
                  <div className="text-[10px] text-slate-400">Stop sequence on YES to prevent automated spam after genuine reply</div>
                </div>
              </button>
            </div>
          )}

        </div>
      </Modal>

    </div>
  );
};
