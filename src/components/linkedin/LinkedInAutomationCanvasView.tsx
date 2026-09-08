import React from 'react';
import { 
  useLinkedIn, 
  LinkedInCampaign 
} from '../../context/LinkedInContext';
import { LinkedInEmbeddedCanvasStep } from './LinkedInEmbeddedCanvasStep';

export interface LinkedInAutomationCanvasViewProps {
  campaign?: LinkedInCampaign;
}

export const LinkedInAutomationCanvasView: React.FC<LinkedInAutomationCanvasViewProps> = ({ 
  campaign: propCampaign 
}) => {
  const { 
    selectedCampaign: contextCampaign, 
    campaigns, 
    updateCampaignSequence 
  } = useLinkedIn();

  const campaign = propCampaign || contextCampaign || campaigns[0];

  if (!campaign) {
    return (
      <div className="p-8 text-center text-slate-500">
        No active LinkedIn campaign found. Please select or create a campaign.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-[#222222] bg-white dark:bg-[#121212] overflow-hidden shadow-xs h-[calc(100vh-210px)] min-h-[660px] flex flex-col">
      <LinkedInEmbeddedCanvasStep
        sequence={campaign.sequence}
        onChangeSequence={(nextSequence) => {
          updateCampaignSequence(campaign.id, nextSequence);
        }}
        leadCount={campaign.leadsList?.length || campaign.targetCount || 0}
        accountName={campaign.accountName || 'Assigned Account'}
      />
    </div>
  );
};
