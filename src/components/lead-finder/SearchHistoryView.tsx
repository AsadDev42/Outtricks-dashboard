import React from 'react';
import { 
  Clock, 
  Search, 
  ArrowRight, 
  Play, 
  RotateCcw,
  Users
} from 'lucide-react';
import { useLeadSearch } from '../../context/LeadSearchContext';

interface SearchHistoryViewProps {
  onRunSearch: () => void;
}

export const SearchHistoryView: React.FC<SearchHistoryViewProps> = ({
  onRunSearch
}) => {
  const { searchHistory, loadSavedSearch } = useLeadSearch();

  return (
    <div className="space-y-4 font-sans">
      <div className="pb-2 border-b border-slate-200 dark:border-[#2A2A2A]">
        <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Search History & Execution Log ({searchHistory.length})</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Chronological query log of database searches executed within your workspace.
        </p>
      </div>

      <div className="space-y-2.5">
        {searchHistory.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              loadSavedSearch({
                id: item.id,
                name: item.querySummary,
                filters: item.filters,
                createdAt: item.timestamp,
                resultsCount: item.resultsCount
              });
              onRunSearch();
            }}
            className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-blue-300 dark:hover:border-blue-700/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <div>
                <div className="font-extrabold text-slate-900 dark:text-white">
                  {item.querySummary}
                </div>
                <div className="text-[10px] text-slate-400 font-sans">
                  Executed {item.timestamp} • {item.resultsCount.toLocaleString()} Matches
                </div>
              </div>
            </div>

            <button className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-[#181818] hover:bg-blue-600 hover:text-white text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 self-end sm:self-auto cursor-pointer">
              <Play className="w-3 h-3 fill-current" />
              <span>Re-run Query</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
