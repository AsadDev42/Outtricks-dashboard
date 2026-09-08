import React, { useState } from 'react';
import { useAuth, Workspace } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { 
  Building2, 
  Check, 
  ChevronDown, 
  Plus, 
  Sparkles, 
  ShieldCheck, 
  CreditCard, 
  Zap,
  ExternalLink 
} from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const WorkspaceSelector: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { currentWorkspace, workspaces, switchWorkspace, createWorkspace } = useAuth();
  const { success, error } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newWsName, setNewWsName] = useState('');
  const [newWsPlan, setNewWsPlan] = useState<'starter' | 'pro' | 'scale'>('pro');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateWorkspace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName.trim()) return;

    setIsSubmitting(true);
    const res = await createWorkspace(newWsName.trim(), newWsPlan);
    setIsSubmitting(false);

    if (res.success) {
      success(`Workspace "${newWsName}" created successfully!`, 'Workspace Ready');
      setIsCreateOpen(false);
      setNewWsName('');
      setIsOpen(false);
    } else {
      error(res.error || 'Failed to create workspace', 'Error');
    }
  };

  if (!currentWorkspace) return null;

  return (
    <>
      <div className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-white/80 dark:bg-[#1C1C1C]/80 hover:bg-slate-100 dark:hover:bg-[#222222] border border-slate-200/90 dark:border-[#2A2A2A] transition-all cursor-pointer shadow-xs text-left group"
        >
          <div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center font-extrabold text-xs shadow-xs shrink-0">
            {currentWorkspace.name.substring(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0 pr-1 hidden sm:block">
            <div className="text-xs font-extrabold text-slate-950 dark:text-white truncate font-sans">
              {currentWorkspace.name}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium capitalize flex items-center gap-1">
              <span>{currentWorkspace.plan} Plan</span>
              <span className="inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span>{currentWorkspace.role}</span>
            </div>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-transform shrink-0" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-[700]"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute left-0 top-full mt-2 w-72 p-2 bg-white dark:bg-[#161616] border border-slate-200/90 dark:border-[#2A2A2A] rounded-3xl shadow-2xl z-[701] backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 space-y-1.5 font-sans">
              
              {/* Header Info */}
              <div className="px-3 py-2 border-b border-slate-100 dark:border-[#202020] flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Workspaces ({workspaces.length})
                </span>
                <Badge variant="primary" size="sm">
                  {currentWorkspace.credits.toLocaleString()} Credits
                </Badge>
              </div>

              {/* Workspace List */}
              <div className="max-h-56 overflow-y-auto space-y-1">
                {workspaces.map((ws) => {
                  const isSelected = ws.id === currentWorkspace.id;
                  return (
                    <button
                      key={ws.id}
                      type="button"
                      onClick={() => {
                        switchWorkspace(ws.id);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-colors cursor-pointer select-none ${
                        isSelected
                          ? 'bg-primary-muted/20 dark:bg-white/[0.04] text-slate-900 dark:text-white font-bold'
                          : 'hover:bg-slate-50 dark:hover:bg-[#1C1C1C] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelected
                              ? 'bg-primary text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-[#181818] text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {ws.name.substring(0, 1).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">{ws.name}</div>
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium capitalize">
                            {ws.plan} • {ws.membersCount} members
                          </div>
                        </div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Add Workspace Action */}
              <div className="pt-1 border-t border-slate-100 dark:border-[#202020]">
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    setIsCreateOpen(true);
                  }}
                  className="w-full flex items-center gap-2.5 p-2.5 rounded-2xl text-xs font-bold text-primary hover:bg-primary-muted/15 transition-colors cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-lg bg-primary-muted/20 flex items-center justify-center text-primary">
                    <Plus className="w-3.5 h-3.5" />
                  </div>
                  <span>Create New Workspace</span>
                </button>
              </div>

            </div>
          </>
        )}
      </div>

      {/* Create Workspace Modal */}
      <Modal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title="Create New Workspace"
        description="Set up an isolated workspace for your revenue team, clients, or agency accounts."
        size="sm"
      >
        <form onSubmit={handleCreateWorkspace} className="space-y-4">
          <Input
            label="Workspace Name"
            placeholder="e.g. Acme Growth Outbound"
            value={newWsName}
            onChange={(e) => setNewWsName(e.target.value)}
            required
            autoFocus
          />

          <Select
            label="Starting Tier"
            value={newWsPlan}
            onChange={(e) => setNewWsPlan(e.target.value as any)}
            options={[
              { value: 'starter', label: 'Starter — 2 Inboxes • 2,500 Credits' },
              { value: 'pro', label: 'Pro — 10 Inboxes • 10,000 Credits (Recommended)' },
              { value: 'scale', label: 'Scale — Unlimited Inboxes • 25,000 Credits' },
            ]}
          />

          <div className="p-3 bg-slate-50 dark:bg-[#141414]/60 rounded-2xl border border-slate-200/80 dark:border-[#2A2A2A] text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Isolated Data Partition</span>
            </div>
            <p>Leads, mailboxes, and CRM records are strictly sandboxed per workspace.</p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
              Create Workspace
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
