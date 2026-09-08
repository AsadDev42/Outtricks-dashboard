import React from 'react';
import { 
  Users, 
  Plus, 
  Download
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { Button } from '../ui/Button';

export interface CrmHeaderProps {
  onOpenCreateDealModal?: () => void;
  onOpenCreatePipelineModal?: () => void;
  onOpenCustomFieldsModal?: () => void;
  onOpenImportModal?: () => void;
  onOpenDuplicatesModal?: () => void;
}

export const CrmHeader: React.FC<CrmHeaderProps> = ({
  onOpenCreateDealModal,
  onOpenImportModal,
}) => {
  const { setActiveTab } = useCrm();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-[#242424] font-sans">
      <div className="space-y-0.5">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          CRM
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Manage contacts, companies, deals, pipelines, and sales activities.
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center gap-2">
        {onOpenImportModal && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onOpenImportModal}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Import CSV
          </Button>
        )}

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setActiveTab('contacts')}
          leftIcon={<Users className="w-3.5 h-3.5" />}
        >
          Add Contact
        </Button>

        {onOpenCreateDealModal && (
          <Button
            variant="primary"
            size="sm"
            onClick={onOpenCreateDealModal}
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Deal
          </Button>
        )}
      </div>
    </header>
  );
};

