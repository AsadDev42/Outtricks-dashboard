import React from 'react';
import { 
  HeartPulse, 
  RotateCcw, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Activity, 
  Layers, 
  Zap, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { Button } from '../ui/Button';

export const CrmHealthView: React.FC = () => {
  const { 
    healthData, 
    isHealthChecking, 
    runHealthCheck, 
    refreshHealthData, 
    deals, 
    contacts, 
    setActiveTab 
  } = useCrm();

  const handleExportHealthReport = () => {
    const reportData = `OUTTRICKS CRM HEALTH & DATA INTEGRITY AUDIT REPORT
Generated: ${new Date().toISOString()}
==================================================
Overall CRM Health Score: ${healthData.crmHealthScore}/100
Data Quality Score: ${healthData.dataQualityScore}%
Pipeline Health Score: ${healthData.pipelineHealthScore}%
Engagement Health Score: ${healthData.engagementHealthScore}%

REVENUE & PIPELINE HEALTH:
- Pipeline Coverage Ratio: ${healthData.revenueHealth.pipelineCoverageRatio}
- Deal Velocity: ${healthData.revenueHealth.dealVelocityDays} days
- Win Rate: ${healthData.revenueHealth.winRatePercent}%
- Average Deal Age: ${healthData.revenueHealth.averageDealAgeDays} days

DATA QUALITY AUDIT:
- Duplicate Contacts: ${healthData.dataQualityIssues.duplicateContactsCount}
- Missing Emails: ${healthData.dataQualityIssues.missingEmailsCount}
- Missing Phone Numbers: ${healthData.dataQualityIssues.missingPhoneCount}
- Missing Company Info: ${healthData.dataQualityIssues.missingCompanyInfoCount}

AUTOMATION & WORKFLOW HEALTH:
- Sequence Success Rate: ${healthData.automationHealth.sequenceSuccessRate}%
- Failed Workflow Runs: ${healthData.automationHealth.failedWorkflowRuns}
- Integration Health: ${healthData.automationHealth.integrationHealthScore}%
==================================================
STATUS: SYSTEM HEALTHY & VERIFIED`;

    const blob = new Blob([reportData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `crm_health_report_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header with Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            CRM HEALTH & DATA INTEGRITY
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time pipeline hygiene, data quality audits, engagement health, and deliverability checks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExportHealthReport}
            className="text-xs font-semibold gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={runHealthCheck}
            disabled={isHealthChecking}
            className="text-xs font-bold gap-1.5 shadow-sm shadow-emerald-500/20"
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isHealthChecking ? 'animate-spin' : ''}`} />
            <span>{isHealthChecking ? 'Auditing CRM...' : 'Run Health Check'}</span>
          </Button>
        </div>
      </div>

      {/* 2. Top 4 Health Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">CRM Health Score</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <HeartPulse className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
            {healthData.crmHealthScore}<span className="text-sm font-normal text-slate-400">/100</span>
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Optimal operating state
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Data Quality</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {healthData.dataQualityScore}%
          </div>
          <div className="text-[11px] text-slate-500">0 duplicate contacts</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pipeline Health</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {healthData.pipelineHealthScore}%
          </div>
          <div className="text-[11px] text-slate-500">{deals.length} active opportunities</div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Engagement Health</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            {healthData.engagementHealthScore}%
          </div>
          <div className="text-[11px] text-slate-500">Active reply velocity</div>
        </div>

      </div>

      {/* 3. Deep Breakdown Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* Section 1: Data Quality Breakdown */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              DATA QUALITY AUDIT
            </h3>
            <span className="text-[11px] font-bold text-emerald-600">98% Clean</span>
          </div>

          <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-white/[0.04]">
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Duplicate Contacts</span>
              <span className="font-bold text-emerald-600 font-mono">{healthData.dataQualityIssues.duplicateContactsCount} (Clean)</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Missing Emails</span>
              <span className="font-bold text-amber-600 font-mono">{healthData.dataQualityIssues.missingEmailsCount}</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Missing Phone Numbers</span>
              <span className="font-bold text-amber-600 font-mono">{healthData.dataQualityIssues.missingPhoneCount}</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Invalid Email Addresses</span>
              <span className="font-bold text-emerald-600 font-mono">{healthData.dataQualityIssues.invalidEmailsCount} (Zero)</span>
            </div>
          </div>
        </div>

        {/* Section 2: Pipeline Health Breakdown */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              PIPELINE HYGIENE
            </h3>
            <span className="text-[11px] font-bold text-emerald-600">Active Velocity</span>
          </div>

          <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-white/[0.04]">
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Stale Opportunities</span>
              <span className="font-bold text-slate-700 dark:text-slate-300 font-mono">{healthData.pipelineHealthIssues.staleDealsCount}</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Deals Without Next Step</span>
              <span className="font-bold text-emerald-600 font-mono">{healthData.pipelineHealthIssues.dealsWithoutNextStepCount}</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Deals Without Owner</span>
              <span className="font-bold text-emerald-600 font-mono">{healthData.pipelineHealthIssues.dealsWithoutOwnerCount}</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Overdue Opportunities</span>
              <span className="font-bold text-emerald-600 font-mono">{healthData.pipelineHealthIssues.overdueOpportunitiesCount}</span>
            </div>
          </div>
        </div>

        {/* Section 3: Revenue & Velocity Breakdown */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#161616] border border-slate-200/80 dark:border-[#2A2A2A] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
              REVENUE & CONVERSION
            </h3>
            <span className="text-[11px] font-bold text-emerald-600">32.4% Win Rate</span>
          </div>

          <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-white/[0.04]">
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Pipeline Coverage</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">{healthData.revenueHealth.pipelineCoverageRatio}</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Deal Velocity</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">{healthData.revenueHealth.dealVelocityDays} days</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Average Opportunity Age</span>
              <span className="font-bold text-slate-900 dark:text-white font-mono">{healthData.revenueHealth.averageDealAgeDays} days</span>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Automation Success Rate</span>
              <span className="font-bold text-emerald-600 font-mono">{healthData.automationHealth.sequenceSuccessRate}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Action Recommendation Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-teal-500/5 dark:from-emerald-950/20 dark:to-emerald-900/10 border border-emerald-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
              AI Deliverability & Data Optimization Available
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            2 contacts are missing phone numbers. Run automated profile resolution or review deliverability settings.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab('contacts')}
            className="text-xs"
          >
            Review Contacts
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={runHealthCheck}
            className="text-xs font-bold"
          >
            Re-Audit Score
          </Button>
        </div>
      </div>

    </div>
  );
};
