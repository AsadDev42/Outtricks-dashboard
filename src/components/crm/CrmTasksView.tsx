import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  Plus, 
  Trash2, 
  Calendar, 
  User, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  Filter,
  X,
  Flame,
  DollarSign
} from 'lucide-react';
import { useCrm, CrmTask, CrmDeal } from '../../context/CrmContext';
import { AsyncSearchCombobox } from './AsyncSearchCombobox';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatNumber } from '../../utils/formatters';

export const CrmTasksView: React.FC = () => {
  const { tasks, deals, createTask, toggleTaskCompleted, deleteTask, searchDealsAsync, getDealByIdAsync } = useCrm();
  const [tabFilter, setTabFilter] = useState<'today' | 'upcoming' | 'overdue' | 'completed' | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  // Form states
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('2026-09-05');
  const [taskAssignee, setTaskAssignee] = useState<any>('Sarah Jenkins');
  const [taskPriority, setTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [taskDealId, setTaskDealId] = useState<string>('');
  const [selectedTaskDealItem, setSelectedTaskDealItem] = useState<CrmDeal | undefined>(undefined);

  const filteredTasks = tasks.filter((t) => {
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;

    if (tabFilter === 'completed') return t.completed && matchesPriority;
    if (tabFilter === 'today') return !t.completed && matchesPriority;
    if (tabFilter === 'upcoming') return !t.completed && matchesPriority;
    if (tabFilter === 'overdue') return !t.completed && t.priority === 'high' && matchesPriority;

    return matchesPriority;
  });

  const handleCloseTaskModal = () => {
    setIsNewTaskModalOpen(false);
    setTaskTitle('');
    setTaskDealId('');
    setSelectedTaskDealItem(undefined);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    createTask(
      taskDealId || undefined,
      taskTitle,
      taskDueDate,
      taskAssignee,
      taskPriority
    );

    handleCloseTaskModal();
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header with Page Title & Action */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Task Management & Action Items
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Action items and scheduling reminders connected to active opportunities and target accounts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsNewTaskModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            New Task
          </Button>
        </div>
      </div>

      {/* 2. Sub-Tabs Filter Bar (Today, Upcoming, Overdue, Completed, All) */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        
        {/* Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] font-mono">
          {[
            { id: 'all', label: 'All Tasks' },
            { id: 'today', label: 'Today' },
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'overdue', label: 'Overdue' },
            { id: 'completed', label: 'Completed' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTabFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                tabFilter === tab.id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer min-h-[36px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option value="all">Priority (All)</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <Badge variant="primary" size="md">
            {formatNumber(filteredTasks.length)} Tasks
          </Badge>
        </div>
      </div>

      {/* 3. Task Checklist Items */}
      <div className="space-y-3">
        {filteredTasks.map((task) => {
          const linkedDeal = deals.find(d => d.id === task.dealId);

          return (
            <div
              key={task.id}
              className={`p-4 rounded-3xl border transition-all flex items-center justify-between gap-3 text-xs ${
                task.completed
                  ? 'bg-slate-50/60 dark:bg-[#141414]/40 border-slate-200/60 dark:border-[#202020] opacity-75'
                  : 'bg-white dark:bg-[#161616] border-slate-200/90 dark:border-[#2A2A2A] shadow-xs hover:border-emerald-500/30 dark:hover:border-emerald-500/30'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompleted(task.id)}
                  className="rounded border-slate-300 dark:border-[#2A2A2A] text-emerald-600 focus:ring-emerald-500 cursor-pointer w-4 h-4"
                />

                <div className="space-y-0.5 min-w-0">
                  <span className={`font-extrabold text-sm block truncate ${
                    task.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                  }`}>
                    {task.title}
                  </span>

                  <div className="flex items-center gap-3 text-[11px] text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Due: {task.dueDate}</span>
                    </span>
                    <span className="flex items-center gap-1 font-sans">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Assignee: {task.assignee}</span>
                    </span>
                    {linkedDeal && (
                      <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{linkedDeal.companyName} ({linkedDeal.title})</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge
                  variant={
                    task.priority === 'high' ? 'rose' :
                    task.priority === 'medium' ? 'amber' : 'primary'
                  }
                  size="sm"
                >
                  {task.priority} Priority
                </Badge>

                <button
                  type="button"
                  onClick={() => deleteTask(task.id)}
                  className="p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Delete Task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. New Task Modal */}
      {isNewTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <h3 className="font-black text-lg text-slate-950 dark:text-white">Create CRM Task</h3>
              <button
                type="button"
                onClick={() => setIsNewTaskModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="e.g. Schedule technical demo with Solutions Engineer"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Due Date</label>
                <input
                  type="date"
                  value={taskDueDate}
                  onChange={(e) => setTaskDueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Assignee</label>
                  <select
                    value={taskAssignee}
                    onChange={(e) => setTaskAssignee(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                  >
                    <option value="Sarah Jenkins">Sarah Jenkins</option>
                    <option value="David Zhao">David Zhao</option>
                    <option value="Alex Rivera">Alex Rivera</option>
                    <option value="Elena Rostova">Elena Rostova</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <AsyncSearchCombobox<CrmDeal>
                label="Associated Deal (Optional)"
                placeholder="Search deals by title, company..."
                value={taskDealId}
                initialItem={selectedTaskDealItem}
                onChange={(id, item) => {
                  setTaskDealId(id);
                  setSelectedTaskDealItem(item);
                }}
                onSearch={(query, signal) => searchDealsAsync(query, { limit: 15, signal })}
                getItemById={getDealByIdAsync}
                getItemKey={(d) => d.id}
                recentSectionTitle="Recent Deals"
                emptyMessage="No deals found"
                errorMessage="Unable to load deals. Try again."
                renderItem={(deal) => (
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                      <DollarSign className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0 flex-1 text-left space-y-0.5">
                      <div className="flex items-center gap-1.5 justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {deal.title}
                        </span>
                        <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                          ${deal.value.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                        <span className="truncate font-medium text-slate-600 dark:text-slate-300">{deal.companyName}</span>
                        {deal.contactName && <span className="truncate">• {deal.contactName}</span>}
                      </div>
                    </div>
                  </div>
                )}
                renderSelected={(deal, onClear) => (
                  <div className="p-2.5 rounded-xl border border-primary/30 bg-primary/5 dark:bg-primary/10 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 space-y-0.5 text-left">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {deal.title}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                            ${deal.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{deal.companyName}</span>
                          {deal.contactName && <span>• {deal.contactName}</span>}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={onClear}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
                      title="Remove deal link"
                      aria-label="Remove deal link"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              />

              <div className="flex items-center justify-end gap-2 pt-3">
                <Button variant="secondary" size="sm" type="button" onClick={handleCloseTaskModal}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Create Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
