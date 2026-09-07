import React, { useState } from 'react';
import {
  PhoneCall,
  Play,
  Pause,
  Clock,
  ShieldCheck,
  Zap,
  Users,
  AlertCircle,
  CheckCircle2,
  Filter,
  Plus,
  ArrowUpRight,
  Sparkles,
  PhoneForwarded,
  RotateCcw
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useVoiceAi } from '../../context/VoiceAiContext';
import { useToast } from '../../context/ToastContext';

interface QueueItem {
  id: string;
  name: string;
  title: string;
  company: string;
  phone: string;
  timezone: string;
  localTime: string;
  priority: 'urgent' | 'high' | 'medium' | 'retry';
  status: 'ready' | 'calling' | 'waiting_window' | 'scheduled';
  scheduledFor: string;
  assignedAgent: string;
  score: number;
}

const INITIAL_QUEUE: QueueItem[] = [
  {
    id: 'q-1',
    name: 'Marcus Vance',
    title: 'VP of Growth & Pipeline',
    company: 'HyperScale Systems',
    phone: '+1 (415) 890-2134',
    timezone: 'PST (UTC-8)',
    localTime: '10:24 AM',
    priority: 'urgent',
    status: 'ready',
    scheduledFor: 'Immediate',
    assignedAgent: 'Maya (Senior SDR)',
    score: 94
  },
  {
    id: 'q-2',
    name: 'Sarah Lindqvist',
    title: 'Director of RevOps',
    company: 'Nordic Cloud Tech',
    phone: '+1 (212) 555-0199',
    timezone: 'EST (UTC-5)',
    localTime: '1:24 PM',
    priority: 'high',
    status: 'ready',
    scheduledFor: 'In 3 mins',
    assignedAgent: 'Alex (Executive BDR)',
    score: 88
  },
  {
    id: 'q-3',
    name: 'David Kalu',
    title: 'Chief Operating Officer',
    company: 'FinLeap Global',
    phone: '+1 (312) 420-7711',
    timezone: 'CST (UTC-6)',
    localTime: '12:24 PM',
    priority: 'high',
    status: 'ready',
    scheduledFor: 'In 7 mins',
    assignedAgent: 'Maya (Senior SDR)',
    score: 85
  },
  {
    id: 'q-4',
    name: 'Elena Rostova',
    title: 'Head of Sales Development',
    company: 'Vertex Analytics',
    phone: '+44 20 7946 0912',
    timezone: 'GMT (UTC+0)',
    localTime: '6:24 PM',
    priority: 'retry',
    status: 'waiting_window',
    scheduledFor: 'Tomorrow 9:00 AM',
    assignedAgent: 'Chloe (International SDR)',
    score: 76
  },
  {
    id: 'q-5',
    name: 'Jordan Miller',
    title: 'Co-Founder & CEO',
    company: 'OmniFlow AI',
    phone: '+1 (650) 314-8890',
    timezone: 'PST (UTC-8)',
    localTime: '10:24 AM',
    priority: 'urgent',
    status: 'ready',
    scheduledFor: 'Immediate',
    assignedAgent: 'Alex (Executive BDR)',
    score: 96
  },
  {
    id: 'q-6',
    name: 'Tanya Henderson',
    title: 'Demand Generation Lead',
    company: 'DataSpoke Corp',
    phone: '+1 (404) 712-4432',
    timezone: 'EST (UTC-5)',
    localTime: '1:24 PM',
    priority: 'medium',
    status: 'scheduled',
    scheduledFor: 'In 25 mins',
    assignedAgent: 'Maya (Senior SDR)',
    score: 69
  }
];

