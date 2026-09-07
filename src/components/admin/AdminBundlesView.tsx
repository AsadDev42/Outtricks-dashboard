import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  Coins, 
  Mail, 
  Search, 
  Linkedin, 
  PhoneCall, 
  Bot, 
  Layers,
  Sparkles
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin, AdminBundle } from '../../context/AdminContext';
import { AdminConfirmModal } from './AdminConfirmModal';

export const AdminBundlesView: React.FC = () => {
  const { bundles, modules, addBundle, updateBundle, deleteBundle } = useAdmin();

  const [isAddBundleOpen, setIsAddBundleOpen] = useState(false);
  const [bundleToDelete, setBundleToDelete] = useState<AdminBundle | null>(null);

  // Form State
  const [bundleName, setBundleName] = useState('');
  const [bundleCode, setBundleCode] = useState('');
  const [bundleDesc, setBundleDesc] = useState('');
  const [bundleCategory, setBundleCategory] = useState<AdminBundle['category']>('email');
  const [addonPrice, setAddonPrice] = useState('149');
  const [includedCredits, setIncludedCredits] = useState('25000');
  const [selectedModules, setSelectedModules] = useState<string[]>(['email']);
  const [featureListInput, setFeatureListInput] = useState('Campaigns, Sequences, Mailboxes, Warmup, Analytics');

  const handleCreateBundle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bundleName.trim()) return;

    addBundle({
      name: bundleName.trim(),
      code: bundleCode.trim().toUpperCase().replace(/\s+/g, '_') || 'CUSTOM_BUNDLE',
      description: bundleDesc.trim(),
      category: bundleCategory,
      modules: selectedModules,
      includedFeatures: featureListInput.split(',').map(f => f.trim()).filter(Boolean),
      monthlyAddonPrice: parseFloat(addonPrice) || 99,
      includedCredits: parseInt(includedCredits) || 10000,
      status: 'active',
    });

    setBundleName('');
    setBundleCode('');
    setBundleDesc('');
    setIsAddBundleOpen(false);
  };

  const getBundleIcon = (cat: AdminBundle['category']) => {
    switch (cat) {
      case 'email': return Mail;
      case 'lead-gen': return Search;
      case 'linkedin': return Linkedin;
      case 'voice': return PhoneCall;
      case 'workforce': return Bot;
      default: return Package;
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Product Bundles & Add-On Modules
            </h2>
            <Badge variant="emerald" size="sm">{bundles.length} Product Bundles</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Package engines into modular commercial bundles with attached capabilities, credit bonuses, and pricing.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsAddBundleOpen(true)}
          leftIcon={<Plus className="w-3.5 h-3.5" />}
        >
          Create Product Bundle
        </Button>
      </div>

      {/* 2. Bundles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {bundles.map((bundle) => {
          const Icon = getBundleIcon(bundle.category);
          return (
            <div
              key={bundle.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 flex flex-col justify-between hover:border-emerald-500/40 transition-all text-xs"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">
                        {bundle.name}
                      </h3>
                      <span className="text-[10px] text-slate-400 font-mono">{bundle.code}</span>
                    </div>
                  </div>
                  <Badge variant="emerald" size="sm">
                    +${bundle.monthlyAddonPrice}/mo
                  </Badge>
                </div>

                <p className="text-[11px] text-slate-500 leading-snug">
                  {bundle.description}
                </p>

                {/* Included Features List */}
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      Included Features ({bundle.includedFeatures.length})
                    </span>
                    <span className="font-mono text-amber-500 font-bold">
                      +{bundle.includedCredits.toLocaleString()} credits
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {bundle.includedFeatures.map((feat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-lg bg-white dark:bg-[#181818] border border-slate-200/60 dark:border-[#202020] text-[10px] font-bold text-slate-700 dark:text-slate-300"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#202020]">
                <span className="text-[10px] text-slate-400 font-mono">
                  Modules: {bundle.modules.join(', ')}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setBundleToDelete(bundle)}
                  className="p-1.5 h-7 w-7 text-rose-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>

            </div>
          );
        })}
      </div>

      {/* 3. Add Bundle Modal */}
      {isAddBundleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs" onClick={() => setIsAddBundleOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] rounded-3xl shadow-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#202020]">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                <h3 className="font-extrabold text-base text-slate-950 dark:text-white">
                  Create Product Bundle
                </h3>
              </div>
              <button type="button" onClick={() => setIsAddBundleOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBundle} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Bundle Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Omnichannel Outreach Suite"
                  value={bundleName}
                  onChange={(e) => setBundleName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Unique Code</label>
                  <input
                    type="text"
                    placeholder="OMNI_SUITE"
                    value={bundleCode}
                    onChange={(e) => setBundleCode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    value={bundleCategory}
                    onChange={(e) => setBundleCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="email">Email Outreach</option>
                    <option value="lead-gen">Lead Generation</option>
                    <option value="linkedin">LinkedIn Automation</option>
                    <option value="voice">Voice AI SDR</option>
                    <option value="workforce">AI Workforce</option>
                    <option value="custom">Custom Suite</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Add-on Price ($)</label>
                  <input
                    type="number"
                    value={addonPrice}
                    onChange={(e) => setAddonPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-slate-300">Monthly Credit Bonus</label>
                  <input
                    type="number"
                    value={includedCredits}
                    onChange={(e) => setIncludedCredits(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-300">Included Features (Comma-separated)</label>
                <textarea
                  rows={2}
                  value={featureListInput}
                  onChange={(e) => setFeatureListInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-[#202020]">
                <Button variant="secondary" size="sm" onClick={() => setIsAddBundleOpen(false)}>Cancel</Button>
                <Button variant="primary" size="sm" type="submit">Create Bundle</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Delete Bundle Confirmation */}
      {bundleToDelete && (
        <AdminConfirmModal
          isOpen={Boolean(bundleToDelete)}
          onClose={() => setBundleToDelete(null)}
          onConfirm={() => {
            if (bundleToDelete) deleteBundle(bundleToDelete.id);
            setBundleToDelete(null);
          }}
          title={`Delete Bundle: ${bundleToDelete.name}`}
          description={`Are you sure you want to delete ${bundleToDelete.name}? Existing users with this bundle will preserve access until their subscription updates.`}
          confirmText="Delete Bundle"
          variant="danger"
        />
      )}

    </div>
  );
};
