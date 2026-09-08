import React from 'react';
import { 
  Sparkles, 
  Plus, 
  MessageSquare, 
  Zap, 
  BookOpen, 
  Database,
  Cpu,
  Coins
} from 'lucide-react';
import { useCoPilot, CoPilotSubTab } from '../../context/CoPilotContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const CoPilotHeader: React.FC = () => {
  const { activeTab, setActiveTab, createNewConversation } = useCoPilot();

  const tabs: { id: CoPilotSubTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'chat', label: 'Chat & TRIXIE AI', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'actions', label: 'Actions Registry', icon: <Zap className="w-4 h-4" />, badge: '4 Core' },
    { id: 'prompts', label: 'Prompts Library', icon: <BookOpen className="w-4 h-4" />, badge: '12' },
    { id: 'kb', label: 'Knowledge Base', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-bold shadow-md shadow-primary/30 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="text-xl font-black text-slate-950 dark:text-white font-sans truncate">
                TRIXIE AI
              </h1>
              <Badge variant="emerald" size="sm" dot>
                Online
              </Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-sans truncate">
              Autonomous conversational AI assistant connected directly to your PostgreSQL database, leads, and outreach channels.
            </p>
          </div>
        </div>

        {/* Telemetry & Quick Action — never clip */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs">
            <Cpu className="w-3.5 h-3.5 text-primary" />
            <span className="text-slate-600 dark:text-slate-400 font-mono">Claude 3.5 Sonnet</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 dark:bg-white/[0.04] border border-primary/20 dark:border-primary/30 text-xs text-primary font-bold font-mono whitespace-nowrap">
            <Coins className="w-3.5 h-3.5 text-primary" />
            <span>1,840 Credits</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={createNewConversation}
            leftIcon={<Plus className="w-4 h-4" />}
            className="shrink-0 whitespace-nowrap"
          >
            New Chat
          </Button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer select-none shrink-0 ${
                isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'bg-white dark:bg-[#161616] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-[#202020]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 dark:bg-[#181818] text-slate-500'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