export const VoiceAiQueueView: React.FC = () => {
  const { startOutboundCall } = useVoiceAi();
  const { success, info } = useToast();
  const [queue, setQueue] = useState<QueueItem[]>(INITIAL_QUEUE);
  const [isQueueRunning, setIsQueueRunning] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'urgent' | 'high' | 'retry'>('all');

  const handleStartCall = (item: QueueItem) => {
    startOutboundCall(item.name, item.company, item.phone);
    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'calling' } : q));
    success(`Sub-400ms WebRTC line connecting to ${item.name} (${item.phone})...`);
  };

  const handleSkip = (id: string) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    info('Lead postponed to end of daily queue rotation.');
  };

  const filteredQueue = queue.filter(item => {
    if (selectedFilter === 'all') return true;
    return item.priority === selectedFilter;
  });

  const readyCount = queue.filter(q => q.status === 'ready').length;

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header & Queue Metrics */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <PhoneForwarded className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              AI SDR Outbound Call Queue
            </h1>
            <Badge variant="emerald" size="sm" className="hidden sm:inline-flex">
              Sub-400ms WebRTC
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
            Autonomous priority queue dispatching verified leads to conversational AI voice agents within legal local timezone calling windows (TCPA safe).
          </p>
        </div>

        {/* Global Dispatch Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant={isQueueRunning ? 'outline' : 'primary'}
            size="sm"
            onClick={() => {
              setIsQueueRunning(!isQueueRunning);
              if (isQueueRunning) {
                info('Queue paused. Active calls will complete normally.');
              } else {
                success('Autonomous SDR queue resumed.');
              }
            }}
            leftIcon={isQueueRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          >
            {isQueueRunning ? 'Pause Queue' : 'Resume Auto-Dialer'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => info('Bulk Lead List Import modal ready.')}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add to Queue
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Leads In Queue</span>
            <Users className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            {queue.length}
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            {readyCount} ready to dial now
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Daily Call Quota</span>
            <Zap className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-mono">
            384 / 500
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            76.8% of daily safety ceiling
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>AI SDR Concurrency</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            8 Parallel
          </div>
          <div className="text-[10px] text-slate-500 dark:text-slate-400">
            Sub-400ms 11Labs v2.5 Turbo
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Guardrails</span>
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            100% TCPA
          </div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
            9 AM – 5 PM local strictly enforced
          </div>
        </div>
      </div>

      {/* Filter Tabs & Queue Status */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase font-mono mr-1">
            Priority:
          </span>
          {(['all', 'urgent', 'high', 'retry'] as const).map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                selectedFilter === filter
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2A2A2A]'
              }`}
            >
              {filter === 'all' ? `All (${queue.length})` : filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <div className={`w-2 h-2 rounded-full ${isQueueRunning ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <span>Queue Status: <strong className="text-slate-900 dark:text-white">{isQueueRunning ? 'Live Active' : 'Paused'}</strong></span>
        </div>
      </div>

      {/* Queue Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-[#242424] bg-slate-50/75 dark:bg-[#1A1A1A]/80 text-slate-500 dark:text-slate-400 font-mono text-[10px] uppercase">
                <th className="py-3 px-4 font-bold">Prospect & Company</th>
                <th className="py-3 px-4 font-bold">Phone & Timezone</th>
                <th className="py-3 px-4 font-bold">Intent Score</th>
                <th className="py-3 px-4 font-bold">Priority</th>
                <th className="py-3 px-4 font-bold">Assigned SDR</th>
                <th className="py-3 px-4 font-bold">Schedule</th>
                <th className="py-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#202020]">
              {filteredQueue.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/70 dark:hover:bg-[#1C1C1C] transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <div className="font-extrabold text-slate-900 dark:text-white text-xs">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {item.title} • <span className="font-medium text-slate-700 dark:text-slate-300">{item.company}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="space-y-0.5 font-mono">
                      <div className="font-bold text-slate-900 dark:text-white text-xs">
                        {item.phone}
                      </div>
                      <div className="text-[10px] text-slate-500 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{item.localTime} ({item.timezone})</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 bg-slate-100 dark:bg-[#202020] h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            item.score >= 90
                              ? 'bg-emerald-500'
                              : item.score >= 80
                              ? 'bg-blue-500'
                              : 'bg-amber-500'
                          }`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                        {item.score}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        item.priority === 'urgent'
                          ? 'rose'
                          : item.priority === 'high'
                          ? 'emerald'
                          : item.priority === 'retry'
                          ? 'amber'
                          : 'slate'
                      }
                      size="sm"
                    >
                      {item.priority === 'urgent' ? 'Urgent Inbound' : item.priority}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 text-xs font-medium">
                    {item.assignedAgent}
                  </td>

                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#202020] font-mono text-[10px] font-bold text-slate-700 dark:text-slate-300">
                      <Clock className="w-2.5 h-2.5 text-slate-400" />
                      {item.scheduledFor}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleStartCall(item)}
                        leftIcon={<PhoneCall className="w-3 h-3" />}
                        disabled={item.status === 'waiting_window'}
                      >
                        {item.status === 'calling' ? 'Calling...' : 'Call Now'}
                      </Button>

                      <button
                        type="button"
                        onClick={() => handleSkip(item.id)}
                        title="Skip / Postpone"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#202020] transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VoiceAiQueueView;
