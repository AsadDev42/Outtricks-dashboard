import React from 'react';
import { 
  Bookmark, 
  Play, 
  Trash2, 
  Search, 
  Calendar, 
  Clock, 
  ArrowRight,
  Filter,
  Plus
} from 'lucide-react';
import { useLeadSearch } from '../../context/LeadSearchContext';

interface SavedSearchesViewProps {
  onRunSearch: () => void;
  onOpenSaveModal: () => void;
}

export const SavedSearchesView: React.FC<SavedSearchesViewProps> = ({
  onRunSearch,
  onOpenSaveModal
}) => {
  const { savedSearches, loadSavedSearch, deleteSavedSearch } = useLeadSearch();

  return (
    <div className="space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-[#2A2A2A]">
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Saved Search Presets ({savedSearches.length})</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Re-run complex 8-dimension prospecting criteria with one click.
          </p>
        </div>

        <button
          onClick={onOpenSaveModal}
          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Save Current Filters</span>
        </button>
      </div>

      {savedSearches.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
            No Saved Searches Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Configure filters in the 8D search builder and click "Save Search" to bookmark your target ICP queries.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedSearches.map((search) => (
            <div
              key={search.id}
              className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] hover:border-blue-300 dark:hover:border-blue-700/60 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                      {search.name}
                    </h3>
                    <p className="text-[10px] text-slate-400 font-sans">
                      Created {search.createdAt} • {search.resultsCount.toLocaleString()} Matches
                    </p>
                  </div>

                  <button
                    onClick={() => deleteSavedSearch(search.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                    title="Delete Saved Search"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Filter tags breakdown */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  {search.filters.roles?.map((r, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 text-[10px] font-bold">
                      {r}
                    </span>
                  ))}
                  {search.filters.seniority?.map((s, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-400 text-[10px]">
                      {s}
                    </span>
                  ))}
                  {search.filters.locations?.map((l, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-400 text-[10px]">
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-white/[0.05] flex items-center justify-end">
                <button
                  onClick={() => {
                    loadSavedSearch(search);
                    onRunSearch();
                  }}
                  className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Execute Search</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
