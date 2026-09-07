import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  Linkedin, 
  Building2, 
  User, 
  Calendar, 
  ShieldCheck, 
  ExternalLink,
  CheckCircle2,
  Clock,
  Send,
  Plus,
  Tag,
  CheckSquare,
  Sparkles,
  TrendingUp,
  FileText,
  MessageSquare,
  Mic,
  DollarSign,
  Briefcase,
  Layers,
  ArrowRight,
  ChevronRight,
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';
import { useCrm, CrmContact, ContactQualificationStatus } from '../../context/CrmContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatNumber, formatDate } from '../../utils/formatters';

interface ContactDetailDrawerProps {
  contact: CrmContact;
  onClose: () => void;
  onOpenDealModal?: (contact: CrmContact) => void;
}

export const ContactDetailDrawer: React.FC<ContactDetailDrawerProps> = ({
  contact,
  onClose,
  onOpenDealModal
}) => {
  const { 
    updateContactLeadStatus, 
    activities, 
    createActivity, 
    deals, 
    tasks, 
    createTask, 
    toggleTaskCompleted,
    notes,
    createNote,
    createDeal,
    activePipeline
  } = useCrm();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'activity' | 'emails' | 'linkedin' | 'calls' | 'deals' | 'tasks' | 'notes' | 'sequences'
  >('overview');

  // Action Modals & Drawers
  const [activeAction, setActiveAction] = useState<
    'none' | 'email' | 'linkedin' | 'call' | 'task' | 'note' | 'deal' | 'sequence' | 'label'
  >('none');

  // Form States
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [linkedinMsg, setLinkedinMsg] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDueDate, setTaskDueDate] = useState(new Date(Date.now() + 86400000).toISOString().split('T')[0]);
  const [noteContent, setNoteContent] = useState('');
  const [dealTitle, setDealTitle] = useState(`${contact.companyName} - Enterprise Expansion`);
  const [dealValue, setDealValue] = useState('35000');
  const [selectedSequence, setSelectedSequence] = useState('Enterprise SDR Cold Outreach (4-Step)');
  const [callType, setCallType] = useState<'ai' | 'human'>('ai');
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'connected' | 'completed'>('idle');

  // Status Qualification options
  const statusPipeline: ContactQualificationStatus[] = [
    'New',
    'Working',
    'Contacted',
    'Engaged',
    'Qualified',
    'Unqualified',
    'Converted'
  ];

  const currentStatusIndex = statusPipeline.indexOf(contact.leadStatus || 'New');

  // Filter activities for this contact
  const contactActivities = activities.filter(
    (a) => a.contactName?.toLowerCase() === contact.name.toLowerCase() ||
           a.companyName?.toLowerCase() === contact.companyName.toLowerCase()
  );

  // Filter deals for this contact
  const contactDeals = deals.filter(
    (d) => d.contactEmail?.toLowerCase() === contact.email.toLowerCase() ||
           d.companyName?.toLowerCase() === contact.companyName.toLowerCase()
  );

  // Filter tasks for this contact
  const contactTasks = tasks.filter(
    (t) => t.contactId === contact.id || t.title.toLowerCase().includes(contact.name.toLowerCase())
  );

  // Filter notes for this contact
  const contactNotes = notes.filter(
    (n) => n.entityId === contact.id || n.entityId === contact.companyName
  );

  // Action Handlers
  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSubject.trim() || !emailBody.trim()) return;

    createActivity({
      type: 'email',
      title: `Email Sent: ${emailSubject}`,
      details: emailBody,
      outcome: 'sent',
      contactName: contact.name,
      companyName: contact.companyName,
      owner: contact.owner,
    });

    updateContactLeadStatus(contact.id, 'Contacted');
    setEmailSubject('');
    setEmailBody('');
    setActiveAction('none');
    setActiveTab('activity');
  };

  const handleSendLinkedIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkedinMsg.trim()) return;

    createActivity({
      type: 'linkedin',
      title: 'LinkedIn Message Sent',
      details: linkedinMsg,
      outcome: 'sent',
      contactName: contact.name,
      companyName: contact.companyName,
      owner: contact.owner,
    });

    updateContactLeadStatus(contact.id, 'Contacted');
    setLinkedinMsg('');
    setActiveAction('none');
    setActiveTab('activity');
  };

  const handleStartCall = () => {
    setIsCalling(true);
    setCallStatus('calling');
    setTimeout(() => {
      setCallStatus('connected');
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
        setCallStatus('completed');
        setIsCalling(false);

        createActivity({
          type: 'call',
          title: callType === 'ai' ? 'Voice AI SDR Call Completed' : 'Outbound Phone Call Completed',
          details: `${callType === 'ai' ? 'Sophia (AI SDR)' : contact.owner} called ${contact.name}. Discussed enterprise deployment requirements and pricing models. Decision maker confirmed interest for product demo.`,
          outcome: 'completed',
          contactName: contact.name,
          companyName: contact.companyName,
          owner: contact.owner,
        });

        updateContactLeadStatus(contact.id, 'Engaged');
      }, 4000);
    }, 1500);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    createTask(
      contactDeals[0]?.id,
      `${taskTitle} (${contact.name})`,
      taskDueDate,
      contact.owner,
      'high'
    );

    setTaskTitle('');
    setActiveAction('none');
    setActiveTab('tasks');
  };

  const handleCreateNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    createNote('contact', contact.id, noteContent);
    setNoteContent('');
    setActiveAction('none');
    setActiveTab('notes');
  };

  const handleCreateDealFromContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealTitle.trim()) return;

    createDeal({
      title: dealTitle,
      companyName: contact.companyName,
      companyDomain: contact.companyDomain,
      contactName: contact.name,
      contactEmail: contact.email,
      contactPhone: contact.phone,
      contactTitle: contact.title,
      value: parseFloat(dealValue) || 25000,
      stageId: activePipeline.stages[0]?.id || 'stage_new',
      owner: contact.owner,
      source: '8D Lead Finder',
    });

    updateContactLeadStatus(contact.id, 'Qualified');
    setActiveAction('none');
    setActiveTab('deals');
  };

  const handleAddToSequence = (e: React.FormEvent) => {
    e.preventDefault();

    createActivity({
      type: 'email',
      title: `Enrolled in Sequence: ${selectedSequence}`,
      details: `Step 1 scheduled to execute via automated deliverability pipeline.`,
      outcome: 'scheduled',
      contactName: contact.name,
      companyName: contact.companyName,
      owner: contact.owner,
    });

    updateContactLeadStatus(contact.id, 'Working');
    setActiveAction('none');
    setActiveTab('sequences');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-white dark:bg-[#111111] border-l border-slate-200 dark:border-[#222222] shadow-2xl flex flex-col font-sans animate-in slide-in-from-right duration-200">
      
      {/* 1. Header & Contact Profile Overview */}
      <div className="p-6 border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/50 space-y-4">
        <div className="flex items-start justify-between">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-[#222222] shadow-sm"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-[#111111]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black text-slate-950 dark:text-white tracking-tight">
                  {contact.name}
                </h2>
                <Badge variant="emerald" size="sm" className="font-mono font-bold">
                  {contact.score}/100 ICP
                </Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {contact.title} at <span className="text-slate-900 dark:text-white font-bold">{contact.companyName}</span>
              </p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-mono">{contact.email}</span>
                <span>•</span>
                <span className="flex items-center gap-1 font-mono">{contact.phone}</span>
                {contact.linkedinUrl && (
                  <>
                    <span>•</span>
                    <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-0.5">
                      <Linkedin className="w-3 h-3" /> LinkedIn
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1C1C1C] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lead Qualification Pipeline Switcher */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
            <span>Lead Qualification Status</span>
            <span className="text-emerald-500 font-bold">{contact.leadStatus || 'New'}</span>
          </div>
          <div className="grid grid-cols-7 gap-1 p-1 bg-slate-100 dark:bg-[#181818] rounded-xl border border-slate-200/80 dark:border-[#222222]">
            {statusPipeline.map((status, idx) => {
              const isCurrent = contact.leadStatus === status || (!contact.leadStatus && status === 'New');
              const isPassed = idx <= currentStatusIndex;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => updateContactLeadStatus(contact.id, status)}
                  className={`py-1 text-[10px] font-bold rounded-lg transition-all text-center truncate px-1 cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isPassed
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-[#202020]'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Metadata Tags & Owner */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {contact.tags?.map((t, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1E1E1E] border border-slate-200 dark:border-[#2A2A2A] text-[10px] font-bold text-slate-600 dark:text-slate-300">
                {t}
              </span>
            ))}
            <button 
              type="button" 
              onClick={() => setActiveAction('label')}
              className="px-1.5 py-0.5 rounded-md border border-dashed border-slate-300 dark:border-[#333333] text-[10px] font-bold text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              + Tag
            </button>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase">Owner:</span>
            <span className="font-bold text-slate-900 dark:text-slate-200">{contact.owner}</span>
          </div>
        </div>

      </div>

      {/* 2. Quick Action Hub Buttons */}
      <div className="p-3 bg-white dark:bg-[#111111] border-b border-slate-100 dark:border-[#202020] flex items-center gap-2 overflow-x-auto no-scrollbar">
        <Button 
          variant={activeAction === 'email' ? 'primary' : 'secondary'} 
          size="sm" 
          onClick={() => setActiveAction(activeAction === 'email' ? 'none' : 'email')}
          leftIcon={<Mail className="w-3.5 h-3.5" />}
        >
          Send Email
        </Button>
        <Button 
          variant={activeAction === 'linkedin' ? 'primary' : 'secondary'} 
          size="sm" 
          onClick={() => setActiveAction(activeAction === 'linkedin' ? 'none' : 'linkedin')}
          leftIcon={<Linkedin className="w-3.5 h-3.5" />}
        >
          LinkedIn
        </Button>
        <Button 
          variant={activeAction === 'call' ? 'primary' : 'secondary'} 
          size="sm" 
          onClick={() => setActiveAction(activeAction === 'call' ? 'none' : 'call')}
          leftIcon={<Phone className="w-3.5 h-3.5" />}
        >
          Call
        </Button>
        <Button 
          variant={activeAction === 'sequence' ? 'primary' : 'secondary'} 
          size="sm" 
          onClick={() => setActiveAction(activeAction === 'sequence' ? 'none' : 'sequence')}
          leftIcon={<Sparkles className="w-3.5 h-3.5" />}
        >
          Sequence
        </Button>
        <Button 
          variant={activeAction === 'deal' ? 'primary' : 'secondary'} 
          size="sm" 
          onClick={() => setActiveAction(activeAction === 'deal' ? 'none' : 'deal')}
          leftIcon={<DollarSign className="w-3.5 h-3.5" />}
        >
          Create Deal
        </Button>
        <Button 
          variant={activeAction === 'task' ? 'primary' : 'secondary'} 
          size="sm" 
          onClick={() => setActiveAction(activeAction === 'task' ? 'none' : 'task')}
          leftIcon={<CheckSquare className="w-3.5 h-3.5" />}
        >
          Add Task
        </Button>
      </div>

      {/* 3. Action Drawer Forms (Conditionally Rendered) */}
      {activeAction === 'email' && (
        <form onSubmit={handleSendEmail} className="p-4 bg-emerald-500/5 dark:bg-[#161616] border-b border-slate-200 dark:border-[#252525] space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-emerald-500" /> Compose Direct Email to {contact.name}
            </span>
            <button type="button" onClick={() => setActiveAction('none')} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <input
            type="text"
            required
            placeholder="Subject: Enterprise Outbound Growth Partnership"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
          <textarea
            required
            rows={4}
            placeholder={`Hi ${contact.name.split(' ')[0]},\n\nI noticed ${contact.companyName} is expanding its sales outbound team. We've built an autonomous AI revenue engine that...`}
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" size="sm" type="button" onClick={() => setActiveAction('none')}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" leftIcon={<Send className="w-3 h-3" />}>
              Send via Deliverability Guard
            </Button>
          </div>
        </form>
      )}

      {activeAction === 'linkedin' && (
        <form onSubmit={handleSendLinkedIn} className="p-4 bg-emerald-500/5 dark:bg-[#161616] border-b border-slate-200 dark:border-[#252525] space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Linkedin className="w-4 h-4 text-[#0A66C2]" /> Send LinkedIn Direct Message / InMail
            </span>
            <button type="button" onClick={() => setActiveAction('none')} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <textarea
            required
            rows={3}
            placeholder={`Hi ${contact.name.split(' ')[0]}, let's connect regarding ${contact.companyName}'s revenue automation tech stack.`}
            value={linkedinMsg}
            onChange={(e) => setLinkedinMsg(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          />
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" size="sm" type="button" onClick={() => setActiveAction('none')}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit" leftIcon={<Send className="w-3 h-3" />}>
              Send via LinkedIn Automation
            </Button>
          </div>
        </form>
      )}

      {activeAction === 'call' && (
        <div className="p-4 bg-emerald-500/5 dark:bg-[#161616] border-b border-slate-200 dark:border-[#252525] space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-emerald-500" /> Outbound Call to {contact.phone}
            </span>
            <button type="button" onClick={() => setActiveAction('none')} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-bold cursor-pointer">
              <input type="radio" name="callType" checked={callType === 'ai'} onChange={() => setCallType('ai')} />
              Voice AI SDR (Sophia)
            </label>
            <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 font-bold cursor-pointer">
              <input type="radio" name="callType" checked={callType === 'human'} onChange={() => setCallType('human')} />
              Direct Human Call
            </label>
          </div>
          {callStatus === 'idle' ? (
            <Button variant="primary" size="sm" onClick={handleStartCall} leftIcon={<Phone className="w-3.5 h-3.5" />}>
              Start Outbound Call
            </Button>
          ) : (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs space-y-1">
              <div className="font-bold text-emerald-400 flex items-center justify-between">
                <span>{callStatus === 'calling' ? 'Dialing prospect...' : callStatus === 'connected' ? 'Connected • Live AI Call in progress' : 'Call Completed & Recorded'}</span>
                <span className="font-mono">{Math.floor(callDuration / 60)}:{String(callDuration % 60).padStart(2, '0')}</span>
              </div>
              <p className="text-slate-400 text-[11px]">
                {callStatus === 'completed' ? 'Auto-transcribed and logged to Contact Timeline & Voice SDR analytics.' : 'Real-time objection handling & qualification active.'}
              </p>
            </div>
          )}
        </div>
      )}

      {activeAction === 'deal' && (
        <form onSubmit={handleCreateDealFromContact} className="p-4 bg-emerald-500/5 dark:bg-[#161616] border-b border-slate-200 dark:border-[#252525] space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-500" /> Create Revenue Opportunity for {contact.companyName}
            </span>
            <button type="button" onClick={() => setActiveAction('none')} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Deal Title</label>
              <input
                type="text"
                required
                value={dealTitle}
                onChange={(e) => setDealTitle(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Estimated Value ($ USD)</label>
              <input
                type="number"
                required
                value={dealValue}
                onChange={(e) => setDealValue(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" size="sm" type="button" onClick={() => setActiveAction('none')}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Save to Pipeline
            </Button>
          </div>
        </form>
      )}

      {activeAction === 'task' && (
        <form onSubmit={handleCreateTask} className="p-4 bg-slate-500/5 dark:bg-[#161616] border-b border-slate-200 dark:border-[#252525] space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-emerald-500" /> Add Follow-up Task for {contact.name}
            </span>
            <button type="button" onClick={() => setActiveAction('none')} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <input
                type="text"
                required
                placeholder="e.g. Send custom enterprise proposal & security SLA"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <input
                type="date"
                required
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" size="sm" type="button" onClick={() => setActiveAction('none')}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Schedule Task
            </Button>
          </div>
        </form>
      )}

      {activeAction === 'sequence' && (
        <form onSubmit={handleAddToSequence} className="p-4 bg-emerald-500/5 dark:bg-[#161616] border-b border-slate-200 dark:border-[#252525] space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-500" /> Enroll in Multi-Channel Sequence
            </span>
            <button type="button" onClick={() => setActiveAction('none')} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <select
            value={selectedSequence}
            onChange={(e) => setSelectedSequence(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
          >
            <option>Enterprise SDR Cold Outreach (4-Step Email + LinkedIn)</option>
            <option>Series A/B High-Intent Founders Sequence</option>
            <option>Post-Demo Proposal Follow-Up Sequence</option>
            <option>Q4 Re-Engagement & Special Pricing Sequence</option>
          </select>
          <div className="flex items-center justify-end gap-2">
            <Button variant="secondary" size="sm" type="button" onClick={() => setActiveAction('none')}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Enroll & Start Sequence
            </Button>
          </div>
        </form>
      )}

      {/* 4. 9 Unified Tabs Navigation */}
      <div className="px-6 border-b border-slate-100 dark:border-[#202020] bg-white dark:bg-[#111111] flex items-center gap-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'activity', label: `Activity (${contactActivities.length})` },
          { id: 'emails', label: 'Emails' },
          { id: 'linkedin', label: 'LinkedIn' },
          { id: 'calls', label: 'Calls' },
          { id: 'deals', label: `Deals (${contactDeals.length})` },
          { id: 'tasks', label: `Tasks (${contactTasks.length})` },
          { id: 'notes', label: `Notes (${contactNotes.length})` },
          { id: 'sequences', label: 'Sequences' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 5. Tab Content Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 text-xs">
            
            {/* Firmographics & Intelligence */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Company Account</span>
                <div className="font-bold text-slate-900 dark:text-white flex items-center justify-between">
                  <span>{contact.companyName}</span>
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">{contact.companyDomain}</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Primary Channel</span>
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Badge variant="blue" size="sm">{contact.channel}</Badge>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Location</span>
                <div className="font-bold text-slate-900 dark:text-white">{contact.location || 'San Francisco, CA'}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Last Activity</span>
                <div className="font-bold text-slate-900 dark:text-white truncate">{contact.lastTouch}</div>
              </div>
            </div>

            {/* Buying Signals & Intent */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-500" /> Active Buying Signals & Firmographics
                </span>
                <Badge variant="emerald" size="sm">High Fit</Badge>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                Decision maker has hiring surges (+6 SDR roles) and visited pricing and integration documentation within the past 48 hours.
              </p>
            </div>

            {/* Associated Deals Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-500" /> Commercial Pipeline Summary
                </span>
                <Button variant="outline" size="sm" onClick={() => setActiveAction('deal')}>
                  + Add Deal
                </Button>
              </div>
              {contactDeals.length > 0 ? (
                <div className="space-y-2">
                  {contactDeals.map((d) => (
                    <div key={d.id} className="p-3 rounded-xl bg-white dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#262626] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{d.title}</div>
                        <div className="text-[11px] text-slate-400">Stage: {d.stageId} • Owner: {d.owner}</div>
                      </div>
                      <div className="font-mono font-bold text-emerald-500">${d.value.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-400 text-center py-3">No active deals yet. Click "+ Add Deal" above.</div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: UNIVERSAL ACTIVITY TIMELINE */}
        {activeTab === 'activity' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cross-Platform Chronological Timeline</span>
              <span className="text-[10px] text-slate-400">{contactActivities.length} Events</span>
            </div>
            {contactActivities.length > 0 ? (
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-[#262626]">
                {contactActivities.map((act) => {
                  const isCall = act.type === 'call';
                  const isEmail = act.type === 'email';
                  const isLinkedIn = act.type === 'linkedin';
                  return (
                    <div key={act.id} className="relative group">
                      <div className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 border-white dark:border-[#111111] flex items-center justify-center text-[10px] ${
                        isCall ? 'bg-purple-500 text-white' :
                        isEmail ? 'bg-emerald-500 text-white' :
                        isLinkedIn ? 'bg-blue-500 text-white' : 'bg-slate-500 text-white'
                      }`}>
                        {isCall ? <Phone className="w-2.5 h-2.5" /> :
                         isEmail ? <Mail className="w-2.5 h-2.5" /> :
                         isLinkedIn ? <Linkedin className="w-2.5 h-2.5" /> : <Clock className="w-2.5 h-2.5" />}
                      </div>
                      <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-900 dark:text-white">{act.title}</span>
                          <span className="text-[10px] text-slate-400">{act.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{act.details}</p>
                        <div className="text-[10px] text-slate-400 pt-1">Logged by: {act.owner}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                No activity history recorded yet. Use the action bar above to log emails, calls, or notes.
              </div>
            )}
          </div>
        )}

        {/* TAB 3: EMAILS */}
        {activeTab === 'emails' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Email Conversation History</span>
              <Button variant="primary" size="sm" onClick={() => setActiveAction('email')} leftIcon={<Mail className="w-3.5 h-3.5" />}>
                Send Email
              </Button>
            </div>
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900 dark:text-white">Re: Outtricks Revenue Automation Matrix</span>
                  <span className="text-[10px] text-slate-400">4h ago</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  "Hi Sarah, thanks for reaching out. We would love to see a demo of your autonomous AI SDR and how it integrates with our current tech stack."
                </p>
                <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Replied • Deliverability Score 100%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LINKEDIN */}
        {activeTab === 'linkedin' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">LinkedIn Automation & Messages</span>
              <Button variant="primary" size="sm" onClick={() => setActiveAction('linkedin')} leftIcon={<Linkedin className="w-3.5 h-3.5" />}>
                Send Message
              </Button>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white">Connection Accepted & Message Sent</span>
                <span className="text-[10px] text-slate-400">Yesterday</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                Connected with {contact.name}. Automatic welcome message dispatched via Outtricks LinkedIn proxy cluster.
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: CALLS */}
        {activeTab === 'calls' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Call Recordings & AI Transcripts</span>
              <Button variant="primary" size="sm" onClick={() => setActiveAction('call')} leftIcon={<Phone className="w-3.5 h-3.5" />}>
                Call Prospect
              </Button>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-primary" /> Voice AI SDR Qualification Call
                </span>
                <span className="text-[10px] font-mono text-primary font-bold">4m 22s</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                AI Agent Sophia spoke with {contact.name}. Successfully qualified for Enterprise ARR budget and resolved technical integration questions.
              </p>
              <div className="p-2 rounded-xl bg-primary-muted border border-primary-border text-[11px] font-mono text-primary flex items-center justify-between">
                <span>Audio Recording (Stereo HD)</span>
                <button type="button" className="text-primary hover:underline flex items-center gap-1 font-bold">
                  <Play className="w-3 h-3" /> Play Audio
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: DEALS */}
        {activeTab === 'deals' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Associated Revenue Deals</span>
              <Button variant="primary" size="sm" onClick={() => setActiveAction('deal')} leftIcon={<DollarSign className="w-3.5 h-3.5" />}>
                Create Deal
              </Button>
            </div>
            {contactDeals.length > 0 ? (
              <div className="space-y-3">
                {contactDeals.map((deal) => (
                  <div key={deal.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-slate-900 dark:text-white">{deal.title}</h4>
                      <span className="font-mono font-black text-emerald-500 text-sm">${deal.value.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Badge variant="blue" size="sm">{deal.stageId}</Badge>
                      <span>•</span>
                      <span>Owner: {deal.owner}</span>
                      <span>•</span>
                      <span>Close Date: {deal.expectedCloseDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400">No deals associated yet.</div>
            )}
          </div>
        )}

        {/* TAB 7: TASKS */}
        {activeTab === 'tasks' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Follow-up Tasks</span>
              <Button variant="primary" size="sm" onClick={() => setActiveAction('task')} leftIcon={<CheckSquare className="w-3.5 h-3.5" />}>
                Add Task
              </Button>
            </div>
            {contactTasks.length > 0 ? (
              <div className="space-y-2">
                {contactTasks.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#222222] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={t.completed}
                        onChange={() => toggleTaskCompleted(t.id)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <span className={`font-semibold ${t.completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                        {t.title}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">Due {t.dueDate}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400">No pending tasks.</div>
            )}
          </div>
        )}

        {/* TAB 8: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">CRM Context Notes</span>
              <Button variant="primary" size="sm" onClick={() => setActiveAction('note')} leftIcon={<FileText className="w-3.5 h-3.5" />}>
                Add Note
              </Button>
            </div>
            {activeAction === 'note' && (
              <form onSubmit={handleCreateNote} className="p-3 rounded-xl bg-slate-100 dark:bg-[#1A1A1A] space-y-2">
                <textarea
                  required
                  rows={3}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder="Type note details here..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" size="sm" type="button" onClick={() => setActiveAction('none')}>Cancel</Button>
                  <Button variant="primary" size="sm" type="submit">Save Note</Button>
                </div>
              </form>
            )}
            {contactNotes.length > 0 ? (
              <div className="space-y-2">
                {contactNotes.map((n) => (
                  <div key={n.id} className="p-3 rounded-xl bg-slate-50 dark:bg-[#161616] border border-slate-200 dark:border-[#222222] space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-bold text-slate-300">{n.author}</span>
                      <span>{n.createdAt}</span>
                    </div>
                    <p className="text-slate-800 dark:text-slate-200">{n.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400">No notes yet. Click "+ Add Note" to record insights.</div>
            )}
          </div>
        )}

        {/* TAB 9: SEQUENCES */}
        {activeTab === 'sequences' && (
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 dark:text-white">Active Outreach Sequences</span>
              <Button variant="primary" size="sm" onClick={() => setActiveAction('sequence')} leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
                Enroll in Sequence
              </Button>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#161616] border border-slate-200/80 dark:border-[#222222] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">Enterprise SDR Cold Outreach (4-Step)</span>
                <Badge variant="emerald" size="sm">Active (Step 2 of 4)</Badge>
              </div>
              <p className="text-slate-500">
                Step 2 (LinkedIn Profile Touch & Automated InMail) scheduled for tomorrow at 10:00 AM PST.
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
