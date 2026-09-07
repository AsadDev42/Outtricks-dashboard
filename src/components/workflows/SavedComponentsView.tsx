import React from 'react';
import { Bookmark, Plus, ArrowRight, Layers } from 'lucide-react';
import { Button } from '../ui/Button';
import { useWorkflows } from '../../context/WorkflowsContext';

export const SavedComponentsView: React.FC = () => {
  const { savedComponents, setActiveTab } = useWorkflows();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Saved Components & Sub-Graphs ({savedComponents.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Reusable pre-configured workflow building blocks ready to drop into any canvas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {savedComponents.map((comp) => (
          <div key={comp.id} className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 text-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-950 dark:text-white">{comp.name}</span>
                <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 font-mono text-[10px] font-bold uppercase">
                  {comp.type}
                </span>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {comp.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Used in {comp.usageCount} flows</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveTab('builder')}
                rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Insert in Canvas
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
