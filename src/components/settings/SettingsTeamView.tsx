import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Mail, 
  ShieldCheck, 
  Trash2, 
  MoreVertical, 
  X, 
  Clock, 
  CheckCircle2, 
  Send,
  RotateCcw
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useSettings, TeamMember } from '../../context/SettingsContext';

export const SettingsTeamView: React.FC = () => {
  const { 
    teamMembers, 
    pendingInvites, 
    inviteMember, 
    removeMember, 
    updateMemberRole, 
    resendInvite, 
    revokeInvite 
  } = useSettings();

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TeamMember['role']>('SDR Member');

  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberToRemove, setMemberToRemove] = useState<TeamMember | null>(null);

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail) return;
    inviteMember(inviteEmail, inviteRole);
    setInviteEmail('');
    setIsInviteModalOpen(false);
  };

  const handleRoleUpdate = (role: TeamMember['role']) => {
    if (editingMember) {
      updateMemberRole(editingMember.id, role);
      setEditingMember(null);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Team Members & Role-Based Access Control (RBAC)
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Manage authorized workspace users, SDR seats, analyst permissions, and pending email invitations.
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

      {/* 2. Team Members Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
            Active Workspace Seats ({teamMembers.length})
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            {teamMembers.length} of 10 Enterprise Seats Allocated
          </span>
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
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-[#2A2A2A]"
                      />
                      <div>
                        <div className="font-bold text-slate-900 dark:text-white">{member.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{member.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <Badge
                      variant={
                        member.role === 'Owner'
                          ? 'emerald'
                          : member.role === 'Admin'
                          ? 'primary'
                          : 'slate'
                      }
                      size="sm"
                    >
                      {member.role}
                    </Badge>
                  </td>

                  <td className="py-3 px-4">
                    <Badge variant={member.status === 'Active' ? 'emerald' : 'amber'} size="sm" dot>
                      {member.status}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                    {member.lastActive}
                  </td>

                  <td className="py-3 px-4 text-right">
                    {member.role !== 'Owner' && (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingMember(member)}
                          className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold hover:underline cursor-pointer"
                        >
                          Change Role
                        </button>
                        <button
                          onClick={() => setMemberToRemove(member)}
                          className="text-[11px] text-rose-500 font-bold hover:underline cursor-pointer ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Pending Invitations Section */}
      {pendingInvites.length > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
          <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
            Pending Email Invitations ({pendingInvites.length})
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-white/[0.04] rounded-2xl border border-slate-200/80 dark:border-[#202020] overflow-hidden bg-slate-50/40 dark:bg-[#141414]/30">
            {pendingInvites.map((inv) => (
              <div key={inv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 flex items-center justify-center text-amber-600 font-bold">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-slate-900 dark:text-white font-mono text-xs">{inv.email}</strong>
                    <div className="text-[11px] text-slate-400 font-sans">
                      Role: <span className="font-bold text-slate-700 dark:text-slate-300">{inv.role}</span> • Sent {inv.dateSent}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => resendInvite(inv.id)}
                    leftIcon={<Send className="w-3 h-3" />}
                  >
                    Resend Invite
                  </Button>
                  <button
                    onClick={() => revokeInvite(inv.id)}
                    className="text-[11px] text-rose-500 font-bold hover:underline cursor-pointer"
                  >
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Invite Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-500" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">Invite Team Member</h3>
              </div>
              <button onClick={() => setIsInviteModalOpen(false)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <Input
                label="Colleague Email Address"
                type="email"
                placeholder="colleague@company.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                required
              />

              <Select
                label="Assigned RBAC Role"
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as TeamMember['role'])}
                options={[
                  { value: 'Admin', label: 'Admin (Full Workspace Management)' },
                  { value: 'SDR Member', label: 'SDR Member (Campaign & Lead Operations)' },
                  { value: 'Analyst', label: 'Analyst (Read-Only Analytics & Logs)' },
                ]}
              />

              <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
                <Button variant="secondary" size="sm" type="button" onClick={() => setIsInviteModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" leftIcon={<Send className="w-3.5 h-3.5" />}>
                  Dispatch Invitation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Role Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-slate-900 dark:text-white">Modify Permissions</h3>
              <button onClick={() => setEditingMember(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-500">
              Select new role for <strong className="text-slate-900 dark:text-white">{editingMember.name}</strong>:
            </p>

            <div className="space-y-2">
              {(['Admin', 'SDR Member', 'Analyst'] as TeamMember['role'][]).map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleUpdate(role)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-colors cursor-pointer ${
                    editingMember.role === role
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400'
                      : 'border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                >
                  <span className="font-bold">{role}</span>
                  {editingMember.role === role && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Remove Member Confirmation Modal */}
      {memberToRemove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl p-6 shadow-2xl space-y-4 font-sans text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#2A2A2A]">
              <h3 className="text-base font-black text-rose-600">Remove Team Member</h3>
              <button onClick={() => setMemberToRemove(null)} className="text-slate-400 hover:text-slate-600 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 dark:text-slate-300">
              Are you sure you want to remove <strong className="text-slate-900 dark:text-white">{memberToRemove.name}</strong> from the workspace? They will lose access to all campaigns and data.
            </p>

            <div className="pt-3 border-t border-slate-100 dark:border-[#2A2A2A] flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setMemberToRemove(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  removeMember(memberToRemove.id);
                  setMemberToRemove(null);
                }}
              >
                Confirm Removal
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
