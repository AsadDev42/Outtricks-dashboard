import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useWorkflows } from '../../context/WorkflowsContext';
import { Workflow, Plus, Sparkles, Layers } from 'lucide-react';

export interface CreateWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateWorkflowModal: React.FC<CreateWorkflowModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { createCustomWorkflow } = useWorkflows();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Cold Outbound');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    createCustomWorkflow(
      name.trim(),
      description.trim() || 'Custom revenue automation sequence.',
      category
    );
    navigate('/flow-builder/builder');
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Visual Workflow"
      description="Initialize a blank DAG flow or choose an event trigger to orchestrate."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
        {/* Lemlist-style Visual Canvas Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-transparent border border-emerald-500/20 flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <Workflow className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 dark:text-white">Lemlist-Style Visual Canvas</div>
            <div className="text-[10px] text-slate-500">Opens the interactive multi-channel canvas with pre-built blueprints, live stats & wire inserters.</div>
          </div>
        </div>

        <Input
          label="Workflow Name"
          placeholder="e.g. Omnichannel FinTech ICP Pipeline"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          autoFocus
        />

        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={[
            { value: 'Cold Outbound', label: 'Cold Outbound' },
            { value: 'Speed-to-Lead', label: 'Speed-to-Lead' },
            { value: 'Deal Nurture', label: 'Deal Nurture' },
            { value: 'Re-Engagement', label: 'Re-Engagement' },
            { value: 'Upwork Auto-Bid', label: 'Upwork Auto-Bid' },
          ]}
        />

        <div className="space-y-1">
          <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
            Description & Purpose
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what prospect events trigger this automation and what action it executes..."
            className="w-full p-3 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/80 dark:border-[#202020] text-xs outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            disabled={!name.trim()}
            leftIcon={<Workflow className="w-3.5 h-3.5" />}
          >
            Create & Open Canvas
          </Button>
        </div>
      </form>
    </Modal>
  );
};
