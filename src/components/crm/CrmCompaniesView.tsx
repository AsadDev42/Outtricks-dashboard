import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  Users, 
  DollarSign, 
  Globe, 
  MapPin, 
  Zap, 
  TrendingUp, 
  ExternalLink, 
  MoreVertical, 
  Layers, 
  Sparkles, 
  ArrowRight, 
  X,
  Filter,
  CheckCircle2,
  Trash2
} from 'lucide-react';
import { useCrm, CrmCompany } from '../../context/CrmContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { formatCurrency, formatNumber } from '../../utils/formatters';

export const CrmCompaniesView: React.FC = () => {
  const { companies, createCompany, deleteCompany, deals, contacts, setActiveTab } = useCrm();
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [intentFilter, setIntentFilter] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState<CrmCompany | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Company Form State
  const [newName, setNewName] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [newIndustry, setNewIndustry] = useState('Enterprise SaaS / AI');
  const [newEmployees, setNewEmployees] = useState('100-500');
  const [newRevenue, setNewRevenue] = useState('$25M - $50M');
  const [newStrategy, setNewStrategy] = useState('Autonomous Multi-Channel Outbound');
  const [newTier, setNewTier] = useState<'Tier 1 Enterprise' | 'Tier 2 Mid-Market' | 'Strategic Scale'>('Tier 1 Enterprise');

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch = !searchQuery.trim() || (
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesTier = tierFilter === 'all' || c.tier === tierFilter;
    const matchesIntent = intentFilter === 'all' || c.intentStatus === intentFilter;
    return matchesSearch && matchesTier && matchesIntent;
  });

  const handleCreateCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    createCompany({
      name: newName,
      domain: newDomain || 'example.com',
      industry: newIndustry,
      employeeCount: newEmployees,
      revenue: newRevenue,
      strategy: newStrategy,
      tier: newTier,
      activeContactsCount: 1,
    });

    setIsAddModalOpen(false);
    setNewName('');
    setNewDomain('');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header with Page Title & Action */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              Target Accounts & Companies
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Enterprise accounts with active buying intent, target strategy matrices, and mapped decision-makers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Target Company
          </Button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search companies by name, domain, or industry..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer min-h-[36px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option value="all">Tier (All)</option>
            <option value="Tier 1 Enterprise">Tier 1 Enterprise</option>
            <option value="Tier 2 Mid-Market">Tier 2 Mid-Market</option>
            <option value="Strategic Scale">Strategic Scale</option>
          </select>

          <select
            value={intentFilter}
            onChange={(e) => setIntentFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer min-h-[36px] focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
          >
            <option value="all">Intent (All)</option>
            <option value="High Intent">High Intent</option>
            <option value="Warm Intent">Warm Intent</option>
            <option value="Active Pipeline">Active Pipeline</option>
          </select>

          <Badge variant="primary" size="md">
            {formatNumber(filteredCompanies.length)} Accounts
          </Badge>
        </div>
      </div>

      {/* 3. Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCompanies.map((company) => {
          const associatedDeals = deals.filter(d => d.companyName.toLowerCase() === company.name.toLowerCase());
          const totalVal = associatedDeals.reduce((acc, d) => acc + d.value, 0) || company.totalDealValue;

          return (
            <div
              key={company.id}
              className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all group"
            >
              {/* Top Row: Logo, Name, Tier Badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-base border border-emerald-500/20 shrink-0">
                    {company.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {company.domain}
                      </span>
                      <span>•</span>
                      <span>{company.industry}</span>
                    </div>
                  </div>
                </div>

                <Badge variant="primary" size="sm">
                  {company.tier}
                </Badge>
              </div>

              {/* Account Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Pipeline ARR</div>
                  <div className="font-extrabold text-slate-900 dark:text-white font-mono">
                    {formatCurrency(totalVal)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Contacts</div>
                  <div className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    {company.activeContactsCount} Verified
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold">Intent Status</div>
                  <div className="font-extrabold text-emerald-600 dark:text-emerald-400">
                    {company.intentStatus}
                  </div>
                </div>
              </div>

              {/* Target Strategy */}
              <div className="space-y-1 text-xs">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Outreach Strategy</div>
                <p className="text-slate-600 dark:text-slate-300 font-medium line-clamp-2">
                  {company.strategy}
                </p>
              </div>

              {/* Action Bar */}
              <div className="pt-3 border-t border-slate-100 dark:border-[#202020] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setSelectedCompany(company)}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View Account Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab('contacts')}
                    className="text-[11px] h-7 px-2.5 text-slate-500"
                  >
                    Contacts ({company.activeContactsCount})
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setActiveTab('deals')}
                    className="text-[11px] h-7 px-2.5 text-emerald-600 dark:text-emerald-400"
                  >
                    Deals ({associatedDeals.length})
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Company Account Detail Modal (Section 7) */}
      {selectedCompany && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black text-xl">
                  {selectedCompany.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">
                    {selectedCompany.name}
                  </h3>
                  <p className="text-xs text-slate-400">{selectedCompany.domain} • {selectedCompany.industry}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCompany(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Firmographic Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Headcount Tier</div>
                <div className="font-bold text-slate-900 dark:text-white">{selectedCompany.employeeCount}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Revenue</div>
                <div className="font-bold text-slate-900 dark:text-white">{selectedCompany.revenue}</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Pipeline ARR</div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                  {formatCurrency(selectedCompany.totalDealValue)}
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Intent Status</div>
                <div className="font-bold text-emerald-600">{selectedCompany.intentStatus}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white">Account Strategy & Description</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020]">
                {selectedCompany.strategy}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={() => setSelectedCompany(null)}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={() => { setSelectedCompany(null); setActiveTab('deals'); }}>
                View Associated Deals
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Add Company Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <h3 className="font-black text-lg text-slate-950 dark:text-white">Add Target Company</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCompany} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Databricks"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Website Domain</label>
                <input
                  type="text"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  placeholder="databricks.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">Industry</label>
                <input
                  type="text"
                  value={newIndustry}
                  onChange={(e) => setNewIndustry(e.target.value)}
                  placeholder="Data Lakehouse & Enterprise AI"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
