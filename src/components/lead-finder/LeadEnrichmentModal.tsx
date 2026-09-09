import React, { useState, useMemo, useEffect } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { 
  Zap, 
  Mail, 
  Phone, 
  UserCheck, 
  TrendingUp, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  Coins, 
  ListPlus, 
  Plus, 
  Layers,
  ArrowRight,
  Info
} from 'lucide-react';
import { useLeadSearch, LeadDetailData } from '../../context/LeadSearchContext';
import { useAuth } from '../../context/AuthContext';
import { useLeadsManagement } from '../../context/LeadsManagementContext';
import { useToast } from '../../context/ToastContext';
import { 
  CREDIT_RATES, 
  calculateEnrichmentCredits, 
  formatCredits, 
  EnrichmentDataOptions 
} from '../../utils/enrichmentCredits';

export interface LeadEnrichmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  singleLead?: LeadDetailData | null;
  onEnrichSuccess?: (enrichedCount: number, creditsUsed: number) => void;
}

export type EnrichScopeMode = 'selected' | 'selection_custom' | 'page' | 'custom' | 'all';

export const LeadEnrichmentModal: React.FC<LeadEnrichmentModalProps> = ({
  isOpen,
  onClose,
  singleLead,
  onEnrichSuccess,
}) => {
  const { 
    results, 
    allMatchingResults, 
    selection, 
    filters,
    pagination,
    clearSelection 
  } = useLeadSearch();

  const { currentWorkspace, updateWorkspace } = useAuth();
  const { customLists, createCustomList, bulkAddToList } = useLeadsManagement();
  const { success, error, info } = useToast();

  const availableBalance = currentWorkspace?.credits ?? 1250;

  // Check if any Buying Intent filter is active
  const hasActiveIntentFilter = useMemo(() => {
    const sigCount = filters.intentSignals?.length || 0;
    const topicCount = filters.intentTopics?.length || 0;
    return sigCount > 0 || topicCount > 0;
  }, [filters.intentSignals, filters.intentTopics]);

  const hasManualSelection = Boolean(selection.selectedIds.length > 0 && !singleLead);
  const selectedCount = selection.selectedIds.length;
  const pageCount = results.length;
  const totalMatchingCount = pagination.totalResults || allMatchingResults.length || results.length;

  // Scope selection state
  const [scopeMode, setScopeMode] = useState<EnrichScopeMode>(() => {
    if (singleLead) return 'selected';
    if (hasManualSelection) return 'selected';
    return 'page';
  });

  const [customNumber, setCustomNumber] = useState<string>(() => {
    if (hasManualSelection) return String(Math.min(selectedCount, 25));
    return String(Math.min(totalMatchingCount, 250));
  });

  // Data field options state
  const [dataOptions, setDataOptions] = useState<EnrichmentDataOptions>({
    email: true,
    phone: false,
    fullProfile: true,
    intentSurcharge: hasActiveIntentFilter,
  });

  // Sync intent surcharge with filter state
  useEffect(() => {
    if (hasActiveIntentFilter) {
      setDataOptions(prev => ({ ...prev, intentSurcharge: true }));
    } else {
      setDataOptions(prev => ({ ...prev, intentSurcharge: false }));
    }
  }, [hasActiveIntentFilter]);

  // Adjust default scope when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsEnriching(false);
      setResultSummary(null);
      if (singleLead) {
        setScopeMode('selected');
      } else if (hasManualSelection) {
        setScopeMode('selected');
        setCustomNumber(String(selectedCount));
      } else {
        setScopeMode('page');
        setCustomNumber(String(Math.min(totalMatchingCount, 250)));
      }
    }
  }, [isOpen, hasManualSelection, selectedCount, totalMatchingCount, singleLead]);

  // Calculate target lead count based on scope
  const targetLeadCount = useMemo(() => {
    if (singleLead) return 1;

    if (hasManualSelection) {
      if (scopeMode === 'selected') return selectedCount;
      if (scopeMode === 'selection_custom') {
        const parsed = parseInt(customNumber, 10);
        if (isNaN(parsed) || parsed <= 0) return 0;
        return Math.min(parsed, selectedCount);
      }
      if (scopeMode === 'page') return Math.min(selectedCount, pageCount);
      return selectedCount;
    }

    // No manual selection
    if (scopeMode === 'page') return pageCount;
    if (scopeMode === 'all') return totalMatchingCount;
    if (scopeMode === 'custom') {
      const parsed = parseInt(customNumber, 10);
      if (isNaN(parsed) || parsed <= 0) return 0;
      return Math.min(parsed, totalMatchingCount);
    }

    return pageCount;
  }, [singleLead, hasManualSelection, scopeMode, selectedCount, customNumber, pageCount, totalMatchingCount]);

  // Live credit calculation
  const creditCalc = useMemo(() => {
    return calculateEnrichmentCredits(targetLeadCount, dataOptions, availableBalance);
  }, [targetLeadCount, dataOptions, availableBalance]);

  // Execution & Results state
  const [isEnriching, setIsEnriching] = useState(false);
  const [resultSummary, setResultSummary] = useState<{
    enrichedCount: number;
    emailsFound: number;
    phonesFound: number;
    profilesEnriched: number;
    intentEnriched: number;
    creditsUsed: number;
    remainingCredits: number;
  } | null>(null);

  // Post-enrichment list save state
  const [saveListMode, setSaveListMode] = useState<'existing' | 'new'>('existing');
  const [selectedListId, setSelectedListId] = useState<string>(() => customLists[0]?.id || 'q3_saas_vps');
  const [newListName, setNewListName] = useState('');
  const [isListSaved, setIsListSaved] = useState(false);

  // At least one data type must be selected
  const hasAtLeastOneType = dataOptions.email || dataOptions.phone || dataOptions.fullProfile;

  const handleExecuteEnrich = () => {
    if (!creditCalc.hasSufficientCredits || targetLeadCount === 0 || !hasAtLeastOneType) {
      return;
    }

    setIsEnriching(true);

    setTimeout(() => {
      setIsEnriching(false);
      const used = creditCalc.totalCost;
      const newBal = Math.max(0, Number((availableBalance - used).toFixed(2)));

      // Deduct credits from workspace
      if (currentWorkspace?.id) {
        updateWorkspace(currentWorkspace.id, { credits: newBal });
      }

      // Simulate high-yield production enrichment metrics
      const emailsFound = dataOptions.email ? Math.round(targetLeadCount * 0.94) : 0;
      const phonesFound = dataOptions.phone ? Math.round(targetLeadCount * 0.72) : 0;
      const profilesEnriched = dataOptions.fullProfile ? targetLeadCount : 0;
      const intentEnriched = dataOptions.intentSurcharge ? Math.round(targetLeadCount * 0.85) : 0;

      const summary = {
        enrichedCount: targetLeadCount,
        emailsFound,
        phonesFound,
        profilesEnriched,
        intentEnriched,
        creditsUsed: used,
        remainingCredits: newBal,
      };

      setResultSummary(summary);
      success(`Enriched ${targetLeadCount} leads successfully! Used ${formatCredits(used)} credits.`, 'Enrichment Complete');
      if (onEnrichSuccess) {
        onEnrichSuccess(targetLeadCount, used);
      }
    }, 850);
  };

  const handleSaveToList = (e: React.FormEvent) => {
    e.preventDefault();
    if (saveListMode === 'existing') {
      const targetList = customLists.find(l => l.id === selectedListId);
      const listName = targetList?.name || 'Prospect List';
      bulkAddToList(selectedListId);
      success(`Added ${resultSummary?.enrichedCount || targetLeadCount} enriched leads to "${listName}".`, 'Prospects Saved');
    } else {
      if (!newListName.trim()) return;
      createCustomList(newListName.trim(), 'Created from Lead Finder batch enrichment');
      success(`Created list "${newListName.trim()}" and saved ${resultSummary?.enrichedCount || targetLeadCount} leads.`, 'List Created');
    }
    setIsListSaved(true);
    setTimeout(() => {
      onClose();
      clearSelection();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={resultSummary ? "Enrichment Summary" : "Enrich Decision Makers"}
      description={
        resultSummary
          ? "Intelligence data successfully refreshed and verified with live credit attribution."
          : "Reveal validated work emails, direct mobile numbers, and complete enterprise attributes."
      }
      size="md"
    >
      <div className="font-sans space-y-4">
        
        {/* STEP 1: CONFIGURATION & PREVIEW */}
        {!resultSummary && (
          <>
            {/* 1. WHICH LEADS? (SCOPE) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[10px] flex items-center justify-center font-bold">1</span>
                  <span>Target Lead Scope</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-normal">
                  {targetLeadCount} {targetLeadCount === 1 ? 'lead' : 'leads'} targeted
                </span>
              </div>

              {singleLead ? (
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#282828] flex items-center justify-between">
                  <div className="min-w-0 truncate">
                    <div className="font-bold text-xs text-slate-900 dark:text-white truncate">{singleLead.name}</div>
                    <div className="text-[11px] text-slate-500 truncate">{singleLead.title} • {singleLead.company}</div>
                  </div>
                  <Badge variant="blue" size="sm">Single Lead</Badge>
                </div>
              ) : hasManualSelection ? (
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 flex items-center justify-between text-xs">
                    <span className="font-bold text-blue-900 dark:text-blue-200 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                      {selectedCount} Leads Manually Selected
                    </span>
                    <span className="text-[11px] text-blue-700 dark:text-blue-300 font-medium">Using checkbox selection</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setScopeMode('selected')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        scopeMode === 'selected'
                          ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 dark:border-blue-500 shadow-xs'
                          : 'bg-white dark:bg-[#181818] border-slate-200 dark:border-[#282828] hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900 dark:text-white">All Selected</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{selectedCount} leads</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setScopeMode('selection_custom')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        scopeMode === 'selection_custom'
                          ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 dark:border-blue-500 shadow-xs'
                          : 'bg-white dark:bg-[#181818] border-slate-200 dark:border-[#282828] hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900 dark:text-white">Custom from Selection</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">1 – {selectedCount} leads</div>
                    </button>
                  </div>

                  {scopeMode === 'selection_custom' && (
                    <div className="pt-1 flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        max={selectedCount}
                        value={customNumber}
                        onChange={(e) => setCustomNumber(e.target.value)}
                        placeholder={`1 to ${selectedCount}`}
                        className="text-xs"
                      />
                      <span className="text-xs text-slate-500 shrink-0 font-medium">of {selectedCount} selected</span>
                    </div>
                  )}
                </div>
              ) : (
                /* No manual selection */
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setScopeMode('page')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        scopeMode === 'page'
                          ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 dark:border-blue-500 shadow-xs'
                          : 'bg-white dark:bg-[#181818] border-slate-200 dark:border-[#282828] hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900 dark:text-white">Current Page</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{pageCount} leads</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setScopeMode('custom')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        scopeMode === 'custom'
                          ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 dark:border-blue-500 shadow-xs'
                          : 'bg-white dark:bg-[#181818] border-slate-200 dark:border-[#282828] hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900 dark:text-white">Custom Number</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">1 – {totalMatchingCount.toLocaleString()}</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setScopeMode('all')}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        scopeMode === 'all'
                          ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-500 dark:border-blue-500 shadow-xs'
                          : 'bg-white dark:bg-[#181818] border-slate-200 dark:border-[#282828] hover:border-slate-300'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900 dark:text-white">All Matching</div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">{totalMatchingCount.toLocaleString()} leads</div>
                    </button>
                  </div>

                  {scopeMode === 'custom' && (
                    <div className="pt-1 flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        max={totalMatchingCount}
                        value={customNumber}
                        onChange={(e) => setCustomNumber(e.target.value)}
                        placeholder={`Enter 1 to ${totalMatchingCount}`}
                        className="text-xs"
                      />
                      <span className="text-xs text-slate-500 shrink-0 font-medium">of {totalMatchingCount.toLocaleString()} matching</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 2. WHAT DATA? (SELECTABLE ATTRIBUTES) */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-[#222]">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-mono text-[10px] flex items-center justify-center font-bold">2</span>
                  <span>Enrichment Data Fields</span>
                </span>
                <span className="text-[10px] text-slate-400">Select required data points</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* Email Option */}
                <label className={`p-3 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  dataOptions.email
                    ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500/50 dark:border-blue-500/40'
                    : 'bg-white dark:bg-[#181818] border-slate-200 dark:border-[#282828] opacity-75'
                }`}>
                  <input
                    type="checkbox"
                    checked={dataOptions.email}
                    onChange={(e) => setDataOptions(prev => ({ ...prev, email: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-[#333] focus:ring-blue-500"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span>Work Email</span>
                      </span>
                      <span className="text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400">
                        1 credit
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      100% deliverability SMTP validation with MX verification
                    </p>
                  </div>
                </label>

                {/* Phone Option */}
                <label className={`p-3 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  dataOptions.phone
                    ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500/50 dark:border-blue-500/40'
                    : 'bg-white dark:bg-[#181818] border-slate-200 dark:border-[#282828] opacity-75'
                }`}>
                  <input
                    type="checkbox"
                    checked={dataOptions.phone}
                    onChange={(e) => setDataOptions(prev => ({ ...prev, phone: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-[#333] focus:ring-blue-500"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>Phone / Mobile</span>
                      </span>
                      <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        4 credits
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Direct dial mobile and verified switchboard extensions
                    </p>
                  </div>
                </label>

                {/* Full Profile Option */}
                <label className={`p-3 rounded-2xl border flex items-start gap-3 cursor-pointer transition-all ${
                  dataOptions.fullProfile
                    ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-500/50 dark:border-blue-500/40'
                    : 'bg-white dark:bg-[#181818] border-slate-200 dark:border-[#282828] opacity-75'
                }`}>
                  <input
                    type="checkbox"
                    checked={dataOptions.fullProfile}
                    onChange={(e) => setDataOptions(prev => ({ ...prev, fullProfile: e.target.checked }))}
                    className="mt-0.5 w-4 h-4 rounded text-blue-600 border-slate-300 dark:border-[#333] focus:ring-blue-500"
                  />
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                        <span>Full Profile Data</span>
                      </span>
                      <span className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400">
                        0.25 credit
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Complete columns: revenue, headcount, tech stack, funding
                    </p>
                  </div>
                </label>

                {/* Intent Surcharge (Active only when intent filter is used) */}
                {hasActiveIntentFilter && (
                  <div className="p-3 rounded-2xl border bg-amber-500/10 border-amber-500/30 flex items-start gap-3">
                    <TrendingUp className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-bold text-xs text-amber-900 dark:text-amber-200">
                          Intent Signal Surcharge
                        </span>
                        <span className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400">
                          +1 credit
                        </span>
                      </div>
                      <p className="text-[10px] text-amber-800/80 dark:text-amber-300/80 leading-tight">
                        Applied because active search filters include Buying Intent signals
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 3. LIVE CREDIT CALCULATION & BALANCE CHECK */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#171717] border border-slate-200/80 dark:border-[#282828] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-500" />
                  <span>Cost Calculation Breakdown</span>
                </span>
                <span className="text-[11px] text-slate-400">
                  {targetLeadCount} {targetLeadCount === 1 ? 'lead' : 'leads'} targeted
                </span>
              </div>

              <div className="space-y-1 text-[11px] font-mono border-t border-slate-200/60 dark:border-[#242424] pt-2">
                {dataOptions.email && (
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Verified Email ({targetLeadCount} × 1)</span>
                    <span className="font-bold">{formatCredits(creditCalc.emailCost)} credits</span>
                  </div>
                )}
                {dataOptions.phone && (
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Verified Phone ({targetLeadCount} × 4)</span>
                    <span className="font-bold">{formatCredits(creditCalc.phoneCost)} credits</span>
                  </div>
                )}
                {dataOptions.fullProfile && (
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span>Full Detailed Profile ({targetLeadCount} × 0.25)</span>
                    <span className="font-bold">{formatCredits(creditCalc.profileCost)} credits</span>
                  </div>
                )}
                {dataOptions.intentSurcharge && hasActiveIntentFilter && (
                  <div className="flex items-center justify-between text-amber-600 dark:text-amber-400">
                    <span>Intent Surcharge ({targetLeadCount} × 1)</span>
                    <span className="font-bold">+{formatCredits(creditCalc.intentCost)} credits</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-1.5 border-t border-slate-200/80 dark:border-[#2A2A2A] font-sans text-xs">
                  <span className="font-black text-slate-900 dark:text-white">Total Required:</span>
                  <span className="font-mono font-black text-blue-600 dark:text-blue-400 text-sm">
                    {formatCredits(creditCalc.totalCost)} credits
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                  <span>Available Balance:</span>
                  <span>{formatCredits(availableBalance)} credits</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Balance After Enrichment:</span>
                  <span className={creditCalc.hasSufficientCredits ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-rose-500 font-bold'}>
                    {formatCredits(creditCalc.remainingBalance)} credits
                  </span>
                </div>
              </div>

              {/* Insufficient Credits Warning */}
              {!creditCalc.hasSufficientCredits && (
                <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-600 dark:text-rose-400 animate-in fade-in-50">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="font-bold">Insufficient Credits Available</div>
                    <div className="text-[11px] text-rose-700 dark:text-rose-300 font-mono">
                      Required: {formatCredits(creditCalc.totalCost)} · Available: {formatCredits(availableBalance)} · Shortfall: {formatCredits(creditCalc.shortfall)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="secondary" size="sm" onClick={onClose} disabled={isEnriching}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleExecuteEnrich}
                isLoading={isEnriching}
                disabled={!creditCalc.hasSufficientCredits || targetLeadCount === 0 || !hasAtLeastOneType}
                leftIcon={<Zap className="w-3.5 h-3.5 text-amber-300" />}
              >
                Enrich {targetLeadCount.toLocaleString()} {targetLeadCount === 1 ? 'Lead' : 'Leads'}
              </Button>
            </div>
          </>
        )}

        {/* STEP 2: ENRICHMENT RESULTS & SAVE TO PROSPECT LIST */}
        {resultSummary && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {resultSummary.enrichedCount.toLocaleString()} Leads Enriched
              </h3>
              <p className="text-xs text-slate-500">
                Credits used: <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{formatCredits(resultSummary.creditsUsed)}</span> · Remaining balance: <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{formatCredits(resultSummary.remainingCredits)}</span>
              </p>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#282828]">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Emails Found</div>
                <div className="text-base font-mono font-black text-blue-600 dark:text-blue-400 mt-0.5">
                  {resultSummary.emailsFound.toLocaleString()}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#282828]">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Phones Found</div>
                <div className="text-base font-mono font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {resultSummary.phonesFound.toLocaleString()}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#282828]">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Profiles Enriched</div>
                <div className="text-base font-mono font-black text-purple-600 dark:text-purple-400 mt-0.5">
                  {resultSummary.profilesEnriched.toLocaleString()}
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#282828]">
                <div className="text-[10px] text-slate-500 font-bold uppercase">Intent Signals</div>
                <div className="text-base font-mono font-black text-amber-500 mt-0.5">
                  {resultSummary.intentEnriched.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Save Enriched Leads to List Section */}
            {!isListSaved ? (
              <form onSubmit={handleSaveToList} className="space-y-3 pt-2 border-t border-slate-100 dark:border-[#222]">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <ListPlus className="w-4 h-4 text-blue-500" />
                    <span>Save Enriched Leads</span>
                  </span>
                  <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-[#202020] text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setSaveListMode('existing')}
                      className={`px-2.5 py-0.5 rounded transition-all cursor-pointer ${
                        saveListMode === 'existing'
                          ? 'bg-white dark:bg-[#2B2B2B] text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      Existing List
                    </button>
                    <button
                      type="button"
                      onClick={() => setSaveListMode('new')}
                      className={`px-2.5 py-0.5 rounded transition-all cursor-pointer ${
                        saveListMode === 'new'
                          ? 'bg-white dark:bg-[#2B2B2B] text-blue-600 dark:text-blue-400 shadow-xs'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      New List
                    </button>
                  </div>
                </div>

                {saveListMode === 'existing' ? (
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-500 font-medium">Choose target audience list:</label>
                    <Select
                      value={selectedListId}
                      onChange={(e) => setSelectedListId(e.target.value)}
                      options={customLists.map(list => ({
                        value: list.id,
                        label: `${list.name} (${list.count} leads)`
                      }))}
                    />
                  </div>
                ) : (
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-500 font-medium">Enter new list segment name:</label>
                    <Input
                      placeholder="e.g. September Outreach Batch"
                      value={newListName}
                      onChange={(e) => setNewListName(e.target.value)}
                      required
                      autoFocus
                    />
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      clearSelection();
                    }}
                    className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-medium cursor-pointer"
                  >
                    Not Now
                  </button>
                  <Button type="submit" variant="primary" size="sm" leftIcon={<ListPlus className="w-3.5 h-3.5" />}>
                    {saveListMode === 'new' ? 'Create & Save' : 'Save to List'}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Enriched leads added to list successfully!</span>
              </div>
            )}
          </div>
        )}

      </div>
    </Modal>
  );
};
