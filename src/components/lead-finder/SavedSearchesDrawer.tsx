import React, { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useLeadSearch, SavedSearch, SearchHistoryItem } from '../../context/LeadSearchContext';
import { 
  Bookmark, 
  Clock, 
  Trash2, 
  ArrowRight, 
  Search, 
  RotateCcw,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';

export interface SavedSearchesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedSearchesDrawer: React.FC<SavedSearchesDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'history'>('saved');
  const { 
    savedSearches, 
    searchHistory, 
    loadSavedSearch, 
    deleteSavedSearch, 
    clearHistory 
  } = useLeadSearch();

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <Bookmark className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span className="font-extrabold text-base text-slate-950 dark:text-white">
            Saved Searches & History
          </span>
        </div>
      }
      size="md"
      placement="right"
    >
      <div className="space-y-4 font-sans">
        
        {/* Tab Toggle */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-[#1C1C1C] rounded-2xl border border-slate-200/80 dark:border-[#202020]">
          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              activeTab === 'saved'
                ? 'bg-white dark:bg-[#161616] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ICP Presets ({savedSearches.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-white dark:bg-[#161616] text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Search History ({searchHistory.length})</span>
          </button>
        </div>

        {/* Tab 1: Saved Searches */}
        {activeTab === 'saved' && (
          <div className="space-y-3">
            {savedSearches.length === 0 ? (
              <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 dark:border-[#2A2A2A] rounded-3xl">
                <Bookmark className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  No Saved Search Presets Yet
                </div>
                <div className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Apply any 8D filters on the database and click "Save Search Preset" to recall it anytime.
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                {savedSearches.map((saved) => (
                  <div
                    key={saved.id}
                    className="p-4 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-2xs space-y-3 hover:border-blue-300 dark:hover:border-blue-900 transition-all group"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="font-extrabold text-xs sm:text-sm text-slate-950 dark:text-white truncate">
                          {saved.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Saved on {new Date(saved.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <Badge variant="blue" size="sm">
                        {saved.resultsCount.toLocaleString()} Matches
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-[#202020]">
                      <button
                        type="button"
                        onClick={() => deleteSavedSearch(saved.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40"
                        title="Delete preset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          loadSavedSearch(saved);
                          onClose();
                        }}
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        Run Search
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Search History */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            {searchHistory.length > 0 && (
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Recent Inquiries</span>
                <button
                  type="button"
                  onClick={clearHistory}
                  className="text-xs text-rose-600 dark:text-rose-400 font-bold hover:underline cursor-pointer"
                >
                  Clear History
                </button>
              </div>
            )}

            {searchHistory.length === 0 ? (
              <div className="p-8 text-center space-y-2 border border-dashed border-slate-200 dark:border-[#2A2A2A] rounded-3xl">
                <Clock className="w-8 h-8 text-slate-300 dark:text-slate-700 mx-auto" />
                <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  No Search History Recorded
                </div>
                <div className="text-[11px] text-slate-400 max-w-xs mx-auto">
                  Your search executions and query inquiries will appear here automatically.
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                {searchHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 dark:text-white truncate">
                        {item.querySummary}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {item.timestamp} • {item.resultsCount} matches
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        loadSavedSearch({
                          id: item.id,
                          name: item.querySummary,
                          filters: item.filters,
                          createdAt: item.timestamp,
                          resultsCount: item.resultsCount,
                        });
                        onClose();
                      }}
                      leftIcon={<RotateCcw className="w-3 h-3" />}
                    >
                      Re-run
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </Drawer>
  );
};
