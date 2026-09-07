import React, { useState } from 'react';
import { BookOpen, Plus, FileText, Trash2, Upload, CheckCircle2 } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useVoiceAi } from '../../context/VoiceAiContext';

export const VoiceKnowledgeBaseView: React.FC = () => {
  const { knowledgeDocs, uploadKnowledgeDoc, deleteKnowledgeDoc } = useVoiceAi();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Product Specs');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    uploadKnowledgeDoc(title.trim(), category);
    setTitle('');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-500" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Voice AI Knowledge Base & Vector Index ({knowledgeDocs.length} Documents)
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Source documents indexed into real-time RAG memory for sub-400ms contextual answers during live sales calls.
        </p>
      </div>

      {/* Upload Form */}
      <form onSubmit={handleAdd} className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row items-center gap-3 text-xs">
        <input
          type="text"
          placeholder="e.g. Q3_Enterprise_Security_FAQ.pdf"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 p-2.5 px-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] outline-none"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2.5 px-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] outline-none"
        >
          <option value="Product Specs">Product Specs</option>
          <option value="Security & Compliance">Security & Compliance</option>
          <option value="Commercials">Commercials</option>
          <option value="Objection Handlers">Objection Handlers</option>
        </select>
        <Button variant="primary" size="sm" type="submit" leftIcon={<Upload className="w-3.5 h-3.5" />}>
          Index Document
        </Button>
      </form>

      {/* Documents Grid */}
      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs font-mono">
        {knowledgeDocs.map((doc) => (
          <div key={doc.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0 border border-emerald-500/20">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-slate-900 dark:text-white truncate">{doc.title}</div>
                <div className="text-[11px] text-slate-500 font-sans">
                  {doc.category} • {doc.size} • Indexed {doc.lastIndexed}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-slate-400">Assigned: {doc.assignedAgents.join(', ')}</span>
              <button
                type="button"
                onClick={() => deleteKnowledgeDoc(doc.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
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
