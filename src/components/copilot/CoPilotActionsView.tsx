import React from 'react';
import { 
  Zap, 
  Play, 
  Search, 
  Mail, 
  Building2, 
  ShieldCheck, 
  Users, 
  PhoneCall, 
  Workflow, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useCoPilot } from '../../context/CoPilotContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const CoPilotActionsView: React.FC = () => {
  const { executableActions, runAction } = useCoPilot();

  const getModuleIcon = (module: string) => {
    switch (module.toLowerCase()) {
      case 'lead finder':
        return <Search className="w-4 h-4 text-primary" />;
      case 'cold email':
        return <Mail className="w-4 h-4 text-primary" />;
      case 'deliverability':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'deals crm':
        return <Building2 className="w-4 h-4 text-emerald-500" />;
      default:
        return <Workflow className="w-4 h-4 text-primary" />;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Overview Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
        <h2 className="text-lg font-black text-slate-950 dark:text-white">
          Autonomous AI Actions Registry
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          Pre-authorized tool endpoints allowing Tricksy AI to read, synthesize, and write data directly to your Outtricks single PostgreSQL database partition.
        </p>
      </div>

      {/* Grid of Executable Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {executableActions.map((action) => (
          <div
            key={action.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-primary/40 transition-all shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020]">
                    {getModuleIcon(action.module)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {action.name}
                    </h3>
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                      {action.module}
                    </span>
                  </div>
                </div>
                <Badge variant="primary" size="sm">
                  {action.executionCount} Executions
                </Badge>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {action.description}
              </p>

              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Sample Trigger Prompt
                </span>
                <p className="text-xs font-mono text-slate-800 dark:text-slate-200">
                  "{action.sampleInput}"
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-[#202020]">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active & Authorized</span>
              </span>

              <Button
                variant="primary"
                size="sm"
                onClick={() => runAction(action.id)}
                className="text-xs"
              >
                <Play className="w-3.5 h-3.5 mr-1" />
                <span>Test in Chat</span>
              </Button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
