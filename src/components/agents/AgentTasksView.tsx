import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  Bot, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  Plus, 
  Search,
  Filter,
  RotateCw,
  RotateCcw,
  Ban,
  X,
  ChevronDown
} from 'lucide-react';
import { useAgents, AgentTask, TaskPriority, TaskStatus } from '../../context/AgentsContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export const AgentTasksView: React.FC = () => {
  const { tasks, searchQuery } = useAgents();
  const { success, info, error } = useToast();

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'running' | 'completed' | 'failed'>('all');
  const [localTasks, setLocalTasks] = useState<AgentTask[]>(tasks);
  const [selectedTask, setSelectedTask] = useState<AgentTask | null>(null);
  const [localSearch, setLocalSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const handleRetry = (taskId: string) => {
    setLocalTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'In Progress' as TaskStatus } : t))
    );
    success('Task re-queued and dispatched to active agent.', 'Task Retried');
  };

  const handleCancel = (taskId: string) => {
    setLocalTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'Cancelled' as TaskStatus } : t))
    );
    info('Task cancelled and removed from execution queue.', 'Task Cancelled');
  };

  const filteredTasks = localTasks.filter((t) => {
    const query = localSearch || searchQuery;
    const matchesSearch = 
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.agentName.toLowerCase().includes(query.toLowerCase()) ||
      t.associatedRecord.toLowerCase().includes(query.toLowerCase());

    const matchesPriority = priorityFilter === 'all' || t.priority.toLowerCase() === priorityFilter.toLowerCase();

    let matchesTab = true;
    if (activeTab === 'pending') matchesTab = t.status === 'Pending';
    else if (activeTab === 'running') matchesTab = t.status === 'In Progress';
    else if (activeTab === 'completed') matchesTab = t.status === 'Completed';
    else if (activeTab === 'failed') matchesTab = t.status === 'Blocked' || (t as any).status === 'Failed';

    return matchesSearch && matchesPriority && matchesTab;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header & Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#2A2A2A]">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
            <CheckSquare className="w-6 h-6 text-emerald-500" />
            <span>Task Backlog</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Manage all autonomous agent tasks and prioritized work queues.
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 w-48 sm:w-56"
            />
          </div>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          >
            <option value="all">All Priorities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button
            onClick={() => success('Task backlog refreshed.', 'Refreshed')}
            className="p-2 rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer"
            title="Refresh"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Filter Tabs: All, Pending, Running, Completed, Failed */}
      <div className="w-full max-w-full overflow-x-auto min-w-0 border-b border-slate-200 dark:border-[#2A2A2A] pb-1 text-xs font-bold no-scrollbar">
        <div className="inline-flex min-w-full items-center gap-2">
          {[
            { id: 'all', label: 'All Tasks', count: localTasks.length },
            { id: 'pending', label: 'Pending', count: localTasks.filter(t => t.status === 'Pending').length },
            { id: 'running', label: 'Running', count: localTasks.filter(t => t.status === 'In Progress').length },
            { id: 'completed', label: 'Completed', count: localTasks.filter(t => t.status === 'Completed').length },
            { id: 'failed', label: 'Failed / Blocked', count: localTasks.filter(t => t.status === 'Blocked').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs shadow-emerald-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Task Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] overflow-hidden bg-white dark:bg-[#161616] shadow-xs">
        <div className="w-full max-w-full overflow-x-auto min-w-0 no-scrollbar">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#0a0e1a] text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <th className="py-3 px-4">TASK</th>
                <th className="py-3 px-3">AGENT</th>
                <th className="py-3 px-3">PRIORITY</th>
                <th className="py-3 px-3">CREATED</th>
                <th className="py-3 px-3">DUE</th>
                <th className="py-3 px-3">STATUS</th>
                <th className="py-3 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
              {filteredTasks.map((task) => (
                <tr
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100 max-w-sm">
                    <div className="line-clamp-1">{task.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono font-normal">
                      Target: {task.associatedRecord}
                    </div>
                  </td>

                  <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Bot className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{task.agentName}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      task.priority === 'Critical' ? 'bg-rose-50 dark:bg-rose-950 text-rose-600' :
                      task.priority === 'High' ? 'bg-amber-50 dark:bg-amber-950 text-amber-600' :
                      'bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-300'
                    }`}>
                      {task.priority}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 font-mono text-slate-400 text-[11px] whitespace-nowrap">
                    {task.createdAt}
                  </td>

                  <td className="py-3.5 px-3 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {task.deadline}
                  </td>

                  <td className="py-3.5 px-3 whitespace-nowrap">
                    <Badge variant={task.status === 'Completed' ? 'emerald' : task.status === 'In Progress' ? 'blue' : 'amber'}>
                      {task.status}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {task.status === 'Blocked' && (
                        <button
                          onClick={() => handleRetry(task.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Retry</span>
                        </button>
                      )}

                      {task.status === 'Pending' && (
                        <button
                          onClick={() => handleCancel(task.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                        >
                          <Ban className="w-3 h-3" />
                          <span>Cancel</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedTask(task)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold text-[11px] cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase">Task ID: {selectedTask.id}</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedTask.title}</h3>
                <span className="text-xs text-slate-400">Assigned Agent: {selectedTask.agentName} • Created {selectedTask.createdAt}</span>
              </div>
              <button onClick={() => setSelectedTask(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Priority</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedTask.priority}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Status</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedTask.status}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020]">
                  <span className="text-[10px] text-slate-400 block">Deadline</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{selectedTask.deadline}</strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">Associated Target Record ({selectedTask.associatedType})</strong>
                <p className="text-slate-700 dark:text-slate-300">{selectedTask.associatedRecord}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1 font-mono text-[11px]">
                <strong className="text-slate-900 dark:text-white block font-sans text-xs">Autonomous Completion Progress</strong>
                <div className="flex items-center gap-3 pt-1">
                  <div className="flex-1 bg-slate-100 dark:bg-[#181818] h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${selectedTask.progress}%` }} />
                  </div>
                  <span className="font-bold text-emerald-500">{selectedTask.progress}%</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end">
              <Button variant="primary" size="sm" onClick={() => setSelectedTask(null)}>
                Close Task
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
