import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Users, 
  DollarSign, 
  Layers, 
  FolderPlus, 
  Edit2, 
  Trash2, 
  ArrowRight,
  X,
  Sparkles,
  Search
} from 'lucide-react';
import { useCrm, CrmLabel } from '../../context/CrmContext';
import { Button } from '../ui/Button';

export const CrmLabelsView: React.FC = () => {
  const { labels, createLabel, updateLabel, deleteLabel, setActiveTab } = useCrm();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingLabel, setEditingLabel] = useState<CrmLabel | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#3b82f6');
  const [sources, setSources] = useState('Lead Finder, CRM');

  const totalLabeledLeads = labels.reduce((acc, l) => acc + l.leadCount, 0);
  const totalLabeledDeals = labels.reduce((acc, l) => acc + l.dealCount, 0);

  const filteredLabels = labels.filter(l => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return l.name.toLowerCase().includes(q) || l.description.toLowerCase().includes(q);
  });

  const handleSaveLabel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const sourceArray = sources.split(',').map(s => s.trim()).filter(Boolean);

    if (editingLabel) {
      updateLabel({
        ...editingLabel,
        name,
        description,
        color,
        sources: sourceArray,
      });
      setEditingLabel(null);
    } else {
      createLabel({
        name,
        description,
        color,
        sources: sourceArray,
      });
    }

    setIsAddModalOpen(false);
    setName('');
    setDescription('');
  };

  const handleOpenEdit = (lbl: CrmLabel) => {
    setEditingLabel(lbl);
    setName(lbl.name);
    setDescription(lbl.description);
    setColor(lbl.color);
    setSources(lbl.sources.join(', '));
    setIsAddModalOpen(true);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header with Page Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            LABEL INTELLIGENCE
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Categorization taxonomy, buyer intent tagging, and cross-module record segmentation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setEditingLabel(null);
              setName('');
              setDescription('');
              setIsAddModalOpen(true);
            }}
            className="text-xs font-bold gap-1.5 shadow-sm shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>New Label</span>
          </Button>
        </div>
      </div>

      {/* 2. Top Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Labels</span>
            <Tag className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {labels.length}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Active taxonomies</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Labeled Leads</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalLabeledLeads}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Segmented contacts</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Pipeline Attachments</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {totalLabeledDeals}
          </div>
          <div className="text-[11px] text-slate-500">Deals categorized</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Sources Covered</span>
            <Layers className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            6
          </div>
          <div className="text-[11px] text-slate-400">Omnichannel capture</div>
        </div>

      </div>

      {/* 3. Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search labels by name or description..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          />
        </div>
      </div>

      {/* 4. Labels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLabels.map((lbl) => (
          <div
            key={lbl.id}
            className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{ backgroundColor: lbl.color }}
                  />
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {lbl.name}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(lbl)}
                    className="p-1 rounded-lg text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete label "${lbl.name}"?`)) {
                        deleteLabel(lbl.id);
                      }
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                {lbl.description}
              </p>

              {/* Source Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {lbl.sources.map((src, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400"
                  >
                    {src}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="pt-3 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-xs">
              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                <span>{lbl.leadCount} leads</span>
                <span>•</span>
                <span>{lbl.dealCount} deals</span>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('contacts')}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>Open Leads</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5. Add / Edit Label Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveLabel}
            className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {editingLabel ? 'Edit Label' : 'Create New Label'}
              </h2>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Label Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Enterprise Champion"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain when this tag should be applied..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Color Accent</label>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full h-9 p-1 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Data Sources</label>
                  <input
                    type="text"
                    value={sources}
                    onChange={(e) => setSources(e.target.value)}
                    placeholder="e.g. Lead Finder, CRM"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                {editingLabel ? 'Update Label' : 'Save Label'}
              </Button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
