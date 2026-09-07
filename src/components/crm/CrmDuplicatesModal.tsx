import React, { useState } from 'react';
import { 
  Copy, 
  X, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  User, 
  AlertCircle,
  GitMerge
} from 'lucide-react';
import { useCrm, CrmDeal } from '../../context/CrmContext';
import { formatCurrency, formatNumber } from '../../utils/formatters';

interface CrmDuplicatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrmDuplicatesModal: React.FC<CrmDuplicatesModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const { deals, mergeDuplicateDeals } = useCrm();

  // Find sample duplicates by company domain or name match
  const duplicatePairs = [
    {
      primary: deals[0],
      secondary: {
        id: 'deal_dup_1',
        title: 'CloudScale AI - Legacy Pilot',
        companyName: 'CloudScale AI',
        companyDomain: 'cloudscale.ai',
        contactName: 'Sarah Jenkins',
        value: 12000,
        stageId: 'stage_1',
        owner: 'Alex Rivera'
      }
    }
  ];

  const [mergedPairs, setMergedPairs] = useState<string[]>([]);

  const handleMerge = (primaryId: string, secondaryId: string) => {
    mergeDuplicateDeals(primaryId, secondaryId);
    setMergedPairs(prev => [...prev, `${primaryId}-${secondaryId}`]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white dark:bg-[#161616] rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <GitMerge className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                CRM Duplicate Hygiene & Merging
              </h2>
              <p className="text-xs text-slate-500">
                Identify and combine matching account domains, contacts, and deal opportunities.
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

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[65vh] overflow-y-auto text-xs">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 dark:bg-white/[0.04] border border-emerald-500/20 dark:border-emerald-500/30 text-emerald-900 dark:text-emerald-200 space-y-1">
            <span className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Safe Merge Protection Active</span>
            </span>
            <p className="text-[11px] text-emerald-800 dark:text-emerald-300">
              Merging consolidates custom tags, activity histories, and tasks into the primary record without dropping deal value.
            </p>
          </div>

          {duplicatePairs.map((pair, idx) => {
            const pairKey = `${pair.primary?.id}-${pair.secondary.id}`;
            const isMerged = mergedPairs.includes(pairKey);

            return (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#141414]/80 border border-slate-200/80 dark:border-[#202020] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Matching Account: {pair.primary?.companyDomain}</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 dark:bg-amber-950 text-amber-600">
                    Domain Match Detected
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Primary Record */}
                  <div className="p-3 rounded-xl bg-white dark:bg-[#161616] border border-emerald-500/30 dark:border-emerald-500/30 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase">
                      Primary Record (Retained)
                    </span>
                    <div className="font-bold text-slate-900 dark:text-white">{pair.primary?.title}</div>
                    <div className="text-slate-500 text-[11px]">{formatCurrency(pair.primary?.value)} • Owner: {pair.primary?.owner}</div>
                  </div>

                  {/* Secondary Record */}
                  <div className="p-3 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      Duplicate Record (Merged)
                    </span>
                    <div className="font-bold text-slate-900 dark:text-white">{pair.secondary.title}</div>
                    <div className="text-slate-500 text-[11px]">{formatCurrency(pair.secondary.value)} • Owner: {pair.secondary.owner}</div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  {isMerged ? (
                    <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Merged Successfully</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMerge(pair.primary?.id || '', pair.secondary.id)}
                      className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <GitMerge className="w-3.5 h-3.5" />
                      <span>Merge Into Primary</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-end bg-slate-50 dark:bg-[#141414]/40">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
