import React, { useState } from 'react';
import { 
  Building2, 
  DollarSign, 
  User, 
  PhoneCall, 
  Mail, 
  Linkedin, 
  Plus, 
  ArrowRight, 
  CheckCircle2, 
  MoreHorizontal, 
  X,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Trash2
} from 'lucide-react';
import { Deal } from '../types';

const INITIAL_DEALS: Deal[] = [
  { id: '1', company: 'HyperScale AI', contactName: 'Alex Rivera', value: 14500, stage: 'qualified', lastTouch: 'Email Reply Received', probability: 35 },
  { id: '2', name: 'CloudPeak Inc', company: 'CloudPeak Inc', contactName: 'Jessica Wu', value: 28000, stage: 'discovery', lastTouch: 'Voice AI SDR Call (+0.94 Intent)', probability: 55 },
  { id: '3', company: 'FinPulse Systems', contactName: 'Mark Thompson', value: 42000, stage: 'demo', lastTouch: 'Demo Booked (Google Cal)', probability: 75 },
  { id: '4', company: 'TalentForge Labs', contactName: 'Chloe Bennett', value: 19500, stage: 'proposal', lastTouch: 'Contract Review SLA', probability: 90 },
  { id: '5', company: 'Nexus Global Logistics', contactName: 'David Sterling', value: 65000, stage: 'won', lastTouch: 'Stripe Subscription Active', probability: 100 }
];

const STAGES: { key: Deal['stage']; label: string; color: string }[] = [
  { key: 'qualified', label: 'Qualified Lead', color: 'bg-blue-500' },
  { key: 'discovery', label: 'Discovery Scheduled', color: 'bg-blue-500' },
  { key: 'demo', label: 'Demo Completed', color: 'bg-blue-500' },
  { key: 'proposal', label: 'Proposal & Review', color: 'bg-amber-500' },
  { key: 'won', label: 'Closed Won', color: 'bg-emerald-500' }
];

