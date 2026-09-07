import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Mail, 
  Clock, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Code2, 
  ChevronRight,
  Eye,
  Sliders
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useEmail, SequenceStep } from '../../context/EmailContext';
import { useToast } from '../../context/ToastContext';

export interface SequencesBuilderProps {
  onOpenCreateSequence: () => void;
}

export const SequencesBuilder: React.FC<SequencesBuilderProps> = ({
  onOpenCreateSequence,
}) => {
  const { sequences } = useEmail();
  const [selectedSeqId, setSelectedSeqId] = useState<string>(sequences[0]?.id || 'seq_1');
  const { success } = useToast();

  const activeSeq = sequences.find((s) => s.id === selectedSeqId) || sequences[0];

  const [steps, setSteps] = useState<SequenceStep[]>(activeSeq?.steps || []);

  const handleAddEmailStep = () => {
    const nextStepNum = steps.length + 1;
    const newStep: SequenceStep = {
      id: `s_${Date.now()}`,
      stepNumber: nextStepNum,
      type: 'email',
      subject: 'Re: Quick follow up for {{first_name}}',
      body: 'Hi {{first_name}},\n\nWanted to bump this in case it got buried under your inbox. Did you get a chance to review our architecture overview?\n\nBest,',
    };
    setSteps([...steps, newStep]);
    success('Added email follow-up step.', 'Step Added');
  };

  const handleAddDelayStep = () => {
    const nextStepNum = steps.length + 1;
    const newStep: SequenceStep = {
      id: `s_${Date.now()}`,
      stepNumber: nextStepNum,
      type: 'delay',
      delayDays: 3,
    };
    setSteps([...steps, newStep]);
    success('Added 3-day wait delay.', 'Delay Added');
  };

  const handleRemoveStep = (stepId: string) => {
    setSteps(steps.filter((s) => s.id !== stepId));
  };

  return (
    <div className="space-y-5 font-sans">
      
      {/* Top Selector & Stats Strip */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold uppercase text-[10px]">Active Sequence:</span>
          <select
            value={selectedSeqId}
            onChange={(e) => setSelectedSeqId(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-extrabold text-slate-900 dark:text-white outline-none cursor-pointer"
          >
            {sequences.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Enrolled</div>
            <div className="text-xs font-black text-slate-900 dark:text-white font-mono">
              {activeSeq?.enrolledCount.toLocaleString()} Leads
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Open Rate</div>
            <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {activeSeq?.openRate}%
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Reply Rate</div>
            <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {activeSeq?.replyRate}%
            </div>
          </div>
        </div>
      </div>

      {/* Steps Visual Canvas */}
      <div className="space-y-4 max-w-4xl">
        {steps.map((step, idx) => {
          if (step.type === 'delay') {
            return (
              <div key={step.id} className="flex items-center justify-center my-3 relative">
                <div className="px-4 py-2 rounded-2xl bg-slate-100 dark:bg-[#181818] text-xs text-slate-600 dark:text-slate-300 font-mono font-bold flex items-center gap-2 border border-slate-200/80 dark:border-[#202020] shadow-2xs">
                  <Clock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Wait {step.delayDays || 2} business days before next touch</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(step.id)}
                    className="text-slate-400 hover:text-rose-500 ml-2 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div
              key={step.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#202020] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                    {idx + 1}
                  </span>
                  <span className="font-extrabold text-xs text-slate-900 dark:text-white uppercase tracking-wider">
                    Touch #{idx + 1} • Cold Email Step
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                    ✓ Spintax & Personalization Active
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStep(step.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 cursor-pointer"
                    title="Remove step"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Subject Line</label>
                <input
                  type="text"
                  value={step.subject || ''}
                  onChange={(e) => {
                    const next = [...steps];
                    next[idx].subject = e.target.value;
                    setSteps(next);
                  }}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 font-mono"
                />
              </div>

              {/* Body */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Email Body Copy</label>
                <textarea
                  rows={4}
                  value={step.body || ''}
                  onChange={(e) => {
                    const next = [...steps];
                    next[idx].body = e.target.value;
                    setSteps(next);
                  }}
                  className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 leading-relaxed font-sans"
                />
              </div>

              {/* Personalization Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[10px] text-slate-400 font-mono">
                <span>Variables:</span>
                {['{{first_name}}', '{{company}}', '{{title}}', '{{sender_name}}'].map((v) => (
                  <span key={v} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                    {v}
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {/* Step Adder Toolbar */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t border-slate-200/60 dark:border-[#202020]">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddDelayStep}
            leftIcon={<Clock className="w-3.5 h-3.5" />}
          >
            Add Wait Delay
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleAddEmailStep}
            leftIcon={<Mail className="w-3.5 h-3.5" />}
          >
            Add Email Step
          </Button>
        </div>
      </div>

    </div>
  );
};
