import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Plus, 
  Play, 
  Copy, 
  Sparkles,
  Zap
} from 'lucide-react';
import { useCoPilot, PromptTemplate } from '../../context/CoPilotContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CreatePromptModal } from './CreatePromptModal';
import { useToast } from '../../context/ToastContext';

export const CoPilotPromptsLibraryView: React.FC = () => {
  const { prompts, usePromptInChat, createCustomPrompt } = useCoPilot();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { success } = useToast();

  const categories = ['All', 'Cold Outbound', 'Speed-to-Lead', 'Objection Handling', 'Upwork Proposal', 'CRM Intelligence'];

  const filteredPrompts = prompts.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const copyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    success('Prompt copied to clipboard.', 'Copied');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search prompt templates..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsCreateOpen(true)}
          className="shadow-md shadow-primary/30"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Save New Template</span>
        </Button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer select-none shrink-0 ${
              selectedCategory === cat
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white dark:bg-[#161616] text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-[#202020]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPrompts.map((p) => (
          <div
            key={p.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-primary/40 transition-all shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Badge variant="primary" size="sm">
                  {p.category}
                </Badge>
                <span className="text-[10px] text-slate-400 font-mono">
                  {p.usageCount} uses
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {p.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {p.description}
              </p>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] text-[11px] font-mono text-slate-800 dark:text-slate-200 line-clamp-3">
                {p.promptText}
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-[#202020]">
              <button
                type="button"
                onClick={() => copyPrompt(p.promptText)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </button>

              <Button
                variant="primary"
                size="sm"
                onClick={() => usePromptInChat(p.promptText)}
                className="text-xs"
              >
                <Play className="w-3.5 h-3.5 mr-1" />
                <span>Use in Chat</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CreatePromptModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={createCustomPrompt}
      />

    </div>
  );
};
