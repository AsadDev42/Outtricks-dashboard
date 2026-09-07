import React from 'react';
import { FileText, Plus, Copy, Trash2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUpwork } from '../../context/UpworkContext';
import { useToast } from '../../context/ToastContext';

export interface UpworkTemplatesViewProps {
  onOpenCreateTemplate: () => void;
}

export const UpworkTemplatesView: React.FC<UpworkTemplatesViewProps> = ({
  onOpenCreateTemplate,
}) => {
  const { templates, deleteTemplate } = useUpwork();
  const { success } = useToast();

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    success('Template copied to clipboard!', 'Copied');
  };

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              High-Converting Proposal Templates ({templates.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Battle-tested cover letter hooks with dynamic variables like {'{{client_name}}'} and {'{{job_scope}}'}.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={onOpenCreateTemplate} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          New Template
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((tpl) => (
          <div key={tpl.id} className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 flex flex-col justify-between text-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-slate-950 dark:text-white">{tpl.name}</span>
                <span className="px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-white/[0.04] text-blue-600 font-mono text-[10px] font-bold">
                  {tpl.category}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-100 dark:border-[#202020] text-slate-600 dark:text-slate-400 whitespace-pre-line leading-relaxed font-sans line-clamp-4">
                {tpl.content}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between font-mono text-[11px]">
              <span className="text-slate-400">Used {tpl.usageCount} times</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleCopy(tpl.content)} leftIcon={<Copy className="w-3 h-3" />}>
                  Copy
                </Button>
                <button
                  type="button"
                  onClick={() => deleteTemplate(tpl.id)}
                  className="p-1.5 text-slate-400 hover:text-red-500 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
