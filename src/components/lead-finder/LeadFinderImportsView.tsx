import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Download, 
  Plus, 
  Clock, 
  Layers,
  ArrowRight,
  RefreshCw,
  Search,
  Table as TableIcon
} from 'lucide-react';
import { Button } from '../ui/Button';
import { LeadImportModal } from './LeadImportModal';
import { useLeadsManagement } from '../../context/LeadsManagementContext';
import { useToast } from '../../context/ToastContext';

interface ImportBatchRecord {
  id: string;
  fileName: string;
  importedAt: string;
  totalRecords: number;
  importedCount: number;
  failedCount: number;
  status: 'Completed' | 'Processing' | 'Failed';
  targetList: string;
}

const INITIAL_IMPORT_BATCHES: ImportBatchRecord[] = [
  {
    id: 'imp_1',
    fileName: 'FinTech_VP_Product_Q3_Batch.csv',
    importedAt: '2026-08-25',
    totalRecords: 250,
    importedCount: 248,
    failedCount: 2,
    status: 'Completed',
    targetList: 'Tier 1 Enterprise Tech',
  },
  {
    id: 'imp_2',
    fileName: 'AI_SaaS_Founders_SeriesA.csv',
    importedAt: '2026-08-18',
    totalRecords: 180,
    importedCount: 180,
    failedCount: 0,
    status: 'Completed',
    targetList: 'YC Founders & Early Stage',
  },
  {
    id: 'imp_3',
    fileName: 'Inbound_Webinar_Attendees_Aug.csv',
    importedAt: '2026-08-10',
    totalRecords: 95,
    importedCount: 94,
    failedCount: 1,
    status: 'Completed',
    targetList: 'FinTech Growth Leaders',
  },
];

export const LeadFinderImportsView: React.FC = () => {
  const [importBatches, setImportBatches] = useState<ImportBatchRecord[]>(INITIAL_IMPORT_BATCHES);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { leads, customLists } = useLeadsManagement();
  const { success, info } = useToast();

  const totalImportedAllTime = importBatches.reduce((acc, b) => acc + b.importedCount, 0);

  const filteredBatches = importBatches.filter(b => 
    b.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.targetList.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <h1 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2">
            <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>Lead & Prospect Imports</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Import CSV files, map column headers, and enroll prospects directly into your outbound lists.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadSample}
            className="text-xs font-semibold gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Sample Template</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsImportModalOpen(true)}
            className="text-xs font-bold gap-1.5 shadow-sm shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Import New CSV</span>
          </Button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Imported Records</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">{totalImportedAllTime}</div>
          <div className="text-[11px] text-slate-500">Across {importBatches.length} batch uploads</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Ingestion Rate</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">99.4%</div>
          <div className="text-[11px] text-emerald-600 font-bold">Automatic duplicate deduplication</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target Lists Linked</div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">{customLists.length}</div>
          <div className="text-[11px] text-blue-600 font-bold">Ready for sequence enrollment</div>
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search previous imports by file name or list..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* 4. Import History Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200/80 dark:border-[#2A2A2A] bg-slate-50/50 dark:bg-white/[0.02]">
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">File Name</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target List</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Records</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Imported</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Failed</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04] text-xs">
              {filteredBatches.map((batch) => (
                <tr key={batch.id} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{batch.fileName}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                    {batch.targetList}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {batch.totalRecords}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {batch.importedCount}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400">
                    {batch.failedCount}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{batch.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                    {batch.importedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSV Import Modal */}
      <LeadImportModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImportComplete={(count) => {
          setIsImportModalOpen(false);
          const newBatch: ImportBatchRecord = {
            id: `imp_${Date.now()}`,
            fileName: `User_Upload_${new Date().toISOString().split('T')[0]}.csv`,
            importedAt: new Date().toISOString().split('T')[0],
            totalRecords: count,
            importedCount: count,
            failedCount: 0,
            status: 'Completed',
            targetList: 'Direct CSV Import',
          };
          setImportBatches(prev => [newBatch, ...prev]);
          success(`Imported ${count} leads into workspace.`, 'Import Completed');
        }}
      />

    </div>
  );
};
