import React from 'react';
import { Settings } from 'lucide-react';

export const SettingsHeader: React.FC = () => {
  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="p-6 bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-xs">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                Workspace Settings & Team Governance
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-mono text-[10px] font-extrabold">
                Enterprise RBAC
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Personal preferences, organization identity, team roles, API tokens, and compliance controls.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

