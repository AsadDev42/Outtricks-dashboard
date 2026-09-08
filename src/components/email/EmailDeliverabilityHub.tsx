import React, { useState } from 'react';
import { ShieldCheck, Inbox, Ban } from 'lucide-react';
import { DomainsHealthView } from './DomainsHealthView';
import { InboxPlacementView } from './InboxPlacementView';
import { SuppressionManager } from './SuppressionManager';

type DeliverabilityTab = 'domain-health' | 'inbox-placement' | 'suppression';

export const EmailDeliverabilityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DeliverabilityTab>('domain-health');

  const tabs = [
    { id: 'domain-health' as const, label: 'Domain Health', icon: ShieldCheck },
    { id: 'inbox-placement' as const, label: 'Inbox Placement', icon: Inbox },
    { id: 'suppression' as const, label: 'Suppression', icon: Ban },
  ];

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100/80 dark:bg-[#141414] border border-slate-200/80 dark:border-[#282828] w-fit max-w-full overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                active
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-white dark:hover:bg-white/[0.05]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'domain-health' && <DomainsHealthView />}
      {activeTab === 'inbox-placement' && <InboxPlacementView />}
      {activeTab === 'suppression' && <SuppressionManager />}
    </div>
  );
};
