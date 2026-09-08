import React from 'react';
import { CreateRadarModal, CreateRadarModalProps } from './CreateRadarModal';

export type CreateJobAlertModalProps = CreateRadarModalProps;

export const CreateJobAlertModal: React.FC<CreateJobAlertModalProps> = (props) => {
  return <CreateRadarModal {...props} />;
};

export default CreateJobAlertModal;
