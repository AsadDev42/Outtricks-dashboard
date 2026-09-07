import React from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { 
  Mail, 
  Linkedin, 
  PhoneCall, 
  Building2, 
  Database, 
  GitBranch, 
  Clock, 
  Zap, 
  Plus 
} from 'lucide-react';
import { useWorkflows, WorkflowNode, NodeType } from '../../context/WorkflowsContext';

export interface AddNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddNodeModal: React.FC<AddNodeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { activeWorkflow, addWorkflowNode } = useWorkflows();

  const NODE_PRESETS: {
    type: NodeType;
    title: string;
    subtitle: string;
    channel: string;
    icon: any;
    iconName: string;
    config: Record<string, any>;
  }[] = [
    {
      type: 'action',
      title: 'Send Cold Email Step',
      subtitle: 'Rotate Mailbox with Spintax',
      channel: 'Cold Email',
      icon: Mail,
      iconName: 'Mail',
      config: { templateId: 'default-pitch', delayMinutes: 45 }
    },
    {
      type: 'action',
      title: 'LinkedIn Safe Connect',
      subtitle: 'Profile View & Connection Note',
      channel: 'LinkedIn API',
      icon: Linkedin,
      iconName: 'Linkedin',
      config: { customNote: true, proxy: 'Residential 4G' }
    },
    {
      type: 'action',
      title: 'Voice AI SDR Qualifying Call',
      subtitle: 'Sub-400ms WebRTC Call',
      channel: 'Voice AI',
      icon: PhoneCall,
      iconName: 'PhoneCall',
      config: { agentId: 'sophia-enterprise', maxSeconds: 300 }
    },
    {
      type: 'data',
      title: 'Lead Data Formatting Block',
      subtitle: 'Format Contact Properties',
      channel: 'Lead Data',
      icon: Database,
      iconName: 'Database',
      config: { formatFields: true }
    },
    {
      type: 'action',
      title: 'Create / Advance CRM Deal',
      subtitle: 'Deals CRM Pipeline Stage',
      channel: 'Deals CRM',
      icon: Building2,
      iconName: 'Building2',
      config: { stage: 'Discovery', dealValue: 48000 }
    },
    {
      type: 'condition',
      title: 'Check Sentiment Condition',
      subtitle: 'Branch on Interested vs Unsubscribe',
      channel: 'Logic',
      icon: GitBranch,
      iconName: 'GitBranch',
      config: { condition: 'sentiment == "Interested"' }
    },
    {
      type: 'delay',
      title: 'Wait / Delay Step',
      subtitle: 'Pause Execution for 48 Hours',
      channel: 'Delay',
      icon: Clock,
      iconName: 'Clock',
      config: { delayHours: 48 }
    },
    {
      type: 'integration',
      title: 'Dispatch Outbound Webhook',
      subtitle: 'Send JSON to External REST API',
      channel: 'Webhook',
      icon: Zap,
      iconName: 'Zap',
      config: { endpoint: 'https://api.domain.com/v1/webhook' }
    }
  ];

  const handleSelectNode = (preset: typeof NODE_PRESETS[0]) => {
    if (!activeWorkflow) return;

    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: preset.type,
      title: preset.title,
      subtitle: preset.subtitle,
      channel: preset.channel,
      iconName: preset.iconName,
      config: preset.config,
      position: { x: (activeWorkflow.nodes.length + 1) * 200, y: 120 }
    };

    addWorkflowNode(activeWorkflow.id, newNode);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add DAG Node to Canvas"
      description="Select an action, condition branch, or data operator to add to this workflow."
      size="md"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs">
        {NODE_PRESETS.map((preset, idx) => {
          const Icon = preset.icon;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectNode(preset)}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 text-left transition-all cursor-pointer space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-[#1A1A1A] text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shadow-xs">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  {preset.type}
                </span>
              </div>

              <div>
                <div className="font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {preset.title}
                </div>
                <div className="text-[11px] text-slate-500">
                  {preset.subtitle}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
};
