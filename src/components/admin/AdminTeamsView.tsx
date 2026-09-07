import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Plus, 
  Users, 
  Layers, 
  Coins, 
  Mail, 
  PhoneCall, 
  Linkedin, 
  Sparkles, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  X,
  Sliders,
  ShieldAlert
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin, AdminTeam } from '../../context/AdminContext';
import { AdminConfirmModal } from './AdminConfirmModal';

export interface AdminTeamsViewProps {
  hideHeader?: boolean;
}

export const AdminTeamsView: React.FC<AdminTeamsViewProps> = ({ hideHeader = false }) => {
  const { 
    teams, 
    users, 
    plans, 
    bundles, 
    addTeam, 
    updateTeam, 
    deleteTeam, 
    addCreditsToTeam, 
    setTeamLimitOverride 
  } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddTeamOpen, setIsAddTeamOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<AdminTeam | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<AdminTeam | null>(null);
  const [teamForCredits, setTeamForCredits] = useState<AdminTeam | null>(null);
  const [creditAmountInput, setCreditAmountInput] = useState('50000');

  // Form State
  const [teamName, setTeamName] = useState('');
  const [teamOwnerId, setTeamOwnerId] = useState(users[0]?.id || '');
  const [teamPlanId, setTeamPlanId] = useState(plans[1]?.id || 'plan-growth');
  const [teamBundles, setTeamBundles] = useState<string[]>(['bnd-email', 'bnd-leadgen']);
  const [teamCredits, setTeamCredits] = useState('50000');

  const filteredTeams = teams.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamName.trim()) return;

    const ownerObj = users.find(u => u.id === teamOwnerId) || users[0];
    const planObj = plans.find(p => p.id === teamPlanId) || plans[1];

    addTeam({
      name: teamName.trim(),
      ownerId: ownerObj.id,
      ownerName: ownerObj.name,
      membersCount: 1,
      memberIds: [ownerObj.id],
      planId: planObj.id,
      planName: planObj.name,
      bundleIds: teamBundles,
      credits: parseInt(teamCredits) || 50000,
      status: 'active',
      resourceLimits: {
        emailsMonthly: planObj.emailLimitMonthly,
        voiceAgents: planObj.voiceAgentLimit,
        leadFinderSearches: planObj.leadFinderLimitMonthly,
        linkedInActions: planObj.linkedInLimitMonthly,
        aiTokensMonthly: planObj.aiUsageLimitMonthly,
        mailboxes: planObj.mailboxLimit,
        workflows: planObj.workflowLimit,
      }
    });

    setTeamName('');
    setIsAddTeamOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      {!hideHeader && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
                Teams & Workspaces Management
              </h2>
              <Badge variant="purple" size="sm">{teams.length} Workspaces</Badge>
            </div>
            <p className="text-xs text-slate-500">
              Configure multi-tenant team workspaces, assign organization plans, set resource caps, and allocate shared credits.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddTeamOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Workspace
          </Button>
        </div>
      )}

      {/* 2. Search Bar & Actions */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex items-center justify-between gap-3 text-xs flex-wrap">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search workspaces by name or owner..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {hideHeader && (
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddTeamOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Workspace
          </Button>
        )}
      </div>

      {/* 3. Teams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-5 flex flex-col justify-between hover:border-blue-500/40 transition-all text-xs"
          >
            <div className="space-y-4">
              {/* Workspace Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-black text-sm shrink-0">
                    {team.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                      {team.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <span>Owner:</span>
                      <strong className="text-slate-700 dark:text-slate-300 font-semibold">{team.ownerName}</strong>
                    </span>
                  </div>
                </div>

                <Badge variant={team.status === 'active' ? 'emerald' : 'rose'} size="sm">
                  {team.status}
                </Badge>
              </div>

              {/* Badges & Stats */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] text-center text-[11px]">
                <div>
                  <span className="text-slate-400 block">Plan</span>
                  <strong className="text-blue-600 font-bold block truncate">{team.planName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Members</span>
                  <strong className="text-slate-900 dark:text-white font-bold block">{team.membersCount} seats</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Credits</span>
                  <strong className="text-amber-500 font-bold block font-mono">{team.credits.toLocaleString()}</strong>
                </div>
              </div>

              {/* Resource Limits Telemetry */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Resource Limits & Usage
                </span>
                
                {/* Email Limit Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      <Mail className="w-3 h-3 text-blue-500" />
                      <span>Monthly Emails</span>
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {team.usage.emailsSent.toLocaleString()} / {team.resourceLimits.emailsMonthly.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#181818] overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 rounded-full" 
                      style={{ width: `${Math.min(100, (team.usage.emailsSent / team.resourceLimits.emailsMonthly) * 100)}%` }} 
                    />
                  </div>
                </div>

                {/* Leads Limit Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      <Users className="w-3 h-3 text-emerald-500" />
                      <span>Lead Searches</span>
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {team.usage.leadsSearched.toLocaleString()} / {team.resourceLimits.leadFinderSearches.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-[#181818] overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full" 
                      style={{ width: `${Math.min(100, (team.usage.leadsSearched / team.resourceLimits.leadFinderSearches) * 100)}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Assigned Bundles */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {team.bundleIds.map(bId => {
                  const bObj = bundles.find(b => b.id === bId);
                  return (
                    <span key={bId} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-[10px] font-bold text-slate-600 dark:text-slate-400">
                      {bObj?.name || bId}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-[#202020] gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setTeamForCredits(team)}
                leftIcon={<Coins className="w-3.5 h-3.5 text-amber-500" />}
              >
                Allocate Credits
              </Button>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingTeam(team)}
                  className="p-1.5 h-8 w-8 text-blue-600"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTeamToDelete(team)}
                  className="p-1.5 h-8 w-8 text-rose-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* 4. Add Team Modal */}
      {isAddTeamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setIsAddTeamOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                  Create Workspace Team
                </h3>
              </div>
              <button type="button" onClick={() => setIsAddTeamOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTeam} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Workspace / Organization Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Acme Global Revenue"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Workspace Owner</label>
                  <select
                    value={teamOwnerId}
                    onChange={(e) => setTeamOwnerId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                  >
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Assigned Plan</label>
                  <select
                    value={teamPlanId}
                    onChange={(e) => setTeamPlanId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                  >
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (${p.monthlyPrice}/mo)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Initial Team Credits</label>
                <input
                  type="number"
                  value={teamCredits}
                  onChange={(e) => setTeamCredits(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
                <Button variant="secondary" size="sm" onClick={() => setIsAddTeamOpen(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Create Workspace</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Allocate Credits Modal */}
      {teamForCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setTeamForCredits(null)} />
          <div className="relative z-10 w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-500" />
                <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">
                  Allocate Credits to {teamForCredits.name}
                </h3>
              </div>
              <button type="button" onClick={() => setTeamForCredits(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-3">
              <div className="text-slate-500">
                Workspace Pool: <strong className="font-mono text-slate-900 dark:text-white">{teamForCredits.credits.toLocaleString()} credits</strong>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Credit Amount (+ / -)</label>
                <input
                  type="number"
                  value={creditAmountInput}
                  onChange={(e) => setCreditAmountInput(e.target.value)}
                  placeholder="e.g. 50000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="secondary" size="sm" onClick={() => setTeamForCredits(null)}>Cancel</Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const amt = parseInt(creditAmountInput) || 0;
                    addCreditsToTeam(teamForCredits.id, amt);
                    setTeamForCredits(null);
                  }}
                >
                  Allocate Credits
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Delete Team Confirmation */}
      {teamToDelete && (
        <AdminConfirmModal
          isOpen={Boolean(teamToDelete)}
          onClose={() => setTeamToDelete(null)}
          onConfirm={() => {
            if (teamToDelete) deleteTeam(teamToDelete.id);
            setTeamToDelete(null);
          }}
          title={`Delete Workspace: ${teamToDelete.name}`}
          description={`Are you sure you want to delete ${teamToDelete.name}? This will disassociate ${teamToDelete.membersCount} member accounts and remove all custom workspace limits.`}
          confirmText="Delete Workspace"
          variant="danger"
        />
      )}

    </div>
  );
};
