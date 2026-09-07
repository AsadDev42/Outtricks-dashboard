import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  Lock, 
  Users, 
  Layers,
  Check,
  RotateCcw
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { useAdmin, AdminRoleDefinition } from '../../context/AdminContext';
import { AdminConfirmModal } from './AdminConfirmModal';

export interface AdminRolesViewProps {
  hideHeader?: boolean;
}

export const AdminRolesView: React.FC<AdminRolesViewProps> = ({ hideHeader = false }) => {
  const { roles, addRole, updateRole, deleteRole } = useAdmin();

  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<AdminRoleDefinition | null>(null);
  const [roleToDelete, setRoleToDelete] = useState<AdminRoleDefinition | null>(null);

  // New Role Form State
  const [roleName, setRoleName] = useState('');
  const [roleDescription, setRoleDescription] = useState('');
  const [permissions, setPermissions] = useState<AdminRoleDefinition['permissions']>({
    adminPanel: false,
    manageUsers: false,
    manageTeams: false,
    managePlans: false,
    manageBilling: false,
    manageCredits: false,
    manageIntegrations: false,
    manageSecurity: false,
    leadFinder: true,
    emailOutreach: true,
    linkedInSafe: false,
    voiceAi: false,
    dealsCrm: true,
    aiAgents: false,
    workflows: false,
    analytics: false,
  });

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) return;

    addRole({
      name: roleName.trim(),
      description: roleDescription.trim() || 'Custom organizational permission role',
      isSystem: false,
      permissions: permissions,
    });

    setRoleName('');
    setRoleDescription('');
    setIsAddRoleOpen(false);
  };

  const handleTogglePermission = (key: keyof AdminRoleDefinition['permissions']) => {
    setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      {!hideHeader && (
        <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
                Role-Based Access Control (RBAC) & Governance
              </h2>
              <Badge variant="emerald" size="sm">{roles.length} Roles</Badge>
            </div>
            <p className="text-xs text-slate-500">
              Define system roles, custom permissions matrices, module access thresholds, and administrative authority.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddRoleOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Custom Role
          </Button>
        </div>
      )}

      {hideHeader && (
        <div className="flex items-center justify-between p-4 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs text-xs">
          <div className="text-slate-500 dark:text-[#A0A0A0]">
            System and custom organizational roles defining module permissions & access thresholds.
          </div>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsAddRoleOpen(true)}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Custom Role
          </Button>
        </div>
      )}

      {/* 2. Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 flex flex-col justify-between hover:border-blue-500/40 transition-all text-xs"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">
                    {role.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                    {role.description}
                  </p>
                </div>
                <Badge variant={role.isSystem ? 'slate' : 'purple'} size="sm">
                  {role.isSystem ? 'System' : 'Custom'}
                </Badge>
              </div>

              {/* Permissions Checklist Preview */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Capability Highlights
                </span>
                
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  {Object.entries(role.permissions).slice(0, 8).map(([permKey, isEnabled]) => (
                    <div key={permKey} className="flex items-center gap-1.5 truncate">
                      {isEnabled ? (
                        <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                      ) : (
                        <X className="w-3 h-3 text-slate-400 shrink-0" />
                      )}
                      <span className={isEnabled ? 'text-slate-900 dark:text-white font-medium capitalize' : 'text-slate-400 capitalize'}>
                        {permKey.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#202020]">
              <span className="text-[11px] text-slate-400 font-mono">
                ID: {role.id}
              </span>

              {!role.isSystem && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setRoleToDelete(role)}
                    className="p-1.5 h-7 w-7 text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

      {/* 3. Add Custom Role Modal */}
      {isAddRoleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setIsAddRoleOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                  Create Custom Role & Capability Matrix
                </h3>
              </div>
              <button type="button" onClick={() => setIsAddRoleOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateRole} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Outbound Campaign Specialist"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Description</label>
                <input
                  type="text"
                  placeholder="Brief description of role responsibilities..."
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Permissions Checklist */}
              <div className="space-y-2">
                <label className="font-bold text-slate-700 dark:text-slate-300">Permission Capabilities Matrix</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-1">
                  {Object.keys(permissions).map((permKey) => {
                    const key = permKey as keyof AdminRoleDefinition['permissions'];
                    const isChecked = permissions[key];
                    return (
                      <button
                        key={permKey}
                        type="button"
                        onClick={() => handleTogglePermission(key)}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isChecked 
                            ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-bold' 
                            : 'border-slate-200 dark:border-[#2A2A2A] text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        <span className="capitalize">{permKey.replace(/([A-Z])/g, ' $1')}</span>
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
                <Button variant="secondary" size="sm" onClick={() => setIsAddRoleOpen(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Create Role</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Delete Role Confirmation */}
      {roleToDelete && (
        <AdminConfirmModal
          isOpen={Boolean(roleToDelete)}
          onClose={() => setRoleToDelete(null)}
          onConfirm={() => {
            if (roleToDelete) deleteRole(roleToDelete.id);
            setRoleToDelete(null);
          }}
          title={`Delete Custom Role: ${roleToDelete.name}`}
          description={`Are you sure you want to delete the custom role ${roleToDelete.name}? Any users currently assigned to this role will be downgraded to Standard Member.`}
          confirmText="Delete Role"
          variant="danger"
        />
      )}

    </div>
  );
};
