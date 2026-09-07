import React, { useState } from 'react';
import { 
  Sliders, 
  Layers, 
  Search, 
  Mail, 
  PhoneCall, 
  Linkedin, 
  Bot, 
  Workflow, 
  CheckCircle2, 
  X, 
  AlertCircle,
  HelpCircle,
  Zap
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Switch } from '../ui/Switch';
import { useAdmin } from '../../context/AdminContext';

export const AdminFeatureAccessView: React.FC = () => {
  const { plans, bundles, users, teams, hasFeatureAccess } = useAdmin();

  const [selectedPlanId, setSelectedPlanId] = useState(plans[1]?.id || 'plan-growth');
  const [activeTab, setActiveTab] = useState<'matrix' | 'hierarchy'>('matrix');

  const FEATURE_MATRIX = [
    {
      module: 'Cold Email Outreach',
      submodules: [
        { name: 'Campaign Sequences', starter: true, growth: true, scale: true, enterprise: true },
        { name: 'Multi-Inbox Rotation', starter: false, growth: true, scale: true, enterprise: true },
        { name: 'A/B Testing Variants', starter: false, growth: true, scale: true, enterprise: true },
        { name: 'Automated Warmup Engine', starter: false, growth: false, scale: true, enterprise: true },
        { name: 'Deliverability Spintax AI', starter: false, growth: true, scale: true, enterprise: true },
        { name: 'Dedicated IP Proxies', starter: false, growth: false, scale: false, enterprise: true },
      ]
    },
    {
      module: '8D Lead Finder',
      submodules: [
        { name: '480M+ Database Search', starter: true, growth: true, scale: true, enterprise: true },
        { name: 'Direct Phone & Mobile Enrichment', starter: false, growth: true, scale: true, enterprise: true },
        { name: 'CSV Bulk Export', starter: true, growth: true, scale: true, enterprise: true },
        { name: 'Intent Signals & Hiring Triggers', starter: false, growth: false, scale: true, enterprise: true },
      ]
    },
    {
      module: 'Voice AI SDR',
      submodules: [
        { name: 'Sub-400ms Phone SDR Agents', starter: false, growth: true, scale: true, enterprise: true },
        { name: 'Custom Knowledge Base RAG', starter: false, growth: true, scale: true, enterprise: true },
        { name: 'Live Call Transfer & Recordings', starter: false, growth: false, scale: true, enterprise: true },
        { name: 'Local Presence Caller ID', starter: false, growth: false, scale: true, enterprise: true },
      ]
    },
    {
      module: 'Autonomous AI Workforce',
      submodules: [
        { name: 'Autonomous SDR Outreach Agent', starter: false, growth: false, scale: true, enterprise: true },
        { name: 'LinkedIn Safe Bot', starter: false, growth: false, scale: true, enterprise: true },
        { name: 'Upwork Autonomous Bidding Studio', starter: false, growth: false, scale: true, enterprise: true },
        { name: 'DeepContext Account Researcher', starter: false, growth: false, scale: true, enterprise: true },
      ]
    }
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-base sm:text-lg font-extrabold text-slate-950 dark:text-white">
              Granular Feature Access Matrix & Hierarchy
            </h2>
            <Badge variant="emerald" size="sm">Permission Engine</Badge>
          </div>
          <p className="text-xs text-slate-500">
            Configure feature availability across Plans, Product Bundles, Team Workspaces, and direct User Overrides.
          </p>
        </div>

        {/* Priority Hierarchy Tag */}
        <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/40 text-[11px] text-emerald-800 dark:text-emerald-300 font-mono flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Priority: User Override → Team Override → Bundle → Plan</span>
        </div>
      </div>

      {/* 2. Feature Access Table */}
      <div className="rounded-3xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs overflow-hidden text-xs">
        <div className="p-4 bg-slate-50/80 dark:bg-[#1C1C1C] border-b border-slate-200/80 dark:border-[#2A2A2A] flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-950 dark:text-white">
            Plan Feature Entitlement Matrix
          </h3>
          <span className="text-slate-400 text-[11px]">
            Changes automatically propagate to all member seats.
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#202020] text-slate-400 font-bold uppercase text-[10px]">
                <th className="py-3 px-4">Engine / Feature</th>
                <th className="py-3 px-4 text-center">Starter ($99)</th>
                <th className="py-3 px-4 text-center">Growth ($299)</th>
                <th className="py-3 px-4 text-center">Scale ($799)</th>
                <th className="py-3 px-4 text-center">Enterprise ($1999)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/[0.04]">
              {FEATURE_MATRIX.map((section, sIdx) => (
                <React.Fragment key={sIdx}>
                  <tr className="bg-slate-50/50 dark:bg-[#1C1C1C]/40 font-bold text-slate-900 dark:text-white">
                    <td colSpan={5} className="py-2.5 px-4 text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {section.module}
                    </td>
                  </tr>
                  {section.submodules.map((sub, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-900/30">
                      <td className="py-2.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                        {sub.name}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        {sub.starter ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        {sub.growth ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        {sub.scale ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        {sub.enterprise ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-slate-300 dark:text-slate-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
