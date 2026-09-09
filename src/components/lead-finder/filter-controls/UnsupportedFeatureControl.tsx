import React from 'react';
import { Lock, Sparkles, ExternalLink } from 'lucide-react';
import { Button } from '../../ui/Button';

interface UnsupportedFeatureControlProps {
  label: string;
  isLocked?: boolean;
  isBeta?: boolean;
  message?: string;
  actionText?: string;
}

export const UnsupportedFeatureControl: React.FC<UnsupportedFeatureControlProps> = ({
  label,
  isLocked = false,
  isBeta = false,
  message,
  actionText = 'Upgrade Plan',
}) => {
  return (
    <div className="p-3 rounded-xl border border-dashed border-slate-200 dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-white/[0.02] text-xs space-y-2">
      <div className="flex items-start gap-2">
        {isLocked ? (
          <Lock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        ) : isBeta ? (
          <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        ) : (
          <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        )}
        <div>
          <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
            <span>{label}</span>
            {isLocked && (
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                Enterprise
              </span>
            )}
            {isBeta && (
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Beta
              </span>
            )}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
            {message ||
              (isLocked
                ? `Advanced ${label.toLowerCase()} filtering is available for Enterprise workspaces with custom enrichment pipelines.`
                : `${label} criteria is currently in closed evaluation and will sync with your workspace automated web crawlers.`)}
          </p>
        </div>
      </div>

      <div className="pt-1 flex items-center justify-end">
        <Button
          size="sm"
          variant="outline"
          onClick={() => {}}
          className="text-[11px] h-7 gap-1"
        >
          <span>{actionText}</span>
        </Button>
      </div>
    </div>
  );
};
