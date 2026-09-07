import React from 'react';
import { User, Star, ShieldCheck, Award, CheckCircle2, DollarSign } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { useUpwork } from '../../context/UpworkContext';

export const UpworkProfileView: React.FC = () => {
  const { accounts } = useUpwork();
  const profile = accounts[0];

  return (
    <div className="space-y-6 font-sans">
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-sm shrink-0" />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">{profile.name}</h2>
              <Badge variant="emerald" size="sm">{profile.topRatedBadge}</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{profile.title}</p>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-600 dark:text-slate-400 mt-1">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">JSS: {profile.jss}% (100% Score)</span>
              <span>•</span>
              <span>Rate: {profile.hourlyRate}</span>
              <span>•</span>
              <span>{profile.totalEarnings}</span>
            </div>
          </div>
        </div>

        <div className="p-3 px-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-right font-mono text-xs">
          <div className="text-[10px] text-slate-400">Availability</div>
          <div className="font-bold text-slate-900 dark:text-white">More than 30 hrs/week</div>
          <div className="text-[10px] text-emerald-500 font-bold">Open to Offers</div>
        </div>
      </div>
    </div>
  );
};
