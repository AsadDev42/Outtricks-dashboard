import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  Check, 
  Mail, 
  Linkedin, 
  PhoneCall, 
  CheckSquare, 
  Square, 
  RotateCcw,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { useMasterInbox } from '../../context/MasterInboxContext';
import { useEmail } from '../../context/EmailContext';
import { useLinkedIn } from '../../context/LinkedInContext';
import { useVoiceAi } from '../../context/VoiceAiContext';

export interface InboxFilterPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InboxFilterPopover: React.FC<InboxFilterPopoverProps> = ({
  isOpen,
  onClose,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    conversations,
    filterChannel,
    setFilterChannel,
    filterLabel,
    setFilterLabel,
    selectedAccountIds,
    setSelectedAccountIds,
    toggleAccountId,
    clearAccountIds,
    resetFilters,
  } = useMasterInbox();

  const { mailboxes } = useEmail();
  const { accounts: linkedInAccounts } = useLinkedIn();
  const { phoneNumbers } = useVoiceAi();

  const [accountSearch, setAccountSearch] = useState('');

  // Close on outside click or Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Focus search input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setAccountSearch('');
    }
  }, [isOpen]);

  // Dynamic real counts for every account ID in current active conversation pool
  const conversationCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    conversations.forEach((c) => {
      if (c.accountId && !c.archived) {
        counts[c.accountId] = (counts[c.accountId] || 0) + 1;
      }
    });
    return counts;
  }, [conversations]);

  // Filter email mailboxes
  const filteredMailboxes = useMemo(() => {
    if (!accountSearch.trim()) return mailboxes;
    const q = accountSearch.toLowerCase().trim();
    return mailboxes.filter(
      (m) =>
        m.email.toLowerCase().includes(q) ||
        (m.senderName && m.senderName.toLowerCase().includes(q)) ||
        m.provider.toLowerCase().includes(q)
    );
  }, [mailboxes, accountSearch]);

  // Filter LinkedIn accounts
  const filteredLinkedInAccounts = useMemo(() => {
    if (!accountSearch.trim()) return linkedInAccounts;
    const q = accountSearch.toLowerCase().trim();
    return linkedInAccounts.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        (a.title && a.title.toLowerCase().includes(q)) ||
        q.includes('linkedin')
    );
  }, [linkedInAccounts, accountSearch]);

  // Filter Voice phone numbers / lines
  const filteredPhoneNumbers = useMemo(() => {
    if (!phoneNumbers) return [];
    if (!accountSearch.trim()) return phoneNumbers;
    const q = accountSearch.toLowerCase().trim();
    return phoneNumbers.filter(
      (p) =>
        p.number.toLowerCase().includes(q) ||
        (p.assignedAgent && p.assignedAgent.toLowerCase().includes(q)) ||
        (p.campaign && p.campaign.toLowerCase().includes(q)) ||
        q.includes('voice') ||
        q.includes('call')
    );
  }, [phoneNumbers, accountSearch]);

  if (!isOpen) return null;

  // Bulk select / clear helpers for email
  const handleSelectAllEmail = () => {
    const emailIds = filteredMailboxes.map((m) => m.id);
    setSelectedAccountIds(Array.from(new Set([...selectedAccountIds, ...emailIds])));
  };

  const handleClearEmail = () => {
    const emailIds = new Set(mailboxes.map((m) => m.id));
    setSelectedAccountIds(selectedAccountIds.filter((id) => !emailIds.has(id)));
  };

  // Bulk select / clear helpers for LinkedIn
  const handleSelectAllLinkedIn = () => {
    const liIds = filteredLinkedInAccounts.map((a) => a.id);
    setSelectedAccountIds(Array.from(new Set([...selectedAccountIds, ...liIds])));
  };

  const handleClearLinkedIn = () => {
    const liIds = new Set(linkedInAccounts.map((a) => a.id));
    setSelectedAccountIds(selectedAccountIds.filter((id) => !liIds.has(id)));
  };

  // Isolate a single account
  const handleIsolateAccount = (accId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedAccountIds([accId]);
  };

  const activeFiltersCount =
    selectedAccountIds.length +
    (filterChannel !== 'all' ? 1 : 0) +
    (filterLabel !== 'all' ? 1 : 0);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'optimal':
      case 'connected':
        return 'bg-emerald-500';
      case 'warming':
      case 'warning':
        return 'bg-amber-500';
      default:
        return 'bg-rose-500';
    }
  };

  return (
    <div
      ref={popoverRef}
      className="absolute top-full left-0 mt-2 w-[calc(100vw-2.5rem)] sm:w-[420px] max-w-[440px] z-50 bg-white dark:bg-[#161616] border border-slate-200/90 dark:border-[#262626] rounded-2xl shadow-2xl overflow-hidden font-sans animate-in fade-in zoom-in-95 duration-150"
      style={{ filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.25))' }}
      role="dialog"
      aria-label="Filter conversations by accounts and channels"
    >
      {/* 1. Header */}
      <div className="flex items-center justify-between px-3.5 py-3 border-b border-slate-200/80 dark:border-[#242424] bg-slate-50/70 dark:bg-[#1A1A1A]/70">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-xs text-slate-900 dark:text-white">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-blue-600 text-white">
                  {activeFiltersCount} active
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400">
              Isolate mailboxes, LinkedIn profiles & channels
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 space-y-3.5 max-h-[calc(100vh-14rem)] sm:max-h-[520px] overflow-y-auto custom-scrollbar">
        {/* 2. Search Accounts Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search email, name, provider, profile..."
            value={accountSearch}
            onChange={(e) => setAccountSearch(e.target.value)}
            className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-50 dark:bg-[#202020] border border-slate-200/80 dark:border-[#282828] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {accountSearch && (
            <button
              type="button"
              onClick={() => setAccountSearch('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 3. Communication Channel Selector */}
        <div>
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 flex items-center justify-between">
            <span>Channel</span>
            {filterChannel !== 'all' && (
              <button
                type="button"
                onClick={() => setFilterChannel('all')}
                className="text-blue-500 hover:underline normal-case text-[10px] cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'all', label: 'All', icon: Sparkles },
              { id: 'email', label: 'Email', icon: Mail },
              { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
              { id: 'voice', label: 'Calls', icon: PhoneCall },
            ].map((ch) => {
              const active = filterChannel === ch.id;
              const Icon = ch.icon;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setFilterChannel(ch.id)}
                  className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-[11px] font-semibold border transition-all cursor-pointer ${
                    active
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-slate-50 dark:bg-white/[0.04] border-slate-200/80 dark:border-[#262626] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/[0.08]'
                  }`}
                >
                  <Icon className="w-3 h-3 shrink-0" />
                  <span>{ch.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. EMAIL ACCOUNTS SECTION */}
        {filteredMailboxes.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-blue-500" />
                <span>Email Accounts ({filteredMailboxes.length})</span>
              </span>
              <div className="flex items-center gap-2 normal-case font-medium">
                <button
                  type="button"
                  onClick={handleSelectAllEmail}
                  className="text-blue-500 hover:underline cursor-pointer text-[10px]"
                >
                  Select All
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={handleClearEmail}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer text-[10px]"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Scrollable list of mailboxes */}
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1 border border-slate-200/70 dark:border-[#242424] rounded-xl p-1.5 bg-slate-50/40 dark:bg-[#141414]/40 custom-scrollbar">
              {filteredMailboxes.map((mb) => {
                const isChecked = selectedAccountIds.includes(mb.id);
                const count = conversationCounts[mb.id] || 0;

                return (
                  <div
                    key={mb.id}
                    onClick={() => toggleAccountId(mb.id)}
                    className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-900/60'
                        : 'hover:bg-slate-100/80 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                      <div className="shrink-0 text-slate-400 dark:text-slate-500">
                        {isChecked ? (
                          <CheckSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Square className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-semibold truncate text-[11px]">{mb.email}</span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusColor(mb.status)}`}
                            title={`Status: ${mb.status}`}
                          />
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          <span>{mb.senderName || 'Sender'}</span>
                          <span>•</span>
                          <span>{mb.provider}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {/* 1-Click Isolate Button */}
                      <button
                        type="button"
                        onClick={(e) => handleIsolateAccount(mb.id, e)}
                        className="opacity-0 group-hover:opacity-100 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-200 dark:bg-[#282828] text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                        title="Isolate this mailbox only"
                      >
                        Only
                      </button>

                      {count > 0 ? (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-slate-200/80 dark:bg-[#242424] text-slate-700 dark:text-slate-300">
                          {count}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600 px-1.5 py-0.2">
                          0
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. LINKEDIN ACCOUNTS SECTION */}
        {filteredLinkedInAccounts.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <Linkedin className="w-3 h-3 text-sky-500" />
                <span>LinkedIn Accounts ({filteredLinkedInAccounts.length})</span>
              </span>
              <div className="flex items-center gap-2 normal-case font-medium">
                <button
                  type="button"
                  onClick={handleSelectAllLinkedIn}
                  className="text-blue-500 hover:underline cursor-pointer text-[10px]"
                >
                  Select All
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={handleClearLinkedIn}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer text-[10px]"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Scrollable list of LinkedIn accounts */}
            <div className="max-h-40 overflow-y-auto space-y-1 pr-1 border border-slate-200/70 dark:border-[#242424] rounded-xl p-1.5 bg-slate-50/40 dark:bg-[#141414]/40 custom-scrollbar">
              {filteredLinkedInAccounts.map((acc) => {
                const isChecked = selectedAccountIds.includes(acc.id);
                const count = conversationCounts[acc.id] || 0;

                return (
                  <div
                    key={acc.id}
                    onClick={() => toggleAccountId(acc.id)}
                    className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-900/60'
                        : 'hover:bg-slate-100/80 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                      <div className="shrink-0 text-slate-400 dark:text-slate-500">
                        {isChecked ? (
                          <CheckSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Square className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="font-semibold truncate text-[11px]">{acc.name}</span>
                          <span
                            className={`w-1.5 h-1.5 rounded-full shrink-0 ${getStatusColor(acc.status)}`}
                            title={`Status: ${acc.status}`}
                          />
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {acc.title || 'LinkedIn Profile'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleIsolateAccount(acc.id, e)}
                        className="opacity-0 group-hover:opacity-100 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-200 dark:bg-[#282828] text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                        title="Isolate this profile only"
                      >
                        Only
                      </button>

                      {count > 0 ? (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-slate-200/80 dark:bg-[#242424] text-slate-700 dark:text-slate-300">
                          {count}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600 px-1.5 py-0.2">
                          0
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 6. CALLS / VOICE ACCOUNTS (if present in workspace) */}
        {filteredPhoneNumbers.length > 0 && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1.5">
                <PhoneCall className="w-3 h-3 text-blue-600" />
                <span>Voice & Phone Lines ({filteredPhoneNumbers.length})</span>
              </span>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-1 pr-1 border border-slate-200/70 dark:border-[#242424] rounded-xl p-1.5 bg-slate-50/40 dark:bg-[#141414]/40 custom-scrollbar">
              {filteredPhoneNumbers.map((pn) => {
                const isChecked = selectedAccountIds.includes(pn.id);
                const count = conversationCounts[pn.id] || 0;

                return (
                  <div
                    key={pn.id}
                    onClick={() => toggleAccountId(pn.id)}
                    className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-900/60'
                        : 'hover:bg-slate-100/80 dark:hover:bg-white/[0.05] text-slate-800 dark:text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1 mr-2">
                      <div className="shrink-0 text-slate-400 dark:text-slate-500">
                        {isChecked ? (
                          <CheckSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Square className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="font-semibold truncate text-[11px]">{pn.number}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {pn.assignedAgent || pn.campaign || 'Voice Trunk'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleIsolateAccount(pn.id, e)}
                        className="opacity-0 group-hover:opacity-100 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-slate-200 dark:bg-[#282828] text-slate-700 dark:text-slate-300 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                        title="Isolate this phone line only"
                      >
                        Only
                      </button>

                      {count > 0 ? (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-md bg-slate-200/80 dark:bg-[#242424] text-slate-700 dark:text-slate-300">
                          {count}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600 px-1.5 py-0.2">
                          0
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty Search Result */}
        {filteredMailboxes.length === 0 &&
          filteredLinkedInAccounts.length === 0 &&
          filteredPhoneNumbers.length === 0 && (
            <div className="py-6 text-center text-slate-400 space-y-1">
              <Search className="w-5 h-5 mx-auto text-slate-300 dark:text-slate-600" />
              <div className="text-xs font-semibold">No matching connected accounts</div>
              <div className="text-[10px]">Try searching by email, name or provider</div>
            </div>
          )}
      </div>

      {/* 7. Footer Actions */}
      <div className="px-3.5 py-2.5 border-t border-slate-200/80 dark:border-[#242424] bg-slate-50/70 dark:bg-[#181818]/70 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            clearAccountIds();
            setFilterChannel('all');
            setFilterLabel('all');
          }}
          className="text-xs font-semibold text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition-colors cursor-pointer flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear All</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
