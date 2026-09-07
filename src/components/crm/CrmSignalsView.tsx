import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  Filter, 
  RotateCcw, 
  Bell, 
  Sliders, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ExternalLink, 
  ArrowRight,
  TrendingUp,
  Globe,
  Building2,
  User,
  X,
  Sparkles
} from 'lucide-react';
import { useCrm, CrmSignal } from '../../context/CrmContext';
import { Button } from '../ui/Button';

export const CrmSignalsView: React.FC = () => {
  const { signals, updateSignalStatus, createSignalAlert, setActiveTab } = useCrm();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);

  // Alert Form State
  const [alertName, setAlertName] = useState('');
  const [alertType, setAlertType] = useState('Website Intent');
  const [alertPriority, setAlertPriority] = useState('High');

  const highPriorityCount = signals.filter(s => s.priority === 'High').length;
  const newSignalsCount = signals.filter(s => s.status === 'New').length;

  const filteredSignals = signals.filter(s => {
    if (priorityFilter !== 'all' && s.priority !== priorityFilter) return false;
    if (typeFilter !== 'all' && s.type !== typeFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.title.toLowerCase().includes(q) ||
      s.entityName.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.source.toLowerCase().includes(q)
    );
  });

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertName.trim()) return;

    createSignalAlert({
      name: alertName,
      type: alertType,
      priority: alertPriority,
    });

    setIsAlertModalOpen(false);
    setAlertName('');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header with Page Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
              SIGNALS
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              AI Sentinel Active
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            MONITOR BUYING SIGNALS, ENGAGEMENT CHANGES, AND IMPORTANT EVENTS ACROSS YOUR LEADS, CONTACTS, COMPANIES, AND DEALS.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsConfigModalOpen(true)}
            className="text-xs font-semibold gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Configure Signals</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAlertModalOpen(true)}
            className="text-xs font-bold gap-1.5 shadow-sm shadow-emerald-500/20"
          >
            <Bell className="w-4 h-4" />
            <span>Create Alert</span>
          </Button>
        </div>
      </div>

      {/* 2. Top Summary Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Total Signals</span>
            <Zap className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            {signals.length}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Continuous discovery</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>High Priority</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-black text-red-600 dark:text-red-400 font-mono">
            {highPriorityCount}
          </div>
          <div className="text-[11px] text-red-600 dark:text-red-400 font-bold">Immediate sales action</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>New Today</span>
            <Clock className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {newSignalsCount}
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Detected in last 24h</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase">
            <span>Action Required</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
            3
          </div>
          <div className="text-[11px] text-slate-400">Recommended next steps</div>
        </div>

      </div>

      {/* 3. Search & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search signals by prospect, company, title, or source..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          >
            <option value="all">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-700 dark:text-slate-200 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
          >
            <option value="all">All Types</option>
            <option value="Website Intent">Website Intent</option>
            <option value="Email Engagement">Email Engagement</option>
            <option value="Job Change">Job Change</option>
            <option value="Funding">Funding</option>
          </select>
        </div>
      </div>

      {/* 4. Signals Feed List */}
      <div className="space-y-3">
        {filteredSignals.map((sig) => {
          const isHigh = sig.priority === 'High';
          const isNew = sig.status === 'New';

          return (
            <div
              key={sig.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                      isHigh 
                        ? 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/40' 
                        : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                    }`}>
                      {sig.priority} PRIORITY
                    </span>

                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300">
                      {sig.type}
                    </span>

                    <span className="text-[11px] text-slate-400">
                      Detected {sig.detectedAt} via <strong className="text-slate-600 dark:text-slate-300 font-semibold">{sig.source}</strong>
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {sig.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Target: {sig.entityName}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isNew ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateSignalStatus(sig.id, 'Actioned')}
                      className="text-xs font-semibold"
                    >
                      Mark Actioned
                    </Button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Actioned
                    </span>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-100 dark:border-[#202020]">
                {sig.description}
              </p>

              <div className="flex items-center justify-between pt-1 text-xs">
                <div className="text-[11px] text-slate-500 font-medium">
                  <strong>Recommended:</strong> {sig.recommendedAction}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('deals')}
                  className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0 ml-2"
                >
                  <span>Open Deal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 5. Create Alert Modal */}
      {isAlertModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateAlert}
            className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Create Signal Alert Rule
              </h2>
              <button
                type="button"
                onClick={() => setIsAlertModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Rule Name</label>
                <input
                  type="text"
                  required
                  value={alertName}
                  onChange={(e) => setAlertName(e.target.value)}
                  placeholder="e.g. Enterprise Website Surge Alert"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Signal Trigger</label>
                <select
                  value={alertType}
                  onChange={(e) => setAlertType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                >
                  <option value="Website Intent">Website Intent (Multiple visits in 24h)</option>
                  <option value="Email Engagement">Email Engagement (Link clicked 3+ times)</option>
                  <option value="Funding">Funding Event ($10M+ Raised)</option>
                  <option value="Job Change">Executive Title Change</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Notification Priority</label>
                <select
                  value={alertPriority}
                  onChange={(e) => setAlertPriority(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                >
                  <option value="High">High (Immediate Slack + In-App)</option>
                  <option value="Medium">Medium (Daily Digest)</option>
                  <option value="Low">Low (Log only)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAlertModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Save Alert Rule
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* 6. Configure Signals Modal */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Signal Sentinel Configuration
              </h2>
              <button
                type="button"
                onClick={() => setIsConfigModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Web Visitor Intent Sentinel</div>
                  <div className="text-[11px] text-slate-400">Reverse-IP domain identification on pricing pages</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">Mailbox Engagement Sentinel</div>
                  <div className="text-[11px] text-slate-400">Real-time open & click velocity tracking</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white">LinkedIn Executive Activity Tracker</div>
                  <div className="text-[11px] text-slate-400">Promotions, hiring announcements & job switches</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-[#202020]">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsConfigModalOpen(false)}
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
