import React from 'react';
import { Workflow, Plus, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const UpworkSequencesView: React.FC = () => {
  return (
    <div className="space-y-4 font-sans">
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Workflow className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Proposal Follow-Up Sequences
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Automated multi-touch nurture steps dispatched if a client views your proposal but hasn't initiated chat.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs font-mono">
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">3-Touch Proposal Nurture Sequence</span>
              <Badge variant="emerald" size="sm">Active</Badge>
            </div>
            <div className="text-[11px] text-slate-500 font-sans">
              Step 1: Submit Proposal → Step 2: Wait 48h → Step 3: Send Loom Architecture Link
            </div>
          </div>
          <Button variant="outline" size="sm">Edit Sequence</Button>
        </div>
      </div>
    </div>
  );
};
