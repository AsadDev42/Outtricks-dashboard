import React, { useState } from 'react';
import { 
  Upload, 
  X, 
  Check, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  CheckCircle2, 
  Building2, 
  DollarSign 
} from 'lucide-react';
import { useCrm, CrmDeal } from '../../context/CrmContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface CrmImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_CSV_PREVIEW: Partial<CrmDeal>[] = [
  {
    title: 'CloudScale AI - Enterprise Annual Tier',
    companyName: 'CloudScale AI',
    companyDomain: 'cloudscale.ai',
    contactName: 'Sarah Jenkins',
    contactEmail: 'sarah.j@cloudscale.ai',
    value: 48000,
    stageId: 'stage_2',
    owner: 'Sarah Jenkins',
    expectedCloseDate: '2026-09-30'
  },
  {
    title: 'FinTech Stack Systems - Multi-Currency Rails',
    companyName: 'FinTech Stack Systems',
    companyDomain: 'fintechstack.com',
    contactName: 'Elena Rostova',
    contactEmail: 'elena@fintechstack.com',
    value: 72000,
    stageId: 'stage_4',
    owner: 'Sarah Jenkins',
    expectedCloseDate: '2026-09-10'
  },
  {
    title: 'DataGrid Dynamics - RevOps Engine Expansion',
    companyName: 'DataGrid Dynamics',
    companyDomain: 'datagrid.io',
    contactName: 'Jonathan Hayes',
    contactEmail: 'jonathan@datagrid.io',
    value: 36000,
    stageId: 'stage_1',
    owner: 'Marcus Vance',
    expectedCloseDate: '2026-10-15'
  }
];

export const CrmImportModal: React.FC<CrmImportModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const { importDealsFromCsv } = useCrm();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fileName, setFileName] = useState<string>('q3_enterprise_pipeline_leads.csv');
  const [duplicateMode, setDuplicateMode] = useState<'merge' | 'skip' | 'overwrite'>('merge');

  const handleFinishImport = () => {
    importDealsFromCsv(SAMPLE_CSV_PREVIEW);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-[#161616] rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                Import Deals & Pipeline CSV
              </h2>
              <p className="text-xs text-slate-500">
                Step {step} of 3: {step === 1 ? 'Upload File' : step === 2 ? 'Column Mapping' : 'Duplicate Resolution & Preview'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-[#181818] h-1">
          <div 
            className="bg-emerald-600 h-1 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-xs">
          
          {/* STEP 1: Upload File */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-8 rounded-2xl border-2 border-dashed border-slate-300 dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-[#141414]/30 text-center space-y-3 cursor-pointer hover:border-emerald-500 transition-colors">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white block">
                    {fileName}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Ready to import (3 rows detected, UTF-8 CSV)
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Standard CRM Schema Detected</span>
                </span>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
                  Headers will auto-map to Deal Name, Company Domain, Contact Email, and Expected ARR Value.
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Column Mapping */}
          {step === 2 && (
            <div className="space-y-3 animate-in fade-in">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">
                Verify Auto-Mapped CSV Columns:
              </span>

              <div className="space-y-2">
                {[
                  { field: 'Deal Title', mappedTo: 'Opportunity Name' },
                  { field: 'Company Domain', mappedTo: 'Account Domain' },
                  { field: 'Contact Email', mappedTo: 'Lead Email' },
                  { field: 'Deal ARR Value', mappedTo: 'Contract Value ($)' },
                  { field: 'Pipeline Stage', mappedTo: 'Stage ID' },
                  { field: 'Assigned Owner', mappedTo: 'Account Executive' },
                ].map((col, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{col.field}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded text-[10px]">
                      ← {col.mappedTo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Duplicates & Preview */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div>
                <label className="block font-bold text-slate-900 dark:text-white mb-2">
                  Duplicate Record Resolution Strategy
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'merge', label: 'Merge Records', desc: 'Combine tags & update values' },
                    { id: 'skip', label: 'Skip Existing', desc: 'Ignore matching domains' },
                    { id: 'overwrite', label: 'Overwrite', desc: 'Replace existing fields' },
                  ].map((mode) => (
                    <div
                      key={mode.id}
                      onClick={() => setDuplicateMode(mode.id as any)}
                      className={`p-3 rounded-xl border cursor-pointer space-y-1 transition-all ${
                        duplicateMode === mode.id
                          ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/20 text-emerald-900 dark:text-emerald-200'
                          : 'border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#141414]'
                      }`}
                    >
                      <div className="font-bold">{mode.label}</div>
                      <div className="text-[10px] text-slate-500">{mode.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview Table */}
              <div className="space-y-2">
                <span className="font-bold text-slate-700 dark:text-slate-300 block">
                  Preview Import Rows (3 deals):
                </span>
                <div className="space-y-1.5">
                  {SAMPLE_CSV_PREVIEW.map((row, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-900 dark:text-white">{row.title}</span>
                      <span className="font-mono text-emerald-600 font-bold">{formatCurrency(row.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between bg-slate-50/50 dark:bg-[#141414]/40">
          {step > 1 ? (
            <button
              onClick={() => setStep((prev) => (prev - 1) as any)}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-200 font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-[#181818] text-slate-700 dark:text-slate-200 font-bold cursor-pointer"
            >
              Cancel
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep((prev) => (prev + 1) as any)}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinishImport}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Execute Import</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
