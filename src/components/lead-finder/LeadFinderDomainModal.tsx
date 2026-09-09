import React, { useState, useRef, useMemo } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { 
  Globe, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Trash2, 
  Search, 
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useLeadSearch } from '../../context/LeadSearchContext';
import { useToast } from '../../context/ToastContext';

export interface LeadFinderDomainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Normalizes input:
 * - strips protocol (http://, https://)
 * - strips www.
 * - strips path (/about, /pricing), query params, fragments
 * - validates domain syntax (e.g. stripe.com)
 */
export function normalizeDomain(raw: string): { domain: string; isValid: boolean } {
  const trimmed = raw.trim();
  if (!trimmed) return { domain: '', isValid: false };

  try {
    let clean = trimmed.replace(/^https?:\/\//i, '');
    clean = clean.replace(/^www\./i, '');
    clean = clean.split('/')[0].split('?')[0].split('#')[0].trim().toLowerCase();
    
    // Domain regex: labels separated by dots, valid TLD
    const isValid = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i.test(clean);
    return { domain: clean, isValid };
  } catch {
    return { domain: trimmed, isValid: false };
  }
}

function parseCsv(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.split(/\r\n|\n|\r/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return { headers: [], rows: [] };

  const parseLine = (line: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if ((char === ',' || char === '\t') && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += char;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const headers = parseLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    if (values.length === 0 || (values.length === 1 && !values[0])) continue;
    const row: Record<string, string> = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] || '';
    });
    rows.push(row);
  }

  return { headers, rows };
}

export const LeadFinderDomainModal: React.FC<LeadFinderDomainModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { filters, updateFilters } = useLeadSearch();
  const { success, error, info } = useToast();

  const [activeTab, setActiveTab] = useState<'manual' | 'csv'>('manual');

  // Manual Mode State
  const [manualInput, setManualInput] = useState('');
  const [manualError, setManualError] = useState<string | null>(null);
  const [stagedDomains, setStagedDomains] = useState<string[]>(() => filters.companyDomains || []);

  // CSV Mode State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<Record<string, string>[]>([]);
  const [selectedColumn, setSelectedColumn] = useState<string>('');

  // Keep staged domains in sync when modal opens
  React.useEffect(() => {
    if (isOpen) {
      setStagedDomains(filters.companyDomains || []);
      setManualInput('');
      setManualError(null);
      setCsvFile(null);
      setCsvHeaders([]);
      setCsvRows([]);
      setSelectedColumn('');
    }
  }, [isOpen, filters.companyDomains]);

  // Handle Manual Add (supports single or multi-domain pasted input)
  const handleAddManualDomain = () => {
    setManualError(null);
    const rawTokens = manualInput.split(/[\s,;\n\r]+/).map(t => t.trim()).filter(Boolean);
    if (rawTokens.length === 0) return;

    const newValidDomains: string[] = [];
    const invalidTokens: string[] = [];

    rawTokens.forEach(token => {
      const { domain, isValid } = normalizeDomain(token);
      if (isValid && domain) {
        if (!stagedDomains.includes(domain) && !newValidDomains.includes(domain)) {
          newValidDomains.push(domain);
        }
      } else {
        invalidTokens.push(token);
      }
    });

    if (invalidTokens.length > 0 && newValidDomains.length === 0) {
      setManualError(`"${invalidTokens[0]}" is not a valid domain format. Example: stripe.com or https://stripe.com`);
      return;
    }

    if (newValidDomains.length === 0 && rawTokens.length > 0) {
      setManualError(`Domain(s) already in your target list.`);
      return;
    }

    setStagedDomains(prev => [...prev, ...newValidDomains]);
    setManualInput('');
  };

  const handleRemoveDomain = (domainToRemove: string) => {
    setStagedDomains(prev => prev.filter(d => d !== domainToRemove));
  };

  const handleClearAll = () => {
    setStagedDomains([]);
  };

  // Handle CSV File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      error('Please upload a valid .csv file format.');
      return;
    }

    setCsvFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const { headers, rows } = parseCsv(text);
      setCsvHeaders(headers);
      setCsvRows(rows);

      // Auto-detect domain/website column
      const lower = headers.map(h => h.toLowerCase());
      const priority = ['domain', 'website', 'company_domain', 'url', 'web', 'company'];
      let matched = headers[0] || '';
      for (const p of priority) {
        const idx = lower.findIndex(h => h === p || h.includes(p));
        if (idx !== -1) {
          matched = headers[idx];
          break;
        }
      }
      setSelectedColumn(matched);
    };
    reader.readAsText(file);
  };

  // CSV Analysis & Validation Summary
  const csvAnalysis = useMemo(() => {
    if (!selectedColumn || csvRows.length === 0) {
      return { total: 0, validList: [] as string[], duplicates: 0, invalid: 0 };
    }

    const seen = new Set<string>();
    const validList: string[] = [];
    let duplicates = 0;
    let invalid = 0;

    csvRows.forEach(row => {
      const val = row[selectedColumn];
      if (!val) {
        invalid++;
        return;
      }

      const { domain, isValid } = normalizeDomain(val);
      if (!isValid) {
        invalid++;
        return;
      }

      if (seen.has(domain)) {
        duplicates++;
      } else {
        seen.add(domain);
        validList.push(domain);
      }
    });

    return {
      total: csvRows.length,
      validList,
      duplicates,
      invalid,
    };
  }, [csvRows, selectedColumn]);

  // Apply domains to LeadSearchContext
  const handleApplyDomains = () => {
    let finalDomains: string[] = [];
    if (activeTab === 'manual') {
      finalDomains = stagedDomains;
    } else {
      finalDomains = Array.from(new Set([...stagedDomains, ...csvAnalysis.validList]));
    }

    updateFilters({ companyDomains: finalDomains });
    success(`Applied ${finalDomains.length} target company domains to active search.`, 'Search Scope Updated');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Target Company Domains"
      description="Prospect decision makers specifically at target companies by URL or domain list."
      size="md"
    >
      <div className="space-y-4 font-sans text-xs">
        
        {/* Mode Switch Tabs: [ Manual ] [ CSV Upload ] */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#1E1E1E] border border-slate-200/80 dark:border-[#282828] font-bold text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('manual')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
              activeTab === 'manual'
                ? 'bg-white dark:bg-[#282828] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Manual Domains ({stagedDomains.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('csv')}
            className={`flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-lg transition-all cursor-pointer ${
              activeTab === 'csv'
                ? 'bg-white dark:bg-[#282828] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>CSV Domain Upload</span>
          </button>
        </div>

        {/* TAB 1: MANUAL DOMAINS */}
        {activeTab === 'manual' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Enter Company URL or Domain
              </label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="e.g. stripe.com or https://www.stripe.com/about"
                  value={manualInput}
                  onChange={(e) => {
                    setManualInput(e.target.value);
                    if (manualError) setManualError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddManualDomain();
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleAddManualDomain}
                  leftIcon={<Plus className="w-3.5 h-3.5" />}
                >
                  Add
                </Button>
              </div>
              {manualError && (
                <p className="text-[11px] text-rose-500 font-medium">{manualError}</p>
              )}
            </div>

            {/* Staged Domains Tag List */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-bold">
                  Active Domain Targets ({stagedDomains.length})
                </span>
                {stagedDomains.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="text-rose-500 hover:underline cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {stagedDomains.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-slate-50 dark:bg-[#181818] border border-dashed border-slate-200 dark:border-[#282828] text-slate-400 space-y-1">
                  <Globe className="w-6 h-6 mx-auto text-slate-300 dark:text-slate-600 mb-1" />
                  <p className="font-bold text-xs text-slate-600 dark:text-slate-300">No domains added yet</p>
                  <p className="text-[11px]">Enter company websites like stripe.com or upload a CSV file above.</p>
                </div>
              ) : (
                <div className="max-h-44 overflow-y-auto p-2.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#282828] flex flex-wrap gap-1.5">
                  {stagedDomains.map(d => (
                    <span
                      key={d}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-[#222] border border-slate-200 dark:border-[#333] text-xs font-mono font-medium text-slate-800 dark:text-slate-200 shadow-2xs"
                    >
                      <Globe className="w-3 h-3 text-blue-500 shrink-0" />
                      <span>{d}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDomain(d)}
                        className="text-slate-400 hover:text-rose-500 cursor-pointer ml-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CSV DOMAIN UPLOAD */}
        {activeTab === 'csv' && (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />

            {!csvFile ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-slate-200 dark:border-[#2A2A2A] hover:border-blue-500 rounded-3xl text-center cursor-pointer space-y-2 bg-slate-50/50 dark:bg-white/[0.02] hover:bg-blue-50/30 transition-all"
              >
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-xs">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">
                    Click to upload CSV with company domains
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Supports columns like Website, Company URL, Domain, Company Name
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#282828] flex items-center justify-between">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div className="min-w-0 truncate">
                      <div className="font-bold text-xs text-slate-900 dark:text-white truncate">{csvFile.name}</div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {(csvFile.size / 1024).toFixed(1)} KB · {csvRows.length.toLocaleString()} rows
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCsvFile(null);
                      setCsvRows([]);
                      setCsvHeaders([]);
                      setSelectedColumn('');
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-500 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Column Selection Mapping */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Which column contains the company URL or domain?
                  </label>
                  <Select
                    value={selectedColumn}
                    onChange={(e) => setSelectedColumn(e.target.value)}
                    options={csvHeaders.map(h => ({ value: h, label: h }))}
                  />
                </div>

                {/* Import Analysis Summary */}
                {selectedColumn && (
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#181818] border border-slate-200/80 dark:border-[#282828] space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                      <span>Domain Extraction Summary</span>
                      <Badge variant="blue" size="sm">{csvAnalysis.validList.length} Valid</Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-2 text-center text-xs font-mono">
                      <div className="p-2 rounded-lg bg-white dark:bg-[#202020] border border-slate-200/60 dark:border-[#262626]">
                        <div className="text-[10px] text-slate-400">Total Rows</div>
                        <div className="font-bold mt-0.5">{csvAnalysis.total}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                        <div className="text-[10px] uppercase font-bold">Valid</div>
                        <div className="font-bold mt-0.5">{csvAnalysis.validList.length}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-white dark:bg-[#202020] border border-slate-200/60 dark:border-[#262626]">
                        <div className="text-[10px] text-slate-400">Duplicates</div>
                        <div className="font-bold mt-0.5">{csvAnalysis.duplicates}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400">
                        <div className="text-[10px] uppercase font-bold">Invalid</div>
                        <div className="font-bold mt-0.5">{csvAnalysis.invalid}</div>
                      </div>
                    </div>

                    {/* Preview of first 5 valid normalized domains */}
                    {csvAnalysis.validList.length > 0 && (
                      <div className="pt-1.5 border-t border-slate-200/60 dark:border-[#262626] text-[11px]">
                        <span className="text-slate-400 font-medium">Domain preview: </span>
                        <span className="font-mono text-slate-700 dark:text-slate-300">
                          {csvAnalysis.validList.slice(0, 5).join(', ')}
                          {csvAnalysis.validList.length > 5 ? ` +${csvAnalysis.validList.length - 5} more` : ''}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-[#222]">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleApplyDomains}
            disabled={
              activeTab === 'manual'
                ? stagedDomains.length === 0
                : csvAnalysis.validList.length === 0
            }
            leftIcon={<CheckCircle2 className="w-3.5 h-3.5" />}
          >
            {activeTab === 'manual'
              ? `Apply ${stagedDomains.length} ${stagedDomains.length === 1 ? 'Domain' : 'Domains'}`
              : `Use ${csvAnalysis.validList.length.toLocaleString()} Domains`}
          </Button>
        </div>

      </div>
    </Modal>
  );
};
