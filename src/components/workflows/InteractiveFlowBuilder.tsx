import React from 'react';
import { MultiChannelAutomationCanvas } from './MultiChannelAutomationCanvas';

export interface InteractiveFlowBuilderProps {
  onOpenAddNodeModal?: () => void;
}

export const InteractiveFlowBuilder: React.FC<InteractiveFlowBuilderProps> = () => {
  return <MultiChannelAutomationCanvas customChannelMode="all" />;
};

export default InteractiveFlowBuilder;
