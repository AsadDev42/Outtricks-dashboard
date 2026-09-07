import React, { useState } from 'react';
import { 
  Ban, 
  Plus, 
  Trash2, 
  Search, 
  Download, 
  Upload, 
  X, 
  AlertTriangle, 
  ShieldCheck,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { useSettings, SuppressedRecord } from '../../context/SettingsContext';
import { useToast } from '../../context/ToastContext';

export const SettingsSuppressionListView: React.FC = () => {
  const { suppressionList, addSuppression, removeSuppression } = useSettings();
  const { success, info } = useToast();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Email' | 'Domain' | 'Phone'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newType, setNewType] = useState<SuppressedRecord['type']>('Email');
  const [newValue, setNewValue] = useState('');
  const [newReason, setNewReason] = useState<SuppressedRecord['reason']>('Manual Request');

  const [recordToRemove, setRecordToRemove] = useState<SuppressedRecord | null>(null);

  const filteredRecords = suppressionList.filter((item) => {
    const matchesFilter = activeFilter === 'All' || item.type === activeFilter;
    const matchesSearch = 
      item.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newValue) return;
    addSuppression(newType, newValue, newReason);
    setNewValue('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Ban className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Global Suppression List & Do-Not-Contact (DNC) Registry ({suppressionList.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Enforces hard suppression across cold email mailboxes, LinkedIn bots, and voice SDR engines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => success('Exporting suppression list CSV.', 'Export Complete')}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Suppression
          </Button>
        </div>
      </div>

      {/* 2. Controls & Search Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#141414] overflow-x-auto">
          {(['All', 'Email', 'Domain', 'Phone'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeFilter === tab
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search email, domain, or reason..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
      </div>

      {/* 3. Suppressed Records Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200/80 dark:border-[#202020]">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-50 dark:bg-[#141414]/80 border-b border-slate-200 dark:border-[#202020] text-[10px] text-slate-400 font-sans uppercase font-bold">
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Suppressed Value</th>
                <th className="py-3 px-4">Reason</th>
                <th className="py-3 px-4">Origin / Source</th>
                <th className="py-3 px-4">Date Added</th>
                <th className="py-3 px-4 text-right font-sans">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((rec) => (
                  <tr key={rec.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40">
                    <td className="py-3 px-4 font-sans">
                      <Badge
                        variant={rec.type === 'Domain' ? 'primary' : 'slate'}
                        size="sm"
                      >
                        {rec.type}
                      </Badge>
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                      {rec.value}
                    </td>

                    <td className="py-3 px-4 font-sans text-slate-700 dark:text-slate-300">
                      {rec.reason}
                    </td>

                    <td className="py-3 px-4 font-sans text-slate-500 text-[11px]">
                      {rec.source}
                    </td>

                    <td className="py-3 px-4 text-slate-400 font-sans text-[11px]">
                      {rec.dateAdded}
                    </td>

                    <td className="py-3 px-4 text-right font-sans">
                      <button
                        onClick={() => setRecordToRemove(rec)}
                        className="text-[11px] text-rose-500 font-bold hover:underline cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-sans">
                    No suppression records matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Suppression Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2 text-rose-600">
                <Ban className="w-5 h-5" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Add to Suppression List</h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                {(['Email', 'Domain', 'Phone'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setNewType(type)}
                    className={`p-2.5 rounded-xl border font-bold transition-all cursor-pointer ${
                      newType === type
                        ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                        : 'border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-slate-900'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {newType} Value to Suppress
                </label>
                <input
                  type="text"
                  placeholder={newType === 'Domain' ? 'competitor.com' : newType === 'Phone' ? '+1 (555) 019-2831' : 'prospect@domain.com'}
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white font-mono focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Reason for Suppression
                </label>
                <select
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                >
                  <option value="Manual Request">Manual Request / Do Not Contact</option>
                  <option value="Unsubscribed">Unsubscribed via Link</option>
                  <option value="Spam Complaint">Spam Complaint / FBL</option>
                  <option value="Bounced 3x">Hard Bounced Multiple Times</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Ban className="w-3.5 h-3.5" />}>
                  Suppress Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Suppression Confirmation Modal */}
      {recordToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Lift Suppression</h3>
              <button onClick={() => setRecordToRemove(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Are you sure you want to remove <strong className="text-slate-900 dark:text-white font-mono">{recordToRemove.value}</strong> from the DNC list? Outreach campaigns will be permitted to contact this entity again.
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setRecordToRemove(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  removeSuppression(recordToRemove.id);
                  setRecordToRemove(null);
                }}
              >
                Remove from List
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
