import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Tabs } from '../ui/Tabs';
import { useToast } from '../../context/ToastContext';
import { useCrm, CrmDeal } from '../../context/CrmContext';
import { LeadOwnerType } from '../../context/LeadsManagementContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import { 
  Building2, 
  DollarSign, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Edit, 
  Trash2, 
  Layers, 
  ShieldCheck, 
  Send, 
  PhoneCall, 
  Tag, 
  Sparkles,
  TrendingUp
} from 'lucide-react';

export interface DealDetailDrawerProps {
  deal: CrmDeal | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenEditModal?: (deal: CrmDeal) => void;
}

export const DealDetailDrawer: React.FC<DealDetailDrawerProps> = ({
  deal,
  isOpen,
  onClose,
  onOpenEditModal,
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const [newNoteText, setNewNoteText] = useState('');

  const {
    activePipeline,
    tasks,
    updateDealStage,
    updateDealOwner,
    createTask,
    toggleTaskCompleted,
    deleteTask,
    deleteDeal
  } = useCrm();

  const { success, info } = useToast();

  const [notes, setNotes] = useState([
    {
      id: 'dnote_1',
      author: 'Sarah Jenkins',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      content: 'Decision maker confirmed budget signoff for Q3. Technical briefing scheduled for this Thursday.',
      timestamp: 'Yesterday at 2:30 PM',
    }
  ]);

  if (!deal) return null;

  const dealTasks = tasks.filter((t) => t.dealId === deal.id);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    createTask(
      deal.id,
      newTaskTitle.trim(),
      newTaskDueDate || new Date().toISOString().split('T')[0],
      deal.owner,
      'high'
    );
    setNewTaskTitle('');
    setNewTaskDueDate('');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;

    setNotes([
      {
        id: `dnote_${Date.now()}`,
        author: 'You',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        content: newNoteText.trim(),
        timestamp: 'Just now',
      },
      ...notes,
    ]);
    setNewNoteText('');
    success('Note saved to deal opportunity.', 'Note Posted');
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center justify-between gap-3 w-full pr-6 font-sans">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={deal.companyLogo}
              alt={deal.companyName}
              className="w-11 h-11 rounded-2xl object-cover border border-slate-200 dark:border-[#2A2A2A] shadow-xs shrink-0"
            />
            <div className="min-w-0 text-left">
              <div className="text-base font-extrabold text-slate-950 dark:text-white truncate">
                {deal.title}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate font-mono">
                {deal.companyName} • {formatCurrency(deal.value)} ARR
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenEditModal?.(deal)}
              leftIcon={<Edit className="w-3.5 h-3.5" />}
            >
              Edit
            </Button>
          </div>
        </div>
      }
      size="lg"
      placement="right"
      footer={
        <div className="w-full flex items-center justify-between gap-3 font-sans">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              deleteDeal(deal.id);
              onClose();
            }}
            leftIcon={<Trash2 className="w-3.5 h-3.5 text-rose-500" />}
          >
            Remove Deal
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                updateDealStage(deal.id, 'stage_5');
                success(`Marked ${deal.title} as CLOSED WON!`, 'Contract Signed');
              }}
              leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
            >
              Mark Closed Won
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-5 font-sans">
        
        {/* Deal Stage, Value & Owner Banner */}
        <div className="p-4 rounded-3xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Stage Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Stage:</span>
            <select
              value={deal.stageId}
              onChange={(e) => updateDealStage(deal.id, e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] font-extrabold text-xs text-slate-900 dark:text-white cursor-pointer outline-none"
            >
              {activePipeline.stages.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} ({st.probability}%)
                </option>
              ))}
            </select>
          </div>

          {/* Owner */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Owner:</span>
            <select
              value={deal.owner}
              onChange={(e) => updateDealOwner(deal.id, e.target.value as LeadOwnerType)}
              className="px-2.5 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] font-medium text-xs text-slate-700 dark:text-slate-300 cursor-pointer outline-none"
            >
              <option value="Sarah Jenkins">Sarah Jenkins</option>
              <option value="Marcus Vance">Marcus Vance</option>
              <option value="Alex Rivera">Alex Rivera</option>
              <option value="Unassigned">Unassigned</option>
            </select>
          </div>

          {/* Value */}
          <div className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400 font-mono">
            {formatCurrency(deal.value)} ARR ({deal.probability}% Prob)
          </div>

        </div>

        {/* 5 Tabs */}
        <Tabs
          tabs={[
            { id: 'overview', label: '360° Overview' },
            { id: 'tasks', label: `Tasks (${dealTasks.length})` },
            { id: 'timeline', label: 'Activity Timeline' },
            { id: 'notes', label: `Notes (${notes.length})` },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            
            {/* Primary Contact Card */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs space-y-3 text-xs">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Decision Maker & Buyer</span>
                <span className="text-emerald-600 font-mono font-bold">✓ Verified Contact</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {deal.contactName}
                  </div>
                  <div className="text-xs text-slate-500">{deal.contactTitle} @ {deal.companyName}</div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-1">
                    {deal.contactEmail} • {deal.contactPhone}
                  </div>
                </div>
              </div>
            </div>

            {/* Deal Attributes Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                <div className="text-[10px] text-slate-400">Target Close Date</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">{deal.expectedCloseDate}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                <div className="text-[10px] text-slate-400">Weighted Pipeline ARR</div>
                <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {formatCurrency((deal.value * deal.probability) / 100)}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                <div className="text-[10px] text-slate-400">Attribution Source</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">{deal.source}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] space-y-0.5">
                <div className="text-[10px] text-slate-400">Deal Priority</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase font-mono">{deal.priority}</div>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-1.5">
              <div className="text-xs font-bold text-slate-400 uppercase">Tags & Badges</div>
              <div className="flex flex-wrap gap-1.5">
                {deal.tags.map((t, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-300 text-xs font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: TASKS */}
        {activeTab === 'tasks' && (
          <div className="space-y-4">
            
            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2 text-xs">
              <div className="font-bold text-slate-900 dark:text-white">Create Next Action / Task</div>
              <input
                type="text"
                placeholder="e.g. Follow up on commercial MSA redlines..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] text-xs outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
              />
              <div className="flex items-center justify-between gap-2">
                <input
                  type="date"
                  value={newTaskDueDate}
                  onChange={(e) => setNewTaskDueDate(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
                <Button variant="primary" size="sm" type="submit" disabled={!newTaskTitle.trim()}>
                  Add Task
                </Button>
              </div>
            </form>

            {/* Tasks List */}
            <div className="space-y-2">
              {dealTasks.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 border border-slate-200 dark:border-[#2A2A2A] rounded-2xl">
                  No open tasks for this deal.
                </div>
              ) : (
                dealTasks.map((t) => (
                  <div
                    key={t.id}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-colors ${
                      t.completed
                        ? 'bg-slate-50 dark:bg-[#161616] border-slate-200/60 dark:border-[#202020] opacity-60'
                        : 'bg-white dark:bg-[#1C1C1C] border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleTaskCompleted(t.id)}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <div className="min-w-0">
                        <span className={`font-semibold ${t.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                          {t.title}
                        </span>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          Due: {t.dueDate} • Assigned: {t.assignee}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteTask(t.id)}
                      className="text-slate-400 hover:text-rose-500 cursor-pointer p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

        {/* TAB 3: TIMELINE */}
        {activeTab === 'timeline' && (
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Deal Progression Timeline
            </div>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800 text-xs">
              <div className="relative space-y-1">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white dark:border-[#161616] flex items-center justify-center">
                  <Clock className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Commercial Proposal Sent</span>
                  <span className="text-[10px] text-slate-400">Today at 11:15 AM</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Dispatched $48,000 ARR custom annual agreement with 10 SDR seats.
                </p>
              </div>

              <div className="relative space-y-1">
                <div className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 border-2 border-white dark:border-[#161616] flex items-center justify-center">
                  <PhoneCall className="w-2.5 h-2.5 text-white" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Product Demo Completed</span>
                  <span className="text-[10px] text-slate-400">2 days ago</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Walked through multi-channel sequences and sub-400ms Voice SDR capabilities.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Add rep note or call takeaway..."
                rows={3}
                className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
              />
              <div className="flex justify-end">
                <Button variant="primary" size="sm" type="submit" disabled={!newNoteText.trim()}>
                  Save Deal Note
                </Button>
              </div>
            </form>

            <div className="space-y-2.5">
              {notes.map((n) => (
                <div
                  key={n.id}
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={n.authorAvatar}
                        alt={n.author}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-bold text-slate-900 dark:text-white">{n.author}</span>
                      <span className="text-[10px] text-slate-400">• {n.timestamp}</span>
                    </div>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed pl-8">
                    {n.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </Drawer>
  );
};
