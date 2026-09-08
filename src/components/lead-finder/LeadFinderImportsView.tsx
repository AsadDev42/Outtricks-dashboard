import React, { useState, useMemo } from 'react';
import { 
  Upload, 
  FileText, 
  FileSpreadsheet, 
  CheckCircle2, 
  Search, 
  Check, 
  History, 
  Trash2, 
  Clock, 
  ArrowRight, 
  Download, 
  Plus, 
  Layers,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { LeadImportModal } from './LeadImportModal';
import { useLeadSearch, LeadDetailData } from '../../context/LeadSearchContext';
import { useLeadsManagement } from '../../context/LeadsManagementContext';
import { useCrm } from '../../context/CrmContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export type ImportSubMode = 'manual' | 'sheets' | 'csv';

export interface ImportHistoryBatch {
  id: string;
  source: 'Manual Paste' | 'Google Sheets' | 'CSV Upload';
  fileName: string;
  date: string;
  recordCount: number;
  status: 'Completed' | 'Processing' | 'Failed';
  duplicates: number;
  errors: number;
}

interface SearchHistoryRecord {
  id: string;
  queryName: string;
  executedAt: string;
  resultsCount: number;
  exportedCount: number;
  filtersSummary: string;
}

const STORAGE_KEY = 'outtricks_lead_import_batches';

const DEFAULT_IMPORT_BATCHES: ImportHistoryBatch[] = [
  {
    id: 'imp_1',
    source: 'CSV Upload',
    fileName: 'FinTech_VP_Product_Q3_Batch.csv',
    date: '2026-08-25',
    recordCount: 250,
    status: 'Completed',
    duplicates: 4,
    errors: 0,
  },
  {
    id: 'imp_2',
    source: 'Google Sheets',
    fileName: 'Outbound Target Accounts (Sheet1)',
    date: '2026-08-18',
    recordCount: 180,
    status: 'Completed',
    duplicates: 2,
    errors: 0,
  },
  {
    id: 'imp_3',
    source: 'Manual Paste',
    fileName: 'Inbound YC Founders (Manual)',
    date: '2026-08-10',
    recordCount: 95,
    status: 'Completed',
    duplicates: 1,
    errors: 0,
  },
];

export const LeadFinderImportsView: React.FC = () => {
  const { results, addCustomLeads } = useLeadSearch();
  const { leads } = useLeadsManagement();
  const { saveLeadToCrm } = useCrm();
  const { success, info, error } = useToast();

  const [importSection, setImportSection] = useState<'import' | 'history'>('import');
  const [historySearchQuery, setHistorySearchQuery] = useState('');

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [importHistory, setImportHistory] = useState<ImportHistoryBatch[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load import history from localStorage', e);
    }
    return DEFAULT_IMPORT_BATCHES;
  });

  const persistImportBatch = (batch: ImportHistoryBatch) => {
    setImportHistory((prev) => {
      const updated = [batch, ...prev];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to persist import batch to localStorage', e);
      }
      return updated;
    });
  };

  const handleDeleteHistoryBatch = (id: string) => {
    setImportHistory((prev) => {
      const updated = prev.filter((b) => b.id !== id);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to persist import batch removal', e);
      }
      return updated;
    });
    info('Import batch removed from history.');
  };

  const filteredHistory = useMemo(() => {
    if (!historySearchQuery.trim()) return importHistory;
    const q = historySearchQuery.toLowerCase();
    return importHistory.filter(
      (b) => b.fileName.toLowerCase().includes(q) || b.source.toLowerCase().includes(q)
    );
  }, [importHistory, historySearchQuery]);

  const [importSubMode, setImportSubMode] = useState<ImportSubMode>('manual');
  const [manualText, setManualText] = useState('');
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [isSheetConnected, setIsSheetConnected] = useState(false);
  const [selectedSheetTab, setSelectedSheetTab] = useState('Sheet1 (Outbound Target Accounts)');
  const [skipDuplicates, setSkipDuplicates] = useState(true);

  const parsedManualLeads = useMemo(() => {
    if (!manualText.trim()) return [];
    const lines = manualText.split('\n').map((l) => l.trim()).filter(Boolean);
    return lines.map((line, idx) => {
      const parts = line.split(',').map((p) => p.trim());
      const name = parts[0] || `Lead ${idx + 1}`;
      const title = parts[1] || 'Decision Maker';
      const company = parts[2] || 'Target Account';
      const email = parts[3] || `${name.toLowerCase().replace(/\s+/g, '.')}@${company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
      const phone = parts[4] || '+1 (555) 019-2831';
      const domain = company.toLowerCase().replace(/[^a-z0-9]/g, '') + '.com';

      return {
        id: `manual_imported_${Date.now()}_${idx}`,
        name,
        title,
        company,
        domain,
        email,
        phone,
        industry: 'B2B Software & Tech',
        headcount: '51-200',
        revenue: '$10M-$50M',
        location: 'United States',
        tech: ['Salesforce', 'HubSpot', 'Stripe'],
        intentSignal: 'Active Buying Cycle',
        icpScore: 95,
        avatar: `https://images.unsplash.com/photo-${1534528741775 + (idx % 10)}?auto=format&fit=crop&w=200&q=80`,
        profileStatus: 'Complete' as const,
        deliverabilityScore: 99,
        phoneStatus: 'Verified Mobile' as const,
        fundingStage: 'Series B',
        leadSource: 'Manual Lead Input'
      } as LeadDetailData;
    });
  }, [manualText]);

  const handleImportManualLeads = () => {
    if (parsedManualLeads.length === 0) {
      error('Please enter at least one lead row to import.');
      return;
    }

    const existingEmails = new Set([
      ...results.map((l) => l.email?.toLowerCase()),
      ...leads.map((l) => l.email?.toLowerCase()),
    ]);

    const validLeads = skipDuplicates
      ? parsedManualLeads.filter((l) => !existingEmails.has(l.email?.toLowerCase()))
      : parsedManualLeads;
    const dupCount = parsedManualLeads.length - validLeads.length;

    if (validLeads.length === 0) {
      error(`All ${parsedManualLeads.length} leads are duplicates of existing records in your CRM/workspace.`);
      return;
    }

    addCustomLeads(validLeads);

    validLeads.forEach((lead) => {
      saveLeadToCrm({
        name: lead.name,
        title: lead.title,
        company: lead.company,
        domain: lead.domain,
        email: lead.email,
        phone: lead.phone,
        avatar: lead.avatar,
        score: lead.icpScore,
        location: lead.location,
        tags: ['Lead Finder', 'Manual Paste Import'],
      });
    });

    persistImportBatch({
      id: `imp_${Date.now()}`,
      source: 'Manual Paste',
      fileName: `Manual_Paste_${new Date().toISOString().slice(0, 10)}.txt`,
      date: new Date().toISOString().slice(0, 10),
      recordCount: validLeads.length,
      status: 'Completed',
      duplicates: dupCount,
      errors: 0,
    });

    const dupMsg = dupCount > 0 ? ` (${dupCount} duplicates skipped)` : '';
    success(`Successfully imported ${validLeads.length} leads into your workspace & CRM!${dupMsg}`, 'Leads Added');
    setManualText('');
  };

  const handleConnectSheet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!googleSheetUrl.trim()) {
      error('Please provide a valid Google Sheet URL.');
      return;
    }
    if (!googleSheetUrl.includes('google.com') && !googleSheetUrl.includes('spreadsheets')) {
      error('Please enter a valid Google Sheets URL (e.g., https://docs.google.com/spreadsheets/d/...)');
      return;
    }
    setIsSheetConnected(true);
    success('Google Sheet connected & verified. Ready to map and sync leads.');
  };

  const handleExecuteSheetImport = () => {
    const mockSheetLeads: LeadDetailData[] = [
      {
        id: `gsheet_${Date.now()}_1`,
        name: 'Alexander Wright',
        title: 'Chief Technology Officer',
        company: 'NeuralFlow Systems',
        domain: 'neuralflow.io',
        email: 'a.wright@neuralflow.io',
        phone: '+1 (415) 309-8812',
        industry: 'Artificial Intelligence',
        headcount: '51-200',
        revenue: '$10M-$50M',
        location: 'San Francisco, CA',
        tech: ['AWS', 'Python', 'Kubernetes', 'PostgreSQL'],
        intentSignal: 'Evaluating Outbound Infrastructure',
        icpScore: 97,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        profileStatus: 'Complete',
        deliverabilityScore: 100,
        phoneStatus: 'Verified Mobile',
        leadSource: 'Google Sheet Sync'
      },
      {
        id: `gsheet_${Date.now()}_2`,
        name: 'Elena Rostova',
        title: 'VP of Revenue Operations',
        company: 'Vanguard Cyber',
        domain: 'vanguardcyber.com',
        email: 'elena@vanguardcyber.com',
        phone: '+1 (212) 880-4921',
        industry: 'Cybersecurity & DevOps',
        headcount: '201-500',
        revenue: '$50M-$100M',
        location: 'New York, NY',
        tech: ['Salesforce', 'HubSpot', 'Datadog'],
        intentSignal: 'Expanding Sales Stack',
        icpScore: 99,
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        profileStatus: 'Complete',
        deliverabilityScore: 100,
        phoneStatus: 'Verified Mobile',
        leadSource: 'Google Sheet Sync'
      },
      {
        id: `gsheet_${Date.now()}_3`,
        name: 'David K. Vance',
        title: 'Head of Growth Marketing',
        company: 'Starlight Retail Tech',
        domain: 'starlight.ai',
        email: 'david@starlight.ai',
        phone: '+1 (312) 441-9011',
        industry: 'E-commerce & Retail Tech',
        headcount: '51-200',
        revenue: '$10M-$50M',
        location: 'Chicago, IL',
        tech: ['Shopify Plus', 'Klaviyo', 'Segment'],
        intentSignal: 'High Intent Signal',
        icpScore: 94,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        profileStatus: 'Complete',
        deliverabilityScore: 98,
        phoneStatus: 'Verified Mobile',
        leadSource: 'Google Sheet Sync'
      }
    ];

    const existingEmails = new Set([
      ...results.map((l) => l.email?.toLowerCase()),
      ...leads.map((l) => l.email?.toLowerCase()),
    ]);

    const validLeads = skipDuplicates
      ? mockSheetLeads.filter((l) => !existingEmails.has(l.email?.toLowerCase()))
      : mockSheetLeads;
    const dupCount = mockSheetLeads.length - validLeads.length;

    addCustomLeads(validLeads);

    validLeads.forEach((lead) => {
      saveLeadToCrm({
        name: lead.name,
        title: lead.title,
        company: lead.company,
        domain: lead.domain,
        email: lead.email,
        phone: lead.phone,
        avatar: lead.avatar,
        score: lead.icpScore,
        location: lead.location,
        tags: ['Lead Finder', 'Google Sheets Sync'],
      });
    });

    persistImportBatch({
      id: `imp_${Date.now()}`,
      source: 'Google Sheets',
      fileName: selectedSheetTab,
      date: new Date().toISOString().slice(0, 10),
      recordCount: validLeads.length,
      status: 'Completed',
      duplicates: dupCount,
      errors: 0,
    });

    const dupMsg = dupCount > 0 ? ` (${dupCount} duplicates skipped)` : '';
    success(`Imported ${validLeads.length} leads from Google Sheet: "${selectedSheetTab}"${dupMsg}`);
    setIsSheetConnected(false);
    setGoogleSheetUrl('');
  };

  const handleDownloadSample = () => {
    const csvContent = "data:text/csv;charset=utf-8,First Name,Last Name,Title,Company,Email,Phone,Industry,Location\nSarah,Jenkins,VP Growth,CloudScale AI,sarah@cloudscale.ai,+14158924910,Artificial Intelligence,San Francisco CA\nMarcus,Vance,Head Demand Gen,Nexus Data Systems,marcus@nexusdata.io,+12125549021,Data Analytics,New York NY\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "outtricks_lead_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    success("Sample CSV template downloaded.");
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Lead Ingestion & Import History Hub
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ingest external prospect lists from CSV or Google Sheets and track historical import batches.
          </p>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadSample}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Sample Template
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsImportModalOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
            className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
          >
            Import New CSV
          </Button>
        </div>
      </div>

      {/* 2. Main Hub Card */}
      <div className="p-4 sm:p-5 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#242424]">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
            <Upload className="w-4 h-4 text-emerald-500" />
            <span>Prospect Ingestion Channels</span>
          </div>

          {/* Primary Sub-Section Switcher: Import vs History */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#202020] rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setImportSection('import')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                importSection === 'import'
                  ? 'bg-white dark:bg-[#141414] text-emerald-600 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Leads</span>
            </button>
            <button
              type="button"
              onClick={() => setImportSection('history')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                importSection === 'history'
                  ? 'bg-white dark:bg-[#141414] text-emerald-600 dark:text-emerald-400 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Import History</span>
              <span className="w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] flex items-center justify-center font-mono">
                {importHistory.length}
              </span>
            </button>
          </div>
        </div>

        {/* Sub-Section 1: IMPORT LEADS */}
        {importSection === 'import' && (
          <div className="space-y-4">
            {/* Import Sub-tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100/80 dark:bg-[#202020] rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setImportSubMode('manual')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  importSubMode === 'manual'
                    ? 'bg-white dark:bg-[#141414] text-emerald-600 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Manual Paste</span>
              </button>
              <button
                type="button"
                onClick={() => setImportSubMode('sheets')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  importSubMode === 'sheets'
                    ? 'bg-white dark:bg-[#141414] text-emerald-600 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Google Sheets</span>
              </button>
              <button
                type="button"
                onClick={() => setImportSubMode('csv')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  importSubMode === 'csv'
                    ? 'bg-white dark:bg-[#141414] text-emerald-600 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>CSV Upload</span>
              </button>
            </div>

            {/* Sub-mode 1: Manual Lead Input */}
            {importSubMode === 'manual' && (
              <div className="space-y-3">
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Format: <span className="font-mono text-slate-700 dark:text-slate-200">Name, Job Title, Company, Email, Phone</span> (one lead per row):
                </div>
                <textarea
                  value={manualText}
                  onChange={(e) => setManualText(e.target.value)}
                  placeholder={"Marcus Cole, VP Sales, HyperBound, marcus@hyperbound.io, +1 (415) 890-2104\nSamantha Reed, Head of Demand Gen, ScaleOps, sam@scaleops.com, +1 (212) 554-1901"}
                  rows={4}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] text-xs font-mono text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={parsedManualLeads.length > 0 ? "emerald" : "slate"} size="sm">
                      {parsedManualLeads.length} leads detected
                    </Badge>
                    {parsedManualLeads.length > 0 && (
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Ready to import
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={handleImportManualLeads}
                      disabled={parsedManualLeads.length === 0}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      leftIcon={<Check className="w-3.5 h-3.5" />}
                    >
                      Validate & Add to Leads
                    </Button>
                    {manualText && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => setManualText('')} className="text-slate-400 hover:text-slate-600">
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-mode 2: Google Sheets */}
            {importSubMode === 'sheets' && (
              <div className="space-y-3">
                {!isSheetConnected ? (
                  <form onSubmit={handleConnectSheet} className="space-y-3">
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">
                      Paste the link to your Google Spreadsheet (Ensure sharing is set to "Anyone with link can view" or authorize workspace):
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="relative flex-1">
                        <FileSpreadsheet className="w-4 h-4 text-emerald-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="url"
                          value={googleSheetUrl}
                          onChange={(e) => setGoogleSheetUrl(e.target.value)}
                          placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <Button type="submit" variant="primary" size="sm" className="h-10 bg-emerald-600 hover:bg-emerald-700 text-white">
                        Connect Sheet
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-3 bg-emerald-50/40 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-500/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                          Sheet Connected & Verified
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsSheetConnected(false)}
                        className="text-[11px] font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        Disconnect
                      </button>
                    </div>

                    {/* Tab Selector & Column Mapping Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                          Select Sheet / Tab
                        </label>
                        <select
                          value={selectedSheetTab}
                          onChange={(e) => setSelectedSheetTab(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-xs font-medium text-slate-900 dark:text-white"
                        >
                          <option value="Sheet1 (Outbound Target Accounts)">Sheet1 (Outbound Target Accounts) • 128 rows</option>
                          <option value="Q3 Event Attendees">Q3 Event Attendees • 84 rows</option>
                          <option value="TAM Decision Makers">TAM Decision Makers • 210 rows</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Auto-Mapped Schema
                        </label>
                        <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 space-y-0.5">
                          <div>Name → Col A &nbsp;•&nbsp; Title → Col B</div>
                          <div>Company → Col C &nbsp;•&nbsp; Email → Col D</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={handleExecuteSheetImport}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        leftIcon={<Check className="w-3.5 h-3.5" />}
                      >
                        Import Leads from Google Sheet
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Sub-mode 3: CSV Upload */}
            {importSubMode === 'csv' && (
              <div className="space-y-3">
                <div
                  onClick={() => setIsImportModalOpen(true)}
                  className="p-6 rounded-2xl border-2 border-dashed border-emerald-400/50 dark:border-emerald-500/30 hover:border-emerald-500 bg-emerald-50/20 dark:bg-emerald-950/10 text-center cursor-pointer transition-colors"
                >
                  <Upload className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    Click to launch CSV / Excel spreadsheet importer
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Upload .csv, .tsv, .xlsx with automatic header mapping and duplicate detection
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={skipDuplicates}
                      onChange={(e) => setSkipDuplicates(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-emerald-600 border-slate-300 dark:border-[#2A2A2A] focus:ring-emerald-500"
                    />
                    <span>Skip duplicates already matching existing CRM contacts or emails</span>
                  </label>

                  <Button variant="outline" size="sm" onClick={() => setIsImportModalOpen(true)}>
                    <span>Open Full Importer</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sub-Section 2: IMPORT HISTORY */}
        {importSection === 'history' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="relative flex-1 max-w-sm">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={historySearchQuery}
                  onChange={(e) => setHistorySearchQuery(e.target.value)}
                  placeholder="Search past import jobs..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
              </div>
              <div className="text-[11px] text-slate-500 font-medium">
                Showing {filteredHistory.length} of {importHistory.length} batches
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-[#2A2A2A]">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-[#202020] text-slate-500 font-bold border-b border-slate-200 dark:border-[#2A2A2A]">
                  <tr>
                    <th className="py-2.5 px-3">Source & File</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Records</th>
                    <th className="py-2.5 px-3">Duplicates</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#252525]">
                  {filteredHistory.map((batch) => (
                    <tr key={batch.id} className="hover:bg-slate-50/50 dark:hover:bg-[#1e1e1e] transition-colors">
                      <td className="py-2.5 px-3">
                        <div className="flex items-center gap-2">
                          {batch.source === 'Google Sheets' && <FileSpreadsheet className="w-4 h-4 text-emerald-500 shrink-0" />}
                          {batch.source === 'CSV Upload' && <Upload className="w-4 h-4 text-blue-500 shrink-0" />}
                          {batch.source === 'Manual Paste' && <FileText className="w-4 h-4 text-amber-500 shrink-0" />}
                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white truncate max-w-[180px] sm:max-w-xs">{batch.fileName}</div>
                            <div className="text-[10px] text-slate-400">{batch.source}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">{batch.date}</td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white font-mono">{batch.recordCount.toLocaleString()}</td>
                      <td className="py-2.5 px-3 text-slate-500 font-mono">{batch.duplicates}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          batch.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        }`}>
                          {batch.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          type="button"
                          onClick={() => handleDeleteHistoryBatch(batch.id)}
                          className="p-1 rounded-md text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-[#252525] transition-colors cursor-pointer"
                          title="Delete batch record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredHistory.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No import history records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 3. CSV Import Modal */}
      <LeadImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportComplete={(count) => {
          setIsImportModalOpen(false);
          persistImportBatch({
            id: `imp_${Date.now()}`,
            source: 'CSV Upload',
            fileName: `User_Upload_${new Date().toISOString().split('T')[0]}.csv`,
            date: new Date().toISOString().split('T')[0],
            recordCount: count,
            status: 'Completed',
            duplicates: 0,
            errors: 0,
          });
          success(`Imported ${count} leads into workspace.`, 'Import Completed');
        }}
      />

    </div>
  );
};

export default LeadFinderImportsView;
