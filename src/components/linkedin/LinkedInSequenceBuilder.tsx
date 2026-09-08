import React, { useState } from 'react';
import { 
  UserPlus, 
  MessageSquare, 
  Mail, 
  Eye, 
  ThumbsUp, 
  Trash2, 
  Plus, 
  Clock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Eye as PreviewIcon,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export type StepType = 'connection_request' | 'followup_message' | 'inmail' | 'profile_visit' | 'like_post';

export interface SequenceStep {
  id: string;
  type: StepType;
  delayAmount: number;
  delayUnit: 'hours' | 'days';
  message?: string;
  subject?: string;
}

export interface LinkedInSequenceBuilderProps {
  sequence: SequenceStep[];
  onChangeSequence: (steps: SequenceStep[]) => void;
}

const STEP_META: Record<StepType, { title: string; desc: string; icon: any; color: string; hasMessage: boolean; hasSubject?: boolean }> = {
  connection_request: {
    title: 'Connection Request',
    desc: 'Send invitation with personalized note (300 chars max)',
    icon: UserPlus,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    hasMessage: true,
  },
  followup_message: {
    title: 'Follow-up Message',
    desc: 'Send a direct message once invitation is accepted',
    icon: MessageSquare,
    color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    hasMessage: true,
  },
  inmail: {
    title: 'LinkedIn InMail',
    desc: 'Reach out directly even if not connected (uses InMail credit)',
    icon: Mail,
    color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    hasMessage: true,
    hasSubject: true,
  },
  profile_visit: {
    title: 'Profile Visit',
    desc: 'View prospect profile to generate a warm notification',
    icon: Eye,
    color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    hasMessage: false,
  },
  like_post: {
    title: 'Like Recent Post',
    desc: 'Engage with their latest published article or update',
    icon: ThumbsUp,
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    hasMessage: false,
  },
};

const SAMPLE_LEAD = {
  firstName: 'Sarah',
  lastName: 'Chen',
  companyName: 'Apex Dynamics',
  jobTitle: 'VP of Growth & Revenue',
  city: 'San Francisco',
  industry: 'Enterprise Software',
};

const PERSONALIZATION_TAGS = [
  { tag: '{{firstName}}', label: 'First Name', sample: SAMPLE_LEAD.firstName },
  { tag: '{{lastName}}', label: 'Last Name', sample: SAMPLE_LEAD.lastName },
  { tag: '{{companyName}}', label: 'Company', sample: SAMPLE_LEAD.companyName },
  { tag: '{{jobTitle}}', label: 'Title', sample: SAMPLE_LEAD.jobTitle },
  { tag: '{{city}}', label: 'City', sample: SAMPLE_LEAD.city },
  { tag: '{{industry}}', label: 'Industry', sample: SAMPLE_LEAD.industry },
];

export const LinkedInSequenceBuilder: React.FC<LinkedInSequenceBuilderProps> = ({
  sequence,
  onChangeSequence,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [activeStepMenu, setActiveStepMenu] = useState(false);

  const handleAddStep = (type: StepType) => {
    const newStep: SequenceStep = {
      id: 'step-' + Date.now(),
      type,
      delayAmount: sequence.length === 0 ? 0 : 2,
      delayUnit: 'days',
      subject: type === 'inmail' ? 'Collaboration idea for {{companyName}}' : undefined,
      message:
        type === 'connection_request'
          ? 'Hi {{firstName}}, noticed your stellar work at {{companyName}}. Would love to connect and exchange insights on scaling {{industry}}!'
          : type === 'followup_message'
          ? 'Thanks for connecting, {{firstName}}! Saw your recent growth at {{companyName}}. We recently helped similar teams streamline lead acquisition by 3x. Open to a brief chat?'
          : type === 'inmail'
          ? 'Hi {{firstName}}, reached out directly because your focus on revenue at {{companyName}} aligns closely with a benchmark report we just published.'
          : undefined,
    };
    onChangeSequence([...sequence, newStep]);
    setActiveStepMenu(false);
  };

  const handleRemoveStep = (id: string) => {
    onChangeSequence(sequence.filter((s) => s.id !== id));
  };

  const handleMoveStep = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sequence.length) return;
    const newSteps = [...sequence];
    const [moved] = newSteps.splice(index, 1);
    newSteps.splice(targetIndex, 0, moved);
    onChangeSequence(newSteps);
  };

  const handleUpdateStep = (id: string, updates: Partial<SequenceStep>) => {
    onChangeSequence(
      sequence.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const insertTag = (stepId: string, tag: string, field: 'message' | 'subject' = 'message') => {
    const step = sequence.find((s) => s.id === stepId);
    if (!step) return;
    const currentVal = step[field] || '';
    handleUpdateStep(stepId, { [field]: currentVal + (currentVal ? ' ' : '') + tag });
  };

  const renderWithSampleData = (text?: string) => {
    if (!text) return '';
    let res = text;
    PERSONALIZATION_TAGS.forEach((p) => {
      res = res.replace(new RegExp(p.tag, 'g'), p.sample);
    });
    return res;
  };

  return (
    <div className="space-y-4 font-sans text-xs">
      {/* Header Controls */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-[#262626]">
        <div>
          <span className="text-xs font-bold text-slate-900 dark:text-white block">
            Custom Multi-Touch Sequence Flow
          </span>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Configure touchpoints, time delays, and personalized messaging logic.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => setShowPreview(!showPreview)}
            leftIcon={<PreviewIcon className="w-3.5 h-3.5 text-emerald-500" />}
          >
            {showPreview ? 'Edit Sequence' : 'Preview with Sample Data'}
          </Button>
        </div>
      </div>

      {showPreview ? (
        /* Preview Flow */
        <div className="space-y-4 p-4 rounded-2xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-[#222]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#202020]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                SC
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  {SAMPLE_LEAD.firstName} {SAMPLE_LEAD.lastName}
                </span>
                <span className="text-[10px] text-slate-400">
                  {SAMPLE_LEAD.jobTitle} • {SAMPLE_LEAD.companyName} ({SAMPLE_LEAD.city})
                </span>
              </div>
            </div>
            <Badge variant="emerald" size="sm">
              Sample Lead Preview
            </Badge>
          </div>

          <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-300 dark:before:bg-[#2A2A2A]">
            {sequence.map((step, idx) => {
              const meta = STEP_META[step.type];
              const Icon = meta.icon;
              return (
                <div key={step.id} className="relative space-y-1.5">
                  <div className="absolute -left-[27px] top-0 w-6 h-6 rounded-full bg-white dark:bg-[#1A1A1A] border-2 border-emerald-500 flex items-center justify-center text-emerald-500 shadow-xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">
                      Step {idx + 1}: {meta.title}
                    </span>
                    {idx > 0 && (
                      <span className="text-[10px] font-mono text-slate-400 bg-slate-200/50 dark:bg-[#202020] px-2 py-0.5 rounded-full">
                        Wait {step.delayAmount} {step.delayUnit}
                      </span>
                    )}
                  </div>
                  {meta.hasSubject && step.subject && (
                    <div className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-[#181818] p-2.5 rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
                      <span className="text-slate-400 block text-[10px] font-normal">Subject:</span>
                      {renderWithSampleData(step.subject)}
                    </div>
                  )}
                  {meta.hasMessage && step.message && (
                    <div className="text-[11px] text-slate-700 dark:text-slate-300 bg-white dark:bg-[#181818] p-3 rounded-xl border border-slate-200 dark:border-[#2A2A2A] whitespace-pre-wrap leading-relaxed">
                      {renderWithSampleData(step.message)}
                    </div>
                  )}
                  {!meta.hasMessage && (
                    <div className="text-[10px] text-slate-400 italic">
                      {meta.desc}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Builder View */
        <div className="space-y-4">
          {sequence.length === 0 ? (
            <div className="text-center py-8 p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-[#2A2A2A] space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">
                  No sequence steps configured yet
                </span>
                <p className="text-[11px] text-slate-400">
                  Add your first automated step below to build a high-converting multi-touch outreach cadence.
                </p>
              </div>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => handleAddStep('connection_request')}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Connection Request
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {sequence.map((step, idx) => {
                const meta = STEP_META[step.type];
                const Icon = meta.icon;
                return (
                  <div
                    key={step.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#262626] shadow-xs space-y-3"
                  >
                    {/* Step Bar */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-xl flex items-center justify-center border ${meta.color}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-slate-900 dark:text-white text-xs">
                              Step {idx + 1}: {meta.title}
                            </span>
                            <span className="text-[10px] text-slate-400">• {meta.desc}</span>
                          </div>
                        </div>
                      </div>

                      {/* Move & Delete Actions */}
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveStep(idx, 'up')}
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white disabled:opacity-30 cursor-pointer"
                          title="Move Up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === sequence.length - 1}
                          onClick={() => handleMoveStep(idx, 'down')}
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white disabled:opacity-30 cursor-pointer"
                          title="Move Down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveStep(step.id)}
                          className="p-1 text-rose-400 hover:text-rose-500 cursor-pointer ml-1"
                          title="Remove Step"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Delay Selector */}
                    {idx > 0 && (
                      <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-[#121212] rounded-xl border border-slate-200/70 dark:border-[#222]">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                          Wait
                        </span>
                        <input
                          type="number"
                          min="1"
                          max="30"
                          value={step.delayAmount}
                          onChange={(e) =>
                            handleUpdateStep(step.id, { delayAmount: parseInt(e.target.value) || 1 })
                          }
                          className="w-14 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white font-mono text-center text-xs"
                        />
                        <select
                          value={step.delayUnit}
                          onChange={(e) =>
                            handleUpdateStep(step.id, { delayUnit: e.target.value as 'hours' | 'days' })
                          }
                          className="px-2 py-0.5 rounded-lg border border-slate-200 dark:border-[#333] bg-white dark:bg-[#1A1A1A] text-slate-900 dark:text-white text-xs"
                        >
                          <option value="hours">Hours</option>
                          <option value="days">Days</option>
                        </select>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          after Step {idx} completes
                        </span>
                      </div>
                    )}

                    {/* InMail Subject */}
                    {meta.hasSubject && (
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          InMail Subject
                        </label>
                        <input
                          type="text"
                          value={step.subject || ''}
                          onChange={(e) => handleUpdateStep(step.id, { subject: e.target.value })}
                          placeholder="Subject line with tags..."
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#333] bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-white text-xs focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                    )}

                    {/* Message Body & Personalization Tags */}
                    {meta.hasMessage && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                            Message Template
                          </label>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {(step.message || '').length} characters
                          </span>
                        </div>

                        <textarea
                          rows={3}
                          value={step.message || ''}
                          onChange={(e) => handleUpdateStep(step.id, { message: e.target.value })}
                          placeholder="Write your message. Insert dynamic tags to personalize..."
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-[#333] bg-slate-50 dark:bg-[#121212] text-slate-900 dark:text-white text-xs leading-relaxed focus:ring-1 focus:ring-emerald-500 font-sans"
                        />

                        {/* Tag Insert Chips */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                          <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">
                            Tags:
                          </span>
                          {PERSONALIZATION_TAGS.map((p) => (
                            <button
                              key={p.tag}
                              type="button"
                              onClick={() => insertTag(step.id, p.tag)}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#202020] hover:bg-emerald-500/10 hover:text-emerald-400 text-slate-600 dark:text-slate-300 text-[10px] font-mono border border-slate-200 dark:border-[#2A2A2A] transition-colors cursor-pointer"
                              title={`Insert ${p.label} (e.g. ${p.sample})`}
                            >
                              +{p.tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Add Step Dropdown / Controls */}
          <div className="relative">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => setActiveStepMenu(!activeStepMenu)}
                leftIcon={<Plus className="w-3.5 h-3.5 text-emerald-500" />}
              >
                Add Sequence Step
              </Button>
            </div>

            {activeStepMenu && (
              <div className="absolute left-0 top-full mt-2 w-72 rounded-2xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2E2E2E] shadow-xl p-2 z-50 space-y-1 animate-in fade-in zoom-in-95">
                {(Object.keys(STEP_META) as StepType[]).map((type) => {
                  const item = STEP_META[type];
                  const Icon = item.icon;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleAddStep(type)}
                      className="w-full flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-[#242424] transition-colors text-left group cursor-pointer"
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center border mt-0.5 ${item.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-xs block group-hover:text-emerald-500 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[10px] text-slate-400 block leading-tight">
                          {item.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
