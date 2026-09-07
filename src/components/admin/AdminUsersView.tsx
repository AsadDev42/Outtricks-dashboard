import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  Shield, 
  Coins, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle2, 
  AlertCircle,
  X,
  Layers,
  Building2,
  Mail,
  Zap,
  RotateCcw
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin, AdminUser, AdminRole } from '../../context/AdminContext';
import { AdminConfirmModal } from './AdminConfirmModal';

export interface AdminUsersViewProps {
  hideHeader?: boolean;
}

export const AdminUsersView: React.FC<AdminUsersViewProps> = ({ hideHeader = false }) => {
  const { 
    users, 
    teams, 
    plans, 
    bundles, 
    roles, 
    addUser, 
    updateUser, 
    deleteUser, 
    toggleUserStatus, 
    impersonateUser, 
    addCreditsToUser 
  } = useAdmin();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');

  // Modals & Drawers
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [inspectingUser, setInspectingUser] = useState<AdminUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<AdminUser | null>(null);
  const [userForCredits, setUserForCredits] = useState<AdminUser | null>(null);
  const [creditAmountInput, setCreditAmountInput] = useState('10000');

  // New User Form State
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<AdminRole>('member');
  const [newUserTeamId, setNewUserTeamId] = useState<string>(teams[0]?.id || '');
  const [newUserPlanId, setNewUserPlanId] = useState<string>(plans[1]?.id || 'plan-growth');
  const [newUserBundles, setNewUserBundles] = useState<string[]>(['bnd-email', 'bnd-leadgen']);
  const [newUserCredits, setNewUserCredits] = useState('25000');

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch = 
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (u.teamName && u.teamName.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
      const matchesPlan = planFilter === 'all' || u.planId === planFilter;

      return matchesSearch && matchesRole && matchesStatus && matchesPlan;
    });
  }, [users, searchTerm, roleFilter, statusFilter, planFilter]);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    const selectedTeam = teams.find(t => t.id === newUserTeamId);
    const selectedPlan = plans.find(p => p.id === newUserPlanId);

    addUser({
      name: newUserName.trim(),
      email: newUserEmail.trim(),
      role: newUserRole,
      teamId: newUserTeamId,
      teamName: selectedTeam?.name || 'Unassigned',
      planId: newUserPlanId,
      planName: selectedPlan?.name || 'Growth Plan',
      bundleIds: newUserBundles,
      status: 'active',
      credits: parseInt(newUserCredits) || 10000,
    });

    // Reset Form
    setNewUserName('');
    setNewUserEmail('');
    setIsAddUserOpen(false);
  };

  const handleBundleToggle = (bundleId: string) => {
    setNewUserBundles(prev => 
      prev.includes(bundleId) ? prev.filter(b => b !== bundleId) : [...prev, bundleId]
    );
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      {!hideHeader && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
                User Directory & Account Governance
              </h2>
              <Badge variant="emerald" size="sm">{users.length} Total Users</Badge>
            </div>
            <p className="text-xs text-slate-500">
              Create, inspect, impersonate, assign product plans, adjust credit allocations, and govern account permissions.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddUserOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Add New User
          </Button>
        </div>
      )}

      {/* 2. Search & Filters Bar */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users by name, email, or team..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Filter Dropdowns & Add Button */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap justify-between md:justify-end">
          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white text-xs cursor-pointer focus:outline-none"
          >
            <option value="all">All Roles ({roles.length})</option>
            {roles.map(r => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white text-xs cursor-pointer focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Seats</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending Invites</option>
          </select>

          {/* Plan Filter */}
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-3 py-2 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white text-xs cursor-pointer focus:outline-none"
          >
            <option value="all">All Plans ({plans.length})</option>
            {plans.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all' || planFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('all');
                setStatusFilter('all');
                setPlanFilter('all');
              }}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

          {hideHeader && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsAddUserOpen(true)}
              leftIcon={<Plus className="w-3.5 h-3.5" />}
            >
              Add User
            </Button>
          )}
        </div>
      </div>

      {/* 3. Users Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[760px]">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-[#1C1C1C] border-b border-slate-200/80 dark:border-[#2A2A2A] text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Team / Workspace</th>
                <th className="py-3.5 px-4">Assigned Plan</th>
                <th className="py-3.5 px-4">Bundles</th>
                <th className="py-3.5 px-4">Credits</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Last Active</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {filteredUsers.map((user) => {
                const isSuperAdmin = user.role === 'super-admin';
                return (
                  <tr 
                    key={user.id} 
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30 transition-colors group"
                  >
                    {/* User Profile */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0 overflow-hidden">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            user.name.charAt(0)
                          )}
                        </div>
                        <div className="min-w-0">
                          <button
                            type="button"
                            onClick={() => setInspectingUser(user)}
                            className="font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors truncate block text-left"
                          >
                            {user.name}
                          </button>
                          <span className="text-[11px] text-slate-400 font-mono truncate block">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4 font-medium">
                      <Badge 
                        variant={user.role.includes('admin') ? 'emerald' : 'slate'}
                        size="sm"
                      >
                        {user.role}
                      </Badge>
                    </td>

                    {/* Team */}
                    <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                      {user.teamName || 'Solo Workspace'}
                    </td>

                    {/* Plan */}
                    <td className="py-3.5 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                      {user.planName}
                    </td>

                    {/* Bundles */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 flex-wrap">
                        {user.bundleIds.slice(0, 2).map((bId) => {
                          const bObj = bundles.find(b => b.id === bId);
                          return (
                            <span key={bId} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-[10px] font-bold text-slate-600 dark:text-slate-400">
                              {bObj?.name.replace(' Bundle', '') || bId}
                            </span>
                          );
                        })}
                        {user.bundleIds.length > 2 && (
                          <span className="text-[10px] text-slate-400 font-bold">
                            +{user.bundleIds.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Credits */}
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white">
                      {user.credits.toLocaleString()}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        user.status === 'active' 
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50' 
                          : 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                        <span className="capitalize">{user.status}</span>
                      </span>
                    </td>

                    {/* Last Active */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                      {user.lastActive}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setInspectingUser(user)}
                          title="Inspect User Details"
                          className="p-1.5 h-7 w-7"
                        >
                          <Eye className="w-3.5 h-3.5 text-slate-500" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => impersonateUser(user.id)}
                          title="Impersonate User"
                          className="p-1.5 h-7 w-7 text-indigo-600"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUserForCredits(user)}
                          title="Adjust Credits"
                          className="p-1.5 h-7 w-7 text-amber-600"
                        >
                          <Coins className="w-3.5 h-3.5" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleUserStatus(user.id)}
                          title={user.status === 'active' ? 'Suspend Account' : 'Activate Account'}
                          className={`p-1.5 h-7 w-7 ${user.status === 'active' ? 'text-amber-500' : 'text-emerald-500'}`}
                        >
                          {user.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                        </Button>

                        {!isSuperAdmin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setUserToDelete(user)}
                            title="Delete User"
                            className="p-1.5 h-7 w-7 text-rose-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Add User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setIsAddUserOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                  Add User to Platform
                </h3>
              </div>
              <button type="button" onClick={() => setIsAddUserOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Adams"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rachel@company.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Role</label>
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value as AdminRole)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                  >
                    {roles.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Team / Workspace</label>
                  <select
                    value={newUserTeamId}
                    onChange={(e) => setNewUserTeamId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                  >
                    {teams.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Assigned Plan</label>
                  <select
                    value={newUserPlanId}
                    onChange={(e) => setNewUserPlanId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                  >
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (${p.monthlyPrice}/mo)</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Initial Credits</label>
                  <input
                    type="number"
                    value={newUserCredits}
                    onChange={(e) => setNewUserCredits(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Assigned Product Bundles</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {bundles.map(b => {
                    const isChecked = newUserBundles.includes(b.id);
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => handleBundleToggle(b.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isChecked 
                            ? 'border-blue-500 bg-blue-50/60 dark:bg-white/[0.04] text-blue-600 font-bold' 
                            : 'border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span className="truncate">{b.name}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
                <Button variant="secondary" size="sm" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Create User Account
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. User Details Drawer */}
      {inspectingUser && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" onClick={() => setInspectingUser(null)} />
          <div className="relative z-10 w-full max-w-md bg-white dark:bg-[#161616] border-l border-slate-200 dark:border-[#2A2A2A] shadow-2xl p-6 space-y-6 overflow-y-auto h-full text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm">
                  {inspectingUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                    {inspectingUser.name}
                  </h3>
                  <span className="text-slate-400 font-mono text-[11px]">{inspectingUser.email}</span>
                </div>
              </div>
              <button type="button" onClick={() => setInspectingUser(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Overview Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-3">
              <div className="font-bold text-slate-900 dark:text-white">Account Overview</div>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div><span className="text-slate-400">Role:</span> <strong className="text-slate-900 dark:text-white block">{inspectingUser.role}</strong></div>
                <div><span className="text-slate-400">Team:</span> <strong className="text-slate-900 dark:text-white block">{inspectingUser.teamName || 'Solo'}</strong></div>
                <div><span className="text-slate-400">Plan:</span> <strong className="text-blue-600 block">{inspectingUser.planName}</strong></div>
                <div><span className="text-slate-400">Credits:</span> <strong className="text-slate-900 dark:text-white block font-mono">{inspectingUser.credits.toLocaleString()}</strong></div>
                <div><span className="text-slate-400">Created:</span> <strong className="text-slate-900 dark:text-white block font-mono">{inspectingUser.createdAt}</strong></div>
                <div><span className="text-slate-400">Last Active:</span> <strong className="text-slate-900 dark:text-white block font-mono">{inspectingUser.lastActive}</strong></div>
              </div>
            </div>

            {/* Product Bundles */}
            <div className="space-y-2">
              <div className="font-bold text-slate-900 dark:text-white">Assigned Product Bundles ({inspectingUser.bundleIds.length})</div>
              <div className="space-y-1.5">
                {inspectingUser.bundleIds.map(bId => {
                  const bObj = bundles.find(b => b.id === bId);
                  return (
                    <div key={bId} className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{bObj?.name || bId}</span>
                      <Badge variant="emerald" size="sm">Active</Badge>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-4 border-t border-slate-100 dark:border-[#202020] space-y-2">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  impersonateUser(inspectingUser.id);
                  setInspectingUser(null);
                }}
                leftIcon={<UserCheck className="w-3.5 h-3.5" />}
              >
                Impersonate User Workspace
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="w-full"
                onClick={() => {
                  toggleUserStatus(inspectingUser.id);
                  setInspectingUser(prev => prev ? { ...prev, status: prev.status === 'active' ? 'suspended' : 'active' } : null);
                }}
              >
                {inspectingUser.status === 'active' ? 'Suspend User Access' : 'Activate User Access'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Adjust Credits Modal */}
      {userForCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setUserForCredits(null)} />
          <div className="relative z-10 w-full max-w-sm bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-500" />
                <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">
                  Adjust Credits for {userForCredits.name}
                </h3>
              </div>
              <button type="button" onClick={() => setUserForCredits(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs space-y-3">
              <div className="text-slate-500">
                Current Balance: <strong className="font-mono text-slate-900 dark:text-white">{userForCredits.credits.toLocaleString()} credits</strong>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-slate-300">Credit Adjustment (+ / -)</label>
                <input
                  type="number"
                  value={creditAmountInput}
                  onChange={(e) => setCreditAmountInput(e.target.value)}
                  placeholder="e.g. 5000 or -2000"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="secondary" size="sm" onClick={() => setUserForCredits(null)}>Cancel</Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    const amt = parseInt(creditAmountInput) || 0;
                    addCreditsToUser(userForCredits.id, amt);
                    setUserForCredits(null);
                  }}
                >
                  Apply Credits
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Delete Confirmation */}
      {userToDelete && (
        <AdminConfirmModal
          isOpen={Boolean(userToDelete)}
          onClose={() => setUserToDelete(null)}
          onConfirm={() => {
            if (userToDelete) deleteUser(userToDelete.id);
            setUserToDelete(null);
          }}
          title={`Delete User: ${userToDelete.name}`}
          description={`Are you sure you want to permanently delete ${userToDelete.name} (${userToDelete.email})? This action revokes all seat assignments and cannot be undone.`}
          confirmText="Delete User"
          variant="danger"
        />
      )}

    </div>
  );
};
