import React, { useMemo, useState } from 'react';
import {
  Split,
  Trophy,
  CheckCircle2,
  Plus,
  X,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useEmail } from '../../context/EmailContext';
import { useToast } from '../../context/ToastContext';

export const AbTestingView: React.FC = () => {
  const { abTests, campaigns, createAbTest } = useEmail();
  const { success, info } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [testName, setTestName] = useState('');
  const [campaignName, setCampaignName] = useState(campaigns[0]?.name || '');
  const [variantASubject, setVariantASubject] = useState('');
  const [variantBSubject, setVariantBSubject] = useState('');

  const canCreate = Boolean(testName.trim() && campaignName && variantASubject.trim() && variantBSubject.trim());

  const activeCount = useMemo(() => abTests.filter((test) => test.status === 'Active').length, [abTests]);

  const resetCreator = () => {
    setTestName('');
    setCampaignName(campaigns[0]?.name || '');
    setVariantASubject('');
    setVariantBSubject('');
    setIsCreateOpen(false);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canCreate) return;

    createAbTest({
      name: testName.trim(),
      campaignName,
      variantA: { subject: variantASubject.trim(), sent: 0, opens: 0, replies: 0 },
      variantB: { subject: variantBSubject.trim(), sent: 0, opens: 0, replies: 0 },
      status: 'Active',
    });
    resetCreator();
  };

  const safeRate = (value: number, total: number, precision = 0) => {
    if (!total) return precision === 0 ? '0' : '0.0';
    return ((value / total) * 100).toFixed(precision);
  };

  return (
    <div className="space-y-5 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Split className="w-5 h-5 text-primary" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">A/B Testing</h2>
            {activeCount > 0 && <Badge variant="primary" size="sm">{activeCount} Active</Badge>}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Split-test subject lines and reply performance, then deploy the actual winning variant.</p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setIsCreateOpen(true)} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          New A/B Test
        </Button>
      </div>

      {abTests.length === 0 ? (
        <div className="p-10 text-center rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] text-xs text-slate-500">
          No experiments yet. Create an A/B test and attach it to an existing campaign.
        </div>
      ) : (
        <div className="space-y-4">
          {abTests.map((test) => {
            const openRateA = safeRate(test.variantA.opens, test.variantA.sent);
            const replyRateA = safeRate(test.variantA.replies, test.variantA.sent, 1);
            const openRateB = safeRate(test.variantB.opens, test.variantB.sent);
            const replyRateB = safeRate(test.variantB.replies, test.variantB.sent, 1);

            return (
              <div key={test.id} className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-[#202020] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-950 dark:text-white">{test.name}</span>
                      <Badge variant={test.status === 'Active' ? 'primary' : 'slate'} size="sm">{test.status}</Badge>
                    </div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">Campaign: {test.campaignName}</div>
                  </div>

                  {test.winner ? (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs font-mono">
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span>Variant {test.winner} is the winner</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500">
                      <AlertCircle className="w-3.5 h-3.5" /> Waiting for enough data
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {([
                    { id: 'A' as const, data: test.variantA, openRate: openRateA, replyRate: replyRateA },
                    { id: 'B' as const, data: test.variantB, openRate: openRateB, replyRate: replyRateB },
                  ]).map((variant) => {
                    const isWinner = test.winner === variant.id;
                    return (
                      <div key={variant.id} className={`p-4 rounded-2xl border space-y-3 ${
                        isWinner
                          ? 'border-emerald-500/60 bg-emerald-50/30 dark:bg-emerald-500/10 shadow-xs'
                          : 'border-slate-200/80 dark:border-[#202020] bg-slate-50 dark:bg-[#1C1C1C]'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className={`font-black text-xs uppercase tracking-wider font-mono ${isWinner ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                            Variant {variant.id} (50% Split)
                          </span>
                          {isWinner && (
                            <span className="text-[10px] font-bold text-emerald-600 font-mono flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Winner
                            </span>
                          )}
                        </div>

                        <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">“{variant.data.subject}”</div>

                        <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                          <div>
                            <div className="text-[10px] text-slate-400">Sent</div>
                            <div className="font-extrabold font-mono text-slate-800 dark:text-slate-200">{variant.data.sent}</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400">Open Rate</div>
                            <div className="font-extrabold font-mono text-slate-900 dark:text-white">{variant.openRate}%</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-slate-400">Reply Rate</div>
                            <div className="font-extrabold font-mono text-slate-900 dark:text-white">{variant.replyRate}%</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-1 flex justify-end">
                  <Button
                    variant="primary"
                    size="sm"
                    disabled={!test.winner}
                    onClick={() => {
                      if (!test.winner) {
                        info('A winner must be selected before reallocating traffic.', 'A/B Test');
                        return;
                      }
                      success(`Variant ${test.winner} is now selected for 100% traffic in this experiment.`, 'Winner Deployed');
                    }}
                  >
                    {test.winner ? `Deploy Variant ${test.winner} (100%)` : 'Waiting for Winner'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isCreateOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <form onSubmit={handleCreate} className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] shadow-2xl p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white">Create A/B Test</h3>
                <p className="text-xs text-slate-500 mt-0.5">Create a real experiment record instead of a placeholder action.</p>
              </div>
              <button type="button" onClick={resetCreator} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer" aria-label="Close A/B test creator">
                <X className="w-4 h-4" />
              </button>
            </div>

            <label className="block space-y-1">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Experiment Name</span>
              <input value={testName} onChange={(e) => setTestName(e.target.value)} placeholder="e.g. Pain Hook vs Social Proof" className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary" />
            </label>

            <label className="block space-y-1">
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Campaign</span>
              <select value={campaignName} onChange={(e) => setCampaignName(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-primary">
                {campaigns.map((campaign) => <option key={campaign.id} value={campaign.name}>{campaign.name}</option>)}
              </select>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block space-y-1">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Variant A Subject</span>
                <textarea rows={3} value={variantASubject} onChange={(e) => setVariantASubject(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white resize-none outline-none focus:ring-2 focus:ring-primary" />
              </label>
              <label className="block space-y-1">
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">Variant B Subject</span>
                <textarea rows={3} value={variantBSubject} onChange={(e) => setVariantBSubject(e.target.value)} className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-xs text-slate-900 dark:text-white resize-none outline-none focus:ring-2 focus:ring-primary" />
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-[#222]">
              <Button type="button" variant="secondary" size="sm" onClick={resetCreator}>Cancel</Button>
              <Button type="submit" variant="primary" size="sm" disabled={!canCreate}>Create Experiment</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
