import React from 'react';
import { ProposalWorkspaceModal, ProposalWorkspaceModalProps } from './ProposalWorkspaceModal';

export type CreateProposalModalProps = ProposalWorkspaceModalProps;

export const CreateProposalModal: React.FC<CreateProposalModalProps> = (props) => {
  return <ProposalWorkspaceModal {...props} />;
};

export default CreateProposalModal;
