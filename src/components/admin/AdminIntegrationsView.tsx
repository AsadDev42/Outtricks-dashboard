import React, { useState } from 'react';
import { 
  Cpu, 
  Activity, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  ExternalLink, 
  ShieldCheck, 
  Key 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useAdmin, AdminIntegration } from '../../context/AdminContext';

export const AdminIntegrationsView: React.FC = () => {
  const { integrations, testIntegration, updateIntegration } = useAdmin();
  const [testingId, setTestingId] = useState<string | null>(null);

  const handleTest = async (id: string) => {
    setTestingId(id);
    await testIntegration(id);
    setTestingId(null);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Platform Integrations & API Gateway Connectors
            </h2>
            <Badge variant="emerald" size="sm">{integrations.length} Services Connected</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Monitor API upstream gateways, telecom SIP trunks, AI model endpoints, and payment webhook health.
          </p>
        </div>
      </div>

      {/* 2. Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {integrations.map((int) => (
          <div
            key={int.id}
            className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-4 flex flex-col justify-between hover:border-blue-500/40 transition-all text-xs"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <h3 className="font-extrabold text-sm text-slate-950 dark:text-white truncate">
                    {int.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">Provider: {int.provider}</span>
                </div>
                <Badge variant={int.status === 'connected' ? 'emerald' : 'amber'} size="sm">
                  {int.status}
                </Badge>
              </div>

              {/* Health Stats */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#1C1C1C] border border-slate-200/60 dark:border-[#202020] space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-400">Health Score:</span>
                  <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{int.healthScore}%</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Verified:</span>
                  <strong className="text-slate-900 dark:text-white">{int.lastChecked}</strong>
                </div>
              </div>

              {/* Secret Masking */}
              <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-[#141414] border border-slate-200/60 dark:border-[#202020] text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Key className="w-3 h-3 text-slate-400" />
                  <span>API Key: ••••••••••••••••</span>
                </span>
                <span className="text-emerald-500 font-bold">Encrypted</span>
              </div>
            </div>

            {/* Test Connection Button */}
            <div className="pt-3 border-t border-slate-100 dark:border-[#202020] flex items-center justify-end">
              <Button
                variant="secondary"
                size="sm"
                disabled={testingId === int.id}
                onClick={() => handleTest(int.id)}
                leftIcon={<RefreshCw className={`w-3 h-3 ${testingId === int.id ? 'animate-spin' : ''}`} />}
              >
                {testingId === int.id ? 'Verifying...' : 'Test Connection'}
              </Button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
