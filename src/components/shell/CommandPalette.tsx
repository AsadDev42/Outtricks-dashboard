import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
import { 
  Search, 
  Sparkles, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  Workflow, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Code2, 
  Users, 
  Inbox, 
  Briefcase, 
  Settings, 
  Sun, 
  Moon, 
  LogOut, 
  ArrowRight,
  DollarSign,
  Plus
} from 'lucide-react';

interface CommandItem {
  id: string;
  category: 'Modules' | 'Quick Actions' | 'Settings';
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
}

export const CommandPalette: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const { logout } = useAuth();
  const { success } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearch('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const commands: CommandItem[] = [
    // Core Modules
    {
      id: 'cmd_copilot',
      category: 'Modules',
      title: 'Tricksy AI Strategic Assistant',
      subtitle: 'Ask Tricksy AI questions, diagnose pipeline health, and draft campaigns',
      icon: <Sparkles className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/copilot'),
    },
    {
      id: 'cmd_agents',
      category: 'Modules',
      title: 'AI Agents & Autonomous Workforce',
      subtitle: 'Deploy specialized SDR, Researcher, and Copywriter agents',
      icon: <Users className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/ai-agents'),
    },
    {
      id: 'cmd_lead_finder',
      category: 'Modules',
      title: 'Lead Finder (8D Discovery Matrix)',
      subtitle: 'Search 480M+ global B2B decision-makers',
      icon: <Search className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/lead-finder'),
    },
    {
      id: 'cmd_leads',
      category: 'Modules',
      title: 'Leads Management Repository',
      subtitle: 'Decision-makers, contact tags, and export',
      icon: <Users className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/leads'),
    },
    {
      id: 'cmd_companies',
      category: 'Modules',
      title: 'Target Companies & Accounts',
      subtitle: 'Firmographics, technographics, employee growth, and ABM',
      icon: <Building2 className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/companies'),
    },
    {
      id: 'cmd_crm',
      category: 'Modules',
      title: 'Deals CRM Pipeline (6-Stage Kanban)',
      subtitle: 'Opportunity tracking, ARR forecasting, and 360° drawer',
      icon: <Building2 className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/crm'),
    },
    {
      id: 'cmd_inbox',
      category: 'Modules',
      title: 'Master Unified Inbox',
      subtitle: 'Unified omnichannel conversations, sentiment tags, and Cal.com meeting scheduler',
      icon: <Inbox className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/inbox'),
    },
    {
      id: 'cmd_email',
      category: 'Modules',
      title: 'Cold Email Multi-Inbox Studio',
      subtitle: '24 rotating Google & Microsoft inboxes, warmup, and spintax',
      icon: <Mail className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/cold-email'),
    },
    {
      id: 'cmd_linkedin',
      category: 'Modules',
      title: 'LinkedIn Safe Cloud Automation',
      subtitle: '1:1 residential 4G proxies, humanized delay pacing, and safety caps',
      icon: <Linkedin className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/linkedin'),
    },
    {
      id: 'cmd_voice',
      category: 'Modules',
      title: 'Sub-400ms Voice AI SDR Center',
      subtitle: 'Real-time WebRTC conversational callers (Sophia, Liam, Maya)',
      icon: <PhoneCall className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/voice-ai'),
    },
    {
      id: 'cmd_upwork',
      category: 'Modules',
      title: 'Upwork Bidding AI Studio',
      subtitle: 'Live RSS job feed, AI cover letter generator, and auto-bidding triggers',
      icon: <Briefcase className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/upwork'),
    },
    {
      id: 'cmd_workflows',
      category: 'Modules',
      title: 'Workflows & DAG Canvas Builder',
      subtitle: 'Multi-channel automation flows connecting all outreach channels',
      icon: <Workflow className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/flow-builder'),
    },
    {
      id: 'cmd_analytics',
      category: 'Modules',
      title: 'Revenue Intelligence & Analytics Hub',
      subtitle: 'Multi-touch attribution, campaign ROI, and predictive pipeline forecasting',
      icon: <BarChart3 className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/analytics'),
    },
    {
      id: 'cmd_settings',
      category: 'Modules',
      title: 'Workspace Settings & Team Governance',
      subtitle: 'Profile, organization, team RBAC, billing, credits, and audit center',
      icon: <Settings className="w-4 h-4 text-slate-500" />,
      action: () => handleNavigate('/settings'),
    },

    // Quick Actions
    {
      id: 'cmd_action_new_lead',
      category: 'Quick Actions',
      title: 'Search New Decision-Makers in Lead Finder',
      subtitle: 'Open 8-dimension filter matrix',
      icon: <Plus className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/lead-finder'),
    },
    {
      id: 'cmd_action_new_deal',
      category: 'Quick Actions',
      title: 'Create New Deal in CRM Pipeline',
      subtitle: 'Add qualified opportunity to Kanban stage',
      icon: <DollarSign className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/crm'),
    },
    {
      id: 'cmd_action_new_campaign',
      category: 'Quick Actions',
      title: 'Launch Cold Email Campaign',
      subtitle: 'Configure multi-inbox sequence and warmup',
      icon: <Mail className="w-4 h-4 text-primary" />,
      action: () => handleNavigate('/cold-email'),
    },

    // Settings & Theme
    {
      id: 'cmd_toggle_theme',
      category: 'Settings',
      title: 'Toggle Dark / Light Mode',
      subtitle: 'Switch application interface appearance',
      icon: <Sun className="w-4 h-4 text-amber-500" />,
      action: () => {
        toggleTheme();
        onClose();
      },
    },
    {
      id: 'cmd_logout',
      category: 'Settings',
      title: 'Sign Out of Outtricks Platform',
      subtitle: 'End active session securely',
      icon: <LogOut className="w-4 h-4 text-rose-500" />,
      action: () => {
        logout();
        onClose();
        handleNavigate('/login');
      },
    }
  ];

  const filteredCommands = commands.filter((cmd) => {
    if (!search.trim()) return true;
    const query = search.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(query) ||
      (cmd.subtitle && cmd.subtitle.toLowerCase().includes(query)) ||
      cmd.category.toLowerCase().includes(query)
    );
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(filteredCommands.length, 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1100] flex items-start justify-center pt-[12vh] px-4"
    >
      <div
        className="fixed inset-0 bg-slate-950/70 dark:bg-black/80 backdrop-blur-md transition-opacity duration-200 animate-in fade-in"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-[#161616] rounded-3xl border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150 font-sans">
        
        {/* Search Bar */}
        <div className="relative flex items-center px-5 py-4 border-b border-slate-100 dark:border-[#202020]">
          <Search className="w-5 h-5 text-slate-400 dark:text-slate-500 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, search modules, or jump to a route..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 dark:text-white placeholder:text-slate-400 outline-none font-sans"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-100 dark:bg-[#181818] text-slate-500 rounded border border-slate-200 dark:border-[#2A2A2A]">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[55vh] overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="text-center py-12 text-xs text-slate-400">
              No matching commands found for "{search}"
            </div>
          ) : (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-colors cursor-pointer select-none ${
                    isSelected
                      ? 'bg-primary-muted text-slate-900 dark:text-white ring-1 ring-primary-border'
                      : 'hover:bg-slate-50 dark:hover:bg-[#1C1C1C] text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#181818] shadow-xs shrink-0 border border-slate-100 dark:border-[#2A2A2A]/60">
                      {cmd.icon}
                    </div>
                    <div className="min-w-0 text-left">
                      <div className="text-xs sm:text-sm font-bold truncate">
                        {cmd.title}
                      </div>
                      {cmd.subtitle && (
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {cmd.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      {cmd.category}
                    </span>
                    {isSelected && (
                      <ArrowRight className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Helper */}
        <div className="p-3 bg-slate-50 dark:bg-[#121212] border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-3">
            <span>Use <kbd className="font-mono bg-slate-200 dark:bg-[#181818] px-1.5 py-0.5 rounded">↑</kbd> <kbd className="font-mono bg-slate-200 dark:bg-[#181818] px-1.5 py-0.5 rounded">↓</kbd> to navigate</span>
            <span><kbd className="font-mono bg-slate-200 dark:bg-[#181818] px-1.5 py-0.5 rounded">↵</kbd> to select</span>
          </div>
          <span>Outtricks Command Core</span>
        </div>

      </div>
    </div>
  );
};
