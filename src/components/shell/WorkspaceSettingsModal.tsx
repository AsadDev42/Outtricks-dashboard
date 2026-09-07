import React, { useState } from 'react';
import { useAuth, UserRole } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Modal } from '../ui/Modal';
import { Tabs } from '../ui/Tabs';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Avatar } from '../ui/Avatar';
import { 
  Building2, 
  Users, 
  Mail, 
  ShieldCheck, 
  UserPlus, 
  Trash2, 
  Crown, 
  CreditCard,
  Zap,
  Globe
} from 'lucide-react';

export interface WorkspaceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: string;
}

export const WorkspaceSettingsModal: React.FC<WorkspaceSettingsModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'general',
}) => {
  const { 
    currentWorkspace, 
    updateWorkspace, 
    teamMembers, 
    invites, 
    inviteMember, 
    updateMemberRole, 
    removeMember, 
    cancelInvite 
  } = useAuth();
  const { success, error } = useToast();

  const [activeTab, setActiveTab] = useState(initialTab);
  const [name, setName] = useState(currentWorkspace?.name || '');
  const [customDomain, setCustomDomain] = useState(currentWorkspace?.customDomain || '');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<UserRole>('member');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!currentWorkspace) return null;

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await updateWorkspace(currentWorkspace.id, { name, customDomain });
    setIsSubmitting(false);
    if (res.success) {
      success('Workspace settings updated.', 'Saved');
    } else {
      error(res.error || 'Failed to save workspace', 'Error');
    }
  };

  const handleSendInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    setIsSubmitting(true);
    const res = await inviteMember(inviteEmail.trim(), inviteRole);
    setIsSubmitting(false);

    if (res.success) {
      success(`Invitation sent to ${inviteEmail}`, 'Invite Dispatched');
      setInviteEmail('');
    } else {
      error(res.error || 'Failed to send invite', 'Error');
    }
  };

  const tabs = [
    { id: 'general', label: 'General & Domains', icon: <Building2 className="w-4 h-4" /> },
    { id: 'members', label: `Team (${teamMembers.length})`, icon: <Users className="w-4 h-4" /> },
    { id: 'billing', label: 'Plan & Billing', icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Workspace Settings"
      description={`Manage settings, domain verification, team seats, and access roles for ${currentWorkspace.name}.`}
      size="lg"
    >
      <div className="space-y-6 font-sans">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="segmented"
          size="sm"
        />

        {/* TAB 1: GENERAL & DOMAINS */}
        {activeTab === 'general' && (
          <form onSubmit={handleSaveGeneral} className="space-y-5">
            <Input
              label="Workspace Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Custom Tracking / Outbound Domain"
              placeholder="outbound.yourcompany.com"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              helperText="CNAME target: cname.outtricks.com (Used for 100% white-label click and open tracking)"
            />

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-2">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500" />
                <span>DNS Alignment Status</span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-mono">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 font-bold">
                  ✓ SPF Configured
                </div>
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 font-bold">
                  ✓ DKIM 2048-Bit
                </div>
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/60 font-bold">
                  ✓ DMARC Reject
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
                Save Workspace Changes
              </Button>
            </div>
          </form>
        )}

        {/* TAB 2: TEAM MEMBERS & INVITES */}
        {activeTab === 'members' && (
          <div className="space-y-6">
            
            {/* Invite Form */}
            <form onSubmit={handleSendInvite} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] space-y-3">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <UserPlus className="w-4 h-4 text-emerald-500" />
                <span>Invite New Teammate</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-7">
                  <Input
                    placeholder="colleague@company.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="sm:col-span-3">
                  <Select
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as UserRole)}
                    options={[
                      { value: 'admin', label: 'Admin (Full access)' },
                      { value: 'member', label: 'Member (Standard)' },
                      { value: 'viewer', label: 'Viewer (Read-only)' },
                    ]}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" variant="primary" size="md" className="w-full" isLoading={isSubmitting}>
                    Invite
                  </Button>
                </div>
              </div>
            </form>

            {/* Members List */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Active Team Members ({teamMembers.length})
              </div>
              <div className="divide-y divide-slate-100 dark:divide-white/[0.06] border border-slate-200/80 dark:border-[#202020] rounded-2xl overflow-hidden bg-white dark:bg-[#161616]">
                {teamMembers.map((member) => (
                  <div key={member.id} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar src={member.avatar} name={member.name} size="sm" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2 truncate">
                          <span>{member.name}</span>
                          {member.role === 'owner' && (
                            <span title="Workspace Owner">
                              <Crown className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {member.email} • Active {member.lastActive}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {member.role === 'owner' ? (
                        <Badge variant="amber" size="sm">
                          Owner
                        </Badge>
                      ) : (
                        <select
                          value={member.role}
                          onChange={(e) => updateMemberRole(member.id, e.target.value as UserRole)}
                          className="text-xs font-bold px-2.5 py-1 rounded-xl bg-slate-50 dark:bg-[#181818] border border-slate-200 dark:border-[#2A2A2A] text-slate-800 dark:text-slate-200 outline-none cursor-pointer"
                        >
                          <option value="admin">Admin</option>
                          <option value="member">Member</option>
                          <option value="viewer">Viewer</option>
                        </select>
                      )}

                      {member.role !== 'owner' && (
                        <button
                          type="button"
                          onClick={() => {
                            removeMember(member.id);
                            success(`Removed ${member.name} from workspace.`, 'Member Removed');
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          aria-label="Remove member"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Invites */}
            {invites.length > 0 && (
              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Pending Invitations ({invites.length})
                </div>
                <div className="space-y-1.5">
                  {invites.map((inv) => (
                    <div
                      key={inv.id}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{inv.email}</div>
                        <div className="text-[11px] text-slate-400">
                          Invited as <strong className="capitalize">{inv.role}</strong> by {inv.invitedBy}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => cancelInvite(inv.id)}
                        className="text-slate-400 hover:text-rose-600"
                      >
                        Cancel
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: BILLING */}
        {activeTab === 'billing' && (
          <div className="space-y-5">
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-[#161616] border border-emerald-800/40 text-white space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Current Subscription
                </span>
                <Badge variant="emerald" size="sm">
                  Active • Auto-Renew
                </Badge>
              </div>
              <div className="text-2xl font-extrabold capitalize font-sans">
                {currentWorkspace.plan} Plan ($299/mo)
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div>
                  <div className="text-slate-400">Monthly Credits</div>
                  <div className="font-bold text-white font-mono mt-0.5">
                    {currentWorkspace.credits.toLocaleString()} / {currentWorkspace.maxCredits.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Connected Inboxes</div>
                  <div className="font-bold text-white font-mono mt-0.5">
                    {currentWorkspace.connectedInboxes} / {currentWorkspace.maxInboxes}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400">Deals CRM</div>
                  <div className="font-bold text-emerald-400 mt-0.5">Included</div>
                </div>
                <div>
                  <div className="text-slate-400">Flow Builder</div>
                  <div className="font-bold text-emerald-400 mt-0.5">Included</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020]">
              <div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Payment Method
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Visa ending in 4242 • Expires 08/2028
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => window.open('/pricing', '_blank')}>
                Change Plan
              </Button>
            </div>
          </div>
        )}

      </div>
    </Modal>
  );
};
