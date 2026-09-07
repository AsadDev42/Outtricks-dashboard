import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  DollarSign, 
  Layers, 
  Plus, 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Building2, 
  Calendar,
  X,
  Kanban,
  Table as TableIcon,
  Edit3,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLinkedIn, LinkedInLead } from '../../context/LinkedInContext';
import { useToast } from '../../context/ToastContext';

const STAGES: LinkedInLead['status'][] = [
  'New Leads',
  'Contacted',
  'Interested',
  'Qualified',
  'Meeting',
  'Converted',
];

export const LinkedInLeadsView: React.FC = () => {
  const { leads, updateLeadStage, addLead } = useLinkedIn();
  const { success } = useToast();

  const [viewMode, setViewMode] = useState<'pipeline' | 'table'>('pipeline');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<LinkedInLead | null>(null);
  const [deletingLead, setDeletingLead] = useState<LinkedInLead | null>(null);

  // Form State
  const [leadName, setLeadName] = useState('');
  const [leadTitle, setLeadTitle] = useState('');
  const [leadCompany, setLeadCompany] = useState('');
  const [leadValue, setLeadValue] = useState('35000');
  const [leadStage, setLeadStage] = useState<LinkedInLead['status']>('New Leads');
  const [leadNextAction, setLeadNextAction] = useState('Schedule Demo Call');

  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      return (
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [leads, searchQuery]);

  const totalPipelineValue = leads.reduce((acc, l) => acc + (l.dealValue || 0), 0);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim()) return;
    addLead({
      name: leadName.trim(),
      title: leadTitle.trim() || 'VP of Technology',
      company: leadCompany.trim() || 'Enterprise Account',
      dealValue: Number(leadValue) || 30000,
      status: leadStage,
      nextAction: leadNextAction.trim(),
      owner: 'Sarah Jenkins',
    });
    setLeadName('');
    setLeadTitle('');
    setLeadCompany('');
    setIsAddLeadOpen(false);
  };

  const handleStartEdit = (lead: LinkedInLead) => {
    setEditingLead(lead);
    setLeadName(lead.name);
    setLeadTitle(lead.title);
    setLeadCompany(lead.company);
    setLeadValue(String(lead.dealValue));
    setLeadStage(lead.status);
    setLeadNextAction(lead.nextAction);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLead || !leadName.trim()) return;
    editingLead.name = leadName.trim();
    editingLead.title = leadTitle.trim();
    editingLead.company = leadCompany.trim();
    editingLead.dealValue = Number(leadValue) || 30000;
    editingLead.status = leadStage;
    editingLead.nextAction = leadNextAction.trim();
    success(`Lead ${leadName} updated.`, 'Lead Saved');
    setEditingLead(null);
  };

  const handleConfirmDelete = () => {
    if (!deletingLead) return;
    const idx = leads.findIndex(l => l.id === deletingLead.id);
    if (idx !== -1) {
      leads.splice(idx, 1);
      success(`Lead removed from pipeline.`, 'Lead Removed');
    }
    setDeletingLead(null);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Flame className="w-5 h-5 text-emerald-600" />
            <span>LinkedIn Qualified Leads Pipeline</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Prospects converted into high-intent revenue opportunities with stage progression tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 rounded-xl bg-slate-100 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode('pipeline')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'pipeline' ? 'bg-white dark:bg-[#181818] text-slate-900 dark:text-white shadow-xs' : 'text-slate-400'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Pipeline</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                viewMode === 'table' ? 'bg-white dark:bg-[#181818] text-slate-900 dark:text-white shadow-xs' : 'text-slate-400'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setLeadName('');
              setLeadTitle('');
              setLeadCompany('');
              setLeadValue('35000');
              setLeadStage('New Leads');
              setLeadNextAction('Schedule Demo Call');
              setIsAddLeadOpen(true);
            }}
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-md shadow-emerald-600/20"
          >
            Add Lead
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Total Pipeline ARR</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            ${totalPipelineValue.toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Active Deals</span>
          <span className="text-xl font-extrabold text-slate-900 dark:text-white">{leads.length} Deals</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Avg Deal Size</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            ${Math.round(totalPipelineValue / (leads.length || 1)).toLocaleString()}
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider block">Meeting Conversion</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">32.4%</span>
        </div>
      </div>

      {/* 3. Pipeline Kanban Layout */}
      {viewMode === 'pipeline' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3 min-h-[500px]">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.status === stage);
            const stageTotal = stageLeads.reduce((acc, l) => acc + (l.dealValue || 0), 0);

            return (
              <div
                key={stage}
                className="flex flex-col rounded-3xl bg-slate-50/70 dark:bg-[#161616]/60 border border-slate-200/80 dark:border-[#202020] p-3 space-y-3"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-[#202020]">
                  <div>
                    <span className="font-extrabold text-xs text-slate-900 dark:text-white block">{stage}</span>
                    <span className="text-[10px] font-mono text-slate-400 font-bold">${stageTotal.toLocaleString()}</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] flex items-center justify-center text-[10px] font-bold text-slate-700 dark:text-slate-300 font-mono">
                    {stageLeads.length}
                  </span>
                </div>

                {/* Cards in this stage */}
                <div className="flex-1 space-y-2.5 overflow-y-auto no-scrollbar">
                  {stageLeads.length === 0 ? (
                    <div className="p-4 rounded-2xl border border-dashed border-slate-200 dark:border-[#202020] text-center text-[11px] text-slate-400">
                      Empty Stage
                    </div>
                  ) : (
                    stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="p-3.5 rounded-2xl bg-white dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs hover:border-emerald-500/40 transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <div>
                            <div className="font-extrabold text-xs text-slate-950 dark:text-white">{lead.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">{lead.title}</div>
                            <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400">{lead.company}</div>
                          </div>
                          <span className="font-mono font-black text-xs text-emerald-600 dark:text-emerald-400">
                            ${lead.dealValue.toLocaleString()}
                          </span>
                        </div>

                        <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-100 dark:border-[#202020] text-[10px] text-slate-500">
                          <span className="font-bold text-slate-700 dark:text-slate-300 block">Next Action:</span>
                          <span>{lead.nextAction || 'Follow up with proposal'}</span>
                        </div>

                        {/* Card controls */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-[#202020]">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleStartEdit(lead)}
                              className="p-1 rounded-lg text-slate-400 hover:text-emerald-500 cursor-pointer"
                              title="Edit Lead"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => setDeletingLead(lead)}
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-500 cursor-pointer"
                              title="Delete Lead"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStage(lead.id, e.target.value as any)}
                            className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-[10px] font-semibold text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
                          >
                            {STAGES.map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-100 dark:border-[#202020] bg-slate-50/50 dark:bg-[#141414]/50 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="py-3.5 px-4">Lead Contact</th>
                  <th className="py-3.5 px-3">Company</th>
                  <th className="py-3.5 px-3">Deal Value</th>
                  <th className="py-3.5 px-3">Stage</th>
                  <th className="py-3.5 px-3">Owner</th>
                  <th className="py-3.5 px-3">Next Action</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.06]">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/80 dark:hover:bg-[#1C1C1C]/50 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-slate-900 dark:text-white">{lead.name}</div>
                      <div className="text-[10px] text-slate-400">{lead.title}</div>
                    </td>

                    <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {lead.company}
                    </td>

                    <td className="py-3.5 px-3 font-mono font-black text-emerald-600">
                      ${lead.dealValue.toLocaleString()}
                    </td>

                    <td className="py-3.5 px-3">
                      <Badge variant="emerald" size="sm">
                        {lead.status}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-3 font-medium text-slate-700 dark:text-slate-300">
                      {lead.owner || 'Sarah Jenkins'}
                    </td>

                    <td className="py-3.5 px-3 text-slate-500 max-w-xs truncate">
                      {lead.nextAction}
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleStartEdit(lead)}
                          className="p-1 rounded-lg text-slate-400 hover:text-emerald-500 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStage(lead.id, e.target.value as any)}
                          className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-[#181818] text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-hidden cursor-pointer"
                        >
                          {STAGES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Add / Edit Lead Modal */}
      {(isAddLeadOpen || editingLead) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {editingLead ? 'Edit Qualified Lead' : 'Create Qualified Lead'}
              </h3>
              <button
                onClick={() => {
                  setIsAddLeadOpen(false);
                  setEditingLead(null);
                }}
                className="text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={editingLead ? handleSaveEdit : handleCreateLead} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Lead Contact Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Chen"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Head of Sales Ops"
                    value={leadTitle}
                    onChange={(e) => setLeadTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Company</label>
                  <input
                    type="text"
                    placeholder="e.g. SaaSFlow Systems"
                    value={leadCompany}
                    onChange={(e) => setLeadCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Deal Value ($ ARR)</label>
                  <input
                    type="number"
                    placeholder="35000"
                    value={leadValue}
                    onChange={(e) => setLeadValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Stage</label>
                  <select
                    value={leadStage}
                    onChange={(e) => setLeadStage(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden cursor-pointer"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Next Action</label>
                <input
                  type="text"
                  placeholder="e.g. Send Demo Calendar Link"
                  value={leadNextAction}
                  onChange={(e) => setLeadNextAction(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-hidden focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setIsAddLeadOpen(false);
                    setEditingLead(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  {editingLead ? 'Save Changes' : 'Add Lead'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Delete Lead Confirmation Modal */}
      {deletingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900/60 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-white">Delete Lead?</h3>
                <p className="text-[11px] text-slate-400">Lead will be removed from pipeline.</p>
              </div>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Are you sure you want to remove <strong className="text-slate-900 dark:text-white">{deletingLead.name}</strong> (${deletingLead.dealValue.toLocaleString()})?
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setDeletingLead(null)}>
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleConfirmDelete} leftIcon={<Trash2 className="w-3.5 h-3.5" />}>
                Delete Lead
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
