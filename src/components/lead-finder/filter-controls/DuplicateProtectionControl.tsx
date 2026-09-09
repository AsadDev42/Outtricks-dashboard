import React from 'react';
import { ShieldCheck, UserX, Clock, Building } from 'lucide-react';
import { LeadFilterState } from '../../../context/LeadSearchContext';

interface DuplicateProtectionControlProps {
  draft: LeadFilterState;
  setDraft: React.Dispatch<React.SetStateAction<LeadFilterState>>;
}

export const DuplicateProtectionControl: React.FC<DuplicateProtectionControlProps> = ({ draft, setDraft }) => {
  return (
    <div className="space-y-2 pt-1 text-xs">
      <label className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors">
        <input
          type="checkbox"
          checked={Boolean(draft.excludeCurrentCustomers)}
          onChange={(e) => setDraft((p) => ({ ...p, excludeCurrentCustomers: e.target.checked }))}
          className="w-3.5 h-3.5 rounded text-primary accent-primary focus:ring-0 cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <Building className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-slate-800 dark:text-slate-200 font-medium">Exclude Current Customers</span>
        </div>
      </label>

      <label className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors">
        <input
          type="checkbox"
          checked={Boolean(draft.excludeOpenOpportunities)}
          onChange={(e) => setDraft((p) => ({ ...p, excludeOpenOpportunities: e.target.checked }))}
          className="w-3.5 h-3.5 rounded text-primary accent-primary focus:ring-0 cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-slate-800 dark:text-slate-200 font-medium">Exclude Active CRM Deals / Opportunities</span>
        </div>
      </label>

      <label className="flex items-center gap-2.5 p-2 rounded-xl border border-slate-200 dark:border-[#2A2A2A] hover:bg-slate-50 dark:hover:bg-white/[0.02] cursor-pointer transition-colors">
        <input
          type="checkbox"
          checked={Boolean(draft.excludePreviouslyContacted)}
          onChange={(e) => setDraft((p) => ({ ...p, excludePreviouslyContacted: e.target.checked }))}
          className="w-3.5 h-3.5 rounded text-primary accent-primary focus:ring-0 cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <UserX className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-slate-800 dark:text-slate-200 font-medium">Exclude Previously Contacted Prospects</span>
        </div>
      </label>
    </div>
  );
};
