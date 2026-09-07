import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  X, 
  AlertCircle, 
  Eye, 
  Bot, 
  Mail, 
  Linkedin, 
  Zap, 
  Clock,
  ArrowRight,
  Filter,
  Search,
  RotateCw,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useAgents, AgentApprovalItem } from '../../context/AgentsContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export const AgentApprovalsQueue: React.FC = () => {
  const { approvals, approveAction, rejectAction } = useAgents();
  const { success, error, info } = useToast();

  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApproval, setSelectedApproval] = useState<AgentApprovalItem | null>(null);
  const [agentFilter, setAgentFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  const pendingCount = approvals.filter(a => a.status === 'Pending').length;
  const approvedCount = approvals.filter(a => a.status === 'Approved').length;
  const rejectedCount = approvals.filter(a => a.status === 'Rejected').length;
  const highPriorityCount = approvals.filter(a => a.status === 'Pending' && a.riskScore === 'High').length;

  const filteredApprovals = approvals.filter((item) => {
    const matchesTab = item.status.toLowerCase() === activeTab;
    const matchesSearch = 
      item.actionTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetContact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetCompany.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAgent = agentFilter === 'all' || item.agentName.toLowerCase().includes(agentFilter.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || item.riskScore.toLowerCase() === priorityFilter.toLowerCase();

    return matchesTab && matchesSearch && matchesAgent && matchesPriority;
  });

  const handleApprove = (id: string, name: string) => {
    approveAction(id);
    setSelectedApproval(null);
    success(`Approved action for ${name}. Dispatched for autonomous execution.`, 'Action Approved');
  };

  const handleReject = (id: string, name: string) => {
    rejectAction(id);
    setSelectedApproval(null);
    error(`Rejected proposed action for ${name}.`, 'Action Rejected');
  };

  const handleRequestChanges = (id: string, name: string) => {
    info(`Requested changes for ${name}. Task reassigned to agent with revision prompt.`, 'Changes Requested');
    setSelectedApproval(null);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-[#2A2A2A]">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white tracking-tight flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span>Approvals Queue</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Review actions that require human approval before execution.
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search approvals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/20 w-48 sm:w-56"
            />
          </div>

          <select
            value={agentFilter}
            onChange={(e) => setAgentFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 outline-none"
          >
            <option value="all">All Agents</option>
            <option value="sdr">SDR Outreach</option>
            <option value="linkedin">LinkedIn Safe Bot</option>
            <option value="upwork">Upwork Bidding</option>
          </select>

          <button
            onClick={() => success('Approvals queue refreshed.', 'Refreshed')}
            className="p-2 rounded-xl bg-white dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-colors cursor-pointer"
            title="Refresh"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Top Summary KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Pending Review</span>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">
            {pendingCount}
          </div>
          <span className="text-[10px] text-amber-600 font-bold">Requires operator sign-off</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Approved Today</span>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {approvedCount}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">Dispatched autonomously</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">Rejected Today</span>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">
            {rejectedCount}
          </div>
          <span className="text-[10px] text-slate-400">Blocked actions</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase">High Priority</span>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {highPriorityCount}
          </div>
          <span className="text-[10px] text-emerald-500 font-bold">Enterprise & High Value</span>
        </div>
      </div>

      {/* 3. Filter Tabs: Pending, Approved, Rejected */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-[#2A2A2A] pb-1 text-xs font-bold">
        {[
          { id: 'pending', label: 'Pending Approvals', count: pendingCount },
          { id: 'approved', label: 'Approved Actions', count: approvedCount },
          { id: 'rejected', label: 'Rejected Actions', count: rejectedCount },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
              activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 4. Main Approvals Table */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] overflow-hidden bg-white dark:bg-[#161616] shadow-xs">
        {filteredApprovals.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
              No {activeTab} Approvals in Queue
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              All agent actions have been processed according to safety rules.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-full overflow-x-auto min-w-0 no-scrollbar">
            <table className="w-full min-w-[760px] text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-[#2A2A2A] bg-slate-50 dark:bg-[#141414] text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  <th className="py-3 px-4">AGENT</th>
                  <th className="py-3 px-3">REQUESTED ACTION</th>
                  <th className="py-3 px-3">TARGET</th>
                  <th className="py-3 px-3">PRIORITY</th>
                  <th className="py-3 px-3">REQUESTED</th>
                  <th className="py-3 px-3">STATUS</th>
                  <th className="py-3 px-4 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-white/[0.05]">
                {filteredApprovals.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Bot className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{item.agentName}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 max-w-xs truncate">
                        {item.actionTitle}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">Module: {item.module}</div>
                    </td>

                    <td className="py-3.5 px-3">
                      <div className="font-medium text-slate-900 dark:text-white">{item.targetContact}</div>
                      <div className="text-[11px] text-slate-400">{item.targetCompany}</div>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.riskScore === 'High' ? 'bg-rose-50 dark:bg-rose-950 text-rose-600' :
                        item.riskScore === 'Medium' ? 'bg-amber-50 dark:bg-amber-950 text-amber-600' :
                        'bg-slate-100 dark:bg-[#1A1A1A] text-slate-600 dark:text-slate-400'
                      }`}>
                        {item.riskScore} Priority
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {item.requestedAt}
                    </td>

                    <td className="py-3.5 px-3">
                      <Badge variant={item.status === 'Approved' ? 'emerald' : item.status === 'Rejected' ? 'rose' : 'amber'}>
                        {item.status}
                      </Badge>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedApproval(item)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#181818] hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold text-[11px] cursor-pointer"
                        >
                          Review
                        </button>

                        {item.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => handleApprove(item.id, item.agentName)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                            >
                              <Check className="w-3 h-3" />
                              <span>Approve</span>
                            </button>

                            <button
                              onClick={() => handleReject(item.id, item.agentName)}
                              className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 text-rose-600 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                            >
                              <X className="w-3 h-3" />
                              <span>Reject</span>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 5. Slideout Approval Review Panel */}
      {selectedApproval && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-2 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div>
                <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase">Human-In-The-Loop Review</span>
                <h3 className="text-base font-black text-slate-900 dark:text-white">{selectedApproval.actionTitle}</h3>
                <span className="text-xs text-slate-400">Agent: {selectedApproval.agentName} • Requested {selectedApproval.requestedAt}</span>
              </div>
              <button onClick={() => setSelectedApproval(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">Target Recipient & Account</strong>
                <p className="text-slate-700 dark:text-slate-300">{selectedApproval.targetContact} ({selectedApproval.targetCompany})</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#141414]/60 border border-slate-200/60 dark:border-[#202020] space-y-1">
                <strong className="text-slate-900 dark:text-white block">Proposed Autonomous Action</strong>
                <p className="text-slate-700 dark:text-slate-300">{selectedApproval.proposedAction}</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-[#2A2A2A] space-y-1.5 font-mono text-[11px]">
                <strong className="text-slate-900 dark:text-white block font-sans text-xs">Proposed Message / Action Payload</strong>
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {selectedApproval.payloadPreview}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>Risk Assessment: <strong className="text-amber-600">{selectedApproval.riskScore} Risk</strong></span>
                <span>Module: <strong className="text-slate-700 dark:text-slate-300">{selectedApproval.module}</strong></span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex flex-wrap items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => handleRequestChanges(selectedApproval.id, selectedApproval.agentName)}>
                Request Changes
              </Button>
              <button
                onClick={() => handleReject(selectedApproval.id, selectedApproval.agentName)}
                className="px-3.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 hover:bg-rose-100 font-bold text-xs cursor-pointer"
              >
                Reject Action
              </button>
              <button
                onClick={() => handleApprove(selectedApproval.id, selectedApproval.agentName)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Approve & Dispatch</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
