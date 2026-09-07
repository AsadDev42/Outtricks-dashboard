import React from 'react';
import { DollarSign, ArrowUpRight, ShieldCheck, Download } from 'lucide-react';
import { Button } from '../ui/Button';
import { useUpwork } from '../../context/UpworkContext';

export const EarningsView: React.FC = () => {
  const { contracts } = useUpwork();
  const totalEarned = contracts.reduce((acc, c) => acc + c.totalEarned, 0);

  return (
    <div className="space-y-6 font-sans">
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-emerald-500" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Financial Ledger & Escrow Releases
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Weekly payouts, in-review milestones, and historical earnings reconciled across Upwork Escrow.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">Available for Withdrawal</div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">$18,400.00</div>
          <div className="text-[10px] text-emerald-500 font-bold">Ready to wire</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">Pending in Escrow / Review</div>
          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">$12,500.00</div>
          <div className="text-[10px] text-slate-400">Releasing this Friday</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
          <div className="text-[10px] text-slate-400 uppercase">Lifetime Total Earned</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">${totalEarned.toLocaleString()}.00</div>
          <div className="text-[10px] text-slate-400">100% Top Rated Plus</div>
        </div>
      </div>
    </div>
  );
};
