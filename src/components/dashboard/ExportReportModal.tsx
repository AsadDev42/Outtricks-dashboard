import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { RadioGroup } from '../ui/Radio';
import { useToast } from '../../context/ToastContext';
import { Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export interface ExportReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [format, setFormat] = useState('pdf');
  const [reportScope, setReportScope] = useState('full');
  const [isExporting, setIsExporting] = useState(false);
  const { success } = useToast();

  const handleExport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExporting(true);

    setTimeout(() => {
      setIsExporting(false);
      success(`Exported Outtricks Revenue Intelligence Report (${format.toUpperCase()})`, 'Report Generated');
      onClose();
    }, 700);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Export Revenue Intelligence Report"
      description="Download audit-ready telemetry summaries across verified leads, mailbox delivery, voice calls, and closed-won pipeline value."
      size="sm"
    >
      <form onSubmit={handleExport} className="space-y-4 font-sans">
        
        <Select
          label="Report Telemetry Scope"
          value={reportScope}
          onChange={(e) => setReportScope(e.target.value)}
          options={[
            { value: 'full', label: 'Complete Executive Brief (All 6 Engines + CRM)' },
            { value: 'pipeline', label: 'Pipeline & ARR Attribution Only ($573K)' },
            { value: 'email', label: 'Cold Email & Deliverability Audit (24 Inboxes)' },
            { value: 'voice', label: 'Voice AI SDR Qualification & Meeting Log' },
          ]}
        />

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">File Format</label>
          <RadioGroup
            name="exportFormat"
            value={format}
            onChange={setFormat}
            options={[
              { value: 'pdf', label: 'Executive PDF Presentation', description: 'Styled charts, conversion funnels, and KPI summaries' },
              { value: 'csv', label: 'Raw CSV Telemetry Data', description: 'Full prospect rows, timestamps, and attribution weights' },
            ]}
          />
        </div>

        <div className="p-3 bg-slate-50 dark:bg-[#1C1C1C] rounded-2xl border border-slate-200/80 dark:border-[#202020] text-xs text-slate-500 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>SOC2 Type II sanitized. PII records conform to strict GDPR/CCPA export policies.</span>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isExporting} leftIcon={<Download className="w-3.5 h-3.5" />}>
            Download Report
          </Button>
        </div>

      </form>
    </Modal>
  );
};
