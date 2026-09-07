import React, { useState } from 'react';
import { 
  Sliders, 
  X, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Layers, 
  Tag, 
  Building2, 
  User, 
  DollarSign 
} from 'lucide-react';
import { useCrm, CrmCustomField } from '../../context/CrmContext';

interface CrmCustomFieldsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrmCustomFieldsModal: React.FC<CrmCustomFieldsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const { customFields, createCustomField, deleteCustomField } = useCrm();

  const [entityType, setEntityType] = useState<'deal' | 'contact' | 'company'>('deal');
  const [fieldName, setFieldName] = useState('');
  const [fieldType, setFieldType] = useState<CrmCustomField['fieldType']>('text');
  const [optionsStr, setOptionsStr] = useState('');
  const [required, setRequired] = useState(false);

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldName.trim()) return;

    const fieldKey = fieldName.toLowerCase().replace(/\s+/g, '_').replace(/[^a-z0-9_]/g, '');
    const options = fieldType === 'select' 
      ? optionsStr.split(',').map(o => o.trim()).filter(Boolean)
      : undefined;

    createCustomField({
      entityType,
      fieldName,
      fieldKey,
      fieldType,
      options,
      required
    });

    setFieldName('');
    setOptionsStr('');
    setRequired(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white dark:bg-[#161616] rounded-3xl border border-slate-200 dark:border-[#2A2A2A] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#2A2A2A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                CRM Custom Fields & Schema
              </h2>
              <p className="text-xs text-slate-500">
                Define custom business properties across Deals, Contacts, and Company records.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs">
          
          {/* Active Fields List */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Configured Custom Fields ({customFields.length})
            </h3>

            <div className="space-y-2">
              {customFields.map((field) => (
                <div
                  key={field.id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#141414] border border-slate-200/80 dark:border-[#202020] flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white">
                        {field.fieldName}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/10 dark:bg-emerald-500/10 text-emerald-400 uppercase">
                        {field.fieldType}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 dark:bg-[#181818] text-slate-500 uppercase">
                        {field.entityType}
                      </span>
                    </div>
                    <div className="font-mono text-[10px] text-slate-400">
                      key: {field.fieldKey} {field.options ? `• options: [${field.options.join(', ')}]` : ''}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteCustomField(field.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Create Field Form */}
          <form onSubmit={handleAddField} className="p-4 rounded-2xl bg-slate-50/60 dark:bg-[#141414]/60 border border-slate-200/80 dark:border-[#2A2A2A] space-y-3">
            <h4 className="font-extrabold text-slate-900 dark:text-white">
              Add New Custom Field
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Target Entity
                </label>
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                >
                  <option value="deal">Deals Pipeline</option>
                  <option value="contact">Contacts</option>
                  <option value="company">Companies / Accounts</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Field Data Type
                </label>
                <select
                  value={fieldType}
                  onChange={(e) => setFieldType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                >
                  <option value="text">Text Input</option>
                  <option value="number">Number</option>
                  <option value="select">Dropdown Select</option>
                  <option value="date">Date Picker</option>
                  <option value="currency">Currency ($ USD)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Display Label
              </label>
              <input
                type="text"
                placeholder="e.g. Secondary Decision Maker Email"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                required
              />
            </div>

            {fieldType === 'select' && (
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Dropdown Options (comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="Option A, Option B, Option C"
                  value={optionsStr}
                  onChange={(e) => setOptionsStr(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#161616] border border-slate-200 dark:border-[#2A2A2A] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Property</span>
            </button>
          </form>

        </div>

        <div className="p-4 border-t border-slate-100 dark:border-[#2A2A2A] flex items-center justify-end bg-slate-50 dark:bg-[#141414]/40">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
          >
            Close Settings
          </button>
        </div>

      </div>
    </div>
  );
};
