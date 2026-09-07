import React from 'react';
import { 
  Split, 
  Trophy, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useEmail } from '../../context/EmailContext';
import { useToast } from '../../context/ToastContext';

export const AbTestingView: React.FC = () => {
  const { abTests } = useEmail();
  const { success } = useToast();

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Split className="w-5 h-5 text-emerald-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              A/B Testing Experiments
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Statistical split-testing on subject lines, value propositions, and CTA hooks with 95% confidence intervals.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => success('A/B Test creator opened.', 'A/B Test')} leftIcon={<Plus className="w-3.5 h-3.5" />}>
          New A/B Test
        </Button>
      </div>

      {/* Active Tests */}
      <div className="space-y-4">
        {abTests.map((test) => {
          const openRateA = Math.round((test.variantA.opens / test.variantA.sent) * 100);
          const replyRateA = ((test.variantA.replies / test.variantA.sent) * 100).toFixed(1);

          const openRateB = Math.round((test.variantB.opens / test.variantB.sent) * 100);
          const replyRateB = ((test.variantB.replies / test.variantB.sent) * 100).toFixed(1);

          return (
            <div
              key={test.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-[#202020] pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-slate-950 dark:text-white">
                      {test.name}
                    </span>
                    <Badge variant={test.status === 'Active' ? 'emerald' : 'slate'} size="sm">
                      {test.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    Campaign: {test.campaignName}
                  </div>
                </div>

                {test.winner && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs font-mono">
                    <Trophy className="w-3.5 h-3.5 text-amber-500" />
                    <span>Variant {test.winner} Won (+2.8% Reply Lift)</span>
                  </div>
                )}
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Variant A */}
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  test.winner === 'A'
                    ? 'border-emerald-500/60 bg-emerald-50/30 dark:bg-emerald-500/10 shadow-xs'
                    : 'border-slate-200/80 dark:border-[#202020] bg-slate-50 dark:bg-[#1C1C1C]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                      Variant A (50% Split)
                    </span>
                    {test.winner === 'A' && (
                      <span className="text-[10px] font-bold text-emerald-600 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Winner
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                    "{test.variantA.subject}"
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                    <div>
                      <div className="text-[10px] text-slate-400">Sent</div>
                      <div className="font-extrabold font-mono text-slate-800 dark:text-slate-200">{test.variantA.sent}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Open Rate</div>
                      <div className="font-extrabold font-mono text-emerald-600">{openRateA}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Reply Rate</div>
                      <div className="font-extrabold font-mono text-emerald-600">{replyRateA}%</div>
                    </div>
                  </div>
                </div>

                {/* Variant B */}
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  test.winner === 'B'
                    ? 'border-emerald-500/60 bg-emerald-50/30 dark:bg-emerald-500/10 shadow-xs'
                    : 'border-slate-200/80 dark:border-[#202020] bg-slate-50 dark:bg-[#1C1C1C]'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                      Variant B (50% Split)
                    </span>
                    {test.winner === 'B' && (
                      <span className="text-[10px] font-bold text-emerald-600 font-mono flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Winner
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-bold text-slate-900 dark:text-white font-mono">
                    "{test.variantB.subject}"
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs pt-1">
                    <div>
                      <div className="text-[10px] text-slate-400">Sent</div>
                      <div className="font-extrabold font-mono text-slate-800 dark:text-slate-200">{test.variantB.sent}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Open Rate</div>
                      <div className="font-extrabold font-mono text-emerald-600">{openRateB}%</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400">Reply Rate</div>
                      <div className="font-extrabold font-mono text-emerald-600">{replyRateB}%</div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2 flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => success('Applied 100% traffic allocation to Variant A.', 'Winner Deployed')}
                >
                  Deploy Winning Variant (100% Traffic)
                </Button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
