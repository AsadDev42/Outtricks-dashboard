import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Copy, 
  Trash2, 
  Sparkles, 
  Eye, 
  Send,
  Search
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useEmail, EmailTemplate } from '../../context/EmailContext';
import { useToast } from '../../context/ToastContext';

export interface TemplatesLibraryProps {
  onOpenCreateTemplate: () => void;
}

export const TemplatesLibrary: React.FC<TemplatesLibraryProps> = ({
  onOpenCreateTemplate,
}) => {
  const { templates, deleteTemplate } = useEmail();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { success } = useToast();

  const filteredTemplates = templates.filter((t) => {
    if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesName = t.name.toLowerCase().includes(q);
      const matchesSubject = t.subject.toLowerCase().includes(q);
      if (!matchesName && !matchesSubject) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4 font-sans">
      
      {/* Header & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] text-xs outline-none"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] text-xs font-bold text-slate-900 dark:text-white outline-none cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="Cold Outreach">Cold Outreach</option>
            <option value="Follow-Up">Follow-Up</option>
            <option value="Breakup">Breakup</option>
          </select>
        </div>

        <Button variant="primary" size="sm" onClick={onOpenCreateTemplate} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          New Template
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-3 group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase">
                  {t.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {t.usageCount.toLocaleString()} uses
                </span>
              </div>

              <div className="font-extrabold text-sm text-slate-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {t.name}
              </div>

              <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 truncate">
                Subj: {t.subject}
              </div>

              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed whitespace-pre-line">
                {t.body}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`${t.subject}\n\n${t.body}`);
                  success('Template copied to clipboard.', 'Copied');
                }}
                className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Copy</span>
              </button>

              <button
                type="button"
                onClick={() => deleteTemplate(t.id)}
                className="text-slate-400 hover:text-rose-500 cursor-pointer p-1"
                title="Delete template"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
