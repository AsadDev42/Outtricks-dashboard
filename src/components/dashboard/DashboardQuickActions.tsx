import React from 'react';
import { 
  Search, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  Workflow, 
  Sparkles, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { Badge } from '../ui/Badge';

export interface DashboardQuickActionsProps {
  onNavigateTab: (tabId: string) => void;
}

export const DashboardQuickActions: React.FC<DashboardQuickActionsProps> = ({ onNavigateTab }) => {
  const actions = [
    {
      id: 'leads',
      title: '8D B2B Lead Finder',
      subtitle: 'Source 480M+ verified global contacts with multiDimensional search.',
      icon: Search,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      badge: '480M Index',
      targetTab: 'leads',
    },
    {
      id: 'flow',
      title: 'Visual Flow Builder',
      subtitle: 'Build multi-channel DAG graphs with condition-based execution.',
      icon: Workflow,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      badge: 'DAG Canvas',
      targetTab: 'flow',
    },
    {
      id: 'voice',
      title: 'Voice AI SDR Studio',
      subtitle: 'Launch conversational sub-400ms callers that book live demos.',
      icon: PhoneCall,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      badge: 'Sub-400ms',
      targetTab: 'voice',
    },
    {
      id: 'pipeline',
      title: 'Deals CRM Pipeline',
      subtitle: 'Manage Kanban stages and ARR attribution with zero sync lag.',
      icon: Building2,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
      badge: '$573K Active',
      targetTab: 'pipeline',
    },
  ];

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between">
        <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
          Quick Launch Outbound Engines
        </h3>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          Single PostgreSQL Data Layer
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <div
              key={act.id}
              onClick={() => onNavigateTab(act.targetTab)}
              className="group p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl ${act.iconBg} ${act.iconColor} flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}>
                  <Icon className="w-4 h-4" />
                </div>
                <Badge variant="emerald" size="sm">
                  {act.badge}
                </Badge>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {act.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {act.subtitle}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-[11px] font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline">
                <span>Launch Engine</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
