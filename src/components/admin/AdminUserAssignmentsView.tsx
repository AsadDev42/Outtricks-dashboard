import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  X, 
  Calendar, 
  Coins, 
  Layers, 
  Package, 
  Shield 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin, AdminAssignment } from '../../context/AdminContext';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminUserAssignmentsView: React.FC = () => {
  const { assignments, users, plans, bundles, addAssignment, deleteAssignment } = useAdmin();

  const [isAddAssignmentOpen, setIsAddAssignmentOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(null);

  // Form State
  const [targetUserId, setTargetUserId] = useState(users[0]?.id || '');
  const [planId, setPlanId] = useState(plans[1]?.id || 'plan-growth');
  const [selectedBundles, setSelectedBundles] = useState<string[]>(['bnd-email', 'bnd-leadgen']);
  const [allocatedCredits, setAllocatedCredits] = useState('50000');
  const [expiryMonths, setExpiryMonths] = useState('12');
  const [autoRenew, setAutoRenew] = useState(true);
  const [notes, setNotes] = useState('');

  const userAssignments = assignments.filter(a => a.targetType === 'user');

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const userObj = users.find(u => u.id === targetUserId) || users[0];
    const planObj = plans.find(p => p.id === planId) || plans[1];

    const startDate = new Date().toISOString().split('T')[0];
    const expiryDate = new Date(Date.now() + (parseInt(expiryMonths) || 12) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    addAssignment({
      targetType: 'user',
      targetId: userObj.id,
      targetName: `${userObj.name} (${userObj.email})`,
      planId: planObj.id,
      planName: planObj.name,
      bundleIds: selectedBundles,
      startDate,
      expiryDate,
      autoRenew,
      creditsAllocated: parseInt(allocatedCredits) || 50000,
      overridePlanLimits: true,
      notes: notes.trim() || undefined,
    });

    setIsAddAssignmentOpen(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              User Package Assignments
            </h2>
            <Badge variant="blue" size="sm">{userAssignments.length} Direct Assignments</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Grant individual user seat licenses, dedicated bundle add-ons, validity windows, and custom credit pools.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddAssignmentOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Assign User Package
        </Button>
      </div>

      {/* 2. Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden text-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-[#1C1C1C] border-b border-slate-200/80 dark:border-[#2A2A2A] text-slate-500 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">User Target</th>
                <th className="py-3.5 px-4">Assigned Plan</th>
                <th className="py-3.5 px-4">Bundles</th>
                <th className="py-3.5 px-4">Credits Allocated</th>
                <th className="py-3.5 px-4">Validity Window</th>
                <th className="py-3.5 px-4">Auto-Renew</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {userAssignments.map((asg) => (
                <tr key={asg.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30">
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                    {asg.targetName}
                  </td>
                  <td className="py-3.5 px-4 text-blue-600 dark:text-blue-400 font-bold">
                    {asg.planName}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex gap-1 flex-wrap">
                      {asg.bundleIds.map(bId => {
                        const bObj = bundles.find(b => b.id === bId);
                        return (
                          <span key={bId} className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#181818] text-[10px] font-bold">
                            {bObj?.name || bId}
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold text-amber-500">
                    {asg.creditsAllocated.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {asg.startDate} → {asg.expiryDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={asg.autoRenew ? 'emerald' : 'slate'} size="sm">
                      {asg.autoRenew ? 'Active' : 'One-Time'}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAssignmentToDelete(asg.id)}
                      className="p-1.5 h-7 w-7 text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
              {userAssignments.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No individual user assignments active. Users inherit permissions from team workspace settings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Add Assignment Modal */}
      {isAddAssignmentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setIsAddAssignmentOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                  Assign Package to User
                </h3>
              </div>
              <button type="button" onClick={() => setIsAddAssignmentOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateAssignment} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Target User</label>
                <select
                  value={targetUserId}
                  onChange={(e) => setTargetUserId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                >
                  {users.map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.email}) - {u.teamName || 'Solo'}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Plan</label>
                  <select
                    value={planId}
                    onChange={(e) => setPlanId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                  >
                    {plans.map(p => (
                      <option key={p.id} value={p.id}>{p.name} (${p.monthlyPrice}/mo)</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Credits Allocation</label>
                  <input
                    type="number"
                    value={allocatedCredits}
                    onChange={(e) => setAllocatedCredits(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Product Bundles</label>
                <div className="grid grid-cols-2 gap-2">
                  {bundles.map(b => {
                    const isChecked = selectedBundles.includes(b.id);
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setSelectedBundles(prev => prev.includes(b.id) ? prev.filter(x => x !== b.id) : [...prev, b.id])}
                        className={`p-2 rounded-xl border text-left flex items-center justify-between text-[11px] ${
                          isChecked ? 'border-blue-500 bg-blue-50/60 dark:bg-white/[0.04] text-blue-600 font-bold' : 'border-slate-200 dark:border-[#2A2A2A] text-slate-600'
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
                <Button variant="secondary" size="sm" onClick={() => setIsAddAssignmentOpen(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Assign Package</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Delete Confirmation */}
      {assignmentToDelete && (
        <AdminConfirmModal
          isOpen={Boolean(assignmentToDelete)}
          onClose={() => setAssignmentToDelete(null)}
          onConfirm={() => {
            if (assignmentToDelete) deleteAssignment(assignmentToDelete);
            setAssignmentToDelete(null);
          }}
          title="Revoke Assignment"
          description="Are you sure you want to revoke this package assignment? The user will revert to default workspace entitlements."
          confirmText="Revoke Assignment"
          variant="danger"
        />
      )}

    </div>
  );
};
