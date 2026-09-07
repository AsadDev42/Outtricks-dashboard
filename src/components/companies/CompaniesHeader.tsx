import React from 'react';
import { 
  Building2, 
  Plus, 
  Download, 
  Search, 
  RotateCcw, 
  DollarSign, 
  Users, 
  TrendingUp,
  Layers,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useCompanies } from '../../context/CompaniesContext';

export interface CompaniesHeaderProps {
  onOpenCreateCompanyModal: () => void;
}

export const CompaniesHeader: React.FC<CompaniesHeaderProps> = ({
  onOpenCreateCompanyModal,
}) => {
  const {
    allFilteredCompanies,
    searchQuery,
    setSearchQuery,
    filterIndustry,
    setFilterIndustry,
    filterHeadcount,
    setFilterHeadcount,
    filterOwner,
    setFilterOwner,
    resetAllFilters,
    exportCompaniesToCsv
  } = useCompanies();

  const totalAccounts = allFilteredCompanies.length;
  const inOutreachCount = allFilteredCompanies.filter((c) => c.status === 'In Outreach').length;
  const totalPipelineVal = allFilteredCompanies.reduce((acc, c) => acc + (c.openDealsValue || 0), 0);
  const customersCount = allFilteredCompanies.filter((c) => c.status === 'Customer').length;

  return (
    <div className="space-y-4 font-sans">
      
      {/* Top Banner & Metric Strip */}
      <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Companies & Target Accounts
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Account-based prospecting, firmographics, and buying intent tracking for enterprise accounts.
          </p>
        </div>

        {/* Metric Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0 text-xs">
          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[105px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Accounts</div>
            <div className="text-base font-extrabold text-slate-900 dark:text-white font-mono">{totalAccounts}</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[105px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">In Outreach</div>
            <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-mono">{inOutreachCount}</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[105px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Pipeline Value</div>
            <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              ${(totalPipelineVal / 1000).toFixed(0)}k ARR
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-0.5 min-w-[105px]">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Customers</div>
            <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-mono">{customersCount}</div>
          </div>
        </div>

      </div>

      {/* Control Action Toolbar */}
      <div className="p-3 bg-white dark:bg-[#161616] rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Search Query */}
        <div className="flex-1 min-w-[220px] relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search accounts by company name, domain, industry, tech stack, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          
          <select
            value={filterIndustry}
            onChange={(e) => setFilterIndustry(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="all">All Industries</option>
            <option value="Enterprise B2B SaaS">Enterprise B2B SaaS</option>
            <option value="Cybersecurity & DevOps">Cybersecurity & DevOps</option>
            <option value="FinTech & B2B Payments">FinTech & B2B Payments</option>
            <option value="Marketing & Growth Agencies">Marketing & Growth Agencies</option>
            <option value="E-Commerce & Supply Chain">E-Commerce & Supply Chain</option>
          </select>

          <select
            value={filterHeadcount}
            onChange={(e) => setFilterHeadcount(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="all">All Sizes</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="501-1000">501-1000 employees</option>
          </select>

          <select
            value={filterOwner}
            onChange={(e) => setFilterOwner(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-semibold text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
          >
            <option value="all">All Account Owners</option>
            <option value="Sarah Jenkins">Sarah Jenkins</option>
            <option value="Marcus Vance">Marcus Vance</option>
            <option value="Alex Rivera">Alex Rivera</option>
            <option value="Unassigned">Unassigned</option>
          </select>

          {(searchQuery || filterIndustry !== 'all' || filterHeadcount !== 'all' || filterOwner !== 'all') && (
            <button
              type="button"
              onClick={resetAllFilters}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
              title="Reset filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

        </div>

        {/* Primary Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={exportCompaniesToCsv}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateCompanyModal}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add Company
          </Button>
        </div>

      </div>

    </div>
  );
};
