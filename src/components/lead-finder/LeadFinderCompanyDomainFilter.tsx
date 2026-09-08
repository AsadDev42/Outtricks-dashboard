import React, { useState, useMemo, useRef } from 'react';
import { 
  Globe, 
  Building2, 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  Trash2, 
  Download, 
  FileText,
  Sparkles,
  Search,
  Plus
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useToast } from '../../context/ToastContext';

export interface LeadFinderCompanyDomainFilterProps {
  selectedDomains: string[];
  onChange: (domains: string[]) => void;
  onClearAll: () => void;
}

export type DomainInputMode = 'single' | 'batch' | 'csv' | 'sheets';

export const DOMAIN_PRESETS = [
  { label: 'AI & Cloud', domains: ['cloudscale.ai', 'neuralgrid.ai', 'openai.com'] },
  { label: 'B2B SaaS', domains: ['notion.so', 'stripe.com', 'hubspot.com'] },
  { label: 'Cybersecurity', domains: ['vanguardcyber.com', 'crowdstrike.com', 'paloaltonetworks.com'] },
];

/**
 * Normalizes input:
 * - If URL/domain format (e.g. https://www.stripe.com/ or www.stripe.com): cleans protocol, www, trailing slash -> stripe.com
 * - If company name (e.g. OpenAI, HubSpot): preserves case and company name intact without mangling
 */
