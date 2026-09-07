import React from 'react';
import { 
  Users, 
  Plus, 
  Download, 
  Layers
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export interface CrmHeaderProps {
  onOpenCreateDealModal?: () => void;
  onOpenCreatePipelineModal?: () => void;
  onOpenCustomFieldsModal?: () => void;
  onOpenImportModal?: () => void;
  onOpenDuplicatesModal?: () => void;
}

export const CrmHeader: React.FC<CrmHeaderProps> = ({
  onOpenCreateDealModal,
  onOpenCreatePipelineModal,
  onOpenImportModal,
}) => {
  const { setActiveTab } = useCrm();

  return (
    <div className="space-y-4 font-sans">
      
      {/* 1. Executive Top Header Banner */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              CRM & Sales OS Hub
            </h1>
            <Badge variant="emerald" size="sm">Live Pipeline</Badge>
          </div>
          <p className="text-xs text-slate-500 max-w-xl">
            Track your contacts, companies, deals, pipeline velocity, and multi-touch sales activity.
          </p>
        </div>

        {/* Global Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
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
      </div>

    </div>
  );
};
