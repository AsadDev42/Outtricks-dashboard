import React from 'react';
import { 
  Database, 
  BookOpen, 
  ShieldCheck, 
  Plus, 
  FileText, 
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useCoPilot } from '../../context/CoPilotContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const CoPilotKnowledgeBaseView: React.FC = () => {
  const { knowledgeDocs } = useCoPilot();

  return (
    <div className="space-y-6 font-sans">
      
      {/* KB Intro Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-slate-950 dark:text-white">
              Workspace Context & Knowledge Base
            </h2>
            <Badge variant="emerald" size="sm">
              Vector Grounded
            </Badge>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            TRIXIE AI injects these verified knowledge documents into the context window for all prompt generations, objection handling, and cold outreach.
          </p>
        </div>

        <Button variant="outline" size="sm" className="shrink-0 text-xs">
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Document</span>
        </Button>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {knowledgeDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <Badge variant="blue" size="sm">
                  {doc.category}
                </Badge>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-mono">
                  <Clock className="w-3 h-3" />
                  <span>{doc.lastUpdated}</span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {doc.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-[#1C1C1C] p-3 rounded-2xl border border-slate-100 dark:border-[#202020]">
                {doc.content}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-[#202020] text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active in Context</span>
              </span>
              <span className="text-slate-400 font-mono text-[10px]">100% indexed</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