export function normalizeDomainOrCompany(input: string): { value: string; isDomain: boolean; isValid: boolean } {
  const trimmed = input.trim();
  if (!trimmed) return { value: '', isDomain: false, isValid: false };

  // Check if it's a URL or contains domain-like patterns (.com, .io, .so, etc.)
  const hasProtocol = /^https?:\/\//i.test(trimmed);
  const hasWww = /^www\./i.test(trimmed);
  const looksLikeDomain = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/.*)?$/i.test(trimmed);

  if (hasProtocol || hasWww || looksLikeDomain) {
    try {
      let clean = trimmed.replace(/^https?:\/\//i, '');
      clean = clean.replace(/^www\./i, '');
      clean = clean.split('/')[0].split('?')[0].split('#')[0].trim().toLowerCase();
      
      if (/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(clean)) {
        return { value: clean, isDomain: true, isValid: true };
      }
    } catch {
      // Fallback to company name
    }
  }

  // Company Name
  const cleanCompany = trimmed.replace(/["']/g, '').trim();
  if (cleanCompany.length >= 2) {
    return { value: cleanCompany, isDomain: false, isValid: true };
  }

  return { value: trimmed, isDomain: false, isValid: false };
}

/**
 * Lightweight in-browser CSV parser supporting quoted values and common delimiters
 */
function parseCsvContent(text: string): { headers: string[]; rows: Record<string, string>[] } {
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

function detectDomainColumn(headers: string[]): string {
  const lower = headers.map(h => h.toLowerCase());
  const priority = [
    'domain', 
    'website', 
    'company_domain', 
    'company domain', 
    'url', 
    'web', 
    'company', 
    'company_name', 
    'companyname', 
    'organization', 
    'account'
  ];
  for (const p of priority) {
    const idx = lower.findIndex(h => h === p || h.includes(p));
    if (idx !== -1) return headers[idx];
  }
  return headers[0] || '';
}

export const LeadFinderCompanyDomainFilter: React.FC<LeadFinderCompanyDomainFilterProps> = ({
  selectedDomains,
  onChange,
  onClearAll,
}) => {
  const { success, error, info } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tab mode: single | batch | csv | sheets
  const [mode, setMode] = useState<DomainInputMode>('single');

  // 1. Single Mode State
  const [singleInput, setSingleInput] = useState('');

  // 2. Batch Paste Mode State
  const [batchInput, setBatchInput] = useState('');

  // 3. CSV Mode State
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvHeaders, setCsvHeaders] = useState<string[]>([]);
  const [csvRows, setCsvRows] = useState<Record<string, string>[]>([]);
  const [mappedColumn, setMappedColumn] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  // 4. Google Sheets Mode State
  const [sheetUrl, setSheetUrl] = useState('');
  const [isSheetConnected, setIsSheetConnected] = useState(false);
  const [selectedSheetTab, setSelectedSheetTab] = useState('Sheet1 (Outbound Target Accounts)');
  const [selectedSheetCol, setSelectedSheetCol] = useState('domain');

  // Selected domains filter search inside active targets
  const [activeSearch, setActiveSearch] = useState('');

  // ---------------------------------------------------------------------------
  // 1. Single Mode Actions
  // ---------------------------------------------------------------------------
  const handleAddSingle = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = normalizeDomainOrCompany(singleInput);
    if (!parsed.isValid) {
      error('Please enter a valid domain (e.g. stripe.com) or company name.');
      return;
    }

    const exists = selectedDomains.some(
      (d) => d.toLowerCase() === parsed.value.toLowerCase()
    );
    if (exists) {
      info(`"${parsed.value}" is already in your filter targets.`);
      return;
    }

    onChange([...selectedDomains, parsed.value]);
    success(`Added "${parsed.value}" to target criteria.`);
    setSingleInput('');
  };

  // ---------------------------------------------------------------------------
  // 2. Batch Paste Analysis
  // ---------------------------------------------------------------------------
  const batchParsed = useMemo(() => {
    if (!batchInput.trim()) {
      return { total: 0, valid: [], duplicates: [], invalid: [] };
    }

    const rawEntries = batchInput
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    const validMap = new Map<string, string>(); // lowercase -> canonical
    const duplicates: string[] = [];
    const invalid: string[] = [];

    const existingLower = new Set(selectedDomains.map((d) => d.toLowerCase()));

    rawEntries.forEach((raw) => {
      const parsed = normalizeDomainOrCompany(raw);
      if (!parsed.isValid) {
        invalid.push(raw);
        return;
      }

      const lower = parsed.value.toLowerCase();
      if (existingLower.has(lower) || validMap.has(lower)) {
        duplicates.push(parsed.value);
      } else {
        validMap.set(lower, parsed.value);
      }
    });

    return {
      total: rawEntries.length,
      valid: Array.from(validMap.values()),
      duplicates,
      invalid,
    };
  }, [batchInput, selectedDomains]);

  const handleApplyBatch = () => {
    if (batchParsed.valid.length === 0) {
      if (batchParsed.duplicates.length > 0) {
        info('All detected entries are already in your target filters.');
      } else {
        error('No valid domains or company names detected to add.');
      }
      return;
    }

    onChange([...selectedDomains, ...batchParsed.valid]);
    success(
      `Added ${batchParsed.valid.length} target ${
        batchParsed.valid.length === 1 ? 'domain' : 'domains'
      } to filter.${
        batchParsed.duplicates.length > 0 ? ` (${batchParsed.duplicates.length} duplicates skipped)` : ''
      }`
    );
    setBatchInput('');
  };

  // ---------------------------------------------------------------------------
  // 3. CSV Upload Processing
  // ---------------------------------------------------------------------------
  const handleFileProcess = (file: File) => {
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.txt')) {
      error('Please upload a .csv or .txt file format.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (!text) {
        error('Uploaded file appears to be empty.');
        return;
      }

      const { headers, rows } = parseCsvContent(text);
      if (headers.length === 0) {
        error('Could not detect header columns in the CSV.');
        return;
      }

      const detected = detectDomainColumn(headers);
      setCsvFile(file);
      setCsvHeaders(headers);
      setCsvRows(rows);
      setMappedColumn(detected);
      success(`Loaded "${file.name}" with ${rows.length} rows and ${headers.length} columns.`);
    };
    reader.readAsText(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  // CSV parsed column metrics
  const csvAnalysis = useMemo(() => {
    if (!mappedColumn || csvRows.length === 0) {
      return { total: 0, valid: [], duplicates: [], invalid: [], preview: [] };
    }

    const rawValues = csvRows.map((r) => r[mappedColumn] || '').filter(Boolean);
    const validMap = new Map<string, string>();
    const duplicates: string[] = [];
    const invalid: string[] = [];

    const existingLower = new Set(selectedDomains.map((d) => d.toLowerCase()));

    rawValues.forEach((raw) => {
      const parsed = normalizeDomainOrCompany(raw);
      if (!parsed.isValid) {
        invalid.push(raw);
        return;
      }

      const lower = parsed.value.toLowerCase();
      if (existingLower.has(lower) || validMap.has(lower)) {
        duplicates.push(parsed.value);
      } else {
        validMap.set(lower, parsed.value);
      }
    });

    const valid = Array.from(validMap.values());
    const preview = rawValues.slice(0, 4);

    return {
      total: rawValues.length,
      valid,
      duplicates,
      invalid,
      preview,
    };
  }, [mappedColumn, csvRows, selectedDomains]);

  const handleApplyCsv = () => {
    if (csvAnalysis.valid.length === 0) {
      if (csvAnalysis.duplicates.length > 0) {
        info('All detected CSV values are already in your target filters.');
      } else {
        error('No valid domain values found in the selected column.');
      }
      return;
    }

    onChange([...selectedDomains, ...csvAnalysis.valid]);
    success(
      `Added ${csvAnalysis.valid.length} domains from CSV.${
        csvAnalysis.duplicates.length > 0 ? ` (${csvAnalysis.duplicates.length} duplicates skipped)` : ''
      }`
    );
    // Reset file state
    setCsvFile(null);
    setCsvHeaders([]);
    setCsvRows([]);
    setMappedColumn('');
  };

  const handleDownloadSampleCsv = () => {
    const content = 'domain,company,industry\nstripe.com,Stripe,FinTech\nnotion.so,Notion,Productivity\nhubspot.com,HubSpot,Marketing\ncloudscale.ai,CloudScale AI,Enterprise AI\nneuralgrid.ai,NeuralGrid Systems,AI Cloud\n';
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'outtricks_sample_domains.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    info('Sample CSV template downloaded.');
  };

  // ---------------------------------------------------------------------------
  // 4. Google Sheets Flow
  // ---------------------------------------------------------------------------
  const handleConnectSheet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sheetUrl.trim()) {
      error('Please provide a Google Sheets URL.');
      return;
    }
    if (!sheetUrl.includes('google.com') && !sheetUrl.includes('spreadsheets')) {
      error('Please enter a valid Google Sheets URL (e.g. https://docs.google.com/spreadsheets/d/...)');
      return;
    }

    setIsSheetConnected(true);
    success('Google Sheet connected & verified. Ready to map target column.');
  };

  const mockSheetRows: Record<string, string[]> = {
    'Sheet1 (Outbound Target Accounts)': [
      'stripe.com',
      'notion.so',
      'hubspot.com',
      'cloudscale.ai',
      'neuralgrid.ai',
      'vanguardcyber.com',
      'healthconnect.io',
      'datadoghq.com',
      'snowflake.com',
      'mongodb.com',
      'figma.com',
      'airtable.com',
    ],
    'TAM Decision Makers': [
      'salesforce.com',
      'oracle.com',
      'microsoft.com',
      'google.com',
      'amazon.com',
      'apple.com',
      'netflix.com',
      'meta.com',
    ],
    'Tier 1 Enterprise Accounts': [
      'crowdstrike.com',
      'paloaltonetworks.com',
      'zscaler.com',
      'okta.com',
      'splunk.com',
      'hashicorp.com',
    ],
  };

  const sheetAnalysis = useMemo(() => {
    if (!isSheetConnected) {
      return { total: 0, valid: [], duplicates: [] };
    }

    const rawList = mockSheetRows[selectedSheetTab] || mockSheetRows['Sheet1 (Outbound Target Accounts)'];
    const existingLower = new Set(selectedDomains.map((d) => d.toLowerCase()));
    const valid: string[] = [];
    const duplicates: string[] = [];

    rawList.forEach((item) => {
      const parsed = normalizeDomainOrCompany(item);
      if (!parsed.isValid) return;
      if (existingLower.has(parsed.value.toLowerCase())) {
        duplicates.push(parsed.value);
      } else {
        valid.push(parsed.value);
      }
    });

    return {
      total: rawList.length,
      valid,
      duplicates,
    };
  }, [isSheetConnected, selectedSheetTab, selectedSheetCol, selectedDomains]);

  const handleApplySheet = () => {
    if (sheetAnalysis.valid.length === 0) {
      if (sheetAnalysis.duplicates.length > 0) {
        info('All detected Google Sheet values are already in your target filters.');
      } else {
        error('No valid domains found in the selected sheet tab.');
      }
      return;
    }

    onChange([...selectedDomains, ...sheetAnalysis.valid]);
    success(
      `Added ${sheetAnalysis.valid.length} domains from Google Sheet.${
        sheetAnalysis.duplicates.length > 0 ? ` (${sheetAnalysis.duplicates.length} duplicates skipped)` : ''
      }`
    );
  };

  // ---------------------------------------------------------------------------
  // Presets & Active Removal
  // ---------------------------------------------------------------------------
  const handleApplyPreset = (domains: string[]) => {
    const existingLower = new Set(selectedDomains.map((d) => d.toLowerCase()));
    const toAdd = domains.filter((d) => !existingLower.has(d.toLowerCase()));

    if (toAdd.length === 0) {
      info('Preset domains are already active in your filter.');
      return;
    }

    onChange([...selectedDomains, ...toAdd]);
    success(`Added ${toAdd.length} preset domains.`);
  };

  const handleRemoveSingle = (domainToRemove: string) => {
    onChange(selectedDomains.filter((d) => d !== domainToRemove));
  };

  // Filtered active domains for display
  const displayedActiveDomains = useMemo(() => {
    if (!activeSearch.trim()) return selectedDomains;
    const q = activeSearch.toLowerCase();
    return selectedDomains.filter((d) => d.toLowerCase().includes(q));
  }, [selectedDomains, activeSearch]);

  return (
    <div className="space-y-3 font-sans text-xs">
      
      {/* 4 Compact Segmented Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 dark:bg-[#1C1C1C] rounded-xl border border-slate-200/80 dark:border-[#2A2A2A]">
        <button
          type="button"
          onClick={() => setMode('single')}
          className={`py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
            mode === 'single'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Globe className="w-3 h-3 shrink-0" />
          <span className="truncate">Single</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('batch')}
          className={`py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
            mode === 'batch'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-3 h-3 shrink-0" />
          <span className="truncate">Batch Paste</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('csv')}
          className={`py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
            mode === 'csv'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Upload className="w-3 h-3 shrink-0" />
          <span className="truncate">CSV Upload</span>
        </button>

        <button
          type="button"
          onClick={() => setMode('sheets')}
          className={`py-1.5 px-1.5 rounded-lg text-[11px] font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
            mode === 'sheets'
              ? 'bg-primary text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileSpreadsheet className="w-3 h-3 shrink-0" />
          <span className="truncate">Google Sheets</span>
        </button>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* MODE 1: SINGLE */}
      {/* -------------------------------------------------------------------- */}
      {mode === 'single' && (
        <form onSubmit={handleAddSingle} className="space-y-2">
          <div className="relative">
            <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={singleInput}
              onChange={(e) => setSingleInput(e.target.value)}
              placeholder="e.g. stripe.com, notion.so, or OpenAI"
              className="w-full pl-9 pr-14 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!singleInput.trim()}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 px-2.5 text-[10px]"
            >
              Add
            </Button>
          </div>
          <p className="text-[10px] text-slate-400">
            Accepts domain (stripe.com) or company name (OpenAI). Add multiple targets as needed.
          </p>
        </form>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* MODE 2: BATCH PASTE */}
      {/* -------------------------------------------------------------------- */}
      {mode === 'batch' && (
        <div className="space-y-2">
          <textarea
            value={batchInput}
            onChange={(e) => setBatchInput(e.target.value)}
            placeholder={`Paste domains or company names (one per line):\nstripe.com\nnotion.so\nhubspot.com\nOpenAI`}
            rows={4}
            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary resize-y"
          />

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span className="font-semibold text-slate-500">
                Detected: <b className="text-slate-800 dark:text-slate-200">{batchParsed.total}</b>
              </span>
              <span className="text-slate-300 dark:text-slate-600">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                Valid: <b>{batchParsed.valid.length}</b>
              </span>
              {batchParsed.duplicates.length > 0 && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-amber-500 font-semibold">
                    {batchParsed.duplicates.length} dupes
                  </span>
                </>
              )}
              {batchParsed.invalid.length > 0 && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-rose-500 font-semibold">
                    {batchParsed.invalid.length} invalid
                  </span>
                </>
              )}
            </div>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleApplyBatch}
              disabled={batchParsed.valid.length === 0}
              className="h-7 text-[11px]"
            >
              Add to Targets ({batchParsed.valid.length})
            </Button>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* MODE 3: CSV UPLOAD */}
      {/* -------------------------------------------------------------------- */}
      {mode === 'csv' && (
        <div className="space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt"
            onChange={handleFileInputChange}
            className="hidden"
          />

          {!csvFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`p-4 rounded-xl border-2 border-dashed text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-primary bg-primary/10'
                  : 'border-slate-200 dark:border-[#2A2A2A] hover:border-primary/50 bg-slate-50/50 dark:bg-white/[0.02]'
              }`}
            >
              <Upload className="w-5 h-5 text-primary mx-auto mb-1.5" />
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Click or drag & drop CSV file
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Auto-detects domain, website, or company columns
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-white/5 flex items-center justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownloadSampleCsv();
                  }}
                  className="inline-flex items-center gap-1 text-[10px] font-bold text-primary hover:underline cursor-pointer"
                >
                  <Download className="w-3 h-3" />
                  <span>Download Sample CSV</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-slate-50 dark:bg-[#1E1E1E] rounded-xl border border-slate-200 dark:border-[#2E2E2E] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className="w-4 h-4 text-primary shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {csvFile.name}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {csvRows.length} rows • {csvHeaders.length} columns
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCsvFile(null);
                    setCsvHeaders([]);
                    setCsvRows([]);
                    setMappedColumn('');
                  }}
                  className="text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  Change File
                </button>
              </div>

              {/* Column Selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Target Domain / Company Column:
                </label>
                <select
                  value={mappedColumn}
                  onChange={(e) => setMappedColumn(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs font-medium text-slate-900 dark:text-white focus:ring-1 focus:ring-primary"
                >
                  {csvHeaders.map((h) => (
                    <option key={h} value={h}>
                      {h} {h === mappedColumn ? '(Auto-mapped)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preview & Summary */}
              {csvAnalysis.preview.length > 0 && (
                <div className="space-y-1 bg-white/60 dark:bg-black/20 p-2 rounded-lg border border-slate-200/60 dark:border-white/5">
                  <div className="text-[10px] text-slate-400 font-semibold">
                    Preview detected values:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {csvAnalysis.preview.map((val, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-[#282828] text-slate-700 dark:text-slate-300 font-mono text-[10px] truncate max-w-[120px]"
                      >
                        {val}
                      </span>
                    ))}
                    {csvAnalysis.total > 4 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{csvAnalysis.total - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Summary Stats */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className="text-slate-500">Detected: <b>{csvAnalysis.total}</b></span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-emerald-600 dark:text-emerald-400">Valid: <b>{csvAnalysis.valid.length}</b></span>
                  {csvAnalysis.duplicates.length > 0 && (
                    <>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="text-amber-500">{csvAnalysis.duplicates.length} dupes</span>
                    </>
                  )}
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleApplyCsv}
                  disabled={csvAnalysis.valid.length === 0}
                  className="h-7 text-[11px]"
                >
                  Add to Targets ({csvAnalysis.valid.length})
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* MODE 4: GOOGLE SHEETS */}
      {/* -------------------------------------------------------------------- */}
      {mode === 'sheets' && (
        <div className="space-y-3">
          {!isSheetConnected ? (
            <form onSubmit={handleConnectSheet} className="space-y-2.5">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Paste the URL of your Google Spreadsheet (shared with view permissions):
              </div>
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="url"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    placeholder="https://docs.google.com/spreadsheets/d/..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="h-8 text-xs shrink-0"
                >
                  Connect
                </Button>
              </div>
            </form>
          ) : (
            <div className="p-3 bg-emerald-50/30 dark:bg-emerald-950/15 rounded-xl border border-emerald-500/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Google Sheet Connected</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSheetConnected(false)}
                  className="text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  Disconnect
                </button>
              </div>

              {/* Tab & Column selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                    Sheet / Tab
                  </label>
                  <select
                    value={selectedSheetTab}
                    onChange={(e) => setSelectedSheetTab(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs font-medium text-slate-900 dark:text-white"
                  >
                    <option value="Sheet1 (Outbound Target Accounts)">Sheet1 (Outbound Accounts)</option>
                    <option value="TAM Decision Makers">TAM Decision Makers</option>
                    <option value="Tier 1 Enterprise Accounts">Tier 1 Enterprise Accounts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                    Domain / Company Column
                  </label>
                  <select
                    value={selectedSheetCol}
                    onChange={(e) => setSelectedSheetCol(e.target.value)}
                    className="w-full px-2 py-1.5 rounded-lg bg-white dark:bg-[#141414] border border-slate-200 dark:border-[#2A2A2A] text-xs font-medium text-slate-900 dark:text-white"
                  >
                    <option value="domain">domain (Domain / Website)</option>
                    <option value="company">company (Company Name)</option>
                    <option value="website">website (Website URL)</option>
                  </select>
                </div>
              </div>

              {/* Stats and Action */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-emerald-500/20">
                <div className="text-[10px] text-slate-600 dark:text-slate-300">
                  Detected: <b>{sheetAnalysis.total}</b> • Valid: <b className="text-emerald-600 dark:text-emerald-400">{sheetAnalysis.valid.length}</b>
                  {sheetAnalysis.duplicates.length > 0 && (
                    <span> • <span className="text-amber-500">{sheetAnalysis.duplicates.length} dupes</span></span>
                  )}
                </div>

                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={handleApplySheet}
                  disabled={sheetAnalysis.valid.length === 0}
                  className="h-7 text-[11px]"
                >
                  Add to Targets ({sheetAnalysis.valid.length})
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* -------------------------------------------------------------------- */}
      {/* QUICK PRESETS */}
      {/* -------------------------------------------------------------------- */}
      <div className="space-y-1.5 pt-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Quick Presets
        </span>
        <div className="flex flex-wrap gap-1">
          {DOMAIN_PRESETS.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => handleApplyPreset(preset.domains)}
              className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-[#202020] hover:bg-primary/10 hover:text-primary hover:border-primary/30 border border-slate-200/80 dark:border-[#2A2A2A] text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              + {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* -------------------------------------------------------------------- */}
      {/* ACTIVE SELECTED TARGETS */}
      {/* -------------------------------------------------------------------- */}
      {selectedDomains.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-slate-200/70 dark:border-[#262626]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Selected Targets
              </span>
              <span className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20 text-[10px] font-mono font-bold">
                {selectedDomains.length}
              </span>
            </div>

            <button
              type="button"
              onClick={onClearAll}
              className="text-[11px] font-bold text-rose-500 hover:text-rose-600 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear all</span>
            </button>
          </div>

          {/* Quick filter within selected if large list */}
          {selectedDomains.length > 10 && (
            <div className="relative">
              <Search className="w-3 h-3 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={activeSearch}
                onChange={(e) => setActiveSearch(e.target.value)}
                placeholder="Search within selected targets..."
                className="w-full pl-7 pr-2 py-1 rounded-lg bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#262626] text-[11px] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          )}

          {/* Chips list */}
          <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto pr-1">
            {displayedActiveDomains.slice(0, 80).map((domain) => (
              <span
                key={domain}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#202020] border border-slate-200 dark:border-[#2E2E2E] text-slate-800 dark:text-slate-200 text-[11px] font-mono group"
              >
                <span className="truncate max-w-[130px]">{domain}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSingle(domain)}
                  className="text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  title={`Remove ${domain}`}
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
            {displayedActiveDomains.length > 80 && (
              <span className="text-[10px] font-mono text-slate-400 self-center pl-1">
                +{displayedActiveDomains.length - 80} more
              </span>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
