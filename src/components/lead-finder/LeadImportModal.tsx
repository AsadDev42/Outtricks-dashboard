import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { useToast } from '../../context/ToastContext';
import { Upload, FileText, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export interface LeadImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (count: number) => void;
}

export const LeadImportModal: React.FC<LeadImportModalProps> = ({
  isOpen,
  onClose,
  onImportComplete,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [dedupRule, setDedupRule] = useState('skip');
  const [isImporting, setIsImporting] = useState(false);
  const { success, error } = useToast();

  const handleSimulateFileSelect = () => {
    setFileName('enterprise_target_accounts_q3.csv (450 rows)');
  };

  const handleExecuteImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName) {
      error('Please select a CSV or Excel file to import.', 'No File Selected');
      return;
    }

    setIsImporting(true);
    setTimeout(() => {
      setIsImporting(false);
      success('Imported 450 contacts successfully.', 'Import Successful');
      onImportComplete(450);
      onClose();
    }, 700);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Import Prospect List (CSV / Excel)"
      description="Upload your target account spreadsheet. Outtricks will auto-map columns, remove duplicates, and organize contacts."
      size="sm"
    >
      <form onSubmit={handleExecuteImport} className="space-y-4 font-sans">
        
        {/* Drag and Drop Zone */}
        <div
          onClick={handleSimulateFileSelect}
          className={`p-6 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer ${
            fileName
              ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20'
              : 'border-slate-300 dark:border-[#2A2A2A] hover:border-blue-500 bg-slate-50/50 dark:bg-[#1C1C1C]/50'
          }`}
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-white/[0.04] text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-2">
            <Upload className="w-5 h-5" />
          </div>
          {fileName ? (
            <div className="space-y-1">
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>File Ready for Mapping</span>
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-300 font-mono">{fileName}</div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Click to select CSV / Excel spreadsheet
              </div>
              <div className="text-[10px] text-slate-400">Supports .csv, .xlsx up to 50MB (100,000 rows)</div>
            </div>
          )}
        </div>

        {/* Deduplication Rule */}
        <Select
          label="Deduplication Strategy"
          value={dedupRule}
          onChange={(e) => setDedupRule(e.target.value)}
          options={[
            { value: 'skip', label: 'Skip duplicates already existing in workspace' },
            { value: 'update', label: 'Update existing contacts with newly imported fields' },
            { value: 'keep_both', label: 'Import all records without deduplication' },
          ]}
        />

        <div className="p-3 bg-slate-50 dark:bg-[#1C1C1C] rounded-2xl border border-slate-200/80 dark:border-[#202020] text-xs text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Automatic schema auto-mapping: Name, Job Title, Company, Work Email, LinkedIn URL, Phone.</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isImporting} leftIcon={<Upload className="w-3.5 h-3.5" />}>
            Upload & Process
          </Button>
        </div>

      </form>
    </Modal>
  );
};
