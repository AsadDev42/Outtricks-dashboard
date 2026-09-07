import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Download, 
  CheckCircle2, 
  Lock, 
  ExternalLink, 
  Save, 
  RotateCcw,
  Globe
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../../context/ToastContext';

export const SettingsComplianceLegalView: React.FC = () => {
  const { success, info } = useToast();

  const [includeUnsubscribeHeader, setIncludeUnsubscribeHeader] = useState(true);
  const [includePhysicalAddress, setIncludePhysicalAddress] = useState(true);
  const [trackConsentTimestamp, setTrackConsentTimestamp] = useState(true);

  const COMPLIANCE_FRAMEWORKS = [
    { name: 'GDPR (EU Data Protection)', status: 'Compliant', badge: 'Standard Contractual Clauses (SCC)' },
    { name: 'CAN-SPAM Act (US Federal)', status: 'Certified', badge: 'Automated 1-Click Opt-Out' },
    { name: 'CCPA / CPRA (California Privacy)', status: 'Ready', badge: 'Right to Be Forgotten Ready' },
    { name: 'SOC 2 Type II Security Vault', status: 'Passed', badge: 'Continuous Cloud Audit' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-1">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
            Compliance, Data Governance & Legal Documentation
          </h2>
        </div>
        <p className="text-xs text-slate-500">
          CAN-SPAM enforcement controls, GDPR Article 28 Data Processing Addendums (DPA), and customer privacy commitments.
        </p>
      </div>

      {/* 2. Global Compliance Framework Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {COMPLIANCE_FRAMEWORKS.map((fw, idx) => (
          <div key={idx} className="p-5 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <Badge variant="emerald" size="sm">{fw.status}</Badge>
            </div>
            <div className="font-extrabold text-slate-900 dark:text-white text-xs">
              {fw.name}
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              {fw.badge}
            </p>
          </div>
        ))}
      </div>

      {/* 3. Automated Outbound Consent & CAN-SPAM Settings */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
          Outreach Compliance Guardrails
        </h3>

        <div className="space-y-3">
          <label className="p-4 rounded-2xl border border-slate-200/80 dark:border-[#202020] hover:bg-slate-50/50 dark:hover:bg-slate-900/40 flex items-center justify-between cursor-pointer transition-colors">
            <div>
              <strong className="text-slate-900 dark:text-white block text-xs">1-Click List-Unsubscribe Header (RFC 8058)</strong>
              <span className="text-[11px] text-slate-500">
                Embeds machine-readable unsubscribe headers in all outbound emails for Gmail and Yahoo compliance.
              </span>
            </div>
            <input
              type="checkbox"
              checked={includeUnsubscribeHeader}
              onChange={(e) => setIncludeUnsubscribeHeader(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded-sm accent-emerald-500"
            />
          </label>

          <label className="p-4 rounded-2xl border border-slate-200/80 dark:border-[#202020] hover:bg-slate-50/50 dark:hover:bg-slate-900/40 flex items-center justify-between cursor-pointer transition-colors">
            <div>
              <strong className="text-slate-900 dark:text-white block text-xs">Include Physical Corporate Address in Footers</strong>
              <span className="text-[11px] text-slate-500">
                Appends your verified business headquarters address to meet CAN-SPAM requirements.
              </span>
            </div>
            <input
              type="checkbox"
              checked={includePhysicalAddress}
              onChange={(e) => setIncludePhysicalAddress(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded-sm accent-emerald-500"
            />
          </label>

          <label className="p-4 rounded-2xl border border-slate-200/80 dark:border-[#202020] hover:bg-slate-50/50 dark:hover:bg-slate-900/40 flex items-center justify-between cursor-pointer transition-colors">
            <div>
              <strong className="text-slate-900 dark:text-white block text-xs">Record Proof-of-Consent Timestamps</strong>
              <span className="text-[11px] text-slate-500">
                Stores cryptographic opt-in audit records when prospects interact with outbound sequences.
              </span>
            </div>
            <input
              type="checkbox"
              checked={trackConsentTimestamp}
              onChange={(e) => setTrackConsentTimestamp(e.target.checked)}
              className="w-4 h-4 text-emerald-600 rounded-sm accent-emerald-500"
            />
          </label>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => success('Compliance settings saved to workspace.', 'Settings Saved')}
            leftIcon={<Save className="w-3.5 h-3.5" />}
          >
            Save Compliance Rules
          </Button>
        </div>
      </div>

      {/* 4. Signed Legal Documents & DPA Downloads */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 text-xs">
        <h3 className="font-extrabold text-sm text-slate-950 dark:text-white uppercase tracking-wider">
          Legal Agreements & Contracts
        </h3>

        <div className="divide-y divide-slate-100 dark:divide-white/[0.06] rounded-2xl border border-slate-200/80 dark:border-[#202020] overflow-hidden bg-slate-50/40 dark:bg-[#141414]/30">
          {[
            { title: 'Data Processing Addendum (DPA)', signed: 'Signed by Sarah Jenkins on Aug 01, 2026', version: 'v2026.2 (GDPR Art 28)' },
            { title: 'Master Service Agreement (MSA)', signed: 'Enterprise Growth Tier Agreement', version: 'v4.1' },
            { title: 'Privacy Policy & Sub-Processor Register', signed: 'Public Register Active', version: 'Updated Aug 2026' },
          ].map((doc, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-bold text-slate-900 dark:text-white text-xs">{doc.title}</div>
                <div className="text-[11px] text-slate-400 font-mono">{doc.signed} • {doc.version}</div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={() => success(`Downloading signed copy of ${doc.title}.`, 'PDF Downloaded')}
                leftIcon={<Download className="w-3.5 h-3.5" />}
              >
                Download PDF
              </Button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
