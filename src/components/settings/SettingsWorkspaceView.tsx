import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  Trash2, 
  Copy, 
  Check, 
  Upload, 
  RotateCcw, 
  Save, 
  Sparkles,
  Clock,
  MoreVertical,
  X,
  Send,
  Building,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Badge } from '../ui/Badge';
import { useSettings, TeamMember } from '../../context/SettingsContext';
import { useAuth, UserRole } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { formatWorkspaceName } from '../../lib/workspaceUtils';

export interface SettingsWorkspaceViewProps {
  initialTab?: 'workspace' | 'team';
}

export const SettingsWorkspaceView: React.FC<SettingsWorkspaceViewProps> = ({ initialTab = 'workspace' }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    orgData, 
    updateOrg, 
    teamMembers, 
    pendingInvites, 
    inviteMember, 
    removeMember, 
    updateMemberRole, 
    resendInvite, 
    revokeInvite 
  } = useSettings();
  const { currentWorkspace, updateWorkspace } = useAuth();
  const { success, info } = useToast();

  // Tab resolution: support URL param `tab=team` or `tab=workspace` / `tab=organization`
  const queryTab = searchParams.get('tab');
  const resolveTab = (): 'workspace' | 'team' => {
    if (queryTab === 'team' || queryTab === 'members') return 'team';
    if (queryTab === 'organization' || queryTab === 'workspace') return 'workspace';
    return initialTab;
  };

  const [activeTab, setActiveTab] = useState<'workspace' | 'team'>(resolveTab);

  useEffect(() => {
    if (queryTab === 'team' || queryTab === 'members') {
      setActiveTab('team');
    } else if (queryTab === 'organization' || queryTab === 'workspace') {
      setActiveTab('workspace');
    }
  }, [queryTab]);

  const handleTabSwitch = (tab: 'workspace' | 'team') => {
    setActiveTab(tab);
    setSearchParams({ tab }, { replace: true });
  };

  // Organization / Company form state
  const [formData, setFormData] = useState({
    ...orgData,
    name: orgData.name || currentWorkspace?.name || 'Redlumb',
    domain: orgData.domain || 'redlumb.com',
  });

  const [copiedId, setCopiedId] = useState(false);

  // Team Invite Modal State
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamMember['role']>('SDR Member');

  // Edit Member Role State
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Dynamic Workspace Display Name
  const workspaceTitle = formatWorkspaceName(formData.name || currentWorkspace?.name || 'Redlumb');

  const handleCopyId = () => {
    navigator.clipboard.writeText(formData.workspaceId || currentWorkspace?.id || 'ws_live_99824f8a0029b');
    setCopiedId(true);
    success('Workspace ID copied to clipboard.', 'Copied');
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateOrg(formData);
    if (currentWorkspace) {
      await updateWorkspace(currentWorkspace.id, { name: formData.name });
    }
    success(`Workspace settings updated. Display title is now "${formatWorkspaceName(formData.name)}".`, 'Settings Saved');
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    inviteMember(inviteEmail.trim(), inviteRole);
    setInviteEmail('');
    setIsInviteModalOpen(false);
    success(`Invitation sent to ${inviteEmail}`, 'Invite Sent');
  };

  const handleRoleChange = (memberId: string, role: TeamMember['role']) => {
    updateMemberRole(memberId, role);
    setEditingMember(null);
    info(`Updated user role to ${role}.`, 'Role Updated');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner with Dynamic Company Workspace Title */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shadow-emerald-600/20 shrink-0">
            {formData.name.charAt(0).toUpperCase()}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-black text-slate-950 dark:text-white tracking-tight">
                {workspaceTitle}
              </h2>
              <Badge variant="emerald" size="sm" dot>Active Workspace</Badge>
              <span className="text-xs font-mono text-slate-400">
                ID: {formData.workspaceId || currentWorkspace?.id || 'ws_live_99824f8a0029b'}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Manage organization company identity, corporate domains, team seats, and role-based permissions.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#282828] self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => handleTabSwitch('workspace')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'workspace'
                ? 'bg-white dark:bg-[#252525] text-slate-950 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Workspace & Organization</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('team')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'team'
                ? 'bg-white dark:bg-[#252525] text-slate-950 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-emerald-500" />
            <span>Team & Roles</span>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {teamMembers.length}
            </span>
          </button>
        </div>
      </div>

      {/* 2. TAB CONTENT: Workspace & Organization */}
      {activeTab === 'workspace' && (
        <div className="space-y-6">
          
          {/* Workspace ID Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-0.5">
              <div className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Dynamic Workspace Entity
              </div>
              <div className="font-mono text-sm font-black text-slate-950 dark:text-white flex items-center gap-2">
                <span>{formData.workspaceId || currentWorkspace?.id || 'ws_live_99824f8a0029b'}</span>
                <Badge variant="emerald" size="sm">Active Production</Badge>
              </div>
              <p className="text-slate-500 text-[11px]">
                Your workspace title is dynamically generated as <strong className="text-slate-700 dark:text-slate-300">"{workspaceTitle}"</strong> based on the company name.
              </p>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyId}
              leftIcon={copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            >
              {copiedId ? 'Copied ID' : 'Copy Workspace ID'}
            </Button>
          </div>

          {/* Organization Form */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs">
            <form onSubmit={handleFormSubmit} className="space-y-6 max-w-2xl text-xs">
              
              {/* Organization Logo */}
              <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-[#202020]">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white font-extrabold text-2xl shadow-md shadow-emerald-600/20 shrink-0">
                  {formData.name.charAt(0).toUpperCase()}
                </div>

                <div className="space-y-1">
                  <strong className="text-sm text-slate-900 dark:text-white block font-sans">
                    Company / Organization Logo
                  </strong>
                  <span className="text-[11px] text-slate-400 block font-mono">
                    PNG, SVG, or JPEG (Max 2MB, 512x512 recommended)
                  </span>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => success('Logo upload dialog triggered.', 'Upload Logo')}
                    leftIcon={<Upload className="w-3.5 h-3.5" />}
                  >
                    Upload New Logo
                  </Button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Input
                    label="Company / Organization Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Redlumb"
                    required
                  />
                  <span className="text-[10px] text-slate-400 block">
                    Workspace name will automatically be: <strong className="text-emerald-600 dark:text-emerald-400">{formatWorkspaceName(formData.name)}</strong>
                  </span>
                </div>

                <Input
                  label="Primary Corporate Domain"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder="e.g. redlumb.com"
                  required
                />

                <Input
                  label="Tax ID / EIN Number"
                  value={formData.taxId}
                  onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                />

                <Select
                  label="Default Workspace Currency"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  options={[
                    { value: 'USD ($)', label: 'USD ($) - US Dollar' },
                    { value: 'EUR (€)', label: 'EUR (€) - Euro' },
                    { value: 'GBP (£)', label: 'GBP (£) - British Pound' },
                    { value: 'CAD ($)', label: 'CAD ($) - Canadian Dollar' },
                    { value: 'AUD ($)', label: 'AUD ($) - Australian Dollar' },
                  ]}
                />

                <Select
                  label="Default System Timezone"
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  options={[
                    { value: 'America/Los_Angeles (PST)', label: 'America/Los_Angeles (PST, UTC-8)' },
                    { value: 'America/New_York (EST)', label: 'America/New_York (EST, UTC-5)' },
                    { value: 'Europe/London (GMT)', label: 'Europe/London (GMT, UTC+0)' },
                    { value: 'Europe/Berlin (CET)', label: 'Europe/Berlin (CET, UTC+1)' },
                    { value: 'Asia/Singapore (SGT)', label: 'Asia/Singapore (SGT, UTC+8)' },
                  ]}
                />

                <Select
                  label="Compliance Data Retention"
                  value={formData.dataRetentionDays.toString()}
                  onChange={(e) => setFormData({ ...formData, dataRetentionDays: parseInt(e.target.value, 10) })}
                  options={[
                    { value: '90', label: '90 Days (GDPR Lean)' },
                    { value: '180', label: '180 Days (6 Months)' },
                    { value: '365', label: '365 Days (1 Year Standard)' },
                    { value: '730', label: '730 Days (2 Years Enterprise)' },
                    { value: '0', label: 'Indefinite / Permanent' },
                  ]}
                />
              </div>

              <Input
                label="Corporate Headquarters Address"
                value={formData.headquarters}
                onChange={(e) => setFormData({ ...formData, headquarters: e.target.value })}
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setFormData({ ...orgData })}
                  leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  leftIcon={<Save className="w-3.5 h-3.5" />}
                >
                  Save Workspace Changes
                </Button>
              </div>

            </form>
          </div>

        </div>
      )}

      {/* 3. TAB CONTENT: Team Members & RBAC */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          
          {/* Team Members Management Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
                  Active Workspace Seats ({teamMembers.length})
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Members assigned to <strong className="text-slate-700 dark:text-slate-300">{workspaceTitle}</strong> with role-based access.
                </p>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsInviteModalOpen(true)}
                leftIcon={<UserPlus className="w-3.5 h-3.5" />}
              >
                Invite New Member
              </Button>
            </div>

            <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200/80 dark:border-[#202020]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#141414]/80 border-b border-slate-200 dark:border-[#202020] text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                    <th className="py-3 px-4">Member Name</th>
                    <th className="py-3 px-4">Role & Access</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Last Activity</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-[#202020]">
                  {teamMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-slate-50/50 dark:hover:bg-[#1A1A1A]/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-white/10"
                          />
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">
                              {member.name}
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono">
                              {member.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {editingMember?.id === member.id ? (
                          <div className="flex items-center gap-2">
                            <select
                              value={editingMember.role}
                              onChange={(e) => handleRoleChange(member.id, e.target.value as TeamMember['role'])}
                              className="px-2 py-1 text-xs rounded-lg border border-emerald-500 bg-white dark:bg-[#1a1a1a] text-slate-900 dark:text-white focus:outline-none"
                            >
                              <option value="Owner">Owner</option>
                              <option value="Admin">Admin</option>
                              <option value="SDR Member">SDR Member</option>
                              <option value="Analyst">Analyst</option>
                            </select>
                            <button
                              type="button"
                              onClick={() => setEditingMember(null)}
                              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setEditingMember(member)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200/50 dark:border-emerald-800/40 hover:border-emerald-500 transition-colors cursor-pointer"
                            title="Click to change role"
                          >
                            <ShieldCheck className="w-3 h-3 text-emerald-500" />
                            <span>{member.role}</span>
                          </button>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant="emerald" size="sm" dot>
                          {member.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                        {member.lastActive}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {member.role !== 'Owner' ? (
                          <button
                            type="button"
                            onClick={() => {
                              removeMember(member.id);
                              info(`Removed ${member.name} from workspace.`, 'Member Removed');
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                            title="Remove member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-400 font-bold px-2 py-1">
                            Owner
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pending Invitations Section */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
                Pending Invitations ({pendingInvites.length})
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">
                Invited users receive secure magic activation links
              </span>
            </div>

            {pendingInvites.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-[#242424] text-slate-400 space-y-1">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="font-bold text-slate-700 dark:text-slate-300">All seats verified</p>
                <p className="text-[11px]">There are currently no outstanding invitations awaiting acceptance.</p>
              </div>
            ) : (
              <div className="overflow-x-auto no-scrollbar rounded-2xl border border-slate-200/80 dark:border-[#202020]">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-[#141414]/80 border-b border-slate-200 dark:border-[#202020] text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      <th className="py-3 px-4">Invited Email</th>
                      <th className="py-3 px-4">Assigned Role</th>
                      <th className="py-3 px-4">Date Sent</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-[#202020]">
                    {pendingInvites.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-[#1A1A1A]/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{inv.email}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant="blue" size="sm">
                            {inv.role}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                          {inv.dateSent}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => {
                              resendInvite(inv.id);
                              success(`Invite resent to ${inv.email}`, 'Resent');
                            }}
                            leftIcon={<Send className="w-3 h-3" />}
                          >
                            Resend
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              revokeInvite(inv.id);
                              info(`Revoked invite for ${inv.email}`, 'Revoked');
                            }}
                            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                          >
                            Revoke
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      )}

      {/* 4. Invite Member Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#242424] pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">
                  Invite Member to {workspaceTitle}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4 text-xs">
              <Input
                label="Member Email Address"
                type="email"
                placeholder="colleague@domain.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />

              <Select
                label="Role & Access Permission"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as TeamMember['role'])}
                options={[
                  { value: 'Owner', label: 'Owner - Full Billing, Deletion & Org Control' },
                  { value: 'Admin', label: 'Admin - Manage Users, Integrations, & Campaigns' },
                  { value: 'SDR Member', label: 'SDR Member - Inboxes, Outreach & CRM Records' },
                  { value: 'Analyst', label: 'Analyst - Read-only Reporting & Intelligence' },
                ]}
              />

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#1E1E1E] text-[11px] text-slate-500 space-y-1">
                <p className="font-bold text-slate-700 dark:text-slate-300">Seat Allocation Notice:</p>
                <p>New invites automatically allocate an active seat under your current Enterprise plan quota.</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-[#242424]">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsInviteModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  leftIcon={<Send className="w-3.5 h-3.5" />}
                >
                  Send Invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default SettingsWorkspaceView;