export const DealPipelineKanban: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [isAddingDeal, setIsAddingDeal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Deal Form State
  const [newDeal, setNewDeal] = useState({
    company: '',
    contactName: '',
    value: 15000,
    stage: 'qualified' as Deal['stage']
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const moveDealStage = (id: string, direction: 'next' | 'prev') => {
    const stageKeys: Deal['stage'][] = ['qualified', 'discovery', 'demo', 'proposal', 'won'];
    setDeals(deals.map(deal => {
      if (deal.id === id) {
        const currentIndex = stageKeys.indexOf(deal.stage);
        const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
        if (newIndex >= 0 && newIndex < stageKeys.length) {
          const newStage = stageKeys[newIndex];
          const newProb = newStage === 'qualified' ? 35 : newStage === 'discovery' ? 55 : newStage === 'demo' ? 75 : newStage === 'proposal' ? 90 : 100;
          showToast(`Moved ${deal.company} to ${newStage.toUpperCase()}`);
          return { ...deal, stage: newStage, probability: newProb };
        }
      }
      return deal;
    }));
  };

  const handleDeleteDeal = (id: string) => {
    setDeals(deals.filter(d => d.id !== id));
    setSelectedDeal(null);
    showToast('Deal removed from pipeline');
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeal.company || !newDeal.contactName) return;

    const prob = newDeal.stage === 'qualified' ? 35 : newDeal.stage === 'discovery' ? 55 : newDeal.stage === 'demo' ? 75 : newDeal.stage === 'proposal' ? 90 : 100;
    const created: Deal = {
      id: `deal-${Date.now()}`,
      company: newDeal.company,
      contactName: newDeal.contactName,
      value: Number(newDeal.value) || 10000,
      stage: newDeal.stage,
      lastTouch: 'Manual CRM Entry',
      probability: prob
    };

    setDeals([...deals, created]);
    setNewDeal({ company: '', contactName: '', value: 15000, stage: 'qualified' });
    setIsAddingDeal(false);
    showToast(`Added ${created.company} ($${created.value.toLocaleString()}) to Pipeline`);
  };

  // Calculations
  const totalPipelineValue = deals.reduce((sum, d) => sum + d.value, 0);
  const weightedPipeline = deals.reduce((sum, d) => sum + (d.value * (d.probability ?? 50) / 100), 0);

  return (
    <div className="bg-white dark:bg-[#0b101f] rounded-3xl border border-slate-200/80 dark:border-[#2A2A2A] shadow-xl shadow-slate-900/5 overflow-hidden relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-4 right-4 z-50 px-4 py-2 rounded-xl bg-slate-950 dark:bg-[#131d35] text-white dark:text-slate-100 text-xs font-sans font-bold shadow-2xl border border-slate-800 dark:border-[#2A2A2A] animate-in fade-in slide-in-from-top-2 duration-150">
          ✓ {toastMessage}
        </div>
      )}

      {/* Header Bar */}
      <div className="p-6 border-b border-slate-100 dark:border-white/[0.07] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-[#0b101f]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Native PostgreSQL CRM
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Live Deals Pipeline & Weighted Forecasting
          </h3>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-[#131d35] border border-slate-200 dark:border-[#2A2A2A] px-3.5 py-1.5 rounded-2xl text-xs font-sans">
            <span className="text-slate-500 dark:text-slate-400">Pipeline: <strong className="text-slate-900 dark:text-white">${totalPipelineValue.toLocaleString()}</strong></span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
            <span className="text-slate-500 dark:text-slate-400">Weighted: <strong className="text-emerald-600 dark:text-emerald-400">${Math.round(weightedPipeline).toLocaleString()}</strong></span>
          </div>

          <button
            onClick={() => setIsAddingDeal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Deal</span>
          </button>
        </div>
      </div>

      {/* Add Deal Modal */}
      {isAddingDeal && (
        <div className="p-6 bg-blue-50/70 dark:bg-[#0e1526] border-y border-blue-100 dark:border-white/[0.07] animate-in fade-in duration-150">
          <form onSubmit={handleCreateDeal} className="max-w-3xl mx-auto space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Add Deal to CRM</span>
              </h4>
              <button 
                type="button" 
                onClick={() => setIsAddingDeal(false)}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input 
                type="text" required placeholder="Company Name"
                value={newDeal.company} onChange={(e) => setNewDeal({...newDeal, company: e.target.value})}
                className="px-3 py-2 rounded-xl bg-white dark:bg-[#131d35] border border-slate-200 dark:border-[#2A2A2A] text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <input 
                type="text" required placeholder="Contact Person"
                value={newDeal.contactName} onChange={(e) => setNewDeal({...newDeal, contactName: e.target.value})}
                className="px-3 py-2 rounded-xl bg-white dark:bg-[#131d35] border border-slate-200 dark:border-[#2A2A2A] text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <input 
                type="number" required placeholder="Deal Value ($)"
                value={newDeal.value} onChange={(e) => setNewDeal({...newDeal, value: Number(e.target.value)})}
                className="px-3 py-2 rounded-xl bg-white dark:bg-[#131d35] border border-slate-200 dark:border-[#2A2A2A] text-xs outline-none focus:border-blue-500 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <select
                value={newDeal.stage}
                onChange={(e) => setNewDeal({...newDeal, stage: e.target.value as Deal['stage']})}
                className="px-3 py-2 rounded-xl bg-white dark:bg-[#131d35] border border-slate-200 dark:border-[#2A2A2A] text-xs outline-none focus:border-blue-500 font-semibold text-slate-900 dark:text-white"
              >
                <option value="qualified" className="bg-white dark:bg-[#131d35]">Qualified Lead</option>
                <option value="discovery" className="bg-white dark:bg-[#131d35]">Discovery Scheduled</option>
                <option value="demo" className="bg-white dark:bg-[#131d35]">Demo Completed</option>
                <option value="proposal" className="bg-white dark:bg-[#131d35]">Proposal Review</option>
                <option value="won" className="bg-white dark:bg-[#131d35]">Closed Won</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Insert Deal Into Pipeline
            </button>
          </form>
        </div>
      )}

      {/* Kanban Board Swimlane Columns */}
      <div className="p-6 pt-4 overflow-x-auto kanban-scrollbar w-full max-w-full min-w-0">
        <div className="grid grid-cols-5 min-w-[960px] divide-x divide-slate-200/70 dark:divide-white/[0.07] pr-4">
          {STAGES.map((stage, idx) => {
            const stageDeals = deals.filter((d) => d.stage === stage.key);
            const stageTotal = stageDeals.reduce((sum, d) => sum + d.value, 0);

            return (
              <div 
                key={stage.key} 
                className={`flex flex-col space-y-3 ${
                  idx === 0 ? 'pr-3.5' : idx === 4 ? 'pl-3.5' : 'px-3.5'
                }`}
              >
                {/* Column Header */}
                <div className="space-y-1 pb-2 border-b border-slate-100 dark:border-[#202020]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`w-2 h-2 rounded-full ${stage.color} shrink-0`}></span>
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">{stage.label}</span>
                    </div>
                    <span className="text-[10px] font-sans font-extrabold bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full shrink-0">
                      {stageDeals.length}
                    </span>
                  </div>

                  <div className="text-[10.5px] font-sans font-medium text-slate-400">
                    ${stageTotal.toLocaleString()} total
                  </div>
                </div>

                {/* Deals in Stage */}
                <div className="space-y-2.5">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      onClick={() => setSelectedDeal(deal)}
                      className="bg-white dark:bg-[#131d35] p-3.5 rounded-2xl border border-slate-200/90 dark:border-[#2A2A2A] shadow-2xs hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500/40 transition-all cursor-pointer space-y-2.5 group"
                    >
                      <div className="flex justify-between items-start">
                        <h5 className="font-bold text-xs text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {deal.company}
                        </h5>
                        <span className="font-sans text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                          ${deal.value.toLocaleString()}
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{deal.contactName}</span>
                      </div>

                      <div className="text-[10px] font-sans text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/[0.03] px-2 py-1 rounded-lg flex items-center justify-between">
                        <span className="truncate">{deal.lastTouch}</span>
                      </div>

                      {/* Stage Mover Arrows */}
                      <div className="flex items-center justify-between pt-1.5 border-t border-slate-100 dark:border-[#202020]" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => moveDealStage(deal.id, 'prev')}
                          disabled={deal.stage === 'qualified'}
                          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer transition-colors"
                          title="Move to previous stage"
                        >
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        
                        <span className="text-[9.5px] font-sans text-slate-400 font-bold">{deal.probability}% win</span>

                        <button
                          onClick={() => moveDealStage(deal.id, 'next')}
                          disabled={deal.stage === 'won'}
                          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.08] text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-20 cursor-pointer transition-colors"
                          title="Move to next stage"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {stageDeals.length === 0 && (
                    <div className="py-4 text-center text-[10px] text-slate-400 font-sans border border-dashed border-slate-200/80 dark:border-[#202020] rounded-2xl">
                      No active deals
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deal Detail Drawer Modal */}
      {selectedDeal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white dark:bg-[#0b101f] rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-[#2A2A2A] shadow-2xl space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-sans font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-white/[0.04] px-2 py-0.5 rounded uppercase">
                  {String(selectedDeal.stage).toUpperCase()} • {selectedDeal.probability ?? 50}% WIN PROBABILITY
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">{selectedDeal.company}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Contact: {selectedDeal.contactName}</p>
              </div>
              <button 
                onClick={() => setSelectedDeal(null)} 
                className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-[#131d35] text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-[#131d35] rounded-2xl border border-slate-100 dark:border-[#202020] flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Contract ARR Value</span>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-sans">
                  ${selectedDeal.value.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2">
                <span className="font-sans font-bold text-slate-400 uppercase text-[10px]">Real-Time Cross-Channel Touchpoints</span>
                <div className="p-3 bg-slate-50 dark:bg-[#131d35] rounded-xl border border-slate-100 dark:border-[#202020] space-y-2">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-blue-500" /> Cold Email Sequence</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Opened & Replied</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5 text-blue-500" /> Voice AI SDR</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold">4m 12s Call (Positive)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1.5"><Linkedin className="w-3.5 h-3.5 text-sky-500" /> LinkedIn Touch</span>
                    <span className="text-slate-400">Profile Viewed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-white/[0.07]">
              <button
                onClick={() => handleDeleteDeal(selectedDeal.id)}
                className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Deal</span>
              </button>

              <button
                onClick={() => setSelectedDeal(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-[#222222] hover:bg-slate-800 dark:hover:bg-[#1e2c50] text-white font-bold text-xs border border-transparent dark:border-[#2A2A2A] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
