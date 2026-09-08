import React, { useState } from 'react';
import { Send, Users, Split, FileText } from 'lucide-react';
import { CampaignsList } from './CampaignsList';
import { EmailLeadsView } from './EmailLeadsView';
import { AbTestingView } from './AbTestingView';
import { TemplatesLibrary } from './TemplatesLibrary';

export interface EmailCampaignOperationsHubProps {
  onOpenCreateCampaign: () => void;
  onOpenCreateTemplate: () => void;
}

type CampaignHubTab = 'campaigns' | 'leads' | 'ab-testing' | 'templates';

export const EmailCampaignOperationsHub: React.FC<EmailCampaignOperationsHubProps> = ({
  onOpenCreateCampaign,
  onOpenCreateTemplate,
}) => {
  const [activeTab, setActiveTab] = useState<CampaignHubTab>('campaigns');

  const tabs = [
    { id: 'campaigns' as const, label: 'Campaigns', icon: Send },
    { id: 'leads' as const, label: 'Leads', icon: Users },
    { id: 'ab-testing' as const, label: 'A/B Tests', icon: Split },
    { id: 'templates' as const, label: 'Templates', icon: FileText },
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

      {activeTab === 'campaigns' && <CampaignsList onOpenCreateCampaign={onOpenCreateCampaign} />}
      {activeTab === 'leads' && <EmailLeadsView />}
      {activeTab === 'ab-testing' && <AbTestingView />}
      {activeTab === 'templates' && <TemplatesLibrary onOpenCreateTemplate={onOpenCreateTemplate} />}
    </div>
  );
};
