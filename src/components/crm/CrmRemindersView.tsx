import React, { useState, useMemo } from 'react';
import { 
  Bell, 
  Calendar, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  Search, 
  User, 
  Building2, 
  Phone, 
  Mail, 
  CalendarCheck, 
  MoreVertical, 
  CornerDownRight,
  ArrowRight,
  ShieldAlert,
  Flame,
  CheckSquare
} from 'lucide-react';
import { useCrm, CrmReminder } from '../../context/CrmContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Dropdown } from '../ui/Dropdown';

export const CrmRemindersView: React.FC = () => {
  const { 
    reminders, 
    contacts, 
    deals, 
    createReminder, 
    toggleReminderCompleted, 
    snoozeReminder, 
    deleteReminder 
  } = useCrm();

  const [tabFilter, setTabFilter] = useState<'all' | 'overdue' | 'today' | 'upcoming' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [type, setType] = useState<CrmReminder['type']>('follow_up');
  const [contactId, setContactId] = useState('');
  const [dealId, setDealId] = useState('');
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueTime, setDueTime] = useState('10:00');
  const [reminderTime, setReminderTime] = useState<CrmReminder['reminderTime']>('15_min_before');
  const [priority, setPriority] = useState<CrmReminder['priority']>('high');
  const [assignee, setAssignee] = useState<any>('Sarah Jenkins');
  const [notes, setNotes] = useState('');

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Compute metrics
  const overdueCount = useMemo(() => {
    return reminders.filter((r) => !r.completed && r.dueDate < todayStr).length;
  }, [reminders, todayStr]);

  const todayCount = useMemo(() => {
    return reminders.filter((r) => !r.completed && r.dueDate === todayStr).length;
  }, [reminders, todayStr]);

  const upcomingCount = useMemo(() => {
    return reminders.filter((r) => !r.completed && r.dueDate > todayStr).length;
  }, [reminders, todayStr]);

  const completedCount = useMemo(() => {
    return reminders.filter((r) => r.completed).length;
  }, [reminders]);

  // Filter reminders
  const filteredReminders = useMemo(() => {
    return reminders.filter((r) => {
      // Tab filter
      if (tabFilter === 'overdue' && (r.completed || r.dueDate >= todayStr)) return false;
      if (tabFilter === 'today' && (r.completed || r.dueDate !== todayStr)) return false;
      if (tabFilter === 'upcoming' && (r.completed || r.dueDate <= todayStr)) return false;
      if (tabFilter === 'completed' && !r.completed) return false;

      // Priority filter
      if (priorityFilter !== 'all' && r.priority !== priorityFilter) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(q);
        const matchesContact = r.contactName?.toLowerCase().includes(q) || false;
        const matchesCompany = r.companyName?.toLowerCase().includes(q) || false;
        const matchesNotes = r.notes?.toLowerCase().includes(q) || false;
        if (!matchesTitle && !matchesContact && !matchesCompany && !matchesNotes) return false;
      }

      return true;
    });
  }, [reminders, tabFilter, priorityFilter, searchQuery, todayStr]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedContact = contacts.find((c) => c.id === contactId);
    const selectedDeal = deals.find((d) => d.id === dealId);

    createReminder({
      title: title.trim(),
      type,
      contactId: contactId || undefined,
      contactName: selectedContact?.name,
      dealId: dealId || undefined,
      dealTitle: selectedDeal?.title,
      companyName: selectedContact?.companyName || selectedDeal?.companyName,
      dueDate,
      dueTime,
      reminderTime,
      priority,
      assignee,
      notes: notes.trim() || undefined,
    });

    setTitle('');
    setNotes('');
    setIsNewModalOpen(false);
  };

  const getTypeIcon = (t: CrmReminder['type']) => {
    switch (t) {
      case 'call': return <Phone className="w-3.5 h-3.5 text-blue-500" />;
      case 'email': return <Mail className="w-3.5 h-3.5 text-purple-500" />;
      case 'meeting': return <Calendar className="w-3.5 h-3.5 text-amber-500" />;
      case 'task': return <CheckSquare className="w-3.5 h-3.5 text-slate-500" />;
      default: return <Bell className="w-3.5 h-3.5 text-emerald-500" />;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header with Page Title & Action */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Reminders & Follow-ups
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              HubSpot Engine
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Never let a deal or qualified prospect slip through the cracks. Set alerts, scheduled follow-ups, and pre-meeting reminders.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsNewModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Set Reminder
          </Button>
        </div>
      </div>

      {/* 2. Top Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div 
          onClick={() => setTabFilter('overdue')}
          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
            overdueCount > 0 
              ? 'bg-red-500/5 border-red-500/20 text-red-500' 
              : 'bg-white dark:bg-[#161616] border-slate-200/80 dark:border-[#2A2A2A]'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overdue Alerts</span>
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black mt-2">{overdueCount}</div>
          <div className="text-[11px] text-slate-400 font-sans mt-0.5">Require immediate touchpoint</div>
        </div>

        <div 
          onClick={() => setTabFilter('today')}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs cursor-pointer hover:border-emerald-500/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Due Today</span>
            <Clock className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">{todayCount}</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-sans mt-0.5">Scheduled for today</div>
        </div>

        <div 
          onClick={() => setTabFilter('upcoming')}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs cursor-pointer hover:border-amber-500/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Upcoming This Week</span>
            <CalendarCheck className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">{upcomingCount}</div>
          <div className="text-[11px] text-slate-400 font-sans mt-0.5">Pipeline follow-up cadence</div>
        </div>

        <div 
          onClick={() => setTabFilter('completed')}
          className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs cursor-pointer hover:border-slate-400 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">{completedCount}</div>
          <div className="text-[11px] text-slate-400 font-sans mt-0.5">Resolved follow-up items</div>
        </div>
      </div>

      {/* 3. Controls & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        
        {/* Sub-tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] font-mono overflow-x-auto">
          {[
            { id: 'all', label: 'All', count: reminders.length },
            { id: 'overdue', label: 'Overdue', count: overdueCount },
            { id: 'today', label: 'Today', count: todayCount },
            { id: 'upcoming', label: 'Upcoming', count: upcomingCount },
            { id: 'completed', label: 'Completed', count: completedCount },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTabFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                tabFilter === tab.id
                  ? 'bg-white dark:bg-[#2A2A2A] text-slate-950 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                tab.id === 'overdue' && tab.count > 0 
                  ? 'bg-red-500/20 text-red-500' 
                  : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-300'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Priority Filter */}
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search reminders, leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#1C1C1C] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#1C1C1C] text-xs text-slate-700 dark:text-slate-300 font-mono focus:outline-hidden"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>
      </div>

      {/* 4. Reminders List */}
      <div className="border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs divide-y divide-slate-100 dark:divide-white/[0.06]">
        {filteredReminders.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="text-base font-extrabold text-slate-950 dark:text-white">
              All caught up!
            </div>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No follow-ups matching this filter. Schedule a new reminder to stay proactive with your pipeline.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsNewModalOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Set New Reminder
            </Button>
          </div>
        ) : (
          filteredReminders.map((rem) => {
            const isOverdue = !rem.completed && rem.dueDate < todayStr;
            const isToday = !rem.completed && rem.dueDate === todayStr;

            return (
              <div
                key={rem.id}
                className={`p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-colors ${
                  rem.completed ? 'opacity-60 bg-slate-50/50 dark:bg-white/[0.01]' : 'hover:bg-slate-50/60 dark:hover:bg-white/[0.02]'
                }`}
              >
                {/* Left side: Checkbox, Type, Title & Context */}
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleReminderCompleted(rem.id)}
                    className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                      rem.completed
                        ? 'bg-emerald-500 border-emerald-500 text-white'
                        : 'border-slate-300 dark:border-slate-600 hover:border-emerald-500'
                    }`}
                  >
                    {rem.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="p-1 rounded-md bg-slate-100 dark:bg-[#202020]">
                        {getTypeIcon(rem.type)}
                      </span>

                      <span className={`text-sm font-extrabold ${
                        rem.completed 
                          ? 'line-through text-slate-400 dark:text-slate-500' 
                          : 'text-slate-950 dark:text-white'
                      }`}>
                        {rem.title}
                      </span>

                      {/* Priority Badge */}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                        rem.priority === 'high'
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                          : rem.priority === 'medium'
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      }`}>
                        {rem.priority}
                      </span>

                      {/* Status indicator */}
                      {isOverdue && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/30 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" /> Overdue
                        </span>
                      )}
                      {isToday && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                          Due Today
                        </span>
                      )}
                    </div>

                    {/* Associated lead, company, or deal */}
                    <div className="flex items-center gap-3 text-xs text-slate-500 flex-wrap font-sans">
                      {rem.contactName && (
                        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                          <User className="w-3 h-3 text-slate-400" />
                          {rem.contactName}
                        </span>
                      )}
                      {rem.companyName && (
                        <span className="flex items-center gap-1 text-slate-500">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          {rem.companyName}
                        </span>
                      )}
                      {rem.dealTitle && (
                        <span className="px-2 py-0.2 rounded-md bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-slate-400 text-[11px]">
                          Deal: {rem.dealTitle}
                        </span>
                      )}
                      {rem.notes && (
                        <span className="text-slate-400 text-[11px] italic">
                          "{rem.notes}"
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: Timing, Assignee, Snooze & Actions */}
                <div className="flex items-center justify-between lg:justify-end gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-white/[0.04]">
                  <div className="text-left lg:text-right font-mono text-xs">
                    <div className={`font-bold flex items-center lg:justify-end gap-1.5 ${
                      isOverdue ? 'text-red-500' : isToday ? 'text-emerald-500' : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{rem.dueDate} at {rem.dueTime}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      Alert: {rem.reminderTime.replace(/_/g, ' ')} • {rem.assignee}
                    </div>
                  </div>

                  {/* Quick Snooze Actions */}
                  {!rem.completed && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => snoozeReminder(rem.id, 1)}
                        className="px-2 py-1 rounded-lg text-[11px] font-bold font-mono bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#282828] transition-colors"
                        title="Snooze by 1 day"
                      >
                        +1d
                      </button>
                      <button
                        onClick={() => snoozeReminder(rem.id, 2)}
                        className="px-2 py-1 rounded-lg text-[11px] font-bold font-mono bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#282828] transition-colors"
                        title="Snooze by 2 days"
                      >
                        +2d
                      </button>
                      <button
                        onClick={() => snoozeReminder(rem.id, 7)}
                        className="px-2 py-1 rounded-lg text-[11px] font-bold font-mono bg-slate-100 dark:bg-[#202020] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#282828] transition-colors"
                        title="Snooze by 1 week"
                      >
                        +1w
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => deleteReminder(rem.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    title="Delete reminder"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Reminder Modal */}
      <Modal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        title="Set Follow-up Reminder"
        description="Schedule a prospect follow-up, call reminder, or task just like HubSpot CRM."
        size="md"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4 font-sans text-xs">
          <Input
            label="Reminder Title / Subject"
            placeholder="e.g. Call Sarah to review enterprise SLA terms"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Activity Type"
              value={type}
              onChange={(e) => setType(e.target.value as any)}
              options={[
                { value: 'follow_up', label: 'Follow-up' },
                { value: 'call', label: 'Phone Call' },
                { value: 'email', label: 'Email Outreach' },
                { value: 'meeting', label: 'Meeting / Demo' },
                { value: 'task', label: 'General Task' },
              ]}
            />

            <Select
              label="Priority Level"
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              options={[
                { value: 'high', label: 'High (Immediate Action)' },
                { value: 'medium', label: 'Medium' },
                { value: 'low', label: 'Low' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Select
              label="Link to Contact (Optional)"
              value={contactId}
              onChange={(e) => setContactId(e.target.value)}
              options={[
                { value: '', label: 'Select Contact...' },
                ...contacts.map((c) => ({
                  value: c.id,
                  label: `${c.name} (${c.companyName})`,
                })),
              ]}
            />

            <Select
              label="Link to Deal (Optional)"
              value={dealId}
              onChange={(e) => setDealId(e.target.value)}
              options={[
                { value: '', label: 'Select Deal...' },
                ...deals.map((d) => ({
                  value: d.id,
                  label: `${d.title} ($${d.value.toLocaleString()})`,
                })),
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <Input
              label="Due Time"
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              required
            />

            <Select
              label="Reminder Trigger"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value as any)}
              options={[
                { value: 'at_time', label: 'At time of event' },
                { value: '15_min_before', label: '15 minutes before' },
                { value: '1_hour_before', label: '1 hour before' },
                { value: '1_day_before', label: '1 day before' },
              ]}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
              Notes & Talking Points (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="Context or specific questions to address during follow-up..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#1C1C1C] text-xs text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsNewModalOpen(false)} type="button">
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" disabled={!title.trim()} leftIcon={<Bell className="w-3.5 h-3.5" />}>
              Schedule Reminder
            </Button>
          </div>
        </form>
      </Modal>

    </div>
  );
};
