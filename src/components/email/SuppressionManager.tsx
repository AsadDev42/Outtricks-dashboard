import React, { useState } from 'react';
import { 
  Ban, 
  Plus, 
  Trash2, 
  Search, 
  Download, 
  Upload, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useEmail, SuppressedContact } from '../../context/EmailContext';
import { useToast } from '../../context/ToastContext';

export const SuppressionManager: React.FC = () => {
  const { suppressedContacts, addSuppression, removeSuppression } = useEmail();
  const [newEmail, setNewEmail] = useState('');
  const [reason, setReason] = useState<SuppressedContact['reason']>('Manual');
  const [searchQuery, setSearchQuery] = useState('');
  const { success } = useToast();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    addSuppression(newEmail.trim(), reason);
    setNewEmail('');
  };

  const filtered = suppressedContacts.filter((c) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return c.email.toLowerCase().includes(q) || c.domain.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-5 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <Ban className="w-5 h-5 text-rose-500" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Suppression & Do-Not-Contact List ({suppressedContacts.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Global suppression registry. Any email or company domain on this list is permanently blocked from all campaigns.
          </p>
        </div>
      </div>

      {/* Add Suppression Form */}
      <form
        onSubmit={handleAdd}
        className="p-4 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-wrap items-center gap-3 text-xs"
      >
        <div className="flex-1 min-w-[240px]">
          <input
            type="email"
            placeholder="Enter email or domain to suppress (e.g. competitor@company.com)..."
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
            className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs outline-none"
          />
        </div>

        <select
          value={reason}
          onChange={(e) => setReason(e.target.value as any)}
          className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs font-bold outline-none cursor-pointer"
        >
          <option value="Manual">Manual Block</option>
          <option value="Unsubscribe">Unsubscribed</option>
          <option value="Hard Bounce">Hard Bounce</option>
          <option value="Spam Complaint">Spam Complaint</option>
        </select>

        <Button variant="primary" size="sm" type="submit" leftIcon={<Ban className="w-3.5 h-3.5" />}>
          Suppress Contact
        </Button>
      </form>

      {/* Suppression Table */}
      <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#2A2A2A] rounded-3xl overflow-hidden bg-white dark:bg-[#161616] shadow-xs">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-4 flex items-center justify-between gap-3 text-xs"
          >
            <div className="space-y-0.5 min-w-0">
              <div className="font-extrabold text-slate-900 dark:text-white font-mono truncate">
                {item.email}
              </div>
              <div className="text-[10px] text-slate-400 font-mono">
                Suppressed on {item.dateAdded} • Domain: {item.domain}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[10px] font-bold font-mono">
                {item.reason}
              </span>

              <button
                type="button"
                onClick={() => removeSuppression(item.id)}
                className="p-1 text-slate-400 hover:text-emerald-500 cursor-pointer"
                title="Remove from suppression"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
