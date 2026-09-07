import React from 'react';
import { 
  Bot, 
  Play, 
  Pause, 
  Settings, 
  ShieldCheck, 
  Clock, 
  Zap, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  MoreVertical,
  Edit,
  Trash2,
  Copy,
  SlidersHorizontal,
  Mail,
  Linkedin,
  PhoneCall,
  Search,
  Building2
} from 'lucide-react';
import { AgentRecord, useAgents } from '../../context/AgentsContext';

interface AgentCardProps {
  agent: AgentRecord;
  onOpenDetail: (agent: AgentRecord) => void;
  onOpenTest: (agent: AgentRecord) => void;
  onOpenEdit: (agent: AgentRecord) => void;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  onOpenDetail,
  onOpenTest,
  onOpenEdit
}) => {
  const { toggleAgentStatus, deleteAgent } = useAgents();
  const [showMenu, setShowMenu] = React.useState(false);

  const getModuleIcon = (module: string) => {
    switch (module) {
      case 'crm': return Building2;
      case 'lead-finder': return Search;
      case 'email': return Mail;
      case 'linkedin': return Linkedin;
      case 'voice': return PhoneCall;
      default: return Zap;
    }
  };

  return (
    <div
      onClick={() => onOpenDetail(agent)}
      className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/90 dark:border-[#2A2A2A] hover:border-emerald-500/50 dark:hover:border-emerald-500/50 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-4 flex flex-col justify-between group"
    >
      {/* Top Row: Avatar, Name, Status Toggle & Menu */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${agent.avatarBg} text-white flex items-center justify-center font-bold text-sm shadow-xs`}>
              {agent.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-500 transition-colors">
                  {agent.name}
                </h3>
                <span className="text-[10px] font-bold text-slate-400 font-sans">
                  {agent.version}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {agent.role}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => toggleAgentStatus(agent.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors ${
                agent.status === 'Active'
                  ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-rose-500/10 hover:text-rose-500'
                  : 'bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-500'
              }`}
              title={agent.status === 'Active' ? 'Pause Agent' : 'Resume Agent'}
            >
              {agent.status === 'Active' ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active</span>
                </>
              ) : (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Paused</span>
                </>
              )}
            </button>

            {/* Context Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:text-slate-200 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {showMenu && (
                <div 
                  className="absolute right-0 top-8 z-30 w-44 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] shadow-xl py-1 text-xs animate-in fade-in"
                  onClick={() => setShowMenu(false)}
                >
                  <button
                    onClick={() => onOpenEdit(agent)}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium"
                  >
                    <Edit className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Edit Configuration</span>
                  </button>
                  <button
                    onClick={() => onOpenTest(agent)}
                    className="w-full px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Run Sandbox Test</span>
                  </button>
                  <div className="border-t border-slate-100 dark:border-[#202020] my-1" />
                  <button
                    onClick={() => deleteAgent(agent.id)}
                    className="w-full px-3 py-2 text-left hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 text-rose-600 dark:text-rose-400 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Agent</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description & Objective */}
        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
          {agent.description}
        </p>

        {/* Badges & Connected Tools */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-2 flex-wrap text-[10px] font-bold">
            <span className={`px-2 py-0.5 rounded ${
              agent.autonomyLevel === 'Autonomous' 
                ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
            }`}>
              {agent.autonomyLevel}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-400">
              Max {agent.maxDailyActions} actions/day
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] text-slate-400 font-bold">Tools:</span>
            {agent.tools.filter(t => t.enabled).slice(0, 4).map((tool) => {
              const IconComp = getModuleIcon(tool.module);
              return (
                <span 
                  key={tool.id} 
                  className="px-2 py-0.5 rounded-md bg-slate-50 dark:bg-[#141414] border border-slate-200/60 dark:border-[#2A2A2A] text-[10px] text-slate-700 dark:text-slate-300 flex items-center gap-1"
                  title={tool.description}
                >
                  <IconComp className="w-2.5 h-2.5 text-emerald-500" />
                  <span>{tool.name}</span>
                </span>
              );
            })}
            {agent.tools.filter(t => t.enabled).length > 4 && (
              <span className="text-[10px] text-slate-400 font-bold">
                +{agent.tools.filter(t => t.enabled).length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Metrics Bar & Quick Action */}
      <div className="pt-3 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-xs" onClick={(e) => e.stopPropagation()}>
        <div className="space-y-0.5">
          <div className="text-[11px] font-extrabold text-slate-900 dark:text-white">
            {agent.metrics.completedTasks.toLocaleString()} Tasks
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            {agent.metrics.successRate}% Success • {agent.metrics.avgLatencyMs}ms
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onOpenTest(agent)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-emerald-500/10 text-slate-700 dark:text-slate-200 hover:text-emerald-500 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer border border-slate-200/60 dark:border-[#202020]"
          >
            <Play className="w-3 h-3 text-emerald-500" />
            <span>Test</span>
          </button>
          <button
            onClick={() => onOpenDetail(agent)}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
          >
            <span>Config</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
