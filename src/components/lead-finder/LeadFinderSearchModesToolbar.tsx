import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Building2, 
  Upload, 
  Search, 
  FileSpreadsheet, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  X, 
  Globe, 
  ArrowRight,
  Check
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLeadSearch, LeadDetailData } from '../../context/LeadSearchContext';
import { useToast } from '../../context/ToastContext';

export type LeadSearchMode = 'people' | 'company' | 'import';
export type ImportSubMode = 'manual' | 'sheets' | 'csv';

export interface LeadFinderSearchModesToolbarProps {
  activeMode: LeadSearchMode;
  onModeChange: (mode: LeadSearchMode) => void;
  onTriggerCsvModal: () => void;
}

export const LeadFinderSearchModesToolbar: React.FC<LeadFinderSearchModesToolbarProps> = ({
  activeMode,
  onModeChange,
  onTriggerCsvModal,
}) => {
  const { 
    filters, 
    updateFilters, 
    addCustomLeads, 
    allMatchingResults 
  } = useLeadSearch();

  const { success, info, error } = useToast();

  // Company / Domain sub-states
  const [domainSearchType, setDomainSearchType] = useState<'single' | 'multiline'>('single');
  const [singleTarget, setSingleTarget] = useState('');
  const [multilineTargets, setMultilineTargets] = useState('');

  // Import sub-states
  const [importSubMode, setImportSubMode] = useState<ImportSubMode>('manual');
  const [manualText, setManualText] = useState('');
  const [googleSheetUrl, setGoogleSheetUrl] = useState('');
  const [isSheetConnected, setIsSheetConnected] = useState(false);
  const [selectedSheetTab, setSelectedSheetTab] = useState('Sheet1 (Outbound Target Accounts)');
  const [skipDuplicates, setSkipDuplicates] = useState(true);

  // Parse multi-line domain targets
  const parsedDomains = useMemo(() => {
    if (!multilineTargets.trim()) return [];
    return multilineTargets
      .split(/[\n,]+/)
      .map((t) => t.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, ''))
      .filter((t) => t.length > 0);
  }, [multilineTargets]);

  // Parse manual leads text
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

  // Preset domains
  const handleApplyPreset = (presetDomains: string[]) => {
    updateFilters({ companyDomains: presetDomains });
    setMultilineTargets(presetDomains.join('\n'));
    setDomainSearchType('multiline');
    success(`Filtered by ${presetDomains.length} target companies: ${presetDomains.join(', ')}`);
  };

  const handleApplySingleTarget = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = singleTarget.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
    if (!clean) {
      updateFilters({ companyDomains: [] });
      return;
    }
    updateFilters({ companyDomains: [clean] });
    success(`Filtering leads at target account: ${clean}`);
  };

  const handleApplyMultilineTargets = () => {
    if (parsedDomains.length === 0) {
      updateFilters({ companyDomains: [] });
      return;
    }
    updateFilters({ companyDomains: parsedDomains });
    success(`Filtering leads across ${parsedDomains.length} target accounts`);
  };

  const handleClearTargets = () => {
    setSingleTarget('');
    setMultilineTargets('');
    updateFilters({ companyDomains: [] });
    info('Company & domain target filters cleared.');
  };

  // Submit manual leads
  const handleImportManualLeads = () => {
    if (parsedManualLeads.length === 0) {
      error('Please enter at least one lead row to import.');
      return;
    }
    addCustomLeads(parsedManualLeads);
    success(`Successfully imported ${parsedManualLeads.length} leads into your workspace!`, 'Leads Added');
    setManualText('');
    onModeChange('people');
  };

  // Connect Google Sheet
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

    addCustomLeads(mockSheetLeads);
    success(`Imported ${mockSheetLeads.length} leads from Google Sheet: "${selectedSheetTab}"`);
    setIsSheetConnected(false);
    setGoogleSheetUrl('');
    onModeChange('people');
  };

  return (
    <div className="space-y-3 font-sans">
      
      {/* 1. Mode Selector Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-1.5 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 dark:bg-[#1E1E1E] rounded-xl">
          {/* People Mode */}
          <button
            type="button"
            onClick={() => onModeChange('people')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'people'
                ? 'bg-white dark:bg-[#141414] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>People (8D Matrix)</span>
          </button>

          {/* Company / Domain Mode */}
          <button
            type="button"
            onClick={() => onModeChange('company')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'company'
                ? 'bg-white dark:bg-[#141414] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Company / Domain</span>
            {filters.companyDomains && filters.companyDomains.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center font-mono">
                {filters.companyDomains.length}
              </span>
            )}
          </button>

          {/* Import Mode */}
          <button
            type="button"
            onClick={() => onModeChange('import')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMode === 'import'
                ? 'bg-white dark:bg-[#141414] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import Leads</span>
          </button>
        </div>

        {/* Right stats / quick badge */}
        <div className="hidden sm:flex items-center gap-2 text-xs pr-2 text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">100M+ Verified B2B Profiles</span>
        </div>
      </div>

      {/* 2. Company / Domain Mode Active Panel */}
      {activeMode === 'company' && (
        <div className="p-4 sm:p-5 bg-white dark:bg-[#161616] rounded-2xl border border-blue-500/20 dark:border-blue-500/30 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-[#242424]">
            <div>
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                <Building2 className="w-4 h-4 text-blue-500" />
                <span>Account & Domain Intelligence Search</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Target specific companies or domains to find their decision makers, email addresses, and direct phone numbers.
              </p>
            </div>

            {/* Switch between Single and Batch Multi-line */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#202020] rounded-xl self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setDomainSearchType('single')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  domainSearchType === 'single'
                    ? 'bg-white dark:bg-[#141414] text-blue-600 dark:text-blue-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Single Account
              </button>
              <button
                type="button"
                onClick={() => setDomainSearchType('multiline')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  domainSearchType === 'multiline'
                    ? 'bg-white dark:bg-[#141414] text-blue-600 dark:text-blue-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Batch Multi-line Paste
              </button>
            </div>
          </div>

          {/* Sub-mode: Single Search */}
          {domainSearchType === 'single' ? (
            <form onSubmit={handleApplySingleTarget} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={singleTarget}
                  onChange={(e) => setSingleTarget(e.target.value)}
                  placeholder="Enter company name or domain (e.g. CloudScale AI or cloudscale.ai)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button type="submit" variant="primary" size="sm" className="h-10 px-4">
                  <Search className="w-3.5 h-3.5" />
                  <span>Find Leads</span>
                </Button>
                {filters.companyDomains && filters.companyDomains.length > 0 && (
                  <Button type="button" variant="ghost" size="sm" onClick={handleClearTargets} className="h-10 text-rose-500">
                    <X className="w-3.5 h-3.5" />
                    <span>Clear</span>
                  </Button>
                )}
              </div>
            </form>
          ) : (
            /* Sub-mode: Multi-line Batch Paste */
            <div className="space-y-2">
              <textarea
                value={multilineTargets}
                onChange={(e) => setMultilineTargets(e.target.value)}
                placeholder={"Paste target companies or domains separated by line or commas:\ncloudscale.ai\napexdata.io\nnotion.so\nstripe.com"}
                rows={4}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200 dark:border-[#303030] text-xs font-mono text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant={parsedDomains.length > 0 ? "blue" : "slate"} size="sm">
                    {parsedDomains.length} target accounts detected
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={handleApplyMultilineTargets}
                    disabled={parsedDomains.length === 0}
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Filter Matching Leads ({parsedDomains.length})</span>
                  </Button>
                  {filters.companyDomains && filters.companyDomains.length > 0 && (
                    <Button type="button" variant="ghost" size="sm" onClick={handleClearTargets} className="text-rose-500">
                      <X className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick Target Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-100 dark:border-[#242424] text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Quick Presets:</span>
            <button
              type="button"
              onClick={() => handleApplyPreset(['cloudscale.ai', 'apexdata.io', 'hyperbound.io'])}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#222222] hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-300 hover:text-blue-600 text-[11px] font-semibold border border-transparent hover:border-blue-500/30 transition-colors cursor-pointer"
            >
              Enterprise AI & Cloud
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset(['stripe.com', 'hubspot.com', 'notion.so', 'figma.com'])}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#222222] hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-300 hover:text-blue-600 text-[11px] font-semibold border border-transparent hover:border-blue-500/30 transition-colors cursor-pointer"
            >
              Top B2B SaaS Leaders
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset(['datadog.com', 'crowdstrike.com', 'paloaltonetworks.com'])}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#222222] hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-600 dark:text-slate-300 hover:text-blue-600 text-[11px] font-semibold border border-transparent hover:border-blue-500/30 transition-colors cursor-pointer"
            >
              Cybersecurity TAM
            </button>
          </div>
        </div>
      )}

      {/* 3. Import Mode Active Panel */}
      {activeMode === 'import' && (
        <div className="p-4 sm:p-5 bg-white dark:bg-[#161616] rounded-2xl border border-emerald-500/20 dark:border-emerald-500/30 shadow-xs space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-[#242424]">
            <div>
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                <Upload className="w-4 h-4 text-emerald-500" />
                <span>Lead Ingestion Hub: Manual, Sheets & CSV</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Bring external prospect lists directly into Lead Finder. Instantly enrich emails, phones, and sync to CRM.
              </p>
            </div>

            {/* Sub-tabs: Manual Paste | Google Sheets | CSV Upload */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-[#202020] rounded-xl self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setImportSubMode('manual')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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
                className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  importSubMode === 'csv'
                    ? 'bg-white dark:bg-[#141414] text-emerald-600 dark:text-emerald-400 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>CSV Upload</span>
              </button>
            </div>
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
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Validate & Add to Leads</span>
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
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Import Leads from Google Sheet</span>
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
                onClick={onTriggerCsvModal}
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

                <Button variant="outline" size="sm" onClick={onTriggerCsvModal}>
                  <span>Open Full Importer</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
