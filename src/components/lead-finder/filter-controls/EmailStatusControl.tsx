import React from 'react';
import { Check, ShieldCheck, Mail } from 'lucide-react';
import { LeadFilterState } from '../../../context/LeadSearchContext';

interface EmailStatusControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const EmailStatusControl: React.FC<EmailStatusControlProps> = ({ draft, setDraft }) => {
  const isVerifiedOnly = draft.deliverability === 'verified_only';

  const toggleDeliverability = () => {
    setDraft((prev) => ({
      ...prev,
      deliverability: prev.deliverability === 'verified_only' ? 'all' : 'verified_only',
    }));
  };

  const contactTypes = draft.contactTypes || [];

  const toggleContactType = (type: string) => {
    setDraft((prev) => {
      const cur = prev.contactTypes || [];
      const next = cur.includes(type) ? cur.filter((t) => t !== type) : [...cur, type];
      return { ...prev, contactTypes: next };
    });
  };

  return (
    <div className="space-y-3 pt-1 text-xs">
      {/* 1. Verified Deliverability Mode */}
      <div
        onClick={toggleDeliverability}
        className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
          isVerifiedOnly
            ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
            : 'border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-100 dark:hover:bg-white/[0.04]'
        }`}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className={`w-4 h-4 ${isVerifiedOnly ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`} />
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Verified Deliverability Only</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">98%+ guaranteed zero-bounce email rate</p>
          </div>
        </div>
        <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
          isVerifiedOnly ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-white/20'
        }`}>
          {isVerifiedOnly && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      </div>

      {/* 2. Contact Channel Availability */}
      <div className="space-y-1.5 pt-1">
        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
          Available Channels
        </label>
        {[
          { id: 'direct_email', label: 'Direct Work Email Available' },
          { id: 'direct_mobile', label: 'Direct Mobile Phone Available' },
          { id: 'both_available', label: 'Both Email & Mobile Available' },
        ].map((item) => {
          const checked = contactTypes.includes(item.id);
          return (
            <label
              key={item.id}
              className="flex items-center gap-2 py-1 px-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.04] cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() => toggleContactType(item.id)}
                className="w-3.5 h-3.5 rounded text-primary accent-primary focus:ring-0 cursor-pointer"
              />
              <span className="text-slate-700 dark:text-slate-300 font-medium">{item.label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
