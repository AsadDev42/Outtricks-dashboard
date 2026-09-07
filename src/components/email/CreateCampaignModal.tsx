import React from 'react';
import { CampaignCreationJourneyModal, CampaignCreationJourneyModalProps } from './CampaignCreationJourneyModal';

export type CreateCampaignModalProps = CampaignCreationJourneyModalProps;

export const CreateCampaignModal: React.FC<CreateCampaignModalProps> = (props) => {
  return <CampaignCreationJourneyModal {...props} />;
};
