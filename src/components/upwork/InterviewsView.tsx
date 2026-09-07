import React from 'react';
import { Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useUpwork } from '../../context/UpworkContext';

export const InterviewsView: React.FC = () => {
  const { interviews } = useUpwork();

  return (
    <div className="space-y-4 font-sans">
      <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-500" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Active Client Interviews ({interviews.length})
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          Scheduled technical briefings, discovery chats, and proposal contract negotiations.
        </p>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs text-xs">
        {interviews.map((int) => (
          <div key={int.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img src={int.clientAvatar} alt={int.clientName} className="w-10 h-10 rounded-2xl object-cover" />
              <div className="min-w-0">
                <div className="font-extrabold text-sm text-slate-900 dark:text-white truncate">{int.jobTitle}</div>
                <div className="text-[11px] text-slate-500">{int.clientName} • Time: <span className="font-bold text-blue-600 dark:text-blue-400">{int.scheduledTime}</span></div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">Next Step: {int.nextAction}</div>
              </div>
            </div>

            <Button variant="primary" size="sm" leftIcon={<MessageSquare className="w-3.5 h-3.5" />}>
              Open Chat Room
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
